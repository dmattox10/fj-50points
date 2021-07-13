const express = require("express")
const connectDB = require("./config/db")
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const { APP_PORT, APP_NAME } = require("./env")

const statsRouter = require('./routes/statsRouter')

const middlewares = require('./middlewares')
const gameRouter = require("./routes/gameRouter")

const app = express()
connectDB()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/v1/play', middlewares.checkAuth, gameRouter)
app.use('/stats', statsRouter)

app.get('/', (req, res) => {
    res.send('<h2>“The code is more what you’d call ‘guidelines’ than actual rules.” – Hector Barbossa</h2>')
})
const PORT = APP_PORT || 5050
app.listen(PORT, () => console.log(`'Ello ${APP_NAME}.`))