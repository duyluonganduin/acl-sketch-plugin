var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/acl.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@skpm/timers/immediate.js":
/*!************************************************!*\
  !*** ./node_modules/@skpm/timers/immediate.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var timeout = __webpack_require__(/*! ./timeout */ "./node_modules/@skpm/timers/timeout.js")

function setImmediate(func, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
  return timeout.setTimeout(func, 0, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
}

function clearImmediate(id) {
  return timeout.clearTimeout(id)
}

module.exports = {
  setImmediate: setImmediate,
  clearImmediate: clearImmediate
}


/***/ }),

/***/ "./node_modules/@skpm/timers/test-if-fiber.js":
/*!****************************************************!*\
  !*** ./node_modules/@skpm/timers/test-if-fiber.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () {
  return typeof coscript !== 'undefined' && coscript.createFiber
}


/***/ }),

/***/ "./node_modules/@skpm/timers/timeout.js":
/*!**********************************************!*\
  !*** ./node_modules/@skpm/timers/timeout.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var fiberAvailable = __webpack_require__(/*! ./test-if-fiber */ "./node_modules/@skpm/timers/test-if-fiber.js")

var setTimeout
var clearTimeout

var fibers = []

if (fiberAvailable()) {
  var fibers = []

  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    // fibers takes care of keeping coscript around
    var id = fibers.length
    fibers.push(coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
      }
    ))
    return id
  }

  clearTimeout = function (id) {
    var timeout = fibers[id]
    if (timeout) {
      timeout.cancel() // fibers takes care of keeping coscript around
      fibers[id] = undefined // garbage collect the fiber
    }
  }
} else {
  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    coscript.shouldKeepAround = true
    var id = fibers.length
    fibers.push(true)
    coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        if (fibers[id]) { // if not cleared
          func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
        }
        clearTimeout(id)
        if (fibers.every(function (_id) { return !_id })) { // if everything is cleared
          coscript.shouldKeepAround = false
        }
      }
    )
    return id
  }

  clearTimeout = function (id) {
    fibers[id] = false
  }
}

module.exports = {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
}


/***/ }),

/***/ "./node_modules/cocoascript-class/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = undefined;
exports.default = ObjCClass;

var _runtime = __webpack_require__(/*! ./runtime.js */ "./node_modules/cocoascript-class/lib/runtime.js");

exports.SuperCall = _runtime.SuperCall;

// super when returnType is id and args are void
// id objc_msgSendSuper(struct objc_super *super, SEL op, void)

const SuperInit = (0, _runtime.SuperCall)(NSStringFromSelector("init"), [], { type: "@" });

// Returns a real ObjC class. No need to use new.
function ObjCClass(defn) {
  const superclass = defn.superclass || NSObject;
  const className = (defn.className || defn.classname || "ObjCClass") + NSUUID.UUID().UUIDString();
  const reserved = new Set(['className', 'classname', 'superclass']);
  var cls = MOClassDescription.allocateDescriptionForClassWithName_superclass_(className, superclass);
  // Add each handler to the class description
  const ivars = [];
  for (var key in defn) {
    const v = defn[key];
    if (typeof v == 'function' && key !== 'init') {
      var selector = NSSelectorFromString(key);
      cls.addInstanceMethodWithSelector_function_(selector, v);
    } else if (!reserved.has(key)) {
      ivars.push(key);
      cls.addInstanceVariableWithName_typeEncoding(key, "@");
    }
  }

  cls.addInstanceMethodWithSelector_function_(NSSelectorFromString('init'), function () {
    const self = SuperInit.call(this);
    ivars.map(name => {
      Object.defineProperty(self, name, {
        get() {
          return getIvar(self, name);
        },
        set(v) {
          (0, _runtime.object_setInstanceVariable)(self, name, v);
        }
      });
      self[name] = defn[name];
    });
    // If there is a passsed-in init funciton, call it now.
    if (typeof defn.init == 'function') defn.init.call(this);
    return self;
  });

  return cls.registerClass();
};

