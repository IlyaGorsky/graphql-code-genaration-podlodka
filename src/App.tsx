import './App.css';
import { loader } from 'graphql.macro';
import { useQuery, Status } from './hooks/useQuery';
import { Characters } from './components/characters';
import { Query } from '../_generated_/types';

const AppQueryString = loader('./app.query.graphql');

type Character = {
  id: number;
  name: string;
  status: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  created: string;
};

interface ResponseQuery {
  characters: Query['characters'];
}

function App(): JSX.Element | null {
  const { data, status, errors } = useQuery<ResponseQuery>(AppQueryString);

  if (status === Status.FETCH_ERROR) {
    return (
      <div className="App">
        <div className="App-content">
          <header className="App-header">
            <h1>Errors</h1>
            <h2>{JSON.stringify(errors)}</h2>
          </header>
        </div>
      </div>
    );
  }

  if (status === Status.FETCHING || status === Status.IDLE) {
    return (
      <div className="App">
        <div className="App-content">
          <header className="App-header">
            <h1>loading...</h1>
          </header>
        </div>
      </div>
    );
  }

  if (status === Status.FETCHED) {
    return (
      <div className="App">
        <div className="App-content">
          <header className="App-header">
            {<Characters characters={(data && data?.characters?.results) || []} />}
          </header>
        </div>
      </div>
    );
  }
  return null;
}

export default App;
