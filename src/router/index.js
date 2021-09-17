import { createRouter, createWebHistory } from 'vue-router'
import { getAuths } from '../db/firebase';
const auth = getAuths;
import login from '@/views/auth/login.vue'
const routes = [
  {
     path:'/',
     name:'Login',
     component:login

  },
   {
    path: '/admin',
    name: 'Admin',
    meta: {
      authRequired: true,
    },
    /* route level code-splitting
    this generates a separate chunk (about.[hash].js) for this route
    which is lazy-loaded when the route is visited. */
    component: () => import( /* webpackChunkName: "about" */  '../views/BurtulaAdmin.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    meta: {
      authRequired: true,
    },
    /* route level code-splitting
    this generates a separate chunk (about.[hash].js) for this route
    which is lazy-loaded when the route is visited. */
    component: () => import( /* webpackChunkName: "projexts" */  '../views/Projects.vue'),
    children:[
      {
        path:':id',
        component: () => import( /* webpackChunkName: "table" */  '../components/global/Table')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (auth.currentUser) {
      console.log(auth.currentUser);
      next();
    } else {
      console.log(auth.currentUser);
      alert('You must be logged in to see this page');
      next({
        path: '/',
      });
    }
  } else {
    next();
  }
});

export default router
