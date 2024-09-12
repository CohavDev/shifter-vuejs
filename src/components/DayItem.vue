<script setup lang="ts">
import { ref, watch, computed } from "vue";

const emit = defineEmits(["select"]);
const props = defineProps(["day", "value", "otherSelection"]);
const getDayName = (id: number) => {
  const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  return days[id - 1];
};
const selection = ref(props.value); // [X,X,X]
const otherSelection = ref(props.otherSelection);
function changeSelection(index: number) {
  if (selection.value[index] == 1) {
    selection.value[index] = 0;
  } else {
    selection.value[index] = 1;
  }
}
watch(selection, () => {
  emit("select", selection.value);
});
watch(
  () => props.value,
  () => {
    console.log("props value changed");
    selection.value = props.value;
  }
);
watch(
  () => props.otherSelection,
  () => {
    console.log("props otherSelection changed");
    otherSelection.value = props.otherSelection;
  }
);
const getButtonColor = (buttonId: number) => {
  var className = "timeButton ";
  //check current user selection
  if (selection.value[buttonId] == 1) {
    className = "timeButton_pressed ";
  }
  //check other user selection
  if (otherSelection.value[buttonId] == 1) {
    className += "timeButton_other_selected ";
  }
  return className;
};
</script>
<template>
  <div class="containerItem">
    <h2>{{ getDayName(props.day) }}</h2>
    <div class="containerButtons">
      <button :class="getButtonColor(0)" @click="changeSelection(0)">
        בוקר
      </button>
      <button :class="getButtonColor(1)" @click="changeSelection(1)">
        ערב
      </button>
      <button :class="getButtonColor(2)" @click="changeSelection(2)">
        לילה
      </button>
    </div>
  </div>
</template>
<style scoped>
@media (max-width: 450px) {
  h2 {
    font-size: 1.2rem;
  }
}
.containerItem,
.containerButtons {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
.containerButtons {
  justify-content: space-evenly;
  width: 70%;
  padding-left: 5px;
}
.containerItem {
  justify-content: space-between;
  background-color: white;
  margin: 5px;
  border-radius: 7px;
  padding-right: 10px;
}
.timeButton,
.timeButton_pressed {
  width: 100%;
  height: 48px;
  margin: 5px;
  border-radius: 10px;
  border: none;
  background-color: #b0b2b3;
}
.timeButton:hover {
  background-color: #979797;
}
.timeButton_pressed {
  background-color: #6629f6;
  color: white;
  font-weight: bold;
}
.timeButton_other_selected {
  border: 4px solid var(--user_color);
}
.timeButton_pressed:hover {
  background-color: #531cd4;
}

h2 {
  color: black;
}
</style>
