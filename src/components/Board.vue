<template>
  <div>
    <header>
      my Trello
    </header>
    <main>
      <p class="info-line">All: 0 tasks</p>
      <!-- 
        下記のようなエラーが出た……
          17:5  error  The "ListAdd" component has been registered but not used  vue/no-unused-components 
        <list-ladd />と記述していなかったためエラーがでたようだ
        componentsとして読み込んでも使用していないとエラーになるようだ
      -->
      <list-add />
    </main>
  </div>
</template>

<script>
import ListAdd from './ListAdd.vue'

export default {
  components: {
    ListAdd
  },
}
</script>