function getIvar(obj, name) {
  const retPtr = MOPointer.new();
  (0, _runtime.object_getInstanceVariable)(obj, name, retPtr);
  return retPtr.value().retain().autorelease();
}

/***/ }),

/***/ "./node_modules/cocoascript-class/lib/runtime.js":
/*!*******************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/runtime.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = SuperCall;
exports.CFunc = CFunc;
const objc_super_typeEncoding = '{objc_super="receiver"@"super_class"#}';

// You can store this to call your function. this must be bound to the current instance.
function SuperCall(selector, argTypes, returnType) {
  const func = CFunc("objc_msgSendSuper", [{ type: '^' + objc_super_typeEncoding }, { type: ":" }, ...argTypes], returnType);
  return function (...args) {
    const struct = make_objc_super(this, this.superclass());
    const structPtr = MOPointer.alloc().initWithValue_(struct);
    return func(structPtr, selector, ...args);
  };
}

// Recursively create a MOStruct
function makeStruct(def) {
  if (typeof def !== 'object' || Object.keys(def).length == 0) {
    return def;
  }
  const name = Object.keys(def)[0];
  const values = def[name];

  const structure = MOStruct.structureWithName_memberNames_runtime(name, Object.keys(values), Mocha.sharedRuntime());

  Object.keys(values).map(member => {
    structure[member] = makeStruct(values[member]);
  });

  return structure;
}

function make_objc_super(self, cls) {
  return makeStruct({
    objc_super: {
      receiver: self,
      super_class: cls
    }
  });
}

// Due to particularities of the JS bridge, we can't call into MOBridgeSupport objects directly
// But, we can ask key value coding to do the dirty work for us ;)
function setKeys(o, d) {
  const funcDict = NSMutableDictionary.dictionary();
  funcDict.o = o;
  Object.keys(d).map(k => funcDict.setValue_forKeyPath(d[k], "o." + k));
}

// Use any C function, not just ones with BridgeSupport
function CFunc(name, args, retVal) {
  function makeArgument(a) {
    if (!a) return null;
    const arg = MOBridgeSupportArgument.alloc().init();
    setKeys(arg, {
      type64: a.type
    });
    return arg;
  }
  const func = MOBridgeSupportFunction.alloc().init();
  setKeys(func, {
    name: name,
    arguments: args.map(makeArgument),
    returnValue: makeArgument(retVal)
  });
  return func;
}

/*
@encode(char*) = "*"
@encode(id) = "@"
@encode(Class) = "#"
@encode(void*) = "^v"
@encode(CGRect) = "{CGRect={CGPoint=dd}{CGSize=dd}}"
@encode(SEL) = ":"
*/

function addStructToBridgeSupport(key, structDef) {
  // OK, so this is probably the nastiest hack in this file.
  // We go modify MOBridgeSupportController behind its back and use kvc to add our own definition
  // There isn't another API for this though. So the only other way would be to make a real bridgesupport file.
  const symbols = MOBridgeSupportController.sharedController().valueForKey('symbols');
  if (!symbols) throw Error("Something has changed within bridge support so we can't add our definitions");
  // If someone already added this definition, don't re-register it.
  if (symbols[key] !== null) return;
  const def = MOBridgeSupportStruct.alloc().init();
  setKeys(def, {
    name: key,
    type: structDef.type
  });
  symbols[key] = def;
};

// This assumes the ivar is an object type. Return value is pretty useless.
const object_getInstanceVariable = exports.object_getInstanceVariable = CFunc("object_getInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "^@" }], { type: "^{objc_ivar=}" });
// Again, ivar is of object type
const object_setInstanceVariable = exports.object_setInstanceVariable = CFunc("object_setInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "@" }], { type: "^{objc_ivar=}" });

// We need Mocha to understand what an objc_super is so we can use it as a function argument
addStructToBridgeSupport('objc_super', { type: objc_super_typeEncoding });

/***/ }),

/***/ "./node_modules/promise-polyfill/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/promise-polyfill/lib/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setTimeout, setImmediate) {

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  this._state = 0;
  this._handled = false;
  this._value = undefined;
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = function(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
};

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

