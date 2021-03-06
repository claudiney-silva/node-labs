type ApiErrorName = 'Internal' | 'NotFound' | 'BadRequest' | 'Unprocessable';

export interface ApiErrorParam {
  param?: string;
  message: string;
}

export interface ApiError {
  status: number;
  error: string;
  key?: string;
  message?: string;
  data?: ApiErrorParam[];
}

export const errors: Record<ApiErrorName, ApiError> = {
  Internal: { status: 500, error: 'Internal Server Error' },
  NotFound: { status: 404, error: 'Not Found' },
  BadRequest: { status: 400, error: 'Bad Request' },
  Unprocessable: { status: 422, error: 'Unprocessable' },
};

export default class APIError extends Error {
  public status;

  public error: string;

  public key: string;

  public data?: ApiErrorParam[];

  constructor(params?: ApiError) {
    super(params?.message);
    this.status = params?.status;
    this.error = params?.error || errors.Internal.error;
    this.key = params?.key || this.error.toUpperCase().replace(/\s/g, '_');
    this.data = params?.data;
    Error.captureStackTrace(this, this.constructor);
  }
}
