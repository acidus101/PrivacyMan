class securityModel {
  constructor(activityData,broadcastReceiverData,contentProviderData, featureData,definesPermissions,usesPermissions,serviceData) {
    this.activityData = activityData;
    this.broadcastReceiverData = broadcastReceiverData;
    this.contentProviderData = contentProviderData;
    this.featureData = featureData;
    this.definesPermissions = definesPermissions;
    this.usesPermissions = usesPermissions;
    this.serviceData = serviceData;
  }
}

export default securityModel;