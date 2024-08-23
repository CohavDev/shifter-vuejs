<script setup lang="ts">
import { ref, watch } from "vue";
const props = defineProps(["firstDay", "lastDay"]);
const emit = defineEmits(["changeWeek"]);
const firstDay = ref(props.firstDay);
const lastDay = ref(props.lastDay);
console.log("first day = ", firstDay.value);
watch(
  () => props.firstDay,
  () => {
    firstDay.value = props.firstDay;
    lastDay.value = props.lastDay;
  }
);
</script>
<template>
  <div class="header">
    <h1>{{ firstDay }} - {{ lastDay }}</h1>
    <button @click="emit('changeWeek')">הבא</button>
  </div>
</template>
<style scoped>
.header {
  display: flex;
  justify-content: center;
  direction: rtl;
  align-items: center;
}
h1 {
  color: #dde5d9;
}
</style>
