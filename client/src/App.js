
import './App.css';

import Navbar from './components/NavBar/Navbar';
import {Left} from './components/left/left';

function App() {
  return (
    <div className="App">
      <div>
        <Left/>
      </div>
      <div className='Navbar'>
        <Navbar/>
      </div>
    </div>
  );
}

export default App;
