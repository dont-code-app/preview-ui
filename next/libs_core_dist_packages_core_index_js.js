(self["webpackChunkpreview_ui"] = self["webpackChunkpreview_ui"] || []).push([["libs_core_dist_packages_core_index_js"],{

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

/***/ 258:
/*!********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/Scheduler.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scheduler": () => (/* binding */ Scheduler)
/* harmony export */ });
/* harmony import */ var _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler/dateTimestampProvider */ 8680);

class Scheduler {
  constructor(schedulerActionCtor, now = Scheduler.now) {
    this.schedulerActionCtor = schedulerActionCtor;
    this.now = now;
  }
  schedule(work, delay = 0, state) {
    return new this.schedulerActionCtor(this, work).schedule(state, delay);
  }
}
Scheduler.now = _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_0__.dateTimestampProvider.now;

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

/***/ 1382:
/*!********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/throwError.js ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "throwError": () => (/* binding */ throwError)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Observable */ 8271);
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isFunction */ 4634);


function throwError(errorOrErrorFactory, scheduler) {
  const errorFactory = (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(errorOrErrorFactory) ? errorOrErrorFactory : () => errorOrErrorFactory;
  const init = subscriber => subscriber.error(errorFactory());
  return new _Observable__WEBPACK_IMPORTED_MODULE_1__.Observable(scheduler ? subscriber => scheduler.schedule(init, 0, subscriber) : init);
}

/***/ }),

/***/ 1579:
/*!***************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/timer.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timer": () => (/* binding */ timer)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Observable */ 8271);
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ 1191);
/* harmony import */ var _util_isScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isScheduler */ 8110);
/* harmony import */ var _util_isDate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isDate */ 7258);




function timer(dueTime = 0, intervalOrScheduler, scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__.async) {
  let intervalDuration = -1;
  if (intervalOrScheduler != null) {
    if ((0,_util_isScheduler__WEBPACK_IMPORTED_MODULE_1__.isScheduler)(intervalOrScheduler)) {
      scheduler = intervalOrScheduler;
    } else {
      intervalDuration = intervalOrScheduler;
    }
  }
  return new _Observable__WEBPACK_IMPORTED_MODULE_2__.Observable(subscriber => {
    let due = (0,_util_isDate__WEBPACK_IMPORTED_MODULE_3__.isValidDate)(dueTime) ? +dueTime - scheduler.now() : dueTime;
    if (due < 0) {
      due = 0;
    }
    let n = 0;
    return scheduler.schedule(function () {
      if (!subscriber.closed) {
        subscriber.next(n++);
        if (0 <= intervalDuration) {
          this.schedule(undefined, intervalDuration);
        } else {
          subscriber.complete();
        }
      }
    }, due);
  });
}

/***/ }),

/***/ 787:
/*!***************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/filter.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filter": () => (/* binding */ filter)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ 6305);
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ 2305);


function filter(predicate, thisArg) {
  return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)((source, subscriber) => {
    let index = 0;
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, value => predicate.call(thisArg, value, index++) && subscriber.next(value)));
  });
}

/***/ }),

/***/ 7679:
/*!*************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/take.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "take": () => (/* binding */ take)
/* harmony export */ });
/* harmony import */ var _observable_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/empty */ 4337);
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ 6305);
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OperatorSubscriber */ 2305);



function take(count) {
  return count <= 0 ? () => _observable_empty__WEBPACK_IMPORTED_MODULE_0__.EMPTY : (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)((source, subscriber) => {
    let seen = 0;
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(subscriber, value => {
      if (++seen <= count) {
        subscriber.next(value);
        if (count <= seen) {
          subscriber.complete();
        }
      }
    }));
  });
}

/***/ }),

/***/ 6609:
/*!***************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/Action.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Action": () => (/* binding */ Action)
/* harmony export */ });
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Subscription */ 5339);

class Action extends _Subscription__WEBPACK_IMPORTED_MODULE_0__.Subscription {
  constructor(scheduler, work) {
    super();
  }
  schedule(state, delay = 0) {
    return this;
  }
}

/***/ }),

/***/ 4492:
/*!********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/AsyncAction.js ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AsyncAction": () => (/* binding */ AsyncAction)
/* harmony export */ });
/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Action */ 6609);
/* harmony import */ var _intervalProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./intervalProvider */ 9815);
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/arrRemove */ 484);



class AsyncAction extends _Action__WEBPACK_IMPORTED_MODULE_0__.Action {
  constructor(scheduler, work) {
    super(scheduler, work);
    this.scheduler = scheduler;
    this.work = work;
    this.pending = false;
  }
  schedule(state, delay = 0) {
    var _a;
    if (this.closed) {
      return this;
    }
    this.state = state;
    const id = this.id;
    const scheduler = this.scheduler;
    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay);
    }
    this.pending = true;
    this.delay = delay;
    this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
    return this;
  }
  requestAsyncId(scheduler, _id, delay = 0) {
    return _intervalProvider__WEBPACK_IMPORTED_MODULE_1__.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
  }
  recycleAsyncId(_scheduler, id, delay = 0) {
    if (delay != null && this.delay === delay && this.pending === false) {
      return id;
    }
    if (id != null) {
      _intervalProvider__WEBPACK_IMPORTED_MODULE_1__.intervalProvider.clearInterval(id);
    }
    return undefined;
  }
  execute(state, delay) {
    if (this.closed) {
      return new Error('executing a cancelled action');
    }
    this.pending = false;
    const error = this._execute(state, delay);
    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  }
  _execute(state, _delay) {
    let errored = false;
    let errorValue;
    try {
      this.work(state);
    } catch (e) {
      errored = true;
      errorValue = e ? e : new Error('Scheduled action threw falsy error');
    }
    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  }
  unsubscribe() {
    if (!this.closed) {
      const {
        id,
        scheduler
      } = this;
      const {
        actions
      } = scheduler;
      this.work = this.state = this.scheduler = null;
      this.pending = false;
      (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_2__.arrRemove)(actions, this);
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
      this.delay = null;
      super.unsubscribe();
    }
  }
}

/***/ }),

/***/ 6691:
/*!***********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/AsyncScheduler.js ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AsyncScheduler": () => (/* binding */ AsyncScheduler)
/* harmony export */ });
/* harmony import */ var _Scheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Scheduler */ 258);

class AsyncScheduler extends _Scheduler__WEBPACK_IMPORTED_MODULE_0__.Scheduler {
  constructor(SchedulerAction, now = _Scheduler__WEBPACK_IMPORTED_MODULE_0__.Scheduler.now) {
    super(SchedulerAction, now);
    this.actions = [];
    this._active = false;
  }
  flush(action) {
    const {
      actions
    } = this;
    if (this._active) {
      actions.push(action);
      return;
    }
    let error;
    this._active = true;
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());
    this._active = false;
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  }
}

/***/ }),

/***/ 1191:
/*!**************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/async.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "async": () => (/* binding */ async),
/* harmony export */   "asyncScheduler": () => (/* binding */ asyncScheduler)
/* harmony export */ });
/* harmony import */ var _AsyncAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsyncAction */ 4492);
/* harmony import */ var _AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsyncScheduler */ 6691);


const asyncScheduler = new _AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__.AsyncScheduler(_AsyncAction__WEBPACK_IMPORTED_MODULE_1__.AsyncAction);
const async = asyncScheduler;

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

/***/ 9815:
/*!*************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/intervalProvider.js ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "intervalProvider": () => (/* binding */ intervalProvider)
/* harmony export */ });
const intervalProvider = {
  setInterval(handler, timeout, ...args) {
    const {
      delegate
    } = intervalProvider;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
      return delegate.setInterval(handler, timeout, ...args);
    }
    return setInterval(handler, timeout, ...args);
  },
  clearInterval(handle) {
    const {
      delegate
    } = intervalProvider;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
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

/***/ 7258:
/*!**********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/isDate.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isValidDate": () => (/* binding */ isValidDate)
/* harmony export */ });
function isValidDate(value) {
  return value instanceof Date && !isNaN(value);
}

/***/ }),

/***/ 327:
/*!********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/a-callable.js ***!
  \********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ 2121);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 5979:
/*!***********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/a-constructor.js ***!
  \***********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isConstructor = __webpack_require__(/*! ../internals/is-constructor */ 762);
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ 2121);

var $TypeError = TypeError;

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a constructor');
};


/***/ }),

/***/ 1821:
/*!******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/a-possible-prototype.js ***!
  \******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isPossiblePrototype = __webpack_require__(/*! ../internals/is-possible-prototype */ 6077);

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (isPossiblePrototype(argument)) return argument;
  throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ 4503:
/*!****************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/add-to-unscopables.js ***!
  \****************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);
var create = __webpack_require__(/*! ../internals/object-create */ 5041);
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ 3405).f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] === undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 4360:
/*!******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/advance-string-index.js ***!
  \******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var charAt = (__webpack_require__(/*! ../internals/string-multibyte */ 2786).charAt);

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ 4185:
/*!*********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/an-instance.js ***!
  \*********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ 5087);

var $TypeError = TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw new $TypeError('Incorrect invocation');
};


/***/ }),

/***/ 7803:
/*!*******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/an-object.js ***!
  \*******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isObject = __webpack_require__(/*! ../internals/is-object */ 5285);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 3163:
/*!************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/array-includes.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ 7821);
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ 9597);
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ 1037);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 1470:
/*!********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/array-method-is-strict.js ***!
  \********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ 7199);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};


/***/ }),

/***/ 6559:
/*!*********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/array-slice.js ***!
  \*********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);

module.exports = uncurryThis([].slice);


/***/ }),

/***/ 9070:
/*!********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/array-sort.js ***!
  \********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var arraySlice = __webpack_require__(/*! ../internals/array-slice */ 6559);

var floor = Math.floor;

var sort = function (array, comparefn) {
  var length = array.length;

  if (length < 8) {
    // insertion sort
    var i = 1;
    var element, j;

    while (i < length) {
      j = i;
      element = array[i];
      while (j && comparefn(array[j - 1], element) > 0) {
        array[j] = array[--j];
      }
      if (j !== i++) array[j] = element;
    }
  } else {
    // merge sort
    var middle = floor(length / 2);
    var left = sort(arraySlice(array, 0, middle), comparefn);
    var right = sort(arraySlice(array, middle), comparefn);
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;

    while (lindex < llength || rindex < rlength) {
      array[lindex + rindex] = (lindex < llength && rindex < rlength)
        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
        : lindex < llength ? left[lindex++] : right[rindex++];
    }
  }

  return array;
};

module.exports = sort;


/***/ }),

/***/ 7505:
/*!****************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/check-correctness-of-iteration.js ***!
  \****************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  try {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  } catch (error) { return false; } // workaround of old WebKit + `eval` bug
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ 9266:
/*!*********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/classof-raw.js ***!
  \*********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 1002:
/*!*****************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/classof.js ***!
  \*****************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ 6527);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ 9266);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 4159:
/*!*************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/copy-constructor-properties.js ***!
  \*************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 4172);
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ 6591);
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ 3227);
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ 3405);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 4420:
/*!*********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/correct-is-regexp-logic.js ***!
  \*********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};


/***/ }),

/***/ 701:
/*!**********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/correct-prototype-getter.js ***!
  \**********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ 7199);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 3424:
/*!***********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/create-iter-result-object.js ***!
  \***********************************************************************************************************************/
/***/ ((module) => {


// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
module.exports = function (value, done) {
  return { value: value, done: done };
};


/***/ }),

/***/ 8785:
/*!****************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \****************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 4517);
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ 3405);
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ 4445);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 4445:
/*!************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/create-property-descriptor.js ***!
  \************************************************************************************************************************/
/***/ ((module) => {


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 5051:
/*!**********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/define-built-in-accessor.js ***!
  \**********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var makeBuiltIn = __webpack_require__(/*! ../internals/make-built-in */ 3091);
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ 3405);

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};


/***/ }),

/***/ 5763:
/*!*************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/define-built-in.js ***!
  \*************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ 3405);
var makeBuiltIn = __webpack_require__(/*! ../internals/make-built-in */ 3091);
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ 9926);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 9926:
/*!********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/define-global-property.js ***!
  \********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ 8417);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 5286:
/*!**********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/delete-property-or-throw.js ***!
  \**********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var tryToString = __webpack_require__(/*! ../internals/try-to-string */ 2121);

var $TypeError = TypeError;

module.exports = function (O, P) {
  if (!delete O[P]) throw new $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
};


/***/ }),

/***/ 4517:
/*!*********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/descriptors.js ***!
  \*********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ 7199);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ 6010:
/*!*********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/document-create-element.js ***!
  \*********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ 8417);
var isObject = __webpack_require__(/*! ../internals/is-object */ 5285);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 107:
/*!***********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/dom-iterables.js ***!
  \***********************************************************************************************************/
/***/ ((module) => {


// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ 1998:
/*!**********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/dom-token-list-prototype.js ***!
  \**********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ 6010);

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),

/***/ 8154:
/*!***************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/engine-ff-version.js ***!
  \***************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ 9383);

var firefox = userAgent.match(/firefox\/(\d+)/i);

module.exports = !!firefox && +firefox[1];


/***/ }),

/***/ 9626:
/*!***************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/engine-is-browser.js ***!
  \***************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var IS_DENO = __webpack_require__(/*! ../internals/engine-is-deno */ 5715);
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ 7885);

module.exports = !IS_DENO && !IS_NODE
  && typeof window == 'object'
  && typeof document == 'object';


/***/ }),

/***/ 5715:
/*!************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/engine-is-deno.js ***!
  \************************************************************************************************************/
/***/ ((module) => {


/* global Deno -- Deno case */
module.exports = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';


/***/ }),

/***/ 9991:
/*!******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/engine-is-ie-or-edge.js ***!
  \******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var UA = __webpack_require__(/*! ../internals/engine-user-agent */ 9383);

module.exports = /MSIE|Trident/.test(UA);


/***/ }),

/***/ 9711:
/*!******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/engine-is-ios-pebble.js ***!
  \******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ 9383);

module.exports = /ipad|iphone|ipod/i.test(userAgent) && typeof Pebble != 'undefined';


/***/ }),

/***/ 7003:
/*!***********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/engine-is-ios.js ***!
  \***********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ 9383);

// eslint-disable-next-line redos/no-vulnerable -- safe
module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);


/***/ }),

/***/ 7885:
/*!************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/engine-is-node.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ 8417);
var classof = __webpack_require__(/*! ../internals/classof-raw */ 9266);

module.exports = classof(global.process) === 'process';


/***/ }),

/***/ 3581:
/*!********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/engine-is-webos-webkit.js ***!
  \********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ 9383);

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


/***/ }),

/***/ 9383:
/*!***************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/engine-user-agent.js ***!
  \***************************************************************************************************************/
/***/ ((module) => {


module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ 1824:
/*!***************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/engine-v8-version.js ***!
  \***************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ 8417);
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ 9383);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 2089:
/*!*******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/engine-webkit-version.js ***!
  \*******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ 9383);

var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

module.exports = !!webkit && +webkit[1];


/***/ }),

/***/ 5635:
/*!***********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/enum-bug-keys.js ***!
  \***********************************************************************************************************/
/***/ ((module) => {


// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 8278:
/*!****************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/export.js ***!
  \****************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ 8417);
var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ 3227).f);
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ 8785);
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ 5763);
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ 9926);
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ 4159);
var isForced = __webpack_require__(/*! ../internals/is-forced */ 37);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = global[TARGET] && global[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7199:
/*!***************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/fails.js ***!
  \***************************************************************************************************/
/***/ ((module) => {


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 2176:
/*!********************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(/*! ../modules/es.regexp.exec */ 1527);
var call = __webpack_require__(/*! ../internals/function-call */ 161);
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ 5763);
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ 7582);
var fails = __webpack_require__(/*! ../internals/fails */ 7199);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ 8785);

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegExp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) !== 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () {
      execCalled = true;
      return null;
    };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: call(nativeRegExpMethod, regexp, str, arg2) };
        }
        return { done: true, value: call(nativeMethod, str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn(String.prototype, KEY, methods[0]);
    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ 974:
/*!************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/function-apply.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ 3697);

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ 2687:
/*!*******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/function-bind-context.js ***!
  \*******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ 3737);
var aCallable = __webpack_require__(/*! ../internals/a-callable */ 327);
var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ 3697);

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 3697:
/*!******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/function-bind-native.js ***!
  \******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ 7199);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 161:
/*!***********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/function-call.js ***!
  \***********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ 3697);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 5272:
/*!***********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/function-name.js ***!
  \***********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 4517);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 4172);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 4280:
/*!****************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/function-uncurry-this-accessor.js ***!
  \****************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);
var aCallable = __webpack_require__(/*! ../internals/a-callable */ 327);

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};


/***/ }),

/***/ 3737:
/*!**************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/function-uncurry-this-clause.js ***!
  \**************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ 9266);
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),

/***/ 2855:
/*!*******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/function-uncurry-this.js ***!
  \*******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ 3697);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 6106:
/*!**********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/get-built-in.js ***!
  \**********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ 8417);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 3211:
/*!*****************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/get-iterator-method.js ***!
  \*****************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var classof = __webpack_require__(/*! ../internals/classof */ 1002);
var getMethod = __webpack_require__(/*! ../internals/get-method */ 3539);
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ 6707);
var Iterators = __webpack_require__(/*! ../internals/iterators */ 8854);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ 2390:
/*!**********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/get-iterator.js ***!
  \**********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(/*! ../internals/function-call */ 161);
var aCallable = __webpack_require__(/*! ../internals/a-callable */ 327);
var anObject = __webpack_require__(/*! ../internals/an-object */ 7803);
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ 2121);
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ 3211);

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw new $TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),

/***/ 3539:
/*!********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/get-method.js ***!
  \********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var aCallable = __webpack_require__(/*! ../internals/a-callable */ 327);
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ 6707);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 8504:
/*!**************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/get-substitution.js ***!
  \**************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);
var toObject = __webpack_require__(/*! ../internals/to-object */ 1039);

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
// eslint-disable-next-line redos/no-vulnerable -- safe
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ 8417:
/*!****************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/global.js ***!
  \****************************************************************************************************/
/***/ (function(module) {


var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 4172:
/*!**************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/has-own-property.js ***!
  \**************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);
var toObject = __webpack_require__(/*! ../internals/to-object */ 1039);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 6658:
/*!*********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/hidden-keys.js ***!
  \*********************************************************************************************************/
/***/ ((module) => {


module.exports = {};


/***/ }),

/***/ 8513:
/*!****************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/host-report-errors.js ***!
  \****************************************************************************************************************/
/***/ ((module) => {


module.exports = function (a, b) {
  try {
    // eslint-disable-next-line no-console -- safe
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  } catch (error) { /* empty */ }
};


/***/ }),

/***/ 5207:
/*!**************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/html.js ***!
  \**************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ 6106);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 5160:
/*!************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/ie8-dom-define.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 4517);
var fails = __webpack_require__(/*! ../internals/fails */ 7199);
var createElement = __webpack_require__(/*! ../internals/document-create-element */ 6010);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ 3927:
/*!************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/indexed-object.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);
var fails = __webpack_require__(/*! ../internals/fails */ 7199);
var classof = __webpack_require__(/*! ../internals/classof-raw */ 9266);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 9132:
/*!************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/inspect-source.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var store = __webpack_require__(/*! ../internals/shared-store */ 7714);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 1180:
/*!************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/internal-state.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/weak-map-basic-detection */ 1436);
var global = __webpack_require__(/*! ../internals/global */ 8417);
var isObject = __webpack_require__(/*! ../internals/is-object */ 5285);
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ 8785);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 4172);
var shared = __webpack_require__(/*! ../internals/shared-store */ 7714);
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ 4650);
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ 6658);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 8909:
/*!**********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/is-array-iterator-method.js ***!
  \**********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);
var Iterators = __webpack_require__(/*! ../internals/iterators */ 8854);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ 5572:
/*!*********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/is-callable.js ***!
  \*********************************************************************************************************/
/***/ ((module) => {


// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 762:
/*!************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/is-constructor.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);
var fails = __webpack_require__(/*! ../internals/fails */ 7199);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var classof = __webpack_require__(/*! ../internals/classof */ 1002);
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ 6106);
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ 9132);

var noop = function () { /* empty */ };
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, [], argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ 37:
/*!*******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/is-forced.js ***!
  \*******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ 7199);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 6707:
/*!******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/is-null-or-undefined.js ***!
  \******************************************************************************************************************/
/***/ ((module) => {


// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 5285:
/*!*******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/is-object.js ***!
  \*******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 6077:
/*!*******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/is-possible-prototype.js ***!
  \*******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isObject = __webpack_require__(/*! ../internals/is-object */ 5285);

module.exports = function (argument) {
  return isObject(argument) || argument === null;
};


/***/ }),

/***/ 7683:
/*!*****************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/is-pure.js ***!
  \*****************************************************************************************************/
/***/ ((module) => {


module.exports = false;


/***/ }),

/***/ 750:
/*!*******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/is-regexp.js ***!
  \*******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isObject = __webpack_require__(/*! ../internals/is-object */ 5285);
var classof = __webpack_require__(/*! ../internals/classof-raw */ 9266);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) === 'RegExp');
};


/***/ }),

/***/ 3920:
/*!*******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/is-symbol.js ***!
  \*******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ 6106);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ 5087);
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ 47);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 6337:
/*!*****************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/iterate.js ***!
  \*****************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var bind = __webpack_require__(/*! ../internals/function-bind-context */ 2687);
var call = __webpack_require__(/*! ../internals/function-call */ 161);
var anObject = __webpack_require__(/*! ../internals/an-object */ 7803);
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ 2121);
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ 8909);
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ 1037);
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ 5087);
var getIterator = __webpack_require__(/*! ../internals/get-iterator */ 2390);
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ 3211);
var iteratorClose = __webpack_require__(/*! ../internals/iterator-close */ 4636);

var $TypeError = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};


/***/ }),

/***/ 4636:
/*!************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/iterator-close.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(/*! ../internals/function-call */ 161);
var anObject = __webpack_require__(/*! ../internals/an-object */ 7803);
var getMethod = __webpack_require__(/*! ../internals/get-method */ 3539);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ 2107:
/*!*************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/iterator-create-constructor.js ***!
  \*************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var IteratorPrototype = (__webpack_require__(/*! ../internals/iterators-core */ 2551).IteratorPrototype);
var create = __webpack_require__(/*! ../internals/object-create */ 5041);
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ 4445);
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ 6501);
var Iterators = __webpack_require__(/*! ../internals/iterators */ 8854);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ 1260:
/*!*************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/iterator-define.js ***!
  \*************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ 8278);
var call = __webpack_require__(/*! ../internals/function-call */ 161);
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ 7683);
var FunctionName = __webpack_require__(/*! ../internals/function-name */ 5272);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var createIteratorConstructor = __webpack_require__(/*! ../internals/iterator-create-constructor */ 2107);
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ 6551);
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ 1216);
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ 6501);
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ 8785);
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ 5763);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);
var Iterators = __webpack_require__(/*! ../internals/iterators */ 8854);
var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ 2551);

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    }

    return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ 2551:
/*!************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/iterators-core.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ 7199);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var isObject = __webpack_require__(/*! ../internals/is-object */ 5285);
var create = __webpack_require__(/*! ../internals/object-create */ 5041);
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ 6551);
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ 5763);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ 7683);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ 8854:
/*!*******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/iterators.js ***!
  \*******************************************************************************************************/
/***/ ((module) => {


module.exports = {};


/***/ }),

/***/ 1037:
/*!******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/length-of-array-like.js ***!
  \******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toLength = __webpack_require__(/*! ../internals/to-length */ 298);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 3091:
/*!***********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/make-built-in.js ***!
  \***********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);
var fails = __webpack_require__(/*! ../internals/fails */ 7199);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 4172);
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 4517);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(/*! ../internals/function-name */ 5272).CONFIGURABLE);
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ 9132);
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ 1180);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 1381:
/*!********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/math-trunc.js ***!
  \********************************************************************************************************/
/***/ ((module) => {


var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 5519:
/*!*******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/microtask.js ***!
  \*******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ 8417);
var safeGetBuiltIn = __webpack_require__(/*! ../internals/safe-get-built-in */ 409);
var bind = __webpack_require__(/*! ../internals/function-bind-context */ 2687);
var macrotask = (__webpack_require__(/*! ../internals/task */ 8347).set);
var Queue = __webpack_require__(/*! ../internals/queue */ 5177);
var IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ 7003);
var IS_IOS_PEBBLE = __webpack_require__(/*! ../internals/engine-is-ios-pebble */ 9711);
var IS_WEBOS_WEBKIT = __webpack_require__(/*! ../internals/engine-is-webos-webkit */ 3581);
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ 7885);

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
var microtask = safeGetBuiltIn('queueMicrotask');
var notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!microtask) {
  var queue = new Queue();

  var flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (fn = queue.get()) try {
      fn();
    } catch (error) {
      if (queue.head) notify();
      throw error;
    }
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = bind(promise.then, promise);
    notify = function () {
      then(flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessage
  // - onreadystatechange
  // - setTimeout
  } else {
    // `webpack` dev server bug on IE global methods - use bind(fn, global)
    macrotask = bind(macrotask, global);
    notify = function () {
      macrotask(flush);
    };
  }

  microtask = function (fn) {
    if (!queue.head) notify();
    queue.add(fn);
  };
}

module.exports = microtask;


/***/ }),

