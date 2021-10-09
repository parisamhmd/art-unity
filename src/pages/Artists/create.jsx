import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Button from "../../components/Button";
import InputField from "../../components/FormicFields/TextInputField";
import SingleDropdownField from "../../components/FormicFields/SingleDropdownField";
import TextAreaField from "../../components/FormicFields/TextAreaField";
import UploadFileField from "../../components/FormicFields/UploadFileField";
import OptionPlusField from "../../components/FormicFields/OptionPlusField";
import PageDetailLayout from "../../components/Layout/PageDetailLayout";
import QuoteField from "../../components/FormicFields/QuoteField";
import { useAlert } from "../../services/context/AlertContext/index";
import { Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import CustomField from "../../components/FormicFields/customField";

const CreateArtistPage = () => {
  const history = useHistory();
  const classes = useStyle();
  const alert = useAlert();
  const [life, setLife] = React.useState([]);

  const getArtTopicsData = async () => {
    const res = await axios.get("/occupation/all");
    return res.data;
  };
  const { data: occupations } = useQuery("/occupation/all", getArtTopicsData);

  const createArtist = async (data) => {
    await axios.post("/admin/artist/create", data);
  };
  const { mutate: create } = useMutation(createArtist, {
    onSuccess: () => {
      history.push("/artists");
      alert.success({ text: "هنرمند با موفقیت افزوده شد" });
    },
    onError: (error) => {},
  });

  const defaultInitialValues = {
    firstName: "",
    lastName: "",
    occupation: "",
    aboutme: "",
    birthPlace: "",
    birthYear: "",
    onedaywithme: "",
    interview: "",
    lifeRoute: [],
    favQoute: "",
    avatarImage: "",
    headerImage: "",
  };

  const validationSchema = () =>
    Yup.object({
      firstName: Yup.string().required("این فیلد الزامی است"),
      lastName: Yup.string().required("این فیلد الزامی است"),
      occupation: Yup.object()
        .shape({ value: Yup.string(), label: Yup.string() })
        .required("این فیلد الزامی است"),
      birthPlace: Yup.string().required("این فیلد الزامی است"),
      birthYear: Yup.number()
        .typeError("این فیلد باید عدد باشد")
        .required("این فیلد الزامی است"),
      aboutme: Yup.string().required("این فیلد الزامی است"),
      onedaywithme: Yup.object()
        .shape({
          image: Yup.string().required("این فیلد الزامی است"),
          url: Yup.string()
            .url("یک آدرس معتبر وارد نمایید")
            .required("این فیلد الزامی است"),
          text: Yup.string().required("این فیلد الزامی است"),
        })
        .required("این فیلد الزامی است"),
      interview: Yup.object().shape({
        image: Yup.string().required("این فیلد الزامی است"),
        url: Yup.string()
          .url("یک آدرس معتبر وارد نمایید")
          .required("این فیلد الزامی است"),
        text: Yup.string().required("این فیلد الزامی است"),
      }),
      lifeRoute: Yup.array().of(
        Yup.object().shape({
          title: Yup.string().required("این فیلد الزامی است"),
          image: Yup.string().required("این فیلد الزامی است"),
          text: Yup.string().required("این فیلد الزامی است"),
        })
      ),
      favQoute: Yup.object().shape({
        image: Yup.string().required("این فیلد الزامی است"),
        occupation: Yup.string().required("این فیلد الزامی است"),
        text: Yup.string().required("این فیلد الزامی است"),
        qouteTeller: Yup.string().required("این فیلد الزامی است"),
      }),
      avatarImage: Yup.array().required("این فیلد الزامی است"),
      headerImage: Yup.array().required("این فیلد الزامی است"),
    });

  const handleCreate = (v) => {
    const data = {
      ...v,
      avatarImage: v.avatarImage[0],
      headerImage: v.headerImage[0],
      occupation: v.occupation.value,
    };
    console.log(data);
    create(data);
  };
  return (
    <div className="bg-white p-10 ">
      <PageDetailLayout title="افزودن هنرمند جدید" />
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema}
        initialValues={defaultInitialValues}
        onSubmit={(values, formikHelpers) => {
          handleCreate(values);
        }}
      >
        {() => (
          <Form>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              wrap="wrap"
              className="gap-4"
            >
              <Grid item md={5} xs={11} className="w-full">
                <InputField name="firstName" label="نام" required />
              </Grid>
              <Grid item md={5} xs={11} className="w-full">
                <InputField name="lastName" label="نام خانوادگی" required />
              </Grid>
              <Grid item md={5} xs={11} className="w-full">
                <InputField name="birthPlace" label="محل تولد" required />
              </Grid>
              <Grid item md={5} xs={11} className="w-full">
                <InputField name="birthYear" label="سال تولد" required />
              </Grid>{" "}
              <Grid item md={5} xs={11} className="w-full">
                <SingleDropdownField
                  options={occupations?.map(({ _id: value, name: label }) => ({
                    value,
                    label,
                  }))}
                  name="occupation"
                  label="مهارت"
                  required
                />
              </Grid>
              <Grid
                container
                justifyContent="space-around"
                item
                md={5}
                xs={11}
                className="w-full"
              >
                <Grid item md={5} xs={11} style={{ marginBottom: "1rem" }}>
                  <UploadFileField
                    name="avatarImage"
                    label="تصویر آواتار هنرمند"
                    required
                    maxItem={1}
                  />
                </Grid>
                <Grid item md={5} xs={11} style={{ marginBottom: "1rem" }}>
                  <UploadFileField
                    name="headerImage"
                    label="تصویر پس‌زمینه هنرمند"
                    required
                    maxItem={1}
                  />
                </Grid>
              </Grid>
              <Grid item xs={11} className="w-full">
                <TextAreaField name="aboutme" label="درباره من" required />
              </Grid>{" "}
              <Grid item md={5} xs={11} className="w-full">
                <CustomField
                  name="onedaywithme"
                  label="یک روز با من"
                  required
                />
              </Grid>{" "}
              <Grid item md={5} xs={11} className="w-full">
                <CustomField name="interview" label="مصاحبه" required />
              </Grid>{" "}
              <Grid item xs={11} className="w-full">
                <QuoteField name="favQoute" label="نقل قول" required />
              </Grid>
              <Grid item xs={11} className="w-full">
                <OptionPlusField
                  name="lifeRoute"
                  label="زندگی من"
                  required
                  maxItem={5}
                />
              </Grid>
              <Grid item xs={11} />
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

export default CreateArtistPage;

const useStyle = makeStyles((theme) => ({
  text: {
    fontSize: "1.873rem",
    fontWeight: "bold",
    fontFamily: "Vazir",
    direction: "rtl",
    marginTop: "1rem",
    color: theme.palette.grey[800],
  },
}));
