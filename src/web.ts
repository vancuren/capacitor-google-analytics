import { WebPlugin } from '@capacitor/core';
import { CapacitorGoogleAnalyticsPlugin } from './definitions';
import * as firebase from 'firebase/app';
import 'firebase/analytics';

export class CapacitorGoogleAnalyticsWeb extends WebPlugin implements CapacitorGoogleAnalyticsPlugin {

  constructor() {
    super({
      name: 'CapacitorGoogleAnalytics',
      platforms: ['web']
    });
  }

  initializeApp(options: { config: any }): Promise<{app: any}> {
    const app = firebase.initializeApp(options.config);
    return Promise.resolve({app: app});
  }
  

  logEvent(options: { name: string, parameters: any}) {    
    if (options.name) {

      const name = options.name;
      const params = options.parameters;
      firebase.analytics().logEvent(name, params ? params : null);

      return Promise.resolve();
    } else {
      return Promise.reject('must included a parameters');
    }
  }

  setUserProperty(options: { value: string, name: string}) {
    if (options.value && options.name) {
      const property: any = {};
      property[options.name] = options.value;
      firebase.analytics().setUserProperties(property);
      return Promise.resolve();
    } else {
      return Promise.reject('must included a both name and value');
    }
  }

  setUserId(options: { userId: string }) {
    if (options.userId) {
      const id = options.userId;
      firebase.analytics().setUserId(id);
      return Promise.resolve();
    } else {
      return Promise.reject('must included a userid');
    }
  }

  setCurrentScreen(options: { screenName: string, screenClassOverride: string }) {
    if (options.screenName) {
      const screen = options.screenName;
      firebase.analytics().setCurrentScreen(screen);
      return Promise.resolve();
    } else {
      return Promise.reject('must included a screen name');
    }
  }

  getAppInstanceId() {
    const appID = firebase.analytics().app;
    const name = appID.name;
    return Promise.resolve({ appInstanceId: name});
  }

  resetAnalyticsData() {
    // firebase.analytics().setAnalyticsCollectionEnabled = true;
    return Promise.resolve();
  }  
}

const CapacitorGoogleAnalytics = new CapacitorGoogleAnalyticsWeb();

export { CapacitorGoogleAnalytics };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(CapacitorGoogleAnalytics);
