<template>
  <v-card :width="210" :elevation="0" style="background-color: transparent">
    <v-img
      class="elevation-12 rounded-sm"
      :src="`https://cloudisk.hanasaki.tech/p/123/local/books/${listName}/${name.slice(
        0,
        name.length - 4
      )}_thumbnail.png?sign=${thumbSign}`"
      @click="goToPreview()"
    ></v-img>
    <v-card-text style="color: #ff9800" @click="downloadFile()">
      {{ name }}
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { BookData } from '../utils/typing'

const router = useRouter()

const props = defineProps<BookData>()

function goToPreview() {
  router.push(
    `/preview/${props.listName}/${props.name}/${props.sign}/${props.thumbSign}`
  )
}

function downloadFile() {
  window.open(
    `https://cloudisk.hanasaki.tech/p/123/local/books/${props.listName}/${props.name}?sign=${props.sign}`,
    '_blank'
  )
}
</script>

<style scoped></style>
