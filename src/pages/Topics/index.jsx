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

const TopicsPage = () => {
  const classes = useStyle();
  const [search, setSearch] = React.useState(undefined);

  const getArtTopicsData = async () => {
    const res = await axios.get("/artTopic/all");
    return res.data;
  };
  const { data } = useQuery("/artTopic/all", getArtTopicsData);
  return (
    <div className={classes.container}>
      <div className="bg-white p-10">
        <PageLayout
          addButtonTitle="افزودن تاپیک جدید"
          searchInputPlaceholder="بر روی عنوان تاپیک ها سرچ کنید "
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
            { title: "نام", value: "name" },
            { title: "عملیات", value: "modify" },
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

export default TopicsPage;
