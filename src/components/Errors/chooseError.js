import {
  SequelizeValidationError,
  SequelizeUniqueConstraintError,
} from './SequelizeErrors';
import { /* EvoError, */ EvoValidationError, EvoPutError } from './EvoErrors';

/*
  errorFromEvo = {
    "value":"line 1, column 161",
    "code":"invalid_format",
    "message":"invalid value format for field",
    "violations":[{"reason":"недейсвительное значение","subject":"allow_to_sell"}]
  }
*/

export const chooseError = (err) => {
  if (err?.response) {
    let res = err.response;
    if (res.data?.name === 'SequelizeValidationError') {
      return new SequelizeValidationError(res.data.errors);
    } else if (
      res.data.name &&
      res.data.name === 'SequelizeUniqueConstraintError'
    ) {
      return new SequelizeUniqueConstraintError(res.data.errors);
    } else if (res.data?.code === 'validation_failed') {
      return new EvoValidationError({
        message: res.data.message,
        errors: res.data.errors,
      });
    } else {
      return new EvoPutError(res.data);
    }
  }
};
