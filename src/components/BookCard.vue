<template>
  <v-card
    :href="`baseUrl/123/local/books/${listName}/${name}`"
    :width="200"
    :elevation="12"
  >
    <v-img :src="imgSrc"></v-img>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { generatePdfThumbnailUrl } from '../utils/createThumbnail'
import { BookData } from '../utils/typing'

const props = defineProps<BookData>()
const imgSrc = ref<string>('')
onMounted(async () => {
  imgSrc.value = await generatePdfThumbnailUrl(
    `baseUrl/p/123/local/books/${props.listName}/${props.name}`,
    props.sign
  )
})
</script>

<style scoped></style>
