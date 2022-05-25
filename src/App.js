import logo from './logo.svg';
import './App.css';
import {AlgList} from "./components/AlgList";

function App() {
  return (
    <div className="App">
      <AlgList></AlgList>
    </div>
  );
}

function BoxT() {
  return (
      <header>
        <h1>Алгоритм</h1>
        <p>Текст алгоритма</p>
        <button>Кнопка</button>
      </header>
  );
}

export default App;
