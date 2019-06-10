import React, { Component } from 'react';
import Pizza from '../components/Pizza'

class PizzaList extends Component {

  pizzasList = () => {
    return this.props.pizzas.map( (pizza) => {
      return <Pizza
                id={pizza.id}
                key={pizza.id}
                topping={pizza.topping}
                size={pizza.size}
                vegetarian={pizza.vegetarian}
                editBtn={this.props.editBtn}
              />
    })
  }

  render() {

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {
            this.pizzasList()
          }
        </tbody>
      </table>
    );
  }

}

export default PizzaList;
