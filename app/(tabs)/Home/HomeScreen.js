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
import { LinearGradient } from "expo-linear-gradient";
import CommonService from "../../../components/common/CommonService";
import AstrologerCard from "../../../components/common/AstrologerCard";
import AstroRemediesBanner from "../../../components/AstroRemediesBanner";
import ProductCard from "../../../components/common/ProductCard";
import ClassesCard from "../../../components/common/ClassesCard";
import ConsultationModal from "../../../components/common/ConsultationModal";
import RequestClassJoin from "../../../components/common/RequestClassJoin";
const { width, height } = Dimensions.get("window");

const astrologersList = [
    {
        id: '1',
        profilePic: require('../../../assets/images/Astrologer1.png'),
        name: 'Dr. John Doe',
        specialization: 'Vastu Expert',
        charges: '₹50/min',
        language: 'English',
        Experience: 10,
    },
    {
        id: '2',
        profilePic: require('../../../assets/images/Astrologer2.png'),
        name: 'Dr. Jane Smith',
        specialization: 'Numerology',
        charges: '₹45/min',
        language: 'Hindi,English',
        Experience: 8,
    },
    {
        id: '3',
        profilePic: require('../../../assets/images/Astrologer1.png'),
        name: 'Dr. Emily White',
        specialization: 'Crystal Healing',
        charges: '₹60/min',
        language: 'English',
        Experience: 12,
    },
];

const products = [
    {
        id: '1',
        image: require('../../../assets/images/kachhuaa.png'),
        name: '7 Mukhi Rudraksha',
        price: 50,
        oldPrice: 25,
    },
    {
        id: '2',
        image: require('../../../assets/images/Home/Rudraksh.png'),
        name: 'Rudraksh',
        price: 75,
        oldPrice: 50,
    },
    {
        id: '3',
        image: require('../../../assets/images/Lari.png'),
        name: 'Locket',
        price: 40,
        oldPrice: 20,
    },
    {
        id: '4',
        image: require('../../../assets/images/lion.png'),
        name: 'Lion',
        price: 60,
        oldPrice: 30,
    },
    {
        id: "5",
        name: "Bracelet",
        price: 8399,
        oldPrice: 12200,
        image: require("../../../assets/images/stone.png"),
    },
];

const classesList = [
    {
        id: '1',
        image: require('../../../assets/images/Astrologer1.png'),
        subject: 'Vastu',
        tutorName: 'Dr. John Doe',
        time: '02 PM to 03 PM',
    },
    {
        id: '2',
        image: require('../../../assets/images/Astrologer2.png'),
        subject: 'Residential Vastu',
        tutorName: 'Dr. Jane Smith',
        time: '03 PM to 04 PM',
    },
    {
        id: '3',
        image: require('../../../assets/images/Astrologer3.png'),
        subject: 'Commercial Vastu',
        tutorName: 'Dr. Emily White',
        time: '04 PM to 05 PM',
    },
];


