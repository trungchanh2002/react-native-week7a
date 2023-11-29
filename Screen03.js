// NewScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";

export default function Screen03({ navigation }) {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");
  const tasks = useSelector((state) => state.tasks);

  const handleAddTask = () => {
    const task = { id: tasks.length + 1, text: newTask };
    dispatch({ type: "ADD_TASK", payload: task });
    setNewTask("");
    navigation.navigate("Screen02");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 5 }}>
      <TextInput
        style={{ height: 40, width: 200, borderWidth: 1 }}
        placeholder="New task"
        value={newTask}
        onChangeText={setNewTask}
      />
      <TouchableOpacity onPress={handleAddTask}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Add Task</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    borderRadius: 1,
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});