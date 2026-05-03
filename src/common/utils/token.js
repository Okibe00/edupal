"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.hashToken = hashToken;
var crypto_1 = require("crypto");
function generateToken() {
    return crypto_1.default.randomBytes(32).toString('hex');
}
function hashToken(token) {
    return crypto_1.default.createHash('sha256').update(token).digest('hex');
}
