"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Uploader = (function () {
    function Uploader() {
        this.url = '';
        this.name = '';
        this.headers = [];
        this.method = 'post';
        this.uploadType = 0;
        this.queue = [];
        this.isPreview = true;
        this.isCompress = false;
        this.handlers = {
            select: [],
            queue: [],
            queueAll: [],
            //    remove: [],
            upload: [],
            progress: [],
            success: [],
            overSize: [],
            overLength: [],
            error: [],
            complete: []
        };
    }
    /**
     * 触发
     */
    Uploader.prototype.trigger = function (handler, params) {
        var handlers = this.handlers[handler];
        if (handlers) {
            for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
                var fn = handlers_1[_i];
                if (params) {
                    fn.apply(this, params);
                }
                else {
                    fn.apply(this);
                }
            }
        }
    };
    /**
     * 上传
     */
    Uploader.prototype.upload = function () {
        var _this = this;
        var createData = function (index) {
            if (_this.uploadType === 0) {
                var uploadFile = _this.queue[index];
                var fd = new FormData();
                if (uploadFile.submitData && uploadFile.submitData instanceof Array) {
                    for (var _i = 0, _a = uploadFile.submitData; _i < _a.length; _i++) {
                        var o = _a[_i];
                        fd.append(o.name, o.value);
                    }
                }
                else {
                    fd.append(uploadFile.name || _this.name, uploadFile.getFile(0));
                }
                return fd;
            }
            else if (_this.uploadType === 1) {
            }
        };
        var submit = function (index, data) {
            var next = function () {
                index++;
                if (index < _this.queue.length) {
                    submit(index, createData(index));
                }
                else {
                    _this.trigger('complete', [_this]);
                }
            };
            var uploadFile = _this.queue[index];
            if (uploadFile.uploaded) {
                next();
                return;
            }
            var xhr = new XMLHttpRequest();
            uploadFile.xhr = xhr;
            xhr.open(_this.method.toLowerCase(), _this.url);
            for (var o in _this.headers) {
                xhr.setRequestHeader(o + '', _this.headers[o + '']);
            }
            //侦查当前附件上传情况
            xhr.upload.onprogress = function (evt) {
                var loaded = evt.loaded;
                var total = evt.total;
                var percent = Math.floor(100 * loaded / total); //已经上传的百分比
                uploadFile.progress = percent;
                _this.trigger('progress', [percent, uploadFile, _this, index]); //触发
            };
            xhr.onload = function () {
                uploadFile.uploaded = true;
                uploadFile.response = xhr.responseText;
                if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)) {
                    uploadFile.setError();
                }
                else {
                    _this.trigger('success', [uploadFile, _this, index]); //触发
                }
                next();
            };
            xhr.onerror = function (evt) {
                uploadFile.setError();
            };
            xhr.send(data);
        };
        this.trigger('upload', [this]); //触发
        submit(0, createData(0));
    };
    Uploader.prototype.compress = function (src, scale, quality) {
        return new Promise(function (resolve, reject) {
            if (quality < 0 || quality > 1) {
                quality = 1;
            }
            var localImg = new Image();
            localImg.src = src;
            localImg.onload = function (e) {
                var that = localImg;
                // 默认按比例压缩
                var comScale = parseFloat(scale + '');
                var w = that.width * comScale, h = that.height * comScale;
                //生成canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                // 创建属性节点
                var anw = document.createAttribute("width");
                anw.nodeValue = w + '';
                var anh = document.createAttribute("height");
                anh.nodeValue = h + '';
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(that, 0, 0, w, h);
                // 图像质量
                // quality值越小，所绘制出的图像越模糊
                var base64 = canvas.toDataURL('image/jpeg', parseFloat(quality + ''));
                // 回调函数返回base64的值
                resolve(base64);
            };
            localImg.onerror = function () {
                reject(src);
            };
        });
    };
    /**
     * base64转换
     * @param file
     */
    Uploader.prototype.createBase64 = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            // 读取File对象的数据
            reader.readAsDataURL(file);
            // 绑定load事件
            reader.onload = function (e) {
                resolve(reader.result);
            };
            reader.onerror = function () {
                reject(file);
            };
        });
    };
    /**
     * 获取base64数据的文件长度
     * @param base64Str
     * @returns {number}
     */
    Uploader.prototype.getBase64FileSize = function (base64Str) {
        var splitStr = base64Str.split(',');
        var str = splitStr[splitStr.length - 1].replace(/=/g, '');
        var strLength = str.length;
        return Math.round(strLength - (strLength / 8) * 2);
    };
    /**
     * 获取base64数据的data
     * @param base64Str
     * @returns {number}
     */
    Uploader.prototype.getBase64FileData = function (base64Str) {
        var splitStr = base64Str.split(',');
        return splitStr[splitStr.length - 1];
    };
    /*----------------------------------------生命周期------------------------------------------*/
    /**
     * 选中
     * @param fn
     */
    Uploader.prototype.onSelect = function (fn) {
        this.handlers.select.push(fn);
        return this;
    };
    /**
     * 超过大小
     * @param fn
     * @returns {Uploader}
     */
    Uploader.prototype.onOverSize = function (fn) {
        this.handlers.overSize.push(fn);
        return this;
    };
    /**
     * 超过数量
     * @param fn
     * @returns {Uploader}
     */
    Uploader.prototype.onOverLength = function (fn) {
        this.handlers.overLength.push(fn);
        return this;
    };
    /**
     * 单个文件入列
     * @param fn
     */
    Uploader.prototype.onQueue = function (fn) {
        this.handlers.queue.push(fn);
        return this;
    };
    /**
     * 全部文件入列
     * @param fn
     */
    Uploader.prototype.onQueueAll = function (fn) {
        this.handlers.queueAll.push(fn);
        return this;
    };
    /**
     * 上传
     * @param fn
     */
    Uploader.prototype.onUpload = function (fn) {
        this.handlers.upload.push(fn);
        return this;
    };
    /**
     * 上传中
     * @param fn
     */
    Uploader.prototype.onProgress = function (fn) {
        this.handlers.progress.push(fn);
        return this;
    };
    /**
     * 上传成功
     * @param fn
     */
    Uploader.prototype.onSuccess = function (fn) {
        this.handlers.success.push(fn);
        return this;
    };
    Uploader.prototype.onComplete = function (fn) {
        this.handlers.complete.push(fn);
        return this;
    };
    /**
     * 上传失败
     * @param fn
     */
    Uploader.prototype.onError = function (fn) {
        this.handlers.error.push(fn);
        return this;
    };
    return Uploader;
}());
exports.Uploader = Uploader;
//# sourceMappingURL=Uploader.js.map