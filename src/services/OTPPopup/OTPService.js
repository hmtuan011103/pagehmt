import axios from 'axios'
import CryptoJS from 'crypto-js'

export class OTPService {
    constructor() {
        this.baseURL = process.env.VUE_APP_API_URL
        this.encryptionKey = process.env.VUE_APP_ENCRYPTION_KEY
    }

    // Encrypt OTP before sending to server
    encryptOTP(otp) {
        return CryptoJS.AES.encrypt(otp, this.encryptionKey).toString()
    }

    // Request new OTP
    async requestOTP(userId) {
        try {
            const response = await axios.post(`${this.baseURL}/otp/generate`, {
                userId,
                timestamp: Date.now()
            }, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            })
            return response.data
        } catch (error) {
            console.error('Error requesting OTP:', error)
            throw error
        }
    }

    // Verify OTP
    async verifyOTP(userId, otp) {
        try {
            const encryptedOTP = this.encryptOTP(otp)
            const response = await axios.post(`${this.baseURL}/otp/verify`, {
                userId,
                otp: encryptedOTP,
                timestamp: Date.now()
            }, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            })
            return response.data
        } catch (error) {
            console.error('Error verifying OTP:', error)
            throw error
        }
    }
}