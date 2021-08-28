import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Button from "../../components/Button";
import InputField from "../../components/FormicFields/TextInputField";
import UploadFileField from "../../components/FormicFields/UploadFileField";
import MultiDropdownField from "../../components/FormicFields/MultiDropdownField";
import PageDetailLayout from "../../components/Layout/PageDetailLayout";
import { useAlert } from "../../services/context/AlertContext/index";
import { Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";

const SingleCategoryPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyle();
  const alert = useAlert();

  const [loading, setLoading] = React.useState(false);
  const [files, setFile] = React.useState([]);

  const getCategoryData = async () => {
    const res = await axios.get(`admin/artCategory/${id}/`);
    return res.data;
  };
  const { data: initialData } = useQuery(
    `admin/artCategory/${id}/`,
    getCategoryData,
    {
      onError: (err) => {
        if (err.response.status === 403) {
          history.push("/login");
        }
      },
      enabled: !!id,
    }
  );

  const getArtTopicsData = async () => {
    const res = await axios.get("/artTopic/all");
    return res.data;
  };
  const { data: topics } = useQuery("/artTopic/all", getArtTopicsData);

  const editCategory = async (data) => {
    await axios.put(`/admin/artCategory/update/${id}`, data);
  };
  const { mutate: edit } = useMutation(editCategory, {
    onSuccess: () => {
      alert.success({ text: "طبقه‌بندی با موفقیت ویرایش شد" });
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
      setLoading(false);
    },
  });

  const defaultInitialValues = {
    name: "",
    artTopic: [],
    image: files,
  };

  const validationSchema = () =>
    Yup.object({
      name: Yup.string().required("این فیلد الزامی است"),
      artTopic: Yup.array()
        .min(1, "حداقل یک تاپیک انتخاب نمایید")
        .required("این فیلد الزامی است"),
      image: Yup.array()
        .min(1, "این فیلد الزامی است")
        .required("این فیلد الزامی است"),
    });

  return (
    <div className="bg-white p-10 ">
      <PageDetailLayout title="افزودن طبقه‌بندی جدید" />
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema}
        initialValues={
          {
            ...initialData,
            artTopic: initialData?.artTopic?.map(
              ({ _id: value, name: label }) => ({ value, label })
            ),
            image: files /**maybe This is wrong! */,
          } || defaultInitialValues
        }
        onSubmit={(values, formikHelpers) => {
          const data = {
            name: values.name,
            artTopic: values.artTopic.map(({ value }) => value),
            image: values.image[0],
          };
          edit(data);
        }}
      >
        {() => (
          <Form>
            <Grid container justifyContent="space-around" wrap="wrap">
              <Grid item md={5} xs={11} className="w-full">
                <InputField name="name" label="نام" required />
              </Grid>{" "}
              <Grid item md={5} xs={11} className="w-full">
                <MultiDropdownField
                  name="artTopic"
                  label="تاپیک"
                  required
                  options={
                    topics &&
                    topics?.map(({ _id: value, name: label }) => ({
                      value,
                      label,
                    }))
                  }
                />
              </Grid>{" "}
              <Grid item xs={11} className="w-full">
                <UploadFileField
                  name="image"
                  label="تصویر"
                  required
                  maxItem={1}
                  isLoading={loading}
                  onUpload={(data) => {
                    setLoading(true);
                    upload(data);
                  }}
                />
              </Grid>{" "}
              <div className="flex flex-col items-center gap-4  mt-9 w-60">
                <Button type="submit" selected children="ویرایش" />
              </div>{" "}
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SingleCategoryPage;

const useStyle = makeStyles((theme) => ({}));
