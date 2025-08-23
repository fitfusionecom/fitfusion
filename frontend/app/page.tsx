import Team from "@/components/homepage/Team";
import About from "@/components/homepage/About";
import Banner from "@/components/homepage/Banner";
import WhySection from "@/components/homepage/WhySection";
import CareSlider from "@/components/homepage/CareSlider";
import Achievement from "@/components/homepage/Achievement";
import TopProducts from "@/components/homepage/TopProducts";
import Testimonials from "@/components/homepage/Testimonials";
import ExploreAyurveda from "@/components/homepage/ExploreAyurveda";
import Newsletter from "@/components/homepage/Newsletter";
import VideoGallery from "@/components/homepage/VideoGallery";
import GoogleReviews from "@/components/homepage/GoogleReviews";
import AlsoAvailableOn from "@/components/homepage/AlsoAvailableOn";
import { filterProducts } from "@/lib/data/products";
import { listCategories } from "@/lib/data/categories";
import { getVideos } from "@/lib/data/video";
import { mockVideos } from "@/lib/data/mock-videos";
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

  const videos = mockVideos; // Using mock data for now
  return (
    <>
      <Banner />
      {/* <CareSlider categories={categories} /> */}
      <TopProducts products={top_products} title="Best Selling" />
      <TopProducts products={top_products} title="New Arrival" />
      <About />
      {/* <VideoGallery videos={videos} /> */}
      <TopProducts products={top_products} title="Deals" />
      <Achievement />
      <GoogleReviews />
      {/* <AlsoAvailableOn /> */}
      {/* <WhySection /> */}
      {/* <Testimonials /> */}
      <DoctorsConsultation />
      <ExploreAyurveda />
      {/* <Team /> */}
    </>
  );
}
