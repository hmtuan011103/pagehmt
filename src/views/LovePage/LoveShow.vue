<template>
  <div class="">
    <MemoryTimeline :items="timelineItems" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBreadcrumbsStore } from '@/store/breadcrumbs'
import MemoryTimeline from '@/components/MemoryTimeline.vue'

const breadcrumbsStore = useBreadcrumbsStore()

onMounted(() => {
  breadcrumbsStore.setPages([
    { name: 'Người yêu', href: '/love', current: false },
    { name: 'Làm quen em', href: '#', current: false },
  ])
})

const timelineItems = ref([
  {
    date: "23h29 ngày 12 tháng 12, 2024",
    title: "Những tin nhắn đầu tiên",
    description: "Mấy lần đầu nhắn tin cũng run và sợ, một phần là sau bao lần ngập ngừng với sợ vì sợ em không rep, bơ đẹp mình :)). ",
  },
  {
    date: "23h29 ngày 12 tháng 12, 2024",
    title: "Những tin nhắn đầu tiên",
    description: "Mấy lần đầu nhắn tin cũng run và sợ, một phần là sau bao lần ngập ngừng với sợ vì sợ em không rep, bơ đẹp mình :)). ",
  },
]);
</script>