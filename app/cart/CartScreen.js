import React from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Image, Alert, StyleSheet, Platform } from 'react-native';
import { useCart } from '../context/CartContext';
import { Colors, Fonts, Sizes } from '../../constant/styles';
import { router } from "expo-router"; 
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/common/Header';

const CartScreen = () => {
    const { items, updateQuantity, removeItem, clearCart, getTotal } = useCart();
    const renderItem = ({ item, index }) => {
        const price = parseFloat(item.price || item.totalPrice || 0) || 0;
        const total = price * (item.quantity || 1);

        return (
            <View style={styles.cardContainer}>
                <View style={{ flexDirection: 'row' }}>
                    {item.image ? (
                        <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
                    ) : (
                        <View style={[styles.itemImage, { backgroundColor: Colors.lightGray }]} />
                    )}
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={[Fonts.black16Bold, { flex: 1 }]} numberOfLines={2}>
                                {item.title || item.name || 'Product'}
                            </Text>
                            <TouchableOpacity onPress={() => removeItem(item.id)}>
                                <Ionicons name="trash-outline" size={22} color={"red"} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[Fonts.gray14Regular, { marginTop: 3 }]}>Pack Of 1 Mall (21 Rudraksha)</Text>

                        <View
                            style={{
                                marginVertical: 8,
                                borderRadius: 8,
                                borderColor: Colors.lightGray,
                                borderWidth: 1,
                                paddingHorizontal: 18,
                                paddingVertical: 4,
                                alignSelf: 'flex-start',
                            }}
                        >
                            <Text style={[Fonts.black18Bold]}>₹{price.toFixed(0)}</Text>
                        </View>


                        <View style={styles.qtyContainer}>
                            <Text style={[Fonts.gray15Regular, { marginRight: 10 }]}>Quantity :</Text>
                            <TouchableOpacity
                                onPress={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                                style={styles.qtyButton}
                            >
                                <Text style={Fonts.black16Regular}>-</Text>
                            </TouchableOpacity>
                            <Text style={[Fonts.black16Bold, { marginHorizontal: 10 }]}>{item.quantity || 1}</Text>
                            <TouchableOpacity
                                onPress={() => updateQuantity(item.id, (item.quantity || 0) + 1)}
                                style={styles.qtyButton}
                            >
                                <Text style={Fonts.black16Regular}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.orderTotalRow}>
                    <Text style={Fonts.black15Bold}>Total Order({index + 1})</Text>
                    <Text style={Fonts.black16Bold}>₹{total.toFixed(0)}</Text>
                </View>
            </View>
        );
    };


    const onCheckout = () => {
        const total = getTotal();
        if (!items.length) {
            Alert.alert('Cart', 'Your cart is empty');
            return;
        }
        // Placeholder: integrate with payment/checkout flow
        Alert.alert('Checkout', `Total payable: ₹ ${total.toFixed(2)}`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Confirm', onPress: () => { clearCart(); Alert.alert('Success', 'Order placed (placeholder)'); } },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Cart" />
            <View style={styles.headerRow}>
                <Text style={[Fonts.black20Bold]}>My Cart</Text>
            </View>

            <FlatList
                data={items}
                keyExtractor={(it) => String(it.id)}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 140, paddingHorizontal: Sizes.fixPadding }}
                ListEmptyComponent={() => (
                    <View style={styles.emptyBox}>
                        <Text style={Fonts.gray16Regular}>Your cart is empty.</Text>
                        <TouchableOpacity style={styles.continueBtn}
                            onPress={() => router.push('/Shop/ShopScreen')}

                        >
                            <Text style={Fonts.white16Regular}>Continue Shopping</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <View style={styles.footer}>
                <View>
                    <Text style={Fonts.gray14Regular}>Total</Text>
                    <Text style={Fonts.black20Bold}>₹ {getTotal().toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutBtn} onPress={onCheckout}>
                    <Text style={Fonts.white16Regular}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.whiteColor },
    headerRow: { padding: Sizes.fixPadding, },
    cardContainer: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.lightGray,
        padding: 10,
        marginVertical: 8,
        ...Platform.select({
            ios: { shadowColor: Colors.blackColor, shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
            android: { elevation: 2 },
        }),
    },
    itemImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
    },
    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyButton: {
        width: 26,
        height: 26,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.grayColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderTotalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        borderTopWidth: 1,
        borderColor: Colors.blackColor,
        paddingTop: 6,
    },
    itemRow: { flexDirection: 'row', padding: Sizes.fixPadding, alignItems: 'center', borderWidth: 0.5, borderColor: Colors.lightGray, borderRadius: 8 },
    image: { width: 70, height: 70, borderRadius: 8, backgroundColor: Colors.lightGray },
    placeholder: { justifyContent: 'center', alignItems: 'center' },
    itemBody: { flex: 1, marginLeft: 12 },
    qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    qtyBtn: { width: 32, height: 32, borderRadius: 4, backgroundColor: Colors.cardColor, justifyContent: 'center', alignItems: 'center' },
    removeBtn: { marginLeft: 16 },
    itemRight: { width: 90, alignItems: 'flex-end' },
    footer: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 100, backgroundColor: Colors.whiteColor, borderTopWidth: 0.5, borderColor: Colors.lightGray, padding: Sizes.fixPadding, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    checkoutBtn: { backgroundColor: Colors.primary, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
    emptyBox: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 60 },
    continueBtn: { marginTop: 12, backgroundColor: Colors.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 6 },
});

export default CartScreen;
