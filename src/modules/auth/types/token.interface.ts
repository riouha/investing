export interface ITokenPayload {
  sub: number;
  mobile: string;
  active: boolean;
}

export interface IRefreshTokenPayload {
  sub: number;
}
