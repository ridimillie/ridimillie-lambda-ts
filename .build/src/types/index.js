"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribePrice = exports.ServiceType = exports.Platforms = void 0;
var ServiceType;
(function (ServiceType) {
    ServiceType["PURCHASE"] = "purchase";
    ServiceType["SUBSCRIBE"] = "subscribe";
})(ServiceType || (ServiceType = {}));
exports.ServiceType = ServiceType;
var Platforms;
(function (Platforms) {
    Platforms["RIDI"] = "\uB9AC\uB514\uBD81\uC2A4";
    Platforms["MILLIE"] = "\uBC00\uB9AC\uC758\uC11C\uC7AC";
    Platforms["YES24"] = "\uC608\uC2A424";
    Platforms["KYOBO"] = "\uC778\uD130\uB137 \uAD50\uBCF4\uBB38\uACE0";
    Platforms["KYOBO_BASIC"] = "sam\uBCA0\uC774\uC9C1";
    Platforms["KYOBO_UNLIMITED"] = "sam\uBB34\uC81C\uD55C";
    Platforms["ALADIN"] = "\uC54C\uB77C\uB518";
    Platforms["INTERPARK"] = "\uC778\uD130\uD30C\uD06C \uB3C4\uC11C";
    Platforms["NAVER"] = "\uB124\uC774\uBC84 \uC2DC\uB9AC\uC988";
})(Platforms || (Platforms = {}));
exports.Platforms = Platforms;
var SubscribePrice;
(function (SubscribePrice) {
    SubscribePrice[SubscribePrice["RIDI"] = 9900] = "RIDI";
    SubscribePrice[SubscribePrice["MILLIE"] = 9900] = "MILLIE";
    SubscribePrice[SubscribePrice["YES24"] = 5500] = "YES24";
    SubscribePrice[SubscribePrice["KYOBO_BASIC"] = 7000] = "KYOBO_BASIC";
    SubscribePrice[SubscribePrice["KYOBO_UNLIMITED"] = 9900] = "KYOBO_UNLIMITED";
})(SubscribePrice || (SubscribePrice = {}));
exports.SubscribePrice = SubscribePrice;
//# sourceMappingURL=index.js.map