"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./routes/route"));
// import swaggerDocs from "./configs/swagger";
const morgan_1 = __importDefault(require("morgan"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const package_json_1 = require("../package.json");
const port = process.env.PORT ? Number(process.env.PORT) : 5000;
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version: package_json_1.version
        }
    },
    apis: ['dist/**/*.js']
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('tiny'));
// cors related settings
app.use((0, cors_1.default)());
// url encodings
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, { customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css' }));
// routes
app.use('/', route_1.default);
app.listen(port, () => {
    console.log(`server is running on ${port}`);
    // swaggerDocs(app, port)
});
