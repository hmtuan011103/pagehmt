<template>
  <div class="max-w-3xl mx-auto py-3">
    <!-- Timeline list -->
    <ol class="relative border-s border-[#dc2626] dark:border-[#dc2626]">
      <li v-for="(item, index) in items" :key="index" class="mb-10 ms-4">
        <div class="absolute w-3 h-3 bg-[#dc2626] rounded-full -start-1.5 border border-white
                 dark:border-[#dc2626] dark:bg-[#dc2626]"></div>

        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-400">
          {{ formatDateTime(item.time_posted) }}
        </time>

        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ item.title }}
        </h4>

        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          {{ item.description }}
        </p>

        <OTPPopup
            :post-id="item.id"
            button-type="love"
            text-content="Xem"
            width-button=""
            title="Nhập mã để mở khóa kỷ niệm"
            description="Vui lòng nhập mã 6 số để xem kỷ niệm này"
            border-color="red"
            key-api="timelines"
            :on-success="handleSuccess"
        />
      </li>
    </ol>
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
import { ref } from 'vue';
import OTPPopup from "@/components/OTPPopup.vue";
import {formatDateTime} from "@/utils/helpers.js";
import ModalPopup from "@/components/ModalPopup.vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
});

const isModalOpen = ref(false);
const modalContent = ref("");
const titleModal = ref("");

const handleSuccess = (response) => {
    modalContent.value = response.data.content;
    isModalOpen.value = true;
    titleModal.value = response.data.title;
};

</script>