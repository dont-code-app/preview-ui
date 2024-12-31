(self["webpackChunkpreview_ui"] = self["webpackChunkpreview_ui"] || []).push([["default-libs_ng-common_dist_libs_common_esm2020_index_mjs"],{

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

/***/ 8837:
/*!******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/Subject.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnonymousSubject": () => (/* binding */ AnonymousSubject),
/* harmony export */   "Subject": () => (/* binding */ Subject)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Observable */ 8271);
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Subscription */ 5339);
/* harmony import */ var _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/ObjectUnsubscribedError */ 6420);
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/arrRemove */ 484);
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/errorContext */ 7520);





class Subject extends _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable {
  constructor() {
    super();
    this.closed = false;
    this.currentObservers = null;
    this.observers = [];
    this.isStopped = false;
    this.hasError = false;
    this.thrownError = null;
  }
  lift(operator) {
    const subject = new AnonymousSubject(this, this);
    subject.operator = operator;
    return subject;
  }
  _throwIfClosed() {
    if (this.closed) {
      throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_1__.ObjectUnsubscribedError();
    }
  }
  next(value) {
    (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(() => {
      this._throwIfClosed();
      if (!this.isStopped) {
        if (!this.currentObservers) {
          this.currentObservers = Array.from(this.observers);
        }
        for (const observer of this.currentObservers) {
          observer.next(value);
        }
      }
    });
  }
  error(err) {
    (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(() => {
      this._throwIfClosed();
      if (!this.isStopped) {
        this.hasError = this.isStopped = true;
        this.thrownError = err;
        const {
          observers
        } = this;
        while (observers.length) {
          observers.shift().error(err);
        }
      }
    });
  }
  complete() {
    (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(() => {
      this._throwIfClosed();
      if (!this.isStopped) {
        this.isStopped = true;
        const {
          observers
        } = this;
        while (observers.length) {
          observers.shift().complete();
        }
      }
    });
  }
  unsubscribe() {
    this.isStopped = this.closed = true;
    this.observers = this.currentObservers = null;
  }
  get observed() {
    var _a;
    return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
  }
  _trySubscribe(subscriber) {
    this._throwIfClosed();
    return super._trySubscribe(subscriber);
  }
  _subscribe(subscriber) {
    this._throwIfClosed();
    this._checkFinalizedStatuses(subscriber);
    return this._innerSubscribe(subscriber);
  }
  _innerSubscribe(subscriber) {
    const {
      hasError,
      isStopped,
      observers
    } = this;
    if (hasError || isStopped) {
      return _Subscription__WEBPACK_IMPORTED_MODULE_3__.EMPTY_SUBSCRIPTION;
    }
    this.currentObservers = null;
    observers.push(subscriber);
    return new _Subscription__WEBPACK_IMPORTED_MODULE_3__.Subscription(() => {
      this.currentObservers = null;
      (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_4__.arrRemove)(observers, subscriber);
    });
  }
  _checkFinalizedStatuses(subscriber) {
    const {
      hasError,
      thrownError,
      isStopped
    } = this;
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped) {
      subscriber.complete();
    }
  }
  asObservable() {
    const observable = new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
    observable.source = this;
    return observable;
  }
}
Subject.create = (destination, source) => {
  return new AnonymousSubject(destination, source);
};
class AnonymousSubject extends Subject {
  constructor(destination, source) {
    super();
    this.destination = destination;
    this.source = source;
  }
  next(value) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  }
  error(err) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
  }
  complete() {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
  }
  _subscribe(subscriber) {
    var _a, _b;
    return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : _Subscription__WEBPACK_IMPORTED_MODULE_3__.EMPTY_SUBSCRIPTION;
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

/***/ 4337:
/*!***************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/empty.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EMPTY": () => (/* binding */ EMPTY),
/* harmony export */   "empty": () => (/* binding */ empty)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ 8271);

const EMPTY = new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(subscriber => subscriber.complete());
function empty(scheduler) {
  return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
function emptyScheduled(scheduler) {
  return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(subscriber => scheduler.schedule(() => subscriber.complete()));
}

/***/ }),

/***/ 6071:
/*!************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/of.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "of": () => (/* binding */ of)
/* harmony export */ });
/* harmony import */ var _util_args__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/args */ 4353);
/* harmony import */ var _from__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./from */ 2954);


function of(...args) {
  const scheduler = (0,_util_args__WEBPACK_IMPORTED_MODULE_0__.popScheduler)(args);
  return (0,_from__WEBPACK_IMPORTED_MODULE_1__.from)(args, scheduler);
}

/***/ }),

/***/ 1787:
/*!*******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/catchError.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "catchError": () => (/* binding */ catchError)
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/innerFrom */ 6990);
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ 2305);
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ 6305);



function catchError(selector) {
  return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)((source, subscriber) => {
    let innerSub = null;
    let syncUnsub = false;
    let handledResult;
    innerSub = source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, undefined, undefined, err => {
      handledResult = (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(selector(err, catchError(selector)(source)));
      if (innerSub) {
        innerSub.unsubscribe();
        innerSub = null;
        handledResult.subscribe(subscriber);
      } else {
        syncUnsub = true;
      }
    }));
    if (syncUnsub) {
      innerSub.unsubscribe();
      innerSub = null;
      handledResult.subscribe(subscriber);
    }
  });
}

/***/ }),

/***/ 5513:
/*!*****************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/takeLast.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "takeLast": () => (/* binding */ takeLast)
/* harmony export */ });
/* harmony import */ var _observable_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/empty */ 4337);
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ 6305);
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OperatorSubscriber */ 2305);



function takeLast(count) {
  return count <= 0 ? () => _observable_empty__WEBPACK_IMPORTED_MODULE_0__.EMPTY : (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)((source, subscriber) => {
    let buffer = [];
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(subscriber, value => {
      buffer.push(value);
      count < buffer.length && buffer.shift();
    }, () => {
      for (const value of buffer) {
        subscriber.next(value);
      }
      subscriber.complete();
    }, undefined, () => {
      buffer = null;
    }));
  });
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

/***/ 9721:
/*!**************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/EmptyError.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmptyError": () => (/* binding */ EmptyError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ 1788);

const EmptyError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(_super => function EmptyErrorImpl() {
  _super(this);
  this.name = 'EmptyError';
  this.message = 'no elements in sequence';
});

/***/ }),

/***/ 6420:
/*!***************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/ObjectUnsubscribedError.js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectUnsubscribedError": () => (/* binding */ ObjectUnsubscribedError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ 1788);

const ObjectUnsubscribedError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(_super => function ObjectUnsubscribedErrorImpl() {
  _super(this);
  this.name = 'ObjectUnsubscribedError';
  this.message = 'object unsubscribed';
});

/***/ }),

/***/ 4353:
/*!********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/args.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "popNumber": () => (/* binding */ popNumber),
/* harmony export */   "popResultSelector": () => (/* binding */ popResultSelector),
/* harmony export */   "popScheduler": () => (/* binding */ popScheduler)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ 4634);
/* harmony import */ var _isScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isScheduler */ 8110);


function last(arr) {
  return arr[arr.length - 1];
}
function popResultSelector(args) {
  return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(last(args)) ? args.pop() : undefined;
}
function popScheduler(args) {
  return (0,_isScheduler__WEBPACK_IMPORTED_MODULE_1__.isScheduler)(last(args)) ? args.pop() : undefined;
}
function popNumber(args, defaultValue) {
  return typeof last(args) === 'number' ? args.pop() : defaultValue;
}

/***/ }),

/***/ 7278:
/*!*************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/async-mutex@0.4.1/node_modules/async-mutex/index.mjs ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E_ALREADY_LOCKED": () => (/* binding */ E_ALREADY_LOCKED),
/* harmony export */   "E_CANCELED": () => (/* binding */ E_CANCELED),
/* harmony export */   "E_TIMEOUT": () => (/* binding */ E_TIMEOUT),
/* harmony export */   "Mutex": () => (/* binding */ Mutex),
/* harmony export */   "Semaphore": () => (/* binding */ Semaphore),
/* harmony export */   "tryAcquire": () => (/* binding */ tryAcquire),
/* harmony export */   "withTimeout": () => (/* binding */ withTimeout)
/* harmony export */ });
const E_TIMEOUT = new Error('timeout while waiting for mutex to become available');
const E_ALREADY_LOCKED = new Error('mutex already locked');
const E_CANCELED = new Error('request for lock canceled');
var __awaiter$2 =  false || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class Semaphore {
  constructor(_value, _cancelError = E_CANCELED) {
    this._value = _value;
    this._cancelError = _cancelError;
    this._weightedQueues = [];
    this._weightedWaiters = [];
  }
  acquire(weight = 1) {
    if (weight <= 0) throw new Error(`invalid weight ${weight}: must be positive`);
    return new Promise((resolve, reject) => {
      if (!this._weightedQueues[weight - 1]) this._weightedQueues[weight - 1] = [];
      this._weightedQueues[weight - 1].push({
        resolve,
        reject
      });
      this._dispatch();
    });
  }
  runExclusive(callback, weight = 1) {
    return __awaiter$2(this, void 0, void 0, function* () {
      const [value, release] = yield this.acquire(weight);
      try {
        return yield callback(value);
      } finally {
        release();
      }
    });
  }
  waitForUnlock(weight = 1) {
    if (weight <= 0) throw new Error(`invalid weight ${weight}: must be positive`);
    return new Promise(resolve => {
      if (!this._weightedWaiters[weight - 1]) this._weightedWaiters[weight - 1] = [];
      this._weightedWaiters[weight - 1].push(resolve);
      this._dispatch();
    });
  }
  isLocked() {
    return this._value <= 0;
  }
  getValue() {
    return this._value;
  }
  setValue(value) {
    this._value = value;
    this._dispatch();
  }
  release(weight = 1) {
    if (weight <= 0) throw new Error(`invalid weight ${weight}: must be positive`);
    this._value += weight;
    this._dispatch();
  }
  cancel() {
    this._weightedQueues.forEach(queue => queue.forEach(entry => entry.reject(this._cancelError)));
    this._weightedQueues = [];
  }
  _dispatch() {
    var _a;
    for (let weight = this._value; weight > 0; weight--) {
      const queueEntry = (_a = this._weightedQueues[weight - 1]) === null || _a === void 0 ? void 0 : _a.shift();
      if (!queueEntry) continue;
      const previousValue = this._value;
      const previousWeight = weight;
      this._value -= weight;
      weight = this._value + 1;
      queueEntry.resolve([previousValue, this._newReleaser(previousWeight)]);
    }
    this._drainUnlockWaiters();
  }
  _newReleaser(weight) {
    let called = false;
    return () => {
      if (called) return;
      called = true;
      this.release(weight);
    };
  }
  _drainUnlockWaiters() {
    for (let weight = this._value; weight > 0; weight--) {
      if (!this._weightedWaiters[weight - 1]) continue;
      this._weightedWaiters[weight - 1].forEach(waiter => waiter());
      this._weightedWaiters[weight - 1] = [];
    }
  }
}
var __awaiter$1 =  false || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class Mutex {
  constructor(cancelError) {
    this._semaphore = new Semaphore(1, cancelError);
  }
  acquire() {
    return __awaiter$1(this, void 0, void 0, function* () {
      const [, releaser] = yield this._semaphore.acquire();
      return releaser;
    });
  }
  runExclusive(callback) {
    return this._semaphore.runExclusive(() => callback());
  }
  isLocked() {
    return this._semaphore.isLocked();
  }
  waitForUnlock() {
    return this._semaphore.waitForUnlock();
  }
  release() {
    if (this._semaphore.isLocked()) this._semaphore.release();
  }
  cancel() {
    return this._semaphore.cancel();
  }
}
var __awaiter =  false || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function withTimeout(sync, timeout, timeoutError = E_TIMEOUT) {
  return {
    acquire: weight => {
      if (weight !== undefined && weight <= 0) {
        throw new Error(`invalid weight ${weight}: must be positive`);
      }
      return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        let isTimeout = false;
        const handle = setTimeout(() => {
          isTimeout = true;
          reject(timeoutError);
        }, timeout);
        try {
          const ticket = yield sync.acquire(weight);
          if (isTimeout) {
            const release = Array.isArray(ticket) ? ticket[1] : ticket;
            release();
          } else {
            clearTimeout(handle);
            resolve(ticket);
          }
        } catch (e) {
          if (!isTimeout) {
            clearTimeout(handle);
            reject(e);
          }
        }
      }));
    },
    runExclusive(callback, weight) {
      return __awaiter(this, void 0, void 0, function* () {
        let release = () => undefined;
        try {
          const ticket = yield this.acquire(weight);
          if (Array.isArray(ticket)) {
            release = ticket[1];
            return yield callback(ticket[0]);
          } else {
            release = ticket;
            return yield callback();
          }
        } finally {
          release();
        }
      });
    },
    release(weight) {
      sync.release(weight);
    },
    cancel() {
      return sync.cancel();
    },
    waitForUnlock: weight => {
      if (weight !== undefined && weight <= 0) {
        throw new Error(`invalid weight ${weight}: must be positive`);
      }
      return new Promise((resolve, reject) => {
        const handle = setTimeout(() => reject(timeoutError), timeout);
        sync.waitForUnlock(weight).then(() => {
          clearTimeout(handle);
          resolve();
        });
      });
    },
    isLocked: () => sync.isLocked(),
    getValue: () => sync.getValue(),
    setValue: value => sync.setValue(value)
  };
}

