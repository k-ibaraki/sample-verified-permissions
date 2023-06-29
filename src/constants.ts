import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT ?? 3000;
export const REGION = process.env.REGION ?? 'ap-northeast-1';
export const VP_POLICY_STORE_ID = process.env.VP_POLICY_STORE_ID ?? '';
export const VP_ACTION_TYPE = process.env.VP_ACTION_TYPE ?? '';
export const VP_RESOURCE_TYPE = process.env.VP_RESOURCE_TYPE ?? '';