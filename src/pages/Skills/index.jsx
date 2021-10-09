import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../components/Table";
import PageListLayout from "../../components/Layout/PageListLayout";
import filter from "../../services/utils/filter";
import { useAlert } from "../../services/context/AlertContext/index";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

const SkillsPage = () => {
  const classes = useStyle();
  const alert = useAlert();
  const queryClient = useQueryClient();
  const history = useHistory();
  const [search, setSearch] = React.useState(undefined);

  const getOccupationData = async () => {
    const res = await axios.get("/occupation/all");
    return res.data;
  };
  const { data, status } = useQuery("/occupation/all", getOccupationData);

  const deleteSkill = async (id) => {
    const res = await axios.delete(`/admin/occupation/delete/${id}`);
    return res.data;
  };

  const { mutate: handleDelete } = useMutation(deleteSkill, {
    onSuccess: () => {
      queryClient.invalidateQueries("/occupation/all");
    },
    onError: (error) => {
      if (error.response.data.statusCode === 404) {
        alert.error({ text: "حرفه موردنظر یافت نشد" });
      }
    },
  });

  return (
    <div className={classes.container}>
      <div className="bg-white p-10">
        <PageListLayout
          addButtonTitle="افزودن حرفه جدید"
          searchInputPlaceholder="بر روی اسم نویسنده ها سرچ کنید "
          searchValue={search}
          onSearchInputChange={(e) => {
            setSearch(e);
          }}
          onAddButtonClick={() => {
            history.push("/skills/create");
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
                text: "آیا از حذف این حرفه اطمینان دارید؟",
              })
              .then(({ result }) => {
                result && handleDelete(id);
              });
          }}
          onEditRow={(id) => {
            history.push(`/skills/${id}`);
          }}
        />
      </div>
    </div>
  );
};

export default SkillsPage;
