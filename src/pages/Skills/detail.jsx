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
import { useQuery, useMutation } from "react-query";
import { useHistory, useParams } from "react-router-dom";

const SingleOccupationPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const alert = useAlert();

  const getOccupationData = async () => {
    const res = await axios.get(`admin/occupation/${id}/`);
    return res.data;
  };

  const { data: initialData } = useQuery(
    `admin/occupation/${id}/`,
    getOccupationData,
    {
      onError: (err) => {
        if (err.response.status === 403) {
          history.push("/login");
        }
      },
      enabled: !!id,
    }
  );

  const editOccupation = async (data) => {
    await axios.put(`/admin/occupation/update/${id}`, data);
  };

  const { mutate: edit } = useMutation(editOccupation, {
    onSuccess: () => {
      alert.success({ text: "حرفه با موفقیت ویرایش شد" });
    },
    onError: () => {},
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
      <PageDetailLayout title="ویرایش حرفه " />
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema}
        initialValues={initialData || defaultInitialValues}
        onSubmit={(values) => {
          edit(values);
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
              </Grid>
              <div className="flex flex-col items-center gap-4  mt-9 w-60">
                <Button type="submit" selected children="ویرایش" />
              </div>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SingleOccupationPage;

const useStyle = makeStyles(() => ({}));
