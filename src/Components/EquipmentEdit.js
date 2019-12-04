import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class EquipmentEdit extends Component {

  emptyItem = {
    name: '',
    quantity: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const equipment = await (await fetch(`/api/equipment/${this.props.match.params.id}`)).json();
      this.setState({item:equipment});
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

  isInvalid(item) {
    return (item.name === '' ||
            item.quantity === 0);
  }

  handleSubmit(event) {
    const {item} = this.state;
    event.preventDefault();

    if (this.isInvalid(item)) {
      alert("ALL EQUIPMENT INFORMATION IS NEEDED.")
      return;
    }
 
    fetch('/api/equipment', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });

    this.props.history.push('/equipments');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Equipment' : 'Add Equipment'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                  onChange={this.handleChange} autoComplete="name1"/>
          </FormGroup>
          <FormGroup className="col-md-5 mb-3">
              <Label for="quantity">Quantity</Label>
              <Input type="text" name="quantity" id="quantity" value={item.quantity || ''}
                     onChange={this.handleChange} autoComplete="quantity-level1"/>
            </FormGroup>
          </div>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/equipments">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(EquipmentEdit);