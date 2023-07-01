import { VerifiedPermissionsClient, IsAuthorizedWithTokenCommand, IsAuthorizedCommand } from "@aws-sdk/client-verifiedpermissions";
import {
  VP_POLICY_STORE_ID,
  VP_ACTION_TYPE,
  VP_RESOURCE_TYPE
} from './constants'
import { Request, Response, NextFunction } from 'express'

export const verifiedPermissionsAuth = async (req: Request, res: Response, next: NextFunction) => {
  // AuthorizationヘッダからidTokenを取得
  const idToken = req.headers.authorization?.replace("Bearer ", "") ?? "";
  // Pathを取得(/は除く)
  const resource = req.path.replace("/", "");
  // Methodを取得
  const action = req.method;
  // 認可判定
  try {
    if (await isAuthorized(idToken, resource, action)) {
      // 認可OK
      next();
    } else {
      // 認可NG
      res.status(403).send("Not Authorized");
    }
  } catch (e: any) {
    // なにかエラーが出たら401
    res.status(401).send(e.message);
  }
}

const isAuthorized = async (idToken: string, resource: string, action: string): Promise<boolean> => {
  const client = new VerifiedPermissionsClient({ region: "ap-northeast-1" });
  const command = new IsAuthorizedWithTokenCommand({
    policyStoreId: VP_POLICY_STORE_ID,
    identityToken: idToken,
    action: {
      actionType: VP_ACTION_TYPE,  // ex: SampleStore::Action
      actionId: action,  // ex: Get
    },
    resource: {
      entityType: VP_RESOURCE_TYPE, // ex: SampleStore::ApiEndPoint
      entityId: resource, // ex: hello
    },
  });

  try {
    // verified permissions を使って認可判定
    const response = await client.send(command);
    console.log("decision: " + response.decision);
    return (response.decision == 'ALLOW');
  } catch (err: any) {
    console.log("err: " + err.message);
    throw err;
  }
}