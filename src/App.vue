<template>
  <div class="min-h-screen flex flex-col bg-[#1A1A1A]">
    <!-- Breadcrumbs -->
    <div
        class="sticky top-0 z-50 text-[#EDEDED] bg-[#1A1A1A] shadow-md transition-all duration-300 ease-in-out"
        :class="scrolled ? 'shadow-lg py-4 bg-[#1A1A1A]' : 'py-4 bg-[#1A1A1A]'"
        ref="breadcrumb"
    >
      <div class="container mx-auto px-4">
        <SimpleWithChevrons :pages="breadcrumbsStore.pages" />
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-grow">
      <div class="container mx-auto px-4 pt-4 text-[#EDEDED]">
        <div class="grid grid-cols-1 gap-4">
          <router-view></router-view>
        </div>
      </div>
    </main>

    <!-- Mobile Navigation -->
    <Navigation />
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, onUnmounted } from 'vue';
import { useBreadcrumbsStore } from '@/store/breadcrumbs';
import Navigation from "@/components/Navigation.vue";
import SimpleWithChevrons from "@/components/application-ui/navigation/breadcrumbs/simple_with_chevrons.vue";

// Store breadcrumbs
const breadcrumbsStore = useBreadcrumbsStore();

// Reactive state for scroll
const scrolled = ref(false);

// Scroll handler to toggle `scrolled` state
const handleScroll = () => {
  scrolled.value = window.scrollY > 10; // Adjust threshold as needed
};

// Mount and unmount scroll event listener
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
