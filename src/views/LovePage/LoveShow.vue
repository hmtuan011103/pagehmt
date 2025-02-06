<template>
  <div v-if="isLoading">
    <SkeletonTimeline/>
  </div>

  <div class="" v-else-if="timelineItems.length > 0">
    <MemoryTimeline :items="timelineItems" />
  </div>

  <div v-else-if="!hasError" class="text-center py-2 text-gray-400">
    Không có dữ liệu
  </div>

  <div v-else class="text-center py-5 text-red-400">
    <ErrorLoadingApi @click="fetchLoveMemories"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MemoryTimeline from '@/components/MemoryTimeline.vue'
import {createApiService} from '@/services/apiService';
import {useRoute} from "vue-router";
import SkeletonTimeline from "@/components/SkeletonTimeline.vue";
import ErrorLoadingApi from "@/components/ErrorLoadingApi.vue";

const route = useRoute()
const code = route.params.code
const isLoading = ref(true);
const hasError = ref(false);
const timelineItems = ref([]);

const fetchLoveMemories = async () => {
  isLoading.value = true;
  hasError.value = false;
  try {
    const response = await createApiService('timelines').list({code});
    timelineItems.value = response.data;
  } catch (error) {
    console.error(error);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchLoveMemories();
});
</script>