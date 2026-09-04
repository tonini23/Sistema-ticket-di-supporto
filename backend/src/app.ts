import 'dotenv/config'

import express, { type Express,  type Request, type Response, type NextFunction }  from "express"

import usersRouter from './routes/usersRouter';
import ticketsRouter from './routes/ticketsRouter';
import commentsRouter from './routes/commentsRouter';
import authRouter from './routes/authRouter';

import historyApiFallback from "connect-history-api-fallback"
import cookieParser from 'cookie-parser';


const app: Express = express();
const port: number = 3000;

// Middleware 
app.use(cookieParser());
app.use(express.json());


app.use(express.static("dist-frontend"));
app.use(express.static("public"));

app.use(ticketsRouter);
app.use(commentsRouter);
app.use(usersRouter);
app.use(authRouter);

app.use(historyApiFallback());


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
