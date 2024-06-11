import axios from 'axios';
import  { useState } from "react";
import { Button, Drawer, Input, Upload } from "antd";
import {getCookies} from "@coocse"
import * as Yup from "yup";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { toast } from "react-toastify";

interface FormValues {
  quantity: string;
  description: string;
  discount: string;
  colors: string;
  product_id: any;
  files: File[];
}
export const postProductSchema2 = Yup.object().shape({
    quantity: Yup.number().required("Please enter quantity"),
    description: Yup.string().required("Please enter description"),
    discount: Yup.number().required("Please enter discount"),
    colors: Yup.string().required("Please enter color"),
  });

const Testdraever  = ({id}:{id:number}) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const initialValues: FormValues = {
    quantity: "",
    description: "",
    discount: "",
    colors: "",
    product_id: id || "",
    files: [],
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values: FormValues) => {
    const productId: any = id || "";
    const formData = new FormData();
    formData.append("quantity", values.quantity);
    formData.append("description", values.description);
    formData.append("discount", values.discount);
    formData.append("colors", values.colors);
    formData.append("product_id", productId);

    values.files.forEach((file) => {
      formData.append("files", file);
    });
    const access_token = getCookies("access_token") 
     
    try {
      const response = await axios.post("https://ecomapi.ilyosbekdev.uz/product-detail/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:  `Bearer ${access_token}`
        },
      });
       if (response && response.status === 201) {
        toast.success("Product added successfully");
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
       <button
        aria-label="add to favorites"
        onClick={showDrawer}
        className="py-2 px-5 rounded-md bg-[#2e942ee9] text-white"
      >
        To add
      </button>

      {}
      <Drawer
        title="Product Details"
        onClose={onClose}
        open={open}
        className="pt-[60px]"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={postProductSchema2}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col gap-5">
              <Field
                type="number"
                name="quantity"
                as={Input}
                placeholder="Quantity"
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="text-[#ff0000] mt-0"
              />
              <Field
                type="text"
                name="description"
                as={Input}
                placeholder="Description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-[#ff0000]"
              />
              <Field
                type="number"
                name="discount"
                as={Input}
                placeholder="Discount"
              />
              <ErrorMessage
                name="discount"
                component="div"
                className="text-[#ff0000]"
              />
              <Field type="text" name="colors" as={Input} placeholder="Color" />
              <ErrorMessage
                name="colors"
                component="div"
                className="text-[#ff0000]"
              />
              <Field name="files">
                {({ field }: any) => (
                  <Upload
                    {...field}
                    multiple
                    beforeUpload={(file) => {
                      setFieldValue(
                        "files",
                        field.value ? [...field.value, file] : [file]
                      );
                      return false;
                    }}
                  >
                    <Button >Click to Upload</Button>
                  </Upload>
                )}
              </Field>
              <ErrorMessage
                name="files"
                component="div"
                className="text-[#ff0000]"
              />
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                style={{
                  backgroundColor: "#2e942ee9",
                  color: "white",
                  borderColor: "#2e942ee9",
                }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Drawer>
    </>
  );
};

export default Testdraever