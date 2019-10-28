import { WebPlugin } from '@capacitor/core';
import { CapacitorGoogleAnalyticsPlugin } from './definitions';
import firebase from 'firebase/app';
import 'firebase/analytics';

export class CapacitorGoogleAnalyticsWeb extends WebPlugin implements CapacitorGoogleAnalyticsPlugin {

  analytics = firebase.analytics();

  constructor() {
    super({
      name: 'CapacitorGoogleAnalytics',
      platforms: ['web']
    });
  }


  async echo(options: { value: string }): Promise<{value: string}> {
    console.log('ECHO', options);
    return options;
  }

  logEvent(options: { name: string, parameters: any}) {    
    if (options.name) {

      const name = options.name;
      const params = options.parameters;
      this.analytics.logEvent(name, params ? params : null);

      return Promise.resolve();
    } else {
      return Promise.reject('must included a parameters');
    }
  }

  setUserProperty(options: { value: string, name: string}) {
    if (options.value && options.name) {
      const property: any = {};
      property[options.name] = options.value;
      this.analytics.setUserProperties(property);
      return Promise.resolve();
    } else {
      return Promise.reject('must included a both name and value');
    }
  }

  setUserId(options: { userId: string }) {
    if (options.userId) {
      const id = options.userId;
      this.analytics.setUserId(id);
      return Promise.resolve();
    } else {
      return Promise.reject('must included a userid');
    }
  }

  setCurrentScreen(options: { screenName: string, screenClassOverride: string }) {
    if (options.screenName) {
      const screen = options.screenName;
      this.analytics.setCurrentScreen(screen);
      return Promise.resolve();
    } else {
      return Promise.reject('must included a screen name');
    }
  }

  getAppInstanceId() {
    const appID = this.analytics.app;
    const name = appID.name;
    return Promise.resolve({ appInstanceId: name});
  }

  resetAnalyticsData() {
    // this.analytics.setAnalyticsCollectionEnabled = true;
    return Promise.resolve();
  }  
}

const CapacitorGoogleAnalytics = new CapacitorGoogleAnalyticsWeb();

export { CapacitorGoogleAnalytics };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(CapacitorGoogleAnalytics);
