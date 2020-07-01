import contacts from '../apis/contacts';

export const syncContacts = (userId) => async (dispatch)=> {
    const response = await contacts.get(`/${userId}`);
    dispatch({
        type :'SYNC_CONTACTS',
        response: response.data
    })
}


export const addContact = (myId,userId) => async (dispatch)=> {
    const response = await contacts.post('/',{myId,userId});
    console.log(response);
    dispatch({
        type :'ADD_CONTACT',
        payload: {
            result: response.data.result,
            contact: response.data.contact
        }
    })
}

export const removeContact = (myId,userId) => async (dispatch)=> {
    const response = await contacts.delete('/',{
        data:{myId,userId}
    });
    if(response.data.success){
        dispatch({
            type :'REMOVE_CONTACT',
            contactId: userId
        })
    }
    
}