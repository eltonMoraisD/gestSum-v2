import { Router } from 'express';
import {
  CreatePermission,
  ListAllPermissions,
} from '../../controllers/PermissionController';

import authMiddleware from '../../middlewares/authMiddleware';

const router = Router();

router.post('/create', authMiddleware, CreatePermission);
router.get('/list', authMiddleware, ListAllPermissions);

export default router;
