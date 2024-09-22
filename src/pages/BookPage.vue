<template>
  <div class="bg">
    <v-container>
      <v-alert
        class="alert"
        type="warning"
        position="fixed"
        density="compact"
        closable
        prominent
        >单击文件的预览存在诸多问题，建议点击文件名下载文件
      </v-alert>
      <!-- <notifications
        classes="vue-notification"
        position="bottom right"
        pause-on-hover
      /> -->
      <v-row>
        <v-col
          :cols="reactiveCols"
          v-for="(data, index) in bookData"
          :key="index"
          class="d-flex justify-center"
        >
          <BookCard
            :name="data.name"
            :list-name="listName"
            :sign="data.sign"
            :thumb-sign="data.thumbSign"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import BookCard from '../components/BookCard.vue'
import { BookData, FSData } from '../utils/typing'
import { computed, onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { findFilesByList } from '../utils/common'
// import { Notifications, useNotification } from '@kyvg/vue3-notification'

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

// const notification = useNotification()

const bookData = ref<BookData[]>([])

onMounted(async () => {
  const fileList: FSData[] = await findFilesByList(
    `/123/local/books/${props.listName}`
  )
  const bD: BookData[] = []

  for (let i = 0; i < fileList.length - 1; i++) {
    if (fileList[i].type == 0 && fileList[Number(i) + 1].type == 5) {
      bD.push({
        name: fileList[i].name,
        listName: props.listName,
        sign: fileList[i].sign,
        thumbSign: fileList[Number(i) + 1].sign,
      })
      i++
    }
  }
  bookData.value = bD
  // notification.notify({
  //   title: 'Notice!',
  //   text: '单击文件的预览存在诸多问题，建议直接双击下载文件',
  //   type: 'warn',
  //   duration: 1000,
  // })
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

.alert {
  z-index: 1;
  bottom: 24px;
  right: 0;
}
</style>
