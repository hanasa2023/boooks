<template>
  <div class="bg">
    <v-container>
      <v-row>
        <v-col
          :cols="reactiveCols"
          v-for="(data, index) in bookList"
          :key="index"
        >
          <BookCard :name="data.name" :list-name="listName" :sign="data.sign" />
        </v-col>
        <v-col :cols="reactiveCols"
          ><BookCard name="test" list-name="none" sign=""
        /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import BookCard from '../components/BookCard.vue'
import { FSData } from '../utils/typing'
import { computed, onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { findBooksByList } from '../utils/common'

const { name } = useDisplay()
const reactiveCols = computed<number>(() => {
  switch (name.value) {
    case 'xs':
      return 6
    case 'sm':
      return 4
    case 'md':
      return 3
    case 'lg':
      return 3
    case 'xl':
      return 2
    case 'xxl':
      return 2
  }
})

const props = defineProps<{
  listName: string
}>()

const bookList = ref<FSData[]>([])

onMounted(async () => {
  bookList.value = await findBooksByList(`/local/books/${props.listName}`)
})
</script>

<style scoped>
.bg {
  display: flex;
  height: 100%;
  width: 100%;
  background-image: url('../assets/Anime-Room.png');
  background-size: cover;
}
</style>
