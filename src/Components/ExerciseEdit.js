import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class ExerciseEdit extends Component {

  emptyItem = {
    name: '',
    numReps: 0,
    numSets: 0};

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const exercise = await (await fetch(`/api/exercises/${this.props.match.params.id}`)).json();
      this.setState({item:exercise});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;

    this.setState({item});
  }

  handleSelectChange(event) {
    let item = {...this.state.item};
    this.setState({item:item});
  }

  isInvalid(item) {
    return (item.name === '' ||
            item.numReps === 0 ||
            item.numSets === 0);
  }

  handleSubmit(event) {
    const {item} = this.state;
    event.preventDefault();

    if (this.isInvalid(item)) {
      alert("ALL EXERCISE INFORMATION IS NEEDED.")
      return;
    }

    fetch('/api/exercise', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });

    this.props.history.push('/exercises');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Exercise' : 'Add Exercise'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                  onChange={this.handleChange} autoComplete="name1"/>
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="numReps">Number of Reps</Label>
              <Input type="text" name="numReps" id="numReps" value={item.numReps || ''}
                    onChange={this.handleChange} autoComplete="numreps-level1"/>
            </FormGroup>
            <FormGroup className="col-md-5 mb-3">
              <Label for="numSets">Number of Sets</Label>
              <Input type="text" name="numSets" id="numSets" value={item.numSets || ''}
                     onChange={this.handleChange} autoComplete="numsets-level1"/>
            </FormGroup>
          </div>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/exercises">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(ExerciseEdit);