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

const BlogPage = () => {
  const classes = useStyle();
  const alert = useAlert();
  const [search, setSearch] = React.useState(undefined);

  const getArtistsData = async () => {
    const res = await axios.get("/blog/all");
    return res.data;
  };

  const { data, status } = useQuery("/blog/all", getArtistsData);

  return (
    <div className={classes.container}>
      <div className="bg-white p-10">
        <PageLayout
          addButtonTitle="ایجاد بلاگ جدید"
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
            { title: "عنوان", value: "title" },
            { title: "نویسنده", value: "author" },
            { title: "عملیات", value: "modify" },
          ]}
          data={filter(data, "title", search)}
          isLoading={!status || status === "loading"}
          onDeleteRow={(id) => {
            alert
              .prompt({
                confirmText: "بله، حذف",
                refuseText: "خیر",
                text: "آیا از حذف این بلاگ اطمینان دارید؟",
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

export default BlogPage;
