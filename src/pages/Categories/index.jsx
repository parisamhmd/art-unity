import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../components/Table";
import PageLayout from "../../components/Layout/PageLayout";
import ArtistsFormModal from "../../components/Modal/ArtistsFormModal";
import axios from "axios";
import { useQuery } from "react-query";
import filter from "../../services/utils/filter";
import { useAlert } from "../../services/context/AlertContext/index";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

const CategoriesPage = () => {
  const classes = useStyle();
  const alert = useAlert();
  const [search, setSearch] = React.useState(undefined);

  const getCategoriesData = async () => {
    const res = await axios.get("/artCategory/all");
    return res.data;
  };

  const { data, status } = useQuery("/artCategory/all", getCategoriesData);

  return (
    <div className={classes.container}>
      <div className="bg-white p-10">
        <PageLayout
          addButtonTitle="افزودن طبقه بندی جدید"
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
            { title: "تاپیک ها", value: "artTopic.0.name" },
            { title: "تغییرات", value: "modify" },
          ]}
          data={filter(data, "name", search)}
          isLoading={!status || status === "loading"}
          onDeleteRow={(id) => {
            alert
              .prompt({
                confirmText: "بله، حذف",
                refuseText: "خیر",
                text: "آیا از حذف این طبقه‌بندی اطمینان دارید؟",
              })
              .then(({ result }) => {
                result && console.log("Delete " + id);
              });
          }}
          onEditRow={() => {
            console.log("Edit");
          }}
        />
      </div>
    </div>
  );
};

export default CategoriesPage;
