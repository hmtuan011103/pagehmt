<template>
  <!-- Rest of the template remains the same until the center logo section -->
  <div class="fixed bottom-0 left-0 right-0 z-50 max-w-md m-auto">
    <div class="relative h-24">
      <!-- Background SVG remains the same -->
      <svg
          class="absolute bottom-0 left-0 w-full"
          height="96"
          viewBox="0 0 400 96"
          preserveAspectRatio="none"
      >
        <path
            d="M0,40 L140,40 C160,40 160,80 200,80 C240,80 240,40 260,40 L400,40 L400,96 L0,96 Z"
            fill="#1A1A1A"
            class="drop-shadow-lg"
        />
        <path
            d="M0,40 L140,40 C160,40 160,80 200,80 C240,80 240,40 260,40 L400,40"
            stroke="#333"
            fill="none"
            stroke-width="1"
        />
      </svg>

      <!-- Center Logo - Updated with larger icon size -->
      <div class="absolute left-1/2 -translate-x-1/2 top-2">
        <div class="relative">
          <div class="absolute inset-0 bg-[#FF6F61] rounded-full blur-xl opacity-20"></div>
          <div class="absolute inset-0 bg-black rounded-full blur-md -z-10 translate-y-2 opacity-30"></div>
          <div class="relative w-16 h-16 bg-[#1A1A1A] rounded-full border-2 border-[#333] flex items-center justify-center shadow-2xl overflow-hidden">
            <TransitionGroup name="icon-switch">
              <div
                  v-for="link in navigationLinks"
                  :key="link.path[0]"
                  v-show="isActivePath(link.path)"
                  class="absolute inset-0 flex items-center justify-center p-3"
              >
                <div v-html="link.icon" class="size-10 text-[#FF6F61]"></div>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>

      <!-- Rest of the navigation content remains the same -->
      <div class="relative z-10 max-w-md mx-auto px-4">
        <div class="grid grid-cols-3 justify-between items-end h-24">
          <!-- Left Side Icons -->
          <div class="grid grid-cols-2 ps-3 gap-8 mb-2">
            <router-link
                v-for="(link, index) in navigationLinks.slice(0, 2)"
                :key="index"
                :to="link.path[0]"
                class="relative group flex flex-col items-center"
            >
              <div
                  v-if="isActivePath(link.path)"
                  class="absolute -top-2.5 -left-0.5 inset-x-0 mx-auto w-12 h-12 rounded-full blur-sm"
              ></div>
              <div
                  class="relative z-10 p-1 transition-all duration-300 rounded-full"
                  :class="[
                    isActivePath(link.path)
                      ? 'text-[#FF6F61]'
                      : 'text-[#EDEDED] hover:text-[#FF6F61]'
                  ]"
              >
                <div v-html="link.icon" class="size-6"></div>
              </div>
              <span
                  class="text-xs transition-all duration-300"
                  :class="[
                    isActivePath(link.path)
                      ? 'text-[#FF6F61]'
                      : 'text-[#EDEDED] group-hover:text-[#FF6F61]'
                  ]"
              >
                {{ link.name }}
              </span>
            </router-link>
          </div>

          <!-- Center Spacer -->
          <div class="w-10"></div>

          <!-- Right Side Icons -->
          <div class="grid grid-cols-2 pe-3 gap-8 mb-2">
            <router-link
                v-for="(link, index) in navigationLinks.slice(2)"
                :key="index + 2"
                :to="link.path[0]"
                class="relative group flex flex-col items-center"
            >
              <div
                  v-if="isActivePath(link.path)"
                  class="absolute -top-2 -left-1 inset-x-0 mx-auto w-12 h-12 rounded-full blur-sm"
              ></div>
              <div
                  class="relative z-10 p-1 transition-all duration-300 rounded-full"
                  :class="[
                    isActivePath(link.path)
                      ? 'text-[#FF6F61]'
                      : 'text-[#EDEDED] hover:text-[#FF6F61]'
                  ]"
              >
                <div v-html="link.icon" class="size-6"></div>
              </div>
              <span
                  class="text-xs transition-all duration-300"
                  :class="[
                    isActivePath(link.path)
                      ? 'text-[#FF6F61]'
                      : 'text-[#EDEDED] group-hover:text-[#FF6F61]'
                  ]"
              >
                {{ link.name }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Spacer for fixed nav -->
  <div class="h-24"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const navigationLinks = [
  {
    path: ['/'],
    name: '',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
           </svg>`
  },
  {
    path: ['/another'],
    name: '',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
           </svg>`
  },
  {
    path: ['/friend'],
    name: '',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
           </svg>`
  },
  {
    path: ['/love', '/love/show'],
    name: '',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>`
  },
];

const isActivePath = (paths) => {
  return paths.some(p => route.path === p || route.path.startsWith(p + '/'));
};
</script>

<style scoped>
.icon-switch-enter-active,
.icon-switch-leave-active {
  transition: all 0.3s ease;
}

.icon-switch-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.icon-switch-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.8);
}

.icon-switch-enter-to,
.icon-switch-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1.2); /* Increased scale for center icon */
}
</style>