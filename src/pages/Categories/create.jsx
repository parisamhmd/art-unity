import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Button from "../../components/Button";
import InputField from "../../components/FormicFields/TextInputField";
import PageDetailLayout from "../../components/Layout/PageDetailLayout";
import { useAlert } from "../../services/context/AlertContext/index";
import { Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import UploadInput from "../../components/UploadImage";
import mock from "../../services/assets/Img/mock.jfif";

const CreateCategoryPage = () => {
  const history = useHistory();
  const classes = useStyle();
  const alert = useAlert();
  const [loading, setLoading] = React.useState(false);
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
              //   direction="column"
              alignItems="center"
              justifyContent="space-around"
              wrap="wrap"
              style={{ direction: "ltr" }}
            >
              <Grid item xs={5} className="w-full">
                <InputField name="name" label="نام" required />
              </Grid>{" "}
              <Grid item xs={5} className="w-full">
                <UploadInput
                  files={[
                    { src: mock, id: 1 },
                    { src: mock, id: 2 },
                    { src: mock, id: 3 },
                    { src: mock, id: 4 },
                    { src: mock, id: 5 },
                    { src: mock, id: 6 },
                  ]}
                  maxItem={8}
                  isLoading={loading}
                  onSend={(e) => {
                    console.log(e);
                    setLoading(true);
                  }}
                  onDelete={(e) => console.log(e, " Delete")}
                />
              </Grid>{" "}
              <div className="flex flex-col items-center gap-4  mt-9 w-60">
                <Button type="submit" selected children="ایجاد" />
              </div>{" "}
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCategoryPage;

const useStyle = makeStyles((theme) => ({}));
