import { POPULATE_DATA} from '../actions/apps';

const initialState = {
    titles:[],
    appDetails: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case POPULATE_DATA:
            let appPack = [];
            for(let title in action.list){
                appPack.push(title);
            }
            return{
                titles: appPack,
                appDetails: action.list
            }
        default:
            return state;

    }
}