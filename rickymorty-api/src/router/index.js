import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../pages/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/:page?', name: 'home', component: HomeView },
    { path: '/profile/:id', name: 'profile', component: () => import('../pages/ProfilePage.vue') },
    { path: '/about', name: 'about', component: () => import('../pages/AboutPage.vue') },
  ],
});

export default router;
