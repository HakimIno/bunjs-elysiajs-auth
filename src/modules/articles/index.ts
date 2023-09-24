import Elysia, { t } from "elysia";
import { prisma } from "../../libs/prisma";
import { isAuthenticated } from "../../middlewares/auth";

export const articles = (app: Elysia) =>
    app.group("/articles", (app) =>
        app.get("/", async () => {
            const article = await prisma.article.findMany();

            return {
                success: true,
                message: "Fetch articles",
                data: {
                    article
                }
            }
        })
            .get("/:query", async ({ params: { query } }) => {
                const article = await prisma.article.findMany({
                    where: {
                        OR: [
                            { title: { contains: query, mode: 'insensitive' } },
                            { description: { contains: query, mode: 'insensitive' } }
                        ]
                    }
                })

                return {
                    success: true,
                    message: "Search articles",
                    data: {
                        article
                    }
                }
            })
            .use(isAuthenticated)
            .post("/", async ({ body, user }) => {
                const article = await prisma.article.create({
                    data: {
                        authorId: user!.id,
                        ...body,
                    },
                });

                return {
                    success: true,
                    message: "Article created",
                    data: {
                        article,
                    },
                };
            },
                {
                    body: t.Object({
                        title: t.String(),
                        bodyMarkdown: t.String(),
                        published: t.Optional(t.Boolean({ default: false })),
                        mainImage: t.Optional(t.String()),
                        canonicalUrl: t.Optional(t.String()),
                        description: t.String(),
                        tags: t.String(),
                        organisationId: t.Optional(t.String()),
                    })
                }
            )
    )
