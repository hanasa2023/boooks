<template>
  <div :class="relativeBg">
    <v-container class="d-flex justify-center align-center h-100">
      <v-card
        class="pa-4 mx-auto opacity-80"
        :width="400"
        :height="200"
        :elevation="8"
      >
        <v-text-field
          v-model="password"
          label="Password"
          placeholder="Please enter password"
          variant="outlined"
        ></v-text-field>
        <v-row class="mx-auto ma-0">
          <v-btn
            class="mx-auto"
            size="large"
            color="purple"
            block
            @click="onLogin()"
            >Entry</v-btn
          >
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

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
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

// TODO: 加密密码
const password = ref<string>('')
const router = useRouter()

function onLogin() {
  if (password.value == '2022151701') {
    password.value = ''
    router.push('/manage')
  }
}
</script>

<style lang="css" scoped>
.bg {
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.bg-desktop {
  background-image: url('../assets/mzk-1.png');
  background-size: cover;
}

.bg-mobile {
  background-image: url('../assets/arona.png');
  background-size: cover;
}
</style>
