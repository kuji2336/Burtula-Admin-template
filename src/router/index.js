import { createRouter, createWebHistory } from 'vue-router'
const routes = [
 /*  {
     path:'/',

  }, */
   {
    path: '/admin',
    name: 'Admin',
    /* route level code-splitting
    this generates a separate chunk (about.[hash].js) for this route
    which is lazy-loaded when the route is visited. */
    component: () => import( /* webpackChunkName: "about" */  '../views/BurtulaAdmin.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
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

export default router
