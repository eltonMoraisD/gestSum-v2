import { Router } from 'express';
import {
  CreatePermission,
  ListAllPermissions,
} from '../../controllers/PermissionController';

import authMiddleware from '../../middlewares/authMiddleware';
import { hasRole } from '../../middlewares/userRoleMiddleware';

const router = Router();

router.post(
  '/create',
  hasRole(['ROLE_ADMIN']),
  authMiddleware,
  CreatePermission,
);
router.get(
  '/list',
  hasRole(['ROLE_ADMIN']),
  authMiddleware,
  ListAllPermissions,
);

export default router;
