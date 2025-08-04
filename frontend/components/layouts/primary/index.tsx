import Header from "./Header";
import Footer from "./Footer";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import NuqsProvider from "@/lib/NuqsProvider";
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
        <Header />
        {children}
        <Footer />
      </NuqsProvider>
      <ToastContainer />
    </ReactQueryProvider>
  );
}
