# Chatter
Chat app based on MERN Stack

Check it here
https://chatter-ashirbadindia.herokuapp.com/ <br>
Please inform me if you find any errors. <br>
Email: ashirbad.behera.india@gmail.com<br>

Features Implemented:
- Create, Delete, Edit a User Account
- User Authentication using JWT
- Contacts list, Recent Chats list (With CRUD operations)
- Chatrooms for 2 persons (Uses Socket.IO)

Descriptions:

Client: Built using react-redux
 -   Client-side Routing - Uses React-Router for basic routing
 
                    path='/'             component=/components/Root.js 
                    path='/login'        component=/components/user/Login 
                    path='/user/create'  component=/components/user/SignUp 
                    path='/user/edit'    component=/components/user/Edit 
                    path='/user/delete'  component=/components/user/DeleteUser 
                    path='/about-me'     component=/components/user-list/AboutMe 
                    path='/welcome'      component=/components/Welcome 
                    path='/contacts'     component=/components/user-list/Contacts 
                    path='/chat/:id'     component=/components/conversation/Conversations 
  -   COMPONENTS dir- /components/ 
  
                      Root.js        Redirects the page to proper route based on authontication stats 
                      /users/        Contain components related to User, Login, CreateUser, Delete, Edit 
                      /user-list/    Contains components related to Contacts, Recent-list, Search-list 
                      /conversation/  Related to chatroom 
  -   /api/   axios custom templates
  -   ACTIONS  - REDUX actions  path /actions/ 
  
                  All api calls are defined here 
                  chat.js            Related to chats, create connection to SOCKET 
                  contact.js         Modifies contact and recent list, Makes Http request to the server (/api/contacts/) 
                  user.js            Handles Login, Logout, User CURD operations, Makes HTTP request to the server (/api/users/) 
  -   REDUCERS - REDUX Reducers  path /reducers/ 
  
                  REDUX STORE DESCRIPTION 
                      searchResults:        stores search result of user db 
                      auth:                 store user-info & token 
                      form: formReducer     REDUX-FORM 
                      contacts:             store contact-list, recent-list, favourites 
                      chatRoom:             store chats, and other related info 
                      formSubmitErrors 
                      formSubmitSuccess 
                      autoLoginStats 


API/SERVER:&nbsp;&nbsp;&nbsp;&nbsp;REST API built using Express.JS, Socket.IO 

  - Routes:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file-path-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/routes/ <br>
     &nbsp;&nbsp;&nbsp;&nbsp;/api/users&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REST API for managing users<br>
     &nbsp;&nbsp;&nbsp;&nbsp;/api/contacts&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REST API for managing contact-list<br>
   
  - Database:
 
        Users Collection:
            Main Mongoose Schema:
                  mongoose.Schema({
                      firstName: {type: String, required: true},
                      lastName: {type:String, default:''},
                      emailId: {type: String, required: true, unique:true },
                      password: {type: String, required: true},
                      bio: {type:String, default:''}, 
                      contacts: [contactSchema],
                      recents: [recentSchema]
                  });
             contact-array schema: 
                  mongoose.Schema({
                      chatId: String,
                      userId: {type: mongoose.Types.ObjectId, ref: 'Users'},
                      favourite: {type: Boolean, default: false}
                  })
              recent-array schema:
                   mongoose.Schema({
                      chatId: String,
                      userId: {type: mongoose.Types.ObjectId, ref: 'Users'},
                      lastMessage: String,
                      lastMessageTime: { type: Date, default: Date.now }
                  })


                  <!--  chatId is a string, basically a unique identifier for a chatroom
                             chatId - 'user-one-Id' + '-' + 'user-two-Id'
                             where    user-one-Id < user-two-id
                  -->
                    
        Chats Collection:
                Main Mongoose Schema: 
                          mongoose.Schema({
                              userOne: {type: mongoose.Types.ObjectId, ref:'Users'},
                              userTwo: {type: mongoose.Types.ObjectId, ref:'Users'},
                              colorOne: {type: String, default: 'default'},
                              colorTwo: {type: String, default: 'default'},
                              chatId: {type:String, unique:true},
                              messages: [convSchema]
                          })
                convSchema: 
                          mongoose.Schema({
                              author: String,
                              message: String,
                              date: { type: Date, default: Date.now }
                          })
                          
To Do:  
- Image Upload
- Last active status implementation


