import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import DeleteIcon from "../../services/assets/Icons/DeleteIcon.svg";
import EditIcon from "../../services/assets/Icons/EditIcon.svg";

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
        {data.map((row, index) => (
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
                style={{ wordBreak: "break-word" }}
              >
                {cell.value === "modify" ? (
                  <div className="flex gap-2">
                    <img
                      src={DeleteIcon}
                      alt="DeleteIcon"
                      onClick={() => onDeleteRow(row.id)}
                    />
                    <img src={EditIcon} alt="EditIcon" onClick={onEditRow} />
                  </div>
                ) : (
                  row[cell.value]
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
    height: "2.5rem",
    width: "100%",
    backgroundColor: theme.palette.secondary.dark,
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
    "&:last-child": {
      borderLeft: 0,
    },
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: theme.palette.text.primary,
    boxSizing: "border-box",
    padding: "1.188rem .875rem",
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
