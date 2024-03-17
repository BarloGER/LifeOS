import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { useAuth } from "./features/authentication";

import { GlobalLayout } from "./layouts/GlobalLayout";
import { ProtectedRoutes } from "./features/authentication";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { ShoppingLists } from "./pages/ShoppingLists";
import { ShoppingListDetails } from "./features/shopping-lists/components/ShoppingListDetails";

export const App = () => {
  const {
    setToken,
    isAuthenticated,
    setIsAuthenticated,
    loadingAuthRequest,
    setLoadingAuthRequest,
    user,
  } = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<GlobalLayout isAuthenticated={isAuthenticated} />}
      >
        <Route
          index
          element={
            <SignIn
              setToken={setToken}
              isAuthenticated={isAuthenticated}
              loadingAuthRequest={loadingAuthRequest}
              setLoadingAuthRequest={setLoadingAuthRequest}
            />
          }
        />
        <Route
          path="/sign-up"
          element={
            <SignUp
              setToken={setToken}
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              loadingAuthRequest={loadingAuthRequest}
              setLoadingAuthRequest={setLoadingAuthRequest}
            />
          }
        />
        <Route
          path="/auth"
          element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="shopping-lists"
            element={<ShoppingLists user={user} />}
          />
          <Route
            path="shopping-lists/:shoppingListID"
            element={<ShoppingListDetails />}
          />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
