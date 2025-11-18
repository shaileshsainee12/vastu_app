import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Fonts, Colors, Sizes } from '../../constant/styles';

const AstrologerCard = ({ astrologer ,btnText, onPress}) => {
    const { profilePic, name, specialization, charges, language,Experience } = astrologer;

    return (
        <View style={styles.cardContainer}>
            <Image source={profilePic} style={styles.profilePic} resizeMode="cover" />
            <View style={styles.detailsContainer}>
                <View style={styles.leftDetails}>
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.specializationText}>{specialization}</Text>

                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>Language : {language}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>{Experience}+ Year Of Experience</Text>
                    </View>
                </View>
                <View style={styles.rightDetails}>
                    <Text style={styles.chargesText}>{charges}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.bookButton} onPress={onPress}>
                <Text style={styles.bookButtonText}>{btnText}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        height: 288,
        width: 206,
        padding: 10,
        backgroundColor: `${Colors.primary}33`,
        borderRadius: Sizes.fixPadding,
        marginRight: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        alignItems: 'center',
    },
    profilePic: {
        width: 185,
        height: 132,
        borderRadius: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: Sizes.fixPadding,
    },
    leftDetails: {
        flex: 1,
        width: '80%'
    },
    nameText: {
        ...Fonts.blackBold,
        fontSize: 16.0,
        fontWeight: 'semibold',
        marginBottom: Sizes.fixPadding - 8.0,
    },
    specializationText: {
        color: `${Colors.blackColor}cc`,
        fontSize: 10.0,
        marginBottom: Sizes.fixPadding - 8.0,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        color: `${Colors.blackColor}cc`,
        fontSize: 10.0,
        fontWeight:'semibold',
        marginBottom: Sizes.fixPadding - 8.0,
    },
    rightDetails: {
        alignItems: 'flex-end',
        width: '20%',
    },
    chargesText: {
        ...Fonts.blackBold,
    },
    bookButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        width: '100%',
        alignItems: 'center',
    },
    bookButtonText: {
        color: Colors.whiteColor,
        fontFamily: "Lora_Bold",
        fontWeight: "600",
    },
});

export default AstrologerCard;
