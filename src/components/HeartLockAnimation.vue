<template>
  <Transition name="fade">
    <div v-if="isVisible" class="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center">
      <div class="relative w-64 h-64">
        <div class="absolute inset-0" :class="{ 'animate-unlock': isUnlocking }">
          <!-- Heart Lock SVG -->
          <svg viewBox="0 0 200 200" class="w-full h-full">
            <!-- Heart Base -->
            <path
                d="M100,30 L85,15 A20,20 0 0,0 55,15 A20,20 0 0,0 55,45 L100,90 L145,45 A20,20 0 0,0 145,15 A20,20 0 0,0 115,15 L100,30"
                :fill="isUnlocking ? '#ff4b4b' : '#666'"
                class="transition-colors duration-500"
            />

            <!-- Lock Body -->
            <rect
                x="70"
                y="60"
                width="60"
                height="50"
                rx="8"
                :fill="isUnlocking ? '#ff4b4b' : '#666'"
                class="transition-colors duration-500"
                :class="{ 'animate-fade-out': isUnlocking }"
            />

            <!-- Lock Hole -->
            <circle
                cx="100"
                cy="85"
                r="8"
                fill="#1a1a1a"
                :class="{ 'animate-fade-out': isUnlocking }"
            />
          </svg>
        </div>

        <!-- Sparkles -->
        <div v-if="isUnlocking" class="absolute inset-0">
          <div v-for="i in 8" :key="i"
               class="absolute w-2 h-2 bg-red-500 rounded-full animate-sparkle"
               :style="{
                 left: '50%',
                 top: '50%',
                 transform: `rotate(${i * 45}deg)`,
                 animationDelay: `${i * 0.1}s`
               }"
          ></div>
        </div>

        <!-- Love Text -->
        <Transition name="scale">
          <div v-if="showText" class="absolute inset-0 flex items-center justify-center">
            <span class="text-red-500 text-4xl font-bold animate-pulse">Love</span>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['animationComplete'])

const isUnlocking = ref(false)
const showText = ref(false)

function startUnlock() {
  isUnlocking.value = true

  setTimeout(() => {
    showText.value = true
  }, 1000)

  setTimeout(() => {
    emit('animationComplete')
  }, 2500)
}

defineExpose({
  startUnlock
})
</script>

<style scoped>
.animate-unlock {
  animation: unlock 0.5s ease-out forwards;
}

.animate-fade-out {
  animation: fadeOut 0.5s ease-out forwards;
  animation-delay: 0.3s;
}

.animate-sparkle {
  opacity: 0;
  animation: sparkle 1s ease-out forwards;
}

@keyframes unlock {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes fadeOut {
  to { opacity: 0; }
}

@keyframes sparkle {
  0% {
    transform: translateY(0) scale(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100px) scale(0);
    opacity: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}a

.scale-enter-active {
  transition: all 0.5s ease;
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0);
}
</style>