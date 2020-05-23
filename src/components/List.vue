<template>
  <div class="list">
    <div class="list-header">
      <!-- props で定義している title の値が変更されるたびに変わります -->
      <p class="list-title">{{ title }}</p>
      <p class="list-counter">total: {{ totalCardInList }}</p>
      <!-- removeListメソッドをハンドルしている -->
      <div class="delete-list" @click="removeList">x</div>
    </div>
    <!-- 
      Vue.Draggable
        詳しくは公式サイトへ：https://github.com/SortableJS/Vue.Draggable
        <使い方>
          ----------------------------------------------------------------
          <template>
            <draggable>
              ★ここにドラッグ&ドロップさせたいコンポーネントを挿入します
            </draggable>
          </template>
          <script>
          import draggable from 'vuedraggable'

          export default {
            components: {
              draggable,
            },
          }
          </script>
          ----------------------------------------------------------------

      <template> 内でドラッグ＆ドロップさせたいコンポーネントを挟むように配置します
      ドラッグ＆ドロップさせたいコンポーネントは基本的に <draggable> の直下に置かないとドラッグ＆ドロップできません

      group 属性を使うことで他のコンポーネントへドラッグ＆ドロップさせる、または他のコンポーネントからの
      ドラッグ＆ドロップを受け付けることができる

      条件として互いのコンポーネントを同じ name にすることで実装できます
      ここでの name は cards です
     -->
    <draggable group="cards">
      <!--  
        cards を v-for ディレクティブを使って展開します
        key 属性には、一意な item.id を設定
        展開した値を v-bind ディレクティブを使ってバインドさせます
      -->
      <card v-for="(item, index) in cards"
            :body="item.body"
            :key="item.id"
            :cardIndex="index"
            :listIndex="listIndex"
      />
    </draggable>
    <card-add :listIndex="listIndex" />
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import CardAdd from "./CardAdd"
import Card from "./Card"

export default {
  components: {
    draggable,
    CardAdd,
    Card
  },
  // propsについては下記ドキュメントを参照すること
  //   https://jp.vuejs.org/v2/guide/components-props.html
  props: {
    title: {
      type: String,
      required: true
    },
    cards: {
      type: Array,
      required: true
    },
    listIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    // リスト内のカードの総数は、カードが作成されたり、削除されるごとにリアルタイムで更新される必要がある
    // 算出プロパティ (computed) は、テンプレートにデータをそのまま、表示させるのではなく、
    // データを加算や加工させたものを表示させる際に便利
    // methods 等に this.${computedで定義したプロパティ名}のように呼び出すことができます
    // 指定したデータに変更があるたびに computed は算出したデータを返してくれます
    totalCardInList() {
      return this.cards.length
    }
  },
  methods: {
    removeList: function() {
      if(confirm('本当にこのリストを削除しますか？')){
        this.$store.dispatch('removeList', { listIndex: this.listIndex })
      }
    }
  }
}
</script>
