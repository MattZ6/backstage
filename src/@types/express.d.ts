declare namespace Express {
  interface RequestUser {
    id: string;
  }

  export interface Request {
    user: RequestUser;
  }
}
