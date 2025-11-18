import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import {
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  Feather,
} from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import Header from "../../components/common/Header";

const MyProfileScreen = () => {
  const profileMenu1 = [
    { id: 1, icon: "account-edit", label: "Edit Profile Details", link: "EditProfile/EditProfileScreen" },
    { id: 2, icon: "translate", label: "Language" },
    { id: 3, icon: "calendar-outline", label: "Booking", type: "ion" },
    { id: 4, icon: "video", label: "Training Program & Classes", type: "entypo" },
    { id: 5, icon: "package-variant-closed", label: "Order Details" },
    { id: 6, icon: "bell-outline", label: "Notifications", link: "Notifications/NotificationScreen" },
    { id: 7, icon: "map-marker-outline", label: "Saved Address" , link: "Address/AddressListScreen" },
    { id: 8, icon: "heart-outline", label: "Wishlist", link: "Wishlist/WishlistScreen" },
  ];

  const profileMenu2 = [
    { id: 1, icon: "headphones", label: "Help And Support" ,link: "Help/HelpSupportScreen" },
    { id: 2, icon: "settings-outline", label: "Setting", type: "ion", link: "Setting/SettingScreen" },
    { id: 3, icon: "information-outline", label: "Terms & Conditions",link:"TermsConditionsScreen" },
    { id: 4, icon: "file-document-outline", label: "Privacy/Policy" ,link:"PrivacyPolicyScreen" },
    { id: 5, icon: "refresh", label: "Refund Policy" ,link:"RefundPolicyScreen" },
  ];
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <Header title="My profile" />
      <ScrollView contentContainerStyle={{ padding: Sizes.fixPadding * 1.5 }}>
        {profileHeader()}

        <View style={styles.cardContainer}>{menuList(profileMenu1)}</View>

        <View style={styles.cardContainer}>{menuList(profileMenu2)}</View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.logoutButton}
          onPress={() => console.log("Logout pressed")}
        >
          <Feather name="log-out" size={20} color={Colors.whiteColor} />
          <Text style={[Fonts.white18Bold, { marginLeft: 8 }]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );


  // ================= Profile Top Section ==================
  function profileHeader() {
    return (
      <View style={styles.profileBox}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
          style={styles.profileImage}
        />
        <View style={{ marginLeft: 12 }}>
          <Text style={Fonts.black18Bold}>Hello Username</Text>
          <Text style={Fonts.gray16Regular}>+91 3265345926</Text>
        </View>
      </View>
    );
  }

  // ================= Menu List ==================
  function menuList(list) {
    return (
      <>
        {list?.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.6}
            style={styles.menuRow}
            onPress={() => {
              if (item.link) {
                navigation.push(item.link); // Navigate if link exists
              } else {
                console.log(item.label); // Otherwise just log
              }
            }}
          >
            {renderIcon(item)}
            <Text style={[Fonts.blackBold, { marginLeft: 14,fontWeight:'500' }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </>
    );
  }


  // ================= Icon Renderer ==================
  function renderIcon(item) {
    if (item.type === "ion")
      return <Ionicons name={item.icon} size={22} color={Colors.blackColor} />;
    if (item.type === "entypo")
      return <Entypo name={item.icon} size={22} color={Colors.blackColor} />;
    return (
      <MaterialCommunityIcons
        name={item.icon}
        size={22}
        color={Colors.blackColor}
      />
    );
  }
};

const styles = StyleSheet.create({
  profileBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    elevation: 2,
    shadowColor: Colors.blackColor,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: Sizes.fixPadding * 2.0,
  },
  profileImage: {
    height: 60,
    width: 60,
    borderRadius: Sizes.fixPadding * 3.0,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    marginBottom: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: Sizes.fixPadding * 2.0,
  },
  logoutButton: {
    backgroundColor: Colors.primary, // Gold yellow tone
    borderRadius: Sizes.fixPadding - 2.0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Sizes.fixPadding + 2.0,
    marginBottom: Sizes.fixPadding * 3.0,
  },
});

export default MyProfileScreen;
