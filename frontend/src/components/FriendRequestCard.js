import * as React from "react";
import { Button, Card, Typography } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import API_URL from "../config/config";

export default function FriendRequestCard(props) {
  // return console.log(props)
  

  const respondToRequest = async (e) => {
    let status = e.target.value;
    let id = props.requestId
    console.log(status)

    if(status == "reject"){
      try{
        const response = await fetch(`${API_URL}/friends/delete`, {
        method: "DELETE",
        withCredentials: true,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id: id}),
      });
      const data = await response.json();
      
    } catch(err){
        console.log(err);
    }
    }
    else {
      
      try{
          const response = await fetch(`${API_URL}/friends/acceptRequest/${id}`, {
          method: "PUT",
          withCredentials: true,
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        //console.log(data)
       // setFriends(data.friends)
        //console.log(friends)
      } catch(err){
          console.log(err);
      }
    }
    
  };

  return (
    <Card className="friendRequestCard">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.name[0].toUpperCase()}
          </Avatar>
        }
        title={props.name}
        // subheader="September 14, 2016"
      />
      <CardContent className="cardContent">
        <Button value="accept" onClick={respondToRequest} variant="outlined" startIcon={<CheckCircleIcon />}>
          Accept
        </Button>
        <Button value="reject" onClick={respondToRequest} variant="outlined" startIcon={<CancelIcon />}>
          Reject
        </Button>
      </CardContent>
    </Card>
  );
}
