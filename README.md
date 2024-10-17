# konekti

## branch ルール

- `main` はリリース用
~~- `dev` は開発用~~
- 開発する際は、**1つの作業毎**に ~~`dev`~~ ブランチからブランチを切る
  - `main` から切って構いません
- ブランチ命名規則

    ```
    {GitHubユーザ名}-{feature | fix}-{内容}
    ```

    例:

    - kuroyei が通知機能開発: `kuroyei-feature-notification`
    - kuroyei が通知機能修正: `kuroyei-fix-notification`

- マージテストを行い、仕様通りに動いたらマージする (->`main`)

## commit ルール

- コミットメッセージは3行構成

    - 1行目 : コミット種別: 要約
    - 2行目 : 空行
    - 3行目 : 詳細や理由

    - コミット種別

        | commit種別 | 内容                           |
        | ---------- | ------------------------------ |
        | fix        | バグ修正                       |
        | hotfix     | クリティカル（深刻）なバグ修正 |
        | add        | 新規（ファイル）機能追加       |
        | update     | 機能修正（バグではない）       |
        | change     | 仕様変更                       |
        | clean      | 整理（リファクタリング等）     |
        | disable    | 無効化（コメントアウト等）     |
        | remove     | 削除（ファイル）               |
        | upgrade    | バージョンアップ               |
        | revert     | 変更取り消し                   |
    
    例:

    ```
    update: 通知メッセージを上から刺す形にしてタップができない範囲を少なくした。

    仕様上、アニメーションのある場所は押せないようになってるので難しいかもしれない
    ```
