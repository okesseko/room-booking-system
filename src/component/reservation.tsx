import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import AddIcon from "@material-ui/icons/Add";
import {
  Scheduler,
  WeekView,
  MonthView,
  DayView,
  Appointments,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
  AllDayPanel,
  Toolbar,
  EditRecurrenceMenu,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import moment from "moment";
import { useState } from "react";
import { Fab } from "@material-ui/core";
interface propType {
  currenTime: any;
  setCurrenTime: any;
}

const basic = [
  {
    title: "Website Re-Design Plan",
    startDate: moment().subtract(2, "hours").toISOString(),
    endDate: moment().add(2, "hours").toISOString(),
    id: 0,
    location: "Room 1",
    rRule: "FREQ=DAILY;COUNT=10",
    exDate: "20201225T091100Z",
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: moment().subtract(1, "days").toISOString(),
    endDate: moment().subtract(1, "days").toISOString(),
    allDay: true,
    id: 1,
    location: "Room 1",
  },
];
const ToolbarCustom = ({ children, style, ...restProps }: any) => {
  console.log(children);
  return <Toolbar.Root {...restProps}>{children}</Toolbar.Root>;
};

const Reservation = ({ currenTime, setCurrenTime }: propType) => {
  const [data, setData] = useState(basic);
  const [add, setAdd] = useState<any>();

  function commitChanges({ added, changed, deleted }: any) {
    console.log(added, changed, deleted, "iii");

    if (added) {
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      setData([...data, { id: startingAddedId, ...added }]);
    }
    if (changed) {
      setData(
        data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        )
      );
    }
    if (deleted !== undefined) {
      setData(data.filter((appointment) => appointment.id !== deleted));
    }
  }

  return (
    <Paper>
      <Scheduler data={data} height={window.innerHeight}>
        <ViewState
          defaultCurrentDate={new Date()}
          defaultCurrentViewName="Week"
          currentDate={currenTime}
          onCurrentDateChange={(currentDate) => {
            console.log(currentDate, moment(currentDate));
            setCurrenTime(moment(currentDate));
          }}
        />
        <DayView cellDuration={60} />
        <WeekView cellDuration={60} />
        <MonthView />
        <Toolbar rootComponent={ToolbarCustom} />
        <AllDayPanel />
        {/* <DateNavigator /> */}
        <EditingState
          onCommitChanges={commitChanges}
          onEditingAppointmentChange={(editingAppointment) =>
            setAdd(editingAppointment)
          }
        />
        <EditRecurrenceMenu />
        <ConfirmationDialog />
        <TodayButton />
        <ViewSwitcher />
        <Appointments />
        <AppointmentTooltip showOpenButton showCloseButton />
        <AppointmentForm />
      </Scheduler>
      <Fab
        color="secondary"
        style={{ marginLeft: "8px" }}
        // onClick={() => {
        //   this.setState({ editingFormVisible: true });
        //   setAdd(undefined);
        //   this.onAddedAppointmentChange({
        //     startDate: moment(),
        //     endDate: moment().add(1, "hour"),
        //   });
        // }}
      >
        <AddIcon />
      </Fab>
    </Paper>
  );
};
export default Reservation;
