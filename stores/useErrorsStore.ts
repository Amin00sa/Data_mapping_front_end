import {defineStore} from "pinia";

export const useErrorsStore = defineStore('useErrors', () => {
    const errors = ref([]);
    const setErrors = (errorsList: any) => {
        errors.value = errorsList;
    }
    const reset = () => {
        errors.value = []
    }
    return {
        errors,
        setErrors,
        reset
    }
})
