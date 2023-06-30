import { VerifiedPermissionsClient, IsAuthorizedWithTokenCommand, IsAuthorizedCommand } from "@aws-sdk/client-verifiedpermissions";
import {
  VP_POLICY_STORE_ID,
  VP_ACTION_TYPE,
  VP_RESOURCE_TYPE
} from './constants'

export const vfTest = async (idToken: string, resource: string, action: string): Promise<boolean> => {
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