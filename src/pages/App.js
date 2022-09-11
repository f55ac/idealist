import './App.css';
import Sidebar from '../components/sidebar';
import Add from './add';
import Browse from './browse';
import Recall from './recall';

import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App" >
      <Router>
        <Sidebar />
        <div className="page">
        <Routes>
          <Route path='/' exact element={<Browse />} />
          <Route path='/add' element={<Add />} />
          <Route path='/browse' element={<Browse />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
