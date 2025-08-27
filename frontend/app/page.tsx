import About from "@/components/homepage/About";
import Banner from "@/components/homepage/Banner";
import { mockVideos } from "@/lib/data/mock-videos";
import { filterProducts } from "@/lib/data/products";
import Achievement from "@/components/homepage/Achievement";
import TopProducts from "@/components/homepage/TopProducts";
import GoogleReviews from "@/components/homepage/GoogleReviews";
import ExploreAyurveda from "@/components/homepage/ExploreAyurveda";
import AlsoAvailableOn from "@/components/homepage/AlsoAvailableOn";
import DoctorsConsultation from "@/components/homepage/DoctorsConsultation";

export default async function Home() {
  const products = await filterProducts({
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
      <TopProducts
        products={products}
        title="Best Selling"
        carouselId="best-selling-carousel"
      />
      <AlsoAvailableOn />
      <TopProducts
        products={products}
        title="New Arrival"
        carouselId="new-arrival-carousel"
      />
      <About />
      {/* <VideoGallery videos={videos} /> */}
      <TopProducts
        products={products}
        title="Deals"
        carouselId="deals-carousel"
      />
      <Achievement />
      <GoogleReviews />
      {/* <WhySection /> */}
      {/* <Testimonials /> */}
      <DoctorsConsultation />
      <ExploreAyurveda />
      {/* <Team /> */}
    </>
  );
}
