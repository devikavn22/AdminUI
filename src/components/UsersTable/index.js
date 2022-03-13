import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {TailSpin} from 'react-loader-spinner'
import {FailedView} from './styledComponents'
import TableItems from '../TableItems'
import EditUsersData from '../EditUserTable'
import Pagination from '../Pagination'
import './index.css'



const UsersTable = () => {
  const getUsers = () => {
    const stringifiedData = localStorage.getItem('users')
    const data = JSON.parse(stringifiedData)
    if (data === null) {
      return []
    }
    return data
  }
  const [usersData, setUsersData] = useState(
    getUsers(),
  )
  const [editUser, setNewUserData] = useState({
    name: '',
    email: '',
    role: '',
  })
  const [pageNum, setPage] = useState([])
  const [inProgress, setInProgress] = useState(false)
  const [failure, setFailure] = useState(false)
  const [editUserId, setEditUserId] = useState()
  const [activePage, setActivePage] = useState(1)
  const [members, setMembers] = useState(null)

  useEffect(() => {
    axios
      .get(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
      )
      .then(response => {
        setUsersData(response.data)
        setPage(response.data.slice(0, 10))
        setFailure(false)
        setInProgress(false)
      })
      .catch(
        (error) => {
          console.log(error)
          setInProgress(false)
          setFailure(true)
        }
      )
  }, [])

  const handlePageNum = page => {
    setActivePage(page)
    const activePage = page * 10
    const data = usersData.slice((activePage - 10), activePage)
    setPage(data)
  }

  const onDelete = id => {
    const updatedData = pageNum.filter(eachUser => eachUser.id !== id)
    setPage(updatedData)
    const changedData = usersData.filter(
      eachUser => eachUser.id !== id,
    )
    setUsersData(changedData)
  }

  const handleEditFormChange = event => {
    const editedName = event.target.getAttribute('name')
    const editedValue = event.target.value
    const editedData = {...editUser}
    editedData[editedName] = editedValue
    setNewUserData(editedData)
  }

  const handleEditFormSubmit = event => {
    event.preventDefault()
    const editedUser = {
      id: editUserId,
      name: editUser.name,
      email: editUser.email,
      role: editUser.role,
    }
    const newUsers = [...usersData]
    const index = usersData.findIndex(
      user => user.id === editUserId,
    )
    newUsers[index] = editedUser
    setUsersData(newUsers)

    const newPageData = [...pageNum]
    const pageIndex = newPageData.findIndex(
      page => page.id === editUserId,
    )
    newPageData[pageIndex] = editedUser
    setPage(newPageData)
    setEditUserId(null)
  }

  const handleEditClick = (event, user) => {
    event.preventDefault()
    setEditUserId(user.id)
    const newUserValues = {
      name: user.name,
      email: user.email,
      role: user.role,
    }
    setNewUserData(newUserValues)
  }

  const handleCancelClick = () => {
    setEditUserId(null)
  }

  const handleSearch = value => {
    filterData(value)
  }

  const handleCheck = (id) => {
    const newMembers = [...usersData]
    newMembers.forEach(user => {
      if (user.id === id) {
        user.isChecked = !user.isChecked;
      }
    })
    setMembers(members)
  }

  const filterData = value => {
    const lowerCaseData = value.toLowerCase().trim()
    if (!lowerCaseData) {
      const prevData = usersData.slice(
        activePage * 10 - 10,
        activePage * 10,
      )
      console.log('old', prevData, activePage)
      setPage(prevData)
    } else {
      const filteredData = usersData.filter(item => {
        return Object.keys(item).some(key => {
          return item[key].toString().toLowerCase().includes(lowerCaseData)
        })
      })
      setPage(filteredData)
    }
  }
  const renderLoadingView = () => (
    <div className="loader" data-testid="loader">
      <TailSpin height={50} width={50} />
    </div>
  )
  const renderFailureView=()=>(
    <FailedView>
    <h1>Not Found</h1>
    <img
              className="not-found-image"
              alt="Not-Found"
              src="https://res.cloudinary.com/deezbe2w6/image/upload/v1647087262/oops_tjnxhl.png"
              
            />
    </FailedView>
  )
  return (
    <div className="app-container">
      <div className="search-container">
        <input
          placeholder="Search by name , email or role"
          type="search"
          className="search-box"
          onChange={event => handleSearch(event.target.value)}
        />
      </div>
      {inProgress?
        renderLoadingView():failure?renderFailureView():
      <form>
        <table>
          <thead>
            <tr>
              <th>check Member</th>
              <th>name</th>
              <th>email</th>
              <th>role</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {pageNum.map(user => (
              <>
                {editUserId === user.id ? (
                  <EditUsersData
                    editUserData={editUser}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                    handleEditFormSubmit={handleEditFormSubmit}
                  />
                ) : (
                  <TableItems
                    onCheck={handleCheck}
                    user={user}
                    key={user.id}
                    handleEditClick={handleEditClick}
                    onDelete={onDelete}
                  />
                )}
              </>
            ))}
          </tbody>
        </table>
      </form>
      }
        {pageNum.length === 0 ? (
          <div className="not-found-container">
            <img
              className="not-found-image"
              alt="Not-Found"
              src="https://res.cloudinary.com/deezbe2w6/image/upload/v1647087262/oops_tjnxhl.png"
              
            />
            <h1 className="not-found">Results Not Found</h1>
          </div>
        ) : (
          <Pagination
            
            handlePageNum={handlePageNum}
            activePage={activePage}
            usersData={usersData}
          ></Pagination>
        )}
    </div>
  )
}
export default UsersTable