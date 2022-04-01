"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("../controllers/auth");
var authRouter = express_1.default.Router();
authRouter.post('/signup', auth_1.signUpUser);
authRouter.post('/signin', auth_1.signInUser);
authRouter.post('/profile', auth_1.rememberPassword);
authRouter.patch('/profile', auth_1.editProfile);
authRouter.delete('/profile', auth_1.deleteUser);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map