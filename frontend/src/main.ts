import { createApp } from "vue"
import { createRouter, createWebHistory, Router } from "vue-router"
import axios from "axios"
import { User } from "./types"

// Style imports
import "./style/style.scss"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.css';

axios.defaults.withCredentials = true


// Pages imports
import App from "./App.vue"
import Dashboard from "./pages/Dashboard.vue"
import DashboardAdmin from "./pages/DashboardAdmin.vue"
import Login from "./pages/Login.vue"
import Register from "./pages/Register.vue"
import Ticket from "./pages/Ticket.vue"
import TicktDetail from "./pages/TicketDetail.vue"
import NotFound from "./pages/NotFound.vue"

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Dashboard, meta: { requiresAuth: true } },
    { path: "/login", component: Login },
    { path: "/register", component: Register, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: "/dashboard-admin", component: DashboardAdmin, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: "/ticket", component: Ticket, meta: { requiresAuth: true } },
    { path: "/ticket/:id", component: TicktDetail, meta: { requiresAuth: true } },
    { path: "/:pathMatch(.*)*", component: NotFound }
  ]
})

router.beforeEach(async (to) => {
  try {
    const response = await axios.get<User>("/api/auth/user")
    const user = response.data

    if (to.path === "/login") {
      return "/"
    }

    if (to.meta.requiresAdmin && !Boolean(user.admin)) {
      return "/"
    }

    return true
  } catch (error) {
    if (to.meta.requiresAuth) {
      return {
        path: "/login",
        query: { redirect: to.fullPath }
      }
    }

    return true
  }
})

createApp(App)
  .use(router)
  .mount("#app")
