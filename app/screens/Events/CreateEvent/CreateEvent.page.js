import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { eventsSelector } from "../../../redux/events/events.slice";
import { userSelecter } from "../../../redux/users/users.slice";

const CreateEvent = () => {
  // const { routeName } = useSelector(eventsSelector);
  // console.log("routeName: ", routeName);

  const { eventManagers } = useSelector(userSelecter);
  console.log("EMs: ", eventManagers);

  return (
    <>
      <View style={styles.container}>
        <Text>Create Events Page.</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
});

export default CreateEvent;
