<template>
  <!-- 
    v-on ディレクティブでイベントをハンドルでき、 @ は v-on の省略記法になる                                                 
    .prevent はVueイベントの修飾詞であり、サブミット時にリロードされるのを防ぐ 
    v-on については https://jp.vuejs.org/v2/guide/events.html を参照してください

    class に classList() をバインドさせる
    別の書き方としてこんな感じで書くこともできる
      :class="['addcard',  { 'active': isEditing, 'addable': titleExists }]"
    : は v-bind の省略記法になる
      詳しくは https://jp.vuejs.org/v2/guide/syntax.html#%E7%9C%81%E7%95%A5%E8%A8%98%E6%B3%95 を参照してください
  -->
  <form :class="classList" @submit.prevent="addList">
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

      focusin、focusoutに関しては以下のドキュメントを確認すべし
        https://developer.mozilla.org/ja/docs/Web/API/Element/focusin_event
      下記のように記述すればmethodsを使用する必要がなくなる
        @focusin="isEditing = true"
        @focusout="isEditing = false"
    -->
    <input v-model="title"
           type="text"
           class="text-input"
           placeholder="Add new list"
           @focusin="startEditing"
           @focusout="finishEditing"
    >
    <button type="submit" 
            class="add-button"
            v-if="isEditing || titleExists">
      Add
    </button>
  </form>
</template>

<script>
export default {
  data: function() {
    return {
      title: '',
      isEditing: false,
    }
  },
  /*
    <computed と methods の使い分けについて>
    computedはキャッシュされる！！！

    computedは監視しているdataに依存しているので、そのdataが変化したときにだけ処理が実行される
    一方、methodsは再描画されたときなど呼び出されるたびに処理が実行される
    例えば、Date.now()で今日の日付を取得したり、Math.random()でランダムな数値を取得するときはキャッシュ
    が効いて一度表示された値から変わらない

    上記のそれぞれの特性から使い分けるのがよいですが、頻繁に処理が行われるものというよりは、
    dataを加工してテンプレートで使用したいという時は基本的に computed を使用する（Date.now()やMath.random()の
    ようにキャッシュが効いてほしくない時は除く）

    startEditingとfinishEditingですが@focusinと@focusoutのイベントに紐づいて処理を行なっている部分なので
    役割的にmethodsを使うことになります（データを加工して表示する部分ではない）
   */

  // dataの状態を監視できる computed
  computed: {
    // isEditing の値を監視して変更されていたら `active` の class を追加する処理
    classList() {
      const classList = ['add-list']

      if (this.isEditing)   classList.push('active')
      if (this.titleExists) classList.push('addable')

      return classList
    },
    titleExists() {
      return this.title.length > 0
    }
  },
  methods: {
    addList: function() {
      // this.$store.dispatch('アクション名') で actions を実行できます
      this.$store.dispatch('addList', { title: this.title })
      this.title = ''
    },
    startEditing() {
      this.isEditing = true
    },
    finishEditing() {
      this.isEditing = false
    },
  }
}
</script>
