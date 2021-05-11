import * as FileSystem from 'expo-file-system';
import { insertFile, fetchFiles } from '../../helpers/db';

export const ADD_PDF = 'ADD_PDF';
export const SET_FILES = 'SET_FILES';

export const addPdf = (newPath, title, secp, perfp) => {
    return async dispatch => {
        const docsPath = FileSystem.documentDirectory + title + '.pdf' ;
        
        try {
            const uri = await FileSystem.downloadAsync(
                newPath,
                docsPath
                )
            // const fileName = uri.split('/').pop();
            console.log('Finished downloading to ' + uri.uri);
            console.log(typeof uri.uri);
            // const file = uri.uri;
            // const dbResult = await insertFile(
            //     file
            //   );
            dispatch({
                type: ADD_PDF,
                path: {
                    location: uri.uri,
                    secp: secp,
                    perfp: perfp
                }
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};


// export const loadFiles = () => {
//     return async dispatch => {
//       try {
//         const dbResult = await fetchFiles();
//         dispatch({ type: SET_FILES, files: dbResult.rows._array});
//       } catch (err) {
//         throw err;
//       }
//     };
//   };