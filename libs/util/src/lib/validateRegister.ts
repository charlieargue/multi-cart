import { UsernamePasswordInput } from "@multi-cart/react-data-access";

export const validateRegister = (options: UsernamePasswordInput) => {

    if (options.username.includes("@")) {
        return [{
            field: "username",
            message: "cannnot include an AT / @ sign"
        }]
    }

    if (!options.email.includes("@")) {
        return [{
            field: "email",
            message: "invalid email KISS"
        }]
    }
    if (options.username.length <= 2) {
        return [{
            field: "username",
            message: "length must be greater than 2"
        }]
    }
    if (options.password.length <= 3) {
        return [{
            field: "password",
            message: "length must be greater than 3"
        }]
    }

    return null;
};
