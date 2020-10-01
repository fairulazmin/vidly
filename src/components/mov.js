import React from 'react'

const Mov = (props) => {
  return (
    <tr>
      <td>{props.movie.title}</td>
      <td>{props.movie.genre.name}</td>
      <td>{props.movie.numberInStock}</td>
      <td>{props.movie.dailyRentalRate}</td>
      <td>
        <button className='btn btn-sm btn-danger'
          onClick={() => props.onDelete(props.movie._id)}>Delete</button>
      </td>
    </tr>
  )
}

export default Mov