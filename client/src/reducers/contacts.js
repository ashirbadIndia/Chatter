
export default (state={isSynced:false},action )=>{
    if(action.type === 'SYNC_CONTACTS'){
        if(!action.response.error.status)
        return {
            ...state,
            isSynced: true,
            all: action.response.contacts,
            favourites: action.response.contacts.filter((contact)=>contact.favourite),
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
    if(action.type === "ADD_FAV"){
        return{
            ...state,
            favourites: [...state.favourites, state.all.find((i)=>i.userId===action.userId) ]
        }
    }
    if(action.type === "REMOVE_FAV"){
        return{
            ...state,
            favourites: state.favourites.filter(i => i.userId !== action.userId)
        }
    }
    return state;
}