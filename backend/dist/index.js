"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const secret_1 = require("./secret");
const rootRoute_1 = __importDefault(require("./routes/rootRoute"));
const prisma_1 = require("../generated/prisma");
const errorMiddleware_1 = require("./middlwares/errorMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", rootRoute_1.default);
exports.prisma = new prisma_1.PrismaClient();
app.use(errorMiddleware_1.errorMiddleware);
app.listen(secret_1.PORT, () => {
    console.log("running success");
});
