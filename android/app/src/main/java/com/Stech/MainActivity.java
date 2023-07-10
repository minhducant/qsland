package com.stech.qsland;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.ContentResolver;
import android.content.Intent;
import android.media.AudioAttributes;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import androidx.core.app.NotificationCompat;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; //react-native-splash-screeen

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this,true);

    //
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationChannel notificationChannel = new NotificationChannel(
        "sound_channel",
        "Notification",
        NotificationManager.IMPORTANCE_HIGH
      );
      notificationChannel.setShowBadge(true);
      notificationChannel.setDescription("");
      AudioAttributes att = new AudioAttributes.Builder()
        .setUsage(AudioAttributes.USAGE_NOTIFICATION)
        .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
        .build();
      notificationChannel.setSound(
        Uri.parse(
          ContentResolver.SCHEME_ANDROID_RESOURCE +
          "://" +
          getPackageName() +
          "/raw/sound"
        ),
        att
      );
      notificationChannel.enableVibration(true);
      notificationChannel.setVibrationPattern(new long[] { 400, 400 });
      notificationChannel.setLockscreenVisibility(
        NotificationCompat.VISIBILITY_PUBLIC
      );
      NotificationManager manager = getSystemService(NotificationManager.class);
      manager.createNotificationChannel(notificationChannel);
      //
      super.onCreate(savedInstanceState);
    }
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    //    MainApplication.getCallbackManager().onActivityResult(requestCode,resultCode,data);
  }

  @Override
  protected String getMainComponentName() {
    return "Stech";
  }
}
