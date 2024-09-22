import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import BookPage from '../pages/BookPage.vue'
import ManagePage from '../pages/ManagePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import PreviewPage from '../pages/PreviewPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/books/:listName', component: BookPage, props: true },
  { path: '/login', component: LoginPage },
  { path: '/manage', component: ManagePage },
  {
    path: '/preview/:listName/:name/:sign/:thumbSign',
    component: PreviewPage,
    props: true,
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})
