import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { users } from "../../firebase";
import withAuthorization from "../Session/withAuthorization";

function Admin() {
  const [loading, setLoading] = React.useState(true);
  const [state, setState] = React.useState(null);
  React.useEffect(() => {
    users().on("value", (snapshot) => {
      const usersObject = snapshot.val();
      if (usersObject) {
        const usersList = Object.keys(usersObject).map((key) => ({
          ...usersObject[key],
          uid: key,
        }));
        setState(usersList);
        setLoading(false);
      }
    });

    return () => {
      users().off();
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h3"
        style={{
          fontFamily: "Acme, sans-serif",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        All Users
      </Typography>
      {loading && <span>Loading ...</span>}
      <List>
        {state?.map((user) => (
          <ListItem key={user.uid}>
            <ListItemAvatar>
              <Avatar src={user.photoURL} />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default withAuthorization(Admin);
