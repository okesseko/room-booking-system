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
import axios from "axios";
import { AmdDependency } from "typescript";
interface propType {
  currenTime: any;
  setCurrenTime: any;
  resource: any;
  open: boolean;
  token: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Reservation = ({
  currenTime,
  setCurrenTime,
  resource,
  token,
  open,
  setOpen,
}: propType) => {
  let history = useHistory();
  const [data, setData] = useState<any[]>([]);
  const [reGet, setReGet] = useState(1);
  const [add, setAdd] = useState<any>();
  useEffect(() => {
    console.log(currenTime);
    axios({
      method: "GET",
      url: ` https://ntust.yhchen.space/api/meeting`,
      params: {
        token: token,
        day: moment(currenTime).format("yyyy-MM-DD"),
      },
    }).then((res) => {
      console.log(res.data);
      setData(
        res.data.map((data: any) => {
          return {
            title: data.title,
            startDate: moment(data.beginAt).toISOString(),
            endDate: moment(data.finishAt).toISOString(),
            notes: data.information,
            location: data.roomId,
            roomId: parseInt(data.roomId[4]),
            members: data.users.map((usr: any) => usr.userId),
          };
        })
      );
      console.log(data, currenTime);
    });
  }, [token, currenTime]);
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
  //根據新增刪除修改等動作進行回傳資料
  function commitChanges({ added, changed, deleted }: any) {
    console.log(added, changed, deleted, "iii");
    if (added) {
      console.log(added, moment(added.startDate).local());
      axios({
        method: "POST",
        url: ` https://ntust.yhchen.space/api/meeting`,
        data: {
          title: added.title,
          startTime: moment(added.startDate).valueOf(),
          endTime: moment(added.endDate).valueOf(),
          moreInformation: added.notes,
          roomId: `ROOM${added.roomId}`,
          members: added.members,
        },
        params: {
          token: token,
        },
      }).then((res) => {
        console.log(res.data, "return", {
          title: added.title,
          startTime: moment(added.startDate).valueOf(),
          endTime: moment(added.endDate).valueOf(),
          moreInformation: added.notes,
          roomId: `ROOM${added.roomId}`,
          members: added.members,
        });
        setData([...data, { id: res.data.id, ...added }]);
      });
    }
    if (changed) {
      setData(
        data.map((appointment) => {
          if (changed[appointment.id]) {
            console.log(appointment, "app");
            axios({
              method: "PUT",
              url: ` https://ntust.yhchen.space/api/meeting/${appointment.id}`,
              data: {
                title: changed[appointment.id].title
                  ? changed[appointment.id].title
                  : appointment.title,
                startTime: changed[appointment.id].startDate
                  ? moment(changed[appointment.id].startDate).valueOf()
                  : moment(appointment.startDate).valueOf(),
                endTime: changed[appointment.id].endDate
                  ? moment(changed[appointment.id].endDate).valueOf()
                  : moment(appointment.endDate).valueOf(),
                moreInformation: changed[appointment.id].notes
                  ? changed[appointment.id].notes
                  : appointment.notes,
                roomId: changed[appointment.id].roomId
                  ? `ROOM${changed[appointment.id].roomId}`
                  : `ROOM${appointment.roomId}`,
                members: changed[appointment.id].members
                  ? changed[appointment.id].members
                  : appointment.members,
              },

              params: {
                token: token,
              },
            })
            return { ...appointment, ...changed[appointment.id] };
          } else {
            return appointment;
          }
        })
      );
    }
    if (deleted !== undefined) {
      
      axios({
        method: "DELETE",
        url: ` https://ntust.yhchen.space/api/meeting/${deleted}`,

        params: {
          token: token,
        },
      });
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
        <Resources data={resource} mainResourceName="roomId" />
        <IntegratedGrouping />
        <IntegratedEditing />

        <AppointmentTooltip showOpenButton showCloseButton />
        <AppointmentForm booleanEditorComponent={BooleanEditor} />
        <GroupingPanel />
        <ConfirmationDialog />
        <TodayButton />
      </Scheduler>
    </Paper>
  );
};
export default Reservation;
