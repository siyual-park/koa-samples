class NotFoundError extends Error {
  readonly status = 404;
}

export default NotFoundError;
