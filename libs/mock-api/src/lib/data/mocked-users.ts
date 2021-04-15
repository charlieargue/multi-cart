import { User } from '@multi-cart/react-data-access';


export const users: User[] = [{
        id: 1,
        username: "mocked-user",
        email: "mock@gmail.com",
        currentCartId: 1,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
} as User];
