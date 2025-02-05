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
                  group-hover:translate-y-[-5px]">

        <!-- Glow Effect -->
        <div class="absolute inset-0 z-0 bg-gradient-to-br from-red-500/10 to-rose-500/10
                    opacity-0 blur-xl transition-opacity duration-500
                    group-hover:opacity-100 rounded-2xl"></div>

        <!-- Content -->
        <div class="relative z-10">
          <!-- Header -->
          <h3 class="text-xl font-semibold text-white mb-3">{{ item.name }}</h3>

          <!-- Description -->
          <p class="text-gray-300 text-sm leading-relaxed mb-6">
            {{ item.description }}
          </p>

          <!-- Tình yêu -->
          <div class="max-w-md m-auto">
            <DynamicButton type="love" @click="navigateToMemory(item.slug)" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Khi không có dữ liệu -->
  <div v-else-if="!hasError" class="text-center py-2 text-gray-400">
    Không có dữ liệu
  </div>

  <!-- Khi có lỗi -->
  <div v-else class="text-center py-5 text-red-400">
    <p>Không thể tải dữ liệu. Vui lòng thử lại!</p>
    <button
        @click="fetchLoveMemories"
        class="mt-3 px-4 py-2 bg-red-600 text-white font-medium rounded-lg
               hover:bg-red-700 transition-all">
      Thử lại
    </button>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {createApiService} from '@/services/apiService';
import DynamicButton from "@/components/DynamicButton.vue";

const router = useRouter();
const route = useRoute();
const slug = route.meta.slug;
const data = ref([]);
const isLoading = ref(true);
const hasError = ref(false);

const fetchLoveMemories = async () => {
  isLoading.value = true;
  hasError.value = false;
  try {
    const response = await createApiService('categories').list({slug});
    data.value = response.data;
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

onUnmounted(() => {
  console.log(`${getCurrentInstanceName()} unmounted`);
});

const navigateToMemory = (slug) => {
  router.push({ name: 'love-post', query: { slug } });
};

// Helper function to get component name
const getCurrentInstanceName = () => {
  return 'Love'; // Hardcoded since setup doesn't have access to component's name directly
};
</script>
