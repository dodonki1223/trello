<template>
  <div class="list">
    <div class="listheader">
      <!-- props で定義している title の値が変更されるたびに変わります -->
      <p class="list-title">{{ title }}</p>
      <!-- removeListメソッドをハンドルしている -->
      <div class="deletelist" @click="removeList">x</div>
    </div>
  </div>
</template>

<script>
export default {
  // propsについては下記ドキュメントを参照すること
  //   https://jp.vuejs.org/v2/guide/components-props.html
  props: {
    title: {
      type: String,
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
