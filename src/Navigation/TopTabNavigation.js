import * as React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { calcHeight, calcWidth } from '../Config/Dimension'
import AppStyles from '../Config/styles'
import All from '../Screens/All'
import Completed from '../Screens/Completed'
import UnCompleted from '../Screens/UnCompleted'





export default function TobTabNavigation({ navigation, route }) {
    const [index, setIndex] = React.useState(0);


    const [routes] = React.useState([
        { key: 'All', title: 'All' },
        { key: 'Completed', title: 'Completed' },
        { key: 'UnCompleted', title: 'UnCompleted' },
    ]);

    const renderScene = SceneMap({
        All: All,
        Completed: Completed,
        UnCompleted: UnCompleted,
    });
    let renderTabBar = (props) => {
        return (
            <View>
                <View style={styles.tabBar}>

                    {props.navigationState.routes.map((route, i) => {
                        return (
                            <TouchableOpacity
                                style={styles.tabItem}
                                onPress={() => setIndex(i)}>
                                <Text
                                    style={[styles.textBar, index == i && { color: AppStyles.Color.TEXT_BLUE }]}>
                                    {route.title}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    };
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            initialLayout={{ width: calcWidth(375) }}
            style={{ width: calcWidth(375), }}

        />
    );
}

const styles = StyleSheet.create({

    tabBar: {
        flexDirection: 'row',
        // marginBottom: calcHeight(16),
        backgroundColor: AppStyles.Color.LIGHT_THEM,
        width: "100%",
        height: calcHeight(48),
        alignSelf: 'center',
        paddingLeft: calcWidth(22)
        // marginTop: calcHeight(20),
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: "center",
        marginRight: calcWidth(48)
    },
    textBar: {
        fontFamily: AppStyles.Fonts.Regular,
        fontSize: calcWidth(18),
        color: AppStyles.Color.TEXT_GRAY,
    },
});