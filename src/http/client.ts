import axios, { AxiosResponse } from 'axios';
import { DocumentNode, print } from 'graphql';

export type Error = Record<string, unknown>[] | unknown;
export interface QueryError {
  errors?: Error;
}

interface QuerySuccess<T> {
  data: T | null;
}

class QueryClientError {
  errors: Error;
  _isQueryClientError = true;

  constructor(error: unknown) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as QueryError;
      if (data.errors) {
        this.errors = data.errors;
        return;
      }
      this.errors = [{ code: error.code, message: error.message }];
    } else {
      this.errors = [error];
    }
  }

  toString() {
    return JSON.stringify({
      errors: this.errors,
    });
  }
}

interface QueryResolve<T> extends QuerySuccess<T>, QueryError {}

const client = axios.create({
  baseURL: 'https://rickandmortyapi.com/graphql',
  headers: { 'Content-Type': 'application/json' },
});

async function query<TData, V = Record<string, unknown>>(
  query: DocumentNode,
  variables?: V
): Promise<QueryResolve<TData>> {
  let data = null;
  let errors = null;
  try {
    const { data: response } = await client.request<unknown, AxiosResponse<QueryResolve<TData>>>({
      method: 'POST',
      data: {
        query: print(query),
        variables,
      },
    });
    const { data: responseData, errors: responseErrors } = response;

    data = responseData;
    errors = responseErrors;
  } catch (e: unknown) {
    const { errors: responseErrors } = new QueryClientError(e);
    errors = responseErrors;
  }

  return { data, errors };
}

export type QueryParams = Parameters<typeof query>;

export { query };
