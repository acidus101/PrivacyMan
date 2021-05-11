import React from 'react';
import {
    createAppContainer
} from 'react-navigation';
import {
    View,
    SafeAreaView,
    Image
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
// import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Colors from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ResultsScreen from '../screens/ResultsScreen';
import PdfScreen from '../screens/PdfOpen';
import installedAppsScreen from '../screens/installedAppsScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const appNavigator = createStackNavigator(
    {
        home: HomeScreen,
        results: ResultsScreen,
        open: PdfScreen,
        history: HistoryScreen,
        installed: installedAppsScreen, 
    },
    {
        defaultNavigationOptions: {...defaultNavOptions, animationEnabled: false},
    }
);

// const historyNavigator = createStackNavigator(
//     {
//         history: HistoryScreen
//     },
//     {
//         defaultNavigationOptions: defaultNavOptions
//     }
// );

// const MainNavigator = createDrawerNavigator(
//     {
//         home: appNavigator,
//         history: historyNavigator,
//     },
//     {
//         contentOptions: {
//             activeTintColor: "white",
//             labelStyle: {
//                 fontFamily: 'open-sans-bold'
//             }
//         },
//         contentComponent: props => {
//             return (
//                 <View style={{ flex: 1, paddingTop: 20, backgroundColor: '#D75B68' }}>
//                     <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//                     <Image source={require('../assets/logo-og.png')} style={{
//                             width: 50,
//                             height: 50,
//                             borderRadius: 75,
//                             borderWidth: 3,
//                             borderColor: 'black',
//                             overflow: 'hidden',
//                             marginVertical: 15,
//                             marginHorizontal: 15
//                         }} />
//                         <DrawerItems {...props} />
//                     </SafeAreaView>
//                 </View>
//             );
//         }
//     }
// );

export default createAppContainer(appNavigator);