/***/ 406:
/*!********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/new-promise-capability.js ***!
  \********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var aCallable = __webpack_require__(/*! ../internals/a-callable */ 327);

var $TypeError = TypeError;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw new $TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable(resolve);
  this.reject = aCallable(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ 8318:
/*!**********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/not-a-regexp.js ***!
  \**********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ 750);

var $TypeError = TypeError;

module.exports = function (it) {
  if (isRegExp(it)) {
    throw new $TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ 5041:
/*!***********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/object-create.js ***!
  \***********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(/*! ../internals/an-object */ 7803);
var definePropertiesModule = __webpack_require__(/*! ../internals/object-define-properties */ 8409);
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ 5635);
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ 6658);
var html = __webpack_require__(/*! ../internals/html */ 5207);
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ 6010);
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ 4650);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ 8409:
/*!**********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/object-define-properties.js ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 4517);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ 4824);
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ 3405);
var anObject = __webpack_require__(/*! ../internals/an-object */ 7803);
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ 7821);
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ 9);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ 3405:
/*!********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/object-define-property.js ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 4517);
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ 5160);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ 4824);
var anObject = __webpack_require__(/*! ../internals/an-object */ 7803);
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ 4486);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 3227:
/*!********************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 4517);
var call = __webpack_require__(/*! ../internals/function-call */ 161);
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ 1531);
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ 4445);
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ 7821);
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ 4486);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 4172);
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ 5160);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8077:
/*!***************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/object-get-own-property-names.js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ 8073);
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ 5635);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 9136:
/*!*****************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 6551:
/*!*********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 4172);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var toObject = __webpack_require__(/*! ../internals/to-object */ 1039);
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ 4650);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ 701);

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 5087:
/*!********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/object-is-prototype-of.js ***!
  \********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 8073:
/*!******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/object-keys-internal.js ***!
  \******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 4172);
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ 7821);
var indexOf = (__webpack_require__(/*! ../internals/array-includes */ 3163).indexOf);
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ 6658);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 9:
/*!*********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/object-keys.js ***!
  \*********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ 8073);
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ 5635);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 1531:
/*!***************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 1216:
/*!*********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = __webpack_require__(/*! ../internals/function-uncurry-this-accessor */ 4280);
var isObject = __webpack_require__(/*! ../internals/is-object */ 5285);
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ 8748);
var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ 1821);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    requireObjectCoercible(O);
    aPossiblePrototype(proto);
    if (!isObject(O)) return O;
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 4348:
/*!*******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/ordinary-to-primitive.js ***!
  \*******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(/*! ../internals/function-call */ 161);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var isObject = __webpack_require__(/*! ../internals/is-object */ 5285);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 6591:
/*!******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/own-keys.js ***!
  \******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ 6106);
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ 8077);
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ 9136);
var anObject = __webpack_require__(/*! ../internals/an-object */ 7803);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 6170:
/*!*****************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/perform.js ***!
  \*****************************************************************************************************/
/***/ ((module) => {


module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ 9839:
/*!***************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/promise-constructor-detection.js ***!
  \***************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ 8417);
var NativePromiseConstructor = __webpack_require__(/*! ../internals/promise-native-constructor */ 3721);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var isForced = __webpack_require__(/*! ../internals/is-forced */ 37);
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ 9132);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);
var IS_BROWSER = __webpack_require__(/*! ../internals/engine-is-browser */ 9626);
var IS_DENO = __webpack_require__(/*! ../internals/engine-is-deno */ 5715);
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ 7683);
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ 1824);

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
var SPECIES = wellKnownSymbol('species');
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT = isCallable(global.PromiseRejectionEvent);

var FORCED_PROMISE_CONSTRUCTOR = isForced('Promise', function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#{ catch, finally } in the pure version for preventing prototype pollution
  if (IS_PURE && !(NativePromisePrototype['catch'] && NativePromisePrototype['finally'])) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
    // Detect correctness of subclassing with @@species support
    var promise = new NativePromiseConstructor(function (resolve) { resolve(1); });
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES] = FakePromise;
    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  } return !GLOBAL_CORE_JS_PROMISE && (IS_BROWSER || IS_DENO) && !NATIVE_PROMISE_REJECTION_EVENT;
});

module.exports = {
  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR,
  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT,
  SUBCLASSING: SUBCLASSING
};


/***/ }),

/***/ 3721:
/*!************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/promise-native-constructor.js ***!
  \************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ 8417);

module.exports = global.Promise;


/***/ }),

/***/ 5583:
/*!*************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/promise-resolve.js ***!
  \*************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var anObject = __webpack_require__(/*! ../internals/an-object */ 7803);
var isObject = __webpack_require__(/*! ../internals/is-object */ 5285);
var newPromiseCapability = __webpack_require__(/*! ../internals/new-promise-capability */ 406);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ 5996:
/*!*********************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/promise-statics-incorrect-iteration.js ***!
  \*********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NativePromiseConstructor = __webpack_require__(/*! ../internals/promise-native-constructor */ 3721);
var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ 7505);
var FORCED_PROMISE_CONSTRUCTOR = (__webpack_require__(/*! ../internals/promise-constructor-detection */ 9839).CONSTRUCTOR);

module.exports = FORCED_PROMISE_CONSTRUCTOR || !checkCorrectnessOfIteration(function (iterable) {
  NativePromiseConstructor.all(iterable).then(undefined, function () { /* empty */ });
});


/***/ }),

/***/ 5177:
/*!***************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/queue.js ***!
  \***************************************************************************************************/
/***/ ((module) => {


var Queue = function () {
  this.head = null;
  this.tail = null;
};

Queue.prototype = {
  add: function (item) {
    var entry = { item: item, next: null };
    var tail = this.tail;
    if (tail) tail.next = entry;
    else this.head = entry;
    this.tail = entry;
  },
  get: function () {
    var entry = this.head;
    if (entry) {
      var next = this.head = entry.next;
      if (next === null) this.tail = null;
      return entry.item;
    }
  }
};

module.exports = Queue;


/***/ }),

/***/ 5773:
/*!******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(/*! ../internals/function-call */ 161);
var anObject = __webpack_require__(/*! ../internals/an-object */ 7803);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var classof = __webpack_require__(/*! ../internals/classof-raw */ 9266);
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ 7582);

var $TypeError = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = call(exec, R, S);
    if (result !== null) anObject(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
  throw new $TypeError('RegExp#exec called on incompatible receiver');
};


/***/ }),

/***/ 7582:
/*!*********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/regexp-exec.js ***!
  \*********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = __webpack_require__(/*! ../internals/function-call */ 161);
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);
var toString = __webpack_require__(/*! ../internals/to-string */ 320);
var regexpFlags = __webpack_require__(/*! ../internals/regexp-flags */ 9087);
var stickyHelpers = __webpack_require__(/*! ../internals/regexp-sticky-helpers */ 8505);
var shared = __webpack_require__(/*! ../internals/shared */ 6258);
var create = __webpack_require__(/*! ../internals/object-create */ 5041);
var getInternalState = (__webpack_require__(/*! ../internals/internal-state */ 1180).get);
var UNSUPPORTED_DOT_ALL = __webpack_require__(/*! ../internals/regexp-unsupported-dot-all */ 2222);
var UNSUPPORTED_NCG = __webpack_require__(/*! ../internals/regexp-unsupported-ncg */ 5062);

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ 9087:
/*!**********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/regexp-flags.js ***!
  \**********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var anObject = __webpack_require__(/*! ../internals/an-object */ 7803);

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 8505:
/*!*******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/regexp-sticky-helpers.js ***!
  \*******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ 7199);
var global = __webpack_require__(/*! ../internals/global */ 8417);

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

var UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') !== null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
  return !$RegExp('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') !== null;
});

module.exports = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y
};


/***/ }),

/***/ 2222:
/*!************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/regexp-unsupported-dot-all.js ***!
  \************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ 7199);
var global = __webpack_require__(/*! ../internals/global */ 8417);

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.test('\n') && re.flags === 's');
});


/***/ }),

/***/ 5062:
/*!********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/regexp-unsupported-ncg.js ***!
  \********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ 7199);
var global = __webpack_require__(/*! ../internals/global */ 8417);

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ 8748:
/*!**********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/require-object-coercible.js ***!
  \**********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ 6707);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 409:
/*!***************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/safe-get-built-in.js ***!
  \***************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ 8417);
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 4517);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Avoid NodeJS experimental warning
module.exports = function (name) {
  if (!DESCRIPTORS) return global[name];
  var descriptor = getOwnPropertyDescriptor(global, name);
  return descriptor && descriptor.value;
};


/***/ }),

/***/ 7663:
/*!*********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/set-species.js ***!
  \*********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ 6106);
var defineBuiltInAccessor = __webpack_require__(/*! ../internals/define-built-in-accessor */ 5051);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 4517);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineBuiltInAccessor(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ 6501:
/*!***************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/set-to-string-tag.js ***!
  \***************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ 3405).f);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 4172);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn(target, TO_STRING_TAG)) {
    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ 4650:
/*!********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/shared-key.js ***!
  \********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var shared = __webpack_require__(/*! ../internals/shared */ 6258);
var uid = __webpack_require__(/*! ../internals/uid */ 7887);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 7714:
/*!**********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/shared-store.js ***!
  \**********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ 7683);
var globalThis = __webpack_require__(/*! ../internals/global */ 8417);
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ 9926);

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.37.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.37.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 6258:
/*!****************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/shared.js ***!
  \****************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var store = __webpack_require__(/*! ../internals/shared-store */ 7714);

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};


/***/ }),

/***/ 4093:
/*!*****************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/species-constructor.js ***!
  \*****************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var anObject = __webpack_require__(/*! ../internals/an-object */ 7803);
var aConstructor = __webpack_require__(/*! ../internals/a-constructor */ 5979);
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ 6707);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || isNullOrUndefined(S = anObject(C)[SPECIES]) ? defaultConstructor : aConstructor(S);
};


/***/ }),

/***/ 2786:
/*!**************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/string-multibyte.js ***!
  \**************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);
var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ 5820);
var toString = __webpack_require__(/*! ../internals/to-string */ 320);
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ 8748);

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ 8349:
/*!**************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/symbol-constructor-detection.js ***!
  \**************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ 1824);
var fails = __webpack_require__(/*! ../internals/fails */ 7199);
var global = __webpack_require__(/*! ../internals/global */ 8417);

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 8347:
/*!**************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/task.js ***!
  \**************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ 8417);
var apply = __webpack_require__(/*! ../internals/function-apply */ 974);
var bind = __webpack_require__(/*! ../internals/function-bind-context */ 2687);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 4172);
var fails = __webpack_require__(/*! ../internals/fails */ 7199);
var html = __webpack_require__(/*! ../internals/html */ 5207);
var arraySlice = __webpack_require__(/*! ../internals/array-slice */ 6559);
var createElement = __webpack_require__(/*! ../internals/document-create-element */ 6010);
var validateArgumentsLength = __webpack_require__(/*! ../internals/validate-arguments-length */ 82);
var IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ 7003);
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ 7885);

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var Dispatch = global.Dispatch;
var Function = global.Function;
var MessageChannel = global.MessageChannel;
var String = global.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var $location, defer, channel, port;

fails(function () {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  $location = global.location;
});

var run = function (id) {
  if (hasOwn(queue, id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var eventListener = function (event) {
  run(event.data);
};

var globalPostMessageDefer = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), $location.protocol + '//' + $location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength(arguments.length, 1);
    var fn = isCallable(handler) ? handler : Function(handler);
    var args = arraySlice(arguments, 1);
    queue[++counter] = function () {
      apply(fn, undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = eventListener;
    defer = bind(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    isCallable(global.postMessage) &&
    !global.importScripts &&
    $location && $location.protocol !== 'file:' &&
    !fails(globalPostMessageDefer)
  ) {
    defer = globalPostMessageDefer;
    global.addEventListener('message', eventListener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ 9597:
/*!***************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/to-absolute-index.js ***!
  \***************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ 5820);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 7821:
/*!***************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/to-indexed-object.js ***!
  \***************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ 3927);
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ 8748);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 5820:
/*!********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/to-integer-or-infinity.js ***!
  \********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var trunc = __webpack_require__(/*! ../internals/math-trunc */ 1381);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 298:
/*!*******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/to-length.js ***!
  \*******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ 5820);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 1039:
/*!*******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/to-object.js ***!
  \*******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ 8748);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 5837:
/*!**********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/to-primitive.js ***!
  \**********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(/*! ../internals/function-call */ 161);
var isObject = __webpack_require__(/*! ../internals/is-object */ 5285);
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ 3920);
var getMethod = __webpack_require__(/*! ../internals/get-method */ 3539);
var ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ 4348);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4486:
/*!*************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/to-property-key.js ***!
  \*************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ 5837);
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ 3920);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 6527:
/*!*******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/to-string-tag-support.js ***!
  \*******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 320:
/*!*******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/to-string.js ***!
  \*******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var classof = __webpack_require__(/*! ../internals/classof */ 1002);

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ 2121:
/*!***********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/try-to-string.js ***!
  \***********************************************************************************************************/
/***/ ((module) => {


var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 7887:
/*!*************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/uid.js ***!
  \*************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 47:
/*!***************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \***************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ 8349);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 4824:
/*!*********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/v8-prototype-define-bug.js ***!
  \*********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 4517);
var fails = __webpack_require__(/*! ../internals/fails */ 7199);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ 82:
/*!***********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/validate-arguments-length.js ***!
  \***********************************************************************************************************************/
/***/ ((module) => {


var $TypeError = TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw new $TypeError('Not enough arguments');
  return passed;
};


/***/ }),

/***/ 1436:
/*!**********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/weak-map-basic-detection.js ***!
  \**********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ 8417);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 3243:
/*!***************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/internals/well-known-symbol.js ***!
  \***************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ 8417);
var shared = __webpack_require__(/*! ../internals/shared */ 6258);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 4172);
var uid = __webpack_require__(/*! ../internals/uid */ 7887);
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ 8349);
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ 47);

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 9803:
/*!*************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/modules/es.array.includes.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ 8278);
var $includes = (__webpack_require__(/*! ../internals/array-includes */ 3163).includes);
var fails = __webpack_require__(/*! ../internals/fails */ 7199);
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ 4503);

// FF99+ bug
var BROKEN_ON_SPARSE = fails(function () {
  // eslint-disable-next-line es/no-array-prototype-includes -- detection
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ 9615:
/*!*************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/modules/es.array.iterator.js ***!
  \*************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ 7821);
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ 4503);
var Iterators = __webpack_require__(/*! ../internals/iterators */ 8854);
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ 1180);
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ 3405).f);
var defineIterator = __webpack_require__(/*! ../internals/iterator-define */ 1260);
var createIterResultObject = __webpack_require__(/*! ../internals/create-iter-result-object */ 3424);
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ 7683);
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 4517);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return createIterResultObject(undefined, true);
  }
  switch (state.kind) {
    case 'keys': return createIterResultObject(index, false);
    case 'values': return createIterResultObject(target[index], false);
  } return createIterResultObject([index, target[index]], false);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }


/***/ }),

/***/ 6594:
/*!*********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/modules/es.array.sort.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ 8278);
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);
var aCallable = __webpack_require__(/*! ../internals/a-callable */ 327);
var toObject = __webpack_require__(/*! ../internals/to-object */ 1039);
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ 1037);
var deletePropertyOrThrow = __webpack_require__(/*! ../internals/delete-property-or-throw */ 5286);
var toString = __webpack_require__(/*! ../internals/to-string */ 320);
var fails = __webpack_require__(/*! ../internals/fails */ 7199);
var internalSort = __webpack_require__(/*! ../internals/array-sort */ 9070);
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ 1470);
var FF = __webpack_require__(/*! ../internals/engine-ff-version */ 8154);
var IE_OR_EDGE = __webpack_require__(/*! ../internals/engine-is-ie-or-edge */ 9991);
var V8 = __webpack_require__(/*! ../internals/engine-v8-version */ 1824);
var WEBKIT = __webpack_require__(/*! ../internals/engine-webkit-version */ 2089);

var test = [];
var nativeSort = uncurryThis(test.sort);
var push = uncurryThis(test.push);

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var STABLE_SORT = !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 70;
  if (FF && FF > 3) return;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 603;

  var result = '';
  var code, chr, value, index;

  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66: case 69: case 70: case 72: value = 3; break;
      case 68: case 71: value = 4; break;
      default: value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({ k: chr + index, v: value });
    }
  }

  test.sort(function (a, b) { return b.v - a.v; });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return toString(x) > toString(y) ? 1 : -1;
  };
};

// `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aCallable(comparefn);

    var array = toObject(this);

    if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

    var items = [];
    var arrayLength = lengthOfArrayLike(array);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) push(items, array[index]);
    }

    internalSort(items, getSortCompare(comparefn));

    itemsLength = lengthOfArrayLike(items);
    index = 0;

    while (index < itemsLength) array[index] = items[index++];
    while (index < arrayLength) deletePropertyOrThrow(array, index++);

    return array;
  }
});


/***/ }),

/***/ 7740:
/*!**********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/modules/es.promise.all.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ 8278);
var call = __webpack_require__(/*! ../internals/function-call */ 161);
var aCallable = __webpack_require__(/*! ../internals/a-callable */ 327);
var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ 406);
var perform = __webpack_require__(/*! ../internals/perform */ 6170);
var iterate = __webpack_require__(/*! ../internals/iterate */ 6337);
var PROMISE_STATICS_INCORRECT_ITERATION = __webpack_require__(/*! ../internals/promise-statics-incorrect-iteration */ 5996);

// `Promise.all` method
// https://tc39.es/ecma262/#sec-promise.all
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call($promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ 8812:
/*!************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/modules/es.promise.catch.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ 8278);
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ 7683);
var FORCED_PROMISE_CONSTRUCTOR = (__webpack_require__(/*! ../internals/promise-constructor-detection */ 9839).CONSTRUCTOR);
var NativePromiseConstructor = __webpack_require__(/*! ../internals/promise-native-constructor */ 3721);
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ 6106);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ 5763);

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

// `Promise.prototype.catch` method
// https://tc39.es/ecma262/#sec-promise.prototype.catch
$({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR, real: true }, {
  'catch': function (onRejected) {
    return this.then(undefined, onRejected);
  }
});

// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
if (!IS_PURE && isCallable(NativePromiseConstructor)) {
  var method = getBuiltIn('Promise').prototype['catch'];
  if (NativePromisePrototype['catch'] !== method) {
    defineBuiltIn(NativePromisePrototype, 'catch', method, { unsafe: true });
  }
}


/***/ }),

/***/ 8861:
/*!******************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/modules/es.promise.constructor.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ 8278);
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ 7683);
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ 7885);
var global = __webpack_require__(/*! ../internals/global */ 8417);
var call = __webpack_require__(/*! ../internals/function-call */ 161);
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ 5763);
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ 1216);
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ 6501);
var setSpecies = __webpack_require__(/*! ../internals/set-species */ 7663);
var aCallable = __webpack_require__(/*! ../internals/a-callable */ 327);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var isObject = __webpack_require__(/*! ../internals/is-object */ 5285);
var anInstance = __webpack_require__(/*! ../internals/an-instance */ 4185);
var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ 4093);
var task = (__webpack_require__(/*! ../internals/task */ 8347).set);
var microtask = __webpack_require__(/*! ../internals/microtask */ 5519);
var hostReportErrors = __webpack_require__(/*! ../internals/host-report-errors */ 8513);
var perform = __webpack_require__(/*! ../internals/perform */ 6170);
var Queue = __webpack_require__(/*! ../internals/queue */ 5177);
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ 1180);
var NativePromiseConstructor = __webpack_require__(/*! ../internals/promise-native-constructor */ 3721);
var PromiseConstructorDetection = __webpack_require__(/*! ../internals/promise-constructor-detection */ 9839);
var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ 406);

var PROMISE = 'Promise';
var FORCED_PROMISE_CONSTRUCTOR = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var setInternalState = InternalStateModule.set;
var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
var PromiseConstructor = NativePromiseConstructor;
var PromisePrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;

var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && isCallable(then = it.then) ? then : false;
};

var callReaction = function (reaction, state) {
  var value = state.value;
  var ok = state.state === FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve = reaction.resolve;
  var reject = reaction.reject;
  var domain = reaction.domain;
  var result, then, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
        state.rejection = HANDLED;
      }
      if (handler === true) result = value;
      else {
        if (domain) domain.enter();
        result = handler(value); // can throw
        if (domain) {
          domain.exit();
          exited = true;
        }
      }
      if (result === reaction.promise) {
        reject(new TypeError('Promise-chain cycle'));
      } else if (then = isThenable(result)) {
        call(then, result, resolve, reject);
      } else resolve(result);
    } else reject(value);
  } catch (error) {
    if (domain && !exited) domain.exit();
    reject(error);
  }
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  microtask(function () {
    var reactions = state.reactions;
    var reaction;
    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw new TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call(then, value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED_PROMISE_CONSTRUCTOR) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromisePrototype);
    aCallable(executor);
    call(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromisePrototype = PromiseConstructor.prototype;

  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  // `Promise.prototype.then` method
  // https://tc39.es/ecma262/#sec-promise.prototype.then
  Internal.prototype = defineBuiltIn(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
    var state = getInternalPromiseState(this);
    var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
    state.parent = true;
    reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
    reaction.fail = isCallable(onRejected) && onRejected;
    reaction.domain = IS_NODE ? process.domain : undefined;
    if (state.state === PENDING) state.reactions.add(reaction);
    else microtask(function () {
      callReaction(reaction, state);
    });
    return reaction.promise;
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalPromiseState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };

  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && isCallable(NativePromiseConstructor) && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!NATIVE_PROMISE_SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      defineBuiltIn(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromisePrototype);
    }
  }
}

$({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);


/***/ }),

/***/ 7618:
/*!******************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/modules/es.promise.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


// TODO: Remove this module from `core-js@4` since it's split to modules listed below
__webpack_require__(/*! ../modules/es.promise.constructor */ 8861);
__webpack_require__(/*! ../modules/es.promise.all */ 7740);
__webpack_require__(/*! ../modules/es.promise.catch */ 8812);
__webpack_require__(/*! ../modules/es.promise.race */ 3859);
__webpack_require__(/*! ../modules/es.promise.reject */ 9163);
__webpack_require__(/*! ../modules/es.promise.resolve */ 3512);


/***/ }),

/***/ 3859:
/*!***********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/modules/es.promise.race.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ 8278);
var call = __webpack_require__(/*! ../internals/function-call */ 161);
var aCallable = __webpack_require__(/*! ../internals/a-callable */ 327);
var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ 406);
var perform = __webpack_require__(/*! ../internals/perform */ 6170);
var iterate = __webpack_require__(/*! ../internals/iterate */ 6337);
var PROMISE_STATICS_INCORRECT_ITERATION = __webpack_require__(/*! ../internals/promise-statics-incorrect-iteration */ 5996);

// `Promise.race` method
// https://tc39.es/ecma262/#sec-promise.race
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      iterate(iterable, function (promise) {
        call($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ 9163:
/*!*************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/modules/es.promise.reject.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ 8278);
var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ 406);
var FORCED_PROMISE_CONSTRUCTOR = (__webpack_require__(/*! ../internals/promise-constructor-detection */ 9839).CONSTRUCTOR);

// `Promise.reject` method
// https://tc39.es/ecma262/#sec-promise.reject
$({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  reject: function reject(r) {
    var capability = newPromiseCapabilityModule.f(this);
    var capabilityReject = capability.reject;
    capabilityReject(r);
    return capability.promise;
  }
});


/***/ }),

/***/ 3512:
/*!**************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/modules/es.promise.resolve.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ 8278);
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ 6106);
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ 7683);
var NativePromiseConstructor = __webpack_require__(/*! ../internals/promise-native-constructor */ 3721);
var FORCED_PROMISE_CONSTRUCTOR = (__webpack_require__(/*! ../internals/promise-constructor-detection */ 9839).CONSTRUCTOR);
var promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ 5583);

var PromiseConstructorWrapper = getBuiltIn('Promise');
var CHECK_WRAPPER = IS_PURE && !FORCED_PROMISE_CONSTRUCTOR;

// `Promise.resolve` method
// https://tc39.es/ecma262/#sec-promise.resolve
$({ target: 'Promise', stat: true, forced: IS_PURE || FORCED_PROMISE_CONSTRUCTOR }, {
  resolve: function resolve(x) {
    return promiseResolve(CHECK_WRAPPER && this === PromiseConstructorWrapper ? NativePromiseConstructor : this, x);
  }
});


