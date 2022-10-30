const Friend = require('../models/Friend')
const User = require('../models/User')

module.exports = {
    getAllFriends: async (req,res)=>{
        console.log(req.user)
        try{
            const friends = await Friend.find({ $and: [{approved: true}, {$or: [{user1: req.user.id}, {user2: req.user.id}] }]})
            .populate('user1').populate('user2')
            // console.log(friends)
            res.send({friends: friends, authUserId: req.user.id})
           // res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    isFriend: async (req,res)=>{
        console.log(req.user)
        try{
            const friends = await Friend.find({ $and: [{approved: true}, {$or: [{user1: req.user.id}, {user2: req.user.id}] }]})
            let checkIfFriend = friends.filter(friend => friend.user1 == req.params.friendId || friend.user2 == req.params.friendId)
            if(checkIfFriend.length > 0) {
                res.status(200).send({status: true})
                return;
            }
            console.log(friends)
            res.status(200).send({status: false})
            // res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    getAllUsers: async (req,res)=>{
        // console.log(req.user)
    try{
            const users = await User.find({ _id: { $ne: req.user.id } })
            
            res.send({users: users, authUserId: req.user.id})
           // res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    searchUsers: async (req,res)=>{
        console.log(typeof(req.params.query))
    try{
        const users = await User.find({userName: {$regex: new RegExp(req.params.query,'i')}, _id: { $ne: req.user.id }}).lean()
        console.log(users)
        res.send({users: users})
           // res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    searchFriends: async (req,res)=>{
        console.log(typeof(req.params.query))
    try{
        const users = await User.find({}).populate('user1').populate('user2')
        // ({userName: {$regex: new RegExp(req.params.query,'i')}, _id: { $ne: req.user.id }}).lean()
        console.log(users)
        // res.send({users: users})
           // res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    getFriendRequests: async (req, res)=>{
        try{
            const friendRequests = await Friend.find({ $and: [{approved: false}, {user2: req.user.id }]})
            .populate('user1')
            console.log(friendRequests)
            res.send({friendRequests: friendRequests, authUserId: req.user.id})
           // res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    isRequestPending: async (req, res)=>{
        try{
            const friendship = await Friend.find({$and: [{approved: false}, {user1: req.user.id }, {user2: req.params.friendId}]})
              
            if(friendship.length > 0){
                
                console.log('Request Pending')
                res.status(200).send({status: true})
                return;
            }

            console.log('Friend request not pending')
            res.status(200).send({status: false})
        }catch(err){
            console.log(err)
        }
    },
    addFriend: async (req, res)=>{
        console.log(req.body.user1, req.user.id)

        try{
            const friendship = await Friend.find({$or: [
                {$and: [{user1: req.user.id}, {user2: req.body.user1}]},
                {$and: [{user1: req.body.user1}, {user2: req.user.id}]}
            ]})
              
            if(friendship.length > 0){
                if(!friendship[0].approved){
                    await Friend.remove({_id: friendship[0]._id})
                    res.status(200).send("Friend Request removed")
                    console.log('Friend Request removed')
                    return; 
                }

                await Friend.findOneAndDelete({_id: friendship[0]._id})
                console.log('Friend Removed')
                res.status(200).send("Friend Removed")
                return;
            }

            await Friend.create({user1: req.user.id, user2: req.body.user1, approved: false})
            console.log('Friend request sent!')
            res.status(200).send('request sent')
        }catch(err){
            console.log(err)
        }
    },
    acceptRequest: async (req, res) => {
        console.log(req.params.id)
        try {
          await Friend.findOneAndUpdate(
            { _id: req.params.id },
            {
              approved: true,
            }
          );
          cosnole.log(accepted)
          res.send("accepted")    
        } catch (err) {
          console.log(err);
        }
      },
    // markComplete: async (req, res)=>{
    //     try{
    //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
    //             completed: true
    //         })
    //         console.log('Marked Complete')
    //         res.json('Marked Complete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // markIncomplete: async (req, res)=>{
    //     try{
    //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
    //             completed: false
    //         })
    //         console.log('Marked Incomplete')
    //         res.json('Marked Incomplete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    deleteFriend: async (req, res)=>{
        console.log(req.body.id)
        try{
            await Friend.findOneAndDelete({_id:req.body.id})
            console.log('Deleted request')
            res.send('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    