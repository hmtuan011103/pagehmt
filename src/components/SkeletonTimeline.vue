<template>
  <div class="p-4 min-h-screen text-white">
    <div class="max-w-md mx-auto">
      <div class="relative border-l-2 border-red-500">
        <div v-for="index in 4" :key="index" class="pl-4 mb-6 relative animate-pulse">
          <div class="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800
                  opacity-50 blur-xl rounded-2xl"></div>

          <div class="absolute -left-2 top-0 bg-red-500 w-4 h-4 rounded-full"></div>
          <div class="h-4 w-32 bg-gray-700 rounded mb-2"></div>
          <div class="h-6 w-48 bg-gray-600 rounded mb-2"></div>
          <div class="h-4 w-40 bg-gray-700 rounded"></div>
          <div class="mt-2 h-10 w-20 bg-red-500 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
<script setup lang="ts">
</script>