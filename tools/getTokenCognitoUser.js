// Usage: AWS_PROFILE={AWSプロファイル} node tools/getTokenCognitoUser.js
// Description: Cognitoユーザーのログイン認証を実行し、Access TokenとID Tokenを出力する
const readline = require("readline");
const { CognitoIdentityProviderClient, InitiateAuthCommand } = require("@aws-sdk/client-cognito-identity-provider");

async function login(username, password, clientId) {
  // AWS リージョンを設定
  const region = "ap-northeast-1";

  // CognitoIdentityProviderClient インスタンスを作成
  const client = new CognitoIdentityProviderClient({ region });

  // ユーザーのログイン認証を開始するコマンドを作成
  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  });

  try {
    // ユーザーのログイン認証を実行
    const response = await client.send(command);

    // Access TokenとID Tokenを取得
    const accessToken = response.AuthenticationResult.AccessToken;
    const idToken = response.AuthenticationResult.IdToken;

    // 出力
    console.log("Access Token:", accessToken);
    console.log("ID Token:", idToken);
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
  const clientId = await prompt("アプリクライアントIDを入力してください: ");
  const username = await prompt("ユーザー名を入力してください: ");
  const password = await prompt("パスワードを入力してください: ");
  await login(username, password, clientId);
}
run();
