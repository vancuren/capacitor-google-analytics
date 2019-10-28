import Foundation
import Capacitor
import FirebaseCore
import FirebaseAnalytics
/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitor.ionicframework.com/docs/plugins/ios
 */
@objc(CapacitorGoogleAnalytics)
public class CapacitorGoogleAnalytics: CAPPlugin {

    var fbase: FirebaseApp? = nil;
    
    public override func load() {
        if (FirebaseApp.app() == nil) {
            FirebaseApp.configure();
            fbase = FirebaseApp.app()
        }
    }
    
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.success([
            "value": value
        ])
    }

    @objc func setScreenName(_ call: CAPPluginCall) {
        let screenName = call.getString("screenName");
        let screenClassOverride = call.getString("screenClassOverride");
        if screenName != nil {
            DispatchQueue.main.async {
                Analytics.setScreenName(screenName, screenClass: screenClassOverride);
                call.success();
            }
        } else {
            call.error("must include a name")
            self.bridge.modulePrint(self, "no screen name present")
            return
        }
    }
    
    @objc func setUserProperty(_ call: CAPPluginCall) {
        let value = call.getString("value");
        let name = call.getString("name");
        if value != nil && name != nil {
            DispatchQueue.main.async {
                Analytics.setUserProperty(value, forName: name!);
                call.success();
            }
        } else {
            call.error("must include a name and value")
            self.bridge.modulePrint(self, "no name or value present")
            return
        }
    }
    
    @objc func logEvent(_ call: CAPPluginCall) {
        let name = call.getString("name");
        let parameters = call.getObject("parameters") ?? nil;

        if name != nil {
            DispatchQueue.main.async {
                Analytics.logEvent(name!, parameters: parameters);
                call.success();
            }
        } else {
            call.error("must include a name")
            self.bridge.modulePrint(self, "no name present")
            return
        }

    }
    
    @objc func setUserId(_ call: CAPPluginCall) {
        let userId = call.getString("userId");
        if userId != nil {
            DispatchQueue.main.async {
                Analytics.setUserID(userId);
                call.success();
            }
        } else {
            call.error("must include a id")
            self.bridge.modulePrint(self, "no id present")
            return
        }
        
    }
    
    @objc func appInstanceId(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let instanceId = Analytics.appInstanceID();
            call.success(["appInstanceId": instanceId])
        }
    }

    @objc func resetAnalyticsData(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            Analytics.resetAnalyticsData();
            call.success();
        }
    }

}
