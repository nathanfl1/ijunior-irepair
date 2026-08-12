import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();

interface TokenPayload {
  id: number
  email: string

}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN as any, // ex: '1h', '7d', '15m'
  })
}


export function verifyToken(token: string): TokenPayload {
  // jwt.verify lança uma exceção se o token for inválido ou expirado
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload
  return decoded
}