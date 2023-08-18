import { ProductsProps } from "../../../interfaces/products-view-interface";
import ProductListViewCard from "../../../cards/product-list-view-card";
import ListViewLoadingLayout from "./ListViewLoadingLayout";
import { Norecord } from "../../NoRecord";
import { useState } from "react";
import ReactPaginate from "react-paginate";
const ProductsListView = (props: ProductsProps) => {
  // console.log("product card", props.product_data);

  const {
    listItems,
    productListTotalCount,
    loading,
    product_data,
    filtersData,
    handleRenderingOfImages,
    wishlistData,
    handleLoadMore,
    currency_state_from_redux,
    selectedMultiLangData,
    catalogListItem,
    handleAddProduct,
    handleSubmitCatalogName,
    handleChange,
    handlePaginationBtn,
  } = props;

  console.log("load moreee", productListTotalCount, product_data);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageOffset, setpageOffset] = useState<number>(0);
  const usersPerPage: number = 12;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount: any = Math.ceil(productListTotalCount / 12);

  const handlePageClick = (event: any) => {
    // console.log("page number", event?.selected);
    handlePaginationBtn(event?.selected);
    setpageOffset(event?.selected);
  };
  return (
    <div
      className={`${
        filtersData && filtersData?.length > 0 ? "col-lg-9" : "col-lg-12"
      }`}
    >
      {loading ? (
        <div className="row justify-content-center">
          {[...Array(10)].map(() => (
            <>
              <div className="col-lg-12 mx-3">
                <ListViewLoadingLayout />
              </div>
            </>
          ))}
        </div>
      ) : (
        <div className="row ">
          {product_data && product_data.length > 0 ? (
            product_data.map((product: any, index: number) => {
              return (
                <div key={index} className="p-0 my-1 ">
                  <ProductListViewCard
                    currency_state_from_redux={currency_state_from_redux}
                    product_data={product}
                    key={index}
                    wishlistData={wishlistData}
                    handleRenderingOfImages={handleRenderingOfImages}
                    selectedMultiLangData={selectedMultiLangData}
                    catalogListItem={catalogListItem}
                    handleAddProduct={handleAddProduct}
                    handleSubmitCatalogName={handleSubmitCatalogName}
                    handleChange={handleChange}
                  />
                </div>
              );
            })
          ) : (
            <Norecord
              heading=""
              content="Looking for something specific but couldn't find it?"
              selectedMultiLangData={selectedMultiLangData}
            />
          )}
        </div>
      )}

      {productListTotalCount > product_data?.length && (
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
export default ProductsListView;