// eslint-disable-next-lisne @typescript-eslint/explicit-module-boundary-types
function tryAcquire(sync, alreadyAcquiredError = E_ALREADY_LOCKED) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return withTimeout(sync, 0, alreadyAcquiredError);
}


/***/ }),

/***/ 9588:
/*!***************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/index.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractDynamicComponent": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.AbstractDynamicComponent),
/* harmony export */   "AbstractDynamicLoaderComponent": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.AbstractDynamicLoaderComponent),
/* harmony export */   "AbstractPluginHandler": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.AbstractPluginHandler),
/* harmony export */   "AbstractReferenceComponent": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.AbstractReferenceComponent),
/* harmony export */   "BaseDynamicEvent": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.BaseDynamicEvent),
/* harmony export */   "BaseDynamicEventSource": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.BaseDynamicEventSource),
/* harmony export */   "BeautifierPipe": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.BeautifierPipe),
/* harmony export */   "CHANNEL_CHANGE_NAME": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_CHANGE_NAME),
/* harmony export */   "COMMAND_PROVIDER": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.COMMAND_PROVIDER),
/* harmony export */   "CommonConfigService": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.CommonConfigService),
/* harmony export */   "CommonTestManager": () => (/* reexport safe */ _lib_plugin_common_test_module__WEBPACK_IMPORTED_MODULE_1__.CommonTestManager),
/* harmony export */   "ComponentLoaderService": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.ComponentLoaderService),
/* harmony export */   "DONT_CODE_COMMON_CONFIG": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.DONT_CODE_COMMON_CONFIG),
/* harmony export */   "DONT_CODE_CORE": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.DONT_CODE_CORE),
/* harmony export */   "DynamicEventType": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.DynamicEventType),
/* harmony export */   "DynamicInsertPoint": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.DynamicInsertPoint),
/* harmony export */   "EntityListManager": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.EntityListManager),
/* harmony export */   "EntityStoreService": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.EntityStoreService),
/* harmony export */   "PluginBaseComponent": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.PluginBaseComponent),
/* harmony export */   "PluginCommonModule": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.PluginCommonModule),
/* harmony export */   "PluginCommonTestModule": () => (/* reexport safe */ _lib_plugin_common_test_module__WEBPACK_IMPORTED_MODULE_1__.PluginCommonTestModule),
/* harmony export */   "PluginHandlerHelper": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.PluginHandlerHelper),
/* harmony export */   "PossibleTemplateList": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.PossibleTemplateList),
/* harmony export */   "SANDBOX_MENUS": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.SANDBOX_MENUS),
/* harmony export */   "SubFieldInfo": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.SubFieldInfo),
/* harmony export */   "TemplateList": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.TemplateList),
/* harmony export */   "ValueService": () => (/* reexport safe */ _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__.ValueService)
/* harmony export */ });
/* harmony import */ var _lib_plugin_common_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/plugin-common.module */ 4264);
/* harmony import */ var _lib_plugin_common_test_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/plugin-common-test.module */ 3080);



/***/ }),

/***/ 3760:
/*!*************************************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/common-config/common-config.service.mjs ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommonConfigService": () => (/* binding */ CommonConfigService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 5527);
/* harmony import */ var _common_global_globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-global/globals */ 213);




/**
 * A service storing configuration information.
 * Configuration can be changed after loading
 */
class CommonConfigService {
  constructor(config) {
    this.updates = new rxjs__WEBPACK_IMPORTED_MODULE_1__.ReplaySubject(1);
    this.config = config;
    if (this.config == null) this.config = {};
  }
  getConfig() {
    return this.config;
  }
  getUpdates() {
    return this.updates;
  }
  updateConfig(property, value) {
    this.config[property] = value;
    this.updates.next(this.config);
  }
  batchUpdateConfig(newValues) {
    this.config = Object.assign(this.config, newValues);
    this.updates.next(this.config);
  }
}
CommonConfigService.ɵfac = function CommonConfigService_Factory(t) {
  return new (t || CommonConfigService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_common_global_globals__WEBPACK_IMPORTED_MODULE_2__.DONT_CODE_COMMON_CONFIG, 8));
};
CommonConfigService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: CommonConfigService,
  factory: CommonConfigService.ɵfac,
  providedIn: 'root'
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CommonConfigService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_common_global_globals__WEBPACK_IMPORTED_MODULE_2__.DONT_CODE_COMMON_CONFIG]
      }]
    }];
  }, null);
})();

/***/ }),

/***/ 8364:
/*!*********************************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/common-config/common-lib-config.mjs ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHANNEL_CHANGE_NAME": () => (/* binding */ CHANNEL_CHANGE_NAME),
/* harmony export */   "SANDBOX_MENUS": () => (/* binding */ SANDBOX_MENUS)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);

/*export const basicStoreApiUrlConfig = (config:CommonLibConfig) => {
  return config.storeUrl;
};

export const basicDocumentApiUrlConfig = (config:CommonLibConfig) => {
  return config.documentUrl;
};*/
const CHANNEL_CHANGE_NAME = 'preview-ui-changes';
const SANDBOX_MENUS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('Allows addition of menus');

/***/ }),

/***/ 2004:
/*!*****************************************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/common-dynamic/component-loader.service.mjs ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComponentLoaderService": () => (/* binding */ ComponentLoaderService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _common_global_globals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-global/globals */ 213);
/* harmony import */ var async_mutex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! async-mutex */ 7278);
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dontcode/core */ 9130);





/**
 * Manages the dynamic loading of components able to display a data located at a specific pointer position
 * Depending on the plugins loaded, a different component can display the same value.
 *
 * It keeps in cache as well the component factory and module used for a pointer position
 */
class ComponentLoaderService {
  constructor(injector, dontCodeCore, previewMgr, provider) {
    this.injector = injector;
    this.dontCodeCore = dontCodeCore;
    this.previewMgr = previewMgr;
    this.provider = provider;
    this.moduleMap = new Map();
    this.mutex = new async_mutex__WEBPACK_IMPORTED_MODULE_1__.Mutex();
  }
  /**
   * Either creates or retrieves the module whose name is in parameter.
   * @param moduleName
   */
  getOrCreatePluginModuleRef(moduleSource) {
    return this.mutex.acquire().then(release => {
      try {
        let moduleRef = this.moduleMap.get(moduleSource);
        if (!moduleRef) {
          moduleRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.createNgModule)((0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.getNgModuleById)('dontcode-plugin/' + moduleSource), this.injector);
          if (moduleRef) {
            this.moduleMap.set(moduleSource, moduleRef);
          }
        }
        return moduleRef;
      } finally {
        release();
      }
    });
  }
  loadPluginModule(handlerConfig) {
    return this.getOrCreatePluginModuleRef(handlerConfig.class.source).then(moduleRef => {
      if (moduleRef != null) {
        // Now init the newly loaded module
        this.dontCodeCore.initPlugins();
      }
      return moduleRef;
    });
  }
  insertComponentForFieldType(type, insertPoint) {
    return this.insertComponent('creation/entities/fields/type', insertPoint, type);
  }
  insertComponent(schemaPosition, insertPoint, currentJson) {
    let schemaPos = schemaPosition.positionInSchema;
    let isPointer;
    if (schemaPos) {
      isPointer = true;
      if (!currentJson) {
        currentJson = this.provider?.getJsonAt(schemaPosition.position);
      }
    } else {
      isPointer = false;
      schemaPos = schemaPosition;
    }
    const handlerConfig = this.previewMgr.retrieveHandlerConfig(schemaPos, currentJson);
    if (handlerConfig) {
      //console.debug('Importing from ', handlerConfig.class.source);
      // First lets try if the plugin is imported during the compilation
      return this.loadPluginModule(handlerConfig).then(moduleRef => {
        const componentClass = moduleRef.instance.exposedPreviewHandlers().get(handlerConfig.class.name);
        return this.createComponent(componentClass, insertPoint, moduleRef, isPointer ? schemaPosition : null);
      }).catch(reason => {
        console.error("Cannot load module because of ", reason);
        return Promise.reject('Cannot load module for source ' + handlerConfig.class.source + ' because of ' + reason);
      });
      //console.log ("Applying component");
    } else {
      return Promise.resolve(null);
    }
  }
  createComponent(componentClass, insertPoint, moduleRef, position) {
    let injector = this.injector;
    const componentRef = insertPoint.createComponent(componentClass, {
      injector: injector,
      ngModuleRef: moduleRef
    });
    const component = componentRef.instance;
    if (component.initCommandFlow) {
      // It's a previewHandler
      if (!position) throw new Error('Component ' + component.constructor.name + ' is a PreviewHandler and parent position is missing.');
      if (!this.provider) throw new Error('Component ' + component.constructor.name + ' is a PreviewHandler and CommandProviderInterface is missing.');
      component.initCommandFlow(this.provider, position);
    }
    return component;
  }
  /**
   * For some reasons, during a Jest test, modules are not registered in Angular getNgModuleById(), so we let the possibility to do it by hand
   * @param module
   * @param source
   */
  registerModuleForTest(module, source) {
    if (module.instance == null)
      // It's not a NgModuleRef
      this.moduleMap.set(source, (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.createNgModule)(module, this.injector));else this.moduleMap.set(source, module);
  }
}
ComponentLoaderService.ɵfac = function ComponentLoaderService_Factory(t) {
  return new (t || ComponentLoaderService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_common_global_globals__WEBPACK_IMPORTED_MODULE_3__.DONT_CODE_CORE), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_dontcode_core__WEBPACK_IMPORTED_MODULE_2__.DontCodePreviewManager), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_common_global_globals__WEBPACK_IMPORTED_MODULE_3__.COMMAND_PROVIDER, 8));
};
ComponentLoaderService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: ComponentLoaderService,
  factory: ComponentLoaderService.ɵfac,
  providedIn: 'root'
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ComponentLoaderService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_common_global_globals__WEBPACK_IMPORTED_MODULE_3__.DONT_CODE_CORE]
      }]
    }, {
      type: _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.DontCodePreviewManager
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_common_global_globals__WEBPACK_IMPORTED_MODULE_3__.COMMAND_PROVIDER]
      }]
    }];
  }, null);
})();

