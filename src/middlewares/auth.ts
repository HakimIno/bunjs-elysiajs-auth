import { Elysia } from "elysia";
import { prisma } from "../libs/prisma";



export const isAuthenticated = (app: Elysia) =>
    app.derive(async ({ cookie, jwt, set }: any) => {
        console.log(cookie);

        if (!cookie!.access_token) {
            set.status = 401;

            return {
                success: false,
                data: null,
                message: "Unauthorized"
            };
        }

        const { userId } = await jwt.verify(cookie!.access_token);

        console.log(userId)

        if (!userId) {
            set.status = 401;

            return {
                success: false,
                data: null,
                message: "Unauthorized"
            };
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        console.log(user)

        if (!user) {
            set.status = 401;

            return {
                success: false,
                data: null,
                message: "Unauthorized"
            };
        }

        return {
            user
        }
    })