"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./routes/route"));
const swagger_1 = __importDefault(require("./configs/swagger"));
const morgan_1 = __importDefault(require("morgan"));
const port = Number(process.env.PORT) || 5000;
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('tiny'));
// cors related settings
app.use((0, cors_1.default)());
// url encodings
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// serve static files :: used for api documentation
app.use(express_1.default.static("public"));
// routes
app.use('/', route_1.default);
app.listen(port, () => {
    console.log(`server is running on ${port}`);
    (0, swagger_1.default)(app, port);
});
