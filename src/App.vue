<template>
  <div class="min-h-screen flex flex-col bg-[#1A1A1A]">
    <!-- Navigation -->
    <Navigation />

    <!-- Main Content -->
    <main class="flex-grow">
      <div class="container mx-auto px-4 py-8 text-[#EDEDED]">
        <router-view>
        </router-view>
      </div>
    </main>

    <!-- Footer -->
    <MemoryFooter />
  </div>
</template>

<script setup lang="js">
import Navigation from "@/components/Navigation.vue";
import MemoryFooter from '@/components/MemoryFooter.vue'
</script>
