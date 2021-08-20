import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import _ from "lodash";

const Table = ({ tableHeaderData, data, onEditRow, onDeleteRow }) => {
  const classes = useStyle();

  return (
    <table className={classes.table}>
      <Grid container className={classes.thead} component="thead">
        <tr className="flex w-full">
          {tableHeaderData.map((item) => (
            <Grid key={item.title} item component="th" className={classes.th}>
              {item.title}
            </Grid>
          ))}
        </tr>
      </Grid>
      <tbody>
        {data?.map((row, index) => (
          <Grid
            key={index}
            container
            wrap="nowrap"
            className={classes.trow}
            component="tr"
            alignItems="stretch"
          >
            {tableHeaderData.map((cell, index) => (
              <Grid
                key={index}
                item
                className={classes.td}
                component="td"
                xs={12}
                style={{ wordBreak: "break-word", fontWeight: "bold" }}
              >
                {cell.value === "modify" ? (
                  <div className="flex flex-wrap gap-2">
                    <EditOutlinedIcon
                      className="cursor-pointer"
                      onClick={onEditRow}
                    />
                    <DeleteOutlineIcon
                      className="cursor-pointer"
                      onClick={() => onDeleteRow(row._id)}
                    />
                  </div>
                ) : (
                  _.get(row, cell.value, "_") || "_"
                )}
              </Grid>
            ))}
          </Grid>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

const useStyle = makeStyles((theme) => ({
  table: {
    fontFamily: "Vazir",
    width: "100%",
    position: "relative",
  },
  thead: {
    border: `solid .125rem ${theme.palette.background.paper}`,
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    overflow: "hidden",
  },
  th: {
    padding: "0.875rem",
    height: "1rem",
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.875rem",
    fontWeight: "bold",
    color: theme.palette.background.paper,
    "&:not(:last-child)": {
      borderLeft: `solid .125rem ${theme.palette.grey[200]}`,
    },
  },
  trow: {
    position: "relative",
    borderBottom: `solid .125rem #f9f9f9`,
    "&:last-child": {
      borderBottomRightRadius: "10px",
      borderBottomLeftRadius: "10px",
      "& > :first-child": {
        borderBottomRightRadius: "10px",
      },
      "& > :last-child": {
        borderBottomLeftRadius: "10px",
      },
    },
  },
  td: {
    borderLeft: `solid 2px ${theme.palette.grey[200]}`,
    fontWeight: 500,
    "&:last-child": {
      borderLeft: 0,
    },
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.875rem",
    color: theme.palette.text.primary,
    boxSizing: "border-box",
    padding: "0.875rem .5rem",
  },
  deleteIcon: {
    width: "1.8rem",
    height: "1.8rem",
    padding: ".2rem",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "-2.3rem",
  },
}));
