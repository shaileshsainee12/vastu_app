
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Sizes } from "../constant/styles";

const { width } = Dimensions.get("screen");

const AstroRemediesBanner = () => {
    return (
        <LinearGradient
            colors={['#FFE689', '#CCA104']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            <View style={styles.textContainer}>
                <Text style={styles.title}>Shop Authentic Astro{"\n"}Remedies-Energised{"\n"}& Ready to Use</Text>

                <View style={styles.offerRow}>
                    <Text style={styles.subtitle}>Shop Now and Get</Text>
                    <View style={styles.offerBox}>
                        <Text style={styles.offerText}>20% Off</Text>
                    </View>
                </View>

                <TouchableOpacity activeOpacity={0.8} style={styles.shopButton}>
                    <Text style={styles.shopButtonText}>Shop Now</Text>
                </TouchableOpacity>
            </View>


            <Image
                source={require("../assets/images/tasbih.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <Image
                source={require("../assets/images/stone.png")}
                resizeMode="contain"
                style={styles.image2}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderRadius: Sizes.fixPadding + 2.0,
        height: 163,
        padding: Sizes.fixPadding + 2.0,
        alignItems: "center",
        justifyContent: "space-between",
        width: width - 40,
        alignSelf: "center",
        marginVertical: Sizes.fixPadding,
        position: "relative",
    },
    textContainer: {
        width: "60%"
    },
    title: {
        fontSize: Sizes.fixPadding + 8.0,
        color: Colors.blackColor,
        fontWeight: "600",
        marginBottom: Sizes.fixPadding,

    },
    subtitle: {
        fontSize: Sizes.fixPadding + 2.0,
        color: Colors.blackColor,
        marginRight: Sizes.fixPadding - 2.0,
    },
    offerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Sizes.fixPadding,
    },
    offerBox: {
        backgroundColor: "#3C2E00",
        borderRadius: Sizes.fixPadding - 6,
        paddingVertical: Sizes.fixPadding - 6,
        paddingHorizontal: Sizes.fixPadding - 2,
        marginLeft: Sizes.fixPadding - 2,
    },
    offerText: {
        color: Colors.whiteColor,
        fontWeight: "600",
        fontSize: Sizes.fixPadding + 2.0,
    },
    shopButton: {
        backgroundColor: Colors.primary,
        borderRadius: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding - 2.0,
        paddingHorizontal: Sizes.fixPadding + 14.0,
        alignSelf: "flex-start",
    },
    shopButtonText: {
        color: Colors.whiteColor,
        fontWeight: "700",
        fontSize: Sizes.fixPadding + 4.0,
    },
    image: {
        position: "absolute",
        right: 0,
        bottom: 10,
        zIndex: 10
    },
    image2: {
        position: "absolute",
        right: 35,
        bottom: 0,
        zIndex: 8
    }
});

export default AstroRemediesBanner;
