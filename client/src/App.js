import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/home/Home';
import Form from './components/form/Form';
import Navbar from './components/navbar/Navbar';
import LandingPage from './components/landingPage/LandingPage';

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <LandingPage/>
      </Route>
      <Route path="/home">
        <Navbar/>
        <Home/>
      </Route>
      <Route path="/create">
        <Form/>
      </Route>
    </div>
  );
}

export default App;
