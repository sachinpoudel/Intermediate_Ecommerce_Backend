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
exports.getProductById = exports.listProduct = exports.updateProduct = exports.deleteProduct = exports.createProduct = void 0;
const __1 = require("..");
const root_1 = require("../exceptions/root");
const badRequest_1 = require("../exceptions/badRequest");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    if (!product) {
        throw new badRequest_1.badRequest("details not received", root_1.ErrorCode.NOT_FOUND);
    }
    const productCreate = yield __1.prisma.product.create({
        data: Object.assign(Object.assign({}, product), { tags: product.tags.join(",") })
    });
    res.status(200).json(productCreate);
});
exports.createProduct = createProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    if (!productId) {
        throw new badRequest_1.badRequest("id didnt received", root_1.ErrorCode.BAD_REQUEST);
    }
    const deleteProducted = yield __1.prisma.product.delete({
        where: {
            id: productId.toString()
        }
    });
    res.status(201).json({
        message: "product delete successfully",
        success: true,
        deleteProducted
    });
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    if (!product) {
        throw new badRequest_1.badRequest("failed to received details", root_1.ErrorCode.BAD_REQUEST);
    }
    if (product.tags) {
        product.tags = product.tags.join(",");
    }
    const updateProduct = yield __1.prisma.product.update({
        where: {
            id: req.params.id
        },
        data: Object.assign({}, product)
    });
    res.json({ message: "updated successfully", success: true, updateProduct });
});
exports.updateProduct = updateProduct;
const listProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield __1.prisma.product.count();
    const listingProduct = req.query.skip;
    const listProduct = yield __1.prisma.product.findMany({
        skip: listingProduct ? parseInt(listingProduct.toString(), 10) : 0,
        take: 10
    });
    res.status(200).json({
        message: "product listed successfully",
        success: true,
        count,
        listProduct
    });
});
exports.listProduct = listProduct;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    if (!productId) {
        throw new badRequest_1.badRequest("id not received", root_1.ErrorCode.BAD_REQUEST);
    }
    const product = yield __1.prisma.product.findUnique({
        where: {
            id: productId.toString()
        }
    });
    res.status(200).json({
        message: "product found successfully",
        success: true,
        product
    });
});
exports.getProductById = getProductById;