/***/ }),

/***/ 213:
/*!***********************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/common-global/globals.mjs ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COMMAND_PROVIDER": () => (/* binding */ COMMAND_PROVIDER),
/* harmony export */   "DONT_CODE_COMMON_CONFIG": () => (/* binding */ DONT_CODE_COMMON_CONFIG),
/* harmony export */   "DONT_CODE_CORE": () => (/* binding */ DONT_CODE_CORE)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);

let COMMAND_PROVIDER = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('Inject the current command provider interface');
/**
 * Enable the Dont-code Core interface to be injected
 */
const DONT_CODE_CORE = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("Dont-code core object");
/**
 * Enable the injection of static config parameters (internal use only)
 */
const DONT_CODE_COMMON_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('DontCodeCommonLibConfig');

/***/ }),

/***/ 6683:
/*!****************************************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/common-handler/abstract-plugin-handler.mjs ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractPluginHandler": () => (/* binding */ AbstractPluginHandler)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 5339);
/* harmony import */ var _plugin_handler_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugin-handler-helper */ 7252);


/**
 * Helps develop a plugin handler that is not an Angular Component. For an Angular Component handling model changes, please use PluginBaseComponent
 */
class AbstractPluginHandler {
  constructor() {
    this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subscription();
    this.pluginHelper = new _plugin_handler_helper__WEBPACK_IMPORTED_MODULE_1__.PluginHandlerHelper();
    this.entityPointer = null;
    this.provider = null;
  }
  unsubscribe() {
    this.pluginHelper.unsubscribe();
    this.subscriptions.unsubscribe();
  }
  initCommandFlow(provider, pointer) {
    this.entityPointer = pointer;
    this.provider = provider;
    this.pluginHelper.initCommandFlow(provider, pointer, this);
  }
  initChangeListening() {
    this.pluginHelper.initChangeListening();
  }
  /**
   * When the component is created for display, it receives the initial data as complete Json.
   * If it wants, it can call this method who will call handleChange for each property.
   * This will avoid to duplicate code (first time when a complete json is sent, second when subelements are sent)
   * @protected
   */
  decomposeJsonToMultipleChanges(pointer, json) {
    this.pluginHelper.decomposeJsonToMultipleChanges(pointer, json);
  }
  /**
   * Updates the array of T elements by applying the changes received and calling the transform method
   * @param cols
   * @param colsMap
   * @param change
   * @param property
   * @param transform
   * @private
   */
  applyUpdatesToArray(target, targetMap, change, property, transform, applyProperty) {
    return this.applyUpdatesToArrayAsync(target, targetMap, change, property, (key, item) => {
      return Promise.resolve(transform(key, item));
    });
  }
  /**
   * Updates the array of T elements by applying the changes received and calling the transform method
   * @param target
   * @param targetMap
   * @param change
   * @param property
   * @param transform
   * @param parentPosition
   * @param applyProperty
   * @private
   */
  applyUpdatesToArrayAsync(target, targetMap, change, property, transform, parentPosition, applyProperty) {
    return this.pluginHelper.applyUpdatesToArrayAsync(target, targetMap, change, property, transform, parentPosition, applyProperty);
  }
  /**
   * Called whenever an action needs to be performed on the data
   * @param action
   */
  performAction(action) {
    return Promise.resolve(undefined);
  }
}

/***/ }),

/***/ 7252:
/*!**************************************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/common-handler/plugin-handler-helper.mjs ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PluginHandlerHelper": () => (/* binding */ PluginHandlerHelper)
/* harmony export */ });
/* harmony import */ var _home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/temp/node_modules/.pnpm/@babel+runtime@7.20.13/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 8706);
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dontcode/core */ 9130);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 224);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 5513);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 1787);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 5339);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 6071);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 2954);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 1211);
/* harmony import */ var async_mutex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! async-mutex */ 7278);





/**
 * This class does all the hard work of managing changes and actions, so that your plugin only has to implement handleChange and performAction
 * As there is no one to one mapping between the position of the change and the position the plugin is interested in, we need to generate subevent to ensure the plugin is receiving updates.
 */
class PluginHandlerHelper {
  constructor() {
    this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscription();
    this.entityPointer = null;
    this.provider = null;
    this.changeHandler = null;
    this.actionPerformer = null;
    this.mutex = new async_mutex__WEBPACK_IMPORTED_MODULE_2__.Mutex();
  }
  initCommandFlow(provider, pointer, changeHandler, actionPerformer) {
    this.entityPointer = pointer;
    this.provider = provider;
    this.changeHandler = changeHandler;
    if (actionPerformer != null) this.actionPerformer = actionPerformer;else if (changeHandler.performAction != null) {
      // The changehandler is as well an action performer
      this.actionPerformer = changeHandler;
    }
  }
  /**
   * When the component is created for display, it receives the initial data as complete Json.
   * If it wants, it can call this method who will call handleChange for each property.
   * This will avoid to duplicate code (first when a complete json is sent, then when subelements are sent)
   * @protected
   */
  decomposeJsonToMultipleChanges(pointer, json) {
    // Do nothing as now the events are already splitted per subItems
    if (typeof json === 'object' && this.provider) {
      let change;
      const schemaManager = this.provider.getSchemaManager();
      for (const prop in json) {
        if (json.hasOwnProperty(prop)) {
          const subPropertyPointer = schemaManager.generateSubSchemaPointer(pointer, prop);
          const propType = schemaManager.locateItem(subPropertyPointer.positionInSchema);
          if (propType?.isArray() && subPropertyPointer.isProperty) {
            this.decomposeJsonToMultipleChanges(subPropertyPointer, json[prop]);
          } else {
            change = new _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.Change(_dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.RESET, pointer.position + '/' + prop, json[prop], subPropertyPointer);
            if (!propType && change.pointer) {
              // This is not a sub property but a subItem of an array
              //change.pointer.itemId = change.pointer.key;
              change.pointer.isProperty = false;
            }
            if (this.changeHandler != null) this.changeHandler.handleChange(change);
          }
        }
      }
    }
  }
  /**
   * Calls handleChange each time a change event for any element below this (as per the model's position) is received
   * @protected
   */
  initChangeListening(subElement) {
    this.initOtherChangeListening(subElement, this.entityPointer);
  }
  /**
   * Calls handleChange each time a change event for any element of the model given in parameter
   * @protected
   */
  initOtherChangeListening(subElement, pointer) {
    if (this.provider && pointer) {
      let filter = pointer.position;
      if (subElement !== true) filter += '/?';
      this.subscriptions.add(this.provider.receiveCommands(filter).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(change => {
        if (change.actionType != null)
          // It's an action, not a change
          {
            if (this.actionPerformer) {
              const action = change;
              action.running?.next(this.actionPerformer.performAction(action));
            }
          } else if (this.changeHandler) {
          this.changeHandler.handleChange(change);
        }
      })).subscribe());
    } else {
      throw new Error('Cannot listen to change before initCommandFlow is called');
    }
  }
  /**
   * Updates the array of T elements by applying the changes received and calling the transform method
   * @param cols
   * @param colsMap
   * @param change
   * @param property
   * @param transform
   * @private
   */
  applyUpdatesToArray(target, targetMap, change, property, transform, applyProperty) {
    return this.applyUpdatesToArrayAsync(target, targetMap, change, property, (key, item) => {
      return Promise.resolve(transform(key, item));
    });
  }
  /**
   * Updates the array of T elements by applying the changes received and calling the transform method
   * @param target
   * @param targetMap
   * @param change
   * @param property
   * @param transform
   * @param parentPosition
   * @param applyProperty
   * @private
   */
  applyUpdatesToArrayAsync(target, targetMap, change, property, transform, parentPosition, applyProperty) {
    // We have the mutex to avoid multiple changes checking the map and target array at the same time...
    return this.mutex.runExclusive(() => {
      try {
        if (!this.provider) throw new Error('Cannot apply updates before initCommandFlow is called');
        if (!change.pointer) {
          change.pointer = this.provider.calculatePointerFor(change.position);
        }
        // If the change concerns the array, then calculates it's element (itemId)
        parentPosition = parentPosition ?? this.entityPointer?.position;
        if (property != null) parentPosition = parentPosition + '/' + property;
        const subItem = change.pointer.containerPosition === parentPosition;
        let itemId = subItem ? change.pointer.lastElement : _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModelPointer.lastElementOf(change.pointer.containerPosition) ?? null;
        let propertyId = change.pointer.isProperty ? change.pointer.lastElement : null;
        let futureTarget = null;
        let newTarget = null;
        let pos = -1;
        let targetPos = -1;
        if (itemId != null && targetMap.has(itemId)) {
          // Does the target item already exist ?
          pos = targetMap.get(itemId);
          newTarget = target[pos];
          futureTarget = (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(newTarget);
        }
        if (change.beforeKey) {
          targetPos = targetMap.get(change.beforeKey);
        }
        switch (change.type) {
          case _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.ADD:
          case _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.UPDATE:
          case _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.RESET:
            if (propertyId != null) {
              // It's not a replacement of the item but a change in one of its property
              // Can we try to update directly the sub property?
              if (!newTarget || newTarget && (!applyProperty || !applyProperty(newTarget, propertyId, change.value))) {
                // It cannot be dynamically updated by the caller, so we do a full replacement
                const fullValue = this.provider.getJsonAt(change.pointer.containerPosition);
                //if (change.value!==fullValue[propertyId]) { Don't check as the new value as already been set in the json
                const parentPointer = this.provider.calculatePointerFor(change.pointer.containerPosition);
                if (parentPointer.isProperty) throw new Error('A parent of a property ' + change.pointer.position + ' must be an array');
                futureTarget = (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.from)(transform(parentPointer, fullValue));
                /*                      }else {
                        // We set the same value, so nothing changed
                        futureTarget = null;
                      }*/
              }
            } else {
              // The new value replace the old one
              futureTarget = (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.from)(transform(change.pointer, change.value));
            }
            break;
          case _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.MOVE:
            if (pos !== -1 && subItem && itemId) {
              // We delete the element moved, it will be inserted at the right position later
              if (targetPos !== -1 && targetPos > pos) targetPos--;
              target.splice(pos, 1);
              // Recalculate all indexes in targetMap
              targetMap.forEach((value, key) => {
                if (value > pos) {
                  targetMap.set(key, value - 1);
                }
              });
              targetMap.delete(itemId);
              pos = -1;
            }
            break;
          case _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.ChangeType.DELETE:
            if (pos !== -1 && subItem && itemId) {
              target.splice(pos, 1);
              // Recalculate all indexes in targetMap
              targetMap.forEach((value, key) => {
                if (value > pos) {
                  targetMap.set(key, value - 1);
                }
              });
              targetMap.delete(itemId);
            }
            futureTarget = null;
            break;
        }
        if (futureTarget) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.firstValueFrom)(futureTarget.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(result => {
            if (pos !== -1) {
              // We just need to replace the new value at the same position
              target[pos] = result;
            } else if (targetPos !== -1) {
              // Insert the element at the correct position
              target.splice(targetPos, 0, result);
              // Recalculate all indexes in targetMap
              targetMap.forEach((value, key) => {
                if (value >= targetPos) {
                  targetMap.set(key, value + 1);
                }
              });
              if (itemId != null) targetMap.set(itemId, targetPos);else throw new Error('Cannot set targetPos ' + targetPos + ' without knowing the itemId');
            } else {
              // Insert the element at the end
              target.push(result);
              if (itemId != null) targetMap.set(itemId, targetMap.size);else throw new Error('Cannot set targetPos ' + targetPos + ' without knowing the itemId');
            }
            return target;
          }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.takeLast)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.catchError)(error => {
            return Promise.reject(error);
          })));
        } else {
          return Promise.resolve(target);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    });
  }
  unsubscribe() {
    this.subscriptions.unsubscribe();
  }
  /**
   * Sends the action to whatever component can perform it
   * @param action
   */
  performAction(action) {
    var _this = this;
    return (0,_home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.provider != null) yield _this.provider.sendCommand(action);else return Promise.reject('No provider for the component at position ' + _this.entityPointer?.position);
    })();
  }
}

