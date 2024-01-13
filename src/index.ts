import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes/route";
// import swaggerDocs from "./configs/swagger";
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
    apis: ['./src/routes/route.ts']
}

const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use(logger('tiny'));

// cors related settings
app.use(cors());

// url encodings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files :: used for api documentation
// app.use(express.static("public"));


// routes
app.use('/', router);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`server is running on ${port}`)
    // swaggerDocs(app, port)
});