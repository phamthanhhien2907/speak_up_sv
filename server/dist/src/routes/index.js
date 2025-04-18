"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRoutes = void 0;
const user_1 = __importDefault(require("./user"));
const course_1 = __importDefault(require("./course"));
const enrollment_1 = __importDefault(require("./enrollment"));
const exerciseVocabulary_1 = __importDefault(require("./exerciseVocabulary"));
const exercise_1 = __importDefault(require("./exercise"));
const feedback_1 = __importDefault(require("./feedback"));
const history_1 = __importDefault(require("./history"));
const lesson_1 = __importDefault(require("./lesson"));
const lessonProgress_1 = __importDefault(require("./lessonProgress"));
const progressTracking_1 = __importDefault(require("./progressTracking"));
const vocabulary_1 = __importDefault(require("./vocabulary"));
const initRoutes = (app) => {
    app.use("/api/users", user_1.default);
    app.use("/api/courses", course_1.default);
    app.use("/api/vocabulary", vocabulary_1.default);
    app.use("/api/history", history_1.default);
    app.use("/api/lessonProgress", lessonProgress_1.default);
    app.use("/api/lesson", lesson_1.default);
    app.use("/api/exercise", exercise_1.default);
    app.use("/api/exerciseVocabulary", exerciseVocabulary_1.default);
    app.use("/api/feedback", feedback_1.default);
    app.use("/api/enrollment", enrollment_1.default);
    app.use("/api/progressTracking", progressTracking_1.default);
};
exports.initRoutes = initRoutes;