/***/ }),

/***/ 3824:
/*!*************************************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/common-storage/entity-store.service.mjs ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EntityListManager": () => (/* binding */ EntityListManager),
/* harmony export */   "EntityStoreService": () => (/* binding */ EntityStoreService)
/* harmony export */ });
/* harmony import */ var _home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/temp/node_modules/.pnpm/@babel+runtime@7.20.13/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 8706);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dontcode/core */ 9130);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 224);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 1211);







class EntityStoreService {
  constructor(storeMgr, modelMgr) {
    this.storeMgr = storeMgr;
    this.modelMgr = modelMgr;
    this.listsByPosition = new Map();
  }
  retrieveListManager(pointer, description) {
    let newOne = this.listsByPosition.get(pointer.position);
    if (newOne == null) {
      newOne = new EntityListManager(pointer, description, this.storeMgr, this.modelMgr);
      this.listsByPosition.set(pointer.position, newOne);
    }
    return newOne;
  }
}
EntityStoreService.ɵfac = function EntityStoreService_Factory(t) {
  return new (t || EntityStoreService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_dontcode_core__WEBPACK_IMPORTED_MODULE_2__.DontCodeStoreManager), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_dontcode_core__WEBPACK_IMPORTED_MODULE_2__.DontCodeModelManager));
};
EntityStoreService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: EntityStoreService,
  factory: EntityStoreService.ɵfac,
  providedIn: 'root'
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](EntityStoreService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [{
      type: _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.DontCodeStoreManager
    }, {
      type: _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.DontCodeModelManager
    }];
  }, null);
})();
/**
 * Manages a list of any object stored by the Dont-Code StoreManager in a way that Angular detects the changes
 */
class EntityListManager {
  constructor(pointer, description, storeMgr, modelMgr) {
    this.storeMgr = storeMgr;
    this.modelMgr = modelMgr;
    /**
     * The array of entities to use
     */
    this.entities = null;
    this.prepared = null;
    this.pointer = pointer;
    this.description = description;
  }
  push(element) {
    if (this.entities == null) this.entities = new Array(element);else this.entities = [...this.entities, element];
  }
  updateWithDetailedEntity(element) {
    const elementId = element._id;
    const updated = new Array();
    if (this.entities != null) {
      this.entities.forEach(value => {
        const valueId = value._id;
        if (valueId == elementId) {
          element = {
            ...element,
            ...value
          };
          updated.push(element);
        } else {
          updated.push(value);
        }
      });
      this.entities = [...updated];
    } else {
      this.entities = [element];
    }
    return element;
  }
  replace(element) {
    if (this.entities == null) return false;
    const elementId = element._id;
    let ret = false;
    const updated = new Array();
    this.entities.forEach(value => {
      const valueId = value._id;
      if (valueId == elementId) {
        updated.push(element);
        ret = true;
      } else {
        updated.push(value);
      }
    });
    this.entities = [...updated];
    return ret;
  }
  remove(element) {
    if (this.entities == null) return Promise.resolve(false);
    const elementId = element._id;
    if (elementId == null)
      // Not saved yet, so just remove it from the list
      {
        return new Promise(resolve => {
          if (this.entities != null) {
            this.entities = this.entities.filter(val => val !== element);
            this.prepared = null;
            resolve(true);
          } else resolve(false);
        });
      } else {
      return this.storeMgr.deleteEntity(this.pointer.position, elementId).then(deleted => {
        if (deleted) {
          if (this.entities != null) {
            this.entities = this.entities.filter(val => val !== element);
            this.prepared = null;
          }
        }
        return deleted;
      }).catch(reason => {
        console.error(reason.message);
        return false;
      });
    }
  }
  reset() {
    if (this.entities != null) this.entities.length = 0;
    this.prepared = null;
  }
  store(element) {
    this.prepared = null;
    return this.storeMgr.storeEntity(this.pointer.position, element);
  }
  /**
   * Saves permanently all elements that have been changed
   */
  storeAllChanged() {
    var _this = this;
    return (0,_home_runner_work_monorepo_monorepo_common_temp_node_modules_pnpm_babel_runtime_7_20_13_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.entities == null) return;
      _this.prepared = null;
      for (const entity of _this.entities) {
        yield _this.storeMgr.storeEntity(_this.pointer.position, entity);
      }
    })();
  }
  loadAll() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.firstValueFrom)(this.storeMgr.searchEntities(this.pointer.position).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(values => {
      this.prepared = null;
      this.entities = [...values];
      return;
    })), {
      defaultValue: undefined
    });
  }
  searchAndPrepareEntities(sort, groupBy, dataTransformer, ...criteria) {
    // It only supports one groupby and one sortby for now, so just find one if any
    let listOfValues = sort != null ? Object.values(sort) : [];
    const sortStore = listOfValues.length > 0 ? listOfValues[0] : undefined;
    listOfValues = groupBy != null ? Object.values(groupBy) : [];
    const groupByStore = listOfValues.length > 0 ? new _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.DontCodeStoreGroupby(listOfValues[0].of, listOfValues[0].display, listOfValues[0].show) : undefined;
    if (this.entities != null) {
      this.prepared = null;
      // Already loaded, just sort & group
      let sortedValues = this.entities;
      let groupedValues = undefined;
      if (criteria != null) sortedValues = _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.StoreProviderHelper.applyFilters(sortedValues, ...criteria);
      if (dataTransformer != null) {
        sortedValues = dataTransformer.postLoadingTransformation(sortedValues);
      }
      if (sortStore != null) {
        sortedValues = _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.StoreProviderHelper.multiSortArray(sortedValues, sortStore);
      }
      if (groupByStore != null) {
        groupedValues = _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.StoreProviderHelper.calculateGroupedByValues(sortedValues, groupByStore, this.modelMgr, this.pointer);
      }
      if (criteria != null || sort != null || groupBy != null) {
        this.prepared = new _dontcode_core__WEBPACK_IMPORTED_MODULE_2__.DontCodeStorePreparedEntities(sortedValues, sortStore, groupedValues);
      }
      this.entities = sortedValues; // Updates the list with sorted and modified values
      return Promise.resolve();
    } else {
      // Not loaded already, just ask the store to do it
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.firstValueFrom)(this.storeMgr.searchAndPrepareEntities(this.pointer.position, sortStore, groupByStore, dataTransformer, ...criteria).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(value => {
        this.prepared = value;
        this.entities = this.prepared.sortedData;
      })));
    }
  }
  /**
   * Loads the detail of an already loaded item. Makes sure it only add any additional fields without changing any values of the item in memory
   * @param toLoad
   */
  loadDetailFromKey(key) {
    if (key == null) return Promise.reject("Cannot load entity with null key");
    return this.storeMgr.loadEntity(this.pointer.position, key).then(loaded => {
      if (loaded != null) {
        return this.updateWithDetailedEntity(loaded);
      }
      return loaded;
    });
  }
  /**
  * Loads the detail of an already loaded item.
  * @param toLoad
  */
  loadDetailOf(toLoad) {
    return this.loadDetailFromKey(toLoad._id);
  }
}

/***/ }),

/***/ 8149:
/*!*********************************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/common-test/common-test-manager.mjs ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommonTestManager": () => (/* binding */ CommonTestManager)
/* harmony export */ });
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dontcode/core */ 9130);
/* harmony import */ var _plugin_common_test_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../plugin-common-test.module */ 3080);


/**
 * In complement of DontCodeTestManager, provides some Angular specific helpers
 */
class CommonTestManager {
  /**
   * Register a specific component for testing
   * @param type
   * @param component
   * @param cls
   */
  static registerComponentForType(forType, name, component) {
    // Add the config so that ComponentLoaderService finds the component
    _dontcode_core__WEBPACK_IMPORTED_MODULE_0__.dtcde.registerPlugin(new TestPlugin({
      forType,
      name
    }));
    _plugin_common_test_module__WEBPACK_IMPORTED_MODULE_1__.PluginCommonTestModule.previewHandlers.set(name, component);
  }
}
class TestPlugin {
  constructor(toDeclare) {
    this.testComponents = null;
    this.CONFIG = {
      plugin: {
        id: 'CommonTestManagerPlugin',
        version: '1.0'
      },
      'schema-updates': [{
        id: 'test-component',
        description: 'Test Component added',
        changes: [{
          location: {
            parent: '#/$defs/field',
            id: 'type'
          },
          update: {
            enum: [{
              Test: {
                enum: []
              }
            }]
          },
          replace: false
        }]
      }],
      "preview-handlers": []
    };
    this.PREVIEW_HANDLER_CONFIG = {
      location: {
        parent: _dontcode_core__WEBPACK_IMPORTED_MODULE_0__.DontCodeModel.APP_FIELDS,
        id: 'type',
        values: [{
          Test: {
            enum: []
          }
        }]
      },
      class: {
        source: 'common-test-module',
        name: 'name'
      }
    };
    this.testComponents = toDeclare;
  }
  getConfiguration() {
    if (this.testComponents != null) {
      const ret = structuredClone(this.CONFIG);
      const previewConfig = structuredClone(this.PREVIEW_HANDLER_CONFIG);
      if (ret["schema-updates"] != null && ret["preview-handlers"] != null) {
        ret["schema-updates"][0].id = this.testComponents.name;
        ret["schema-updates"][0].changes[0].update.enum[0].Test.enum.push(this.testComponents.forType);
        previewConfig.class.name = this.testComponents.name;
        previewConfig.location.values[0].Test.enum.push(this.testComponents.forType);
        ret["preview-handlers"].push(previewConfig);
        return ret;
      }
    }
    throw new Error("No testComponent to register");
  }
  pluginInit(dontCode) {}
}

/***/ }),

/***/ 561:
/*!**************************************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/common-ui/abstract-dynamic-component.mjs ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractDynamicComponent": () => (/* binding */ AbstractDynamicComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ 7527);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 5339);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1855);




/**
 * A component that can be dynamically loaded by the dont-code framework.
 * It can integrate with a reactive form.
 * To dynamically load other Dont-code components for subFields, you should use AbstractDynamicLoaderComponent instead
 * To listen to model change, you have to derive from PluginBaseComponent instead.
 */
