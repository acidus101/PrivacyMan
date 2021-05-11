import { ADD_PDF, SET_FILES } from '../actions/actions';
import Pdf from '../../models/pdf';

const initialState = {
    files: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PDF:
            console.log('adding file to state');
            return {
                files: state.files.concat(new Pdf(action.path.location, action.path.secp,action.path.perfp))
            };
        case SET_FILES:
            return {
                files: action.files.map(
                    pl => pl.file
                )
            };
        default:
            return state;

    }
}