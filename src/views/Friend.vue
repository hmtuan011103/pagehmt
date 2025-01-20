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
        <h3 class="text-xl font-semibold text-white mb-3">Kỷ niệm đẹp</h3>

        <!-- Date -->
        <div class="text-red-400 text-sm mb-4">13 tháng 1, 2025</div>

        <!-- Description -->
        <p class="text-gray-300 text-sm leading-relaxed mb-6">
          Mỗi khoảnh khắc đều là một câu chuyện riêng, một phần ký ức đẹp trong
          cuộc sống của chúng ta.
        </p>

        <!-- Bạn bè -->
        <DynamicButton type="friend" @click="navigateToMemory" />
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
    { name: 'Bạn bè', href: '/friend', current: false },
  ])
})

onUnmounted(() => {
  console.log(`${getCurrentInstanceName()} unmounted`)
})

const getCurrentInstanceName = () => {
  return 'Friend'
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
  router.push({ name: 'friend-show' })
}
</script>