import express, { type Express,  type Request, type Response, type NextFunction }  from "express"

import authRouter from './routes/usersRouter';
import ticketsRouter from './routes/ticketsRouter';
import commentsRouter from './routes/commentsRouter';

import historyApiFallback from "connect-history-api-fallback"

const app: Express = express()
const port: number = 3000

app.use(historyApiFallback())

app.use(express.static("dist-frontend"))
app.use(express.static("public"))

app.use(ticketsRouter)
app.use(commentsRouter)
app.use(authRouter)

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain")
  res.status(404).send("Ops... Pagina non trovata")
})

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain")
  res.status(500).send("Ops... Errore interno del server")
})

app.listen(port, function() {
  console.log(`Listening on http://localhost:${port}`)
})
