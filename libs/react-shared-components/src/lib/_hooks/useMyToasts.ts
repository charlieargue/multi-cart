import { useToast } from '@chakra-ui/react';

export const useMyToasts = () => {
    const toast = useToast();

    const toastAttribs = (message: string) => ({
        isClosable: true,
        variant: "top-accent",
        title: message,
    });

    const toastError = (message: string) => toast({
        status: 'error',
        position: "top",
        ...toastAttribs(message)
    });

    const toastSuccess = (message: string) => toast({
        status: "success",
        position: "top",
        ...toastAttribs(message)
    });

    const toastInfo = (message: string) => toast({
        status: "info",
        position: "top",
        ...toastAttribs(message)
    });

    const toastWarning = (message: string) => toast({
        status: "warning",
        position: "top",
        ...toastAttribs(message)
    });

    return { toastInfo, toastWarning, toastError, toastSuccess };
};
export default useMyToasts;