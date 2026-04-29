import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Наш градієнт
import { COLORS } from '../constants/colors';

const TitleScreen = () => {
  return (
    <LinearGradient 
      colors={['#D8E3D2', '#FDD4D4']} 
      style={styles.container}
    >
      <View style={styles.content}>
       
        <Image 
          source={{ uri: '../assets/homeimg.png' }} 
          style={styles.image} 
        />
        
        <Text style={styles.title}>LifeBalance</Text>
        <Text style={styles.description}>
          This productive tool is designed to help you better manage your task project-wise conveniently.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Let's start</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20 
  },
  image: { width: 300, height: 300, marginBottom: 30 },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: COLORS.textMain, 
    marginBottom: 15 
  },
  description: { 
    textAlign: 'center', 
    color: '#7C7C7C', 
    lineHeight: 22, 
    marginBottom: 40 
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 15,
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
});

export default TitleScreen;