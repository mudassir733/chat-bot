
export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);

  }
}

export class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}
export class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class ServerError extends CustomError {
  constructor(message: string) {
    super(message, 500);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnAuthorized extends CustomError {
  constructor(message: string) {
    super(message, 401);
  }
}

export type Error = CustomError & { statu?: number } 