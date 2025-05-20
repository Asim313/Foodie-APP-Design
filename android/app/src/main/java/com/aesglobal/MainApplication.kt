package com.aesgloballite

import android.app.Application
import android.content.Context
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.ReactHost
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Manually add packages that aren't autolinked here
              // add(MyReactNativePackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      load()
    }

    initializeFlipper(this, reactNativeHost.reactInstanceManager)
  }

  /**
   * Loads Flipper in debug builds. Uses reflection to avoid bundling in release builds.
   */
  private fun initializeFlipper(context: Context, reactInstanceManager: ReactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        val clazz = Class.forName("com.aesgloballite.ReactNativeFlipper")
        val method = clazz.getMethod("initializeFlipper", Context::class.java, ReactInstanceManager::class.java)
        method.invoke(null, context, reactInstanceManager)
      } catch (e: Exception) {
        e.printStackTrace()
      }
    }
  }
}