const HomeScreen = () => {

    const specialistsList = [
        {
            id: '1',
            name: 'Vastu',
            image: require('../../../assets/images/Home/vastu.png'),
        },
        {
            id: '2',
            name: 'Residential Vastu',
            image: require('../../../assets/images/Home/Residential_Vastu.jpg'),
        },
        {
            id: '3',
            name: 'Commercial Vastu',
            image: require('../../../assets/images/Home/Commercial_Vastu.jpg'),
        },
        {
            id: '4',
            name: 'Numerology Vastu',
            image: require('../../../assets/images/Home/Numerology.png'),
        },
        {
            id: '5',
            name: 'Crystal Healing',
            image: require('../../../assets/images/Home/Crystal.png'),
        },
        {
            id: '6',
            name: 'Rudraksh healing',
            image: require('../../../assets/images/Home/Rudraksh.png'),
        },
        {
            id: '7',
            name: 'Astro Vastu/Astrology',
            image: require('../../../assets/images/Home/astro.png'),
        },
    ];
    const navigation = useNavigation();
    const [showAddressSheet, setShowAddressSheet] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [openRequestClass, setOpenRequestClass] = useState(false);
    const handleOpenConsult = () => {
        setShowModal(true)
    }

    const handleOpenRequestClass = () => {
        setOpenRequestClass(true)
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
            {header()}
            <FlatList
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 8.0 }}
                ListHeaderComponent={
                    <>
                        {search()}
                        {newlyLanched()}
                        <CommonService data={specialistsList} title="Specialists" />
                        <CommonService data={specialistsList} title="16 Sanskars service" />
                        {titleWithButton({ title: 'Our Astrologers', btnText: "View All" })}
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={true}
                            data={astrologersList}
                            keyExtractor={(item) => `${item.id}`}
                            renderItem={({ item }) => <AstrologerCard astrologer={item} btnText="Book a Consultation" onPress={handleOpenConsult} />}
                            contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}
                        />
                        {titleWithButton({ title: 'Our Live Astrologers', btnText: "View All" })}
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={true}
                            data={astrologersList}
                            keyExtractor={(item) => `${item.id}`}
                            renderItem={({ item }) => <AstrologerCard astrologer={item} btnText="Connect Now" onPress={handleOpenConsult} />}
                            contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}
                        />
                        <AstroRemediesBanner
                            about={'Shop Authentic Astro \nRemedies-Energised \n& Ready to Use'}
                            para={"Shop Now and Get"}
                            off={"20% Off"}
                            btnText={"Shop Now"}
                            onPress={() => navigation.navigate('Shop/ShopScreen')}
                        />
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={true}
                            data={products}
                            keyExtractor={(item) => `${item.id}`}
                            renderItem={({ item }) => (
                                <ProductCard
                                    item={{ ...item, image: item.image }}
                                    onPress={() => navigation.push('Product/ProductDetails', { name: item.name })}
                                />
                            )}
                            contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}
                        />
                        {titleWithButton({ title: 'Classes', btnText: "View All" })}
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={true}
                            data={classesList}
                            keyExtractor={(item) => `${item.id}`}
                            renderItem={({ item }) => <ClassesCard item={item} onPress={handleOpenRequestClass} />}
                            contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}
                        />
                    </>
                }
                showsVerticalScrollIndicator={false}
            />
            {addressSheet()}
            <ConsultationModal visible={showModal} onClose={() => setShowModal(false)} />
            <RequestClassJoin visible={openRequestClass} onClose={() => setOpenRequestClass(false)} />
        </View>
    );

    {/* ========== Top Header  ===============*/ }
    function header() {
        return (
            <View style={styles.headerStyle}>
                <TouchableOpacity onPress={() => navigation.push('MyProfile/MyProfileScreen')}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: "center" }}>
                        <FontAwesome name="user-circle" size={24} color={Colors.primary} />
                        <Text style={{ ...Fonts.black18Bold, marginLeft: 10.0 }}>Hello, User Name</Text>
                    </View>
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', justifyContent: "center", height: 50, width: 50, backgroundColor: Colors.whiteColor,
                    shadowColor: '#000000',
                    shadowOpacity: 1,
                    shadowRadius: 4,
                    // ✅ Android shadow
                    elevation: 4,
                    borderRadius: "50%"
                }}>
                    <Ionicons name="cart-outline" size={24} color={Colors.primary} onPress={() => navigation.push('cart/CartScreen')} />
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
    {/* ========== Newly Lanched Banner  ===============*/ }
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

            </>
        )
    }
    function titleWithButton({ title, btnText }) {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: Sizes.fixPadding * 2.0,
                marginHorizontal: Sizes.fixPadding * 2.0
            }}>
                <Text style={{
                    ...Fonts.black18Bold,
                }}>
                    {title}
                </Text>
                <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>{btnText}</Text>
                </TouchableOpacity>

            </View>
        )
    }

    function addressSheet() {
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
            // setShowFilter(false);
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
        marginTop: Sizes.fixPadding * 2.0
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
    banner: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: Sizes.fixPadding + 5.0,
        padding: Sizes.fixPadding + 5.0,
        margin: Sizes.fixPadding * 2,
        position: "relative",
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
    modalContainer: {
        backgroundColor: Colors?.whiteColor,
        padding: Sizes.fixPadding * 2.0,
    },
    sectionTitle: {
        fontSize: Sizes.fixPadding + 6.0,
        fontWeight: "bold",
        marginVertical: Sizes.fixPadding,
    },
    optionContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: Sizes.fixPadding - 2.0,
        marginBottom: Sizes.fixPadding,
    },
    optionButton: {
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding - 4.0,
    },
    optionText: {
        color: Colors.blackColor,
    },
    optionSelected: {
        backgroundColor: Colors.primary,
    },
    optionTextSelected: {
        color: Colors.whiteColor,
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
        color: Colors.blackColor,
    },

})

export default HomeScreen;