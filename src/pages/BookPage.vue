<template>
  <div class="bg">
    <v-container>
      <v-row>
        <v-col
          :cols="reactiveCols"
          v-for="(data, index) in bookList"
          :key="index"
        >
          <BookCard
            :id="data.id"
            :name="data.name"
            :full-name="data.fullName"
            :list-name="data.listName"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import BookCard from '../components/BookCard.vue'
import { BookData } from '../utils/typing'
import { computed, onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'
import axios from 'axios'

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

const bookList = ref<BookData[]>([])
async function findBooksByList() {
  bookList.value = (
    await axios.post('/apis/v1/books/get', {
      listName: props.listName,
    })
  ).data
}

onMounted(async () => {
  await findBooksByList()
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
