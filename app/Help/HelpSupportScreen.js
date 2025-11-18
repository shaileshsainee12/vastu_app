import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Linking,
    LayoutAnimation,
    Platform,
    UIManager,
    ScrollView,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import MyStatusBar from "../../components/myStatusBar";
import Header from "../../components/common/Header";
import { Ionicons, Feather } from "@expo/vector-icons";

// Enable Android Layout Animation
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const faqs = [
    {
        question: "How do I register as a doctor on the portal?",
        answer: "You can register by submitting your personal details, medical license, and clinic details. Once verified, you will receive login credentials.",
    },
    {
        question: "Is my data and patient information secure?",
        answer: "Yes, we use encrypted data transfer and secure storage to ensure your information stays confidential.",
    },
    {
        question: "Can I manage my appointments through the portal?",
        answer: "Absolutely! You can create, reschedule, and track all your appointments.",
    },
    {
        question: "Can I access the portal on my mobile phone?",
        answer: "Yes, the portal is mobile-friendly and accessible anytime.",
    },
    {
        question: "How can I collaborate with other doctors or specialists?",
        answer: "You can use the internal chat and referral system built into the portal.",
    },
];

const HelpSupportScreen = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        LayoutAnimation.easeInEaseOut();
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <MyStatusBar />
            <Header title="Help & Support" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: Sizes.fixPadding * 2 }}
            >

                {/* Let's Talk */}
                <Text style={styles.sectionTitle}>Let’s Talk</Text>

                <View style={styles.contactRow}>
                    {/* Phone Card */}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => Linking.openURL("tel:+915252525252")}
                        style={styles.contactCard}
                    >
                       <Feather name="phone-call" size={20} color="black" />
                        <Text style={styles.contactText}>+91 5252525252</Text>
                    </TouchableOpacity>

                    {/* Email Card */}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => Linking.openURL("mailto:rjvijs42@gmail.com")}
                        style={styles.contactCard}
                    >
                        <Feather name="mail" size={20} color={Colors.blackColor} />
                        <Text style={styles.contactText}>rjvijs42@gmail.com</Text>
                    </TouchableOpacity>
                </View>

                {/* FAQ Section */}
                <Text style={[styles.sectionTitle, { marginTop: Sizes.fixPadding * 3 }]}>
                    FAQ (Frequently Asked Questions)
                </Text>

                {faqs.map((item, index) => (
                    <View key={index} style={styles.faqCard}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => toggleFAQ(index)}
                            style={styles.questionRow}
                        >
                            <Text style={styles.questionText}>{item.question}</Text>

                            {activeIndex === index ? (
                                <Ionicons name="remove" size={24} color="black" />
                            ) : (
                                <Ionicons name="add" size={24} color="black" />
                            )}
                        </TouchableOpacity>

                        {activeIndex === index && (
                            <Text style={styles.answerText}>{item.answer}</Text>
                        )}
                    </View>
                ))}

            </ScrollView>
        </View>
    );
};

export default HelpSupportScreen;

const styles = StyleSheet.create({
    sectionTitle: {
        ...Fonts.black18Bold,
        marginBottom: Sizes.fixPadding,
    },
    contactRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    contactCard: {
        width: "48%",
        backgroundColor: "white",
        borderRadius: Sizes.fixPadding,
        elevation: 2,
        flexDirection:"column",
        shadowColor: Colors.blackColor,
        shadowOffset: { width: 0, height: 2 }, // A common offset is 0, 2
        shadowOpacity: 0.25, // Lower opacity looks better for standard shadows
        shadowRadius: 3.84,
        paddingVertical: Sizes.fixPadding * 1.5,
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },
    contactText: {
        marginLeft: 8,
        ...Fonts.black14Regular,
    },
    faqCard: {
        backgroundColor: "white",
        padding: Sizes.fixPadding * 1.2,
        borderRadius: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        elevation: 2,
    },
    questionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    questionText: {
        ...Fonts.blackBold,
        fontSize:14,
        flex: 1,
        paddingRight: 10,
    },
    answerText: {
        marginTop: 8,
        ...Fonts.black14Regular,
        color: `${Colors.blackColor}cc`,
        lineHeight: 20,
    },
});
