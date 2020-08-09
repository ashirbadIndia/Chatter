
export default (state={isSynced:false},action )=>{
    if(action.type === 'SYNC_CONTACTS'){
        if(!action.response.error.status)
        return {
            ...state,
            isSynced: true,
            all: action.response.contacts,
            favourites: (state.favourites)?state.favourites:[],
            recents: (state.recents)?state.recents:[]
        }
    }
    if(action.type === 'GET_RECENTS'){
        if(!action.response.error.status)
        return {
            ...state,
            recents: action.response.recents,
            favourites: (state.favourites)?state.favourites:[],
            all: (state.all)?state.all:[]
        }
    }
    if(action.type === 'ADD_CONTACT'){
        return {
            isSynced: true,
            all: [...state.all, action.response.contactInfo],
            favourites: (state.favourites)?state.favourites:[],
            recents: (state.recents)?state.recents:[]
        }
    }
    if(action.type === 'LOG_OUT' || action.type === 'DELETE_USER'){
        return {
            isSynced: false,
            all: [],
            favourites: [],
            recents: []
        }
    }
    if(action.type === 'REMOVE_CONTACT'){
        console.log('removed',action.contactInfo.id);
        return{
            isSynced: true,
            all: state.all.filter((item)=>{
                console.log(item);
                return item.id !== action.contactInfo.id
            }),
            favourites: state.favourites.filter((item)=>item.id !== action.contactInfo.id),
            recents: state.recents
        }
    }
    return state;
}