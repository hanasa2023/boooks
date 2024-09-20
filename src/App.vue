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
          v-for="(name, index) in lists.list"
          :key="index"
          prepend-icon="mdi-view-dashboard"
          :title="name == 'hxy' ? '核学院' : name"
          @click="goBook(name)"
        ></v-list-item>
      </v-list>
      <template #append>
        <div class="mx-3 my-2">
          <v-btn block @click="goLogin()"> Manage </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main ManagePage>
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
import { useListStore } from './state';
import { getLists, getToken } from './utils/common';

const drawer = ref<boolean>(false)
const router = useRouter()

const lists = useListStore()

function goHome() {
  drawer.value = false
  router.push('/')
}

function goBook(path: string) {
  drawer.value = false
  router.push(`/books/${path}`)
}

function goLogin() {
  drawer.value = false
  router.push('/login')
}

onMounted(async () => {
  await getToken()
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
