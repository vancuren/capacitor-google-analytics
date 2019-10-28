import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';
import { CapacitorGoogleAnalytics } from 'capacitor-google-analytics';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public instanceID: any;

  constructor() {}

  async ngOnInit() {
    try {
      const options = { screenName: 'tab1', screenClassOverride: null };
      const gaSetPageView = await CapacitorGoogleAnalytics.setCurrentScreen(options);
      return;
    } catch (err) {
      throw new Error(err);
    }
  }

  async logEvent() {
    try {
      const options = { name: 'custom_event', parameters: { type: 'test', value: 'none' } };
      const gaLogEvent = await CapacitorGoogleAnalytics.logEvent(options);
      return;
    } catch (err) {
      throw new Error(err);
    }
  }

  async setUserId() {
    try {
      const options = { userId: '12345678' };
      const gaSetUserId = await CapacitorGoogleAnalytics.setUserId(options);
      return;
    } catch (err) {
      throw new Error(err);
    }
  }

  async setUserProperty() {
    try {
      const options = { name: 'last_data', value: new Date().toISOString() };
      const gaSetUserProperty = await CapacitorGoogleAnalytics.setUserProperty(options);
      return;
    } catch (err) {
      throw new Error(err);
    }
  }


  async getAppInstanceId() {
    try {
      const gaGetAppInstanceId = await CapacitorGoogleAnalytics.getAppInstanceId();
      this.instanceID = gaGetAppInstanceId;
      return;
    } catch (err) {
      throw new Error(err);
    }
  }
}
