import React from 'react'
import {connect} from 'react-redux'
import history from '../other/history'
import {loginWithToken} from '../actions/user';




class Root extends React.Component{
    
    redirect=(isSignedIn,isPending)=>{
        if(isPending){
            if(history.location.pathname !== '/')
            history.push('/');
        }
        else if(!isSignedIn){
            if(history.location.pathname !== '/login' && history.location.pathname !== '/user/create')
            history.push('/login');
        }
        else{
            if(history.location.pathname === '/' || history.location.pathname === '/login')
            history.push('/welcome');
        }
    }
    loading=()=>{
        if(this.props.autoLoginStats === "pending"){
            return (
                <div className="spinner-border centre" role="status" style={{margin:'300px 48% auto 48%', width:'64px',height:'64px'}}>
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }
        else return null
    }
    componentDidMount = ()=>{
        this.props.loginWithToken();
        this.redirect(this.props.isSignedIn,this.props.autoLoginStats === "pending")
    }
    componentDidUpdate = ()=>{
        this.redirect(this.props.isSignedIn,this.props.autoLoginStats === "pending")
    }
    render(){
        return (
            <>
            {this.loading()}
            </>
        )
    }
}
 
const mapStateToPros=(state)=>{
    return {
        isSignedIn: state.auth.isSignedIn,
        autoLoginStats : state.autoLoginStats
    }
}

export default connect(mapStateToPros,{loginWithToken})(Root)