"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("../controllers/auth");
var authRouter = express_1.default.Router();
authRouter.post("/", auth_1.signUpUser);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map