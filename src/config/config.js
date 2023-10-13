import dotenv from 'dotenv';

dotenv.config();

export const PORT= 8000
export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR;
export const SECRET_KEY_SESSION= process.env.SECRET_KEY_SESSION
export const JWT_SECRET= process.env.JWT_SECRET
export const CLIENT_ID_GITHUB= process.env.CLIENT_ID_GITHUB
export const CLIENT_SECRET_GITHUB= process.env.CLIENT_SECRET_GITHUB
export const ADMIN_EMAIL= process.env.ADMIN_EMAIL
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
export const PERSISTENCE= process.env.PERSISTENCE
