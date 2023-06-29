import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT ?? 3000;
export const REGION = process.env.REGION ?? 'ap-northeast-1';
export const VP_POLICY_STORE_ID = process.env.VP_POLICY_STORE_ID ?? '';
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN ?? '';
// export const COGNITO_USER_POOL_ARN = process.env.COGNITO_USER_POOL_ARN ?? '';
export const ID_TOKEN = process.env.ID_TOKEN ?? '';
