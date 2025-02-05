<template>
  <div v-if="isLoading">
    <SkeletonCategory/>
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
        <div class="absolute inset-0 z-0 bg-gradient-to-br from-red-500/10 to-rose-500/10
                    opacity-0 blur-xl transition-opacity duration-500
                    group-hover:opacity-100 rounded-2xl"></div>

        <div class="relative z-10">
          <h3 class="text-xl font-semibold text-white mb-3">{{ item.name }}</h3>
          <p class="text-gray-300 text-sm leading-relaxed mb-6">
            {{ item.description }}
          </p>
          <div class="max-w-md m-auto">
            <DynamicButton type="love" @click="navigateToMemory(item.slug)"/>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="!hasError" class="text-center py-2 text-gray-400">
    Không có dữ liệu
  </div>

  <div v-else class="text-center py-5 text-red-400">
    <ErrorLoadingApi @click="fetchLoveMemories"/>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import { useRouter } from 'vue-router';
import {createApiService} from '@/services/apiService';
import DynamicButton from "@/components/DynamicButton.vue";
import SkeletonCategory from "@/components/SkeletonCategory.vue";
import ErrorLoadingApi from "@/components/ErrorLoadingApi.vue";

const router = useRouter();
const slug = 'nguoi-yeu-tmh';
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

const navigateToMemory = (slugPost) => {
  router.push({name: 'love-post', params: {slug: slugPost}});
};

const getCurrentInstanceName = () => {
  return 'Love';
};
</script>
