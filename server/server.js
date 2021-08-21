const express = require("express")
const connectDB = require("./config/db")
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const { APP_PORT, APP_NAME } = require("./env")

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })

const statsRouter = require('./routes/statsRouter')

const middlewares = require('./middlewares')
const gameRouter = require("./routes/gameRouter")

connectDB()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(jsonParser)

app.use('/v1/play', middlewares.checkAuth, urlencodedParser, gameRouter)
app.use('/stats', statsRouter)

app.get('/', (req, res) => {
    res.send('<h2>“The code is more what you’d call ‘guidelines’ than actual rules.” – Hector Barbossa</h2>')
})
const PORT = APP_PORT || 5050
app.listen(PORT, () => console.log(`'Ello ${APP_NAME}.`))