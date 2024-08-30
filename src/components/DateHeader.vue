<script setup lang="ts">
import { ref, watch } from "vue";
const props = defineProps(["firstDay", "lastDay"]);
const emit = defineEmits(["prevWeek", "nextWeek"]);
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
    <v-btn variant="outlined" class="btn" @click="emit('prevWeek')"
      >הקודם</v-btn
    >
    <h1>{{ firstDay }} - {{ lastDay }}</h1>
    <v-btn variant="outlined" class="btn" @click="emit('nextWeek')">הבא</v-btn>
  </div>
</template>
<style scoped>
.header {
  display: flex;
  justify-content: center;
  direction: rtl;
  align-items: center;
  gap: 5px;
}
h1 {
  color: #dde5d9;
  font-size: 2rem;
  text-align: center;
}
@media (max-width: 450px) {
  h1 {
    font-size: 1.5rem;
  }
}
.btn {
  color: rgb(219, 83, 244);
  font-size: 1rem;
  font-weight: bold;
}
</style>
