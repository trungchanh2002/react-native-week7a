import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Screen02() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [newTask, setNewTask] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleAddTask = () => {
    const task = { id: tasks.length + 1, text: newTask };
    dispatch({ type: "ADD_TASK", payload: task });
    setNewTask("");
  };

  const handleRemoveTask = (id) => {
    dispatch({ type: "REMOVE_TASK", payload: id });
  };

  const handleUpdateTask = () => {
    if (selectedTaskId) {
      const updatedTask = { id: selectedTaskId, text: newTask };
      dispatch({ type: "UPDATE_TASK", payload: updatedTask });
      setNewTask("");
      setSelectedTaskId(null);
    }
  };

  const handleSelectTask = (id) => {
    setSelectedTaskId(id);

    const selectedTask = tasks.find((task) => task.id === id);
    if (selectedTask) {
      setNewTask(selectedTask.text);
    }
  };

  return (
    <View>
      {tasks.map((task) => (
        <View
          key={task.id}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text>{task.text}</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ backgroundColor: "#808080" }}
              onPress={() => handleSelectTask(task.id)}
            >
              <Text>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "#00FF00" }}
              onPress={() => handleRemoveTask(task.id)}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={{ alignItems: "center" }}>
        <TextInput
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          placeholder="Enter task"
          style={{
            width: 300,
            height: 40,
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 10,
          }}
        />
        <TouchableOpacity
          onPress={handleAddTask}
          style={{
            backgroundColor: "green",
            borderWidth: 1,
            borderRadius: 5,
            width: 200,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
          }}
        >
          <Text>Add Task</Text>
        </TouchableOpacity>
        {selectedTaskId && (
          <TouchableOpacity
            onPress={handleUpdateTask}
            style={{
              backgroundColor: "orange",
              borderWidth: 1,
              borderRadius: 5,
              width: 200,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              margin: 10,
            }}
          >
            <Text>Update Task</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
