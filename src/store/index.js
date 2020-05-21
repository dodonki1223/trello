import Vue from 'vue'
import Vuex from 'vuex'

// Vuexの概要図については以下を参照すること
//   https://cdn.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:2500/https://www.filepicker.io/api/file/X90pm5IcSCKWbtO1zaxC
// 流れとしては以下になる
//   Actions → Mutations → State → Getters → Vue components → Actions → Mutations ……
Vue.use(Vuex)

// localStorage は保存するデータを「キーと値」のセットで扱う
const savedLists = localStorage.getItem('trello-lists')

// ストアのインスタンスを作成
// ここの箇所で以下のエラーが発生した
//   [vuex] store must be called with the new operator
//   元々、「const store = Vuex.Store({」と記述していたが「const store = new Vuex.Store({」に書き換えることでエラーがでなくなった
//   参考URL:https://forum.vuejs.org/t/an-error-comes-from-vuex/16987
const store = new Vuex.Store({
  state: {
    // localStorage にはJSON形式の文字列型でデータが保存されているため JSON.parse する必要がある
    lists: savedLists ? JSON.parse(savedLists): [
      {
        title: 'Backlog',
        cards: [
          { body: 'English' },
          { body: 'Mathematics' },
        ]
      },
      {
        title: 'Todo',
        cards: [
          { body: 'Science' }
        ]
      },
      {
        title: 'Doing',
        cards: []
      }
    ],
  },
  // ストアの状態を変更できる唯一の方法が、mutations をコミットすること
  // mutations は第一引数に state
  //             第二引数に payload(コミット時に受け取る引数を指定できる)
  //                        payloadはオブジェクト型で受け取ると複数のプロパティを受け取ることができる（推奨）
  // コンポーネントでの操作は actions で行うことが推奨されている（直接各コンポーネントから実行することが可能） 
  // 重要なルールとして `同期的でなければならない` 
  // mutations のメソッド内で非同期通信も一緒に行った場合、データの状態がいつ変更されたかを追うことができない
  // データの状態変更と非同期通信は役割で分けて考えるべき
  // mutaions はストアの状態の変更だけを行う mutaions の呼び出しは actions が行う
  mutations: {
    addList(state, payload) {
      state.lists.push({ title: payload.title, cards:[] })
    },
  },
  // actions は第一引数に context(ストアインスタンスのメソッドやプロパティを呼び出せるオブジェクト)
  //           第二引数に mutations にわたす引数
  actions: {
    addList(context, payload) {
      context.commit('addList', payload)
    },
  },
  // ストアの定義ファイルが1ファイルのみで十分なため modulesは削除し getters を定義する
  getters: {
  }
})

// subscribe は sotre のインスタンスメソッドですべての mutation の後で呼ばれます
// 第一引数 に mutation インスタンス
// 第二引数 に mutation後のデータの状態
store.subscribe((mutation, state) => {
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

// main.js でインポートできるように export default している
export default store
