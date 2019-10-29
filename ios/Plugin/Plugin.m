#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>
#import <FirebaseCore/FirebaseCore.h>
// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(CapacitorGoogleAnalytics, "CapacitorGoogleAnalytics",
           CAP_PLUGIN_METHOD(initializeApp, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(logEvent, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(setUserProperty, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(setUserId, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(setCurrentScreen, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(getAppInstanceId, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(resetAnalyticsData, CAPPluginReturnNone);
)
