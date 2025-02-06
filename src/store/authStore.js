import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        verifiedSlugs: {}
    }),
    actions: {
        verifySlug(slug, code) {
            this.verifiedSlugs[`${slug}-${code}`] = true;
        },
        isVerified(slug, code) {
            return !!this.verifiedSlugs[`${slug}-${code}`];
        }
    }
});
