import Header from "./Header";
import Footer from "./Footer";
import Offer from "./Offer";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import NuqsProvider from "@/lib/NuqsProvider";
import { CartProvider } from "@/lib/context/cart-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Newsletter from "@/components/homepage/Newsletter";

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <NuqsProvider>
        <CartProvider>
          <Offer />
          <Header />
          {children}
          <Newsletter />
          <Footer />
        </CartProvider>
      </NuqsProvider>
      <ToastContainer />
    </ReactQueryProvider>
  );
}
