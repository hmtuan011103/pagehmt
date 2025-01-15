<script>
import {lifecycleLoggerMixin} from "@/mixins/lifecycleLoggerMixin";
import Navigation from '@/components/Navigation.vue'

export default {
  name: "AppLayoutGuest",
  components: { Navigation },
  mixins: [lifecycleLoggerMixin],
}
</script>

<template>
  <div>
    <Navigation />
    <main>
      <slot/>
    </main>
  </div>
</template>