class AbstractDynamicComponent {
  constructor() {
    this.parentPosition = null;
    this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subscription();
  }
  setName(name) {
    this.name = name;
  }
  getValue() {
    if (this.form != null) this.updateValueFromForm();
    return this.value;
  }
  setValue(val) {
    this.value = val;
    if (this.form != null) this.hydrateValueToForm();
  }
  setParentPosition(position) {
    this.parentPosition = position;
  }
  setForm(form) {
    this.form = form;
    if (this.form != null && this.name != null) {
      this.createAndRegisterFormControls();
    }
  }
  getForm() {
    return this.form;
  }
  /**
   * By default registers a single control with the name this.name
   * @protected
   */
  createAndRegisterFormControls() {
    const control = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl(null, {
      updateOn: 'blur'
    });
    this.form.registerControl(this.name, control);
  }
  /**
   * This method allows components to generate a value manageable in FormControl from the original value (set by setValue ())
   * By default the same value is used
   * @param val
   */
  transformToFormGroupValue(val) {
    return val;
  }
  /**
   * From the values in FormControl to a value manageable by the Dont-code Framework. Will be called by getValue
   * By default the same value is used
   * @param val
   */
  transformFromFormGroupValue(val) {
    return val;
  }
  /**
   * Updates the form with the value
   */
  hydrateValueToForm() {
    if (this.name != null) {
      const control = this.form.get(this.name);
      if (control == null) {
        throw new Error("No form control for the name " + this.name);
      } else {
        const formValue = this.transformToFormGroupValue(this.value);
        control.setValue(formValue, {
          emitEvent: false
        });
      }
    }
  }
  /**
   * Retrieve value from the Angular form, and converts it to a value that can be stored
   * @return true if value have been updated
   */
  updateValueFromForm() {
    if (this.name == null) return false;
    const control = this.form.get(this.name);
    if (control == null) {
      throw new Error("No form control for the name " + this.name);
    } else {
      if (control.dirty) {
        this.value = this.transformFromFormGroupValue(control.value);
        control.markAsPristine({
          onlySelf: true
        });
        return true;
      }
    }
    return false;
  }
  /**
   * Returns a string that can best display the value or null if it's already a string
   * @param value
   */
  static toBeautifyString(value, maxLength) {
    if (value == null) return null;
    let ret = "";
    if (Array.isArray(value)) {
      value = value[0];
    }
    // Try to see if we have json or Date or something else
    switch (typeof value) {
      case "string":
        {
          ret = value;
          break;
        }
      case "object":
        {
          if (value instanceof Date) {
            ret = value.toLocaleDateString();
          } else {
            ret = JSON.stringify(value, null, 2);
          }
          break;
        }
      case "undefined":
        {
          break;
        }
      default:
        {
          ret = value.toLocaleString();
        }
    }
    if (maxLength != null) {
      if (ret.length > maxLength) {
        ret = ret.substring(0, maxLength - 3) + '...';
      }
    }
    return ret;
  }
  listEventSources() {
    return [];
  }
  selectEventSourceFor(type, name) {
    const sources = this.listEventSources();
    for (const src of sources) {
      if (src.type === type) {
        if (name == null) return src;else if (src.name == name) {
          return src;
        }
      }
    }
    return null;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
AbstractDynamicComponent.ɵfac = function AbstractDynamicComponent_Factory(t) {
  return new (t || AbstractDynamicComponent)();
};
AbstractDynamicComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: AbstractDynamicComponent,
  selectors: [["ng-component"]],
  decls: 0,
  vars: 0,
  template: function AbstractDynamicComponent_Template(rf, ctx) {},
  encapsulation: 2
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AbstractDynamicComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
    args: [{
      template: ''
    }]
  }], null, null);
})();

/***/ }),

/***/ 6093:
/*!*********************************************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/common-ui/abstract-dynamic-loader-component.mjs ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractDynamicLoaderComponent": () => (/* binding */ AbstractDynamicLoaderComponent),
/* harmony export */   "DynamicInsertPoint": () => (/* binding */ DynamicInsertPoint),
/* harmony export */   "SubFieldInfo": () => (/* binding */ SubFieldInfo)
/* harmony export */ });
/* harmony import */ var _abstract_dynamic_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abstract-dynamic-component */ 561);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 7527);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 5527);
/* harmony import */ var _common_dynamic_component_loader_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common-dynamic/component-loader.service */ 2004);






/** A component must be attached to a insertionpoint in the template **/
class DynamicInsertPoint {}
DynamicInsertPoint.ɵfac = function DynamicInsertPoint_Factory(t) {
  return new (t || DynamicInsertPoint)();
};
DynamicInsertPoint.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: DynamicInsertPoint,
  selectors: [["dtcde-dynamic"]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DynamicInsertPoint, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'dtcde-dynamic'
    }]
  }], null, null);
})();
/**
 * A component that can be dynamically loaded by the dont-code framework, and can dynamically load subcomponents
 * It can integrate with the reactive form or not depending on calling setForm () or not.
 *
 * Components that dynamically loads other components must at least define an insertion point by using this <dtcde-dynamic></dtcde-dynamic>
 */
class AbstractDynamicLoaderComponent extends _abstract_dynamic_component__WEBPACK_IMPORTED_MODULE_2__.AbstractDynamicComponent {
  constructor(loader, injector, ref) {
    super();
    this.loader = loader;
    this.injector = injector;
    this.ref = ref;
    /**
     * Manages the components that are bound to the form
     */
    this.fields = new Array();
    /**
     * Stores the position of subField in fields depending on its name
     * @protected
     */
    this.fieldsMap = new Map();
    this.parentForm = null;
    /**
     * Any action that needs to happen after ngAfterViewInit can be added to this.
     * @protected
     */
    this.componentInited = new rxjs__WEBPACK_IMPORTED_MODULE_3__.ReplaySubject();
  }
  /**
   * Define that a subvalue named propertyAndFormName will be managed by a subcomponent of type type
   * Example: defineSubFields ('currencyCode', 'Currency') will handle a plugin to manage the currency
   * @param formName
   * @param type
   */
  defineSubField(propertyAndFormName, type) {
    const newSubField = new SubFieldInfo(propertyAndFormName, type);
    this.addSubField(newSubField);
  }
  /**
   * Retrieve the information of the subfield at the given name.
   * @param propertyAndFormName
   * @protected
   */
  getSubField(propertyAndFormName) {
    const pos = this.fieldsMap.get(propertyAndFormName);
    if (pos != null) return this.fields[pos];else return;
  }
  addSubField(toAdd) {
    const pos = this.fields.push(toAdd);
    this.fieldsMap.set(toAdd.name, pos - 1);
    return pos;
  }
  getSubFields() {
    return this.fields;
  }
  /**
   * This component will load subfields, so unless it doesn't have a name, it creates a new FormGroup
   * @param form
   */
  setForm(form) {
    // Register a FormGroup for this component has it will have to manage values from subFields as well
    if (this.name) {
      const formGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroup({}, {
        updateOn: 'blur'
      });
      form.registerControl(this.name, formGroup);
      super.setForm(formGroup);
      this.parentForm = form;
    } else {
      super.setForm(form);
      this.parentForm = null;
    }
    this.preloadSubFields();
  }
  hydrateValueToForm() {
    // Don't try to update the form as if it is a standard component
    // as most likely we have created a new FormGroup
    if (this.parentForm == null) super.hydrateValueToForm();else {
      let formValue = this.transformToFormGroupValue(this.value);
      // Sets the form value that are not managed directly by a field
      for (const key in this.form.controls) {
        if (this.fieldsMap.get(key) == null) {
          const control = this.form.get(key);
          control?.setValue(formValue ? formValue[key] : formValue, {
            emitEvent: false
          });
        }
      }
    }
  }
  updateValueFromForm() {
    if (this.parentForm == null) return super.updateValueFromForm();else {
      let isChanged = false;
      // Sets the form value that are not managed directly by a field
      for (const key in this.form.controls) {
        if (this.fieldsMap.get(key) == null) {
          const control = this.form.get(key);
          if (control != null) {
            if (control.dirty) {
              const value = this.transformFromFormGroupValue(control?.value);
              if (this.value == null) {
                this.value = {};
              }
              this.value[key] = value;
              isChanged = true;
              control.markAsPristine({
                onlySelf: true
              });
            }
          }
        }
      }
      return isChanged;
    }
  }
  setValue(val) {
    super.setValue(val);
    // Split the value into its subcomponents
    for (const element of this.fields) {
      if (val != null) this.setSubFieldValue(element, val[element.name]);else this.setSubFieldValue(element, undefined);
    }
  }
  getValue() {
    let val = super.getValue();
    // Adds subfield values into the main value
    for (const element of this.fields) {
      const subFieldValue = this.getSubFieldValue(element);
      if (subFieldValue != null && val == null) {
        this.value = {};
        val = this.value;
      }
      if (val[element.name] !== subFieldValue) val[element.name] = subFieldValue;
    }
    return val;
  }
  /**
   * Retrieve the fulledittemplate for a subfield
   * * @param formName
   */
  subFieldFullEditTemplate(subField) {
    const subInfo = typeof subField === 'string' ? this.getSubField(subField) : subField;
    const component = subInfo?.component;
    let ret = null;
    if (component != null) {
      ret = component.providesTemplates(subInfo?.type).forFullEdit;
    }
    if (subField == null) throw new Error("No template for subField " + subInfo?.name + " of component " + this.name);else return ret;
  }
  /**
   * Retrieve the fulledittemplate for a subfield
   * * @param formName
   */
  subFieldInlineViewTemplate(subField) {
    const subInfo = typeof subField === 'string' ? this.getSubField(subField) : subField;
    const component = subInfo?.component;
    let ret = null;
    if (component != null) {
      ret = component.providesTemplates(subInfo?.type).forInlineView;
    }
    if (subField == null) throw new Error("No template for subField " + subInfo?.name + " of component " + this.name);else return ret;
  }
  /**
   * Retrieve the fullviewtemplate for a subfield
   * * @param formName
   */
  subFieldFullViewTemplate(subField) {
    const subInfo = typeof subField === 'string' ? this.getSubField(subField) : subField;
    const component = subInfo?.component;
    let ret = null;
    if (component != null) {
      ret = component.providesTemplates(subInfo?.type).forFullView;
    }
    if (subField == null) throw new Error("No template for subField " + subInfo?.name + " of component " + this.name);else return ret;
  }
  /**
   * Dynamically loads the component to handle the subfield
   * @param formName
   * @param type
   * @param subValue
   */
  loadSubField(subField, type, subValue) {
    const subInfo = typeof subField === 'string' ? this.getSubField(subField) : subField;
    const component = subInfo?.component;
    if (component == null) {
      return this.loader.insertComponentForFieldType(type, this.dynamicInsertPoint).then(component => {
        if (component != null) {
          this.prepareComponent(component, type, subInfo != null ? subInfo.name : null, subValue);
          return component;
        } else {
          return null;
        }
      });
    } else {
      return Promise.resolve(component);
    }
  }
  /**
   * Retrieve the subField value from the component handling it
   * @param formName
   * @param type
   */
  getSubFieldValue(subField) {
    const subInfo = typeof subField === 'string' ? this.getSubField(subField) : subField;
    const component = subInfo?.component;
    if (component != null) {
      return component.getValue();
    } else {
      // No component is handling this subField so we have to do it ourselves
      if (this.form != null && subInfo != null) {
        return this.form.get(subInfo.name)?.value;
      } else {
        throw new Error('Cannot provide value for non existent subField ' + subField);
      }
    }
  }
  /**
   * Programmatically sets the value of the component handling the subfield
   * @param formName
   * @param type
   * @param val
   */
  setSubFieldValue(subField, val) {
    const subInfo = typeof subField === 'string' ? this.getSubField(subField) : subField;
    const component = subInfo?.component;
    // Sometimes no subcomponent is loaded, for example when displaying value only
    if (component != null) {
      component.setValue(val);
    } else {
      // No components will manage the value, so let's transform it to a displayable string
      if (this.form != null && subInfo != null) {
        const singleVal = {};
        let updatedValue = AbstractDynamicLoaderComponent.toBeautifyString(val);
        if (updatedValue == undefined)
          // You cannot set a value to undefined
          updatedValue = null;
        singleVal[subInfo.name] = updatedValue;
        this.form.patchValue(singleVal, {
          emitEvent: false
        });
      }
    }
  }
  /**
   * Loads the component that will handle the display and edit for the item at the specified position
   * @param position: Either the schemaPosition as string or as DontCodeModelPointer
   * @param currentJson
   */
  loadSubComponent(position, type, formName, currentJson) {
    // Make sure you wait until the component itself is init (and the dynamicInsertPoint is valid)
    return new Promise((resolve, reject) => this.componentInited.subscribe({
      complete: () => {
        resolve();
      },
      error: err => {
        reject(err);
      }
    })).then(() => {
      //console.debug("LoadSubComponent:"+position.position+' with type '+type+', dynamicInsertPoint is ', (this.dynamicInsertPoint!=null));
      if (this.dynamicInsertPoint == null) {
        return null;
      }
      return this.loader.insertComponent(position, this.dynamicInsertPoint, currentJson).then(component => {
        if (component != null) {
          return this.prepareComponent(component, type, formName, currentJson);
        } else {
          //console.warn('No ComponentFactory or missing <dtcde-dynamic></dtcde-dynamic> in template');
          return null;
        }
      });
    });
  }
  prepareComponent(component, type, formName, subValue) {
    // Manages dynamic forms if needed
    if (formName) {
      /*if (!this.form)
        throw new Error(
          'Cannot prepare a subField component without a FormGroup'
        );*/
      // Tells the component he's part of a form
      if (this.form != null) {
        component.setName(formName);
        component.setForm(this.form);
      }
      component.setValue(subValue);
    }
    return component;
  }
  applyComponentToSubField(component, type, formName) {
    let info = this.getSubField(formName);
    if (info == null) {
      info = new SubFieldInfo(formName, type, component);
      this.addSubField(info);
      return true;
    } else {
      info.component = component;
      return false;
    }
  }
  ngAfterViewInit() {
    //    console.debug ("DynamicInsertPoint for "+this.constructor.name, this.dynamicInsertPoint);
    this.componentInited.complete();
    this.preloadSubFields();
  }
  preloadSubFields() {
    if (this.dynamicInsertPoint != null) {
      let detectCheckDone = false;
      for (const element of this.fields) {
        if (element.component == null) {
          const valueSafe = this.value ? this.value[element.name] : undefined;
          this.loadSubField(element.name, element.type, valueSafe).then(component => {
            if (component != null) {
              this.applyComponentToSubField(component, element.type, element.name);
            }
            if (this.value != null && !detectCheckDone) {
              this.ref.detectChanges();
              detectCheckDone = true;
            }
          });
        }
      }
    }
  }
}
AbstractDynamicLoaderComponent.ɵfac = function AbstractDynamicLoaderComponent_Factory(t) {
  return new (t || AbstractDynamicLoaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_common_dynamic_component_loader_service__WEBPACK_IMPORTED_MODULE_4__.ComponentLoaderService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef));
};
AbstractDynamicLoaderComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: AbstractDynamicLoaderComponent,
  selectors: [["ng-component"]],
  viewQuery: function AbstractDynamicLoaderComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](DynamicInsertPoint, 5, _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.dynamicInsertPoint = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  decls: 0,
  vars: 0,
  template: function AbstractDynamicLoaderComponent_Template(rf, ctx) {},
  encapsulation: 2
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AbstractDynamicLoaderComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      template: ''
    }]
  }], function () {
    return [{
      type: _common_dynamic_component_loader_service__WEBPACK_IMPORTED_MODULE_4__.ComponentLoaderService
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }];
  }, {
    dynamicInsertPoint: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: [DynamicInsertPoint, {
        read: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef,
        static: false
      }]
    }]
  });
})();
/**
 * Store information to configure a subfield
 */
