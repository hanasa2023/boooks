<template>
  <div class="bg">
    <iframe :src="pdfSrc" frameborder="0"></iframe>
  </div>
</template>

<script setup lang="ts">
import { BookData } from '../utils/typing'

const props = defineProps<BookData>()
const pdfSrc = `https://g.alicdn.com/teambition/pdfviewer/1.2.0/index.html?https://cloudisk.hanasaki.tech/p/123/local/books/${props.listName}/${props.name}?sign=${props.sign}`
</script>

<style scoped>
.bg {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/Anime-Room.png');
  background-size: cover;
}

iframe {
  width: 80%;
  height: 80%;
}
</style>
