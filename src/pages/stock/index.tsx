import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import useStockStore from "@store-stock";
import { GlobalTable, GlobalPogination } from "@ui";
import { ModalStock } from "@modals";
function index() {
  const [parms, setParams] = useState({ limit: 5, page: 1 });
  const { getStock, dataStock, isLoader, totlCount } = useStockStore();
  const totleCuont2 = Math.ceil(totlCount / parms?.limit);

  useEffect(() => {
    getStock(parms);
  }, [parms, setParams]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const pageNuber = page ? parseInt(page) : 1;
    setParams((preParams) => ({
      ...preParams,
      page: pageNuber,
    }));
  }, [location.search]);
  const theder = [
    { title: "S/N", value: "t/r" },
    {title: "Product name" , value:"product_id?.name"},
    { title: "Quantity", value: "quantity" },
    { title: "Action", value: "action7" },
  ];

  const changePage = (value: number) => {
    setParams((preParams) => ({
      ...preParams,
      page: value,
    }));
  };

  return (
    <>
      <ToastContainer />
      <div className="py-3 flex items-center justify-end">
        <ModalStock title="post" />
      </div>
      <GlobalTable heders={theder} body={dataStock} skelatonLoader={isLoader} />
      <GlobalPogination
        totleCuont={totleCuont2}
        page={parms?.page}
        setParams={changePage}
      />
    </>
  );
}

export default index;
