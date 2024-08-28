import { createMemoryHistory, createRouter } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import BookPage from '../pages/BookPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/books/:listName', component: BookPage, props: true },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes: routes,
})
