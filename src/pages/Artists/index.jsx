import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../components/Table";
import PageLayout from "../../components/Layout/PageLayout";
const useStyle = makeStyles((theme) => ({
  container: {},
}));

const ArtistsPage = () => {
  const classes = useStyle();
  const [search, setSearch] = React.useState(undefined);
  return (
    <div className={classes.container}>
      <PageLayout
        onAdd={() => {
          console.log("Add");
        }}
        addButtonTitle="ایجاد نویسنده جدید"
        searchInputPlaceholder="بر روی اسم نویسنده ها سرچ کنید "
        searchValue={search}
        onSearchInputChange={(e) => {
          setSearch(e);
        }}
      />
      <Table
        tableHeaderData={[
          { title: "اسم", value: "Name" },
          { title: "نام خانوادگی", value: "lastName" },
          { title: "سن", value: "Age" },
          { title: "علاقه", value: "Interest" },
          { title: "هنر", value: "Art" },
          { title: "تغییرات", value: "modify" },
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
