import Vue from 'vue'
import Router from 'vue-router'
import PropertyList from './views/PropertyList.vue'
import PropertyDetails from './views/PropertyDetails.vue'
import NProgress from 'nprogress'
import NotFound from './views/NotFound.vue'
import FrontPage from './views/FrontPage.vue'
import About from './views/About.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'search',
            component: FrontPage,
            props: true
        },
        {
            path: '/about',
            name: 'about',
            component: About,
            props: true
        },
        {
            path: '/list',
            name: 'list',
            component: PropertyList,
            props: true
        },
        {
            path: '/property',
            name: 'details',
            component: PropertyDetails,
            props: true
        },
        {
            path: '/404',
            name: '404',
            component: NotFound,
            props: true
        },
        {
            path: '*',
            redirect: { name: '404', params: { resource: 'page' } }
        }
    ]
})

router.beforeEach((routeTo, routeFrom, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router