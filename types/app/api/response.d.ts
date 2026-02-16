export interface ResponseApi<T> {
  message: string;
  status: "success" | "error";
  data: T;
}

export interface ResponseApiError {
  message: string;
  status: "error";
}
