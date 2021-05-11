// import {} from '../../helpers/db';
export const POPULATE_DATA = 'POPULATE_DATA';


export const populateData = (list) => {
        return {
            type: POPULATE_DATA, list: list
        }
};