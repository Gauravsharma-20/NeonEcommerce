import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/slices/cartSlices'; 
import { colors, commonStyles } from '../utils/styleUtils';

const deliveryAnimationPath = '../mock/deliveryAnimation.mp4';

const ConfirmationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      <Text style={styles.message}>
        Your order has been placed successfully!
      </Text>
      <Video
        source={require(deliveryAnimationPath)}
        style={styles.video}
        resizeMode="contain"
        repeat
        muted
        onLoadStart={() => setLoading(true)}  
        onLoad={() => setLoading(false)}     
      />
      <TouchableOpacity 
        style={commonStyles.secondaryButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={commonStyles.secondaryButtonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.confirmationScreenBackground,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.loaderColor,
    zIndex: 1,
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  video: {
    width: '100%',
    height: '60%',
  }
});

export default ConfirmationScreen;
