import { useStore } from './../stores/mainStore'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import TabsPage from '../views/TabsPage.vue'
import jwt_decode from 'jwt-decode'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/views/LoginPage.vue'),
    },
    {
        path: '/auth/',
        component: () => import('@/views/AuthModule.vue'),
        children: [
            {
                path: 'select-profile',
                name: 'selectProfilePage',
                component: () => import('@/views/SelectProfilePage.vue'),
            },
            {
                path: 'select-venue',
                name: 'selectVenuePage',
                component: () => import('@/views/SelectVenuePage.vue'),
            },
        ],
    },
    {
        path: '/app/',
        component: () => import('@/views/AppModule.vue'),
        children: [
            {
                path: 'dashboard',
                name: 'dashboardPage',
                component: () => import('@/views/DashboardPage.vue'),
            },
            {
                path: 'newsletters',
                name: 'newslettersPage',
                component: () => import('@/views/NewslettersPage.vue'),
            },
            {
                path: 'newsletter-detail',
                name: 'newsletterDetailPage',
                component: () => import('@/views/NewsletterDetailPage.vue'),
            },
        ],
    },
    {
        path: '/tabs/',
        component: TabsPage,
        children: [
            {
                path: '',
                redirect: '/tabs/tab1',
            },
            {
                path: 'tab1',
                name: 'tab1',
                component: () => import('@/views/Tab1Page.vue'),
            },
            {
                path: 'tab2',
                component: () => import('@/views/Tab2Page.vue'),
            },
            {
                path: 'tab3',
                component: () => import('@/views/Tab3Page.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from) => {
    if (to.name === 'login') return true
    const jwtToken = localStorage.getItem('auth:jwt_token')
    if (!jwtToken) return false
    const user = jwt_decode(jwtToken)
    if (!user) return false
    const store = useStore()
    store.$patch({ user })
})

export default router
