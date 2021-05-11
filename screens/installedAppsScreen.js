import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Card } from 'react-native-shadow-cards';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import * as actions from '../store/actions/actions';
import ResultCard from '../components/ResultCard';
import ListContents from '../models/listContents';

const image = require('../assets/wp4822291.jpg');
const url = require('../assets/abc.pdf');

const installedApps = props => {
  const [appsList, setAppsList] = useState();
  const appDetails = useSelector(state => state.apps.appDetails);
  let privacyPercentage;
  let performancePercentage;

  const modelHtml = (appDetails) => {
    const activityData = [];
    for (let item in appDetails) {

    }
    return (
      <div>

      </div>
    );
  }

  useEffect(() => {
    const apps = [];
    for (let item in appDetails) {
      let title = appDetails[item].generalData.applicationName;
      let packName = item;
      let newApp = new ListContents(
        title,
        packName
      )
      apps.push(newApp);
    }
    setAppsList(apps);
  }, []);

  function securityPercentageHandler(packName) {
    const activityData = appDetails[packName].activityData;//array(12.5)
    const broadcastReceiverData = appDetails[packName].broadcastReceiverData;//array(12.5)
    const certificateData = appDetails[packName].certificateData;//object(12.5)
    const contentProviderData = appDetails[packName].contentProviderData;//array(12.5)
    const featureData = appDetails[packName].featureData;//array(12.5)
    const generalData = appDetails[packName].generalData;//object
    const definesPermissions = appDetails[packName].permissionData.definesPermissions;//array(12.5)
    const usesPermissions = appDetails[packName].permissionData.usesPermissions;//array(12.5)
    const serviceData = appDetails[packName].serviceData;//array(12.5)

    // privacy
    let definesPermissionsPercentage = 0.2 * definesPermissions.length;
    let usesPermissionsPercentage = 0.2 * usesPermissions.length;

    // performance
    let activityPercentage = 0.05 * activityData.length;
    let contentProviderDataPercentage = 0.1 * contentProviderData.length;
    let serviceDataPercentage = 0.1 * serviceData.length;
    let featureDataPercentage = 0.1 * featureData.length;
    let broadcastReceiverDataPercentage = 0.1 * broadcastReceiverData.length;

    privacyPercentage = 100 - definesPermissionsPercentage - usesPermissionsPercentage;
    performancePercentage = 100 - activityPercentage - contentProviderDataPercentage - serviceDataPercentage - featureDataPercentage - broadcastReceiverDataPercentage;
    return;
  }

  const cardHandler = (path) => {
    let res = path.toString();
    let route = { uri: res, cache: true };
    props.navigation.navigate('open', { path: route });
  }
  const analysisDetailsHandler = (title, packName) => {
    securityPercentageHandler(packName);
    props.navigation.navigate('results', { appTitle: title, securityPercentage: privacyPercentage.toFixed(2), performancePercentage : performancePercentage.toFixed(2), uri: url, pdfFetched: true });
  }

  return (
    <ImageBackground source={image} style={styles.image}>
      <FlatList
        data={appsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={
          itemData => (
            <TouchableOpacity onPress={() => analysisDetailsHandler(itemData.item.title, itemData.item.packName)}>
              <Card style={{ padding: 10, margin: 10, elevation: 3, justifyContent: 'center', alignItems: 'center' }}>
                <ResultCard style={styles.resultcard}>
                  <View style={styles.alignDetails}>
                    <Text style={styles.apptitle}>{itemData.item.title}</Text>
                    <Text style={styles.appPackage}>{itemData.item.packName}</Text>
                  </View>
                </ResultCard>
              </Card>
            </TouchableOpacity>
          )
        }
      />
    </ImageBackground>
  );
};

installedApps.navigationOptions = {
  headerTitle: 'Select An App'
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultcard: {
    flexDirection: 'row',
    padding: 10,
    fontFamily: 'open-sans',
  },
  alignDetails: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  apptitle: {
    fontFamily: 'open-sans-bold',
    width: '80%',
  },
  appPackage: {
    fontFamily: 'open-sans',
    fontSize: 10,
  }
});

export default installedApps;
