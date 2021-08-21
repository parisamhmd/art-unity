import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import logo from "../services/assets/Img/Logo/logo.svg";
import MailOutlineIcon from "@material-ui/icons/Person";
import TextInput from "../components/TextInput";
import { useMutation } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { useAlert } from "../services/context/AlertContext";

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
  const alert = useAlert();

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
        if (error.response.status === 404)
          alert.error({ text: "کاربری با این شماره تلفن یافت نشد" });
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
          <p className="text-2xl mt-2 text-right text-gray-600 font-Vazir">
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
            label="تلفن همراه"
            onChange={(e) => {
              e?.length < 12 && setNumber(e);
            }}
          />
          {/* <input type="submit" value="Submit"> */}
          <Button
            disabled={number.length < 11}
            onClick={() => {
              login();
            }}
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
