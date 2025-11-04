"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = exports.changeQuantity = exports.deleteItemFromCart = exports.addItemToCart = void 0;
const root_1 = require("../exceptions/root");
const badRequest_1 = require("../exceptions/badRequest");
const __1 = require("..");
const addItemToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const item = req.body;
    if (!item) {
        throw new badRequest_1.badRequest("couldn't get item data", root_1.ErrorCode.BAD_REQUEST);
    }
    const newItem = yield __1.prisma.cart.create({
        data: Object.assign(Object.assign({}, item), { userId: req.user.id })
    });
    res.status(201).json({
        message: "item added successfully", success: true, newItem
    });
});
exports.addItemToCart = addItemToCart;
const deleteItemFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.params.id;
    if (!itemId) {
        throw new badRequest_1.badRequest("couldn't get item data", root_1.ErrorCode.BAD_REQUEST);
    }
    const deleteItem = yield __1.prisma.cart.delete({
        where: {
            id: itemId
        }
    });
    res.status(201).json({
        message: "item deleted successfully", success: true, deleteItem
    });
});
exports.deleteItemFromCart = deleteItemFromCart;
const changeQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.params.id;
    const { quantity } = req.body;
    if (!itemId || !quantity) {
        throw new badRequest_1.badRequest("couldn't get item data", root_1.ErrorCode.BAD_REQUEST);
    }
    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
        throw new badRequest_1.badRequest("invalid quantity value", root_1.ErrorCode.BAD_REQUEST);
    }
    const changedQuantity = yield __1.prisma.cart.update({
        where: {
            id: itemId
        },
        data: {
            quantity: parsedQuantity
        }
    });
    res.status(201).json({
        message: "item updated successfully", success: true, changedQuantity
    });
});
exports.changeQuantity = changeQuantity;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getcart = req.user.id;
    if (!getcart) {
        throw new badRequest_1.badRequest("couldnot get id", root_1.ErrorCode.BAD_REQUEST);
    }
    const getCart = yield __1.prisma.cart.findMany({
        where: {
            userId: getcart,
        },
        include: {
            product: true
        }
    });
    res.status(201).json({
        message: "item updated successfully", success: true, getCart
    });
});
exports.getCart = getCart;
