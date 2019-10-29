var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebPlugin } from '@capacitor/core';
import * as firebase from 'firebase/app';
export class CapacitorGoogleAnalyticsWeb extends WebPlugin {
    constructor() {
        super({
            name: 'CapacitorGoogleAnalytics',
            platforms: ['web']
        });
        this.analytics = firebase.analytics();
    }
    echo(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ECHO', options);
            return options;
        });
    }
    initializeApp(config) {
        return __awaiter(this, void 0, void 0, function* () {
            firebase.initializeApp(config);
            const value = 'isEnabled';
            return Promise.resolve({ value: value });
        });
    }
    logEvent(options) {
        if (options.name) {
            const name = options.name;
            const params = options.parameters;
            this.analytics.logEvent(name, params ? params : null);
            return Promise.resolve();
        }
        else {
            return Promise.reject('must included a parameters');
        }
    }
    setUserProperty(options) {
        if (options.value && options.name) {
            const property = {};
            property[options.name] = options.value;
            this.analytics.setUserProperties(property);
            return Promise.resolve();
        }
        else {
            return Promise.reject('must included a both name and value');
        }
    }
    setUserId(options) {
        if (options.userId) {
            const id = options.userId;
            this.analytics.setUserId(id);
            return Promise.resolve();
        }
        else {
            return Promise.reject('must included a userid');
        }
    }
    setCurrentScreen(options) {
        if (options.screenName) {
            const screen = options.screenName;
            this.analytics.setCurrentScreen(screen);
            return Promise.resolve();
        }
        else {
            return Promise.reject('must included a screen name');
        }
    }
    getAppInstanceId() {
        const appID = this.analytics.app;
        const name = appID.name;
        return Promise.resolve({ appInstanceId: name });
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
//# sourceMappingURL=web.js.map