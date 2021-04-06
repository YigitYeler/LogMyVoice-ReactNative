/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome'
import AudioRecorderPlayer, { AVEncoderAudioQualityIOSType, AVEncodingOption, AudioEncoderAndroidType, AudioSet, AudioSourceAndroidType } from "react-native-audio-recorder-player";
const audioRecorderPlayer = new AudioRecorderPlayer();

const App = () => {

  const [time, setTime] = useState("00:00:00");
  const [start, setStart] = useState(false);
  const [url, setUrl] = useState();
  const [playTime, setPlayTime] = useState(0);
  const [playDuration, setPlayDuration] = useState(0);
  const [play, setPlay] = useState(false);



  const onStart = async () => {
    const result = await audioRecorderPlayer.startRecorder().then(function () { }).catch((err) => { console.log(err) });
    audioRecorderPlayer.addRecordBackListener((e) => {
      setStart(true);
      setTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
      return;
    });
  }

  const onStop = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setUrl(result);
  }

  const Play = async () => {
    const result = await audioRecorderPlayer.startPlayer();
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position == e.duration) {
        audioRecorderPlayer.stopPlayer();
      }
      setPlay(true);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)))
      setPlayDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)))
      return;
    })
  }

  const Pause = async () => {
    await audioRecorderPlayer.pausePlayer();
    setPlay(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <TouchableOpacity onPress={!start ? onStart : onStop}>
          <Icon color={!start ? "black" : "red"} name={!start ? "microphone" : "microphone-slash"} size={100} />
        </TouchableOpacity>
        <Text>{time}</Text>

        <View>
          <Text>{playTime} -{playDuration}</Text>
          <TouchableOpacity onPress={Play}>
            <Text> Dinle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Pause}>
            <Text>Durdur</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default App;
