import contacts from '../apis/contacts';

export const syncContacts = (token) => async (dispatch)=> {
    const response = await contacts.get('/',{headers: {'Authorization' : `Bearer ${token}`}});
    dispatch({
        type :'SYNC_CONTACTS',
        response: response.data
    })
}

export const getRecents = (token) => async (dispatch)=> {
    const response = await contacts.get('/recents',{headers: {'Authorization' : `Bearer ${token}`}});
    dispatch({
        type :'GET_RECENTS',
        response: response.data
    })
}


export const addContact = (userId,token) => async (dispatch)=> {
    const response = await contacts.post('/',
                                {contactInfo: {id:userId}},
                                {headers: {'Authorization' : `Bearer ${token}`}});
    if(!response.data.error.status){
        dispatch({
            type :'ADD_CONTACT',
            response: response.data
        })
    }
}

export const removeContact = (contactInfo,token) => async (dispatch)=> {
    //console.log(contactInfo,token);
    const response = await contacts.delete('/',{
        data:{contactInfo},
        headers: {'Authorization' : `Bearer ${token}`}
    });
    if(!response.data.error.status){
        dispatch({
            type :'REMOVE_CONTACT',
            contactInfo: contactInfo
        })
    }
    
}

export const removeFav = (userId,token) => async (dispatch)=> {
    console.log('removeFav');
    const response = await contacts.patch('/',
        {contactInfo: {userId, favStat: false},action: "FAVOURITE"},
        {headers: {'Authorization' : `Bearer ${token}`}
    });
    if(!response.data.error.status){
        dispatch({
            type :'REMOVE_FAV',
            userId: userId
        })
    }
    
}
export const addFav = (userId,token) => async (dispatch)=> {
    console.log('addFav');
    const response = await contacts.patch('/',
        {contactInfo: {userId, favStat: true},action: "FAVOURITE"},
        {headers: {'Authorization' : `Bearer ${token}`}
    });
    if(!response.data.error.status){
        dispatch({
            type :'ADD_FAV',
            userId: userId
        })
    }
    
}