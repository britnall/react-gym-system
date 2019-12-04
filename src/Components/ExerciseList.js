import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ExerciseList extends Component {

  constructor(props) {
    super(props);
    this.state = {exercises: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/api/exercises')
      .then(response => response.json())
      .then(data => this.setState({exercises: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/exercise/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedExercises = [...this.state.exercises].filter(i => i.id !== id);
      this.setState({exercises: updatedExercises});
    });
  }

  render() {
    const {exercises, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const exerciseList = exercises.map(exercise => {
      return <tr key={exercise.id}>
        <td style={{whiteSpace: 'nowrap'}}>{exercise.name}</td>
        <td>{exercise.numReps}</td>
        <td>{exercise.numSets}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/exercise/" + exercise.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(exercise.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/exercise/new">Add Exercise</Button>
          </div>
          <h3>Exercises</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Name</th>
              <th width="20%">Number of Reps</th>
              <th width="20%">Number of Sets</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {exerciseList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ExerciseList;