/***/ }),

/***/ 1527:
/*!**********************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/modules/es.regexp.exec.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ 8278);
var exec = __webpack_require__(/*! ../internals/regexp-exec */ 7582);

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ 6890:
/*!***************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/modules/es.string.ends-with.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ 8278);
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ 3737);
var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ 3227).f);
var toLength = __webpack_require__(/*! ../internals/to-length */ 298);
var toString = __webpack_require__(/*! ../internals/to-string */ 320);
var notARegExp = __webpack_require__(/*! ../internals/not-a-regexp */ 8318);
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ 8748);
var correctIsRegExpLogic = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ 4420);
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ 7683);

var slice = uncurryThis(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.endsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.endswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = that.length;
    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
    var search = toString(searchString);
    return slice(that, end - search.length, end) === search;
  }
});


/***/ }),

/***/ 2879:
/*!**************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/modules/es.string.includes.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ 8278);
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);
var notARegExp = __webpack_require__(/*! ../internals/not-a-regexp */ 8318);
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ 8748);
var toString = __webpack_require__(/*! ../internals/to-string */ 320);
var correctIsRegExpLogic = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ 4420);

var stringIndexOf = uncurryThis(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString(requireObjectCoercible(this)),
      toString(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});


/***/ }),

/***/ 3373:
/*!*************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/modules/es.string.replace.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var apply = __webpack_require__(/*! ../internals/function-apply */ 974);
var call = __webpack_require__(/*! ../internals/function-call */ 161);
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);
var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ 2176);
var fails = __webpack_require__(/*! ../internals/fails */ 7199);
var anObject = __webpack_require__(/*! ../internals/an-object */ 7803);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ 6707);
var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ 5820);
var toLength = __webpack_require__(/*! ../internals/to-length */ 298);
var toString = __webpack_require__(/*! ../internals/to-string */ 320);
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ 8748);
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ 4360);
var getMethod = __webpack_require__(/*! ../internals/get-method */ 3539);
var getSubstitution = __webpack_require__(/*! ../internals/get-substitution */ 8504);
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ 5773);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      var fullUnicode;
      if (global) {
        fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }

      var results = [];
      var result;
      while (true) {
        result = regExpExec(rx, S);
        if (result === null) break;

        push(results, result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        var replacement;
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
          replacement = toString(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }

      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);


/***/ }),

/***/ 690:
/*!*****************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/modules/es.string.starts-with.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ 8278);
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ 3737);
var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ 3227).f);
var toLength = __webpack_require__(/*! ../internals/to-length */ 298);
var toString = __webpack_require__(/*! ../internals/to-string */ 320);
var notARegExp = __webpack_require__(/*! ../internals/not-a-regexp */ 8318);
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ 8748);
var correctIsRegExpLogic = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ 4420);
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ 7683);

var stringSlice = uncurryThis(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = toString(searchString);
    return stringSlice(that, index, index + search.length) === search;
  }
});


/***/ }),

/***/ 170:
/*!*****************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/modules/es.symbol.description.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__(/*! ../internals/export */ 8278);
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 4517);
var global = __webpack_require__(/*! ../internals/global */ 8417);
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 2855);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 4172);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 5572);
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ 5087);
var toString = __webpack_require__(/*! ../internals/to-string */ 320);
var defineBuiltInAccessor = __webpack_require__(/*! ../internals/define-built-in-accessor */ 5051);
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ 4159);

var NativeSymbol = global.Symbol;
var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in SymbolPrototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0]);
    var result = isPrototypeOf(SymbolPrototype, this)
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  SymbolWrapper.prototype = SymbolPrototype;
  SymbolPrototype.constructor = SymbolWrapper;

  var NATIVE_SYMBOL = String(NativeSymbol('description detection')) === 'Symbol(description detection)';
  var thisSymbolValue = uncurryThis(SymbolPrototype.valueOf);
  var symbolDescriptiveString = uncurryThis(SymbolPrototype.toString);
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  var replace = uncurryThis(''.replace);
  var stringSlice = uncurryThis(''.slice);

  defineBuiltInAccessor(SymbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = thisSymbolValue(this);
      if (hasOwn(EmptyStringDescriptionStore, symbol)) return '';
      var string = symbolDescriptiveString(symbol);
      var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, constructor: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ 297:
/*!************************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/core-js@3.37.0/node_modules/core-js/modules/web.dom-collections.iterator.js ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ 8417);
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ 107);
var DOMTokenListPrototype = __webpack_require__(/*! ../internals/dom-token-list-prototype */ 1998);
var ArrayIteratorMethods = __webpack_require__(/*! ../modules/es.array.iterator */ 9615);
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ 8785);
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ 6501);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 3243);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    setToStringTag(CollectionPrototype, COLLECTION_NAME, true);
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');


/***/ }),

/***/ 5178:
/*!*********************************************************************************************************************!*\
  !*** ../../common/temp/node_modules/.pnpm/jsonpath-plus@7.2.0/node_modules/jsonpath-plus/dist/index-browser-esm.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JSONPath": () => (/* binding */ JSONPath)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
var hasOwnProp = Object.prototype.hasOwnProperty;
/**
 * @typedef {null|boolean|number|string|PlainObject|GenericArray} JSONObject
 */

/**
 * @typedef {any} AnyItem
 */

/**
 * @typedef {any} AnyResult
 */

/**
 * Copies array and then pushes item into it.
 * @param {GenericArray} arr Array to copy and into which to push
 * @param {AnyItem} item Array item to add (to end)
 * @returns {GenericArray} Copy of the original array
 */

function push(arr, item) {
  arr = arr.slice();
  arr.push(item);
  return arr;
}
/**
 * Copies array and then unshifts item into it.
 * @param {AnyItem} item Array item to add (to beginning)
 * @param {GenericArray} arr Array to copy and into which to unshift
 * @returns {GenericArray} Copy of the original array
 */

function unshift(item, arr) {
  arr = arr.slice();
  arr.unshift(item);
  return arr;
}
/**
 * Caught when JSONPath is used without `new` but rethrown if with `new`
 * @extends Error
 */

var NewError = /*#__PURE__*/function (_Error) {
  _inherits(NewError, _Error);
  var _super = _createSuper(NewError);

  /**
   * @param {AnyResult} value The evaluated scalar value
   */
  function NewError(value) {
    var _this;
    _classCallCheck(this, NewError);
    _this = _super.call(this, 'JSONPath should not be called with "new" (it prevents return ' + 'of (unwrapped) scalar values)');
    _this.avoidNew = true;
    _this.value = value;
    _this.name = 'NewError';
    return _this;
  }
  return _createClass(NewError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
* @typedef {PlainObject} ReturnObject
* @property {string} path
* @property {JSONObject} value
* @property {PlainObject|GenericArray} parent
* @property {string} parentProperty
*/

/**
* @callback JSONPathCallback
* @param {string|PlainObject} preferredOutput
* @param {"value"|"property"} type
* @param {ReturnObject} fullRetObj
* @returns {void}
*/

/**
* @callback OtherTypeCallback
* @param {JSONObject} val
* @param {string} path
* @param {PlainObject|GenericArray} parent
* @param {string} parentPropName
* @returns {boolean}
*/

/* eslint-disable max-len -- Can make multiline type after https://github.com/syavorsky/comment-parser/issues/109 */

/**
 * @typedef {PlainObject} JSONPathOptions
 * @property {JSON} json
 * @property {string|string[]} path
 * @property {"value"|"path"|"pointer"|"parent"|"parentProperty"|"all"} [resultType="value"]
 * @property {boolean} [flatten=false]
 * @property {boolean} [wrap=true]
 * @property {PlainObject} [sandbox={}]
 * @property {boolean} [preventEval=false]
 * @property {PlainObject|GenericArray|null} [parent=null]
 * @property {string|null} [parentProperty=null]
 * @property {JSONPathCallback} [callback]
 * @property {OtherTypeCallback} [otherTypeCallback] Defaults to
 *   function which throws on encountering `@other`
 * @property {boolean} [autostart=true]
 */

/* eslint-enable max-len -- Can make multiline type after https://github.com/syavorsky/comment-parser/issues/109 */

/**
 * @param {string|JSONPathOptions} opts If a string, will be treated as `expr`
 * @param {string} [expr] JSON path to evaluate
 * @param {JSON} [obj] JSON object to evaluate against
 * @param {JSONPathCallback} [callback] Passed 3 arguments: 1) desired payload
 *     per `resultType`, 2) `"value"|"property"`, 3) Full returned object with
 *     all payloads
 * @param {OtherTypeCallback} [otherTypeCallback] If `@other()` is at the end
 *   of one's query, this will be invoked with the value of the item, its
 *   path, its parent, and its parent's property name, and it should return
 *   a boolean indicating whether the supplied value belongs to the "other"
 *   type or not (or it may handle transformations and return `false`).
 * @returns {JSONPath}
 * @class
 */

function JSONPath(opts, expr, obj, callback, otherTypeCallback) {
  // eslint-disable-next-line no-restricted-syntax
  if (!(this instanceof JSONPath)) {
    try {
      return new JSONPath(opts, expr, obj, callback, otherTypeCallback);
    } catch (e) {
      if (!e.avoidNew) {
        throw e;
      }
      return e.value;
    }
  }
  if (typeof opts === 'string') {
    otherTypeCallback = callback;
    callback = obj;
    obj = expr;
    expr = opts;
    opts = null;
  }
  var optObj = opts && _typeof(opts) === 'object';
  opts = opts || {};
  this.json = opts.json || obj;
  this.path = opts.path || expr;
  this.resultType = opts.resultType || 'value';
  this.flatten = opts.flatten || false;
  this.wrap = hasOwnProp.call(opts, 'wrap') ? opts.wrap : true;
  this.sandbox = opts.sandbox || {};
  this.preventEval = opts.preventEval || false;
  this.parent = opts.parent || null;
  this.parentProperty = opts.parentProperty || null;
  this.callback = opts.callback || callback || null;
  this.otherTypeCallback = opts.otherTypeCallback || otherTypeCallback || function () {
    throw new TypeError('You must supply an otherTypeCallback callback option ' + 'with the @other() operator.');
  };
  if (opts.autostart !== false) {
    var args = {
      path: optObj ? opts.path : expr
    };
    if (!optObj) {
      args.json = obj;
    } else if ('json' in opts) {
      args.json = opts.json;
    }
    var ret = this.evaluate(args);
    if (!ret || _typeof(ret) !== 'object') {
      throw new NewError(ret);
    }
    return ret;
  }
} // PUBLIC METHODS

JSONPath.prototype.evaluate = function (expr, json, callback, otherTypeCallback) {
  var _this2 = this;
  var currParent = this.parent,
    currParentProperty = this.parentProperty;
  var flatten = this.flatten,
    wrap = this.wrap;
  this.currResultType = this.resultType;
  this.currPreventEval = this.preventEval;
  this.currSandbox = this.sandbox;
  callback = callback || this.callback;
  this.currOtherTypeCallback = otherTypeCallback || this.otherTypeCallback;
  json = json || this.json;
  expr = expr || this.path;
  if (expr && _typeof(expr) === 'object' && !Array.isArray(expr)) {
    if (!expr.path && expr.path !== '') {
      throw new TypeError('You must supply a "path" property when providing an object ' + 'argument to JSONPath.evaluate().');
    }
    if (!hasOwnProp.call(expr, 'json')) {
      throw new TypeError('You must supply a "json" property when providing an object ' + 'argument to JSONPath.evaluate().');
    }
    var _expr = expr;
    json = _expr.json;
    flatten = hasOwnProp.call(expr, 'flatten') ? expr.flatten : flatten;
    this.currResultType = hasOwnProp.call(expr, 'resultType') ? expr.resultType : this.currResultType;
    this.currSandbox = hasOwnProp.call(expr, 'sandbox') ? expr.sandbox : this.currSandbox;
    wrap = hasOwnProp.call(expr, 'wrap') ? expr.wrap : wrap;
    this.currPreventEval = hasOwnProp.call(expr, 'preventEval') ? expr.preventEval : this.currPreventEval;
    callback = hasOwnProp.call(expr, 'callback') ? expr.callback : callback;
    this.currOtherTypeCallback = hasOwnProp.call(expr, 'otherTypeCallback') ? expr.otherTypeCallback : this.currOtherTypeCallback;
    currParent = hasOwnProp.call(expr, 'parent') ? expr.parent : currParent;
    currParentProperty = hasOwnProp.call(expr, 'parentProperty') ? expr.parentProperty : currParentProperty;
    expr = expr.path;
  }
  currParent = currParent || null;
  currParentProperty = currParentProperty || null;
  if (Array.isArray(expr)) {
    expr = JSONPath.toPathString(expr);
  }
  if (!expr && expr !== '' || !json) {
    return undefined;
  }
  var exprList = JSONPath.toPathArray(expr);
  if (exprList[0] === '$' && exprList.length > 1) {
    exprList.shift();
  }
  this._hasParentSelector = null;
  var result = this._trace(exprList, json, ['$'], currParent, currParentProperty, callback).filter(function (ea) {
    return ea && !ea.isParentSelector;
  });
  if (!result.length) {
    return wrap ? [] : undefined;
  }
  if (!wrap && result.length === 1 && !result[0].hasArrExpr) {
    return this._getPreferredOutput(result[0]);
  }
  return result.reduce(function (rslt, ea) {
    var valOrPath = _this2._getPreferredOutput(ea);
    if (flatten && Array.isArray(valOrPath)) {
      rslt = rslt.concat(valOrPath);
    } else {
      rslt.push(valOrPath);
    }
    return rslt;
  }, []);
}; // PRIVATE METHODS

JSONPath.prototype._getPreferredOutput = function (ea) {
  var resultType = this.currResultType;
  switch (resultType) {
    case 'all':
      {
        var path = Array.isArray(ea.path) ? ea.path : JSONPath.toPathArray(ea.path);
        ea.pointer = JSONPath.toPointer(path);
        ea.path = typeof ea.path === 'string' ? ea.path : JSONPath.toPathString(ea.path);
        return ea;
      }
    case 'value':
    case 'parent':
    case 'parentProperty':
      return ea[resultType];
    case 'path':
      return JSONPath.toPathString(ea[resultType]);
    case 'pointer':
      return JSONPath.toPointer(ea.path);
    default:
      throw new TypeError('Unknown result type');
  }
};
JSONPath.prototype._handleCallback = function (fullRetObj, callback, type) {
  if (callback) {
    var preferredOutput = this._getPreferredOutput(fullRetObj);
    fullRetObj.path = typeof fullRetObj.path === 'string' ? fullRetObj.path : JSONPath.toPathString(fullRetObj.path); // eslint-disable-next-line n/callback-return

    callback(preferredOutput, type, fullRetObj);
  }
};
/**
 *
 * @param {string} expr
 * @param {JSONObject} val
 * @param {string} path
 * @param {PlainObject|GenericArray} parent
 * @param {string} parentPropName
 * @param {JSONPathCallback} callback
 * @param {boolean} hasArrExpr
 * @param {boolean} literalPriority
 * @returns {ReturnObject|ReturnObject[]}
 */

JSONPath.prototype._trace = function (expr, val, path, parent, parentPropName, callback, hasArrExpr, literalPriority) {
  var _this3 = this;

  // No expr to follow? return path and value as the result of
  //  this trace branch
  var retObj;
  if (!expr.length) {
    retObj = {
      path: path,
      value: val,
      parent: parent,
      parentProperty: parentPropName,
      hasArrExpr: hasArrExpr
    };
    this._handleCallback(retObj, callback, 'value');
    return retObj;
  }
  var loc = expr[0],
    x = expr.slice(1); // We need to gather the return value of recursive trace calls in order to
  // do the parent sel computation.

  var ret = [];
  /**
   *
   * @param {ReturnObject|ReturnObject[]} elems
   * @returns {void}
   */

  function addRet(elems) {
    if (Array.isArray(elems)) {
      // This was causing excessive stack size in Node (with or
      //  without Babel) against our performance test:
      //  `ret.push(...elems);`
      elems.forEach(function (t) {
        ret.push(t);
      });
    } else {
      ret.push(elems);
    }
  }
  if ((typeof loc !== 'string' || literalPriority) && val && hasOwnProp.call(val, loc)) {
    // simple case--directly follow property
    addRet(this._trace(x, val[loc], push(path, loc), val, loc, callback, hasArrExpr)); // eslint-disable-next-line unicorn/prefer-switch -- Part of larger `if`
  } else if (loc === '*') {
    // all child properties
    this._walk(val, function (m) {
      addRet(_this3._trace(x, val[m], push(path, m), val, m, callback, true, true));
    });
  } else if (loc === '..') {
    // all descendent parent properties
    // Check remaining expression with val's immediate children
    addRet(this._trace(x, val, path, parent, parentPropName, callback, hasArrExpr));
    this._walk(val, function (m) {
      // We don't join m and x here because we only want parents,
      //   not scalar values
      if (_typeof(val[m]) === 'object') {
        // Keep going with recursive descent on val's
        //   object children
        addRet(_this3._trace(expr.slice(), val[m], push(path, m), val, m, callback, true));
      }
    }); // The parent sel computation is handled in the frame above using the
    // ancestor object of val
  } else if (loc === '^') {
    // This is not a final endpoint, so we do not invoke the callback here
    this._hasParentSelector = true;
    return {
      path: path.slice(0, -1),
      expr: x,
      isParentSelector: true
    };
  } else if (loc === '~') {
    // property name
    retObj = {
      path: push(path, loc),
      value: parentPropName,
      parent: parent,
      parentProperty: null
    };
    this._handleCallback(retObj, callback, 'property');
    return retObj;
  } else if (loc === '$') {
    // root only
    addRet(this._trace(x, val, path, null, null, callback, hasArrExpr));
  } else if (/^(\x2D?[0-9]*):(\x2D?[0-9]*):?([0-9]*)$/.test(loc)) {
    // [start:end:step]  Python slice syntax
    addRet(this._slice(loc, x, val, path, parent, parentPropName, callback));
  } else if (loc.indexOf('?(') === 0) {
    // [?(expr)] (filtering)
    if (this.currPreventEval) {
      throw new Error('Eval [?(expr)] prevented in JSONPath expression.');
    }
    var safeLoc = loc.replace(/^\?\(((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?)\)$/, '$1');
    this._walk(val, function (m) {
      if (_this3._eval(safeLoc, val[m], m, path, parent, parentPropName)) {
        addRet(_this3._trace(x, val[m], push(path, m), val, m, callback, true));
      }
    });
  } else if (loc[0] === '(') {
    // [(expr)] (dynamic property/index)
    if (this.currPreventEval) {
      throw new Error('Eval [(expr)] prevented in JSONPath expression.');
    } // As this will resolve to a property name (but we don't know it
    //  yet), property and parent information is relative to the
    //  parent of the property to which this expression will resolve

    addRet(this._trace(unshift(this._eval(loc, val, path[path.length - 1], path.slice(0, -1), parent, parentPropName), x), val, path, parent, parentPropName, callback, hasArrExpr));
  } else if (loc[0] === '@') {
    // value type: @boolean(), etc.
    var addType = false;
    var valueType = loc.slice(1, -2);
    switch (valueType) {
      case 'scalar':
        if (!val || !['object', 'function'].includes(_typeof(val))) {
          addType = true;
        }
        break;
      case 'boolean':
      case 'string':
      case 'undefined':
      case 'function':
        // eslint-disable-next-line valid-typeof
        if (_typeof(val) === valueType) {
          addType = true;
        }
        break;
      case 'integer':
        if (Number.isFinite(val) && !(val % 1)) {
          addType = true;
        }
        break;
      case 'number':
        if (Number.isFinite(val)) {
          addType = true;
        }
        break;
      case 'nonFinite':
        if (typeof val === 'number' && !Number.isFinite(val)) {
          addType = true;
        }
        break;
      case 'object':
        // eslint-disable-next-line valid-typeof
        if (val && _typeof(val) === valueType) {
          addType = true;
        }
        break;
      case 'array':
        if (Array.isArray(val)) {
          addType = true;
        }
        break;
      case 'other':
        addType = this.currOtherTypeCallback(val, path, parent, parentPropName);
        break;
      case 'null':
        if (val === null) {
          addType = true;
        }
        break;

      /* c8 ignore next 2 */

      default:
        throw new TypeError('Unknown value type ' + valueType);
    }
    if (addType) {
      retObj = {
        path: path,
        value: val,
        parent: parent,
        parentProperty: parentPropName
      };
      this._handleCallback(retObj, callback, 'value');
      return retObj;
    } // `-escaped property
  } else if (loc[0] === '`' && val && hasOwnProp.call(val, loc.slice(1))) {
    var locProp = loc.slice(1);
    addRet(this._trace(x, val[locProp], push(path, locProp), val, locProp, callback, hasArrExpr, true));
  } else if (loc.includes(',')) {
    // [name1,name2,...]
    var parts = loc.split(',');
    var _iterator = _createForOfIteratorHelper(parts),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var part = _step.value;
        addRet(this._trace(unshift(part, x), val, path, parent, parentPropName, callback, true));
      } // simple case--directly follow property
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else if (!literalPriority && val && hasOwnProp.call(val, loc)) {
    addRet(this._trace(x, val[loc], push(path, loc), val, loc, callback, hasArrExpr, true));
  } // We check the resulting values for parent selections. For parent
  // selections we discard the value object and continue the trace with the
  // current val object

  if (this._hasParentSelector) {
    for (var t = 0; t < ret.length; t++) {
      var rett = ret[t];
      if (rett && rett.isParentSelector) {
        var tmp = this._trace(rett.expr, val, rett.path, parent, parentPropName, callback, hasArrExpr);
        if (Array.isArray(tmp)) {
          ret[t] = tmp[0];
          var tl = tmp.length;
          for (var tt = 1; tt < tl; tt++) {
            t++;
            ret.splice(t, 0, tmp[tt]);
          }
        } else {
          ret[t] = tmp;
        }
      }
    }
  }
  return ret;
};
JSONPath.prototype._walk = function (val, f) {
  if (Array.isArray(val)) {
    var n = val.length;
    for (var i = 0; i < n; i++) {
      f(i);
    }
  } else if (val && _typeof(val) === 'object') {
    Object.keys(val).forEach(function (m) {
      f(m);
    });
  }
};
JSONPath.prototype._slice = function (loc, expr, val, path, parent, parentPropName, callback) {
  if (!Array.isArray(val)) {
    return undefined;
  }
  var len = val.length,
    parts = loc.split(':'),
    step = parts[2] && Number.parseInt(parts[2]) || 1;
  var start = parts[0] && Number.parseInt(parts[0]) || 0,
    end = parts[1] && Number.parseInt(parts[1]) || len;
  start = start < 0 ? Math.max(0, start + len) : Math.min(len, start);
  end = end < 0 ? Math.max(0, end + len) : Math.min(len, end);
  var ret = [];
  for (var i = start; i < end; i += step) {
    var tmp = this._trace(unshift(i, expr), val, path, parent, parentPropName, callback, true); // Should only be possible to be an array here since first part of
    //   ``unshift(i, expr)` passed in above would not be empty, nor `~`,
    //     nor begin with `@` (as could return objects)
    // This was causing excessive stack size in Node (with or
    //  without Babel) against our performance test: `ret.push(...tmp);`

    tmp.forEach(function (t) {
      ret.push(t);
    });
  }
  return ret;
};
JSONPath.prototype._eval = function (code, _v, _vname, path, parent, parentPropName) {
  this.currSandbox._$_parentProperty = parentPropName;
  this.currSandbox._$_parent = parent;
  this.currSandbox._$_property = _vname;
  this.currSandbox._$_root = this.json;
  this.currSandbox._$_v = _v;
  var containsPath = code.includes('@path');
  if (containsPath) {
    this.currSandbox._$_path = JSONPath.toPathString(path.concat([_vname]));
  }
  var scriptCacheKey = 'script:' + code;
  if (!JSONPath.cache[scriptCacheKey]) {
    var script = code.replace(/@parentProperty/g, '_$_parentProperty').replace(/@parent/g, '_$_parent').replace(/@property/g, '_$_property').replace(/@root/g, '_$_root').replace(/@([\t-\r \)\.\[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])/g, '_$_v$1');
    if (containsPath) {
      script = script.replace(/@path/g, '_$_path');
    }
    JSONPath.cache[scriptCacheKey] = new this.vm.Script(script);
  }
  try {
    return JSONPath.cache[scriptCacheKey].runInNewContext(this.currSandbox);
  } catch (e) {
    throw new Error('jsonPath: ' + e.message + ': ' + code);
  }
}; // PUBLIC CLASS PROPERTIES AND METHODS
// Could store the cache object itself

JSONPath.cache = {};
/**
 * @param {string[]} pathArr Array to convert
 * @returns {string} The path string
 */

JSONPath.toPathString = function (pathArr) {
  var x = pathArr,
    n = x.length;
  var p = '$';
  for (var i = 1; i < n; i++) {
    if (!/^(~|\^|@(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\(\))$/.test(x[i])) {
      p += /^[\*0-9]+$/.test(x[i]) ? '[' + x[i] + ']' : "['" + x[i] + "']";
    }
  }
  return p;
};
/**
 * @param {string} pointer JSON Path
 * @returns {string} JSON Pointer
 */

JSONPath.toPointer = function (pointer) {
  var x = pointer,
    n = x.length;
  var p = '';
  for (var i = 1; i < n; i++) {
    if (!/^(~|\^|@(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\(\))$/.test(x[i])) {
      p += '/' + x[i].toString().replace(/~/g, '~0').replace(/\//g, '~1');
    }
  }
  return p;
};
/**
 * @param {string} expr Expression to convert
 * @returns {string[]}
 */

JSONPath.toPathArray = function (expr) {
  var cache = JSONPath.cache;
  if (cache[expr]) {
    return cache[expr].concat();
  }
  var subx = [];
  var normalized = expr // Properties
  .replace(/@(?:null|boolean|number|string|integer|undefined|nonFinite|scalar|array|object|function|other)\(\)/g, ';$&;') // Parenthetical evaluations (filtering and otherwise), directly
  //   within brackets or single quotes
  .replace(/['\[](\??\((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\))['\]]/g, function ($0, $1) {
    return '[#' + (subx.push($1) - 1) + ']';
  }) // Escape periods and tildes within properties
  .replace(/\[["']((?:(?!['\]])[\s\S])*)["']\]/g, function ($0, prop) {
    return "['" + prop.replace(/\./g, '%@%').replace(/~/g, '%%@@%%') + "']";
  }) // Properties operator
  .replace(/~/g, ';~;') // Split by property boundaries
  .replace(/["']?\.["']?(?!(?:(?!\[)[\s\S])*\])|\[["']?/g, ';') // Reinsert periods within properties
  .replace(/%@%/g, '.') // Reinsert tildes within properties
  .replace(/%%@@%%/g, '~') // Parent
  .replace(/(?:;)?(\^+)(?:;)?/g, function ($0, ups) {
    return ';' + ups.split('').join(';') + ';';
  }) // Descendents
  .replace(/;;;|;;/g, ';..;') // Remove trailing
  .replace(/;$|'?\]|'$/g, '');
  var exprList = normalized.split(';').map(function (exp) {
    var match = exp.match(/#([0-9]+)/);
    return !match || !match[1] ? exp : subx[match[1]];
  });
  cache[expr] = exprList;
  return cache[expr].concat();
};

/**
 * @typedef {any} ContextItem
 */

/**
 * @typedef {any} EvaluatedResult
 */

/**
 * @callback ConditionCallback
 * @param {ContextItem} item
 * @returns {boolean}
 */

/**
 * Copy items out of one array into another.
 * @param {GenericArray} source Array with items to copy
 * @param {GenericArray} target Array to which to copy
 * @param {ConditionCallback} conditionCb Callback passed the current item;
 *     will move item if evaluates to `true`
 * @returns {void}
 */

var moveToAnotherArray = function moveToAnotherArray(source, target, conditionCb) {
  var il = source.length;
  for (var i = 0; i < il; i++) {
    var item = source[i];
    if (conditionCb(item)) {
      target.push(source.splice(i--, 1)[0]);
    }
  }
};
/**
 * In-browser replacement for NodeJS' VM.Script.
 */

var Script = /*#__PURE__*/function () {
  /**
   * @param {string} expr Expression to evaluate
   */
  function Script(expr) {
    _classCallCheck(this, Script);
    this.code = expr;
  }
  /**
   * @param {PlainObject} context Object whose items will be added
   *   to evaluation
   * @returns {EvaluatedResult} Result of evaluated code
   */

  _createClass(Script, [{
    key: "runInNewContext",
    value: function runInNewContext(context) {
      var expr = this.code;
      var keys = Object.keys(context);
      var funcs = [];
      moveToAnotherArray(keys, funcs, function (key) {
        return typeof context[key] === 'function';
      });
      var values = keys.map(function (vr, i) {
        return context[vr];
      });
      var funcString = funcs.reduce(function (s, func) {
        var fString = context[func].toString();
        if (!/function/.test(fString)) {
          fString = 'function ' + fString;
        }
        return 'var ' + func + '=' + fString + ';' + s;
      }, '');
      expr = funcString + expr; // Mitigate http://perfectionkills.com/global-eval-what-are-the-options/#new_function

      if (!/(["'])use strict\1/.test(expr) && !keys.includes('arguments')) {
        expr = 'var arguments = undefined;' + expr;
      } // Remove last semi so `return` will be inserted before
      //  the previous one instead, allowing for the return
      //  of a bare ending expression

      expr = expr.replace(/;[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*$/, ''); // Insert `return`

      var lastStatementEnd = expr.lastIndexOf(';');
      var code = lastStatementEnd > -1 ? expr.slice(0, lastStatementEnd + 1) + ' return ' + expr.slice(lastStatementEnd + 1) : ' return ' + expr; // eslint-disable-next-line no-new-func

      return _construct(Function, keys.concat([code])).apply(void 0, _toConsumableArray(values));
    }
  }]);
  return Script;
}();
JSONPath.prototype.vm = {
  Script: Script
};


/***/ }),

/***/ 8612:
/*!***************************************************!*\
  !*** ../../libs/core/dist/packages/core/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractActionHandler": () => (/* binding */ AbstractActionHandler),
/* harmony export */   "AbstractDontCodeStoreProvider": () => (/* binding */ AbstractDontCodeStoreProvider),
/* harmony export */   "AbstractSchemaItem": () => (/* binding */ AbstractSchemaItem),
/* harmony export */   "Action": () => (/* binding */ Action),
/* harmony export */   "ActionContextType": () => (/* binding */ ActionContextType),
/* harmony export */   "ActionType": () => (/* binding */ ActionType),
/* harmony export */   "Change": () => (/* binding */ Change),
/* harmony export */   "ChangeType": () => (/* binding */ ChangeType),
/* harmony export */   "DataTransformationInfo": () => (/* binding */ DataTransformationInfo),
/* harmony export */   "DontCodeChangeManager": () => (/* binding */ DontCodeChangeManager),
/* harmony export */   "DontCodeCore": () => (/* binding */ DontCodeCore),
/* harmony export */   "DontCodeGroupOperationType": () => (/* binding */ DontCodeGroupOperationType),
/* harmony export */   "DontCodeModel": () => (/* binding */ DontCodeModel),
/* harmony export */   "DontCodeModelManager": () => (/* binding */ DontCodeModelManager),
/* harmony export */   "DontCodeModelPointer": () => (/* binding */ DontCodeModelPointer),
/* harmony export */   "DontCodePluginManager": () => (/* binding */ DontCodePluginManager),
/* harmony export */   "DontCodePreviewManager": () => (/* binding */ DontCodePreviewManager),
/* harmony export */   "DontCodeProject": () => (/* binding */ DontCodeProject),
/* harmony export */   "DontCodeReportGroupShowType": () => (/* binding */ DontCodeReportGroupShowType),
/* harmony export */   "DontCodeSchema": () => (/* binding */ DontCodeSchema),
/* harmony export */   "DontCodeSchemaEnum": () => (/* binding */ DontCodeSchemaEnum),
/* harmony export */   "DontCodeSchemaEnumValue": () => (/* binding */ DontCodeSchemaEnumValue),
/* harmony export */   "DontCodeSchemaManager": () => (/* binding */ DontCodeSchemaManager),
/* harmony export */   "DontCodeSchemaObject": () => (/* binding */ DontCodeSchemaObject),
/* harmony export */   "DontCodeSchemaProperty": () => (/* binding */ DontCodeSchemaProperty),
/* harmony export */   "DontCodeSchemaRef": () => (/* binding */ DontCodeSchemaRef),
/* harmony export */   "DontCodeSchemaRoot": () => (/* binding */ DontCodeSchemaRoot),
/* harmony export */   "DontCodeSchemaValue": () => (/* binding */ DontCodeSchemaValue),
/* harmony export */   "DontCodeSortDirectionType": () => (/* binding */ DontCodeSortDirectionType),
/* harmony export */   "DontCodeStoreAggregate": () => (/* binding */ DontCodeStoreAggregate),
/* harmony export */   "DontCodeStoreCriteria": () => (/* binding */ DontCodeStoreCriteria),
/* harmony export */   "DontCodeStoreCriteriaOperator": () => (/* binding */ DontCodeStoreCriteriaOperator),
/* harmony export */   "DontCodeStoreGroupby": () => (/* binding */ DontCodeStoreGroupby),
/* harmony export */   "DontCodeStoreGroupedByEntities": () => (/* binding */ DontCodeStoreGroupedByEntities),
/* harmony export */   "DontCodeStoreGroupedByValues": () => (/* binding */ DontCodeStoreGroupedByValues),
/* harmony export */   "DontCodeStoreManager": () => (/* binding */ DontCodeStoreManager),
/* harmony export */   "DontCodeStorePreparedEntities": () => (/* binding */ DontCodeStorePreparedEntities),
/* harmony export */   "DontCodeStoreSort": () => (/* binding */ DontCodeStoreSort),
/* harmony export */   "DontCodeTestManager": () => (/* binding */ DontCodeTestManager),
/* harmony export */   "Message": () => (/* binding */ Message),
/* harmony export */   "MessageType": () => (/* binding */ MessageType),
/* harmony export */   "ModelQuerySingleResult": () => (/* binding */ ModelQuerySingleResult),
/* harmony export */   "MoneyAmount": () => (/* binding */ MoneyAmount),
/* harmony export */   "SpecialFields": () => (/* binding */ SpecialFields),
/* harmony export */   "StoreProviderHelper": () => (/* binding */ StoreProviderHelper),
/* harmony export */   "TestProviderInterface": () => (/* binding */ TestProviderInterface),
/* harmony export */   "concatIterable": () => (/* binding */ concatIterable),
/* harmony export */   "dtcde": () => (/* binding */ dtcde)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ 9615);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ 297);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ 1527);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ 3373);
/* harmony import */ var core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.starts-with.js */ 690);
/* harmony import */ var core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.ends-with.js */ 6890);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 5527);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 8837);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 1382);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 224);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs */ 1211);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs */ 1579);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs */ 7679);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! rxjs */ 787);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs */ 2954);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! rxjs */ 8271);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ 9803);
/* harmony import */ var core_js_modules_es_array_sort_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.sort.js */ 6594);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ 2879);
/* harmony import */ var jsonpath_plus__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! jsonpath-plus */ 5178);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.promise.js */ 7618);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ 170);













