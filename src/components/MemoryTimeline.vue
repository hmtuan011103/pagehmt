<template>
  <div class="max-w-3xl mx-auto py-8">
    <!-- Timeline list -->
    <ol class="relative border-s border-[#dc2626] dark:border-[#dc2626]">
      <li v-for="(item, index) in items" :key="index" class="mb-10 ms-4">
        <div class="absolute w-3 h-3 bg-[#dc2626] rounded-full mt-1.5 -start-1.5 border border-white
                 dark:border-[#dc2626] dark:bg-[#dc2626]"></div>

        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-400">
          {{ item.date }}
        </time>

        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ item.title }}
        </h4>

        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          {{ item.description }}
        </p>

        <DynamicButton
            type="love"
            text="Xem"
            width=""
            @click="openModal(item)"
        />
      </li>
    </ol>

    <!-- Modal with dark theme -->
    <div v-if="showModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div class="bg-[#1F1F1F] p-6 rounded-lg max-w-2xl w-full mx-4 border border-[#dc2626]/20">
        <div class="flex flex-col">
          <h2 class="text-2xl font-bold mb-4 text-white">{{ selectedItem?.title }}</h2>
          <div class="mb-4">
            <p class="text-gray-300">{{ selectedItem?.description }}</p>
          </div>
          <div class="flex justify-end">
            <button
                @click="closeModal"
                class="px-4 py-2 bg-[#dc2626] text-white rounded hover:bg-[#dc2626]/80 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DynamicButton from "@/components/DynamicButton.vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
});

// Modal state
const showModal = ref(false);
const selectedItem = ref(null);

// Modal actions
const openModal = (item) => {
  selectedItem.value = item;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedItem.value = null;
};
</script>