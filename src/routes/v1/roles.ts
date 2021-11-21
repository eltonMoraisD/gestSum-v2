import { Router } from 'express';
import { CreateRole, ListAllRoles } from '../../controllers/RoleController';

import authMiddleware from '../../middlewares/authMiddleware';
import { hasRole } from '../../middlewares/userRoleMiddleware';

const router = Router();

router.post('/create', hasRole(['ROLE_ADMIN']), authMiddleware, CreateRole);
router.get('/list', hasRole(['ROLE_ADMIN']), authMiddleware, ListAllRoles);

export default router;
