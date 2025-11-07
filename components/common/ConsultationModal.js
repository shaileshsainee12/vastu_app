import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes } from '../../constant/styles';
import SelectDropdown from './SelectDropdown';

const indianStates = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry',
];
const ConsultationModal = ({ visible, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        language: '',
        state: '',
    });

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        console.log('Form Data:', formData);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide"
            transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Filled This form For Consultations</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={22} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.body}>
                        {/* Name */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Enter Your Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Your Name"
                                value={formData.name}
                                onChangeText={(text) => handleChange('name', text)}
                            />
                        </View>

                        {/* Phone */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Enter Your Phone Number</Text>
                            <View style={styles.phoneContainer}>
                                <View style={styles.countryCodeBox}>
                                    <Text style={{ fontSize: 16 }}>+91</Text>
                                </View>
                                <TextInput
                                    style={styles.phoneInput}
                                    placeholder="Enter Your Phone Number"
                                    keyboardType="phone-pad"
                                    value={formData.phone}
                                    onChangeText={(text) => handleChange('phone', text)}
                                />
                            </View>
                        </View>

                        {/* Email */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Enter Your Email ID</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Your Email Id"
                                keyboardType="email-address"
                                value={formData.email}
                                onChangeText={(text) => handleChange('email', text)}
                            />
                        </View>

                        {/* Language */}
                        <View style={styles.inputContainer}>
                            <SelectDropdown
                                label="Choose Language"
                                options={['English', 'Hindi', 'Marathi', 'Gujarati']}
                                selectedValue={formData.language}
                                onSelect={(text) => handleChange('language', text)}
                            />
                        </View>

                        {/* State */}
                        <View style={styles.inputContainer}>
                           
                            <SelectDropdown
                                label="Choose your State"
                                options={indianStates}
                                selectedValue={formData.state}
                                onSelect={(text) => handleChange('state', text)}
                            />
                        </View>
                    </ScrollView>

                    {/* Submit Button */}
                    <View style={styles.submitBtnContainer}>
                    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Request a call back</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ConsultationModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        maxHeight: '90%',
        overflow: 'hidden',
    },
    header: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 14,
        borderTopLeftRadius: Sizes.fixPadding + 6.0,
        borderTopRightRadius: Sizes.fixPadding + 6.0,
    },
    headerText: {
        color: Colors.whiteColor,
        fontWeight: '600',
        fontFamily: 'Lato_Bold',
        fontSize: Sizes.fixPadding + 6.0,
    },
    body: {
        backgroundColor: Colors.whiteColor,
        padding: Sizes.fixPadding + 5.0,
    },
    inputContainer: {
        marginBottom: Sizes.fixPadding + 4.0,
    },
    label: {
        fontSize: Sizes.fixPadding + 2.0,
        fontWeight: '600',
        fontFamily: 'Lato_Regular',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: Sizes.fixPadding - 4.0,
        padding: Sizes.fixPadding ,
        fontSize: Sizes.fixPadding + 4.0,
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: Sizes.fixPadding - 4.0,
    },
    countryCodeBox: {
        paddingHorizontal:Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
    phoneInput: {
        flex: 1,
        padding: Sizes.fixPadding,
    },
    submitBtnContainer: {
          display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding,
        elevation: 5.0, 
        shadowColor: Colors.blackColor,
    },
    submitBtn: {
        width: "80%",
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.primary,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
    },
    submitText: {
        color: Colors.whiteColor,
        ...Fonts.white16Regular
    },
});
