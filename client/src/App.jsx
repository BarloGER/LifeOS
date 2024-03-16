import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { useAuth } from "./features/authentication";

import GlobalLayout from "./layouts/GlobalLayout";
import { ProtectedRoutes } from "./features/authentication";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ShoppingListDetails from "./features/shopping-list/components/ShoppingListDetails";

const App = () => {
  const {
    setToken,
    isAuthenticated,
    setIsAuthenticated,
    loadingAuthRequest,
    setLoadingAuthRequest,
  } = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<GlobalLayout />}>
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
          element={
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              loadingAuthRequest={loadingAuthRequest}
            />
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="shopping-lists/:listId"
            element={<ShoppingListDetails />}
          />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
