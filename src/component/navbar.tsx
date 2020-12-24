import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Brightness6Icon from "@material-ui/icons/Brightness6";
import LanguageIcon from "@material-ui/icons/Language";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Button, Grid } from "@material-ui/core";
interface propType {
  Mode: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}
const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shortest,
    }),
  },
  todayButton: {
    color: "white",
  },
  marginRightSmall: {
    marginRight: theme.spacing(2),
  },
  marginRightBig: {
    marginRight: theme.spacing(10),
  },
  menuButtonHide: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
  },
}));

const Navbar = ({ setMode, Mode }: propType) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="sticky" color="primary" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Grid container spacing={1} alignItems="center">
          <Grid item className={classes.marginRightBig}>
            <Typography variant="h6">Calender</Typography>
          </Grid>
          <Grid item className={classes.marginRightSmall}>
            <Button variant="outlined" color="inherit">
              Today
            </Button>
          </Grid>
          <Grid item className={classes.marginRightSmall}>
            <IconButton color="inherit" size="small">
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              style={{ transform: "rotate(180deg)" }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
          <Grid item >
            <Typography>dataa</Typography>
            <Typography>small</Typography>
          </Grid>
        </Grid>
        <IconButton color="inherit">
          <LanguageIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setMode(!Mode);
          }}
          color="inherit"
        >
          {Mode ? <BrightnessLowIcon /> : <Brightness6Icon />}
        </IconButton>
        <div>
          <IconButton onClick={handleMenu} color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={openMenu}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
