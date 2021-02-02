import app from '@/main.js'
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '@/views/auth/Login.vue'
import test from '@/views/test.vue'
import test2 from '@/views/test2.vue'
import MaintenanceMessage from '../views/MaintenanceMessage.vue'

import { showPopupMessage } from '@/helpers/commonFuncs'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/MaintenanceMessage',
      name: 'MaintenanceMessage',
      component: MaintenanceMessage
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/login',
      component: Login,
      name: 'loginForm',
      meta: {
        requiresAuth: false
      },
    },

    { path: '/test', component: test },
    { path: '/test2', component: test2 },

    {
      path: '/not-found/:invalid_url?',
      name: 'notFound',
      component: () => import('../views/NotFound.vue')
    },

    // ADMIN'S CRUD BLOCK START
    {
      path: '/admin/dashboard',
      name: 'adminDashboard',
      component: () => import('@/views/admin/dashboard/dashboard.vue'),
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/import-logging',
      name: 'adminImportLoggingPageListing',
      component: () => import('@/views/admin/dashboard/importLoggingPageListing.vue'),
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/settings',
      name: 'adminSettingsEditor',
      component: () => import('@/views/admin/settings/settings.vue'),
      meta: {
        requiresAuth: true
      }
    },

    { // adminCurrencyEditor
      path: '/admin/currencies',
      name: 'adminCurrenciesListing', // src/views/admin/currencies/list.vue
      component: () => import('@/views/admin/currencies/list.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/currencies/edit/:id',
      name: 'adminCurrencyEditor',
      component: () => import('@/views/admin/currencies/editor.vue'),
      meta: {
        requiresAuth: true
      }
    },

  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (app.$store.getters.isLoggedIn) {
      next()
      return
    }
    showPopupMessage('Access', 'Not authorized !', 'warn')
    next('/login')
  } else {
    if (!to.matched.length) {
      next( '/not-found/' + encodeURIComponent(to.path) )
    } else {
      next()
    }
  }
})

export default router
