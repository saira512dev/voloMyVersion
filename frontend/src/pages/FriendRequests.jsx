import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import SideBar from "../components/SideBar";
import FriendRequestCard from "../components/FriendRequestCard";
import API_URL from '../config/config'

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([])

  useEffect(() => {
    const getFriendRequests = async() => {
      try{
          const response = await fetch(`${API_URL}/friends/friendRequests`, {
          method: "GET",
          withCredentials: true,
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data)
        setFriendRequests(data.friendRequests)
        // setAuthUserId(data.authUserId)
        console.log(friendRequests)
      } catch(err){
          console.log(err);
      }
      
    }
    
    getFriendRequests()
    }, [])
    

  
  return (
    <>
      <div className="dashboard">
        <header>
          <MenuBar className="menuBar" />
        </header>
        <div class="friends">
          <div class="sideBar">
            <SideBar />
          </div>
          <div class="friends-content">
            <h2>FRIEND REQUESTS</h2>
            { friendRequests.map(friendRequest => {
              return  <FriendRequestCard  name={friendRequest.user1.userName} requestId={friendRequest._id}  key={friendRequest._id}/>
           })
           }
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequests;
