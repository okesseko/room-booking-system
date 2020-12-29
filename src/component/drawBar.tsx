import * as React from "react";
import {
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";
import { useEffect, useState } from "react";
import moment from "moment";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
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

interface propType {
  time: moment.Moment;
  setTime: React.Dispatch<React.SetStateAction<moment.Moment>>;
  resource: any;
  setResource: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const useStyles = makeStyles((theme) => ({
  calender: {
    zIndex: 50,
    height: "100vh",
    overflowY: "scroll",
  },
  formControl: {
    padding: `0  0 0 ${theme.spacing(3)}px `,
    width: "calc(100% - 24px)",
  },
  menuButton: {
    borderRadius: 0,
  },
}));
const person = [
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
];
const instance = [
  {
    text: "Room1",
    id: 1,
    color: blue,
  },
  {
    text: "Room2",
    id: 2,
    color: orange,
  },
  {
    text: "Room3",
    id: 3,
    color: green,
  },
  {
    text: "Room4",
    id: 4,
    color: red,
  },
  {
    text: "Room5",
    id: 5,
    color: purple,
  },
  {
    text: "Room6",
    id: 6,
    color: brown,
  },
];
const DrawBar = ({
  time,
  setTime,
  resource,
  setResource,
  open,
  setOpen,
}: propType) => {
  const [checked, setChecked] = useState([1, 2]);
  const classes = useStyles();
  function setRoom(id: number, check: boolean) {
    if (id) {
      const buffer = [...resource].flat();
      if (!check)
        setResource([
          {
            fieldName: "roomId",
            title: "Room Name",
            instances: buffer[0].instances.filter((e: any) => e.id !== id),
          },
          {
            fieldName: "members",
            title: "Members",
            instances: buffer[1].instances,
            allowMultiple: true,
          },
        ]);
      else {
        setResource([
          {
            fieldName: "roomId",
            title: "Room Name",
            instances: [...buffer[0].instances, instance[--id]].sort(
              (a, b) => a.id - b.id
            ),
          },
          {
            fieldName: "members",
            title: "Members",
            instances: buffer[1].instances,
            allowMultiple: true,
          },
        ]);
      }
    } else {
      if (!check)
        setResource([
          {
            fieldName: "roomId",
            title: "Room Name",
            instances: [{ text: "Room", id: 7, color: blue }],
          },
          {
            fieldName: "members",
            title: "Members",
            instances: resource[1].instances,
            allowMultiple: true,
          },
        ]);
      else
        setResource([
          {
            fieldName: "roomId",
            title: "Room Name",
            instances: instance,
          },
          {
            fieldName: "members",
            title: "Members",
            instances: resource[1].instances,
            allowMultiple: true,
          },
        ]);
    }
  }
  function checkExit(id: number) {
    let buffer = false;
    resource[0].instances.forEach((res: any) => {
      if (res.id === id) buffer = true;
    });
    return buffer;
  }

  return open ? (
    <Grid
      id="smallCalendar"
      item
      xs={open ? 5 : "auto"}
      md={open ? 3 : "auto"}
      lg={open ? 2 : "auto"}
      className={classes.calender}
    >
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Button
          className={classes.menuButton}
          fullWidth
          color="primary"
          variant="contained"
          onClick={() => {
            setOpen(false);
          }}
        >
          <ChevronLeftIcon />
        </Button>
        <Calendar
          date={time}
          onChange={(data: any) => {
            setTime(data);
          }}
        />
        {/* <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">My meeting</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked.length === 2}
                  indeterminate={checked.length > 0 && checked.length < 2}
                  onChange={() => {
                    if (checked.length !== 2)
                      setResource([
                        {
                          fieldName: "roomId",
                          title: "Room Name",
                          instances: resource[0].instances,
                        },
                        {
                          fieldName: "members",
                          title: "Members",
                          instances: [],
                          allowMultiple: true,
                        },
                      ]);
                    else
                      setResource([
                        {
                          fieldName: "roomId",
                          title: "Room Name",
                          instances: resource[0].instances,
                        },
                        {
                          fieldName: "members",
                          title: "Members",
                          instances: person,
                          allowMultiple: true,
                        },
                      ]);
                  }}
                  name="all"
                />
              }
              label="All"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked.indexOf(1) !== -1}
                  onChange={(e) => {
                    if (!e.target.checked)
                      setResource([
                        {
                          fieldName: "roomId",
                          title: "Room Name",
                          instances: resource[0].instances,
                        },
                        {
                          fieldName: "members",
                          title: "Members",
                          instances: resource[0].instances.filter(
                            (e: any) => e.id !== 1
                          ),
                          allowMultiple: true,
                        },
                      ]);
                    else
                      setResource([
                        {
                          fieldName: "roomId",
                          title: "Room Name",
                          instances: resource[0].instances,
                        },
                        {
                          fieldName: "members",
                          title: "Members",
                          instances: [...resource[0].instances, person[0]].sort(
                            (a, b) => a.id - b.id
                          ),
                          allowMultiple: true,
                        },
                      ]);
                  }}
                  name="myMeet"
                />
              }
              label="My Meetting"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked.indexOf(2) !== -1}
                  onChange={(e) => {
                    if (!e.target.checked)
                      setResource([
                        {
                          fieldName: "roomId",
                          title: "Room Name",
                          instances: resource[0].instances,
                        },
                        {
                          fieldName: "members",
                          title: "Members",
                          instances: resource[0].instances.filter(
                            (e: any) => e.id !== 2
                          ),
                          allowMultiple: true,
                        },
                      ]);
                    else
                      setResource([
                        {
                          fieldName: "roomId",
                          title: "Room Name",
                          instances: resource[0].instances,
                        },
                        {
                          fieldName: "members",
                          title: "Members",
                          instances: [...resource[0].instances, person[1]].sort(
                            (a, b) => a.id - b.id
                          ),
                          allowMultiple: true,
                        },
                      ]);
                  }}
                  name="otherMeet"
                />
              }
              label="Other Meetting"
            />
          </FormGroup>
        </FormControl> */}
        <FormControl
          component="fieldset"
          className={classes.formControl}
          style={{ marginTop: "12px" }}
        >
          <FormLabel component="legend">Room</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={resource[0].instances.length === 6}
                  indeterminate={
                    resource[0].instances.length > 0 &&
                    resource[0].instances.length < 6
                  }
                  onChange={(e) => setRoom(0, e.target.checked)}
                  name="all"
                />
              }
              label="All Rooms"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkExit(1)}
                  onChange={(e) => setRoom(1, e.target.checked)}
                  name="room1"
                />
              }
              label="Room 1"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkExit(2)}
                  onChange={(e) => setRoom(2, e.target.checked)}
                  name="room2"
                />
              }
              label="Room 2"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkExit(3)}
                  onChange={(e) => setRoom(3, e.target.checked)}
                  name="room3"
                />
              }
              label="Room 3"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkExit(4)}
                  onChange={(e) => setRoom(4, e.target.checked)}
                  name="room4"
                />
              }
              label="Room 4"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkExit(5)}
                  onChange={(e) => setRoom(5, e.target.checked)}
                  name="room5"
                />
              }
              label="Room 5"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkExit(6)}
                  onChange={(e) => setRoom(6, e.target.checked)}
                  name="room6"
                />
              }
              label="Room 6"
            />
          </FormGroup>
        </FormControl>
      </MuiPickersUtilsProvider>
    </Grid>
  ) : (
    <></>
  );
};
export default DrawBar;
