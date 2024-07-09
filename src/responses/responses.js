// utils/responses.js

function success(message = "", data = {}) {
    return {
        status: 200,
        success: true,
        message: message,
        data: data
    };
}

function badRequest(message = "", data = {}, error = "") {
    return {
        status: 400,
        success: false,
        message: message,
        data: data,
        error: error,
    };
}

function notFound(message = "", data = {}) {
    return {
        status: 404,
        success: false,
        message: message,
        data: data,
    };
}

function validationError(message = "", data = {}, error = "") {
    return {
        status: 422,
        success: false,
        message: message,
        data: data,
        error: error,
    };
}

function serverError(message = "", data = {}, error = "") {
    return {
        status: 500,
        success: false,
        message: message,
        data: data,
        error: error,
    };
}

function failAuthorization(message = "", data = {}, error = "") {
    return {
        status: 400,
        success: false,
        message: message,
        data: data,
        error: error,
    };
}

function forbidden(message = "", data = {}, error = "") {
    return {
        status: 403,
        success: false,
        message: message,
        data: data,
        error: error,
    };
}

function conflictError(message = "", data = {}, error = "") {
    return {
        status: 409,
        success: false,
        message: message,
        data: data,
        error: error,
    };
}

function invalidToken(message = "", data = {}, error = "") {
    return {
        status: 401,
        success: false,
        message: message,
        data: data,
        error: error,
    };
}

module.exports = {
    success,
    badRequest,
    notFound,
    validationError,
    serverError,
    failAuthorization,
    forbidden,
    conflictError,
    invalidToken,
};
