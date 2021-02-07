import React, {useRef, useState, useEffect} from 'react';
import { Alert, LogBox, Animated, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Entities from './Entities';
import Systems from './Systems';
import { GameEngine } from 'react-native-game-engine';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';

LogBox.ignoreAllLogs();

export default () => {
  const gameEngine = useRef(null);
  const lottieView = useRef(null);
  const gameOverLottie = useRef(null);
  const [running, setRun] = useState(false)
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(false)
  const [gameOver, setGameOver] = useState('')
  const animate = new Animated.Value(0);

  useEffect(() => {
    if (!running) {
      setTimer(true)
    }
  }, []);

  useEffect(() => {
    if (!!gameOver) {
      Animated.timing(animate, {
        toValue: 1,
        duration: 1000,
      }).start();
      gameOverLottie?.current?.play();
    }
  }, [gameOver]);

  useEffect(() => {
    if (timer) {
      lottieView?.current?.play();
    }
  }, [timer]);

  const onEvent = e => {
    if (e.type === 'score') {
      setScore(score + 1);
    }
    if (e.type === 'gameOver' && running) {
      setRun(false);
      setGameOver('Game Over');
    }
  };

  const restart = () => {
    gameEngine?.current?.swap(Entities());
    if (!timer) {
      setTimer(true);
      setGameOver('');
      setScore(0);
    }
  };

  const start = () => {
    if (!running) {
      setTimer(false)
      setRun(true)
    }
  }

  const transformY = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0]
  })
  const scaleText = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2]
  })
  return (
    <View style={styles.container}>
      <Text style={{
        position: 'absolute',
        top: 40,
        right: 20,
        fontSize: 30,
        zIndex: 2000,
        fontWeight: 'bold',
        color: '#ffffff',
      }}>
        {score}
      </Text>
      {timer
        ? (
          <View style={styles.lottieContainer}>
            <LottieView
              onAnimationFinish={start}
              ref={lottieView}
              style={styles.lottie}
              loop={false}
              source={require('./Assets/timer.json')}
            />
          </View>
        )
        : null
      }
      <FastImage
        style={styles.background}
        resizeMode={FastImage.resizeMode.cover}
        source={require('./Assets/space-background.jpg')}
      />
      <GameEngine
        ref={gameEngine}
        onEvent={onEvent}
        style={styles.gameContainer}
        running={running}
        systems={Systems}
        entities={Entities()}>
      </GameEngine>
      {gameOver ? (
          <View style={styles.gameOverContainer}>
            <Animated.View style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              transform: [{ translateY: transformY }]
            }}>
              <LottieView
                ref={gameOverLottie}
                loop={true}
                source={require('./Assets/34115-rocket-lunch.json')}
              />
            </Animated.View>
            <Animated.Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                transform: [{
                  scale: scaleText,
                }]
              }}
            >
              {gameOver}
            </Animated.Text>
            <Animated.View
              style={{
                marginTop: 50,
                transform: [{
                  scale: scaleText,
                }]
              }}
            >
              <TouchableOpacity
                onPress={restart}
                style={{
                  backgroundColor: '#efb609',
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRadius: 10,
                }}
              >
                <Text>
                  restart
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        ) : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  lottie: { width: 300, height: 200 },
  lottieContainer: { position: 'absolute', top: 350, left: 35, zIndex: 1000 },
  background: {flex:1, transform: [{ rotate: '180deg' }]},
  gameOverContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    zIndex: 2000,
    position: 'absolute',
    top: 200,
    left: 20,
    right: 20,
    bottom: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  }
});
