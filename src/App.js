import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './Components/App.css';
import Home from './Components/Home';
import UserList from './Components/UserList';
import UserEdit from './Components/UserEdit';
import ExerciseList from './Components/ExerciseList';
import ExerciseEdit from './Components/ExerciseEdit';
import EquipmentList from './Components/EquipmentList';
import EquipmentEdit from './Components/EquipmentEdit';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/users' exact={true} component={UserList}/>
            <Route path='/users/:id' component={UserEdit}/>
            <Route path='/exercises' exact={true} component={ExerciseList}/>
            <Route path='/exercise/:id' component={ExerciseEdit}/>
            <Route path='/equipments' exact={true} component={EquipmentList}/>
            <Route path='/equipment/:id' component={EquipmentEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;