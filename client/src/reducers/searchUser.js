export default (state=[],action)=>{
    if(action.type === 'SEARCH_USER'){
        return action.results;
    }
    else return state;
}