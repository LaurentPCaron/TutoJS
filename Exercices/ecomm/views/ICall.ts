import { Express } from 'express';
import { Result, ValidationError } from 'express-validator';

export default ICall;

interface ICall {
  req?: Express.Request;
  res?: Express.Response;
  errors?: Result<ValidationError>;
}
