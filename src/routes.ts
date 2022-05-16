import { Router, Request, Response } from 'express';

import { Emiter } from './emiter';

const router = Router();

router.post('/', async (request: Request, response: Response) => {
  const { body } = request;
  await Emiter(body);
  response.status(201).json();
});

export { router };