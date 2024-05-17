import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { SplashScreen, Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { TamaguiProvider } from 'tamagui'

import { Platform } from "react-native";

if (Platform.OS === "web") {
  import('../tamagui-web.css')
}

import { config } from '../tamagui.config'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import React from 'react'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'app',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export function loadFonts() {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf')
  })

  return [interLoaded, interError]
}

export default function RootLayout() {
  const [interLoaded, interError] = loadFonts()

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])

  if (!interLoaded && !interError) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="TossupSettingsModal" options={{ presentation: 'modal', title: 'Tossup Settings' }} />
          <Stack.Screen name="BonusSettingsModal" options={{ presentation: 'modal', title: 'Bonus Settings' }} />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  )
}
