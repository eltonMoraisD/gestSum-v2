import cors from  'cors'
import express, {Errback,NextFunction,request,Request,Response} from 'express'
import morgan from 'morgan'

import routes from './routes/routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('tiny'))

app.use(routes)

app.use((req: Request, res: Response, next: NextFunction)=> {
  return res.status(404).json({message: 'Page Not Found'})
})

app.use((err: Errback,req: Request, res: Response, next: NextFunction)=> {
  return res.status(500).json({message: "Internal Error"})
})

export default app