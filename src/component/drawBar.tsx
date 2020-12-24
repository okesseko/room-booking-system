import * as React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  makeStyles,
} from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";
import { useState } from "react";
import moment from "moment";

interface propType {
  time: moment.Moment;
  setTime: React.Dispatch<React.SetStateAction<moment.Moment>>;
}
const useStyles = makeStyles((theme) => ({
  calender: {
    padding: `0 ${theme.spacing(2)}px`,
    zIndex: 50,
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const DrawBar = ({ time, setTime }: propType) => {
  const [checked, setChecked] = useState(["all"]);
  const [rowCount, setRowCount] = useState(0);
  const classes = useStyles();
  return (
    <Grid
      id="smallCalendar"
      item
      xs={5}
      md={3}
      lg={2}
      className={classes.calender}
    >
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Calendar
          date={time}
          onChange={(data: any) => {
            setTime(data);
          }}
        />
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">My meeting</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked.length === rowCount}
                  indeterminate={
                    checked.length > 0 && checked.length < rowCount
                  }
                  onChange={() => {
                    setChecked([]);
                    if (checked.length !== rowCount) {
                      setChecked(["myMeet", "otherMeet"]);
                    }
                    setRowCount(checked.length);
                  }}
                  name="all"
                />
              }
              label="All"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked.indexOf("myMeet") !== -1}
                  onChange={(e) => {
                    e.stopPropagation();
                    if (checked.indexOf("myMeet") !== -1)
                      setChecked([...checked].filter((e) => e !== "myMeet"));
                    else setChecked([...checked, "myMeet"]);
                    setRowCount(checked.length);
                  }}
                  name="myMeet"
                />
              }
              label="My Meetting"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked.indexOf("otherMeet") !== -1}
                  onChange={(e) => {
                    e.stopPropagation();
                    if (checked.indexOf("otherMeet") !== -1)
                      setChecked([...checked].filter((e) => e !== "otherMeet"));
                    else setChecked([...checked, "otherMeet"]);
                    setRowCount(checked.length);
                  }}
                  name="otherMeet"
                />
              }
              label="Other Meetting"
            />
          </FormGroup>
        </FormControl>
      </MuiPickersUtilsProvider>
    </Grid>
  );
};
export default DrawBar;
