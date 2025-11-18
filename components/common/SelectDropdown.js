import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Sizes } from '../../constant/styles';

const SelectDropdown = ({ label, options = [], selectedValue, onSelect }) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (item) => {
    onSelect(item);
    setVisible(false);
  };

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Selected Field */}
      <TouchableOpacity
        style={styles.inputBox}
        activeOpacity={0.8}
        onPress={() => setVisible(true)}
      >
        <Text style={{ color: selectedValue ? '#000' : '#888' }}>
          {selectedValue || 'Select an option'}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#555" />
      </TouchableOpacity>

      {/* Modal Dropdown */}
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setVisible(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.dropdownContainer}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default SelectDropdown;

const styles = StyleSheet.create({

  label: {
    fontSize: Sizes.fixPadding + 2,
    fontWeight: '600',
    fontFamily: 'Lora_Regular',
    marginBottom: Sizes.fixPadding -5.0,
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding + 2.0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    width: '80%',
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 2.0,
    paddingVertical: Sizes.fixPadding,
    maxHeight: '50%',
    elevation: 5,
  },
  optionItem: {
    paddingVertical: Sizes.fixPadding + 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
  },
  optionText: {
    fontSize: Sizes.fixPadding + 5.0,
    color: Colors.blackColor,
  },
});
