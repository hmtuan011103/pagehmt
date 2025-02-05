import VueEasyLightbox from "vue-easy-lightbox";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './styles/client/main.css'
import router from './router'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(VueEasyLightbox)
const options = {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
}

app.use(Toast, options)
app.mount('#app')