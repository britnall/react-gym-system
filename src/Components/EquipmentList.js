import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class EquipmentList extends Component {

  constructor(props) {
    super(props);
    this.state = {equipment: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/api/equipments')
      .then(response => response.json())
      .then(data => this.setState({equipment: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/equipment/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedEquipment= [...this.state.equipment].filter(i => i.id !== id);
      this.setState({equipment: updatedEquipment});
    });
  }

  render() {
    const {equipment, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const equipmentList = equipment.map(equipment => {
      return <tr key={equipment.id}>
        <td style={{whiteSpace: 'nowrap'}}>{equipment.name}</td>
        <td>{equipment.quantity}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/equipment/" + equipment.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(equipment.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/equipment/new">Add Equipment</Button>
          </div>
          <h3>Gym Equipment</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Name</th>
              <th width="20%">Quantity</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {equipmentList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default EquipmentList;