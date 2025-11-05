import React, { useEffect } from "react";
import { Image, View, StyleSheet } from "react-native";
import { Colors } from "../constant/styles";
import MyStatusBar from "../components/myStatusBar";
import { useNavigation } from "expo-router";

const SplashScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.push('Auth/WelcomeScreen');
        }, 2000);
        return () => {
            clearTimeout(timer);
        }
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <MyStatusBar />
            <View style={styles.pageStyle}>
                <Image
                    source={require('../assets/images/appIcon.png')}
                    style={{ height: 100.0, width: 100.0, borderRadius: 70.0 }}
                    resizeMode="contain"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default SplashScreen;