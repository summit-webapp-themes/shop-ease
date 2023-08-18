import { useState } from "react";
import CardsLoadingLayout from "../../../cards/CardsLoadingLayout";
import ProductCard from "../../../cards/product-card";
import { ProductsViewProps } from "../../../interfaces/products-view-interface";
import { Norecord } from "../../NoRecord";
import Topbar from "../Topbar";
import ReactPaginate from "react-paginate";

const ProductsGridView = (props: ProductsViewProps) => {
  const {
    loading,
    listItems,
    filtersData,
    productListTotalCount,
    handleLoadMore,
    wishlistData,
    currency_state_from_redux,
    selectedMultiLangData,
    catalogListItem,
    handleAddProduct,
    handleSubmitCatalogName,
    handleChange,
    handlePaginationBtn,
  } = props;

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageOffset, setpageOffset] = useState<number>(0);
  const usersPerPage :number= 12;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount:any = Math.ceil(productListTotalCount / 12);

  const handlePageClick = (event: any) => {
    // console.log("page number", event?.selected);
    handlePaginationBtn(event?.selected);
    setpageOffset(event?.selected);
  };
  console.log("cube in card", listItems);
  return (
    <div
      className={`${filtersData && filtersData?.length > 0 ? "col-lg-9" : "col-lg-12"
        }`}
    >
      <div className="row">
        {loading ? (
          <div className="row justify-content-center">
            {[...Array(10)].map(() => (
              <>
                <div className="col-lg-2 mx-3">
                  <CardsLoadingLayout />
                </div>
              </>
            ))}
          </div>
        ) : listItems.length > 0 ? (
          listItems?.map((items: any, index: number) => (
            <div className="col-md-3 mt-3 my-2" key={index}>
              <ProductCard
                key={index}
                name={items?.name}
                item_name={items?.item_name}
                item_slug={items?.product_slug}
                currency_symbol={items?.currency_symbol}
                price={items?.price}
                mrp_price={items?.mrp_price}
                img_url={items?.image_url}
                in_stock_status={items?.in_stock_status}
                url={items?.url}
                brand={items?.brand}
                brand_img={items?.brand_img}
                display_tag={items?.display_tag}
                star_rating={items?.rating}
                wishlistData={wishlistData}
                currency_state_from_redux={currency_state_from_redux}
                selectedMultiLangData={selectedMultiLangData}
                catalogListItem={catalogListItem}
                handleAddProduct={handleAddProduct}
                handleSubmitCatalogName={handleSubmitCatalogName}
                handleChange={handleChange}
              />
            </div>
          ))
        ) : (
          <Norecord
            heading={selectedMultiLangData?.product_not_found}
            content={selectedMultiLangData?.product_not_found_s}
            selectedMultiLangData={selectedMultiLangData}
          />
        )}
      </div>

      {productListTotalCount > listItems?.length && (
            <div>
              <ReactPaginate
                previousLabel={selectedMultiLangData?.prev}
                nextLabel={selectedMultiLangData?.next}
                pageCount={pageCount}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
                forcePage={pageOffset}
              />
            </div>
          )}
    </div>
  );
};

export default ProductsGridView;
