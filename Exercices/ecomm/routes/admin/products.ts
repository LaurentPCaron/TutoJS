import express from 'express';
import multer from 'multer';

import { handleErrors } from './middlewares';
import productsRep from '../../repositories/products';
import productsNewTemplate from '../../views/admin/products/new';
import { requireTitle, requirePrice } from './validators';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', (req, res) => {});

router.get('/admin/products/new', (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  '/admin/products/new',
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  async (req: express.Request, res: express.Response) => {
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;

    await productsRep.create({ title, price, image });

    res.send('SUBMITED');
  }
);

export default router;
