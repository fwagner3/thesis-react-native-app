import { View, Text, Button, Image, Dimensions, Animated, Easing, ImageBackground } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useEffect } from "react";

const Performance = () => {
    const frameCounter: FramerateMeasure = new FramerateMeasure();

    const [framerate, setFramerate] = useState<number[]>([]);

    useEffect(() => {
        const startFPSMeasure = async () => {
            const resultSet = [];

            for (let i = 0; i < 5; i++) {
                let result = await frameCounter.start();
                resultSet.push(result);
            }

            setFramerate(resultSet);
        }
        startFPSMeasure();
    }, [])

    const insets = useSafeAreaInsets();

    const imgs = Array.from(Array(30).keys());

    let rotation = new Animated.Value(0);
    let opacity = new Animated.Value(0);

    // Start the animation of the rotation
    Animated.loop(
        Animated.timing(
            rotation,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        )
    ).start();

    // Set 360 deg rotation
    const rotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    // Start the animation of the opacity
    Animated.loop(
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        )
    ).start();

    // Opacity change from 0 to 1
    const opacityChange = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });

    return (
        <View style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right
        }}>
            <Text style={{
                padding: 16,
            }}>Framerate: {framerate.join()}</Text>
            <ImageBackground source={require('../assets/test.jpeg')}>
                <View style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row'
                }}>
                    {imgs.map((img, index) => 
                        <Animated.Image 
                            source={require('../assets/test.jpeg')}
                            style={{
                                width: Dimensions.get('window').width / 5,
                                height: Dimensions.get('window').width / 5,
                                transform: [
                                    {rotateX: rotate},
                                    {rotateY: rotate},
                                    {rotate: rotate}
                                ],
                                opacity: opacityChange
                            }}
                            key={index}
                        />
                    )}
                </View>
            </ImageBackground>
        </View>
    )
}

class FramerateMeasure {
    _isRunning = false;
    _frameCounter: number = 0;
    _animationFrameId: number = 0;

    _loop = () => {
        this._frameCounter += 1;
        this._animationFrameId = requestAnimationFrame(this._loop);
    }

    start = async () => {
        this._isRunning = true;
        this._frameCounter = 0;
        this._animationFrameId = requestAnimationFrame(this._loop);
        
        await new Promise(resolve => setTimeout(resolve as () => void, 10000))
        
        if (this._animationFrameId) {
            cancelAnimationFrame(this._animationFrameId);
        }

        this._isRunning = false;

        return (this._frameCounter / 10);
    }
}

export default Performance;