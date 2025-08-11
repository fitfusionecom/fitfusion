import Header from "./Header";
import Footer from "./Footer";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import NuqsProvider from "@/lib/NuqsProvider";
import { CartProvider } from "@/lib/context/cart-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <NuqsProvider>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </NuqsProvider>
      <ToastContainer />
    </ReactQueryProvider>
  );
}
