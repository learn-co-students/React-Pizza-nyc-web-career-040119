import React, { Component } from 'react';
import Pizza from '../components/Pizza'

class PizzaList extends Component {
  renderPizza = () => {
    return this.props.pizzas.map(pizza => {
      return (
        <Pizza
          key={pizza.id}
          selectPizza={this.props.selectPizza}
          pizza={pizza} />
      )
    })
  }

  render() {
    console.log("PizzaList props: ", this.props.pizzas)
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
            this.renderPizza()
          }
        </tbody>
      </table>
    );
  }

}

export default PizzaList;
