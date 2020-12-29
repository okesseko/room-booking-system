import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  ViewState,
  EditingState,
  GroupingState,
  IntegratedGrouping,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
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
  Resources,
  GroupingPanel,
  CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";

import moment from "moment";
import { useEffect, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { Button, Fab, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
interface propType {
  currenTime: any;
  setCurrenTime: any;
  resource: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const basic = [
  {
    title: "Website Re-Design Plan",
    startDate: moment().subtract(2, "hours").toISOString(),
    endDate: moment().add(2, "hours").toISOString(),
    id: 1,
    location: "Room 1",
    members: [1, 2],
    roomId: 1,
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: moment().subtract(10, "hours").toISOString(),
    endDate: moment().subtract(1, "hours").toISOString(),
    id: 2,
    location: "Room 2",
    members: [1, 2],
    roomId: 2,
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: moment().subtract(10, "hours").toISOString(),
    endDate: moment().subtract(1, "hours").toISOString(),
    id: 3,
    location: "Room 3",
    members: [1, 2],
    roomId: 3,
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: moment().subtract(10, "hours").toISOString(),
    endDate: moment().subtract(1, "hours").toISOString(),
    id: 4,
    location: "Room 4",
    members: [1, 2],
    roomId: 4,
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: moment().subtract(10, "hours").toISOString(),
    endDate: moment().subtract(1, "hours").toISOString(),
    id: 5,
    location: "Room 5",
    members: [1, 2],
    roomId: 5,
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: moment().subtract(10, "hours").toISOString(),
    endDate: moment().subtract(1, "hours").toISOString(),
    id: 6,
    location: "Room 6",
    members: [1, 2],
    roomId: 6,
  },
];

const Reservation = ({
  currenTime,
  setCurrenTime,
  resource,
  open,
  setOpen,
}: propType) => {
  let history = useHistory();
  const [data, setData] = useState(basic);
  const [formVisible, setFormVisible] = useState(false);
  const [add, setAdd] = useState<any>();
  const grouping = [
    {
      resourceName: "roomId",
    },
  ];
  const ToolbarCustom = ({ children, style, ...restProps }: any) => {
    return (
      <Toolbar.Root
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {!open && (
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        {children}
        <IconButton
          size="medium"
          onClick={() => {
            history.push("/personal");
          }}
        >
          <AccountCircleIcon style={{ fontSize: "36px" }} />
        </IconButton>
      </Toolbar.Root>
    );
  };

  const BooleanEditor = (props: any) => {
    return (
      <AppointmentForm.BooleanEditor {...props} style={{ display: "none" }} />
    );
  };
  const TimeTableCell = ({ onDoubleClick, ...restProps }: any) => {
    return <DayView.TimeTableCell onClick={onDoubleClick} {...restProps} />;
  };
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
          currentDate={currenTime}
          onCurrentDateChange={(currentDate) => {
            setCurrenTime(moment(currentDate));
          }}
        />
        <DayView cellDuration={60} timeTableCellComponent={TimeTableCell} />

        <Toolbar rootComponent={ToolbarCustom} />
        <EditingState
          onCommitChanges={commitChanges}
          onEditingAppointmentChange={(editingAppointment) =>
            setAdd(editingAppointment)
          }
        />
        <GroupingState grouping={grouping} />

        <Appointments />
        {/* <CurrentTimeIndicator
          shadePreviousCells={true}
          shadePreviousAppointments={true}
        /> */}
        <Resources data={resource} mainResourceName="roomId" />
        <IntegratedGrouping />
        <IntegratedEditing />

        <AppointmentTooltip showOpenButton showCloseButton />
        <AppointmentForm booleanEditorComponent={BooleanEditor} />
        <GroupingPanel />
        <ConfirmationDialog />
        <TodayButton />
      </Scheduler>
      {/* <Fab
        color="secondary"
        style={{ position: "absolute", right: "16px", bottom: "16px" }}
        onClick={() => {
          setFormVisible(true);
          // setAdd(undefined);
          // onAddedAppointmentChange({
          //   startDate: moment(),
          //   endDate: moment().add(1, "hour"),
          // });
        }}
      >
        <AddIcon />
      </Fab> */}
    </Paper>
  );
};
export default Reservation;
