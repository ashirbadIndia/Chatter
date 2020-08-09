export default (state=[],action)=>{
    if(action.type === 'SEARCH_USER'){
        return action.results;
    }
    if(action.type === 'CLEAR_SEARCH'){
        return [];
    }
    else return state;
}