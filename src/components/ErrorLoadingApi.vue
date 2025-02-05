<template>
  <p>Không thể tải dữ liệu. Vui lòng thử lại!</p>
  <button
      @click="$emit('click')"
      class="mt-3 px-4 py-2 bg-red-600 text-white font-medium rounded-lg
               hover:bg-red-700 transition-all">
    Thử lại
  </button>
</template>

<script>
export default {
  name: 'ErrorLoadingApi',
  emits: ['click']
}
</script>