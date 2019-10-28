# Capacitor Google Analytics

A Capacitor plugin that enables the new data streams in Google Analytics and Firebase analytics.

## Special Thanks

A special thanks to philmerrell as a starting point for this plugin. It appears that they are no longer able to maintain their plugin https://github.com/philmerrell/capacitor-firebase-analytics this is why I create this.

## Compatability

Currently compatible with Android. Will be compatible with iOS and Web/PWA on or about 10/29/2019.

## Getting Started

### Create Google/Firebase Analytics Account

To get started visit https://analytics.google.com. 

1. Create new account.
2. Set Account Details.
3. Select Apps and Web.
4. Select Next
5. After the account is created you should see Se up data stream to start collecting data.

### Android Setup

1. Select Android app.
2. Add package name.
3. Add app name.
4. Agree to terms.
5. Register app.
6. After registering the app Google Analytics will configure a Firebase/Google Cloud project associated with your app.
7. Once this is complete select next.
8. Download the google-services.json
9. In Android Studio switch to Project view.
10. In the Project level build.gradle add the following to dependencies
    `classpath 'com.google.gms:google-services:4.2.0'`
11. In the App level build.gradle add the following to dependencies
    `implementation 'com.google.firebase:firebase-core:17.0.0'`
12. In the same file add the following to the bottom of the file.
    `apply plugin: 'com.google.gms.google-services'`
13. Sync Project

* Ionic 4 notes. If you're using Ionic 4 change the following snippets above to the following

11. In the App level build.gradle add the following to dependencies note the version change.
    `implementation 'com.google.firebase:firebase-core:16.0.7'`
    `implementation 'com.google.firebase:firebase-analytics:16.3.0'`


### iOS Setup

Coming soon ...

ETA 10/29/2019

### Web/PWA Setup

Coming soon ...

ETA 10/29/2019

## Usage

  logEvent()
  params
    options: {
        name: string;
        parameters: object;
    }
  ```
  logEvent(options: { name: string, parameters: object }): Promise<void>;
  ```
  
  setUserProperty()
  params
    options: {
        name: string;
        value: string;
    }  
  ```
  setUserProperty(options: { value: string, name: string }): Promise<void>;
  ```
  
  setUserId()
  params
    options: {
        userId: string;
    }
  ```
  setUserId(options: { userId: string }): Promise<void>;
  ```
  
  setCurrentScreen()
  params
    options: {
        screenName: string, 
        screenClassOverride?: string;
    }  
  ```
  setCurrentScreen(options: { screenName: string, screenClassOverride?: string }): Promise<void>;
  ```
  
  getAppInstanceId()
  ```
  getAppInstanceId(): Promise<{appInstanceId: string}>;
  ```
  
  resetAnalyticsData()
  ```
  resetAnalyticsData(): Promise<void>;
  ```