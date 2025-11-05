import React, { useState, useEffect } from "react";
import { Text, View, Image, ImageBackground, StatusBar, TouchableOpacity, Dimensions, StyleSheet, Keyboard } from "react-native";
import { Fonts, Sizes, Colors, CommonStyles } from "../../constant/styles";
import { Ionicons } from '@expo/vector-icons';
import { CircleFade } from 'react-native-animated-spinkit';
import OTPField from 'react-native-otp-field';
import { Modal } from 'react-native-paper';
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";

const { width } = Dimensions.get('screen');

const VerificationScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { phoneNumber } = route.params || {};

    const [otpInput, setotpInput] = useState('');
    const [isLoading, setisLoading] = useState(false);

    // 🔹 Countdown timer state (120 seconds)
    const [secondsLeft, setSecondsLeft] = useState(120);

    // 🔹 useEffect to handle countdown
    useEffect(() => {
        if (secondsLeft <= 0) return;
        const timer = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [secondsLeft]);

    // 🔹 Function to reset timer on resend
    const handleResendOTP = () => {
        setSecondsLeft(120); // reset to 2 minutes
        // Call your resend API here
        console.log("Resending OTP...");
    };

    // Helper to format timer (MM:SS)
    const formatTime = (sec) => {
        const minutes = Math.floor(sec / 60);
        const seconds = sec % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#000" barStyle={'light-content'} />
            <ImageBackground style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <View style={styles.headerShape} />
                <View style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}>
                    {backArrow()}
                    <Text style={{ ...Fonts.white30Bold, marginTop: Sizes.fixPadding * 2.0 }}>
                        Verify Mobile No.
                    </Text>
                    <View style={{
                        ...CommonStyles.shadow,
                        backgroundColor: Colors.whiteColor,
                        marginTop: Sizes.fixPadding * 2.5,
                        borderRadius: 10,
                        padding: Sizes.fixPadding * 2
                    }}>
                        {passwordInfo()}
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setisLoading(true)
                                setTimeout(() => {
                                    setisLoading(false)
                                    navigation.push('(tabs)')
                                }, 2000);
                            }}
                            style={styles.otpButton}
                        >
                            <Text style={styles.otpText}>Verify OTP</Text>
                        </TouchableOpacity>
                        {resendInfo()}
                    </View>
                    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginTop:20, }}>
                        <Image
                            source={require('../../assets/images/image 6.png')}
                            style={{ height: 200, width: 200 }} />
                    </View>
                </View>
            </ImageBackground>
            {loading()}
        </View>
    );

    function backArrow() {
        return (
            <Ionicons
                name="arrow-back-sharp"
                size={24}
                color={Colors.whiteColor}
                style={{ marginTop: Sizes.fixPadding * 3.0, marginBottom: Sizes.fixPadding * 2.0, alignSelf: 'flex-start' }}
                onPress={() => navigation.pop()}
            />
        );
    }

    function passwordInfo() {
        return (
            <>
                <Text style={{ ...Fonts.black18Bold }}>Verify Phone</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.black16Regular, marginTop: Sizes.fixPadding }}>
                        OTP sent to {phoneNumber ? phoneNumber : "+91-XXXXXX"}
                    </Text>
                    <Text style={{ ...Fonts.black16Regular, fontWeight: 'bold', marginTop: Sizes.fixPadding, color: Colors.primary }} onPress={() => navigation.pop()}>
                        Edit
                    </Text>
                </View>
                <Text style={{ ...Fonts.black16Regular, fontSize: 14, marginTop: Sizes.fixPadding }}>Enter OTP</Text>
                <OTPField
                    length={4}
                    value={otpInput}
                    onChange={(val) => {
                        setotpInput(val);
                        if (val.length == 4) {
                            Keyboard.dismiss();
                            setisLoading(true);
                            setTimeout(() => {
                                setisLoading(false);
                                navigation.push('Auth/RegisterScreen');
                            }, 2000);
                        }
                    }}
                    textFieldStyle={styles.textFieldStyle}
                    containerStyle={{ marginTop: Sizes.fixPadding }}
                    cursorColor={Colors.primary}
                    selectionColor={Colors.primary}
                />
            </>
        );
    }

    function resendInfo() {
        return (
            <View style={styles.resendInfoContainerStyle}>
                <Text style={{ ...Fonts.grayRegular }}>
                    {secondsLeft > 0
                        && `Available in ${formatTime(secondsLeft)}`
                        }
                </Text>

                <TouchableOpacity
                    onPress={handleResendOTP}
                    disabled={secondsLeft > 0}
                >
                    <Text style={{
                        marginLeft: Sizes.fixPadding,
                        color: secondsLeft > 0 ? Colors.grayColor : Colors.primary,
                        fontWeight: 'bold'
                    }}>
                        Resend OTP
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    function loading() {
        return (
            <Modal visible={isLoading} contentContainerStyle={styles.dialogContainerStyle}>
                <View style={{ margin: Sizes.fixPadding * 2.0, backgroundColor: Colors.whiteColor, alignItems: 'center' }}>
                    <CircleFade size={48} color="#1976D2" />
                    <Text style={{ ...Fonts.gray16Regular, paddingBottom: Sizes.fixPadding - 5.0, marginTop: Sizes.fixPadding * 2.0 }}>
                        Please Wait...
                    </Text>
                </View>
            </Modal>
        );
    }
};

const styles = StyleSheet.create({
    headerShape: {
        position: "absolute",
        backgroundColor: Colors.primary,
        height: "40%",
        width: "100%",
        borderBottomRightRadius: "60%",
    },
    otpButton: {
        backgroundColor: "#C69A00",
        paddingVertical: 16.0,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: Sizes.fixPadding * 2.5,
    },
    otpText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    textFieldStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: "rgba(255,255,255,0.25)",
        borderColor: Colors.primary,
        borderWidth: 1.0,
        ...Fonts.white20Regular,
        width: width / 8,
        height: width / 8,
    },
    resendInfoContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
    },
    dialogContainerStyle: {
        backgroundColor: Colors.whiteColor,
        width: '85%',
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding
    },
});

export default VerificationScreen;
