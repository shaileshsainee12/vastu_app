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
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes, CommonStyles } from "../../constant/styles";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("screen");

const EditProfileScreen = () => {

  const navigation = useNavigation();

  const [fullNameDialog, setFullnameDialog] = useState(false);
  const [fullName, setFullName] = useState("Ellison Perry");
  const [changeText, setChangeText] = useState(fullName);

  const [passwordDialog, setPasswordDialog] = useState(false);
  const [password, setPassword] = useState("123456");
  const [changePassword, setChangePassword] = useState(password);

  const [phoneDialog, setPhoneDialog] = useState(false);
  const [phone, setPhone] = useState("123456789");
  const [changePhone, setChangePhone] = useState(phone);

  const [emialDialog, setEmailDialog] = useState(false);
  const [email, setEmail] = useState("test@abc.com");
  const [changeEmail, setChangeEmail] = useState(email);

  const [isBottomSheet, setIsBottomSheet] = useState(false);

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
          {profilePhoto()}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setFullnameDialog(true);
              setChangeText(fullName);
            }}
          >
            {formData({ title: "Full Name", value: fullName })}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setPasswordDialog(true);
              setChangePassword(password);
            }}
          >
            {formData({ title: "Password", value: "******" })}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setChangePhone(phone);
              setPhoneDialog(true);
            }}
          >
            {formData({ title: "Phone", value: phone })}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setChangeEmail(email);
              setEmailDialog(true);
            }}
          >
            {formData({ title: "Email", value: email })}
          </TouchableOpacity>
        </ScrollView>
        {editFullNameDialog()}
        {editPasswordDialog()}
        {editPhoneDialog()}
        {editEmailDialog()}
        {showBottomSheet()}
      </View>
    </View>
  );

  function backArrowAndSave() {
    return (
      <View style={styles.backArrowAndSaveContainerStyle}>
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color="black"
          onPress={() => navigation.pop()}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.pop()}
        >
          <Text style={{ ...Fonts.primaryColor17Bold }}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function profilePhoto() {
    return (
      <View style={styles.photoContainerStyle}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("../../assets/images/user/user_3.jpg")}
            style={{
              height: 115.0,
              width: 115.0,
              borderRadius: Sizes.fixPadding - 5.0,
            }}
            resizeMode="cover"
          />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setIsBottomSheet(true)}
            style={styles.addPhotoContainerStyle}
          >
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function formData({ title, value }) {
    return (
      <View style={styles.formDataContainerStyle}>
        <View style={{ width: width / 3.0 }}>
          <Text style={{ ...Fonts.gray16Regular }}>{title}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: width / 1.85,
          }}
        >
          <Text style={{ ...Fonts.black16Regular }}>{value}</Text>
          <Feather name="chevron-right" size={24} color={Colors.lightGray} />
        </View>
      </View>
    );
  }

  function editFullNameDialog() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={fullNameDialog}
        onRequestClose={() => {
          setFullnameDialog(false)
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setFullnameDialog(false);
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : null}
            style={{ justifyContent: "center", flex: 1 }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
              style={styles.dialogContainerStyle}
            >
              <View
                style={{
                  backgroundColor: "white",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...Fonts.black18Bold,
                    paddingBottom: Sizes.fixPadding * 3.0,
                  }}
                >
                  Change FullName
                </Text>
                <View
                  style={{
                    borderBottomColor: "gray",
                    borderBottomWidth: 1.0,
                    width: "100%",
                  }}
                >
                  <TextInput
                    value={changeText}
                    onChangeText={(value) => setChangeText(value)}
                    style={{
                      ...Fonts.black18Regular,
                      paddingBottom: Sizes.fixPadding,
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: Sizes.fixPadding * 2.0,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setFullnameDialog(false)}
                    style={styles.cancelButtonStyle}
                  >
                    <Text style={{ ...Fonts.black20Regular }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setFullnameDialog(false);
                      setFullName(changeText);
                    }}
                    style={styles.okButtonStyle}
                  >
                    <Text style={{ ...Fonts.white20Regular }}>Okay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
    );
  }

  function editPasswordDialog() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={passwordDialog}
        onRequestClose={() => {
          setPasswordDialog(false)
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setPasswordDialog(false);
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : null}
            style={{ justifyContent: "center", flex: 1 }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
              style={styles.dialogContainerStyle}
            >
              <View
                style={{
                  backgroundColor: "white",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...Fonts.black18Bold,
                    paddingBottom: Sizes.fixPadding * 3.0,
                  }}
                >
                  Change Your Password
                </Text>
                <View
                  style={{
                    borderBottomColor: "gray",
                    borderBottomWidth: 0.5,
                    width: "100%",
                  }}
                >
                  <TextInput
                    style={{
                      ...Fonts.black18Regular,
                      paddingBottom: Sizes.fixPadding,
                    }}
                    placeholder="Old Password"
                    placeholderTextColor={Colors.grayColor}
                    secureTextEntry={true}
                    selectionColor={Colors.primary}
                    cursorColor={Colors.primary}
                  />
                </View>
                <View
                  style={{
                    borderBottomColor: "gray",
                    borderBottomWidth: 0.5,
                    width: "100%",
                    marginTop: Sizes.fixPadding,
                  }}
                >
                  <TextInput
                    onChangeText={(value) => setChangePassword(value)}
                    style={{
                      ...Fonts.black18Regular,
                      paddingBottom: Sizes.fixPadding,
                    }}
                    placeholder="New Password"
                    placeholderTextColor={Colors.grayColor}
                    secureTextEntry={true}
                    selectionColor={Colors.primary}
                    cursorColor={Colors.primary}
                  />
                </View>
                <View
                  style={{
                    borderBottomColor: "gray",
                    borderBottomWidth: 0.5,
                    width: "100%",
                    marginTop: Sizes.fixPadding,
                  }}
                >
                  <TextInput
                    style={{
                      ...Fonts.black18Regular,
                      paddingBottom: Sizes.fixPadding,
                    }}
                    placeholder="Confirm New Password"
                    placeholderTextColor={Colors.grayColor}
                    secureTextEntry={true}
                    selectionColor={Colors.primary}
                    cursorColor={Colors.primary}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: Sizes.fixPadding * 2.0,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setPasswordDialog(false)}
                    style={styles.cancelButtonStyle}
                  >
                    <Text style={{ ...Fonts.black20Regular }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setPasswordDialog(false);
                      setPassword(changePassword);
                    }}
                    style={styles.okButtonStyle}
                  >
                    <Text style={{ ...Fonts.white20Regular }}>Okay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
    );
  }

  function editPhoneDialog() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={phoneDialog}
        onRequestClose={() => {
          setPhoneDialog(false)
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setPhoneDialog(false);
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : null}
            style={{ justifyContent: "center", flex: 1 }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
              style={styles.dialogContainerStyle}
            >
              <View
                style={{
                  backgroundColor: "white",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...Fonts.black18Bold,
                    paddingBottom: Sizes.fixPadding * 3.0,
                  }}
                >
                  Change Phone Number
                </Text>
                <View
                  style={{
                    borderBottomColor: "gray",
                    borderBottomWidth: 1.0,
                    width: "100%",
                  }}
                >
                  <TextInput
                    value={changePhone}
                    onChangeText={(value) => setChangePhone(value)}
                    style={{
                      ...Fonts.black18Regular,
                      paddingBottom: Sizes.fixPadding,
                    }}
                    keyboardType="numeric"
                    selectionColor={Colors.primary}
                    cursorColor={Colors.primary}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20.0,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setPhoneDialog(false)}
                    style={styles.cancelButtonStyle}
                  >
                    <Text style={{ ...Fonts.black20Regular }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setPhoneDialog(false);
                      setPhone(changePhone);
                    }}
                    style={styles.okButtonStyle}
                  >
                    <Text style={{ ...Fonts.white20Regular }}>Okay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>

    );
  }

  function editEmailDialog() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={emialDialog}
        onRequestClose={() => {
          setEmailDialog(false)
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setEmailDialog(false);
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : null}
            style={{ justifyContent: "center", flex: 1 }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
              style={styles.dialogContainerStyle}
            >
              <View
                style={{
                  backgroundColor: "white",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...Fonts.black18Bold,
                    paddingBottom: Sizes.fixPadding * 3.0,
                  }}
                >
                  Change Email
                </Text>
                <View
                  style={{
                    borderBottomColor: "gray",
                    borderBottomWidth: 1.0,
                    width: "100%",
                  }}
                >
                  <TextInput
                    value={changeEmail}
                    onChangeText={(value) => setChangeEmail(value)}
                    style={{
                      ...Fonts.black18Regular,
                      paddingBottom: Sizes.fixPadding,
                    }}
                    keyboardType="email-address"
                    selectionColor={Colors.primary}
                    cursorColor={Colors.primary}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: Sizes.fixPadding * 2.0,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setEmailDialog(false)}
                    style={styles.cancelButtonStyle}
                  >
                    <Text style={{ ...Fonts.black20Regular }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setEmailDialog(false);
                      setEmail(changeEmail);
                    }}
                    style={styles.okButtonStyle}
                  >
                    <Text style={{ ...Fonts.white20Regular }}>Okay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
    );
  }

  function showBottomSheet() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBottomSheet}
        onRequestClose={() => {
          setIsBottomSheet(false)
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setIsBottomSheet(false)
          }}
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

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setIsBottomSheet(false)}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Ionicons name="camera" size={20} color="#4C4C4C" />
                  <Text
                    style={{ ...Fonts.blackRegular, marginLeft: Sizes.fixPadding }}
                  >
                    Camera
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setIsBottomSheet(false)}
                  style={{ flexDirection: "row", marginTop: Sizes.fixPadding * 2.0 }}
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
  backArrowAndSaveContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: Sizes.fixPadding * 2.0,
    marginRight: Sizes.fixPadding,
    marginTop: Sizes.fixPadding + 5.0,
  },
  addPhotoContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 1.0,
    backgroundColor: "#FF9800",
    height: 25.0,
    width: 25.0,
    borderRadius: Sizes.fixPadding + 2.0,
    position: "absolute",
    bottom: 5.0,
    right: 5.0,
  },
  photoContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50.0,
    marginBottom: Sizes.fixPadding * 3.0,
  },
  formDataContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    height: 65.0,
    borderColor: "#F6F6F6",
    elevation: 2,
    marginHorizontal: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding + 5.0,
    borderWidth: 1.0,
    ...CommonStyles.shadow,
  },
  dialogContainerStyle: {
    backgroundColor: Colors.whiteColor,
    width: '85%',
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding * 2.0
  },
  cancelButtonStyle: {
    flex: 0.5,
    backgroundColor: Colors.lightGray,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding,
    marginRight: Sizes.fixPadding + 5.0,
  },
  okButtonStyle: {
    flex: 0.5,
    backgroundColor: Colors.primary,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Sizes.fixPadding + 5.0,
  },
  bottomSheetStyle: {
    backgroundColor: "white",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding * 2.0,
  },
});

export default EditProfileScreen;
