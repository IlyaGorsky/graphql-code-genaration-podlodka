import './App.css';
import { Characters, CharactersProps } from './components/characters';
import { loader } from 'graphql.macro';
import { useQuery, Status } from './hooks/useQuery';

const AppQuery = loader('./app.query.graphql');

function App(): JSX.Element | null {
  const { data, status } = useQuery<{ characters: { results: CharactersProps['characters'] } }>(AppQuery);

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
            <Characters characters={data && data.characters.results} />
          </header>
        </div>
      </div>
    );
  }
  return null;
}

export default App;
