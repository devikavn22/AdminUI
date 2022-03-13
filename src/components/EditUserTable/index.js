import React from 'react'
import {TiCancel} from 'react-icons/ti'
import {FaSave} from 'react-icons/fa'

import './index.css'
const EditUsersData = props => {
  const {
    editUserData,
    handleEditFormChange,
    handleCancelClick,
    handleEditFormSubmit,
  } = props
  const {name, email, role} = editUserData
  return (
    <tr>
      <td>
        <input
          placeholder="name"
          type="text"
          name="name"
          value={name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          placeholder="email"
          type="text"
          name="email"
          value={email}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          placeholder="role"
          type="text"
          name="role"
          value={role}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button
          type="submit"
          className="button save"
          onClick={handleEditFormSubmit}
        >
          <FaSave/>
        </button>
        <button
          type="button"
          className="button cancel"
          onClick={handleCancelClick}
        >
          <TiCancel />
        </button>
      </td>
    </tr>
  )
}

export default EditUsersData