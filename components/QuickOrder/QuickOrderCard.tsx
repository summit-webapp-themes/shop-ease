import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../services/config/app-config";
import Image from "next/image";
import Link from "next/link";
import IndianNumber from "./IndianNumber";

const QuickOrderCard = (props: any) => {
  const {
    partNumbersData,
    handleRemove,
    showMinQty,
    handleInputChange,
    selectedMultiLangData,
  } = props;
  console.log(partNumbersData, "quickOrderPartNumbersData");
  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  let total: any;

  const showValue = (qty_value:any) =>
  {
    if(qty_value === 0)
    {
      return 1
    }
    else
    {
      return qty_value;
    }
  }
  return (
    <>
      <div className="mt-3">
        <div className="col-12"></div>

        {partNumbersData?.length > 0 &&
          partNumbersData !== null &&
          partNumbersData
            .filter(
              (element: any, i: any) =>
                i ===
                partNumbersData.findIndex(
                  (elem: any) =>
                    elem.oem_part_number === element.oem_part_number
                )
            )
            .map((data: any, index: any) => (
              <>
                <div className="row mt-3 mb-3">
                  <div className="col-3 text-start">
                    {data.image_url !== null ? (
                      <Image
                        loader={myLoader}
                        src={`${data.image_url}`}
                        // src={maximaCard}
                        alt="product-img"
                        width={100}
                        height={100}
                        className="img-fluid"
                      />
                    ) : (
                      <Image
                        loader={myLoader}
                        src={`${data.brand_img}`}
                        // src={maximaCard}
                        alt="product-img"
                        width={100}
                        height={100}
                        className="img-fluid"
                      />
                    )}
                  </div>
                  <div className="col-3 text-start">
                    <p className="mb-0">
                      {selectedMultiLangData?.item_code}: {data.item_name}
                    </p>
                    <p className="mt-2 mb-0">
                      {selectedMultiLangData?.brand}: {data.brand}
                    </p>

                    <Link href="" legacyBehavior>
                      <a
                        onClick={() => {
                          handleRemove(data);
                        }}
                        className="delete-link"
                      >
                        {selectedMultiLangData?.delete}
                      </a>
                    </Link>
                  </div>
                  <div className="col-2">
                    <p>
                      {data.price !== 0 ? (
                        <IndianNumber value={data?.price} />
                      ) : (
                        <p className="border price_request">
                          {selectedMultiLangData?.price_on_request}
                        </p>
                      )}
                    </p>
                  </div>
                  <div className="col-2">
                    {
                      <>
                        <input
                          type="number"
                          className="w-25 text-center mb-3"
                          value={showValue(data?.min_order_qty)}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                        <br />
                      </>
                    }
                  </div>
                  <div className="col-2">
                    <p>
                      <IndianNumber
                        value={(total = data.price * showValue(data?.min_order_qty))}
                      />
                    </p>
                  </div>
                </div>
              </>
            ))}
      </div>
    </>
  );
};

export default QuickOrderCard;
