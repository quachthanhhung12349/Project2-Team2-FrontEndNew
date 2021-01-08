import { spawn } from "child_process";
import React, { useState, useEffect } from "react";

export const Forum: React.FC = (props) => {
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await fetch("http://localhost:8080/forum");
        const data = await responses.json()
        setMessages(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  return (
        <div>
            forum
            {messages.map((r,)=><div>{r.topic}</div>)}
        </div>


  );
};
