import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import RegistrationForm from '../pages/RegistrationForm.vue'

// App routes: home page first, then the registration page.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/Home', name: 'home-upper', component: HomeView },
    { path: '/registration', name: 'registration', component: RegistrationForm },
  ],
})

export default router
