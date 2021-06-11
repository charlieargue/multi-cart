// thx: https://stackoverflow.com/a/19605207/6200791
export const passwordAttributes = {
    "minLength": "8",
    "title": "Password needs to have atleast one: special character, upper AND lowercase letters, and a number",
    "pattern": "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
    "muted": "Include: a special symbol, an upper AND lowercase letter, and a number please 🙏."
};