import React, { useState, } from "react";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    Modal,
    ScrollView,
} from "react-native";
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import { Fonts, Colors, Sizes, } from "../../../constant/styles";
import { useNavigation } from "expo-router";
import AstroRemediesBanner from "../../../components/AstroRemediesBanner";
import { LinearGradient } from "expo-linear-gradient";
import ProductCard from "../../../components/common/ProductCard";
const { width, height } = Dimensions.get("window");
const CARD_WIDTH = (width - 45) / 2;

const categoryListData = [
    {
        id: '1',
        name: 'Gemstones',
        image: require('../../../assets/images/product/Gemstones.png'),
    },
    {
        id: '2',
        name: 'Lockets',
        image: require('../../../assets/images/product/Lockets.png'),
    },
    {
        id: '3',
        name: 'Rudraksha',
        image: require('../../../assets/images/product/Rudraksha.png'),
    },
    {
        id: '4',
        name: 'Lockets',
        image: require('../../../assets/images/product/Lockets.png'),
    },
    {
        id: '5',
        name: 'Gemstones',
        image: require('../../../assets/images/product/Gemstones.png'),
    }
]
const productsList = [
    {
        id: '1',
        image: require('../../../assets/images/kachhuaa.png'),
        name: '7 Mukhi Rudraksha',
        price: 50,
        discountPrice: 25,
    },
    {
        id: '2',
        image: require('../../../assets/images/Home/Rudraksh.png'),
        name: 'Rudraksh',
        price: 75,
        discountPrice: 50,
    },
    {
        id: '3',
        image: require('../../../assets/images/Lari.png'),
        name: 'Locket',
        price: 40,
        discountPrice: 20,
    },
    {
        id: '4',
        image: require('../../../assets/images/lion.png'),
        name: 'Lion',
        price: 60,
        discountPrice: 30,
    },
];
const products = [
    {
        id: "1",
        name: "7 Mukhi Rudraksha",
        price: "₹8,399",
        oldPrice: "₹12,200",
        image: require("../../../assets/images/Home/Rudraksh.png"),
    },
    {
        id: "2",
        name: "Kachhuaa",
        price: "₹8,399",
        oldPrice: "₹12,200",
        image: require("../../../assets/images/kachhuaa.png"),
    },
    {
        id: "3",
        name: "Bracelet",
        price: "₹8,399",
        oldPrice: "₹12,200",
        image: require("../../../assets/images/stone.png"),
    },
    {
        id: "4",
        name: "Lari",
        price: "₹8,399",
        oldPrice: "₹12,200",
        image: require("../../../assets/images/Lari.png"),
    },
];
const ShopScreen = () => {
    const navigation = useNavigation();
    const [showAddressSheet, setShowAddressSheet] = useState(false);
    return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
            {header()}
            <FlatList
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 8.0 }}
                ListHeaderComponent={
                    <View>
                        {search()}
                        <AstroRemediesBanner
                            about={'Shop Authentic Astro \nRemedies'}
                            para={"Shop Now and Get"}
                            off={"20% Off"}
                        />
                        {CategoryList({ title: 'Shop By Category', data: categoryListData })}
                        <View style={{ marginTop: Sizes.fixPadding * 2.0, }} />
                        <Text style={{ ...Fonts.black18Bold, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                            Best Seller
                        </Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={true}
                            data={productsList}
                            keyExtractor={(item) => `${item.id}`}
                            renderItem={({ item }) => <ProductCard item={item} />}
                            contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}
                        />
                        <Text style={{ ...Fonts.black18Bold, margin: Sizes.fixPadding * 2.0, }}>
                            All Product
                        </Text>
                        {ProductListScreen({ products: products })}

                    </View>
                }
                showsVerticalScrollIndicator={false}
            />
            {filterModal()}
        </View>
    )
    {/* ========== Top Header  ===============*/ }
    function header() {
        return (
            <View style={styles.headerStyle}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: "center" }}>
                        <FontAwesome name="long-arrow-left" size={24} color={Colors.primary} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10.0 }}>Product</Text>
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
                    <Ionicons name="cart-outline" size={24} color={Colors.primary} onPress={() => navigation.push('Notifications/NotificationScreen')} />
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
                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexDirection: 'row', borderWidth: 1, borderColor: Colors.grayColor, borderRadius: Sizes.fixPadding - 3.0, paddingHorizontal: Sizes.fixPadding * 2, paddingVertical: Sizes.fixPadding }} onPress={() => setShowAddressSheet(true)}>
                    <Feather name="filter" size={24} color="black" />
                    <Text style={{ ...Fonts.black16Regular, fontSize: 14, marginLeft: Sizes.fixPadding }}>Filter</Text>
                </TouchableOpacity>
            </View>
        )
    }
    ///* ========== Product category  ===============*/
    function CategoryList({ title, data }) {
        const renderItem = ({ item }) => (
            <>
                <TouchableOpacity
                    activeOpacity={0.6}
                // onPress={() => navigation.push('Specialist/SpecialistScreen', { name: item.name })}
                >
                    <View style={styles.specialistInfoContainer}>
                        <Image
                            source={item.image}
                            resizeMode="contain"
                            style={{
                                height: 75.0,
                                width: 75.0,
                            }}
                        />
                        <Text style={styles.specialistTextStyle}>
                            {item.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            </>
        );
        return (
            <>
                <Text style={{ ...Fonts.black18Bold, margin: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding }}>
                    {title}
                </Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}
                />
            </>
        )
    }

    function ProductListScreen({ products }) {
        const renderItem = ({ item }) => (
            <View style={styles.card}>
                <Image source={item.image} style={styles.image} resizeMode="cover" />
                <View style={styles.infoContainer}>
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>{item.price}</Text>
                        <Text style={styles.oldPrice}>{item.oldPrice}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginVertical: Sizes.fixPadding }}>
                        <TouchableOpacity style={styles.addIcon}>
                            <Ionicons name="cart-outline" size={20} color={`${Colors.blackColor}`} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bookButton}>
                            <Text style={styles.bookButtonText}>Order Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );

        return (
            <View style={styles.container}>
                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        );
    };

    function filterModal() {
        const [availability, setAvailability] = useState("");
        const [specializations, setSpecializations] = useState([]);
        const [languages, setLanguages] = useState([]);
        const [experience, setExperience] = useState("");

        const toggleSelection = (value, setState, stateArray) => {
            if (stateArray.includes(value)) {
                setState(stateArray.filter((item) => item !== value));
            } else {
                setState([...stateArray, value]);
            }
        };

        const handleApply = () => {
            console.log({
                availability,
                specializations,
                languages,
                experience,
            });
            setShowAddressSheet(false);
        };
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showAddressSheet}
                onRequestClose={() => { setShowAddressSheet(false) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setShowAddressSheet(false) }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "flex-end", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                        >
                            <View style={{ maxHeight: height / 1.5, paddingHorizontal: Sizes.fixPadding * 2.0, paddingVertical: Sizes.fixPadding, backgroundColor: Colors.primary, borderTopLeftRadius: 16, borderTopRightRadius: 16, overflow: 'hidden' }}>
                                <Text style={{ ...Fonts.black20Bold, alignSelf: 'center' }}>Choose City</Text>
                            </View>
                            <View style={styles.modalContainer}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {/* Availability */}
                                    <Text style={styles.sectionTitle}>Availability</Text>
                                    <View style={styles.optionContainer}>
                                        {["Available Now", "Book for Later"].map((item) => (
                                            <TouchableOpacity
                                                key={item}
                                                style={[
                                                    styles.optionButton,
                                                    availability === item && styles.optionSelected,
                                                ]}
                                                onPress={() => setAvailability(item)}
                                            >
                                                <Text
                                                    style={[
                                                        styles.optionText,
                                                        availability === item && styles.optionTextSelected,
                                                    ]}
                                                >
                                                    {item}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>

                                    {/* Specialization */}
                                    <Text style={styles.sectionTitle}>Specialization</Text>
                                    <View style={styles.optionContainer}>
                                        {[
                                            "Vastu",
                                            "Horoscope / Kundli",
                                            "Tarot",
                                            "Numerology",
                                            "Relationship / Career / Finance",
                                        ].map((item) => (
                                            <TouchableOpacity
                                                key={item}
                                                style={[
                                                    styles.optionButton,
                                                    specializations.includes(item) && styles.optionSelected,
                                                ]}
                                                onPress={() =>
                                                    toggleSelection(item, setSpecializations, specializations)
                                                }
                                            >
                                                <Text
                                                    style={[
                                                        styles.optionText,
                                                        specializations.includes(item) &&
                                                        styles.optionTextSelected,
                                                    ]}
                                                >
                                                    {item}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>

                                    {/* Language */}
                                    <Text style={styles.sectionTitle}>Language</Text>
                                    <View style={styles.optionContainer}>
                                        {["Hindi", "English", "Tamil"].map((item) => (
                                            <TouchableOpacity
                                                key={item}
                                                style={[
                                                    styles.optionButton,
                                                    languages.includes(item) && styles.optionSelected,
                                                ]}
                                                onPress={() => toggleSelection(item, setLanguages, languages)}
                                            >
                                                <Text
                                                    style={[
                                                        styles.optionText,
                                                        languages.includes(item) && styles.optionTextSelected,
                                                    ]}
                                                >
                                                    {item}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>

                                    {/* Experience */}
                                    <Text style={styles.sectionTitle}>Experience</Text>
                                    <View style={styles.optionContainer}>
                                        {["0–5 years", "5–10 years", "10+ years"].map((item) => (
                                            <TouchableOpacity
                                                key={item}
                                                style={[
                                                    styles.optionButton,
                                                    experience === item && styles.optionSelected,
                                                ]}
                                                onPress={() => setExperience(item)}
                                            >
                                                <Text
                                                    style={[
                                                        styles.optionText,
                                                        experience === item && styles.optionTextSelected,
                                                    ]}
                                                >
                                                    {item}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>

                                    {/* Buttons */}
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity
                                            style={styles.applyButton}
                                            onPress={handleApply}
                                        >
                                            <Text style={styles.applyText}>Apply</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.cancelButton}
                                            onPress={() => setShowAddressSheet(false)}
                                        >
                                            <Text style={styles.cancelText}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}
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
        marginHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'space-between',
        marginVertical: Sizes.fixPadding * 2.0
    },
    searchStyle: {
        height: 50.0,
        width: '60%',
        backgroundColor: 'white',
        borderWidth: 1.0,
        borderColor: Colors.grayColor,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 3.0,
        flexDirection: 'row',
        paddingHorizontal: Sizes.fixPadding + 5.0,
    },
    modalContainer: {
        backgroundColor: Colors?.whiteColor,
        padding: 20,
    },
    sectionTitle: {
        fontSize: Sizes.fixPadding + 6.0,
        fontWeight: "bold",
        marginVertical: Sizes.fixPadding,
    },
    optionContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 10,
    },
    optionButton: {
        borderWidth: 1,
        borderColor: "#d4b450",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    optionText: {
        color: "#000",
    },
    optionSelected: {
        backgroundColor: "#d4b450",
    },
    optionTextSelected: {
        color: "white",
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        gap: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.0,
    },
    applyButton: {
        backgroundColor: Colors.primary,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 15,
        borderRadius: Sizes.fixPadding - 2.0,
    },
    cancelButton: {
        backgroundColor: "#f6edd2",
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 15,
        borderRadius: Sizes.fixPadding - 2.0,
    },
    applyText: {
        color: "white",
        fontWeight: "bold",
    },
    cancelText: {
        color: "#000",
    },
    specialistInfoContainer: {
        height: 115.0,
        width: 80.0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10.0,
        marginRight: Sizes.fixPadding + 5.0,
    },
    specialistTextStyle: {
        ...Fonts.black15Bold,
        fontSize: Sizes.fixPadding,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: Sizes.fixPadding * 3.0
    },
    card: {
        backgroundColor: `${Colors.primary}33`,
        borderRadius: Sizes.fixPadding,
        margin: 7,
        padding: Sizes.fixPadding,
        width: CARD_WIDTH,
    },
    image: {
        width: "100%",
        height: 120,
        borderRadius: Sizes.fixPadding,
    },
    infoContainer: {
        padding: 8,
    },
    name: {
        fontSize: Sizes.fixPadding + 3.0,
        fontWeight: "500",
        color: Colors.blackColor,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    price: {
        fontSize: Sizes.fixPadding + 3.0,
        fontWeight: "bold",
        color: Colors.blackColor,
        marginRight: 4,
    },
    oldPrice: {
        fontSize: Sizes.fixPadding + 2.0,
        color: "#888",
        textDecorationLine: "line-through",
    },
    orderBtn: {
        backgroundColor: Colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 6,
        borderRadius: 6,
        marginTop: 8,
    },
    orderText: {
        color: Colors.whiteColor,
        fontWeight: "600",
        fontSize: 13,
    },

    addIcon: {
        backgroundColor: `${Colors.primary}33`,
        paddingHorizontal: Sizes.fixPadding - 4.0,
        paddingVertical: Sizes.fixPadding - 2.0,
        borderRadius: 5
    },
    bookButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding - 2.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
    },
    bookButtonText: {
        color: Colors.whiteColor,
        fontFamily: "Lato_Bold",
        fontWeight: "600",
    },

})

export default ShopScreen