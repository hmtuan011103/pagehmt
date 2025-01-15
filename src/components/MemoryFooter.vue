<template>
  <footer class="bg-[#1A1A1A] text-gray-100 border-t border-[#444444] py-8">
    <div class="container mx-auto px-4">
      <div class="flex justify-center space-x-8 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6F61" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hover:stroke-red-400 transition-colors">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
          <circle cx="12" cy="13" r="3"/>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6F61" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hover:stroke-red-400 transition-colors">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6F61" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hover:stroke-red-400 transition-colors">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </div>

      <div class="text-center mb-4">
        <h3 class="text-[#FF6F61] text-lg mb-2">Khoảnh khắc đáng nhớ</h3>
        <p class="text-gray-400 text-sm italic">"Mỗi khoảnh khắc đều là một câu chuyện riêng"</p>
      </div>

      <div class="text-center text-gray-500 text-xs">
        © {{ currentYear }} Hoang Manh Tuan
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>