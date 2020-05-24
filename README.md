# trello

Techpitにて公開されている [Vue.js/Vuexを使ってTrello風アプリを作成しよう！](https://www.techpit.jp/p/vue-js-vuex-trello) の写経用リポジトリです  
さらにカリキュラム終了後にDocker化して開発がしやすいようにカスタマイズしています

![00_trello](https://raw.githubusercontent.com/dodonki1223/image_garage/master/trello/00_trello.gif)

## 環境

環境については以下の通りである

| 環境    | バージョン  |
|:--------|:-----------:|
| Node.js | 12.16.3     |
| Vue.js  | 2.6.11      |
| Vuex    | 3.4.0       |

## 開発

基本的にdockerを使用して開発を行います  
開発用に `trello`、`runner` の2つのサービスを作成しているのでこの2つのサービスを使用して開発を行っていきます

### trelloを起動する

下記コマンドを実行後、[http://localhost:8080/](http://localhost:8080/) にアクセスしてください

```shell
$ docker-compose up trello
```

### runnerを起動する

`npm i hogehoge --save` や `npm run lint` などのコマンドを実行するためのサービスになります

```shell
$ docker-compose run --rm runner
```

### Vuexについて

このプロジェクトではVuexを使用しているのでVuexの概念をちゃんと図で頭に入っているとすごく理解しやすい  
詳しくは公式のドキュメントを参照すること  

- [Vuex とは何か？ | Vuex](https://vuex.vuejs.org/ja/)

![Vuexの概念](https://cdn.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:2500/https://www.filepicker.io/api/file/l4FvH7cSZKEmv6OpVxts)
