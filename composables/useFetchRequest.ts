import {useErrorsStore} from "~/stores/useErrorsStore";
import {useLoadingStore} from "~/stores/useLoadingStore";
// @ts-ignore
import showToast from "~/utils/showToast";

export function useFetchRequest() {
    const fetchResult = reactive({
        data: null
    });
    let options = reactive({
        baseURL: 'http://127.0.0.1:8000/api/',
        query: {},
        body: {},
        watch: false,
        immediate: false,
        method: 'GET',
        loadingName: ''
    })
    const {setErrors, reset} = useErrorsStore();
    const loadingStore = useLoadingStore();
    const fetchRequest = async (url: string, optionsList = {}) => {
        options = {...options, ...optionsList}
        fetchResult.data = await $fetch(url, {
            // @ts-ignore
            method: options.method,
            headers: {
                'Accept': 'application/json',
            },
            baseURL: options.baseURL,
            query: options.query,
            ...(options.method !== 'GET' && {body: options.body}),
            onRequest() {
                loadingStore.setLoading(options.loadingName, true)
            },
            onResponse({response}) {
                loadingStore.setLoading(options.loadingName, false)
                if ([200, 201].includes(response.status) && options.method !== 'GET') {
                    reset()
                }
            },
            onResponseError({response}) {
                if (response.status === 422)
                    setErrors(response._data.errors);
                else {
                    reset();
                    /* showError({
                         message: response.status === 404 ? 'Resource Not found' : 'Server Error',
                         statusCode: response.status
                     })*/
                }
                showToast(response._data.message, 'error')
            }
        });
    }

    return {fetchResult, fetchRequest}
}