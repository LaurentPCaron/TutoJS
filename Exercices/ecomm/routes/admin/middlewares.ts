import { Response, Request } from 'express';
import { validationResult } from 'express-validator';

const handleErrors = (templateFunc: Function) => {
  return (req: Request, res: Response, next: any) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(templateFunc({ errors }));
    }

    next();
  };
};

export { handleErrors };