class AbstractSchemaItem {
  constructor(parent, relativeId) {
    this.array = false;
    this.readOnly = false;
    this.hidden = false;
    this.parent = parent;
    this.relativeId = relativeId;
  }
  isArray() {
    return this.array;
  }
  setArray(val) {
    this.array = val;
  }
  isEnum() {
    return false;
  }
  isObject() {
    return false;
  }
  isReference() {
    return false;
  }
  isValue() {
    return false;
  }
  isRoot() {
    return false;
  }
  isHidden() {
    return this.hidden;
  }
  setHidden(val) {
    this.hidden = val;
  }
  isReadonly() {
    return this.readOnly;
  }
  setReadonly(val) {
    this.readOnly = val;
  }
  static generateItem(json, itemId, parent) {
    let isArray = Array.isArray(json);
    if (isArray) {
      console.error('arrays are not supported', json);
      return json;
    }
    let ret;
    isArray = false;
    if (json['type']) {
      const type = json['type'];
      switch (type) {
        case 'object':
          ret = new DontCodeSchemaObject(json, itemId, parent);
          break;
        case 'array':
          ret = this.generateItem(json['items'], itemId, parent);
          isArray = true;
          break;
        default:
          ret = new DontCodeSchemaValue(json, itemId, parent);
      }
    } else if (json['enum']) {
      ret = new DontCodeSchemaEnum(json, itemId, parent);
    } else if (json['$ref']) {
      ret = new DontCodeSchemaRef(json, itemId, parent);
    } else {
      return json;
    }
    if (json['readOnly'] === true) ret.setReadonly(true);
    if (json['writeOnly'] === true) ret.setHidden(true);
    ret.setArray(isArray);
    return ret;
  }
  static isObject(item) {
    return typeof item === 'object' && !Array.isArray(item) && item !== null;
  }
  static goto(entity, to) {
    let ret = entity;
    to.split('/').forEach(value => {
      if (value !== '#' && value != '') {
        ret = ret === null || ret === void 0 ? void 0 : ret.getChild(value);
      }
      if (!ret) {
        console.error('Cannot find ' + value + ' of ' + to + ' in the following item ', entity);
      }
    });
    return ret;
  }
  upsertWith(change) {
    return false;
  }
  getParent() {
    return this.parent;
  }
  getChild(id) {
    return;
  }
  getChildren() {
    return new Map().entries();
  }
  updateWith(update) {
    //
  }
  allProperties() {
    return [].values();
  }
  getProperties(code) {
    return undefined;
  }
  hasProperties(code) {
    return false;
  }
  getRelativeId() {
    return this.relativeId;
  }
  setRelativeId(relativeId) {
    this.relativeId = relativeId;
  }
  getTargetPath() {
    return this.targetPath;
  }
  setTargetPath(newPath) {
    this.targetPath = newPath;
  }
  isPossibleDynamicProperty(code) {
    const children = this.getChildren();
    for (const child of children) {
      const childProps = child[1].allProperties();
      for (const childProp of childProps) {
        if (childProp[1].getChild(code)) {
          return childProp[1];
        }
      }
    }
    return undefined;
  }
  /**
   * Returns all properties that can be used by this SchemaItem depending on the values entered
   */
  getAllPossibleDynamicProperties() {
    const children = this.getChildren();
    const ret = new Map();
    for (const child of children) {
      const childProps = child[1].allProperties();
      for (const childProp of childProps) {
        for (const childChildProp of childProp[1].getChildren()) {
          if (ret.has(childChildProp[0])) {
            console.warn("Dynamic Property " + childChildProp[0] + " is being defined by multiple children.");
          }
          ret.set(childChildProp[0], childChildProp[1]);
        }
      }
    }
    return ret.entries();
  }
  /**
   * Returns the list of children and all possible dynamic properties that can be created depending on the values entered
   */
  getChildrenAndPossibleProperties() {
    return concatIterable(this.getChildren(), this.getAllPossibleDynamicProperties());
  }
}
/**
 * Generator function to combine multiple iterators into one
 * @param iterators
 */
function* concatIterable(...iterators) {
  for (let i of iterators) {
    i = i[Symbol.iterator]();
    let f;
    while (true) {
      f = i.next();
      if (f.done) {
        break;
      }
      yield f.value;
    }
  }
}
/**
 * Handles an item defined as an object consisting of a name and a set of named children
 */
class DontCodeSchemaObject extends AbstractSchemaItem {
  constructor(json, relativeId, parent) {
    super(parent, relativeId);
    this.children = new Map();
    if (json) this.readJson(json);
  }
  readJson(json) {
    const props = json['properties'];
    if (props) {
      for (const key in props) {
        this.children.set(key, AbstractSchemaItem.generateItem(props[key], key, this));
      }
    }
    /*const definitions =json['$defs'];
    if( definitions) {
      const defsItem=AbstractSchemaItem.generateItem(definitions, '$defs', this);
      this.children.set('$defs', defsItem);
    }*/
  }
  isEnum() {
    return false;
  }
  isObject() {
    return true;
  }
  isReference() {
    return false;
  }
  isValue() {
    return false;
  }
  isRoot() {
    return false;
  }
  upsertWith(change) {
    const existsOrNot = this.getChild(change.location.id);
    if (!existsOrNot) {
      if (change.location.id != null) {
        const exists = AbstractSchemaItem.generateItem(change.update, change.location.id, this);
        if (change.location.after) {
          const newMap = new Map();
          this.children.forEach((value, key) => {
            newMap.set(key, value);
            if (key === change.location.after && change.location.id != null) {
              newMap.set(change.location.id, exists);
            }
          });
          this.children = newMap;
        } else {
          this.children.set(change.location.id, exists);
        }
        exists.updateWith(change);
      }
    } else {
      // Make sure to load the sub-properties
      existsOrNot.updateWith(change);
    }
    return true;
  }
  updateWith(update) {
    super.updateWith(update);
  }
  getChild(id) {
    if (id) return this.children.get(id);else return;
  }
  getChildren() {
    return this.children.entries();
  }
}
/**
 * The root item of the model is a specialized object
 */
class DontCodeSchemaRoot extends DontCodeSchemaObject {
  constructor(json) {
    super(json, undefined);
  }
  readJson(json) {
    super.readJson(json);
    // Let the base class believe it's a property and do all the work !
    const $defs = json['$defs'];
    if ($defs) {
      this.children.set('$defs', new DontCodeSchemaObject({
        properties: $defs
      }, '$defs', this));
    }
  }
  isEnum() {
    return false;
  }
  isObject() {
    return true;
  }
  isReference() {
    return false;
  }
  isValue() {
    return false;
  }
  isRoot() {
    return true;
  }
}
/**
 * Supports selection of a value amongst a list (or a hierarchical tree)
 */
class DontCodeSchemaEnum extends AbstractSchemaItem {
  constructor(json, relativeId, parent) {
    super(parent, relativeId);
    this.values = new Array();
    this.properties = new Map();
    this.updateValues(json['enum'], this.values);
    this.targetPath = json['format'];
  }
  isEnum() {
    return true;
  }
  isObject() {
    return false;
  }
  isReference() {
    return false;
  }
  isValue() {
    return false;
  }
  isRoot() {
    return false;
  }
  getValues() {
    return this.values;
  }
  updateWith(update) {
    super.updateWith(update);
    this.updateValues(update.update['enum'], this.values, update);
  }
  updateValues(values, destination, from) {
    values.forEach(value => {
      if (typeof value === 'string') {
        if (!destination.find(dest => {
          return dest.getValue() === value;
        })) {
          destination.push(new DontCodeSchemaEnumValue(value));
        }
        if (from === null || from === void 0 ? void 0 : from.props) {
          const props = new DontCodeSchemaProperty(from, this.relativeId + '=' + value, this);
          if (!props.isEmpty()) this.properties.set(value, props);
        }
      } else {
        for (const subKey in value) {
          if (value.hasOwnProperty(subKey)) {
            let enumValue = destination.find(dest => {
              return dest.getValue() === value;
            });
            if (!enumValue) {
              enumValue = new DontCodeSchemaEnumValue(subKey);
              destination.push(enumValue);
            }
            if (!enumValue.getChildren()) enumValue.setChildren([]);
            this.updateValues(value[subKey].enum, enumValue.getChildren(), from);
          }
        }
      }
    });
  }
  allProperties() {
    return this.properties.entries();
  }
  getProperties(code) {
    return this.properties.get(code);
  }
  hasProperties(code) {
    return this.properties.has(code);
  }
}
/**
 * A Simple class to store possible hierarchies of values, and separate label from the model value
 */
class DontCodeSchemaEnumValue {
  constructor(value, label) {
    this._children = new Array();
    this._value = value;
    if (label) {
      this._label = label;
    } else {
      this._label = value;
    }
  }
  getLabel() {
    if (this._label) return this._label;else return this._value;
  }
  setLabel(value) {
    this._label = value;
  }
  getValue() {
    return this._value;
  }
  setValue(value) {
    this._value = value;
  }
  getChildren() {
    return this._children;
  }
  setChildren(value) {
    this._children = value;
  }
}
/**
 * The model item is just a value that the user can change
 */
class DontCodeSchemaValue extends AbstractSchemaItem {
  constructor(json, relativeId, parent) {
    super(parent, relativeId);
    this.type = json['type'];
    this.targetPath = json['format'];
  }
  isValue() {
    return true;
  }
  getType() {
    return this.type;
  }
}
/**
 * This item is a reference (in json-schema term) to a definition elsewhere in the schema.
 */
class DontCodeSchemaRef extends AbstractSchemaItem {
  constructor(json, relativeId, parent) {
    super(parent, relativeId);
    this.resolvedRef = new Map();
    this.ref = json['$ref'];
  }
  isReference() {
    return true;
  }
  getReference() {
    return this.ref;
  }
  resolveReference(resolved) {
    this.resolvedRef.set('', resolved);
  }
  getChildren() {
    return this.resolvedRef.entries();
  }
}
/**
 * An Object Item in the schema can define alternative subproperties that are used depending on some values.
 */
