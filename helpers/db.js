// import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabase('files.db');

// export const init = () => {
//   const promise = new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS places (file TEXT NOT NULL);',
//         [],
//         () => {
//           resolve();
//         },
//         (_, err) => {
//           reject(err);
//         }
//       );
//     });
//   });
//   return promise;
// };

// export const insertFile = (pdf) => {
//     const promise = new Promise((resolve, reject) => {
//         db.transaction(tx => {
//           tx.executeSql(
//             `INSERT INTO places (file) VALUES (?);`,
//             [pdf],
//             (_, result) => {
//               resolve(result);
//             },
//             (_, err) => {
//               reject(err);
//             }
//           );
//         });
//       });
//       return promise;
// };

// export const fetchFiles = () => {
//     const promise = new Promise((resolve, reject) => {
//         db.transaction(tx => {
//           tx.executeSql(
//             'SELECT * FROM files',
//             [],
//             (_, result) => {
//               resolve(result);
//             },
//             (_, err) => {
//               reject(err);
//             }
//           );
//         });
//       });
//       return promise;
// };