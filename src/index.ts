import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes/route";
import swaggerDocs from "./configs/swagger";
import logger from "morgan"
const port = process.env.PORT ? Number(process.env.PORT) : 5000;

const app = express();

app.use(logger('tiny'));

// cors related settings
app.use(cors());

// url encodings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files :: used for api documentation
app.use(express.static("public"));


// routes
app.use('/', router);


app.listen(port, () => {
    console.log(`server is running on ${port}`)
    swaggerDocs(app, port)
});