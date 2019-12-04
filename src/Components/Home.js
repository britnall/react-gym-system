import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <Button size="lg" color="link"><Link to="/users">Manage System Users</Link></Button>
        </Container>
        <Container fluid>
          <Button size="lg" color="link"><Link to="/exercises">Manage Exercises</Link></Button>
        </Container>
        <Container fluid>
          <Button size="lg" color="link"><Link to="/equipments">Manage Gym Equipment</Link></Button>
        </Container>
      </div>
    );
  }
}

export default Home;