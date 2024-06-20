export interface PageResponse<T> {
  data: {
    data: T;
    total: number;
  };
}
