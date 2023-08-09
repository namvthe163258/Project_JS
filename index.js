const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', (request, response) => {
  response.json({ info: 'Hello World' })
})


app.get('/register', db.getUsers)
app.get('/register/:id', db.getUserById)
app.post('/register', db.createUser)
app.put('/register/:id', db.changePass)
app.delete('/register/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


