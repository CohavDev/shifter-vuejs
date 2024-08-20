<script setup lang="ts">
import { ref, watch, computed } from "vue";

const emit = defineEmits(["select"]);
const props = defineProps(["day", "value"]);
const getDayName = (id: number) => {
  const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  return days[id - 1];
};
const selection = ref(props.value);
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
const getButtonColor = (buttonId: number) => {
  if (buttonId == selection.value) {
    return "timeButton_pressed";
  }
  return "timeButton";
};
</script>
<template>
  <div class="container">
    <h2>{{ getDayName(props.day) }}</h2>
    <div class="containerButtons">
      <p>value = {{ props.value }}, {{ selection }}</p>
      <button :class="getButtonColor(0)" @click="selection = 0">בוקר</button>
      <button :class="getButtonColor(1)" @click="selection = 1">צהריים</button>
      <button :class="getButtonColor(2)" @click="selection = 2">ערב</button>
    </div>
  </div>
</template>
<style scoped>
.container,
.containerButtons {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
.container {
  justify-content: space-between;
  background-color: white;
  margin: 5px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 4px;
  padding: 10px;
}
.timeButton,
.timeButton_pressed {
  width: 96px;
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
  background-color: #6c88e2;
}
.timeButton_pressed:hover {
  background-color: #526ecc;
}

h2 {
  color: black;
}
</style>
