import { VerifiedPermissionsClient, IsAuthorizedWithTokenCommand, IsAuthorizedCommand } from "@aws-sdk/client-verifiedpermissions";
import {
  VP_POLICY_STORE_ID,
  ACCESS_TOKEN,
  ID_TOKEN
} from './constants'

export const vfTest = async () => {
  console.log("start vfTest");
  console.log("VP_POLICY_STORE_ID: " + VP_POLICY_STORE_ID);
  const client = new VerifiedPermissionsClient({ region: "ap-northeast-1" });
  const command = new IsAuthorizedWithTokenCommand({
    policyStoreId: VP_POLICY_STORE_ID,
    //identityToken: ID_TOKEN,
    accessToken: ACCESS_TOKEN,
    action: {
      actionType: 'IbarakiSampleStore::Action',
      actionId: 'Get',
    },
    resource: {
      entityType: 'IbarakiSampleStore::ApiEndPoint',
      entityId: 'hello',
    },
  });

  try {
    const response = await client.send(command);
    console.log("decision: " + response.decision);
  } catch (err: any) {
    console.log("err: " + err.message);
  }
  console.log("end vfTest");
  return;
}