module.exports = Promise;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@skpm/timers/timeout.js */ "./node_modules/@skpm/timers/timeout.js")["setTimeout"], __webpack_require__(/*! ./node_modules/@skpm/timers/immediate.js */ "./node_modules/@skpm/timers/immediate.js")["setImmediate"]))

/***/ }),

/***/ "./node_modules/sketch-polyfill-fetch/lib/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/sketch-polyfill-fetch/lib/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Promise) {/* globals NSJSONSerialization NSJSONWritingPrettyPrinted NSDictionary NSHTTPURLResponse NSString NSASCIIStringEncoding NSUTF8StringEncoding coscript NSURL NSMutableURLRequest NSMutableData NSURLConnection */
var _ObjCClass = __webpack_require__(/*! cocoascript-class */ "./node_modules/cocoascript-class/lib/index.js")

var ObjCClass = _ObjCClass.default
var Buffer
try {
  Buffer = __webpack_require__(/*! buffer */ "buffer")
} catch (err) {}

function response (httpResponse, data) {
  var keys = []
  var all = []
  var headers = {}
  var header

  for (var i = 0; i < httpResponse.allHeaderFields().allKeys().length; i++) {
    var key = httpResponse.allHeaderFields().allKeys()[i].toLowerCase()
    var value = String(httpResponse.allHeaderFields()[key])
    keys.push(key)
    all.push([key, value])
    header = headers[key]
    headers[key] = header ? (header + ',' + value) : value
  }

  return {
    ok: (httpResponse.statusCode() / 200 | 0) == 1, // 200-399
    status: Number(httpResponse.statusCode()),
    statusText: NSHTTPURLResponse.localizedStringForStatusCode(httpResponse.statusCode()),
    useFinalURL: true,
    url: String(httpResponse.URL().absoluteString()),
    clone: response.bind(this, httpResponse, data),
    text: function () {
      return new Promise(function (resolve, reject) {
        const str = NSString.alloc().initWithData_encoding(data, NSASCIIStringEncoding)
        if (str) {
          resolve(str)
        } else {
          reject(new Error("Couldn't parse body"))
        }
      })
    },
    json: function () {
      return new Promise(function (resolve, reject) {
        var str = NSString.alloc().initWithData_encoding(data, NSUTF8StringEncoding)
        if (str) {
          // parse errors are turned into exceptions, which cause promise to be rejected
          var obj = JSON.parse(str)
          resolve(obj)
        } else {
          reject(new Error('Could not parse JSON because it is not valid UTF-8 data.'))
        }
      })
    },
    blob: function () {
      return Promise.resolve(data)
    },
    arrayBuffer: function() {
      return Promise.resolve(Buffer.from(data))
    },
    headers: {
      keys: function () { return keys },
      entries: function () { return all },
      get: function (n) { return headers[n.toLowerCase()] },
      has: function (n) { return n.toLowerCase() in headers }
    }
  }
}

// We create one ObjC class for ourselves here
var DelegateClass

