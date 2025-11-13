import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Switch,
    StyleSheet,
    ScrollView,
    Modal,
    Animated,
} from "react-native";
import { Colors, CommonStyles, Fonts, Sizes } from "../../constant/styles";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import MyStatusBar from "../../components/myStatusBar";
import Header from "../../components/common/Header";

const SettingScreen = () => {
    const [mobileNotification, setMobileNotification] = useState(true);
    const [whatsappNotification, setWhatsappNotification] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [showDeactivatedSuccess, setShowDeactivatedSuccess] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <Header title="Settings" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: Sizes.fixPadding * 2 }}
            >
                {/* Notifications Setting */}
                <Text style={styles.sectionTitle}>Notifications Setting</Text>
                <View style={styles.cardContainer}>
                    <View style={styles.row}>
                        <Text style={styles.labelText}>Mobile Notifications</Text>
                        {renderAnimatedSwitch(
                            mobileNotification,
                            setMobileNotification,
                        )}
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.labelText}>WhatsApp Notifications</Text>
                        {renderAnimatedSwitch(
                            whatsappNotification,
                            setWhatsappNotification,
                        )}
                    </View>
                </View>

                {/* Theme Setting */}
                <Text style={[styles.sectionTitle, { marginTop: Sizes.fixPadding * 2 }]}>
                    Theme Setting
                </Text>
                <View style={styles.cardContainer}>
                    <View style={styles.row}>
                        <Text style={styles.labelText}>Dark Mode</Text>
                        {renderAnimatedSwitch(
                            darkMode,
                            setDarkMode,
                        )}
                    </View>
                </View>

                {/* Deactivate Account */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setShowDeactivateModal(true)}
                    style={styles.deactivateContainer}
                >
                    <MaterialCommunityIcons name="trash-can-outline" size={20} color="red" />
                    <Text style={styles.deactivateText}>Deactivate My Account</Text>
                </TouchableOpacity>

                {/* Logout Button */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setShowLogoutModal(true)}
                    style={styles.logoutButton}
                >
                    <Ionicons name="log-out-outline" size={18} color="white" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Deactivate Confirmation Modal */}
            <Modal transparent visible={showDeactivateModal} animationType="fade">
                <View style={styles.modalBackground}>
                    <View style={styles.modalBox}>
                        <MaterialIcons name="report-gmailerrorred" size={40}
                            color="red"
                            style={{ marginBottom: 10 }}
                        />
                        <Text style={styles.modalTitle}>
                            Are you sure you want to deactivate your account?
                        </Text>
                        <Text style={styles.modalMessage}>
                            You will not be able to use your profile, but your data will be
                            kept safe in case you want to reactivate later
                        </Text>

                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity
                                style={[styles.cancelBtn, { backgroundColor: "#f8f3df" }]}
                                onPress={() => setShowDeactivateModal(false)}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionBtn, { backgroundColor: "red" }]}
                                onPress={() => {
                                    setShowDeactivateModal(false);
                                    setShowDeactivatedSuccess(true);
                                }}
                            >
                                <Text style={styles.actionText}>Deactivate</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Deactivated Success Modal */}
            <Modal transparent visible={showDeactivatedSuccess} animationType="fade" onDismiss={() => setShowDeactivatedSuccess(false)}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalBox}>
                        <MaterialIcons name="report-gmailerrorred" size={40}
                            color="red"
                            style={{ marginBottom: 10 }}
                        />
                        <Text style={styles.modalTitle}>
                            Your account has been deactivated.
                        </Text>
                        <Text style={styles.modalMessage}>
                            You can log in again anytime to reactivate.
                        </Text>
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.primary,
                                borderRadius: 8,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 20,
                            }}
                            onPress={() => setShowDeactivatedSuccess(false)}
                        >
                            <Text style={styles.actionText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Logout Confirmation Modal */}
            <Modal transparent visible={showLogoutModal} animationType="fade">
                <View style={styles.modalBackground}>
                    <View style={styles.modalBox}>
                        <Ionicons
                            name="log-out-outline"
                            size={40}
                            color={Colors.primary}
                            style={{ marginBottom: 10 }}
                        />

                        <Text style={styles.modalTitle}>
                            Are you sure you want to log out?
                        </Text>
                        <Text style={styles.modalMessage}>
                            You will need to enter your email/phone and password to log back
                            in. Your data and settings will remain safe.
                        </Text>

                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity
                                style={[styles.cancelBtn, { backgroundColor: "#f8f3df" }]}
                                onPress={() => setShowLogoutModal(false)}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionBtn]}
                                onPress={() => {
                                    setShowLogoutModal(false);
                                    console.log("Logged out");
                                }}
                            >
                                <Text style={styles.actionText}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const renderAnimatedSwitch = (value, setValue,) => {
    const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: value ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [value]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 22], // Thumb moves from left to right
    });

    return (
        <View>

            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setValue(!value)}
                style={styles.switchTrack}
            >
                <Animated.View
                    style={[
                        styles.switchThumb,
                        { transform: [{ translateX }] },
                    ]}
                />
            </TouchableOpacity>
        </View>
    );
};



export default SettingScreen;

const styles = StyleSheet.create({
    sectionTitle: {
        ...Fonts.black18Bold,
        marginBottom: Sizes.fixPadding,
    },
    cardContainer: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 1.5,
        elevation: 3,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: Sizes.fixPadding * 0.7,
    },
    labelText: {
        ...Fonts.black14Regular,
    },
    deactivateContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        elevation: 2,
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2,
        backgroundColor: "white",
    },
    deactivateText: {
        marginLeft: Sizes.fixPadding,
        ...Fonts.black14Regular,
        color: "red",
    },
    logoutButton: {
        backgroundColor: Colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 2.0,
        marginTop: Sizes.fixPadding * 2,
    },
    logoutText: {
        color: "white",
        marginLeft: Sizes.fixPadding,
        fontSize: 14.0,
        ...Fonts.whiteRegular,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        padding: Sizes.fixPadding * 2,
    },
    modalBox: {
        backgroundColor: "white",
        borderRadius: Sizes.fixPadding + 2.0,
        padding: Sizes.fixPadding * 2.5,
        alignItems: "center",
        width: "90%",
    },
    modalTitle: {
        ...Fonts.black16Bold,
        textAlign: "center",
        marginBottom: 8,
    },
    modalMessage: {
        ...Fonts.blackRegular,
        textAlign: "center",
        fontSize:12
    },
    modalButtonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: Sizes.fixPadding * 2.0,
    },
    cancelBtn: {
        flex: 1,
        marginRight: Sizes.fixPadding,
        borderRadius: 8,
        paddingVertical: Sizes.fixPadding,
        alignItems: "center",
        justifyContent: "center",
    },
    cancelText: {
        ...Fonts.black14Regular,
    },
    actionBtn: {
        flex: 1,
        marginLeft: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
    },
    actionText: {
        fontSize: 14.0,
        ...Fonts.whiteRegular,
    },
    switchTrack: {
        width: 50,
        height: 28,
        borderRadius: Sizes.fixPadding * 2,
        backgroundColor: "#E6E6E6",
        borderWidth: 1.2,
        borderColor: "#B3B3B3",
        justifyContent: "center",
    },
    switchThumb: {
        width: 24,
        height: 24,
        borderRadius: Sizes.fixPadding + 2.0,
        backgroundColor: Colors.primary,
        position: "absolute",
    },

});
