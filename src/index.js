import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Motor from "./components/Motor/Motor";
import FormularioUsuarios from "./components/Formularios/FormularioUsuarios";
import FormularioMotores from "./components/Formularios/FormularioMotores";
import NotFound from "./components/NotFound/NotFound";
import { DashboardPage } from "./pages/DashboardPage";
import { SecurityPage } from "./pages/SecurityPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { MarksPage } from "./pages/MarksPage";
import { ListUnityPage } from "./pages/ListUnityPage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProvidersPage } from "./pages/ProvidersPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MechsPage } from "./pages/MechsPage";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { MecanicaProvider } from "./context/mecanicas";
import { ProveedorProvider } from "./context/proveedores";
import { esES } from "@mui/x-data-grid";
import { AuthProvider } from "./context/auth";
import PrivateRoute from "./routes/PublicRoute";
import PublicRoute from "./routes/PrivateRoute";

const theme = createTheme({}, esES);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="top-center" />
      <AuthProvider>
        <MecanicaProvider>
          <ProveedorProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/security"
                  element={
                    <PrivateRoute>
                      <SecurityPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/categories"
                  element={
                    <PrivateRoute>
                      <CategoriesPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/marks"
                  element={
                    <PrivateRoute>
                      <MarksPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/units"
                  element={
                    <PrivateRoute>
                      <ListUnityPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <PrivateRoute>
                      <ProductsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/providers"
                  element={
                    <PrivateRoute>
                      <ProvidersPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/mechs"
                  element={
                    <PrivateRoute>
                      <MechsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/security/new"
                  element={
                    <PrivateRoute>
                      <FormularioUsuarios />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/security/edit/:id"
                  element={
                    <PrivateRoute>
                      <FormularioUsuarios />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/motor/:id"
                  exact={true}
                  element={
                    <PrivateRoute>
                      <Motor />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/motor/form-motor"
                  exact={true}
                  element={
                    <PrivateRoute>
                      <FormularioMotores />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ProveedorProvider>
        </MecanicaProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
