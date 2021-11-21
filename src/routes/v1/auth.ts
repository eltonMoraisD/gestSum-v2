import { Router } from 'express';
import { login } from '../../controllers/AuthController';
import {
  CreateUser,
  DeleteUser,
  GetAllUsers,
  updateUser,
} from '../../controllers/UserController';
import authMiddleware from '../../middlewares/authMiddleware';

import { hasRole } from '../../middlewares/userRoleMiddleware';

const router = Router();
router.get('/users', hasRole(['ROLE_ADMIN']), authMiddleware, GetAllUsers);
router.post('/register', hasRole(['ROLE_ADMIN']), authMiddleware, CreateUser);
router.put('/update/:id', hasRole(['ROLE_ADMIN']), authMiddleware, updateUser);
router.delete(
  '/delete/:id',
  hasRole(['ROLE_ADMIN']),
  authMiddleware,
  DeleteUser,
);

router.post('/login', login);

export default router;
