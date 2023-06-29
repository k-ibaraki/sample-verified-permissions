// Usage: AWS_PROFILE={AWSプロファイル} node confirmSignUpCognito.js
// Description: Cognitoユーザーを確認済みにする

const readline = require("readline");
const {
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
  AdminSetUserPasswordCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const confirmUser = async (userpoolId, username, password) => {
  // AWS リージョンを設定
  const region = "ap-northeast-1";

  // CognitoIdentityProviderClient インスタンスを作成
  const client = new CognitoIdentityProviderClient({ region });

  // ユーザーを確認済みにする属性を作成
  const attributes = [
    {
      Name: "email_verified",
      Value: "true",
    },
  ];

  // ユーザーの属性を更新するコマンドを作成
  const updateAttCommand = new AdminUpdateUserAttributesCommand({
    UserPoolId: userpoolId,
    Username: username,
    UserAttributes: attributes,
  });

  try {
    // ユーザーの属性を更新
    const response = await client.send(updateAttCommand);
    console.log("ユーザーが確認済みになりました:", response);
  } catch (error) {
    console.error("エラー:", error);
  }


  // ユーザーのパスワードをリセットするコマンドを作成
  const pwResetCommand = new AdminSetUserPasswordCommand({
    UserPoolId: userpoolId,
    Username: username,
    Password: password,
    Permanent: true, // パスワードの変更を強制しない
  });

  try {
    // ユーザーのパスワードをリセット
    const response = await client.send(pwResetCommand);
    console.log("ユーザーのパスワード変更の強制が解除されました", response);
  } catch (error) {
    console.error("エラー:", error);
  }
}

// コマンドライン入力のためのreadlineインターフェースを作成
function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// 実行
const run = async () => {
  const userpoolId = await prompt("ユーザープールIDを入力してください: ");
  const username = await prompt("ユーザー名を入力してください: ");
  const password = await prompt("パスワードを入力してください: ");
  await confirmUser(userpoolId, username, password);
}

run();
