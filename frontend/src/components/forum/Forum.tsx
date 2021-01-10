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
import { Button, Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";



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

  const [isShow, setIsShow] = useState<any>(false);

  const [topic, setTopic] = useState<string>();

  const [loading, setLoading] = useState<boolean>(false);

  const [inputShow, setInputShow] = useState<boolean>(false);

  const [inputTopic,setInputTopic] = useState<string>();

  async function getMessagesByForumId(forumId: number, topic: string) {
    setIsShow(true);

    setTopic(topic);
    setLoading(true);
    setInputShow(false)
    let url = `http://localhost:8080/message/${forumId}`;
    try {
      let response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setMessage(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log("Request Failed", error);
    }
  }

  const submitTopic=()=> {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: inputTopic })
  };
      fetch('http://localhost:8080/forum', requestOptions)
      .then(response => response.json());
      setInputShow(false);
      
      window.location.reload();

    
  }

  const handleChange=e=>{
    console.log(`typed=>${e.target.value}`);
    setInputTopic(e.target.value);
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
    <div>
      {isShow ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsShow(false);
          }}
        >
          Back
        </Button>
      ) : null}
      {isShow ? <Typography variant="h4">{topic}</Typography> : null}
      <Grid container spacing={3}>
        
        {!isShow ? (
          <Grid item xs={4}>
            <Button  onClick={()=>{setInputShow(true)}} >New Post</Button>
            <List className={classes.root}>
              {forums.map((r, index) => (
                <ListItem
                  alignItems="flex-start"
                  onClick={() => getMessagesByForumId(r.forumId, r.topic)}
                >
                  {/* <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar> */}

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
          </Grid>
        ) : null}
        {inputShow ? (
          <div>
            <TextField id="standard-basic" label="Input your topic" name="topic" value={inputTopic} onChange={handleChange}/><br/>
            <Button variant="contained" color="primary" type="submit" onSubmit={()=>submitTopic()}>
              Submit
            </Button>
            <Button variant="contained" color="primary" onClick={()=>setInputShow(false)}>
              Cancel
            </Button>
          </div>
        ) : null}
        {/* <Button onClick= {()=>getMessagesByForumId(3)}>click</Button> */}
        {loading ? <Typography variant="h4">Loading......</Typography> : null}
        {isShow ? (
          <Grid item xs={8}>
            {!loading
              ? message.map((m, index) => (
                  <Message
                    message={m.message}
                    timestamp={m.timeStamp}
                    doctor={!m.doctorId ? "" : m.doctorId.username}
                    patient={!m.patientId ? "" : m.patientId.username}
                  />
                ))
              : null}
            {!loading ? (
              <form className={classes.root} noValidate autoComplete="off" >
                <TextField id="standard-basic" label="Write your post" name="message" />
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </form>
            ) : null}
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};
