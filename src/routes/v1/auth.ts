import { Router, Request, Response } from 'express';
import { login } from '../../controllers/AuthController';
import {
  createNewUser,
  DeleteUser,
  GetAllUsers,
  updateUser,
} from '../../controllers/UserController';
import authMiddleware from '../../middlewares/authMiddleware';

const router = Router();
router.get('/users', authMiddleware, GetAllUsers);
router.post('/register', authMiddleware, createNewUser);
router.put('/update/:id', authMiddleware, updateUser);
router.delete('/delete/:id', authMiddleware, DeleteUser);
router.post('/login', login);

export default router;
