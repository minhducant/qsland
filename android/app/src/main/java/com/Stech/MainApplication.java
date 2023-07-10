package com.stech.qsland;

import android.app.Application;
import android.content.Context;
//config facebook logina
//import com.facebook.CallbackManager;
// import com.facebook.reactnative.androidsdk.FBSDKPackage;
//import com.facebook.FacebookSdk;
//import com.facebook.appevents.AppEventsLogger;

//import com.facebook.react.bridge.JSIModulePackage;
//import com.swmansion.reanimated.ReanimatedJSIModulePackage;
//react-native-share
import cl.json.RNSharePackage;
import cl.json.ShareApplication;
//neu err clear react-native-share---setting.gradle---app/build.gradle
//
import com.BV.LinearGradient.LinearGradientPackage; //mau sac
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
//import com.swmansion.reanimated.ReanimatedPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.wuxudong.rncharts.MPAndroidChartPackage; //bieu do
import com.horcrux.svg.SvgPackage;
//import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.microsoft.codepush.react.CodePush; //codePush
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativecommunity.clipboard.ClipboardPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnativepagerview.PagerViewPackage;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import org.reactnative.camera.RNCameraPackage; //chu.p anh
import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;
public class MainApplication extends Application implements ReactApplication {
  //    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
  //    public static CallbackManager getCallbackManager(){
  //        return mCallbackManager;
  //    }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      packages.add(new RNHTMLtoPDFPackage());
      //                    packages.add(new FBSDKPackage(mCallbackManager));
      return packages;
    }

    //                @Override
    //                protected JSIModulePackage getJSIModulePackage() {
    //                  return new ReanimatedJSIModulePackage(); // <- add
    //                }
    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
    Context context,
    ReactInstanceManager reactInstanceManager
  ) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.stech.qsland.ReactNativeFlipper");
        aClass
          .getMethod(
            "initializeFlipper",
            Context.class,
            ReactInstanceManager.class
          )
          .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
