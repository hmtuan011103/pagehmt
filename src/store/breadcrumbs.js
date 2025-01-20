import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBreadcrumbsStore = defineStore('breadcrumbs', () => {
    const pages = ref([
        { name: 'Gia đình', href: '/', current: false }
    ])

    function setPages(newPages) {
        pages.value = newPages
    }

    return { pages, setPages }
})