// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { Grid } from "@material-ui/core";
// import Button from "../../components/Button";
// import InputField from "../../components/FormicFields/TextInputField";
// import SingleDropdownField from "../../components/FormicFields/SingleDropdownField";
// import TextAreaField from "../../components/FormicFields/TextAreaField";
// import UploadFileField from "../../components/FormicFields/UploadFileField";
// import PageDetailLayout from "../../components/Layout/PageDetailLayout";
// import RadioButtonField from "../../components/FormicFields/RadioButtonField";
// import { useAlert } from "../../services/context/AlertContext/index";
// import { Form, Formik } from "formik";
// import axios from "axios";
// import * as Yup from "yup";
// import { useQuery, useMutation } from "react-query";
// import { useHistory } from "react-router-dom";

// const CreateArtistPage = () => {
//   const history = useHistory();
//   const classes = useStyle();
//   const alert = useAlert();
//   const [loadingAvatart, setAvatarLoading] = React.useState(false);
//   const [avatar, setAvatar] = React.useState([]);

//   const getArtTopicsData = async () => {
//     const res = await axios.get("/occupation/all");
//     return res.data;
//   };
//   const { data: occupations } = useQuery("/occupation/all", getArtTopicsData);

//   const createTopic = async (data) => {
//     await axios.post("/admin/occupation/create", data);
//   };
//   const { mutate: create } = useMutation(createTopic, {
//     onSuccess: () => {
//       history.push("/artists");
//       alert.success({ text: "هنرمند با موفقیت افزوده شد" });
//     },
//     onError: (error) => {},
//   });

//   const defaultInitialValues = {
//     title: "",
//     artCategory: "",
//     artist: "",
//     artStoryَSpeaker: "",
//     artStoryَAuthor: "",
//     artStoryَVideoURL: "",
//     artStoryَText: "",
//     price: "",
//     count: "",
//     year: "",
//     length: "",
//     height: "",
//     width: "",
//     version: "",
//     sign: false,
//     wayOfCreation: "",
//     images: files,
//   };

//   const validationSchema = () =>
//     Yup.object({
//       title: Yup.string().required("این فیلد الزامی است"),
//       artCategory: Yup.object()
//         .shape({ value: Yup.string(), label: Yup.string() })
//         .required("این فیلد الزامی است"),
//       artist: Yup.object()
//         .shape({ value: Yup.string(), label: Yup.string() })
//         .required("این فیلد الزامی است"),
//       artStoryَSpeaker: Yup.string().required("این فیلد الزامی است"),
//       artStoryَAuthor: Yup.string().required("این فیلد الزامی است"),
//       artStoryَVideoURL: Yup.string()
//         .url("یک آدرس معتبر وارد نمایید")
//         .required("این فیلد الزامی است"),
//       artStoryَText: Yup.string().required("این فیلد الزامی است"),
//       price: Yup.string().required("این فیلد الزامی است"),
//       count: Yup.number()
//         .typeError("این فیلد باید عدد باشد")
//         .required("این فیلد الزامی است"),
//       year: Yup.number()
//         .typeError("این فیلد باید عدد باشد")
//         .required("این فیلد الزامی است"),
//       length: Yup.number()
//         .typeError("این فیلد باید عدد باشد")
//         .required("این فیلد الزامی است"),
//       height: Yup.number()
//         .typeError("این فیلد باید عدد باشد")
//         .required("این فیلد الزامی است"),
//       width: Yup.number()
//         .typeError("این فیلد باید عدد باشد")
//         .required("این فیلد الزامی است"),
//       version: Yup.string().required("این فیلد الزامی است"),
//       wayOfCreation: Yup.string().required("این فیلد الزامی است"),
//       images: Yup.array()
//         .min(1, "این فیلد الزامی است")
//         .required("این فیلد الزامی است"),
//     });

