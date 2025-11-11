import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "expo-router";
import { useCart } from "../context/CartContext";
import { Colors, Fonts, Sizes } from "../../constant/styles";

const AddNewAddressScreen = () => {
    const { addresses, setAddresses } = useCart()
    const navigation = useNavigation();
    const [addressDetails, setAddressDetails] = useState({
        locationType: "Home",
        name: "",
        phone: "",
        email: "",
        state: "",
        pinCode: "",
        city: "",
        street: "",
        isPrimary: false,
    });


    const handleInputChange = (key, value) => {
        setAddressDetails({ ...addressDetails, [key]: value });
    };

    const handleAddAddress = () => {
        if (!addressDetails.name || !addressDetails.phone || !addressDetails.state) {
            alert("Please fill in all required fields");
            return;
        }

        const newAddress = {
            id: Date.now(),
            ...addressDetails,
        };

        setAddresses([...addresses, newAddress]);
        console.log("All Addresses:", [...addresses, newAddress]);

        navigation?.goBack();

        // Reset form
        setAddressDetails({
            locationType: "Home",
            name: "",
            phone: "",
            email: "",
            state: "",
            pinCode: "",
            city: "",
            street: "",
            isPrimary: false,
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            {/* Header */}
            {header()}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
            >

                {/* Location Type */}
                <Text style={styles.label}>Choose Location Type</Text>
                <View style={styles.radioContainer}>
                    {["Home", "Office", "Other"].map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={styles.radioButton}
                            onPress={() => handleInputChange("locationType", type)}
                        >
                            <View
                                style={[
                                    styles.outerCircle,
                                    addressDetails.locationType === type && {
                                        borderColor: "#D4A017",
                                    },
                                ]}
                            >
                                {addressDetails.locationType === type && (
                                    <View style={styles.innerCircle} />
                                )}
                            </View>
                            <Text style={styles.radioText}>{type}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Form Inputs */}
                <Text style={styles.label}>Enter Your Name</Text>
                <TextInput
                    placeholder="Enter Your Full Name"
                    style={styles.input}
                    value={addressDetails.name}
                    onChangeText={(val) => handleInputChange("name", val)}
                />

                <Text style={styles.label}>Enter Your Phone Number</Text>
                <TextInput
                    placeholder="Enter Your Phone Number"
                    keyboardType="phone-pad"
                    style={styles.input}
                    value={addressDetails.phone}
                    onChangeText={(val) => handleInputChange("phone", val)}
                />

                <Text style={styles.label}>Enter Your Email ID</Text>
                <TextInput
                    placeholder="Enter Your Email Id"
                    keyboardType="email-address"
                    style={styles.input}
                    value={addressDetails.email}
                    onChangeText={(val) => handleInputChange("email", val)}
                />

                <Text style={styles.label}>Choose Your State</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={addressDetails.state}
                        onValueChange={(val) => handleInputChange("state", val)}
                        style={{  width: '100%',paddingTop:0 ,position:'absolute',top:-7,}}
                    >
                        <Picker.Item label="Select State" value="" />
                        <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
                        <Picker.Item label="Delhi" value="Delhi" />
                        <Picker.Item label="Maharashtra" value="Maharashtra" />
                    </Picker>
                </View>

                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <Text style={styles.label}>Enter Your Pin Code</Text>
                        <TextInput
                            placeholder="Pin code"
                            keyboardType="numeric"
                            style={styles.input}
                            value={addressDetails.pinCode}
                            onChangeText={(val) => handleInputChange("pinCode", val)}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Enter Your City</Text>
                        <TextInput
                            placeholder="City"
                            style={styles.input}
                            value={addressDetails.city}
                            onChangeText={(val) => handleInputChange("city", val)}
                        />
                    </View>
                </View>

                <Text style={styles.label}>Enter Your Street Address</Text>
                <TextInput
                    placeholder="Street"
                    style={styles.input}
                    value={addressDetails.street}
                    onChangeText={(val) => handleInputChange("street", val)}
                />

                {/* Switch */}
                <View style={styles.switchContainer}>
                    <Text style={styles.label}>Saved As A Primary Address</Text>
                    <Switch
                        value={addressDetails.isPrimary}
                        onValueChange={(val) => handleInputChange("isPrimary", val)}
                        thumbColor={addressDetails.isPrimary ? Colors.primary : Colors.grayColor}
                        trackColor={{ false: "#ccc", true: "#e6c767" }}
                    />
                </View>

            </ScrollView>
            {/* Submit Button */}
            <View style={{
                padding: 10,
                backgroundColor: 'white',
                elevation: 10,
                shadowColor: Colors.blackColor,
                shadowOffset: { width: 3, height: -10 },
                shadowOpacity: 0.7,
                shadowRadius: 10,
            }}>
                <TouchableOpacity style={styles.button} onPress={handleAddAddress} >
                    <Text style={styles.buttonText}>Add New Address</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    function header() {
        return (
            <View style={styles.headerStyle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: "center" }}>
                        <Ionicons name="arrow-back" size={22} color={Colors.blackColor} />
                        <Text style={{ ...Fonts.black18Bold, marginLeft: 10.0 }}>Add New Address</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
};

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
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    title: {
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 15,
    },
    label: {
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        backgroundColor: `${Colors.lightGray}AA`,
        borderColor: Colors.grayColor,
        borderRadius: 8,
        padding: 10,
        height: 40,
    },
    radioContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: Sizes.fixPadding * 2,
        marginTop: 6,
    },
    outerCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.grayColor,
        alignItems: "center",
        justifyContent: "center",
    },
    innerCircle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: Colors.primary,
    },
    radioText: {
        marginLeft: 6,
        ...Fonts.black16Regular,
    },
    pickerContainer: {
        height: 40,
        borderWidth: 1,
        backgroundColor: `${Colors.lightGray}AA`,
        borderColor: Colors.grayColor,
        borderRadius: 8,
        // marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        ...Fonts.white16Regular,
        color: Colors.whiteColor,
        fontWeight: "600",
    },
});

export default AddNewAddressScreen;
