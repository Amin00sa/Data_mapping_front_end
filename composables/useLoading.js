import {useLoadingStore} from "~/stores/useLoadingStore";

export function useLoading() {
    const loadingStore = useLoadingStore();
    const isLoading = computed(() => {
        const loading = loadingStore.loading
        if (loading.isLoading){
            return {
                getDatabases: loading.name === 'getDatabases',
                getFiles: loading.name === 'getFiles',
                getTableHeaders: loading.name === 'getTableHeaders',
                getTableData: loading.name === 'getTableData',
                postFiles: loading.name === 'postFiles',
                saveDatabase: loading.name === 'saveDatabase',
                connectDatabase: loading.name === 'connectDatabase',
                postDatabase: loading.name === 'postDatabase',
                deleteElement: loading.name === 'deleteElement',
                saveMapping: loading.name === 'saveMapping',
                updateDatabase: loading.name === 'updateDatabase',
                updateDataEntry: loading.name === 'updateDataEntry',
                deleteDataEntry: loading.name === 'deleteDataEntry',
            }
        }
        return {}
    })
    return {
        isLoading
    }
}