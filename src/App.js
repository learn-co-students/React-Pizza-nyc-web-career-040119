import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
const API = 'http://localhost:3000/pizzas'

class App extends Component {
  state = {
    pizzas: [],
    currentPizza: {
      size: "Small",
      vegetarian: false
    }
  }

  componentDidMount() {
    fetch(API)
      .then(r => r.json())
      .then(pizzas => {
        this.setState({ pizzas })
      })
  }

  // HELPER FUNCTIONS
  selectPizza = (event) => {
    // console.log("click", event.target.id)
    const pizzaCopy = [...this.state.pizzas]
    const clickPizza = pizzaCopy.find(pizza => pizza.id === parseInt(event.currentTarget.id))

    this.setState({
      currentPizza: clickPizza,
    })
  } // end selectPizza

  // updatePizza
  updatePizzaTopping = (event) => {
    this.setState({
      currentPizza: {
        ...this.state.currentPizza,
        topping: event.currentTarget.value
      }
    })
  }
  updatePizzaSize = (event) => {
    this.setState({
      currentPizza: {
        ...this.state.currentPizza,
        size: event.currentTarget.value
      }
    })
  }
  updatePizzaVeg = (event) => {
    this.setState({
      currentPizza: {
        ...this.state.currentPizza,
        vegetarian: JSON.parse(event.currentTarget.value)
        // JSON.parse converts a string to boolean
      }
    })
  }
  submitUpdate = () => {
    const pizzaCopy = [...this.state.pizzas]
    const currentCopy = {...this.state.currentPizza}

    // filters out the currentPizza
    const updatePizza = pizzaCopy.filter(pizza => {
      return pizza.topping !== currentCopy.topping
    })

    fetch(API + `/${currentCopy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        topping: currentCopy.topping,
        size: currentCopy.size,
        vegetarian: currentCopy.vegetarian
      })
    })
      .then(r => r.json())
      .then(pizza => {
        this.setState({
          pizzas: [pizza, ...updatePizza]
        })
      })

  }
  // end updatePizza
  // end HELPER FUNCTIONS

  render() {
    console.log("App state: ", this.state)
    return (
      <Fragment>
        <Header/>
        <PizzaForm
          updatePizzaTopping={this.updatePizzaTopping}
          updatePizzaSize={this.updatePizzaSize}
          updatePizzaVeg={this.updatePizzaVeg}
          submitUpdate={this.submitUpdate}
          currentPizza={this.state.currentPizza} />
        <PizzaList
          selectPizza={this.selectPizza}
          pizzas={this.state.pizzas} />
      </Fragment>
    );
  }
}

export default App;
