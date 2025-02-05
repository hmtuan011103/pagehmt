<template>
  <div class="w-full text-center relative">
    <template v-if="!isMainRoute">
      <!-- Nếu có lịch sử điều hướng -->
      <button
          v-if="hasHistory"
          @click="goBack"
          class="flex items-center space-x-2 text-sm font-medium text-[#EDEDED] hover:text-white transition-all"
      >
        <ChevronLeftIcon class="h-7 w-7 flex-shrink-0" aria-hidden="true" />
        <span>Quay lại</span>
      </button>
    </template>

    <!-- Nếu đang ở route chính -->
    <div v-else class="flex items-center justify-between">
      <div v-html="currentPageIcon" class="size-8 text-[#FF6F61]"></div>
      <div v-if="route.name === 'love'" class="text-[#FF6F61]">
        {{ daysPassed }} ngày
      </div>
      <div v-else>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ChevronLeftIcon } from '@heroicons/vue/20/solid';
import { daysSinceJan8_2025 } from '@/utils/helpers.js';

const daysPassed = daysSinceJan8_2025();
const router = useRouter();
const route = useRoute();

const hasHistory = ref(!!router.options.history?.state?.back);

watch(route, () => {
  hasHistory.value = !!router.options.history?.state?.back;
}, { immediate: true });

const mainRoutes = {
  family: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
</svg>
`,
  another: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
</svg>
`,
  friend: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
</svg>
`,
  love: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
</svg>
`,
};

const isMainRoute = computed(() => Object.keys(mainRoutes).includes(route.name));
const currentPageIcon = computed(() => mainRoutes[route.name] || '');

const goBack = () => {
  router.back();
};
</script>