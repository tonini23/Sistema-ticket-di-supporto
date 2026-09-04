import { createApp } from "vue"
import { createRouter, createWebHistory, Router } from "vue-router"

// Style imports
import "./style/style.scss"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.css';


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
    { path: "/", component: Dashboard },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/ticket", component: Ticket },
    { path: "/ticket/:id", component: TicktDetail },
    { path: "/:pathMatch(.*)*", component: NotFound }
  ]
})


const protectedRoutes = ["/", "/ticket", "/ticket/:id", "/register"];
const onlyAdminRoutes = ["/dashboard-admin", "/register"];

/*router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = !!localStorage.getItem("isAdmin");//todo...

  if (protectedRoutes.includes(to.path) && !isAuthenticated) {
    next("/login");
  } else if (onlyAdminRoutes.includes(to.path) && !isAdmin) {
    next("/");
  } else {
    next();
  }
});*/

createApp(App)
  .use(router)
  .mount("#app")
