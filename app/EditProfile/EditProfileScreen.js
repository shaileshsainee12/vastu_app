import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
  Platform
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import MyStatusBar from "../../components/myStatusBar";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from "@react-native-community/datetimepicker";
const { width } = Dimensions.get("screen");

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [isBottomSheet, setIsBottomSheet] = useState(false);
  const [profileImage, setProfileImage] = useState(require("../../assets/images/user/user_2.jpg"));
  const [fullName, setFullName] = useState("John Doe");
  const [mobileNumber, setMobileNumber] = useState("9876543210");
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState("Male");
  const [placeOfBirth, setPlaceOfBirth] = useState("Uttar Pradesh");
  const [showDatePicker, setShowDatePicker] = useState(false);

  // ✅ Open Camera
  const openCamera = async () => {
    setIsBottomSheet(false);
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Camera permission is required to take a photo");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  // ✅ Open Gallery
  const openGallery = async () => {
    setIsBottomSheet(false);
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDob(selectedDate);
  };
  const handleUpdate = () => {
    console.log({
      fullName,
      mobileNumber,
      dob,
      gender,
      placeOfBirth,
    });
    // here call your API for update
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF9F7" }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {backArrowAndSave()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* Profile Image Section */}
          <View style={styles.imageContainer}>
            <Image
              source={profileImage}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsBottomSheet(true)}
              style={styles.editIconContainer}
            >
              <MaterialIcons name="edit" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Form Inputs */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter full name"
              style={styles.input}
              placeholderTextColor={Colors.grayColor}
            />

            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              style={styles.input}
              placeholder="Enter mobile number"
            />

            {/* <Text style={styles.label}>Date Of Birth</Text> */}

            {/* <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowDatePicker(true)}
            style={styles.dateRow}
          >
            <Text style={styles.dateText}>
              {dob.toLocaleDateString("en-GB")}
            </Text>
            <MaterialIcons
              name="calendar-today"
              size={22}
              color={Colors.grayColor}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              // display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeDate}
              maximumDate={new Date()}
            />
          )} */}


            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                style={styles.picker}
                dropdownIconColor={Colors.grayColor}
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>

            <Text style={styles.label}>Place Of Birth</Text>
            <TextInput
              value={placeOfBirth}
              onChangeText={setPlaceOfBirth}
              style={styles.input}
            />
          </View>

          {/* Update Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleUpdate}
            style={styles.updateButton}
          >
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {showBottomSheet()}
    </View>
  );

  // Header with Back and Save
  function backArrowAndSave() {
    return (
      <View style={styles.headerStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color="black"
            onPress={() => navigation.pop()}
          />
          <Text style={{ ...Fonts.black18Bold, marginLeft: 10.0 }}>Details</Text>
        </View>
      </View>
    );
  }

  // ✅ Bottom Sheet
  function showBottomSheet() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBottomSheet}
        onRequestClose={() => setIsBottomSheet(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsBottomSheet(false)}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
              style={{ backgroundColor: Colors.whiteColor }}
            >
              <View style={styles.bottomSheetStyle}>
                <Text
                  style={{
                    ...Fonts.black20Bold,
                    textAlign: "center",
                    marginBottom: Sizes.fixPadding * 2.0,
                  }}
                >
                  Choose Option
                </Text>

                {/* ✅ Camera Option */}
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={openCamera}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Ionicons name="camera" size={20} color="#4C4C4C" />
                  <Text
                    style={{ ...Fonts.blackRegular, marginLeft: Sizes.fixPadding }}
                  >
                    Camera
                  </Text>
                </TouchableOpacity>

                {/* ✅ Gallery Option */}
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={openGallery}
                  style={{
                    flexDirection: "row",
                    marginTop: Sizes.fixPadding * 2.0,
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons name="photo-album" size={20} color="#4C4C4C" />
                  <Text
                    style={{ ...Fonts.blackRegular, marginLeft: Sizes.fixPadding }}
                  >
                    Upload from Gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding * 1.2,
    borderBottomWidth: 0.6,
    borderBottomColor: Colors.lightGray,
    backgroundColor: Colors.whiteColor,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: Sizes.fixPadding * 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 5,
    right: 120,
    backgroundColor: Colors.whiteColor,
    borderRadius: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: Colors.whiteColor,
  },
  formContainer: {
    paddingHorizontal: Sizes.fixPadding * 2,
  },
  label: {
    ...Fonts.black15Bold,
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.lightGrayColor,
    borderRadius: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding * 1.5,
  },
  picker: {
    height: 50,
    paddingVertical: 0,
    width: "100%",
    ...Fonts.black16Regular,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.lightGrayColor,
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding + 5,
    ...Fonts.blackRegular,
    marginBottom: Sizes.fixPadding * 1.5,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.lightGrayColor,
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding + 5,
    marginBottom: Sizes.fixPadding * 1.5,
  },
  updateButton: {
    backgroundColor: Colors.primaryColor,
    marginHorizontal: Sizes.fixPadding * 2,
    borderRadius: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 2,
    alignItems: "center",
    paddingVertical: Sizes.fixPadding + 4,
  },
  updateButtonText: {
    color: Colors.whiteColor,
    fontWeight: "600",
  },
  bottomSheetStyle: {
    backgroundColor: "white",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding * 2.0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  updateButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: Sizes.fixPadding * 2,
    borderRadius: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 2,
    alignItems: "center",
    paddingVertical: Sizes.fixPadding + 4,
  },
  updateButtonText: { color: Colors.whiteColor, fontWeight: "600", fontFamily: 'Lato_Bold' },
});

export default EditProfileScreen;
