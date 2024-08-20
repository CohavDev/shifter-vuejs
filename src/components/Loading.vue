<script setup lang="ts">
import { ref, watch } from "vue";

// Props to control visibility
const props = defineProps<{
  isVisible: boolean;
}>();

// Reactive reference for visibility
const isVisible = ref(props.isVisible);
watch(
  () => props.isVisible,
  () => {
    isVisible.value = props.isVisible;
  }
);
</script>

<template>
  <div class="loading-overlay" v-if="isVisible">
    <div class="spinner"></div>
  </div>
</template>
<style scoped>
/* Overlay to cover the screen */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

/* Spinner styling */
.spinner {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

/* Keyframes for spinner animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
