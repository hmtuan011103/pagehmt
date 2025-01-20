<!-- OTPPopup.vue -->
<template>
  <div>
    <!-- Trigger button -->
    <DynamicButton :type="buttonType" :text="textContent" :width="widthButton" @click="showPopup = true" />

    <!-- Full screen OTP Modal -->
    <TransitionRoot appear :show="showPopup" as="template">
      <Dialog as="div" @close="closePopup" class="relative z-50">
        <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/90" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-screen items-center justify-center p-4">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="bg-[#1F1F1F] p-4 rounded-xl max-w-md w-full mx-auto border border-red-500/20">
                <div class="mb-8 text-center">
                  <DialogTitle as="h4" class="text-xl font-semibold mb-3 text-white">
                    {{ title }}
                  </DialogTitle>
                  <DialogDescription class="text-gray-400">
                    {{ description }}
                  </DialogDescription>
                </div>

                <!-- OTP Input -->
                <div class="flex gap-2 justify-center mb-8">
                  <template v-for="(digit, index) in 6" :key="index">
                    <input
                        type="password"
                        v-model="otpDigits[index]"
                        @input="handleInput($event, index)"
                        @keydown="handleKeydown($event, index)"
                        @paste="handlePaste"
                        maxlength="1"
                        class="w-12 h-14 text-center bg-[#2a2a2a] border-2 rounded-lg text-white text-xl focus:outline-none transition-colors"
                        :class="[
                        `border-${borderColor}-500/30`,
                        `focus:border-${borderColor}-500/70`
                      ]"
                        :ref="el => inputRefs[index] = el"
                    >
                  </template>
                </div>

                <!-- Buttons -->
                <div class="flex gap-4 justify-center">
                  <button
                      @click="verifyOTP"
                      class="px-4 py-2 text-white rounded-lg transition-all duration-200 font-medium"
                      :class="[
                      `bg-${borderColor}-500/80`,
                      `hover:bg-${borderColor}-500`,
                    ]"
                  >
                    {{ confirmButtonText }}
                  </button>
                  <button
                      @click="closePopup"
                      class="px-4 py-2 bg-gray-700/50 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium transform hover:scale-105"
                  >
                    {{ cancelButtonText }}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { Dialog, DialogPanel, DialogTitle, DialogDescription, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { useToast } from 'vue-toastification'
import DynamicButton from "@/components/DynamicButton.vue"

const toast = useToast()

const props = defineProps({
  buttonType: { type: String, default: 'love' },
  textContent: { type: String, default: 'Đi đến kỉ niệm' },
  widthButton: { type: String, default: 'w-full' },
  title: { type: String, default: 'Nhập mã để mở khóa' },
  description: { type: String, default: 'Vui lòng nhập mã 6 số để tiếp tục' },
  confirmButtonText: { type: String, default: 'Xác nhận' },
  cancelButtonText: { type: String, default: 'Đóng' },
  borderColor: { type: String, default: 'red' },
  correctOTP: { type: String, required: true },
  onSuccess: { type: Function, required: true }
})

const showPopup = ref(false)
const otpDigits = ref(['', '', '', '', '', ''])
const inputRefs = ref([])

const handleInput = (event, index) => {
  const value = event.target.value
  if (!/^\d*$/.test(value)) {
    otpDigits.value[index] = ''
    return
  }

  if (value && index < 5) {
    inputRefs.value[index + 1]?.focus()
  }
}

const handleKeydown = (event, index) => {
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    otpDigits.value[index - 1] = ''
    inputRefs.value[index - 1]?.focus()
  }
}

const handlePaste = (event) => {
  event.preventDefault()
  const pastedData = event.clipboardData.getData('text')
  const numbers = pastedData.replace(/\D/g, '').slice(0, 6)

  numbers.split('').forEach((num, index) => {
    if (index < 6) {
      otpDigits.value[index] = num
    }
  })
}

const verifyOTP = () => {
  const enteredOTP = otpDigits.value.join('')

  if (enteredOTP.length !== 6) {
    toast.error('Vui lòng nhập đủ 6 số', {
      timeout: 3000,
      position: "top-right"
    })
    return
  }

  if (enteredOTP === props.correctOTP) {
    toast.success('Mã chính xác!', {
      timeout: 2000,
      position: "top-right"
    })
    showPopup.value = false
    props.onSuccess()
  } else {
    toast.error('Mã không chính xác', {
      timeout: 3000,
      position: "top-right"
    })
    otpDigits.value = ['', '', '', '', '', '']
    inputRefs.value[0]?.focus()
  }
}

const closePopup = () => {
  showPopup.value = false
  otpDigits.value = ['', '', '', '', '', '']
}
</script>