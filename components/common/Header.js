import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from 'expo-router';
import { Colors, Fonts, Sizes } from '../../constant/styles';
import { Feather } from '@expo/vector-icons';

const Header = ({ title}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.headerStyle}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="arrow-left" size={24} color="black" />
                    <Text style={{ ...Fonts.black18Bold, marginLeft: 10.0 }}>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 1.5,
        borderBottomWidth: 0.6,
        borderBottomColor: Colors.lightGray,
        backgroundColor: Colors.whiteColor,
    },
})

export default Header