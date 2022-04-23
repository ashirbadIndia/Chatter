import user from '../apis/user';
import history from '../other/history';

export const login = (auth)=> async (dispatch)=>{
    const validation = {
        emailId: auth.userEmail,
        password: auth.userPassword
    }

    const response = await user.post('/auth',{validation});

    if(!response.data.error.status){
        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId: response.data.userInfo.id,
                token: response.data.token
            })
        )
    }
    dispatch({
        type: 'LOG_IN',
        response: response.data
    });
}

export const logout = () => {
    localStorage.clear();
    return {type : 'LOG_OUT'}
}

export const deleteUser = (data,token) => async (dispatch) =>{
    const response = await user.delete('/',{ data: data, headers:{'Authorization' : `Bearer ${token}`}});
    if(!response.data.error.status){
        localStorage.clear();
        history.push('/');
    }
    dispatch({
        type: 'DELETE_USER',
        response: response.data
    });
}

export const createUser = (userInfo) => async (dispatch) =>{
    const response = await user.post('/',{userInfo});
    if(!response.data.error.status) history.push('/login');
    dispatch({
        type: 'SIGN_UP',
        response: response.data
    })
}

export const editUser = (update,token) => async (dispatch) =>{
    const response = await user.patch('/',update,{
        headers:{
            'Authorization' : `Bearer ${token}`
        }
    });
    dispatch({
        type: 'EDIT_USER',
        response: {
            error: response.data.error,
            updatedUserInfo: update.updateValues
        }
    })
}

export const editPassword = (update,token) => async (dispatch) =>{
    const response = await user.patch('/',update,{
        headers:{
            'Authorization' : `Bearer ${token}`
        }
    });
    dispatch({
        type: 'EDIT_PASSWORD',
        response: {
            error: response.data.error
        }
    })
}

export const searchUser = (term) => async (dispatch) => {

        var result = await user.get('/',{
            params: {
                term: term
            }
        });
        
        dispatch({
            type: 'SEARCH_USER',
            results: result.data
        })
}

export const clearSearch = () => {
    return { type: "CLEAR_SEARCH" }
}


export const loginWithToken = () => async (dispatch)=>{
    const userData= JSON.parse(localStorage.getItem('userData'));
    console.log(userData);
    const token= userData ? userData.token : null;
    console.log(token);
    if(!token){
        dispatch({
            type: 'LOG_IN_WITH_TOKEN',
            response: {
                error: {
                    status: true,
                    message: 'No token stored'
                }
            }
        });
    }
    else{
        const response = await user.get('/auth',{
            headers: {'Authorization' : `Bearer ${token}`}
        });
        console.log(response);
        if(response.data.error.status){
            localStorage.clear();
        }
        else{
            localStorage.clear();
            localStorage.setItem(
            'userData',
            JSON.stringify({
                userId: response.data.userInfo.id,
                token: response.data.token
            })
            )
        }
        dispatch({
            type: 'LOG_IN_WITH_TOKEN',
            response: {...response.data, token: response.data.token}
        });
    }
    
}
