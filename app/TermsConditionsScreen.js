import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Fonts, Colors, Sizes } from "../constant/styles";
import Header from "../components/common/Header";
import MyStatusBar from "../components/myStatusBar";

const TermsConditionsScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <Header title="Terms & Conditions" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: Sizes.fixPadding * 2 }}
      >
        <Text style={styles.heading}>
          Welcome to our app. By using this app, you agree to the following terms:
        </Text>

        <Text style={styles.text}>
          We may update these Terms & Conditions from time to time; continued use of the app means
          you accept the changes.
        </Text>

        <Text style={styles.text}>
          This app provides information and guidance about the 16 Sanskaras and related traditions.
        </Text>

        <Text style={styles.text}>
          Users are responsible for how they use the information provided.
        </Text>

        <Text style={styles.text}>
          Do not misuse, copy, or redistribute the app’s content without permission.
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

export default TermsConditionsScreen;
