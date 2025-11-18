
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "expo-router";
import { Colors, Fonts, Sizes } from "../../../constant/styles";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import MyStatusBar from "../../../components/myStatusBar";
import { LinearGradient } from "expo-linear-gradient";
import ConsultationModal from "../../../components/common/ConsultationModal";

const { width } = Dimensions.get("window");

const serviceList = [
  {
    id: "1",
    title: "Vastu",
    image: require("../../../assets/images/Home/vastu.png"),
  },
  {
    id: "2",
    title: "Residential Vastu",
    image: require("../../../assets/images/Home/Residential_Vastu.jpg"),
  },
  {
    id: "3",
    title: "Commercial Vastu",
    image: require("../../../assets/images/Home/Commercial_Vastu.jpg"),
  },
  {
    id: "4",
    title: "Numerology Vastu",
    image: require("../../../assets/images/Home/Numerology.png"),
  },
  {
    id: "5",
    title: "Numerology Vastu1",
    image: require("../../../assets/images/Home/Numerology.png"),
  },
];

const ServiceScreen = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const handleOpenConsult = () => {
    setShowModal(true)
  }

  const renderItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.cardContainer}
          onPress={() => navigation.push('ServiceDetail/ServiceDetailScreen', { serviceId: item.id })}
        >
          <View style={styles.card}>
            <Image source={item.image} style={styles.imageStyle} />
          </View>
          <View style={styles.overlay} />

          <Text style={styles.cardTitle}>{item.title}</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: Sizes.fixPadding * 2.0, paddingTop: Sizes.fixPadding }}>
      <MyStatusBar />
      {header()}

      <FlatList
        data={serviceList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            {search()}
            {newlyLanched()}
            <Text style={{ ...Fonts.black18Bold, marginVertical: Sizes.fixPadding }}>
              Our Services
            </Text>
          </>}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
  function newlyLanched() {
    return (
      <>
        {/* Banner Section */}
        <LinearGradient
          colors={['#FFE689', '#CCA104']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>
              Guidance from {"\n"}Trusted Astrologers,{"\n"}Just a Tap Away
            </Text>
            <TouchableOpacity style={styles.bookButton} onPress={handleOpenConsult}>
              <Text style={styles.bookButtonText}>Book a Consultation</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require("../../../assets/images/astro-boy.png")}
            style={styles.bannerImage}
            resizeMode="contain"
          />

        </LinearGradient>
        <ConsultationModal visible={showModal} onClose={() => setShowModal(false)} />


      </>
    )
  }
  {/* ========== Top Header  ===============*/ }
  function header() {
    return (
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: "center" }}>
            <FontAwesome name="long-arrow-left" size={18} color={Colors.blackColor} />
            <Text style={{ ...Fonts.black18Bold, marginLeft: 5.0 }}>Service</Text>
          </View>
        </TouchableOpacity>
        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: "center", height: 50, width: 50, backgroundColor: Colors.whiteColor,
          shadowColor: Colors.blackColor,
          shadowOpacity: 1,
          shadowRadius: 4,
          // ✅ Android shadow
          elevation: 4,
          borderRadius: "50%"
        }}>
          <Ionicons name="notifications-outline" size={24} color={Colors.primary} onPress={() => navigation.push('Notifications/NotificationScreen')} />
        </View>

      </View>
    )
  }
  {/* ========== Search Section  ===============*/ }
  function search() {
    return (
      <View style={styles.searchContainerStyle}>

        <TouchableOpacity
          activeOpacity={0.99}
          onPress={() => { navigation.push('Search/SearchScreen') }}
          style={styles.searchStyle}>
          <Ionicons name="search" size={24} color="gray" />
          <Text style={{ ...Fonts.gray17Regular, fontSize: 10, marginLeft: Sizes.fixPadding }}>
            Search by Keywords...
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
};


export default ServiceScreen;

const CARD_WIDTH = width / 2 - 25;

const styles = StyleSheet.create({
  headerStyle: {
    position: 'absolute',   // fixed position
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 4,

    // ✅ Android shadow
    elevation: 4,

  },
  searchContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Sizes.fixPadding * 8.0,
    marginBottom: Sizes.fixPadding + 5.0,
  },
  searchStyle: {
    height: 50.0,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1.0,
    borderColor: Colors.grayColor,
    alignItems: 'center',
    borderRadius: Sizes.fixPadding - 3.0,
    flexDirection: 'row',
    paddingHorizontal: Sizes.fixPadding + 5.0,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: Sizes.fixPadding ,
  },

  card: {
    width: "100%",
    height: CARD_WIDTH,
    backgroundColor: Colors.whiteColor,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: Colors.blackColor,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    position: "relative",
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 40,
    overflow: "hidden",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  banner: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 5.0,
    padding: Sizes.fixPadding + 5.0,
    position: "relative",
    marginTop: Sizes.fixPadding,
  },

  bannerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.blackColor,
    marginBottom: Sizes.fixPadding + 2.0,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    alignSelf: "flex-start",
  },
  bookButtonText: {
    color: Colors.whiteColor,
    fontWeight: "600",
  },
  bannerImage: {
    position: "absolute",
    right: 0,
    bottom: 0
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },


  cardTitle: {
    ...Fonts.white13Regular,
    textAlign: "center",
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
});
