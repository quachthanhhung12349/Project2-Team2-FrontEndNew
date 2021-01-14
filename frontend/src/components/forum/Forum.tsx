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
import { postTopic, postMessage } from "../../remote/remote-functions";
import moment from "moment";
import { useLocation } from "react-router-dom";
// RCE CSS
import "react-chat-elements/dist/main.css";
// MessageBox component
import {
  MessageBox,
  MessageList,
  ChatList,
  ChatItem,
  Input,
} from "react-chat-elements";
import '../../assets/primary.scss';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      margin:"auto",
    },
    inline: {
      display: "inline",
    },
    bubble:{
      width: "-webkit-fill-available",
      backgroundColor:"red"
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

  const [inputTopic, setInputTopic] = useState<string>();

  const [inputMessage, setInputMessage] = useState<string>();

  const [currentTopic, setCurrentTopic] = useState<number>();

  const [user, setUser] = useState<any>();

  const location: any = useLocation();

  async function getMessagesByForumId(forumId: number, topic: string) {
    setIsShow(true);

    setTopic(topic);
    setLoading(true);
    setInputShow(false);
    setCurrentTopic(forumId);
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

  const onPostTopic = async () => {
    const topicstring = {
      topic: inputTopic,
      username: user.username,
      role: user.role,
    };
    const data = await postTopic(topicstring);
    console.log(data);

    setForums([...forums, data]);
    setInputTopic("");
    setInputShow(false);
  };

  const handleTopicChange = (e) => {
    setInputTopic(e.target.value);
  };
  const handleMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  const onPostMessage = async () => {
    const currentInputMessage =
      user.role === "Patient"
        ? {
            message: inputMessage,
            fromusername:user.username,
            forumId: {
              forumId: currentTopic,
            },
            patientId: {
              patientId: user.patientId,
              username: user.username,
            },
          }
        : {
            message: inputMessage,
            fromusername:user.username,
            forumId: {
              forumId: currentTopic,
            },
            doctorId: {
              doctorId: user.doctorId,
              username: user.username,
            },
          };
    const data = await postMessage(currentInputMessage);
    console.log(data);

    setInputMessage("");
    setMessage([...message, currentInputMessage]);
  };

  const classes = useStyles();

  function getContent() {
    
    location.state.patientInfo !== undefined
      ? setUser(location.state.patientInfo)
      : setUser(location.state.doctorInfo);
      console.log(user);
      
  }

  useEffect(() => {
    getContent();
  });

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
    <div style={{margin:"auto", width:"960px",borderStyle:"solid",borderColor:"lightblue"}}>
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
      {isShow ? <div><h1 style={{textAlign:"center"}}>{topic}</h1><Divider /></div> : null}
      <Grid container>
        {!isShow ? (
          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={() => {
                setInputShow(true);
              }}
            >
              New Post
            </Button>
            {inputShow ? (
          <div style={{textAlign:"center",marginTop:"30px"}}>
            <TextField
              id="standard-basic"
              label="Input your topic"
              fullWidth
              value={inputTopic}
              onChange={handleTopicChange}
              multiline
              variant="outlined"
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => onPostTopic()}
            >
              Post
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setInputShow(false)}
            >
              Cancel
            </Button>
            
          </div>
        ) : null}
            <List className={classes.root}>
              {forums.map((r, index) => (
                // <ListItem
                //   alignItems="flex-start"
                //   onClick={() => getMessagesByForumId(r.forumId, r.topic)}
                // >
                //   <ListItemText
                //     primary={<Typography variant="h4">{r.topic}</Typography>}
                //     secondary={
                //       <React.Fragment>
                //         <Typography
                //           component="span"
                //           variant="body2"
                //           className={classes.inline}
                //           color="textPrimary"
                //         >
                //           by:{r.username}
                //           <br />
                //         </Typography>
                //         Submitted:
                //         {moment(r.timeStamp).format("YYYY-MM-DD HH:mm:ss")}
                //       </React.Fragment>
                //     }
                //   />
                // </ListItem>
                <ChatItem
                  avatar={r.role!=="Patient"?"https://www.cliparthut.com/images/150/FPesi.png":"https://www.cliparthut.com/images/149/WDCFg.png"}
                  alt={r.username}
                  title={r.topic}
                  subtitle={"by:"+r.username}
                  dateString={moment(r.timeStamp).format("YYYY-MM-DD HH:mm:ss")}
                  onClick={() => getMessagesByForumId(r.forumId, r.topic)}
                />
              ))}

              <Divider variant="inset" component="li" />
            </List>
          </Grid>
        ) : null}
        
        {/* <Button onClick= {()=>getMessagesByForumId(3)}>click</Button> */}
        {loading ? <Typography variant="h4">Loading......</Typography> : null}
        {isShow ? (
          <Grid item xs={12}>
            {!loading
              ? 
              // message.map((m, index) => (
              //       <Message
              //         message={m.message}
              //         timestamp={moment(m.timeStamp).format(
              //           "YYYY-MM-DD HH:mm:ss"
              //         )}
              //         doctor={!m.doctorId ? "" : m.doctorId.username}
              //         patient={!m.patientId ? "" : m.patientId.username}
              //       />
              //     ))
                message.map((m, index) => (
                  <MessageBox
                    
                    type={"text"}
                    text={"by:"+m.fromusername}
                    title={m.message}
                    dateString={moment(m.timeStamp).format("YYYY-MM-DD HH:mm:ss")}
                    position={user.username!=m.fromusername?"left":"right"}
                  />
                ))
              : null}
            {!loading ? (
              <div style={{float:"right",marginTop:"30px",textAlign:"center"}}>
                <TextField
                  id="standard-basic"
                  label="Write your post"
                  name="message"
                  
                  value={inputMessage}
                  onChange={handleMessageChange}
                  variant="outlined"
                  
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onPostMessage}
                  style={{float:"right",marginTop:"15px"}}
                  
                >
                  Submit
                </Button>
              </div>
            ) : null}
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};
