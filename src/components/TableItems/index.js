import React from 'react'
import {MdDelete} from 'react-icons/md'
import {AiFillEdit} from 'react-icons/ai'


import './index.css'
const TableItems = props => {
  const {user, handleEditClick, onDelete,onCheck} = props
  const {name, email, role} = user
  const handleCheck = (id) => onCheck(id)
  return (
    <>
    <tr>
      <td><input type="checkbox" onChange={handleCheck} /></td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>
        <button
          type="button"
          className="button edit-button"
          onClick={event => handleEditClick(event, user)}
        >
          <AiFillEdit />
        </button>
        <button
          type="button"
          className="button delete-button"
          onClick={() => onDelete(user.id)}
        >
          <MdDelete />
        </button>
      </td>
    </tr>
    </>
  )
}

export default TableItems