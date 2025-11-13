
import { Text, View, FlatList, StyleSheet } from "react-native";
import { Fonts, Colors, Sizes, CommonStyles } from "../../constant/styles";
import {MaterialIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";
import ReviewsCard from "../../components/common/ReviewsCard";
import Header from "../../components/common/Header";

const userList = [
    {
        id: '1',
        image: require('../../assets/images/user/user_1.jpg'),
        name: 'Ersel',
        rating: 4.5,
        date: '13 Sep, 2020',
        review: 'Really good doctor.',
    },
    {
        id: '2',
        image: require('../../assets/images/user/user_2.jpg'),
        name: 'Jane',
        rating: 3.4,
        date: '18 Aug 2020',
        review: 'Great doctor i have ever seen.',
    },
    {
        id: '3',
        image: require('../../assets/images/user/user_3.jpg'),
        name: 'Apollonia',
        rating: 3.7,
        date: '21 Jul 2020',
        review: 'Excellent',
    },
    {
        id: '4',
        image: require('../../assets/images/user/user_4.jpg'),
        name: 'Beatriz',
        rating: 4.2,
        date: '11 Jun 2020',
        review: 'Really nice!',
    },
    {
        id: '5',
        image: require('../../assets/images/user/user_5.jpg'),
        name: 'Linnea',
        rating: 4.0,
        date: '20May 2020',
        review: 'Nice experience.',
    },
    {
        id: '6',
        image: require('../../assets/images/user/user_6.jpg'),
        name: 'Linnea',
        rating: 4.0,
        date: '25 Apr 2020',
        review: 'Fantastic.',
    },
    {
        id: '7',
        image: require('../../assets/images/user/user_7.jpg'),
        name: 'Brayden',
        rating: 4.3,
        date: '17 Feb 2020',
        review: 'Very experienced doctor.',
    },
    {
        id: '8',
        image: require('../../assets/images/user/user_8.jpg'),
        name: 'Hugo',
        rating: 4.5,
        date: '12 Jan 2020',
        review: 'Good.',
    }
];

const ReviewScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <MyStatusBar />
            <Header title="Reviews" />
            <FlatList
                data={userList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => <ReviewsCard item={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0, paddingVertical: Sizes.fixPadding * 1.5 }}
            />
        </View>
    )

    function header() {
        return (
            <View>
                <MaterialIcons
                    name="arrow-back"
                    color={'black'}
                    size={22}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ ...Fonts.black20Bold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    {userList.length} Review Found
                </Text>
            </View>
        )
    }
}

export default ReviewScreen;