<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen"
           class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
      >
        <Transition name="scale">
          <div class="bg-[#1a1a1a] text-white p-6 rounded-2xl shadow-xl border border-red-500/20 w-full max-w-lg relative">
            <h2 v-if="title" class="text-lg font-semibold text-red-400 mb-4 text-center">{{ title }}</h2>

            <!-- Nội dung có thể cuộn -->
            <div class="max-h-[60vh] overflow-y-auto text-gray-300 text-sm leading-relaxed pr-2" v-html="content"></div>

            <!-- Nút đóng -->
            <div class="mt-2 flex">
              <button
                  @click="closeModal"
                  class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition">
                Đóng
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  isOpen: Boolean,
  title: String,
  content: String
});

const emit = defineEmits(["update:isOpen"]);

const closeModal = () => {
  emit("update:isOpen", false);
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.scale-enter-active, .scale-leave-active {
  transition: transform 0.3s ease;
}
.scale-enter-from, .scale-leave-to {
  transform: scale(0.9);
}

.max-h-[60vh]::-webkit-scrollbar {
               width: 5px;
             }
.max-h-[60vh]::-webkit-scrollbar-thumb {
               background: rgba(255, 0, 0, 0.4);
               border-radius: 10px;
             }
.max-h-[60vh]::-webkit-scrollbar-track {
               background: transparent;
             }
</style>
