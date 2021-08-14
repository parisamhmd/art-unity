import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

const BlogPage = () => {
  const classes = useStyle();

  return <div className={classes.container}>Blog</div>;
};

export default BlogPage;
