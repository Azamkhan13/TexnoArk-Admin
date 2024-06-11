import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { auth } from "@service-auth";
import { getCookies } from "@coocse";
import { ModalDeleteAcount } from "@modals";
import { Draever } from "@ui";

function index() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState<any>({});
  const adminId = Number(getCookies("admin_id"));

  const getAdminData = async (id: number) => {
    try {
      const respons = await auth.getAdminId(id);
      if (respons.status === 200) {
        setAdminData(respons.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAdminData(adminId);
  }, []);

  const addAccount = () => {
    navigate("/");
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div className="flex flex-col  md:flex-row items-center gap-[50px]">
          <img
            className=" w-[500px]"
            src="https://yt3.googleusercontent.com/ytc/AIdro_no1VyIpKgOOgPKf3DRmPUMcCj2yo7UAAdpueb2rvg_OGA=s900-c-k-c0x00ffffff-no-rj"
            alt="Admin img"
          />
          <div className=" sm:flex-row items-start gap-[60px]">
            <div className=" flex flex-col items-start gap-6">
              <div>
                <h2 className=" inline-block border-b text-[30px]">First name</h2>
                <h1 className="text-[18px] font-semibold">
                  {adminData?.first_name}
                </h1>
              </div>
              <div>
                <h2 className=" inline-block border-b text-[30px]">Last name</h2>
                <h1 className="text-[18px] font-semibold">
                  {adminData?.last_name}
                </h1>
              </div>
              <div>
                <h2 className=" inline-block border-b text-[30px]">Phone number</h2>
                <h1 className="text-[18px] font-semibold">
                  {adminData?.phone_number}
                </h1>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <div>
                <h2 className=" inline-block border-b text-[30px]">Email</h2>
                <h1 className="text-[18px] font-semibold">
                  {adminData?.email}
                </h1>
              </div>
              <div>
                <h2 className=" inline-block border-b text-[30px]">Created at</h2>
                <h1 className="text-[18px] font-semibold">
                  {adminData?.createdAt
                    ? adminData?.createdAt.slice(0, 10)
                    : ""}
                </h1>
              </div>
              <div>
                <h2 className=" inline-block border-b text-[30px]">Updated at</h2>
                <h1 className="text-[18px] font-semibold">
                  {adminData?.lastUpdateAt
                    ? adminData?.lastUpdateAt.slice(0, 10)
                    : ""}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <Draever id={adminId} data={adminData} />
                <ModalDeleteAcount id={adminId} />
                <button
                  onClick={addAccount}
                  className="py-2 px-5 rounded-md bg-[#2e942ee9] text-white font-medium"
                >
                  + add acount
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
