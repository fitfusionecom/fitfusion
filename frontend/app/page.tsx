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

  // Fetch different products for each section to avoid duplicate carousels
  let bestSellingProducts = [];
  let newArrivalProducts = [];
  let dealsProducts = [];

  try {
    bestSellingProducts =
      (await filterProducts({
        q: "",
        minPrice: "0",
        maxPrice: "10000",
        category_handle: "top",
        pageParam: 1,
      })) || [];
  } catch (error) {
    console.error("Error fetching best selling products:", error);
  }

  try {
    newArrivalProducts =
      (await filterProducts({
        q: "",
        minPrice: "0",
        maxPrice: "10000",
        category_handle: "new",
        pageParam: 1,
      })) || [];
  } catch (error) {
    console.error("Error fetching new arrival products:", error);
  }

  try {
    dealsProducts =
      (await filterProducts({
        q: "",
        minPrice: "0",
        maxPrice: "10000",
        category_handle: "sale",
        pageParam: 1,
      })) || [];
  } catch (error) {
    console.error("Error fetching deals products:", error);
  }

  // If all category-specific queries fail, try to get all products
  if (
    bestSellingProducts.length === 0 &&
    newArrivalProducts.length === 0 &&
    dealsProducts.length === 0
  ) {
    try {
      const allProducts =
        (await filterProducts({
          q: "",
          minPrice: "0",
          maxPrice: "10000",
          category_handle: "",
          pageParam: 1,
        })) || [];

      // Split products among the three sections
      const chunkSize = Math.ceil(allProducts.length / 3);
      bestSellingProducts = allProducts.slice(0, chunkSize);
      newArrivalProducts = allProducts.slice(chunkSize, chunkSize * 2);
      dealsProducts = allProducts.slice(chunkSize * 2);
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  }

  // Fallback: if any section has no products, use the first successful result
  const fallbackProducts =
    bestSellingProducts.length > 0
      ? bestSellingProducts
      : newArrivalProducts.length > 0
      ? newArrivalProducts
      : dealsProducts.length > 0
      ? dealsProducts
      : [];

  // Debug logging
  console.log("Best Selling Products:", bestSellingProducts.length);
  console.log("New Arrival Products:", newArrivalProducts.length);
  console.log("Deals Products:", dealsProducts.length);
  console.log("Fallback Products:", fallbackProducts.length);

  const videos = mockVideos; // Using mock data for now
  return (
    <>
      <Banner />
      {/* <CareSlider categories={categories} /> */}
      <TopProducts
        products={
          bestSellingProducts.length > 0
            ? bestSellingProducts
            : fallbackProducts
        }
        title="Best Selling"
        carouselId="best-selling-carousel"
      />
      <AlsoAvailableOn />
      <TopProducts
        products={
          newArrivalProducts.length > 0 ? newArrivalProducts : fallbackProducts
        }
        title="New Arrival"
        carouselId="new-arrival-carousel"
      />
      <About />
      {/* <VideoGallery videos={videos} /> */}
      <TopProducts
        products={dealsProducts.length > 0 ? dealsProducts : fallbackProducts}
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
