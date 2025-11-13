import React, { useState, useCallback } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Alert,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useCart } from '../context/CartContext';
import { Colors, Fonts, Sizes } from '../../constant/styles';
import Header from '../../components/common/Header';

const ReviewYourOrder = () => {
    const navigation = useNavigation();
    const { items, getTotal } = useCart();
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [discountAmount, setDiscountAmount] = useState(0);

    const subtotal = getTotal();
    const shipping = items.length ? 49 : 0;
    const tax = +(subtotal * 0.05).toFixed(2);
    const total = +(subtotal + shipping + tax - discountAmount).toFixed(2);

    const applyCoupon = () => {
        if (!couponCode.trim()) {
            Alert.alert('Coupon', 'Please enter a coupon code');
            return;
        }
        const validCoupons = {
            'SAVE10': 10,
            'SAVE20': 20,
            'WELCOME': 15,
        };

        if (validCoupons[couponCode.toUpperCase()]) {
            const percentage = validCoupons[couponCode.toUpperCase()];
            const discount = +(subtotal * (percentage / 100)).toFixed(2);
            setAppliedCoupon({ code: couponCode.toUpperCase(), percentage });
            setDiscountAmount(discount);
            Alert.alert('Success', `Coupon applied! ${percentage}% off (₹${discount})`);
        } else {
            Alert.alert('Invalid', 'This coupon code is not valid');
            setAppliedCoupon(null);
            setDiscountAmount(0);
        }
    };

    const removeCoupon = () => {
        setCouponCode('');
        setAppliedCoupon(null);
        setDiscountAmount(0);
    };

    const renderItem = ({ item }) => {
        const price = parseFloat(item.price || item.totalPrice || 0) || 0;
        return (
            <View style={styles.productRow}>
                {item.image ? (
                    <Image source={item.image} style={styles.productImage} />
                ) : (
                    <View style={[styles.productImage, styles.placeholder]} />
                )}
                <View style={styles.productInfo}>
                    <Text style={[Fonts.black16Bold]} numberOfLines={1}>
                        {item.title || item.name}
                    </Text>
                    <Text style={Fonts.gray14Regular}>Qty: {item.quantity || 1}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={Fonts.black16Bold}>
                        ₹ {(price * (item.quantity || 1)).toFixed(2)}
                    </Text>
                </View>
            </View>
        );
    };

    const onProceed = () => {
        if (!items.length) {
            Alert.alert('Cart is empty', 'Add items to cart before proceeding.');
            return;
        }
        try {
            navigation.push('PaymentMethod/PaymentMethodScreen', { total });
        } catch (e) {
            Alert.alert('Proceed', `Proceeding to checkout. Total: ₹ ${total}`);
        }
    };

    const HeaderComponent = useCallback(
        () => (
            <>
                <View style={{ padding: Sizes.fixPadding * 2, }}>

                    <View style={styles.card}>
                        <View style={styles.rowBetween}>
                            <Text style={[Fonts.black16Bold]}>Shipping Address</Text>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.push('EditProfile/EditProfileScreen')
                                }
                            >
                                <Text style={Fonts.primaryColor16Regular}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ marginTop: Sizes.fixPadding }}>
                            John Doe{',\n'}123, Example Street,{'\n'}Mumbai, MH 400001
                        </Text>
                        <Text style={{ marginTop: 6, color: Colors.grayColor }}>
                            Phone: +91 98765 43210
                        </Text>
                    </View>

                    <View style={{ height: Sizes.fixPadding * 1.5 }} />
                    <Text
                        style={[Fonts.black16Bold, { marginBottom: Sizes.fixPadding }]}
                    >
                        Products
                    </Text>
                </View>
            </>
        ),
        [navigation]
    );

    const FooterComponent = useCallback(
        () => (
            <View style={{ padding: Sizes.fixPadding * 2,marginBottom: Sizes.fixPadding * 6 }}>
                {/* Coupon Section */}
                <View style={[styles.card, { marginBottom: Sizes.fixPadding * 1.5 }]}>
                    <Text
                        style={[Fonts.black16Bold, { marginBottom: Sizes.fixPadding }]}
                    >
                        Apply Coupon Code
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 10, marginBottom: Sizes.fixPadding }}>
                        <TextInput
                            style={styles.couponInput}
                            placeholder="Enter coupon code"
                            placeholderTextColor={Colors.grayColor}
                            value={couponCode}
                            onChangeText={(text) => setCouponCode(text)}
                            editable={!appliedCoupon}
                        />
                        <TouchableOpacity
                            style={[
                                styles.couponBtn,
                                appliedCoupon && styles.couponBtnDisabled,
                            ]}
                            onPress={applyCoupon}
                            disabled={appliedCoupon !== null}
                        >
                            <Text
                                style={
                                    appliedCoupon ? Fonts.gray14Regular : Fonts.white16Regular
                                }
                            >
                                {appliedCoupon ? 'Applied' : 'Apply'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {appliedCoupon && (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: `${Colors.primary}20`,
                                padding: 8,
                                borderRadius: 4,
                            }}
                        >
                            <Text style={Fonts.primaryColor16Regular}>
                                {appliedCoupon.code} - {appliedCoupon.percentage}% OFF
                            </Text>
                            <TouchableOpacity onPress={removeCoupon}>
                                <Text style={Fonts.primaryColor16Regular}>✕ Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Billing Details */}
                <View style={[styles.card]}>
                    <Text style={[Fonts.black16Bold, { marginBottom: Sizes.fixPadding }]}>
                        Billing Details
                    </Text>
                    <View style={styles.billRow}>
                        <Text style={Fonts.gray14Regular}>Subtotal</Text>
                        <Text style={Fonts.gray14Regular}>₹ {subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.billRow}>
                        <Text style={Fonts.gray14Regular}>Shipping</Text>
                        <Text style={Fonts.gray14Regular}>₹ {shipping.toFixed(2)}</Text>
                    </View>
                    <View style={styles.billRow}>
                        <Text style={Fonts.gray14Regular}>Tax</Text>
                        <Text style={Fonts.gray14Regular}>₹ {tax.toFixed(2)}</Text>
                    </View>
                    {discountAmount > 0 && (
                        <View style={[styles.billRow, { color: Colors.primary }]}>
                            <Text style={Fonts.primaryColor16Regular}>Discount</Text>
                            <Text style={Fonts.primaryColor16Regular}>
                                - ₹ {discountAmount.toFixed(2)}
                            </Text>
                        </View>
                    )}
                    <View
                        style={[
                            styles.billRow,
                            {
                                marginTop: Sizes.fixPadding,
                                borderTopWidth: 1,
                                borderTopColor: Colors.lightGray,
                                paddingTop: 6,
                            },
                        ]}
                    >
                        <Text style={Fonts.black18Bold}>Total</Text>
                        <Text style={Fonts.black18Bold}>₹ {total.toFixed(2)}</Text>
                    </View>
                </View>

                <View style={{ height: Sizes.fixPadding * 4 }} />
            </View>
        ),
        [couponCode, appliedCoupon, subtotal, shipping, tax, discountAmount, total]
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
            <Header title="Review Your Order" />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={items}
                    keyExtractor={(it) => String(it.id)}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                    ListHeaderComponent={HeaderComponent}
                    ListFooterComponent={
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            nestedScrollEnabled
                            showsVerticalScrollIndicator={false}
                        >
                            {FooterComponent()}
                        </ScrollView>
                    }
                    ListEmptyComponent={() => (
                        <View style={{ padding: Sizes.fixPadding * 2 }}>
                            <Text style={Fonts.gray14Regular}>No items in cart.</Text>
                        </View>
                    )}
                     showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    automaticallyAdjustKeyboardInsets={true}
                />

                <View style={styles.footer}>
                    <View>
                        <Text style={Fonts.gray14Regular}>Total</Text>
                        <Text style={Fonts.black20Bold}>₹ {total.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity style={styles.checkoutBtn} onPress={onProceed}>
                        <Text style={Fonts.white16Regular}>Proceed to Checkout</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.whiteColor },
    card: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 8,
        padding: Sizes.fixPadding,
        elevation: 2,
        shadowColor: Colors.blackColor,
        shadowOpacity: 0.08,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    productImage: {
        width: 70,
        height: 70,
        borderRadius: 6,
        backgroundColor: Colors.lightGray,
    },
    productInfo: { flex: 1, marginLeft: Sizes.fixPadding },
    placeholder: { justifyContent: 'center', alignItems: 'center' },
    billRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 6,
    },
    couponInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.lightGray,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        ...Fonts.gray14Regular,
    },
    couponBtn: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    couponBtnDisabled: { backgroundColor: Colors.lightGray },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        borderTopWidth: 0.5,
        borderColor: Colors.lightGray,
        padding: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    checkoutBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
});

export default ReviewYourOrder;
