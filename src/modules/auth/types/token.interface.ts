export interface ITokenPayload {
  sub: number;
  phone: string;
  active: boolean;
}

export interface IRefreshTokenPayload {
  sub: number;
}
