import { createApp } from "vue"
import { createRouter, createWebHistory, Router } from "vue-router"

// Style imports
import "./style/style.scss"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Pages imports
import App from "./App.vue"
import Dashboard from "./pages/Dashboard.vue"
import Login from "./pages/Login.vue"
import NotFound from "./pages/NotFound.vue"

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Dashboard },
    { path: "/login", component: Login },
    { path: "/:pathMatch(.*)*", component: NotFound }
  ]
})

createApp(App)
  .use(router)
  .mount("#app")
