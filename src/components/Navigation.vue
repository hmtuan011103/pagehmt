<template>
  <header
      class="fixed top-0 left-0 right-0 transition-all duration-300 z-50"
      :class="[
      { 'bg-[#1A1A1A]/90 backdrop-blur-md shadow-lg': isScrolled },
      { 'bg-transparent': !isScrolled }
    ]"
  >
    <nav class="container mx-auto px-4 h-16">
      <div class="h-full flex items-center justify-center">
        <!-- Current Section Icon (Desktop) -->
        <div class="hidden md:flex items-center mr-4">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-6 h-6 text-[#FF6F61] transition-transform duration-300 hover:scale-110"
          >
          </svg>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center justify-center space-x-1">
          <router-link
              v-for="(link, index) in navigationLinks"
              :key="index + 'desktop'"
              :to="link.path"
              class="relative px-5 py-4 text-[#EDEDED] transition-colors duration-300 font-medium"
              :class="{ 'text-[#FF6F61]': $route.path === link.path }"
          >
            <div class="flex items-center gap-1">
              <p v-html="link.icon"></p>
              <p>{{ link.name }}</p>
            </div>
            <span
                class="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF6F61] transform scale-x-0 transition-transform duration-300 ease-out"
                :class="{ 'scale-x-100': $route.path === link.path }"
            ></span>
          </router-link>
        </div>

        <!-- Mobile Layout -->
        <div class="flex md:hidden w-full justify-between items-center">

          <!-- Mobile Menu Button -->
          <button
              @click="toggleMobileMenu"
              class="p-2 rounded-full bg-[rgba(255,69,58,0.2)] hover:bg-[rgba(255,69,58,0.3)] transition-all duration-300"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                class="w-7 h-7 text-[#FF6F61] transition-all duration-500 heart-icon"
                :class="{
                'scale-110 drop-shadow-lg text-[#FF3D3D] heart-bounce': isMobileMenuOpen,
                'heart-beat': !isMobileMenuOpen
              }"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

          <!-- Current Section Icon (Mobile) -->
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-6 h-6 text-[#FF6F61] transition-transform duration-300"
          >
            <template v-if="$route.path === '/'">
              <!-- House Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </template>

            <template v-else-if="$route.path === '/love'">
              <!-- Love Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </template>

            <template v-else-if="$route.path === '/friend'">
              <!-- Friends Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
            </template>

            <template v-else>
              <!-- Other Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
            </template>
          </svg>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div
        class="md:hidden overflow-hidden transition-all duration-300"
        :class="[isMobileMenuOpen ? 'max-h-screen' : 'max-h-0']"
    >
      <div class="bg-[#1A1A1A]/90 backdrop-blur-md px-4 py-3 space-y-1">
        <router-link
            v-for="(link, index) in navigationLinks"
            :key="index + 'mobile'"
            :to="link.path"
            class="flex items-center px-3 py-2 text-[#EDEDED] hover:text-[#FF6F61] rounded-lg hover:bg-[rgba(255,69,58,0.2)] transition-colors"
            :class="{ 'text-[#FF6F61] bg-[rgba(255,69,58,0.1)]': $route.path === link.path }"
            @click="closeMobileMenu"
        >
          <div class="flex items-center gap-1">
            <p v-html="link.icon"></p>
            <p>{{ link.name }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </header>

  <!-- Spacer for fixed header -->
  <div class="h-16"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const navigationLinks = [
  {
    path: '/',
    name: 'Gia đình',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
           </svg>`
  },
  {
    path: '/love',
    name: 'Người yêu',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>`
  },
  {
    path: '/friend',
    name: 'Bạn bè',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
           </svg>`
  },
  {
    path: '/another',
    name: 'Khác',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
           </svg>`
  }
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.heart-bounce {
  animation: heartBounce 0.5s ease-in-out;
}

.heart-beat {
  animation: heartBeat 1.3s infinite;
}

@keyframes heartBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.1); }
  28% { transform: scale(1); }
  42% { transform: scale(1.1); }
  70% { transform: scale(1); }
}
</style>