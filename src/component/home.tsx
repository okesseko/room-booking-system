import * as React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Reservation from "./reservation";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useEffect, useState } from "react";
import moment from "moment";
import Axios from "axios";
import DrawBar from "./drawBar";
import {
  blue,
  brown,
  green,
  orange,
  purple,
  red,
  teal,
  indigo,
} from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  calender: {
    padding: `0 ${theme.spacing(2)}px`,
    zIndex: 50,
  },
  calenderCustom: {
    zIndex: 100,
  },
}));
//基本設定
const resources = [
  {
    fieldName: "roomId",
    title: "Room Name",
    instances: [
      { text: "Room1", id: 1, color: blue },
      { text: "Room2", id: 2, color: orange },
      { text: "Room3", id: 3, color: green },
      { text: "Room4", id: 4, color: purple },
      { text: "Room5", id: 5, color: red },
      { text: "Room6", id: 6, color: brown },
    ],
  },
  {
    fieldName: "members",
    title: "Members",
    instances: [
      {
        text: "Me",
        id: 1,
        color: indigo,
      },
      {
        text: "Arnie",
        id: 2,
        color: teal,
      },
    ],
    allowMultiple: true,
  },
];
const Home = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [resource, setResource] = useState(resources);
  const [openDrawer, setopenDrawer] = useState(true);
  const [token, setToken] = useState("");
  const classes = useStyles();
  //取得token
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("code", code);
    if (code) {
      console.log("hi");
      Axios({
        method: "POST",
        url: "https://ntust.yhchen.space/api/oauth",
        data: {
          code: code,
        },
      })
        .then((res) => {
          console.log(res.data, "qwe");
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("re");
      localStorage.removeItem("token");
      window.location.reload();
    }
    Axios({
      method: "GET",
      url: "https://ntust.yhchen.space/api/user",
    })
      .then((res) => {
        console.log(res.data, "mem");
        setResource([
          resource[0],
          {
            fieldName: "members",
            title: "Members",
            instances: res.data.map((data: any) => {
              return {
                id: data.userId,
                text: data.userName,
              };
            }),
            allowMultiple: true,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container>
        <DrawBar
          time={selectedDate}
          setTime={setSelectedDate}
          resource={resource}
          setResource={setResource}
          open={openDrawer}
          setOpen={setopenDrawer}
        />
        <Grid
          item
          xs={openDrawer ? 7 : 12}
          md={openDrawer ? 9 : 12}
          lg={openDrawer ? 10 : 12}
          className={classes.calenderCustom}
        >
          <Reservation
            token={token}
            currenTime={selectedDate}
            setCurrenTime={setSelectedDate}
            resource={resource}
            open={openDrawer}
            setOpen={setopenDrawer}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};
export default Home;
