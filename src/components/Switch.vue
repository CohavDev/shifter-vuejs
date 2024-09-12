<script setup lang="ts">
import { ref, watch } from "vue";

const isChecked = ref(false);
const emit = defineEmits(["change"]);

const shaul_color = getComputedStyle(document.documentElement)
  .getPropertyValue("--shaul_color")
  .trim();
const odeliya_color = getComputedStyle(document.documentElement)
  .getPropertyValue("--odeliya_color")
  .trim();
function getUserName() {
  return isChecked.value ? "Shaul" : "Odeliya";
}
watch(isChecked, () => {
  console.log("switch clicked");
  const userColor = isChecked.value ? odeliya_color : shaul_color;
  document.documentElement.style.setProperty("--user_color", userColor);
  emit("change", Number(isChecked.value));
});
</script>
<template>
  <div>
    <label class="switch">
      <input type="checkbox" v-model="isChecked" />
      <span class="slider"></span>
    </label>
    <p>Logged in as {{ getUserName() }}</p>
  </div>
</template>
<style scoped>
p {
  color: white;
}
/* The switch - the container */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* Slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e965d3;
  transition: 0.4s;
  border-radius: 34px;
}

/* Slider before */
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  border-radius: 50%;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

/* Checked slider */
input:checked + .slider {
  background-color: #2196f3;
}

/* Checked slider before */
input:checked + .slider:before {
  transform: translateX(26px);
}
</style>
