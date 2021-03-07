import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import authRouter from './routes/admin/auth';
import productsRouter from './routes/admin/products';

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['tf2YN1uPWjHzPWhK3npE'],
  })
);

app.use(authRouter);
app.use(productsRouter);

app.listen(3000, () => {
  console.log("J'técoute");
});
