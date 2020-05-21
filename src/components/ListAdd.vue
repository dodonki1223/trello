<template>
  <!-- 
    v-on ディレクティブでイベントをハンドルでき、 @ は v-on の省略記法になる                                                 
    .prevent はVueイベントの修飾詞であり、サブミット時にリロードされるのを防ぐ 
  -->
  <form class="addlist" @submit.prevent="addList">
    <!-- 
      v-model に titleを定義することで、 data プロパティとバインドさせます 
      データをバインドさせる（データバインディング）とは、scriptで定義した data プロパティをテンプレート
      でもリアルタイムにそのまま共有（紐付け）できるような仕組みです
      v-model は v-on と v-bind の２つの機能を持ち合わせている

      下記は同じ実装になる
        <input v-model="title">
        <input :value="title" @input"title = $event.target.value">
      :value="title" でスクリプト内の data プロパティで定義した title を <input> の value 属性と紐付けています
      @input"title = $event.target.value" で <input> フォームに値が入力された際にその値を title に代入します

      v-model は input、select、textareaなどのフォーム要素に対して使用することができる
    -->
    <input v-model="title"
           type="text"
           class="text-input"
           placeholder="Add new list"
    >
    <button type="submit" class="add-button">
      Add
    </button>
  </form>
</template>

<script>
export default {
  data: function() {
    return {
      title: '',
    }
  },
  methods: {
    addList: function() {
      // this.$store.dispatch('アクション名') で actions を実行できます
      this.$store.dispatch('addlist', { title: this.title })
      this.title = ''
    },
  }
}
</script>
