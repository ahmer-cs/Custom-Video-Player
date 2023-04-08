import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, TouchableWithoutFeedback } from 'react-native';
import { Video } from 'expo-av';
import React, { useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {
  const [isPortrait, setIsPortrait] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const video = React.useRef(null);

  const toggleOrientation = async () => {
    if (isPortrait) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
    setIsPortrait(!isPortrait);
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleControls}>
        <Video
          ref={video}
          style={isPortrait ? styles.videoPortrait : styles.videoLandscape}
          source={{uri: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"}}
          useNativeControls
          resizeMode="contain"
        />
      </TouchableWithoutFeedback>
      {showControls && (
        <View style={styles.buttonContainer}>
          <Button title={isPortrait ? "Landscape" : "Portrait"} onPress={toggleOrientation} />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoPortrait: {
    width: '100%',
    aspectRatio: 16/9,
  },
  videoLandscape: {
    height: '100%',
    aspectRatio: 16/9,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    margin: 16,
  },
});