class DontCodeSchemaProperty extends DontCodeSchemaObject {
  constructor(json, relativeId, parent) {
    super({
      type: 'object',
      properties: json.props
    }, relativeId, parent);
    if (json.replace) {
      this.replace = json.replace;
    } else {
      this.replace = false;
    }
    this.posAfter = json.location.after;
  }
  isEmpty() {
    return this.children.size == 0;
  }
  isReplace() {
    return this.replace;
  }
  getPosAfter() {
    return this.posAfter;
  }
}
class DontCodeModel {}
DontCodeModel.ROOT = 'creation';
DontCodeModel.APP_NAME_NODE = 'name';
DontCodeModel.APP_TYPE_NODE = 'type';
DontCodeModel.APP_TYPE = DontCodeModel.ROOT + '/' + DontCodeModel.APP_TYPE_NODE;
DontCodeModel.APP_NAME = DontCodeModel.ROOT + '/' + DontCodeModel.APP_NAME_NODE;
DontCodeModel.APP_ENTITIES_NODE = 'entities';
DontCodeModel.APP_ENTITIES = DontCodeModel.ROOT + '/' + DontCodeModel.APP_ENTITIES_NODE;
DontCodeModel.APP_ENTITIES_FROM_NODE = 'from';
DontCodeModel.APP_ENTITIES_FROM = DontCodeModel.APP_ENTITIES + '/' + DontCodeModel.APP_ENTITIES_FROM_NODE;
DontCodeModel.APP_ENTITIES_NAME_NODE = 'name';
DontCodeModel.APP_ENTITIES_NAME = DontCodeModel.APP_ENTITIES + '/' + DontCodeModel.APP_ENTITIES_NAME_NODE;
DontCodeModel.APP_FIELDS_NODE = 'fields';
DontCodeModel.APP_FIELDS = DontCodeModel.APP_ENTITIES + '/' + DontCodeModel.APP_FIELDS_NODE;
DontCodeModel.APP_FIELDS_NAME_NODE = 'name';
DontCodeModel.APP_FIELDS_NAME = DontCodeModel.APP_FIELDS + '/' + DontCodeModel.APP_FIELDS_NAME_NODE;
DontCodeModel.APP_FIELDS_TYPE_NODE = 'type';
DontCodeModel.APP_FIELDS_TYPE = DontCodeModel.APP_FIELDS + '/' + DontCodeModel.APP_FIELDS_TYPE_NODE;
DontCodeModel.APP_SHARING_NODE = 'sharing';
DontCodeModel.APP_SHARING = DontCodeModel.ROOT + '/' + DontCodeModel.APP_SHARING_NODE;
DontCodeModel.APP_SHARING_WITH_NODE = 'with';
DontCodeModel.APP_SHARING_WITH = DontCodeModel.APP_SHARING + '/' + DontCodeModel.APP_SHARING_WITH_NODE;
DontCodeModel.APP_REPORTS_NODE = 'reports';
DontCodeModel.APP_REPORTS = DontCodeModel.ROOT + '/' + DontCodeModel.APP_REPORTS_NODE;
DontCodeModel.APP_REPORTS_TITLE_NODE = 'title';
DontCodeModel.APP_REPORTS_TITLE = DontCodeModel.APP_REPORTS + '/' + DontCodeModel.APP_REPORTS_TITLE_NODE;
DontCodeModel.APP_REPORTS_FOR_NODE = 'for';
DontCodeModel.APP_REPORTS_FOR = DontCodeModel.APP_REPORTS + '/' + DontCodeModel.APP_REPORTS_FOR_NODE;
DontCodeModel.APP_REPORTS_GROUP_NODE = 'groupedBy';
DontCodeModel.APP_REPORTS_GROUP = DontCodeModel.APP_REPORTS + '/' + DontCodeModel.APP_REPORTS_GROUP_NODE;
DontCodeModel.APP_REPORTS_SORT_NODE = 'sortedBy';
DontCodeModel.APP_REPORTS_SORT = DontCodeModel.APP_REPORTS + '/' + DontCodeModel.APP_REPORTS_SORT_NODE;
DontCodeModel.APP_REPORTS_DISPLAY_NODE = 'as';
DontCodeModel.APP_REPORTS_DISPLAY = DontCodeModel.APP_REPORTS + '/' + DontCodeModel.APP_REPORTS_DISPLAY_NODE;
DontCodeModel.APP_REPORTS_GROUP_LABEL_NODE = 'label';
DontCodeModel.APP_REPORTS_GROUP_LABEL = DontCodeModel.APP_REPORTS_GROUP + '/' + DontCodeModel.APP_REPORTS_GROUP_LABEL_NODE;
DontCodeModel.APP_REPORTS_GROUP_OF_NODE = 'of';
DontCodeModel.APP_REPORTS_GROUP_OF = DontCodeModel.APP_REPORTS_GROUP + '/' + DontCodeModel.APP_REPORTS_GROUP_OF_NODE;
DontCodeModel.APP_REPORTS_GROUP_SHOW_NODE = 'show';
DontCodeModel.APP_REPORTS_GROUP_SHOW = DontCodeModel.APP_REPORTS_GROUP + '/' + DontCodeModel.APP_REPORTS_GROUP_SHOW_NODE;
DontCodeModel.APP_REPORTS_GROUP_AGGREGATE_NODE = 'display';
DontCodeModel.APP_REPORTS_GROUP_AGGREGATE = DontCodeModel.APP_REPORTS_GROUP + '/' + DontCodeModel.APP_REPORTS_GROUP_AGGREGATE_NODE;
DontCodeModel.APP_REPORTS_GROUP_AGGREGATE_LABEL_NODE = 'label';
DontCodeModel.APP_REPORTS_GROUP_AGGREGATE_LABEL = DontCodeModel.APP_REPORTS_GROUP_AGGREGATE + '/' + DontCodeModel.APP_REPORTS_GROUP_AGGREGATE_LABEL_NODE;
DontCodeModel.APP_REPORTS_GROUP_AGGREGATE_OPERATION_NODE = 'operation';
DontCodeModel.APP_REPORTS_GROUP_AGGREGATE_OPERATION = DontCodeModel.APP_REPORTS_GROUP_AGGREGATE + '/' + DontCodeModel.APP_REPORTS_GROUP_AGGREGATE_OPERATION_NODE;
DontCodeModel.APP_REPORTS_GROUP_AGGREGATE_OF_NODE = 'of';
DontCodeModel.APP_REPORTS_GROUP_AGGREGATE_OF = DontCodeModel.APP_REPORTS_GROUP_AGGREGATE + '/' + DontCodeModel.APP_REPORTS_GROUP_AGGREGATE_OF_NODE;
DontCodeModel.APP_REPORTS_SORT_BY_NODE = 'by';
DontCodeModel.APP_REPORTS_SORT_BY = DontCodeModel.APP_REPORTS_SORT + '/' + DontCodeModel.APP_REPORTS_SORT_BY_NODE;
DontCodeModel.APP_REPORTS_SORT_DIRECTION_NODE = 'direction';
DontCodeModel.APP_REPORTS_SORT_DIRECTION = DontCodeModel.APP_REPORTS_SORT + '/' + DontCodeModel.APP_REPORTS_SORT_DIRECTION_NODE;
DontCodeModel.APP_REPORTS_DISPLAY_TITLE_NODE = 'title';
DontCodeModel.APP_REPORTS_DISPLAY_TITLE = DontCodeModel.APP_REPORTS_DISPLAY + '/' + DontCodeModel.APP_REPORTS_DISPLAY_TITLE_NODE;
DontCodeModel.APP_REPORTS_DISPLAY_TYPE_NODE = 'type';
DontCodeModel.APP_REPORTS_DISPLAY_TYPE = DontCodeModel.APP_REPORTS_DISPLAY + '/' + DontCodeModel.APP_REPORTS_DISPLAY_TYPE_NODE;
DontCodeModel.APP_REPORTS_DISPLAY_OF_NODE = 'of';
DontCodeModel.APP_REPORTS_DISPLAY_OF = DontCodeModel.APP_REPORTS_DISPLAY + '/' + DontCodeModel.APP_REPORTS_DISPLAY_OF_NODE;
DontCodeModel.APP_REPORTS_DISPLAY_BY_NODE = 'by';
DontCodeModel.APP_REPORTS_DISPLAY_BY = DontCodeModel.APP_REPORTS_DISPLAY + '/' + DontCodeModel.APP_REPORTS_DISPLAY_BY_NODE;
DontCodeModel.APP_SOURCES_NODE = 'sources';
DontCodeModel.APP_SOURCES = DontCodeModel.ROOT + '/' + DontCodeModel.APP_SOURCES_NODE;
DontCodeModel.APP_SOURCES_NAME_NODE = 'name';
DontCodeModel.APP_SOURCES_NAME = DontCodeModel.ROOT + '/' + DontCodeModel.APP_SOURCES_NODE + '/' + DontCodeModel.APP_SOURCES_NAME_NODE;
DontCodeModel.APP_SOURCES_TYPE_NODE = 'type';
DontCodeModel.APP_SOURCES_TYPE = DontCodeModel.ROOT + '/' + DontCodeModel.APP_SOURCES_NODE + '/' + DontCodeModel.APP_SOURCES_TYPE_NODE;
DontCodeModel.APP_SOURCES_URL_NODE = 'url';
DontCodeModel.APP_SOURCES_URL = DontCodeModel.ROOT + '/' + DontCodeModel.APP_SOURCES_NODE + '/' + DontCodeModel.APP_SOURCES_URL_NODE;
DontCodeModel.APP_SCREENS_NODE = 'screens';
DontCodeModel.APP_SCREENS = DontCodeModel.ROOT + '/' + DontCodeModel.APP_SCREENS_NODE;
DontCodeModel.APP_SCREENS_NAME_NODE = 'name';
DontCodeModel.APP_SCREENS_NAME = DontCodeModel.APP_SCREENS + '/' + DontCodeModel.APP_SCREENS_NAME_NODE;
DontCodeModel.APP_SCREENS_LAYOUT_NODE = 'layout';
DontCodeModel.APP_SCREENS_LAYOUT = DontCodeModel.APP_SCREENS + '/' + DontCodeModel.APP_SCREENS_LAYOUT_NODE;
DontCodeModel.APP_COMPONENTS_NODE = 'components';
DontCodeModel.APP_COMPONENTS = DontCodeModel.APP_SCREENS + '/' + DontCodeModel.APP_COMPONENTS_NODE;
DontCodeModel.APP_COMPONENTS_TYPE_NODE = 'type';
DontCodeModel.APP_COMPONENTS_TYPE = DontCodeModel.APP_COMPONENTS + '/' + DontCodeModel.APP_COMPONENTS_TYPE_NODE;
DontCodeModel.APP_COMPONENTS_ENTITY_NODE = 'entity';
DontCodeModel.APP_COMPONENTS_ENTITY = DontCodeModel.APP_COMPONENTS + '/' + DontCodeModel.APP_COMPONENTS_ENTITY_NODE;
class DontCodeSchema {}
DontCodeSchema.ROOT = '/properties/' + DontCodeModel.ROOT;
/**
 * This is a copy of dont-code-schema.json, please don't forget to update
 */
DontCodeSchema.defaultv1 = {
  "$id": "https://dont-code.net/v1/dont-code-schema.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "JSON Schema v1 for dont-code",
  "type": "object",
  "required": ["creation"],
  "properties": {
    "creation": {
      "type": "object",
      "properties": {
        "type": {
          "enum": ["Application"]
        },
        "name": {
          "type": "string"
        },
        "entities": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/entity"
          }
        },
        "sharing": {
          "$ref": "#/$defs/sharing"
        },
        "reports": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/report"
          }
        },
        "sources": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/source"
          }
        },
        "screens": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/screen"
          }
        }
      },
      "additionalProperties": false
    }
  },
  "$defs": {
    "entity": {
      "type": "object",
      "properties": {
        "from": {
          "type": "string",
          "format": "$.creation.sources.name"
        },
        "name": {
          "type": "string"
        },
        "fields": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/field"
          }
        }
      },
      "additionalProperties": false
    },
    "field": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "type": {
          "enum": ["Text", "Number", "Boolean", {
            "Time": {
              "enum": ["Date", "Date & Time", "Time"]
            }
          }, {
            "Money": {
              "enum": ["Dollar", "Euro", "Other currency"]
            },
            "Web": {
              "enum": ["Website (url)", "Image"]
            }
          }, {
            "Special": {
              "enum": ["Reference"]
            }
          }]
        }
      },
      "additionalProperties": false
    },
    "sharing": {
      "type": "object",
      "properties": {
        "with": {
          "enum": ["No-one"]
        }
      },
      "additionalProperties": false
    },
    "source": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "type": {
          "enum": ["Unknown"]
        }
      }
    },
    "report": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string"
        },
        "for": {
          "type": "string",
          "format": "$.creation.entities.name"
        },
        "groupedBy": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/report-group"
          }
        },
        "sortedBy": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/report-sort"
          }
        },
        "as": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/report-display"
          }
        }
      },
      "additionalProperties": false
    },
    "report-group": {
      "type": "object",
      "properties": {
        "of": {
          "type": "string",
          "format": ".fields.name"
        },
        "label": {
          "type": "string"
        },
        "show": {
          "enum": ["OnlyLowest", "OnlyHighest"]
        },
        "display": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/report-group-aggregate"
          }
        }
      },
      "additionalProperties": false
    },
    "report-group-aggregate": {
      "type": "object",
      "properties": {
        "operation": {
          "enum": ["Count", "Sum", "Average", "Minimum", "Maximum"]
        },
        "of": {
          "type": "string",
          "format": ".@parent.fields.name"
        },
        "label": {
          "type": "string"
        }
      },
      "additionalProperties": false
    },
    "report-sort": {
      "type": "object",
      "properties": {
        "by": {
          "type": "string",
          "format": ".fields.name"
        },
        "direction": {
          "enum": ["None", "Ascending", "Descending"]
        }
      },
      "additionalProperties": false
    },
    "report-display": {
      "type": "object",
      "properties": {
        "type": {
          "enum": ["Table", "Bar", "Line", "Pie"]
        },
        "of": {
          "type": "string",
          "format": ".@parent.fields.name"
        },
        "by": {
          "type": "string",
          "format": ".@parent.fields.name"
        },
        "title": {
          "type": "string"
        }
      },
      "additionalProperties": false
    },
    "screen": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "layout": {
          "enum": ["Flow", "Grid"]
        },
        "components": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/component"
          }
        }
      },
      "additionalProperties": false
    },
    "component": {
      "type": "object",
      "properties": {
        "type": {
          "enum": ["List", "Edit", "View"]
        },
        "entity": {
          "type": "string",
          "format": "$.creation.entities.name"
        }
      },
      "additionalProperties": false
    }
  }
};
/**
* Store all information needed to point to a single element in a model.
*/
class DontCodeModelPointer {
  constructor(position, schemaPosition, containerPosition, containerSchemaPosition, lastElement, isProperty) {
    this.position = position;
    this.positionInSchema = schemaPosition;
    this.containerPosition = containerPosition;
    this.containerPositionInSchema = containerSchemaPosition;
    if (lastElement) this.lastElement = lastElement;else this.lastElement = '';
    this.isProperty = isProperty;
    this.fillMissingElements();
  }
  fillMissingElements(optionalSchemaMgr) {
    var _a, _b, _c;
    if (this.position == null || this.positionInSchema == null) {
      throw new Error('Cannot fill Elements for an empty position');
    }
    if (this.containerPosition == null) {
      this.containerPosition = (_a = DontCodeModelPointer.parentPosition(this.position)) !== null && _a !== void 0 ? _a : undefined;
    }
    if (this.containerPositionInSchema == null) {
      this.containerPositionInSchema = (_b = DontCodeModelPointer.parentPosition(this.positionInSchema)) !== null && _b !== void 0 ? _b : undefined;
    }
    if (this.lastElement == null || this.lastElement.length == 0) {
      this.lastElement = (_c = DontCodeModelPointer.lastElementOf(this.position)) !== null && _c !== void 0 ? _c : this.position;
    }
    if (this.isProperty == null && optionalSchemaMgr) {
      if (this.containerPositionInSchema) this.isProperty = optionalSchemaMgr.locateItem(this.containerPositionInSchema, true).getChild(this.lastElement) != null;else this.isProperty = true; // We only have properties at root level
    }
  }
  /**
   * Finds the last element of this position
   * @param position
   */
  static lastElementOf(position) {
    if (position == null) return position;
    return position.substring(position.lastIndexOf('/') + 1);
  }
  /**
   * Finds the next item in the position and returns its value and position in the string
   * @param position
   * @param from
   */
  static nextItemAndPosition(position, from) {
    let posSlash = position.indexOf('/', from);
    if (posSlash === from) {
      from = from + 1;
      posSlash = position.indexOf('/', from);
    }
    if (posSlash !== -1) posSlash = posSlash - 1;else {
      if (posSlash === from) {
        posSlash = -1;
      } else {
        posSlash = position.length - 1;
      }
    }
    let value = null;
    if (posSlash !== -1) value = position.substring(from, posSlash + 1);
    return {
      pos: posSlash,
      value: value
    };
  }
  /**
   * Find the name of the last element pointed by this pointer
   * Usually it's the value of key (if it's a field) or the last container name (if it's an element in a container like entity/a/fields/a)
   * @deprecated
   */
  calculateKeyOrContainer() {
    var _a;
    if (this.isProperty === true) {
      return this.lastElement;
    } else {
      return (_a = DontCodeModelPointer.lastElementOf(this.containerPosition)) !== null && _a !== void 0 ? _a : '';
    }
  }
  /**
   * Find the ItemId or container key represented by the pointer
   * Usually it's the id of the item (if it's an element in a container like entity/a/fields/a) or the last container name
   * @Deprecated
   */
  calculateItemIdOrContainer() {
    var _a;
    if (this.isProperty === false) {
      return this.lastElement;
    } else {
      return (_a = DontCodeModelPointer.lastElementOf(this.containerPosition)) !== null && _a !== void 0 ? _a : '';
    }
  }
  /**
   * If this pointer is pointing to a direct property of the given pointer, then it returns the property's name, otherwise null
   * @param pointer
   * @return the property name or null
   */
  isSubItemOf(pointer) {
    if (pointer.position === this.containerPosition) {
      return this.lastElement;
    } else return null;
  }
  /**
   * Returns the direct property's name under which this pointer points to, even if it's pointing to sub properties of the direct property.
   * @param pointer
   * @return the property name or null
   */
  isUnderSubItemOf(pointer) {
    if (this.positionInSchema.startsWith(pointer.positionInSchema)) {
      const keyPos = this.positionInSchema.indexOf('/', pointer.positionInSchema.length + 1);
      if (keyPos == -1) return this.positionInSchema.substring(pointer.positionInSchema.length + 1);else return this.positionInSchema.substring(pointer.positionInSchema.length + 1, keyPos);
    } else return null;
  }
  /**
   * Returns a pointer pointing to a sub Item of the current pointer.
   * The current pointer must point to an array
   * @param subItem
   */
  subItemOrPropertyPointer(subElement, isItem) {
    if (isItem) return this.subPropertyPointer(subElement);else return this.subItemPointer(subElement);
  }
  /**
   * Returns a pointer pointing to a sub property of the current pointer
   * @param subProp
   */
  subPropertyPointer(subProp) {
    const newPointer = new DontCodeModelPointer(this.position === '' ? subProp : this.position + '/' + subProp, this.positionInSchema === '' ? subProp : this.positionInSchema + '/' + subProp, this.position, this.positionInSchema, subProp, true);
    return newPointer;
  }
  /**
   * Returns a pointer pointing to a sub Item of the current pointer.
   * The current pointer must point to an array
   * @param subItem
   */
  subItemPointer(subItem) {
    const newPointer = new DontCodeModelPointer(this.position === '' ? subItem : this.position + '/' + subItem, this.positionInSchema, this.position, this.containerPositionInSchema, subItem, false);
    return newPointer;
  }
  /**
   * Returns the parent pointer or an exception if it's the root
   * @param subItem
   */
  safeParentPointer(optionalSchemaMgr) {
    const ret = this.parentPointer(optionalSchemaMgr);
    if (ret === undefined) throw new Error("No parent position for pointer " + this.position);
    return ret;
  }
  /**
   * Returns the parent pointer or undefined if it's the root
   * @param subItem
   */
  parentPointer(optionalSchemaMgr) {
    if (this.containerPosition == null || this.containerPositionInSchema == null) return undefined;
    const newPointer = new DontCodeModelPointer(this.containerPosition, this.containerPositionInSchema);
    if (optionalSchemaMgr != null) {
      newPointer.fillMissingElements(optionalSchemaMgr);
    }
    return newPointer;
  }
  /**
   * Returns true if the pointer is the parent of the position.
   * @param position
   * @param directOnly: if true, only returns true if it's a direct parent
   */
  isParentOf(position, directOnly) {
    if (directOnly === true) {
      const parent = DontCodeModelPointer.parentPosition(position);
      if (parent == null) {
        return false;
      } else {
        return this.position == parent;
      }
    } else {
      return position.startsWith(this.position);
    }
  }
  /**
  * Safely returns the parent position
  * @param position
  */
  static parentPosition(position) {
    if (position == null || position.length === 0) return null;
    const lastSlash = position.lastIndexOf('/');
    if (lastSlash == -1) return '';else {
      return position.substring(0, lastSlash);
    }
  }
  /**
   * Safely splits between the parent position and last element
   * @param position
   */
  static splitPosition(position) {
    if (position == null || position.length === 0) return null;
    const lastSlash = position.lastIndexOf('/');
    if (lastSlash == -1) return {
      parent: '',
      element: position
    };else {
      return {
        parent: position.substring(0, lastSlash),
        element: position.substring(lastSlash + 1)
      };
    }
  }
}

/**
 * Manages the schema used to describe an application in Dont-code.
 * A schema is provided by default, but can be updated by plugins.
 * That means plugins can add or modify new fields or entities thus changing the way applications are edited and described.
 */
class DontCodeSchemaManager {
  constructor() {
    this.reset();
  }
  /**
   * Returns the current schema
   */
  getSchema() {
    return this.currentSchema;
  }
  convertSchemaToMap(readSchema) {
    return new DontCodeSchemaRoot(readSchema);
  }
  registerChanges(config) {
    config.plugin.id + '-v' + config.plugin.version;
    if (config['schema-updates']) {
      const updates = config['schema-updates'];
      for (const update of updates) {
        const changes = update.changes;
        for (const change of changes) {
          if (change.location.id) {
            const parent = this.locateItem(change.location.parent);
            if (parent) {
              parent.upsertWith(change);
            } else {
              throw 'Cannot find parent element: ' + change.location.parent;
            }
          }
        }
      }
    }
  }
  /**
   * Locate an item from it's position in the model
   * @param schemaPosition
   * @param resolveReference true to resolve the last reference instead of returning a @DontCodeSchemaRef
   */
  locateItem(schemaPosition, resolveReference) {
    const split = schemaPosition.split('/');
    let cur = this.currentSchema;
    for (const value of split) {
      if (!cur) {
        console.error('Could not find subItem ' + value + ' of ' + schemaPosition);
        throw new Error('Could not find subItem ' + value + ' of ' + schemaPosition);
      }
      if (value && value.length > 0 && value !== '#') {
        if (cur.isReference()) cur = this.resolveReference(cur);
        if (!cur) {
          console.error('Could not find reference ' + (cur === null || cur === void 0 ? void 0 : cur.getReference()) + ' of ' + schemaPosition);
          throw new Error('Could not find reference ' + (cur === null || cur === void 0 ? void 0 : cur.getReference()) + ' of ' + schemaPosition);
        }
        cur = cur.getChild(value);
      }
    }
    if (resolveReference && (cur === null || cur === void 0 ? void 0 : cur.isReference())) {
      cur = this.resolveReference(cur);
    }
    if (cur != null) return cur;else {
      throw new Error('Could not find item at schema position ' + schemaPosition);
    }
  }
  resolveReference(ref) {
    return this.locateItem(ref.getReference());
  }
  generateParentPointer(pointer) {
    if (pointer.containerPosition != null) return this.generateSchemaPointer(pointer.containerPosition);
    return;
  }
  /**
   * Generates a new and complete DontCodeModelPointer from the specified position
   * @param queriedPosition
   */
  generateSchemaPointer(queriedPosition) {
    var _a;
    let ret;
    const position = queriedPosition;
    const posElems = position.split('/');
    if (posElems.length === 0 || posElems[0].length === 0) {
      // Managing the special case of asking for root
      ret = new DontCodeModelPointer(queriedPosition, queriedPosition);
      return ret;
    } else {
      ret = new DontCodeModelPointer(queriedPosition, '');
    }
    let parentItem = this.currentSchema;
    let ignoreNext = false;
    for (const element of posElems) {
      if (!ignoreNext) {
        let nextItem = (_a = parentItem.getChild(element)) !== null && _a !== void 0 ? _a : parentItem.isPossibleDynamicProperty(element);
        if (nextItem) {
          ret.isProperty = true;
          ret.containerPositionInSchema = ret.positionInSchema;
          if (ret.positionInSchema !== null && ret.positionInSchema.length > 0) ret.positionInSchema = ret.positionInSchema + '/' + element;else ret.positionInSchema = element;
          if (nextItem.isArray()) {
            ignoreNext = true;
          } else {
            ignoreNext = false;
          }
          if (nextItem.isReference()) nextItem = this.resolveReference(nextItem);
          if (nextItem == null) {
            // Cannot find the next item in the schema: Error in the url
            throw new Error("Cannot parse '" + position + "' from the schema as " + nextItem + ' is reference an unknown element');
          }
          parentItem = nextItem;
        } else {
          // Cannot find the next item in the schema: Error in the url
          throw new Error("Cannot parse '" + position + "' from the schema as " + element + ' is not a child of ' + parentItem.getRelativeId());
        }
      } else {
        ret.isProperty = false;
        ignoreNext = false;
      }
    }
    ret.containerPositionInSchema = ret.positionInSchema.substring(0, ret.positionInSchema.lastIndexOf('/'));
    ret.containerPosition = ret.position.substring(0, ret.position.lastIndexOf('/'));
    ret.lastElement = posElems[posElems.length - 1];
    return ret;
  }
  /**
   * Returns the pointer to the subElement of the given pointer. It checked whether the given propOrItemName is a property or an item
   * by looking at the schema
   * @param panullrent
   * @param propOrItemName
   */
  generateSubSchemaPointer(parent, propOrItemName) {
    if (this.locateItem(parent.positionInSchema, true).getChild(propOrItemName)) {
      return parent.subPropertyPointer(propOrItemName);
    } else {
      return parent.subItemPointer(propOrItemName);
    }
  }
  reset() {
    this.readSchema = DontCodeSchema.defaultv1;
    this.currentSchema = this.convertSchemaToMap(this.readSchema);
  }
}
class DontCodePluginManager {
  constructor() {
    this.plugins = new Map();
  }
  registerPlugin(plugin, schemaManager, previewManager) {
    // Ensure registering plugins only once.
    const config = plugin.getConfiguration();
    const fullId = config.plugin.id + '-v' + config.plugin.version;
    if (this.plugins.get(fullId) == null) {
      //console.debug ("Setting up", fullId);
      schemaManager.registerChanges(config);
      previewManager.registerHandlers(config);
      this.plugins.set(fullId, new PluginInfo(plugin));
    }
  }
  initPlugins(core) {
    this.plugins.forEach(plugin => {
      var _a;
      if (plugin.initCalled === false) {
        try {
          // Initialize the change of model
          const defs = (_a = plugin.plugin.getConfiguration()) === null || _a === void 0 ? void 0 : _a["definition-updates"];
          core.getChangeManager().applyPluginConfigUpdates(defs);
          plugin.plugin.pluginInit(core);
          plugin.initCalled = true;
        } catch (error) {
          console.error("Error calling " + plugin.plugin + " init method:", error);
        }
      }
    });
  }
  reset() {
    this.plugins.clear();
  }
}
class PluginInfo {
  constructor(plugin, initCalled) {
    this.plugin = plugin;
    if (initCalled == null) this.initCalled = false;else this.initCalled = initCalled;
  }
}

/**
 * Manages handlers that provides UI, calculation or action for data associated with an element.
 * It decodes "preview-handlers", "global-handlers", "action-handlers" from plugin-config.
 */
