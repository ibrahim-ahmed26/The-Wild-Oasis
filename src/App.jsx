import GlobalStyles from "./styles/GlobalStyles";

import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import Users from "./pages/Users";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
export default function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route element={<Dashboard />} path="dashboard" />
            <Route element={<Bookings />} path="bookings" />
            <Route element={<Account />} path="account" />
            <Route element={<Cabins />} path="Cabins" />
            <Route element={<Settings />} path="settings" />
            <Route element={<Users />} path="users" />
          </Route>
          <Route element={<Login />} path="Login" />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </BrowserRouter>
    </>
  );
}
