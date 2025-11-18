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
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import MyStatusBar from "../../components/myStatusBar";
import ConsultationModal from "../../components/common/ConsultationModal";

const { width } = Dimensions.get("window");

// Service-specific cards data
const serviceCardsData = {
  "1": {
    title: "Vastu",
    cards: [
      {
        id: "v1",
        title: "Home Vastu Analysis",
        description: "Comprehensive analysis of your home",
        image: require("../../assets/images/Home/vastu.png"),
        price: "$99",
      },
      {
        id: "v2",
        title: "Vastu Consultation",
        description: "1-on-1 consultation with expert",
        image: require("../../assets/images/Home/vastu.png"),
        price: "$149",
      },
      {
        id: "v3",
        title: "Vastu Report",
        description: "Detailed report & recommendations",
        image: require("../../assets/images/Home/vastu.png"),
        price: "$79",
      },
      {
        id: "v4",
        title: "Online Vastu Session",
        description: "Live online consultation",
        image: require("../../assets/images/Home/vastu.png"),
        price: "$199",
      },
    ],
  },
  "2": {
    title: "Residential Vastu",
    cards: [
      {
        id: "rv1",
        title: "Bedroom Optimization",
        description: "Optimize bedroom for better sleep",
        image: require("../../assets/images/Home/Residential_Vastu.jpg"),
        price: "$89",
      },
      {
        id: "rv2",
        title: "Living Room Setup",
        description: "Perfect living room arrangement",
        image: require("../../assets/images/Home/Residential_Vastu.jpg"),
        price: "$79",
      },
      {
        id: "rv3",
        title: "Kitchen Vastu",
        description: "Kitchen placement & design",
        image: require("../../assets/images/Home/Residential_Vastu.jpg"),
        price: "$69",
      },
      {
        id: "rv4",
        title: "Home Plan Review",
        description: "Complete home vastu analysis",
        image: require("../../assets/images/Home/Residential_Vastu.jpg"),
        price: "$199",
      },
      {
        id: "rv5",
        title: "Entrance Door Vastu",
        description: "Main door placement guidance",
        image: require("../../assets/images/Home/Residential_Vastu.jpg"),
        price: "$59",
      },
    ],
  },
  "3": {
    title: "Commercial Vastu",
    cards: [
      {
        id: "cv1",
        title: "Office Space Vastu",
        description: "Office layout optimization",
        image: require("../../assets/images/Home/Commercial_Vastu.jpg"),
        price: "$299",
      },
      {
        id: "cv2",
        title: "Shop Vastu",
        description: "Retail space arrangement",
        image: require("../../assets/images/Home/Commercial_Vastu.jpg"),
        price: "$249",
      },
      {
        id: "cv3",
        title: "Business Success Vastu",
        description: "Enhance business with vastu",
        image: require("../../assets/images/Home/Commercial_Vastu.jpg"),
        price: "$349",
      },
      {
        id: "cv4",
        title: "Restaurant Vastu",
        description: "Restaurant setup & design",
        image: require("../../assets/images/Home/Commercial_Vastu.jpg"),
        price: "$279",
      },
    ],
  },
  "4": {
    title: "Numerology Vastu",
    cards: [
      {
        id: "nv1",
        title: "House Number Analysis",
        description: "Analyze your house number",
        image: require("../../assets/images/Home/Numerology.png"),
        price: "$49",
      },
      {
        id: "nv2",
        title: "Lucky Bedroom Number",
        description: "Find lucky room numbers",
        image: require("../../assets/images/Home/Numerology.png"),
        price: "$39",
      },
      {
        id: "nv3",
        title: "Numerology Vastu Report",
        description: "Combined numerology & vastu",
        image: require("../../assets/images/Home/Numerology.png"),
        price: "$129",
      },
      {
        id: "nv4",
        title: "Door Number Correction",
        description: "Lucky door number guidance",
        image: require("../../assets/images/Home/Numerology.png"),
        price: "$79",
      },
    ],
  },
  "5": {
    title: "Numerology Vastu1",
    cards: [
      {
        id: "nv5_1",
        title: "Advanced Numerology",
        description: "Deep numerology analysis",
        image: require("../../assets/images/Home/Numerology.png"),
        price: "$179",
      },
      {
        id: "nv5_2",
        title: "Personal Number Reading",
        description: "Your life path number",
        image: require("../../assets/images/Home/Numerology.png"),
        price: "$99",
      },
    ],
  },
};

const ServiceDetailScreen = () => {
  const navigation = useNavigation();
  const { serviceId } = useLocalSearchParams();
  const [selectedCardTitle, setSelectedCardTitle] = useState(null);

  const serviceData = serviceCardsData[serviceId];

  if (!serviceData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Service not found</Text>
      </View>
    );
  }

  const handleCardPress = (cardTitle) => {
    setSelectedCardTitle(cardTitle);
    navigation.push('Astro/AstrologerListScreen', { cardTitle });
  };

  const renderCardItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.cardContainer}
        onPress={() => handleCardPress(item.title)}
      >
        <View style={styles.card}>
          <Image source={item.image} style={styles.imageStyle} />
          <View style={styles.overlay} />
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <MyStatusBar />
      {header()}
      <FlatList
        data={serviceData.cards}
        keyExtractor={(item) => item.id}
        renderItem={renderCardItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: Sizes.fixPadding * 2.0 }}
        contentContainerStyle={{ paddingTop: Sizes.fixPadding * 8.0, paddingBottom: 20 }}
      />
    </View>
  );

  function header() {
    return (
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <FontAwesome name="long-arrow-left" size={18} color={Colors.blackColor} />
            <Text style={{ ...Fonts.black18Bold, marginLeft: 5.0 }}>{selectedCardTitle || serviceData.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

export default ServiceDetailScreen;

const CARD_WIDTH = width / 2 - 25;

const styles = StyleSheet.create({
  headerStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: Sizes.fixPadding * 1.5,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: Sizes.fixPadding,
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
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
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
  cardTitle: {
    ...Fonts.white13Regular,
    textAlign: "center",
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
});
