import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import MyStatusBar from "../components/myStatusBar";
import { Fonts, Colors, Sizes } from "../constant/styles";
import Header from "../components/common/Header";

const RefundPolicyScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <Header title="Refund Policy" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: Sizes.fixPadding * 2 }}
      >
        <Text style={styles.heading}>Simple and fair refunds</Text>

        <Text style={styles.text}>
          For digital services or paid features, refunds can be requested within 7 days of purchase,
          if the service has not been fully used.
        </Text>

        <Text style={styles.text}>
          For physical products, returns are accepted within 7 days of delivery if the item is unused
          and in original condition.
        </Text>

        <Text style={styles.text}>
          Some items like digital downloads, completed services, or customized products are
          non-refundable.
        </Text>

        <Text style={styles.text}>
          Refunds will be processed within 5–10 business days to the original payment method.
        </Text>

        <Text style={styles.text}>
          To request a refund, please use the Help & Support section or email us at{" "}
          <Text style={{ fontWeight: "bold" }}>support@yourapp.com</Text>.
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

export default RefundPolicyScreen;
