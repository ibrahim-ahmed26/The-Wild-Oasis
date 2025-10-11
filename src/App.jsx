import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";

import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import CheckIn from "./pages/CheckIn";
import ProtectedRoutes from "./ui/ProtectedRoutes";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoutes>
                <AppLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route element={<Dashboard />} path="dashboard" />
            <Route element={<Bookings />} path="bookings" />
            <Route element={<Booking />} path="bookings/booking/:bookingId" />
            <Route element={<CheckIn />} path="bookings/checkin/:bookingId" />
            <Route element={<Account />} path="account" />
            <Route element={<Cabins />} path="Cabins" />
            <Route element={<Settings />} path="settings" />
            <Route element={<Users />} path="users" />
          </Route>
          <Route element={<Login />} path="Login" />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            backgroundColor: `var(--color-grey-0)`,
            fontSize: "16px",
            padding: "20px 16px",
          },
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
        }}
      />
    </QueryClientProvider>
  );
}
