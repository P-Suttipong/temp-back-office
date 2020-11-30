import AuthLayout from "../layouts/AuthLayout.vue";
import Login from "../pages/Login.vue";
import Error404 from "pages/Error404.vue";
import Index from "pages/Index.vue";
import UserList from "pages/UserList.vue";
import AddDevice from "pages/AddDevice.vue";
import AddUser from "pages/AddUser.vue";

const authPage = {
  path: "",
  name: "AuthLayout",
  component: AuthLayout,
  children: [
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
};

const routes = [
  {
    path: "/",
    redirect: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: Index,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "userlist",
        component: UserList,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "adddevice",
        component: AddDevice,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "adduser",
        component: AddUser,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "*",
    component: Error404
  },
  authPage
];

export default routes;
