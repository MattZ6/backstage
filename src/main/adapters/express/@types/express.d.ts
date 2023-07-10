declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    /**
     * The authenticated user.
     * Get by access token.
     */
    user?: {
      id: string
    }
  }
}
