<script setup lang="ts">
import { ref, watch, computed } from "vue";
import DayItem from "./DayItem.vue";
import Switch from "./Switch.vue";
import getDates from "@/utilities/dateTool";
import sendData from "@/utilities/dataSubmitter";
import getData from "@/utilities/dataRetriever";
import Loading from "./Loading.vue";
import DateHeader from "./DateHeader.vue";

const userName = ref("Odeliya");
const weeksOffset = ref(0);
const fetchedDates = ref(getDates(weeksOffset.value));
const sundayDateFormatted = computed(
  () => fetchedDates.value.sundayDateFormatted
);
const saturadayFormatted = computed(
  () => fetchedDates.value.saturadayFormatted
);
const selection = ref([0, 0, 0, 0, 0, 0, 0]);
const dbMessage = ref("");
const loading = ref(true);
// watch(userName, () => {
//   //TODO: use computed
// });
watch(weeksOffset, () => {
  fetchedDates.value = getDates(weeksOffset.value);
});
watch(sundayDateFormatted, () => {
  fetchData();
});
function selectByDay(day: number, sel: number) {
  selection.value[day - 1] = sel;
}
function sendSelection() {
  loading.value = true;
  sendData(sundayDateFormatted.value, selection.value, userName.value)
    .then(() => {
      //success
      console.log("success sending data to server");
      dbMessage.value = "נשלחה בהצלחה";
    })
    .catch(() => {
      console.log("failed sending data to server");
      dbMessage.value = "שגיאה בשליחת הנתונים";
    })
    .finally(() => {
      loading.value = false;
    });
}
async function fetchData() {
  loading.value = true;
  await getData(sundayDateFormatted.value, userName.value)
    .then((data) => {
      console.log("selection", data);
      selection.value = data;
      loading.value = false;
    })
    .catch(() => {
      console.log("failed reading data from server");
    });
}
fetchData();
</script>
<template>
  <DateHeader
    :firstDay="sundayDateFormatted"
    :lastDay="saturadayFormatted"
    @changeWeek="() => weeksOffset++"
  />
  <Loading :isVisible="loading" />
  <Switch @change="(val:string) => (userName = val)" />
  <div class="container">
    <DayItem
      day="1"
      @select="(sel) => selectByDay(1, sel)"
      :value="selection[0]"
    />
    <DayItem
      day="2"
      @select="(sel) => selectByDay(2, sel)"
      :value="selection[1]"
    />
    <DayItem
      day="3"
      @select="(sel) => selectByDay(3, sel)"
      :value="selection[2]"
    />
    <DayItem
      day="4"
      @select="(sel) => selectByDay(4, sel)"
      :value="selection[3]"
    />
    <DayItem
      day="5"
      @select="(sel) => selectByDay(5, sel)"
      :value="selection[4]"
    />
    <DayItem
      day="6"
      @select="(sel) => selectByDay(6, sel)"
      :value="selection[5]"
    />
    <DayItem
      day="7"
      @select="(sel) => selectByDay(7, sel)"
      :value="selection[6]"
    />
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