class SubFieldInfo {
  constructor(name, type, comp) {
    this.name = name;
    this.type = type;
    this.component = comp;
  }
}

/***/ }),

/***/ 6864:
/*!****************************************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/common-ui/abstract-reference.component.mjs ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractReferenceComponent": () => (/* binding */ AbstractReferenceComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dontcode/core */ 9130);
/* harmony import */ var _abstract_dynamic_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./abstract-dynamic-component */ 561);
/* harmony import */ var _template_list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./template-list */ 1313);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 1211);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 224);
/* harmony import */ var _dynamic_event__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dynamic-event */ 9519);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 1395);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/dropdown */ 8905);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/api */ 1295);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 7527);













/**
 * A Component that let the user select from a list of entities
 */
const _c0 = ["inlineView"];
const _c1 = ["fullEditView"];
function AbstractReferenceComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1.value);
  }
}
function AbstractReferenceComponent_ng_template_2_ng_container_0_ng_template_2_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r7.value, " ");
  }
}
function AbstractReferenceComponent_ng_template_2_ng_container_0_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, AbstractReferenceComponent_ng_template_2_ng_container_0_ng_template_2_div_0_Template, 2, 1, "div", 7);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5.value);
  }
}
function AbstractReferenceComponent_ng_template_2_ng_container_0_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const reference_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", reference_r8, " ");
  }
}
function AbstractReferenceComponent_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p-dropdown", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onChange", function AbstractReferenceComponent_ng_template_2_ng_container_0_Template_p_dropdown_onChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r9.valueChanged($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, AbstractReferenceComponent_ng_template_2_ng_container_0_ng_template_2_Template, 1, 1, "ng-template", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, AbstractReferenceComponent_ng_template_2_ng_container_0_ng_template_3_Template, 1, 1, "ng-template", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx_r4.form);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("options", ctx_r4.options)("formControlName", ctx_r4.name)("filter", true)("showClear", true)("lazy", true);
  }
}
function AbstractReferenceComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, AbstractReferenceComponent_ng_template_2_ng_container_0_Template, 4, 6, "ng-container", 2);
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r3.form);
  }
}
class AbstractReferenceComponent extends _abstract_dynamic_component__WEBPACK_IMPORTED_MODULE_6__.AbstractDynamicComponent {
  constructor(modelMgr, storeMgr) {
    super();
    this.modelMgr = modelMgr;
    this.storeMgr = storeMgr;
    this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /**
     * The json path to list the entities, ending with the property to use as a key and display (for example: $.creation.sources.name), to be provided by derived classes
     * @protected
     */
    this.targetEntitiesPos = null;
    this.targetEntitiesProperty = null;
    this.options = new Array();
    // When loaded by Federation, sometimes the dtcde components are not injected.
    if (modelMgr == null) this.modelMgr = _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.dtcde.getModelManager();
    if (storeMgr == null) this.storeMgr = _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.dtcde.getStoreManager();
  }
  canProvide(key) {
    return new _template_list__WEBPACK_IMPORTED_MODULE_7__.PossibleTemplateList(true, false, true);
  }
  providesTemplates(key) {
    return new _template_list__WEBPACK_IMPORTED_MODULE_7__.TemplateList(this.inlineView, null, this.fullEditView);
  }
  setTargetEntitiesWithName(entityName, propertyName) {
    // We must find the list of possible shops
    const queryResult = this.modelMgr.queryModelToSingle("$.creation.entities[?(@.name=='" + entityName + "')]");
    if (queryResult == null) {
      console.error("Cannot find an entity with name " + entityName + " in the model.");
      throw new Error("Cannot find an entity with name " + entityName + " in the model.");
    }
    this.targetEntitiesPos = queryResult.pointer;
    if (this.targetEntitiesPos == null) return Promise.resolve(false);else {
      this.targetEntitiesProperty = propertyName ?? null;
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.firstValueFrom)(this.possibleValues()).then(value => {
        this.options = value;
        return true;
      });
    }
  }
  possibleValues() {
    if (this.targetEntitiesPos == null) throw new Error('Missing query of target entity for class ' + this.constructor.name);
    const models = this.storeMgr.searchEntities(this.targetEntitiesPos);
    if (this.targetEntitiesProperty != null) {
      const property = this.targetEntitiesProperty;
      return models.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(loadedModels => {
        return loadedModels.map(model => model[property]);
      }));
    } else return models;
  }
  listEventSources() {
    const ret = super.listEventSources();
    ret.push(new _dynamic_event__WEBPACK_IMPORTED_MODULE_10__.BaseDynamicEventSource("Value", _dynamic_event__WEBPACK_IMPORTED_MODULE_10__.DynamicEventType.VALUE_CHANGE, this.valueChange.asObservable()));
    return ret;
  }
  valueChanged($event) {
    this.valueChange.emit(new _dynamic_event__WEBPACK_IMPORTED_MODULE_10__.BaseDynamicEvent("Value", _dynamic_event__WEBPACK_IMPORTED_MODULE_10__.DynamicEventType.VALUE_CHANGE, $event.value));
  }
  setValue(val) {
    if (val != null && this.options != null && this.options.findIndex(value => {
      return value == val;
    }) == -1) {
      if (this.options[0] !== 'Error') {
        // throw new Error ("erferf");
      }
      if (this.options[1] != null) {
        val = this.options[1].toString();
      } else {
        //throw new Error ("ERerferf");
      }
      /*     if( (typeof val ==='string')&&(val!=='Shop EP')&&(val!=='Shop GW')) {
             throw new Error ("Error of the death");
           } else if (typeof val !== 'string') {
             throw new Error ("Error of the death");
           }*/
      /*if( this.counter>=1) {
      }*/
    }
    super.setValue(val);
  }
}
AbstractReferenceComponent.ɵfac = function AbstractReferenceComponent_Factory(t) {
  return new (t || AbstractReferenceComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModelManager, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeStoreManager, 8));
};
AbstractReferenceComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: AbstractReferenceComponent,
  selectors: [["dontcode-reference"]],
  viewQuery: function AbstractReferenceComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.inlineView = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.fullEditView = _t.first);
    }
  },
  outputs: {
    valueChange: "valueChange"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  decls: 4,
  vars: 0,
  consts: [["inlineView", ""], ["fullEditView", ""], [3, "formGroup", 4, "ngIf"], [3, "formGroup"], ["placeholder", "Select a reference", 3, "options", "formControlName", "filter", "showClear", "lazy", "onChange"], ["pTemplate", "selectedItem"], ["pTemplate", "item"], [4, "ngIf"]],
  template: function AbstractReferenceComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, AbstractReferenceComponent_ng_template_0_Template, 1, 1, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, AbstractReferenceComponent_ng_template_2_Template, 1, 1, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, primeng_dropdown__WEBPACK_IMPORTED_MODULE_3__.Dropdown, primeng_api__WEBPACK_IMPORTED_MODULE_4__.PrimeTemplate, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlName],
  changeDetection: 0
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AbstractReferenceComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'dontcode-reference',
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      template: "<ng-template #inlineView>{{this.value}}</ng-template>\n<ng-template #fullEditView>\n  <ng-container *ngIf=\"form\" [formGroup]=\"form!\">\n    <p-dropdown [options]=\"options\" [formControlName]=\"name\" [filter]=\"true\" [showClear]=\"true\" placeholder=\"Select a reference\" (onChange)=\"valueChanged ($event)\" [lazy]=\"true\">\n      <ng-template pTemplate=\"selectedItem\">\n        <div *ngIf=\"this.value\">\n          {{this.value}}\n        </div>\n      </ng-template>\n      <ng-template let-reference pTemplate=\"item\">\n        {{reference}}\n      </ng-template>\n    </p-dropdown>\n  </ng-container>\n</ng-template>\n"
    }]
  }], function () {
    return [{
      type: _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModelManager,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeStoreManager,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }];
  }, {
    inlineView: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['inlineView', {
        static: true
      }]
    }],
    fullEditView: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['fullEditView', {
        static: true
      }]
    }],
    valueChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }]
  });
})();

