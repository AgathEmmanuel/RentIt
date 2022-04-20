export interface StandardErrorFormat {
  httpStatusCode: number;
  formatErrors(): {
    message: string;
    field?: string;
  }[]
}
