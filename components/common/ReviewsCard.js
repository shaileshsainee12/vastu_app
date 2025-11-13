import { View, Text, StyleSheet,Image } from 'react-native'
import React from 'react'
import StarRating from './StarRating'
import { Colors, Fonts, Sizes } from '../../constant/styles'
import { Ionicons, } from '@expo/vector-icons'

const ReviewsCard = ({ item }) => {
    return (
        <View key={item.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
                <Image source={item.image} style={styles.reviewImage} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.reviewerName}>{item.name}</Text>
                    <View style={styles.reviewDate}><Ionicons name="time-outline"  color="black" /><Text>{item.date}</Text></View>
                </View>
                <View>
                    <Text style={{ ...Fonts.black15Bold }}>{item.rating} <Text style={{ ...Fonts.blackRegular, fontSize: 12 }}>Rating</Text></Text>
                    <StarRating rating={item.rating} size={14} />
                </View>
            </View>
            <Text style={styles.reviewText}>{item.review}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
     reviewCard: {
        paddingBottom: Sizes.fixPadding ,
        marginBottom: Sizes.fixPadding,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding - 2.0,
    },
    reviewImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: Sizes.fixPadding,
    },
    reviewerName: {
        fontSize: Sizes.fixPadding + 4.0,
        fontWeight: '600',
        color: Colors.blackColor,
    },
    reviewDate: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        fontSize: Sizes.fixPadding + 2.0,
        color: Colors.grayColor,
    },
    reviewText: {
        fontSize: Sizes.fixPadding + 3.0,
        color: Colors.blackColor,
        lineHeight: 18,
    },

})

export default ReviewsCard