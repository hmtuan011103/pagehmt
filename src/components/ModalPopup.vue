<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen"
           class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
      >
        <Transition name="scale">
          <div class="bg-[#1a1a1a] text-white p-5 rounded-2xl shadow-xl border border-red-500/20 w-full max-w-lg relative">
            <h2 v-if="title" class="text-lg font-semibold text-white mb-4 text-center">{{ title }}</h2>
            <div
                class="max-h-[60vh] overflow-y-auto text-gray-300 text-sm leading-relaxed"
                v-html="sanitizedContent"
                @click="handleImageClick"
                ref="contentRef"
            ></div>
            <vue-easy-lightbox
                :visible="showLightbox"
                :imgs="currentImage"
                @hide="showLightbox = false"
            ></vue-easy-lightbox>
            <div class="mt-4 flex justify-end">
              <button
                  @click="closeModal"
                  class="px-4 py-2 bg-gray-700/50 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105">
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
import { defineProps, defineEmits, ref, computed } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  title: String,
  content: String
});

const emit = defineEmits(["update:isOpen"]);
const showLightbox = ref(false);
const currentImage = ref('');

const closeModal = () => {
  emit("update:isOpen", false);
};

const handleImageClick = (event) => {
  if (event.target.tagName === 'IMG') {
    currentImage.value = event.target.src;
    showLightbox.value = true;
  }
};

const sanitizedContent = computed(() => {
  if (!props.content) return '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(props.content, "text/html");

  doc.querySelectorAll("figure a").forEach(a => {
    const img = a.querySelector("img");
    if (img) {
      img.style.margin = "10px 0";
      a.replaceWith(img);
    } else {
      a.remove();
    }
  });

  doc.querySelectorAll("figcaption").forEach(figcaption => figcaption.remove());

  return doc.body.innerHTML;
});
</script>

<style scoped>

.overflow-y-auto.text-gray-300.text-sm.leading-relaxed {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.overflow-y-auto.text-gray-300.text-sm.leading-relaxed::-webkit-scrollbar {
 display: none;
}
</style>