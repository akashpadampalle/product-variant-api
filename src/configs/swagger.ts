import { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { version } from "../../package.json";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version: version
        }
    },
    apis: ['./src/routes/route.ts', './src/schemas/*.ts']
}

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Express, port: number) {
    //swagger page
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

    //Docs in JSON formate
    app.get("docs.json", (request: Request, response: Response) => {
        response.setHeader("Content-Type", "application/json");
        response.send(swaggerDocs);
    });
}

export default swaggerDocs;