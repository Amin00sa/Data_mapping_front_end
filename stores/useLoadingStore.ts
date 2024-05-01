import {defineStore} from "pinia";

export const useLoadingStore = defineStore('loadingStore', () => {
    const loading = ref({
        name: '',
        isLoading: false
    })
    const setLoading=(loadingName:string,isActive:boolean)=>{
        loading.value={
            name:loadingName,
            isLoading: isActive
        }
    }
    return {
        loading,
        setLoading
    }
})