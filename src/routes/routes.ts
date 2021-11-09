import { Router } from 'express';

import page404 from './pages/404';
import pageRoot from './pages/root';

import v1 from './v1';

const router = Router();

router.use(`/v1`, v1);

router.use(page404);
router.use(pageRoot);

export default router;
