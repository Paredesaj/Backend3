import { Router } from "express";
import { generateMockUsers, insertMockUsers } from "../services/mockService.js";
import { User } from "../models/user.model.js";
import { Pet } from "../models/pet.model.js";

const router = Router();

// Endpoint GET para generar 50 usuarios mock
router.get("/mockingusers", (req, res) => {
    const mockUsers = generateMockUsers(50);
    res.json({ users: mockUsers });
});

// Endpoint POST para insertar datos en la base de datos
router.post("/generateData", async (req, res) => {
    try {
        const { users, pets } = req.body;
        if (!users || !pets) return res.status(400).json({ error: "Faltan parámetros" });

        await insertMockUsers(users);

        // Insertar mascotas con referencia a usuarios creados
        const userDocs = await User.find().limit(users);
        const petData = [];
        for (let i = 0; i < pets; i++) {
            petData.push({
                name: faker.animal.cat(),
                age: faker.number.int({ min: 1, max: 15 }),
                type: "cat",
                owner: faker.helpers.arrayElement(userDocs)._id
            });
        }
        await Pet.insertMany(petData);

        res.json({ message: "Datos generados correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al generar datos" });
    }
});

export default router;
