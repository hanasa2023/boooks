import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')

  return { token }
})

export const useListStore = defineStore('list', () => {
  const list = ref<string[]>([])

  return { list }
})
