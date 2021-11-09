import {Router,Response,Request,NextFunction} from 'express'

const router = Router()

router.get('/',(req:Request,res: Response,next: NextFunction)=> {
  return res.status(200).header('Content-Type', 'text/html').send(`<h4> Resfull api boilerplate</h4>`)
})

export default router;