import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../components/Table";
import PageLayout from "../../components/Layout/PageLayout";
import ArtistsFormModal from "../../components/Modal/ArtistsFormModal";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import filter from "../../services/utils/filter";
import { useAlert } from "../../services/context/AlertContext/index";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

const ArtWorksPage = () => {
  const classes = useStyle();
  const alert = useAlert();
  const queryClient = useQueryClient();
  const [search, setSearch] = React.useState(undefined);

  const getArtistsData = async () => {
    const res = await axios.get("/art/all");
    return res.data;
  };

  const { data, status } = useQuery("/art/all", getArtistsData);

  const deleteArtWork = async (id) => {
    const res = await axios.delete(`/admin/art/delete/${id}`);
    return res.data;
  };

  const { mutate: handleDelete } = useMutation(deleteArtWork, {
    onSuccess: () => {
      queryClient.invalidateQueries("/art/all");
    },
    onError: (error) => {
      if (error.response.data.statusCode === 404) {
        alert.error({ text: "اثر هنری موردنظر یافت نشد" });
      }
    },
  });
  return (
    <div className={classes.container}>
      <div className="bg-white p-10">
        <PageLayout
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
            { title: "هنرمند", value: "artist.firstName" },
            { title: "تغییرات", value: "modify" },
          ]}
          data={filter(data, "title", search)}
          isLoading={!status || status === "loading"}
          onDeleteRow={(id) => {
            alert
              .prompt({
                confirmText: "بله، حذف",
                refuseText: "خیر",
                text: "آیا از حذف این اثر هنری اطمینان دارید؟",
              })
              .then(({ result }) => {
                result && handleDelete(id);
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

export default ArtWorksPage;
