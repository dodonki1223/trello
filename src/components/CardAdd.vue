<template>
  <!-- サブミット時に addCardToList メソッドをハンドルしています -->
  <form class="addcard" @submit.prevent="addCardToList">
    <!-- v-model に body を定義することで、 data プロパティとバインドさせます -->
    <input v-model="body"
           type="text"
           class="text-input"
           placeholder="Add new card"
    />
    <button type="submit" class="add-button">
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
    }
  },
  methods: {
    addCardToList: function() {
      // dispatch で actions に定義した addCardToList を実行します
      this.$store.dispatch('addCardToList', { body: this.body, listIndex: this.listIndex })
      this.body = ''
    }
  }
}
</script>
