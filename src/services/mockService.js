import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { User } from "../models/user.model.js";

export const generateMockUsers = (numUsers = 50) => {
    const users = [];
    const passwordHash = bcrypt.hashSync("coder123", 10);

    for (let i = 0; i < numUsers; i++) {
        users.push({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: passwordHash,
            role: faker.helpers.arrayElement(["user", "admin"]),
            pets: []
        });
    }
    return users;
};

export const insertMockUsers = async (numUsers) => {
    const users = generateMockUsers(numUsers);
    return await User.insertMany(users);
};
