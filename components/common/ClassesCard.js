import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import { Colors, Fonts, Sizes } from '../../constant/styles'
import { Ionicons } from '@expo/vector-icons'

const ClassesCard = ({item,onPress}) => {
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
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between',  paddingVertical: Sizes.fixPadding - 4 }}>
                <View>
                    <Text style={{ fontWeight: '400',color: `${Colors.blackColor}CC` , fontSize: Sizes.fixPadding + 4 }}>{item.subject}</Text>
                        <Text style={{ fontSize: Sizes.fixPadding, fontWeight: 'bold', color: `${Colors.blackColor}CC`,marginBottom: Sizes.fixPadding - 5.0 }}>By {item.tutorName} </Text>
                        <Text style={{ fontSize: Sizes.fixPadding, color:`${Colors.blackColor}CC`, marginBottom: Sizes.fixPadding - 2.0}}>Time :{item.time}</Text>
                </View>
                    
                    <TouchableOpacity style={styles.bookButton} onPress={onPress}>
                        <Text style={styles.bookButtonText}>Enroll Now</Text>
                    </TouchableOpacity>

            </View>
        </View>
  )
}
const styles = StyleSheet.create({
    productCard: {
        width: 210,
        height: 260,
        backgroundColor: `${Colors.primary}33`,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding + 3.0,
        // marginTop: Sizes.fixPadding * 2.0,
        overflow: 'hidden',
        marginRight: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding * 2.0
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
        fontFamily: "Lora_Bold",
        fontWeight: "600",
    },
})
export default ClassesCard