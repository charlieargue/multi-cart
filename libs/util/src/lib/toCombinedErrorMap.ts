// NOTE: see FYI/fe/graphql-ERROR-OBJECTS.md
interface CombinedError {
    message: string;
};

export const toCombinedErrorMap = (errors: CombinedError[]) => {

    const errorMap: Record<string, string> = {};
    errors.forEach(({ message }) => {
        console.log(`🚀 ~ message`, message);
        // NOTE: try to sniff out these non-field oriented LAMBDA errors and figure out field, if any...
        if (message.includes("password")) {
            errorMap["password"] = message;
        } else if (message.includes("username")) {
            errorMap["username"] = message;
        } else {
            // handle unexpected errors
            throw new Error(message);
        }
    });

    return errorMap;
};