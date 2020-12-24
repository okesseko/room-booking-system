import * as React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Reservation from "./reservation";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";
import { useState } from "react";
import moment from "moment";
import DrawBar from "./drawBar";

const useStyles = makeStyles((theme) => ({
  calender: {
    padding: `0 ${theme.spacing(2)}px`,
    zIndex: 50,
  },
  calenderCustom: {
    zIndex: 100,
  },
}));

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container>
        <DrawBar time={selectedDate} setTime={setSelectedDate} />
        <Grid item xs={7} md={9} lg={10} className={classes.calenderCustom}>
          <Reservation
            currenTime={selectedDate}
            setCurrenTime={setSelectedDate}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};
export default Home;
