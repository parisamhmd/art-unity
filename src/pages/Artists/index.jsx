import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../components/Table";
const useStyle = makeStyles((theme) => ({
  container: {},
}));

const ArtistsPage = () => {
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <Table
        tableHeaderData={[
          { title: "اسم", value: "Name" },
          { title: "نام خانوادگی", value: "lastName" },
          { title: "سن", value: "Age" },
          { title: "علاقه", value: "Interest" },
          { title: "هنر", value: "Art" },
          { title: "تغییرات", value: "modify" },
          //   { title: "هنر", value: "Art" },
        ]}
        data={[
          {
            id: 1,
            Name: "پریسا",
            lastName: "محمدی",
            Age: 20,
            Interest: "Painting",
            Art: "نقاشی",
          },
          {
            id: 0,
            Name: "پریسا",
            lastName: "محمدی",
            Age: 25,
            Interest: "Painting",
            Art: "نقاشی",
          },
        ]}
        onDeleteRow={(id) => {
          console.log("Delete " + id);
        }}
        onEditRow={() => {
          console.log("Edit");
        }}
      />
    </div>
  );
};

export default ArtistsPage;
