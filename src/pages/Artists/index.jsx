import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../components/Table";
import PageLayout from "../../components/Layout/PageLayout";
import ArtistsFormModal from "../../components/Modal/ArtistsFormModal";
import axios from "axios";
import { useQuery } from "react-query";
import filter from "../../services/utils/filter";
import { useAlert } from "../../services/context/AlertContext/index";
import logo from "../../services/assets/Img/Logo/logo.svg";
const useStyle = makeStyles((theme) => ({
  container: {},
}));

const ArtistsPage = () => {
  const classes = useStyle();
  const alert = useAlert();
  const [search, setSearch] = React.useState(undefined);

  const getArtistsData = async () => {
    const res = await axios.get("/artist/all");
    return res.data;
  };
  const { data } = useQuery("/artist/all", getArtistsData);
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
        >
          <ArtistsFormModal />
          {/* Modal Component */}
        </PageLayout>
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
          onDeleteRow={(id) => {
            alert
              .prompt({
                confirmText: "بله، حذف",
                refuseText: "خیر",
                text: "آیا از حذف این هنرمند اطمینان دارید؟",
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

export default ArtistsPage;
