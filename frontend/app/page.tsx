import Team from "@/components/homepage/Team";
import About from "@/components/homepage/About";
import Banner from "@/components/homepage/Banner";
import WhySection from "@/components/homepage/WhySection";
import CareSlider from "@/components/homepage/CareSlider";
import Achievement from "@/components/homepage/Achievement";
import TopProducts from "@/components/homepage/TopProducts";
import Testimonials from "@/components/homepage/Testimonials";
import ExploreAyurveda from "@/components/homepage/ExploreAyurveda";
import { filterProducts } from "@/lib/data/products";
import { listCategories } from "@/lib/data/categories";
import DoctorsConsultation from "@/components/homepage/DoctorsConsultation";

export default async function Home() {
  // const categories = await listCategories();
  const top_products = await filterProducts({
    q: "",
    minPrice: "0",
    maxPrice: "10000",
    category_handle: "top",
    pageParam: 1,
  });

  // const new_launch_products = await filterProducts({
  //   q: "",
  //   minPrice: "0",
  //   maxPrice: "10000",
  //   category_handle: "new-launch",
  //   pageParam: 1,
  // });

  // const new_arrival_products = await filterProducts({
  //   q: "",
  //   minPrice: "0",
  //   maxPrice: "10000",
  //   category_handle: "new-arrival",
  //   pageParam: 1,
  // });

  // const best_sellers_products = await filterProducts({
  //   q: "",
  //   minPrice: "0",
  //   maxPrice: "10000",
  //   category_handle: "best-sellers",
  //   pageParam: 1,
  // });

  return (
    <>
      <Banner />
      {/* <CareSlider categories={categories} /> */}
      <TopProducts products={top_products} title="New Launch" />
      <TopProducts products={top_products} title="New Arrival" />
      <About />
      <TopProducts products={top_products} title="Best Sellers" />
      <Achievement />
      {/* <WhySection /> */}
      <Testimonials />
      <DoctorsConsultation />
      <ExploreAyurveda />

      {/* <Team /> */}
    </>
  );
}
