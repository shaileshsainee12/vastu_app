import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AppState, StatusBar } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    NotoSans_Bold: require("../assets/fonts/NotoSans-Bold.ttf"),
    NotoSans_Regular: require("../assets/fonts/NotoSans-Regular.ttf"),
    Lato_Bold: require("../assets/fonts/Lora-Bold.ttf"),
    Lato_Regular: require("../assets/fonts/Lora-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    const subscription = AppState.addEventListener("change", (_) => {
      StatusBar.setBarStyle("light-content");
    });
    return () => {
      subscription.remove();
    };
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false,animation:'ios_from_right' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Auth/WelcomeScreen" options={{ gestureEnabled: false }} />
      <Stack.Screen name="Auth/RegisterScreen" options={{ gestureEnabled: false }} />
      <Stack.Screen name="Auth/VerificationScreen" />
      <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
      <Stack.Screen name="Notifications/NotificationScreen" />
      <Stack.Screen name="Search/SearchScreen" />
      <Stack.Screen name="ViewAll/ViewAllScreen" />
      <Stack.Screen name="Specialist/SpecialistScreen" />
      <Stack.Screen name="TimeSlots/TimeSlotsScreen" />
      <Stack.Screen name="ConsultationDetail/ConsultationDetailScreen" />
      <Stack.Screen name="PaymentMethod/PaymentMethodScreen" />
      <Stack.Screen name="DoctorProfile/DoctorProfileScreen" />
      <Stack.Screen name="Review/ReviewScreen" />
      <Stack.Screen name="LabAndTestCheckup/LabTestAndHealthCheckUpScreen" />
      <Stack.Screen name="Message/MessageScreen" />
      <Stack.Screen name="EditProfile/EditProfileScreen" />
      <Stack.Screen name="PatientDirectory/PatientDirectoryScreen" />
      <Stack.Screen name="AboutUs/AboutUsScreen" />
    </Stack>
  );
}
