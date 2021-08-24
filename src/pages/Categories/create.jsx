import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Button from "../../components/Button";
import SingleDropdown from "../../components/Dropdown/SingleDropdown";
import InputField from "../../components/FormicFields/TextInputField";
import PageDetailLayout from "../../components/Layout/PageDetailLayout";
import { useAlert } from "../../services/context/AlertContext/index";
import { Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

const CreateCategoryPage = () => {
  const history = useHistory();
  const classes = useStyle();
  const alert = useAlert();

  const createCategory = async (data) => {
    await axios.post("/admin/artCategory/create", data);
  };

  const { mutate: create } = useMutation(createCategory, {
    onSuccess: () => {
      history.push("/artCategory");
      alert.success({ text: "طبقه‌بندی با موفقیت افزوده شد" });
    },
    onError: (error) => {},
  });

  const defaultInitialValues = {
    name: "",
  };

  const validationSchema = () =>
    Yup.object({
      name: Yup.string().required("این فیلد الزامی است"),
    });

  return (
    <div className="bg-white p-10 ">
      <PageDetailLayout title="افزودن طبقه‌بندی جدید" />
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema}
        initialValues={defaultInitialValues}
        onSubmit={(values, formikHelpers) => {
          create(values);
        }}
      >
        {() => (
          <Form>
            <Grid
              container
              direction="column"
              alignItems="center"
              style={{ direction: "ltr" }}
            >
              <Grid item xs={12} className="w-full">
                <InputField name="name" label="نام" required />
              </Grid>{" "}
              <Grid item xs={12} className="w-full">
                {/* <SingleDropdown name="name" label="نام" required /> */}
              </Grid>
              <div className="flex flex-col items-center gap-4  mt-9 w-60">
                <Button type="submit" selected children="ایجاد" />
              </div>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCategoryPage;

const useStyle = makeStyles((theme) => ({}));
