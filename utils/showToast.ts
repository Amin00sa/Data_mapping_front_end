import {useToast} from 'vue-toastification';

export default async (message: string, type: string = 'success') => {
    const toast= useToast()
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
        case 'info':
            toast.info(message);
            break;
    }
}