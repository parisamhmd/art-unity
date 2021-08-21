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
            component="tr"
            className={classes.trow}
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
    borderRadius: "10px 10px 0 0 ",
    borderBottom: `solid .125rem ${theme.palette.background.paper}`,
    overflow: "hidden",
  },
  th: {
    fontSize: "0.875rem",
    height: "3rem",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.875rem",
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.secondary.main,
    "&:not(:last-child)": {
      borderLeft: `solid .125rem ${theme.palette.grey[200]}`,
    },
  },
  trow: {
    position: "relative",
    borderBottom: `solid .125rem ${theme.palette.background.paper}`,
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
    fontWeight: 500,
    fontSize: "0.875rem",
    padding: "0.875rem .5rem",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.grey[25],
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    borderLeft: `solid 2px ${theme.palette.grey[200]}`,
    "&:last-child": {
      borderLeft: 0,
    },
  },
}));
