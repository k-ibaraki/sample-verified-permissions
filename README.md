# sample-verified-permissions

Verified Permissions を試すために適当に作ったレポジトリー
APIが呼び出された時に、Verified Permissionsに問い合わせて認可する

## インストール
```sh
npm install
```

## API起動
```sh
npm run start
```

## Verified Permissionsを試す

1. Cognitoのユーザープールを構築する
2. Cognitoにカスタム属性roleを設定する
3. Verified Permissionsを構築する
4. Cognitoにログインして、idTokenを取得する
5. このAPI`http://localhost:3000/hello`を呼び出す。この時`Authorization`ヘッダーにidTokenをセットする。
6. Cognitoのカスタム属性roleが`hello`の人だけ、ALLOWされてAPIが実行される

## その他

### cognito関連ツール

cognitoのユーザーを確認済にする
```sh
npm run tools:cognito:confirm
```

cognitoにログインしてidTokenを取得
```sh
npm run tools:cognito:getToken
```
