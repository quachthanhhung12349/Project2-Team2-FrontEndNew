import { spawn } from "child_process";
import React, { useState, useEffect } from "react";
import { forumList } from "./mockups";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

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
  const [message, setMessages] = useState<any>([]);
  const [forumid,setForumid] =useState();

  const classes = useStyles();

  useEffect(() => {
    const fetchforum = async () => {
      try {
        const responses = await fetch("http://localhost:8080/forum");
        const responses1 = await fetch("http://localhost:8080/forum");
        const data = await responses.json();
        const data1 = await responses1.json();
        setForums(data);
        setMessages(data1);
        console.log(data);
        console.log(data1);
        
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchforum();
  }, []);

  

  return (
    <List className={classes.root} >
      {forums.map((r, index) => (
        <ListItem alignItems="flex-start" onClick={()=>setForumid(r.forumId)}>
          {/* <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar> */}
          
          <ListItemText
            primary={<Typography variant="h4">{r.topic}{forumid}</Typography>}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  by:{r.username}
                  <br/>
                </Typography>
                Submitted:{r.timeStamp}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}

      <Divider variant="inset" component="li" />
    </List>
  );
};
