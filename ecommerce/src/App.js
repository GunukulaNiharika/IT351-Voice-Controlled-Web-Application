import "./App.css";
import Main from './Components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
import Alan from "./hooks/alan";

function App() {
  Alan()
  return (
    <BrowserRouter>
    <div >
      {/* <h1>Welcome</h1> */}
      <Main/>
    </div>
    </BrowserRouter>
  );
}
export default App;