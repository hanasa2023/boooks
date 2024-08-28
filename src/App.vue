<template>
  <v-app>
    <v-app-bar color="purple">
      <template #title>
        <v-img
          src="/boooks.svg"
          :width="160"
          class="px-4"
          @click="goHome()"
        ></v-img>
      </template>
      <template #append>
        <v-btn icon="mdi-menu" @click="drawer = !drawer"></v-btn>
      </template>
    </v-app-bar>
    <v-navigation-drawer
      class="bg-deep-purple"
      :model-value="drawer"
      theme="dark"
      permanent
    >
      <v-list color="transparent">
        <v-list-item
          v-for="(data, index) in lists"
          :key="index"
          prepend-icon="mdi-view-dashboard"
          :title="data.name"
          @click="goBook(data.name)"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { invoke } from '@tauri-apps/api/core'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { BookData, ListData } from './utils/typing'

const drawer = ref<boolean>(false)
const router = useRouter()

const lists = ref<ListData[]>([])

async function getLists() {
  lists.value = await invoke<BookData[]>('find_all_list')
}

function goHome() {
  drawer.value = false
  router.push('/')
}

function goBook(path: string) {
  drawer.value = false
  router.push(`/books/${path}`)
}

onMounted(async () => {
  await getLists()
  console.log(lists.value)
})
</script>

<style scoped></style>
