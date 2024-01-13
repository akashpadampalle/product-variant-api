import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes/route";
import logger from "morgan"

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { version } from "../package.json";

const port = process.env.PORT ? Number(process.env.PORT) : 5000;

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version: version
        }
    },
    apis: ['dist/**/*.js']
}

const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use(logger('tiny'));

// cors related settings
app.use(cors());

// url encodings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, {customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css'}));

// routes
app.use('/', router);

app.listen(port, () => {
    console.log(`server is running on ${port}`)
});