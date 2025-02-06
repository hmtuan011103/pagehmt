<template>
  <div
      v-for="n in 4"
      :key="n"
      class="group relative cursor-pointer animate-pulse bg-[#1a1a1a]
             rounded-2xl p-6 border border-gray-700 shadow-xl mb-5">
    <div class="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800
                  opacity-50 blur-xl rounded-2xl"></div>
    <div class="relative z-10">
      <div class="h-6 w-2/3 bg-gray-600 rounded mb-3"></div>
      <div class="h-4 w-5/6 bg-gray-700 rounded mb-6"></div>
      <div class="h-10 w-full bg-gray-600 rounded"></div>
    </div>
  </div>
</template>