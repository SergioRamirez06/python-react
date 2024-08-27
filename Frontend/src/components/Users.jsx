import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_REACT_APP_API;

export const Users = () => {
  
  const [usuarios, setUsuarios] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [editing, setEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [id, setId] = useState('');


  const { name, email, password } = usuarios;

  const onInputChagen = ({ target }) => {
    const { value, name } = target;
    setUsuarios({
      ...usuarios,
      [ name ]: value
    })

  }
 
  const handleSubmit = async(e) => {
    e.preventDefault();

    if( !editing ) {
     const res = await fetch(`${API}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
    const data = await res.json()
    console.log(data)
    } else {
      const res = await fetch(`${API}/users/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })
    }
    await getUsers();
    setUsuarios({
      name: '',
      email: '',
      password: ''
    })
    setEditing(false);
    setId('')
  }

  const getUsers = async() => {
    const res = await fetch(`${API}/users`)
    const data = await res.json()
    console.log(data)
    setUsers( data );
  }

  const deleteUsers = async(id) => {
    const userResponse = window.confirm('Estas seguro que quieres eliminar este dato?')
    if( userResponse ){
      const res = await fetch(`${API}/users/${id}`, { method: 'DELETE' })
      const data = await res.json();
      console.log(data)
      await getUsers();
    }
   
  }

  const editUsers = async(id) => {
    const res = await fetch(`${API}/users/${id}`);
    const data = await res.json();
    console.log(data)

    setEditing(true);
    setId(id);

    setUsuarios({
      name: data.name,
      email: data.email,
      password: data.password
    })


  }

  useEffect(() => {
    getUsers()
  }, [])
  
  return (
    <>
      <div className='row'>
        <div className='col-md-4'>
          <form onSubmit={ handleSubmit } className='card card-body'>

            <div className="form-group pb-2">
              <input 
                type="text"
                className='form-control'
                placeholder='Nombre'
                name='name'
                onChange={ onInputChagen } 
                value={ name }
               />
            </div>

            <div className="form-group pb-2">
              <input 
                type="email"
                className='form-control'
                placeholder='Email'
                name='email'
                onChange={ onInputChagen } 
                value={ email }
               />
            </div>

            <div className="form-group pb-2">
              <input 
                type="password"
                className='form-control'
                placeholder='Pasword'
                name='password'
                onChange={ onInputChagen } 
                value={ password }
               />
            </div>

            <button className='btn btn-dark btn-block'>
              { editing ? 'Actualizar' : 'Crear' }
            </button>

          </form>
        </div>

        <div className='col-md-6'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>name</th>
                <th>email</th>
                <th>password</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
                {
                  users.map( user => (
                    <tr key={ user._id }>
                      <td>{ user.name }</td>
                      <td>{ user.email }</td>
                      <td>{ user.password }</td>
                      <td>
                        <button 
                          className='btn btn-dark btn-sm btn-block m-2'
                          onClick={ e => editUsers(user._id) }>
                          Editar
                        </button>
                        <button 
                          className='btn btn-danger btn-sm btn-block m-2'
                          onClick={ e => deleteUsers(user._id) }>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                }           
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}
