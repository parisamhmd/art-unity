import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../components/Table";
import PageLayout from "../../components/Layout/PageLayout";
import ArtistsFormModal from "../../components/Modal/ArtistsFormModal";
import axios from "axios";
import { useQuery } from "react-query";
import filter from "../../services/utils/filter";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

const SkillsPage = () => {
  const classes = useStyle();
  const [search, setSearch] = React.useState(undefined);

  const getOccupationData = async () => {
    const res = await axios.get("/occupation/all");
    return res.data;
  };
  const { data } = useQuery("/occupation/all", getOccupationData);
  return (
    <div className={classes.container}>
      <div className="bg-white p-10">
        <PageLayout
          addButtonTitle="افزودن حرف جدید"
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
            { title: "نام", value: "name" },
            { title: "عملیات", value: "modify" },
          ]}
          data={filter(data, "name", search)}
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

export default SkillsPage;
