import * as React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Reservation from "./reservation";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useState } from "react";
import moment from "moment";
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
  const classes = useStyles();
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
