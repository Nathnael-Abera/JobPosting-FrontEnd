import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import AddUser from '../views/AddUser.vue'
import AddJob from '../views/AddJob.vue'
import EditJob from '../views/EditJob.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/add-user',
      name: 'AddUser',
      component: AddUser,
    },
    {
      path: '/add-job',
      name: 'AddJob',
      component: AddJob,
    },
    {
      path: '/edit-job',
      name: 'EditJob',
      component: EditJob,
    },
  ]
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.path !== '/login' && !token) {
    next('/login');
  } else {
    // Attach the JWT to the Authorization header for subsequent requests
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    next();
  }
});

export default router
