import React from 'react';
import {Router,Route} from 'react-router-dom';
import history from '../other/history';

import user from './user';
import Welcome from './Welcome';
import Conversations from './conversation/Conversations';
import Root from './Root';
import Header from './Header';
import Contacts from './user-list/Contacts'
import AboutMe from './user-list/AboutMe'

class App extends React.Component{

    render(){
        return(
            <div>
                <Router history={history}>
                    <Header/>
                    <Route path='/' component={Root}/>
                    <Route path='/login' exact component={user.Login}/>
                    <Route path='/user/create' exact component={user.SignUp}/>
                    <Route path='/user/edit' exact component={user.Edit}/>
                    <Route path='/user/delete' exact component={user.DeleteUser}/>
                    <Route path='/about-me' exact component={AboutMe}/>
                    <Route path='/welcome' exact component={Welcome}/>
                    <Route path='/contacts' exact component={Contacts}/>
                    <Route path='/chat/:id' exact component={Conversations} />
                </Router>
            </div>
        )
    }
}


export default App;