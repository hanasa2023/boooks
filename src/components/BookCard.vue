<template>
  <v-card :href="`/apis/${listName}/${fullName}`" :width="200" :elevation="12">
    <v-img :src="`/apis/imgs/${listName}/${name}.webp`"></v-img>
  </v-card>
</template>

<script setup lang="ts">
import { BookData } from '../utils/typing'

defineProps<BookData>()
</script>

<style scoped></style>
