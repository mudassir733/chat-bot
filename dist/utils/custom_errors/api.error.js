"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnAuthorized = exports.NotFoundError = exports.ServerError = exports.ConflictError = exports.ValidationError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CustomError = CustomError;
class ValidationError extends CustomError {
    constructor(message) {
        super(message, 400);
    }
}
exports.ValidationError = ValidationError;
class ConflictError extends CustomError {
    constructor(message) {
        super(message, 409);
    }
}
exports.ConflictError = ConflictError;
class ServerError extends CustomError {
    constructor(message) {
        super(message, 500);
    }
}
exports.ServerError = ServerError;
class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class UnAuthorized extends CustomError {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnAuthorized = UnAuthorized;
