import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { SplashScreen } from "./components/SplashScreen";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider, useLang } from "./context/LanguageContext";
import { AdminOrdersPage } from "./pages/AdminOrdersPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { HomePage } from "./pages/HomePage";
import { LicensesPage } from "./pages/LicensesPage";
import { MyOrdersPage } from "./pages/MyOrdersPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";

// Root Route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-center" />
    </>
  ),
});

// Routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});

const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-confirmation/$orderId",
  component: OrderConfirmationPage,
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders",
  component: AdminOrdersPage,
});

const licensesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/licenses",
  component: LicensesPage,
});

const myOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-orders",
  component: MyOrdersPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  checkoutRoute,
  orderConfirmationRoute,
  adminOrdersRoute,
  licensesRoute,
  myOrdersRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AppInner() {
  const { lang, setLang } = useLang();

  if (lang === null) {
    return <SplashScreen onSelect={setLang} />;
  }

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <AppInner />
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
