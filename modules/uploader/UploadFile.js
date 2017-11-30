"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UploadFile = (function () {
    function UploadFile() {
        this.compressed = false;
        this.progress = 0;
        this.uploaded = false;
        this.success = false;
        this.error = false;
        this.response = null;
        this.submitData = [];
    }
    UploadFile.prototype.setSuccess = function () {
        this.success = true;
        this.error = false;
    };
    UploadFile.prototype.setError = function () {
        this.success = false;
        this.error = true;
    };
    /**
     * 获取(要提交)的文件
     * @param type 0:Filed/Blob对象 1:Base64数据
     */
    UploadFile.prototype.getFile = function (type) {
        var result;
        if (type === 1) {
            if (this.compressed) {
                result = this.compressedDataUrl;
            }
            else {
                result = this.dataUrl;
            }
        }
        else {
            if (this.compressed) {
                result = this.createBlob(this.compressedDataUrl);
            }
            else {
                result = this.file;
            }
        }
        return result;
    };
    UploadFile.prototype.addSubmitData = function (name, value) {
        if (!(this.submitData instanceof Array)) {
            this.submitData = [];
        }
        this.submitData.push({
            name: name,
            value: value
        });
    };
    /**
     * 创建Blob存储文件数据
     * @param dataUrl
     */
    UploadFile.prototype.createBlob = function (dataUrl) {
        var arr = dataUrl.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1].replace(/\s/g, ''));
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime }); //值，类型
    };
    return UploadFile;
}());
exports.UploadFile = UploadFile;
//# sourceMappingURL=UploadFile.js.map