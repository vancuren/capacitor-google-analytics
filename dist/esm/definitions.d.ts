declare module "@capacitor/core" {
    interface PluginRegistry {
        CapacitorGoogleAnalytics: CapacitorGoogleAnalyticsPlugin;
    }
}
export interface CapacitorGoogleAnalyticsPlugin {
    initializeApp(options: {
        config: any;
    }): Promise<{
        app: string;
    }>;
    logEvent(options: {
        name: string;
        parameters: object;
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
        screenClassOverride?: string;
    }): Promise<void>;
    getAppInstanceId(): Promise<{
        appInstanceId: string;
    }>;
    resetAnalyticsData(): Promise<void>;
}
