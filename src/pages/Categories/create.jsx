import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Button from "../../components/Button";
import InputField from "../../components/FormicFields/TextInputField";
import UploadInputField from "../../components/UploadImage";
import PageDetailLayout from "../../components/Layout/PageDetailLayout";
import { useAlert } from "../../services/context/AlertContext/index";
import { Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import mock from "../../services/assets/Img/mock.jfif";

const CreateCategoryPage = () => {
  const history = useHistory();
  const classes = useStyle();
  const alert = useAlert();
  const [loading, setLoading] = React.useState(false);
  const [files, setFile] = React.useState([]);

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

  const uploadFile = async (data) => {
    const res = await axios.post("/admin/upload?type=art", data);
    return res.data;
  };
  const { mutate: upload } = useMutation(uploadFile, {
    onSuccess: (data) => {
      setFile([...files, data.url]);
      console.log(data);
      setLoading(false);
    },
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
              <Grid item md={5} xs={11} className="w-full">
                <InputField name="name" label="نام" required />
              </Grid>{" "}
              <Grid item md={5} xs={11} className="w-full">
                {/* <UploadInput
                  label="تصویر"
                  required
                  files={files.map((file) => ({ src: file, id: file }))}
                  maxItem={2}
                  isLoading={loading}
                  onSend={(event) => {
                    const data = new FormData();
                    data.append("file", event.target.files[0]);
                    upload(data);
                    setLoading(true);
                  }}
                  onDelete={(id) => {
                    setFile(files?.filter((item) => item !== id));
                  }}
                /> */}
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
