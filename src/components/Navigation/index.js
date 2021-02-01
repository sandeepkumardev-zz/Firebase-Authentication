import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import { auth, signOut } from "../../firebase/firebase";
import { Avatar } from "@material-ui/core";
import { DataProvider, useData } from "../../firebase";
import { Data } from "../../firebase/context";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiListItem-button": {
      color: "black",
    },
    "& .MuiListItemIcon-root": {
      color: "blue",
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    padding: theme.spacing(4),
  },
}));

function Navigation(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const routes = (data) => {
    props.history.push(data);
  };

  const { userD } = React.useContext(Data);

  React.useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        return setUser(null);
      }

      setUser(userD);
    });

    return () => {
      listener();
    };
  }, [userD]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {user && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap style={{ flexGrow: "1" }}>
            Bookamrks PWA
          </Typography>
          {user && <Avatar src={user.photoURL} />}
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClick={handleDrawerClose}
        onKeyDown={handleDrawerClose}
      >
        <div className={classes.drawerHeader}>
          <h4 style={{ flexGrow: "1" }}>Hi, {user?.name}</h4>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Divider />
        <List style={{ flexGrow: "1" }}>
          <ListItem button onClick={() => routes(ROUTES.LANDING)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button onClick={() => routes(ROUTES.DASHBOARD)}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem button onClick={() => routes(ROUTES.ACCOUNT)}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={"Account"} />
          </ListItem>
          <ListItem button onClick={() => routes(ROUTES.ADMIN)}>
            <ListItemIcon>
              <VerifiedUserIcon />
            </ListItemIcon>
            <ListItemText primary={"Admin"} />
          </ListItem>
        </List>
        <List>
          <Divider />
          <ListItem button onClick={() => signOut()}>
            <ListItemIcon style={{ color: "red" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Log Out"} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}></main>
    </div>
  );
}
export default withRouter(Navigation);
