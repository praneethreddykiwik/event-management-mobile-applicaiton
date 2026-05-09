import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { logEvents } from "../../redux/events/events.slice";

const CustomTabBar = ({ state }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((currentRoute, index) => {
          const isFocused = state.index === index;

          const route = currentRoute.name;

          const handlePress = () => {
            // dispatch(logEvents(route));
            navigation.navigate(route);
          };

          return (
            <TouchableOpacity key={currentRoute.key} onPress={handlePress}>
              <Text style={{ color: isFocused ? "#000" : "#999" }}>
                {route}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    backgroundColor: "#fff",
    paddingVertical: 14,

    borderRadius: 50,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },

    elevation: 8,
  },
});

export default CustomTabBar;
