import { Button, Text, TextInput, View, Alert, Switch } from "react-native";
import { useSafeAreaInsets} from "react-native-safe-area-context";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";

const Stack = createNativeStackNavigator<RootStackParamList>();

type RootStackParamList = {
    UserInterface: undefined,
    UserInterfaceSecondary: undefined
}
type PageProps = NativeStackScreenProps<RootStackParamList, 'UserInterface'>;

const UserInterface = () => {

    const insets = useSafeAreaInsets();

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="UserInterface" 
                component={UserInterfacePrimary} 
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="UserInterfaceSecondary">
                {props => 
                    <View {...props} style={{
                        paddingTop: insets.top,
                        paddingBottom: insets.bottom,
                        paddingLeft: insets.left,
                        paddingRight: insets.right
                    }}>
                    </View>}
            </Stack.Screen> 
        </Stack.Navigator>
    )
}

const UserInterfacePrimary: React.FC<PageProps> = (props) => {
    const insets = useSafeAreaInsets();

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const [toggle, setToggle] = useState(false);
    
    return (
        <View style={{
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 16,
            paddingLeft: insets.left+ 16,
            paddingRight: insets.right + 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
        }}>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20
            }}>Button</Text>
            <View style={{height: 8}}/>
            <Button title="Button"/>
            <View style={{height: 24}}/>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20
            }}>
                Text Input
            </Text>
            <View style={{height: 8}}/>
            <TextInput placeholder="Placeholder"/>
            <View style={{height: 24}}/>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20
            }}>Mobile Push- / Pop-Navigation</Text>
            <View style={{height: 8}}/>
            <Button
                title="Navigate"
                onPress={() => props.navigation.push('UserInterfaceSecondary')}
            />
            <View style={{height: 24}}/>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20
            }}>Date- / Time-Picker</Text>
            <View style={{height: 8}}/>
            <Button 
                title={date.toLocaleString()}
                onPress={() => setShowPicker(true)}
            />
            <DateTimePicker
                date={date}
                isVisible={showPicker}
                mode="datetime"
                onConfirm={(date) => {
                    setDate(date);
                    setShowPicker(false)
                }}
                onCancel={() => setShowPicker(false)}
            />
            <View style={{height: 24}}/>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20
            }}>Alert</Text>
            <View style={{height: 8}}/>
            <Button
                title="Trigger Alert"
                onPress={() => {
                    Alert.alert(
                        'Alert',
                        'This is an alert',
                        [
                            {
                                text: 'OK'
                            }
                        ]
                    )
                }}
            />
            <View style={{height: 24}}/>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20
            }}>Toggle</Text>
            <View style={{height: 8}}/>
            <Switch
                value={toggle}
                onValueChange={() => {setToggle(!toggle)}}
            />
        </View>
    )
}

export default UserInterface;