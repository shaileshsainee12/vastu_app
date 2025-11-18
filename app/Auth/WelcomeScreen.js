import React, { useState, useCallback, useEffect } from "react";
import { Text, View, ImageBackground, BackHandler, StatusBar, TouchableOpacity, StyleSheet, } from "react-native";
import { Colors, CommonStyles, Fonts, Sizes } from "../../constant/styles";
import IntlPhoneInput from 'react-native-intl-phone-input';
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';

const WelcomeScreen = () => {

    const navigation = useNavigation();
    const [islogin, setIsLogin] = useState(true);

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    };

  useFocusEffect(
  useCallback(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      subscription.remove();   // ✅ correct cleanup
    };
  }, [backAction])
);


    useEffect(()=>{
       if(islogin){
        navigation.push('(tabs)')
       }
    },[islogin])
    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0)
        }, 1000)
    }

    const [backClickCount, setBackClickCount] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <View style={{ flex: 1, }}>
            <StatusBar backgroundColor="#000" barStyle={'light-content'} />
            <ImageBackground
                style={{ flex: 1, backgroundColor: Colors.whiteColor,position: 'relative' }}
            >

                <View style={styles.headerShape} />
                <View style={{ display: 'flex', justifyContent: 'center', paddingHorizontal: 20  }}>
                    <Text style={{ ...Fonts.white30Bold, fontWeight: 'semibold', marginTop: 100.0, }}>Welcome to Triangle Vastu,</Text>
                    <Text style={{ ...Fonts.white16Regular, fontWeight: 'bold', marginTop: Sizes.fixPadding }}>Sign In</Text>
                </View>
                <View
                    style={{
                        ...CommonStyles.shadow,
                        backgroundColor: Colors.whiteColor,
                        margin: Sizes.fixPadding * 2.5,
                        border: 1,
                        borderColor: Colors.grayColor,
                        borderRadius: 10,
                        padding: Sizes.fixPadding * 2
                    }}
                >
                    <Text style={{ ...Fonts.black16Regular,  marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding + 10.0 }}>You will receive a 4 digit code for verification</Text>
                    <Text style={{...styles.label}}>Enter Your Mobile Number</Text>
                    {phoneNumberInput()}
                    <Text style={styles.terms}>
                        By Signing up, you agree to our {" "}
                        <Text style={styles.link}>Terms of use </Text> and  {""}
                        <Text style={styles.link}>Privacy Policy</Text>
                    </Text>

                    <TouchableOpacity
                        onPress={() => navigation.push('Auth/VerificationScreen', { phoneNumber })}
                        style={styles.otpButton}
                    >
                        <Text style={styles.otpText}>Get OTP</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.guestText}>Sign in as a Guest</Text>
                    </TouchableOpacity>

                </View>

                {/* Social buttons */}
                <View style={styles.socialContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                        <FontAwesome name="google" size={20} color="#fff" />

                        <Text style={styles.socialText}>Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialButton}>
                        <FontAwesome name="apple" size={20} color="#fff" />
                        <Text style={styles.socialText}>Apple ID</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialButton}>
                        <FontAwesome name="facebook" size={20} color="#fff" />
                        <Text style={styles.socialText}>Facebook</Text>
                    </TouchableOpacity>
                </View>

                {exitInfo()}
            </ImageBackground>
        </View>
    )

    function exitInfo() {
        return (
            backClickCount == 1
                ?
                <View style={styles.exitWrapStyle}>
                    <Text style={{ ...Fonts.white13Regular }}>
                        Press back once again to exit
                    </Text>
                </View>
                :
                null
        )
    }

    function phoneNumberInput() {
        return (
            <IntlPhoneInput
                onChangeText={({ phoneNumber }) => setPhoneNumber(phoneNumber)}
                defaultCountry="IN"
                containerStyle={styles.phoneNumberContainerStyle}
                placeholder="Phone Number"
                placeholderTextColor={Colors.grayColor}
                dialCodeTextStyle={{ ...Fonts.black16Regular }}
                phoneInputStyle={styles.phoneFieldStyle}
                filterInputStyle={{ ...Fonts.black16Regular }}
                flagStyle={{ fontSize: 20 }}
                modalCountryItemCountryNameStyle={{ ...Fonts.black16Regular }}
            />
        )
    }

}

const styles = StyleSheet.create({
    headerShape: {
        position: "absolute",
        backgroundColor: Colors.primary,
        height: "40%",
        width: "100%",
        borderBottomRightRadius: "60%",
    },
    label: {
        fontSize: 14,
        fontWeight: "400",
        color: "#000",
        marginBottom: 5,
        fontFamily: "NotoSans_Regular",
    },
    terms: {
        fontSize: 14,
        color: "#555",
        marginVertical: 10.0,
    },
    link: {
        color: "#C69A00",
        textDecorationLine: "underline",
    },
    otpButton: {
        backgroundColor: "#C69A00",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 10,
    },
    otpText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    guestText: {
        color: "#C69A00",
        fontSize: 14,
        textAlign: "right",
        marginTop: 8,
        textDecorationLine: "underline",
    },
    socialContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "85%",
        marginHorizontal: Sizes.fixPadding * 2.5,
        marginTop: Sizes.fixPadding * 3.0,
    },
    socialButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C69A00",
        borderRadius: 8,
        gap: 5,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
    },
    socialText: {
        color: "#fff",
        fontSize: 16,
    },
    phoneNumberContainerStyle: {
        backgroundColor: "#F5F5F5",
        borderRadius: Sizes.fixPadding,
    },
    exitWrapStyle: {
        backgroundColor: '#333333',
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    phoneFieldStyle: {
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding,
        flex: 1,
        marginLeft: Sizes.fixPadding + 20.0,
        ...Fonts.black16Regular
    }
})

export default WelcomeScreen;