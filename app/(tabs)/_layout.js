import { MaterialIcons, Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, BackHandler, Text, Pressable } from "react-native";
import { Colors, Fonts, Sizes } from '../../constant/styles';
import MyStatusBar from '../../components/myStatusBar';
import { Tabs } from 'expo-router';

export default function TabLayout() {

  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    }, [backAction])
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0)
    }, 1000)
  }

  const [backClickCount, setBackClickCount] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: '#8F8E93',
          tabBarLabelStyle: { fontSize: 14.0, fontFamily: 'Montserrat_SemiBold', },
          tabBarStyle: { ...styles.tabBarStyle },
          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{
                color: Colors.whiteColor,
              }}
            />
          )
        }}
      >
        <Tabs.Screen
          name='Home/HomeScreen'
          options={{
            tabBarIcon: ({ focused, color }) => focused ?
              <View style={styles.circleStyle}>
                <Entypo name="home" size={24} color={color} />
              </View>
              : <Entypo name="home" size={24} color={color} />
          }}
        />
        <Tabs.Screen
          name='Schedule/ScheduleScreen'
          options={{
            tabBarIcon: ({ focused, color }) => focused ?
              <View style={styles.circleStyle}>
                <FontAwesome5 name="calendar-alt" size={24} color={color} />
              </View>
              : <FontAwesome5 name="calendar-alt" size={24} color={color} />
          }}
        />
        <Tabs.Screen
          name='Chat/ChatScreen'
          options={{
            tabBarIcon: ({ focused, color }) => focused ?
              <TouchableOpacity style={styles.circleStyle}>
                <MaterialIcons name="chat" size={24} color={color} />
              </TouchableOpacity>
              : <MaterialIcons name="chat" size={24} color={color} />
          }}
        />
        <Tabs.Screen
          name='Profile/ProfileScreen'
          options={{
            tabBarIcon: ({ focused, color }) => focused ?
              <TouchableOpacity style={styles.circleStyle}>
                <Ionicons name="person" size={24} color={color} />
              </TouchableOpacity>
              : <Ionicons name="person" size={24} color={color} />
          }}
        />
      </Tabs>
      {exitInfo()}
    </View>
  )

  function exitInfo() {
    return (
      backClickCount == 1
        ?
        <View style={[styles.animatedView]}>
          <Text style={{ ...Fonts.white13Regular }}>
            Press back once again to exit
          </Text>
        </View>
        :
        null
    )
  }
}

const styles = StyleSheet.create({
  circleStyle: {
    height: 50.0,
    width: 50.0,
    backgroundColor: '#F5F5F5',
    borderRadius: 25.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedView: {
    backgroundColor: '#333333',
    position: "absolute",
    bottom: 40,
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarStyle: {
    height: 65.0,
    shadowColor: Colors.blackColor,
    shadowOpacity: 0.15,
    shadowOffset: { x: 1, y: 1 },
    elevation: 3.0,
    backgroundColor: Colors.whiteColor,
    paddingTop: Sizes.fixPadding + 2.0
  }
});