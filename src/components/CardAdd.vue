<template>
  <!-- サブミット時に addCardToList メソッドをハンドルしています -->
  <form :class="classList" @submit.prevent="addCardToList">
    <!-- v-model に body を定義することで、 data プロパティとバインドさせます -->
    <input type="text"
           class="text-input"
           v-model="body"
           placeholder="Add new card"
           @focusin="startEditing"
           @focusout="finishEditing"
    />
    <!-- フォームが活性の時(isEditing)、テキストが入力された時(bodyExists)のどちらかが true の時だけ表示される -->
    <button type="submit"
            class="add-button"
            v-if="isEditing || bodyExists">
      Add
    </button>
  </form>
</template>

<script>
export default {
  props: {
    listIndex: {
      type: Number,
      required: true,
    }
  },
  data: function() {
    return {
      body: '',
      isEditing: false,
    }
  },
  computed: {
    classList() {
      const classList = ['addcard']
      if (this.isEditing) classList.push('active')
      if (this.bodyExists) classList.push('addable')
      return classList
    },
    bodyExists() {
      return this.body.length > 0 
    }
  },
  methods: {
    addCardToList: function() {
      // dispatch で actions に定義した addCardToList を実行します
      this.$store.dispatch('addCardToList', { body: this.body, listIndex: this.listIndex })
      this.body = ''
    },
    startEditing: function() {
      this.isEditing = true
    },
    finishEditing: function() {
      this.isEditing = false
    },
  }
}
</script>