function fetch (urlString, options) {
  options = options || {}
  var fiber
  try {
    fiber = coscript.createFiber()
  } catch (err) {
    coscript.shouldKeepAround = true
  }
  return new Promise(function (resolve, reject) {
    var url = NSURL.alloc().initWithString(urlString)
    var request = NSMutableURLRequest.requestWithURL(url)
    request.setHTTPMethod(options.method || 'GET')

    Object.keys(options.headers || {}).forEach(function (i) {
      request.setValue_forHTTPHeaderField(options.headers[i], i)
    })

    if (options.body) {
      var data
      if (typeof options.body === 'string') {
        var str = NSString.alloc().initWithString(options.body)
        data = str.dataUsingEncoding(NSUTF8StringEncoding)
      } else if (Buffer && Buffer.isBuffer(options.body)) {
        data = options.body.toNSData()
      } else if (options.body.isKindOfClass && (options.body.isKindOfClass(NSData) == 1) ) {
        data = options.body
      } else {
        var error
        data = NSJSONSerialization.dataWithJSONObject_options_error(options.body, NSJSONWritingPrettyPrinted, error)
        if (error != null) {
          return reject(error)
        }
        request.setValue_forHTTPHeaderField('' + data.length(), 'Content-Length')
      }
      request.setHTTPBody(data)
    }

    if (options.cache) {
      switch (options.cache) {
        case 'reload':
        case 'no-cache':
        case 'no-store': {
          request.setCachePolicy(1) // NSURLRequestReloadIgnoringLocalCacheData
        }
        case 'force-cache': {
          request.setCachePolicy(2) // NSURLRequestReturnCacheDataElseLoad
        }
        case 'only-if-cached': {
          request.setCachePolicy(3) // NSURLRequestReturnCacheDataElseLoad
        }
      }
    }


    if (!options.credentials) {
      request.setHTTPShouldHandleCookies(false)
    }

    var finished = false

    if (!DelegateClass) {
      DelegateClass = ObjCClass({
        classname: 'FetchPolyfillDelegate',
        data: null,
        httpResponse: null,
        fiber: null,
        callbacks: null,

        'connectionDidFinishLoading:': function (connection) {
          finished = true
          this.callbacks.resolve(response(this.httpResponse, this.data))
          if (this.fiber) {
            this.fiber.cleanup()
          } else {
            coscript.shouldKeepAround = false
          }
        },
        'connection:didReceiveResponse:': function (connection, httpResponse) {
          this.httpResponse = httpResponse
          this.data = NSMutableData.alloc().init()
        },
        'connection:didFailWithError:': function (connection, error) {
          finished = true
          this.callbacks.reject(error)
          if (this.fiber) {
            this.fiber.cleanup()
          } else {
            coscript.shouldKeepAround = false
          }
        },
        'connection:didReceiveData:': function (connection, data) {
          this.data.appendData(data)
        }
      })
    }

    var connectionDelegate = DelegateClass.new()
    connectionDelegate.callbacks = NSDictionary.dictionaryWithDictionary({
      resolve: resolve,
      reject: reject
    })
    connectionDelegate.fiber = fiber;

    var connection = NSURLConnection.alloc().initWithRequest_delegate(
      request,
      connectionDelegate
    )

    if (fiber) {
      fiber.onCleanup(function () {
        if (!finished) {
          connection.cancel()
        }
      })
    }

  })
}

module.exports = fetch

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/promise-polyfill/lib/index.js */ "./node_modules/promise-polyfill/lib/index.js")))

/***/ }),

/***/ "./src/acl.js":
/*!********************!*\
  !*** ./src/acl.js ***!
  \********************/
/*! exports provided: generateShortMoneyNumber, generateMoneyNumber, generateEntityName, generateCompanyName, generateVCName, generateLawfirmName, generateTurn, generateTurnTermSheet, generateTurnDealDocs, generateTurnSignature, generateTurnWiring, generateTurnClosing, generateUser, generateUserMale, generateUserFemale, generateDocName, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(fetch) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateShortMoneyNumber", function() { return generateShortMoneyNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateMoneyNumber", function() { return generateMoneyNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateEntityName", function() { return generateEntityName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateCompanyName", function() { return generateCompanyName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateVCName", function() { return generateVCName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateLawfirmName", function() { return generateLawfirmName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateTurn", function() { return generateTurn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateTurnTermSheet", function() { return generateTurnTermSheet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateTurnDealDocs", function() { return generateTurnDealDocs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateTurnSignature", function() { return generateTurnSignature; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateTurnWiring", function() { return generateTurnWiring; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateTurnClosing", function() { return generateTurnClosing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateUser", function() { return generateUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateUserMale", function() { return generateUserMale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateUserFemale", function() { return generateUserFemale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateDocName", function() { return generateDocName; });
/* ======================================== */

/* APL Sketch Plugin
/* Description
/* ======================================== */

/* ======================================== */

