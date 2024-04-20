import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Default from "../views/dashboards/Default.vue";
import Sales from "../views/dashboards/Sales.vue";
import Overview from "../views/pages/profile/Overview.vue";
import Projects from "../views/pages/profile/Projects.vue";
import Timeline from "../views/pages/projects/Timeline.vue";
import Pricing from "../views/pages/Pricing.vue";
import RTL from "../views/pages/Rtl.vue";
import Charts from "../views/pages/Charts.vue";
import Notifications from "../views/pages/Notifications.vue";
import Kanban from "../views/applications/Kanban.vue";
import Wizard from "../views/applications/wizard/Wizard.vue";
import DataTables from "../views/applications/DataTables.vue";
import Calendar from "../views/applications/Calendar.vue";
import NewProduct from "../views/ecommerce/products/NewProduct.vue";
import EditProduct from "../views/ecommerce/products/EditProduct.vue";
import ProductPage from "../views/ecommerce/products/ProductPage.vue";
import OrderDetails from "../views/ecommerce/orders/OrderDetails";
import OrderList from "../views/ecommerce/orders/OrderList";
import NewUser from "../views/pages/users/NewUser.vue";
import Settings from "../views/Seguridad/Settings.vue";
import Billing from "../views/pages/account/Billing.vue";
import Invoice from "../views/pages/account/Invoice.vue";
import Widgets from "../views/pages/Widgets.vue";
import Basic from "../views/Seguridad/Login.vue";
import Cover from "../views/auth/signin/Cover.vue";
import Illustration from "../views/auth/signin/Illustration.vue";
import ResetCover from "../views/auth/reset/Cover.vue";
import SignupCover from "../views/auth/signup/Cover.vue";
import Usuarios from "@/views/Seguridad/Usuarios.vue";
import Pugiles from "@/views/Nomencladores/Pugiles.vue";
import Categorias from "@/views/Nomencladores/Categorias.vue";
import Paises from "@/views/Nomencladores/Paises.vue";
import Eventos from "@/views/Nomencladores/Eventos.vue";
import Golpes from "@/views/Configuracion/Golpes.vue";
import Resultados from "@/views/Configuracion/Resultados.vue";
import Teclas from "@/views/Configuracion/Teclas.vue";
import TipoEvento from "@/views/Configuracion/TipoEvento.vue";
import Reglamentos from "@/views/Nomencladores/Reglamentos.vue";
import Combate from "@/views/Combate.vue";
import Informes from "@/views/Informes.vue";
import store from "@/store";
import Atletas from "@/views/pruebas/Atletas.vue";
import Deportes from "@/views/Nomencladores/Deportes.vue";
import Disciplina from "@/views/Nomencladores/Disciplina.vue";
import Lugares from "@/views/Nomencladores/Lugares.vue";
import Pruebas from "@/views/pruebas/Pruebas.vue";
import Combates_listado from "@/views/Combates_listado.vue";

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/nomencladores/pugiles",
    name: "Púgiles",
    component: Pugiles
  },
  {
    path: "/pruebas/deportistas",
    name: "Deportistas",
    component: Atletas
  },
  {
    path: "/pruebas",
    name: "Pruebas",
    component: Pruebas
  },
  {
    path: "/deportes",
    name: "Deportes",
    component: Deportes
  },
  {
    path: "/deportes/disciplinas",
    name: "Disciplinas",
    component: Disciplina
  },
  {
    path: "/nomencladores/lugares",
    name: "Lugares",
    component: Lugares
  },
  {
    path: "/nomencladores/categorias",
    name: "Categorías",
    component: Categorias
  },
  {
    path: "/nomencladores/paises",
    name: "Países",
    component: Paises
  },
  {
    path: "/nomencladores/eventos",
    name: "Eventos",
    component: Eventos
  },
  {
    path: "/configuracion/golpes",
    name: "Golpes",
    component: Golpes
  },
  {
    path: "/configuracion/resultados",
    name: "Resultados",
    component: Resultados
  },
  {
    path: "/configuracion/teclas",
    name: "Teclas",
    component: Teclas
  },
  {
    path: "/combate",
    name: "Combate",
    component: Combates_listado
  },
  {
    path: "/combate/captura",
    name: "Captura del combate",
    component: Combate
  },
  {
    path: "/nomencladores/reglamentos",
    name: "Reglamentos",
    component: Reglamentos
  },
  {
    path: "/configuracion/tipoevento",
    name: "Tipo de evento",
    component: TipoEvento
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    component: Usuarios
  },
  {
    path: "/perfil",
    name: "Perfil de usuario",
    component: Settings
  },
  {
    path: "/informes",
    name: "Informes",
    component: Informes
  },
  //....................
  {
    path: "/inicio",
    name: "Estadísticas",
    component: Default
  },
  {
    path: "/dashboards/sales",
    name: "Sales",
    component: Sales
  },
  {
    path: "/pages/profile/overview",
    name: "Profile Overview",
    component: Overview
  },
  {
    path: "/pages/profile/projects",
    name: "All Projects",
    component: Projects
  },
  {
    path: "/pages/projects/timeline",
    name: "Timeline",
    component: Timeline
  },
  {
    path: "/pages/pricing-page",
    name: "Pricing Page",
    component: Pricing
  },
  {
    path: "/pages/rtl-page",
    name: "RTL",
    component: RTL
  },
  {
    path: "/pages/charts",
    name: "Charts",
    component: Charts
  },
  {
    path: "/pages/widgets",
    name: "Widgets",
    component: Widgets
  },
  {
    path: "/pages/notifications",
    name: "Notifications",
    component: Notifications
  },
  {
    path: "/applications/kanban",
    name: "Kanban",
    component: Kanban
  },
  {
    path: "/applications/wizard",
    name: "Wizard",
    component: Wizard
  },
  {
    path: "/applications/data-tables",
    name: "Data Tables",
    component: DataTables
  },
  {
    path: "/applications/calendar",
    name: "Calendar",
    component: Calendar
  },
  {
    path: "/ecommerce/products/new-product",
    name: "New Product",
    component: NewProduct
  },
  {
    path: "/ecommerce/products/edit-product",
    name: "Edit Product",
    component: EditProduct
  },
  {
    path: "/ecommerce/products/product-page",
    name: "Product Page",
    component: ProductPage
  },
  {
    path: "/ecommerce/Orders/order-details",
    name: "Order Details",
    component: OrderDetails
  },
  {
    path: "/ecommerce/Orders/order-list",
    name: "Order List",
    component: OrderList
  },
  {
    path: "/pages/users/new-user",
    name: "New User",
    component: NewUser
  },
  {
    path: "/pages/account/settings",
    name: "Settings",
    component: Settings
  },
  {
    path: "/pages/account/billing",
    name: "Billing",
    component: Billing
  },
  {
    path: "/pages/account/invoice",
    name: "Invoice",
    component: Invoice
  },
  {
    path: "/",
    name: "Login",
    component: Basic
  },
  {
    path: "/authentication/signin/cover",
    name: "Signin Cover",
    component: Cover
  },
  {
    path: "/authentication/signin/illustration",
    name: "Signin Illustration",
    component: Illustration
  },
  {
    path: "/authentication/reset/cover",
    name: "Reset Cover",
    component: ResetCover
  },
  {
    path: "/authentication/signup/cover",
    name: "Signup Cover",
    component: SignupCover
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active"
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    store.commit("doLogout");
  }
  next();
});
export default router;
