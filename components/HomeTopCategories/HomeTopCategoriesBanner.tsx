import React from "react";
import { CONSTANTS } from "../../services/config/app-config";
import Image from "next/image";
import BannerLoaderComponent from "../HomeBanners/BannerLoaderComponent";
import Link from "next/link";
import useNavbar from "../../hooks/GeneralHooks/NavbarHooks/NavbarHook";

const HomeTopCategoriesBanner = ({ homeTopCategories }: any) => {

  console.log("homeTopCategories",homeTopCategories)
  const {
    selectedCurrencyValue
  } = useNavbar();
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
           <div className="container category_heading">
        <div className="row">
          {homeTopCategories?.length > 0 && homeTopCategories !== null ? (
            <>
              {homeTopCategories?.length > 0 ? (
              
                <>
                  {homeTopCategories
                    ?.slice(4, 6)
                    ?.map((banner: any, index: any) => (
                      <div className="col-lg-6 col-12" key={banner.name}>
                        <>
                          <Image
                            loader={imageLoader}
                            src={banner.product_img}
                            alt="banner of Topcategory"
                            width={600}
                            height={150}
                            className="topcat_banners"
                          
                          />
                        </>
                      </div>
                    ))}
                
                </>
              ) : (
                <>
                  <div className="col-lg-6 text-end">
                    <Image
                      src="/assets/images/maximaCard.jpg"
                      width="300"
                      height="250"
                      alt="categories banner img"
                      style={{ height: "250px",width:"auto" }}
                    />
                  </div>
                  <div className="col-lg-6" style={{ backgroundColor: "gray" }}>
                    <Image
                      src="/assets/images/maximaCard.jpg"
                      width="300"
                      height="250"
                      alt="categories banner img"
                      style={{ height: "250px",width:"auto" }}
                    />
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="container">
              <div className="row justify-content-center">
                {[...Array(3)].map(() => (
                  <>
                    <div className="col-lg-3 mx-5">
                      <BannerLoaderComponent />
                    </div>
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeTopCategoriesBanner;