class DontCodePreviewManager {
  constructor() {
    this.reset();
  }
  reset() {
    this.handlersPerLocations = new Map();
    this.globalHandlersPerLocations = new Map();
    this.actionHandlersPerLocation = new Map();
    this.globalHandlers = new rxjs__WEBPACK_IMPORTED_MODULE_12__.ReplaySubject();
  }
  registerHandlers(config) {
    if (config['preview-handlers']) {
      config['preview-handlers'].forEach(value => {
        let array = this.handlersPerLocations.get(value.location.parent);
        if (!array) {
          array = new Array();
          this.handlersPerLocations.set(value.location.parent, array);
        }
        array.push(value);
      });
    }
    if (config['global-handlers']) {
      config['global-handlers'].forEach(value => {
        let array = this.handlersPerLocations.get(value.location.parent);
        if (!array) {
          array = new Array();
          this.handlersPerLocations.set(value.location.parent, array);
        }
        array.push(value);
        // Update the global handlers as well
        array = this.globalHandlersPerLocations.get(value.location.parent);
        if (!array) {
          array = new Array();
          this.globalHandlersPerLocations.set(value.location.parent, array);
        }
        array.push(value);
        this.globalHandlers.next(value);
      });
    }
    if (config['action-handlers']) {
      for (const value of config['action-handlers']) {
        let array = this.actionHandlersPerLocation.get({
          position: value.location.parent,
          context: value["action-context"]
        });
        if (!array) {
          array = new Array();
          this.actionHandlersPerLocation.set({
            position: value.location.parent,
            context: value["action-context"]
          }, array);
        }
        array.push(value);
      }
    }
  }
  getGlobalHandlers() {
    return this.globalHandlersPerLocations;
  }
  receiveGlobalHandlers() {
    return this.globalHandlers;
  }
  retrieveHandlerConfig(position, modelContent) {
    const found = this.handlersPerLocations.get(position);
    let ret = null;
    let contentNeeded = false;
    if (found) {
      for (const configuration of found) {
        if (configuration.location.values) {
          if (modelContent) {
            let jsonValue = modelContent;
            if (configuration.location.id) jsonValue = modelContent[configuration.location.id];
            this.extractValuesAsArray(configuration.location.values).forEach(targetValue => {
              if (targetValue === jsonValue) {
                ret = configuration;
                return;
              }
            });
          } else {
            // We found one handler that needs the jsonContent
            contentNeeded = true;
          }
        } else {
          // We have found a default handler, we keep it but keep on looking for a better one
          if (ret === null) {
            ret = configuration;
          }
        }
      }
    } else {
      // Try to see if the parent position is handled
      if (typeof modelContent === 'string' && position.lastIndexOf('/') > 0) {
        if (position.endsWith('/')) position = position.substring(0, position.length - 1);
        const key = position.substring(position.lastIndexOf('/') + 1);
        const parentValue = {};
        parentValue[key] = modelContent;
        return this.retrieveHandlerConfig(position.substring(0, position.lastIndexOf('/')), parentValue);
      }
    }
    if (ret === null && contentNeeded) {
      // We had one potential handler but couldn't select it as the jsonContent is not provided
      throw new Error('Content must be provided in order to select an handler for position ' + position);
    }
    return ret;
  }
  /**
   * Returns all the action handlers for a given position in the model and for a given context.
   * @param position
   * @param context
   * @param modelContent
   */
  retrieveActionHandlers(position, context, modelContent) {
    const ret = this.actionHandlersPerLocation.get({
      position,
      context
    });
    if (ret == null) return [];else return ret;
  }
  extractValuesAsArray(values) {
    const ret = new Array();
    this.extractValuesToArray(values, ret);
    return ret;
  }
  extractValuesToArray(values, res) {
    if (Array.isArray(values)) {
      values.forEach(value => {
        if (typeof value === 'string') {
          res.push(value);
        } else {
          this.extractValuesToArray(value, res);
        }
      });
    } else {
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          this.extractValuesToArray(values[key], res);
        }
      }
    }
  }
}
var DontCodeReportGroupShowType;
(function (DontCodeReportGroupShowType) {
  DontCodeReportGroupShowType["OnlyLowest"] = "OnlyLowest";
  DontCodeReportGroupShowType["OnlyHighest"] = "OnlyHighest";
})(DontCodeReportGroupShowType || (DontCodeReportGroupShowType = {}));
var DontCodeGroupOperationType;
(function (DontCodeGroupOperationType) {
  DontCodeGroupOperationType["Count"] = "Count";
  DontCodeGroupOperationType["Sum"] = "Sum";
  DontCodeGroupOperationType["Average"] = "Average";
  DontCodeGroupOperationType["Minimum"] = "Minimum";
  DontCodeGroupOperationType["Maximum"] = "Maximum";
})(DontCodeGroupOperationType || (DontCodeGroupOperationType = {}));
var DontCodeSortDirectionType;
(function (DontCodeSortDirectionType) {
  DontCodeSortDirectionType["None"] = "None";
  DontCodeSortDirectionType["Ascending"] = "Ascending";
  DontCodeSortDirectionType["Descending"] = "Descending";
})(DontCodeSortDirectionType || (DontCodeSortDirectionType = {}));
var ActionContextType;
(function (ActionContextType) {
  ActionContextType["LIST"] = "list";
  ActionContextType["EDIT"] = "edit";
  ActionContextType["VIEW"] = "view";
})(ActionContextType || (ActionContextType = {}));
var ActionType;
(function (ActionType) {
  ActionType["EXTRACT"] = "extract";
  ActionType["UPDATE"] = "update";
  ActionType["CALCULATE"] = "calculate";
})(ActionType || (ActionType = {}));
class DontCodeStoreManager {
  constructor(modelMgr, provider) {
    this.modelMgr = modelMgr;
    this.providerByPosition = new Map();
    this.providerByType = new Map();
    this._default = provider;
    this.reset();
  }
  reset() {
    this.providerByPosition.clear();
    this.providerByType.clear();
  }
  getProvider(position) {
    var _a;
    if (position == null) {
      return this._default;
    } else {
      let ret = null;
      // Try to find if the entity is loaded from a defined source
      const srcDefinition = (_a = this.modelMgr.findTargetOfProperty(DontCodeModel.APP_ENTITIES_FROM_NODE, position)) === null || _a === void 0 ? void 0 : _a.value;
      if (srcDefinition) {
        ret = this.providerByType.get(srcDefinition.type);
      }
      if (!ret) {
        ret = this.providerByPosition.get(position);
      }
      return ret !== null && ret !== void 0 ? ret : this._default;
    }
  }
  getProviderSafe(position) {
    const ret = this.getProvider(position);
    if (ret == null) {
      throw new Error('Trying to get an undefined or null provider');
    } else {
      return ret;
    }
  }
  getDefaultProvider() {
    return this.getProvider();
  }
  getDefaultProviderSafe() {
    return this.getProviderSafe();
  }
  setProvider(value, position) {
    if (position == null) this._default = value;else {
      this.providerByPosition.set(position, value);
    }
  }
  setProviderForSourceType(value, srcType) {
    this.providerByType.set(srcType, value);
  }
  setDefaultProvider(value) {
    this.setProvider(value);
  }
  removeProvider(position) {
    if (position == null) this._default = undefined;else {
      this.providerByPosition.delete(position);
    }
  }
  removeProviderForSourceType(srcType) {
    this.providerByType.delete(srcType);
  }
  removeDefaultProvider() {
    this.removeProvider();
  }
  storeEntity(position, entity) {
    return this.getProviderSafe(position).storeEntity(position, entity);
  }
  loadEntity(position, key) {
    return this.getProviderSafe(position).loadEntity(position, key);
  }
  safeLoadEntity(position, key) {
    return this.getProviderSafe(position).safeLoadEntity(position, key);
  }
  deleteEntity(position, key) {
    return this.getProviderSafe(position).deleteEntity(position, key);
  }
  searchEntities(position, ...criteria) {
    return this.getProviderSafe(position).searchEntities(position, ...criteria);
  }
  searchAndPrepareEntities(position, sort, groupBy, dataTransformer, ...criteria) {
    return this.getProviderSafe(position).searchAndPrepareEntities(position, sort, groupBy, dataTransformer, ...criteria);
  }
  canStoreDocument(position) {
    var _a;
    const res = (_a = this.getProvider(position)) === null || _a === void 0 ? void 0 : _a.canStoreDocument(position);
    if (res) return res;else return false;
  }
  storeDocuments(toStore, position) {
    return this.getProviderSafe(position).storeDocuments(toStore, position);
  }
}
var DontCodeStoreCriteriaOperator;
(function (DontCodeStoreCriteriaOperator) {
  DontCodeStoreCriteriaOperator["EQUALS"] = "=";
  DontCodeStoreCriteriaOperator["LESS_THAN"] = "<";
  DontCodeStoreCriteriaOperator["LESS_THAN_EQUAL"] = "<=";
})(DontCodeStoreCriteriaOperator || (DontCodeStoreCriteriaOperator = {}));
class DontCodeStoreCriteria {
  constructor(name, value, operator) {
    this.name = name;
    this.value = value;
    if (!operator) this.operator = DontCodeStoreCriteriaOperator.EQUALS;else {
      this.operator = operator;
    }
  }
}
class DontCodeStoreSort {
  constructor(by, direction, subSort) {
    this.by = by;
    this.subSort = subSort;
    if (direction == null) this.direction = DontCodeSortDirectionType.None;else this.direction = direction;
  }
}
class DontCodeStoreGroupby {
  constructor(of, display, show) {
    this.of = of;
    this.show = show;
    if (display == null) this.display = {};else this.display = display;
  }
  atLeastOneGroupIsRequested() {
    if (this.display != null && Object.keys(this.display).length > 0) return true;
    return false;
  }
  getRequiredListOfFields() {
    const ret = new Set();
    if (this.display != null) {
      for (const aggregate of Object.values(this.display)) {
        ret.add(aggregate.of);
      }
    }
    return ret;
  }
}
class DontCodeStoreAggregate {
  constructor(of, operation) {
    this.of = of;
    this.operation = operation;
  }
}
class Change {
  constructor(type, position, value, pointer, beforeKey, oldPosition) {
    this.type = type;
    this.position = position;
    if (position === '/') throw new Error('Root position is defined by empty string and not slash anymore');
    this.value = value;
    this.pointer = pointer;
    this.beforeKey = beforeKey;
    this.oldPosition = oldPosition;
  }
  /**
   * Utility method to return the position parent of this change by selecting the right way to calculate it
   * if the change is for the root (thus with no parent), it throws an exception.
   * Use this method if you are sure the Change is not for root.
   */
  getSafeParentPosition() {
    const parent = this.getParentPosition();
    if (parent == null) throw new Error('No Parent position for root changes.');
    return parent;
  }
  /**
   * Utility method to return the position parent of this change by selecting the right way to calculate it
   * if the change is for the root (thus with no parent), it returns null.
   * */
  getParentPosition() {
    var _a;
    if (this.pointer != null) {
      return (_a = this.pointer.containerPosition) !== null && _a !== void 0 ? _a : null;
    } else {
      return DontCodeModelPointer.parentPosition(this.position);
    }
  }
}
var ChangeType;
(function (ChangeType) {
  ChangeType["ADD"] = "ADD";
  ChangeType["UPDATE"] = "UPDATE";
  ChangeType["DELETE"] = "DELETE";
  ChangeType["MOVE"] = "MOVE";
  ChangeType["RESET"] = "RESET";
  ChangeType["ACTION"] = "ACTION";
})(ChangeType || (ChangeType = {}));

/**
 * An action is a special type of change where we ask the handler to act on data.
 */
class Action extends Change {
  constructor(position, value, context, actionType, pointer, running, changeType) {
    super(changeType !== null && changeType !== void 0 ? changeType : ChangeType.ACTION, position, value, pointer);
    this.running = new rxjs__WEBPACK_IMPORTED_MODULE_13__.Subject();
    this.context = context;
    this.actionType = actionType;
    if (running != null) this.running = running;
  }
}

/**
 * Stores and constantly updates the json (as an instance of the DontCodeSchema) as it is being edited / modified through Change events
 * It does not store the entity values but the description of entities, screens... as defined in the Editor
 */
