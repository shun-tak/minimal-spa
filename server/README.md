# SPAのサーバーサイド

## LambdaとAPI Gateway

Blue printからmicroservice-http-endpointとして作成。
関数をインラインで編集する。内容は[counter.js](counter.js)を参照。

API GatewayのCORSを有効にしておく。[参考](http://dev.classmethod.jp/cloud/aws/amazon-api-gateway-cors/)

## DynamoDB

`spa_counter`テーブルを作成し、以下のデータを作成したテーブルに追加しておく。
```
{
  id: '1',
  num: 0
}
```

## テスト

API GatewayのHTTPメソッドを切り替えながら動作を確認する。

- GET…データ取得
- POST…`num`をインクリメント
- DELETE…`num`を0にリセット
