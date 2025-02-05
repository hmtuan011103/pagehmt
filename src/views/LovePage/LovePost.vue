<template>
  <div v-if="isLoading">
    <SkeletonPost/>
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
        <div class="absolute inset-0 z-0 bg-gradient-to-br from-red-500/10 to-rose-500/10
                      opacity-0 blur-xl transition-opacity duration-500
                      group-hover:opacity-100 rounded-2xl">
        </div>
        <div class="relative z-10">
          <h3 class="text-xl font-semibold text-white mb-3">{{ item.title }}</h3>
          <div class="text-red-400 text-sm mb-4">{{ formatDateTime(item.time_posted) }}</div>
          <p class="text-gray-300 text-sm leading-relaxed mb-6">{{ item.description }}</p>
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
  <div v-else-if="!hasError" class="text-center py-2 text-gray-400">
    Không có dữ liệu
  </div>
  <div v-else class="text-center py-5 text-red-400">
    <ErrorLoadingApi @click="fetchLoveMemories"/>
  </div>

  <div class="mx-2">
    <ModalPopup
        v-model:isOpen="isModalOpen"
        :title="titleModal"
        :content="modalContent"
    />
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import OTPPopup from "@/components/OTPPopup.vue";
import {createApiService} from '@/services/apiService';
import {formatDateTime} from "@/utils/helpers.js";
import SkeletonPost from "@/components/SkeletonPost.vue";
import ErrorLoadingApi from "@/components/ErrorLoadingApi.vue";
import ModalPopup from "@/components/ModalPopup.vue";

defineProps({
  slug: String
});

const router = useRouter();
const route = useRoute();
const slug = route.params.slug;
const data = ref([]);
const isLoading = ref(true);
const hasError = ref(false);
const isModalOpen = ref(false);
const modalContent = ref("");
const titleModal = ref("");

const fetchLoveMemories = async () => {
  isLoading.value = true;
  hasError.value = false;
  try {
    const response = await createApiService('posts').list({slug});
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
  console.log(`${getCurrentInstanceName()} unmounted`)
});

const handleSuccess = (response) => {
  if (!response.data.is_timeline) {
    modalContent.value = response.data.content;
    isModalOpen.value = true;
    titleModal.value = response.data.title;
  } else {
    router.push({ name: 'love-show', params: { code: response.data.content } });
  }
};

const getCurrentInstanceName = () => {
  return 'Love';
}
</script>