/* Load Sketch APIs
/* ======================================== */
var sketch = __webpack_require__(/*! sketch */ "sketch");

var Group = sketch.Group;
var Shape = sketch.Shape;
var Rectangle = sketch.Rectangle;
var Page = sketch.Page;
var Artboard = sketch.Artboard;
var Layer = sketch.Layer;
/* ======================================== */

/* ACL constants
/* ======================================== */

var aclJsonUrl = 'https://api.jsonbin.io/b/5b62a032e013915146cc8930/1';
/* ======================================== */

/* Define some data sample
/* ======================================== */

var moneyPostFix = ['B', 'M', 'K'];
var fundingType = ['Note', 'Kiss Note', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D'];
/* ======================================== */

/* Get random int
/* ======================================== */

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
/* ======================================== */

/* Generate short money
/* Example: $10B, $10M
/* ======================================== */


function generateShortMoneyNumber(context) {
  var document = sketch.fromNative(context.document);
  var selection = document.selectedLayers;
  selection.forEach(function (layer) {
    layer.text = "$" + getRandomInt(100) + "." + getRandomInt(100) + moneyPostFix[getRandomInt(moneyPostFix.length)];
  });
  sketch.UI.message('✅ Done!');
}
/* ======================================== */

/* Generate full money
/* Example: $10,000,000, $10,000,0000,000
/* ======================================== */

function generateMoneyNumber(context) {
  var document = sketch.fromNative(context.document);
  var selection = document.selectedLayers;
  selection.forEach(function (layer) {
    // Generate first number
    var money = getRandomInt(1000); // Generate number of zero after money

    var numberOfZero = getRandomInt(12); // Generate string with , like 23,000,000

    var orginalStr = '' + money,
        finalStr = '';

    for (var i = 0; i < numberOfZero; i++) {
      orginalStr = orginalStr + '0';
    } // Add comma to number


    for (var i = orginalStr.length - 1; i >= 0; i--) {
      finalStr = orginalStr[i] + finalStr;

      if (0 === (orginalStr.length - i) % 3 & i > 0) {
        finalStr = ',' + finalStr;
      }
    } // Apply to selections


    layer.text = "$" + finalStr;
  });
  sketch.UI.message('✅ Done!');
}
/* ======================================== */

/* Generate entity name
/* ======================================== */

function generateEntityName(context) {
  var document = sketch.fromNative(context.document);
  sketch.UI.message('✅ Start!');
  fetch(aclJsonUrl).then(function (response) {
    return response.text();
  }).then(function (text) {
    var json = JSON.parse(text);
    sketch.UI.message('✅ Done!');
    var entities = json.entities.companies.concat(json.entities.lawfirms, json.entities.vcs);
    var selection = document.selectedLayers;
    selection.forEach(function (layer) {
      layer.text = entities[getRandomInt(entities.length)];
    });
    sketch.UI.message('✅ Done!');
  }).catch(function (e) {
    return sketch.UI.message(e);
  });
}
/* ======================================== */

/* Generate company name
/* ======================================== */

function generateCompanyName(context) {
  var document = sketch.fromNative(context.document);
  fetch(aclJsonUrl).then(function (response) {
    return response.text();
  }).then(function (text) {
    var json = JSON.parse(text);
    var companies = json.entities.companies;
    var selection = document.selectedLayers;
    selection.forEach(function (layer) {
      layer.text = companies[getRandomInt(companies.length)];
    });
    sketch.UI.message('✅ Done!');
  }).catch(function (e) {
    return sketch.UI.message(e);
  });
}
/* ======================================== */

/* Generate VC name
/* ======================================== */

function generateVCName(context) {
  var document = sketch.fromNative(context.document);
  fetch(aclJsonUrl).then(function (response) {
    return response.text();
  }).then(function (text) {
    var json = JSON.parse(text);
    var vcs = json.entities.vcs;
    var selection = document.selectedLayers;
    selection.forEach(function (layer) {
      layer.text = vcs[getRandomInt(vcs.length)];
    });
    sketch.UI.message('✅ Done!');
  }).catch(function (e) {
    return sketch.UI.message(e);
  });
}
/* ======================================== */

/* Generate Lawfirm name
/* ======================================== */

function generateLawfirmName(context) {
  var document = sketch.fromNative(context.document);
  fetch(aclJsonUrl).then(function (response) {
    return response.text();
  }).then(function (text) {
    var json = JSON.parse(text);
    var lawfirms = json.entities.lawfirms;
    var selection = document.selectedLayers;
    selection.forEach(function (layer) {
      layer.text = lawfirms[getRandomInt(lawfirms.length)];
    });
    sketch.UI.message('✅ Done!');
  }).catch(function (e) {
    return sketch.UI.message(e);
  });
}
/* ======================================== */

/* Generate Turn
/* ======================================== */

function generateTurn(context) {
  var document = sketch.fromNative(context.document);
  fetch(aclJsonUrl).then(function (response) {
    return response.text();
  }).then(function (text) {
    var json = JSON.parse(text);
    var turns = json.turns.termsheet.concat(json.turns.dealdocs, json.turns.legaldiligence, json.turns.signature, json.turns.wiring, json.turns.closing);
    var selection = document.selectedLayers;
    selection.forEach(function (layer) {
      layer.text = turns[getRandomInt(turns.length)];
    });
    sketch.UI.message('✅ Done!');
  }).catch(function (e) {
    return sketch.UI.message(e);
  });
}
function generateTurnTermSheet(context) {
  var document = sketch.fromNative(context.document);
  fetch(aclJsonUrl).then(function (response) {
    return response.text();
  }).then(function (text) {
    var json = JSON.parse(text);
    var turns = json.turns.termsheet;
    var selection = document.selectedLayers;
    selection.forEach(function (layer) {
      layer.text = turns[getRandomInt(turns.length)];
    });
    sketch.UI.message('✅ Done!');
  }).catch(function (e) {
    return sketch.UI.message(e);
  });
}
function generateTurnDealDocs(context) {
  var document = sketch.fromNative(context.document);
  fetch(aclJsonUrl).then(function (response) {
    return response.text();
  }).then(function (text) {
    var json = JSON.parse(text);
    var turns = json.turns.dealdocs;
    var selection = document.selectedLayers;
    selection.forEach(function (layer) {
      layer.text = turns[getRandomInt(turns.length)];
    });
    sketch.UI.message('✅ Done!');
  }).catch(function (e) {
    return sketch.UI.message(e);
  });
}
function generateTurnSignature(context) {
  var document = sketch.fromNative(context.document);
  fetch(aclJsonUrl).then(function (response) {
    return response.text();
  }).then(function (text) {
    var json = JSON.parse(text);
    var turns = json.turns.signature;
    var selection = document.selectedLayers;
    selection.forEach(function (layer) {
      layer.text = turns[getRandomInt(turns.length)];
    });
    sketch.UI.message('✅ Done!');
  }).catch(function (e) {
    return sketch.UI.message(e);
  });
}
function generateTurnWiring(context) {
  var document = sketch.fromNative(context.document);
  fetch(aclJsonUrl).then(function (response) {
    return response.text();
  }).then(function (text) {
    var json = JSON.parse(text);
    var turns = json.turns.wiring;
    var selection = document.selectedLayers;
    selection.forEach(function (layer) {
      layer.text = turns[getRandomInt(turns.length)];
    });
    sketch.UI.message('✅ Done!');
  }).catch(function (e) {
    return sketch.UI.message(e);
  });
}
function generateTurnClosing(context) {
  var document = sketch.fromNative(context.document);
  fetch(aclJsonUrl).then(function (response) {
    return response.text();
  }).then(function (text) {
    var json = JSON.parse(text);
    var turns = json.turns.closing;
    var selection = document.selectedLayers;
    selection.forEach(function (layer) {
      layer.text = turns[getRandomInt(turns.length)];
    });
    sketch.UI.message('✅ Done!');
  }).catch(function (e) {
    return sketch.UI.message(e);
  });
}
/* ======================================== */

/* Generate User
/* ======================================== */

function generateUser(context) {
  var document = sketch.fromNative(context.document);
  fetch(aclJsonUrl).then(function (response) {
    return response.text();
  }).then(function (text) {
    var json = JSON.parse(text);
    var users = json.users.male.concat(json.users.female);
    var selection = document.selectedLayers;
    selection.forEach(function (layer) {
      layer.text = users[getRandomInt(users.length)];
    });
    sketch.UI.message('✅ Done!');
  }).catch(function (e) {
    return sketch.UI.message(e);
  });
}
function generateUserMale(context) {
  var document = sketch.fromNative(context.document);
  fetch(aclJsonUrl).then(function (response) {
    return response.text();
  }).then(function (text) {
    var json = JSON.parse(text);
    var users = json.users.male;
    var selection = document.selectedLayers;
    selection.forEach(function (layer) {
      layer.text = users[getRandomInt(users.length)];
    });
    sketch.UI.message('✅ Done!');
  }).catch(function (e) {
    return sketch.UI.message(e);
  });
}
function generateUserFemale(context) {
  var document = sketch.fromNative(context.document);
  fetch(aclJsonUrl).then(function (response) {
    return response.text();
  }).then(function (text) {
    var json = JSON.parse(text);
    var users = json.users.female;
    var selection = document.selectedLayers;
    selection.forEach(function (layer) {
      layer.text = users[getRandomInt(users.length)];
    });
    sketch.UI.message('✅ Done!');
  }).catch(function (e) {
    return sketch.UI.message(e);
  });
}
/* ======================================== */

/* Generate Doc names
/* ======================================== */

function generateDocName(context) {
  var document = sketch.fromNative(context.document);
  fetch(aclJsonUrl).then(function (response) {
    return response.text();
  }).then(function (text) {
    var json = JSON.parse(text);
    var docnames = json.docnames;
    var selection = document.selectedLayers;
    selection.forEach(function (layer) {
      layer.text = docnames[getRandomInt(docnames.length)];
    });
    sketch.UI.message('✅ Done!');
  }).catch(function (e) {
    return sketch.UI.message(e);
  });
}
/* ======================================== */

/* Default function
/* ======================================== */

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  context.document.showMessage("It's alive 🙌");
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/sketch-polyfill-fetch/lib/index.js */ "./node_modules/sketch-polyfill-fetch/lib/index.js")))

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['generateShortMoneyNumber'] = __skpm_run.bind(this, 'generateShortMoneyNumber');
that['onRun'] = __skpm_run.bind(this, 'default');
that['generateMoneyNumber'] = __skpm_run.bind(this, 'generateMoneyNumber');
that['generateEntityName'] = __skpm_run.bind(this, 'generateEntityName');
that['generateCompanyName'] = __skpm_run.bind(this, 'generateCompanyName');
that['generateVCName'] = __skpm_run.bind(this, 'generateVCName');
that['generateLawfirmName'] = __skpm_run.bind(this, 'generateLawfirmName');
that['generateTurn'] = __skpm_run.bind(this, 'generateTurn');
that['generateTurnTermSheet'] = __skpm_run.bind(this, 'generateTurnTermSheet');
that['generateTurnDealDocs'] = __skpm_run.bind(this, 'generateTurnDealDocs');
that['generateTurnSignature'] = __skpm_run.bind(this, 'generateTurnSignature');
that['generateTurnWiring'] = __skpm_run.bind(this, 'generateTurnWiring');
that['generateTurnClosing'] = __skpm_run.bind(this, 'generateTurnClosing');
that['generateUser'] = __skpm_run.bind(this, 'generateUser');
that['generateUserMale'] = __skpm_run.bind(this, 'generateUserMale');
that['generateUserFemale'] = __skpm_run.bind(this, 'generateUserFemale');
that['generateDocName'] = __skpm_run.bind(this, 'generateDocName')

//# sourceMappingURL=acl.js.map