class DontCodeModelManager {
  constructor(schemaMgr) {
    this.schemaMgr = schemaMgr;
    this.reset();
  }
  reset() {
    this.content = undefined;
  }
  /**
   * Returns the complete json stored
   */
  getContent() {
    return this.content;
  }
  /**
   * Resets the current json content to the one given in parameter
   * @param newContent
   */
  resetContent(newContent) {
    this.content = newContent;
  }
  /**
   * Checks if the element can be viewed in the Builder or not
   * @param content
   */
  static isHidden(content) {
    return (content === null || content === void 0 ? void 0 : content.$hidden) == true;
  }
  /**
   * Checks if the element can be edited in the Builder or not
   * @param content
   */
  static isReadonly(content) {
    return (content === null || content === void 0 ? void 0 : content.$readOnly) == true;
  }
  /**
   * Apply the change to the current model and split it into multiple atomic changes for each modified property
   * @param toApply
   */
  applyChange(toApply) {
    var _a, _b;
    let pointer = (_a = toApply.pointer) !== null && _a !== void 0 ? _a : this.schemaMgr.generateSchemaPointer(toApply.position);
    toApply.pointer = pointer;
    const parentPosition = pointer.containerPosition;
    const subElem = (_b = toApply.pointer) === null || _b === void 0 ? void 0 : _b.lastElement;
    if (parentPosition != null && subElem != null) pointer = this.schemaMgr.generateParentPointer(pointer);
    const atomicChanges = new AtomicChange();
    atomicChanges.isRoot = true;
    atomicChanges.name = pointer.position;
    let lastChange = atomicChanges;
    let content = this.findAtPosition(pointer.position);
    if (content == null) {
      // Are we trying to delete a non existing content ?
      if (toApply.type === ChangeType.DELETE) {
        return []; // Nothing has changed
      } else {
        // we are adding something, so create the parent
        content = this.findAtPosition(pointer.position, true, atomicChanges);
        let basePosition = pointer.position;
        while (lastChange.subChanges.length > 0) {
          basePosition = basePosition.substring(0, basePosition.lastIndexOf('/'));
          lastChange = lastChange.subChanges[0];
        }
        atomicChanges.name = basePosition;
      }
    }
    if (toApply.type === ChangeType.ACTION) {
      lastChange.type = ChangeType.ACTION;
    }
    const isAnUpdate = this.applyChangeRecursive(toApply, content, toApply.value, toApply.pointer, lastChange);
    return this.generateChanges(toApply, atomicChanges, isAnUpdate, this.schemaMgr.generateSchemaPointer(atomicChanges.name));
  }
  applyChangeRecursive(srcChange, oldContent, newContent, pointer, atomicChanges, oldPosition) {
    if (srcChange.pointer == null) throw new Error('Cannot apply a change without a pointer at position ' + srcChange.position);
    let isAnUpdate = true;
    if (oldPosition == null) oldPosition = srcChange.oldPosition;
    const subElem = pointer.lastElement;
    if (subElem || subElem.length === 0) {
      //const subPointer = pointer.subItemOrPropertyPointer(subElem, pointer?.key==null);
      const oldSubContent = subElem.length === 0 ? oldContent : oldContent[subElem];
      switch (srcChange.type) {
        case ChangeType.ACTION:
          {
            // An action doesn't modify the data but must be created for each subelement
            const curAtomicChange = atomicChanges.createSubChange(ChangeType.ACTION, subElem, atomicChanges.value);
            this.compareRecursiveIfNeeded(srcChange, oldSubContent, null, pointer, curAtomicChange);
            break;
          }
        case ChangeType.ADD:
        case ChangeType.UPDATE:
        case ChangeType.RESET:
          {
            let curAtomicChange;
            if (srcChange.type === ChangeType.RESET && srcChange.position === pointer.position) {
              // Create a RESET change for the root element reset only
              if (typeof newContent === 'object' && this.isTheSameForParent(oldSubContent, newContent)) {
                curAtomicChange = atomicChanges.createSubChange(undefined, subElem, null);
              } else if (typeof newContent === 'object' || oldSubContent !== newContent) {
                curAtomicChange = atomicChanges.createSubChange(ChangeType.RESET, subElem, newContent);
              }
            } else if (oldSubContent == null) {
              curAtomicChange = atomicChanges.createSubChange(ChangeType.ADD, subElem, newContent);
            } else if (typeof newContent === 'object' && this.isTheSameForParent(oldSubContent, newContent)) {
              curAtomicChange = atomicChanges.createSubChange(undefined, subElem, null);
            } else if (typeof newContent === 'object' || oldSubContent !== newContent) {
              if (typeof oldSubContent === 'object' && srcChange.type == ChangeType.ADD) {
                // Verify that when asked to add a subitem, it's really an add, that means, at least one subproperty doesn't exist.
                // Otherwise it's a UPDATE change
                isAnUpdate = false;
                for (const subProperty of Object.getOwnPropertyNames(newContent)) {
                  if (oldSubContent[subProperty] != undefined) {
                    // At least one element is already present
                    isAnUpdate = true;
                    break;
                  }
                }
              }
              curAtomicChange = atomicChanges.createSubChange(ChangeType.UPDATE,
              // Even if it's an ADD of a subElement, we consider it's an UPDATE for the parent
              subElem, newContent);
            }
            if (curAtomicChange) this.compareRecursiveIfNeeded(srcChange, oldSubContent, newContent, pointer, curAtomicChange);
            if (subElem.length > 0 && isAnUpdate)
              // Special case when changing the root element (subElem = '')
              this.insertProperty(oldContent, subElem, newContent, srcChange.beforeKey);
          }
          break;
        case ChangeType.DELETE:
          {
            if (oldContent[subElem]) {
              const curAtomicChange = atomicChanges.createSubChange(ChangeType.DELETE, subElem, null);
              this.compareRecursiveIfNeeded(srcChange, oldContent[subElem], newContent, pointer, curAtomicChange);
              delete oldContent[subElem];
            }
          }
          break;
        case ChangeType.MOVE:
          {
            // If it's the root of move, then find the value to move from the oldPosition
            if (srcChange.position === pointer.position) {
              if (oldPosition == null) throw new Error('Cannot process MOVE change without oldPosition' + srcChange.position);
              if (newContent == null) {
                newContent = this.findAtPosition(oldPosition);
              }
              if (newContent) {
                const curAtomicChange = atomicChanges.createSubChange(ChangeType.MOVE, subElem, newContent, oldPosition);
                if (srcChange.position !== oldPosition) {
                  // When we reorder elements of an array, it's a move to the same position: No changes
                  this.compareRecursiveIfNeeded(srcChange, null, newContent, pointer, curAtomicChange, oldPosition);
                  this.insertProperty(oldContent, subElem, newContent, srcChange.beforeKey);
                  // Really perform the change
                  const splittedPosition = DontCodeModelPointer.splitPosition(oldPosition);
                  const parentContent = this.findAtPosition(splittedPosition.parent);
                  delete parentContent[splittedPosition.element];
                } else {
                  // Just insert the same element at a different position in the object
                  this.compareRecursiveIfNeeded(srcChange, null, newContent, pointer, curAtomicChange, oldPosition);
                  this.insertProperty(oldContent, subElem, newContent, srcChange.beforeKey);
                }
              }
            } else {
              // The move has already been done, so just createSubChange and loop through subElements
              const curAtomicChange = atomicChanges.createSubChange(ChangeType.MOVE, subElem, null, oldPosition);
              this.compareRecursiveIfNeeded(srcChange, oldContent, newContent, pointer, curAtomicChange, oldPosition);
            }
          }
          break;
        default:
          throw new Error('No support for change of type ' + srcChange.type);
      }
    } else {
      this.compareRecursiveIfNeeded(srcChange, oldContent, newContent, pointer, atomicChanges, oldPosition);
    }
    return isAnUpdate;
  }
  /**
   * Check if the values are the same, or the objects property names are the same, so that we can define it impacts or not the parent
   * @param oldValue
   * @param newValue
   */
  isTheSameForParent(oldValue, newValue) {
    if (newValue === oldValue) {
      return true;
    } else if (newValue == null || oldValue == null) {
      return false;
    } else if (typeof oldValue === 'object' && typeof newValue === 'object') {
      const oldKeys = Object.keys(oldValue);
      const newKeys = Object.keys(newValue);
      return oldKeys.length === newKeys.length && oldKeys.every((value, index) => {
        return value === newKeys[index];
      });
    } else {
      return oldValue === newValue;
    }
  }
  /**
   * By checking the differences between old and new content, and depending on the src change type, generate a change for each sub element hierarchically
   * @param src
   * @param oldContent
   * @param newContent
   * @param atomicChanges
   */
  compareRecursiveIfNeeded(src, oldContent, newContent, pointer, atomicChanges, oldPosition) {
    if (oldContent == null || typeof oldContent !== 'object') oldContent = {};
    if (newContent == null || typeof newContent !== 'object') newContent = {};
    const alreadyChecked = new Set();
    // Check if existing elements have been deleted or updated
    for (const oldSubProperty in oldContent) {
      const subPointer = this.schemaMgr.generateSubSchemaPointer(pointer, oldSubProperty);
      const subPosition = subPointer.position;
      alreadyChecked.add(oldSubProperty);
      // eslint-disable-next-line no-prototype-builtins
      if (newContent.hasOwnProperty(oldSubProperty)) {
        this.applyChangeRecursive(src, oldContent, newContent[oldSubProperty], subPointer, atomicChanges, oldPosition);
      } else {
        // Action are just passed to all subElements
        if (src.type == ChangeType.ACTION) {
          const srcAction = src;
          this.applyChangeRecursive(new Action(subPosition, srcAction.value, srcAction.context, srcAction.actionType, subPointer, srcAction.running), oldContent, null, subPointer, atomicChanges);
        } else if (src.type != ChangeType.ADD) {
          // It doesn't exist in the new element, so if not explicitely added, then it's deleted
          this.applyChangeRecursive(new Change(ChangeType.DELETE, subPosition, null, subPointer), oldContent, null, subPointer, atomicChanges, oldPosition);
        }
      }
    }
    // Check if new elements have been added
    for (const newSubProperty in newContent) {
      if (src.type === ChangeType.MOVE) {
        const subPointer = this.schemaMgr.generateSubSchemaPointer(pointer, newSubProperty);
        subPointer.position;
        //src.oldPosition = subPosition;
        this.applyChangeRecursive(src, oldContent, newContent[newSubProperty], subPointer, atomicChanges, oldPosition + '/' + newSubProperty);
      } else if (!alreadyChecked.has(newSubProperty)) {
        const subPointer = this.schemaMgr.generateSubSchemaPointer(pointer, newSubProperty);
        const subPosition = subPointer.position;
        this.applyChangeRecursive(new Change(ChangeType.ADD, subPosition, newContent[newSubProperty], subPointer), oldContent, newContent[newSubProperty], subPointer, atomicChanges);
      }
    }
  }
  generateChanges(src, atomicChanges, isAnUpdate, pointer, result) {
    if (result == null) result = new Array();
    if (src.pointer == null) throw new Error('Cannot generate changes without the pointer');
    if (pointer == null) pointer = src.pointer;
    if (atomicChanges.type != null) {
      //pointer = this.schemaMgr.generateSubSchemaPointer(pointer, atomicChanges.name);
      if (atomicChanges.type === ChangeType.MOVE) {
        if (atomicChanges.oldPosition == null) throw new Error('A Move Change must have an oldPosition set ' + pointer.position);
        if (atomicChanges.oldPosition !== pointer.position && src.position === pointer.position) {
          // Generate an update of the old position only if it's different from the new position, as for the new position an update has already been generated
          result.push(new Change(ChangeType.UPDATE, DontCodeModelPointer.parentPosition(atomicChanges.oldPosition), atomicChanges.value));
        }
        result.push(new Change(ChangeType.MOVE, pointer.position, atomicChanges.value, pointer, undefined, atomicChanges.oldPosition));
      } else {
        if (atomicChanges.type === ChangeType.ACTION) {
          // Create an action for Change of action type
          const srcAction = src;
          result.push(new Action(pointer.position, srcAction.value, srcAction.context, srcAction.actionType, pointer, srcAction.running));
        } else {
          result.push(new Change(atomicChanges.type, pointer.position, atomicChanges.value, pointer));
        }
      }
    } else {
      // First check if we need to send an UPDATED change to this element because a subElement is added / removed
      for (let i = 0; i < atomicChanges.subChanges.length; i++) {
        const cur = atomicChanges.subChanges[i];
        if (cur.type != null && cur.type !== ChangeType.UPDATE && cur.name.length > 0) {
          if (isAnUpdate == true) {
            // Sometimes we receive ADD but they are UPDATE in fact
            result.push(new Change(ChangeType.UPDATE, pointer.position, this.findAtPosition(pointer.position), pointer));
          }
          break;
        }
        /*if( (cur.type === ChangeType.MOVE) && (cur.oldPosition != null)) {
          result.push(new Change (ChangeType.UPDATE, cur.oldPosition, null));
        }*/
      }
    }
    // Then recurse through all subelements, generating changes along the way
    for (let i = 0; i < atomicChanges.subChanges.length; i++) {
      const cur = atomicChanges.subChanges[i];
      this.generateChanges(src, cur, true,
      // It's never an incorrect update for subelements
      this.schemaMgr.generateSubSchemaPointer(pointer, cur.name), result);
    }
    return result;
  }
  /**
   * Calculates a key that can be inserted at the given position in the content
   * @param pos
   */
  generateNextKeyForPosition(pos, create = false) {
    const array = this.findAtPosition(pos, create);
    if (array == null) throw new Error("No element at position " + pos);
    return DontCodeModelManager.generateNextKey(array);
  }
  static generateNextKey(array) {
    let keys;
    if (array.size != null) {
      keys = array;
    } else {
      keys = new Set(Object.keys(array));
    }
    let tentative = keys.size;
    let found = false;
    const modulo = DontCodeModelManager.POSSIBLE_CHARS_FOR_ARRAY_KEYS_LENGTH;
    let key;
    do {
      // Calculate a tentative key
      key = '';
      do {
        const quotient = Math.trunc(tentative / modulo);
        const rest = tentative % modulo;
        key = DontCodeModelManager.POSSIBLE_CHARS_FOR_ARRAY_KEYS[rest].concat(key);
        tentative = quotient - 1; // -1 because we need to not take into account the first row of values as they don't have the same number of chars
      } while (tentative >= 0);
      // Check if the key is already present
      found = keys.has(key);
      tentative++;
    } while (found);
    return key;
  }
  /**
   * Provides the json extract at the given position.
   * For example, findAtPosition ('creation/entities/a') will returns the description (fields...) of the first entity created with the editor
   * @param position
   * @param create
   */
  findAtPosition(position, create, added) {
    const path = position.split('/');
    if (this.content == null) {
      if (create) {
        this.content = {};
      } else {
        return null;
      }
    }
    let current = this.content;
    let currentPath = '';
    path.forEach(element => {
      if (element === '' || current === null) return current;
      if (currentPath.length === 0) currentPath = element;else currentPath = currentPath + '/' + element;
      if (!current[element]) {
        if (create) {
          current[element] = {};
          if (added) {
            added = added.createSubChange(ChangeType.ADD, element, {});
          }
        } else {
          current = null;
          return null;
        }
      }
      current = current[element];
    });
    return current;
  }
  /**
   * Enable querying the model for any value, following jsonPath model
   * To use when potentially you expect multiple values
   * @param query: the query as a jsonPath
   * @param position: in case the jsonPath is relative
   */
  queryModelToArray(query, position) {
    let root = this.content;
    if (position) {
      root = this.findAtPosition(position, false);
    }
    const result = (0,jsonpath_plus__WEBPACK_IMPORTED_MODULE_9__.JSONPath)({
      path: query,
      json: root,
      resultType: 'value',
      wrap: false,
      flatten: true
    });
    return result;
  }
  /**
   * Enable querying the model for any value, following jsonPath model
   * To use when potentially you expect a single value.
   * @param query: the query as a  jsonPath
   * @param position: in case the jsonPath is relative
   */
  queryModelToSingle(query, position) {
    var _a;
    let root = this.content;
    if (position) {
      root = this.findAtPosition(position, false);
    }
    let result = (0,jsonpath_plus__WEBPACK_IMPORTED_MODULE_9__.JSONPath)({
      path: query,
      json: root,
      resultType: 'all',
      wrap: false
    });
    if (Array.isArray(result)) {
      if (result.length <= 1) result = result[0];else throw new Error('Multiple results returned by queryModelToSingle with path ' + query);
    }
    // In Dont-code, on the contrary of Json Pointer, you don't start a pointer by /
    if ((_a = result === null || result === void 0 ? void 0 : result.pointer) === null || _a === void 0 ? void 0 : _a.startsWith('/')) {
      result.pointer = result.pointer.substring(1);
    }
    if (result != null) {
      delete result.path;
      delete result.parent;
      delete result.parentProperty;
    }
    return result;
  }
  /**
   * Returns the list of values that are possible target of a given property path. With this the Builder User Interface can display to the user a combo-box will all targets
   * For example, with the following Dont-code model:
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
    if (schemaItem == null) {
      const ptr = this.schemaMgr.generateSchemaPointer(position);
      schemaItem = this.schemaMgr.locateItem(ptr.subPropertyPointer(property).positionInSchema, true);
    }
    const targetPath = schemaItem === null || schemaItem === void 0 ? void 0 : schemaItem.getTargetPath();
    if (schemaItem && targetPath) {
      const lastDotPos = targetPath.lastIndexOf('.');
      return this.queryModelToArray(targetPath.substring(0, lastDotPos) + '.*');
    } else {
      throw new Error('No Schema or no format definition for ' + position + '/' + property);
    }
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
    const src = this.findAtPosition(position, false);
    if (src && src[property]) {
      if (schemaItem == null) {
        const ptr = this.schemaMgr.generateSchemaPointer(position);
        schemaItem = this.schemaMgr.locateItem(ptr.subPropertyPointer(property).positionInSchema, true);
      }
      const targetPath = schemaItem === null || schemaItem === void 0 ? void 0 : schemaItem.getTargetPath();
      if (schemaItem && targetPath) {
        const lastDotPos = targetPath.lastIndexOf('.');
        //        const filteredQuery = targetPath.substring(0, lastDotPos)+'[?(@.'+targetPath.substring(lastDotPos+1)+'==="'+src[property]+'")]';
        const filteredQuery = targetPath.substring(0, lastDotPos) + "[?(@['" + targetPath.substring(lastDotPos + 1) + '\']==="' + src[property] + '")]';
        return this.queryModelToSingle(filteredQuery);
      } else {
        throw new Error('No Schema or no format definition for ' + position + '/' + property);
      }
    }
    return null;
  }
  /**
   * Insert a property at the end of an object or before the specified property
   * @param parent
   * @param propName
   * @param value
   * @param beforeProp
   */
  insertProperty(parent, propName, value, beforeProp) {
    if (beforeProp) {
      // Reinsert all properties of the object and inject the new one at the right order
      const keys = Object.keys(parent);
      for (const key of keys) {
        if (key !== propName) {
          const copy = parent[key];
          delete parent[key];
          if (key === beforeProp) {
            if (parent[propName] !== undefined) delete parent[propName];
            parent[propName] = value;
          }
          parent[key] = copy;
        }
      }
    } else {
      if (parent[propName] !== undefined) delete parent[propName];
      parent[propName] = value;
    }
  }
  /**
   * From a DefinitionUpdateConfig given by a repository configuration, generates a Change that can be applied to the model.
   * @param definition
   */
  convertToChange(definition) {
    let ptr = this.schemaMgr.generateSchemaPointer(definition.location.parent);
    const schemaItem = this.schemaMgr.locateItem(ptr.positionInSchema, false);
    if (schemaItem.isArray()) {
      if (definition.location.id == null || definition.location.id === '*') {
        // We must create a subelement
        ptr = ptr.subItemPointer(this.generateNextKeyForPosition(ptr.position, true));
      } else {
        ptr = ptr.subItemPointer(definition.location.id);
      }
    } else {
      if (definition.location.id != null) {
        ptr = ptr.subItemPointer(definition.location.id);
      }
    }
    return new Change(ChangeType.ADD, ptr.position, definition.update, ptr, definition.location.after);
  }
  /**
   * Try to guess which field is most likely to represent the name of an object (ususally a field with name "name", or "title")
   * @param position
   * @param modelAsJson
   */
  guessNamePropertyOfElement(position, modelAsJson) {
    if (modelAsJson == null) {
      if (position == null) throw new Error("Either position or model must be provided");
      modelAsJson = this.findAtPosition(position, false);
      if (modelAsJson == null) {
        throw new Error("Position " + position + " does not exist in model");
      }
    }
    if (modelAsJson.fields != null && Array.isArray(modelAsJson.fields)) modelAsJson = modelAsJson.fields;
    const curScore = {
      score: -1,
      field: null
    };
    for (const field in modelAsJson) {
      if (DontCodeModelManager.scoreFieldAsName(modelAsJson[field].name, modelAsJson[field].type, curScore)) break;
    }
    if (curScore.score > 0) {
      return curScore.field;
    } else return null;
  }
  static guessNamePropertyOfObject(obj) {
    const score = {
      score: -1,
      field: null
    };
    for (const prop in obj) {
      DontCodeModelManager.scoreFieldAsName(prop, 'Text', score);
    }
    if (score.score > 0) return score.field;else return null;
  }
  static guessNamePropertyFromList(...list) {
    const score = {
      score: -1,
      field: null
    };
    for (const prop of list) {
      DontCodeModelManager.scoreFieldAsName(prop, 'Text', score);
    }
    if (score.score > 0) return score.field;else return null;
  }
  /**
   * Checks the probability the name given (and type) is field name that represents the name of the element.
   * @param name
   * @param type
   * @param score
   * @protected
   */
  static scoreFieldAsName(name, type, score) {
    if (name == null) return false;
    const propName = name.toLowerCase();
    for (const [key, value] of this.NAME_PROPERTY_NAMES) {
      if (propName === key) {
        const foundScore = value !== null && value !== void 0 ? value : 0;
        if (score.score < foundScore) {
          score.score = foundScore;
          score.field = name;
          if (score.score == 100) return true;
        }
      } else if (propName.includes(key)) {
        const foundScore = (value !== null && value !== void 0 ? value : 0) / 2;
        if (score.score < foundScore) {
          score.score = foundScore;
          score.field = name;
        }
      }
    }
    if (type == "Text") {
      if (score.score < 20) {
        score.score = 20;
        score.field = name;
      }
    }
    if (score.score > 0) return true;else return false;
  }
  /**
   * Extract the value of any data in parameter. It can handle complex data and flattens it into something that you can calculate or act upon (number or string)
   * @param obj
   * @param metaData Will store information about how to extract the data for this item. Will accelerate greatly extraction for other similar data.
   * @param position
   * @param schemaItem
   * @protected
   */
  extractValue(obj, metaData, position, schemaItem) {
    if (obj == null) return obj;
    if (!metaData.parsed) {
      this.extractMetaData(obj, metaData, position, schemaItem);
    }
    // We already know what to do
    if (metaData.direct) {
      return obj;
    } else {
      if (metaData.array) {
        if (obj.length > 0) {
          obj = obj[0];
        } else return obj;
      }
      if (metaData.subValue != null) {
        return obj[metaData.subValue];
      } else if (metaData.subValues != null) {
        for (let i = 0; i < metaData.subValues.length; i++) {
          obj = obj[metaData.subValues[i]];
          if (obj == null) break;
        }
        return obj;
      } else {
        // If we couldn't determine the object's value, maybe it's because the value is not present
        return undefined;
      }
    }
  }
  /**
   * Apply the primitive value back in the object
   * @param obj
   * @param value
   * @param metaData Will store information about how to extract the data for this item. Will accelerate greatly extraction for other similar data.
   * @param valueObj if any, the object that contained the source. In case you want to apply other values of the source as well
   * @param position
   * @param schemaItem
   * @return The object with the primitive set or the value if the obj is indeed a primitive already
   */
  applyValue(obj, value, metaData, valueObj, position, schemaItem) {
    if (obj == null) return value;
    if (!metaData.parsed) {
      this.extractMetaData(obj, metaData, position, schemaItem);
    }
    // We already know what to do
    if (metaData.direct) {
      return value;
    } else {
      if (metaData.array) {
        // We extract the first element of the array
        if (obj.length > 0) {
          obj = obj[0];
        } else {
          if (value != undefined)
            // Only undefined are not pushed, null values can be pushed
            obj.push(value);
          return obj;
        }
      }
      if (metaData.subValue != null) {
        if (value === undefined) {
          delete obj[metaData.subValue];
        } else {
          obj[metaData.subValue] = value;
        }
      } else if (metaData.subValues != null) {
        let curObj = obj;
        if (value === undefined) {
          for (let i = 0; i < metaData.subValues.length - 1; i++) {
            curObj = curObj[metaData.subValues[i]];
            if (curObj == null) break;
          }
          // Delete the element only it there was one
          if (curObj != null && curObj[metaData.subValues[metaData.subValues.length - 1]] != undefined) {
            delete curObj[metaData.subValues[metaData.subValues.length - 1]];
          }
        } else {
          for (let i = 0; i < metaData.subValues.length - 1; i++) {
            if (curObj[metaData.subValues[i]] == undefined) {
              curObj[metaData.subValues[i]] = {};
            }
            curObj = curObj[metaData.subValues[i]];
          }
          if (curObj[metaData.subValues[metaData.subValues.length - 1]] == null && valueObj != null) {
            let curValueObj = valueObj;
            for (let i = 0; i < metaData.subValues.length - 1; i++) {
              if (curValueObj[metaData.subValues[i]] == null) {
                curValueObj = null;
                break;
              }
              curValueObj = curValueObj[metaData.subValues[i]];
            }
            if (curValueObj != null) {
              // The element to copy to was null, so let's copy all properties from the second element
              for (const valueProp in curValueObj) {
                if (curObj[valueProp] == null && curValueObj[valueProp] != null) {
                  curObj[valueProp] = structuredClone(curValueObj[valueProp]);
                }
              }
            }
          }
          // apply the value
          curObj[metaData.subValues[metaData.subValues.length - 1]] = value;
        }
      }
      return obj;
    }
  }
  /**
   * Sorts the values in place. If the value is a complex type, extract a comparable item before
   * @param values
   * @param field if any field must be used for the sort
   * @param sortOrder Optionally provides a sort order (positive or negative) to support multiple sorts
   * @param metaData
   */
  sortValues(values, sortOrder = 1, field, metaData, position, schemaItem) {
    const metaInfo = metaData !== null && metaData !== void 0 ? metaData : new DataTransformationInfo();
    if (!metaInfo.parsed) {
      for (const val of values) {
        this.extractMetaData(this.extractField(val, field), metaInfo, position, schemaItem);
        if (metaInfo.parsed) break;
      }
    }
    if (metaInfo.parsed) {
      values.sort((first, second) => {
        const firstValue = this.extractValue(this.extractField(first, field), metaInfo, position, schemaItem);
        const secondValue = this.extractValue(this.extractField(second, field), metaInfo, position, schemaItem);
        if (firstValue == null) {
          if (secondValue == null) return 0;else return -sortOrder;
        } else if (secondValue == null) return sortOrder;
        // firstValue and secondValue are now either string, number or Date
        if (typeof firstValue === 'string' && typeof secondValue === 'string') {
          return sortOrder * firstValue.localeCompare(secondValue);
        }
        return firstValue < secondValue ? -sortOrder : firstValue > secondValue ? sortOrder : 0;
      });
    } else {
      console.warn('Cannot sort array of unknown values');
      return;
    }
  }
  /**
   * Guess how values can be set or extracted from an unknown object
   * @param obj
   * @param metaData
   * @param position
   * @param schemaItem
   */
  extractMetaData(obj, metaData, position, schemaItem) {
    if (obj == null) return;
    metaData.parsed = true;
    metaData.subValue = null;
    metaData.subValues = null;
    if (typeof obj !== 'object') {
      if (obj != null) {
        metaData.direct = true;
      } else {
        metaData.parsed = false;
      }
    } else {
      if (Array.isArray(obj)) {
        metaData.array = true;
        // eslint-disable-next-line no-restricted-syntax
        console.debug("Getting an array as a value for metadata extraction", obj);
        if (obj.length > 0) {
          obj = obj[0];
        } else {
          metaData.parsed = false;
        }
      }
      if (obj instanceof Date) {
        metaData.direct = true;
      } else {
        // It's an unknown object
        if (obj.value !== undefined) {
          metaData.subValue = 'value';
        } else if (obj.amount !== undefined) {
          // It's an MoneyAmount
          metaData.subValue = 'amount';
        } else if (obj.cost !== undefined) {
          // It's a PriceModel
          metaData.subValues = ['cost', 'amount'];
        } else {
          let firstKey = null;
          for (const key in obj) {
            if (firstKey == null) firstKey = key;
            if (obj[key] != null && typeof obj[key] !== 'object') {
              metaData.subValue = key;
            }
          }
          if (metaData.subValue == null && metaData.subValues == null) {
            if (typeof obj !== 'object' || obj instanceof Date) {
              metaData.subValue = firstKey;
              console.warn("Guessed value key of " + metaData.subValue + ' for object:', obj);
            } else {
              console.warn("Cannot guess value for object: ", obj);
              metaData.parsed = false;
              metaData.subValue = null;
              metaData.subValues = null;
              metaData.direct = false;
              metaData.array = false;
            }
          }
        }
      }
    }
  }
  /**
   * Modify the first element with the value of the second element by applying the operator given in parameter
   * @param firstElement
   * @param secondElement
   * @param metaData Will store information about how to extract the data for this item. Will accelerate greatly extraction for other similar data.
   * @param operator
   * @param position
   * @param schemaItem
   * @protected
   */
  modifyValues(firstElement, secondElement, metaData, operator, position, schemaItem) {
    if (firstElement == null) {
      throw new Error("Cannot modify value of null object");
    }
    const firstValue = this.extractValue(firstElement, metaData, position, schemaItem);
    const secondValue = this.extractValue(secondElement, metaData, position, schemaItem);
    const calculatedValue = operator(firstValue, secondValue);
    return this.applyValue(firstElement, calculatedValue, metaData, secondElement, position, schemaItem);
  }
  extractField(val, field) {
    if (field != null && val != null) return val[field];else return val;
  }
}
DontCodeModelManager.POSSIBLE_CHARS_FOR_ARRAY_KEYS = "abcdefghijklmnopqrstuvxyz";
DontCodeModelManager.POSSIBLE_CHARS_FOR_ARRAY_KEYS_LENGTH = DontCodeModelManager.POSSIBLE_CHARS_FOR_ARRAY_KEYS.length;
DontCodeModelManager.NAME_PROPERTY_NAMES = new Map([['name', 100], ['nom', 100], ['title', 80], ['titre', 80], ['lastname', 80], ['label', 70], ['libellé', 70]]);
/**
 * Keep track of information about how to extract value of data
 */
class DataTransformationInfo {
  constructor() {
    this.parsed = false; // Has the element been parsed ?
    this.array = false; // Is it an array ?
    this.direct = false; // Is the element already a usable value (not an object)
    this.subValue = null; // What field will give the usable value ?
    this.subValues = null; // What list of fields needs to be following to extract the usable value ?
  }
}
class AtomicChange {
  constructor(type, name, value, oldPosition) {
    this.name = '';
    this.subChanges = new Array();
    this.isRoot = false;
    if (type) this.type = type;
    if (name) this.name = name;
    this.oldPosition = oldPosition;
    this.value = value;
  }
  createSubChange(type, elementName, value, oldPosition) {
    const newChange = new AtomicChange(type, elementName, value, oldPosition);
    this.subChanges.push(newChange);
    return newChange;
  }
}
class ModelQuerySingleResult {}

/**
 * Manages the impact of changes that modify the model.
 * Any element can listen to a change at any level of the model, and gets notified accordingly
 */
class DontCodeChangeManager {
  constructor(schemaManager, modelManager) {
    this.schemaManager = schemaManager;
    this.modelManager = modelManager;
    this.listeners = new Map();
    this.listenerCachePerPosition = new Map();
    this.reset();
  }
  reset() {
    if (this.receivedChanges != null) this.receivedChanges.complete();
    this.receivedChanges = new rxjs__WEBPACK_IMPORTED_MODULE_13__.Subject();
    this.listeners.clear();
    this.listenerCachePerPosition.clear();
  }
  /**
   * Check if the change affects the given position
   * @param pos
   * @param change
   * @protected
   */
  isInterestedIn(position, property, change) {
    let onlyLevel = false;
    if (position[position.length - 1] === '?') {
      onlyLevel = true;
      position = position.substring(0, position.length - 1);
    }
    if (position[position.length - 1] === '/') {
      position = position.substring(0, position.length - 1);
    }
    //console.log("Setting Commands updates for ", position);
    //console.log("Filtering position for pos,item:", command.position, position, lastItem);
    if (change.position != null && change.position.startsWith(position)) {
      let nextPosition = DontCodeModelPointer.nextItemAndPosition(change.position, position.length + 1);
      const nextItem = nextPosition.value;
      if (property) {
        if (nextItem === property) {
          //console.log("Filtering ok");
          return true;
        } else {
          // Supports for listeners like "creation/entities", with "name" property that are in fact "creation/entities/xxanyEntityIDxx", with "name" property
          nextPosition = DontCodeModelPointer.nextItemAndPosition(change.position, nextPosition.pos + 1);
          if (nextPosition.value === property) {
            return true;
          }
        }
        //console.log("Filtering no");
        return false;
      } else if (onlyLevel) {
        //console.log("Filtering ok");
        if (nextItem != null) {
          // Check if its the last item
          nextPosition = DontCodeModelPointer.nextItemAndPosition(change.position, nextPosition.pos + 1);
          if (nextPosition.value === '') return true;
        }
        return false;
      } else {
        return true;
      }
    } else {
      //console.log("Filtering no");
      return false;
    }
  }
  createNewListener(position, property) {
    const key = {
      position,
      property
    };
    this.clearEmptyListeners();
    let item = this.listeners.get(key);
    if (item == null) {
      item = new rxjs__WEBPACK_IMPORTED_MODULE_12__.ReplaySubject(1);
      this.listeners.set(key, item);
      this.listenerCachePerPosition.clear();
    }
    // Someone was listening to the same element, so we need to send the initial Reset only to the new listener
    if (item.observed == true) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.throwError)(() => new Error("Several components listen to the same position {" + position + ', ' + property));
    }
    // In case the model already contains a value the listener is interested in, just call it already
    const cleanedPosition = this.cleanPosition(position);
    const existing = this.modelManager.findAtPosition(cleanedPosition, false);
    if (existing != null) {
      let chg = new Change(ChangeType.RESET, cleanedPosition, existing, this.schemaManager.generateSchemaPointer(cleanedPosition));
      if (this.isInterestedIn(position, property, chg)) {
        item.next(chg);
      } else {
        // Try to find if a sub element works (in case the listener wants all changes inside an array, for example "creation/entities" and "name" property)
        if (property != null) {
          for (const propKey in existing) {
            chg = new Change(ChangeType.RESET, cleanedPosition + '/' + propKey, existing[propKey], this.schemaManager.generateSchemaPointer(cleanedPosition + '/' + propKey));
            if (this.isInterestedIn(position, property, chg)) {
              item.next(chg);
            } else if (property != null && existing[propKey][property] != null) {
              chg = new Change(ChangeType.RESET, cleanedPosition + '/' + propKey + '/' + property, existing[propKey][property], this.schemaManager.generateSchemaPointer(cleanedPosition + '/' + propKey + '/' + property));
              if (this.isInterestedIn(position, property, chg)) {
                item.next(chg);
              }
            }
          }
        }
      }
    }
    return item;
  }
  addToListenerCache(position, who) {
    let interesteds = this.listenerCachePerPosition.get(position);
    if (!interesteds) {
      interesteds = new Array();
      this.listenerCachePerPosition.set(position, interesteds);
    }
    interesteds.push(who);
  }
  getJsonAt(position) {
    return this.modelManager.findAtPosition(position, false);
  }
  /**
   * Adds to the model the updates of configuration defined by the plugin or by the repository
   * @param defs
   */
  applyPluginConfigUpdates(defs) {
    if (defs != null) {
      for (const definition of defs) {
        this.pushChange(this.modelManager.convertToChange(definition));
      }
    }
  }
  /**
   * Updates the model by the change (by calling DontCodeModelManager.applyChange ()), and notifies all listeners of the modifications
   * @param change
   * @return true if at least one listener has been called
   */
  pushChange(change) {
    let ret = false;
    const subChanges = this.modelManager.applyChange(change);
    ret = this.manageChangeInternally(change);
    // Sends as well the subChanges induced by this change
    for (const subChange of subChanges) {
      if (subChange.type !== change.type || subChange.position !== change.position) {
        const otherRet = this.manageChangeInternally(subChange);
        ret = ret || otherRet;
      }
    }
    return ret;
  }
  manageChangeInternally(change) {
    if (!change.pointer) {
      change.pointer = this.calculatePointerFor(change.position);
    }
    this.receivedChanges.next(change);
    return this.findAndNotify(change, new Map());
  }
  /**
   * Finds a listener that is interested in this change and notifies it.
   * @param change
   * @param alreadyCalled
   */
  findAndNotify(change, alreadyCalled) {
    var _a;
    let ret = false;
    // First resolve the position and cache it
    if (!this.listenerCachePerPosition.get(change.position)) {
      this.listeners.forEach((value, key) => {
        if (this.isInterestedIn(key.position, key.property, change)) {
          this.addToListenerCache(change.position, value);
        }
      });
    }
    // Then call all listeners, but only once
    const affected = this.listenerCachePerPosition.get(change.position);
    if (affected != null) {
      for (const subject of affected) {
        let canCall = true;
        const positions = alreadyCalled.get(subject);
        if (positions) {
          // Don't call twice the same listener for the same or parent position
          for (const position of positions) {
            if (change.position.startsWith(position)) {
              canCall = false;
            }
          }
        } else {
          alreadyCalled.set(subject, new Array());
        }
        if (canCall) {
          ret = true;
          subject.next(change);
          (_a = alreadyCalled.get(subject)) === null || _a === void 0 ? void 0 : _a.push(change.position);
        }
      }
    }
    return ret;
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
    if (position) {
      return this.createNewListener(position, property);
    } else return this.receivedChanges;
  }
  getSchemaManager() {
    return this.schemaManager;
  }
  calculatePointerFor(position) {
    const ret = this.schemaManager.generateSchemaPointer(position);
    return ret;
  }
  close() {
    this.receivedChanges.complete();
  }
  /**
   * Removes ? or / from end of position
   * @param position
   * @private
   */
  cleanPosition(position) {
    position = position.endsWith('?') ? position.substring(0, position.length - 1) : position;
    position = position.endsWith('/') ? position.substring(0, position.length - 1) : position;
    return position;
  }
  clearEmptyListeners() {
    const toRemove = new Array();
    for (const listener of this.listeners) {
      if (!listener[1].observed) {
        toRemove.push(listener[0]);
      }
    }
    for (const remove of toRemove) {
      this.listeners.delete(remove);
    }
  }
}
class DontCodeCore {
  constructor() {
    console.debug("Init core");
    this.schemaManager = new DontCodeSchemaManager();
    this.pluginManager = new DontCodePluginManager();
    this.previewManager = new DontCodePreviewManager();
    this.modelManager = new DontCodeModelManager(this.schemaManager);
    this.changeManager = new DontCodeChangeManager(this.schemaManager, this.modelManager);
    this.storeManager = new DontCodeStoreManager(this.modelManager);
  }
  reset() {
    this.schemaManager.reset();
    this.pluginManager.reset();
    this.previewManager.reset();
    this.modelManager.reset();
    this.changeManager.reset();
    this.storeManager.reset();
    return this;
  }
  registerPlugin(plugin) {
    this.pluginManager.registerPlugin(plugin, this.schemaManager, this.previewManager);
  }
  initPlugins() {
    this.pluginManager.initPlugins(this);
  }
  getSchemaUri() {
    return 'schemas/v1/dont-code-schema.json';
  }
  /**
   * Returns the schema of dont-code augmented by plugins
   */
  getSchemaManager() {
    return this.schemaManager;
  }
  getPreviewManager() {
    return this.previewManager;
  }
  getStoreManager() {
    return this.storeManager;
  }
  getModelManager() {
    return this.modelManager;
  }
  getChangeManager() {
    return this.changeManager;
  }
}
if (!self.dontCodeCore) self.dontCodeCore = new DontCodeCore();
// eslint-disable-next-line no-var
var dtcde = self.dontCodeCore;

