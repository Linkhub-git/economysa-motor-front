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

const theme = createTheme({}, esES);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/marks" element={<MarksPage />} />
          <Route path="/units" element={<ListUnityPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/providers" element={<ProvidersPage />} />
          <Route
            path="/mechs"
            element={
              <MecanicaProvider>
                <ProveedorProvider>
                  <MechsPage />
                </ProveedorProvider>
              </MecanicaProvider>
            }
          />
          <Route path="/security/new" element={<FormularioUsuarios />} />
          <Route path="/security/edit/:id" element={<FormularioUsuarios />} />
          <Route path="/motor/:id" exact={true} element={<Motor />} />
          <Route
            path="/motor/form-motor"
            exact={true}
            element={<FormularioMotores />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
