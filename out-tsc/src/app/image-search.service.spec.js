"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var image_search_service_1 = require("./image-search.service");
describe('ImageSearchService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [image_search_service_1.ImageSearchService]
        });
    });
    it('should be created', testing_1.inject([image_search_service_1.ImageSearchService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=image-search.service.spec.js.map