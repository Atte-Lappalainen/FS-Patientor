"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./controllers/router"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 3001;
const requestLogger = (request, _response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
};
const app = (0, express_1.default)();
app.use(express_1.default.static('dist'));
app.use(requestLogger);
app.use(express_1.default.json());
app.use(requestLogger);
app.use((0, cors_1.default)());
app.use('/api', router_1.default);
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
