import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import SideBar from "../components/SideBar";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import API_URL from '../config/config'


const MyFriends = () => {
  const [myFriends, setMyFriends] = useState([])
  const [authUserId, setAuthUserId] = useState('')
  const [searchText, setSearchText] = useState([])

const handleChange = (event) => {
  console.log(event.target.value)
  searchFriends(event.target.value)
}

const searchFriends = async(query) => {
  try{
      const response = await fetch(`${API_URL}/friends/searchFriends/${query}`, {
      method: "GET",
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

useEffect(() => {
const getFriends = async() => {
  try{
      const response = await fetch(`${API_URL}/friends/allFriends`, {
      method: "GET",
      withCredentials: true,
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
 console.log(data.friends)
    setMyFriends(data.friends)
    setAuthUserId(data.authUserId)
    //console.log(myFriends)
  } catch(err){
      console.log(err);
  }
  
}

getFriends()
},[])

console.log(searchText)
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
            <h2> My FRIENDS</h2>
            <div class="searchUsers">
                <SearchBar placeholder="search your friends" value={searchText} 
                    onChange={handleChange}
                     />
            </div>
            <div class="allUsers">
            { myFriends.map(friend => {
              console.log(friend.user1._id)
              return friend.user1._id == authUserId ? 
              <UserCard name={friend.user2.userName} friendId={friend.user2._id} isFriend={true} key={friend._id}/> :
              <UserCard name={friend.user1.userName} friendId={friend.user1._id} isFriend={true} key={friend._id}/> 
           })
           }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyFriends;
