<template>
  <div class="bg">
    <v-container class="context">
      <v-card color="#000000a4">
        <v-card-title>
          <h1>Boooks!</h1>
        </v-card-title>
        <v-card-text>
          <h3>
            欢迎来到此网站，此网站现只作为临时网站使用（主要是没时间维护）。在这里你可以找到上课所需的教材（可能）
          </h3>
        </v-card-text>
        <v-card-actions>
          <v-btn
            append-icon="mdi-chevron-right"
            text="开始探索"
            variant="outlined"
            color="#ffffff"
            block
            @click="goFirstBook()"
          >
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
function goFirstBook() {
  router.push('/books/hxy')
}
</script>

<style scoped>
.bg {
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-image: url('../assets/Anime-Girl2.png');
  background-size: cover;
}

.v-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  color: cyan;
}

h3 {
  color: lightpink;
}
</style>
