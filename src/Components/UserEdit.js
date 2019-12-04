import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class UserEdit extends Component {

  emptyItem = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    insurance: '',
    username: '',
    password: '',
    userType: 'CUSTOMER',
    activeStatus: 'ACTIVE'
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      userinfoHidden: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleActiveSelectChange = this.handleActiveSelectChange.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const user = await (await fetch(`/api/user/${this.props.match.params.id}`)).json();
      let isHidden = (user.userType === 'CUSTOMER');
      this.setState({item:user, userinfoHidden:isHidden });
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
    item.userType = event.target.value;
    let isHidden = (item.userType === 'CUSTOMER');

    this.setState({item:item, userinfoHidden:isHidden});
  }

  handleActiveSelectChange(event) {
    let item = {...this.state.item};
    item.activeStatus = event.target.value;

    this.setState({item:item});
  }

  isInvalid(item) {
    if (item.userType=== 'CUSTOMER') {
      return (item.name === '' ||
              item.email === '' ||
              item.phone === '' ||
              item.address === '' ||
              item.city === '' ||
              item.state === '' ||
              item.postalCode === '' ||
              item.insurance === '');
    } else {
      return (item.name === '' ||
              item.email === '' ||
              item.phone === '' ||
              item.address === '' ||
              item.city === '' ||
              item.state === '' ||
              item.postalCode === '' ||
              item.insurance === '' ||
              item.username === '' ||
              item.password === '');
    }
  }

  handleSubmit(event) {
    const {item} = this.state;
    event.preventDefault();

    if (this.isInvalid(item)) {
      alert("ALL USER INFORMATION IS NEEDED.")
      return;
    }
 
    fetch('/api/user', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });

    this.props.history.push('/users');
  }

  render() {
    const {item} = this.state;
    const userinfoHidden = this.state.userinfoHidden;
    const title = <h2>{item.id ? 'Edit User' : 'Add User'}</h2>;
    const statusHiden = ! this.state.userinfoHidden;


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
              <Label for="email">Email</Label>
              <Input type="text" name="email" id="email" value={item.email || ''}
                    onChange={this.handleChange} autoComplete="email-level1"/>
            </FormGroup>
            <FormGroup className="col-md-5 mb-3">
              <Label for="phone">Phone</Label>
              <Input type="text" name="phone" id="phone" value={item.phone || ''}
                     onChange={this.handleChange} autoComplete="phone-level1"/>
            </FormGroup>
          </div>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" value={item.address || ''}
                   onChange={this.handleChange} autoComplete="address-level1"/>
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="city">City</Label>
              <Input type="text" name="city" id="city" value={item.city || ''}
                    onChange={this.handleChange} autoComplete="city-level1"/>
            </FormGroup>
            <FormGroup className="col-md-5 mb-3">
              <Label for="state">State</Label>
              <Input type="text" name="state" id="state" value={item.state || ''}
                     onChange={this.handleChange} autoComplete="state-level1"/>
            </FormGroup>
            <FormGroup className="col-md-3 mb-3">
              <Label for="postalCode">Postal Code</Label>
              <Input type="text" name="postalCode" id="postalCode" value={item.postalCode || ''}
                     onChange={this.handleChange} autoComplete="postal-level1"/>
            </FormGroup>
          </div>
          <FormGroup>
            <Label for="insurance">Insurance</Label>
            <Input type="text" name="insurance" id="insurance" value={item.insurance || ''}
                   onChange={this.handleChange} autoComplete="insurance-level1"/>
          </FormGroup>
          <div className="row">
          <FormGroup className="col-md-4 mb-3">
          <Label for="userType">User Type</Label>{' '}
            <select onChange={this.handleSelectChange} value={item.userType || 'CUSTOMER'}>
              <option value={'CUSTOMER'}>Customer</option>
              <option value={'MANAGER'}>Manager</option>
              <option value={'TRAINER'}>Trainer</option>
            </select>
          </FormGroup>
          <FormGroup className="col-md-5 mb-3">
          <Label for="userType" hidden={statusHiden}>Membership Status</Label>{' '}
            <select onChange={this.handleActiveSelectChange} value={item.activeStatus || 'ACTIVE'} hidden={statusHiden}>
              <option value={'ACTIVE'}>Active</option>
              <option value={'INACTIVE'}>Inactive</option>
            </select>
          </FormGroup>
          </div>
          <div className="row">
          <FormGroup className="col-md-4 mb-3">
            <Label hidden={userinfoHidden} for="username">Username</Label>
            <Input hidden={userinfoHidden} type="text" name="username" id="username" value={item.username || ''}
                  onChange={this.handleChange} autoComplete="username-level1"/>
          </FormGroup>
          <FormGroup className="col-md-5 mb-3">
            <Label hidden={userinfoHidden} for="password">Password</Label>
            <Input hidden={userinfoHidden} type="text" name="password" id="password" value={item.password || ''}
                  onChange={this.handleChange} autoComplete="password-level1"/>
          </FormGroup>
          </div>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/users">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(UserEdit);