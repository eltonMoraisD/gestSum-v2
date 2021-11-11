import { Router } from 'express';

import auth from './auth';
import users from './users';
import roles from './roles';
import permission from './permission';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/roles', roles);
router.use('/permission', permission);

export default router;
