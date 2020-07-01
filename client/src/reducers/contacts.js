export default (state={isSynced:false},action )=>{
    if(action.type === 'SYNC_CONTACTS'){
        return {
            isSynced: true,
            all: action.response,
            favourites: action.response.filter((item)=>item.favourite),
            recents: []
        }
    }
    if(action.type === 'ADD_CONTACT'){
        return {
            isSynced: true,
            all: [...state.all, action.payload.contact],
            favourites: state.favourites,
            recents: []
        }
    }
    if(action.type === 'REMOVE_CONTACT'){
        return{
            isSynced: true,
            all: state.all.filter((item)=>item.userId !== action.contactId),
            favourites: state.all.filter((item)=>item.userId !== action.contactId),
            recents: []
        }
    }
    return state;
}