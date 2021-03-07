import { Result, ValidationError } from 'express-validator';

const getError = (errors: Result<ValidationError>, prop: string) => {
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    return '';
  }
};
export { getError };
