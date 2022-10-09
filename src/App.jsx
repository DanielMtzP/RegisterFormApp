import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import FormUsers from './components/FormUsers'
import UserCard from './components/UserCard'

const baseURL = 'https://users-crud1.herokuapp.com'

function App() {

  const [users, setUsers] = useState()

  const [updateInfo, setUpdateInfo] = useState()

  const [formIsClose, setformIsClose] = useState(true)



  const getAllUsers = () => {
    const URL = `${baseURL}/users/`
    axios.get(URL)
    .then(res => setUsers(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const createNuewUser = data =>{
    const URL = `${baseURL}/users/`
    axios.post(URL, data)
    .then(res => {console.log(res.data)
      getAllUsers()
    })
    .catch(err => console.log(err))
  }

  const deleteUserById = id =>{
    const URL = `${baseURL}/users/${id}/`
    axios.delete(URL)
    .then(res => {console.log(res.data)
      getAllUsers()
    })
    .catch(err => console.log(err))
  }
  
  const updateUserById = (id, data) => {
    const URL = `${baseURL}/users/${id}/`
    axios.patch(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
 }
  const handleOpenForm = () => {
    setformIsClose(false)
 }


  return (
    <div className="App">
      <div className='app_div'>
        <h1 className='app_title'>Users CRUD</h1>
        <button onClick={handleOpenForm} className='app_btn'>Create a new user</button>
      </div>
      <div className={ `form-container ${formIsClose && 'disable_form'}`}>
        <FormUsers setUpdateInfo={setUpdateInfo} updateUserById={updateUserById} updateInfo={updateInfo} createNuewUser={createNuewUser} setformIsClose={setformIsClose}/>
      </div>
      <div className='users-container'>
        {
          users?.map(user => (
            <UserCard 
              key={user.id}
              user={user}
              deleteUserById={deleteUserById}
              setUpdateInfo={setUpdateInfo} setformIsClose={setformIsClose}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
