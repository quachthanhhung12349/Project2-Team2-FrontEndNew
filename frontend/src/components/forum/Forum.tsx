import { spawn } from "child_process";
import React, { useState, useEffect } from "react";
import { forumList, messageList } from "./mockups";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Message } from "./Message";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "36ch",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  })
);

export const Forum: React.FC = (props) => {
  const [forums, setForums] = useState<any>([]);

  const [message, setMessage] = useState<any>([]);


  async function getMessagesByForumId(forumId: number) {
    let url = `http://localhost:8080/message/${forumId}`;
    try {
      let response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setMessage(data);
      return data;
    } catch (error) {
      console.log("Request Failed", error);
    }
  }

  const classes = useStyles();

  useEffect(() => {
    const fetchforum = async () => {
      try {
        const responses = await fetch("http://localhost:8080/forum");
        const data = await responses.json();

        setForums(data);
        console.log(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchforum();
  }, []);

  return (
    <>
      <List className={classes.root}>
        {forums.map((r, index) => (
          <ListItem
            alignItems="flex-start"
            onClick={() => getMessagesByForumId(r.forumId)}
          >
            {/* <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar> */}
            <button>{r.forumId}</button>
            <ListItemText
              primary={<Typography variant="h4">{r.topic}</Typography>}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    by:{r.username}
                    <br />
                  </Typography>
                  Submitted:{r.timeStamp}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}

        <Divider variant="inset" component="li" />
      </List>
      {/* <Button onClick= {()=>getMessagesByForumId(3)}>click</Button> */}
      {message.map((m, index) => (
        <Message
          message={m.message}
          timestamp={m.timeStamp}
          doctor={m.doctor}
          patient={m.patient}
        />
      ))}
    </>
  );
};
