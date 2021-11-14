import { Router } from 'express';
import {
  CreateUser,
  DeleteUser,
  GetAllUsers,
  GetUser,
  updateUser,
} from '../../controllers/UserController';
import authMiddleware from '../../middlewares/authMiddleware';

import { hasRole } from '../../middlewares/userRoleMiddleware';

const router = Router();

router.post('/register', hasRole(['ROLE_ADMIN']), authMiddleware, CreateUser);
router.get('/list', hasRole(['ROLE_ADMIN']), authMiddleware, GetAllUsers);
router.get('/list/:id', hasRole(['ROLE_ADMIN']), authMiddleware, GetUser);
router.put('/update/:id', authMiddleware, updateUser);
router.delete(
  '/delete/:id',
  hasRole(['ROLE_ADMIN']),
  authMiddleware,
  DeleteUser,
);

export default router;
