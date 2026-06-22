import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Shop from "./pages/Shop.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Cart from "./pages/Cart.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Faqs from "./pages/Faqs.tsx";
import Delivery from "./pages/Delivery.tsx";
import Returns from "./pages/Returns.tsx";
import Terms from "./pages/Terms.tsx";
import Privacy from "./pages/Privacy.tsx";
import Warranty from "./pages/Warranty.tsx";
import CookiesPolicy from "./pages/CookiesPolicy.tsx";
import QualityPolicy from "./pages/QualityPolicy.tsx";
import BuyRightGuide from "./pages/BuyRightGuide.tsx";
import HowToShop from "./pages/HowToShop.tsx";
import BecomeDistributor from "./pages/BecomeDistributor.tsx";
import Blog from "./pages/Blog.tsx";
import Locations from "./pages/Locations.tsx";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/quality-policy" element={<QualityPolicy />} />
          <Route path="/buy-right-guide" element={<BuyRightGuide />} />
          <Route path="/how-to-shop" element={<HowToShop />} />
          <Route path="/become-a-distributor" element={<BecomeDistributor />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
