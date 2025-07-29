import Header from "./Header";
import Footer from "./Footer";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import NuqsProvider from "@/lib/NuqsProvider";

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <NuqsProvider>
        <Header />
        <br />
        {children}
        <Footer />
      </NuqsProvider>
    </ReactQueryProvider>
  );
}
