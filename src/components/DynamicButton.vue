<template>
  <button
      :class="[
       width,
      'px-4 py-2 text-sm font-medium text-white',
      'bg-gradient-to-r from-red-500 to-rose-500 rounded-lg',
      'transition-all duration-300 ease-out group',
      'hover:from-red-600 hover:to-rose-600',
      'focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
      'focus:ring-offset-gray-900',
      'relative overflow-hidden'
    ]"
      @click="$emit('click')"
  >
    <div class="flex items-center justify-center space-x-2">
      <!-- Dynamic Icon -->
      <svg
          class="w-4 h-4 transition-transform group-hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
      >
        <template v-if="type === 'family'">
          <!-- House Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </template>

        <template v-else-if="type === 'love'">
          <!-- Love Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>

        </template>

        <template v-else-if="type === 'friend'">
          <!-- Friends Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
        </template>

        <template v-else>
          <!-- Other/Default Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
        </template>
      </svg>

      <span class="relative z-10">
        <slot>{{ text }}</slot>
      </span>
    </div>

    <!-- Hiệu ứng ripple khi hover -->
    <div
        class="absolute inset-0 h-full w-full bg-gradient-to-r from-white/10 to-transparent
             transform -skew-x-12 -translate-x-full group-hover:translate-x-full
             transition-transform duration-700 ease-out"
    ></div>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  type: {
    type: String,
    default: 'other',
    validator: (v) => ['family', 'love', 'friend', 'other'].includes(v)
  },
  text: {
    type: String,
    default: 'Đi đến kỉ niệm'
  }, 
  width: {
    type: String,
    default: 'w-full '
  }
});

defineEmits(['click'])
</script>