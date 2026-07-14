import { createRouter, createWebHashHistory } from 'vue-router'
import { getSession, isAdminSession } from '../services/auth'
import AdminView from '../views/AdminView.vue'
import CharactersView from '../views/CharactersView.vue'
import CharacterSheetView from '../views/CharacterSheetView.vue'
import CharacterCreatorView from '../views/CharacterCreatorView.vue'
import ForbiddenView from '../views/ForbiddenView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import RulesView from '../views/RulesView.vue'
import StylesView from '../views/StylesView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/characters',
      name: 'characters',
      component: CharactersView,
    },
    {
      path: '/characters/:id',
      name: 'character-sheet',
      component: CharacterSheetView,
      meta: { hideSiteHeader: true },
    },
    {
      path: '/character-creator',
      name: 'character-creator',
      component: CharacterCreatorView,
      meta: { requiresAuth: true },
    },
    {
      path: '/rules',
      name: 'rules',
      component: RulesView,
    },
    {
      path: '/styles',
      name: 'styles',
      component: StylesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/403',
      name: 'forbidden',
      component: ForbiddenView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth && !to.meta.requiresAdmin) {
    return true
  }

  const { session } = await getSession()

  if (session) {
    if (to.meta.requiresAdmin && !isAdminSession(session)) {
      return { name: 'forbidden' }
    }

    return true
  }

  return {
    name: 'login',
    query: { redirect: to.fullPath },
  }
})

export default router
