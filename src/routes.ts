import { Router } from 'express';

import { Emiter } from './emiter';

const router = Router();

router.get('/', async (req, res) => {
  await Emiter();
  res.send('Hello World!');
});

export { router };