import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { Fonts, Sizes } from '../../constant/styles';

const CommonService = ({ data, title }) => {
    const navigation = useNavigation();

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
                            borderTopLeftRadius: 35.0,
                            borderBottomLeftRadius: 35,
                            borderBottomRightRadius: 35,
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
                // title={title}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
            />
        </>
    );
};

const styles = StyleSheet.create({
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
        fontSize: 10,
        textAlign: 'center',
    },
});

export default CommonService;
