"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtSecret = process.env.TOKEN_SECRET;
if (!jwtSecret) {
    throw new Error("JWT secret is missing in environment variables.");
}
exports.default = {
    jwtSecret,
    jwtSession: { session: false },
};
