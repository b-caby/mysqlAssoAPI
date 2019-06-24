class NotFoundError extends Error {
    message = "No element found";
}

class UnexpectedError extends Error {
    message = "An unexpected error occured";
}

export { NotFoundError, UnexpectedError };