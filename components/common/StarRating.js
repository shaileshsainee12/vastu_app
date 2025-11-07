import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StarRating = ({ rating, size = 16, color = '#E3A500' }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push('star'); 
    } else if (rating >= i - 0.5) {
      stars.push('star-half'); 
    } else {
      stars.push('star-outline');
    }
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {stars.map((type, index) => (
        <Ionicons key={index} name={type} size={size} color={color} />
      ))}
    </View>
  );
};

export default StarRating;
