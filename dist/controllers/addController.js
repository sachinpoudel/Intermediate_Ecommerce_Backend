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
exports.listAddress = exports.updateAddress = exports.deleteAddress = exports.addAddress = void 0;
const badRequest_1 = require("../exceptions/badRequest");
const root_1 = require("../exceptions/root");
const __1 = require("..");
const userSchema_1 = require("../validations/userSchema");
const addAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const address = userSchema_1.addressSchema.parse(req.body);
    if (!address) {
        throw new badRequest_1.badRequest("couldnt get address data", root_1.ErrorCode.BAD_REQUEST);
    }
    const addAddress = yield __1.prisma.address.create({
        data: Object.assign(Object.assign({}, address), { userId: req.user.id })
    });
    res.status(201).json({
        message: "successfully got the address",
        success: true,
        addAddress
    });
});
exports.addAddress = addAddress;
const deleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const address = req.params.id;
    if (!address) {
        throw new badRequest_1.badRequest("couldnt get address data", root_1.ErrorCode.BAD_REQUEST);
    }
    const deleteAdd = yield __1.prisma.address.delete({
        where: {
            id: address.toString()
        }
    });
    res.status(201).json({
        message: "successfully deleted the address",
        success: true,
        deleteAdd
    });
});
exports.deleteAddress = deleteAddress;
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const address = req.params.id;
    if (!address) {
        throw new badRequest_1.badRequest("couldnt get address data", root_1.ErrorCode.BAD_REQUEST);
    }
    const updatedAddress = yield __1.prisma.address.update({
        where: {
            id: address.toString()
        },
        data: Object.assign({}, req.body)
    });
    res.status(201).json({
        message: "successfully updated the address",
        success: true,
        updatedAddress
    });
});
exports.updateAddress = updateAddress;
const listAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listAddress = yield __1.prisma.address.findMany({
        where: {
            userId: req.user.id
        }
    });
    res.status(201).json({
        message: "successfully listed the address",
        success: true,
        listAddress
    });
});
exports.listAddress = listAddress;
