
  Pod::Spec.new do |s|
    s.name = 'CapacitorGoogleAnalytics'
    s.version = '0.0.1'
    s.summary = 'A Google/Firebase Analytics plugin for use with Capacitor Hybrid Applications'
    s.license = 'MIT'
    s.homepage = 'https://github.com/vancuren/capacitor-google-analytics.git'
    s.author = 'Russell L. Van Curen'
    s.source = { :git => 'https://github.com/vancuren/capacitor-google-analytics.git', :tag => s.version.to_s }
    s.source_files = 'ios/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.ios.deployment_target  = '11.0'
    s.dependency 'Capacitor'
    s.dependency 'Firebase'
    s.dependency 'Firebase/Core'
  end