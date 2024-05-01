export function useAddInputsForm() {
    function updateLastElement(index, formDataEntry) {
        formDataEntry.id[index] = index;
    }
    const removeElement = (index, formDataEntry) => {
        formDataEntry.id.splice(formDataEntry.id.indexOf(formDataEntry.id[index]), 1);
        formDataEntry.name.splice(formDataEntry.name.indexOf(formDataEntry.name[index]), 1);
        formDataEntry.type.splice(formDataEntry.type.indexOf(formDataEntry.type[index]), 1);
    }
    const addNewElement = (index, formDataEntry) => {
        formDataEntry.id[index] = null;
        formDataEntry.name[index] = null;
        formDataEntry.type[index] = 'Type';
    }

    return {addNewElement, updateLastElement, removeElement}
}