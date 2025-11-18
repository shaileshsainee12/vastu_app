import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AppState, StatusBar } from 'react-native';
import { CartProvider } from './context/CartContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Lora_Bold: require("../assets/fonts/Lora-Bold.ttf"),
    Lora_Regular: require("../assets/fonts/Lora-Regular.ttf"),
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
    <CartProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'ios_from_right' }}>
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

        {/* ========= Product Details =============*/}
        <Stack.Screen name='Product/ProductDetails' />
        <Stack.Screen name='cart/CartScreen' />
        <Stack.Screen name='MyProfile/MyProfileScreen' />
        <Stack.Screen name='Address/AddressListScreen' />
        <Stack.Screen name='Address/AddNewAddressScreen' />
        <Stack.Screen name='Setting/SettingScreen' />
        <Stack.Screen name='Help/HelpSupportScreen' />
        <Stack.Screen name='ServiceDetail/ServiceDetailScreen' />
        <Stack.Screen name='TermsConditionsScreen' />
        <Stack.Screen name='PrivacyPolicyScreen' />
        <Stack.Screen name='RefundPolicyScreen' />
        <Stack.Screen name='Astro/AstrologerListScreen' />
      </Stack>
    </CartProvider>
  );
}
