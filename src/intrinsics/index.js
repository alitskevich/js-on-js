import { struct } from '../core/_structs';

export default struct.Hash({
// %Array%	Array	The Array constructor (22.1.1)
// %ArrayPrototype%	Array.prototype	The initial value of the  prototype data property of %Array% (22.1.3)
// %ArrayProto_values%	Array.prototype.values	The initial value of the  values data property of %ArrayPrototype% (22.1.3.30)
// %ArrayIteratorPrototype%		The prototype of Array iterator objects (22.1.5)

// %AsyncFunction%		The constructor of async function objects (25.5.1)
// %AsyncFunctionPrototype%		The initial value of the  prototype data property of %AsyncFunction%

// %Atomics%	Atomics	The Atomics object (24.4)
// %Boolean%	Boolean	The Boolean constructor (19.3.1)
// %BooleanPrototype%	Boolean.prototype	The initial value of the  prototype data property of %Boolean% (19.3.3)
// %DataView%	DataView	The DataView constructor (24.3.2)
// %DataViewPrototype%	DataView.prototype	The initial value of the  prototype data property of %DataView%

// %Date%	Date	The Date constructor (20.3.2)
// %DatePrototype%	Date.prototype	The initial value of the  prototype data property of %Date%.

// %decodeURI%	decodeURI	The decodeURI function (18.2.6.2)
// %decodeURIComponent%	decodeURIComponent	The  decodeURIComponent function (18.2.6.3)
// %encodeURI%	encodeURI	The encodeURI function (18.2.6.4)
// %encodeURIComponent%	encodeURIComponent	The  encodeURIComponent function (18.2.6.5)

// %Error%	Error	The Error constructor (19.5.1)
// %ErrorPrototype%	Error.prototype	The initial value of the  prototype data property of %Error%
// %SyntaxError%	SyntaxError	The SyntaxError constructor (19.5.5.4)
// %SyntaxErrorPrototype%	SyntaxError.prototype	The initial value of the  prototype property of %SyntaxError%
// %ThrowTypeError%		A function object that unconditionally throws a new instance of %TypeError%
// %TypeError%	TypeError	The TypeError constructor (19.5.5.5)
// %TypeErrorPrototype%	TypeError.prototype	The initial value of the  prototype property of %TypeError%
// %URIError%	URIError	The URIError constructor (19.5.5.6)
// %URIErrorPrototype%	URIError.prototype	The initial value of the  prototype property of %URIError%
// %EvalError%	EvalError	The EvalError constructor (19.5.5.1)
// %EvalErrorPrototype%	EvalError.prototype	The initial value of the  prototype property of %EvalError%
// %RangeError%	RangeError	The RangeError constructor (19.5.5.2)
// %RangeErrorPrototype%	RangeError.prototype	The initial value of the  prototype property of %RangeError%
// %ReferenceError%	ReferenceError	The ReferenceError constructor (19.5.5.3)
// %ReferenceErrorPrototype%	ReferenceError.prototype	The initial value of the  prototype property of %ReferenceError%

// %eval%	eval	The eval function (18.2.1)
// %Float32Array%	Float32Array	The Float32Array constructor (22.2)
// %Float32ArrayPrototype%	Float32Array.prototype	The initial value of the  prototype data property of %Float32Array%.
// %Float64Array%	Float64Array	The Float64Array constructor (22.2)
// %Float64ArrayPrototype%	Float64Array.prototype	The initial value of the  prototype data property of %Float64Array%

// %Function%	Function	The Function constructor (19.2.1)
// %FunctionPrototype%	Function.prototype	The initial value of the  prototype data property of %Function%
// %Generator%		The initial value of the  prototype property of %GeneratorFunction%
// %GeneratorFunction%		The constructor of generator objects (25.2.1)
// %GeneratorPrototype%		The initial value of the  prototype property of %Generator%

// %isFinite%	isFinite	The isFinite function (18.2.2)
// %isNaN%	isNaN	The isNaN function (18.2.3)
// %IteratorPrototype%		An object that all standard built-in iterator objects indirectly inherit from

// %JSON%	JSON	The JSON object (24.5)

// %Map%	Map	The Map constructor (23.1.1)
// %MapIteratorPrototype%		The prototype of Map iterator objects (23.1.5)
// %MapPrototype%	Map.prototype	The initial value of the  prototype data property of %Map%

// %Math%	Math	The Math object (20.2)

// %Number%	Number	The Number constructor (20.1.1)
// %NumberPrototype%	Number.prototype	The initial value of the  prototype property of %Number%

// %Object%	Object	The Object constructor (19.1.1)
// %ObjectPrototype%	Object.prototype	The initial value of the  prototype data property of %Object%. (19.1.3)
// %ObjProto_toString%	Object.prototype.toString	The initial value of the  toString data property of %ObjectPrototype% (19.1.3.6)
// %ObjProto_valueOf%	Object.prototype.valueOf	The initial value of the  valueOf data property of %ObjectPrototype% (19.1.3.7)

// %parseFloat%	parseFloat	The parseFloat function (18.2.4)
// %parseInt%	parseInt	The parseInt function (18.2.5)

// %Promise%	Promise	The Promise constructor (25.4.3)
// %PromisePrototype%	Promise.prototype	The initial value of the  prototype data property of %Promise%
// %Proxy%	Proxy	The Proxy constructor (26.2.1)

// %Reflect%	Reflect	The Reflect object (26.1)
// %RegExp%	RegExp	The RegExp constructor (21.2.3)
// %RegExpPrototype%	RegExp.prototype	The initial value of the  prototype data property of %RegExp%

// %Set%	Set	The Set constructor (23.2.1)
// %SetIteratorPrototype%		The prototype of Set iterator objects (23.2.5)
// %SetPrototype%	Set.prototype	The initial value of the  prototype data property of %Set%

// %ArrayBuffer%	ArrayBuffer	The ArrayBuffer constructor (24.1.2)
// %ArrayBufferPrototype%	ArrayBuffer.prototype	The initial value of the  prototype data property of %ArrayBuffer%.
// %SharedArrayBuffer%	SharedArrayBuffer	The SharedArrayBuffer constructor (24.2.2)
// %SharedArrayBufferPrototype%	SharedArrayBuffer.prototype	The initial value of the  prototype data property of %SharedArrayBuffer%.

// %String%	String	The String constructor (21.1.1)
// %StringIteratorPrototype%		The prototype of String iterator objects (21.1.5)
// %StringPrototype%	String.prototype	The initial value of the  prototype data property of %String%

// %Symbol%	Symbol	The Symbol constructor (19.4.1)
// %SymbolPrototype%	Symbol.prototype	The initial value of the  prototype data property of %Symbol%. (19.4.3)

// %TypedArray%		The super class of all typed Array constructors (22.2.1)
// %TypedArrayPrototype%		The initial value of the  prototype property of %TypedArray%
// %Int8Array%	Int8Array	The Int8Array constructor (22.2)
// %Int8ArrayPrototype%	Int8Array.prototype	The initial value of the  prototype data property of %Int8Array%
// %Int16Array%	Int16Array	The Int16Array constructor (22.2)
// %Int16ArrayPrototype%	Int16Array.prototype	The initial value of the  prototype data property of %Int16Array%
// %Int32Array%	Int32Array	The Int32Array constructor (22.2)
// %Int32ArrayPrototype%	Int32Array.prototype	The initial value of the  prototype data property of %Int32Array%
// %Uint8Array%	Uint8Array	The Uint8Array constructor (22.2)
// %Uint8ArrayPrototype%	Uint8Array.prototype	The initial value of the  prototype data property of %Uint8Array%
// %Uint8ClampedArray%	Uint8ClampedArray	The Uint8ClampedArray constructor (22.2)
// %Uint8ClampedArrayPrototype%	Uint8ClampedArray.prototype	The initial value of the  prototype data property of %Uint8ClampedArray%
// %Uint16Array%	Uint16Array	The Uint16Array constructor (22.2)
// %Uint16ArrayPrototype%	Uint16Array.prototype	The initial value of the  prototype data property of %Uint16Array%
// %Uint32Array%	Uint32Array	The Uint32Array constructor (22.2)
// %Uint32ArrayPrototype%	Uint32Array.prototype	The initial value of the  prototype data property of %Uint32Array%

// %WeakMap%	WeakMap	The WeakMap constructor (23.3.1)
// %WeakMapPrototype%	WeakMap.prototype	The initial value of the  prototype data property of %WeakMap%
// %WeakSet%	WeakSet	The WeakSet constructor (23.4.1)
// %WeakSetPrototype%	WeakSet.prototype	The initial value of the  prototype data property of %WeakSet%
})