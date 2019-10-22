import React from "react"

const PizzaForm = (props) => {
  const {id, topping, size, vegetarian} = props.currentPizza

  return (
      <div className="form-row">
        <div className="col-5">
            <input
              type="text"
              data-id="topping"
              className="form-control"
              placeholder="Pizza Topping"
              onChange={event => props.updatePizzaTopping(event)}
              value={
                topping
              }/>
        </div>
        <div className="col">
          <select
            value={size}
            onChange={event => props.updatePizzaSize(event)}
            className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onChange={event => props.updatePizzaVeg(event)}
              value="true"
              checked={vegetarian === JSON.parse("true")}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="false"
              onChange={event => props.updatePizzaVeg(event)}
              checked={vegetarian === JSON.parse("false")}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={() => props.submitUpdate()}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
