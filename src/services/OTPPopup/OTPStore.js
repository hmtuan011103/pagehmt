import { defineStore } from 'pinia'

export const useOTPStore = defineStore('otp', {
    state: () => ({
        attempts: 0,
        lastAttemptTime: null,
        isBlocked: false,
        blockUntil: null,
        otpExpiry: null
    }),

    getters: {
        remainingAttempts: (state) => 5 - state.attempts,
        isRateLimited: (state) => {
            if (!state.lastAttemptTime) return false
            return Date.now() - state.lastAttemptTime < 1000
        },
        timeoutRemaining: (state) => {
            if (!state.blockUntil) return 0
            return Math.max(0, state.blockUntil - Date.now())
        }
    },

    actions: {
        recordAttempt() {
            this.attempts++
            this.lastAttemptTime = Date.now()

            if (this.attempts >= 5) {
                this.blockUser()
            }
        },

        blockUser() {
            this.isBlocked = true
            this.blockUntil = Date.now() + 30000 // 30 seconds
        },

        resetAttempts() {
            this.attempts = 0
            this.isBlocked = false
            this.blockUntil = null
        },

        setOTPExpiry(expiryTime) {
            this.otpExpiry = expiryTime
        }
    },

    persist: {
        enabled: true,
        strategies: [
            {
                storage: sessionStorage,
                paths: ['attempts', 'lastAttemptTime', 'isBlocked', 'blockUntil']
            }
        ]
    }
})