/***/ }),

/***/ 9519:
/*!*************************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/common-ui/dynamic-event.mjs ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseDynamicEvent": () => (/* binding */ BaseDynamicEvent),
/* harmony export */   "BaseDynamicEventSource": () => (/* binding */ BaseDynamicEventSource),
/* harmony export */   "DynamicEventType": () => (/* binding */ DynamicEventType)
/* harmony export */ });
class BaseDynamicEventSource {
  constructor(name, type, eventSource) {
    this.name = name;
    this.type = type;
    this.eventSource = eventSource;
  }
}
var DynamicEventType;
(function (DynamicEventType) {
  DynamicEventType["VALUE_CHANGE"] = "VALUE_CHANGE";
  DynamicEventType["SELECTION_CHANGE"] = "SELECTION_CHANGE";
})(DynamicEventType || (DynamicEventType = {}));
class BaseDynamicEvent {
  constructor(name, type, value) {
    this.name = name;
    this.type = type;
    this.value = value;
  }
}

/***/ }),

/***/ 9850:
/*!*********************************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/common-ui/pipes/beautifier.pipe.mjs ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BeautifierPipe": () => (/* binding */ BeautifierPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _plugin_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../plugin-base.component */ 2577);



/**
 * Converts any object to a nice string to be displayed in html
 */
class BeautifierPipe {
  transform(value, ...args) {
    return _plugin_base_component__WEBPACK_IMPORTED_MODULE_1__.PluginBaseComponent.toBeautifyString(value, args[0]);
  }
}
BeautifierPipe.ɵfac = function BeautifierPipe_Factory(t) {
  return new (t || BeautifierPipe)();
};
BeautifierPipe.ɵpipe = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
  name: "beautifier",
  type: BeautifierPipe,
  pure: true
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BeautifierPipe, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Pipe,
    args: [{
      name: 'beautifier',
      pure: true
    }]
  }], null, null);
})();

/***/ }),

/***/ 2577:
/*!*********************************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/common-ui/plugin-base.component.mjs ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PluginBaseComponent": () => (/* binding */ PluginBaseComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dontcode/core */ 9130);
/* harmony import */ var _abstract_dynamic_loader_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./abstract-dynamic-loader-component */ 6093);
/* harmony import */ var _common_handler_plugin_handler_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common-handler/plugin-handler-helper */ 7252);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 7527);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 224);
/* harmony import */ var _common_dynamic_component_loader_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common-dynamic/component-loader.service */ 2004);








/**
 * A component that can be loaded by the framework, load subcomponents, listen to model changes, and so on...
 * It can as well dynamically manage a list of subcomponents and a form together with its mapping to a value.
 */
class PluginBaseComponent extends _abstract_dynamic_loader_component__WEBPACK_IMPORTED_MODULE_3__.AbstractDynamicLoaderComponent {
  constructor(loader, injector, ref) {
    super(loader, injector, ref);
    this.pluginHelper = new _common_handler_plugin_handler_helper__WEBPACK_IMPORTED_MODULE_4__.PluginHandlerHelper();
    this.entityPointer = null;
    this.provider = null;
  }
  ngOnDestroy() {
    this.pluginHelper.unsubscribe();
    super.ngOnDestroy();
  }
  /**
   * Listen to this.form updates and update this.value accordingly
   * @protected
   */
  updateValueOnFormChanges() {
    this.subscriptions.add(this.form.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(value => {
      //console.debug("Value changed", value);
      // Force the recalculation of the data from the form
      this.getValue();
      return value;
    })).subscribe());
  }
  initCommandFlow(provider, pointer) {
    this.entityPointer = pointer;
    this.provider = provider;
    this.pluginHelper.initCommandFlow(provider, pointer, this);
  }
  initChangeListening(subElement) {
    this.pluginHelper.initChangeListening(subElement);
  }
  /**
   * When the component is created for display, it receives the initial data as complete Json.
   * If it wants, it can call this method who will call handleChange for each property.
   * This will avoid to duplicate code (first time when a complete json is sent, second when subelements are sent)
   * @protected
   */
  decomposeJsonToMultipleChanges(pointer, json) {
    this.pluginHelper.decomposeJsonToMultipleChanges(pointer, json);
  }
  /**
   * Retrieve the value of the key property if the change concerns it
   * @param change
   * @param key
   */
  decodeStringField(change, key) {
    if (change.pointer?.lastElement === key) {
      return change.value;
    } else return undefined;
  }
  /**
   * Updates the array of T elements by applying the changes received and calling the transform method
   * @param target
   * @param targetMap
   * @param change
   * @param property
   * @param transform
   * @param parentPosition
   * @param applyProperty
   * @private
   */
  applyUpdatesToArray(target, targetMap, change, property, transform, parentPosition, applyProperty) {
    return this.applyUpdatesToArrayAsync(target, targetMap, change, property, (key, item) => {
      return Promise.resolve(transform(key, item));
    }, parentPosition);
  }
  /**
   * Updates the array of T elements by applying the changes received and calling the transform method
   * @param target
   * @param targetMap
   * @param change
   * @param property
   * @param transform
   * @param parentPosition
   * @param applyProperty
   * @private
   */
  applyUpdatesToArrayAsync(target, targetMap, change, property, transform, parentPosition, applyProperty) {
    return this.pluginHelper.applyUpdatesToArrayAsync(target, targetMap, change, property, transform, parentPosition, applyProperty);
  }
  /**
   * Dynamically manages the list of subFields (and sub components) based on the change.
   * @param change
   * @protected
   */
  updateSubFieldsWithChange(change, subProperty, parentPosition) {
    return this.applyUpdatesToArrayAsync(this.fields, this.fieldsMap, change, subProperty, (position, value) => {
      return this.loadSubComponent(position, value.type, value.name).then(component => {
        return new _abstract_dynamic_loader_component__WEBPACK_IMPORTED_MODULE_3__.SubFieldInfo(value.name, value.type, component ?? undefined);
      });
    }, parentPosition, (elt, key, newVal) => {
      switch (key) {
        case _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModel.APP_FIELDS_NAME_NODE:
          elt.name = newVal;
          break;
        default:
          return false;
      }
      return true;
    }).then(updatedFields => {
      this.fields = updatedFields;
      this.rebuildForm();
      return updatedFields;
    });
  }
  /**
   * Rebuild the Reactive form from the list of fields configured with the entity
   * @protected
   */
  rebuildForm() {
    if (this.form == null)
      // Ignore if the component doesn't have a form
      return;
    // Updates the formgroup with new fields and remove old fields if necessary
    const toRemove = new Set();
    // tslint:disable-next-line:forin
    for (const formKey in this.form.controls) {
      toRemove.add(formKey);
    }
    for (const field of this.fields) {
      let val = null;
      if (this.value && this.value[field.name]) {
        val = this.value[field.name];
      }
      toRemove.delete(field.name);
      // Check if the component manages the FormControl itself or if it relies on us
      if (field.component != null) {
        field.component?.setValue(val);
      } else {
        val = PluginBaseComponent.toBeautifyString(val);
        this.form.registerControl(field.name, new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl(val, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required));
      }
    }
    toRemove.forEach(key => {
      this.form.removeControl(key);
    });
  }
}
PluginBaseComponent.ɵfac = function PluginBaseComponent_Factory(t) {
  return new (t || PluginBaseComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_common_dynamic_component_loader_service__WEBPACK_IMPORTED_MODULE_6__.ComponentLoaderService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef));
};
PluginBaseComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: PluginBaseComponent,
  selectors: [["ng-component"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  decls: 0,
  vars: 0,
  template: function PluginBaseComponent_Template(rf, ctx) {},
  encapsulation: 2
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PluginBaseComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      template: ''
    }]
  }], function () {
    return [{
      type: _common_dynamic_component_loader_service__WEBPACK_IMPORTED_MODULE_6__.ComponentLoaderService
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }];
  }, null);
})();

/***/ }),

/***/ 1313:
/*!*************************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/common-ui/template-list.mjs ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PossibleTemplateList": () => (/* binding */ PossibleTemplateList),
/* harmony export */   "TemplateList": () => (/* binding */ TemplateList)
/* harmony export */ });
class TemplateList {
  constructor(forInlineView, forFullView, forFullEdit) {
    this.forInlineView = forInlineView;
    this.forFullView = forFullView;
    this.forFullEdit = forFullEdit;
  }
}
class PossibleTemplateList {
  constructor(forInlineView, forFullView, forFullEdit) {
    this.forInlineView = forInlineView;
    this.forFullView = forFullView;
    this.forFullEdit = forFullEdit;
  }
}

/***/ }),

/***/ 2288:
/*!*****************************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/common-values/value.service.mjs ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValueService": () => (/* binding */ ValueService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dontcode/core */ 9130);



/**
 * Stores and constantly updates the json (as an instance of the DontCodeSchema) as it is being edited / modified through Change events
 * It's a wrapper around DontCodeModelManager
 * It does not store the entity values but the description of entities, screens... as defined in the Editor
 */
class ValueService {
  constructor(modelMgr) {
    this.modelMgr = modelMgr;
  }
  getContent() {
    return this.modelMgr.getContent();
  }
  /**
   * Resets the current json content to the one given in parameter
   * @param newContent
   */
  resetContent(newContent) {
    this.modelMgr.resetContent(newContent);
  }
  /**
   * Subscribes to the Subject in parameter to receive model updates through changes.
   * Changes are generated by the Editor as the user modifies the application.
   * It then modifies it's internal json to be up to date.
   * @param receivedCommands
   * @deprecated in favor of applyChange
   */
  /*  receiveUpdatesFrom(receivedCommands: Subject<Change>): void {
      this.model.receiveUpdatesFrom(receivedCommands);
    }
  */
  /**
   * Apply the change to the model and returns the list of subchanges implied by it
   * @param chg
   */
  /*  applyChange (chg: Change): Change[] {
      return this.modelMgr.applyChange(chg);
    }*/
  /**
   * Provides the json extract at the given position.
   * For example, findAtPosition ('creation/entities/a') will returns the description (fields...) of the first entity created with the editor
   * @param position
   * @param create
   */
  findAtPosition(position, create) {
    return this.modelMgr.findAtPosition(position, create);
  }
  /**
   * Enable querying the model for any value, following jsonPath model
   * To use when potentially you expect multiple values
   * @param query: the query as a jsonPath
   * @param position: in case the jsonPath is relative
   */
  queryModelToArray(query, position) {
    return this.modelMgr.queryModelToArray(query, position);
  }
  /**
   * Enable querying the model for any value, following jsonPath model
   * To use when potentially you expect a single value.
   * @param query: the query as a  jsonPath
   * @param position: in case the jsonPath is relative
   */
  queryModelToSingle(query, position) {
    return this.modelMgr.queryModelToSingle(query, position);
  }
  /**
   * Returns the list of values that are possible target of a given property path. With this the Builder User Interface can display to the user a combo-box will all targets
   * For example, with the following model:
   * "from": {
   *           "type": "string",
   *           "format": "$.creation.sources.name"
   *         }
   *
   * findAllPossibleTargetsOrProperty ("from", ...) will returns all sources names.
   * @param property
   * @param position
   * @param schemaItem
   */
  findAllPossibleTargetsOfProperty(property, position, schemaItem) {
    return this.modelMgr.findAllPossibleTargetsOfProperty(property, position, schemaItem);
  }
  /**
   * Returns the exact element that matches the target of a given property path.
   *
   * For example, with the following Dont-code model:
   * "from": {
   *           "type": "string",
   *           "format": "$.creation.sources.name"
   *         }
   *
   * and an instantiated model like this:
   * {
   *   "from": "EntityName"
   * }
   * findAllPossibleTargetsOrProperty ("from", ...) will return only the source named "EntityName".
   * @param property
   * @param position
   * @param schemaItem
   */
  findTargetOfProperty(property, position, schemaItem) {
    return this.modelMgr.findTargetOfProperty(property, position, schemaItem);
  }
}
ValueService.ɵfac = function ValueService_Factory(t) {
  return new (t || ValueService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModelManager));
};
ValueService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: ValueService,
  factory: ValueService.ɵfac,
  providedIn: 'root'
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ValueService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [{
      type: _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModelManager
    }];
  }, null);
})();

