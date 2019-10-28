package com.vancurengroup.googleanalytics;


import android.Manifest;
import android.os.Bundle;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import com.google.firebase.analytics.FirebaseAnalytics;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.Iterator;

@NativePlugin(
    permissions = {
        Manifest.permission.ACCESS_NETWORK_STATE,
        Manifest.permission.INTERNET,
        Manifest.permission.WAKE_LOCK
    }
)
public class CapacitorGoogleAnalytics extends Plugin {

    private FirebaseAnalytics mFirebaseAnalytics;

    public void load() {
        firebaseAnalytics = FirebaseAnalytics.getInstance(getContext());
    }

    // ! Used for debugging remove before production
    @PluginMethod()
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.success(ret);
    }

    // Get App Instance ID
    @PluginMethod()
    public void getAppInstanceId(PluginCall call) {
      try {
        String appId = firebaseAnalytics.getAppInstanceId().toString();
        JSObject ret = new JSObject();
        ret.put("appId", appId);
        call.success(ret);
      } catch (Exception e) {
        call.reject(e.getLocalizedMessage(), e);
      }
    }

    // Set userID for active user
    @PluginMethod()
    public void setUserId(PluginCall call) {
      try {
        
        // Get the userID param passed
        final String userId = call.getString("userID");

        // If the userID was passed and is valid setUserId
        if (userId != null) {
          firebaseAnalytics.setUserId(userId);
          call.success();
        } else {
          call.reject("must include a userID value");
        }

      } catch (Exception e) {
        call.reject(e.getLocalizedMessage(), e);
      }
    }

    // Set user properties
    @PluginMethod()
    public void setUserProperty(PluginCall call) throws JSONException {
      try {

        final String name = call.getString("name");
        final String value = call.getString("value");

        if (name != null) {
            if (value != null) {
                firebaseAnalytics.setUserProperty(name, value);
                call.success();
            } else {
            call.reject("must include a value");
            }
        } else {
          call.reject("must include a name");
        }

      } catch (Exception e) {
        call.reject(e.getLocalizedMessage(), e);
      }
    }

    // Override and set the current screen.
    @PluginMethod()
    public void setCurrentScreen(PluginCall call) {
        try {

            final String value = call.getString("screenName");
            final String overrideName = call.getString("screenClassOverride", null);

            getActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    firebaseAnalytics.setCurrentScreen(getActivity(), value, overrideName);
                }
            });

            call.success();
        } catch (Exception e) {
            call.reject(e.getLocalizedMessage(), e);
        }
    }

    @PluginMethod()
    public void logEvent(PluginCall call) {
      try {
        
        final String name = call.getString("name", null);

        JSObject data = call.getData();
        final JSONObject params = data.optJSONObject("parameters");
        
        if (name != null) {
            Bundle bundle = new Bundle();
            if (params != null) {
                Iterator<String> keys = params.keys();
  
                while (keys.hasNext()) {

                    // Extract Key
                    String key = keys.next();
                    // Extract Value
                    Object value = params.get(key);
                    
                    if (value instanceof String) {
                        // Set Type is String
                        bundle.putString(key, (String) value);
                    } else if (value instanceof Integer) {
                        // Set Type is Integer
                        bundle.putInt(key, (Integer) value);
                    } else if (value instanceof Double) {
                        // Set Type is Double
                        bundle.putDouble(key, (Double) value);
                    } else if (value instanceof Long) {
                        // Set Type is Long
                        bundle.putLong(key, (Long) value);
                    } else {
                        call.reject("Value of " + key + " must be one of the following types String, Integer, Double, or Long");
                    }
                }
          } else {
            call.reject("key 'parameters' does not exist");
          }
          firebaseAnalytics.logEvent(name, bundle);
          call.success();
        } else {
          call.reject("key 'name' does not exist");
        }
      } catch (Exception e) {
        call.reject(e.getLocalizedMessage(), e);
      }
    }    

    @PluginMethod()
    public void resetAnalyticsData(PluginCall call) {
      try {
        firebaseAnalytics.resetAnalyticsData();
        call.success();
      } catch (Exception e) {
        call.reject(e.getLocalizedMessage(), e);
      }
    }

}
