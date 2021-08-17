import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../components/Table";
import PageLayout from "../../components/Layout/PageLayout";
import ArtistsFormModal from "../../components/Modal/ArtistsFormModal";
import axios from "axios";
import { useQuery } from "react-query";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

const ArtWorksPage = () => {
  const classes = useStyle();
  const [search, setSearch] = React.useState(undefined);

  const getArtistsData = async () => {
    const res = await axios.get("/art/all?view=true");
    return res.data;
  };
  const { data } = useQuery("/artist/all", getArtistsData);
  return (
    <div className={classes.container}>
      <div className="bg-white p-10">
        <PageLayout
          // onAdd={() => {
          //   console.log("Add");
          // }}
          addButtonTitle="ایجاد هنر جدید"
          searchInputPlaceholder="بر روی اسم نویسنده ها سرچ کنید "
          searchValue={search}
          onSearchInputChange={(e) => {
            setSearch(e);
          }}
        >
          <ArtistsFormModal />
          {/* Modal Component */}
        </PageLayout>
        <Table
          tableHeaderData={[
            { title: "نام اثر", value: "title" },
            { title: "طبقه بندی", value: "artCategory[name]" },
            { title: "هنرمند", value: "birthPlace" },
            { title: "تغییرات", value: "modify" },
          ]}
          data={data}
          onDeleteRow={(id) => {
            console.log("Delete " + id);
          }}
          onEditRow={() => {
            console.log("Edit");
          }}
        />
      </div>
    </div>
  );
};

export default ArtWorksPage;
