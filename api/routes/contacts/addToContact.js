const User = require('../../models/user');
const ChatSpace = require('../../models/conversation');
const mongoose = require('mongoose');

module.exports = async (req,res,next)=>{
    try{
        if(req.auth){
            const myId = req.auth.id;
            const userId = req.body.contactInfo.id;
            const user = await User.findById(req.auth.id).exec();
            const otherUser = await User.findById(userId).exec();
            if(user && otherUser){
                const sess = await mongoose.startSession();
                sess.startTransaction();
                const chatId = (myId >= userId)?`${userId}-${myId}`:`${myId}-${userId}`;
                const contact_exist = user.contacts.find((i) => i.chatId === chatId);
                if(contact_exist){
                    console.log('contact_exist');
                    throw new Error('contact_exist');
                }
                user.contacts.push({
                    chatId: chatId,
                    userId: new mongoose.Types.ObjectId(userId)
                });
                const cont_response = await user.save({session: sess});
                const chat_space_do_exist = await ChatSpace.exists({chatId: chatId});
                if(!chat_space_do_exist){
                    const chat_space = new ChatSpace({
                                userOne: new mongoose.Types.ObjectId(myId),
                                userTwo: new mongoose.Types.ObjectId(userId),
                                chatId: chatId
                            });
                    const chat_response = await chat_space.save({session: sess});
                    console.log(chat_response);
                }
                await sess.commitTransaction()
                    
                res.json({
                    error:{
                        status: false,
                    },
                    contactInfo:{
                        firstName: otherUser.firstName,
                        lastName: otherUser.lastName,
                        bio: otherUser.bio,
                        chatId: chatId,
                        userId: userId,
                        id: user.contacts[user.contacts.length-1].id
                    }
                })
            }
            else{
                res.json({
                    error:{
                        status: true,
                        message: 'User do not exist'
                    }
                });
            }
        }
        else{
            res.json({
                error:{
                    status: true,
                    message: 'Invalid Credentials'
                }
            });
        }
    }
    catch(error){
        console.log('error:',error);
        res.json({
            error:{
                status: true,
                message: 'An Error occured',
                error_object: error
            }
        })
    }
    
    
}
