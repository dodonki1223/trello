<template>
  <div class="list">
    <div class="list-header">
      <!-- props で定義している title の値が変更されるたびに変わります -->
      <p class="list-title">{{ title }}</p>
      <!-- removeListメソッドをハンドルしている -->
      <div class="delete-list" @click="removeList">x</div>
    </div>
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
    <card-add :listIndex="listIndex" />
  </div>
</template>

<script>
import CardAdd from "./CardAdd"
import Card from "./Card"

export default {
  components: {
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
  methods: {
    removeList: function() {
      if(confirm('本当にこのリストを削除しますか？')){
        this.$store.dispatch('removeList', { listIndex: this.listIndex })
      }
    }
  }
}
</script>