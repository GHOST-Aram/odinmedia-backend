import { User } from "../../zghost/db/User.js"
import { ObjectId } from "../../zghost/app/init.js"

class SocialDAL{
 
    
    acceptFriendRequest = async(currentUserId, friendId) =>{
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { requests_received: new ObjectId(friendId) }
        })
        await User.findByIdAndUpdate(currentUserId, {
            $addToSet: { friends: new ObjectId(friendId) }
        })
        await User.findByIdAndUpdate(friendId, {
            $pull: { requests_sent: new ObjectId(currentUserId)}
        })
        await User.findByIdAndUpdate(friendId, {
            $addToSet: {friends: new ObjectId(currentUserId)}
        })
    }

    findFriends = async(currentUserId) =>{
        const currentUser =  await User.findById(currentUserId)
            .populate('friends')
            .select('friends')
        return currentUser.friends
    }
    
    findPeopleYouMayKnow = async() =>{
        return await User.find().select(
            `first_name last_name 
            pictureUrl 
            friends requests_sent 
            request_received`
        )
    }
    
    findReceivedRequests = async(currentUserId) =>{
        const user = await User.findById(currentUserId)
        .select('requests_received')
        .populate({
            path: 'requests_received',
            select: 'first_name last_name pictureUrl _id friends'
        })
    
        return user.requests_received
    }
    
    findSentRequests = async(currentUserId) =>{
        const user = await User.findById(currentUserId)
        .select('requests_sent')
        .populate({
            path: 'requests_sent',
            select: 'first_name last_name pictureUrl _id friends'
        })
    
        return user.requests_sent
    }
    

    recallSentRequest = async(currentUserId, friendId) =>{
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { requests_sent: new ObjectId(friendId) }
        })
        await User.findByIdAndUpdate(friendId, {
            $pull: { requests_received: new ObjectId(currentUserId)}
        })
    }
    
    removeReceivedRequest = async( currentUserId, friendId ) =>{
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { requests_received: new ObjectId(friendId) }
        })
        await User.findByIdAndUpdate(friendId, {
            $pull: { requests_sent: new ObjectId(currentUserId)}
        })
    }
    
    sendFriendRequest = async( currentUserId, friendId ) =>{
        await User.findByIdAndUpdate(currentUserId, {
            $push: { requests_sent: new ObjectId(friendId) }
        })
        await User.findByIdAndUpdate(friendId, {
            $push: { requests_received: new ObjectId(currentUserId)}
        })
    }
 
    removeFriend = async( currentUserId, friendId ) =>{
       
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { friends: new ObjectId(friendId) }
        })
    
        await User.findByIdAndUpdate(friendId, {
            $pull: { friends: new ObjectId(currentUserId) }
        })
    }
}

export const socialDAL = new SocialDAL()