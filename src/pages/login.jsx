import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import logo from "../services/assets/Img/Logo/logo.svg";
import MailOutlineIcon from "@material-ui/icons/Person";
import TextInput from "../components/TextInput/TextInputLogins";
import { useMutation } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  container: {
    backgroundColor: "#D9D9D9",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "25rem",
    marginTop: "7rem",
    padding: "2rem 3rem",
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: "5px",
  },
}));

const LoginPage = () => {
  const classes = useStyle();
  const history = useHistory();
  const [number, setNumber] = React.useState("");

  const { mutate: login } = useMutation(
    (newUser) =>
      axios.post("/admin/login", {
        phoneNumber: number.slice(1, 11),
      }),
    {
      onSuccess: (response) => {
        Cookies.set("token", response.data.token);
        history.push("/");
      },
      onError: (error) => {
        // if (error.response.status === 500) ErrorToast("Error");
        // let messages = getValidationMessages(error);
        // ErrorToast("Validation Error", messages);
      },
    }
  );
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <img
          style={{ height: "6rem", width: "20rem" }}
          src={logo}
          alt="art-unity"
        />
        <div className="border-t-2 mt-4">
          <p className="text-2xl mt-2 text-right text-gray-600">
            ورود به پنل کاربری ادمین
          </p>
          {/* <form
            // method="post"
            // action="/"
            onSubmit={() => {
              login();
            }}
          > */}
          <TextInput
            className="mt-10 mb-6"
            placeholder="09XXXXXXXXX"
            value={number}
            icon={<MailOutlineIcon />}
            type="text"
            onChange={(e) => {
              e?.length < 12 && setNumber(e);
            }}
          />
          {/* <input type="submit" value="Submit"> */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={number.length < 11}
            onClick={() => {
              login();
            }}
            className="w-full"
          >
            ورود
          </Button>
          {/* </input> */}
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