/**
 * Description of a message exchanged between the components (client, services)
 * It can be an INIT with the sessionId requested or given
 * Or a CHANGE with the sessionId and Change
 */
class Message {
  constructor(type, sessionId, change) {
    this.type = type;
    this.sessionId = sessionId;
    this.change = change;
  }
}
var MessageType;
(function (MessageType) {
  MessageType["INIT"] = "INIT";
  MessageType["CHANGE"] = "CHANGE";
})(MessageType || (MessageType = {}));

/**
 * Store a monetary amount together with the currency (value and currency).
 * To be used by all fields managing currencies ('Euro', 'Dollar', 'Other currency' by default) in order to facilitate exchange between plugins
 */
class MoneyAmount {}

/**
 * Helper in case you have synchronous action only and you don't want to manage promises
 */
class AbstractActionHandler {
  performAction(action) {
    return new Promise(() => {
      this.performSynchronousAction(action);
    });
  }
  performSynchronousAction(action) {
    // To be implemented
    throw new Error("Action " + action + " for " + action.context.valueOf() + " at " + action.position + " not implemented yet");
  }
}

/**
 * Helps handle metadata information about loaded items
 */
class StoreProviderHelper {
  /**
   * In case some entity definition has changed, clear the cache
   */
  static clearConfigCache() {
    this.specialFieldsCache.clear();
  }
  /**
   * In case the provider source doesn't support search criteria, they can be applied here
   * @param list
   * @param criteria
   */
  static applyFilters(list, ...criteria) {
    if (criteria == null || criteria.length == 0) return list;
    return list.filter(element => {
      for (const criterium of criteria) {
        const toTest = element[criterium.name];
        switch (criterium.operator) {
          case DontCodeStoreCriteriaOperator.EQUALS:
            return criterium.value == toTest;
          case DontCodeStoreCriteriaOperator.LESS_THAN:
            return toTest < criterium.value;
          case DontCodeStoreCriteriaOperator.LESS_THAN_EQUAL:
            return toTest <= criterium.value;
          default:
            throw new Error("Operator " + criterium.operator + " unknown");
        }
      }
      return true;
    });
  }
  /** Returns any field who is a date, in order to convert it from json. Keep the result in a cache map
   *
   * @param position
   * @param entity
   * @protected
   */
  static findSpecialFields(position, entity) {
    var _a, _b, _c;
    let specialFields = StoreProviderHelper.specialFieldsCache.get(position);
    if (specialFields != null) return specialFields;
    const curScore = {
      score: -1,
      field: null
    };
    specialFields = new SpecialFields();
    const fields = entity.fields;
    if (fields != null) {
      let prop;
      for (prop in fields) {
        // Finds the date fields that will need to be converted from json to javascript Date
        if (((_a = fields[prop]) === null || _a === void 0 ? void 0 : _a.type) === 'Date' || ((_b = fields[prop]) === null || _b === void 0 ? void 0 : _b.type) === 'Date & Time') {
          specialFields.addDateField((_c = fields[prop]) === null || _c === void 0 ? void 0 : _c.name);
        } else {
          StoreProviderHelper.scoreIdFieldFromEntityField(fields[prop], curScore);
        }
      }
    }
    if (curScore.score > 0) {
      specialFields.idField = curScore.field;
    }
    StoreProviderHelper.specialFieldsCache.set(position, specialFields);
    // eslint-disable-next-line no-restricted-syntax
    console.debug("Found special fields for entity at position " + position, specialFields);
    return specialFields;
  }
  static findSpecialFieldsFromData(data, existingFields) {
    if (existingFields.idField == null && (data === null || data === void 0 ? void 0 : data.length) > 0) {
      // We must guess the id field from data
      const first = data[0];
      const curScore = {
        score: -1,
        field: null
      };
      let prop;
      for (prop in first) {
        StoreProviderHelper.scoreIdFieldFromProperty(prop, curScore);
      }
      if (curScore.score > 0) {
        const test = data.length > 1 ? data[Math.floor((data.length + 1) / 2)] : null;
        if (test == null || test[curScore.field] != first[curScore.field])
          // Just check that another element doesn't have the same value as an id should be unique
          existingFields.idField = curScore.field;
      }
    }
  }
  static scoreIdFieldFromEntityField(prop, score) {
    return StoreProviderHelper.scoreIdFieldFromProperty(prop === null || prop === void 0 ? void 0 : prop.name, score);
  }
  static scoreIdFieldFromProperty(name, score) {
    if (name == null) return false;
    const propName = name.toLowerCase();
    // Finds if the element is the id field
    if (propName === "_id") {
      score.field = "_id"; // Don't need to process Id
      score.score = 100;
      return true;
    } else {
      if (propName == "id" || propName == "uniqueid" || propName == "identifier" || propName == 'key' || propName == 'primaryKey' || propName == 'uniqueKey') {
        if (score.score < 80) {
          score.score = 80;
          score.field = name;
        }
      } else if (propName.includes("unique") || propName.includes("primary")) {
        if (score.score < 50) {
          score.score = 50;
          score.field = name;
        }
      } else if (propName.includes("id") || propName.includes('key')) {
        if (score.score < 30) {
          score.score = 30;
          score.field = name;
        }
      }
      return false;
    }
  }
  /**
   * Ensure _id is removed if necessary before saving the element
   * @param listToConvert
   * @param specialFields
   * @protected
   */
  static cleanUpDataBeforeSaving(listToConvert, specialFields) {
    if ((specialFields === null || specialFields === void 0 ? void 0 : specialFields.idField) != null && (specialFields === null || specialFields === void 0 ? void 0 : specialFields.idField) != '_id') {
      listToConvert.forEach(value => {
        delete value._id;
      });
    }
  }
  /**
   * Converts dates and dateTimes properties of each element of the array to Typescript format
   * Ensure _id is set with the right id
   * @param listToConvert
   * @param specialFields
   * @protected
   */
  static cleanUpLoadedData(listToConvert, specialFields) {
    if (specialFields != null) {
      if (specialFields.idField == null) {
        StoreProviderHelper.findSpecialFieldsFromData(listToConvert, specialFields);
      }
      listToConvert.forEach(val => {
        var _a;
        if (specialFields.idField != null && specialFields.idField != "_id")
          // We need to copy the id to the standard _id field
          {
            val._id = val[specialFields.idField];
          }
        (_a = specialFields.dateFields) === null || _a === void 0 ? void 0 : _a.forEach(prop => {
          const toConvert = val[prop];
          if (toConvert != null) {
            let timeEpoch = Date.parse(toConvert);
            if (isNaN(timeEpoch)) {
              // Invalid date try to remove a possible TZ description in []
              const tzDescIndex = toConvert.lastIndexOf('[');
              if (tzDescIndex != -1) {
                timeEpoch = Date.parse(toConvert.substring(0, tzDescIndex));
              }
            }
            if (isNaN(timeEpoch)) {
              delete val[prop];
            } else {
              val[prop] = new Date(timeEpoch);
            }
          }
        });
      });
    }
  }
  /**
   * Sort the array using the defined sort declarations across all properties.
   *
   * @param toSort
   * @param sortOptions
   */
  static multiSortArray(toSort, sortOptions) {
    if (sortOptions == null) return toSort;
    return toSort;
  }
  /**
   * Calculates sum, avg, min or max values per group
   * @param values
   * @param groupBy
   * @param modelMgr
   * @param position
   * @param item
   */
  static calculateGroupedByValues(values, groupBy, modelMgr, position, item) {
    var _a, _b;
    // We are counting per different value of the groupedBy Item
    if (groupBy != null && groupBy.display != null) {
      let fieldToGroupBy = groupBy.of;
      if (groupBy.show != null) fieldToGroupBy = groupBy.show.valueOf();
      const counters = new Map();
      let lastGroupDelimiter;
      let oneGroupOfCounters = new Map();
      const fieldsRequired = groupBy.getRequiredListOfFields();
      for (const value of values) {
        if (value[fieldToGroupBy] != lastGroupDelimiter) {
          // We change the group
          lastGroupDelimiter = value[fieldToGroupBy];
          const storedGroupOfCounters = counters.get(lastGroupDelimiter);
          if (storedGroupOfCounters == null) {
            oneGroupOfCounters = new Map();
            counters.set(lastGroupDelimiter, oneGroupOfCounters);
          } else {
            oneGroupOfCounters = storedGroupOfCounters;
          }
        }
        for (const field of fieldsRequired) {
          let counter = oneGroupOfCounters === null || oneGroupOfCounters === void 0 ? void 0 : oneGroupOfCounters.get(field);
          if (counter == null) {
            counter = new Counters();
            oneGroupOfCounters.set(field, counter);
          }
          const valSrc = value[field];
          const val = valSrc;
          if (valSrc != null) {
            // If it's an object, we need to set the calculated values as the object itself
            if (typeof valSrc === 'object' && !(valSrc instanceof Date) && modelMgr != null) {
              if (counter.sum == null) counter.sum = structuredClone(valSrc);else {
                counter.sum = modelMgr.modifyValues(counter.sum, valSrc, counter.metaData, (first, second) => {
                  if (first != null && second != null) return first + second;else if (first == null) {
                    return second;
                  } else if (second == null) {
                    return first;
                  }
                }, position, item);
              }
              const _value = modelMgr.extractValue(valSrc, counter.metaData, position, item);
              if (counter.minimum == null) {
                counter.minimum = valSrc;
                counter.minAsValue = _value;
              } else {
                const minValue = counter.minAsValue;
                if (_value != null && (minValue == null || _value < minValue)) {
                  counter.minimum = valSrc;
                  counter.minAsValue = _value;
                }
              }
              if (counter.maximum == null) {
                counter.maximum = valSrc;
                counter.maxAsValue = _value;
              } else {
                const maxValue = counter.maxAsValue;
                if (_value != null && (maxValue == null || _value > maxValue)) {
                  counter.maximum = valSrc;
                  counter.maxAsValue = _value;
                }
              }
              if (_value != null) {
                counter.count++;
              }
            } else if (typeof val === 'number') {
              if (counter.sum == null) counter.sum = 0;
              counter.sum = counter.sum + val;
              if (counter.minimum == null || val < counter.minimum) {
                counter.minimum = valSrc;
                counter.minAsValue = valSrc;
              }
              if (counter.maximum == null || val > counter.maximum) {
                counter.maximum = valSrc;
                counter.maxAsValue = valSrc;
              }
              counter.count++;
            } else if (val instanceof Date && !isNaN(val.getTime())) {
              counter.sum = null;
              if (counter.minimum == null || val.valueOf() < counter.minimum.valueOf()) {
                counter.minimum = valSrc;
              }
              if (counter.maximum == null || val.valueOf() > counter.maximum.valueOf()) {
                counter.maximum = valSrc;
              }
              counter.count++;
            } else {
              // strings
              counter.count++;
            }
          }
        }
      }
      // Now that we have all the counters, let's generate the GroupedFields
      let ret;
      if (counters.size > 0) {
        ret = new DontCodeStoreGroupedByEntities(groupBy, new Map());
        for (const groupKey of counters.keys()) {
          const group = counters.get(groupKey);
          for (const aggregate of Object.values(groupBy.display)) {
            let value;
            const counter = group.get(aggregate.of);
            if (counter != null) {
              switch (aggregate.operation) {
                case DontCodeGroupOperationType.Count:
                  value = counter.count;
                  break;
                case DontCodeGroupOperationType.Sum:
                  value = counter.sum;
                  break;
                case DontCodeGroupOperationType.Average:
                  {
                    if (counter.sum == null || counter.count == 0) value = null;else if (typeof counter.sum === 'object' && !(counter.sum instanceof Date) && modelMgr != null) {
                      value = modelMgr.applyValue(structuredClone(counter.sum), modelMgr.extractValue(counter.sum, counter.metaData, position, item) / counter.count, counter.metaData, undefined, position, item);
                    } else value = counter.sum / counter.count;
                  }
                  break;
                case DontCodeGroupOperationType.Minimum:
                  value = counter.minimum;
                  break;
                case DontCodeGroupOperationType.Maximum:
                  value = counter.maximum;
                  break;
              }
              let listOfValues = (_a = ret.values) === null || _a === void 0 ? void 0 : _a.get(groupKey);
              if (listOfValues == null) {
                listOfValues = new Array();
                (_b = ret.values) === null || _b === void 0 ? void 0 : _b.set(groupKey, listOfValues);
              }
              listOfValues.push(new DontCodeStoreGroupedByValues(aggregate, value));
            }
          }
        }
        return ret.values.size > 0 ? ret : undefined;
      }
    }
    return undefined;
  }
}
StoreProviderHelper.specialFieldsCache = new Map();
class Counters {
  constructor() {
    this.count = 0;
    this.minAsValue = null;
    this.maxAsValue = null;
    this.metaData = new DataTransformationInfo();
  }
}
class SpecialFields {
  constructor() {
    this.dateFields = null;
    this.idField = null;
  }
  addDateField(name) {
    if (this.dateFields == null) {
      this.dateFields = new Array();
    }
    this.dateFields.push(name);
  }
}
class DontCodeStorePreparedEntities {
  constructor(sortedData, sortInfo, groupedByEntities) {
    this.sortedData = sortedData;
    this.sortInfo = sortInfo;
    this.groupedByEntities = groupedByEntities;
  }
}
class DontCodeStoreGroupedByEntities {
  constructor(groupInfo, values) {
    this.groupInfo = groupInfo;
    this.values = values;
    if (values == null) this.values = new Map();
  }
}
class DontCodeStoreGroupedByValues {
  constructor(forAggregate, value) {
    this.forAggregate = forAggregate;
    this.value = value;
  }
}
class AbstractDontCodeStoreProvider {
  constructor(modelMgr) {
    this.modelMgr = modelMgr;
  }
  safeLoadEntity(position, key) {
    return this.loadEntity(position, key).then(value => {
      if (value == null) return Promise.reject("Not found");else return value;
    });
  }
  /**
   * If the store supports queries with criteria, this function must be implemented, if not, listEntities must be implemented, and this function will apply filters
   * @param position
   * @param criteria
   */
  searchEntities(position, ...criteria) {
    return this.listEntities(position).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.map)(value => {
      return StoreProviderHelper.applyFilters(value, ...criteria);
    }));
  }
  /**
   * Returns the list of entities at a given position in the model. Implements at least this function or searchEntities depending on the capability of the store
   * @param position
   * @protected
   */
  listEntities(position) {
    return this.searchEntities(position);
  }
  searchAndPrepareEntities(position, sort, groupBy, transformer, ...criteria) {
    return this.searchEntities(position, ...criteria).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.map)(value => {
      // Run the transformation if any
      if (transformer != null) return transformer.postLoadingTransformation(value);else return value;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.map)(value => {
      let groupedByValues;
      if (sort != null || (groupBy === null || groupBy === void 0 ? void 0 : groupBy.atLeastOneGroupIsRequested()) === true) {
        value = StoreProviderHelper.multiSortArray(value, this.calculateSortHierarchy(sort, groupBy));
        if (groupBy != null) {
          groupedByValues = StoreProviderHelper.calculateGroupedByValues(value, groupBy, this.modelMgr);
        }
      }
      return new DontCodeStorePreparedEntities(value, sort, groupedByValues);
    }));
  }
  calculateSortHierarchy(sort, groupBy) {
    // We must first sort by the groupBy, and then by the sort
    let rootSort;
    if (groupBy != null) {
      rootSort = new DontCodeStoreSort(groupBy.of, undefined, sort);
    } else {
      rootSort = sort;
    }
    return rootSort;
  }
}

/**
 * Ease the unit tests by providing helper functions
 */
class DontCodeTestManager {
  static createDeleteChange(containerSchema, containerItemId, schema, itemId, property) {
    return DontCodeTestManager.createAnyChange(ChangeType.DELETE, containerSchema, containerItemId, schema, itemId, null, property);
  }
  static createMoveChange(oldPosition, beforeIdOrProperty, containerSchema, containerItemId, schema, itemId, property) {
    const ret = DontCodeTestManager.createAnyChange(ChangeType.MOVE, containerSchema, containerItemId, schema, itemId, null, property);
    ret.oldPosition = oldPosition;
    if (beforeIdOrProperty) ret.beforeKey = beforeIdOrProperty;
    return ret;
  }
  static createTestChange(containerSchema, containerItemId, schema, itemId, value, property) {
    return DontCodeTestManager.createAnyChange(ChangeType.ADD, containerSchema, containerItemId, schema, itemId, value, property);
  }
  /**
   * To help testing with pre-loaded data, you can add a storeprovider that will return the content of the file in the url
   * whenever called for the position;
   * @param position
   * @param toFetchAsset
   */
  /*  public static addDummyProviderFromAsset (position:string, toFetchAsset: string): Promise<void> {
      return fetch(toFetchAsset).then(response => response.json()).then (content => {
          DontCodeTestManager.addDummyProviderFromContent( position, content);
      });
    }
  */
  /**
   * To help testing with pre-loaded data, you can add a storeprovider that will return the content of the file in the url
   * whenever called for the position;
   * @param position
   * @param toFetchAsset
   */
  static addDummyProviderFromContent(position, toReturn, modelMgr) {
    dtcde.getStoreManager().setProvider(new DummyStoreProvider(toReturn, modelMgr), position);
  }
  /**
   * Wait until the tester function returns true. Ideal for ensuring tests wait an async result.
   * It will call done () if tester was true, or done("Timeout") if tester has always returned false
   * @param tester
   * @param done
   * @param interval
   * @param maxTry
   */
  static waitUntilTrue(tester, done, interval, maxTry) {
    DontCodeTestManager.waitUntilTrueAndEmit(tester, interval, maxTry).then(ok => {
      if (ok) {
        done();
      } else {
        done("Timeout waiting for an event");
      }
    }, err => {
      done(err);
    });
  }
  static waitUntilTrueAndEmit(tester, interval, maxTry) {
    interval = interval !== null && interval !== void 0 ? interval : 50;
    maxTry = maxTry !== null && maxTry !== void 0 ? maxTry : 50;
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.firstValueFrom)((0,rxjs__WEBPACK_IMPORTED_MODULE_17__.timer)(interval, interval).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_18__.take)(maxTry), (0,rxjs__WEBPACK_IMPORTED_MODULE_19__.filter)(() => {
      return tester();
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.map)(() => {
      return true;
    })), {
      defaultValue: false
    });
  }
  static createAnyChange(type, containerSchema, containerItemId, schema, itemId, value, property) {
    var _a;
    const calcContainerItemId = containerItemId ? '/' + containerItemId : '';
    const calcItemId = itemId ? '/' + itemId : '';
    let calcSchema = schema ? '/' + schema : '';
    if (containerSchema.length == 0) calcSchema = schema ? schema : '';
    let calcProperty = property ? '/' + property : '';
    if (containerSchema.length == 0 && calcSchema.length == 0) calcProperty = property ? property : '';
    const calcPropertySchemaItem = property ? calcSchema + calcItemId : itemId ? calcSchema : '';
    const calcPropertySchema = property ? calcSchema : '';
    return new Change(type, containerSchema + calcContainerItemId + calcSchema + calcItemId + calcProperty, value, new DontCodeModelPointer(containerSchema + calcContainerItemId + calcSchema + calcItemId + calcProperty, containerSchema + calcSchema + calcProperty, containerSchema + calcContainerItemId + calcPropertySchemaItem, containerSchema + calcPropertySchema, (_a = property !== null && property !== void 0 ? property : itemId) !== null && _a !== void 0 ? _a : undefined, property != null));
  }
}
/**
 * Helper that emulates a StoreProvider with predefined values
 */
class DummyStoreProvider extends AbstractDontCodeStoreProvider {
  constructor(content, modelMgr) {
    super(modelMgr);
    this.content = content;
  }
  canStoreDocument(position) {
    return false;
  }
  deleteEntity(position, key) {
    return Promise.reject("Not implemented by Dummy tester");
  }
  loadEntity(position, key) {
    if (this.content[key] != null) return Promise.resolve(this.content[key]);
    return Promise.reject('Not found');
  }
  searchEntities(position, ...criteria) {
    if (Array.isArray(this.content)) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_20__.from)([this.content]);
    } else {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_20__.from)([[this.content]]);
    }
  }
  storeDocuments(toStore, position) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.throwError)(() => new Error("Not implemented by Dummy tester"));
  }
  storeEntity(position, entity) {
    return Promise.reject("Not implemented by Dummy tester");
  }
}
/**
 * A Class able to return a pre-defined json value. Can be used to inject to component
 */
class TestProviderInterface {
  constructor(toRet) {
    this.toRet = toRet;
  }
  getJsonAt(position) {
    return this.toRet;
  }
  receiveCommands(position, lastItem) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_21__.Observable();
  }
  calculatePointerFor(position) {
    return dtcde.getSchemaManager().generateSchemaPointer(position);
  }
  getSchemaManager() {
    return dtcde.getSchemaManager();
  }
  sendCommand(action) {
    return Promise.resolve(undefined);
  }
}

/**
 * Standard API for manipulating projects
 */
class DontCodeProject {
  constructor() {
    this.name = '';
    this.template = false;
    this.description = '';
  }
}


/***/ })

}])
//# sourceMappingURL=libs_core_dist_packages_core_index_js.js.map