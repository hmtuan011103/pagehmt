<template>
  <div class="group relative cursor-pointer">
      <div class="relative z-10 bg-[#1a1a1a]
                    rounded-2xl p-6 border border-red-500/20 shadow-xl
                    transition-all duration-500 ease-out
                    hover:shadow-red-500/20 hover:border-red-500/30
                    group-hover:translate-y-[-5px]">

        <!-- Glow Effect -->
        <div class="absolute inset-0 z-0 bg-gradient-to-br from-red-500/10 to-rose-500/10
                      opacity-0 blur-xl transition-opacity duration-500
                      group-hover:opacity-100 rounded-2xl"></div>

        <!-- Content -->
        <div class="relative z-10">
          <!-- Header -->
          <h3 class="text-xl font-semibold text-white mb-3">Làm quen em</h3>

          <!-- Date -->
          <div class="text-red-400 text-sm mb-4">12 tháng 12, 2024</div>

          <!-- Description -->
          <p class="text-gray-300 text-sm leading-relaxed mb-6">
            Sau bao nhiêu lần ngập ngừng, muốn làm quen em mà không dám nói, thì đến ngày này cũng dám nói ra.
          </p>

          <!-- Tình yêu -->
          <DynamicButton type="love" @click="navigateToMemory" />
        </div>
      </div>
    </div>
  <div class="group relative cursor-pointer">
    <div class="relative z-10 bg-[#1a1a1a]
                    rounded-2xl p-6 border border-red-500/20 shadow-xl
                    transition-all duration-500 ease-out
                    hover:shadow-red-500/20 hover:border-red-500/30
                    group-hover:translate-y-[-5px]">

      <!-- Glow Effect -->
      <div class="absolute inset-0 z-0 bg-gradient-to-br from-red-500/10 to-rose-500/10
                      opacity-0 blur-xl transition-opacity duration-500
                      group-hover:opacity-100 rounded-2xl"></div>

      <!-- Content -->
      <div class="relative z-10">
        <!-- Header -->
        <h3 class="text-xl font-semibold text-white mb-3">Đi chơi với em lần đầu tiên</h3>

        <!-- Date -->
        <div class="text-red-400 text-sm mb-4">25 tháng 12, 2024</div>

        <!-- Description -->
        <p class="text-gray-300 text-sm leading-relaxed mb-6">
          Sau khoảng thời gian nhắn tin, cũng muốn hẹn em một buổi đi chơi, nhưng mà em từ chối nhiều quá, thì cuối cùng ngày đó cũng đến.
        </p>

        <!-- Tình yêu -->
        <DynamicButton type="love" @click="navigateToMemory" />
      </div>
    </div>
  </div>
  <div class="group relative cursor-pointer">
    <div class="relative z-10 bg-[#1a1a1a]
                    rounded-2xl p-6 border border-red-500/20 shadow-xl
                    transition-all duration-500 ease-out
                    hover:shadow-red-500/20 hover:border-red-500/30
                    group-hover:translate-y-[-5px]">

      <!-- Glow Effect -->
      <div class="absolute inset-0 z-0 bg-gradient-to-br from-red-500/10 to-rose-500/10
                      opacity-0 blur-xl transition-opacity duration-500
                      group-hover:opacity-100 rounded-2xl"></div>

      <!-- Content -->
      <div class="relative z-10">
        <!-- Header -->
        <h3 class="text-xl font-semibold text-white mb-3">Đi chơi với em lần hai</h3>

        <!-- Date -->
        <div class="text-red-400 text-sm mb-4">1 tháng 1, 2025</div>

        <!-- Description -->
        <p class="text-gray-300 text-sm leading-relaxed mb-6">
          Lúc này cũng cảm giác, em cho anh 1 chút niềm tin, nên liểu rủ em đi chơi vào đầu năm năm mới dương.
        </p>

        <!-- Tình yêu -->
        <DynamicButton type="love" @click="navigateToMemory" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import DynamicButton from "@/components/DynamicButton.vue"
import { useRouter } from 'vue-router'
import {useBreadcrumbsStore} from "@/store/breadcrumbs.js";

const router = useRouter()
const breadcrumbsStore = useBreadcrumbsStore()

onMounted(() => {
  breadcrumbsStore.setPages([
    { name: 'Người yêu', href: '/love', current: false },
  ])
})

onUnmounted(() => {
  console.log(`${getCurrentInstanceName()} unmounted`)
})

// Helper function to get component name
const getCurrentInstanceName = () => {
  return 'Love' // Hardcoded since setup doesn't have access to component's name directly
}

// Methods
const formatDate = (date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const navigateToMemory = () => {
  router.push({ name: 'love-show' })
}
</script>