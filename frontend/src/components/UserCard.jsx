import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import API_URL from '../config/config'
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';

export default function UserCard(props) {
  const [requestAlreadySent, setRequestAlreadySent] = useState(false)
  const [isFriend, setIsFriend] = useState(props.isFriend)
  const navigate = useNavigate()
  // return console.log(props)
  const friendRequest = {
    user1: props.friendId
  };


  useEffect(() => {
    const checkIfFriend = async() => {
      try{
          const response = await fetch(`${API_URL}/friends/isFriend/${props.friendId}`, {
          method: "GET",
          withCredentials: true,
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("ISFRIEND",data)
        setIsFriend(data.status)
        // console.log(users)
      } catch(err){
          console.log(err);
      }
      
  }
    const checkIfRequestAlreadySent = async() => {
        try{
            const response = await fetch(`${API_URL}/friends/isRequestPending/${props.friendId}`, {
            method: "GET",
            withCredentials: true,
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          console.log(data)
          setRequestAlreadySent(data.status)
          // setAuthUserId(data.authUserId)
          // console.log(users)
        } catch(err){
            console.log(err);
        }
        
    }
    checkIfRequestAlreadySent()
    checkIfFriend()
  })
  const addFriend = async(query) => {
    try{
        const response = await fetch(`${API_URL}/friends/addFriend`, {
        method: "POST",
        withCredentials: true,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(friendRequest),
      });
      const data = await response.json();
      console.log(data)
      if(data == "removed"){
        setIsFriend(false)
        setRequestAlreadySent(false)
      } else {
        setIsFriend(false)
        setRequestAlreadySent(true)
      }
     // setFriends(data.friends)
      //console.log(friends)
    } catch(err){
        console.log(err);
    }
  }
  
  return (
    <Card className="userCard" >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.name[0].toUpperCase()}
          </Avatar>
        }
       
        title={ props.name }
        // subheader="September 14, 2016"
       
      />
      <CardContent>
      
    
         { !isFriend && !requestAlreadySent && <IconButton onClick={addFriend} aria-label="remove friend">
          <PersonAddIcon />
        </IconButton> 
        }
        { requestAlreadySent  && 
          <Button value="pending" onClick={addFriend} variant="outlined" startIcon={<RunningWithErrorsIcon />}>
          Pending
        </Button> }
        {  isFriend && 
      <IconButton onClick={addFriend} aria-label="add friend">
      <PersonRemoveIcon />
    </IconButton> }
      </CardContent>
     
    </Card>
  );
}
