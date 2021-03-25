export class EvoError extends Error {}

/*
  errorFromEvo = {
    "value":"line 1, column 161",
    "code":"invalid_format",
    "message":"invalid value format for field",
    "violations":[{"reason":"недейсвительное значение","subject":"allow_to_sell"}]
  }
*/

/*
errorFromEvo = {
  code: 'validation_failed',
  message: 'validation failed for specified payload',
  violations: [
    {
      reason: 'размер должен находиться в диапазоне от 0 до 160',
      subject: 'name',
    },
  ],
};
 */

export class EvoValidationError extends EvoError {
  constructor(err) {
    let message = err.message;
    err.errors.forEach((item) => {
      message += `\n${item.subject.toUpperCase()} -> ${item.reason}`;
    });
    super(`Ошибка записи в облако!\n${message}`);
    this.name = 'EvoValidationError';
    this.errors = err.violations;
  }
}
export class EvoPutError extends EvoError {
  constructor(err) {
    let message = err.message;
    err.violations.forEach((item) => {
      message += `\n${item.subject.toUpperCase()} -> ${item.reason}`;
    });
    super(`Ошибка записи в облако!\n${message}`);
    this.name = err.code;
    this.violations = err.violations;
  }
}
