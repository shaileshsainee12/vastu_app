import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';
import { Colors, Sizes, Fonts } from '../../constant/styles';
import ReviewsCard from '../../components/common/ReviewsCard';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');

const images = [
    require('../../assets/images/kachhuaa.png'),
    require('../../assets/images/Home/Rudraksh.png'),
    require('../../assets/images/Lari.png'),
];

const benefits = [
    'Attracts Wealth & Prosperity',
    'Removes Negativity & Misfortune',
    'Balances Emotions',
    'Spiritual Growth',
];

const reviews = [
    {
        id: '1',
        name: 'John Doe',
        rating: 4.5,
        image: require('../../assets/images/doctor/doctor-1.png'),
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae amet...',
        date: '13 Sep, 2020',
    },
    {
        id: '2',
        name: 'John Doe',
        rating: 4.5,
        image: require('../../assets/images/doctor/doctor-1.png'),
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae amet...',
        date: '13 Sep, 2020',
    },
    {
        id: '3',
        name: 'John Doe',
        rating: 4.5,
        image: require('../../assets/images/doctor/doctor-1.png'),
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae amet...',
        date: '13 Sep, 2020',
    },
];

const ProductDetails = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);
    const navigation = useNavigation();

    // 🔁 Auto Scroll Effect
    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % images.length;
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            setActiveIndex(nextIndex);
        }, 3000); // change every 3 seconds

        return () => clearInterval(interval);
    }, [activeIndex]);

    const handleScroll = (event) => {
        const slide = Math.round(event.nativeEvent.contentOffset.x / width);
        if (slide !== activeIndex) setActiveIndex(slide);
    };

    const renderItem = ({ item }) => (
        <Image source={item} style={styles.productImage} resizeMode="cover" />
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {header()}

            <ScrollView showsVerticalScrollIndicator={false} >
                {/* Product Image Slider */}
                <View style={styles.sliderContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={images}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        keyExtractor={(_, i) => i.toString()}
                        renderItem={renderItem}
                        getItemLayout={(data, index) => ({
                            length: width,
                            offset: width * index,
                            index,
                        })}
                        snapToInterval={width}
                        decelerationRate="fast"
                        snapToAlignment="center"
                    />
                    <TouchableOpacity style={styles.wishlistIcon}>
                        <Ionicons name="heart-outline" size={22} color={Colors.whiteColor} />
                    </TouchableOpacity>

                    {/* Dots Indicator */}
                    <View style={styles.dotContainer}>
                        {images.map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.dot,
                                    { backgroundColor: i === activeIndex ? Colors.primary : '#ccc' },
                                ]}
                            />
                        ))}
                    </View>
                </View>

                {/*========= Product Details  ===================*/}
                <View style={styles.detailsContainer}>
                    <Text style={styles.productTitle}>7 Mukhi Rudraksha</Text>

                    <View style={styles.priceContainer}>
                        <Text style={styles.discountedPrice}>₹1,199</Text>
                        <Text style={styles.originalPrice}>₹7,996</Text>
                    </View>

                    <Text style={styles.offerText}>64% + Extra 21% OFF</Text>
                    <Text style={styles.benefitTitle}>Pack Of 1 Mall (21 Rudraksha)</Text>

                    <View style={styles.stockBox}>
                        <Text style={styles.stockText}>Last 20 Pieces are left</Text>
                    </View>

                    {/* Benefits */}
                    <Text style={styles.benefitTitle}>Benefits of 7 Mukhi Rudraksha</Text>
                    <View style={styles.benefitsContainer}>
                        {benefits.map((point, index) => (
                            <View key={index} style={styles.benefitItem}>
                                <Octicons name="dot-fill" size={10} color="black" />
                                <Text style={styles.benefitText}>{point}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                {/* =========  Reviews Section ========== */}

                <View style={styles.reviewsContainer}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Sizes.fixPadding + 8.0 }}>

                        <Text style={styles.reviewHeading}>Reviews</Text>
                        <Text style={{ ...Fonts.black18Bold, color: Colors.primary, }} onPress={()=>navigation.navigate("Review/ReviewScreen")}>View All</Text>
                    </View>
                    {reviews.map((item) => (
                        <ReviewsCard key={item.id} item={item} />
                    ))}
                </View>

            </ScrollView>
            <View style={{
                padding: 10,
                backgroundColor: 'white',
                elevation: 10,
                shadowColor: Colors.blackColor,
                shadowOffset: { width: 3, height: -10 },
                shadowOpacity: 0.7,
                shadowRadius: 10,
            }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'space-between',paddingHorizontal:10 }}>
                    <TouchableOpacity style={styles.addIcon}>
                        <Ionicons name="cart-outline" size={24} color={`${Colors.blackColor}`} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bookButton} >
                        <Text style={styles.bookButtonText}>Order Now</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );

    function header() {
        return (
            <View style={styles.headerStyle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Feather name="arrow-left" size={24} color="black" />
                        <Text style={{ ...Fonts.black18Bold, marginLeft: 10.0 }}>Details</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    headerStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Sizes.fixPadding + 6.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 4,
    },
    sliderContainer: {
        height: width * 0.8,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 8.0,

    },
    productImage: {
        width: width,
        height: '100%',
    },
    wishlistIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    dotContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: Sizes.fixPadding,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 5,
        marginHorizontal: 3,
    },
    detailsContainer: {
        paddingHorizontal: Sizes.fixPadding + 5.0,
        marginTop: Sizes.fixPadding * 2.0,
    },
    productTitle: {
        ...Fonts.black18Bold,
        marginBottom: 5,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    discountedPrice: {
        ...Fonts.black18Bold
    },
    originalPrice: {
        fontSize: Sizes.fixPadding + 4.0,
        textDecorationLine: 'line-through',
        color: Colors.grayColor,
        marginLeft: Sizes.fixPadding - 2.0,
    },
    offerText: {
        color: Colors.primary,
        fontWeight: '600',
        marginVertical: Sizes.fixPadding - 2.0,
    },
    stockBox: {
        backgroundColor: `${Colors.primary}33`,
        borderRadius: 4,
        padding: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        marginBottom: Sizes.fixPadding,
    },
    stockText: {
        ...Fonts.black15Bold,
        fontSize: Sizes.fixPadding + 3.0,
    },
    benefitsContainer: {
        backgroundColor: `${Colors.primary}33`,
        borderRadius: 6,
        padding: Sizes.fixPadding,
        marginTop: 5,
    },
    benefitTitle: {
        fontSize: Sizes.fixPadding + 5.0,
        fontWeight: '600',
        marginBottom: Sizes.fixPadding - 4.0,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding - 5.0,
    },
    benefitText: {
        fontSize: Sizes.fixPadding + 3.0,
        marginLeft: Sizes.fixPadding - 4.0,
        color: `${Colors.blackColor}CC`,
    },

    reviewsContainer: {
        backgroundColor: Colors.whiteColor,
        marginTop: Sizes.fixPadding + 5.0,
        padding: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 2.0,
    },
    reviewHeading: {
        ...Fonts.black18Bold,

    },
    addIcon: {
        backgroundColor: `${Colors.primary}33`,
       paddingHorizontal: Sizes.fixPadding + 4.0,
        paddingVertical: Sizes.fixPadding,
        borderRadius: 5
    },
    bookButton: {
        width:"75%",
        backgroundColor: Colors.primary,
        paddingHorizontal: Sizes.fixPadding + 4.0,
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
    },
    bookButtonText: {
        ...Fonts.white18Bold
    },

});

export default ProductDetails;
