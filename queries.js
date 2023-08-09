const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'API',
  password: '201102',
  port: 5432,
})


//---------- getUsers() --------
const getUsers = (request, response) => {
    pool.query('SELECT * FROM register ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//---------- getUserById() --------
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM register WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//---------- createUser() --------
  const createUser = (request, response) => {
    const { username, password } = request.body
    
    console.log(username,password)
    pool.query('INSERT INTO register (username, password) VALUES ($1, $2) RETURNING *', [username, password], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }


  //---------- updateUser() --------
  const changePass = (request, response) => {
    const id = parseInt(request.params.id)
    const {password } = request.body
  
    pool.query(
      'UPDATE register SET password = $1 WHERE id = $2',
      [password, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Pass modified with ID: ${id}`)
      }
    )
  }

  //----------
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM register WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    changePass,
    deleteUser,
  }