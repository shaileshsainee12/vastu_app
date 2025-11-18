import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import MyStatusBar from '../../components/myStatusBar';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors, Fonts, Sizes } from '../../constant/styles';
import { FontAwesome } from '@expo/vector-icons';

// --- Dummy Data ---
const ASTROLOGERS_DATA = [
    {
        id: '1',
        name: 'Astrologer Name',
        specialization: 'Vedic Astrologer',
        language: 'Hindi, English',
        experience: '7+ Year Of Experience',
        price: '₹20',
        isOnline: true,
        imageUrl: 'https://picsum.photos/80/80?random=1', // Placeholder Image
    },
    {
        id: '2',
        name: 'Astrologer Name',
        specialization: 'Vedic Astrologer',
        language: 'Hindi, English',
        experience: '7+ Year Of Experience',
        price: '₹20',
        isOnline: false,
        imageUrl: 'https://picsum.photos/80/80?random=2', // Placeholder Image
    },
    {
        id: '3',
        name: 'Astrologer Name',
        specialization: 'Vedic Astrologer',
        language: 'Hindi, English',
        experience: '7+ Year Of Experience',
        price: '₹20',
        isOnline: true,
        imageUrl: 'https://picsum.photos/80/80?random=3', // Placeholder Image
    },
    {
        id: '4',
        name: 'Astrologer Name',
        specialization: 'Vedic Astrologer',
        language: 'Hindi, English',
        experience: '7+ Year Of Experience',
        price: '₹20',
        isOnline: false,
        imageUrl: 'https://picsum.photos/80/80?random=4',
    },
];

const AstrologerCard = ({ astrologer }) => (
    <View style={styles.cardContainer}>
        {/* Left Section: Image and Details */}
        <View style={styles.leftSection}>
            {/* Image with Online Status Dot */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: astrologer.imageUrl }} style={styles.profileImage} />
                {astrologer.isOnline && <View style={styles.onlineDot} />}
            </View>

            {/* Details Text */}
            <View style={styles.detailsContainer}>
                <Text style={styles.nameText}>{astrologer.name}</Text>
                <Text style={styles.detailText}>{astrologer.specialization}</Text>
                <Text style={styles.detailText}>Language: {astrologer.language}</Text>
                <Text style={styles.detailText}>{astrologer.experience}</Text>
            </View>
        </View>

        {/* Right Section: Price and Button */}
        <View style={styles.rightSection}>
            <Text style={styles.priceText}>{astrologer.price}</Text>
            <Text style={styles.perMinText}>Per Min</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Book a Consultation</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const AstrologerListScreen = () => {
    const navigation = useNavigation();
    const { cardTitle } = useLocalSearchParams();
    return (
        <SafeAreaView style={styles.screenContainer}>
            <MyStatusBar />
            {header(cardTitle)}
            <FlatList
                data={ASTROLOGERS_DATA}
                renderItem={({ item }) => <AstrologerCard astrologer={item} />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={styles.flatListContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
    function header(cardTitle) {
        return (
            <View style={styles.headerStyle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <FontAwesome name="long-arrow-left" size={18} color={Colors.blackColor} />
                        <Text style={{ ...Fonts.black18Bold, marginLeft: 5.0 }}>{cardTitle || "Astrologers"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
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
    flatListContent: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: Sizes.fixPadding * 4.0,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.lightGray,
        marginHorizontal: Sizes.fixPadding,
    },
    // --- Left Section Styles ---
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
        marginRight: 10,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: Colors.grayColor,
    },
    onlineDot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: '#4CAF50', // Green dot
        borderWidth: 2,
        borderColor: Colors.whiteColor,
    },
    detailsContainer: {
        // flexShrink: 1,
    },
    nameText: {
        ...Fonts.black16Bold,
    },
    detailText: {
        fontSize: 10,
        color: `${Colors.blackColor}b3`,
        marginTop: 2,
    },
    // --- Right Section Styles ---
    rightSection: {
        alignItems: 'flex-end',
        marginLeft: 10,
    },
    priceText: {
        fontSize: 14,
        ...Fonts.blackBold,
    },
    perMinText: {
        fontSize: Sizes.fixPadding,
        color: Colors.blackColor,
        marginTop: -2,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Sizes.fixPadding - 2.0,
        paddingVertical: 6,
        borderRadius: Sizes.fixPadding - 2.0,
        marginTop: Sizes.fixPadding + 2.0,
    },
    buttonText: {
        color: Colors.blackColor, 
        fontSize: 10,
        fontWeight: '600',
    },
});

export default AstrologerListScreen;