import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../components/Table";
import PageListLayout from "../../components/Layout/PageListLayout";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import filter from "../../services/utils/filter";
import { useAlert } from "../../services/context/AlertContext/index";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

const TopicsPage = () => {
  const classes = useStyle();
  const alert = useAlert();
  const queryClient = useQueryClient();
  const history = useHistory();
  const [search, setSearch] = React.useState(undefined);

  const getArtTopicsData = async () => {
    const res = await axios.get("/artTopic/all");
    return res.data;
  };
  const { data, status } = useQuery("/artTopic/all", getArtTopicsData);

  const deleteTopic = async (id) => {
    const res = await axios.delete(`/admin/artTopic/delete/${id}`);
    return res.data;
  };

  const { mutate: handleDelete } = useMutation(deleteTopic, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("/artTopic/all");
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
        <PageListLayout
          addButtonTitle="افزودن تاپیک جدید"
          searchInputPlaceholder="بر روی عنوان تاپیک ها سرچ کنید "
          searchValue={search}
          onSearchInputChange={(e) => {
            setSearch(e);
          }}
          onAddButtonClick={() => {
            history.push("/topics/create");
          }}
        />
        <Table
          tableHeaderData={[
            { title: "نام", value: "name" },
            { title: "عملیات", value: "modify" },
          ]}
          data={filter(data, "name", search)}
          isLoading={!status || status === "loading"}
          onDeleteRow={(id) => {
            alert
              .prompt({
                confirmText: "بله، حذف",
                refuseText: "خیر",
                text: "آیا از حذف این تاپیک اطمینان دارید؟",
              })
              .then(({ result }) => {
                result && handleDelete(id);
              });
          }}
          onEditRow={(id) => {
            history.push(`/topics/${id}`);
          }}
        />
      </div>
    </div>
  );
};

export default TopicsPage;
