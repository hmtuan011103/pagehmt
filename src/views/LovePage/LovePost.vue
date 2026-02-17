<template>
  <div ref="searchBarRef" class="search-container transition-all duration-300" 
  :class="{ 'fixed top-[45px] left-0 right-0 z-50 p-4 bg-[#1A1A1A] shadow-md': isSearchBarSticky }">
    <div class="relative w-full mb-2">
      <input
        v-model="searchQuery"
        placeholder="Nhập để tìm kiếm"
        class="w-full p-3 pl-10 bg-gray-800 border border-gray-600 rounded-full text-white focus:ring-2 focus:ring-red-400 outline-none"
      />
      <svg
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        width="20"
        height="20"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <button 
        v-if="searchQuery" 
        @click="clearSearch" 
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          width="20" 
          height="20"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>

  <div v-if="isSearchBarSticky" class="py-16"></div>

  <div v-if="isLoading && page === 1">
    <SkeletonPost/>
  </div>

  <div v-else>
    <div v-if="data.length > 0">
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
            <div class="text-red-400 text-sm mb-4 drop-shadow-md flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <p>{{ formatDateTime(item.time_posted) }}</p>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">{{ item.title }}</h3>
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
    
      <div v-if="isLoadingMore">
        <SkeletonPost/>
      </div>
    </div>
    
    <div v-else-if="!hasError" class="text-center py-2 text-gray-400">
      Không có dữ liệu
    </div>

    <div v-else class="text-center py-5 text-red-400">
      <ErrorLoadingApi @click="fetchLoveMemories"/>
    </div>
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
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import OTPPopup from "@/components/OTPPopup.vue";
import { createApiService } from '@/services/apiService';
import { formatDateTime } from "@/utils/helpers.js";
import SkeletonPost from "@/components/SkeletonPost.vue";
import ErrorLoadingApi from "@/components/ErrorLoadingApi.vue";
import ModalPopup from "@/components/ModalPopup.vue";
import { useAuthStore } from '@/store/authStore.js';

defineProps({
  slug: String
});

const router = useRouter();
const route = useRoute();
const slug = route.params.slug;
const data = ref([]);
const isLoading = ref(true);
const isLoadingMore = ref(false);
const hasError = ref(false);
const isModalOpen = ref(false);
const modalContent = ref("");
const titleModal = ref("");
const searchQuery = ref('');
const page = ref(1);
const hasMore = ref(true);
const debounceTimeout = ref(null);

const searchBarRef = ref(null);
const isSearchBarSticky = ref(false);
const searchBarPosition = ref(0);

const fetchLoveMemories = async (isInitialLoad = false) => {
  if (!hasMore.value && page.value > 1) return;

  if (isInitialLoad || page.value === 1) {
    isLoading.value = true;
  } else {
    isLoadingMore.value = true;
  }
  
  hasError.value = false;

  try {
    const response = await createApiService('posts').list({
      slug,
      search: searchQuery.value,
      page: page.value,
      per_page: 5,
    });

    if (response.data.length === 0) {
      hasMore.value = false;
    } else {
      data.value = page.value === 1 ? response.data : [...data.value, ...response.data];
    }
  } catch (error) {
    console.error(error);
    hasError.value = true;
  } finally {
    if (isInitialLoad || page.value === 1) {
      isLoading.value = false;
    } else {
      isLoadingMore.value = false;
    }
  }
};

const clearSearch = () => {
  searchQuery.value = '';
  page.value = 1;
  hasMore.value = true;
  fetchLoveMemories(true);
};

const loadMore = () => {
  if (!isLoading.value && !isLoadingMore.value && hasMore.value) {
    page.value++;
    fetchLoveMemories(false);
  }
};

const handleScroll = () => {
  const bottomOfPage =
    window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 30;

  if (bottomOfPage) {
    loadMore();
  }
  
  if (searchBarRef.value && searchBarPosition.value > 0) {
    isSearchBarSticky.value = window.scrollY > 100;
  }
};

const handleSuccess = (response) => {
  const authStore = useAuthStore();

  if (response.data.is_timeline == 0) {
    modalContent.value = response.data.content;
    isModalOpen.value = true;
    titleModal.value = response.data.title;
    return;
  }
  
  authStore.verifySlug(route.params.slug, response.data.content);
  router.push({
    name: 'love-show',
    params: { slug: route.params.slug, code: response.data.content }
  });
};

watch(searchQuery, (newQuery) => {
  clearTimeout(debounceTimeout.value);

  debounceTimeout.value = setTimeout(() => {
    page.value = 1;
    hasMore.value = true;
    fetchLoveMemories(true);
  }, 500);
});

onMounted(async () => {
  await fetchLoveMemories(true);
  
  nextTick(() => {
    if (searchBarRef.value) {
      searchBarPosition.value = searchBarRef.value.getBoundingClientRect().top + window.scrollY;
    }
    
    window.addEventListener('scroll', handleScroll);
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  clearTimeout(debounceTimeout.value);
});
</script>

<style scoped>
.search-container {
  width: 100%;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
}

.search-container.fixed {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>