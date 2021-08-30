import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Button from "../../components/Button";
import InputField from "../../components/FormicFields/TextInputField";
import SingleDropdownField from "../../components/FormicFields/SingleDropdownField";
import TextAreaField from "../../components/FormicFields/TextAreaField";
import UploadFileField from "../../components/FormicFields/UploadFileField";
import PageDetailLayout from "../../components/Layout/PageDetailLayout";
import RadioButtonField from "../../components/FormicFields/RadioButtonField";
import { useAlert } from "../../services/context/AlertContext/index";
import { Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";

const CreateArtistPage = () => {
  const history = useHistory();
  const classes = useStyle();
  const alert = useAlert();

  const getArtTopicsData = async () => {
    const res = await axios.get("/occupation/all");
    return res.data;
  };
  const { data: occupations } = useQuery("/occupation/all", getArtTopicsData);

  const createTopic = async (data) => {
    await axios.post("/admin/artist/create", data);
  };
  const { mutate: create } = useMutation(createTopic, {
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
          image: Yup.string(),
          url: Yup.string(),
          text: Yup.string(),
        })
        .required("این فیلد الزامی است"),
      interview: Yup.object().shape({
        image: Yup.string(),
        url: Yup.string(),
        text: Yup.string(),
      }),
      lifeRoute: Yup.array().shape({
        title: Yup.string(),
        image: Yup.string(),
        text: Yup.string(),
      }),
      favQoute: Yup.object().shape({
        image: Yup.string(),
        occupation: Yup.string(),
        text: Yup.string(),
        qouteTeller: Yup.string(),
      }),
      avatarImage: Yup.string().required("این فیلد الزامی است"),
      headerImage: Yup.string().required("این فیلد الزامی است"),
    });

  const handleCreate = () => {
    create();
  };
  return (
    <div className="bg-white p-10 ">
      <PageDetailLayout title="افزودن اثر هنری جدید" />
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
                <SingleDropdownField
                  options={occupations?.map(({ _id: value, name: label }) => ({
                    value,
                    label,
                  }))}
                  name="occupation"
                  label="مهارت"
                  required
                />
              </Grid>{" "}
              <Grid item md={5} xs={11} className="w-full">
                <InputField name="birthPlace" label="محل تولد" required />
              </Grid>
              <Grid item md={5} xs={11} className="w-full">
                <InputField name="birthYear" label="سال تولد" required />
              </Grid>
              <Grid item xs={11} className="w-full">
                <TextAreaField name="aboutme" label="درباره من" required />
              </Grid>
              <Grid item xs={11} style={{ marginBottom: "1rem" }}>
                <UploadFileField
                  name="avatarImage"
                  label="تصویر آواتار هنرمند"
                  required
                  maxItem={1}
                />
              </Grid>
              <Grid item md={5} xs={11} className="w-full">
                <InputField
                  name="artStoryَSpeaker"
                  label="راوی داستان اثر"
                  required
                />
              </Grid>
              <Grid item md={5} xs={11} className="w-full">
                <InputField
                  name="artStoryَAuthor"
                  label="نویسنده داستان اثر"
                  required
                />
              </Grid>
              <Grid item md={5} xs={11} className="w-full">
                <InputField
                  name="artStoryَVideoURL"
                  label="لینک ویدیو داستان اثر"
                  required
                />
              </Grid>
              <Grid item xs={11} className="w-full">
                <TextAreaField
                  name="artStoryَText"
                  label="متن داستان اثر"
                  required
                />
              </Grid>{" "}
              <Grid item xs={11} style={{ marginBottom: "1rem" }}>
                <UploadFileField
                  name="images"
                  label="تصاویر"
                  required
                  maxItem={5}
                />
              </Grid>
              <Grid item xs={11}>
                <hr />
                <p className={classes.text}>ویژگی ها </p>
              </Grid>
              <Grid item md={3} xs={11} className="w-full">
                <InputField name="price" label="قیمت" required />
              </Grid>
              <Grid item md={3} xs={11} className="w-full">
                <InputField name="count" label="موجودی" required />
              </Grid>
              <Grid item md={3} xs={11} className="w-full">
                <InputField name="width" label="عرض" required />
              </Grid>{" "}
              <Grid item md={3} xs={11} className="w-full">
                <InputField name="length" label="طول" required />
              </Grid>
              <Grid item md={3} xs={11} className="w-full">
                <InputField name="height" label="ارتفاع" required />
              </Grid>
              <Grid item md={3} xs={11} className="w-full">
                <InputField name="year" label="سال خلق اثر" required />
              </Grid>
              <Grid item md={3} xs={11} className="w-full">
                <RadioButtonField name="sign" label="امضا" />
              </Grid>
              <Grid item md={3} xs={11} className="w-full">
                <InputField
                  name="wayOfCreation"
                  label="شیوه خلق اثر"
                  required
                />
              </Grid>
              <Grid item md={3} xs={11} className="w-full">
                <InputField name="version" label="نسخه" required />
              </Grid>{" "}
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
