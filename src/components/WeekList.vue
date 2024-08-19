<script setup lang="ts">
import { ref, onMounted } from "vue";
import DayItem from "./DayItem.vue";
import getDates from "@/utilities/dateTool";
import sendData from "@/utilities/dataSubmitter";
import getData from "@/utilities/dataRetriever";
const USER_NAME = "Odeliya";
const fetchedDates = getDates();
const sundayDateFormatted = fetchedDates.sundayDateFormatted;
const saturadayFormatted = fetchedDates.saturadayFormatted;
const selection = ref([0, 0, 0, 0, 0, 0, 0]);
const dbMessage = ref("");
function selectByDay(day: number, sel: number) {
  selection.value[day - 1] = sel;
}
function sendSelection() {
  sendData(sundayDateFormatted, selection.value, USER_NAME)
    .then(() => {
      //success
      console.log("success sending data to server");
      dbMessage.value = "נשלחה בהצלחה";
    })
    .catch(() => {
      console.log("failed sending data to server");
      dbMessage.value = "שגיאה בשליחת הנתונים";
    });
}
onMounted(() => {
  console.log("mounted");
  getData(sundayDateFormatted, USER_NAME)
    .then((data) => {
      console.log("selection", data);
      selection.value = data;
    })
    .catch(() => {
      console.log("failed reading data from server");
    });
});
</script>
<template>
  <div class="header">
    <h1>{{ sundayDateFormatted }} - {{ saturadayFormatted }}</h1>
  </div>
  <div class="container">
    <DayItem day="1" @select="(sel) => selectByDay(1, sel)" />
    <DayItem day="2" @select="(sel) => selectByDay(2, sel)" />
    <DayItem day="3" @select="(sel) => selectByDay(3, sel)" />
    <DayItem day="4" @select="(sel) => selectByDay(4, sel)" />
    <DayItem day="5" @select="(sel) => selectByDay(5, sel)" />
    <DayItem day="6" @select="(sel) => selectByDay(6, sel)" />
    <DayItem day="7" @select="(sel) => selectByDay(7, sel)" />
    <button @click="sendSelection">שלח נתונים</button>
    <p>{{ dbMessage }}</p>
  </div>
</template>
<style scoped>
.container {
  gap: 5px;
}
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
