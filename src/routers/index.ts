import { createMemoryHistory, createRouter } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import BookPage from '../pages/BookPage.vue'
import ManagePage from '../pages/ManagePage.vue'
import LoginPage from '../pages/LoginPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/books/:listName', component: BookPage, props: true },
  { path: '/login', component: LoginPage },
  { path: '/manage', component: ManagePage },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes: routes,
})
