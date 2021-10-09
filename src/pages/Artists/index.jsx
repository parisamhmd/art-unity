import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../components/Table";
import PageLayout from "../../components/Layout/PageListLayout";
import ArtistsFormModal from "../../components/Modal/ArtistsFormModal";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import filter from "../../services/utils/filter";
import { useAlert } from "../../services/context/AlertContext/index";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

const ArtistsPage = () => {
  const classes = useStyle();
  const alert = useAlert();
  const queryClient = useQueryClient();
  const history = useHistory();

  const [search, setSearch] = React.useState(undefined);

  const getArtistsData = async () => {
    const res = await axios.get("/artist/all?page=5&limit=10");
    return res.data;
  };
  const { data, status } = useQuery("/artist/all", getArtistsData);

  const deleteArtist = async (id) => {
    const res = await axios.delete(`/admin/artist/delete/${id}`);
    return res.data;
  };

  const { mutate: handleDelete } = useMutation(deleteArtist, {
    onSuccess: () => {
      queryClient.invalidateQueries("/artist/all");
    },
    onError: (error) => {
      if (error.response.data.statusCode === 404) {
        alert.error({ text: "تاپیک موردنظر یافت نشد" });
      }
    },
  });

  return (
    <div className={classes.container}>
      <div className="bg-white p-10">
        <PageLayout
          addButtonTitle="افزودن هنرمند جدید"
          searchInputPlaceholder="بر روی اسم هنرمندان سرچ کنید "
          searchValue={search}
          onSearchInputChange={(e) => {
            setSearch(e);
          }}
          onAddButtonClick={() => {
            history.push("/artists/create");
          }}
        />
        <Table
          tableHeaderData={[
            { title: "نام", value: "firstName" },
            { title: "نام خانوادگی", value: "lastName" },
            { title: "محل تولد", value: "birthPlace" },
            { title: "سال تولد", value: "birthYear" },
            { title: "هنر", value: "occupation.name" },
            { title: "عملیات", value: "modify" },
          ]}
          data={filter(data, "firstName,lastName", search)}
          isLoading={!status || status === "loading"}
          onDeleteRow={(id) => {
            alert
              .prompt({
                confirmText: "بله، حذف",
                refuseText: "خیر",
                text: "آیا از حذف این هنرمند اطمینان دارید؟",
              })
              .then(({ result }) => {
                result && handleDelete(id);
              });
          }}
          onEditRow={(id) => {
            history.push(`/artists/${id}`);
          }}
        />
      </div>
    </div>
  );
};

export default ArtistsPage;
