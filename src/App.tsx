import './App.css';
import { Status } from './hooks/useQuery';
import { Characters } from './components/characters';
import { useAppQuery } from './_generated_/App.query.generated';

function App(): JSX.Element | null {
  const { data, status, errors } = useAppQuery({
    page: 3,
  });

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
