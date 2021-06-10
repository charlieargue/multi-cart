import { useToast } from '@chakra-ui/react';

export const useMyToasts = () => {
    const toast = useToast();

    const toastError = (message: string) => toast({
        title: message,
        status: 'error',
        isClosable: true,
        variant: "top-accent",
        position: "top-right",
    });

    const toastSuccess = (message: string) => toast({
        title: message,
        variant: "top-accent",
        position: "top",
        status: "success",
        isClosable: true,
    });

    return { toastError, toastSuccess };
};
export default useMyToasts;