"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const clova_cek_sdk_nodejs_1 = require("@line/clova-cek-sdk-nodejs");
const express = require("express");
const app = express();
const launchHandler = (responseHelper) => __awaiter(this, void 0, void 0, function* () {
    responseHelper.setSimpleSpeech(clova_cek_sdk_nodejs_1.SpeechBuilder.createSpeechText('おはよう'));
});
const intentHandler = (responseHelper) => __awaiter(this, void 0, void 0, function* () {
    const intent = responseHelper.getIntentName();
    const sessionId = responseHelper.getSessionId();
    switch (intent) {
        case 'KinokoIntent':
            responseHelper.setSimpleSpeech(clova_cek_sdk_nodejs_1.SpeechBuilder.createSpeechText('きのこのこのこ元気の子'));
            break;
        case 'Clova.YesIntent':
            responseHelper.setSimpleSpeech(clova_cek_sdk_nodejs_1.SpeechBuilder.createSpeechText('はいはい'));
            break;
        case 'Clova.NoIntent':
            responseHelper.setSimpleSpeech(clova_cek_sdk_nodejs_1.SpeechBuilder.createSpeechText('いえいえ'));
            break;
        default:
            responseHelper.setSimpleSpeech(clova_cek_sdk_nodejs_1.SpeechBuilder.createSpeechText('なんなん'));
            break;
    }
});
const sessionEndedHandler = (responseHelper) => __awaiter(this, void 0, void 0, function* () { });
// TypeScript だと RequestHandler 型にしないと怒られるのでとりあえず any で逃げる
const clovaHandler = clova_cek_sdk_nodejs_1.Client
    .configureSkill()
    .onLaunchRequest(launchHandler)
    .onIntentRequest(intentHandler)
    .onSessionEndedRequest(sessionEndedHandler)
    .handle();
const clovaMiddleware = clova_cek_sdk_nodejs_1.Middleware({ applicationId: process.env.APPLICATION_ID });
app.post('/clova', clovaMiddleware, clovaHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
//# sourceMappingURL=index.js.map