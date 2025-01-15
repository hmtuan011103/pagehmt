export const lifecycleLoggerMixin = {
    created() {
        console.log(`${this.$options.name} created`);
    },
    mounted() {
        console.log(`${this.$options.name} mounted`);
    },
    // thêm các lifecycle hooks khác nếu cần
}