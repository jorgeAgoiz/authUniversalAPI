"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("./routes/auth"));
var app = (0, express_1.default)();
app.use(auth_1.default);
app.listen(3012, function () {
    console.log("Listen on port 3012...");
});
/* Posible BBDD https://firebase.google.com/docs/firestore/quickstart */ 
//# sourceMappingURL=index.js.map