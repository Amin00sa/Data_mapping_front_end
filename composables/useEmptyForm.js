
export function useEmptyForm(formData)
{
    if (formData && typeof formData === 'object' && formData.constructor === Object){
          Object.keys(formData).map((item)=>{
            formData[item] = ""
        })
        return formData
    }
}