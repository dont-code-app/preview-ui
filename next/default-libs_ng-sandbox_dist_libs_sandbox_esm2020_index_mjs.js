(self["webpackChunkpreview_ui"] = self["webpackChunkpreview_ui"] || []).push([["default-libs_ng-sandbox_dist_libs_sandbox_esm2020_index_mjs"],{

/***/ 3849:
/*!************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/oblivious-set@1.1.1/node_modules/oblivious-set/dist/es/index.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObliviousSet": () => (/* binding */ ObliviousSet),
/* harmony export */   "now": () => (/* binding */ now),
/* harmony export */   "removeTooOldValues": () => (/* binding */ removeTooOldValues)
/* harmony export */ });
/**
 * this is a set which automatically forgets
 * a given entry when a new entry is set and the ttl
 * of the old one is over
 */
var ObliviousSet = /** @class */function () {
  function ObliviousSet(ttl) {
    this.ttl = ttl;
    this.map = new Map();
    /**
     * Creating calls to setTimeout() is expensive,
     * so we only do that if there is not timeout already open.
     */
    this._to = false;
  }
  ObliviousSet.prototype.has = function (value) {
    return this.map.has(value);
  };
  ObliviousSet.prototype.add = function (value) {
    var _this = this;
    this.map.set(value, now());
    /**
     * When a new value is added,
     * start the cleanup at the next tick
     * to not block the cpu for more important stuff
     * that might happen.
     */
    if (!this._to) {
      this._to = true;
      setTimeout(function () {
        _this._to = false;
        removeTooOldValues(_this);
      }, 0);
    }
  };
  ObliviousSet.prototype.clear = function () {
    this.map.clear();
  };
  return ObliviousSet;
}();

/**
 * Removes all entries from the set
 * where the TTL has expired
 */
function removeTooOldValues(obliviousSet) {
  var olderThen = now() - obliviousSet.ttl;
  var iterator = obliviousSet.map[Symbol.iterator]();
  /**
   * Because we can assume the new values are added at the bottom,
   * we start from the top and stop as soon as we reach a non-too-old value.
   */
  while (true) {
    var next = iterator.next().value;
    if (!next) {
      return; // no more elements
    }
    var value = next[0];
    var time = next[1];
    if (time < olderThen) {
      obliviousSet.map.delete(value);
    } else {
      // We reached a value that is not old enough
      return;
    }
  }
}
function now() {
  return new Date().getTime();
}

/***/ }),

/***/ 5527:
/*!************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/ReplaySubject.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReplaySubject": () => (/* binding */ ReplaySubject)
/* harmony export */ });
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subject */ 8837);
/* harmony import */ var _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduler/dateTimestampProvider */ 8680);


class ReplaySubject extends _Subject__WEBPACK_IMPORTED_MODULE_0__.Subject {
  constructor(_bufferSize = Infinity, _windowTime = Infinity, _timestampProvider = _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_1__.dateTimestampProvider) {
    super();
    this._bufferSize = _bufferSize;
    this._windowTime = _windowTime;
    this._timestampProvider = _timestampProvider;
    this._buffer = [];
    this._infiniteTimeWindow = true;
    this._infiniteTimeWindow = _windowTime === Infinity;
    this._bufferSize = Math.max(1, _bufferSize);
    this._windowTime = Math.max(1, _windowTime);
  }
  next(value) {
    const {
      isStopped,
      _buffer,
      _infiniteTimeWindow,
      _timestampProvider,
      _windowTime
    } = this;
    if (!isStopped) {
      _buffer.push(value);
      !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
    }
    this._trimBuffer();
    super.next(value);
  }
  _subscribe(subscriber) {
    this._throwIfClosed();
    this._trimBuffer();
    const subscription = this._innerSubscribe(subscriber);
    const {
      _infiniteTimeWindow,
      _buffer
    } = this;
    const copy = _buffer.slice();
    for (let i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
      subscriber.next(copy[i]);
    }
    this._checkFinalizedStatuses(subscriber);
    return subscription;
  }
  _trimBuffer() {
    const {
      _bufferSize,
      _timestampProvider,
      _buffer,
      _infiniteTimeWindow
    } = this;
    const adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
    _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
    if (!_infiniteTimeWindow) {
      const now = _timestampProvider.now();
      let last = 0;
      for (let i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
        last = i;
      }
      last && _buffer.splice(0, last + 1);
    }
  }
}

/***/ }),

/***/ 1211:
/*!*************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/firstValueFrom.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "firstValueFrom": () => (/* binding */ firstValueFrom)
/* harmony export */ });
/* harmony import */ var _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/EmptyError */ 9721);
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscriber */ 1346);


function firstValueFrom(source, config) {
  const hasConfig = typeof config === 'object';
  return new Promise((resolve, reject) => {
    const subscriber = new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber({
      next: value => {
        resolve(value);
        subscriber.unsubscribe();
      },
      error: reject,
      complete: () => {
        if (hasConfig) {
          resolve(config.defaultValue);
        } else {
          reject(new _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__.EmptyError());
        }
      }
    });
    source.subscribe(subscriber);
  });
}

/***/ }),

/***/ 8108:
/*!******************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/dom/WebSocketSubject.js ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebSocketSubject": () => (/* binding */ WebSocketSubject)
/* harmony export */ });
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Subject */ 8837);
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Subscriber */ 1346);
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Observable */ 8271);
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Subscription */ 5339);
/* harmony import */ var _ReplaySubject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ReplaySubject */ 5527);





const DEFAULT_WEBSOCKET_CONFIG = {
  url: '',
  deserializer: e => JSON.parse(e.data),
  serializer: value => JSON.stringify(value)
};
const WEBSOCKETSUBJECT_INVALID_ERROR_OBJECT = 'WebSocketSubject.error must be called with an object with an error code, and an optional reason: { code: number, reason: string }';
class WebSocketSubject extends _Subject__WEBPACK_IMPORTED_MODULE_0__.AnonymousSubject {
  constructor(urlConfigOrSource, destination) {
    super();
    this._socket = null;
    if (urlConfigOrSource instanceof _Observable__WEBPACK_IMPORTED_MODULE_1__.Observable) {
      this.destination = destination;
      this.source = urlConfigOrSource;
    } else {
      const config = this._config = Object.assign({}, DEFAULT_WEBSOCKET_CONFIG);
      this._output = new _Subject__WEBPACK_IMPORTED_MODULE_0__.Subject();
      if (typeof urlConfigOrSource === 'string') {
        config.url = urlConfigOrSource;
      } else {
        for (const key in urlConfigOrSource) {
          if (urlConfigOrSource.hasOwnProperty(key)) {
            config[key] = urlConfigOrSource[key];
          }
        }
      }
      if (!config.WebSocketCtor && WebSocket) {
        config.WebSocketCtor = WebSocket;
      } else if (!config.WebSocketCtor) {
        throw new Error('no WebSocket constructor can be found');
      }
      this.destination = new _ReplaySubject__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject();
    }
  }
  lift(operator) {
    const sock = new WebSocketSubject(this._config, this.destination);
    sock.operator = operator;
    sock.source = this;
    return sock;
  }
  _resetState() {
    this._socket = null;
    if (!this.source) {
      this.destination = new _ReplaySubject__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject();
    }
    this._output = new _Subject__WEBPACK_IMPORTED_MODULE_0__.Subject();
  }
  multiplex(subMsg, unsubMsg, messageFilter) {
    const self = this;
    return new _Observable__WEBPACK_IMPORTED_MODULE_1__.Observable(observer => {
      try {
        self.next(subMsg());
      } catch (err) {
        observer.error(err);
      }
      const subscription = self.subscribe({
        next: x => {
          try {
            if (messageFilter(x)) {
              observer.next(x);
            }
          } catch (err) {
            observer.error(err);
          }
        },
        error: err => observer.error(err),
        complete: () => observer.complete()
      });
      return () => {
        try {
          self.next(unsubMsg());
        } catch (err) {
          observer.error(err);
        }
        subscription.unsubscribe();
      };
    });
  }
  _connectSocket() {
    const {
      WebSocketCtor,
      protocol,
      url,
      binaryType
    } = this._config;
    const observer = this._output;
    let socket = null;
    try {
      socket = protocol ? new WebSocketCtor(url, protocol) : new WebSocketCtor(url);
      this._socket = socket;
      if (binaryType) {
        this._socket.binaryType = binaryType;
      }
    } catch (e) {
      observer.error(e);
      return;
    }
    const subscription = new _Subscription__WEBPACK_IMPORTED_MODULE_3__.Subscription(() => {
      this._socket = null;
      if (socket && socket.readyState === 1) {
        socket.close();
      }
    });
    socket.onopen = evt => {
      const {
        _socket
      } = this;
      if (!_socket) {
        socket.close();
        this._resetState();
        return;
      }
      const {
        openObserver
      } = this._config;
      if (openObserver) {
        openObserver.next(evt);
      }
      const queue = this.destination;
      this.destination = _Subscriber__WEBPACK_IMPORTED_MODULE_4__.Subscriber.create(x => {
        if (socket.readyState === 1) {
          try {
            const {
              serializer
            } = this._config;
            socket.send(serializer(x));
          } catch (e) {
            this.destination.error(e);
          }
        }
      }, err => {
        const {
          closingObserver
        } = this._config;
        if (closingObserver) {
          closingObserver.next(undefined);
        }
        if (err && err.code) {
          socket.close(err.code, err.reason);
        } else {
          observer.error(new TypeError(WEBSOCKETSUBJECT_INVALID_ERROR_OBJECT));
        }
        this._resetState();
      }, () => {
        const {
          closingObserver
        } = this._config;
        if (closingObserver) {
          closingObserver.next(undefined);
        }
        socket.close();
        this._resetState();
      });
      if (queue && queue instanceof _ReplaySubject__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject) {
        subscription.add(queue.subscribe(this.destination));
      }
    };
    socket.onerror = e => {
      this._resetState();
      observer.error(e);
    };
    socket.onclose = e => {
      if (socket === this._socket) {
        this._resetState();
      }
      const {
        closeObserver
      } = this._config;
      if (closeObserver) {
        closeObserver.next(e);
      }
      if (e.wasClean) {
        observer.complete();
      } else {
        observer.error(e);
      }
    };
    socket.onmessage = e => {
      try {
        const {
          deserializer
        } = this._config;
        observer.next(deserializer(e));
      } catch (err) {
        observer.error(err);
      }
    };
  }
  _subscribe(subscriber) {
    const {
      source
    } = this;
    if (source) {
      return source.subscribe(subscriber);
    }
    if (!this._socket) {
      this._connectSocket();
    }
    this._output.subscribe(subscriber);
    subscriber.add(() => {
      const {
        _socket
      } = this;
      if (this._output.observers.length === 0) {
        if (_socket && (_socket.readyState === 1 || _socket.readyState === 0)) {
          _socket.close();
        }
        this._resetState();
      }
    });
    return subscriber;
  }
  unsubscribe() {
    const {
      _socket
    } = this;
    if (_socket && (_socket.readyState === 1 || _socket.readyState === 0)) {
      _socket.close();
    }
    this._resetState();
    super.unsubscribe();
  }
}

/***/ }),

/***/ 5482:
/*!***********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/dom/webSocket.js ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "webSocket": () => (/* binding */ webSocket)
/* harmony export */ });
/* harmony import */ var _WebSocketSubject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebSocketSubject */ 8108);

function webSocket(urlConfigOrSource) {
  return new _WebSocketSubject__WEBPACK_IMPORTED_MODULE_0__.WebSocketSubject(urlConfigOrSource);
}

/***/ }),

/***/ 8680:
/*!******************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/dateTimestampProvider.js ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dateTimestampProvider": () => (/* binding */ dateTimestampProvider)
/* harmony export */ });
const dateTimestampProvider = {
  now() {
    return (dateTimestampProvider.delegate || Date).now();
  },
  delegate: undefined
};

/***/ }),

/***/ 7976:
/*!************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/unload@2.4.1/node_modules/unload/dist/es/browser.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addBrowser": () => (/* binding */ addBrowser)
/* harmony export */ });
/* global WorkerGlobalScope */

function addBrowser(fn) {
  if (typeof WorkerGlobalScope === 'function' && self instanceof WorkerGlobalScope) {
    /**
     * Because killing a worker does directly stop the excution
     * of the code, our only chance is to overwrite the close function
     * which could work some times.
     * @link https://stackoverflow.com/q/72903255/3443137
     */
    var oldClose = self.close.bind(self);
    self.close = function () {
      fn();
      return oldClose();
    };
  } else {
    /**
     * if we are on react-native, there is no window.addEventListener
     * @link https://github.com/pubkey/unload/issues/6
     */
    if (typeof window.addEventListener !== 'function') {
      return;
    }

    /**
     * for normal browser-windows, we use the beforeunload-event
     */
    window.addEventListener('beforeunload', function () {
      fn();
    }, true);

    /**
     * for iframes, we have to use the unload-event
     * @link https://stackoverflow.com/q/47533670/3443137
     */
    window.addEventListener('unload', function () {
      fn();
    }, true);
  }

  /**
   * TODO add fallback for safari-mobile
   * @link https://stackoverflow.com/a/26193516/3443137
   */
}

/***/ }),

/***/ 6203:
/*!**********************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/unload@2.4.1/node_modules/unload/dist/es/index.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "getSize": () => (/* binding */ getSize),
/* harmony export */   "removeAll": () => (/* binding */ removeAll),
/* harmony export */   "runAll": () => (/* binding */ runAll)
/* harmony export */ });
/* harmony import */ var _browser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./browser.js */ 7976);
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node.js */ 8892);



/**
 * Use the code directly to prevent import problems
 * with the detect-node package.
 * @link https://github.com/iliakan/detect-node/blob/master/index.js
 */
var isNode = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
var USE_METHOD = isNode ? _node_js__WEBPACK_IMPORTED_MODULE_1__.addNode : _browser_js__WEBPACK_IMPORTED_MODULE_0__.addBrowser;
var LISTENERS = new Set();
var startedListening = false;
function startListening() {
  if (startedListening) {
    return;
  }
  startedListening = true;
  USE_METHOD(runAll);
}
function add(fn) {
  startListening();
  if (typeof fn !== 'function') {
    throw new Error('Listener is no function');
  }
  LISTENERS.add(fn);
  var addReturn = {
    remove: function remove() {
      return LISTENERS["delete"](fn);
    },
    run: function run() {
      LISTENERS["delete"](fn);
      return fn();
    }
  };
  return addReturn;
}
function runAll() {
  var promises = [];
  LISTENERS.forEach(function (fn) {
    promises.push(fn());
    LISTENERS["delete"](fn);
  });
  return Promise.all(promises);
}
function removeAll() {
  LISTENERS.clear();
}
function getSize() {
  return LISTENERS.size;
}

/***/ }),

/***/ 8892:
/*!*********************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/unload@2.4.1/node_modules/unload/dist/es/node.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addNode": () => (/* binding */ addNode)
/* harmony export */ });
function addNode(fn) {
  process.on('exit', function () {
    return fn();
  });

  /**
   * on the following events,
   * the process will not end if there are
   * event-handlers attached,
   * therefore we have to call process.exit()
   */
  process.on('beforeExit', function () {
    return fn().then(function () {
      return process.exit();
    });
  });
  // catches ctrl+c event
  process.on('SIGINT', function () {
    return fn().then(function () {
      return process.exit();
    });
  });
  // catches uncaught exceptions
  process.on('uncaughtException', function (err) {
    return fn().then(function () {
      console.trace(err);
      process.exit(101);
    });
  });
}

/***/ }),

/***/ 1833:
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/@angular-architects+module-federation-runtime@15.0.3_@angular+common@15.2.10_@angular+core@15_bysn556rfjnwge7w6tk2ghvey4/node_modules/@angular-architects/module-federation-runtime/fesm2020/angular-architects-module-federation-runtime.mjs ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getManifest": () => (/* binding */ getManifest),
/* harmony export */   "initFederation": () => (/* binding */ initFederation),
/* harmony export */   "loadManifest": () => (/* binding */ loadManifest),
/* harmony export */   "loadRemoteEntry": () => (/* binding */ loadRemoteEntry),
/* harmony export */   "loadRemoteModule": () => (/* binding */ loadRemoteModule),
/* harmony export */   "setManifest": () => (/* binding */ setManifest)
/* harmony export */ });
/* harmony import */ var _home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/temp/node_modules/.pnpm/@babel+runtime@7.20.13/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 8706);

let config = {};
const containerMap = {};
const remoteMap = {};
let isDefaultScopeInitialized = false;
function lookupExposedModule(_x, _x2) {
  return _lookupExposedModule.apply(this, arguments);
}
function _lookupExposedModule() {
  _lookupExposedModule = (0,_home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (key, exposedModule) {
    const container = containerMap[key];
    const factory = yield container.get(exposedModule);
    const Module = factory();
    return Module;
  });
  return _lookupExposedModule.apply(this, arguments);
}
function initRemote(_x3, _x4) {
  return _initRemote.apply(this, arguments);
}
function _initRemote() {
  _initRemote = (0,_home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (container, key) {
    // const container = window[key] as Container;
    // Do we still need to initialize the remote?
    if (remoteMap[key]) {
      return container;
    }
    // Do we still need to initialize the share scope?
    if (!isDefaultScopeInitialized) {
      yield __webpack_require__.I('default');
      isDefaultScopeInitialized = true;
    }
    yield container.init(__webpack_require__.S.default);
    remoteMap[key] = true;
    return container;
  });
  return _initRemote.apply(this, arguments);
}
function loadRemoteEntry(_x5, _x6) {
  return _loadRemoteEntry.apply(this, arguments);
}
function _loadRemoteEntry() {
  _loadRemoteEntry = (0,_home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (remoteEntryOrOptions, remoteName) {
    if (typeof remoteEntryOrOptions === 'string') {
      const remoteEntry = remoteEntryOrOptions;
      return yield loadRemoteScriptEntry(remoteEntry, remoteName);
    } else if (remoteEntryOrOptions.type === 'script') {
      const options = remoteEntryOrOptions;
      return yield loadRemoteScriptEntry(options.remoteEntry, options.remoteName);
    } else if (remoteEntryOrOptions.type === 'module') {
      const options = remoteEntryOrOptions;
      yield loadRemoteModuleEntry(options.remoteEntry);
    }
  });
  return _loadRemoteEntry.apply(this, arguments);
}
function loadRemoteModuleEntry(_x7) {
  return _loadRemoteModuleEntry.apply(this, arguments);
}
function _loadRemoteModuleEntry() {
  _loadRemoteModuleEntry = (0,_home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (remoteEntry) {
    if (containerMap[remoteEntry]) {
      return Promise.resolve();
    }
    return yield import( /* webpackIgnore:true */remoteEntry).then(container => {
      initRemote(container, remoteEntry);
      containerMap[remoteEntry] = container;
    });
  });
  return _loadRemoteModuleEntry.apply(this, arguments);
}
function loadRemoteScriptEntry(_x8, _x9) {
  return _loadRemoteScriptEntry.apply(this, arguments);
}
function _loadRemoteScriptEntry() {
  _loadRemoteScriptEntry = (0,_home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (remoteEntry, remoteName) {
    return new Promise((resolve, reject) => {
      // Is remoteEntry already loaded?
      if (containerMap[remoteName]) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = remoteEntry;
      script.onerror = reject;
      script.onload = () => {
        const container = window[remoteName];
        initRemote(container, remoteName);
        containerMap[remoteName] = container;
        resolve();
      };
      document.body.appendChild(script);
    });
  });
  return _loadRemoteScriptEntry.apply(this, arguments);
}
function loadRemoteModule(_x10, _x11) {
  return _loadRemoteModule.apply(this, arguments);
}
function _loadRemoteModule() {
  _loadRemoteModule = (0,_home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (optionsOrRemoteName, exposedModule) {
    let loadRemoteEntryOptions;
    let key;
    let remoteEntry;
    let options;
    if (typeof optionsOrRemoteName === 'string') {
      options = {
        type: 'manifest',
        remoteName: optionsOrRemoteName,
        exposedModule: exposedModule
      };
    } else {
      options = optionsOrRemoteName;
    }
    // To support legacy API (< ng 13)
    if (!options.type) {
      const hasManifest = Object.keys(config).length > 0;
      options.type = hasManifest ? 'manifest' : 'script';
    }
    if (options.type === 'manifest') {
      const manifestEntry = config[options.remoteName];
      if (!manifestEntry) {
        throw new Error('Manifest does not contain ' + options.remoteName);
      }
      options = {
        type: manifestEntry.type,
        exposedModule: options.exposedModule,
        remoteEntry: manifestEntry.remoteEntry,
        remoteName: manifestEntry.type === 'script' ? options.remoteName : undefined
      };
      remoteEntry = manifestEntry.remoteEntry;
    } else {
      remoteEntry = options.remoteEntry;
    }
    if (options.type === 'script') {
      loadRemoteEntryOptions = {
        type: 'script',
        remoteEntry: options.remoteEntry,
        remoteName: options.remoteName
      };
      key = options.remoteName;
    } else if (options.type === 'module') {
      loadRemoteEntryOptions = {
        type: 'module',
        remoteEntry: options.remoteEntry
      };
      key = options.remoteEntry;
    }
    if (remoteEntry) {
      yield loadRemoteEntry(loadRemoteEntryOptions);
    }
    return yield lookupExposedModule(key, options.exposedModule);
  });
  return _loadRemoteModule.apply(this, arguments);
}
function setManifest(_x12) {
  return _setManifest.apply(this, arguments);
}
function _setManifest() {
  _setManifest = (0,_home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (manifest, skipRemoteEntries = false) {
    config = parseConfig(manifest);
    if (!skipRemoteEntries) {
      yield loadRemoteEntries();
    }
  });
  return _setManifest.apply(this, arguments);
}
function getManifest() {
  return config;
}
function initFederation(_x13) {
  return _initFederation.apply(this, arguments);
}
function _initFederation() {
  _initFederation = (0,_home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (manifest, skipRemoteEntries = false) {
    if (typeof manifest === 'string') {
      return loadManifest(manifest, skipRemoteEntries);
    } else {
      return setManifest(manifest, skipRemoteEntries);
    }
  });
  return _initFederation.apply(this, arguments);
}
function loadManifest(_x14) {
  return _loadManifest.apply(this, arguments);
}
function _loadManifest() {
  _loadManifest = (0,_home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (configFile, skipRemoteEntries = false) {
    const result = yield fetch(configFile);
    if (!result.ok) {
      throw Error('could not load configFile: ' + configFile);
    }
    config = parseConfig(yield result.json());
    if (!skipRemoteEntries) {
      yield loadRemoteEntries();
    }
  });
  return _loadManifest.apply(this, arguments);
}
function parseConfig(config) {
  const result = {};
  for (const key in config) {
    const value = config[key];
    let entry;
    if (typeof value === 'string') {
      entry = {
        remoteEntry: value,
        type: 'module'
      };
    } else {
      entry = {
        ...value,
        type: value.type || 'module'
      };
    }
    result[key] = entry;
  }
  return result;
}
function loadRemoteEntries() {
  return _loadRemoteEntries.apply(this, arguments);
}
/**
 * Generated bundle index. Do not edit.
 */
function _loadRemoteEntries() {
  _loadRemoteEntries = (0,_home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
    const promises = [];
    for (const key in config) {
      const entry = config[key];
      if (entry.type === 'module') {
        promises.push(loadRemoteEntry({
          type: 'module',
          remoteEntry: entry.remoteEntry
        }));
      } else {
        promises.push(loadRemoteEntry({
          type: 'script',
          remoteEntry: entry.remoteEntry,
          remoteName: key
        }));
      }
    }
    yield Promise.all(promises);
  });
  return _loadRemoteEntries.apply(this, arguments);
}


/***/ }),

/***/ 5856:
/*!****************************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/broadcast-channel@4.20.2/node_modules/broadcast-channel/dist/esbrowser/broadcast-channel.js ***!
  \****************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BroadcastChannel": () => (/* binding */ BroadcastChannel),
/* harmony export */   "OPEN_BROADCAST_CHANNELS": () => (/* binding */ OPEN_BROADCAST_CHANNELS),
/* harmony export */   "clearNodeFolder": () => (/* binding */ clearNodeFolder),
/* harmony export */   "enforceOptions": () => (/* binding */ enforceOptions)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ 9094);
/* harmony import */ var _method_chooser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./method-chooser.js */ 330);
/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./options.js */ 4005);




/**
 * Contains all open channels,
 * used in tests to ensure everything is closed.
 */
var OPEN_BROADCAST_CHANNELS = new Set();
var lastId = 0;
var BroadcastChannel = function BroadcastChannel(name, options) {
  // identifier of the channel to debug stuff
  this.id = lastId++;
  OPEN_BROADCAST_CHANNELS.add(this);
  this.name = name;
  if (ENFORCED_OPTIONS) {
    options = ENFORCED_OPTIONS;
  }
  this.options = (0,_options_js__WEBPACK_IMPORTED_MODULE_2__.fillOptionsWithDefaults)(options);
  this.method = (0,_method_chooser_js__WEBPACK_IMPORTED_MODULE_1__.chooseMethod)(this.options);

  // isListening
  this._iL = false;

  /**
   * _onMessageListener
   * setting onmessage twice,
   * will overwrite the first listener
   */
  this._onML = null;

  /**
   * _addEventListeners
   */
  this._addEL = {
    message: [],
    internal: []
  };

  /**
   * Unsent message promises
   * where the sending is still in progress
   * @type {Set<Promise>}
   */
  this._uMP = new Set();

  /**
   * _beforeClose
   * array of promises that will be awaited
   * before the channel is closed
   */
  this._befC = [];

  /**
   * _preparePromise
   */
  this._prepP = null;
  _prepareChannel(this);
};

// STATICS

/**
 * used to identify if someone overwrites
 * window.BroadcastChannel with this
 * See methods/native.js
 */
BroadcastChannel._pubkey = true;

/**
 * clears the tmp-folder if is node
 * @return {Promise<boolean>} true if has run, false if not node
 */
function clearNodeFolder(options) {
  options = (0,_options_js__WEBPACK_IMPORTED_MODULE_2__.fillOptionsWithDefaults)(options);
  var method = (0,_method_chooser_js__WEBPACK_IMPORTED_MODULE_1__.chooseMethod)(options);
  if (method.type === 'node') {
    return method.clearNodeFolder().then(function () {
      return true;
    });
  } else {
    return _util_js__WEBPACK_IMPORTED_MODULE_0__.PROMISE_RESOLVED_FALSE;
  }
}

/**
 * if set, this method is enforced,
 * no mather what the options are
 */
var ENFORCED_OPTIONS;
function enforceOptions(options) {
  ENFORCED_OPTIONS = options;
}

// PROTOTYPE
BroadcastChannel.prototype = {
  postMessage: function postMessage(msg) {
    if (this.closed) {
      throw new Error('BroadcastChannel.postMessage(): ' + 'Cannot post message after channel has closed ' +
      /**
       * In the past when this error appeared, it was really hard to debug.
       * So now we log the msg together with the error so it at least
       * gives some clue about where in your application this happens.
       */
      JSON.stringify(msg));
    }
    return _post(this, 'message', msg);
  },
  postInternal: function postInternal(msg) {
    return _post(this, 'internal', msg);
  },
  set onmessage(fn) {
    var time = this.method.microSeconds();
    var listenObj = {
      time: time,
      fn: fn
    };
    _removeListenerObject(this, 'message', this._onML);
    if (fn && typeof fn === 'function') {
      this._onML = listenObj;
      _addListenerObject(this, 'message', listenObj);
    } else {
      this._onML = null;
    }
  },
  addEventListener: function addEventListener(type, fn) {
    var time = this.method.microSeconds();
    var listenObj = {
      time: time,
      fn: fn
    };
    _addListenerObject(this, type, listenObj);
  },
  removeEventListener: function removeEventListener(type, fn) {
    var obj = this._addEL[type].find(function (obj) {
      return obj.fn === fn;
    });
    _removeListenerObject(this, type, obj);
  },
  close: function close() {
    var _this = this;
    if (this.closed) {
      return;
    }
    OPEN_BROADCAST_CHANNELS["delete"](this);
    this.closed = true;
    var awaitPrepare = this._prepP ? this._prepP : _util_js__WEBPACK_IMPORTED_MODULE_0__.PROMISE_RESOLVED_VOID;
    this._onML = null;
    this._addEL.message = [];
    return awaitPrepare
    // wait until all current sending are processed
    .then(function () {
      return Promise.all(Array.from(_this._uMP));
    })
    // run before-close hooks
    .then(function () {
      return Promise.all(_this._befC.map(function (fn) {
        return fn();
      }));
    })
    // close the channel
    .then(function () {
      return _this.method.close(_this._state);
    });
  },
  get type() {
    return this.method.type;
  },
  get isClosed() {
    return this.closed;
  }
};

/**
 * Post a message over the channel
 * @returns {Promise} that resolved when the message sending is done
 */
function _post(broadcastChannel, type, msg) {
  var time = broadcastChannel.method.microSeconds();
  var msgObj = {
    time: time,
    type: type,
    data: msg
  };
  var awaitPrepare = broadcastChannel._prepP ? broadcastChannel._prepP : _util_js__WEBPACK_IMPORTED_MODULE_0__.PROMISE_RESOLVED_VOID;
  return awaitPrepare.then(function () {
    var sendPromise = broadcastChannel.method.postMessage(broadcastChannel._state, msgObj);

    // add/remove to unsent messages list
    broadcastChannel._uMP.add(sendPromise);
    sendPromise["catch"]().then(function () {
      return broadcastChannel._uMP["delete"](sendPromise);
    });
    return sendPromise;
  });
}
function _prepareChannel(channel) {
  var maybePromise = channel.method.create(channel.name, channel.options);
  if ((0,_util_js__WEBPACK_IMPORTED_MODULE_0__.isPromise)(maybePromise)) {
    channel._prepP = maybePromise;
    maybePromise.then(function (s) {
      // used in tests to simulate slow runtime
      /*if (channel.options.prepareDelay) {
           await new Promise(res => setTimeout(res, this.options.prepareDelay));
      }*/
      channel._state = s;
    });
  } else {
    channel._state = maybePromise;
  }
}
function _hasMessageListeners(channel) {
  if (channel._addEL.message.length > 0) return true;
  if (channel._addEL.internal.length > 0) return true;
  return false;
}
function _addListenerObject(channel, type, obj) {
  channel._addEL[type].push(obj);
  _startListening(channel);
}
function _removeListenerObject(channel, type, obj) {
  channel._addEL[type] = channel._addEL[type].filter(function (o) {
    return o !== obj;
  });
  _stopListening(channel);
}
function _startListening(channel) {
  if (!channel._iL && _hasMessageListeners(channel)) {
    // someone is listening, start subscribing

    var listenerFn = function listenerFn(msgObj) {
      channel._addEL[msgObj.type].forEach(function (listenerObject) {
        /**
         * Getting the current time in JavaScript has no good precision.
         * So instead of only listening to events that happened 'after' the listener
         * was added, we also listen to events that happened 100ms before it.
         * This ensures that when another process, like a WebWorker, sends events
         * we do not miss them out because their timestamp is a bit off compared to the main process.
         * Not doing this would make messages missing when we send data directly after subscribing and awaiting a response.
         * @link https://johnresig.com/blog/accuracy-of-javascript-time/
         */
        var hundredMsInMicro = 100 * 1000;
        var minMessageTime = listenerObject.time - hundredMsInMicro;
        if (msgObj.time >= minMessageTime) {
          listenerObject.fn(msgObj.data);
        }
      });
    };
    var time = channel.method.microSeconds();
    if (channel._prepP) {
      channel._prepP.then(function () {
        channel._iL = true;
        channel.method.onMessage(channel._state, listenerFn, time);
      });
    } else {
      channel._iL = true;
      channel.method.onMessage(channel._state, listenerFn, time);
    }
  }
}
function _stopListening(channel) {
  if (channel._iL && !_hasMessageListeners(channel)) {
    // no one is listening, stop subscribing
    channel._iL = false;
    var time = channel.method.microSeconds();
    channel.method.onMessage(channel._state, null, time);
  }
}

/***/ }),

/***/ 8406:
/*!****************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/broadcast-channel@4.20.2/node_modules/broadcast-channel/dist/esbrowser/index.js ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BroadcastChannel": () => (/* reexport safe */ _broadcast_channel_js__WEBPACK_IMPORTED_MODULE_0__.BroadcastChannel),
/* harmony export */   "OPEN_BROADCAST_CHANNELS": () => (/* reexport safe */ _broadcast_channel_js__WEBPACK_IMPORTED_MODULE_0__.OPEN_BROADCAST_CHANNELS),
/* harmony export */   "beLeader": () => (/* reexport safe */ _leader_election_js__WEBPACK_IMPORTED_MODULE_1__.beLeader),
/* harmony export */   "clearNodeFolder": () => (/* reexport safe */ _broadcast_channel_js__WEBPACK_IMPORTED_MODULE_0__.clearNodeFolder),
/* harmony export */   "createLeaderElection": () => (/* reexport safe */ _leader_election_js__WEBPACK_IMPORTED_MODULE_1__.createLeaderElection),
/* harmony export */   "enforceOptions": () => (/* reexport safe */ _broadcast_channel_js__WEBPACK_IMPORTED_MODULE_0__.enforceOptions)
/* harmony export */ });
/* harmony import */ var _broadcast_channel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./broadcast-channel.js */ 5856);
/* harmony import */ var _leader_election_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./leader-election.js */ 4526);



/***/ }),

/***/ 4526:
/*!**************************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/broadcast-channel@4.20.2/node_modules/broadcast-channel/dist/esbrowser/leader-election.js ***!
  \**************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "beLeader": () => (/* binding */ beLeader),
/* harmony export */   "createLeaderElection": () => (/* binding */ createLeaderElection)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ 9094);
/* harmony import */ var unload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unload */ 6203);


var LeaderElection = function LeaderElection(broadcastChannel, options) {
  var _this = this;
  this.broadcastChannel = broadcastChannel;
  this._options = options;
  this.isLeader = false;
  this.hasLeader = false;
  this.isDead = false;
  this.token = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.randomToken)();

  /**
   * Apply Queue,
   * used to ensure we do not run applyOnce()
   * in parallel.
   */
  this._aplQ = _util_js__WEBPACK_IMPORTED_MODULE_0__.PROMISE_RESOLVED_VOID;
  // amount of unfinished applyOnce() calls
  this._aplQC = 0;

  // things to clean up
  this._unl = []; // _unloads
  this._lstns = []; // _listeners
  this._dpL = function () {}; // onduplicate listener
  this._dpLC = false; // true when onduplicate called

  /**
   * Even when the own instance is not applying,
   * we still listen to messages to ensure the hasLeader flag
   * is set correctly.
   */
  var hasLeaderListener = function hasLeaderListener(msg) {
    if (msg.context === 'leader') {
      if (msg.action === 'death') {
        _this.hasLeader = false;
      }
      if (msg.action === 'tell') {
        _this.hasLeader = true;
      }
    }
  };
  this.broadcastChannel.addEventListener('internal', hasLeaderListener);
  this._lstns.push(hasLeaderListener);
};
LeaderElection.prototype = {
  /**
   * Returns true if the instance is leader,
   * false if not.
   * @async
   */
  applyOnce: function applyOnce(
  // true if the applyOnce() call came from the fallbackInterval cycle
  isFromFallbackInterval) {
    var _this2 = this;
    if (this.isLeader) {
      return (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.sleep)(0, true);
    }
    if (this.isDead) {
      return (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.sleep)(0, false);
    }

    /**
     * Already applying more than once,
     * -> wait for the apply queue to be finished.
     */
    if (this._aplQC > 1) {
      return this._aplQ;
    }

    /**
     * Add a new apply-run
     */
    var applyRun = function applyRun() {
      /**
       * Optimization shortcuts.
       * Directly return if a previous run
       * has already elected a leader.
       */
      if (_this2.isLeader) {
        return _util_js__WEBPACK_IMPORTED_MODULE_0__.PROMISE_RESOLVED_TRUE;
      }
      var stopCriteria = false;
      var stopCriteriaPromiseResolve;
      /**
       * Resolves when a stop criteria is reached.
       * Uses as a performance shortcut so we do not
       * have to await the responseTime when it is already clear
       * that the election failed.
       */
      var stopCriteriaPromise = new Promise(function (res) {
        stopCriteriaPromiseResolve = function stopCriteriaPromiseResolve() {
          stopCriteria = true;
          res();
        };
      });
      var handleMessage = function handleMessage(msg) {
        if (msg.context === 'leader' && msg.token != _this2.token) {
          if (msg.action === 'apply') {
            // other is applying
            if (msg.token > _this2.token) {
              /**
               * other has higher token
               * -> stop applying and let other become leader.
               */
              stopCriteriaPromiseResolve();
            }
          }
          if (msg.action === 'tell') {
            // other is already leader
            stopCriteriaPromiseResolve();
            _this2.hasLeader = true;
          }
        }
      };
      _this2.broadcastChannel.addEventListener('internal', handleMessage);

      /**
       * If the applyOnce() call came from the fallbackInterval,
       * we can assume that the election runs in the background and
       * not critical process is waiting for it.
       * When this is true, we give the other instances
       * more time to answer to messages in the election cycle.
       * This makes it less likely to elect duplicate leaders.
       * But also it takes longer which is not a problem because we anyway
       * run in the background.
       */
      var waitForAnswerTime = isFromFallbackInterval ? _this2._options.responseTime * 4 : _this2._options.responseTime;
      return _sendMessage(_this2, 'apply') // send out that this one is applying
      .then(function () {
        return Promise.race([(0,_util_js__WEBPACK_IMPORTED_MODULE_0__.sleep)(waitForAnswerTime), stopCriteriaPromise.then(function () {
          return Promise.reject(new Error());
        })]);
      })
      // send again in case another instance was just created
      .then(function () {
        return _sendMessage(_this2, 'apply');
      })
      // let others time to respond
      .then(function () {
        return Promise.race([(0,_util_js__WEBPACK_IMPORTED_MODULE_0__.sleep)(waitForAnswerTime), stopCriteriaPromise.then(function () {
          return Promise.reject(new Error());
        })]);
      })["catch"](function () {}).then(function () {
        _this2.broadcastChannel.removeEventListener('internal', handleMessage);
        if (!stopCriteria) {
          // no stop criteria -> own is leader
          return beLeader(_this2).then(function () {
            return true;
          });
        } else {
          // other is leader
          return false;
        }
      });
    };
    this._aplQC = this._aplQC + 1;
    this._aplQ = this._aplQ.then(function () {
      return applyRun();
    }).then(function () {
      _this2._aplQC = _this2._aplQC - 1;
    });
    return this._aplQ.then(function () {
      return _this2.isLeader;
    });
  },
  awaitLeadership: function awaitLeadership() {
    if ( /* _awaitLeadershipPromise */
    !this._aLP) {
      this._aLP = _awaitLeadershipOnce(this);
    }
    return this._aLP;
  },
  set onduplicate(fn) {
    this._dpL = fn;
  },
  die: function die() {
    var _this3 = this;
    this._lstns.forEach(function (listener) {
      return _this3.broadcastChannel.removeEventListener('internal', listener);
    });
    this._lstns = [];
    this._unl.forEach(function (uFn) {
      return uFn.remove();
    });
    this._unl = [];
    if (this.isLeader) {
      this.hasLeader = false;
      this.isLeader = false;
    }
    this.isDead = true;
    return _sendMessage(this, 'death');
  }
};

/**
 * @param leaderElector {LeaderElector}
 */
function _awaitLeadershipOnce(leaderElector) {
  if (leaderElector.isLeader) {
    return _util_js__WEBPACK_IMPORTED_MODULE_0__.PROMISE_RESOLVED_VOID;
  }
  return new Promise(function (res) {
    var resolved = false;
    function finish() {
      if (resolved) {
        return;
      }
      resolved = true;
      leaderElector.broadcastChannel.removeEventListener('internal', whenDeathListener);
      res(true);
    }

    // try once now
    leaderElector.applyOnce().then(function () {
      if (leaderElector.isLeader) {
        finish();
      }
    });

    /**
     * Try on fallbackInterval
     * @recursive
     */
    var tryOnFallBack = function tryOnFallBack() {
      return (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.sleep)(leaderElector._options.fallbackInterval).then(function () {
        if (leaderElector.isDead || resolved) {
          return;
        }
        if (leaderElector.isLeader) {
          finish();
        } else {
          return leaderElector.applyOnce(true).then(function () {
            if (leaderElector.isLeader) {
              finish();
            } else {
              tryOnFallBack();
            }
          });
        }
      });
    };
    tryOnFallBack();

    // try when other leader dies
    var whenDeathListener = function whenDeathListener(msg) {
      if (msg.context === 'leader' && msg.action === 'death') {
        leaderElector.hasLeader = false;
        leaderElector.applyOnce().then(function () {
          if (leaderElector.isLeader) {
            finish();
          }
        });
      }
    };
    leaderElector.broadcastChannel.addEventListener('internal', whenDeathListener);
    leaderElector._lstns.push(whenDeathListener);
  });
}

/**
 * sends and internal message over the broadcast-channel
 */
function _sendMessage(leaderElector, action) {
  var msgJson = {
    context: 'leader',
    action: action,
    token: leaderElector.token
  };
  return leaderElector.broadcastChannel.postInternal(msgJson);
}
function beLeader(leaderElector) {
  leaderElector.isLeader = true;
  leaderElector.hasLeader = true;
  var unloadFn = (0,unload__WEBPACK_IMPORTED_MODULE_1__.add)(function () {
    return leaderElector.die();
  });
  leaderElector._unl.push(unloadFn);
  var isLeaderListener = function isLeaderListener(msg) {
    if (msg.context === 'leader' && msg.action === 'apply') {
      _sendMessage(leaderElector, 'tell');
    }
    if (msg.context === 'leader' && msg.action === 'tell' && !leaderElector._dpLC) {
      /**
       * another instance is also leader!
       * This can happen on rare events
       * like when the CPU is at 100% for long time
       * or the tabs are open very long and the browser throttles them.
       * @link https://github.com/pubkey/broadcast-channel/issues/414
       * @link https://github.com/pubkey/broadcast-channel/issues/385
       */
      leaderElector._dpLC = true;
      leaderElector._dpL(); // message the lib user so the app can handle the problem
      _sendMessage(leaderElector, 'tell'); // ensure other leader also knows the problem
    }
  };
  leaderElector.broadcastChannel.addEventListener('internal', isLeaderListener);
  leaderElector._lstns.push(isLeaderListener);
  return _sendMessage(leaderElector, 'tell');
}
function fillOptionsWithDefaults(options, channel) {
  if (!options) options = {};
  options = JSON.parse(JSON.stringify(options));
  if (!options.fallbackInterval) {
    options.fallbackInterval = 3000;
  }
  if (!options.responseTime) {
    options.responseTime = channel.method.averageResponseTime(channel.options);
  }
  return options;
}
function createLeaderElection(channel, options) {
  if (channel._leaderElector) {
    throw new Error('BroadcastChannel already has a leader-elector');
  }
  options = fillOptionsWithDefaults(options, channel);
  var elector = new LeaderElection(channel, options);
  channel._befC.push(function () {
    return elector.die();
  });
  channel._leaderElector = elector;
  return elector;
}

/***/ }),

/***/ 330:
/*!*************************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/broadcast-channel@4.20.2/node_modules/broadcast-channel/dist/esbrowser/method-chooser.js ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "chooseMethod": () => (/* binding */ chooseMethod)
/* harmony export */ });
/* harmony import */ var _methods_native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./methods/native.js */ 8712);
/* harmony import */ var _methods_indexed_db_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./methods/indexed-db.js */ 7802);
/* harmony import */ var _methods_localstorage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./methods/localstorage.js */ 5247);
/* harmony import */ var _methods_simulate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./methods/simulate.js */ 9531);




// the line below will be removed from es5/browser builds

// order is important
var METHODS = [_methods_native_js__WEBPACK_IMPORTED_MODULE_0__.NativeMethod,
// fastest
_methods_indexed_db_js__WEBPACK_IMPORTED_MODULE_1__.IndexedDBMethod, _methods_localstorage_js__WEBPACK_IMPORTED_MODULE_2__.LocalstorageMethod];
function chooseMethod(options) {
  var chooseMethods = [].concat(options.methods, METHODS).filter(Boolean);

  // the line below will be removed from es5/browser builds

  // directly chosen
  if (options.type) {
    if (options.type === 'simulate') {
      // only use simulate-method if directly chosen
      return _methods_simulate_js__WEBPACK_IMPORTED_MODULE_3__.SimulateMethod;
    }
    var ret = chooseMethods.find(function (m) {
      return m.type === options.type;
    });
    if (!ret) throw new Error('method-type ' + options.type + ' not found');else return ret;
  }

  /**
   * if no webworker support is needed,
   * remove idb from the list so that localstorage will be chosen
   */
  if (!options.webWorkerSupport) {
    chooseMethods = chooseMethods.filter(function (m) {
      return m.type !== 'idb';
    });
  }
  var useMethod = chooseMethods.find(function (method) {
    return method.canBeUsed();
  });
  if (!useMethod) throw new Error("No usable method found in " + JSON.stringify(METHODS.map(function (m) {
    return m.type;
  })));else return useMethod;
}

/***/ }),

/***/ 7802:
/*!*****************************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/broadcast-channel@4.20.2/node_modules/broadcast-channel/dist/esbrowser/methods/indexed-db.js ***!
  \*****************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndexedDBMethod": () => (/* binding */ IndexedDBMethod),
/* harmony export */   "TRANSACTION_SETTINGS": () => (/* binding */ TRANSACTION_SETTINGS),
/* harmony export */   "averageResponseTime": () => (/* binding */ averageResponseTime),
/* harmony export */   "canBeUsed": () => (/* binding */ canBeUsed),
/* harmony export */   "cleanOldMessages": () => (/* binding */ cleanOldMessages),
/* harmony export */   "close": () => (/* binding */ close),
/* harmony export */   "commitIndexedDBTransaction": () => (/* binding */ commitIndexedDBTransaction),
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "createDatabase": () => (/* binding */ createDatabase),
/* harmony export */   "getAllMessages": () => (/* binding */ getAllMessages),
/* harmony export */   "getIdb": () => (/* binding */ getIdb),
/* harmony export */   "getMessagesHigherThan": () => (/* binding */ getMessagesHigherThan),
/* harmony export */   "getOldMessages": () => (/* binding */ getOldMessages),
/* harmony export */   "microSeconds": () => (/* binding */ microSeconds),
/* harmony export */   "onMessage": () => (/* binding */ onMessage),
/* harmony export */   "postMessage": () => (/* binding */ postMessage),
/* harmony export */   "removeMessagesById": () => (/* binding */ removeMessagesById),
/* harmony export */   "type": () => (/* binding */ type),
/* harmony export */   "writeMessage": () => (/* binding */ writeMessage)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ 9094);
/* harmony import */ var oblivious_set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! oblivious-set */ 3849);
/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../options.js */ 4005);
/**
 * this method uses indexeddb to store the messages
 * There is currently no observerAPI for idb
 * @link https://github.com/w3c/IndexedDB/issues/51
 * 
 * When working on this, ensure to use these performance optimizations:
 * @link https://rxdb.info/slow-indexeddb.html
 */


var microSeconds = _util_js__WEBPACK_IMPORTED_MODULE_0__.microSeconds;


var DB_PREFIX = 'pubkey.broadcast-channel-0-';
var OBJECT_STORE_ID = 'messages';

/**
 * Use relaxed durability for faster performance on all transactions.
 * @link https://nolanlawson.com/2021/08/22/speeding-up-indexeddb-reads-and-writes/
 */
var TRANSACTION_SETTINGS = {
  durability: 'relaxed'
};
var type = 'idb';
function getIdb() {
  if (typeof indexedDB !== 'undefined') return indexedDB;
  if (typeof window !== 'undefined') {
    if (typeof window.mozIndexedDB !== 'undefined') return window.mozIndexedDB;
    if (typeof window.webkitIndexedDB !== 'undefined') return window.webkitIndexedDB;
    if (typeof window.msIndexedDB !== 'undefined') return window.msIndexedDB;
  }
  return false;
}

/**
 * If possible, we should explicitly commit IndexedDB transactions
 * for better performance.
 * @link https://nolanlawson.com/2021/08/22/speeding-up-indexeddb-reads-and-writes/
 */
function commitIndexedDBTransaction(tx) {
  if (tx.commit) {
    tx.commit();
  }
}
function createDatabase(channelName) {
  var IndexedDB = getIdb();

  // create table
  var dbName = DB_PREFIX + channelName;

  /**
   * All IndexedDB databases are opened without version
   * because it is a bit faster, especially on firefox
   * @link http://nparashuram.com/IndexedDB/perf/#Open%20Database%20with%20version
   */
  var openRequest = IndexedDB.open(dbName);
  openRequest.onupgradeneeded = function (ev) {
    var db = ev.target.result;
    db.createObjectStore(OBJECT_STORE_ID, {
      keyPath: 'id',
      autoIncrement: true
    });
  };
  return new Promise(function (res, rej) {
    openRequest.onerror = function (ev) {
      return rej(ev);
    };
    openRequest.onsuccess = function () {
      res(openRequest.result);
    };
  });
}

/**
 * writes the new message to the database
 * so other readers can find it
 */
function writeMessage(db, readerUuid, messageJson) {
  var time = new Date().getTime();
  var writeObject = {
    uuid: readerUuid,
    time: time,
    data: messageJson
  };
  var tx = db.transaction([OBJECT_STORE_ID], 'readwrite', TRANSACTION_SETTINGS);
  return new Promise(function (res, rej) {
    tx.oncomplete = function () {
      return res();
    };
    tx.onerror = function (ev) {
      return rej(ev);
    };
    var objectStore = tx.objectStore(OBJECT_STORE_ID);
    objectStore.add(writeObject);
    commitIndexedDBTransaction(tx);
  });
}
function getAllMessages(db) {
  var tx = db.transaction(OBJECT_STORE_ID, 'readonly', TRANSACTION_SETTINGS);
  var objectStore = tx.objectStore(OBJECT_STORE_ID);
  var ret = [];
  return new Promise(function (res) {
    objectStore.openCursor().onsuccess = function (ev) {
      var cursor = ev.target.result;
      if (cursor) {
        ret.push(cursor.value);
        //alert("Name for SSN " + cursor.key + " is " + cursor.value.name);
        cursor["continue"]();
      } else {
        commitIndexedDBTransaction(tx);
        res(ret);
      }
    };
  });
}
function getMessagesHigherThan(db, lastCursorId) {
  var tx = db.transaction(OBJECT_STORE_ID, 'readonly', TRANSACTION_SETTINGS);
  var objectStore = tx.objectStore(OBJECT_STORE_ID);
  var ret = [];
  var keyRangeValue = IDBKeyRange.bound(lastCursorId + 1, Infinity);

  /**
   * Optimization shortcut,
   * if getAll() can be used, do not use a cursor.
   * @link https://rxdb.info/slow-indexeddb.html
   */
  if (objectStore.getAll) {
    var getAllRequest = objectStore.getAll(keyRangeValue);
    return new Promise(function (res, rej) {
      getAllRequest.onerror = function (err) {
        return rej(err);
      };
      getAllRequest.onsuccess = function (e) {
        res(e.target.result);
      };
    });
  }
  function openCursor() {
    // Occasionally Safari will fail on IDBKeyRange.bound, this
    // catches that error, having it open the cursor to the first
    // item. When it gets data it will advance to the desired key.
    try {
      keyRangeValue = IDBKeyRange.bound(lastCursorId + 1, Infinity);
      return objectStore.openCursor(keyRangeValue);
    } catch (e) {
      return objectStore.openCursor();
    }
  }
  return new Promise(function (res, rej) {
    var openCursorRequest = openCursor();
    openCursorRequest.onerror = function (err) {
      return rej(err);
    };
    openCursorRequest.onsuccess = function (ev) {
      var cursor = ev.target.result;
      if (cursor) {
        if (cursor.value.id < lastCursorId + 1) {
          cursor["continue"](lastCursorId + 1);
        } else {
          ret.push(cursor.value);
          cursor["continue"]();
        }
      } else {
        commitIndexedDBTransaction(tx);
        res(ret);
      }
    };
  });
}
function removeMessagesById(channelState, ids) {
  if (channelState.closed) {
    return Promise.resolve([]);
  }
  var tx = channelState.db.transaction(OBJECT_STORE_ID, 'readwrite', TRANSACTION_SETTINGS);
  var objectStore = tx.objectStore(OBJECT_STORE_ID);
  return Promise.all(ids.map(function (id) {
    var deleteRequest = objectStore["delete"](id);
    return new Promise(function (res) {
      deleteRequest.onsuccess = function () {
        return res();
      };
    });
  }));
}
function getOldMessages(db, ttl) {
  var olderThen = new Date().getTime() - ttl;
  var tx = db.transaction(OBJECT_STORE_ID, 'readonly', TRANSACTION_SETTINGS);
  var objectStore = tx.objectStore(OBJECT_STORE_ID);
  var ret = [];
  return new Promise(function (res) {
    objectStore.openCursor().onsuccess = function (ev) {
      var cursor = ev.target.result;
      if (cursor) {
        var msgObk = cursor.value;
        if (msgObk.time < olderThen) {
          ret.push(msgObk);
          //alert("Name for SSN " + cursor.key + " is " + cursor.value.name);
          cursor["continue"]();
        } else {
          // no more old messages,
          commitIndexedDBTransaction(tx);
          res(ret);
        }
      } else {
        res(ret);
      }
    };
  });
}
function cleanOldMessages(channelState) {
  return getOldMessages(channelState.db, channelState.options.idb.ttl).then(function (tooOld) {
    return removeMessagesById(channelState, tooOld.map(function (msg) {
      return msg.id;
    }));
  });
}
function create(channelName, options) {
  options = (0,_options_js__WEBPACK_IMPORTED_MODULE_1__.fillOptionsWithDefaults)(options);
  return createDatabase(channelName).then(function (db) {
    var state = {
      closed: false,
      lastCursorId: 0,
      channelName: channelName,
      options: options,
      uuid: (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.randomToken)(),
      /**
       * emittedMessagesIds
       * contains all messages that have been emitted before
       * @type {ObliviousSet}
       */
      eMIs: new oblivious_set__WEBPACK_IMPORTED_MODULE_2__.ObliviousSet(options.idb.ttl * 2),
      // ensures we do not read messages in parallel
      writeBlockPromise: _util_js__WEBPACK_IMPORTED_MODULE_0__.PROMISE_RESOLVED_VOID,
      messagesCallback: null,
      readQueuePromises: [],
      db: db
    };

    /**
     * Handle abrupt closes that do not originate from db.close().
     * This could happen, for example, if the underlying storage is
     * removed or if the user clears the database in the browser's
     * history preferences.
     */
    db.onclose = function () {
      state.closed = true;
      if (options.idb.onclose) options.idb.onclose();
    };

    /**
     * if service-workers are used,
     * we have no 'storage'-event if they post a message,
     * therefore we also have to set an interval
     */
    _readLoop(state);
    return state;
  });
}
function _readLoop(state) {
  if (state.closed) return;
  readNewMessages(state).then(function () {
    return (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.sleep)(state.options.idb.fallbackInterval);
  }).then(function () {
    return _readLoop(state);
  });
}
function _filterMessage(msgObj, state) {
  if (msgObj.uuid === state.uuid) return false; // send by own
  if (state.eMIs.has(msgObj.id)) return false; // already emitted
  if (msgObj.data.time < state.messagesCallbackTime) return false; // older then onMessageCallback
  return true;
}

/**
 * reads all new messages from the database and emits them
 */
function readNewMessages(state) {
  // channel already closed
  if (state.closed) return _util_js__WEBPACK_IMPORTED_MODULE_0__.PROMISE_RESOLVED_VOID;

  // if no one is listening, we do not need to scan for new messages
  if (!state.messagesCallback) return _util_js__WEBPACK_IMPORTED_MODULE_0__.PROMISE_RESOLVED_VOID;
  return getMessagesHigherThan(state.db, state.lastCursorId).then(function (newerMessages) {
    var useMessages = newerMessages
    /**
     * there is a bug in iOS where the msgObj can be undefined sometimes
     * so we filter them out
     * @link https://github.com/pubkey/broadcast-channel/issues/19
     */.filter(function (msgObj) {
      return !!msgObj;
    }).map(function (msgObj) {
      if (msgObj.id > state.lastCursorId) {
        state.lastCursorId = msgObj.id;
      }
      return msgObj;
    }).filter(function (msgObj) {
      return _filterMessage(msgObj, state);
    }).sort(function (msgObjA, msgObjB) {
      return msgObjA.time - msgObjB.time;
    }); // sort by time
    useMessages.forEach(function (msgObj) {
      if (state.messagesCallback) {
        state.eMIs.add(msgObj.id);
        state.messagesCallback(msgObj.data);
      }
    });
    return _util_js__WEBPACK_IMPORTED_MODULE_0__.PROMISE_RESOLVED_VOID;
  });
}
function close(channelState) {
  channelState.closed = true;
  channelState.db.close();
}
function postMessage(channelState, messageJson) {
  channelState.writeBlockPromise = channelState.writeBlockPromise.then(function () {
    return writeMessage(channelState.db, channelState.uuid, messageJson);
  }).then(function () {
    if ((0,_util_js__WEBPACK_IMPORTED_MODULE_0__.randomInt)(0, 10) === 0) {
      /* await (do not await) */
      cleanOldMessages(channelState);
    }
  });
  return channelState.writeBlockPromise;
}
function onMessage(channelState, fn, time) {
  channelState.messagesCallbackTime = time;
  channelState.messagesCallback = fn;
  readNewMessages(channelState);
}
function canBeUsed() {
  return !!getIdb();
}
function averageResponseTime(options) {
  return options.idb.fallbackInterval * 2;
}
var IndexedDBMethod = {
  create: create,
  close: close,
  onMessage: onMessage,
  postMessage: postMessage,
  canBeUsed: canBeUsed,
  type: type,
  averageResponseTime: averageResponseTime,
  microSeconds: microSeconds
};

/***/ }),

/***/ 5247:
/*!*******************************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/broadcast-channel@4.20.2/node_modules/broadcast-channel/dist/esbrowser/methods/localstorage.js ***!
  \*******************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalstorageMethod": () => (/* binding */ LocalstorageMethod),
/* harmony export */   "addStorageEventListener": () => (/* binding */ addStorageEventListener),
/* harmony export */   "averageResponseTime": () => (/* binding */ averageResponseTime),
/* harmony export */   "canBeUsed": () => (/* binding */ canBeUsed),
/* harmony export */   "close": () => (/* binding */ close),
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "getLocalStorage": () => (/* binding */ getLocalStorage),
/* harmony export */   "microSeconds": () => (/* binding */ microSeconds),
/* harmony export */   "onMessage": () => (/* binding */ onMessage),
/* harmony export */   "postMessage": () => (/* binding */ postMessage),
/* harmony export */   "removeStorageEventListener": () => (/* binding */ removeStorageEventListener),
/* harmony export */   "storageKey": () => (/* binding */ storageKey),
/* harmony export */   "type": () => (/* binding */ type)
/* harmony export */ });
/* harmony import */ var oblivious_set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! oblivious-set */ 3849);
/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../options.js */ 4005);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util.js */ 9094);
/**
 * A localStorage-only method which uses localstorage and its 'storage'-event
 * This does not work inside webworkers because they have no access to localstorage
 * This is basically implemented to support IE9 or your grandmother's toaster.
 * @link https://caniuse.com/#feat=namevalue-storage
 * @link https://caniuse.com/#feat=indexeddb
 */




var microSeconds = _util_js__WEBPACK_IMPORTED_MODULE_1__.microSeconds;
var KEY_PREFIX = 'pubkey.broadcastChannel-';
var type = 'localstorage';

/**
 * copied from crosstab
 * @link https://github.com/tejacques/crosstab/blob/master/src/crosstab.js#L32
 */
function getLocalStorage() {
  var localStorage;
  if (typeof window === 'undefined') return null;
  try {
    localStorage = window.localStorage;
    localStorage = window['ie8-eventlistener/storage'] || window.localStorage;
  } catch (e) {
    // New versions of Firefox throw a Security exception
    // if cookies are disabled. See
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1028153
  }
  return localStorage;
}
function storageKey(channelName) {
  return KEY_PREFIX + channelName;
}

/**
* writes the new message to the storage
* and fires the storage-event so other readers can find it
*/
function postMessage(channelState, messageJson) {
  return new Promise(function (res) {
    (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.sleep)().then(function () {
      var key = storageKey(channelState.channelName);
      var writeObj = {
        token: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.randomToken)(),
        time: new Date().getTime(),
        data: messageJson,
        uuid: channelState.uuid
      };
      var value = JSON.stringify(writeObj);
      getLocalStorage().setItem(key, value);

      /**
       * StorageEvent does not fire the 'storage' event
       * in the window that changes the state of the local storage.
       * So we fire it manually
       */
      var ev = document.createEvent('Event');
      ev.initEvent('storage', true, true);
      ev.key = key;
      ev.newValue = value;
      window.dispatchEvent(ev);
      res();
    });
  });
}
function addStorageEventListener(channelName, fn) {
  var key = storageKey(channelName);
  var listener = function listener(ev) {
    if (ev.key === key) {
      fn(JSON.parse(ev.newValue));
    }
  };
  window.addEventListener('storage', listener);
  return listener;
}
function removeStorageEventListener(listener) {
  window.removeEventListener('storage', listener);
}
function create(channelName, options) {
  options = (0,_options_js__WEBPACK_IMPORTED_MODULE_0__.fillOptionsWithDefaults)(options);
  if (!canBeUsed()) {
    throw new Error('BroadcastChannel: localstorage cannot be used');
  }
  var uuid = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.randomToken)();

  /**
   * eMIs
   * contains all messages that have been emitted before
   * @type {ObliviousSet}
   */
  var eMIs = new oblivious_set__WEBPACK_IMPORTED_MODULE_2__.ObliviousSet(options.localstorage.removeTimeout);
  var state = {
    channelName: channelName,
    uuid: uuid,
    eMIs: eMIs // emittedMessagesIds
  };
  state.listener = addStorageEventListener(channelName, function (msgObj) {
    if (!state.messagesCallback) return; // no listener
    if (msgObj.uuid === uuid) return; // own message
    if (!msgObj.token || eMIs.has(msgObj.token)) return; // already emitted
    if (msgObj.data.time && msgObj.data.time < state.messagesCallbackTime) return; // too old

    eMIs.add(msgObj.token);
    state.messagesCallback(msgObj.data);
  });
  return state;
}
function close(channelState) {
  removeStorageEventListener(channelState.listener);
}
function onMessage(channelState, fn, time) {
  channelState.messagesCallbackTime = time;
  channelState.messagesCallback = fn;
}
function canBeUsed() {
  var ls = getLocalStorage();
  if (!ls) return false;
  try {
    var key = '__broadcastchannel_check';
    ls.setItem(key, 'works');
    ls.removeItem(key);
  } catch (e) {
    // Safari 10 in private mode will not allow write access to local
    // storage and fail with a QuotaExceededError. See
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API#Private_Browsing_Incognito_modes
    return false;
  }
  return true;
}
function averageResponseTime() {
  var defaultTime = 120;
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    // safari is much slower so this time is higher
    return defaultTime * 2;
  }
  return defaultTime;
}
var LocalstorageMethod = {
  create: create,
  close: close,
  onMessage: onMessage,
  postMessage: postMessage,
  canBeUsed: canBeUsed,
  type: type,
  averageResponseTime: averageResponseTime,
  microSeconds: microSeconds
};

/***/ }),

/***/ 8712:
/*!*************************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/broadcast-channel@4.20.2/node_modules/broadcast-channel/dist/esbrowser/methods/native.js ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NativeMethod": () => (/* binding */ NativeMethod),
/* harmony export */   "averageResponseTime": () => (/* binding */ averageResponseTime),
/* harmony export */   "canBeUsed": () => (/* binding */ canBeUsed),
/* harmony export */   "close": () => (/* binding */ close),
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "microSeconds": () => (/* binding */ microSeconds),
/* harmony export */   "onMessage": () => (/* binding */ onMessage),
/* harmony export */   "postMessage": () => (/* binding */ postMessage),
/* harmony export */   "type": () => (/* binding */ type)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ 9094);

var microSeconds = _util_js__WEBPACK_IMPORTED_MODULE_0__.microSeconds;
var type = 'native';
function create(channelName) {
  var state = {
    messagesCallback: null,
    bc: new BroadcastChannel(channelName),
    subFns: [] // subscriberFunctions
  };
  state.bc.onmessage = function (msg) {
    if (state.messagesCallback) {
      state.messagesCallback(msg.data);
    }
  };
  return state;
}
function close(channelState) {
  channelState.bc.close();
  channelState.subFns = [];
}
function postMessage(channelState, messageJson) {
  try {
    channelState.bc.postMessage(messageJson, false);
    return _util_js__WEBPACK_IMPORTED_MODULE_0__.PROMISE_RESOLVED_VOID;
  } catch (err) {
    return Promise.reject(err);
  }
}
function onMessage(channelState, fn) {
  channelState.messagesCallback = fn;
}
function canBeUsed() {
  if (typeof window === 'undefined') {
    return false;
  }
  if (typeof BroadcastChannel === 'function') {
    if (BroadcastChannel._pubkey) {
      throw new Error('BroadcastChannel: Do not overwrite window.BroadcastChannel with this module, this is not a polyfill');
    }
    return true;
  } else {
    return false;
  }
}
function averageResponseTime() {
  return 150;
}
var NativeMethod = {
  create: create,
  close: close,
  onMessage: onMessage,
  postMessage: postMessage,
  canBeUsed: canBeUsed,
  type: type,
  averageResponseTime: averageResponseTime,
  microSeconds: microSeconds
};

/***/ }),

/***/ 9531:
/*!***************************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/broadcast-channel@4.20.2/node_modules/broadcast-channel/dist/esbrowser/methods/simulate.js ***!
  \***************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimulateMethod": () => (/* binding */ SimulateMethod),
/* harmony export */   "averageResponseTime": () => (/* binding */ averageResponseTime),
/* harmony export */   "canBeUsed": () => (/* binding */ canBeUsed),
/* harmony export */   "close": () => (/* binding */ close),
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "microSeconds": () => (/* binding */ microSeconds),
/* harmony export */   "onMessage": () => (/* binding */ onMessage),
/* harmony export */   "postMessage": () => (/* binding */ postMessage),
/* harmony export */   "type": () => (/* binding */ type)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ 9094);

var microSeconds = _util_js__WEBPACK_IMPORTED_MODULE_0__.microSeconds;
var type = 'simulate';
var SIMULATE_CHANNELS = new Set();
function create(channelName) {
  var state = {
    name: channelName,
    messagesCallback: null
  };
  SIMULATE_CHANNELS.add(state);
  return state;
}
function close(channelState) {
  SIMULATE_CHANNELS["delete"](channelState);
}
function postMessage(channelState, messageJson) {
  return new Promise(function (res) {
    return setTimeout(function () {
      var channelArray = Array.from(SIMULATE_CHANNELS);
      channelArray.filter(function (channel) {
        return channel.name === channelState.name;
      }).filter(function (channel) {
        return channel !== channelState;
      }).filter(function (channel) {
        return !!channel.messagesCallback;
      }).forEach(function (channel) {
        return channel.messagesCallback(messageJson);
      });
      res();
    }, 5);
  });
}
function onMessage(channelState, fn) {
  channelState.messagesCallback = fn;
}
function canBeUsed() {
  return true;
}
function averageResponseTime() {
  return 5;
}
var SimulateMethod = {
  create: create,
  close: close,
  onMessage: onMessage,
  postMessage: postMessage,
  canBeUsed: canBeUsed,
  type: type,
  averageResponseTime: averageResponseTime,
  microSeconds: microSeconds
};

/***/ }),

/***/ 4005:
/*!******************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/broadcast-channel@4.20.2/node_modules/broadcast-channel/dist/esbrowser/options.js ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fillOptionsWithDefaults": () => (/* binding */ fillOptionsWithDefaults)
/* harmony export */ });
function fillOptionsWithDefaults() {
  var originalOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = JSON.parse(JSON.stringify(originalOptions));

  // main
  if (typeof options.webWorkerSupport === 'undefined') options.webWorkerSupport = true;

  // indexed-db
  if (!options.idb) options.idb = {};
  //  after this time the messages get deleted
  if (!options.idb.ttl) options.idb.ttl = 1000 * 45;
  if (!options.idb.fallbackInterval) options.idb.fallbackInterval = 150;
  //  handles abrupt db onclose events.
  if (originalOptions.idb && typeof originalOptions.idb.onclose === 'function') options.idb.onclose = originalOptions.idb.onclose;

  // localstorage
  if (!options.localstorage) options.localstorage = {};
  if (!options.localstorage.removeTimeout) options.localstorage.removeTimeout = 1000 * 60;

  // custom methods
  if (originalOptions.methods) options.methods = originalOptions.methods;

  // node
  if (!options.node) options.node = {};
  if (!options.node.ttl) options.node.ttl = 1000 * 60 * 2; // 2 minutes;
  /**
   * On linux use 'ulimit -Hn' to get the limit of open files.
   * On ubuntu this was 4096 for me, so we use half of that as maxParallelWrites default.
   */
  if (!options.node.maxParallelWrites) options.node.maxParallelWrites = 2048;
  if (typeof options.node.useFastPath === 'undefined') options.node.useFastPath = true;
  return options;
}

/***/ }),

/***/ 9094:
/*!***************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/broadcast-channel@4.20.2/node_modules/broadcast-channel/dist/esbrowser/util.js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PROMISE_RESOLVED_FALSE": () => (/* binding */ PROMISE_RESOLVED_FALSE),
/* harmony export */   "PROMISE_RESOLVED_TRUE": () => (/* binding */ PROMISE_RESOLVED_TRUE),
/* harmony export */   "PROMISE_RESOLVED_VOID": () => (/* binding */ PROMISE_RESOLVED_VOID),
/* harmony export */   "isPromise": () => (/* binding */ isPromise),
/* harmony export */   "microSeconds": () => (/* binding */ microSeconds),
/* harmony export */   "randomInt": () => (/* binding */ randomInt),
/* harmony export */   "randomToken": () => (/* binding */ randomToken),
/* harmony export */   "sleep": () => (/* binding */ sleep)
/* harmony export */ });
/**
 * returns true if the given object is a promise
 */
function isPromise(obj) {
  return obj && typeof obj.then === 'function';
}
var PROMISE_RESOLVED_FALSE = Promise.resolve(false);
var PROMISE_RESOLVED_TRUE = Promise.resolve(true);
var PROMISE_RESOLVED_VOID = Promise.resolve();
function sleep(time, resolveWith) {
  if (!time) time = 0;
  return new Promise(function (res) {
    return setTimeout(function () {
      return res(resolveWith);
    }, time);
  });
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * https://stackoverflow.com/a/8084248
 */
function randomToken() {
  return Math.random().toString(36).substring(2);
}
var lastMs = 0;
var additional = 0;

/**
 * returns the current time in micro-seconds,
 * WARNING: This is a pseudo-function
 * Performance.now is not reliable in webworkers, so we just make sure to never return the same time.
 * This is enough in browsers, and this function will not be used in nodejs.
 * The main reason for this hack is to ensure that BroadcastChannel behaves equal to production when it is used in fast-running unit tests.
 */
function microSeconds() {
  var ms = new Date().getTime();
  if (ms === lastMs) {
    additional++;
    return ms * 1000 + additional;
  } else {
    lastMs = ms;
    additional = 0;
    return ms * 1000;
  }
}

/***/ }),

/***/ 2406:
/*!*************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/dexie@3.2.7/node_modules/dexie/dist/modern/dexie.mjs ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dexie": () => (/* binding */ Dexie$1),
/* harmony export */   "RangeSet": () => (/* binding */ RangeSet),
/* harmony export */   "default": () => (/* binding */ Dexie$1),
/* harmony export */   "liveQuery": () => (/* binding */ liveQuery),
/* harmony export */   "mergeRanges": () => (/* binding */ mergeRanges),
/* harmony export */   "rangesOverlap": () => (/* binding */ rangesOverlap)
/* harmony export */ });
/*
 * Dexie.js - a minimalistic wrapper for IndexedDB
 * ===============================================
 *
 * By David Fahlander, david.fahlander@gmail.com
 *
 * Version 3.2.7, Wed Mar 20 2024
 *
 * https://dexie.org
 *
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/
 */

const _global = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : global;
const keys = Object.keys;
const isArray = Array.isArray;
if (typeof Promise !== 'undefined' && !_global.Promise) {
  _global.Promise = Promise;
}
function extend(obj, extension) {
  if (typeof extension !== 'object') return obj;
  keys(extension).forEach(function (key) {
    obj[key] = extension[key];
  });
  return obj;
}
const getProto = Object.getPrototypeOf;
const _hasOwn = {}.hasOwnProperty;
function hasOwn(obj, prop) {
  return _hasOwn.call(obj, prop);
}
function props(proto, extension) {
  if (typeof extension === 'function') extension = extension(getProto(proto));
  (typeof Reflect === "undefined" ? keys : Reflect.ownKeys)(extension).forEach(key => {
    setProp(proto, key, extension[key]);
  });
}
const defineProperty = Object.defineProperty;
function setProp(obj, prop, functionOrGetSet, options) {
  defineProperty(obj, prop, extend(functionOrGetSet && hasOwn(functionOrGetSet, "get") && typeof functionOrGetSet.get === 'function' ? {
    get: functionOrGetSet.get,
    set: functionOrGetSet.set,
    configurable: true
  } : {
    value: functionOrGetSet,
    configurable: true,
    writable: true
  }, options));
}
function derive(Child) {
  return {
    from: function (Parent) {
      Child.prototype = Object.create(Parent.prototype);
      setProp(Child.prototype, "constructor", Child);
      return {
        extend: props.bind(null, Child.prototype)
      };
    }
  };
}
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
function getPropertyDescriptor(obj, prop) {
  const pd = getOwnPropertyDescriptor(obj, prop);
  let proto;
  return pd || (proto = getProto(obj)) && getPropertyDescriptor(proto, prop);
}
const _slice = [].slice;
function slice(args, start, end) {
  return _slice.call(args, start, end);
}
function override(origFunc, overridedFactory) {
  return overridedFactory(origFunc);
}
function assert(b) {
  if (!b) throw new Error("Assertion Failed");
}
function asap$1(fn) {
  if (_global.setImmediate) setImmediate(fn);else setTimeout(fn, 0);
}
function arrayToObject(array, extractor) {
  return array.reduce((result, item, i) => {
    var nameAndValue = extractor(item, i);
    if (nameAndValue) result[nameAndValue[0]] = nameAndValue[1];
    return result;
  }, {});
}
function tryCatch(fn, onerror, args) {
  try {
    fn.apply(null, args);
  } catch (ex) {
    onerror && onerror(ex);
  }
}
function getByKeyPath(obj, keyPath) {
  if (typeof keyPath === 'string' && hasOwn(obj, keyPath)) return obj[keyPath];
  if (!keyPath) return obj;
  if (typeof keyPath !== 'string') {
    var rv = [];
    for (var i = 0, l = keyPath.length; i < l; ++i) {
      var val = getByKeyPath(obj, keyPath[i]);
      rv.push(val);
    }
    return rv;
  }
  var period = keyPath.indexOf('.');
  if (period !== -1) {
    var innerObj = obj[keyPath.substr(0, period)];
    return innerObj == null ? undefined : getByKeyPath(innerObj, keyPath.substr(period + 1));
  }
  return undefined;
}
function setByKeyPath(obj, keyPath, value) {
  if (!obj || keyPath === undefined) return;
  if ('isFrozen' in Object && Object.isFrozen(obj)) return;
  if (typeof keyPath !== 'string' && 'length' in keyPath) {
    assert(typeof value !== 'string' && 'length' in value);
    for (var i = 0, l = keyPath.length; i < l; ++i) {
      setByKeyPath(obj, keyPath[i], value[i]);
    }
  } else {
    var period = keyPath.indexOf('.');
    if (period !== -1) {
      var currentKeyPath = keyPath.substr(0, period);
      var remainingKeyPath = keyPath.substr(period + 1);
      if (remainingKeyPath === "") {
        if (value === undefined) {
          if (isArray(obj) && !isNaN(parseInt(currentKeyPath))) obj.splice(currentKeyPath, 1);else delete obj[currentKeyPath];
        } else obj[currentKeyPath] = value;
      } else {
        var innerObj = obj[currentKeyPath];
        if (!innerObj || !hasOwn(obj, currentKeyPath)) innerObj = obj[currentKeyPath] = {};
        setByKeyPath(innerObj, remainingKeyPath, value);
      }
    } else {
      if (value === undefined) {
        if (isArray(obj) && !isNaN(parseInt(keyPath))) obj.splice(keyPath, 1);else delete obj[keyPath];
      } else obj[keyPath] = value;
    }
  }
}
function delByKeyPath(obj, keyPath) {
  if (typeof keyPath === 'string') setByKeyPath(obj, keyPath, undefined);else if ('length' in keyPath) [].map.call(keyPath, function (kp) {
    setByKeyPath(obj, kp, undefined);
  });
}
function shallowClone(obj) {
  var rv = {};
  for (var m in obj) {
    if (hasOwn(obj, m)) rv[m] = obj[m];
  }
  return rv;
}
const concat = [].concat;
function flatten(a) {
  return concat.apply([], a);
}
const intrinsicTypeNames = "BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(',').concat(flatten([8, 16, 32, 64].map(num => ["Int", "Uint", "Float"].map(t => t + num + "Array")))).filter(t => _global[t]);
const intrinsicTypes = intrinsicTypeNames.map(t => _global[t]);
arrayToObject(intrinsicTypeNames, x => [x, true]);
let circularRefs = null;
function deepClone(any) {
  circularRefs = typeof WeakMap !== 'undefined' && new WeakMap();
  const rv = innerDeepClone(any);
  circularRefs = null;
  return rv;
}
function innerDeepClone(any) {
  if (!any || typeof any !== 'object') return any;
  let rv = circularRefs && circularRefs.get(any);
  if (rv) return rv;
  if (isArray(any)) {
    rv = [];
    circularRefs && circularRefs.set(any, rv);
    for (var i = 0, l = any.length; i < l; ++i) {
      rv.push(innerDeepClone(any[i]));
    }
  } else if (intrinsicTypes.indexOf(any.constructor) >= 0) {
    rv = any;
  } else {
    const proto = getProto(any);
    rv = proto === Object.prototype ? {} : Object.create(proto);
    circularRefs && circularRefs.set(any, rv);
    for (var prop in any) {
      if (hasOwn(any, prop)) {
        rv[prop] = innerDeepClone(any[prop]);
      }
    }
  }
  return rv;
}
const {
  toString
} = {};
function toStringTag(o) {
  return toString.call(o).slice(8, -1);
}
const iteratorSymbol = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
const getIteratorOf = typeof iteratorSymbol === "symbol" ? function (x) {
  var i;
  return x != null && (i = x[iteratorSymbol]) && i.apply(x);
} : function () {
  return null;
};
const NO_CHAR_ARRAY = {};
function getArrayOf(arrayLike) {
  var i, a, x, it;
  if (arguments.length === 1) {
    if (isArray(arrayLike)) return arrayLike.slice();
    if (this === NO_CHAR_ARRAY && typeof arrayLike === 'string') return [arrayLike];
    if (it = getIteratorOf(arrayLike)) {
      a = [];
      while (x = it.next(), !x.done) a.push(x.value);
      return a;
    }
    if (arrayLike == null) return [arrayLike];
    i = arrayLike.length;
    if (typeof i === 'number') {
      a = new Array(i);
      while (i--) a[i] = arrayLike[i];
      return a;
    }
    return [arrayLike];
  }
  i = arguments.length;
  a = new Array(i);
  while (i--) a[i] = arguments[i];
  return a;
}
const isAsyncFunction = typeof Symbol !== 'undefined' ? fn => fn[Symbol.toStringTag] === 'AsyncFunction' : () => false;
var debug = typeof location !== 'undefined' && /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
function setDebug(value, filter) {
  debug = value;
  libraryFilter = filter;
}
var libraryFilter = () => true;
const NEEDS_THROW_FOR_STACK = !new Error("").stack;
function getErrorWithStack() {
  if (NEEDS_THROW_FOR_STACK) try {
    getErrorWithStack.arguments;
    throw new Error();
  } catch (e) {
    return e;
  }
  return new Error();
}
function prettyStack(exception, numIgnoredFrames) {
  var stack = exception.stack;
  if (!stack) return "";
  numIgnoredFrames = numIgnoredFrames || 0;
  if (stack.indexOf(exception.name) === 0) numIgnoredFrames += (exception.name + exception.message).split('\n').length;
  return stack.split('\n').slice(numIgnoredFrames).filter(libraryFilter).map(frame => "\n" + frame).join('');
}
var dexieErrorNames = ['Modify', 'Bulk', 'OpenFailed', 'VersionChange', 'Schema', 'Upgrade', 'InvalidTable', 'MissingAPI', 'NoSuchDatabase', 'InvalidArgument', 'SubTransaction', 'Unsupported', 'Internal', 'DatabaseClosed', 'PrematureCommit', 'ForeignAwait'];
var idbDomErrorNames = ['Unknown', 'Constraint', 'Data', 'TransactionInactive', 'ReadOnly', 'Version', 'NotFound', 'InvalidState', 'InvalidAccess', 'Abort', 'Timeout', 'QuotaExceeded', 'Syntax', 'DataClone'];
var errorList = dexieErrorNames.concat(idbDomErrorNames);
var defaultTexts = {
  VersionChanged: "Database version changed by other database connection",
  DatabaseClosed: "Database has been closed",
  Abort: "Transaction aborted",
  TransactionInactive: "Transaction has already completed or failed",
  MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"
};
function DexieError(name, msg) {
  this._e = getErrorWithStack();
  this.name = name;
  this.message = msg;
}
derive(DexieError).from(Error).extend({
  stack: {
    get: function () {
      return this._stack || (this._stack = this.name + ": " + this.message + prettyStack(this._e, 2));
    }
  },
  toString: function () {
    return this.name + ": " + this.message;
  }
});
function getMultiErrorMessage(msg, failures) {
  return msg + ". Errors: " + Object.keys(failures).map(key => failures[key].toString()).filter((v, i, s) => s.indexOf(v) === i).join('\n');
}
function ModifyError(msg, failures, successCount, failedKeys) {
  this._e = getErrorWithStack();
  this.failures = failures;
  this.failedKeys = failedKeys;
  this.successCount = successCount;
  this.message = getMultiErrorMessage(msg, failures);
}
derive(ModifyError).from(DexieError);
function BulkError(msg, failures) {
  this._e = getErrorWithStack();
  this.name = "BulkError";
  this.failures = Object.keys(failures).map(pos => failures[pos]);
  this.failuresByPos = failures;
  this.message = getMultiErrorMessage(msg, failures);
}
derive(BulkError).from(DexieError);
var errnames = errorList.reduce((obj, name) => (obj[name] = name + "Error", obj), {});
const BaseException = DexieError;
var exceptions = errorList.reduce((obj, name) => {
  var fullName = name + "Error";
  function DexieError(msgOrInner, inner) {
    this._e = getErrorWithStack();
    this.name = fullName;
    if (!msgOrInner) {
      this.message = defaultTexts[name] || fullName;
      this.inner = null;
    } else if (typeof msgOrInner === 'string') {
      this.message = `${msgOrInner}${!inner ? '' : '\n ' + inner}`;
      this.inner = inner || null;
    } else if (typeof msgOrInner === 'object') {
      this.message = `${msgOrInner.name} ${msgOrInner.message}`;
      this.inner = msgOrInner;
    }
  }
  derive(DexieError).from(BaseException);
  obj[name] = DexieError;
  return obj;
}, {});
exceptions.Syntax = SyntaxError;
exceptions.Type = TypeError;
exceptions.Range = RangeError;
var exceptionMap = idbDomErrorNames.reduce((obj, name) => {
  obj[name + "Error"] = exceptions[name];
  return obj;
}, {});
function mapError(domError, message) {
  if (!domError || domError instanceof DexieError || domError instanceof TypeError || domError instanceof SyntaxError || !domError.name || !exceptionMap[domError.name]) return domError;
  var rv = new exceptionMap[domError.name](message || domError.message, domError);
  if ("stack" in domError) {
    setProp(rv, "stack", {
      get: function () {
        return this.inner.stack;
      }
    });
  }
  return rv;
}
var fullNameExceptions = errorList.reduce((obj, name) => {
  if (["Syntax", "Type", "Range"].indexOf(name) === -1) obj[name + "Error"] = exceptions[name];
  return obj;
}, {});
fullNameExceptions.ModifyError = ModifyError;
fullNameExceptions.DexieError = DexieError;
fullNameExceptions.BulkError = BulkError;
function nop() {}
function mirror(val) {
  return val;
}
function pureFunctionChain(f1, f2) {
  if (f1 == null || f1 === mirror) return f2;
  return function (val) {
    return f2(f1(val));
  };
}
function callBoth(on1, on2) {
  return function () {
    on1.apply(this, arguments);
    on2.apply(this, arguments);
  };
}
function hookCreatingChain(f1, f2) {
  if (f1 === nop) return f2;
  return function () {
    var res = f1.apply(this, arguments);
    if (res !== undefined) arguments[0] = res;
    var onsuccess = this.onsuccess,
      onerror = this.onerror;
    this.onsuccess = null;
    this.onerror = null;
    var res2 = f2.apply(this, arguments);
    if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
    if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
    return res2 !== undefined ? res2 : res;
  };
}
function hookDeletingChain(f1, f2) {
  if (f1 === nop) return f2;
  return function () {
    f1.apply(this, arguments);
    var onsuccess = this.onsuccess,
      onerror = this.onerror;
    this.onsuccess = this.onerror = null;
    f2.apply(this, arguments);
    if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
    if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
  };
}
function hookUpdatingChain(f1, f2) {
  if (f1 === nop) return f2;
  return function (modifications) {
    var res = f1.apply(this, arguments);
    extend(modifications, res);
    var onsuccess = this.onsuccess,
      onerror = this.onerror;
    this.onsuccess = null;
    this.onerror = null;
    var res2 = f2.apply(this, arguments);
    if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
    if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
    return res === undefined ? res2 === undefined ? undefined : res2 : extend(res, res2);
  };
}
function reverseStoppableEventChain(f1, f2) {
  if (f1 === nop) return f2;
  return function () {
    if (f2.apply(this, arguments) === false) return false;
    return f1.apply(this, arguments);
  };
}
function promisableChain(f1, f2) {
  if (f1 === nop) return f2;
  return function () {
    var res = f1.apply(this, arguments);
    if (res && typeof res.then === 'function') {
      var thiz = this,
        i = arguments.length,
        args = new Array(i);
      while (i--) args[i] = arguments[i];
      return res.then(function () {
        return f2.apply(thiz, args);
      });
    }
    return f2.apply(this, arguments);
  };
}
var INTERNAL = {};
const LONG_STACKS_CLIP_LIMIT = 100,
  MAX_LONG_STACKS = 20,
  ZONE_ECHO_LIMIT = 100,
  [resolvedNativePromise, nativePromiseProto, resolvedGlobalPromise] = typeof Promise === 'undefined' ? [] : (() => {
    let globalP = Promise.resolve();
    if (typeof crypto === 'undefined' || !crypto.subtle) return [globalP, getProto(globalP), globalP];
    const nativeP = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
    return [nativeP, getProto(nativeP), globalP];
  })(),
  nativePromiseThen = nativePromiseProto && nativePromiseProto.then;
const NativePromise = resolvedNativePromise && resolvedNativePromise.constructor;
const patchGlobalPromise = !!resolvedGlobalPromise;
var stack_being_generated = false;
var schedulePhysicalTick = resolvedGlobalPromise ? () => {
  resolvedGlobalPromise.then(physicalTick);
} : _global.setImmediate ? setImmediate.bind(null, physicalTick) : _global.MutationObserver ? () => {
  var hiddenDiv = document.createElement("div");
  new MutationObserver(() => {
    physicalTick();
    hiddenDiv = null;
  }).observe(hiddenDiv, {
    attributes: true
  });
  hiddenDiv.setAttribute('i', '1');
} : () => {
  setTimeout(physicalTick, 0);
};
var asap = function (callback, args) {
  microtickQueue.push([callback, args]);
  if (needsNewPhysicalTick) {
    schedulePhysicalTick();
    needsNewPhysicalTick = false;
  }
};
var isOutsideMicroTick = true,
  needsNewPhysicalTick = true,
  unhandledErrors = [],
  rejectingErrors = [],
  currentFulfiller = null,
  rejectionMapper = mirror;
var globalPSD = {
  id: 'global',
  global: true,
  ref: 0,
  unhandleds: [],
  onunhandled: globalError,
  pgp: false,
  env: {},
  finalize: function () {
    this.unhandleds.forEach(uh => {
      try {
        globalError(uh[0], uh[1]);
      } catch (e) {}
    });
  }
};
var PSD = globalPSD;
var microtickQueue = [];
var numScheduledCalls = 0;
var tickFinalizers = [];
function DexiePromise(fn) {
  if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
  this._listeners = [];
  this.onuncatched = nop;
  this._lib = false;
  var psd = this._PSD = PSD;
  if (debug) {
    this._stackHolder = getErrorWithStack();
    this._prev = null;
    this._numPrev = 0;
  }
  if (typeof fn !== 'function') {
    if (fn !== INTERNAL) throw new TypeError('Not a function');
    this._state = arguments[1];
    this._value = arguments[2];
    if (this._state === false) handleRejection(this, this._value);
    return;
  }
  this._state = null;
  this._value = null;
  ++psd.ref;
  executePromiseTask(this, fn);
}
const thenProp = {
  get: function () {
    var psd = PSD,
      microTaskId = totalEchoes;
    function then(onFulfilled, onRejected) {
      var possibleAwait = !psd.global && (psd !== PSD || microTaskId !== totalEchoes);
      const cleanup = possibleAwait && !decrementExpectedAwaits();
      var rv = new DexiePromise((resolve, reject) => {
        propagateToListener(this, new Listener(nativeAwaitCompatibleWrap(onFulfilled, psd, possibleAwait, cleanup), nativeAwaitCompatibleWrap(onRejected, psd, possibleAwait, cleanup), resolve, reject, psd));
      });
      debug && linkToPreviousPromise(rv, this);
      return rv;
    }
    then.prototype = INTERNAL;
    return then;
  },
  set: function (value) {
    setProp(this, 'then', value && value.prototype === INTERNAL ? thenProp : {
      get: function () {
        return value;
      },
      set: thenProp.set
    });
  }
};
props(DexiePromise.prototype, {
  then: thenProp,
  _then: function (onFulfilled, onRejected) {
    propagateToListener(this, new Listener(null, null, onFulfilled, onRejected, PSD));
  },
  catch: function (onRejected) {
    if (arguments.length === 1) return this.then(null, onRejected);
    var type = arguments[0],
      handler = arguments[1];
    return typeof type === 'function' ? this.then(null, err => err instanceof type ? handler(err) : PromiseReject(err)) : this.then(null, err => err && err.name === type ? handler(err) : PromiseReject(err));
  },
  finally: function (onFinally) {
    return this.then(value => {
      onFinally();
      return value;
    }, err => {
      onFinally();
      return PromiseReject(err);
    });
  },
  stack: {
    get: function () {
      if (this._stack) return this._stack;
      try {
        stack_being_generated = true;
        var stacks = getStack(this, [], MAX_LONG_STACKS);
        var stack = stacks.join("\nFrom previous: ");
        if (this._state !== null) this._stack = stack;
        return stack;
      } finally {
        stack_being_generated = false;
      }
    }
  },
  timeout: function (ms, msg) {
    return ms < Infinity ? new DexiePromise((resolve, reject) => {
      var handle = setTimeout(() => reject(new exceptions.Timeout(msg)), ms);
      this.then(resolve, reject).finally(clearTimeout.bind(null, handle));
    }) : this;
  }
});
if (typeof Symbol !== 'undefined' && Symbol.toStringTag) setProp(DexiePromise.prototype, Symbol.toStringTag, 'Dexie.Promise');
globalPSD.env = snapShot();
function Listener(onFulfilled, onRejected, resolve, reject, zone) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.resolve = resolve;
  this.reject = reject;
  this.psd = zone;
}
props(DexiePromise, {
  all: function () {
    var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
    return new DexiePromise(function (resolve, reject) {
      if (values.length === 0) resolve([]);
      var remaining = values.length;
      values.forEach((a, i) => DexiePromise.resolve(a).then(x => {
        values[i] = x;
        if (! --remaining) resolve(values);
      }, reject));
    });
  },
  resolve: value => {
    if (value instanceof DexiePromise) return value;
    if (value && typeof value.then === 'function') return new DexiePromise((resolve, reject) => {
      value.then(resolve, reject);
    });
    var rv = new DexiePromise(INTERNAL, true, value);
    linkToPreviousPromise(rv, currentFulfiller);
    return rv;
  },
  reject: PromiseReject,
  race: function () {
    var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
    return new DexiePromise((resolve, reject) => {
      values.map(value => DexiePromise.resolve(value).then(resolve, reject));
    });
  },
  PSD: {
    get: () => PSD,
    set: value => PSD = value
  },
  totalEchoes: {
    get: () => totalEchoes
  },
  newPSD: newScope,
  usePSD: usePSD,
  scheduler: {
    get: () => asap,
    set: value => {
      asap = value;
    }
  },
  rejectionMapper: {
    get: () => rejectionMapper,
    set: value => {
      rejectionMapper = value;
    }
  },
  follow: (fn, zoneProps) => {
    return new DexiePromise((resolve, reject) => {
      return newScope((resolve, reject) => {
        var psd = PSD;
        psd.unhandleds = [];
        psd.onunhandled = reject;
        psd.finalize = callBoth(function () {
          run_at_end_of_this_or_next_physical_tick(() => {
            this.unhandleds.length === 0 ? resolve() : reject(this.unhandleds[0]);
          });
        }, psd.finalize);
        fn();
      }, zoneProps, resolve, reject);
    });
  }
});
if (NativePromise) {
  if (NativePromise.allSettled) setProp(DexiePromise, "allSettled", function () {
    const possiblePromises = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
    return new DexiePromise(resolve => {
      if (possiblePromises.length === 0) resolve([]);
      let remaining = possiblePromises.length;
      const results = new Array(remaining);
      possiblePromises.forEach((p, i) => DexiePromise.resolve(p).then(value => results[i] = {
        status: "fulfilled",
        value
      }, reason => results[i] = {
        status: "rejected",
        reason
      }).then(() => --remaining || resolve(results)));
    });
  });
  if (NativePromise.any && typeof AggregateError !== 'undefined') setProp(DexiePromise, "any", function () {
    const possiblePromises = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
    return new DexiePromise((resolve, reject) => {
      if (possiblePromises.length === 0) reject(new AggregateError([]));
      let remaining = possiblePromises.length;
      const failures = new Array(remaining);
      possiblePromises.forEach((p, i) => DexiePromise.resolve(p).then(value => resolve(value), failure => {
        failures[i] = failure;
        if (! --remaining) reject(new AggregateError(failures));
      }));
    });
  });
}
function executePromiseTask(promise, fn) {
  try {
    fn(value => {
      if (promise._state !== null) return;
      if (value === promise) throw new TypeError('A promise cannot be resolved with itself.');
      var shouldExecuteTick = promise._lib && beginMicroTickScope();
      if (value && typeof value.then === 'function') {
        executePromiseTask(promise, (resolve, reject) => {
          value instanceof DexiePromise ? value._then(resolve, reject) : value.then(resolve, reject);
        });
      } else {
        promise._state = true;
        promise._value = value;
        propagateAllListeners(promise);
      }
      if (shouldExecuteTick) endMicroTickScope();
    }, handleRejection.bind(null, promise));
  } catch (ex) {
    handleRejection(promise, ex);
  }
}
function handleRejection(promise, reason) {
  rejectingErrors.push(reason);
  if (promise._state !== null) return;
  var shouldExecuteTick = promise._lib && beginMicroTickScope();
  reason = rejectionMapper(reason);
  promise._state = false;
  promise._value = reason;
  debug && reason !== null && typeof reason === 'object' && !reason._promise && tryCatch(() => {
    var origProp = getPropertyDescriptor(reason, "stack");
    reason._promise = promise;
    setProp(reason, "stack", {
      get: () => stack_being_generated ? origProp && (origProp.get ? origProp.get.apply(reason) : origProp.value) : promise.stack
    });
  });
  addPossiblyUnhandledError(promise);
  propagateAllListeners(promise);
  if (shouldExecuteTick) endMicroTickScope();
}
function propagateAllListeners(promise) {
  var listeners = promise._listeners;
  promise._listeners = [];
  for (var i = 0, len = listeners.length; i < len; ++i) {
    propagateToListener(promise, listeners[i]);
  }
  var psd = promise._PSD;
  --psd.ref || psd.finalize();
  if (numScheduledCalls === 0) {
    ++numScheduledCalls;
    asap(() => {
      if (--numScheduledCalls === 0) finalizePhysicalTick();
    }, []);
  }
}
function propagateToListener(promise, listener) {
  if (promise._state === null) {
    promise._listeners.push(listener);
    return;
  }
  var cb = promise._state ? listener.onFulfilled : listener.onRejected;
  if (cb === null) {
    return (promise._state ? listener.resolve : listener.reject)(promise._value);
  }
  ++listener.psd.ref;
  ++numScheduledCalls;
  asap(callListener, [cb, promise, listener]);
}
function callListener(cb, promise, listener) {
  try {
    currentFulfiller = promise;
    var ret,
      value = promise._value;
    if (promise._state) {
      ret = cb(value);
    } else {
      if (rejectingErrors.length) rejectingErrors = [];
      ret = cb(value);
      if (rejectingErrors.indexOf(value) === -1) markErrorAsHandled(promise);
    }
    listener.resolve(ret);
  } catch (e) {
    listener.reject(e);
  } finally {
    currentFulfiller = null;
    if (--numScheduledCalls === 0) finalizePhysicalTick();
    --listener.psd.ref || listener.psd.finalize();
  }
}
function getStack(promise, stacks, limit) {
  if (stacks.length === limit) return stacks;
  var stack = "";
  if (promise._state === false) {
    var failure = promise._value,
      errorName,
      message;
    if (failure != null) {
      errorName = failure.name || "Error";
      message = failure.message || failure;
      stack = prettyStack(failure, 0);
    } else {
      errorName = failure;
      message = "";
    }
    stacks.push(errorName + (message ? ": " + message : "") + stack);
  }
  if (debug) {
    stack = prettyStack(promise._stackHolder, 2);
    if (stack && stacks.indexOf(stack) === -1) stacks.push(stack);
    if (promise._prev) getStack(promise._prev, stacks, limit);
  }
  return stacks;
}
function linkToPreviousPromise(promise, prev) {
  var numPrev = prev ? prev._numPrev + 1 : 0;
  if (numPrev < LONG_STACKS_CLIP_LIMIT) {
    promise._prev = prev;
    promise._numPrev = numPrev;
  }
}
function physicalTick() {
  beginMicroTickScope() && endMicroTickScope();
}
function beginMicroTickScope() {
  var wasRootExec = isOutsideMicroTick;
  isOutsideMicroTick = false;
  needsNewPhysicalTick = false;
  return wasRootExec;
}
function endMicroTickScope() {
  var callbacks, i, l;
  do {
    while (microtickQueue.length > 0) {
      callbacks = microtickQueue;
      microtickQueue = [];
      l = callbacks.length;
      for (i = 0; i < l; ++i) {
        var item = callbacks[i];
        item[0].apply(null, item[1]);
      }
    }
  } while (microtickQueue.length > 0);
  isOutsideMicroTick = true;
  needsNewPhysicalTick = true;
}
function finalizePhysicalTick() {
  var unhandledErrs = unhandledErrors;
  unhandledErrors = [];
  unhandledErrs.forEach(p => {
    p._PSD.onunhandled.call(null, p._value, p);
  });
  var finalizers = tickFinalizers.slice(0);
  var i = finalizers.length;
  while (i) finalizers[--i]();
}
function run_at_end_of_this_or_next_physical_tick(fn) {
  function finalizer() {
    fn();
    tickFinalizers.splice(tickFinalizers.indexOf(finalizer), 1);
  }
  tickFinalizers.push(finalizer);
  ++numScheduledCalls;
  asap(() => {
    if (--numScheduledCalls === 0) finalizePhysicalTick();
  }, []);
}
function addPossiblyUnhandledError(promise) {
  if (!unhandledErrors.some(p => p._value === promise._value)) unhandledErrors.push(promise);
}
function markErrorAsHandled(promise) {
  var i = unhandledErrors.length;
  while (i) if (unhandledErrors[--i]._value === promise._value) {
    unhandledErrors.splice(i, 1);
    return;
  }
}
function PromiseReject(reason) {
  return new DexiePromise(INTERNAL, false, reason);
}
function wrap(fn, errorCatcher) {
  var psd = PSD;
  return function () {
    var wasRootExec = beginMicroTickScope(),
      outerScope = PSD;
    try {
      switchToZone(psd, true);
      return fn.apply(this, arguments);
    } catch (e) {
      errorCatcher && errorCatcher(e);
    } finally {
      switchToZone(outerScope, false);
      if (wasRootExec) endMicroTickScope();
    }
  };
}
const task = {
  awaits: 0,
  echoes: 0,
  id: 0
};
var taskCounter = 0;
var zoneStack = [];
var zoneEchoes = 0;
var totalEchoes = 0;
var zone_id_counter = 0;
function newScope(fn, props, a1, a2) {
  var parent = PSD,
    psd = Object.create(parent);
  psd.parent = parent;
  psd.ref = 0;
  psd.global = false;
  psd.id = ++zone_id_counter;
  var globalEnv = globalPSD.env;
  psd.env = patchGlobalPromise ? {
    Promise: DexiePromise,
    PromiseProp: {
      value: DexiePromise,
      configurable: true,
      writable: true
    },
    all: DexiePromise.all,
    race: DexiePromise.race,
    allSettled: DexiePromise.allSettled,
    any: DexiePromise.any,
    resolve: DexiePromise.resolve,
    reject: DexiePromise.reject,
    nthen: getPatchedPromiseThen(globalEnv.nthen, psd),
    gthen: getPatchedPromiseThen(globalEnv.gthen, psd)
  } : {};
  if (props) extend(psd, props);
  ++parent.ref;
  psd.finalize = function () {
    --this.parent.ref || this.parent.finalize();
  };
  var rv = usePSD(psd, fn, a1, a2);
  if (psd.ref === 0) psd.finalize();
  return rv;
}
function incrementExpectedAwaits() {
  if (!task.id) task.id = ++taskCounter;
  ++task.awaits;
  task.echoes += ZONE_ECHO_LIMIT;
  return task.id;
}
function decrementExpectedAwaits() {
  if (!task.awaits) return false;
  if (--task.awaits === 0) task.id = 0;
  task.echoes = task.awaits * ZONE_ECHO_LIMIT;
  return true;
}
if (('' + nativePromiseThen).indexOf('[native code]') === -1) {
  incrementExpectedAwaits = decrementExpectedAwaits = nop;
}
function onPossibleParallellAsync(possiblePromise) {
  if (task.echoes && possiblePromise && possiblePromise.constructor === NativePromise) {
    incrementExpectedAwaits();
    return possiblePromise.then(x => {
      decrementExpectedAwaits();
      return x;
    }, e => {
      decrementExpectedAwaits();
      return rejection(e);
    });
  }
  return possiblePromise;
}
function zoneEnterEcho(targetZone) {
  ++totalEchoes;
  if (!task.echoes || --task.echoes === 0) {
    task.echoes = task.id = 0;
  }
  zoneStack.push(PSD);
  switchToZone(targetZone, true);
}
function zoneLeaveEcho() {
  var zone = zoneStack[zoneStack.length - 1];
  zoneStack.pop();
  switchToZone(zone, false);
}
function switchToZone(targetZone, bEnteringZone) {
  var currentZone = PSD;
  if (bEnteringZone ? task.echoes && (!zoneEchoes++ || targetZone !== PSD) : zoneEchoes && (! --zoneEchoes || targetZone !== PSD)) {
    enqueueNativeMicroTask(bEnteringZone ? zoneEnterEcho.bind(null, targetZone) : zoneLeaveEcho);
  }
  if (targetZone === PSD) return;
  PSD = targetZone;
  if (currentZone === globalPSD) globalPSD.env = snapShot();
  if (patchGlobalPromise) {
    var GlobalPromise = globalPSD.env.Promise;
    var targetEnv = targetZone.env;
    nativePromiseProto.then = targetEnv.nthen;
    GlobalPromise.prototype.then = targetEnv.gthen;
    if (currentZone.global || targetZone.global) {
      Object.defineProperty(_global, 'Promise', targetEnv.PromiseProp);
      GlobalPromise.all = targetEnv.all;
      GlobalPromise.race = targetEnv.race;
      GlobalPromise.resolve = targetEnv.resolve;
      GlobalPromise.reject = targetEnv.reject;
      if (targetEnv.allSettled) GlobalPromise.allSettled = targetEnv.allSettled;
      if (targetEnv.any) GlobalPromise.any = targetEnv.any;
    }
  }
}
function snapShot() {
  var GlobalPromise = _global.Promise;
  return patchGlobalPromise ? {
    Promise: GlobalPromise,
    PromiseProp: Object.getOwnPropertyDescriptor(_global, "Promise"),
    all: GlobalPromise.all,
    race: GlobalPromise.race,
    allSettled: GlobalPromise.allSettled,
    any: GlobalPromise.any,
    resolve: GlobalPromise.resolve,
    reject: GlobalPromise.reject,
    nthen: nativePromiseProto.then,
    gthen: GlobalPromise.prototype.then
  } : {};
}
function usePSD(psd, fn, a1, a2, a3) {
  var outerScope = PSD;
  try {
    switchToZone(psd, true);
    return fn(a1, a2, a3);
  } finally {
    switchToZone(outerScope, false);
  }
}
function enqueueNativeMicroTask(job) {
  nativePromiseThen.call(resolvedNativePromise, job);
}
function nativeAwaitCompatibleWrap(fn, zone, possibleAwait, cleanup) {
  return typeof fn !== 'function' ? fn : function () {
    var outerZone = PSD;
    if (possibleAwait) incrementExpectedAwaits();
    switchToZone(zone, true);
    try {
      return fn.apply(this, arguments);
    } finally {
      switchToZone(outerZone, false);
      if (cleanup) enqueueNativeMicroTask(decrementExpectedAwaits);
    }
  };
}
function getPatchedPromiseThen(origThen, zone) {
  return function (onResolved, onRejected) {
    return origThen.call(this, nativeAwaitCompatibleWrap(onResolved, zone), nativeAwaitCompatibleWrap(onRejected, zone));
  };
}
const UNHANDLEDREJECTION = "unhandledrejection";
function globalError(err, promise) {
  var rv;
  try {
    rv = promise.onuncatched(err);
  } catch (e) {}
  if (rv !== false) try {
    var event,
      eventData = {
        promise: promise,
        reason: err
      };
    if (_global.document && document.createEvent) {
      event = document.createEvent('Event');
      event.initEvent(UNHANDLEDREJECTION, true, true);
      extend(event, eventData);
    } else if (_global.CustomEvent) {
      event = new CustomEvent(UNHANDLEDREJECTION, {
        detail: eventData
      });
      extend(event, eventData);
    }
    if (event && _global.dispatchEvent) {
      dispatchEvent(event);
      if (!_global.PromiseRejectionEvent && _global.onunhandledrejection) try {
        _global.onunhandledrejection(event);
      } catch (_) {}
    }
    if (debug && event && !event.defaultPrevented) {
      console.warn(`Unhandled rejection: ${err.stack || err}`);
    }
  } catch (e) {}
}
var rejection = DexiePromise.reject;
function tempTransaction(db, mode, storeNames, fn) {
  if (!db.idbdb || !db._state.openComplete && !PSD.letThrough && !db._vip) {
    if (db._state.openComplete) {
      return rejection(new exceptions.DatabaseClosed(db._state.dbOpenError));
    }
    if (!db._state.isBeingOpened) {
      if (!db._options.autoOpen) return rejection(new exceptions.DatabaseClosed());
      db.open().catch(nop);
    }
    return db._state.dbReadyPromise.then(() => tempTransaction(db, mode, storeNames, fn));
  } else {
    var trans = db._createTransaction(mode, storeNames, db._dbSchema);
    try {
      trans.create();
      db._state.PR1398_maxLoop = 3;
    } catch (ex) {
      if (ex.name === errnames.InvalidState && db.isOpen() && --db._state.PR1398_maxLoop > 0) {
        console.warn('Dexie: Need to reopen db');
        db._close();
        return db.open().then(() => tempTransaction(db, mode, storeNames, fn));
      }
      return rejection(ex);
    }
    return trans._promise(mode, (resolve, reject) => {
      return newScope(() => {
        PSD.trans = trans;
        return fn(resolve, reject, trans);
      });
    }).then(result => {
      return trans._completion.then(() => result);
    });
  }
}
const DEXIE_VERSION = '3.2.7';
const maxString = String.fromCharCode(65535);
const minKey = -Infinity;
const INVALID_KEY_ARGUMENT = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.";
const STRING_EXPECTED = "String expected.";
const connections = [];
const isIEOrEdge = typeof navigator !== 'undefined' && /(MSIE|Trident|Edge)/.test(navigator.userAgent);
const hasIEDeleteObjectStoreBug = isIEOrEdge;
const hangsOnDeleteLargeKeyRange = isIEOrEdge;
const dexieStackFrameFilter = frame => !/(dexie\.js|dexie\.min\.js)/.test(frame);
const DBNAMES_DB = '__dbnames';
const READONLY = 'readonly';
const READWRITE = 'readwrite';
function combine(filter1, filter2) {
  return filter1 ? filter2 ? function () {
    return filter1.apply(this, arguments) && filter2.apply(this, arguments);
  } : filter1 : filter2;
}
const AnyRange = {
  type: 3,
  lower: -Infinity,
  lowerOpen: false,
  upper: [[]],
  upperOpen: false
};
function workaroundForUndefinedPrimKey(keyPath) {
  return typeof keyPath === "string" && !/\./.test(keyPath) ? obj => {
    if (obj[keyPath] === undefined && keyPath in obj) {
      obj = deepClone(obj);
      delete obj[keyPath];
    }
    return obj;
  } : obj => obj;
}
class Table {
  _trans(mode, fn, writeLocked) {
    const trans = this._tx || PSD.trans;
    const tableName = this.name;
    function checkTableInTransaction(resolve, reject, trans) {
      if (!trans.schema[tableName]) throw new exceptions.NotFound("Table " + tableName + " not part of transaction");
      return fn(trans.idbtrans, trans);
    }
    const wasRootExec = beginMicroTickScope();
    try {
      return trans && trans.db === this.db ? trans === PSD.trans ? trans._promise(mode, checkTableInTransaction, writeLocked) : newScope(() => trans._promise(mode, checkTableInTransaction, writeLocked), {
        trans: trans,
        transless: PSD.transless || PSD
      }) : tempTransaction(this.db, mode, [this.name], checkTableInTransaction);
    } finally {
      if (wasRootExec) endMicroTickScope();
    }
  }
  get(keyOrCrit, cb) {
    if (keyOrCrit && keyOrCrit.constructor === Object) return this.where(keyOrCrit).first(cb);
    return this._trans('readonly', trans => {
      return this.core.get({
        trans,
        key: keyOrCrit
      }).then(res => this.hook.reading.fire(res));
    }).then(cb);
  }
  where(indexOrCrit) {
    if (typeof indexOrCrit === 'string') return new this.db.WhereClause(this, indexOrCrit);
    if (isArray(indexOrCrit)) return new this.db.WhereClause(this, `[${indexOrCrit.join('+')}]`);
    const keyPaths = keys(indexOrCrit);
    if (keyPaths.length === 1) return this.where(keyPaths[0]).equals(indexOrCrit[keyPaths[0]]);
    const compoundIndex = this.schema.indexes.concat(this.schema.primKey).filter(ix => {
      if (ix.compound && keyPaths.every(keyPath => ix.keyPath.indexOf(keyPath) >= 0)) {
        for (let i = 0; i < keyPaths.length; ++i) {
          if (keyPaths.indexOf(ix.keyPath[i]) === -1) return false;
        }
        return true;
      }
      return false;
    }).sort((a, b) => a.keyPath.length - b.keyPath.length)[0];
    if (compoundIndex && this.db._maxKey !== maxString) {
      const keyPathsInValidOrder = compoundIndex.keyPath.slice(0, keyPaths.length);
      return this.where(keyPathsInValidOrder).equals(keyPathsInValidOrder.map(kp => indexOrCrit[kp]));
    }
    if (!compoundIndex && debug) console.warn(`The query ${JSON.stringify(indexOrCrit)} on ${this.name} would benefit of a ` + `compound index [${keyPaths.join('+')}]`);
    const {
      idxByName
    } = this.schema;
    const idb = this.db._deps.indexedDB;
    function equals(a, b) {
      try {
        return idb.cmp(a, b) === 0;
      } catch (e) {
        return false;
      }
    }
    const [idx, filterFunction] = keyPaths.reduce(([prevIndex, prevFilterFn], keyPath) => {
      const index = idxByName[keyPath];
      const value = indexOrCrit[keyPath];
      return [prevIndex || index, prevIndex || !index ? combine(prevFilterFn, index && index.multi ? x => {
        const prop = getByKeyPath(x, keyPath);
        return isArray(prop) && prop.some(item => equals(value, item));
      } : x => equals(value, getByKeyPath(x, keyPath))) : prevFilterFn];
    }, [null, null]);
    return idx ? this.where(idx.name).equals(indexOrCrit[idx.keyPath]).filter(filterFunction) : compoundIndex ? this.filter(filterFunction) : this.where(keyPaths).equals('');
  }
  filter(filterFunction) {
    return this.toCollection().and(filterFunction);
  }
  count(thenShortcut) {
    return this.toCollection().count(thenShortcut);
  }
  offset(offset) {
    return this.toCollection().offset(offset);
  }
  limit(numRows) {
    return this.toCollection().limit(numRows);
  }
  each(callback) {
    return this.toCollection().each(callback);
  }
  toArray(thenShortcut) {
    return this.toCollection().toArray(thenShortcut);
  }
  toCollection() {
    return new this.db.Collection(new this.db.WhereClause(this));
  }
  orderBy(index) {
    return new this.db.Collection(new this.db.WhereClause(this, isArray(index) ? `[${index.join('+')}]` : index));
  }
  reverse() {
    return this.toCollection().reverse();
  }
  mapToClass(constructor) {
    this.schema.mappedClass = constructor;
    const readHook = obj => {
      if (!obj) return obj;
      const res = Object.create(constructor.prototype);
      for (var m in obj) if (hasOwn(obj, m)) try {
        res[m] = obj[m];
      } catch (_) {}
      return res;
    };
    if (this.schema.readHook) {
      this.hook.reading.unsubscribe(this.schema.readHook);
    }
    this.schema.readHook = readHook;
    this.hook("reading", readHook);
    return constructor;
  }
  defineClass() {
    function Class(content) {
      extend(this, content);
    }
    return this.mapToClass(Class);
  }
  add(obj, key) {
    const {
      auto,
      keyPath
    } = this.schema.primKey;
    let objToAdd = obj;
    if (keyPath && auto) {
      objToAdd = workaroundForUndefinedPrimKey(keyPath)(obj);
    }
    return this._trans('readwrite', trans => {
      return this.core.mutate({
        trans,
        type: 'add',
        keys: key != null ? [key] : null,
        values: [objToAdd]
      });
    }).then(res => res.numFailures ? DexiePromise.reject(res.failures[0]) : res.lastResult).then(lastResult => {
      if (keyPath) {
        try {
          setByKeyPath(obj, keyPath, lastResult);
        } catch (_) {}
      }
      return lastResult;
    });
  }
  update(keyOrObject, modifications) {
    if (typeof keyOrObject === 'object' && !isArray(keyOrObject)) {
      const key = getByKeyPath(keyOrObject, this.schema.primKey.keyPath);
      if (key === undefined) return rejection(new exceptions.InvalidArgument("Given object does not contain its primary key"));
      try {
        if (typeof modifications !== "function") {
          keys(modifications).forEach(keyPath => {
            setByKeyPath(keyOrObject, keyPath, modifications[keyPath]);
          });
        } else {
          modifications(keyOrObject, {
            value: keyOrObject,
            primKey: key
          });
        }
      } catch (_a) {}
      return this.where(":id").equals(key).modify(modifications);
    } else {
      return this.where(":id").equals(keyOrObject).modify(modifications);
    }
  }
  put(obj, key) {
    const {
      auto,
      keyPath
    } = this.schema.primKey;
    let objToAdd = obj;
    if (keyPath && auto) {
      objToAdd = workaroundForUndefinedPrimKey(keyPath)(obj);
    }
    return this._trans('readwrite', trans => this.core.mutate({
      trans,
      type: 'put',
      values: [objToAdd],
      keys: key != null ? [key] : null
    })).then(res => res.numFailures ? DexiePromise.reject(res.failures[0]) : res.lastResult).then(lastResult => {
      if (keyPath) {
        try {
          setByKeyPath(obj, keyPath, lastResult);
        } catch (_) {}
      }
      return lastResult;
    });
  }
  delete(key) {
    return this._trans('readwrite', trans => this.core.mutate({
      trans,
      type: 'delete',
      keys: [key]
    })).then(res => res.numFailures ? DexiePromise.reject(res.failures[0]) : undefined);
  }
  clear() {
    return this._trans('readwrite', trans => this.core.mutate({
      trans,
      type: 'deleteRange',
      range: AnyRange
    })).then(res => res.numFailures ? DexiePromise.reject(res.failures[0]) : undefined);
  }
  bulkGet(keys) {
    return this._trans('readonly', trans => {
      return this.core.getMany({
        keys,
        trans
      }).then(result => result.map(res => this.hook.reading.fire(res)));
    });
  }
  bulkAdd(objects, keysOrOptions, options) {
    const keys = Array.isArray(keysOrOptions) ? keysOrOptions : undefined;
    options = options || (keys ? undefined : keysOrOptions);
    const wantResults = options ? options.allKeys : undefined;
    return this._trans('readwrite', trans => {
      const {
        auto,
        keyPath
      } = this.schema.primKey;
      if (keyPath && keys) throw new exceptions.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
      if (keys && keys.length !== objects.length) throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
      const numObjects = objects.length;
      let objectsToAdd = keyPath && auto ? objects.map(workaroundForUndefinedPrimKey(keyPath)) : objects;
      return this.core.mutate({
        trans,
        type: 'add',
        keys: keys,
        values: objectsToAdd,
        wantResults
      }).then(({
        numFailures,
        results,
        lastResult,
        failures
      }) => {
        const result = wantResults ? results : lastResult;
        if (numFailures === 0) return result;
        throw new BulkError(`${this.name}.bulkAdd(): ${numFailures} of ${numObjects} operations failed`, failures);
      });
    });
  }
  bulkPut(objects, keysOrOptions, options) {
    const keys = Array.isArray(keysOrOptions) ? keysOrOptions : undefined;
    options = options || (keys ? undefined : keysOrOptions);
    const wantResults = options ? options.allKeys : undefined;
    return this._trans('readwrite', trans => {
      const {
        auto,
        keyPath
      } = this.schema.primKey;
      if (keyPath && keys) throw new exceptions.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
      if (keys && keys.length !== objects.length) throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
      const numObjects = objects.length;
      let objectsToPut = keyPath && auto ? objects.map(workaroundForUndefinedPrimKey(keyPath)) : objects;
      return this.core.mutate({
        trans,
        type: 'put',
        keys: keys,
        values: objectsToPut,
        wantResults
      }).then(({
        numFailures,
        results,
        lastResult,
        failures
      }) => {
        const result = wantResults ? results : lastResult;
        if (numFailures === 0) return result;
        throw new BulkError(`${this.name}.bulkPut(): ${numFailures} of ${numObjects} operations failed`, failures);
      });
    });
  }
  bulkDelete(keys) {
    const numKeys = keys.length;
    return this._trans('readwrite', trans => {
      return this.core.mutate({
        trans,
        type: 'delete',
        keys: keys
      });
    }).then(({
      numFailures,
      lastResult,
      failures
    }) => {
      if (numFailures === 0) return lastResult;
      throw new BulkError(`${this.name}.bulkDelete(): ${numFailures} of ${numKeys} operations failed`, failures);
    });
  }
}
function Events(ctx) {
  var evs = {};
  var rv = function (eventName, subscriber) {
    if (subscriber) {
      var i = arguments.length,
        args = new Array(i - 1);
      while (--i) args[i - 1] = arguments[i];
      evs[eventName].subscribe.apply(null, args);
      return ctx;
    } else if (typeof eventName === 'string') {
      return evs[eventName];
    }
  };
  rv.addEventType = add;
  for (var i = 1, l = arguments.length; i < l; ++i) {
    add(arguments[i]);
  }
  return rv;
  function add(eventName, chainFunction, defaultFunction) {
    if (typeof eventName === 'object') return addConfiguredEvents(eventName);
    if (!chainFunction) chainFunction = reverseStoppableEventChain;
    if (!defaultFunction) defaultFunction = nop;
    var context = {
      subscribers: [],
      fire: defaultFunction,
      subscribe: function (cb) {
        if (context.subscribers.indexOf(cb) === -1) {
          context.subscribers.push(cb);
          context.fire = chainFunction(context.fire, cb);
        }
      },
      unsubscribe: function (cb) {
        context.subscribers = context.subscribers.filter(function (fn) {
          return fn !== cb;
        });
        context.fire = context.subscribers.reduce(chainFunction, defaultFunction);
      }
    };
    evs[eventName] = rv[eventName] = context;
    return context;
  }
  function addConfiguredEvents(cfg) {
    keys(cfg).forEach(function (eventName) {
      var args = cfg[eventName];
      if (isArray(args)) {
        add(eventName, cfg[eventName][0], cfg[eventName][1]);
      } else if (args === 'asap') {
        var context = add(eventName, mirror, function fire() {
          var i = arguments.length,
            args = new Array(i);
          while (i--) args[i] = arguments[i];
          context.subscribers.forEach(function (fn) {
            asap$1(function fireEvent() {
              fn.apply(null, args);
            });
          });
        });
      } else throw new exceptions.InvalidArgument("Invalid event config");
    });
  }
}
function makeClassConstructor(prototype, constructor) {
  derive(constructor).from({
    prototype
  });
  return constructor;
}
function createTableConstructor(db) {
  return makeClassConstructor(Table.prototype, function Table(name, tableSchema, trans) {
    this.db = db;
    this._tx = trans;
    this.name = name;
    this.schema = tableSchema;
    this.hook = db._allTables[name] ? db._allTables[name].hook : Events(null, {
      "creating": [hookCreatingChain, nop],
      "reading": [pureFunctionChain, mirror],
      "updating": [hookUpdatingChain, nop],
      "deleting": [hookDeletingChain, nop]
    });
  });
}
function isPlainKeyRange(ctx, ignoreLimitFilter) {
  return !(ctx.filter || ctx.algorithm || ctx.or) && (ignoreLimitFilter ? ctx.justLimit : !ctx.replayFilter);
}
function addFilter(ctx, fn) {
  ctx.filter = combine(ctx.filter, fn);
}
function addReplayFilter(ctx, factory, isLimitFilter) {
  var curr = ctx.replayFilter;
  ctx.replayFilter = curr ? () => combine(curr(), factory()) : factory;
  ctx.justLimit = isLimitFilter && !curr;
}
function addMatchFilter(ctx, fn) {
  ctx.isMatch = combine(ctx.isMatch, fn);
}
function getIndexOrStore(ctx, coreSchema) {
  if (ctx.isPrimKey) return coreSchema.primaryKey;
  const index = coreSchema.getIndexByKeyPath(ctx.index);
  if (!index) throw new exceptions.Schema("KeyPath " + ctx.index + " on object store " + coreSchema.name + " is not indexed");
  return index;
}
function openCursor(ctx, coreTable, trans) {
  const index = getIndexOrStore(ctx, coreTable.schema);
  return coreTable.openCursor({
    trans,
    values: !ctx.keysOnly,
    reverse: ctx.dir === 'prev',
    unique: !!ctx.unique,
    query: {
      index,
      range: ctx.range
    }
  });
}
function iter(ctx, fn, coreTrans, coreTable) {
  const filter = ctx.replayFilter ? combine(ctx.filter, ctx.replayFilter()) : ctx.filter;
  if (!ctx.or) {
    return iterate(openCursor(ctx, coreTable, coreTrans), combine(ctx.algorithm, filter), fn, !ctx.keysOnly && ctx.valueMapper);
  } else {
    const set = {};
    const union = (item, cursor, advance) => {
      if (!filter || filter(cursor, advance, result => cursor.stop(result), err => cursor.fail(err))) {
        var primaryKey = cursor.primaryKey;
        var key = '' + primaryKey;
        if (key === '[object ArrayBuffer]') key = '' + new Uint8Array(primaryKey);
        if (!hasOwn(set, key)) {
          set[key] = true;
          fn(item, cursor, advance);
        }
      }
    };
    return Promise.all([ctx.or._iterate(union, coreTrans), iterate(openCursor(ctx, coreTable, coreTrans), ctx.algorithm, union, !ctx.keysOnly && ctx.valueMapper)]);
  }
}
function iterate(cursorPromise, filter, fn, valueMapper) {
  var mappedFn = valueMapper ? (x, c, a) => fn(valueMapper(x), c, a) : fn;
  var wrappedFn = wrap(mappedFn);
  return cursorPromise.then(cursor => {
    if (cursor) {
      return cursor.start(() => {
        var c = () => cursor.continue();
        if (!filter || filter(cursor, advancer => c = advancer, val => {
          cursor.stop(val);
          c = nop;
        }, e => {
          cursor.fail(e);
          c = nop;
        })) wrappedFn(cursor.value, cursor, advancer => c = advancer);
        c();
      });
    }
  });
}
function cmp(a, b) {
  try {
    const ta = type(a);
    const tb = type(b);
    if (ta !== tb) {
      if (ta === 'Array') return 1;
      if (tb === 'Array') return -1;
      if (ta === 'binary') return 1;
      if (tb === 'binary') return -1;
      if (ta === 'string') return 1;
      if (tb === 'string') return -1;
      if (ta === 'Date') return 1;
      if (tb !== 'Date') return NaN;
      return -1;
    }
    switch (ta) {
      case 'number':
      case 'Date':
      case 'string':
        return a > b ? 1 : a < b ? -1 : 0;
      case 'binary':
        {
          return compareUint8Arrays(getUint8Array(a), getUint8Array(b));
        }
      case 'Array':
        return compareArrays(a, b);
    }
  } catch (_a) {}
  return NaN;
}
function compareArrays(a, b) {
  const al = a.length;
  const bl = b.length;
  const l = al < bl ? al : bl;
  for (let i = 0; i < l; ++i) {
    const res = cmp(a[i], b[i]);
    if (res !== 0) return res;
  }
  return al === bl ? 0 : al < bl ? -1 : 1;
}
function compareUint8Arrays(a, b) {
  const al = a.length;
  const bl = b.length;
  const l = al < bl ? al : bl;
  for (let i = 0; i < l; ++i) {
    if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
  }
  return al === bl ? 0 : al < bl ? -1 : 1;
}
function type(x) {
  const t = typeof x;
  if (t !== 'object') return t;
  if (ArrayBuffer.isView(x)) return 'binary';
  const tsTag = toStringTag(x);
  return tsTag === 'ArrayBuffer' ? 'binary' : tsTag;
}
function getUint8Array(a) {
  if (a instanceof Uint8Array) return a;
  if (ArrayBuffer.isView(a)) return new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
  return new Uint8Array(a);
}
class Collection {
  _read(fn, cb) {
    var ctx = this._ctx;
    return ctx.error ? ctx.table._trans(null, rejection.bind(null, ctx.error)) : ctx.table._trans('readonly', fn).then(cb);
  }
  _write(fn) {
    var ctx = this._ctx;
    return ctx.error ? ctx.table._trans(null, rejection.bind(null, ctx.error)) : ctx.table._trans('readwrite', fn, "locked");
  }
  _addAlgorithm(fn) {
    var ctx = this._ctx;
    ctx.algorithm = combine(ctx.algorithm, fn);
  }
  _iterate(fn, coreTrans) {
    return iter(this._ctx, fn, coreTrans, this._ctx.table.core);
  }
  clone(props) {
    var rv = Object.create(this.constructor.prototype),
      ctx = Object.create(this._ctx);
    if (props) extend(ctx, props);
    rv._ctx = ctx;
    return rv;
  }
  raw() {
    this._ctx.valueMapper = null;
    return this;
  }
  each(fn) {
    var ctx = this._ctx;
    return this._read(trans => iter(ctx, fn, trans, ctx.table.core));
  }
  count(cb) {
    return this._read(trans => {
      const ctx = this._ctx;
      const coreTable = ctx.table.core;
      if (isPlainKeyRange(ctx, true)) {
        return coreTable.count({
          trans,
          query: {
            index: getIndexOrStore(ctx, coreTable.schema),
            range: ctx.range
          }
        }).then(count => Math.min(count, ctx.limit));
      } else {
        var count = 0;
        return iter(ctx, () => {
          ++count;
          return false;
        }, trans, coreTable).then(() => count);
      }
    }).then(cb);
  }
  sortBy(keyPath, cb) {
    const parts = keyPath.split('.').reverse(),
      lastPart = parts[0],
      lastIndex = parts.length - 1;
    function getval(obj, i) {
      if (i) return getval(obj[parts[i]], i - 1);
      return obj[lastPart];
    }
    var order = this._ctx.dir === "next" ? 1 : -1;
    function sorter(a, b) {
      var aVal = getval(a, lastIndex),
        bVal = getval(b, lastIndex);
      return aVal < bVal ? -order : aVal > bVal ? order : 0;
    }
    return this.toArray(function (a) {
      return a.sort(sorter);
    }).then(cb);
  }
  toArray(cb) {
    return this._read(trans => {
      var ctx = this._ctx;
      if (ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
        const {
          valueMapper
        } = ctx;
        const index = getIndexOrStore(ctx, ctx.table.core.schema);
        return ctx.table.core.query({
          trans,
          limit: ctx.limit,
          values: true,
          query: {
            index,
            range: ctx.range
          }
        }).then(({
          result
        }) => valueMapper ? result.map(valueMapper) : result);
      } else {
        const a = [];
        return iter(ctx, item => a.push(item), trans, ctx.table.core).then(() => a);
      }
    }, cb);
  }
  offset(offset) {
    var ctx = this._ctx;
    if (offset <= 0) return this;
    ctx.offset += offset;
    if (isPlainKeyRange(ctx)) {
      addReplayFilter(ctx, () => {
        var offsetLeft = offset;
        return (cursor, advance) => {
          if (offsetLeft === 0) return true;
          if (offsetLeft === 1) {
            --offsetLeft;
            return false;
          }
          advance(() => {
            cursor.advance(offsetLeft);
            offsetLeft = 0;
          });
          return false;
        };
      });
    } else {
      addReplayFilter(ctx, () => {
        var offsetLeft = offset;
        return () => --offsetLeft < 0;
      });
    }
    return this;
  }
  limit(numRows) {
    this._ctx.limit = Math.min(this._ctx.limit, numRows);
    addReplayFilter(this._ctx, () => {
      var rowsLeft = numRows;
      return function (cursor, advance, resolve) {
        if (--rowsLeft <= 0) advance(resolve);
        return rowsLeft >= 0;
      };
    }, true);
    return this;
  }
  until(filterFunction, bIncludeStopEntry) {
    addFilter(this._ctx, function (cursor, advance, resolve) {
      if (filterFunction(cursor.value)) {
        advance(resolve);
        return bIncludeStopEntry;
      } else {
        return true;
      }
    });
    return this;
  }
  first(cb) {
    return this.limit(1).toArray(function (a) {
      return a[0];
    }).then(cb);
  }
  last(cb) {
    return this.reverse().first(cb);
  }
  filter(filterFunction) {
    addFilter(this._ctx, function (cursor) {
      return filterFunction(cursor.value);
    });
    addMatchFilter(this._ctx, filterFunction);
    return this;
  }
  and(filter) {
    return this.filter(filter);
  }
  or(indexName) {
    return new this.db.WhereClause(this._ctx.table, indexName, this);
  }
  reverse() {
    this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev";
    if (this._ondirectionchange) this._ondirectionchange(this._ctx.dir);
    return this;
  }
  desc() {
    return this.reverse();
  }
  eachKey(cb) {
    var ctx = this._ctx;
    ctx.keysOnly = !ctx.isMatch;
    return this.each(function (val, cursor) {
      cb(cursor.key, cursor);
    });
  }
  eachUniqueKey(cb) {
    this._ctx.unique = "unique";
    return this.eachKey(cb);
  }
  eachPrimaryKey(cb) {
    var ctx = this._ctx;
    ctx.keysOnly = !ctx.isMatch;
    return this.each(function (val, cursor) {
      cb(cursor.primaryKey, cursor);
    });
  }
  keys(cb) {
    var ctx = this._ctx;
    ctx.keysOnly = !ctx.isMatch;
    var a = [];
    return this.each(function (item, cursor) {
      a.push(cursor.key);
    }).then(function () {
      return a;
    }).then(cb);
  }
  primaryKeys(cb) {
    var ctx = this._ctx;
    if (ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
      return this._read(trans => {
        var index = getIndexOrStore(ctx, ctx.table.core.schema);
        return ctx.table.core.query({
          trans,
          values: false,
          limit: ctx.limit,
          query: {
            index,
            range: ctx.range
          }
        });
      }).then(({
        result
      }) => result).then(cb);
    }
    ctx.keysOnly = !ctx.isMatch;
    var a = [];
    return this.each(function (item, cursor) {
      a.push(cursor.primaryKey);
    }).then(function () {
      return a;
    }).then(cb);
  }
  uniqueKeys(cb) {
    this._ctx.unique = "unique";
    return this.keys(cb);
  }
  firstKey(cb) {
    return this.limit(1).keys(function (a) {
      return a[0];
    }).then(cb);
  }
  lastKey(cb) {
    return this.reverse().firstKey(cb);
  }
  distinct() {
    var ctx = this._ctx,
      idx = ctx.index && ctx.table.schema.idxByName[ctx.index];
    if (!idx || !idx.multi) return this;
    var set = {};
    addFilter(this._ctx, function (cursor) {
      var strKey = cursor.primaryKey.toString();
      var found = hasOwn(set, strKey);
      set[strKey] = true;
      return !found;
    });
    return this;
  }
  modify(changes) {
    var ctx = this._ctx;
    return this._write(trans => {
      var modifyer;
      if (typeof changes === 'function') {
        modifyer = changes;
      } else {
        var keyPaths = keys(changes);
        var numKeys = keyPaths.length;
        modifyer = function (item) {
          var anythingModified = false;
          for (var i = 0; i < numKeys; ++i) {
            var keyPath = keyPaths[i],
              val = changes[keyPath];
            if (getByKeyPath(item, keyPath) !== val) {
              setByKeyPath(item, keyPath, val);
              anythingModified = true;
            }
          }
          return anythingModified;
        };
      }
      const coreTable = ctx.table.core;
      const {
        outbound,
        extractKey
      } = coreTable.schema.primaryKey;
      const limit = this.db._options.modifyChunkSize || 200;
      const totalFailures = [];
      let successCount = 0;
      const failedKeys = [];
      const applyMutateResult = (expectedCount, res) => {
        const {
          failures,
          numFailures
        } = res;
        successCount += expectedCount - numFailures;
        for (let pos of keys(failures)) {
          totalFailures.push(failures[pos]);
        }
      };
      return this.clone().primaryKeys().then(keys => {
        const nextChunk = offset => {
          const count = Math.min(limit, keys.length - offset);
          return coreTable.getMany({
            trans,
            keys: keys.slice(offset, offset + count),
            cache: "immutable"
          }).then(values => {
            const addValues = [];
            const putValues = [];
            const putKeys = outbound ? [] : null;
            const deleteKeys = [];
            for (let i = 0; i < count; ++i) {
              const origValue = values[i];
              const ctx = {
                value: deepClone(origValue),
                primKey: keys[offset + i]
              };
              if (modifyer.call(ctx, ctx.value, ctx) !== false) {
                if (ctx.value == null) {
                  deleteKeys.push(keys[offset + i]);
                } else if (!outbound && cmp(extractKey(origValue), extractKey(ctx.value)) !== 0) {
                  deleteKeys.push(keys[offset + i]);
                  addValues.push(ctx.value);
                } else {
                  putValues.push(ctx.value);
                  if (outbound) putKeys.push(keys[offset + i]);
                }
              }
            }
            const criteria = isPlainKeyRange(ctx) && ctx.limit === Infinity && (typeof changes !== 'function' || changes === deleteCallback) && {
              index: ctx.index,
              range: ctx.range
            };
            return Promise.resolve(addValues.length > 0 && coreTable.mutate({
              trans,
              type: 'add',
              values: addValues
            }).then(res => {
              for (let pos in res.failures) {
                deleteKeys.splice(parseInt(pos), 1);
              }
              applyMutateResult(addValues.length, res);
            })).then(() => (putValues.length > 0 || criteria && typeof changes === 'object') && coreTable.mutate({
              trans,
              type: 'put',
              keys: putKeys,
              values: putValues,
              criteria,
              changeSpec: typeof changes !== 'function' && changes
            }).then(res => applyMutateResult(putValues.length, res))).then(() => (deleteKeys.length > 0 || criteria && changes === deleteCallback) && coreTable.mutate({
              trans,
              type: 'delete',
              keys: deleteKeys,
              criteria
            }).then(res => applyMutateResult(deleteKeys.length, res))).then(() => {
              return keys.length > offset + count && nextChunk(offset + limit);
            });
          });
        };
        return nextChunk(0).then(() => {
          if (totalFailures.length > 0) throw new ModifyError("Error modifying one or more objects", totalFailures, successCount, failedKeys);
          return keys.length;
        });
      });
    });
  }
  delete() {
    var ctx = this._ctx,
      range = ctx.range;
    if (isPlainKeyRange(ctx) && (ctx.isPrimKey && !hangsOnDeleteLargeKeyRange || range.type === 3)) {
      return this._write(trans => {
        const {
          primaryKey
        } = ctx.table.core.schema;
        const coreRange = range;
        return ctx.table.core.count({
          trans,
          query: {
            index: primaryKey,
            range: coreRange
          }
        }).then(count => {
          return ctx.table.core.mutate({
            trans,
            type: 'deleteRange',
            range: coreRange
          }).then(({
            failures,
            lastResult,
            results,
            numFailures
          }) => {
            if (numFailures) throw new ModifyError("Could not delete some values", Object.keys(failures).map(pos => failures[pos]), count - numFailures);
            return count - numFailures;
          });
        });
      });
    }
    return this.modify(deleteCallback);
  }
}
const deleteCallback = (value, ctx) => ctx.value = null;
function createCollectionConstructor(db) {
  return makeClassConstructor(Collection.prototype, function Collection(whereClause, keyRangeGenerator) {
    this.db = db;
    let keyRange = AnyRange,
      error = null;
    if (keyRangeGenerator) try {
      keyRange = keyRangeGenerator();
    } catch (ex) {
      error = ex;
    }
    const whereCtx = whereClause._ctx;
    const table = whereCtx.table;
    const readingHook = table.hook.reading.fire;
    this._ctx = {
      table: table,
      index: whereCtx.index,
      isPrimKey: !whereCtx.index || table.schema.primKey.keyPath && whereCtx.index === table.schema.primKey.name,
      range: keyRange,
      keysOnly: false,
      dir: "next",
      unique: "",
      algorithm: null,
      filter: null,
      replayFilter: null,
      justLimit: true,
      isMatch: null,
      offset: 0,
      limit: Infinity,
      error: error,
      or: whereCtx.or,
      valueMapper: readingHook !== mirror ? readingHook : null
    };
  });
}
function simpleCompare(a, b) {
  return a < b ? -1 : a === b ? 0 : 1;
}
function simpleCompareReverse(a, b) {
  return a > b ? -1 : a === b ? 0 : 1;
}
function fail(collectionOrWhereClause, err, T) {
  var collection = collectionOrWhereClause instanceof WhereClause ? new collectionOrWhereClause.Collection(collectionOrWhereClause) : collectionOrWhereClause;
  collection._ctx.error = T ? new T(err) : new TypeError(err);
  return collection;
}
function emptyCollection(whereClause) {
  return new whereClause.Collection(whereClause, () => rangeEqual("")).limit(0);
}
function upperFactory(dir) {
  return dir === "next" ? s => s.toUpperCase() : s => s.toLowerCase();
}
function lowerFactory(dir) {
  return dir === "next" ? s => s.toLowerCase() : s => s.toUpperCase();
}
function nextCasing(key, lowerKey, upperNeedle, lowerNeedle, cmp, dir) {
  var length = Math.min(key.length, lowerNeedle.length);
  var llp = -1;
  for (var i = 0; i < length; ++i) {
    var lwrKeyChar = lowerKey[i];
    if (lwrKeyChar !== lowerNeedle[i]) {
      if (cmp(key[i], upperNeedle[i]) < 0) return key.substr(0, i) + upperNeedle[i] + upperNeedle.substr(i + 1);
      if (cmp(key[i], lowerNeedle[i]) < 0) return key.substr(0, i) + lowerNeedle[i] + upperNeedle.substr(i + 1);
      if (llp >= 0) return key.substr(0, llp) + lowerKey[llp] + upperNeedle.substr(llp + 1);
      return null;
    }
    if (cmp(key[i], lwrKeyChar) < 0) llp = i;
  }
  if (length < lowerNeedle.length && dir === "next") return key + upperNeedle.substr(key.length);
  if (length < key.length && dir === "prev") return key.substr(0, upperNeedle.length);
  return llp < 0 ? null : key.substr(0, llp) + lowerNeedle[llp] + upperNeedle.substr(llp + 1);
}
function addIgnoreCaseAlgorithm(whereClause, match, needles, suffix) {
  var upper,
    lower,
    compare,
    upperNeedles,
    lowerNeedles,
    direction,
    nextKeySuffix,
    needlesLen = needles.length;
  if (!needles.every(s => typeof s === 'string')) {
    return fail(whereClause, STRING_EXPECTED);
  }
  function initDirection(dir) {
    upper = upperFactory(dir);
    lower = lowerFactory(dir);
    compare = dir === "next" ? simpleCompare : simpleCompareReverse;
    var needleBounds = needles.map(function (needle) {
      return {
        lower: lower(needle),
        upper: upper(needle)
      };
    }).sort(function (a, b) {
      return compare(a.lower, b.lower);
    });
    upperNeedles = needleBounds.map(function (nb) {
      return nb.upper;
    });
    lowerNeedles = needleBounds.map(function (nb) {
      return nb.lower;
    });
    direction = dir;
    nextKeySuffix = dir === "next" ? "" : suffix;
  }
  initDirection("next");
  var c = new whereClause.Collection(whereClause, () => createRange(upperNeedles[0], lowerNeedles[needlesLen - 1] + suffix));
  c._ondirectionchange = function (direction) {
    initDirection(direction);
  };
  var firstPossibleNeedle = 0;
  c._addAlgorithm(function (cursor, advance, resolve) {
    var key = cursor.key;
    if (typeof key !== 'string') return false;
    var lowerKey = lower(key);
    if (match(lowerKey, lowerNeedles, firstPossibleNeedle)) {
      return true;
    } else {
      var lowestPossibleCasing = null;
      for (var i = firstPossibleNeedle; i < needlesLen; ++i) {
        var casing = nextCasing(key, lowerKey, upperNeedles[i], lowerNeedles[i], compare, direction);
        if (casing === null && lowestPossibleCasing === null) firstPossibleNeedle = i + 1;else if (lowestPossibleCasing === null || compare(lowestPossibleCasing, casing) > 0) {
          lowestPossibleCasing = casing;
        }
      }
      if (lowestPossibleCasing !== null) {
        advance(function () {
          cursor.continue(lowestPossibleCasing + nextKeySuffix);
        });
      } else {
        advance(resolve);
      }
      return false;
    }
  });
  return c;
}
function createRange(lower, upper, lowerOpen, upperOpen) {
  return {
    type: 2,
    lower,
    upper,
    lowerOpen,
    upperOpen
  };
}
function rangeEqual(value) {
  return {
    type: 1,
    lower: value,
    upper: value
  };
}
class WhereClause {
  get Collection() {
    return this._ctx.table.db.Collection;
  }
  between(lower, upper, includeLower, includeUpper) {
    includeLower = includeLower !== false;
    includeUpper = includeUpper === true;
    try {
      if (this._cmp(lower, upper) > 0 || this._cmp(lower, upper) === 0 && (includeLower || includeUpper) && !(includeLower && includeUpper)) return emptyCollection(this);
      return new this.Collection(this, () => createRange(lower, upper, !includeLower, !includeUpper));
    } catch (e) {
      return fail(this, INVALID_KEY_ARGUMENT);
    }
  }
  equals(value) {
    if (value == null) return fail(this, INVALID_KEY_ARGUMENT);
    return new this.Collection(this, () => rangeEqual(value));
  }
  above(value) {
    if (value == null) return fail(this, INVALID_KEY_ARGUMENT);
    return new this.Collection(this, () => createRange(value, undefined, true));
  }
  aboveOrEqual(value) {
    if (value == null) return fail(this, INVALID_KEY_ARGUMENT);
    return new this.Collection(this, () => createRange(value, undefined, false));
  }
  below(value) {
    if (value == null) return fail(this, INVALID_KEY_ARGUMENT);
    return new this.Collection(this, () => createRange(undefined, value, false, true));
  }
  belowOrEqual(value) {
    if (value == null) return fail(this, INVALID_KEY_ARGUMENT);
    return new this.Collection(this, () => createRange(undefined, value));
  }
  startsWith(str) {
    if (typeof str !== 'string') return fail(this, STRING_EXPECTED);
    return this.between(str, str + maxString, true, true);
  }
  startsWithIgnoreCase(str) {
    if (str === "") return this.startsWith(str);
    return addIgnoreCaseAlgorithm(this, (x, a) => x.indexOf(a[0]) === 0, [str], maxString);
  }
  equalsIgnoreCase(str) {
    return addIgnoreCaseAlgorithm(this, (x, a) => x === a[0], [str], "");
  }
  anyOfIgnoreCase() {
    var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
    if (set.length === 0) return emptyCollection(this);
    return addIgnoreCaseAlgorithm(this, (x, a) => a.indexOf(x) !== -1, set, "");
  }
  startsWithAnyOfIgnoreCase() {
    var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
    if (set.length === 0) return emptyCollection(this);
    return addIgnoreCaseAlgorithm(this, (x, a) => a.some(n => x.indexOf(n) === 0), set, maxString);
  }
  anyOf() {
    const set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
    let compare = this._cmp;
    try {
      set.sort(compare);
    } catch (e) {
      return fail(this, INVALID_KEY_ARGUMENT);
    }
    if (set.length === 0) return emptyCollection(this);
    const c = new this.Collection(this, () => createRange(set[0], set[set.length - 1]));
    c._ondirectionchange = direction => {
      compare = direction === "next" ? this._ascending : this._descending;
      set.sort(compare);
    };
    let i = 0;
    c._addAlgorithm((cursor, advance, resolve) => {
      const key = cursor.key;
      while (compare(key, set[i]) > 0) {
        ++i;
        if (i === set.length) {
          advance(resolve);
          return false;
        }
      }
      if (compare(key, set[i]) === 0) {
        return true;
      } else {
        advance(() => {
          cursor.continue(set[i]);
        });
        return false;
      }
    });
    return c;
  }
  notEqual(value) {
    return this.inAnyRange([[minKey, value], [value, this.db._maxKey]], {
      includeLowers: false,
      includeUppers: false
    });
  }
  noneOf() {
    const set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
    if (set.length === 0) return new this.Collection(this);
    try {
      set.sort(this._ascending);
    } catch (e) {
      return fail(this, INVALID_KEY_ARGUMENT);
    }
    const ranges = set.reduce((res, val) => res ? res.concat([[res[res.length - 1][1], val]]) : [[minKey, val]], null);
    ranges.push([set[set.length - 1], this.db._maxKey]);
    return this.inAnyRange(ranges, {
      includeLowers: false,
      includeUppers: false
    });
  }
  inAnyRange(ranges, options) {
    const cmp = this._cmp,
      ascending = this._ascending,
      descending = this._descending,
      min = this._min,
      max = this._max;
    if (ranges.length === 0) return emptyCollection(this);
    if (!ranges.every(range => range[0] !== undefined && range[1] !== undefined && ascending(range[0], range[1]) <= 0)) {
      return fail(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", exceptions.InvalidArgument);
    }
    const includeLowers = !options || options.includeLowers !== false;
    const includeUppers = options && options.includeUppers === true;
    function addRange(ranges, newRange) {
      let i = 0,
        l = ranges.length;
      for (; i < l; ++i) {
        const range = ranges[i];
        if (cmp(newRange[0], range[1]) < 0 && cmp(newRange[1], range[0]) > 0) {
          range[0] = min(range[0], newRange[0]);
          range[1] = max(range[1], newRange[1]);
          break;
        }
      }
      if (i === l) ranges.push(newRange);
      return ranges;
    }
    let sortDirection = ascending;
    function rangeSorter(a, b) {
      return sortDirection(a[0], b[0]);
    }
    let set;
    try {
      set = ranges.reduce(addRange, []);
      set.sort(rangeSorter);
    } catch (ex) {
      return fail(this, INVALID_KEY_ARGUMENT);
    }
    let rangePos = 0;
    const keyIsBeyondCurrentEntry = includeUppers ? key => ascending(key, set[rangePos][1]) > 0 : key => ascending(key, set[rangePos][1]) >= 0;
    const keyIsBeforeCurrentEntry = includeLowers ? key => descending(key, set[rangePos][0]) > 0 : key => descending(key, set[rangePos][0]) >= 0;
    function keyWithinCurrentRange(key) {
      return !keyIsBeyondCurrentEntry(key) && !keyIsBeforeCurrentEntry(key);
    }
    let checkKey = keyIsBeyondCurrentEntry;
    const c = new this.Collection(this, () => createRange(set[0][0], set[set.length - 1][1], !includeLowers, !includeUppers));
    c._ondirectionchange = direction => {
      if (direction === "next") {
        checkKey = keyIsBeyondCurrentEntry;
        sortDirection = ascending;
      } else {
        checkKey = keyIsBeforeCurrentEntry;
        sortDirection = descending;
      }
      set.sort(rangeSorter);
    };
    c._addAlgorithm((cursor, advance, resolve) => {
      var key = cursor.key;
      while (checkKey(key)) {
        ++rangePos;
        if (rangePos === set.length) {
          advance(resolve);
          return false;
        }
      }
      if (keyWithinCurrentRange(key)) {
        return true;
      } else if (this._cmp(key, set[rangePos][1]) === 0 || this._cmp(key, set[rangePos][0]) === 0) {
        return false;
      } else {
        advance(() => {
          if (sortDirection === ascending) cursor.continue(set[rangePos][0]);else cursor.continue(set[rangePos][1]);
        });
        return false;
      }
    });
    return c;
  }
  startsWithAnyOf() {
    const set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
    if (!set.every(s => typeof s === 'string')) {
      return fail(this, "startsWithAnyOf() only works with strings");
    }
    if (set.length === 0) return emptyCollection(this);
    return this.inAnyRange(set.map(str => [str, str + maxString]));
  }
}
function createWhereClauseConstructor(db) {
  return makeClassConstructor(WhereClause.prototype, function WhereClause(table, index, orCollection) {
    this.db = db;
    this._ctx = {
      table: table,
      index: index === ":id" ? null : index,
      or: orCollection
    };
    const indexedDB = db._deps.indexedDB;
    if (!indexedDB) throw new exceptions.MissingAPI();
    this._cmp = this._ascending = indexedDB.cmp.bind(indexedDB);
    this._descending = (a, b) => indexedDB.cmp(b, a);
    this._max = (a, b) => indexedDB.cmp(a, b) > 0 ? a : b;
    this._min = (a, b) => indexedDB.cmp(a, b) < 0 ? a : b;
    this._IDBKeyRange = db._deps.IDBKeyRange;
  });
}
function eventRejectHandler(reject) {
  return wrap(function (event) {
    preventDefault(event);
    reject(event.target.error);
    return false;
  });
}
function preventDefault(event) {
  if (event.stopPropagation) event.stopPropagation();
  if (event.preventDefault) event.preventDefault();
}
const DEXIE_STORAGE_MUTATED_EVENT_NAME = 'storagemutated';
const STORAGE_MUTATED_DOM_EVENT_NAME = 'x-storagemutated-1';
const globalEvents = Events(null, DEXIE_STORAGE_MUTATED_EVENT_NAME);
class Transaction {
  _lock() {
    assert(!PSD.global);
    ++this._reculock;
    if (this._reculock === 1 && !PSD.global) PSD.lockOwnerFor = this;
    return this;
  }
  _unlock() {
    assert(!PSD.global);
    if (--this._reculock === 0) {
      if (!PSD.global) PSD.lockOwnerFor = null;
      while (this._blockedFuncs.length > 0 && !this._locked()) {
        var fnAndPSD = this._blockedFuncs.shift();
        try {
          usePSD(fnAndPSD[1], fnAndPSD[0]);
        } catch (e) {}
      }
    }
    return this;
  }
  _locked() {
    return this._reculock && PSD.lockOwnerFor !== this;
  }
  create(idbtrans) {
    if (!this.mode) return this;
    const idbdb = this.db.idbdb;
    const dbOpenError = this.db._state.dbOpenError;
    assert(!this.idbtrans);
    if (!idbtrans && !idbdb) {
      switch (dbOpenError && dbOpenError.name) {
        case "DatabaseClosedError":
          throw new exceptions.DatabaseClosed(dbOpenError);
        case "MissingAPIError":
          throw new exceptions.MissingAPI(dbOpenError.message, dbOpenError);
        default:
          throw new exceptions.OpenFailed(dbOpenError);
      }
    }
    if (!this.active) throw new exceptions.TransactionInactive();
    assert(this._completion._state === null);
    idbtrans = this.idbtrans = idbtrans || (this.db.core ? this.db.core.transaction(this.storeNames, this.mode, {
      durability: this.chromeTransactionDurability
    }) : idbdb.transaction(this.storeNames, this.mode, {
      durability: this.chromeTransactionDurability
    }));
    idbtrans.onerror = wrap(ev => {
      preventDefault(ev);
      this._reject(idbtrans.error);
    });
    idbtrans.onabort = wrap(ev => {
      preventDefault(ev);
      this.active && this._reject(new exceptions.Abort(idbtrans.error));
      this.active = false;
      this.on("abort").fire(ev);
    });
    idbtrans.oncomplete = wrap(() => {
      this.active = false;
      this._resolve();
      if ('mutatedParts' in idbtrans) {
        globalEvents.storagemutated.fire(idbtrans["mutatedParts"]);
      }
    });
    return this;
  }
  _promise(mode, fn, bWriteLock) {
    if (mode === 'readwrite' && this.mode !== 'readwrite') return rejection(new exceptions.ReadOnly("Transaction is readonly"));
    if (!this.active) return rejection(new exceptions.TransactionInactive());
    if (this._locked()) {
      return new DexiePromise((resolve, reject) => {
        this._blockedFuncs.push([() => {
          this._promise(mode, fn, bWriteLock).then(resolve, reject);
        }, PSD]);
      });
    } else if (bWriteLock) {
      return newScope(() => {
        var p = new DexiePromise((resolve, reject) => {
          this._lock();
          const rv = fn(resolve, reject, this);
          if (rv && rv.then) rv.then(resolve, reject);
        });
        p.finally(() => this._unlock());
        p._lib = true;
        return p;
      });
    } else {
      var p = new DexiePromise((resolve, reject) => {
        var rv = fn(resolve, reject, this);
        if (rv && rv.then) rv.then(resolve, reject);
      });
      p._lib = true;
      return p;
    }
  }
  _root() {
    return this.parent ? this.parent._root() : this;
  }
  waitFor(promiseLike) {
    var root = this._root();
    const promise = DexiePromise.resolve(promiseLike);
    if (root._waitingFor) {
      root._waitingFor = root._waitingFor.then(() => promise);
    } else {
      root._waitingFor = promise;
      root._waitingQueue = [];
      var store = root.idbtrans.objectStore(root.storeNames[0]);
      (function spin() {
        ++root._spinCount;
        while (root._waitingQueue.length) root._waitingQueue.shift()();
        if (root._waitingFor) store.get(-Infinity).onsuccess = spin;
      })();
    }
    var currentWaitPromise = root._waitingFor;
    return new DexiePromise((resolve, reject) => {
      promise.then(res => root._waitingQueue.push(wrap(resolve.bind(null, res))), err => root._waitingQueue.push(wrap(reject.bind(null, err)))).finally(() => {
        if (root._waitingFor === currentWaitPromise) {
          root._waitingFor = null;
        }
      });
    });
  }
  abort() {
    if (this.active) {
      this.active = false;
      if (this.idbtrans) this.idbtrans.abort();
      this._reject(new exceptions.Abort());
    }
  }
  table(tableName) {
    const memoizedTables = this._memoizedTables || (this._memoizedTables = {});
    if (hasOwn(memoizedTables, tableName)) return memoizedTables[tableName];
    const tableSchema = this.schema[tableName];
    if (!tableSchema) {
      throw new exceptions.NotFound("Table " + tableName + " not part of transaction");
    }
    const transactionBoundTable = new this.db.Table(tableName, tableSchema, this);
    transactionBoundTable.core = this.db.core.table(tableName);
    memoizedTables[tableName] = transactionBoundTable;
    return transactionBoundTable;
  }
}
function createTransactionConstructor(db) {
  return makeClassConstructor(Transaction.prototype, function Transaction(mode, storeNames, dbschema, chromeTransactionDurability, parent) {
    this.db = db;
    this.mode = mode;
    this.storeNames = storeNames;
    this.schema = dbschema;
    this.chromeTransactionDurability = chromeTransactionDurability;
    this.idbtrans = null;
    this.on = Events(this, "complete", "error", "abort");
    this.parent = parent || null;
    this.active = true;
    this._reculock = 0;
    this._blockedFuncs = [];
    this._resolve = null;
    this._reject = null;
    this._waitingFor = null;
    this._waitingQueue = null;
    this._spinCount = 0;
    this._completion = new DexiePromise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
    this._completion.then(() => {
      this.active = false;
      this.on.complete.fire();
    }, e => {
      var wasActive = this.active;
      this.active = false;
      this.on.error.fire(e);
      this.parent ? this.parent._reject(e) : wasActive && this.idbtrans && this.idbtrans.abort();
      return rejection(e);
    });
  });
}
function createIndexSpec(name, keyPath, unique, multi, auto, compound, isPrimKey) {
  return {
    name,
    keyPath,
    unique,
    multi,
    auto,
    compound,
    src: (unique && !isPrimKey ? '&' : '') + (multi ? '*' : '') + (auto ? "++" : "") + nameFromKeyPath(keyPath)
  };
}
function nameFromKeyPath(keyPath) {
  return typeof keyPath === 'string' ? keyPath : keyPath ? '[' + [].join.call(keyPath, '+') + ']' : "";
}
function createTableSchema(name, primKey, indexes) {
  return {
    name,
    primKey,
    indexes,
    mappedClass: null,
    idxByName: arrayToObject(indexes, index => [index.name, index])
  };
}
function safariMultiStoreFix(storeNames) {
  return storeNames.length === 1 ? storeNames[0] : storeNames;
}
let getMaxKey = IdbKeyRange => {
  try {
    IdbKeyRange.only([[]]);
    getMaxKey = () => [[]];
    return [[]];
  } catch (e) {
    getMaxKey = () => maxString;
    return maxString;
  }
};
function getKeyExtractor(keyPath) {
  if (keyPath == null) {
    return () => undefined;
  } else if (typeof keyPath === 'string') {
    return getSinglePathKeyExtractor(keyPath);
  } else {
    return obj => getByKeyPath(obj, keyPath);
  }
}
function getSinglePathKeyExtractor(keyPath) {
  const split = keyPath.split('.');
  if (split.length === 1) {
    return obj => obj[keyPath];
  } else {
    return obj => getByKeyPath(obj, keyPath);
  }
}
function arrayify(arrayLike) {
  return [].slice.call(arrayLike);
}
let _id_counter = 0;
function getKeyPathAlias(keyPath) {
  return keyPath == null ? ":id" : typeof keyPath === 'string' ? keyPath : `[${keyPath.join('+')}]`;
}
function createDBCore(db, IdbKeyRange, tmpTrans) {
  function extractSchema(db, trans) {
    const tables = arrayify(db.objectStoreNames);
    return {
      schema: {
        name: db.name,
        tables: tables.map(table => trans.objectStore(table)).map(store => {
          const {
            keyPath,
            autoIncrement
          } = store;
          const compound = isArray(keyPath);
          const outbound = keyPath == null;
          const indexByKeyPath = {};
          const result = {
            name: store.name,
            primaryKey: {
              name: null,
              isPrimaryKey: true,
              outbound,
              compound,
              keyPath,
              autoIncrement,
              unique: true,
              extractKey: getKeyExtractor(keyPath)
            },
            indexes: arrayify(store.indexNames).map(indexName => store.index(indexName)).map(index => {
              const {
                name,
                unique,
                multiEntry,
                keyPath
              } = index;
              const compound = isArray(keyPath);
              const result = {
                name,
                compound,
                keyPath,
                unique,
                multiEntry,
                extractKey: getKeyExtractor(keyPath)
              };
              indexByKeyPath[getKeyPathAlias(keyPath)] = result;
              return result;
            }),
            getIndexByKeyPath: keyPath => indexByKeyPath[getKeyPathAlias(keyPath)]
          };
          indexByKeyPath[":id"] = result.primaryKey;
          if (keyPath != null) {
            indexByKeyPath[getKeyPathAlias(keyPath)] = result.primaryKey;
          }
          return result;
        })
      },
      hasGetAll: tables.length > 0 && 'getAll' in trans.objectStore(tables[0]) && !(typeof navigator !== 'undefined' && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604)
    };
  }
  function makeIDBKeyRange(range) {
    if (range.type === 3) return null;
    if (range.type === 4) throw new Error("Cannot convert never type to IDBKeyRange");
    const {
      lower,
      upper,
      lowerOpen,
      upperOpen
    } = range;
    const idbRange = lower === undefined ? upper === undefined ? null : IdbKeyRange.upperBound(upper, !!upperOpen) : upper === undefined ? IdbKeyRange.lowerBound(lower, !!lowerOpen) : IdbKeyRange.bound(lower, upper, !!lowerOpen, !!upperOpen);
    return idbRange;
  }
  function createDbCoreTable(tableSchema) {
    const tableName = tableSchema.name;
    function mutate({
      trans,
      type,
      keys,
      values,
      range
    }) {
      return new Promise((resolve, reject) => {
        resolve = wrap(resolve);
        const store = trans.objectStore(tableName);
        const outbound = store.keyPath == null;
        const isAddOrPut = type === "put" || type === "add";
        if (!isAddOrPut && type !== 'delete' && type !== 'deleteRange') throw new Error("Invalid operation type: " + type);
        const {
          length
        } = keys || values || {
          length: 1
        };
        if (keys && values && keys.length !== values.length) {
          throw new Error("Given keys array must have same length as given values array.");
        }
        if (length === 0) return resolve({
          numFailures: 0,
          failures: {},
          results: [],
          lastResult: undefined
        });
        let req;
        const reqs = [];
        const failures = [];
        let numFailures = 0;
        const errorHandler = event => {
          ++numFailures;
          preventDefault(event);
        };
        if (type === 'deleteRange') {
          if (range.type === 4) return resolve({
            numFailures,
            failures,
            results: [],
            lastResult: undefined
          });
          if (range.type === 3) reqs.push(req = store.clear());else reqs.push(req = store.delete(makeIDBKeyRange(range)));
        } else {
          const [args1, args2] = isAddOrPut ? outbound ? [values, keys] : [values, null] : [keys, null];
          if (isAddOrPut) {
            for (let i = 0; i < length; ++i) {
              reqs.push(req = args2 && args2[i] !== undefined ? store[type](args1[i], args2[i]) : store[type](args1[i]));
              req.onerror = errorHandler;
            }
          } else {
            for (let i = 0; i < length; ++i) {
              reqs.push(req = store[type](args1[i]));
              req.onerror = errorHandler;
            }
          }
        }
        const done = event => {
          const lastResult = event.target.result;
          reqs.forEach((req, i) => req.error != null && (failures[i] = req.error));
          resolve({
            numFailures,
            failures,
            results: type === "delete" ? keys : reqs.map(req => req.result),
            lastResult
          });
        };
        req.onerror = event => {
          errorHandler(event);
          done(event);
        };
        req.onsuccess = done;
      });
    }
    function openCursor({
      trans,
      values,
      query,
      reverse,
      unique
    }) {
      return new Promise((resolve, reject) => {
        resolve = wrap(resolve);
        const {
          index,
          range
        } = query;
        const store = trans.objectStore(tableName);
        const source = index.isPrimaryKey ? store : store.index(index.name);
        const direction = reverse ? unique ? "prevunique" : "prev" : unique ? "nextunique" : "next";
        const req = values || !('openKeyCursor' in source) ? source.openCursor(makeIDBKeyRange(range), direction) : source.openKeyCursor(makeIDBKeyRange(range), direction);
        req.onerror = eventRejectHandler(reject);
        req.onsuccess = wrap(ev => {
          const cursor = req.result;
          if (!cursor) {
            resolve(null);
            return;
          }
          cursor.___id = ++_id_counter;
          cursor.done = false;
          const _cursorContinue = cursor.continue.bind(cursor);
          let _cursorContinuePrimaryKey = cursor.continuePrimaryKey;
          if (_cursorContinuePrimaryKey) _cursorContinuePrimaryKey = _cursorContinuePrimaryKey.bind(cursor);
          const _cursorAdvance = cursor.advance.bind(cursor);
          const doThrowCursorIsNotStarted = () => {
            throw new Error("Cursor not started");
          };
          const doThrowCursorIsStopped = () => {
            throw new Error("Cursor not stopped");
          };
          cursor.trans = trans;
          cursor.stop = cursor.continue = cursor.continuePrimaryKey = cursor.advance = doThrowCursorIsNotStarted;
          cursor.fail = wrap(reject);
          cursor.next = function () {
            let gotOne = 1;
            return this.start(() => gotOne-- ? this.continue() : this.stop()).then(() => this);
          };
          cursor.start = callback => {
            const iterationPromise = new Promise((resolveIteration, rejectIteration) => {
              resolveIteration = wrap(resolveIteration);
              req.onerror = eventRejectHandler(rejectIteration);
              cursor.fail = rejectIteration;
              cursor.stop = value => {
                cursor.stop = cursor.continue = cursor.continuePrimaryKey = cursor.advance = doThrowCursorIsStopped;
                resolveIteration(value);
              };
            });
            const guardedCallback = () => {
              if (req.result) {
                try {
                  callback();
                } catch (err) {
                  cursor.fail(err);
                }
              } else {
                cursor.done = true;
                cursor.start = () => {
                  throw new Error("Cursor behind last entry");
                };
                cursor.stop();
              }
            };
            req.onsuccess = wrap(ev => {
              req.onsuccess = guardedCallback;
              guardedCallback();
            });
            cursor.continue = _cursorContinue;
            cursor.continuePrimaryKey = _cursorContinuePrimaryKey;
            cursor.advance = _cursorAdvance;
            guardedCallback();
            return iterationPromise;
          };
          resolve(cursor);
        }, reject);
      });
    }
    function query(hasGetAll) {
      return request => {
        return new Promise((resolve, reject) => {
          resolve = wrap(resolve);
          const {
            trans,
            values,
            limit,
            query
          } = request;
          const nonInfinitLimit = limit === Infinity ? undefined : limit;
          const {
            index,
            range
          } = query;
          const store = trans.objectStore(tableName);
          const source = index.isPrimaryKey ? store : store.index(index.name);
          const idbKeyRange = makeIDBKeyRange(range);
          if (limit === 0) return resolve({
            result: []
          });
          if (hasGetAll) {
            const req = values ? source.getAll(idbKeyRange, nonInfinitLimit) : source.getAllKeys(idbKeyRange, nonInfinitLimit);
            req.onsuccess = event => resolve({
              result: event.target.result
            });
            req.onerror = eventRejectHandler(reject);
          } else {
            let count = 0;
            const req = values || !('openKeyCursor' in source) ? source.openCursor(idbKeyRange) : source.openKeyCursor(idbKeyRange);
            const result = [];
            req.onsuccess = event => {
              const cursor = req.result;
              if (!cursor) return resolve({
                result
              });
              result.push(values ? cursor.value : cursor.primaryKey);
              if (++count === limit) return resolve({
                result
              });
              cursor.continue();
            };
            req.onerror = eventRejectHandler(reject);
          }
        });
      };
    }
    return {
      name: tableName,
      schema: tableSchema,
      mutate,
      getMany({
        trans,
        keys
      }) {
        return new Promise((resolve, reject) => {
          resolve = wrap(resolve);
          const store = trans.objectStore(tableName);
          const length = keys.length;
          const result = new Array(length);
          let keyCount = 0;
          let callbackCount = 0;
          let req;
          const successHandler = event => {
            const req = event.target;
            if ((result[req._pos] = req.result) != null) ;
            if (++callbackCount === keyCount) resolve(result);
          };
          const errorHandler = eventRejectHandler(reject);
          for (let i = 0; i < length; ++i) {
            const key = keys[i];
            if (key != null) {
              req = store.get(keys[i]);
              req._pos = i;
              req.onsuccess = successHandler;
              req.onerror = errorHandler;
              ++keyCount;
            }
          }
          if (keyCount === 0) resolve(result);
        });
      },
      get({
        trans,
        key
      }) {
        return new Promise((resolve, reject) => {
          resolve = wrap(resolve);
          const store = trans.objectStore(tableName);
          const req = store.get(key);
          req.onsuccess = event => resolve(event.target.result);
          req.onerror = eventRejectHandler(reject);
        });
      },
      query: query(hasGetAll),
      openCursor,
      count({
        query,
        trans
      }) {
        const {
          index,
          range
        } = query;
        return new Promise((resolve, reject) => {
          const store = trans.objectStore(tableName);
          const source = index.isPrimaryKey ? store : store.index(index.name);
          const idbKeyRange = makeIDBKeyRange(range);
          const req = idbKeyRange ? source.count(idbKeyRange) : source.count();
          req.onsuccess = wrap(ev => resolve(ev.target.result));
          req.onerror = eventRejectHandler(reject);
        });
      }
    };
  }
  const {
    schema,
    hasGetAll
  } = extractSchema(db, tmpTrans);
  const tables = schema.tables.map(tableSchema => createDbCoreTable(tableSchema));
  const tableMap = {};
  tables.forEach(table => tableMap[table.name] = table);
  return {
    stack: "dbcore",
    transaction: db.transaction.bind(db),
    table(name) {
      const result = tableMap[name];
      if (!result) throw new Error(`Table '${name}' not found`);
      return tableMap[name];
    },
    MIN_KEY: -Infinity,
    MAX_KEY: getMaxKey(IdbKeyRange),
    schema
  };
}
function createMiddlewareStack(stackImpl, middlewares) {
  return middlewares.reduce((down, {
    create
  }) => ({
    ...down,
    ...create(down)
  }), stackImpl);
}
function createMiddlewareStacks(middlewares, idbdb, {
  IDBKeyRange,
  indexedDB
}, tmpTrans) {
  const dbcore = createMiddlewareStack(createDBCore(idbdb, IDBKeyRange, tmpTrans), middlewares.dbcore);
  return {
    dbcore
  };
}
function generateMiddlewareStacks({
  _novip: db
}, tmpTrans) {
  const idbdb = tmpTrans.db;
  const stacks = createMiddlewareStacks(db._middlewares, idbdb, db._deps, tmpTrans);
  db.core = stacks.dbcore;
  db.tables.forEach(table => {
    const tableName = table.name;
    if (db.core.schema.tables.some(tbl => tbl.name === tableName)) {
      table.core = db.core.table(tableName);
      if (db[tableName] instanceof db.Table) {
        db[tableName].core = table.core;
      }
    }
  });
}
function setApiOnPlace({
  _novip: db
}, objs, tableNames, dbschema) {
  tableNames.forEach(tableName => {
    const schema = dbschema[tableName];
    objs.forEach(obj => {
      const propDesc = getPropertyDescriptor(obj, tableName);
      if (!propDesc || "value" in propDesc && propDesc.value === undefined) {
        if (obj === db.Transaction.prototype || obj instanceof db.Transaction) {
          setProp(obj, tableName, {
            get() {
              return this.table(tableName);
            },
            set(value) {
              defineProperty(this, tableName, {
                value,
                writable: true,
                configurable: true,
                enumerable: true
              });
            }
          });
        } else {
          obj[tableName] = new db.Table(tableName, schema);
        }
      }
    });
  });
}
function removeTablesApi({
  _novip: db
}, objs) {
  objs.forEach(obj => {
    for (let key in obj) {
      if (obj[key] instanceof db.Table) delete obj[key];
    }
  });
}
function lowerVersionFirst(a, b) {
  return a._cfg.version - b._cfg.version;
}
function runUpgraders(db, oldVersion, idbUpgradeTrans, reject) {
  const globalSchema = db._dbSchema;
  const trans = db._createTransaction('readwrite', db._storeNames, globalSchema);
  trans.create(idbUpgradeTrans);
  trans._completion.catch(reject);
  const rejectTransaction = trans._reject.bind(trans);
  const transless = PSD.transless || PSD;
  newScope(() => {
    PSD.trans = trans;
    PSD.transless = transless;
    if (oldVersion === 0) {
      keys(globalSchema).forEach(tableName => {
        createTable(idbUpgradeTrans, tableName, globalSchema[tableName].primKey, globalSchema[tableName].indexes);
      });
      generateMiddlewareStacks(db, idbUpgradeTrans);
      DexiePromise.follow(() => db.on.populate.fire(trans)).catch(rejectTransaction);
    } else updateTablesAndIndexes(db, oldVersion, trans, idbUpgradeTrans).catch(rejectTransaction);
  });
}
function updateTablesAndIndexes({
  _novip: db
}, oldVersion, trans, idbUpgradeTrans) {
  const queue = [];
  const versions = db._versions;
  let globalSchema = db._dbSchema = buildGlobalSchema(db, db.idbdb, idbUpgradeTrans);
  let anyContentUpgraderHasRun = false;
  const versToRun = versions.filter(v => v._cfg.version >= oldVersion);
  versToRun.forEach(version => {
    queue.push(() => {
      const oldSchema = globalSchema;
      const newSchema = version._cfg.dbschema;
      adjustToExistingIndexNames(db, oldSchema, idbUpgradeTrans);
      adjustToExistingIndexNames(db, newSchema, idbUpgradeTrans);
      globalSchema = db._dbSchema = newSchema;
      const diff = getSchemaDiff(oldSchema, newSchema);
      diff.add.forEach(tuple => {
        createTable(idbUpgradeTrans, tuple[0], tuple[1].primKey, tuple[1].indexes);
      });
      diff.change.forEach(change => {
        if (change.recreate) {
          throw new exceptions.Upgrade("Not yet support for changing primary key");
        } else {
          const store = idbUpgradeTrans.objectStore(change.name);
          change.add.forEach(idx => addIndex(store, idx));
          change.change.forEach(idx => {
            store.deleteIndex(idx.name);
            addIndex(store, idx);
          });
          change.del.forEach(idxName => store.deleteIndex(idxName));
        }
      });
      const contentUpgrade = version._cfg.contentUpgrade;
      if (contentUpgrade && version._cfg.version > oldVersion) {
        generateMiddlewareStacks(db, idbUpgradeTrans);
        trans._memoizedTables = {};
        anyContentUpgraderHasRun = true;
        let upgradeSchema = shallowClone(newSchema);
        diff.del.forEach(table => {
          upgradeSchema[table] = oldSchema[table];
        });
        removeTablesApi(db, [db.Transaction.prototype]);
        setApiOnPlace(db, [db.Transaction.prototype], keys(upgradeSchema), upgradeSchema);
        trans.schema = upgradeSchema;
        const contentUpgradeIsAsync = isAsyncFunction(contentUpgrade);
        if (contentUpgradeIsAsync) {
          incrementExpectedAwaits();
        }
        let returnValue;
        const promiseFollowed = DexiePromise.follow(() => {
          returnValue = contentUpgrade(trans);
          if (returnValue) {
            if (contentUpgradeIsAsync) {
              var decrementor = decrementExpectedAwaits.bind(null, null);
              returnValue.then(decrementor, decrementor);
            }
          }
        });
        return returnValue && typeof returnValue.then === 'function' ? DexiePromise.resolve(returnValue) : promiseFollowed.then(() => returnValue);
      }
    });
    queue.push(idbtrans => {
      if (!anyContentUpgraderHasRun || !hasIEDeleteObjectStoreBug) {
        const newSchema = version._cfg.dbschema;
        deleteRemovedTables(newSchema, idbtrans);
      }
      removeTablesApi(db, [db.Transaction.prototype]);
      setApiOnPlace(db, [db.Transaction.prototype], db._storeNames, db._dbSchema);
      trans.schema = db._dbSchema;
    });
  });
  function runQueue() {
    return queue.length ? DexiePromise.resolve(queue.shift()(trans.idbtrans)).then(runQueue) : DexiePromise.resolve();
  }
  return runQueue().then(() => {
    createMissingTables(globalSchema, idbUpgradeTrans);
  });
}
function getSchemaDiff(oldSchema, newSchema) {
  const diff = {
    del: [],
    add: [],
    change: []
  };
  let table;
  for (table in oldSchema) {
    if (!newSchema[table]) diff.del.push(table);
  }
  for (table in newSchema) {
    const oldDef = oldSchema[table],
      newDef = newSchema[table];
    if (!oldDef) {
      diff.add.push([table, newDef]);
    } else {
      const change = {
        name: table,
        def: newDef,
        recreate: false,
        del: [],
        add: [],
        change: []
      };
      if ('' + (oldDef.primKey.keyPath || '') !== '' + (newDef.primKey.keyPath || '') || oldDef.primKey.auto !== newDef.primKey.auto && !isIEOrEdge) {
        change.recreate = true;
        diff.change.push(change);
      } else {
        const oldIndexes = oldDef.idxByName;
        const newIndexes = newDef.idxByName;
        let idxName;
        for (idxName in oldIndexes) {
          if (!newIndexes[idxName]) change.del.push(idxName);
        }
        for (idxName in newIndexes) {
          const oldIdx = oldIndexes[idxName],
            newIdx = newIndexes[idxName];
          if (!oldIdx) change.add.push(newIdx);else if (oldIdx.src !== newIdx.src) change.change.push(newIdx);
        }
        if (change.del.length > 0 || change.add.length > 0 || change.change.length > 0) {
          diff.change.push(change);
        }
      }
    }
  }
  return diff;
}
function createTable(idbtrans, tableName, primKey, indexes) {
  const store = idbtrans.db.createObjectStore(tableName, primKey.keyPath ? {
    keyPath: primKey.keyPath,
    autoIncrement: primKey.auto
  } : {
    autoIncrement: primKey.auto
  });
  indexes.forEach(idx => addIndex(store, idx));
  return store;
}
function createMissingTables(newSchema, idbtrans) {
  keys(newSchema).forEach(tableName => {
    if (!idbtrans.db.objectStoreNames.contains(tableName)) {
      createTable(idbtrans, tableName, newSchema[tableName].primKey, newSchema[tableName].indexes);
    }
  });
}
function deleteRemovedTables(newSchema, idbtrans) {
  [].slice.call(idbtrans.db.objectStoreNames).forEach(storeName => newSchema[storeName] == null && idbtrans.db.deleteObjectStore(storeName));
}
function addIndex(store, idx) {
  store.createIndex(idx.name, idx.keyPath, {
    unique: idx.unique,
    multiEntry: idx.multi
  });
}
function buildGlobalSchema(db, idbdb, tmpTrans) {
  const globalSchema = {};
  const dbStoreNames = slice(idbdb.objectStoreNames, 0);
  dbStoreNames.forEach(storeName => {
    const store = tmpTrans.objectStore(storeName);
    let keyPath = store.keyPath;
    const primKey = createIndexSpec(nameFromKeyPath(keyPath), keyPath || "", false, false, !!store.autoIncrement, keyPath && typeof keyPath !== "string", true);
    const indexes = [];
    for (let j = 0; j < store.indexNames.length; ++j) {
      const idbindex = store.index(store.indexNames[j]);
      keyPath = idbindex.keyPath;
      var index = createIndexSpec(idbindex.name, keyPath, !!idbindex.unique, !!idbindex.multiEntry, false, keyPath && typeof keyPath !== "string", false);
      indexes.push(index);
    }
    globalSchema[storeName] = createTableSchema(storeName, primKey, indexes);
  });
  return globalSchema;
}
function readGlobalSchema({
  _novip: db
}, idbdb, tmpTrans) {
  db.verno = idbdb.version / 10;
  const globalSchema = db._dbSchema = buildGlobalSchema(db, idbdb, tmpTrans);
  db._storeNames = slice(idbdb.objectStoreNames, 0);
  setApiOnPlace(db, [db._allTables], keys(globalSchema), globalSchema);
}
function verifyInstalledSchema(db, tmpTrans) {
  const installedSchema = buildGlobalSchema(db, db.idbdb, tmpTrans);
  const diff = getSchemaDiff(installedSchema, db._dbSchema);
  return !(diff.add.length || diff.change.some(ch => ch.add.length || ch.change.length));
}
function adjustToExistingIndexNames({
  _novip: db
}, schema, idbtrans) {
  const storeNames = idbtrans.db.objectStoreNames;
  for (let i = 0; i < storeNames.length; ++i) {
    const storeName = storeNames[i];
    const store = idbtrans.objectStore(storeName);
    db._hasGetAll = 'getAll' in store;
    for (let j = 0; j < store.indexNames.length; ++j) {
      const indexName = store.indexNames[j];
      const keyPath = store.index(indexName).keyPath;
      const dexieName = typeof keyPath === 'string' ? keyPath : "[" + slice(keyPath).join('+') + "]";
      if (schema[storeName]) {
        const indexSpec = schema[storeName].idxByName[dexieName];
        if (indexSpec) {
          indexSpec.name = indexName;
          delete schema[storeName].idxByName[dexieName];
          schema[storeName].idxByName[indexName] = indexSpec;
        }
      }
    }
  }
  if (typeof navigator !== 'undefined' && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && _global.WorkerGlobalScope && _global instanceof _global.WorkerGlobalScope && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) {
    db._hasGetAll = false;
  }
}
function parseIndexSyntax(primKeyAndIndexes) {
  return primKeyAndIndexes.split(',').map((index, indexNum) => {
    index = index.trim();
    const name = index.replace(/([&*]|\+\+)/g, "");
    const keyPath = /^\[/.test(name) ? name.match(/^\[(.*)\]$/)[1].split('+') : name;
    return createIndexSpec(name, keyPath || null, /\&/.test(index), /\*/.test(index), /\+\+/.test(index), isArray(keyPath), indexNum === 0);
  });
}
class Version {
  _parseStoresSpec(stores, outSchema) {
    keys(stores).forEach(tableName => {
      if (stores[tableName] !== null) {
        var indexes = parseIndexSyntax(stores[tableName]);
        var primKey = indexes.shift();
        if (primKey.multi) throw new exceptions.Schema("Primary key cannot be multi-valued");
        indexes.forEach(idx => {
          if (idx.auto) throw new exceptions.Schema("Only primary key can be marked as autoIncrement (++)");
          if (!idx.keyPath) throw new exceptions.Schema("Index must have a name and cannot be an empty string");
        });
        outSchema[tableName] = createTableSchema(tableName, primKey, indexes);
      }
    });
  }
  stores(stores) {
    const db = this.db;
    this._cfg.storesSource = this._cfg.storesSource ? extend(this._cfg.storesSource, stores) : stores;
    const versions = db._versions;
    const storesSpec = {};
    let dbschema = {};
    versions.forEach(version => {
      extend(storesSpec, version._cfg.storesSource);
      dbschema = version._cfg.dbschema = {};
      version._parseStoresSpec(storesSpec, dbschema);
    });
    db._dbSchema = dbschema;
    removeTablesApi(db, [db._allTables, db, db.Transaction.prototype]);
    setApiOnPlace(db, [db._allTables, db, db.Transaction.prototype, this._cfg.tables], keys(dbschema), dbschema);
    db._storeNames = keys(dbschema);
    return this;
  }
  upgrade(upgradeFunction) {
    this._cfg.contentUpgrade = promisableChain(this._cfg.contentUpgrade || nop, upgradeFunction);
    return this;
  }
}
function createVersionConstructor(db) {
  return makeClassConstructor(Version.prototype, function Version(versionNumber) {
    this.db = db;
    this._cfg = {
      version: versionNumber,
      storesSource: null,
      dbschema: {},
      tables: {},
      contentUpgrade: null
    };
  });
}
function getDbNamesTable(indexedDB, IDBKeyRange) {
  let dbNamesDB = indexedDB["_dbNamesDB"];
  if (!dbNamesDB) {
    dbNamesDB = indexedDB["_dbNamesDB"] = new Dexie$1(DBNAMES_DB, {
      addons: [],
      indexedDB,
      IDBKeyRange
    });
    dbNamesDB.version(1).stores({
      dbnames: "name"
    });
  }
  return dbNamesDB.table("dbnames");
}
function hasDatabasesNative(indexedDB) {
  return indexedDB && typeof indexedDB.databases === "function";
}
function getDatabaseNames({
  indexedDB,
  IDBKeyRange
}) {
  return hasDatabasesNative(indexedDB) ? Promise.resolve(indexedDB.databases()).then(infos => infos.map(info => info.name).filter(name => name !== DBNAMES_DB)) : getDbNamesTable(indexedDB, IDBKeyRange).toCollection().primaryKeys();
}
function _onDatabaseCreated({
  indexedDB,
  IDBKeyRange
}, name) {
  !hasDatabasesNative(indexedDB) && name !== DBNAMES_DB && getDbNamesTable(indexedDB, IDBKeyRange).put({
    name
  }).catch(nop);
}
function _onDatabaseDeleted({
  indexedDB,
  IDBKeyRange
}, name) {
  !hasDatabasesNative(indexedDB) && name !== DBNAMES_DB && getDbNamesTable(indexedDB, IDBKeyRange).delete(name).catch(nop);
}
function vip(fn) {
  return newScope(function () {
    PSD.letThrough = true;
    return fn();
  });
}
function idbReady() {
  var isSafari = !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent);
  if (!isSafari || !indexedDB.databases) return Promise.resolve();
  var intervalId;
  return new Promise(function (resolve) {
    var tryIdb = function () {
      return indexedDB.databases().finally(resolve);
    };
    intervalId = setInterval(tryIdb, 100);
    tryIdb();
  }).finally(function () {
    return clearInterval(intervalId);
  });
}
function dexieOpen(db) {
  const state = db._state;
  const {
    indexedDB
  } = db._deps;
  if (state.isBeingOpened || db.idbdb) return state.dbReadyPromise.then(() => state.dbOpenError ? rejection(state.dbOpenError) : db);
  debug && (state.openCanceller._stackHolder = getErrorWithStack());
  state.isBeingOpened = true;
  state.dbOpenError = null;
  state.openComplete = false;
  const openCanceller = state.openCanceller;
  function throwIfCancelled() {
    if (state.openCanceller !== openCanceller) throw new exceptions.DatabaseClosed('db.open() was cancelled');
  }
  let resolveDbReady = state.dbReadyResolve,
    upgradeTransaction = null,
    wasCreated = false;
  const tryOpenDB = () => new DexiePromise((resolve, reject) => {
    throwIfCancelled();
    if (!indexedDB) throw new exceptions.MissingAPI();
    const dbName = db.name;
    const req = state.autoSchema ? indexedDB.open(dbName) : indexedDB.open(dbName, Math.round(db.verno * 10));
    if (!req) throw new exceptions.MissingAPI();
    req.onerror = eventRejectHandler(reject);
    req.onblocked = wrap(db._fireOnBlocked);
    req.onupgradeneeded = wrap(e => {
      upgradeTransaction = req.transaction;
      if (state.autoSchema && !db._options.allowEmptyDB) {
        req.onerror = preventDefault;
        upgradeTransaction.abort();
        req.result.close();
        const delreq = indexedDB.deleteDatabase(dbName);
        delreq.onsuccess = delreq.onerror = wrap(() => {
          reject(new exceptions.NoSuchDatabase(`Database ${dbName} doesnt exist`));
        });
      } else {
        upgradeTransaction.onerror = eventRejectHandler(reject);
        var oldVer = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion;
        wasCreated = oldVer < 1;
        db._novip.idbdb = req.result;
        runUpgraders(db, oldVer / 10, upgradeTransaction, reject);
      }
    }, reject);
    req.onsuccess = wrap(() => {
      upgradeTransaction = null;
      const idbdb = db._novip.idbdb = req.result;
      const objectStoreNames = slice(idbdb.objectStoreNames);
      if (objectStoreNames.length > 0) try {
        const tmpTrans = idbdb.transaction(safariMultiStoreFix(objectStoreNames), 'readonly');
        if (state.autoSchema) readGlobalSchema(db, idbdb, tmpTrans);else {
          adjustToExistingIndexNames(db, db._dbSchema, tmpTrans);
          if (!verifyInstalledSchema(db, tmpTrans)) {
            console.warn(`Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Some queries may fail.`);
          }
        }
        generateMiddlewareStacks(db, tmpTrans);
      } catch (e) {}
      connections.push(db);
      idbdb.onversionchange = wrap(ev => {
        state.vcFired = true;
        db.on("versionchange").fire(ev);
      });
      idbdb.onclose = wrap(ev => {
        db.on("close").fire(ev);
      });
      if (wasCreated) _onDatabaseCreated(db._deps, dbName);
      resolve();
    }, reject);
  }).catch(err => {
    if (err && err.name === 'UnknownError' && state.PR1398_maxLoop > 0) {
      state.PR1398_maxLoop--;
      console.warn('Dexie: Workaround for Chrome UnknownError on open()');
      return tryOpenDB();
    } else {
      return DexiePromise.reject(err);
    }
  });
  return DexiePromise.race([openCanceller, (typeof navigator === 'undefined' ? DexiePromise.resolve() : idbReady()).then(tryOpenDB)]).then(() => {
    throwIfCancelled();
    state.onReadyBeingFired = [];
    return DexiePromise.resolve(vip(() => db.on.ready.fire(db.vip))).then(function fireRemainders() {
      if (state.onReadyBeingFired.length > 0) {
        let remainders = state.onReadyBeingFired.reduce(promisableChain, nop);
        state.onReadyBeingFired = [];
        return DexiePromise.resolve(vip(() => remainders(db.vip))).then(fireRemainders);
      }
    });
  }).finally(() => {
    state.onReadyBeingFired = null;
    state.isBeingOpened = false;
  }).then(() => {
    return db;
  }).catch(err => {
    state.dbOpenError = err;
    try {
      upgradeTransaction && upgradeTransaction.abort();
    } catch (_a) {}
    if (openCanceller === state.openCanceller) {
      db._close();
    }
    return rejection(err);
  }).finally(() => {
    state.openComplete = true;
    resolveDbReady();
  });
}
function awaitIterator(iterator) {
  var callNext = result => iterator.next(result),
    doThrow = error => iterator.throw(error),
    onSuccess = step(callNext),
    onError = step(doThrow);
  function step(getNext) {
    return val => {
      var next = getNext(val),
        value = next.value;
      return next.done ? value : !value || typeof value.then !== 'function' ? isArray(value) ? Promise.all(value).then(onSuccess, onError) : onSuccess(value) : value.then(onSuccess, onError);
    };
  }
  return step(callNext)();
}
function extractTransactionArgs(mode, _tableArgs_, scopeFunc) {
  var i = arguments.length;
  if (i < 2) throw new exceptions.InvalidArgument("Too few arguments");
  var args = new Array(i - 1);
  while (--i) args[i - 1] = arguments[i];
  scopeFunc = args.pop();
  var tables = flatten(args);
  return [mode, tables, scopeFunc];
}
function enterTransactionScope(db, mode, storeNames, parentTransaction, scopeFunc) {
  return DexiePromise.resolve().then(() => {
    const transless = PSD.transless || PSD;
    const trans = db._createTransaction(mode, storeNames, db._dbSchema, parentTransaction);
    const zoneProps = {
      trans: trans,
      transless: transless
    };
    if (parentTransaction) {
      trans.idbtrans = parentTransaction.idbtrans;
    } else {
      try {
        trans.create();
        db._state.PR1398_maxLoop = 3;
      } catch (ex) {
        if (ex.name === errnames.InvalidState && db.isOpen() && --db._state.PR1398_maxLoop > 0) {
          console.warn('Dexie: Need to reopen db');
          db._close();
          return db.open().then(() => enterTransactionScope(db, mode, storeNames, null, scopeFunc));
        }
        return rejection(ex);
      }
    }
    const scopeFuncIsAsync = isAsyncFunction(scopeFunc);
    if (scopeFuncIsAsync) {
      incrementExpectedAwaits();
    }
    let returnValue;
    const promiseFollowed = DexiePromise.follow(() => {
      returnValue = scopeFunc.call(trans, trans);
      if (returnValue) {
        if (scopeFuncIsAsync) {
          var decrementor = decrementExpectedAwaits.bind(null, null);
          returnValue.then(decrementor, decrementor);
        } else if (typeof returnValue.next === 'function' && typeof returnValue.throw === 'function') {
          returnValue = awaitIterator(returnValue);
        }
      }
    }, zoneProps);
    return (returnValue && typeof returnValue.then === 'function' ? DexiePromise.resolve(returnValue).then(x => trans.active ? x : rejection(new exceptions.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))) : promiseFollowed.then(() => returnValue)).then(x => {
      if (parentTransaction) trans._resolve();
      return trans._completion.then(() => x);
    }).catch(e => {
      trans._reject(e);
      return rejection(e);
    });
  });
}
function pad(a, value, count) {
  const result = isArray(a) ? a.slice() : [a];
  for (let i = 0; i < count; ++i) result.push(value);
  return result;
}
function createVirtualIndexMiddleware(down) {
  return {
    ...down,
    table(tableName) {
      const table = down.table(tableName);
      const {
        schema
      } = table;
      const indexLookup = {};
      const allVirtualIndexes = [];
      function addVirtualIndexes(keyPath, keyTail, lowLevelIndex) {
        const keyPathAlias = getKeyPathAlias(keyPath);
        const indexList = indexLookup[keyPathAlias] = indexLookup[keyPathAlias] || [];
        const keyLength = keyPath == null ? 0 : typeof keyPath === 'string' ? 1 : keyPath.length;
        const isVirtual = keyTail > 0;
        const virtualIndex = {
          ...lowLevelIndex,
          isVirtual,
          keyTail,
          keyLength,
          extractKey: getKeyExtractor(keyPath),
          unique: !isVirtual && lowLevelIndex.unique
        };
        indexList.push(virtualIndex);
        if (!virtualIndex.isPrimaryKey) {
          allVirtualIndexes.push(virtualIndex);
        }
        if (keyLength > 1) {
          const virtualKeyPath = keyLength === 2 ? keyPath[0] : keyPath.slice(0, keyLength - 1);
          addVirtualIndexes(virtualKeyPath, keyTail + 1, lowLevelIndex);
        }
        indexList.sort((a, b) => a.keyTail - b.keyTail);
        return virtualIndex;
      }
      const primaryKey = addVirtualIndexes(schema.primaryKey.keyPath, 0, schema.primaryKey);
      indexLookup[":id"] = [primaryKey];
      for (const index of schema.indexes) {
        addVirtualIndexes(index.keyPath, 0, index);
      }
      function findBestIndex(keyPath) {
        const result = indexLookup[getKeyPathAlias(keyPath)];
        return result && result[0];
      }
      function translateRange(range, keyTail) {
        return {
          type: range.type === 1 ? 2 : range.type,
          lower: pad(range.lower, range.lowerOpen ? down.MAX_KEY : down.MIN_KEY, keyTail),
          lowerOpen: true,
          upper: pad(range.upper, range.upperOpen ? down.MIN_KEY : down.MAX_KEY, keyTail),
          upperOpen: true
        };
      }
      function translateRequest(req) {
        const index = req.query.index;
        return index.isVirtual ? {
          ...req,
          query: {
            index,
            range: translateRange(req.query.range, index.keyTail)
          }
        } : req;
      }
      const result = {
        ...table,
        schema: {
          ...schema,
          primaryKey,
          indexes: allVirtualIndexes,
          getIndexByKeyPath: findBestIndex
        },
        count(req) {
          return table.count(translateRequest(req));
        },
        query(req) {
          return table.query(translateRequest(req));
        },
        openCursor(req) {
          const {
            keyTail,
            isVirtual,
            keyLength
          } = req.query.index;
          if (!isVirtual) return table.openCursor(req);
          function createVirtualCursor(cursor) {
            function _continue(key) {
              key != null ? cursor.continue(pad(key, req.reverse ? down.MAX_KEY : down.MIN_KEY, keyTail)) : req.unique ? cursor.continue(cursor.key.slice(0, keyLength).concat(req.reverse ? down.MIN_KEY : down.MAX_KEY, keyTail)) : cursor.continue();
            }
            const virtualCursor = Object.create(cursor, {
              continue: {
                value: _continue
              },
              continuePrimaryKey: {
                value(key, primaryKey) {
                  cursor.continuePrimaryKey(pad(key, down.MAX_KEY, keyTail), primaryKey);
                }
              },
              primaryKey: {
                get() {
                  return cursor.primaryKey;
                }
              },
              key: {
                get() {
                  const key = cursor.key;
                  return keyLength === 1 ? key[0] : key.slice(0, keyLength);
                }
              },
              value: {
                get() {
                  return cursor.value;
                }
              }
            });
            return virtualCursor;
          }
          return table.openCursor(translateRequest(req)).then(cursor => cursor && createVirtualCursor(cursor));
        }
      };
      return result;
    }
  };
}
const virtualIndexMiddleware = {
  stack: "dbcore",
  name: "VirtualIndexMiddleware",
  level: 1,
  create: createVirtualIndexMiddleware
};
function getObjectDiff(a, b, rv, prfx) {
  rv = rv || {};
  prfx = prfx || '';
  keys(a).forEach(prop => {
    if (!hasOwn(b, prop)) {
      rv[prfx + prop] = undefined;
    } else {
      var ap = a[prop],
        bp = b[prop];
      if (typeof ap === 'object' && typeof bp === 'object' && ap && bp) {
        const apTypeName = toStringTag(ap);
        const bpTypeName = toStringTag(bp);
        if (apTypeName !== bpTypeName) {
          rv[prfx + prop] = b[prop];
        } else if (apTypeName === 'Object') {
          getObjectDiff(ap, bp, rv, prfx + prop + '.');
        } else if (ap !== bp) {
          rv[prfx + prop] = b[prop];
        }
      } else if (ap !== bp) rv[prfx + prop] = b[prop];
    }
  });
  keys(b).forEach(prop => {
    if (!hasOwn(a, prop)) {
      rv[prfx + prop] = b[prop];
    }
  });
  return rv;
}
function getEffectiveKeys(primaryKey, req) {
  if (req.type === 'delete') return req.keys;
  return req.keys || req.values.map(primaryKey.extractKey);
}
const hooksMiddleware = {
  stack: "dbcore",
  name: "HooksMiddleware",
  level: 2,
  create: downCore => ({
    ...downCore,
    table(tableName) {
      const downTable = downCore.table(tableName);
      const {
        primaryKey
      } = downTable.schema;
      const tableMiddleware = {
        ...downTable,
        mutate(req) {
          const dxTrans = PSD.trans;
          const {
            deleting,
            creating,
            updating
          } = dxTrans.table(tableName).hook;
          switch (req.type) {
            case 'add':
              if (creating.fire === nop) break;
              return dxTrans._promise('readwrite', () => addPutOrDelete(req), true);
            case 'put':
              if (creating.fire === nop && updating.fire === nop) break;
              return dxTrans._promise('readwrite', () => addPutOrDelete(req), true);
            case 'delete':
              if (deleting.fire === nop) break;
              return dxTrans._promise('readwrite', () => addPutOrDelete(req), true);
            case 'deleteRange':
              if (deleting.fire === nop) break;
              return dxTrans._promise('readwrite', () => deleteRange(req), true);
          }
          return downTable.mutate(req);
          function addPutOrDelete(req) {
            const dxTrans = PSD.trans;
            const keys = req.keys || getEffectiveKeys(primaryKey, req);
            if (!keys) throw new Error("Keys missing");
            req = req.type === 'add' || req.type === 'put' ? {
              ...req,
              keys
            } : {
              ...req
            };
            if (req.type !== 'delete') req.values = [...req.values];
            if (req.keys) req.keys = [...req.keys];
            return getExistingValues(downTable, req, keys).then(existingValues => {
              const contexts = keys.map((key, i) => {
                const existingValue = existingValues[i];
                const ctx = {
                  onerror: null,
                  onsuccess: null
                };
                if (req.type === 'delete') {
                  deleting.fire.call(ctx, key, existingValue, dxTrans);
                } else if (req.type === 'add' || existingValue === undefined) {
                  const generatedPrimaryKey = creating.fire.call(ctx, key, req.values[i], dxTrans);
                  if (key == null && generatedPrimaryKey != null) {
                    key = generatedPrimaryKey;
                    req.keys[i] = key;
                    if (!primaryKey.outbound) {
                      setByKeyPath(req.values[i], primaryKey.keyPath, key);
                    }
                  }
                } else {
                  const objectDiff = getObjectDiff(existingValue, req.values[i]);
                  const additionalChanges = updating.fire.call(ctx, objectDiff, key, existingValue, dxTrans);
                  if (additionalChanges) {
                    const requestedValue = req.values[i];
                    Object.keys(additionalChanges).forEach(keyPath => {
                      if (hasOwn(requestedValue, keyPath)) {
                        requestedValue[keyPath] = additionalChanges[keyPath];
                      } else {
                        setByKeyPath(requestedValue, keyPath, additionalChanges[keyPath]);
                      }
                    });
                  }
                }
                return ctx;
              });
              return downTable.mutate(req).then(({
                failures,
                results,
                numFailures,
                lastResult
              }) => {
                for (let i = 0; i < keys.length; ++i) {
                  const primKey = results ? results[i] : keys[i];
                  const ctx = contexts[i];
                  if (primKey == null) {
                    ctx.onerror && ctx.onerror(failures[i]);
                  } else {
                    ctx.onsuccess && ctx.onsuccess(req.type === 'put' && existingValues[i] ? req.values[i] : primKey);
                  }
                }
                return {
                  failures,
                  results,
                  numFailures,
                  lastResult
                };
              }).catch(error => {
                contexts.forEach(ctx => ctx.onerror && ctx.onerror(error));
                return Promise.reject(error);
              });
            });
          }
          function deleteRange(req) {
            return deleteNextChunk(req.trans, req.range, 10000);
          }
          function deleteNextChunk(trans, range, limit) {
            return downTable.query({
              trans,
              values: false,
              query: {
                index: primaryKey,
                range
              },
              limit
            }).then(({
              result
            }) => {
              return addPutOrDelete({
                type: 'delete',
                keys: result,
                trans
              }).then(res => {
                if (res.numFailures > 0) return Promise.reject(res.failures[0]);
                if (result.length < limit) {
                  return {
                    failures: [],
                    numFailures: 0,
                    lastResult: undefined
                  };
                } else {
                  return deleteNextChunk(trans, {
                    ...range,
                    lower: result[result.length - 1],
                    lowerOpen: true
                  }, limit);
                }
              });
            });
          }
        }
      };
      return tableMiddleware;
    }
  })
};
function getExistingValues(table, req, effectiveKeys) {
  return req.type === "add" ? Promise.resolve([]) : table.getMany({
    trans: req.trans,
    keys: effectiveKeys,
    cache: "immutable"
  });
}
function getFromTransactionCache(keys, cache, clone) {
  try {
    if (!cache) return null;
    if (cache.keys.length < keys.length) return null;
    const result = [];
    for (let i = 0, j = 0; i < cache.keys.length && j < keys.length; ++i) {
      if (cmp(cache.keys[i], keys[j]) !== 0) continue;
      result.push(clone ? deepClone(cache.values[i]) : cache.values[i]);
      ++j;
    }
    return result.length === keys.length ? result : null;
  } catch (_a) {
    return null;
  }
}
const cacheExistingValuesMiddleware = {
  stack: "dbcore",
  level: -1,
  create: core => {
    return {
      table: tableName => {
        const table = core.table(tableName);
        return {
          ...table,
          getMany: req => {
            if (!req.cache) {
              return table.getMany(req);
            }
            const cachedResult = getFromTransactionCache(req.keys, req.trans["_cache"], req.cache === "clone");
            if (cachedResult) {
              return DexiePromise.resolve(cachedResult);
            }
            return table.getMany(req).then(res => {
              req.trans["_cache"] = {
                keys: req.keys,
                values: req.cache === "clone" ? deepClone(res) : res
              };
              return res;
            });
          },
          mutate: req => {
            if (req.type !== "add") req.trans["_cache"] = null;
            return table.mutate(req);
          }
        };
      }
    };
  }
};
function isEmptyRange(node) {
  return !("from" in node);
}
const RangeSet = function (fromOrTree, to) {
  if (this) {
    extend(this, arguments.length ? {
      d: 1,
      from: fromOrTree,
      to: arguments.length > 1 ? to : fromOrTree
    } : {
      d: 0
    });
  } else {
    const rv = new RangeSet();
    if (fromOrTree && "d" in fromOrTree) {
      extend(rv, fromOrTree);
    }
    return rv;
  }
};
props(RangeSet.prototype, {
  add(rangeSet) {
    mergeRanges(this, rangeSet);
    return this;
  },
  addKey(key) {
    addRange(this, key, key);
    return this;
  },
  addKeys(keys) {
    keys.forEach(key => addRange(this, key, key));
    return this;
  },
  [iteratorSymbol]() {
    return getRangeSetIterator(this);
  }
});
function addRange(target, from, to) {
  const diff = cmp(from, to);
  if (isNaN(diff)) return;
  if (diff > 0) throw RangeError();
  if (isEmptyRange(target)) return extend(target, {
    from,
    to,
    d: 1
  });
  const left = target.l;
  const right = target.r;
  if (cmp(to, target.from) < 0) {
    left ? addRange(left, from, to) : target.l = {
      from,
      to,
      d: 1,
      l: null,
      r: null
    };
    return rebalance(target);
  }
  if (cmp(from, target.to) > 0) {
    right ? addRange(right, from, to) : target.r = {
      from,
      to,
      d: 1,
      l: null,
      r: null
    };
    return rebalance(target);
  }
  if (cmp(from, target.from) < 0) {
    target.from = from;
    target.l = null;
    target.d = right ? right.d + 1 : 1;
  }
  if (cmp(to, target.to) > 0) {
    target.to = to;
    target.r = null;
    target.d = target.l ? target.l.d + 1 : 1;
  }
  const rightWasCutOff = !target.r;
  if (left && !target.l) {
    mergeRanges(target, left);
  }
  if (right && rightWasCutOff) {
    mergeRanges(target, right);
  }
}
function mergeRanges(target, newSet) {
  function _addRangeSet(target, {
    from,
    to,
    l,
    r
  }) {
    addRange(target, from, to);
    if (l) _addRangeSet(target, l);
    if (r) _addRangeSet(target, r);
  }
  if (!isEmptyRange(newSet)) _addRangeSet(target, newSet);
}
function rangesOverlap(rangeSet1, rangeSet2) {
  const i1 = getRangeSetIterator(rangeSet2);
  let nextResult1 = i1.next();
  if (nextResult1.done) return false;
  let a = nextResult1.value;
  const i2 = getRangeSetIterator(rangeSet1);
  let nextResult2 = i2.next(a.from);
  let b = nextResult2.value;
  while (!nextResult1.done && !nextResult2.done) {
    if (cmp(b.from, a.to) <= 0 && cmp(b.to, a.from) >= 0) return true;
    cmp(a.from, b.from) < 0 ? a = (nextResult1 = i1.next(b.from)).value : b = (nextResult2 = i2.next(a.from)).value;
  }
  return false;
}
function getRangeSetIterator(node) {
  let state = isEmptyRange(node) ? null : {
    s: 0,
    n: node
  };
  return {
    next(key) {
      const keyProvided = arguments.length > 0;
      while (state) {
        switch (state.s) {
          case 0:
            state.s = 1;
            if (keyProvided) {
              while (state.n.l && cmp(key, state.n.from) < 0) state = {
                up: state,
                n: state.n.l,
                s: 1
              };
            } else {
              while (state.n.l) state = {
                up: state,
                n: state.n.l,
                s: 1
              };
            }
          case 1:
            state.s = 2;
            if (!keyProvided || cmp(key, state.n.to) <= 0) return {
              value: state.n,
              done: false
            };
          case 2:
            if (state.n.r) {
              state.s = 3;
              state = {
                up: state,
                n: state.n.r,
                s: 0
              };
              continue;
            }
          case 3:
            state = state.up;
        }
      }
      return {
        done: true
      };
    }
  };
}
function rebalance(target) {
  var _a, _b;
  const diff = (((_a = target.r) === null || _a === void 0 ? void 0 : _a.d) || 0) - (((_b = target.l) === null || _b === void 0 ? void 0 : _b.d) || 0);
  const r = diff > 1 ? "r" : diff < -1 ? "l" : "";
  if (r) {
    const l = r === "r" ? "l" : "r";
    const rootClone = {
      ...target
    };
    const oldRootRight = target[r];
    target.from = oldRootRight.from;
    target.to = oldRootRight.to;
    target[r] = oldRootRight[r];
    rootClone[r] = oldRootRight[l];
    target[l] = rootClone;
    rootClone.d = computeDepth(rootClone);
  }
  target.d = computeDepth(target);
}
function computeDepth({
  r,
  l
}) {
  return (r ? l ? Math.max(r.d, l.d) : r.d : l ? l.d : 0) + 1;
}
const observabilityMiddleware = {
  stack: "dbcore",
  level: 0,
  create: core => {
    const dbName = core.schema.name;
    const FULL_RANGE = new RangeSet(core.MIN_KEY, core.MAX_KEY);
    return {
      ...core,
      table: tableName => {
        const table = core.table(tableName);
        const {
          schema
        } = table;
        const {
          primaryKey
        } = schema;
        const {
          extractKey,
          outbound
        } = primaryKey;
        const tableClone = {
          ...table,
          mutate: req => {
            const trans = req.trans;
            const mutatedParts = trans.mutatedParts || (trans.mutatedParts = {});
            const getRangeSet = indexName => {
              const part = `idb://${dbName}/${tableName}/${indexName}`;
              return mutatedParts[part] || (mutatedParts[part] = new RangeSet());
            };
            const pkRangeSet = getRangeSet("");
            const delsRangeSet = getRangeSet(":dels");
            const {
              type
            } = req;
            let [keys, newObjs] = req.type === "deleteRange" ? [req.range] : req.type === "delete" ? [req.keys] : req.values.length < 50 ? [[], req.values] : [];
            const oldCache = req.trans["_cache"];
            return table.mutate(req).then(res => {
              if (isArray(keys)) {
                if (type !== "delete") keys = res.results;
                pkRangeSet.addKeys(keys);
                const oldObjs = getFromTransactionCache(keys, oldCache);
                if (!oldObjs && type !== "add") {
                  delsRangeSet.addKeys(keys);
                }
                if (oldObjs || newObjs) {
                  trackAffectedIndexes(getRangeSet, schema, oldObjs, newObjs);
                }
              } else if (keys) {
                const range = {
                  from: keys.lower,
                  to: keys.upper
                };
                delsRangeSet.add(range);
                pkRangeSet.add(range);
              } else {
                pkRangeSet.add(FULL_RANGE);
                delsRangeSet.add(FULL_RANGE);
                schema.indexes.forEach(idx => getRangeSet(idx.name).add(FULL_RANGE));
              }
              return res;
            });
          }
        };
        const getRange = ({
          query: {
            index,
            range
          }
        }) => {
          var _a, _b;
          return [index, new RangeSet((_a = range.lower) !== null && _a !== void 0 ? _a : core.MIN_KEY, (_b = range.upper) !== null && _b !== void 0 ? _b : core.MAX_KEY)];
        };
        const readSubscribers = {
          get: req => [primaryKey, new RangeSet(req.key)],
          getMany: req => [primaryKey, new RangeSet().addKeys(req.keys)],
          count: getRange,
          query: getRange,
          openCursor: getRange
        };
        keys(readSubscribers).forEach(method => {
          tableClone[method] = function (req) {
            const {
              subscr
            } = PSD;
            if (subscr) {
              const getRangeSet = indexName => {
                const part = `idb://${dbName}/${tableName}/${indexName}`;
                return subscr[part] || (subscr[part] = new RangeSet());
              };
              const pkRangeSet = getRangeSet("");
              const delsRangeSet = getRangeSet(":dels");
              const [queriedIndex, queriedRanges] = readSubscribers[method](req);
              getRangeSet(queriedIndex.name || "").add(queriedRanges);
              if (!queriedIndex.isPrimaryKey) {
                if (method === "count") {
                  delsRangeSet.add(FULL_RANGE);
                } else {
                  const keysPromise = method === "query" && outbound && req.values && table.query({
                    ...req,
                    values: false
                  });
                  return table[method].apply(this, arguments).then(res => {
                    if (method === "query") {
                      if (outbound && req.values) {
                        return keysPromise.then(({
                          result: resultingKeys
                        }) => {
                          pkRangeSet.addKeys(resultingKeys);
                          return res;
                        });
                      }
                      const pKeys = req.values ? res.result.map(extractKey) : res.result;
                      if (req.values) {
                        pkRangeSet.addKeys(pKeys);
                      } else {
                        delsRangeSet.addKeys(pKeys);
                      }
                    } else if (method === "openCursor") {
                      const cursor = res;
                      const wantValues = req.values;
                      return cursor && Object.create(cursor, {
                        key: {
                          get() {
                            delsRangeSet.addKey(cursor.primaryKey);
                            return cursor.key;
                          }
                        },
                        primaryKey: {
                          get() {
                            const pkey = cursor.primaryKey;
                            delsRangeSet.addKey(pkey);
                            return pkey;
                          }
                        },
                        value: {
                          get() {
                            wantValues && pkRangeSet.addKey(cursor.primaryKey);
                            return cursor.value;
                          }
                        }
                      });
                    }
                    return res;
                  });
                }
              }
            }
            return table[method].apply(this, arguments);
          };
        });
        return tableClone;
      }
    };
  }
};
function trackAffectedIndexes(getRangeSet, schema, oldObjs, newObjs) {
  function addAffectedIndex(ix) {
    const rangeSet = getRangeSet(ix.name || "");
    function extractKey(obj) {
      return obj != null ? ix.extractKey(obj) : null;
    }
    const addKeyOrKeys = key => ix.multiEntry && isArray(key) ? key.forEach(key => rangeSet.addKey(key)) : rangeSet.addKey(key);
    (oldObjs || newObjs).forEach((_, i) => {
      const oldKey = oldObjs && extractKey(oldObjs[i]);
      const newKey = newObjs && extractKey(newObjs[i]);
      if (cmp(oldKey, newKey) !== 0) {
        if (oldKey != null) addKeyOrKeys(oldKey);
        if (newKey != null) addKeyOrKeys(newKey);
      }
    });
  }
  schema.indexes.forEach(addAffectedIndex);
}
class Dexie$1 {
  constructor(name, options) {
    this._middlewares = {};
    this.verno = 0;
    const deps = Dexie$1.dependencies;
    this._options = options = {
      addons: Dexie$1.addons,
      autoOpen: true,
      indexedDB: deps.indexedDB,
      IDBKeyRange: deps.IDBKeyRange,
      ...options
    };
    this._deps = {
      indexedDB: options.indexedDB,
      IDBKeyRange: options.IDBKeyRange
    };
    const {
      addons
    } = options;
    this._dbSchema = {};
    this._versions = [];
    this._storeNames = [];
    this._allTables = {};
    this.idbdb = null;
    this._novip = this;
    const state = {
      dbOpenError: null,
      isBeingOpened: false,
      onReadyBeingFired: null,
      openComplete: false,
      dbReadyResolve: nop,
      dbReadyPromise: null,
      cancelOpen: nop,
      openCanceller: null,
      autoSchema: true,
      PR1398_maxLoop: 3
    };
    state.dbReadyPromise = new DexiePromise(resolve => {
      state.dbReadyResolve = resolve;
    });
    state.openCanceller = new DexiePromise((_, reject) => {
      state.cancelOpen = reject;
    });
    this._state = state;
    this.name = name;
    this.on = Events(this, "populate", "blocked", "versionchange", "close", {
      ready: [promisableChain, nop]
    });
    this.on.ready.subscribe = override(this.on.ready.subscribe, subscribe => {
      return (subscriber, bSticky) => {
        Dexie$1.vip(() => {
          const state = this._state;
          if (state.openComplete) {
            if (!state.dbOpenError) DexiePromise.resolve().then(subscriber);
            if (bSticky) subscribe(subscriber);
          } else if (state.onReadyBeingFired) {
            state.onReadyBeingFired.push(subscriber);
            if (bSticky) subscribe(subscriber);
          } else {
            subscribe(subscriber);
            const db = this;
            if (!bSticky) subscribe(function unsubscribe() {
              db.on.ready.unsubscribe(subscriber);
              db.on.ready.unsubscribe(unsubscribe);
            });
          }
        });
      };
    });
    this.Collection = createCollectionConstructor(this);
    this.Table = createTableConstructor(this);
    this.Transaction = createTransactionConstructor(this);
    this.Version = createVersionConstructor(this);
    this.WhereClause = createWhereClauseConstructor(this);
    this.on("versionchange", ev => {
      if (ev.newVersion > 0) console.warn(`Another connection wants to upgrade database '${this.name}'. Closing db now to resume the upgrade.`);else console.warn(`Another connection wants to delete database '${this.name}'. Closing db now to resume the delete request.`);
      this.close();
    });
    this.on("blocked", ev => {
      if (!ev.newVersion || ev.newVersion < ev.oldVersion) console.warn(`Dexie.delete('${this.name}') was blocked`);else console.warn(`Upgrade '${this.name}' blocked by other connection holding version ${ev.oldVersion / 10}`);
    });
    this._maxKey = getMaxKey(options.IDBKeyRange);
    this._createTransaction = (mode, storeNames, dbschema, parentTransaction) => new this.Transaction(mode, storeNames, dbschema, this._options.chromeTransactionDurability, parentTransaction);
    this._fireOnBlocked = ev => {
      this.on("blocked").fire(ev);
      connections.filter(c => c.name === this.name && c !== this && !c._state.vcFired).map(c => c.on("versionchange").fire(ev));
    };
    this.use(virtualIndexMiddleware);
    this.use(hooksMiddleware);
    this.use(observabilityMiddleware);
    this.use(cacheExistingValuesMiddleware);
    this.vip = Object.create(this, {
      _vip: {
        value: true
      }
    });
    addons.forEach(addon => addon(this));
  }
  version(versionNumber) {
    if (isNaN(versionNumber) || versionNumber < 0.1) throw new exceptions.Type(`Given version is not a positive number`);
    versionNumber = Math.round(versionNumber * 10) / 10;
    if (this.idbdb || this._state.isBeingOpened) throw new exceptions.Schema("Cannot add version when database is open");
    this.verno = Math.max(this.verno, versionNumber);
    const versions = this._versions;
    var versionInstance = versions.filter(v => v._cfg.version === versionNumber)[0];
    if (versionInstance) return versionInstance;
    versionInstance = new this.Version(versionNumber);
    versions.push(versionInstance);
    versions.sort(lowerVersionFirst);
    versionInstance.stores({});
    this._state.autoSchema = false;
    return versionInstance;
  }
  _whenReady(fn) {
    return this.idbdb && (this._state.openComplete || PSD.letThrough || this._vip) ? fn() : new DexiePromise((resolve, reject) => {
      if (this._state.openComplete) {
        return reject(new exceptions.DatabaseClosed(this._state.dbOpenError));
      }
      if (!this._state.isBeingOpened) {
        if (!this._options.autoOpen) {
          reject(new exceptions.DatabaseClosed());
          return;
        }
        this.open().catch(nop);
      }
      this._state.dbReadyPromise.then(resolve, reject);
    }).then(fn);
  }
  use({
    stack,
    create,
    level,
    name
  }) {
    if (name) this.unuse({
      stack,
      name
    });
    const middlewares = this._middlewares[stack] || (this._middlewares[stack] = []);
    middlewares.push({
      stack,
      create,
      level: level == null ? 10 : level,
      name
    });
    middlewares.sort((a, b) => a.level - b.level);
    return this;
  }
  unuse({
    stack,
    name,
    create
  }) {
    if (stack && this._middlewares[stack]) {
      this._middlewares[stack] = this._middlewares[stack].filter(mw => create ? mw.create !== create : name ? mw.name !== name : false);
    }
    return this;
  }
  open() {
    return dexieOpen(this);
  }
  _close() {
    const state = this._state;
    const idx = connections.indexOf(this);
    if (idx >= 0) connections.splice(idx, 1);
    if (this.idbdb) {
      try {
        this.idbdb.close();
      } catch (e) {}
      this._novip.idbdb = null;
    }
    state.dbReadyPromise = new DexiePromise(resolve => {
      state.dbReadyResolve = resolve;
    });
    state.openCanceller = new DexiePromise((_, reject) => {
      state.cancelOpen = reject;
    });
  }
  close() {
    this._close();
    const state = this._state;
    this._options.autoOpen = false;
    state.dbOpenError = new exceptions.DatabaseClosed();
    if (state.isBeingOpened) state.cancelOpen(state.dbOpenError);
  }
  delete() {
    const hasArguments = arguments.length > 0;
    const state = this._state;
    return new DexiePromise((resolve, reject) => {
      const doDelete = () => {
        this.close();
        var req = this._deps.indexedDB.deleteDatabase(this.name);
        req.onsuccess = wrap(() => {
          _onDatabaseDeleted(this._deps, this.name);
          resolve();
        });
        req.onerror = eventRejectHandler(reject);
        req.onblocked = this._fireOnBlocked;
      };
      if (hasArguments) throw new exceptions.InvalidArgument("Arguments not allowed in db.delete()");
      if (state.isBeingOpened) {
        state.dbReadyPromise.then(doDelete);
      } else {
        doDelete();
      }
    });
  }
  backendDB() {
    return this.idbdb;
  }
  isOpen() {
    return this.idbdb !== null;
  }
  hasBeenClosed() {
    const dbOpenError = this._state.dbOpenError;
    return dbOpenError && dbOpenError.name === 'DatabaseClosed';
  }
  hasFailed() {
    return this._state.dbOpenError !== null;
  }
  dynamicallyOpened() {
    return this._state.autoSchema;
  }
  get tables() {
    return keys(this._allTables).map(name => this._allTables[name]);
  }
  transaction() {
    const args = extractTransactionArgs.apply(this, arguments);
    return this._transaction.apply(this, args);
  }
  _transaction(mode, tables, scopeFunc) {
    let parentTransaction = PSD.trans;
    if (!parentTransaction || parentTransaction.db !== this || mode.indexOf('!') !== -1) parentTransaction = null;
    const onlyIfCompatible = mode.indexOf('?') !== -1;
    mode = mode.replace('!', '').replace('?', '');
    let idbMode, storeNames;
    try {
      storeNames = tables.map(table => {
        var storeName = table instanceof this.Table ? table.name : table;
        if (typeof storeName !== 'string') throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
        return storeName;
      });
      if (mode == "r" || mode === READONLY) idbMode = READONLY;else if (mode == "rw" || mode == READWRITE) idbMode = READWRITE;else throw new exceptions.InvalidArgument("Invalid transaction mode: " + mode);
      if (parentTransaction) {
        if (parentTransaction.mode === READONLY && idbMode === READWRITE) {
          if (onlyIfCompatible) {
            parentTransaction = null;
          } else throw new exceptions.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
        }
        if (parentTransaction) {
          storeNames.forEach(storeName => {
            if (parentTransaction && parentTransaction.storeNames.indexOf(storeName) === -1) {
              if (onlyIfCompatible) {
                parentTransaction = null;
              } else throw new exceptions.SubTransaction("Table " + storeName + " not included in parent transaction.");
            }
          });
        }
        if (onlyIfCompatible && parentTransaction && !parentTransaction.active) {
          parentTransaction = null;
        }
      }
    } catch (e) {
      return parentTransaction ? parentTransaction._promise(null, (_, reject) => {
        reject(e);
      }) : rejection(e);
    }
    const enterTransaction = enterTransactionScope.bind(null, this, idbMode, storeNames, parentTransaction, scopeFunc);
    return parentTransaction ? parentTransaction._promise(idbMode, enterTransaction, "lock") : PSD.trans ? usePSD(PSD.transless, () => this._whenReady(enterTransaction)) : this._whenReady(enterTransaction);
  }
  table(tableName) {
    if (!hasOwn(this._allTables, tableName)) {
      throw new exceptions.InvalidTable(`Table ${tableName} does not exist`);
    }
    return this._allTables[tableName];
  }
}
const symbolObservable = typeof Symbol !== "undefined" && "observable" in Symbol ? Symbol.observable : "@@observable";
class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }
  subscribe(x, error, complete) {
    return this._subscribe(!x || typeof x === "function" ? {
      next: x,
      error,
      complete
    } : x);
  }
  [symbolObservable]() {
    return this;
  }
}
function extendObservabilitySet(target, newSet) {
  keys(newSet).forEach(part => {
    const rangeSet = target[part] || (target[part] = new RangeSet());
    mergeRanges(rangeSet, newSet[part]);
  });
  return target;
}
function liveQuery(querier) {
  let hasValue = false;
  let currentValue = undefined;
  const observable = new Observable(observer => {
    const scopeFuncIsAsync = isAsyncFunction(querier);
    function execute(subscr) {
      if (scopeFuncIsAsync) {
        incrementExpectedAwaits();
      }
      const exec = () => newScope(querier, {
        subscr,
        trans: null
      });
      const rv = PSD.trans ? usePSD(PSD.transless, exec) : exec();
      if (scopeFuncIsAsync) {
        rv.then(decrementExpectedAwaits, decrementExpectedAwaits);
      }
      return rv;
    }
    let closed = false;
    let accumMuts = {};
    let currentObs = {};
    const subscription = {
      get closed() {
        return closed;
      },
      unsubscribe: () => {
        closed = true;
        globalEvents.storagemutated.unsubscribe(mutationListener);
      }
    };
    observer.start && observer.start(subscription);
    let querying = false,
      startedListening = false;
    function shouldNotify() {
      return keys(currentObs).some(key => accumMuts[key] && rangesOverlap(accumMuts[key], currentObs[key]));
    }
    const mutationListener = parts => {
      extendObservabilitySet(accumMuts, parts);
      if (shouldNotify()) {
        doQuery();
      }
    };
    const doQuery = () => {
      if (querying || closed) return;
      accumMuts = {};
      const subscr = {};
      const ret = execute(subscr);
      if (!startedListening) {
        globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, mutationListener);
        startedListening = true;
      }
      querying = true;
      Promise.resolve(ret).then(result => {
        hasValue = true;
        currentValue = result;
        querying = false;
        if (closed) return;
        if (shouldNotify()) {
          doQuery();
        } else {
          accumMuts = {};
          currentObs = subscr;
          observer.next && observer.next(result);
        }
      }, err => {
        querying = false;
        hasValue = false;
        observer.error && observer.error(err);
        subscription.unsubscribe();
      });
    };
    doQuery();
    return subscription;
  });
  observable.hasValue = () => hasValue;
  observable.getValue = () => currentValue;
  return observable;
}
let domDeps;
try {
  domDeps = {
    indexedDB: _global.indexedDB || _global.mozIndexedDB || _global.webkitIndexedDB || _global.msIndexedDB,
    IDBKeyRange: _global.IDBKeyRange || _global.webkitIDBKeyRange
  };
} catch (e) {
  domDeps = {
    indexedDB: null,
    IDBKeyRange: null
  };
}
const Dexie = Dexie$1;
props(Dexie, {
  ...fullNameExceptions,
  delete(databaseName) {
    const db = new Dexie(databaseName, {
      addons: []
    });
    return db.delete();
  },
  exists(name) {
    return new Dexie(name, {
      addons: []
    }).open().then(db => {
      db.close();
      return true;
    }).catch('NoSuchDatabaseError', () => false);
  },
  getDatabaseNames(cb) {
    try {
      return getDatabaseNames(Dexie.dependencies).then(cb);
    } catch (_a) {
      return rejection(new exceptions.MissingAPI());
    }
  },
  defineClass() {
    function Class(content) {
      extend(this, content);
    }
    return Class;
  },
  ignoreTransaction(scopeFunc) {
    return PSD.trans ? usePSD(PSD.transless, scopeFunc) : scopeFunc();
  },
  vip,
  async: function (generatorFn) {
    return function () {
      try {
        var rv = awaitIterator(generatorFn.apply(this, arguments));
        if (!rv || typeof rv.then !== 'function') return DexiePromise.resolve(rv);
        return rv;
      } catch (e) {
        return rejection(e);
      }
    };
  },
  spawn: function (generatorFn, args, thiz) {
    try {
      var rv = awaitIterator(generatorFn.apply(thiz, args || []));
      if (!rv || typeof rv.then !== 'function') return DexiePromise.resolve(rv);
      return rv;
    } catch (e) {
      return rejection(e);
    }
  },
  currentTransaction: {
    get: () => PSD.trans || null
  },
  waitFor: function (promiseOrFunction, optionalTimeout) {
    const promise = DexiePromise.resolve(typeof promiseOrFunction === 'function' ? Dexie.ignoreTransaction(promiseOrFunction) : promiseOrFunction).timeout(optionalTimeout || 60000);
    return PSD.trans ? PSD.trans.waitFor(promise) : promise;
  },
  Promise: DexiePromise,
  debug: {
    get: () => debug,
    set: value => {
      setDebug(value, value === 'dexie' ? () => true : dexieStackFrameFilter);
    }
  },
  derive: derive,
  extend: extend,
  props: props,
  override: override,
  Events: Events,
  on: globalEvents,
  liveQuery,
  extendObservabilitySet,
  getByKeyPath: getByKeyPath,
  setByKeyPath: setByKeyPath,
  delByKeyPath: delByKeyPath,
  shallowClone: shallowClone,
  deepClone: deepClone,
  getObjectDiff: getObjectDiff,
  cmp,
  asap: asap$1,
  minKey: minKey,
  addons: [],
  connections: connections,
  errnames: errnames,
  dependencies: domDeps,
  semVer: DEXIE_VERSION,
  version: DEXIE_VERSION.split('.').map(n => parseInt(n)).reduce((p, c, i) => p + c / Math.pow(10, i * 2))
});
Dexie.maxKey = getMaxKey(Dexie.dependencies.IDBKeyRange);
if (typeof dispatchEvent !== 'undefined' && typeof addEventListener !== 'undefined') {
  globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, updatedParts => {
    if (!propagatingLocally) {
      let event;
      if (isIEOrEdge) {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(STORAGE_MUTATED_DOM_EVENT_NAME, true, true, updatedParts);
      } else {
        event = new CustomEvent(STORAGE_MUTATED_DOM_EVENT_NAME, {
          detail: updatedParts
        });
      }
      propagatingLocally = true;
      dispatchEvent(event);
      propagatingLocally = false;
    }
  });
  addEventListener(STORAGE_MUTATED_DOM_EVENT_NAME, ({
    detail
  }) => {
    if (!propagatingLocally) {
      propagateLocally(detail);
    }
  });
}
function propagateLocally(updateParts) {
  let wasMe = propagatingLocally;
  try {
    propagatingLocally = true;
    globalEvents.storagemutated.fire(updateParts);
  } finally {
    propagatingLocally = wasMe;
  }
}
let propagatingLocally = false;
if (typeof BroadcastChannel !== 'undefined') {
  const bc = new BroadcastChannel(STORAGE_MUTATED_DOM_EVENT_NAME);
  if (typeof bc.unref === 'function') {
    bc.unref();
  }
  globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, changedParts => {
    if (!propagatingLocally) {
      bc.postMessage(changedParts);
    }
  });
  bc.onmessage = ev => {
    if (ev.data) propagateLocally(ev.data);
  };
} else if (typeof self !== 'undefined' && typeof navigator !== 'undefined') {
  globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, changedParts => {
    try {
      if (!propagatingLocally) {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(STORAGE_MUTATED_DOM_EVENT_NAME, JSON.stringify({
            trig: Math.random(),
            changedParts
          }));
        }
        if (typeof self['clients'] === 'object') {
          [...self['clients'].matchAll({
            includeUncontrolled: true
          })].forEach(client => client.postMessage({
            type: STORAGE_MUTATED_DOM_EVENT_NAME,
            changedParts
          }));
        }
      }
    } catch (_a) {}
  });
  if (typeof addEventListener !== 'undefined') {
    addEventListener('storage', ev => {
      if (ev.key === STORAGE_MUTATED_DOM_EVENT_NAME) {
        const data = JSON.parse(ev.newValue);
        if (data) propagateLocally(data.changedParts);
      }
    });
  }
  const swContainer = self.document && navigator.serviceWorker;
  if (swContainer) {
    swContainer.addEventListener('message', propagateMessageLocally);
  }
}
function propagateMessageLocally({
  data
}) {
  if (data && data.type === STORAGE_MUTATED_DOM_EVENT_NAME) {
    propagateLocally(data.changedParts);
  }
}
DexiePromise.rejectionMapper = mapError;
setDebug(debug, dexieStackFrameFilter);


/***/ }),

/***/ 7883:
/*!*****************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/index.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseAppComponent": () => (/* reexport safe */ _lib_sandbox_module__WEBPACK_IMPORTED_MODULE_0__.BaseAppComponent),
/* harmony export */   "ChangeListenerService": () => (/* reexport safe */ _lib_sandbox_module__WEBPACK_IMPORTED_MODULE_0__.ChangeListenerService),
/* harmony export */   "ChangeModule": () => (/* reexport safe */ _lib_sandbox_module__WEBPACK_IMPORTED_MODULE_0__.ChangeModule),
/* harmony export */   "ChangeProviderService": () => (/* reexport safe */ _lib_sandbox_module__WEBPACK_IMPORTED_MODULE_0__.ChangeProviderService),
/* harmony export */   "CommandModule": () => (/* reexport safe */ _lib_sandbox_module__WEBPACK_IMPORTED_MODULE_0__.CommandModule),
/* harmony export */   "DefaultViewerComponent": () => (/* reexport safe */ _lib_sandbox_module__WEBPACK_IMPORTED_MODULE_0__.DefaultViewerComponent),
/* harmony export */   "DontCodeRuntimeConfig": () => (/* reexport safe */ _lib_sandbox_module__WEBPACK_IMPORTED_MODULE_0__.DontCodeRuntimeConfig),
/* harmony export */   "GlobalPluginLoader": () => (/* reexport safe */ _lib_sandbox_module__WEBPACK_IMPORTED_MODULE_0__.GlobalPluginLoader),
/* harmony export */   "IdeProject": () => (/* reexport safe */ _lib_sandbox_module__WEBPACK_IMPORTED_MODULE_0__.IdeProject),
/* harmony export */   "IndexedDbStorageService": () => (/* reexport safe */ _lib_sandbox_module__WEBPACK_IMPORTED_MODULE_0__.IndexedDbStorageService),
/* harmony export */   "LayoutModule": () => (/* reexport safe */ _lib_sandbox_module__WEBPACK_IMPORTED_MODULE_0__.LayoutModule),
/* harmony export */   "LightAppComponent": () => (/* reexport safe */ _lib_sandbox_module__WEBPACK_IMPORTED_MODULE_0__.LightAppComponent),
/* harmony export */   "MainComponent": () => (/* reexport safe */ _lib_sandbox_module__WEBPACK_IMPORTED_MODULE_0__.MainComponent),
/* harmony export */   "RemotePluginLoaderService": () => (/* reexport safe */ _lib_sandbox_module__WEBPACK_IMPORTED_MODULE_0__.RemotePluginLoaderService),
/* harmony export */   "SandboxModule": () => (/* reexport safe */ _lib_sandbox_module__WEBPACK_IMPORTED_MODULE_0__.SandboxModule),
/* harmony export */   "SharedModule": () => (/* reexport safe */ _lib_sandbox_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule)
/* harmony export */ });
/* harmony import */ var _lib_sandbox_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/sandbox.module */ 2763);


/***/ }),

/***/ 4738:
/*!*******************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/layout/app/BaseAppComponent.mjs ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseAppComponent": () => (/* binding */ BaseAppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dontcode/core */ 9130);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 4337);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 3499);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 224);
/* harmony import */ var _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dontcode/plugin-common */ 3955);
/* harmony import */ var _LightAppComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LightAppComponent */ 5282);
/* harmony import */ var _shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/command/services/change-provider.service */ 7173);
/* harmony import */ var _shared_storage_services_indexed_db_storage_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/storage/services/indexed-db-storage.service */ 9253);
/* harmony import */ var _shared_change_services_change_listener_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/change/services/change-listener.service */ 3028);
/* harmony import */ var _shared_plugins_remote_plugin_loader_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../shared/plugins/remote-plugin-loader.service */ 880);
/* harmony import */ var _shared_plugins_global_plugin_loader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/plugins/global-plugin-loader */ 5613);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 2123);















/**
 *  An AppComponent that loads dynamically the repository configuration and loads all plugins related to it
 **/
class BaseAppComponent extends _LightAppComponent__WEBPACK_IMPORTED_MODULE_4__.LightAppComponent {
  constructor(provider, storage, listener, pluginLoader, globalPluginLoader, loaderService, changeProviderService, configService, httpClient, injector, ref, dontCodeCore, modelMgr, storeMgr, previewMgr) {
    super(configService, httpClient, injector, ref, dontCodeCore);
    this.provider = provider;
    this.storage = storage;
    this.listener = listener;
    this.pluginLoader = pluginLoader;
    this.globalPluginLoader = globalPluginLoader;
    this.loaderService = loaderService;
    this.changeProviderService = changeProviderService;
    this.modelMgr = modelMgr;
    this.storeMgr = storeMgr;
    this.previewMgr = previewMgr;
    this.sessionId = null;
  }
  /**
   * This is called after all plugins are loaded and inited, and the store provider configured
   */
  afterInitialization(config, repoUrl) {
    return super.afterInitialization(config, repoUrl).then(() => {
      return this.pluginLoader.loadPluginsFromRepository(config, repoUrl).catch(reason => {
        if (this.runtimeConfig.forceRepositoryLoading) return Promise.reject(reason);else return Promise.resolve(null);
      }).then(() => {
        this.dontCodeCore.initPlugins();
        // Apply updates from repository
        const repoUpdates = this.pluginLoader.listAllRepositoryConfigUpdates();
        repoUpdates.forEach(update => {
          const chg = this.modelMgr.convertToChange(update);
          this.changeProviderService.pushChange(chg);
        });
        // eslint-disable-next-line no-restricted-syntax
        console.info('Dynamic Plugins inited');
        // Manage the global plugins
        this.globalPluginLoader.initLoading();
        this.initStoreProvider();
        this.sessionId = this.runtimeConfig.sessionId ?? null;
        // eslint-disable-next-line no-restricted-syntax
        console.info('Browser opened with SessionId =', this.sessionId);
        this.listener.setSessionId(this.sessionId);
      });
    });
  }
  initStoreProvider() {
    // Manage the store manager
    this.storeMgr.setProvider(this.storage);
    this.subscription.add(this.provider.receiveCommands(_dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModel.APP_SHARING, _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModel.APP_SHARING_WITH_NODE).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.mergeMap)(change => {
      if (change.type !== _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.DELETE) {
        if (change.value === 'No-one') {
          this.storeMgr.setProvider(this.storage);
          return rxjs__WEBPACK_IMPORTED_MODULE_6__.EMPTY;
        } else if (change.value) {
          return this.loadStoreManager(_dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModel.APP_SHARING_WITH);
        } else {
          return rxjs__WEBPACK_IMPORTED_MODULE_6__.EMPTY;
        }
      }
      return rxjs__WEBPACK_IMPORTED_MODULE_6__.EMPTY;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)(storeProvider => {
      if (storeProvider != null) {
        const updatedInjector = _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector.create({
          providers: [storeProvider],
          parent: this.injector
        });
        this.storeMgr.setProvider(updatedInjector.get(storeProvider));
        // eslint-disable-next-line no-restricted-syntax
        console.info("Set new provider to:", storeProvider);
      }
      return storeProvider;
    })).subscribe({
      error(error) {
        console.error('Cannot load StoreProvider due to', error);
      }
    }));
  }
  loadStoreManager(position) {
    const currentJson = this.provider.getJsonAt(position);
    const handler = this.previewMgr.retrieveHandlerConfig(position, currentJson);
    if (handler) {
      // eslint-disable-next-line no-restricted-syntax
      console.debug('Importing StoreManager from ', handler.class.source);
      // First lets try if the plugin is imported during the compilation
      return this.loaderService.loadPluginModule(handler).then(module => {
        const providerClass = module.instance.exposedPreviewHandlers().get(handler.class.name);
        // eslint-disable-next-line no-restricted-syntax
        console.debug('Provider Class found:', providerClass);
        return providerClass;
      });
    }
    return Promise.reject('No handler found for storemanager ' + currentJson);
  }
  mainTab() {
    return window.location.hash.indexOf('/newTabDev') === -1;
  }
}
BaseAppComponent.ɵfac = function BaseAppComponent_Factory(t) {
  return new (t || BaseAppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_8__.ChangeProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_storage_services_indexed_db_storage_service__WEBPACK_IMPORTED_MODULE_9__.IndexedDbStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_change_services_change_listener_service__WEBPACK_IMPORTED_MODULE_10__.ChangeListenerService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_plugins_remote_plugin_loader_service__WEBPACK_IMPORTED_MODULE_11__.RemotePluginLoaderService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_plugins_global_plugin_loader__WEBPACK_IMPORTED_MODULE_12__.GlobalPluginLoader), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.ComponentLoaderService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_8__.ChangeProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.CommonConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.DONT_CODE_CORE), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModelManager), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeStoreManager), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodePreviewManager));
};
BaseAppComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: BaseAppComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  decls: 0,
  vars: 0,
  template: function BaseAppComponent_Template(rf, ctx) {},
  encapsulation: 2
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BaseAppComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      template: ''
    }]
  }], function () {
    return [{
      type: _shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_8__.ChangeProviderService
    }, {
      type: _shared_storage_services_indexed_db_storage_service__WEBPACK_IMPORTED_MODULE_9__.IndexedDbStorageService
    }, {
      type: _shared_change_services_change_listener_service__WEBPACK_IMPORTED_MODULE_10__.ChangeListenerService
    }, {
      type: _shared_plugins_remote_plugin_loader_service__WEBPACK_IMPORTED_MODULE_11__.RemotePluginLoaderService
    }, {
      type: _shared_plugins_global_plugin_loader__WEBPACK_IMPORTED_MODULE_12__.GlobalPluginLoader
    }, {
      type: _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.ComponentLoaderService
    }, {
      type: _shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_8__.ChangeProviderService
    }, {
      type: _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.CommonConfigService
    }, {
      type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.DONT_CODE_CORE]
      }]
    }, {
      type: _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModelManager
    }, {
      type: _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeStoreManager
    }, {
      type: _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodePreviewManager
    }];
  }, null);
})();

/***/ }),

/***/ 5282:
/*!********************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/layout/app/LightAppComponent.mjs ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DontCodeRuntimeConfig": () => (/* binding */ DontCodeRuntimeConfig),
/* harmony export */   "LightAppComponent": () => (/* binding */ LightAppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 5339);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 1211);
/* harmony import */ var _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dontcode/plugin-common */ 3955);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 2123);






/**
 * An AppComponent that loads dynamically the repository configuration
 */
class LightAppComponent {
  constructor(configService, httpClient, injector, ref, dontCodeCore) {
    this.configService = configService;
    this.httpClient = httpClient;
    this.injector = injector;
    this.ref = ref;
    this.dontCodeCore = dontCodeCore;
    this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscription();
    this.runtimeConfig = new DontCodeRuntimeConfig();
    this.defaultRepositoryUrl = 'assets/repositories/default.json';
  }
  /**
   * Reads configuration from the repository file
   */
  ngOnInit() {
    // First load the repository 
    const repoUrl = this.runtimeConfig.repositoryUrl || this.defaultRepositoryUrl;
    (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.firstValueFrom)(this.httpClient.get(repoUrl, {
      observe: 'body',
      responseType: 'json'
    })).then(config => {
      const updates = {};
      if (config.documentApiUrl != null) updates.documentApiUrl = config.documentApiUrl;
      if (config.storeApiUrl != null) updates.storeApiUrl = config.storeApiUrl;
      if (config.webSocketUrl != null) updates.webSocketUrl = config.webSocketUrl;
      if (config.ideWebSocketUrl != null) updates.ideWebSocketUrl = config.ideWebSocketUrl;
      if (config.projectApiUrl != null) updates.projectApiUrl = config.projectApiUrl;
      this.configService.batchUpdateConfig(updates);
      // Once everything is finalized, let's give a chance to the caller to do something.
      return this.afterInitialization(config, repoUrl);
    }).then(() => {
      this.ref.markForCheck();
      this.ref.detectChanges();
    });
  }
  /**
   * This is called after all plugins are loaded and inited, and the store provider configured
   */
  afterInitialization(config, repoUrl) {
    return Promise.resolve();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
LightAppComponent.ɵfac = function LightAppComponent_Factory(t) {
  return new (t || LightAppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__.CommonConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__.DONT_CODE_CORE));
};
LightAppComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: LightAppComponent,
  selectors: [["ng-component"]],
  decls: 0,
  vars: 0,
  template: function LightAppComponent_Template(rf, ctx) {},
  encapsulation: 2
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LightAppComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      template: ''
    }]
  }], function () {
    return [{
      type: _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__.CommonConfigService
    }, {
      type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__.DONT_CODE_CORE]
      }]
    }];
  }, null);
})();
class DontCodeRuntimeConfig {
  constructor() {
    this.runtime = false;
    this.forceRepositoryLoading = false;
  }
}

/***/ }),

/***/ 9922:
/*!************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/layout/layout.module.mjs ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseAppComponent": () => (/* reexport safe */ _app_BaseAppComponent__WEBPACK_IMPORTED_MODULE_11__.BaseAppComponent),
/* harmony export */   "DontCodeRuntimeConfig": () => (/* reexport safe */ _app_LightAppComponent__WEBPACK_IMPORTED_MODULE_12__.DontCodeRuntimeConfig),
/* harmony export */   "LayoutModule": () => (/* binding */ LayoutModule),
/* harmony export */   "LightAppComponent": () => (/* reexport safe */ _app_LightAppComponent__WEBPACK_IMPORTED_MODULE_12__.LightAppComponent),
/* harmony export */   "MainComponent": () => (/* reexport safe */ _main_main_component__WEBPACK_IMPORTED_MODULE_9__.MainComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 1395);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 6968);
/* harmony import */ var _main_main_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./main/main.component */ 8929);
/* harmony import */ var _menu_menu_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./menu/menu.component */ 1786);
/* harmony import */ var primeng_sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/sidebar */ 2856);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/toolbar */ 4764);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/button */ 2715);
/* harmony import */ var primeng_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/menu */ 4223);
/* harmony import */ var primeng_tooltip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/tooltip */ 7744);
/* harmony import */ var primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/overlaypanel */ 5189);
/* harmony import */ var _app_BaseAppComponent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app/BaseAppComponent */ 4738);
/* harmony import */ var _app_LightAppComponent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app/LightAppComponent */ 5282);












class LayoutModule {}
LayoutModule.ɵfac = function LayoutModule_Factory(t) {
  return new (t || LayoutModule)();
};
LayoutModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: LayoutModule
});
LayoutModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, primeng_sidebar__WEBPACK_IMPORTED_MODULE_3__.SidebarModule, primeng_toolbar__WEBPACK_IMPORTED_MODULE_4__.ToolbarModule, primeng_button__WEBPACK_IMPORTED_MODULE_5__.ButtonModule, primeng_menu__WEBPACK_IMPORTED_MODULE_6__.MenuModule, primeng_tooltip__WEBPACK_IMPORTED_MODULE_7__.TooltipModule, primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_8__.OverlayPanelModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LayoutModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      declarations: [_main_main_component__WEBPACK_IMPORTED_MODULE_9__.MainComponent, _menu_menu_component__WEBPACK_IMPORTED_MODULE_10__.MenuComponent],
      exports: [_main_main_component__WEBPACK_IMPORTED_MODULE_9__.MainComponent],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule, primeng_sidebar__WEBPACK_IMPORTED_MODULE_3__.SidebarModule, primeng_toolbar__WEBPACK_IMPORTED_MODULE_4__.ToolbarModule, primeng_button__WEBPACK_IMPORTED_MODULE_5__.ButtonModule, primeng_menu__WEBPACK_IMPORTED_MODULE_6__.MenuModule, primeng_tooltip__WEBPACK_IMPORTED_MODULE_7__.TooltipModule, primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_8__.OverlayPanelModule]
    }]
  }], null, null);
})();




/***/ }),

/***/ 8929:
/*!******************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/layout/main/main.component.mjs ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainComponent": () => (/* binding */ MainComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 4337);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 5339);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 4233);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 224);
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dontcode/core */ 9130);
/* harmony import */ var _shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../shared/command/services/change-provider.service */ 7173);
/* harmony import */ var _shared_change_services_change_listener_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../shared/change/services/change-listener.service */ 3028);
/* harmony import */ var _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dontcode/plugin-common */ 3955);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 1395);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 6968);
/* harmony import */ var primeng_sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/sidebar */ 2856);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/api */ 1295);
/* harmony import */ var primeng_toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/toolbar */ 4764);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/button */ 2715);
/* harmony import */ var primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/overlaypanel */ 5189);
/* harmony import */ var _menu_menu_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../menu/menu.component */ 1786);
















function MainComponent_div_0_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 14)(1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Server:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Session:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r3.serverUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1.sessionId);
  }
}
const _c0 = function () {
  return {
    width: "500px"
  };
};
const _c1 = function () {
  return {
    width: "15em"
  };
};
function MainComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div")(1, "p-toolbar", 1)(2, "div", 2)(3, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MainComponent_div_0_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r5.sidePanelVisible = !ctx_r5.sidePanelVisible);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 6)(9, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MainComponent_div_0_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r7.openDevUrl());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mouseenter", function MainComponent_div_0_Template_button_mouseenter_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](12);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r2.show($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "p-overlayPanel", 9, 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, MainComponent_div_0_ng_template_13_Template, 9, 2, "ng-template", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 12)(15, "p-sidebar", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("visibleChange", function MainComponent_div_0_Template_p_sidebar_visibleChange_15_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r9.sidePanelVisible = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "a", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "img", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "dontcode-sandbox-menu");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 14)(20, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "dontcode-sandbox-menu", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "router-outlet");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r0.themedLogo(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.appName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r0.connectedClass(ctx_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](13, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showCloseIcon", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](14, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("visible", ctx_r0.sidePanelVisible)("modal", false)("closeOnEscape", true)("showCloseIcon", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r0.themedLogo(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
class MainComponent {
  constructor(provider, listenerService, configService, ref) {
    this.provider = provider;
    this.listenerService = listenerService;
    this.configService = configService;
    this.ref = ref;
    this.context$ = rxjs__WEBPACK_IMPORTED_MODULE_10__.EMPTY;
    this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subscription();
    this.appName = 'Plugin Tester';
    this.serverUrl = '';
    this.config = null;
    this.sidePanelVisible = true;
  }
  ngOnInit() {
    this.subscriptions.add(this.configService.getUpdates().subscribe(newConfig => {
      if (newConfig.applicationName != this.config?.applicationName && newConfig.applicationName != null) {
        this.appName = newConfig.applicationName;
      }
      if (newConfig.webSocketUrl != this.config?.webSocketUrl && newConfig.webSocketUrl != null && newConfig.webSocketUrl.length > 0) {
        this.serverUrl = newConfig.webSocketUrl;
      }
      this.config = newConfig;
    }));
    this.subscriptions.add(this.provider.receiveCommands(_dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModel.APP_NAME).subscribe(command => {
      if (command.value) {
        this.appName = this.generateApplicationName(command.value);
      } else {
        this.appName = this.generateApplicationName('No Name');
      }
      this.ref.detectChanges();
    }));
    this.context$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.combineLatest)([this.listenerService.getConnectionStatus(), this.listenerService.getSessionIdSubject()]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.map)(status => {
      return {
        status: status[0],
        sessionId: status[1]
      };
    }));
  }
  ngOnDestroy() {
    // unsubscribe to all observables
    this.subscriptions.unsubscribe();
  }
  logoClicked() {
    this.sidePanelVisible = true;
  }
  sidePanelVisibleChanged($event) {
    //console.log($event);
    this.sidePanelVisible = $event.target.visible;
  }
  openDevUrl() {
    window.open('#/newTabDev', '_blank');
  }
  connectedClass(ctx) {
    if (ctx.status === "undefined") {
      return "p-button-secondary";
    } else if (ctx.status !== "connected") {
      return "p-button-danger";
    } else return '';
  }
  generateApplicationName(subName) {
    if (this.config?.applicationName) {
      return this.config?.applicationName + ' ' + subName;
    } else {
      return subName;
    }
  }
  themedLogo() {
    if (this.config?.theme) {
      return 'assets/images/logo-' + this.config?.theme + '.png';
    } else {
      return 'assets/images/logo.png';
    }
  }
}
MainComponent.ɵfac = function MainComponent_Factory(t) {
  return new (t || MainComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_14__.ChangeProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_change_services_change_listener_service__WEBPACK_IMPORTED_MODULE_15__.ChangeListenerService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.CommonConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef));
};
MainComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MainComponent,
  selectors: [["dontcode-sandbox-main"]],
  decls: 2,
  vars: 3,
  consts: [[4, "ngIf"], ["id", "mainToolbar"], [1, "p-toolbar-group-left"], ["pButton", "", "type", "button", "icon", "pi pi-bars", 1, "md:hidden", "p-button-rounded", "p-button-outlined", 2, "margin-right", "10px", 3, "click"], ["href", "https://dont-code.net/apps.html"], ["width", "119", "height", "66", 3, "src"], [1, "p-toolbar-group-right"], ["pButton", "", "type", "button", "icon", "pi pi-external-link", 1, "p-button-rounded", "p-button-outlined", 3, "click"], ["pButton", "", "type", "button", "icon", "pi pi-sort", 1, "p-button-rounded", "p-button-outlined", 3, "ngClass", "mouseenter"], [3, "showCloseIcon"], ["op", ""], ["pTemplate", ""], [1, "md:hidden"], ["id", "mainSidePanel", 3, "visible", "modal", "closeOnEscape", "showCloseIcon", "visibleChange"], [1, "grid"], [1, "col", "hidden", "md:block", "md:col-3"], ["id", "mainMenu"], [1, "col", "md:col-9"], [1, "col-2"], [1, "col-10"]],
  template: function MainComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, MainComponent_div_0_Template, 24, 15, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.context$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterOutlet, primeng_sidebar__WEBPACK_IMPORTED_MODULE_5__.Sidebar, primeng_api__WEBPACK_IMPORTED_MODULE_6__.PrimeTemplate, primeng_toolbar__WEBPACK_IMPORTED_MODULE_7__.Toolbar, primeng_button__WEBPACK_IMPORTED_MODULE_8__.ButtonDirective, primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_9__.OverlayPanel, _menu_menu_component__WEBPACK_IMPORTED_MODULE_16__.MenuComponent, _angular_common__WEBPACK_IMPORTED_MODULE_3__.AsyncPipe],
  styles: [".sidenav-container[_ngcontent-%COMP%]{height:100%}.sidenav[_ngcontent-%COMP%]{width:200px}.sidenav[_ngcontent-%COMP%]   .mat-toolbar[_ngcontent-%COMP%]{background:inherit}.mat-toolbar.mat-primary[_ngcontent-%COMP%]{position:sticky;top:0;z-index:1}"],
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MainComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'dontcode-sandbox-main',
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      template: "<div *ngIf=\"(context$ | async) as ctx\">\n  <p-toolbar id=\"mainToolbar\">\n    <div class=\"p-toolbar-group-left\">\n      <button pButton type=\"button\" style=\"margin-right: 10px\" class=\"md:hidden p-button-rounded p-button-outlined\" icon=\"pi pi-bars\" (click)=\"sidePanelVisible=!sidePanelVisible\"></button>\n      <a href=\"https://dont-code.net/apps.html\"><img [src]=\"themedLogo ()\" width=\"119\" height=\"66\"/></a>\n    </div>\n    <h1>{{appName}}</h1>\n    <div class=\"p-toolbar-group-right\">\n      <button pButton type=\"button\" class=\"p-button-rounded p-button-outlined\" icon=\"pi pi-external-link\" (click)=\"openDevUrl()\"></button>\n      <button pButton type=\"button\" class=\"p-button-rounded p-button-outlined\" [ngClass]=\"connectedClass(ctx)\" icon=\"pi pi-sort\" (mouseenter)=\"op.show($event)\" ></button>\n      <p-overlayPanel #op [showCloseIcon]=\"false\" [style]=\"{width: '500px'}\">\n        <ng-template pTemplate>\n          <div class=\"grid\">\n            <div class=\"col-2\">Server:</div>\n            <div class=\"col-10\">{{serverUrl}}</div>\n            <div class=\"col-2\">Session:</div>\n            <div class=\"col-10\">{{ctx.sessionId}}</div>\n          </div>\n        </ng-template>\n      </p-overlayPanel>\n    </div>\n  </p-toolbar>\n  <div class=\"md:hidden\">\n    <p-sidebar id=\"mainSidePanel\" [style]=\"{width:'15em'}\" [(visible)]=\"sidePanelVisible\" [modal]=\"false\" [closeOnEscape]=\"true\" [showCloseIcon]=\"true\">\n     <a href=\"https://dont-code.net/apps.html\"><img [src]=\"themedLogo ()\" width=\"119\" height=\"66\"/></a>\n      <dontcode-sandbox-menu></dontcode-sandbox-menu>\n    </p-sidebar>\n  </div>\n  <div class=\"grid\">\n    <div class=\"col hidden md:block md:col-3\">\n      <dontcode-sandbox-menu id=\"mainMenu\"></dontcode-sandbox-menu>\n    </div>\n    <div class=\"col md:col-9\">\n      <router-outlet> </router-outlet>\n    </div>\n  </div>\n\n</div>\n",
      styles: [".sidenav-container{height:100%}.sidenav{width:200px}.sidenav .mat-toolbar{background:inherit}.mat-toolbar.mat-primary{position:sticky;top:0;z-index:1}\n"]
    }]
  }], function () {
    return [{
      type: _shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_14__.ChangeProviderService
    }, {
      type: _shared_change_services_change_listener_service__WEBPACK_IMPORTED_MODULE_15__.ChangeListenerService
    }, {
      type: _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.CommonConfigService
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }];
  }, null);
})();

/***/ }),

/***/ 1786:
/*!******************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/layout/menu/menu.component.mjs ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MenuComponent": () => (/* binding */ MenuComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 5339);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 224);
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dontcode/core */ 9130);
/* harmony import */ var _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dontcode/plugin-common */ 3955);
/* harmony import */ var _shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/command/services/change-provider.service */ 7173);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 6968);
/* harmony import */ var primeng_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/menu */ 4223);









class MenuComponent {
  constructor(provider, menuUpdater, ref, router, ngZone) {
    this.provider = provider;
    this.ref = ref;
    this.router = router;
    this.ngZone = ngZone;
    this.templateMenus = new Array({
      label: 'Main Menu',
      items: [{
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/']
      }, {
        label: 'Dev',
        icon: 'pi pi-book',
        routerLink: ['dev']
      }]
    }, {
      label: 'Application Menu',
      items: new Array()
    });
    this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subscription();
    this.runtime = false;
    const config = window.dontCodeConfig;
    if (config?.runtime === true || config?.projectId != null) this.runtime = true;
    if (menuUpdater != null && this.templateMenus[0].items != null) {
      this.templateMenus[0].items.push(...menuUpdater.additionalMenus());
    }
    this.menus = this.generateMenu();
  }
  ngOnInit() {
    this.handleItemMenu(_dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModel.APP_ENTITIES, _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModel.APP_ENTITIES_NAME_NODE, 'pi-ticket');
    this.handleItemMenu(_dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModel.APP_SCREENS, _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModel.APP_SCREENS_NAME_NODE, 'pi-desktop');
    this.handleItemMenu(_dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModel.APP_REPORTS, _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModel.APP_REPORTS_TITLE_NODE, 'pi-chart-pie');
  }
  handleItemMenu(itemPosition, nameKey, icon) {
    this.subscriptions.add(this.provider.receiveCommands(itemPosition, nameKey).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(command => {
      if (command.type == _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.ACTION) return;
      // eslint-disable-next-line no-restricted-syntax
      // console.debug("Received menu change for ", command.position);
      this.updateMenuName(command, icon);
      this.ref.detectChanges();
    })).subscribe());
    this.subscriptions.add(this.provider.receiveCommands(itemPosition + '/?').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(command => {
      if (command.type == _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.ACTION) return;
      // eslint-disable-next-line no-restricted-syntax
      // console.debug("Received menu change for ", command.position);
      if (command.position.length > itemPosition.length + 1) {
        // Avoid adding empty entities (received due to reset)
        this.updateMenu(command, nameKey, icon);
        this.ref.detectChanges();
      } else if (!command.value) {
        // Reset all menus
        this.getDynamicMenu().length = 0;
        this.ref.detectChanges();
      }
    })).subscribe());
  }
  getDynamicMenu() {
    if (this.templateMenus[1].items) return this.templateMenus[1].items;else return [];
  }
  generateMenu() {
    // Create a new menu object to update UI
    const ret = new Array();
    if (!this.runtime) {
      this.templateMenus.forEach(value => {
        ret.push(value);
      });
    } else {
      this.getDynamicMenu().forEach(value => {
        ret.push(value);
      });
      if (ret.length === 0) {
        ret.push(this.templateMenus[1]);
      }
    }
    return ret;
  }
  ngOnDestroy() {
    // unsubscribe to all observables
    this.subscriptions.unsubscribe();
  }
  gotoPage(page) {
    // ngZone is necessary as we are being called by a non angular component (kor-ui)
    this.ngZone.run(() => {
      this.router.navigate([page]);
    });
  }
  isActive(page) {
    const ret = this.router.isActive(page, true);
    //    console.log(page +' is active:'+ret);
    return ret;
  }
  cleanPosition(position) {
    /*    if (position.startsWith(DontCodeModel.ROOT))
          position = position.substr(DontCodeModel.ROOT.length+1);*/
    if (position.endsWith(_dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModel.APP_SCREENS_NAME_NODE)) {
      position = position.substring(0, position.length - _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModel.APP_SCREENS_NAME_NODE.length - 1);
    }
    return position;
  }
  updateMenu(change, nameKey, icon) {
    // Actions are not changing anything in menus
    if (change.type == _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.ACTION) {
      return;
    }
    const key = change.position;
    const pos = this.findMenuPosOf(key);
    let menu;
    if (pos === -1) {
      if (change.value?.[nameKey] != null) {
        menu = {
          routerLink: [key],
          label: change.value[nameKey],
          icon: 'pi ' + icon
        };
      } else return;
    } else {
      menu = this.getDynamicMenu()[pos];
    }
    switch (change.type) {
      case _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.UPDATE:
      case _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.RESET:
      case _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.ADD:
      case _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.DELETE:
        // These are handled at the name change level
        break;
      case _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.MOVE:
        {
          if (pos !== -1) {
            this.getDynamicMenu().splice(pos, 1);
          }
          let beforeKeyPos = -1;
          if (change.pointer) beforeKeyPos = this.findMenuPosOf(change.pointer.containerPosition + '/' + change.beforeKey);
          if (beforeKeyPos !== -1) this.getDynamicMenu().splice(beforeKeyPos, 0, menu);else this.getDynamicMenu().push(menu);
        }
        this.menus = this.generateMenu();
        break;
    }
  }
  updateMenuName(command, icon) {
    // Actions are not changing anything in menus
    if (command.type == _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.ACTION) {
      return;
    }
    const parentPos = _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModelPointer.parentPosition(command.position);
    if (parentPos == null) {
      console.error("Cannot update menu name for " + command.position + " with no parent position");
      return;
    }
    const key = this.cleanPosition(parentPos);
    const pos = this.findMenuPosOf(key);
    const name = command.value;
    let menu;
    if (pos === -1) {
      menu = {
        routerLink: [key],
        label: command.value,
        icon: 'pi ' + icon
      };
    } else {
      menu = this.getDynamicMenu()[pos];
    }
    switch (command.type) {
      case _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.UPDATE:
      case _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.RESET:
      case _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.ADD:
        if (pos !== -1) {
          menu.label = name;
        } else {
          this.getDynamicMenu().push(menu);
        }
        break;
      case _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.DELETE:
        if (pos !== -1) this.getDynamicMenu().splice(pos, 1);
        break;
      case _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.MOVE:
        {
          // The move is handled at the menu level
        }
        break;
    }
    this.menus = this.generateMenu();
  }
  findMenuPosOf(key) {
    let pos = -1;
    this.getDynamicMenu().forEach((value, index) => {
      if (value.routerLink[0] === key) {
        pos = index;
      }
    });
    return pos;
  }
}
MenuComponent.ɵfac = function MenuComponent_Factory(t) {
  return new (t || MenuComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_7__.ChangeProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.SANDBOX_MENUS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone));
};
MenuComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: MenuComponent,
  selectors: [["dontcode-sandbox-menu"]],
  decls: 2,
  vars: 1,
  consts: [[1, "grid"], [1, "col", 3, "model"]],
  template: function MenuComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "p-menu", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("model", ctx.menus);
    }
  },
  dependencies: [primeng_menu__WEBPACK_IMPORTED_MODULE_4__.Menu],
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MenuComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'dontcode-sandbox-menu',
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      template: "<div class=\"grid\">\n  <p-menu class=\"col\" [model]=\"menus\"></p-menu>\n</div>\n"
    }]
  }], function () {
    return [{
      type: _shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_7__.ChangeProviderService
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.SANDBOX_MENUS]
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }];
  }, null);
})();

/***/ }),

/***/ 5156:
/*!************************************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/routes/debug/debug-page/debug-page.component.mjs ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DebugPageComponent": () => (/* binding */ DebugPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _list_commands_list_commands_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../list-commands/list-commands.component */ 7936);
/* harmony import */ var _insert_command_insert_command_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../insert-command/insert-command.component */ 2814);




class DebugPageComponent {}
DebugPageComponent.ɵfac = function DebugPageComponent_Factory(t) {
  return new (t || DebugPageComponent)();
};
DebugPageComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: DebugPageComponent,
  selectors: [["dontcode-sandbox-debug-page"]],
  decls: 12,
  vars: 0,
  consts: [[1, "grid", "flex-column"], [1, "col"]],
  template: function DebugPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Debug Page");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "This page allows us to test your plugin by injecting the same commands than the Builder application. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "You then can see the behavior of your Preview Plugin without running the Builder ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Please select the command to add: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "dontcode-sandbox-insert-command", 1)(11, "dontcode-sandbox-list-commands", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
  },
  dependencies: [_list_commands_list_commands_component__WEBPACK_IMPORTED_MODULE_1__.ListCommandsComponent, _insert_command_insert_command_component__WEBPACK_IMPORTED_MODULE_2__.InsertCommandComponent]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DebugPageComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'dontcode-sandbox-debug-page',
      template: "<div class=\"grid flex-column\">\n  <div class=\"col\">\n    <h1>Debug Page</h1>\n    <br/>This page allows us to test your plugin by injecting the same commands than the Builder application.\n    <br/>You then can see the behavior of your Preview Plugin without running the Builder\n    <br/>\n    Please select the command to add:\n  </div>\n  <dontcode-sandbox-insert-command class=\"col\"></dontcode-sandbox-insert-command>\n  <dontcode-sandbox-list-commands class=\"col\"></dontcode-sandbox-list-commands>\n</div>\n"
    }]
  }], null, null);
})();

/***/ }),

/***/ 2814:
/*!********************************************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/routes/debug/insert-command/insert-command.component.mjs ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InsertCommandComponent": () => (/* binding */ InsertCommandComponent)
/* harmony export */ });
/* harmony import */ var _home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/temp/node_modules/.pnpm/@babel+runtime@7.20.13/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 8706);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dontcode/core */ 9130);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 224);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 5339);
/* harmony import */ var _shared_dev_services_dev_change_push_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/dev/services/dev-change-push.service */ 4388);
/* harmony import */ var _shared_dev_services_dev_template_manager_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../shared/dev/services/dev-template-manager.service */ 7986);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 7527);
/* harmony import */ var primeng_accordion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/accordion */ 6941);
/* harmony import */ var primeng_autocomplete__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/autocomplete */ 9841);
/* harmony import */ var primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/inputtextarea */ 1580);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/button */ 2715);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/dropdown */ 8905);














class InsertCommandComponent {
  constructor(pushService, templates, fb) {
    this.pushService = pushService;
    this.templates = templates;
    this.fb = fb;
    this.position = 'creation/name';
    this.value = 'New Test';
    this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subscription();
    this.listTemplates = [];
    this.filteredTemplates = [];
    this.templateForm = this.fb.group({
      template: null,
      step: null,
      type: null,
      value: null
    });
    this.filteredSteps = [];
    this.selectedStep = null;
    this.valueFieldLabel = 'Value';
    this.changeTypes = [{
      label: _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.ChangeType.ADD
    }, {
      label: _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.ChangeType.UPDATE
    }, {
      label: _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.ChangeType.DELETE
    }, {
      label: _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.ChangeType.MOVE
    }, {
      label: _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.ChangeType.RESET
    }];
    this.openAddCommand = true;
  }
  ngOnInit() {
    this.subscriptions.add(this.templates.getTemplates().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(allTemplates => {
      this.listTemplates = allTemplates;
    })).subscribe());
    this.subscriptions.add(this.templateForm.get('template')?.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(templ => {
      const stepControl = this.templateForm.get('step');
      const typeControl = this.templateForm.get('type');
      if (stepControl == null || typeControl == null) throw new Error("Cannot find value and type field");
      if (templ != null) {
        this.filteredSteps = templ.sequence;
        stepControl.setValue(templ.sequence[0]);
        stepControl.enable({
          emitEvent: false
        });
        typeControl.setValue(templ.sequence[0].type);
      } else {
        stepControl.setValue(null);
        stepControl.disable({
          emitEvent: false
        });
        typeControl.setValue(null);
      }
    })).subscribe());
    this.subscriptions.add(this.templateForm.get('step')?.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(step => {
      const valueControl = this.templateForm.get('value');
      const typeControl = this.templateForm.get('type');
      if (valueControl == null || typeControl == null) throw new Error("Cannot find value and type field");
      if (step === null) {
        valueControl.disable({
          emitEvent: false
        });
        typeControl.disable({
          emitEvent: false
        });
      } else {
        valueControl.enable({
          emitEvent: false
        });
        typeControl.enable({
          emitEvent: false
        });
      }
      if (typeof step === 'string') {
        // The user just changed the step name: We deselect the template
        this.templateForm.get('template')?.setValue(null, {
          emitEvent: false
        });
        // And we update the step
        if (this.selectedStep != null) this.selectedStep.position = step;
      } else {
        this.selectedStep = step;
        // Another step has been selected
        if (step != null) {
          typeControl.setValue(step.type);
          if (typeof step.value === 'string') {
            valueControl.setValue(step.value);
          } else {
            valueControl.setValue(JSON.stringify(step.value, null, 2));
          }
        }
      }
    })).subscribe());
    this.subscriptions.add(this.templateForm.get('value')?.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(value => {
      const step = this.getSelectedStep();
      if (step != null) {
        if (value == null) {
          step.value = value;
        } else {
          try {
            step.value = JSON.parse(value);
          } catch (e) {
            // Not json, so set a string
            step.value = value;
          }
        }
      }
    })).subscribe());
    this.subscriptions.add(this.templateForm.get('type')?.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(value => {
      const step = this.getSelectedStep();
      if (step != null) {
        step.type = value ?? '';
      }
      if (value === _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.ChangeType.MOVE) {
        this.valueFieldLabel = 'Before';
      } else {
        this.valueFieldLabel = 'Value';
      }
    })).subscribe());
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  sendCommand() {
    var _this = this;
    return (0,_home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const tmpl = _this.getSelectedTemplate();
      if (tmpl != null) {
        for (const step of tmpl.sequence) {
          if (step.isValid()) {
            yield _this.pushChange(step.type, step.position, step.value);
          }
        }
      } else {
        const step = _this.getSelectedStep();
        if (step != null && step.isValid()) {
          yield _this.pushChange(step.type, step.position, step.value);
        }
      }
    })();
  }
  searchTemplate($event) {
    this.subscriptions.add(this.templates.filterTemplates($event.query).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(list => {
      this.filteredTemplates = list;
    })).subscribe());
  }
  getSelectedTemplate() {
    return this.templateForm.get('template')?.value ?? null;
  }
  getSelectedStep() {
    return this.selectedStep;
  }
  searchStep($event) {
    const query = $event.query.toLowerCase();
    const seq = this.getSelectedTemplate()?.sequence;
    if (seq) {
      this.filteredSteps = seq.filter(step => {
        if (step.position.toLowerCase().startsWith(query)) {
          return true;
        } else return false;
      });
    } else {
      this.filteredSteps = [];
    }
  }
  pushChange(type, position, valueOrBeforeKey) {
    if (position === '/') position = '';
    const toSend = new _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.Change(_dontcode_core__WEBPACK_IMPORTED_MODULE_2__.ChangeType[type], position, valueOrBeforeKey);
    if (type === _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.ChangeType.MOVE) {
      toSend.value = null;
      toSend.oldPosition = position;
      toSend.beforeKey = valueOrBeforeKey;
    }
    return this.pushService.pushChange(toSend);
  }
}
InsertCommandComponent.ɵfac = function InsertCommandComponent_Factory(t) {
  return new (t || InsertCommandComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_dev_services_dev_change_push_service__WEBPACK_IMPORTED_MODULE_11__.DevChangePushService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_dev_services_dev_template_manager_service__WEBPACK_IMPORTED_MODULE_12__.DevTemplateManagerService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder));
};
InsertCommandComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: InsertCommandComponent,
  selectors: [["dontcode-sandbox-insert-command"]],
  decls: 26,
  vars: 9,
  consts: [["header", "Add Command", 3, "selected"], [1, "p-fluid", "formgrid", "grid", 3, "formGroup"], [1, "field", "col-12", "md:col-9"], [1, "p-float-label"], ["id", "template", "formControlName", "template", "field", "name", 3, "suggestions", "dropdown", "completeMethod"], ["for", "template"], [1, "field", "col-12", "md:col-3"], ["id", "sendButton", "label", "Send", 3, "click"], ["id", "step", "formControlName", "step", "field", "position", 3, "suggestions", "dropdown", "completeMethod"], ["for", "step"], ["id", "type", "formControlName", "type", "field", "type", "optionValue", "label", 3, "options"], ["for", "type"], [1, "field", "col-12"], ["pInputTextarea", "", "id", "value", "formControlName", "value", "field", "value", "rows", "10", 3, "autoResize"], ["for", "value"]],
  template: function InsertCommandComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p-accordion")(1, "p-accordionTab", 0)(2, "div", 1)(3, "div", 2)(4, "span", 3)(5, "p-autoComplete", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("completeMethod", function InsertCommandComponent_Template_p_autoComplete_completeMethod_5_listener($event) {
        return ctx.searchTemplate($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "label", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Select a Template");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 6)(9, "p-button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function InsertCommandComponent_Template_p_button_click_9_listener() {
        return ctx.sendCommand();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 2)(11, "span", 3)(12, "p-autoComplete", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("completeMethod", function InsertCommandComponent_Template_p_autoComplete_completeMethod_12_listener($event) {
        return ctx.searchStep($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "label", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Step");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 6)(16, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](17, "p-dropdown", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "label", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Select a type");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 12)(21, "span", 3)(22, "textarea", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "          ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "label", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("selected", ctx.openAddCommand);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.templateForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("suggestions", ctx.filteredTemplates)("dropdown", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("suggestions", ctx.filteredSteps)("dropdown", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("options", ctx.changeTypes);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("autoResize", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.valueFieldLabel);
    }
  },
  dependencies: [primeng_accordion__WEBPACK_IMPORTED_MODULE_4__.Accordion, primeng_accordion__WEBPACK_IMPORTED_MODULE_4__.AccordionTab, primeng_autocomplete__WEBPACK_IMPORTED_MODULE_5__.AutoComplete, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_6__.InputTextarea, primeng_button__WEBPACK_IMPORTED_MODULE_7__.Button, primeng_dropdown__WEBPACK_IMPORTED_MODULE_8__.Dropdown]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](InsertCommandComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
    args: [{
      selector: 'dontcode-sandbox-insert-command',
      template: "<p-accordion>\n  <p-accordionTab header=\"Add Command\" [selected]=\"openAddCommand\">\n    <div class=\"p-fluid formgrid grid\" [formGroup]=\"templateForm\">\n      <div class=\"field col-12 md:col-9\">\n        <span class=\"p-float-label\">\n          <p-autoComplete id=\"template\" formControlName=\"template\" [suggestions]=\"filteredTemplates\" field=\"name\" [dropdown]=\"true\" (completeMethod)=\"searchTemplate($event)\">\n          </p-autoComplete>\n          <label for=\"template\">Select a Template</label>\n        </span>\n      </div>\n      <div class=\"field col-12 md:col-3\">\n        <p-button id=\"sendButton\" label=\"Send\" (click)=\"sendCommand()\"></p-button>\n      </div>\n      <div class=\"field col-12 md:col-9\">\n        <span class=\"p-float-label\">\n          <p-autoComplete id=\"step\" formControlName=\"step\" [suggestions]=\"filteredSteps\" field=\"position\" [dropdown]=\"true\" (completeMethod)=\"searchStep($event)\" >\n          </p-autoComplete>\n          <label for=\"step\">Step</label>\n        </span>\n      </div>\n      <div class=\"field col-12 md:col-3\">\n        <span class=\"p-float-label\">\n          <p-dropdown id=\"type\" formControlName=\"type\" [options]=\"changeTypes\" field=\"type\" optionValue=\"label\" >\n          </p-dropdown>\n          <label for=\"type\">Select a type</label>\n        </span>\n      </div>\n      <div class=\"field col-12\">\n        <span class=\"p-float-label\">\n          <textarea pInputTextarea id=\"value\" formControlName=\"value\" field=\"value\" rows=\"10\" [autoResize]=\"true\" >\n          </textarea>\n          <label for=\"value\">{{valueFieldLabel}}</label>\n        </span>\n      </div>\n    </div>\n  </p-accordionTab>\n</p-accordion>\n"
    }]
  }], function () {
    return [{
      type: _shared_dev_services_dev_change_push_service__WEBPACK_IMPORTED_MODULE_11__.DevChangePushService
    }, {
      type: _shared_dev_services_dev_template_manager_service__WEBPACK_IMPORTED_MODULE_12__.DevTemplateManagerService
    }, {
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder
    }];
  }, null);
})();

/***/ }),

/***/ 7936:
/*!******************************************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/routes/debug/list-commands/list-commands.component.mjs ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListCommandsComponent": () => (/* binding */ ListCommandsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 5339);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 224);
/* harmony import */ var _shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/command/services/change-provider.service */ 7173);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 1395);






function ListCommandsComponent_p_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "json");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const command_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate3"]("", command_r1.type, ", ", command_r1.position, ", ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 3, command_r1.value ? command_r1.value : command_r1.beforeKey), "");
  }
}
class ListCommandsComponent {
  constructor(changeProvider, ref) {
    this.changeProvider = changeProvider;
    this.ref = ref;
    this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subscription();
    this.commands = [];
    /**
     * Dont update for the first item sent by providerservice
     */
    this.forgetIt = true;
  }
  ngOnInit() {
    this.subscriptions.add(this.changeProvider.getChangesHistory().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(command => {
      // console.log('Received...', command);
      this.commands.push(structuredClone(command));
      this.ref.detectChanges();
      //        }
    })).subscribe());
  }
  noCommands() {
    return this.commands.length == 0;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
ListCommandsComponent.ɵfac = function ListCommandsComponent_Factory(t) {
  return new (t || ListCommandsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_4__.ChangeProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef));
};
ListCommandsComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ListCommandsComponent,
  selectors: [["dontcode-sandbox-list-commands"]],
  decls: 3,
  vars: 1,
  consts: [[4, "ngFor", "ngForOf"]],
  template: function ListCommandsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "We list below the commands received from the Application Builder:");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ListCommandsComponent_p_2_Template, 3, 5, "p", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.commands);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.JsonPipe],
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ListCommandsComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'dontcode-sandbox-list-commands',
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      template: "<p>We list below the commands received from the Application Builder:</p>\n<p *ngFor=\"let command of commands\">{{command.type}}, {{command.position}}, {{(command.value?command.value:command.beforeKey)|json}}</p>\n"
    }]
  }], function () {
    return [{
      type: _shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_4__.ChangeProviderService
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }];
  }, null);
})();

/***/ }),

/***/ 1339:
/*!******************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/routes/home/home.component.mjs ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomeComponent": () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primeng/button */ 2715);



class HomeComponent {}
HomeComponent.ɵfac = function HomeComponent_Factory(t) {
  return new (t || HomeComponent)();
};
HomeComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: HomeComponent,
  selectors: [["dontcode-sandbox-home"]],
  decls: 24,
  vars: 0,
  consts: [["pButton", "", "type", "button", "icon", "pi pi-sort", 1, "p-button-rounded", "p-button-outlined", "p-button-secondary"], ["pButton", "", "type", "button", "icon", "pi pi-sort", 1, "p-button-rounded", "p-button-outlined", "p-button-danger"]],
  template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Welcome to DontCode !");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "What am I seeing ?");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "You have opened the Preview App. The Preview App connects to Online services to receive Application changes from the Application Builder in realtime.");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p")(7, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Check you are connected");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " to the online service by looking at the ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "button", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " icon in the header panel.");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "button", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " means you are ok, ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "button", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " you have connection issue to the online service. Please check the browser log in this case");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "If ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "button", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, ", then ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "go back to the Application Builder");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " and enter some values in the Editor");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
  },
  dependencies: [primeng_button__WEBPACK_IMPORTED_MODULE_1__.ButtonDirective],
  styles: ["button[_ngcontent-%COMP%]{vertical-align:middle}"]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomeComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'dontcode-sandbox-home',
      template: "<h1>Welcome to DontCode !</h1>\n<h2>What am I seeing ?</h2>\n<p>You have opened the Preview App. The Preview App connects to Online services to receive Application changes from the Application Builder in realtime.</p>\n<p><b>Check you are connected</b> to the online service by looking at the <button pButton type=\"button\" class=\"p-button-rounded p-button-outlined p-button-secondary\" icon=\"pi pi-sort\"></button> icon in the header panel.</p>\n<p><button pButton type=\"button\" class=\"p-button-rounded p-button-outlined p-button-secondary\" icon=\"pi pi-sort\"></button> means you are ok, <button pButton type=\"button\" class=\"p-button-rounded p-button-outlined p-button-danger\" icon=\"pi pi-sort\"></button> you have connection issue to the online service. Please check the browser log in this case</p>\n<p>If <button pButton type=\"button\" class=\"p-button-rounded p-button-outlined p-button-secondary\" icon=\"pi pi-sort\"></button>, then <b>go back to the Application Builder</b> and enter some values in the Editor</p>\n",
      styles: ["button{vertical-align:middle}\n"]
    }]
  }], null, null);
})();

/***/ }),

/***/ 7082:
/*!************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/routes/routes.module.mjs ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RoutesModule": () => (/* binding */ RoutesModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 1395);
/* harmony import */ var _debug_list_commands_list_commands_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./debug/list-commands/list-commands.component */ 7936);
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./home/home.component */ 1339);
/* harmony import */ var _debug_insert_command_insert_command_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./debug/insert-command/insert-command.component */ 2814);
/* harmony import */ var _debug_debug_page_debug_page_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./debug/debug-page/debug-page.component */ 5156);
/* harmony import */ var _screens_screen_screen_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./screens/screen/screen.component */ 413);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../shared/shared.module */ 3713);
/* harmony import */ var primeng_accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primeng/accordion */ 6941);
/* harmony import */ var primeng_autocomplete__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/autocomplete */ 9841);
/* harmony import */ var primeng_panel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/panel */ 4183);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/inputtext */ 5627);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 7527);
/* harmony import */ var primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/inputtextarea */ 1580);
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/button */ 2715);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/dropdown */ 8905);
/* harmony import */ var _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @dontcode/plugin-common */ 3955);


















class RoutesModule {}
RoutesModule.ɵfac = function RoutesModule_Factory(t) {
  return new (t || RoutesModule)();
};
RoutesModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: RoutesModule
});
RoutesModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_11__.SharedModule, primeng_accordion__WEBPACK_IMPORTED_MODULE_2__.AccordionModule, primeng_autocomplete__WEBPACK_IMPORTED_MODULE_3__.AutoCompleteModule, primeng_panel__WEBPACK_IMPORTED_MODULE_4__.PanelModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_5__.InputTextModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_7__.InputTextareaModule, primeng_button__WEBPACK_IMPORTED_MODULE_8__.ButtonModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_9__.DropdownModule, _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_10__.PluginCommonModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RoutesModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      declarations: [_debug_list_commands_list_commands_component__WEBPACK_IMPORTED_MODULE_12__.ListCommandsComponent, _home_home_component__WEBPACK_IMPORTED_MODULE_13__.HomeComponent, _debug_insert_command_insert_command_component__WEBPACK_IMPORTED_MODULE_14__.InsertCommandComponent, _debug_debug_page_debug_page_component__WEBPACK_IMPORTED_MODULE_15__.DebugPageComponent, _screens_screen_screen_component__WEBPACK_IMPORTED_MODULE_16__.ScreenComponent],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_11__.SharedModule, primeng_accordion__WEBPACK_IMPORTED_MODULE_2__.AccordionModule, primeng_autocomplete__WEBPACK_IMPORTED_MODULE_3__.AutoCompleteModule, primeng_panel__WEBPACK_IMPORTED_MODULE_4__.PanelModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_5__.InputTextModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_7__.InputTextareaModule, primeng_button__WEBPACK_IMPORTED_MODULE_8__.ButtonModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_9__.DropdownModule, _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_10__.PluginCommonModule],
      schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.CUSTOM_ELEMENTS_SCHEMA]
    }]
  }], null, null);
})();

/***/ }),

/***/ 413:
/*!******************************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/routes/screens/screen/screen.component.mjs ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScreenComponent": () => (/* binding */ ScreenComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 224);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 5339);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 4337);
/* harmony import */ var _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dontcode/plugin-common */ 3955);
/* harmony import */ var _shared_dynamic_components_default_viewer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/dynamic/components/default-viewer.component */ 5473);
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dontcode/core */ 9130);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 6968);
/* harmony import */ var _shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../shared/command/services/change-provider.service */ 7173);










class ScreenComponent {
  constructor(route, provider, loader, injector) {
    this.route = route;
    this.provider = provider;
    this.loader = loader;
    this.injector = injector;
    this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subscription();
    this.screenName$ = rxjs__WEBPACK_IMPORTED_MODULE_5__.EMPTY;
  }
  ngOnInit() {
    //super.ngOnInit();
    this.screenName$ = this.route.params;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  ngAfterViewInit() {
    this.subscriptions.add(this.route.url.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(segments => {
      let position = null;
      segments.forEach(value => {
        if (position === null) position = value.path;else position = position + '/' + value.path;
      });
      //console.log("Searching for component handling route", position);
      if (position == null) throw new Error("No position in route to screen");
      if (this.provider == null) {
        throw new Error("No provider");
      }
      try {
        const pointer = this.provider.calculatePointerFor(position);
        this.dynamicInsertPoint.clear();
        this.loader.insertComponent(pointer, this.dynamicInsertPoint, this.provider.getJsonAt(position)).then(component => {
          if (component == null) {
            // Display the default viewer component if no factory are found...
            this.loader.createComponent(_shared_dynamic_components_default_viewer_component__WEBPACK_IMPORTED_MODULE_7__.DefaultViewerComponent, this.dynamicInsertPoint, undefined, pointer);
          }
        });
      } catch (error) {
        console.warn('Error creating component for ' + position + ':', error);
        this.loader.createComponent(_shared_dynamic_components_default_viewer_component__WEBPACK_IMPORTED_MODULE_7__.DefaultViewerComponent, this.dynamicInsertPoint, undefined, new _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.DontCodeModelPointer(position, position));
      }
    })).subscribe());
  }
  providesTemplates(key) {
    throw new Error("Method not implemented.");
  }
  canProvide(key) {
    throw new Error("Method not implemented.");
  }
}
ScreenComponent.ɵfac = function ScreenComponent_Factory(t) {
  return new (t || ScreenComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_8__.ChangeProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__.ComponentLoaderService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector));
};
ScreenComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ScreenComponent,
  selectors: [["dontcode-sandbox-screen"]],
  viewQuery: function ScreenComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__.DynamicInsertPoint, 5, _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.dynamicInsertPoint = _t.first);
    }
  },
  decls: 1,
  vars: 0,
  template: function ScreenComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "dtcde-dynamic");
    }
  },
  dependencies: [_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__.DynamicInsertPoint]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ScreenComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'dontcode-sandbox-screen',
      template: "<dtcde-dynamic></dtcde-dynamic>\n"
    }]
  }], function () {
    return [{
      type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute
    }, {
      type: _shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_8__.ChangeProviderService
    }, {
      type: _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__.ComponentLoaderService
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector
    }];
  }, {
    dynamicInsertPoint: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: [_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__.DynamicInsertPoint, {
        read: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef,
        static: false
      }]
    }]
  });
})();

/***/ }),

/***/ 2763:
/*!******************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/sandbox.module.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseAppComponent": () => (/* reexport safe */ _layout_layout_module__WEBPACK_IMPORTED_MODULE_8__.BaseAppComponent),
/* harmony export */   "ChangeListenerService": () => (/* reexport safe */ _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__.ChangeListenerService),
/* harmony export */   "ChangeModule": () => (/* reexport safe */ _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__.ChangeModule),
/* harmony export */   "ChangeProviderService": () => (/* reexport safe */ _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__.ChangeProviderService),
/* harmony export */   "CommandModule": () => (/* reexport safe */ _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__.CommandModule),
/* harmony export */   "DefaultViewerComponent": () => (/* reexport safe */ _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__.DefaultViewerComponent),
/* harmony export */   "DontCodeRuntimeConfig": () => (/* reexport safe */ _layout_layout_module__WEBPACK_IMPORTED_MODULE_8__.DontCodeRuntimeConfig),
/* harmony export */   "GlobalPluginLoader": () => (/* reexport safe */ _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__.GlobalPluginLoader),
/* harmony export */   "IdeProject": () => (/* reexport safe */ _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__.IdeProject),
/* harmony export */   "IndexedDbStorageService": () => (/* reexport safe */ _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__.IndexedDbStorageService),
/* harmony export */   "LayoutModule": () => (/* reexport safe */ _layout_layout_module__WEBPACK_IMPORTED_MODULE_8__.LayoutModule),
/* harmony export */   "LightAppComponent": () => (/* reexport safe */ _layout_layout_module__WEBPACK_IMPORTED_MODULE_8__.LightAppComponent),
/* harmony export */   "MainComponent": () => (/* reexport safe */ _layout_layout_module__WEBPACK_IMPORTED_MODULE_8__.MainComponent),
/* harmony export */   "RemotePluginLoaderService": () => (/* reexport safe */ _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__.RemotePluginLoaderService),
/* harmony export */   "SandboxModule": () => (/* binding */ SandboxModule),
/* harmony export */   "SharedModule": () => (/* reexport safe */ _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__.SharedModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared/shared.module */ 3713);
/* harmony import */ var _layout_layout_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./layout/layout.module */ 9922);
/* harmony import */ var _routes_routes_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./routes/routes.module */ 7082);
/* harmony import */ var _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dontcode/plugin-common */ 3955);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 6968);
/* harmony import */ var _routes_home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/home/home.component */ 1339);
/* harmony import */ var _routes_debug_debug_page_debug_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/debug/debug-page/debug-page.component */ 5156);
/* harmony import */ var _routes_screens_screen_screen_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/screens/screen/screen.component */ 413);
/* harmony import */ var _shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/command/services/change-provider.service */ 7173);













const sandboxRoutes = [{
  path: '',
  component: _routes_home_home_component__WEBPACK_IMPORTED_MODULE_3__.HomeComponent
}, {
  path: 'dev',
  component: _routes_debug_debug_page_debug_page_component__WEBPACK_IMPORTED_MODULE_4__.DebugPageComponent
}, {
  path: 'newTabDev',
  component: _routes_debug_debug_page_debug_page_component__WEBPACK_IMPORTED_MODULE_4__.DebugPageComponent
}, {
  path: 'creation/:type/:id',
  component: _routes_screens_screen_screen_component__WEBPACK_IMPORTED_MODULE_5__.ScreenComponent
}];
class SandboxModule {
  static forRoot(config) {
    return {
      ngModule: SandboxModule,
      providers: [{
        provide: _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__.DONT_CODE_COMMON_CONFIG,
        useValue: config
      }]
    };
  }
}
SandboxModule.ɵfac = function SandboxModule_Factory(t) {
  return new (t || SandboxModule)();
};
SandboxModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: SandboxModule
});
SandboxModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  providers: [{
    provide: _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__.COMMAND_PROVIDER,
    useExisting: _shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_6__.ChangeProviderService
  }],
  imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_7__.SharedModule, _layout_layout_module__WEBPACK_IMPORTED_MODULE_8__.LayoutModule, _routes_routes_module__WEBPACK_IMPORTED_MODULE_9__.RoutesModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(sandboxRoutes), _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__.SharedModule, _layout_layout_module__WEBPACK_IMPORTED_MODULE_8__.LayoutModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SandboxModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_7__.SharedModule, _layout_layout_module__WEBPACK_IMPORTED_MODULE_8__.LayoutModule, _routes_routes_module__WEBPACK_IMPORTED_MODULE_9__.RoutesModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(sandboxRoutes)],
      exports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_7__.SharedModule, _layout_layout_module__WEBPACK_IMPORTED_MODULE_8__.LayoutModule],
      providers: [{
        provide: _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__.COMMAND_PROVIDER,
        useExisting: _shared_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_6__.ChangeProviderService
      }]
    }]
  }], null, null);
})();



/***/ }),

/***/ 215:
/*!*******************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/shared/change/change.module.mjs ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChangeListenerService": () => (/* reexport safe */ _services_change_listener_service__WEBPACK_IMPORTED_MODULE_3__.ChangeListenerService),
/* harmony export */   "ChangeModule": () => (/* binding */ ChangeModule),
/* harmony export */   "IdeProject": () => (/* reexport safe */ _services_IdeProject__WEBPACK_IMPORTED_MODULE_2__.IdeProject)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 1395);
/* harmony import */ var _services_IdeProject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/IdeProject */ 6250);
/* harmony import */ var _services_change_listener_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/change-listener.service */ 3028);



class ChangeModule {}
ChangeModule.ɵfac = function ChangeModule_Factory(t) {
  return new (t || ChangeModule)();
};
ChangeModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: ChangeModule
});
ChangeModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ChangeModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      declarations: [],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule]
    }]
  }], null, null);
})();



/***/ }),

/***/ 6250:
/*!*************************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/shared/change/services/IdeProject.mjs ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IdeProject": () => (/* binding */ IdeProject)
/* harmony export */ });
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dontcode/core */ 9130);

class IdeProject extends _dontcode_core__WEBPACK_IMPORTED_MODULE_0__.DontCodeProject {}

/***/ }),

/***/ 3028:
/*!**************************************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/shared/change/services/change-listener.service.mjs ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChangeListenerService": () => (/* binding */ ChangeListenerService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dontcode/core */ 9130);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 8837);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 5527);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 1211);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 224);
/* harmony import */ var rxjs_webSocket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/webSocket */ 5482);
/* harmony import */ var broadcast_channel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! broadcast-channel */ 8406);
/* harmony import */ var _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @dontcode/plugin-common */ 3955);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 2123);









class ChangeListenerService {
  constructor(http, configService) {
    this.http = http;
    this.configService = configService;
    this.listOfChanges = [];
    //  protected listOfEntities: Map<string, string> = new Map();
    this.previewServiceWebSocket = null;
    this.socketSubscription = null;
    this.changeEmitter = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
    this.connectionStatus = new rxjs__WEBPACK_IMPORTED_MODULE_6__.ReplaySubject(1);
    this.config = null;
    this.sessionId = null;
    this.sessionIdSubject = new rxjs__WEBPACK_IMPORTED_MODULE_6__.ReplaySubject(1);
    try {
      this.configService.getUpdates().subscribe(newConfig => {
        const socketChanged = newConfig.webSocketUrl != this.config?.webSocketUrl;
        this.config = newConfig;
        if (newConfig.projectApiUrl != null && newConfig.projectApiUrl.length > 0) this.projectUrl = newConfig.projectApiUrl;
        if (socketChanged) this.initializeSocket(newConfig.webSocketUrl);
      });
      // Listens as well to broadcasted events
      // console.log("Listening to debug broadcasts")
      this.channel = new broadcast_channel__WEBPACK_IMPORTED_MODULE_2__.BroadcastChannel(_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_3__.CHANNEL_CHANGE_NAME, {});
      this.channel.onmessage = msg => {
        // eslint-disable-next-line no-restricted-syntax
        // console.debug("Received broadcasted change at "+msg.position);
        this.listOfChanges.push(msg);
        this.changeEmitter.next(msg);
      };
    } catch (err) {
      console.error("Error initializing ChangeListnerService", err);
    }
  }
  initializeSocket(webSocketUrl) {
    if (this.previewServiceWebSocket != null && this.socketSubscription != null) {
      this.socketSubscription.unsubscribe();
      this.socketSubscription = null;
      this.previewServiceWebSocket.complete(); // Close subscription
      this.previewServiceWebSocket = null;
      this.connectionStatus.next('closed');
    }
    if (webSocketUrl != null && webSocketUrl.length > 0) {
      this.previewServiceWebSocket = (0,rxjs_webSocket__WEBPACK_IMPORTED_MODULE_7__.webSocket)(webSocketUrl);
      this.connectionStatus.next('connected');
      this.socketSubscription = this.previewServiceWebSocket?.subscribe({
        next: msg => {
          //console.log('message received: ' + msg);
          if (msg.type === _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.MessageType.CHANGE) {
            if (msg.change) {
              this.listOfChanges.push(msg.change);
              this.changeEmitter.next(msg.change);
            } else {
              console.error('Received change message without a change...');
            }
          }
        },
        // Called whenever there is a message from the server
        error: err => {
          //console.log(err);
          this.connectionStatus.next('ERROR:' + err);
          this.sessionIdSubject.next(undefined);
        },
        // Called if WebSocket API signals some kind of error
        complete: () => {
          //console.log('complete');
          this.connectionStatus.next('closed');
          this.sessionIdSubject.next(undefined);
        }
      }
      // Called when connection is closed (for whatever reason)
      );
    } else {
      console.warn('No SANDBOX_CONFIG WebSocketUrl injected => Not listening to changes from servers');
      this.connectionStatus.next('undefined');
      this.sessionIdSubject.next(undefined);
    }
  }
  getListOfChanges() {
    return this.listOfChanges;
  }
  getChangeEvents() {
    return this.changeEmitter;
  }
  getConnectionStatus() {
    return this.connectionStatus;
  }
  setSessionId(newId) {
    this.sessionId = newId;
    this.sessionIdSubject.next(newId ? newId : undefined);
    if (this.previewServiceWebSocket) {
      this.previewServiceWebSocket.next(new _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.Message(_dontcode_core__WEBPACK_IMPORTED_MODULE_1__.MessageType.INIT, newId ? newId : undefined));
    }
  }
  loadProject(projectId) {
    if (this.sessionId) {
      throw new Error('Cannot load a project while in a session with Builder. Please load the project ');
    }
    if (this.projectUrl) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.firstValueFrom)(this.http.get(this.projectUrl + '/' + encodeURIComponent(projectId), {
        responseType: 'json'
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.map)(project => {
        // Create a new Reset change
        const resetChange = new _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.Change(_dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.RESET, '', project.content);
        this.listOfChanges.push(resetChange);
        this.changeEmitter.next(resetChange);
        return project;
      })));
    } else {
      return Promise.reject(new Error('Cannot call project api as No projectUrl provided in SANDBOX_CONFIG'));
    }
  }
  getSessionId() {
    return this.sessionId;
  }
  getSessionIdSubject() {
    return this.sessionIdSubject;
  }
  internalPushChange(toPush) {
    this.listOfChanges.push(toPush);
    this.changeEmitter.next(toPush);
    return Promise.resolve();
  }
}
ChangeListenerService.ɵfac = function ChangeListenerService_Factory(t) {
  return new (t || ChangeListenerService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_3__.CommonConfigService));
};
ChangeListenerService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: ChangeListenerService,
  factory: ChangeListenerService.ɵfac,
  providedIn: 'root'
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ChangeListenerService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [{
      type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient
    }, {
      type: _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_3__.CommonConfigService
    }];
  }, null);
})();

/***/ }),

/***/ 165:
/*!*********************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/shared/command/command.module.mjs ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChangeProviderService": () => (/* reexport safe */ _services_change_provider_service__WEBPACK_IMPORTED_MODULE_2__.ChangeProviderService),
/* harmony export */   "CommandModule": () => (/* binding */ CommandModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 1395);
/* harmony import */ var _services_change_provider_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/change-provider.service */ 7173);



class CommandModule {}
CommandModule.ɵfac = function CommandModule_Factory(t) {
  return new (t || CommandModule)();
};
CommandModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: CommandModule
});
CommandModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CommandModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      declarations: [],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule]
    }]
  }], null, null);
})();


/***/ }),

/***/ 7173:
/*!***************************************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/shared/command/services/change-provider.service.mjs ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChangeProviderService": () => (/* binding */ ChangeProviderService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 5339);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 5527);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 9048);
/* harmony import */ var _change_services_change_listener_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../change/services/change-listener.service */ 3028);
/* harmony import */ var _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dontcode/plugin-common */ 3955);
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dontcode/core */ 9130);






class ChangeProviderService {
  constructor(changeListener, valueService, schemaManager, changeManager) {
    this.changeListener = changeListener;
    this.valueService = valueService;
    this.schemaManager = schemaManager;
    this.changeManager = changeManager;
    this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscription();
    this.changesHistory = new rxjs__WEBPACK_IMPORTED_MODULE_4__.ReplaySubject();
    this.subscriptions.add(changeListener.getChangeEvents().subscribe(change => {
      // console.log ('Received Change ', change);
      this.pushChange(change);
    }));
  }
  getJsonAt(position) {
    return this.changeManager.getJsonAt(position);
  }
  pushChange(change) {
    this.changeManager.pushChange(change);
    this.changesHistory.next(change);
  }
  /**
   * Finds a listener that is interested in this change and notifies it.
   * @param change
   * @param alreadyCalled
   */
  findAndNotify(change, alreadyCalled) {
    this.changeManager.findAndNotify(change, alreadyCalled);
  }
  getChangesHistory() {
    return this.changesHistory;
  }
  /**
   * Be notified when something changes in the model at the following position
   * for example:
   * position: /creation/screens, property: name will be notified of all name changes for all screens
   * position: /creation/screens, property: null will be notified of any change in any screen and subscreens
   * position: /creation/screens/a, property: null will be notified on changes in screen a and below
   * position: /creation/screens/?, property: null will be notified on changes in screen items (move, delete), and not below
   * position: null, property: null will be notified on all changes
   * @param position
   * @param property
   */
  receiveCommands(position, property) {
    return this.changeManager.receiveCommands(position, property);
  }
  getSchemaManager() {
    return this.schemaManager;
  }
  calculatePointerFor(position) {
    const ret = this.schemaManager.generateSchemaPointer(position);
    return ret;
  }
  close() {
    //    this.changeManager.close();
    this.subscriptions.unsubscribe();
  }
  /**
   * Send a command to whatever component listens to, and return a Promise when ALL components have made the action
   * @param action
   */
  sendCommand(action) {
    let subscription = null;
    return new Promise((resolve, reject) => {
      if (action.running != null) {
        subscription = action.running.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.mergeAll)(1)).subscribe({
          complete: () => resolve(),
          error: reason => reject(reason)
        });
        // Normally we are unsubscribing after the promise is done, but let's make sure we unsubscribe
        this.subscriptions.add(subscription);
        this.pushChange(action);
        // Complete the action right after all other changes have passed through
        action.running.next(new Promise(resolve => {
          action.running?.complete();
          resolve();
        }));
      } else reject("No running observer in action");
    }).then(() => {
      subscription?.unsubscribe();
    }).catch(() => {
      subscription?.unsubscribe();
    });
  }
}
ChangeProviderService.ɵfac = function ChangeProviderService_Factory(t) {
  return new (t || ChangeProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_change_services_change_listener_service__WEBPACK_IMPORTED_MODULE_6__.ChangeListenerService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__.ValueService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_dontcode_core__WEBPACK_IMPORTED_MODULE_2__.DontCodeSchemaManager), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_dontcode_core__WEBPACK_IMPORTED_MODULE_2__.DontCodeChangeManager));
};
ChangeProviderService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: ChangeProviderService,
  factory: ChangeProviderService.ɵfac,
  providedIn: 'root'
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ChangeProviderService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [{
      type: _change_services_change_listener_service__WEBPACK_IMPORTED_MODULE_6__.ChangeListenerService
    }, {
      type: _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__.ValueService
    }, {
      type: _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.DontCodeSchemaManager
    }, {
      type: _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.DontCodeChangeManager
    }];
  }, null);
})();

/***/ }),

/***/ 4388:
/*!***********************************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/shared/dev/services/dev-change-push.service.mjs ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DevChangePushService": () => (/* binding */ DevChangePushService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var broadcast_channel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! broadcast-channel */ 8406);
/* harmony import */ var _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dontcode/plugin-common */ 3955);
/* harmony import */ var _change_services_change_listener_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../change/services/change-listener.service */ 3028);





class DevChangePushService {
  constructor(listener) {
    this.listener = listener;
    // console.log('Creating debug broadcast');
    this.channel = new broadcast_channel__WEBPACK_IMPORTED_MODULE_1__.BroadcastChannel(_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.CHANNEL_CHANGE_NAME);
  }
  pushChange(toPush) {
    // eslint-disable-next-line no-restricted-syntax
    // console.debug('Dev pushing change for ', toPush.position);
    return this.listener.internalPushChange(toPush);
  }
}
DevChangePushService.ɵfac = function DevChangePushService_Factory(t) {
  return new (t || DevChangePushService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_change_services_change_listener_service__WEBPACK_IMPORTED_MODULE_3__.ChangeListenerService));
};
DevChangePushService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: DevChangePushService,
  factory: DevChangePushService.ɵfac,
  providedIn: 'root'
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DevChangePushService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [{
      type: _change_services_change_listener_service__WEBPACK_IMPORTED_MODULE_3__.ChangeListenerService
    }];
  }, null);
})();

/***/ }),

/***/ 7986:
/*!****************************************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/shared/dev/services/dev-template-manager.service.mjs ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DevStep": () => (/* binding */ DevStep),
/* harmony export */   "DevTemplate": () => (/* binding */ DevTemplate),
/* harmony export */   "DevTemplateManagerService": () => (/* binding */ DevTemplateManagerService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 224);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 1787);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 6071);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 2123);
/* harmony import */ var _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dontcode/plugin-common */ 3955);






class DevTemplateManagerService {
  constructor(http, configService) {
    this.http = http;
    this.configService = configService;
    this.templates = [];
  }
  getTemplates() {
    if (this.templates.length > 0) return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(this.templates);else {
      let templateUrl = this.configService.getConfig()?.templateFileUrl;
      if (!templateUrl) templateUrl = 'assets/dev/default-templates.json';
      return this.http.get(templateUrl, {
        responseType: "json"
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(value => {
        this.templates = new Array();
        const src = value;
        for (const tmpl of src) {
          this.templates.push(new DevTemplate(tmpl));
        }
        ;
        return this.templates;
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(err => {
        console.log("Error reading Dev templates file", err);
        throw err;
      }));
    }
  }
  filterTemplates(templateName) {
    //console.log ("filter templates called", templateName);
    templateName = templateName.toLowerCase();
    return this.getTemplates().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(value => {
      const ret = value.filter(tmpl => {
        if (tmpl.name.toLowerCase().startsWith(templateName)) {
          return true;
        } else return false;
      });
      // console.log("filter templates returning",ret);
      return ret;
    }));
  }
}
DevTemplateManagerService.ɵfac = function DevTemplateManagerService_Factory(t) {
  return new (t || DevTemplateManagerService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.CommonConfigService));
};
DevTemplateManagerService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: DevTemplateManagerService,
  factory: DevTemplateManagerService.ɵfac,
  providedIn: 'root'
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DevTemplateManagerService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [{
      type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient
    }, {
      type: _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.CommonConfigService
    }];
  }, null);
})();
class DevTemplate {
  constructor(tmpl) {
    this.name = tmpl.name;
    this.sequence = [];
    // Support loading simple templates
    if (tmpl.position !== undefined) {
      this.sequence.push(new DevStep(tmpl.position, tmpl.type, tmpl.value));
    } else {
      for (const seq of tmpl.sequence) {
        this.sequence.push(new DevStep(seq.position, seq.type, seq.value));
      }
    }
  }
  isSequence() {
    if (this.sequence) return this.sequence.length > 1;else return false;
  }
}
class DevStep {
  /**
   * Value can be a string or a json value
   */
  constructor(position, type, value) {
    this.position = position;
    this.type = type;
    this.value = value;
  }
  isValid() {
    return this.position != null && this.type != null;
  }
}

/***/ }),

/***/ 5473:
/*!******************************************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/shared/dynamic/components/default-viewer.component.mjs ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultViewerComponent": () => (/* binding */ DefaultViewerComponent)
/* harmony export */ });
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dontcode/core */ 9130);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dontcode/plugin-common */ 3955);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 7527);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 1395);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/inputtext */ 5627);









function DefaultViewerComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" No handler found for position ", ctx_r0.entityPointer == null ? null : ctx_r0.entityPointer.position, " and schemaPosition ", ctx_r0.entityPointer == null ? null : ctx_r0.entityPointer.positionInSchema, " ");
  }
}
function DefaultViewerComponent_ng_container_2_div_5_ng_container_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainer"](0);
  }
}
function DefaultViewerComponent_ng_container_2_div_5_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, DefaultViewerComponent_ng_container_2_div_5_ng_container_4_ng_container_1_Template, 1, 0, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const field_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", ctx_r5.subFieldFullEditTemplate(field_r4));
  }
}
function DefaultViewerComponent_ng_container_2_div_5_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "input", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const field_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("name", field_r4.name)("formControlName", field_r4.name);
  }
}
function DefaultViewerComponent_ng_container_2_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 5)(1, "label", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, DefaultViewerComponent_ng_container_2_div_5_ng_container_4_Template, 2, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, DefaultViewerComponent_ng_container_2_div_5_ng_container_5_Template, 2, 2, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const field_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("for", field_r4.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](field_r4.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", field_r4.component);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !field_r4.component);
  }
}
function DefaultViewerComponent_ng_container_2_div_8_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainer"](0);
  }
}
function DefaultViewerComponent_ng_container_2_div_8_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, DefaultViewerComponent_ng_container_2_div_8_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const field_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", ctx_r11.subFieldInlineViewTemplate(field_r10));
  }
}
function DefaultViewerComponent_ng_container_2_div_8_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const field_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r12.getData(field_r10.name));
  }
}
function DefaultViewerComponent_ng_container_2_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, DefaultViewerComponent_ng_container_2_div_8_ng_container_2_Template, 2, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, DefaultViewerComponent_ng_container_2_div_8_ng_container_3_Template, 2, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const field_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Value of ", field_r10.name, ": ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", field_r10.component);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !field_r10.component);
  }
}
function DefaultViewerComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "form", 1)(4, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, DefaultViewerComponent_ng_container_2_div_5_Template, 6, 4, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, DefaultViewerComponent_ng_container_2_div_8_Template, 4, 3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("You can edit the ", ctx_r1.entityName, " entity:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r1.form);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.getSubFields());
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("The values of the ", ctx_r1.entityName, " entity are:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.getSubFields());
  }
}
class DefaultViewerComponent extends _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.PluginBaseComponent {
  constructor(loader, injector, ref, fb, storeMgr) {
    super(loader, injector, ref);
    this.fb = fb;
    this.storeMgr = storeMgr;
    this.entityName = 'Unknown';
    // Hack for when DI doesn't find the storemanager due to mfe stuff
    if (this.storeMgr == null) {
      this.storeMgr = _dontcode_core__WEBPACK_IMPORTED_MODULE_0__.dtcde.getStoreManager();
      console.warn("DontCodeStoreManager not found by Angular's Injector");
    }
    this.form = this.fb.group({}, {
      updateOn: 'blur'
    });
  }
  ngOnInit() {
    if (this.value == null) this.value = {};
    this.updateValueOnFormChanges();
  }
  initCommandFlow(provider, pointer) {
    super.initCommandFlow(provider, pointer);
    if (this.isEntity()) {
      this.decomposeJsonToMultipleChanges(pointer, provider.getJsonAt(pointer.position));
      this.store = this.storeMgr.getProvider(pointer.position);
      if (this.store != null) {
        this.store.loadEntity(pointer.position, null).then(val => {
          this.setValue(val);
          this.rebuildForm();
          this.ref.detectChanges();
        }, error => {
          console.error("Cannot load element with DefaultViewer because of error ", error);
        });
      }
      this.initChangeListening();
      this.rebuildForm();
    }
    this.ref.detectChanges();
  }
  handleChange(change) {
    if (this.entityPointer) {
      if (change?.pointer?.positionInSchema === _dontcode_core__WEBPACK_IMPORTED_MODULE_0__.DontCodeModel.APP_FIELDS) {
        this.updateSubFieldsWithChange(change, 'fields').then(updatedColumns => {
          if (updatedColumns != null) {
            //  this.reloadData ();
            this.ref.markForCheck();
            this.ref.detectChanges();
          }
        });
      } else if (change?.pointer?.isSubItemOf(this.entityPointer) === 'name') {
        // The name of the entity is being changed, let's update it
        this.entityName = change.value;
        this.ref.markForCheck();
        this.ref.detectChanges();
      }
    }
  }
  canProvide(key) {
    throw new Error('Unsupported');
  }
  providesTemplates(key) {
    throw new Error('Unsupported');
  }
  isEntity() {
    if (_dontcode_core__WEBPACK_IMPORTED_MODULE_0__.DontCodeModel.APP_ENTITIES === this.entityPointer?.positionInSchema) return true;
    return false;
  }
  getData(fieldName) {
    if (this.form.controls[fieldName]) return this.form.controls[fieldName].value;else return undefined;
  }
}
DefaultViewerComponent.ɵfac = function DefaultViewerComponent_Factory(t) {
  return new (t || DefaultViewerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.ComponentLoaderService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_dontcode_core__WEBPACK_IMPORTED_MODULE_0__.DontCodeStoreManager));
};
DefaultViewerComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: DefaultViewerComponent,
  selectors: [["dontcode-sandbox-default-viewer"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
  decls: 3,
  vars: 2,
  consts: [[4, "ngIf"], [3, "formGroup"], [1, "p-fluid"], ["class", "p-field p-grid", 4, "ngFor", "ngForOf"], [4, "ngFor", "ngForOf"], [1, "p-field", "p-grid"], [1, "p-col-12", "p-mb-2", "p-md-2", "p-mb-md-0", 3, "for"], [1, "p-col-12", "p-md-10"], [4, "ngTemplateOutlet"], ["pInputText", "", 3, "name", "formControlName"]],
  template: function DefaultViewerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "dtcde-dynamic");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, DefaultViewerComponent_ng_container_1_Template, 3, 2, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, DefaultViewerComponent_ng_container_2_Template, 9, 5, "ng-container", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.isEntity());
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isEntity());
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgTemplateOutlet, _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.DynamicInsertPoint, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, primeng_inputtext__WEBPACK_IMPORTED_MODULE_5__.InputText],
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](DefaultViewerComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
    args: [{
      selector: 'dontcode-sandbox-default-viewer',
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectionStrategy.OnPush,
      template: "<dtcde-dynamic></dtcde-dynamic>\n<ng-container *ngIf=\"!isEntity()\">\n  <p>\n    No handler found for position {{ entityPointer?.position }} and\n    schemaPosition {{ entityPointer?.positionInSchema }}\n  </p>\n</ng-container>\n<ng-container *ngIf=\"isEntity()\">\n  <p>You can edit the {{ entityName }} entity:</p>\n\n  <form [formGroup]=\"form\">\n    <div class=\"p-fluid\">\n      <div class=\"p-field p-grid\" *ngFor=\"let field of getSubFields()\">\n        <label [for]=\"field.name\" class=\"p-col-12 p-mb-2 p-md-2 p-mb-md-0\">{{\n          field.name\n        }}</label>\n        <div class=\"p-col-12 p-md-10\">\n          <ng-container *ngIf=\"field.component\">\n            <ng-container\n              *ngTemplateOutlet=\"subFieldFullEditTemplate(field)\"\n            ></ng-container>\n          </ng-container>\n          <ng-container *ngIf=\"!field.component\">\n            <input\n              [name]=\"field.name\"\n              [formControlName]=\"field.name\"\n              pInputText\n            />\n          </ng-container>\n        </div>\n      </div>\n    </div>\n  </form>\n\n  <p>The values of the {{ entityName }} entity are:</p>\n  <div *ngFor=\"let field of getSubFields()\">\n    Value of {{ field.name }}:\n    <ng-container *ngIf=\"field.component\">\n      <ng-container\n        *ngTemplateOutlet=\"subFieldInlineViewTemplate(field)\"\n      ></ng-container>\n    </ng-container>\n    <ng-container *ngIf=\"!field.component\">{{\n      getData(field.name)\n    }}</ng-container>\n  </div>\n</ng-container>\n"
    }]
  }], function () {
    return [{
      type: _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.ComponentLoaderService
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef
    }, {
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder
    }, {
      type: _dontcode_core__WEBPACK_IMPORTED_MODULE_0__.DontCodeStoreManager
    }];
  }, null);
})();

/***/ }),

/***/ 5613:
/*!***************************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/shared/plugins/global-plugin-loader.mjs ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalPluginLoader": () => (/* binding */ GlobalPluginLoader)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 1346);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 3499);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 224);
/* harmony import */ var _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dontcode/plugin-common */ 3955);
/* harmony import */ var _command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../command/services/change-provider.service */ 7173);
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dontcode/core */ 9130);







/**
 * Loads all plugins that are declared globally
 */
class GlobalPluginLoader {
  constructor(loader, changeService, previewManager) {
    this.loader = loader;
    this.changeService = changeService;
    this.previewManager = previewManager;
    this.subscribers = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscriber();
    //  protected handlersPerPosition = new Map<string, PreviewHandler> ();  // Keep instances created late
    this.cachedHandlers = new Map();
  }
  /**
   * Register each global handler to the changeService: It will create and call them when necessary
   * @param previewManager
   */
  initLoading() {
    this.subscribers.add(this.previewManager.receiveGlobalHandlers().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.mergeMap)(config => {
      return this.loader.loadPluginModule(config).then(moduleRef => {
        return {
          config,
          moduleRef
        };
      });
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.mergeMap)(result => {
      const clazz = result.moduleRef.instance.exposedPreviewHandlers().get(result.config.class.name);
      //          console.log('ReceiveCommands');
      return this.changeService.receiveCommands(result.config.location.parent, result.config.location.id).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(change => {
        return {
          clazz,
          moduleRef: result.moduleRef,
          change
        };
      }));
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(project => {
      let handler = this.cachedHandlers.get(project.clazz);
      if (!handler) {
        //cache instance per config and use it first to avoid multiple instances creation
        handler = project.moduleRef.injector.get(project.clazz);
        this.cachedHandlers.set(project.clazz, handler);
        handler.initCommandFlow(this.changeService, project.change.pointer ?? this.changeService.calculatePointerFor(project.change.position));
        handler.handleChange(project.change);
      }
      return handler;
    })).subscribe({
      error: error => {
        console.error('Error loading global handler', error);
      }
    }));
  }
  close() {
    this.subscribers.unsubscribe();
  }
}
GlobalPluginLoader.ɵfac = function GlobalPluginLoader_Factory(t) {
  return new (t || GlobalPluginLoader)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__.ComponentLoaderService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_6__.ChangeProviderService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_dontcode_core__WEBPACK_IMPORTED_MODULE_2__.DontCodePreviewManager));
};
GlobalPluginLoader.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: GlobalPluginLoader,
  factory: GlobalPluginLoader.ɵfac,
  providedIn: 'root'
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GlobalPluginLoader, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [{
      type: _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_1__.ComponentLoaderService
    }, {
      type: _command_services_change_provider_service__WEBPACK_IMPORTED_MODULE_6__.ChangeProviderService
    }, {
      type: _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.DontCodePreviewManager
    }];
  }, null);
})();

/***/ }),

/***/ 880:
/*!***********************************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/shared/plugins/remote-plugin-loader.service.mjs ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RemotePluginLoaderService": () => (/* binding */ RemotePluginLoaderService)
/* harmony export */ });
/* harmony import */ var _home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/temp/node_modules/.pnpm/@babel+runtime@7.20.13/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 8706);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _angular_architects_module_federation_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular-architects/module-federation-runtime */ 1833);
/* harmony import */ var _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dontcode/plugin-common */ 3955);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 2123);






/**
 * Loads any plugins remotely as defined per the configuration
 */
class RemotePluginLoaderService {
  constructor(compLoader, injector, httpClient) {
    this.compLoader = compLoader;
    this.injector = injector;
    this.httpClient = httpClient;
    this.repository = null;
  }
  /**
   * Loads the configuration file of the plugin repository, then loads and configure all plugins in it
   * @param repoUrl: the url to load the repository config from. If undefined, nothing gets loaded, if null, the defaultRepoUrl will be used instead
   */
  loadPluginsFromRepository(repository, repoUrl) {
    if (repository === undefined) return Promise.resolve({
      name: "No Repository",
      plugins: []
    });
    // eslint-disable-next-line no-restricted-syntax
    console.debug("Loading plugins");
    return new Promise((resolve, reject) => {
      try {
        this.repository = repository;
        if (this.repository?.plugins != null) {
          const toLoad = new Array();
          for (const value of this.repository.plugins) {
            toLoad.push(this.createRemotePluginConfig(value, repoUrl));
          }
          // eslint-disable-next-line no-restricted-syntax
          console.debug("Loading following plugins", this.repository.plugins);
          this.loadMultipleModules(toLoad).then(() => {
            if (this.repository != null) resolve(this.repository);else {
              reject("No repository loaded");
            }
          }).catch(reason => {
            reject(reason);
          });
        }
      } catch (reason) {
        console.error("Cannot load repository config from " + repoUrl + " due to error ", reason);
        return reject(reason);
      }
    });
  }
  createRemotePluginConfig(value, defaultRepoUrl) {
    let ret;
    const upperId = value.id.substring(0, 1).toUpperCase() + value.id.substring(1);
    if (value.info != null) {
      const exposedModule = value.info["exposed-module"] ?? './' + upperId;
      const remoteEntry = value.info["remote-entry"] ?? defaultRepoUrl + '/remoteEntry.mjs';
      ret = {
        type: 'module',
        moduleId: value.id,
        exposedModule: exposedModule,
        remoteEntry: remoteEntry
      };
    } else {
      ret = {
        type: 'module',
        moduleId: value.id,
        exposedModule: './' + upperId,
        remoteEntry: defaultRepoUrl + '/remoteEntry.mjs'
      };
    }
    return ret;
  }
  /**
   * Returns all the plugin configuration overriden by the repository.
   */
  listAllRepositoryConfigUpdates() {
    const ret = new Array();
    this.repository?.plugins?.forEach(value => {
      if (value.config != null && value.config["definition-updates"] != null) {
        value.config["definition-updates"].forEach(update => {
          ret.push(update);
        });
      }
    });
    return ret;
  }
  /**
   * Loads a module containing plugins from a remote location using Module Federation
   * @param moduleDef
   * @param moduleName
   */
  loadModule(moduleDef) {
    var _this = this;
    return (0,_home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield (0,_angular_architects_module_federation_runtime__WEBPACK_IMPORTED_MODULE_4__.loadRemoteModule)(moduleDef);
      const mainModule = yield _this.compLoader.getOrCreatePluginModuleRef(moduleDef.moduleId.toLowerCase());
      return mainModule.instance;
    })();
  }
  /**
   * Loads a list of modules
   * @param moduleDefs
   */
  loadMultipleModules(moduleDefs) {
    var _this2 = this;
    return (0,_home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const ret = new Array();
      for (const moduleDef of moduleDefs) {
        try {
          const loaded = yield _this2.loadModule(moduleDef);
          ret.push(loaded);
        } catch (error) {
          console.error('Error loading plugin ' + moduleDef.moduleId, error);
        }
      }
      return ret;
    })();
  }
}
RemotePluginLoaderService.ɵfac = function RemotePluginLoaderService_Factory(t) {
  return new (t || RemotePluginLoaderService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.ComponentLoaderService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
};
RemotePluginLoaderService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: RemotePluginLoaderService,
  factory: RemotePluginLoaderService.ɵfac,
  providedIn: 'root'
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](RemotePluginLoaderService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [{
      type: _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.ComponentLoaderService
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector
    }, {
      type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient
    }];
  }, null);
})();

/***/ }),

/***/ 3713:
/*!************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/shared/shared.module.mjs ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChangeListenerService": () => (/* reexport safe */ _change_change_module__WEBPACK_IMPORTED_MODULE_6__.ChangeListenerService),
/* harmony export */   "ChangeModule": () => (/* reexport safe */ _change_change_module__WEBPACK_IMPORTED_MODULE_6__.ChangeModule),
/* harmony export */   "ChangeProviderService": () => (/* reexport safe */ _command_command_module__WEBPACK_IMPORTED_MODULE_5__.ChangeProviderService),
/* harmony export */   "CommandModule": () => (/* reexport safe */ _command_command_module__WEBPACK_IMPORTED_MODULE_5__.CommandModule),
/* harmony export */   "DefaultViewerComponent": () => (/* reexport safe */ _dynamic_components_default_viewer_component__WEBPACK_IMPORTED_MODULE_7__.DefaultViewerComponent),
/* harmony export */   "GlobalPluginLoader": () => (/* reexport safe */ _plugins_global_plugin_loader__WEBPACK_IMPORTED_MODULE_10__.GlobalPluginLoader),
/* harmony export */   "IdeProject": () => (/* reexport safe */ _change_change_module__WEBPACK_IMPORTED_MODULE_6__.IdeProject),
/* harmony export */   "IndexedDbStorageService": () => (/* reexport safe */ _storage_services_indexed_db_storage_service__WEBPACK_IMPORTED_MODULE_8__.IndexedDbStorageService),
/* harmony export */   "RemotePluginLoaderService": () => (/* reexport safe */ _plugins_remote_plugin_loader_service__WEBPACK_IMPORTED_MODULE_9__.RemotePluginLoaderService),
/* harmony export */   "SharedModule": () => (/* binding */ SharedModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 1395);
/* harmony import */ var _command_command_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./command/command.module */ 165);
/* harmony import */ var _change_change_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./change/change.module */ 215);
/* harmony import */ var _dynamic_components_default_viewer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dynamic/components/default-viewer.component */ 5473);
/* harmony import */ var _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dontcode/plugin-common */ 3955);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 7527);
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/inputtext */ 5627);
/* harmony import */ var _storage_services_indexed_db_storage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./storage/services/indexed-db-storage.service */ 9253);
/* harmony import */ var _plugins_remote_plugin_loader_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./plugins/remote-plugin-loader.service */ 880);
/* harmony import */ var _plugins_global_plugin_loader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./plugins/global-plugin-loader */ 5613);









class SharedModule {}
SharedModule.ɵfac = function SharedModule_Factory(t) {
  return new (t || SharedModule)();
};
SharedModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: SharedModule
});
SharedModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _command_command_module__WEBPACK_IMPORTED_MODULE_5__.CommandModule, _change_change_module__WEBPACK_IMPORTED_MODULE_6__.ChangeModule, _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.PluginCommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__.InputTextModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SharedModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      declarations: [_dynamic_components_default_viewer_component__WEBPACK_IMPORTED_MODULE_7__.DefaultViewerComponent],
      exports: [_dynamic_components_default_viewer_component__WEBPACK_IMPORTED_MODULE_7__.DefaultViewerComponent],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _command_command_module__WEBPACK_IMPORTED_MODULE_5__.CommandModule, _change_change_module__WEBPACK_IMPORTED_MODULE_6__.ChangeModule, _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_2__.PluginCommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, primeng_inputtext__WEBPACK_IMPORTED_MODULE_4__.InputTextModule]
    }]
  }], null, null);
})();








/***/ }),

/***/ 9253:
/*!******************************************************************************************************************!*\
  !*** ../../libs/ng-sandbox/dist/libs/sandbox/esm2020/lib/shared/storage/services/indexed-db-storage.service.mjs ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndexedDbStorageService": () => (/* binding */ IndexedDbStorageService)
/* harmony export */ });
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dontcode/core */ 9130);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 5339);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 224);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 2954);
/* harmony import */ var dexie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dexie */ 2406);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @dontcode/plugin-common */ 3955);
/**
 * Allow storing of entities in the browser local database
 */







class IndexedDbStorageService extends _dontcode_core__WEBPACK_IMPORTED_MODULE_0__.AbstractDontCodeStoreProvider {
  /**
   * Enable test code to close a database between tests
   */
  static forceCloseDatabase() {
    // eslint-disable-next-line no-restricted-syntax
    console.debug("IndexedDB: In forceCloseDatabase");
    if (this.globalDb != null) {
      // eslint-disable-next-line no-restricted-syntax
      console.debug("IndexedDB: GlobalDB Exist");
      if (this.globalDb.isOpen()) {
        // eslint-disable-next-line no-restricted-syntax
        console.debug("IndexedDB: Closing GlobalDB");
        this.globalDb.close();
        // eslint-disable-next-line no-restricted-syntax
        console.debug("IndexedDB: GlobalDB is closed");
      }
    }
  }
  static forceDeleteDatabase(dbName) {
    // eslint-disable-next-line no-restricted-syntax
    console.debug("IndexedDB: In forceDeleteDatabase");
    return dexie__WEBPACK_IMPORTED_MODULE_1__["default"]["delete"](dbName).then(() => {
      // eslint-disable-next-line no-restricted-syntax
      console.debug("IndexedDB: Database " + dbName + " deleted");
    });
  }
  constructor(values, configService, modelMgr) {
    super(modelMgr);
    this.values = values;
    this.configService = configService;
    this.db = null;
    this.dbName = "Dont-code Sandbox Lib";
    this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subscription();
    this.updateConfig(configService.getConfig());
    this.subscriptions.add(configService.getUpdates().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(newConfig => {
      this.updateConfig(newConfig);
    })).subscribe());
    // Let unit tests close or delete the database between tests if needed
    if (self._indexedDbStorageServiceForceClose == null) {
      self._indexedDbStorageServiceForceClose = () => IndexedDbStorageService.forceCloseDatabase();
    }
    if (self._indexedDbStorageServiceForceDelete == null) {
      self._indexedDbStorageServiceForceDelete = dbName => IndexedDbStorageService.forceDeleteDatabase(dbName);
    }
    /*    console.log("BUG:Testing 1");
        const db=new Dexie ("Bug", {allowEmptyDB:true, autoOpen:false});
        if( !db.isOpen()) {
          db.open().then(database => {
            database.close();
            console.log("BUG:Adding Table 1");
            database.version(database.verno+1).stores({
              "Table1": "__id++"
            });
            database.open().then(database => {
              console.log("BUG:Table 1 Added");
              database.table('Table1').put({"Name":"Nom1"}).then(value => {
                database.table('Table1').put({"Name": "Nom2"}).then(value1 => {
                  database.close();
    
                  console.log("BUG:Recreating Bug DB");
                  const newdb=new Dexie ("Bug", {allowEmptyDB:true, autoOpen:false});
    
                  newdb.open().then(database => {
                    database.close();
                    console.log("BUG:Adding Table 2 to v"+database.verno);
                    database.version(database.verno+1).stores({
                      "Table2": "__id++"
                    });
                    database.open().then(database => {
                      console.log("BUG:Table 2 Added");
                      const table1 = database.table("Table1");
                      if( table1!=null)
                        console.log("BUG:Table1 Found", table1.name);
                      else {
                        console.log("BUG:Table1 not anymore");
                      }
                      console.log("BUG:End Testing");
                      database.close();
                    })
                })
              })
            });
          });
        })
      }*/
  }
  deleteEntity(position, key) {
    return this.ensurePositionCanBeStored(position, false).then(table => {
      return table.delete(key).then(() => {
        return true;
      });
    });
  }
  loadEntity(position, key) {
    return this.ensurePositionCanBeStored(position, false).then(table => {
      return table.get(key);
    }).catch(reason => {
      console.warn("IndexedDB: Cannot load entity " + key + " : " + reason);
      return undefined;
    });
  }
  searchEntities(position, ...criteria) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.from)(this.ensurePositionCanBeStored(position, false).then(table => {
      return table.toArray().then(list => {
        return _dontcode_core__WEBPACK_IMPORTED_MODULE_0__.StoreProviderHelper.applyFilters(list, ...criteria);
      });
    }).catch(reason => {
      // Probably table not found, just returns empty values
      console.warn("IndexedDB: Cannot search entity: " + reason);
      return [];
    }));
  }
  canStoreDocument(position) {
    return false;
  }
  storeDocuments(toStore, position) {
    throw new Error("Impossible to store documents in IndexedDB.");
  }
  storeEntity(position, entity) {
    return this.ensurePositionCanBeStored(position, true).then(table => {
      return table.put(entity).then(key => {
        if (entity._id && entity._id !== key) {
          return Promise.reject("Stored entity with id " + key + " different from " + entity._id);
        } else {
          return entity;
        }
      });
    });
  }
  ensurePositionCanBeStored(position, create) {
    const description = this.values.findAtPosition(position);
    if (description) return this.ensureEntityCanBeStored(description, create);else {
      return Promise.reject("Error called with null description");
    }
  }
  ensureEntityCanBeStored(description, create) {
    return this.withDatabase().then(db => {
      // We have to make sure the database is open before we can get the list of tables
      let table;
      try {
        table = db.table(description.name);
      } catch (error) {
        // Just ignore table not found
      }
      if (table != null) return Promise.resolve(table);
      if (create) {
        const tableDescription = {};
        tableDescription[description.name] = '++_id';
        return this.changeSchema(db, tableDescription).then(db => {
          return db.table(description.name);
        });
      } else {
        return Promise.reject(description.name + ' table not found');
      }
    });
  }
  changeSchema(db, schemaChanges) {
    //console.log("IndexedDB: Closing DB");
    db.close();
    /*    const newDb = new Dexie(db.name,{allowEmptyDB:true, autoOpen:false});
    
        newDb.on('blocked', ()=>false); // Silence console warning of blocked event.
    
        // Workaround: If DB is empty from tables, it needs to be recreated
        if (db.tables.length === 0) {
          return db.delete().then (value => {
            newDb.version(1.5).stores(schemaChanges);
            return newDb.open();
          })
        }
    
        // Extract current schema in dexie format:
        const currentSchema = db.tables.reduce((result:{[key:string]:any},{name, schema}) => {
          result[name] = [
            schema.primKey.src,
            ...schema.indexes.map(idx => idx.src)
          ].join(',');
          return result;
        }, {});
    */
    //console.log("Version: " + db.verno);
    //console.log("Current Schema: ", currentSchema);
    // Tell Dexie about current schema:
    // newDb.version(db.verno).stores(currentSchema);
    // Tell Dexie about next schema:
    //console.log("IndexedDB: Versioning DB to "+(db.verno + 1)+ " from tables "+this.allTables(db));
    db.version(db.verno + 1).stores(schemaChanges);
    // Upgrade it:
    //console.log("IndexedDB: Upgrading DB");
    return db.open().then(database => {
      //console.log("IndexedDB: Upgraded DB v"+database.verno+" to tables "+this.allTables(database));
      return database;
    });
  }
  updateConfig(newConfig) {
    if (newConfig.indexedDbName != null && newConfig.indexedDbName.length > 0) {
      if (newConfig.indexedDbName != this.dbName) {
        this.dbName = newConfig.indexedDbName;
        if (this.db?.isOpen()) {
          console.warn("Changing the name of an Open IndexedDB database to " + newConfig.indexedDbName);
          this.db.close();
          this.db = null; // Force reopen of db next time
        }
        IndexedDbStorageService.forceCloseDatabase();
      }
    }
  }
  withDatabase() {
    if (this.db == null) {
      //console.log("IndexedDB: Checking GlobalDB "+dbName);
      if (IndexedDbStorageService.globalDb == null) {
        IndexedDbStorageService.globalDb = new dexie__WEBPACK_IMPORTED_MODULE_1__["default"](this.dbName, {
          allowEmptyDB: true,
          autoOpen: false
        });
        //  console.log("IndexedDB: GlobalDB "+dbName+" created");
      }
      this.db = IndexedDbStorageService.globalDb;
      if (!this.db.isOpen()) {
        //      console.log("IndexedDB: Opening DB "+dbName);
        return this.db.open().then(database => {
          //      console.log ("IndexedDB: DB "+dbName+" v"+database.verno+" opened with tables "+this.allTables(database));
          return database;
        });
      }
    }
    return Promise.resolve(this.db);
  }
  ngOnDestroy() {
    //    console.log("IndexedDB: ngOnDestroy called");
    this.subscriptions.unsubscribe();
    IndexedDbStorageService.forceCloseDatabase();
  }
  allTables(db) {
    let ret = "";
    for (const table of db.tables) {
      ret = ret + ", " + table.name;
    }
    return ret;
  }
}
IndexedDbStorageService.ɵfac = function IndexedDbStorageService_Factory(t) {
  return new (t || IndexedDbStorageService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_3__.ValueService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_3__.CommonConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_dontcode_core__WEBPACK_IMPORTED_MODULE_0__.DontCodeModelManager, 8));
};
IndexedDbStorageService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: IndexedDbStorageService,
  factory: IndexedDbStorageService.ɵfac,
  providedIn: 'root'
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](IndexedDbStorageService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [{
      type: _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_3__.ValueService
    }, {
      type: _dontcode_plugin_common__WEBPACK_IMPORTED_MODULE_3__.CommonConfigService
    }, {
      type: _dontcode_core__WEBPACK_IMPORTED_MODULE_0__.DontCodeModelManager,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Optional
      }]
    }];
  }, null);
})();

/***/ }),

/***/ 8706:
/*!*******************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/@babel+runtime@7.20.13/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

/***/ })

}])
//# sourceMappingURL=default-libs_ng-sandbox_dist_libs_sandbox_esm2020_index_mjs.js.map