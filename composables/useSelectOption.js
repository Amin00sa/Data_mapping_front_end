export function useSelectOption() {
    let selectedElement = ref(null);

    function selectIfNotExist(element) {
        selectedElement.value = element
    }

    return {selectedElement, selectIfNotExist}
}