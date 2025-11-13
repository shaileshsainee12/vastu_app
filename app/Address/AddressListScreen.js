import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";
import { useCart } from "../context/CartContext";
import Header from "../../components/common/Header";

const AddressListScreen = () => {
  const { addresses } = useCart();

  const navigation = useNavigation();

  const renderAddressCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ ...Fonts.black16Bold }}>{item.locationType}</Text>
        <TouchableOpacity>

          <Feather name="edit" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          ...Fonts.gray14Regular,
          marginTop: Sizes.fixPadding - 5,
          lineHeight: 20,
        }}
      >
        {` ${item.street}, ${item.city}, ${item.state}, ${item.pinCode}`}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>

      {/* Header */}
      <Header title="Saved Address" />

      {/* Address List */}
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderAddressCard}
        contentContainerStyle={{ padding: Sizes.fixPadding * 2 }}
        ListFooterComponent={
          <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.navigate("Address/AddNewAddressScreen")}>
            <Text style={{ ...Fonts.primaryColor17Bold }}>+ Add New Address</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );

};

export default AddressListScreen;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding * 1.5,
    marginBottom: Sizes.fixPadding * 1.5,
    borderWidth: 1,
    borderColor: Colors.grayColor,
    elevation: 1,
  },
});
