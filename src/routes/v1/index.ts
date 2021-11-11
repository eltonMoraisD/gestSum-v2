import { Router } from 'express';

import auth from './auth';
import users from './users';
import roles from './roles';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/roles', roles);

export default router;
