import { Route, Routes } from "react-router-dom";

import { useAuth } from "./hooks/use-auth.jsx";
import HomePage from "./modules/home/home-page.jsx";
import UserCreatePage from "./modules/users/user-create-page.jsx";
import UserListPage from "./modules/users/user-list-page.jsx";
import BrandListPage from "./modules/brands/brand-list-page.jsx";
import BrandCreatePage from "./modules/brands/brand-create-page.jsx";
import CollectionListPage from "./modules/collections/collection-list-page.jsx";
import CollectionViewPage from "./modules/collections/collection-view-page.jsx";
import BrandViewPage from "./modules/brands/brand-view-page.jsx";
import RegisterPage from "./modules/register/register-page.jsx";
import LoginPage from "./modules/login/login-page.jsx";
import CollectionCreatePage from "./modules/collections/collection-create-page.jsx";

function App() {
  const { auth } = useAuth();
  const routes = [
    //auth
    {
      path: "/register",
      element: <RegisterPage type="user" />,
    },
    {
      path: "/login",
      element: <LoginPage type="user" />,
    },
    //
    {
      path: "/",
      element: <HomePage type="user" />,
    },
    {
      path: "/collections",
      element: <CollectionListPage type="user" />,
    },
    {
      path: "/collections/:id",
      element: <CollectionViewPage type="user" />,
    },
    {
      path: "/brands",
      element: <BrandListPage type="user" />,
    },
    {
      path: "/brands/:id",
      element: <BrandViewPage type="user" />,
    },
    //admin
    {
      path: "/admin",
      element: <HomePage type="admin" />,
    },
    {
      path: "/admin/login",
      element: <LoginPage type="admin" />,
    },
    ...(auth
      ? [
          //user
          {
            path: "/admin/users",
            element: <UserListPage />,
          },
          {
            path: "/admin/users/:id",
            element: <UserCreatePage type="view" />,
          },
          {
            path: "/admin/users/create",
            element: <UserCreatePage type="create" />,
          },
          //brand
          {
            path: "/admin/brands",
            element: <BrandListPage type="admin" />,
          },
          {
            path: "/admin/brands/:id",
            element: <BrandCreatePage type="view" />,
          },
          {
            path: "/admin/brands/create",
            element: <BrandCreatePage type="create" />,
          },
          //collection
          {
            path: "/admin/collections",
            element: <CollectionListPage type="admin" />,
          },
          {
            path: "/admin/collections/:id",
            element: <CollectionCreatePage type="view" />,
          },
          {
            path: "/admin/collections/create",
            element: <CollectionCreatePage type="create" />,
          },
        ]
      : []),
  ];
  return (
    <Routes>
      <Route path="/">
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
