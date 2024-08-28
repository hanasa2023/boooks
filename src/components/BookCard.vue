<template>
  <v-card :href="`/${list}/${fullname}`" :width="200" :elevation="12">
    <v-img :src="`/imgs/${list}/${name}.jpg`"></v-img>
  </v-card>
</template>

<script setup lang="ts">
import { BookData } from '../utils/typing'

defineProps<BookData>()
</script>

<style scoped></style>
