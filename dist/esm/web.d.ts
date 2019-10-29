import { WebPlugin } from '@capacitor/core';
import { CapacitorGoogleAnalyticsPlugin } from './definitions';
import 'firebase/analytics';
export declare class CapacitorGoogleAnalyticsWeb extends WebPlugin implements CapacitorGoogleAnalyticsPlugin {
    constructor();
    initializeApp(options: {
        config: any;
    }): Promise<{
        app: any;
    }>;
    logEvent(options: {
        name: string;
        parameters: any;
    }): Promise<void>;
    setUserProperty(options: {
        value: string;
        name: string;
    }): Promise<void>;
    setUserId(options: {
        userId: string;
    }): Promise<void>;
    setCurrentScreen(options: {
        screenName: string;
        screenClassOverride: string;
    }): Promise<void>;
    getAppInstanceId(): Promise<{
        appInstanceId: string;
    }>;
    resetAnalyticsData(): Promise<void>;
}
declare const CapacitorGoogleAnalytics: CapacitorGoogleAnalyticsWeb;
export { CapacitorGoogleAnalytics };
