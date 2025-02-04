<template>
  <div v-if="isLoading">
    <!-- Skeleton Loading Effect -->
    <div
        v-for="n in 4"
        :key="n"
        class="group relative cursor-pointer animate-pulse bg-[#1a1a1a]
             rounded-2xl p-6 border border-gray-700 shadow-xl mb-5">

      <!-- Glow Effect -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800
                  opacity-50 blur-xl rounded-2xl"></div>

      <div class="relative z-10">
        <!-- Skeleton Title -->
        <div class="h-6 w-2/3 bg-gray-600 rounded mb-3"></div>

        <!-- Skeleton Description -->
        <div class="h-4 w-5/6 bg-gray-700 rounded mb-6"></div>
        <div class="h-4 w-full bg-gray-700 rounded mb-2"></div>

        <!-- Skeleton Button -->
        <div class="h-10 w-full bg-gray-600 rounded"></div>
      </div>
    </div>
  </div>

  <div v-else-if="data.length > 0">
    <div
        class="group relative cursor-pointer mb-5"
        v-for="(item, index) in data"
        :key="index"
    >
      <div class="relative z-10 bg-[#1a1a1a]
                      rounded-2xl p-6 border border-red-500/20 shadow-xl
                      transition-all duration-500 ease-out
                      hover:shadow-red-500/20 hover:border-red-500/30
                      group-hover:translate-y-[-5px]"
      >

      <!-- Glow Effect -->
      <div class="absolute inset-0 z-0 bg-gradient-to-br from-red-500/10 to-rose-500/10
                      opacity-0 blur-xl transition-opacity duration-500
                      group-hover:opacity-100 rounded-2xl">

      </div>

      <!-- Content -->
      <div class="relative z-10">
        <!-- Header -->
        <h3 class="text-xl font-semibold text-white mb-3">{{ item.title }}</h3>

        <!-- Date -->
        <div class="text-red-400 text-sm mb-4">{{ formatDateTime(item.time_posted) }}</div>

        <!-- Description -->
        <p class="text-gray-300 text-sm leading-relaxed mb-6">
          {{ item.description }}
        </p>

        <!-- Tình yêu -->
        <div class="max-w-md m-auto">
          <OTPPopup
              :post-id="item.id"
              button-type="love"
              title="Nhập mã để mở khóa kỷ niệm"
              description="Vui lòng nhập mã 6 số để xem kỷ niệm"
              border-color="red"
              :on-success="handleSuccess"
          />
        </div>
      </div>
    </div>
  </div>
  </div>

  <div v-else class="text-center py-2 text-gray-400">
    Không có dữ liệu
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import OTPPopup from "@/components/OTPPopup.vue";
import { createApiService } from '@/services/apiService';
import {formatDateTime} from "@/utils/helpers.js";

const router = useRouter();
const route = useRoute();
const slug = route.query.slug;
const data = ref([]);
const isLoading = ref(true);

const fetchLoveMemories = async () => {
  try {
    const response = await createApiService('posts').list({slug});
    data.value = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchLoveMemories();
});

onUnmounted(() => {
  console.log(`${getCurrentInstanceName()} unmounted`)
});

const handleSuccess = (content) => {
  console.log("Nội dung bài viết:", content);
  // router.push({ name: 'love-show', params: { content } })
}

// Helper function to get component name
const getCurrentInstanceName = () => {
  return 'Love'; // Hardcoded since setup doesn't have access to component's name directly
}
</script>