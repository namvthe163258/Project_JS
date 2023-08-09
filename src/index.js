const express = require('express')
const bodyParser = require('body-parser')
const configViewEngine = require('./config/viewEngine')
const register = require('./routes/web')
const port = 3000


const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// config template engine
configViewEngine(app)

app.use('/route', register)




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


