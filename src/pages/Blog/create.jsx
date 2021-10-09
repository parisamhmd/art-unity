import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Editor from "../../components/Editor/QuillEditor";
import PageDetailLayout from "../../components/Layout/PageDetailLayout";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

const CreateBlog = () => {
  const classes = useStyle();

  return (
    <div className="bg-white p-10 ">
      <PageDetailLayout title="افزودن تاپیک جدید" />
      <Editor />
    </div>
  );
};

export default CreateBlog;
