const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friend");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/allFriends", ensureAuth, friendController.getAllFriends);
router.get("/allUsers",ensureAuth,friendController.getAllUsers);
router.get("/allFriends",ensureAuth,friendController.getAllFriends);
router.get("/friendRequests",ensureAuth,friendController.getFriendRequests);
router.post("/addFriend", ensureAuth, friendController.addFriend);
router.get("/searchUsers/:query", ensureAuth, friendController.searchUsers);
router.get("/isRequestPending/:friendId", ensureAuth, friendController.isRequestPending);
router.get("/isFriend/:friendId", ensureAuth, friendController.isFriend);
router.put('/acceptRequest/:id',ensureAuth, friendController.acceptRequest)
router.delete('/delete',ensureAuth, friendController.deleteFriend)

module.exports = router;
