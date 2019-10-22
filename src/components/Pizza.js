import React from "react"

const Pizza = (props) => {
  return(
    <tr>
      <td>{props.topping}</td>
      <td>{props.size}</td>
      <td>{props.vegetarian ? `vegetarian` : `contains meat`}</td>
      <td><button
        type="button"
        className="btn btn-primary"
        onClick={props.editBtn}
        id={props.id}
        >Edit Pizza
      </button></td>
    </tr>
  )
}

export default Pizza
