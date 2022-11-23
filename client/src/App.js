import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/home/Home';
import Form from './components/form/Form';
import LandingPage from './components/landingPage/LandingPage';
import Details from './components/details/Details';

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <LandingPage/>
      </Route>
      <Route path="/home">
        <Home/>
      </Route>
      <Route path="/create">
        <Form/>
      </Route>
      <Route path={"/videogame/:id"} component={Details}/>
    </div>
  );
}

export default App;
