import { createRouter, createWebHistory } from 'vue-router'
import routes from './router'
//import beforeEach from './beforeEach'
//import afterEach from './afterEach'

const router = createRouter({
    history: createWebHistory(),
    routes
})

//router.beforeEach(beforeEach)
//router.afterEach(afterEach)

export default router