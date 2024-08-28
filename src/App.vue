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
        <v-list-item prepend-icon="mdi-home" title="主页" @click="goHome()">
        </v-list-item>
        <v-list-item
          v-for="(data, index) in lists"
          :key="index"
          prepend-icon="mdi-view-dashboard"
          :title="data.name == 'hxy' ? '核学院' : data.name"
          @click="goBook(data.name)"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
    <div class="site-footer">
      <footer
        class="site-info"
        aria-label="站点"
        itemtype="https://schema.org/WPFooter"
        itemscope
      >
        <div class="inside-site-info grid-container">
          <div class="copyright-bar">
            <span> Copyright © 2024 hanasaki. All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ListData } from './utils/typing'
import axios from 'axios'

const drawer = ref<boolean>(false)
const router = useRouter()

const lists = ref<ListData[]>([])

async function getLists() {
  const data = await axios.post('/apis/api/lists/all')
  lists.value = data.data
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
})
</script>

<style scoped>
.site-info {
  background-color: #4a148c;
  text-align: center;
  font-size: 15px;
}

.inside-site-info {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 2px 4px;
}
</style>
