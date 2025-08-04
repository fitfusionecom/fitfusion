import Team from "@/components/homepage/Team";
import About from "@/components/homepage/About";
import Banner from "@/components/homepage/Banner";
import WhySection from "@/components/homepage/WhySection";
import CareSlider from "@/components/homepage/CareSlider";
import Achievement from "@/components/homepage/Achievement";
import TopProducts from "@/components/homepage/TopProducts";
import Testimonials from "@/components/homepage/Testimonials";
import { filterProducts } from "@/lib/data/products";
import { listCategories } from "@/lib/data/categories";

export default async function Home() {
  // const categories = await listCategories();
  const top_products = await filterProducts({
    q: "",
    minPrice: "0",
    maxPrice: "10000",
    category_handle: "top",
    pageParam: 1,
  });

  return (
    <>
      <Banner />
      {/* <CareSlider categories={categories} /> */}
      <TopProducts products={top_products} />
      <About />
      <Achievement />
      <TopProducts products={top_products} />
      <WhySection />
      <Testimonials />
      {/* <Team /> */}
    </>
  );
}
