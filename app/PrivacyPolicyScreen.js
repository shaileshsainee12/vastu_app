import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import MyStatusBar from "../components/myStatusBar";
import { Fonts, Colors, Sizes } from "../constant/styles";
import Header from "../components/common/Header";

const PrivacyPolicyScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <Header title="Privacy Policy" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: Sizes.fixPadding * 2 }}
      >
        <Text style={styles.heading}>
          We respect your privacy and protect your personal data:
        </Text>

        <Text style={styles.text}>
          We only collect basic information such as your name, email, and preferences to improve
          your experience.
        </Text>

        <Text style={styles.text}>
          Your data will not be shared with third parties without your consent.
        </Text>

        <Text style={styles.text}>
          We use secure methods to store and process your data.
        </Text>

        <Text style={styles.text}>
          You may request account deletion at any time, and your personal data will be removed from
          our system.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    ...Fonts.black18Bold,
    marginBottom: Sizes.fixPadding,
  },
  text: {
    ...Fonts.black14Regular,
    marginBottom: Sizes.fixPadding,
    lineHeight: 22,
  },
});

export default PrivacyPolicyScreen;
