# 「Vue.jsアプリケーションを Docker 化する」のページを参考にしてDocker化する
#   https://jp.vuejs.org/v2/cookbook/dockerize-vuejs-app.html
FROM node:lts-alpine

# appディレクトリを作成してカレントワーキングディレクトリとして `app` フォルダを指定する
RUN mkdir -p /app
WORKDIR /app

# `package.json` と `package-lock.json` （あれば）を両方コピーする
COPY package*.json ./

# プロジェクトの依存ライブラリをインストールする
RUN npm install

# カレントワーキングディレクトリ(つまり 'app' フォルダ)にプロジェクトのファイルやフォルダをコピーする
COPY . .
