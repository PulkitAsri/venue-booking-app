// Generated by dart2js (NullSafetyMode.sound, csp, deferred-serialization, intern-composite-values), the Dart to JavaScript compiler version: 3.0.0-136.0.dev.
// The code supports the following hooks:
// dartPrint(message):
//    if this function is defined it is called instead of the Dart [print]
//    method.
//
// dartMainRunner(main, args):
//    if this function is defined, the Dart [main] method will not be invoked
//    directly. Instead, a closure that will invoke [main], and its arguments
//    [args] is passed to [dartMainRunner].
//
// dartDeferredLibraryLoader(uri, successCallback, errorCallback, loadId, loadPriority):
//    if this function is defined, it will be called when a deferred library
//    is loaded. It should load and eval the javascript of `uri`, and call
//    successCallback. If it fails to do so, it should call errorCallback with
//    an error. The loadId argument is the deferred import that resulted in
//    this uri being loaded. The loadPriority argument is the priorty the
//    library should be loaded with as specified in the code via the
//    load-priority annotation (0: normal, 1: high).
//
// dartCallInstrumentation(id, qualifiedName):
//    if this function is defined, it will be called at each entry of a
//    method or constructor. Used only when compiling programs with
//    --experiment-call-instrumentation.
(function dartProgram() {
  function copyProperties(from, to) {
    var keys = Object.keys(from);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      to[key] = from[key];
    }
  }
  function mixinPropertiesHard(from, to) {
    var keys = Object.keys(from);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!to.hasOwnProperty(key))
        to[key] = from[key];
    }
  }
  function mixinPropertiesEasy(from, to) {
    Object.assign(to, from);
  }
  var supportsDirectProtoAccess = function() {
    var cls = function() {
    };
    cls.prototype = {p: {}};
    var object = new cls();
    if (!(object.__proto__ && object.__proto__.p === cls.prototype.p))
      return false;
    try {
      if (typeof navigator != "undefined" && typeof navigator.userAgent == "string" && navigator.userAgent.indexOf("Chrome/") >= 0)
        return true;
      if (typeof version == "function" && version.length == 0) {
        var v = version();
        if (/^\d+\.\d+\.\d+\.\d+$/.test(v))
          return true;
      }
    } catch (_) {
    }
    return false;
  }();
  function inherit(cls, sup) {
    cls.prototype.constructor = cls;
    cls.prototype["$is" + cls.name] = cls;
    if (sup != null) {
      if (supportsDirectProtoAccess) {
        cls.prototype.__proto__ = sup.prototype;
        return;
      }
      var clsPrototype = Object.create(sup.prototype);
      copyProperties(cls.prototype, clsPrototype);
      cls.prototype = clsPrototype;
    }
  }
  function inheritMany(sup, classes) {
    for (var i = 0; i < classes.length; i++)
      inherit(classes[i], sup);
  }
  function mixinEasy(cls, mixin) {
    mixinPropertiesEasy(mixin.prototype, cls.prototype);
    cls.prototype.constructor = cls;
  }
  function mixinHard(cls, mixin) {
    mixinPropertiesHard(mixin.prototype, cls.prototype);
    cls.prototype.constructor = cls;
  }
  function lazyOld(holder, name, getterName, initializer) {
    var uninitializedSentinel = holder;
    holder[name] = uninitializedSentinel;
    holder[getterName] = function() {
      holder[getterName] = function() {
        A.throwCyclicInit(name);
      };
      var result;
      var sentinelInProgress = initializer;
      try {
        if (holder[name] === uninitializedSentinel) {
          result = holder[name] = sentinelInProgress;
          result = holder[name] = initializer();
        } else
          result = holder[name];
      } finally {
        if (result === sentinelInProgress)
          holder[name] = null;
        holder[getterName] = function() {
          return this[name];
        };
      }
      return result;
    };
  }
  function lazy(holder, name, getterName, initializer) {
    var uninitializedSentinel = holder;
    holder[name] = uninitializedSentinel;
    holder[getterName] = function() {
      if (holder[name] === uninitializedSentinel)
        holder[name] = initializer();
      holder[getterName] = function() {
        return this[name];
      };
      return holder[name];
    };
  }
  function lazyFinal(holder, name, getterName, initializer) {
    var uninitializedSentinel = holder;
    holder[name] = uninitializedSentinel;
    holder[getterName] = function() {
      if (holder[name] === uninitializedSentinel) {
        var value = initializer();
        if (holder[name] !== uninitializedSentinel)
          A.throwLateFieldADI(name);
        holder[name] = value;
      }
      var finalValue = holder[name];
      holder[getterName] = function() {
        return finalValue;
      };
      return finalValue;
    };
  }
  function makeConstList(list) {
    list.immutable$list = Array;
    list.fixed$length = Array;
    return list;
  }
  function convertToFastObject(properties) {
    function t() {
    }
    t.prototype = properties;
    new t();
    return properties;
  }
  function convertAllToFastObject(arrayOfObjects) {
    for (var i = 0; i < arrayOfObjects.length; ++i)
      convertToFastObject(arrayOfObjects[i]);
  }
  var functionCounter = 0;
  function instanceTearOffGetter(isIntercepted, parameters) {
    var cache = null;
    return isIntercepted ? function(receiver) {
      if (cache === null)
        cache = A.closureFromTearOff(parameters);
      return new cache(receiver, this);
    } : function() {
      if (cache === null)
        cache = A.closureFromTearOff(parameters);
      return new cache(this, null);
    };
  }
  function staticTearOffGetter(parameters) {
    var cache = null;
    return function() {
      if (cache === null)
        cache = A.closureFromTearOff(parameters).prototype;
      return cache;
    };
  }
  var typesOffset = 0;
  function tearOffParameters(container, isStatic, isIntercepted, requiredParameterCount, optionalParameterDefaultValues, callNames, funsOrNames, funType, applyIndex, needsDirectAccess) {
    if (typeof funType == "number")
      funType += typesOffset;
    return {co: container, iS: isStatic, iI: isIntercepted, rC: requiredParameterCount, dV: optionalParameterDefaultValues, cs: callNames, fs: funsOrNames, fT: funType, aI: applyIndex || 0, nDA: needsDirectAccess};
  }
  function installStaticTearOff(holder, getterName, requiredParameterCount, optionalParameterDefaultValues, callNames, funsOrNames, funType, applyIndex) {
    var parameters = tearOffParameters(holder, true, false, requiredParameterCount, optionalParameterDefaultValues, callNames, funsOrNames, funType, applyIndex, false);
    var getterFunction = staticTearOffGetter(parameters);
    holder[getterName] = getterFunction;
  }
  function installInstanceTearOff(prototype, getterName, isIntercepted, requiredParameterCount, optionalParameterDefaultValues, callNames, funsOrNames, funType, applyIndex, needsDirectAccess) {
    isIntercepted = !!isIntercepted;
    var parameters = tearOffParameters(prototype, false, isIntercepted, requiredParameterCount, optionalParameterDefaultValues, callNames, funsOrNames, funType, applyIndex, !!needsDirectAccess);
    var getterFunction = instanceTearOffGetter(isIntercepted, parameters);
    prototype[getterName] = getterFunction;
  }
  function setOrUpdateInterceptorsByTag(newTags) {
    var tags = init.interceptorsByTag;
    if (!tags) {
      init.interceptorsByTag = newTags;
      return;
    }
    copyProperties(newTags, tags);
  }
  function setOrUpdateLeafTags(newTags) {
    var tags = init.leafTags;
    if (!tags) {
      init.leafTags = newTags;
      return;
    }
    copyProperties(newTags, tags);
  }
  function updateTypes(newTypes) {
    var types = init.types;
    var length = types.length;
    types.push.apply(types, newTypes);
    return length;
  }
  function updateHolder(holder, newHolder) {
    copyProperties(newHolder, holder);
    return holder;
  }
  var hunkHelpers = function() {
    var mkInstance = function(isIntercepted, requiredParameterCount, optionalParameterDefaultValues, callNames, applyIndex) {
        return function(container, getterName, name, funType) {
          return installInstanceTearOff(container, getterName, isIntercepted, requiredParameterCount, optionalParameterDefaultValues, callNames, [name], funType, applyIndex, false);
        };
      },
      mkStatic = function(requiredParameterCount, optionalParameterDefaultValues, callNames, applyIndex) {
        return function(container, getterName, name, funType) {
          return installStaticTearOff(container, getterName, requiredParameterCount, optionalParameterDefaultValues, callNames, [name], funType, applyIndex);
        };
      };
    return {inherit: inherit, inheritMany: inheritMany, mixin: mixinEasy, mixinHard: mixinHard, installStaticTearOff: installStaticTearOff, installInstanceTearOff: installInstanceTearOff, _instance_0u: mkInstance(0, 0, null, ["call$0"], 0), _instance_1u: mkInstance(0, 1, null, ["call$1"], 0), _instance_2u: mkInstance(0, 2, null, ["call$2"], 0), _instance_0i: mkInstance(1, 0, null, ["call$0"], 0), _instance_1i: mkInstance(1, 1, null, ["call$1"], 0), _instance_2i: mkInstance(1, 2, null, ["call$2"], 0), _static_0: mkStatic(0, null, ["call$0"], 0), _static_1: mkStatic(1, null, ["call$1"], 0), _static_2: mkStatic(2, null, ["call$2"], 0), makeConstList: makeConstList, lazy: lazy, lazyFinal: lazyFinal, lazyOld: lazyOld, updateHolder: updateHolder, convertToFastObject: convertToFastObject, updateTypes: updateTypes, setOrUpdateInterceptorsByTag: setOrUpdateInterceptorsByTag, setOrUpdateLeafTags: setOrUpdateLeafTags};
  }();
  function initializeDeferredHunk(hunk) {
    typesOffset = init.types.length;
    hunk(hunkHelpers, init, holders, $);
  }
  var A = {
    _Universe_addRules(universe, rules) {
      return A._Utils_objectAssign(universe.tR, rules);
    },
    _Universe_addErasedTypes(universe, types) {
      return A._Utils_objectAssign(universe.eT, types);
    },
    _Utils_objectAssign(o, other) {
      var i, key,
        keys = Object.keys(other),
        $length = keys.length;
      for (i = 0; i < $length; ++i) {
        key = keys[i];
        o[key] = other[key];
      }
    },
    main() {
    }
  };
  var holders = [A];
  var $ = {};
  var init = {
    typeUniverse: {eC: new Map(), tR: {}, eT: {}, tPV: {}, sEA: []},
    mangledGlobalNames: {int: "int", double: "double", num: "num", String: "String", bool: "bool", Null: "Null", List: "List"},
    mangledNames: {},
    types: [],
    arrayRti: Symbol("$ti")
  };
  (function nativeSupport() {
    hunkHelpers.setOrUpdateInterceptorsByTag({});
    hunkHelpers.setOrUpdateLeafTags({});
  })();
  convertAllToFastObject(holders);
  convertToFastObject($);
  (function(callback) {
    if (typeof document === "undefined") {
      callback(null);
      return;
    }
    if (typeof document.currentScript != "undefined") {
      callback(document.currentScript);
      return;
    }
    var scripts = document.scripts;
    function onLoad(event) {
      for (var i = 0; i < scripts.length; ++i)
        scripts[i].removeEventListener("load", onLoad, false);
      callback(event.target);
    }
    for (var i = 0; i < scripts.length; ++i)
      scripts[i].addEventListener("load", onLoad, false);
  })(function(currentScript) {
    init.currentScript = currentScript;
    var callMain = A.main;
    if (typeof dartMainRunner === "function")
      dartMainRunner(callMain, []);
    else
      callMain([]);
  });
})();

//# sourceMappingURL=out.js.map
