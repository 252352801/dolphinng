"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Uploader_1 = require("./Uploader");
var UploadFile_1 = require("./UploadFile");
var UploaderDirective = (function () {
    function UploaderDirective(el) {
        var _this = this;
        this.el = el;
        this.el.nativeElement.addEventListener('change', function (event) {
            var ev = event || window.event;
            var target = ev.target || ev.srcElement;
            var files = target.files;
            for (var _i = 0, _a = _this.uploader.handlers.select; _i < _a.length; _i++) {
                var handler = _a[_i];
                handler(files);
            }
            _this.queueFiles(files);
        });
    }
    UploaderDirective.prototype.queue = function (uploadFile) {
        this.uploader.queue.push(uploadFile);
        this.uploader.trigger('queue', [uploadFile]);
    };
    UploaderDirective.prototype.triggerQueueAll = function () {
        this.uploader.trigger('queueAll', [this.uploader.queue]);
    };
    UploaderDirective.prototype.queueFiles = function (files) {
        var _this = this;
        var fn = function (index) {
            var file = files[index];
            var uploadFile = new UploadFile_1.UploadFile();
            uploadFile.fileName = file.name;
            uploadFile.fileType = file.type;
            uploadFile.fileSize = file.size;
            uploadFile.file = file;
            var fileNameSplit = file.name.split('.');
            uploadFile.fileExtension = '.' + fileNameSplit[fileNameSplit.length - 1];
            var check = function () {
                index++;
                if (index < files.length) {
                    fn(index);
                }
                else {
                    _this.triggerQueueAll();
                }
            };
            //检测合法性
            if (_this.uploader.maxSize && uploadFile.fileSize > _this.uploader.maxSize) {
                _this.uploader.trigger('overSize', [uploadFile]);
                _this.triggerQueueAll();
                return;
            }
            else if (_this.uploader.maxLength && _this.uploader.queue.length >= _this.uploader.maxLength) {
                console.log(_this.uploader.queue.length);
                _this.uploader.trigger('overLength', [_this.uploader.queue]);
                _this.triggerQueueAll();
                return;
            }
            if (_this.uploader.isCompress) {
                if (uploadFile.fileType.indexOf('image/') >= 0) {
                    _this.uploader.createBase64(file)
                        .then(function (data) {
                        uploadFile.dataUrl = data;
                        var scale = _this.compressScale || 1, quality = _this.compressQuality || 0.7;
                        return _this.uploader.compress(data, scale, quality);
                    })
                        .then(function (dataUrl) {
                        uploadFile.compressed = true;
                        uploadFile.fileSize = _this.uploader.getBase64FileSize(dataUrl);
                        uploadFile.compressedDataUrl = dataUrl;
                        //queue
                        _this.queue(uploadFile);
                        check();
                    });
                }
                else {
                    //queue
                    _this.queue(uploadFile);
                    check();
                }
            }
            else {
                if (_this.uploader.uploadType === 1 || _this.uploader.isPreview) {
                    _this.uploader.createBase64(file)
                        .then(function (data) {
                        uploadFile.fileSize = _this.uploader.getBase64FileSize(data);
                        uploadFile.dataUrl = data;
                        //queue
                        _this.queue(uploadFile);
                        check();
                    });
                }
                else {
                    _this.queue(uploadFile);
                    check();
                }
            }
        };
        fn(0);
    };
    return UploaderDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Uploader_1.Uploader)
], UploaderDirective.prototype, "uploader", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], UploaderDirective.prototype, "compressScale", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], UploaderDirective.prototype, "compressQuality", void 0);
UploaderDirective = __decorate([
    core_1.Directive({
        selector: '[uploader]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], UploaderDirective);
exports.UploaderDirective = UploaderDirective;
//# sourceMappingURL=uploader.directive.js.map