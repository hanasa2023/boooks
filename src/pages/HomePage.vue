<template>
  <div :class="relativeBg">
    <v-container class="context">
      <v-card color="#000000a4" :max-width="800">
        <v-card-title>
          <h1>Boooks!</h1>
        </v-card-title>
        <v-card-text>
          <h3>
            欢迎来到此网站，<s>此网站本意是为HEU15系提供电子版教学书籍</s>，现只作为临时网站使用（<s>主要是没时间维护</s>）。在这里你可以找到上课所需的教材（可能）
            如果你对此项目感兴趣，可以通过hanasakayui2022@gmail.com邮箱联系
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
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const { name } = useDisplay()

const relativeBg = computed<string>(() => {
  switch (name.value) {
    case 'xs':
      return 'bg-mobile bg'
    case 'sm':
      return 'bg-desktop bg'
    case 'md':
      return 'bg-desktop bg'
    case 'lg':
      return 'bg-desktop bg'
    case 'xl':
      return 'bg-desktop bg'
    case 'xxl':
      return 'bg-desktop bg'
  }
})

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
}
.bg-desktop {
  background-image: url('../assets/Anime-Girl2.png');
  background-size: cover;
}

.bg-mobile {
  background-image: url('../assets/mzk.png');
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
