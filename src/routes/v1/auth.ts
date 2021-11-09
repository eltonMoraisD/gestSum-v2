import { Router, Request, Response } from 'express';
import {
  createNewUser,
  DeleteUser,
  GetAllUsers,
  login,
  updateUser,
} from '../../controllers/authController';
import authMiddleware from '../../middlewares/authMiddleware';

const router = Router();
router.get('/users', authMiddleware, GetAllUsers);
router.post('/register', authMiddleware, createNewUser);
router.put('/update/:id', authMiddleware, updateUser);
router.delete('/delete/:id', authMiddleware, DeleteUser);
router.post('/login', login);

export default router;
