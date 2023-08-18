import Image from "next/image";
import useHomeBanner from "../../hooks/HomePageHooks/HomeBannerHook";
import Carousel from "react-bootstrap/Carousel";
import CarouselCaption from "react-bootstrap/CarouselCaption";
import CarouselItem from "react-bootstrap/CarouselItem";
import { CONSTANTS } from "../../services/config/app-config";
import loaderGIF from "../../public/assets/images/loader-gif.gif";
import CardsLoadingLayout from "../../cards/CardsLoadingLayout";
import BannerLoaderComponent from "./BannerLoaderComponent";

const HomeBanner = () => {
  const { homeBannerData, isLoading }: any = useHomeBanner();
  console.log("homebanner", homeBannerData, isLoading);

  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };

  console.log("home banner loading", isLoading);
  return (
    <>
      {isLoading === "succeeded" && homeBannerData?.length > 0 ? (
        <>
           <div className="intro-section mb-2 container mt-5">
        <div className="row">
          <div className="intro-banner-wrapper col-lg-4 ">
            <div className="banner banner-fixed intro-banner col-lg-12 col-sm-6 br-sm mb-1 d-flex justify-content-around">
              <figure>
                {homeBannerData?.length > 0 && (
                  <Image
                    loader={myLoader}
                    className="d-block w-100"
                    src={homeBannerData[2]?.img}
                    alt="Banner Images"
                    priority
                    width={800}
                    height={900}
                  />
                )}
              </figure>
              <div className="banner-content ternaryTheme-bannerContent">
                <a
                  href="#"
                  className="btn btn-dark btn-link ternaryTheme-btn btn-icon-right"
                >
                  Shop Now<i className="w-icon-long-arrow-right"></i>
                </a>
              </div>
            </div>
            <div className="banner banner-fixed intro-banner col-lg-12 col-sm-6 br-sm mb-1 d-flex justify-content-around">
              <figure>
                {homeBannerData?.length > 0 && (
                  <Image
                    loader={myLoader}
                    className="d-block w-100"
                    src={homeBannerData[1]?.img}
                    alt="Banner Images"
                    priority
                    width={800}
                    height={900}
                  />
                )}
              </figure>
              <div className="banner-content ternaryTheme-bannerContent">
                <a
                  href="#"
                  className="btn btn-dark btn-link ternaryTheme-btn btn-icon-right"
                >
                  Shop Now<i className="w-icon-long-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="intro-slide-wrapper col-lg-8">
            <div className="swiper-container swiper-theme animation-slider pg-inner pg-xxl-hide pg-show pg-white nav-xxl-show nav-hide">
              <div className="swiper-wrapper gutter-no row cols-1">
                <div className="banner banner-fixed intro-banner col-lg-12 col-sm-6 br-sm mb-4 d-flex justify-content-around">
                  <figure>
                    {homeBannerData?.length > 0 && (
                      <Image
                        loader={myLoader}
                        className="d-block w-100"
                        src={homeBannerData[0]?.img}
                        alt="Banner Images"
                        priority
                        width={800}
                        height={600}
                      />
                    )}
                  </figure>
                  <div className="banner-content ternaryTheme-bannerContent">
                    <a
                      href="#"
                      className="btn btn-white btn-link ternaryTheme-btn btn-icon-right"
                    >
                      Shop Now<i className="w-icon-long-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
      ) : (
        <>
          <div className="mb-3">
            <BannerLoaderComponent />
          </div>
        </>
      )}
    </>
  );
};
export default HomeBanner;
