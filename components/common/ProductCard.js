import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constant/styles';
export default function ProductCard({ item, index ,onPress }) {
    return (
        <View style={{ ...styles.productCard, }}>
            <Image
                source={item.image}
                style={{
                    width: "100%",
                    height: 134,
                    borderRadius: Sizes.fixPadding,
                    resizeMode: 'cover'
                }}
            />
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 100, padding: Sizes.fixPadding }}>
                <View>
                    <Text style={{ ...Fonts.blackBold, fontSize: Sizes.fixPadding + 2 }}>{item.name}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: Sizes.fixPadding + 4, fontWeight: 'bold', }}>₹{item.discountPrice} </Text>
                        <Text style={{ fontSize: Sizes.fixPadding, color: Colors.grayColor, marginLeft: 5, textDecorationLine: 'line-through' }}>₹{item.price}</Text>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                    <TouchableOpacity style={styles.addIcon}>
                        <Ionicons name="cart-outline" size={20} color={`${Colors.blackColor}`} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bookButton} onPress={onPress}>
                        <Text style={styles.bookButtonText}>Order Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    productCard: {
        width: 180,
        height: 250,
        backgroundColor: `${Colors.primary}33`,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding + 3.0,
        marginTop: Sizes.fixPadding * 2.0,
        overflow: 'hidden',
        marginRight: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding - 5.0
    },
    addIcon: {
        backgroundColor: `${Colors.primary}33`,
        paddingHorizontal: Sizes.fixPadding - 4.0,
        paddingVertical: Sizes.fixPadding - 2.0,
        borderRadius: 5
    },
    bookButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Sizes.fixPadding + 2.0,
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
