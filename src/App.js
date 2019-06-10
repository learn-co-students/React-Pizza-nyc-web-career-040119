import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    editPizza: {
      id: "",
      topping: "",
      size: "",
      vegetarian: false
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
      .then( res => res.json() )
      .then( pizzas => {
        this.setState({
          pizzas:pizzas
        })
      })
  }

  handleEdit= (e) => {

    const target = parseInt(e.target.id)

    const findPizza = () => {
      return this.state.pizzas.find((pizza)=> {
        return pizza.id === target
      })
    }

    this.setState({
      editPizza:{
        "id": findPizza().id,
        "topping": findPizza().topping,
        "size": findPizza().size,
        "vegetarian": findPizza().vegetarian
      }
    })

  }

  hanldeSubmit = (e) => {
    e.preventDefault
    fetch(`http://localhost:3000/pizzas/${this.state.editPizza.id}`, {
      method: 'PATCH',
       body: JSON.stringify(this.state.editPizza),
       headers:{
         'Content-Type': 'application/json',
         Accepts: 'application/json'
       }
    })
      .then(res => res.json())
      .then(newPizza => {

      const editIndex = this.state.pizzas.findIndex((pizza) => {
          return pizza.id === newPizza.id
        })

        // console.log(this.state.pizzas.splice(editIndex,1,newPizza))
        const newPizzas = [...this.state.pizzas]
        newPizzas.splice(editIndex,1,newPizza)


        this.setState({
          editPizza: {
            id: "",
            topping: "",
            size: "",
            vegetarian: false
          },
          pizzas: newPizzas
        })
        return
      })
  }

  handleTopping = (e) => {
    this.setState({
      editPizza:{
        ...this.state.editPizza,
        topping: e.target.value
      }
    })
  }

  handleSize = (e) => {
    this.setState({
      editPizza:{
        ...this.state.editPizza,
        size: e.target.value
      }
    })
  }

  handleVeg = (e) => {
    this.setState({
      editPizza:{
        ...this.state.editPizza,
        vegetarian: !this.state.editPizza.vegetarian
      }
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm
          id={this.state.editPizza.id}
          topping={this.state.editPizza.topping}
          size={this.state.editPizza.size}
          vegetarian={this.state.editPizza.vegetarian}
          changeTopping={this.handleTopping}
          changeSize={this.handleSize}
          changeVeg={this.handleVeg}
          submit={this.hanldeSubmit}
        />
        <PizzaList
          pizzas={this.state.pizzas}
          editBtn={this.handleEdit}
        />
      </Fragment>
    );
  }
}

export default App;
