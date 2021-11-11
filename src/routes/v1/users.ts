import { Router } from 'express';
import {
  createNewUser,
  DeleteUser,
  GetAllUsers,
  updateUser,
} from '../../controllers/UserController';
import authMiddleware from '../../middlewares/authMiddleware';

const router = Router();

router.post('/register', authMiddleware, createNewUser);
router.get('/list', authMiddleware, GetAllUsers);
router.put('/update/:id', authMiddleware, updateUser);
router.delete('/delete/:id', authMiddleware, DeleteUser);

export default router;
