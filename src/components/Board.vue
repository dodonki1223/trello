<template>
  <div>
    <header>
      my Trello
    </header>
    <main>
      <p class="info-line">All: {{ totalCardCount }} tasks</p>
      <div class="list-index">
        <!-- 
          v-for を使う時、key属性を与えることが必須である
            公式のスタイルガイド：https://jp.vuejs.org/v2/style-guide/#%E3%82%AD%E3%83%BC%E4%BB%98%E3%81%8D-v-for-%E5%BF%85%E9%A0%88
            index のように要素が削除された場合、値が変わってしまうものではなく、item.id のように一意で変わることがない値を設定すること
            強く推奨されている
          :title は v-bind の省略記法

          List コンポーネントの呼び出し 
        -->
        <list v-for="(item, index) in lists"
              :key="item.id"
              :title="item.title"
              :cards="item.cards"
              :listIndex="index"
        />
        <!-- 
          下記のようなエラーが出た……
            17:5  error  The "ListAdd" component has been registered but not used  vue/no-unused-components 
          <list-ladd />と記述していなかったためエラーがでたようだ
          componentsとして読み込んでも使用していないとエラーになるようだ

          ListAdd コンポーネントの呼び出し
        -->
        <list-add />
      </div>
    </main>
  </div>
</template>

<script>
import ListAdd from './ListAdd.vue'
import List from './List.vue'
import { mapState } from 'vuex'

export default {
  components: {
    ListAdd,
    List,
  },
  computed: {
    // store/index.js の state の lists を computed プロパティで取得する
    // state をそのまま取得するので mapStateヘルパー を使用します
    //   詳しくは https://vuex.vuejs.org/ja/guide/state.html#mapstate-%E3%83%98%E3%83%AB%E3%83%91%E3%83%BC
    // store/index.js で定義した state に this.$store.state でアクセスすることができるが複数記述する場合、
    // 冗長になるため mapState を使用する
    // state で `定義されたデータの名前と同じ名前の文字列` で state を呼び出すことができる
    // 
    // オブジェクトスプレッド演算子（...の部分です）を使っているのは、computedのローカルのオブジェクトと一緒に定義できるようにするため
    // そもそも、computedにはオブジェクトを渡さないといけないルールがあり、 mapStateはこのオブジェクトスプレッド演算子
    // を使わないと、オブジェクトを持ったオブジェクト（ネストされた状態）を返してしまい、computedはmapStateに定義された値を参照できない
    // 
    // computedにストアのstateからのデータと、ローカルでの算出データを両方定義する場合には、このように書く必要がある
    // stateのlistsの状態が変わるたびにコンポーネントでcomputedがlistsを返す仕組みが完成
    ...mapState([
      'lists'
    ]),
    totalCardCount() {
      return this.$store.getters.totalCardCount
    }
  },
}
</script>