//   const handleCreate = () => {
//     create();
//   };
//   return (
//     <div className="bg-white p-10 ">
//       <PageDetailLayout title="افزودن اثر هنری جدید" />
//       <Formik
//         enableReinitialize
//         validateOnBlur={false}
//         validateOnChange={false}
//         validationSchema={validationSchema}
//         initialValues={defaultInitialValues}
//         onSubmit={(values, formikHelpers) => {
//           handleCreate(values);
//         }}
//       >
//         {() => (
//           <Form>
//             <Grid
//               container
//               justifyContent="space-around"
//               wrap="wrap"
//               className="gap-4"
//             >
//               <Grid item md={5} xs={11} className="w-full">
//                 <InputField name="title" label="عنوان اثر" required />
//               </Grid>
//               <Grid item md={5} xs={11} className="w-full">
//                 <SingleDropdownField
//                   options={categories?.map(({ _id: value, name: label }) => ({
//                     value,
//                     label,
//                   }))}
//                   name="artCategory"
//                   label="طبقه بندی"
//                   required
//                 />
//               </Grid>
//               <Grid item md={5} xs={11} className="w-full">
//                 <InputField
//                   name="artStoryَSpeaker"
//                   label="راوی داستان اثر"
//                   required
//                 />
//               </Grid>
//               <Grid item md={5} xs={11} className="w-full">
//                 <SingleDropdownField
//                   options={artists?.map(({ _id, firstName, lastName }) => ({
//                     value: _id,
//                     label: `${firstName} ${lastName}`,
//                   }))}
//                   name="artist"
//                   label="هنرمند"
//                   required
//                 />
//               </Grid>
//               <Grid item md={5} xs={11} className="w-full">
//                 <InputField
//                   name="artStoryَAuthor"
//                   label="نویسنده داستان اثر"
//                   required
//                 />
//               </Grid>
//               <Grid item md={5} xs={11} className="w-full">
//                 <InputField
//                   name="artStoryَVideoURL"
//                   label="لینک ویدیو داستان اثر"
//                   required
//                 />
//               </Grid>
//               <Grid item xs={11} className="w-full">
//                 <TextAreaField
//                   name="artStoryَText"
//                   label="متن داستان اثر"
//                   required
//                 />
//               </Grid>{" "}
//               <Grid item xs={11} style={{ marginBottom: "1rem" }}>
//                 <UploadFileField
//                   name="images"
//                   label="تصاویر"
//                   required
//                   maxItem={5}
//                   isLoading={loading}
//                   onUpload={(data) => {
//                     setLoading(true);
//                     upload(data);
//                   }}
//                   onDelete={(id) => {
//                     setFile(files?.filter((item) => item !== id));
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={11}>
//                 <hr />
//                 <p className={classes.text}>ویژگی ها </p>
//               </Grid>
//               <Grid item md={3} xs={11} className="w-full">
//                 <InputField name="price" label="قیمت" required />
//               </Grid>
//               <Grid item md={3} xs={11} className="w-full">
//                 <InputField name="count" label="موجودی" required />
//               </Grid>
//               <Grid item md={3} xs={11} className="w-full">
//                 <InputField name="width" label="عرض" required />
//               </Grid>{" "}
//               <Grid item md={3} xs={11} className="w-full">
//                 <InputField name="length" label="طول" required />
//               </Grid>
//               <Grid item md={3} xs={11} className="w-full">
//                 <InputField name="height" label="ارتفاع" required />
//               </Grid>
//               <Grid item md={3} xs={11} className="w-full">
//                 <InputField name="year" label="سال خلق اثر" required />
//               </Grid>
//               <Grid item md={3} xs={11} className="w-full">
//                 <RadioButtonField name="sign" label="امضا" />
//               </Grid>
//               <Grid item md={3} xs={11} className="w-full">
//                 <InputField
//                   name="wayOfCreation"
//                   label="شیوه خلق اثر"
//                   required
//                 />
//               </Grid>
//               <Grid item md={3} xs={11} className="w-full">
//                 <InputField name="version" label="نسخه" required />
//               </Grid>{" "}
//               <Grid item xs={11} />
//               <div className="flex flex-col items-center gap-4  mt-9 w-60">
//                 <Button type="submit" selected children="ایجاد" />
//               </div>
//             </Grid>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default CreateArtistPage;

// const useStyle = makeStyles((theme) => ({
//   text: {
//     fontSize: "1.873rem",
//     fontWeight: "bold",
//     fontFamily: "Vazir",
//     direction: "rtl",
//     marginTop: "1rem",
//     color: theme.palette.grey[800],
//   },
// }));
