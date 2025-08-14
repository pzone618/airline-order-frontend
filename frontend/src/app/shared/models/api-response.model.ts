// ?? API ????
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// Token ????
export interface TokenData {
  token: string;
}
