import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { ToastContainer } from "react-toastify";

import { TestDraever , ProductDraever } from "@ui";
import {ModalDleteProductDetels} from "@modals"
import useProductStore from "@store-product";
import "./style.scss";

function index() {
  const { id } = useParams();
  const productId = Number(id);
  const { getProductId , productsId, isLoader } = useProductStore();

  // console.log(typeof(productId));

  const getProduct = () => {
    getProductId(productId);
  };

  // function getProductId useEffection <-------
  useEffect(() => {
    getProduct();
  }, [productId]);
  //=-=-=-=-=-=====-=-==-=-==-==-=-=-=-=-=-=-=-=-=-

  return (
    <>
      <ToastContainer />
      {isLoader ? (
        <div className="w-full h-full min-h[80vh] flex items-center justify-center">
          <div>
            {[1, 2, 3].map((_, i) => {
              return (
                <div key={i} className="skeleton">
                  <div className="s-img"></div>
                  <div className="s-line first"></div>
                  <div className="s-line second"></div>
                  <div className="s-line third"></div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          {productsId?.product_detail ? (
            <div className="flex flex-col md:flex-row  items-start justify-between pt-[70px]">
              <div className="max-w-[600px] max-h-[700px] w-full h-full ">
                {productsId?.product_detail?.images && (
                  <ImageGallery
                    autoPlay={false}
                    infinite={true}
                    thumbnailPosition={"left"}
                    showPlayButton={false}
                    showFullscreenButton={true}
                    items={productsId?.product_detail?.images?.map(
                      (image: any) => {
                        return {
                          original: image,
                          thumbnail: image,
                        };
                      }
                    )}
                  />
                )}
                {/* <img  className=" max-h-[450px] w-full h-full" src={product?.image_url ? product?.image_url[0] : "https://i.pinimg.com/564x/0c/bb/aa/0cbbaab0deff7f188a7762d9569bf1b3.jpg"} alt={product?.product_name} /> */}
              </div>
              <div className="p-2 md:max-w-[330px] lg:max-w-[550px] w-full">
                <h1 className="text-center text-[22px]">
                  {productsId?.product?.name}
                </h1>
                <p className="py-3 text-gray-600">
                  Product description :{" "}
                  {productsId?.product_detail?.description}
                </p>
                {/* <p className="flex items-center justify-between pb-[2px] border-b  mb-2 ">Sifati : <Stack spacing={1} sx={{paddingY:1}}>
               <Rating name="size-medium" defaultValue={4} size="large" />
             </Stack>
          </p> */}
                <p className="flex items-center justify-between pb-[2px] border-b mb-2 ">
                  Product colors :{" "}
                  <span className=" text-gray-500 pl-2">
                    {" "}
                    {productsId?.product_detail?.colors &&
                      productsId?.product_detail?.colors.map((el: any) => {
                        return (
                          <span key={el} className="   pl-3">
                            {el}{" "}
                          </span>
                        );
                      })}
                  </span>
                </p>
                <p className="flex items-center justify-between pb-[2px] border-b mb-2 ">
                  Product quantity :{" "}
                  <span className="text-red-500 pl-2">
                    {productsId?.product_detail?.quantity} ta
                  </span>
                </p>
                <p className="flex items-center justify-between pb-[2px] border-b  mb-2 ">
                  Product discount indicator :{" "}
                  <span className="text-red-500 pl-2">
                    {productsId?.product_detail?.discount} %
                  </span>{" "}
                </p>
                <del className=" text-gray-500 font-serif flex justify-end">
                  {productsId?.product?.price} $
                </del>
                <p className="flex items-center justify-between pb-[2px] border-b  mb-2 ">
                  Price :{" "}
                  <span className=" text-red-500">
                    {" "}
                    {Math.ceil(
                      productsId?.product?.price -
                        (productsId?.product?.price / 100) *
                          productsId?.product_detail?.discount
                    )}{" "}
                    $
                  </span>
                </p>
                <div className="flex items-center justify-end">
                  <div className="flex items-center justify-end gap-3 mt-2">
                    <ProductDraever data={productsId?.product_detail} id={productsId?.product?.id} />
                    <ModalDleteProductDetels id={productsId?.product_detail?.id} />
                  </div>
                </div>
              </div>
            </div>
          ) : (

            <div className="w-full h-full">
              <div className="">
                <div className="flex flex-col gap-2 max-w-[400px]">
                  <h1 className="flex items-center justify-between pb-1 border-b ">
                    Product name :{" "}
                    <span className="text-[#D56E00] font-medium">
                      {productsId?.product?.name}
                    </span>
                  </h1>
                  <p className="flex items-center justify-between pb-1 border-b ">
                    Product price :{" "}
                    <span className="text-[#D56E00] font-medium">
                      {productsId?.product?.price} $
                    </span>
                  </p>
                  <div className="flex items-center justify-between">
                    <p>product details :</p>
                    {/* <ProductDraever id={productId} /> */}
                    <TestDraever id={productId} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default index;
