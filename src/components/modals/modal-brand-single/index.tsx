import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from "react";
import { useParams } from "react-router-dom";


import useBrandCategoryStore from "@store-brand-category";
import {postData} from "@brand-category"


const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface propsData{
  title: string;
  id?: number;
  data?: any;
}

export default function BasicModal({title , id , data}:propsData) {
  const { postBrandCategory , updateBrandCategory} = useBrandCategoryStore();


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {brandId} = useParams();
  const newBrandId = Number(brandId);

  /// my code start <-----------------------------
 
  useEffect(() => {
    // getBrand({search:""});
  }, []);



  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    // position: Yup.number().min(0, "must be at least greater than 0"),
  });

  const initialValues: postData = {
    name: data?.name || "", 
  };

  const handelSubmit = async (value:postData ) => {
    const postValue = { name: value.name , brand_id: newBrandId }
    if(!id){
      const status = await postBrandCategory(postValue);
      if (status === 201) {
      toast.success("success full");
      handleClose();
      } else {
       toast.error("Error :" + status);
       handleClose();
      }
    }else{
      const updateData= {id:id, putData : postValue}
      const status = await updateBrandCategory(updateData);
      if (status === 200) {
      toast.success("update success full"); 
      handleClose();
      } else {
       toast.error("Error :" + status);
       handleClose();
      }
    }
  };

  // my code end <--------------------------------

  return (
    <div>
      {
        title == "post" ? 
        <button
        onClick={handleOpen}
        className="py-2 px-6 text-white font-semibold bg-[#2e942ee9] rounded-lg"
      >
        To Open
      </button> : 
      <Button
        color="inherit"
        onClick={handleOpen}
        sx={{ 
          color: '#767676' // HEX formatida rang
        }}
      >
        <EditIcon  />
      </Button>
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handelSubmit}
          >
            <Form className=" max-w-[600px]  w-full flex flex-col gap-[12px]">
              <h1 className="text-center mb-2 text-[26px] font-bold">
                {
                  title == "post"? "Add a brand category" : "Edit a brand category"
                }
              </h1>
              <Field
                as={TextField}
                label="Category name"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="text"
                name="name"
                className=" w-[100%]  mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                     name="name"
                     component="p"
                     className="mb-3 text-red-500 text-center"
                  />
                }
              />
              
              <Button
                sx={{ fontSize: "16px", fontWeight: "600" ,backgroundColor: "#2e942ee9", "&:hover" :{background: "#2e942ee9"} }}
                variant="contained"
                type="submit"
                className="w-[100%] py-3"
              >
                to add
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
