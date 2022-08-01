import { useEffect, useReducer, useRef } from 'react';
import { QueryParams, query as httpQuery, Error } from '../http/client';

export enum Status {
  IDLE = 'idle',
  FETCHED = 'fetched',
  FETCHING = 'fetching',
  FETCH_ERROR = 'error',
}

type Actions<R> =
  | {
      type: Status.FETCHING;
    }
  | {
      type: Status.FETCHED;
      payload: R | null;
    }
  | {
      type: Status.FETCH_ERROR;
      payload: Error;
    };

type State<D> = {
  data: D | null;
  status: Status;
  errors: Error;
};

type Reducer<R> = (state: State<R>, action: Actions<R>) => State<R>;

const initialState = {
  status: Status.IDLE,
  errors: null,
  data: null,
};

const reducer = <R>(state: State<R>, action: Actions<R>): State<R> => {
  switch (action.type) {
    case Status.FETCHING:
      return { ...state, status: Status.FETCHING };
    case Status.FETCHED:
      return { ...state, status: Status.FETCHED, data: action.payload };
    case Status.FETCH_ERROR:
      return { ...state, status: Status.FETCH_ERROR, errors: action.payload };
    default:
      return state;
  }
};

function useQuery<T>(query: QueryParams[0]): State<T>;
function useQuery<T, P>(query: QueryParams[0], variables: P): State<T>;

function useQuery<T, P>(query: QueryParams[0], variables?: P): State<T> {
  const [state, dispatch] = useReducer<Reducer<T>>(reducer, initialState);
  const refStatus = useRef(Status.IDLE);
  const refMounted = useRef(false);

  useEffect(() => {
    if (!query) return;

    refMounted.current = true;

    const fetchData = async () => {
      if (refStatus.current === Status.FETCHING) {
        return;
      }

      dispatch({ type: Status.FETCHING });
      refStatus.current = Status.FETCHING;

      try {
        const { data, errors } = await httpQuery<T, P>(query, variables);

        if (refMounted.current) {
          if (errors) {
            dispatch({ type: Status.FETCH_ERROR, payload: errors });
            return;
          }
          dispatch({ type: Status.FETCHED, payload: data });
          refStatus.current = Status.FETCHED;
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };

    void fetchData();

    return () => {
      refMounted.current = false;
      refStatus.current = Status.IDLE;
    };
  }, [
    query,
    // eslint-disable-next-line
    JSON.stringify(variables),
  ]);

  return state;
}

export { useQuery };
