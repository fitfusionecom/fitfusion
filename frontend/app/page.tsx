import About from "@/components/homepage/About";
import Banner from "@/components/homepage/Banner";
import { filterProducts } from "@/lib/data/products";
import Achievement from "@/components/homepage/Achievement";
import TopProducts from "@/components/homepage/TopProducts";
import GoogleReviews from "@/components/homepage/GoogleReviews";
import ExploreAyurveda from "@/components/homepage/ExploreAyurveda";
import AlsoAvailableOn from "@/components/homepage/AlsoAvailableOn";
import DoctorsConsultation from "@/components/homepage/DoctorsConsultation";

const getProducts = async (category_handle: string) => {
  const products = await filterProducts({
    q: "",
    minPrice: "0",
    maxPrice: "100000",
    category_handle: category_handle,
    pageParam: 1,
  });
  return products;
};

export default async function Home() {
  const [best_selling, new_arrivals, deals] = await Promise.all([
    getProducts("best-selling"),
    getProducts("new-arrival"),
    getProducts("deals"),
  ]);

  return (
    <>
      <Banner />
      {/* <CareSlider categories={categories} /> */}
      <TopProducts
        products={best_selling}
        title="Best Selling"
        category_handle="best-selling"
        carouselId="best-selling-carousel"
      />
      <AlsoAvailableOn />
      <TopProducts
        products={new_arrivals}
        title="New Arrival"
        carouselId="new-arrival-carousel"
        category_handle="new-arrival"
      />
      <About />
      {/* <VideoGallery videos={videos} /> */}
      <TopProducts
        category_handle="deals"
        products={deals}
        title="Deals"
        carouselId="deals-carousel"
      />
      <Achievement />
      <GoogleReviews />
      {/* <WhySection /> */}
      {/* <Testimonials /> */}
      <DoctorsConsultation />
      {/* <ExploreAyurveda /> */}
      {/* <Team /> */}
    </>
  );
}
