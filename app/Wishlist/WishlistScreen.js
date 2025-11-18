import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { useCart } from "../context/CartContext";
import Header from "../../components/common/Header";


const WishlistScreen = () => {
    const navigation = useNavigation();
    const { addToCart } = useCart();

    const [wishlist, setWishlist] = useState([
        {
            id: "1",
            name: "7 Mukhi Rudraksha",
            image: require("../../assets/images/kachhuaa.png"),
            price: "8,399",
            oldPrice: "12,200",
        },
        {
            id: "2",
            name: "7 Mukhi Rudraksha",
            image: require("../../assets/images/Home/Rudraksh.png"),
            price: "8,399",
            oldPrice: "12,200",
        },
        {
            id: "3",
            name: "7 Mukhi Rudraksha",
            image: require("../../assets/images/Lari.png"),
            price: "8,399",
            oldPrice: "12,200",
        },
        {
            id: "4",
            name: "7 Mukhi Rudraksha",
            image: require("../../assets/images/lion.png"),
            price: "8,399",
            oldPrice: "12,200",
        },
    ]);

    const handleRemove = (id) => {
        Alert.alert("Remove", "Are you sure you want to remove this item?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "OK", style: "destructive", onPress: () => {
                    setWishlist((prev) => prev.filter((item) => item.id !== id));
                }
            },
        ]);
    };

    const handleAddToCart = (item) => {
        addToCart(item);
    };

    const handleOrderNow = (item) => {
        navigation.navigate("Product/ProductDetails", { item });
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            {/* Delete */}
            <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => handleRemove(item.id)}
            >
                <Ionicons name="trash-outline" size={18} color={"red"} />
            </TouchableOpacity>

            {/* Product Image */}
            <Image source={item.image} style={styles.image} />

            {/* Title */}
            <Text style={styles.title}>{item.name}</Text>

            {/* Price */}
            <View style={styles.priceRow}>
                <Text style={styles.price}>₹{item.price}</Text>
                <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
            </View>

            {/* Buttons */}
            <View style={styles.btnRow}>
                <TouchableOpacity
                    style={styles.cartBtn}
                    onPress={() => handleAddToCart(item)}
                >
                    <Ionicons name="cart-outline" size={18} color={Colors.blackColor} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.orderBtn}
                    onPress={() => handleOrderNow(item)}
                >
                    <Text style={styles.orderText}>Order Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="Wishlist" />

            {wishlist.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="heart-dislike-outline" size={60} color={Colors.grayColor} />
                    <Text style={styles.emptyText}>Your wishlist is empty!</Text>
                </View>
            ) : (
                <FlatList
                    data={wishlist}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    contentContainerStyle={{ padding: Sizes.fixPadding, paddingTop: Sizes.fixPadding * 2.0 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

export default WishlistScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
    },

    card: {
        width: "48%",
        backgroundColor: `${Colors.primary}33`,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 8,
        position: "relative",
    },

    deleteIcon: {
        position: "absolute",
        top: 12,
        right: 14,
        backgroundColor: Colors.whiteColor,
        padding: 4,
        borderRadius: 6,
        zIndex: 10,
        elevation: 3,
    },

    image: {
        width: "100%",
        height: 120,
        borderRadius: Sizes.fixPadding,
        resizeMode: "cover",
        marginBottom: Sizes.fixPadding,
    },

    title: {
        ...Fonts.blackBold,
        fontSize: 14,
        marginBottom: 4,
    },

    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Sizes.fixPadding,
    },

    price: {
        ...Fonts.blackBold,
        fontSize: 14,
        marginRight: 6,
    },

    oldPrice: {
        ...Fonts.blackRegular,
        fontSize: 14,
        color: Colors.grayColor,
        textDecorationLine: "line-through",
    },

    btnRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    cartBtn: {
        width: 42,
        height: 42,
        borderRadius: 10,
        backgroundColor: `${Colors.primary}66`,
        justifyContent: "center",
        alignItems: "center",
    },

    orderBtn: {
        flex: 1,
        height: 42,
        marginLeft: 8,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },

    orderText: {
        fontSize: 14,
        fontFamily: Fonts.bold,
        color: Colors.whiteColor,
    },

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyText: {
        marginTop: Sizes.fixPadding * 2.0,
        fontSize: 16,
        color: Colors.grayColor,
    },
});
