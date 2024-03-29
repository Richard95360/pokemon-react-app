import React,{FunctionComponent} from 'react'
import {BrowserRouter as Router, Route,Switch, Link  } from 'react-router-dom';
import Login from './pages/login';
import PageNotFound from './pages/page-not-found';
import PokemonAdd from './pages/pokemon-add';
import PokemonsDetail from './pages/pokemon-detail';
import PokemonEdit from './pages/pokemon-edit';
import PokemonList from './pages/pokemon-list';
import PrivateRoute from './PrivateRoute';

const App: FunctionComponent = () => {


  return (
    <Router>
      <div>
        <nav>
          <div className="nav-wrapper teal">
            <Link to="/" className="brand-logo center">Pokédex</Link>
          </div>
        </nav>
        <Switch>
          <PrivateRoute exact path="/" component={PokemonList} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/pokemons" component={PokemonList} />
          <PrivateRoute exact path="/pokemon/add" component={PokemonAdd} />
          <PrivateRoute exact path="/pokemons/edit/:id" component={PokemonEdit} />
          <PrivateRoute  path="/pokemons/:id" component={PokemonsDetail} />
        
          <Route   component={PageNotFound} />
        </Switch>
      </div>
      
    </Router>
  )
}



export default App;