/***/ }),

/***/ 3080:
/*!***************************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/plugin-common-test.module.mjs ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommonTestManager": () => (/* reexport safe */ _common_test_common_test_manager__WEBPACK_IMPORTED_MODULE_3__.CommonTestManager),
/* harmony export */   "PluginCommonTestModule": () => (/* binding */ PluginCommonTestModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 1395);
/* harmony import */ var _plugin_common_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plugin-common.module */ 4264);
/* harmony import */ var _common_test_common_test_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common-test/common-test-manager */ 8149);




class PluginCommonTestModule {
  exposedPreviewHandlers() {
    return PluginCommonTestModule.previewHandlers;
  }
}
PluginCommonTestModule.previewHandlers = new Map();
PluginCommonTestModule.ɵfac = function PluginCommonTestModule_Factory(t) {
  return new (t || PluginCommonTestModule)();
};
PluginCommonTestModule.ɵmod = function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵregisterNgModuleType"](PluginCommonTestModule, 'dontcode-plugin/common-test-module');
  return /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: PluginCommonTestModule,
    id: 'dontcode-plugin/common-test-module'
  });
}();
PluginCommonTestModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _plugin_common_module__WEBPACK_IMPORTED_MODULE_2__.PluginCommonModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PluginCommonTestModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _plugin_common_module__WEBPACK_IMPORTED_MODULE_2__.PluginCommonModule],
      declarations: [],
      exports: [],
      id: 'dontcode-plugin/common-test-module'
    }]
  }], null, null);
})();


/***/ }),

/***/ 4264:
/*!**********************************************************************************!*\
  !*** ../../libs/ng-common/dist/libs/common/esm2020/lib/plugin-common.module.mjs ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractDynamicComponent": () => (/* reexport safe */ _common_ui_abstract_dynamic_component__WEBPACK_IMPORTED_MODULE_14__.AbstractDynamicComponent),
/* harmony export */   "AbstractDynamicLoaderComponent": () => (/* reexport safe */ _common_ui_abstract_dynamic_loader_component__WEBPACK_IMPORTED_MODULE_7__.AbstractDynamicLoaderComponent),
/* harmony export */   "AbstractPluginHandler": () => (/* reexport safe */ _common_handler_abstract_plugin_handler__WEBPACK_IMPORTED_MODULE_9__.AbstractPluginHandler),
/* harmony export */   "AbstractReferenceComponent": () => (/* reexport safe */ _common_ui_abstract_reference_component__WEBPACK_IMPORTED_MODULE_8__.AbstractReferenceComponent),
/* harmony export */   "BaseDynamicEvent": () => (/* reexport safe */ _common_ui_dynamic_event__WEBPACK_IMPORTED_MODULE_13__.BaseDynamicEvent),
/* harmony export */   "BaseDynamicEventSource": () => (/* reexport safe */ _common_ui_dynamic_event__WEBPACK_IMPORTED_MODULE_13__.BaseDynamicEventSource),
/* harmony export */   "BeautifierPipe": () => (/* reexport safe */ _common_ui_pipes_beautifier_pipe__WEBPACK_IMPORTED_MODULE_6__.BeautifierPipe),
/* harmony export */   "CHANNEL_CHANGE_NAME": () => (/* reexport safe */ _common_config_common_lib_config__WEBPACK_IMPORTED_MODULE_18__.CHANNEL_CHANGE_NAME),
/* harmony export */   "COMMAND_PROVIDER": () => (/* reexport safe */ _common_global_globals__WEBPACK_IMPORTED_MODULE_5__.COMMAND_PROVIDER),
/* harmony export */   "CommonConfigService": () => (/* reexport safe */ _common_config_common_config_service__WEBPACK_IMPORTED_MODULE_19__.CommonConfigService),
/* harmony export */   "ComponentLoaderService": () => (/* reexport safe */ _common_dynamic_component_loader_service__WEBPACK_IMPORTED_MODULE_16__.ComponentLoaderService),
/* harmony export */   "DONT_CODE_COMMON_CONFIG": () => (/* reexport safe */ _common_global_globals__WEBPACK_IMPORTED_MODULE_5__.DONT_CODE_COMMON_CONFIG),
/* harmony export */   "DONT_CODE_CORE": () => (/* reexport safe */ _common_global_globals__WEBPACK_IMPORTED_MODULE_5__.DONT_CODE_CORE),
/* harmony export */   "DynamicEventType": () => (/* reexport safe */ _common_ui_dynamic_event__WEBPACK_IMPORTED_MODULE_13__.DynamicEventType),
/* harmony export */   "DynamicInsertPoint": () => (/* reexport safe */ _common_ui_abstract_dynamic_loader_component__WEBPACK_IMPORTED_MODULE_7__.DynamicInsertPoint),
/* harmony export */   "EntityListManager": () => (/* reexport safe */ _common_storage_entity_store_service__WEBPACK_IMPORTED_MODULE_15__.EntityListManager),
/* harmony export */   "EntityStoreService": () => (/* reexport safe */ _common_storage_entity_store_service__WEBPACK_IMPORTED_MODULE_15__.EntityStoreService),
/* harmony export */   "PluginBaseComponent": () => (/* reexport safe */ _common_ui_plugin_base_component__WEBPACK_IMPORTED_MODULE_11__.PluginBaseComponent),
/* harmony export */   "PluginCommonModule": () => (/* binding */ PluginCommonModule),
/* harmony export */   "PluginHandlerHelper": () => (/* reexport safe */ _common_handler_plugin_handler_helper__WEBPACK_IMPORTED_MODULE_10__.PluginHandlerHelper),
/* harmony export */   "PossibleTemplateList": () => (/* reexport safe */ _common_ui_template_list__WEBPACK_IMPORTED_MODULE_12__.PossibleTemplateList),
/* harmony export */   "SANDBOX_MENUS": () => (/* reexport safe */ _common_config_common_lib_config__WEBPACK_IMPORTED_MODULE_18__.SANDBOX_MENUS),
/* harmony export */   "SubFieldInfo": () => (/* reexport safe */ _common_ui_abstract_dynamic_loader_component__WEBPACK_IMPORTED_MODULE_7__.SubFieldInfo),
/* harmony export */   "TemplateList": () => (/* reexport safe */ _common_ui_template_list__WEBPACK_IMPORTED_MODULE_12__.TemplateList),
/* harmony export */   "ValueService": () => (/* reexport safe */ _common_values_value_service__WEBPACK_IMPORTED_MODULE_17__.ValueService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1855);
/* harmony import */ var _common_ui_abstract_dynamic_loader_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common-ui/abstract-dynamic-loader-component */ 6093);
/* harmony import */ var _dontcode_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dontcode/core */ 9130);
/* harmony import */ var _common_global_globals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common-global/globals */ 213);
/* harmony import */ var _common_ui_pipes_beautifier_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common-ui/pipes/beautifier.pipe */ 9850);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primeng/dropdown */ 8905);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 7527);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 1395);
/* harmony import */ var _common_ui_abstract_reference_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common-ui/abstract-reference.component */ 6864);
/* harmony import */ var _common_handler_abstract_plugin_handler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common-handler/abstract-plugin-handler */ 6683);
/* harmony import */ var _common_handler_plugin_handler_helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./common-handler/plugin-handler-helper */ 7252);
/* harmony import */ var _common_ui_plugin_base_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./common-ui/plugin-base.component */ 2577);
/* harmony import */ var _common_ui_template_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./common-ui/template-list */ 1313);
/* harmony import */ var _common_ui_dynamic_event__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./common-ui/dynamic-event */ 9519);
/* harmony import */ var _common_ui_abstract_dynamic_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./common-ui/abstract-dynamic-component */ 561);
/* harmony import */ var _common_storage_entity_store_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./common-storage/entity-store.service */ 3824);
/* harmony import */ var _common_dynamic_component_loader_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./common-dynamic/component-loader.service */ 2004);
/* harmony import */ var _common_values_value_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./common-values/value.service */ 2288);
/* harmony import */ var _common_config_common_lib_config__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./common-config/common-lib-config */ 8364);
/* harmony import */ var _common_config_common_config_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./common-config/common-config.service */ 3760);










class PluginCommonModule {
  /**
   * Injects the DontCode core components into Angular's Dependency injection
   * @param config
   */
  static forRoot() {
    return {
      ngModule: PluginCommonModule,
      providers: [{
        provide: _common_global_globals__WEBPACK_IMPORTED_MODULE_5__.DONT_CODE_CORE,
        useValue: _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.dtcde
      }, {
        provide: _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeSchemaManager,
        useValue: _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.dtcde.getSchemaManager()
      }, {
        provide: _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeModelManager,
        useValue: _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.dtcde.getModelManager()
      }, {
        provide: _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodePreviewManager,
        useValue: _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.dtcde.getPreviewManager()
      }, {
        provide: _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeStoreManager,
        useValue: _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.dtcde.getStoreManager()
      }, {
        provide: _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.DontCodeChangeManager,
        useValue: _dontcode_core__WEBPACK_IMPORTED_MODULE_1__.dtcde.getChangeManager()
      }, _common_ui_pipes_beautifier_pipe__WEBPACK_IMPORTED_MODULE_6__.BeautifierPipe]
    };
  }
}
PluginCommonModule.ɵfac = function PluginCommonModule_Factory(t) {
  return new (t || PluginCommonModule)();
};
PluginCommonModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: PluginCommonModule
});
PluginCommonModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_2__.DropdownModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PluginCommonModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, primeng_dropdown__WEBPACK_IMPORTED_MODULE_2__.DropdownModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule],
      declarations: [_common_ui_abstract_dynamic_loader_component__WEBPACK_IMPORTED_MODULE_7__.DynamicInsertPoint, _common_ui_pipes_beautifier_pipe__WEBPACK_IMPORTED_MODULE_6__.BeautifierPipe, _common_ui_abstract_reference_component__WEBPACK_IMPORTED_MODULE_8__.AbstractReferenceComponent],
      exports: [_common_ui_abstract_dynamic_loader_component__WEBPACK_IMPORTED_MODULE_7__.DynamicInsertPoint, _common_ui_pipes_beautifier_pipe__WEBPACK_IMPORTED_MODULE_6__.BeautifierPipe, _common_ui_abstract_reference_component__WEBPACK_IMPORTED_MODULE_8__.AbstractReferenceComponent]
    }]
  }], null, null);
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
//# sourceMappingURL=default-libs_ng-common_dist_libs_common_esm2020_index_mjs.js.map