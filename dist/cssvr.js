// File:src/Three.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

var THREE = { REVISION: '72dev' };

// browserify support

if ( typeof module === 'object' ) {

	module.exports = THREE;

}

// polyfills

if ( Math.sign === undefined ) {

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign

	Math.sign = function ( x ) {

		return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : +x;

	};

}

// File:src/math/Quaternion.js

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */

THREE.Quaternion = function ( x, y, z, w ) {

	this._x = x || 0;
	this._y = y || 0;
	this._z = z || 0;
	this._w = ( w !== undefined ) ? w : 1;

};

THREE.Quaternion.prototype = {

	constructor: THREE.Quaternion,

	_x: 0,_y: 0, _z: 0, _w: 0,

	get x () {

		return this._x;

	},

	set x ( value ) {

		this._x = value;
		this.onChangeCallback();

	},

	get y () {

		return this._y;

	},

	set y ( value ) {

		this._y = value;
		this.onChangeCallback();

	},

	get z () {

		return this._z;

	},

	set z ( value ) {

		this._z = value;
		this.onChangeCallback();

	},

	get w () {

		return this._w;

	},

	set w ( value ) {

		this._w = value;
		this.onChangeCallback();

	},

	set: function ( x, y, z, w ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;

		this.onChangeCallback();

		return this;

	},

	copy: function ( quaternion ) {

		this._x = quaternion.x;
		this._y = quaternion.y;
		this._z = quaternion.z;
		this._w = quaternion.w;

		this.onChangeCallback();

		return this;

	},

	setFromEuler: function ( euler, update ) {

		if ( euler instanceof THREE.Euler === false ) {

			throw new Error( 'THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.' );
		}

		// http://www.mathworks.com/matlabcentral/fileexchange/
		// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
		//	content/SpinCalc.m

		var c1 = Math.cos( euler._x / 2 );
		var c2 = Math.cos( euler._y / 2 );
		var c3 = Math.cos( euler._z / 2 );
		var s1 = Math.sin( euler._x / 2 );
		var s2 = Math.sin( euler._y / 2 );
		var s3 = Math.sin( euler._z / 2 );

		if ( euler.order === 'XYZ' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( euler.order === 'YXZ' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if ( euler.order === 'ZXY' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( euler.order === 'ZYX' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if ( euler.order === 'YZX' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( euler.order === 'XZY' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		}

		if ( update !== false ) this.onChangeCallback();

		return this;

	},

	setFromAxisAngle: function ( axis, angle ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

		// assumes axis is normalized

		var halfAngle = angle / 2, s = Math.sin( halfAngle );

		this._x = axis.x * s;
		this._y = axis.y * s;
		this._z = axis.z * s;
		this._w = Math.cos( halfAngle );

		this.onChangeCallback();

		return this;

	},

	setFromRotationMatrix: function ( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var te = m.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

			trace = m11 + m22 + m33,
			s;

		if ( trace > 0 ) {

			s = 0.5 / Math.sqrt( trace + 1.0 );

			this._w = 0.25 / s;
			this._x = ( m32 - m23 ) * s;
			this._y = ( m13 - m31 ) * s;
			this._z = ( m21 - m12 ) * s;

		} else if ( m11 > m22 && m11 > m33 ) {

			s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

			this._w = ( m32 - m23 ) / s;
			this._x = 0.25 * s;
			this._y = ( m12 + m21 ) / s;
			this._z = ( m13 + m31 ) / s;

		} else if ( m22 > m33 ) {

			s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

			this._w = ( m13 - m31 ) / s;
			this._x = ( m12 + m21 ) / s;
			this._y = 0.25 * s;
			this._z = ( m23 + m32 ) / s;

		} else {

			s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

			this._w = ( m21 - m12 ) / s;
			this._x = ( m13 + m31 ) / s;
			this._y = ( m23 + m32 ) / s;
			this._z = 0.25 * s;

		}

		this.onChangeCallback();

		return this;

	},

	setFromUnitVectors: function () {

		// http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final

		// assumes direction vectors vFrom and vTo are normalized

		var v1, r;

		var EPS = 0.000001;

		return function ( vFrom, vTo ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			r = vFrom.dot( vTo ) + 1;

			if ( r < EPS ) {

				r = 0;

				if ( Math.abs( vFrom.x ) > Math.abs( vFrom.z ) ) {

					v1.set( - vFrom.y, vFrom.x, 0 );

				} else {

					v1.set( 0, - vFrom.z, vFrom.y );

				}

			} else {

				v1.crossVectors( vFrom, vTo );

			}

			this._x = v1.x;
			this._y = v1.y;
			this._z = v1.z;
			this._w = r;

			this.normalize();

			return this;

		}

	}(),

	inverse: function () {

		this.conjugate().normalize();

		return this;

	},

	conjugate: function () {

		this._x *= - 1;
		this._y *= - 1;
		this._z *= - 1;

		this.onChangeCallback();

		return this;

	},

	dot: function ( v ) {

		return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

	},

	lengthSq: function () {

		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

	},

	length: function () {

		return Math.sqrt( this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w );

	},

	normalize: function () {

		var l = this.length();

		if ( l === 0 ) {

			this._x = 0;
			this._y = 0;
			this._z = 0;
			this._w = 1;

		} else {

			l = 1 / l;

			this._x = this._x * l;
			this._y = this._y * l;
			this._z = this._z * l;
			this._w = this._w * l;

		}

		this.onChangeCallback();

		return this;

	},

	multiply: function ( q, p ) {

		if ( p !== undefined ) {

			console.warn( 'THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.' );
			return this.multiplyQuaternions( q, p );

		}

		return this.multiplyQuaternions( this, q );

	},

	multiplyQuaternions: function ( a, b ) {

		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

		var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
		var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

		this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		this.onChangeCallback();

		return this;

	},

	multiplyVector3: function ( vector ) {

		console.warn( 'THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.' );
		return vector.applyQuaternion( this );

	},

	slerp: function ( qb, t ) {

		if ( t === 0 ) return this;
		if ( t === 1 ) return this.copy( qb );

		var x = this._x, y = this._y, z = this._z, w = this._w;

		// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

		var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

		if ( cosHalfTheta < 0 ) {

			this._w = - qb._w;
			this._x = - qb._x;
			this._y = - qb._y;
			this._z = - qb._z;

			cosHalfTheta = - cosHalfTheta;

		} else {

			this.copy( qb );

		}

		if ( cosHalfTheta >= 1.0 ) {

			this._w = w;
			this._x = x;
			this._y = y;
			this._z = z;

			return this;

		}

		var halfTheta = Math.acos( cosHalfTheta );
		var sinHalfTheta = Math.sqrt( 1.0 - cosHalfTheta * cosHalfTheta );

		if ( Math.abs( sinHalfTheta ) < 0.001 ) {

			this._w = 0.5 * ( w + this._w );
			this._x = 0.5 * ( x + this._x );
			this._y = 0.5 * ( y + this._y );
			this._z = 0.5 * ( z + this._z );

			return this;

		}

		var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
		ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

		this._w = ( w * ratioA + this._w * ratioB );
		this._x = ( x * ratioA + this._x * ratioB );
		this._y = ( y * ratioA + this._y * ratioB );
		this._z = ( z * ratioA + this._z * ratioB );

		this.onChangeCallback();

		return this;

	},

	equals: function ( quaternion ) {

		return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );

	},

	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		this._x = array[ offset ];
		this._y = array[ offset + 1 ];
		this._z = array[ offset + 2 ];
		this._w = array[ offset + 3 ];

		this.onChangeCallback();

		return this;

	},

	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this._x;
		array[ offset + 1 ] = this._y;
		array[ offset + 2 ] = this._z;
		array[ offset + 3 ] = this._w;

		return array;

	},

	onChange: function ( callback ) {

		this.onChangeCallback = callback;

		return this;

	},

	onChangeCallback: function () {},

	clone: function () {

		return new THREE.Quaternion( this._x, this._y, this._z, this._w );

	}

};

THREE.Quaternion.slerp = function ( qa, qb, qm, t ) {

	return qm.copy( qa ).slerp( qb, t );

};

// File:src/math/Vector2.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */

THREE.Vector2 = function ( x, y ) {

	this.x = x || 0;
	this.y = y || 0;

};

THREE.Vector2.prototype = {

	constructor: THREE.Vector2,

	set: function ( x, y ) {

		this.x = x;
		this.y = y;

		return this;

	},

	setX: function ( x ) {

		this.x = x;

		return this;

	},

	setY: function ( y ) {

		this.y = y;

		return this;

	},

	setComponent: function ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	getComponent: function ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;

		return this;

	},

	add: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;

		return this;

	},

	addScalar: function ( s ) {

		this.x += s;
		this.y += s;

		return this;

	},

	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;

		return this;

	},

	sub: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;

		return this;

	},

	subScalar: function ( s ) {

		this.x -= s;
		this.y -= s;

		return this;

	},

	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;

		return this;

	},

	multiply: function ( v ) {

		this.x *= v.x;
		this.y *= v.y;

		return this;

	},

	multiplyScalar: function ( s ) {

		this.x *= s;
		this.y *= s;

		return this;

	},

	divide: function ( v ) {

		this.x /= v.x;
		this.y /= v.y;

		return this;

	},

	divideScalar: function ( scalar ) {

		if ( scalar !== 0 ) {

			var invScalar = 1 / scalar;

			this.x *= invScalar;
			this.y *= invScalar;

		} else {

			this.x = 0;
			this.y = 0;

		}

		return this;

	},

	min: function ( v ) {

		if ( this.x > v.x ) {

			this.x = v.x;

		}

		if ( this.y > v.y ) {

			this.y = v.y;

		}

		return this;

	},

	max: function ( v ) {

		if ( this.x < v.x ) {

			this.x = v.x;

		}

		if ( this.y < v.y ) {

			this.y = v.y;

		}

		return this;

	},

	clamp: function ( min, max ) {

		// This function assumes min < max, if this assumption isn't true it will not operate correctly

		if ( this.x < min.x ) {

			this.x = min.x;

		} else if ( this.x > max.x ) {

			this.x = max.x;

		}

		if ( this.y < min.y ) {

			this.y = min.y;

		} else if ( this.y > max.y ) {

			this.y = max.y;

		}

		return this;
	},

	clampScalar: ( function () {

		var min, max;

		return function ( minVal, maxVal ) {

			if ( min === undefined ) {

				min = new THREE.Vector2();
				max = new THREE.Vector2();

			}

			min.set( minVal, minVal );
			max.set( maxVal, maxVal );

			return this.clamp( min, max );

		};

	} )(),

	floor: function () {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );

		return this;

	},

	ceil: function () {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );

		return this;

	},

	round: function () {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );

		return this;

	},

	roundToZero: function () {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );

		return this;

	},

	negate: function () {

		this.x = - this.x;
		this.y = - this.y;

		return this;

	},

	dot: function ( v ) {

		return this.x * v.x + this.y * v.y;

	},

	lengthSq: function () {

		return this.x * this.x + this.y * this.y;

	},

	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	},

	distanceTo: function ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	},

	distanceToSquared: function ( v ) {

		var dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;

	},

	setLength: function ( l ) {

		var oldLength = this.length();

		if ( oldLength !== 0 && l !== oldLength ) {

			this.multiplyScalar( l / oldLength );
		}

		return this;

	},

	lerp: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;

		return this;

	},

	lerpVectors: function ( v1, v2, alpha ) {

		this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );

		return this;

	},

	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) );

	},

	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];

		return this;

	},

	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;

		return array;

	},

	fromAttribute: function ( attribute, index, offset ) {

		if ( offset === undefined ) offset = 0;

		index = index * attribute.itemSize + offset;

		this.x = attribute.array[ index ];
		this.y = attribute.array[ index + 1 ];

		return this;

	},

	clone: function () {

		return new THREE.Vector2( this.x, this.y );

	}

};

// File:src/math/Vector3.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author *kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.Vector3 = function ( x, y, z ) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;

};

THREE.Vector3.prototype = {

	constructor: THREE.Vector3,

	set: function ( x, y, z ) {

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	},

	setX: function ( x ) {

		this.x = x;

		return this;

	},

	setY: function ( y ) {

		this.y = y;

		return this;

	},

	setZ: function ( z ) {

		this.z = z;

		return this;

	},

	setComponent: function ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	getComponent: function ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;

	},

	add: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;

	},

	addScalar: function ( s ) {

		this.x += s;
		this.y += s;
		this.z += s;

		return this;

	},

	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;

	},

	sub: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;

	},
	
	subScalar: function ( s ) {

		this.x -= s;
		this.y -= s;
		this.z -= s;

		return this;

	},

	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;

	},

	multiply: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.' );
			return this.multiplyVectors( v, w );

		}

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;

	},

	multiplyScalar: function ( scalar ) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;

	},

	multiplyVectors: function ( a, b ) {

		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;

	},

	applyEuler: function () {

		var quaternion;

		return function ( euler ) {

			if ( euler instanceof THREE.Euler === false ) {

				console.error( 'THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order.' );

			}

			if ( quaternion === undefined ) quaternion = new THREE.Quaternion();

			this.applyQuaternion( quaternion.setFromEuler( euler ) );

			return this;

		};

	}(),

	applyAxisAngle: function () {

		var quaternion;

		return function ( axis, angle ) {

			if ( quaternion === undefined ) quaternion = new THREE.Quaternion();

			this.applyQuaternion( quaternion.setFromAxisAngle( axis, angle ) );

			return this;

		};

	}(),

	applyMatrix3: function ( m ) {

		var x = this.x;
		var y = this.y;
		var z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
		this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

		return this;

	},

	applyMatrix4: function ( m ) {

		// input: THREE.Matrix4 affine matrix

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z + e[ 12 ];
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z + e[ 13 ];
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ];

		return this;

	},

	applyProjection: function ( m ) {

		// input: THREE.Matrix4 projection matrix

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;
		var d = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] ); // perspective divide

		this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z + e[ 12 ] ) * d;
		this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z + e[ 13 ] ) * d;
		this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * d;

		return this;

	},

	applyQuaternion: function ( q ) {

		var x = this.x;
		var y = this.y;
		var z = this.z;

		var qx = q.x;
		var qy = q.y;
		var qz = q.z;
		var qw = q.w;

		// calculate quat * vector

		var ix =  qw * x + qy * z - qz * y;
		var iy =  qw * y + qz * x - qx * z;
		var iz =  qw * z + qx * y - qy * x;
		var iw = - qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
		this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
		this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

		return this;

	},

	project: function () {

		var matrix;

		return function ( camera ) {

			if ( matrix === undefined ) matrix = new THREE.Matrix4();

			matrix.multiplyMatrices( camera.projectionMatrix, matrix.getInverse( camera.matrixWorld ) );
			return this.applyProjection( matrix );

		};

	}(),

	unproject: function () {

		var matrix;

		return function ( camera ) {

			if ( matrix === undefined ) matrix = new THREE.Matrix4();

			matrix.multiplyMatrices( camera.matrixWorld, matrix.getInverse( camera.projectionMatrix ) );
			return this.applyProjection( matrix );

		};

	}(),

	transformDirection: function ( m ) {

		// input: THREE.Matrix4 affine matrix
		// vector interpreted as a direction

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

		this.normalize();

		return this;

	},

	divide: function ( v ) {

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;

	},

	divideScalar: function ( scalar ) {

		if ( scalar !== 0 ) {

			var invScalar = 1 / scalar;

			this.x *= invScalar;
			this.y *= invScalar;
			this.z *= invScalar;

		} else {

			this.x = 0;
			this.y = 0;
			this.z = 0;

		}

		return this;

	},

	min: function ( v ) {

		if ( this.x > v.x ) {

			this.x = v.x;

		}

		if ( this.y > v.y ) {

			this.y = v.y;

		}

		if ( this.z > v.z ) {

			this.z = v.z;

		}

		return this;

	},

	max: function ( v ) {

		if ( this.x < v.x ) {

			this.x = v.x;

		}

		if ( this.y < v.y ) {

			this.y = v.y;

		}

		if ( this.z < v.z ) {

			this.z = v.z;

		}

		return this;

	},

	clamp: function ( min, max ) {

		// This function assumes min < max, if this assumption isn't true it will not operate correctly

		if ( this.x < min.x ) {

			this.x = min.x;

		} else if ( this.x > max.x ) {

			this.x = max.x;

		}

		if ( this.y < min.y ) {

			this.y = min.y;

		} else if ( this.y > max.y ) {

			this.y = max.y;

		}

		if ( this.z < min.z ) {

			this.z = min.z;

		} else if ( this.z > max.z ) {

			this.z = max.z;

		}

		return this;

	},

	clampScalar: ( function () {

		var min, max;

		return function ( minVal, maxVal ) {

			if ( min === undefined ) {

				min = new THREE.Vector3();
				max = new THREE.Vector3();

			}

			min.set( minVal, minVal, minVal );
			max.set( maxVal, maxVal, maxVal );

			return this.clamp( min, max );

		};

	} )(),

	floor: function () {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		this.z = Math.floor( this.z );

		return this;

	},

	ceil: function () {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );
		this.z = Math.ceil( this.z );

		return this;

	},

	round: function () {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		this.z = Math.round( this.z );

		return this;

	},

	roundToZero: function () {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
		this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );

		return this;

	},

	negate: function () {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;

		return this;

	},

	dot: function ( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z;

	},

	lengthSq: function () {

		return this.x * this.x + this.y * this.y + this.z * this.z;

	},

	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

	},

	lengthManhattan: function () {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	},

	setLength: function ( l ) {

		var oldLength = this.length();

		if ( oldLength !== 0 && l !== oldLength  ) {

			this.multiplyScalar( l / oldLength );
		}

		return this;

	},

	lerp: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;

		return this;

	},

	lerpVectors: function ( v1, v2, alpha ) {

		this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );

		return this;

	},

	cross: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.' );
			return this.crossVectors( v, w );

		}

		var x = this.x, y = this.y, z = this.z;

		this.x = y * v.z - z * v.y;
		this.y = z * v.x - x * v.z;
		this.z = x * v.y - y * v.x;

		return this;

	},

	crossVectors: function ( a, b ) {

		var ax = a.x, ay = a.y, az = a.z;
		var bx = b.x, by = b.y, bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;

	},

	projectOnVector: function () {

		var v1, dot;

		return function ( vector ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			v1.copy( vector ).normalize();

			dot = this.dot( v1 );

			return this.copy( v1 ).multiplyScalar( dot );

		};

	}(),

	projectOnPlane: function () {

		var v1;

		return function ( planeNormal ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			v1.copy( this ).projectOnVector( planeNormal );

			return this.sub( v1 );

		}

	}(),

	reflect: function () {

		// reflect incident vector off plane orthogonal to normal
		// normal is assumed to have unit length

		var v1;

		return function ( normal ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			return this.sub( v1.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );

		}

	}(),

	angleTo: function ( v ) {

		var theta = this.dot( v ) / ( this.length() * v.length() );

		// clamp, to handle numerical problems

		return Math.acos( THREE.Math.clamp( theta, - 1, 1 ) );

	},

	distanceTo: function ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	},

	distanceToSquared: function ( v ) {

		var dx = this.x - v.x;
		var dy = this.y - v.y;
		var dz = this.z - v.z;

		return dx * dx + dy * dy + dz * dz;

	},

	setEulerFromRotationMatrix: function ( m, order ) {

		console.error( 'THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.' );

	},

	setEulerFromQuaternion: function ( q, order ) {

		console.error( 'THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.' );

	},

	getPositionFromMatrix: function ( m ) {

		console.warn( 'THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().' );

		return this.setFromMatrixPosition( m );

	},

	getScaleFromMatrix: function ( m ) {

		console.warn( 'THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().' );

		return this.setFromMatrixScale( m );
	},

	getColumnFromMatrix: function ( index, matrix ) {

		console.warn( 'THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().' );

		return this.setFromMatrixColumn( index, matrix );

	},

	setFromMatrixPosition: function ( m ) {

		this.x = m.elements[ 12 ];
		this.y = m.elements[ 13 ];
		this.z = m.elements[ 14 ];

		return this;

	},

	setFromMatrixScale: function ( m ) {

		var sx = this.set( m.elements[ 0 ], m.elements[ 1 ], m.elements[  2 ] ).length();
		var sy = this.set( m.elements[ 4 ], m.elements[ 5 ], m.elements[  6 ] ).length();
		var sz = this.set( m.elements[ 8 ], m.elements[ 9 ], m.elements[ 10 ] ).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

		return this;
	},

	setFromMatrixColumn: function ( index, matrix ) {
		
		var offset = index * 4;

		var me = matrix.elements;

		this.x = me[ offset ];
		this.y = me[ offset + 1 ];
		this.z = me[ offset + 2 ];

		return this;

	},

	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

	},

	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];

		return this;

	},

	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;

		return array;

	},

	fromAttribute: function ( attribute, index, offset ) {

		if ( offset === undefined ) offset = 0;

		index = index * attribute.itemSize + offset;

		this.x = attribute.array[ index ];
		this.y = attribute.array[ index + 1 ];
		this.z = attribute.array[ index + 2 ];

		return this;

	},

	clone: function () {

		return new THREE.Vector3( this.x, this.y, this.z );

	}

};

// File:src/math/Vector4.js

/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.Vector4 = function ( x, y, z, w ) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.w = ( w !== undefined ) ? w : 1;

};

THREE.Vector4.prototype = {

	constructor: THREE.Vector4,

	set: function ( x, y, z, w ) {

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;

	},

	setX: function ( x ) {

		this.x = x;

		return this;

	},

	setY: function ( y ) {

		this.y = y;

		return this;

	},

	setZ: function ( z ) {

		this.z = z;

		return this;

	},

	setW: function ( w ) {

		this.w = w;

		return this;

	},

	setComponent: function ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			case 3: this.w = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	getComponent: function ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = ( v.w !== undefined ) ? v.w : 1;

		return this;

	},

	add: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		this.w += v.w;

		return this;

	},

	addScalar: function ( s ) {

		this.x += s;
		this.y += s;
		this.z += s;
		this.w += s;

		return this;

	},

	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		this.w = a.w + b.w;

		return this;

	},

	sub: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		this.w -= v.w;

		return this;

	},

	subScalar: function ( s ) {

		this.x -= s;
		this.y -= s;
		this.z -= s;
		this.w -= s;

		return this;

	},

	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.w = a.w - b.w;

		return this;

	},

	multiplyScalar: function ( scalar ) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		this.w *= scalar;

		return this;

	},

	applyMatrix4: function ( m ) {

		var x = this.x;
		var y = this.y;
		var z = this.z;
		var w = this.w;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] * w;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] * w;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] * w;
		this.w = e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] * w;

		return this;

	},

	divideScalar: function ( scalar ) {

		if ( scalar !== 0 ) {

			var invScalar = 1 / scalar;

			this.x *= invScalar;
			this.y *= invScalar;
			this.z *= invScalar;
			this.w *= invScalar;

		} else {

			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 1;

		}

		return this;

	},

	setAxisAngleFromQuaternion: function ( q ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm

		// q is assumed to be normalized

		this.w = 2 * Math.acos( q.w );

		var s = Math.sqrt( 1 - q.w * q.w );

		if ( s < 0.0001 ) {

			 this.x = 1;
			 this.y = 0;
			 this.z = 0;

		} else {

			 this.x = q.x / s;
			 this.y = q.y / s;
			 this.z = q.z / s;

		}

		return this;

	},

	setAxisAngleFromRotationMatrix: function ( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var angle, x, y, z,		// variables for result
			epsilon = 0.01,		// margin to allow for rounding errors
			epsilon2 = 0.1,		// margin to distinguish between 0 and 180 degrees

			te = m.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		if ( ( Math.abs( m12 - m21 ) < epsilon )
		   && ( Math.abs( m13 - m31 ) < epsilon )
		   && ( Math.abs( m23 - m32 ) < epsilon ) ) {

			// singularity found
			// first check for identity matrix which must have +1 for all terms
			// in leading diagonal and zero in other terms

			if ( ( Math.abs( m12 + m21 ) < epsilon2 )
			   && ( Math.abs( m13 + m31 ) < epsilon2 )
			   && ( Math.abs( m23 + m32 ) < epsilon2 )
			   && ( Math.abs( m11 + m22 + m33 - 3 ) < epsilon2 ) ) {

				// this singularity is identity matrix so angle = 0

				this.set( 1, 0, 0, 0 );

				return this; // zero angle, arbitrary axis

			}

			// otherwise this singularity is angle = 180

			angle = Math.PI;

			var xx = ( m11 + 1 ) / 2;
			var yy = ( m22 + 1 ) / 2;
			var zz = ( m33 + 1 ) / 2;
			var xy = ( m12 + m21 ) / 4;
			var xz = ( m13 + m31 ) / 4;
			var yz = ( m23 + m32 ) / 4;

			if ( ( xx > yy ) && ( xx > zz ) ) { // m11 is the largest diagonal term

				if ( xx < epsilon ) {

					x = 0;
					y = 0.707106781;
					z = 0.707106781;

				} else {

					x = Math.sqrt( xx );
					y = xy / x;
					z = xz / x;

				}

			} else if ( yy > zz ) { // m22 is the largest diagonal term

				if ( yy < epsilon ) {

					x = 0.707106781;
					y = 0;
					z = 0.707106781;

				} else {

					y = Math.sqrt( yy );
					x = xy / y;
					z = yz / y;

				}

			} else { // m33 is the largest diagonal term so base result on this

				if ( zz < epsilon ) {

					x = 0.707106781;
					y = 0.707106781;
					z = 0;

				} else {

					z = Math.sqrt( zz );
					x = xz / z;
					y = yz / z;

				}

			}

			this.set( x, y, z, angle );

			return this; // return 180 deg rotation

		}

		// as we have reached here there are no singularities so we can handle normally

		var s = Math.sqrt( ( m32 - m23 ) * ( m32 - m23 )
						  + ( m13 - m31 ) * ( m13 - m31 )
						  + ( m21 - m12 ) * ( m21 - m12 ) ); // used to normalize

		if ( Math.abs( s ) < 0.001 ) s = 1;

		// prevent divide by zero, should not happen if matrix is orthogonal and should be
		// caught by singularity test above, but I've left it in just in case

		this.x = ( m32 - m23 ) / s;
		this.y = ( m13 - m31 ) / s;
		this.z = ( m21 - m12 ) / s;
		this.w = Math.acos( ( m11 + m22 + m33 - 1 ) / 2 );

		return this;

	},

	min: function ( v ) {

		if ( this.x > v.x ) {

			this.x = v.x;

		}

		if ( this.y > v.y ) {

			this.y = v.y;

		}

		if ( this.z > v.z ) {

			this.z = v.z;

		}

		if ( this.w > v.w ) {

			this.w = v.w;

		}

		return this;

	},

	max: function ( v ) {

		if ( this.x < v.x ) {

			this.x = v.x;

		}

		if ( this.y < v.y ) {

			this.y = v.y;

		}

		if ( this.z < v.z ) {

			this.z = v.z;

		}

		if ( this.w < v.w ) {

			this.w = v.w;

		}

		return this;

	},

	clamp: function ( min, max ) {

		// This function assumes min < max, if this assumption isn't true it will not operate correctly

		if ( this.x < min.x ) {

			this.x = min.x;

		} else if ( this.x > max.x ) {

			this.x = max.x;

		}

		if ( this.y < min.y ) {

			this.y = min.y;

		} else if ( this.y > max.y ) {

			this.y = max.y;

		}

		if ( this.z < min.z ) {

			this.z = min.z;

		} else if ( this.z > max.z ) {

			this.z = max.z;

		}

		if ( this.w < min.w ) {

			this.w = min.w;

		} else if ( this.w > max.w ) {

			this.w = max.w;

		}

		return this;

	},

	clampScalar: ( function () {

		var min, max;

		return function ( minVal, maxVal ) {

			if ( min === undefined ) {

				min = new THREE.Vector4();
				max = new THREE.Vector4();

			}

			min.set( minVal, minVal, minVal, minVal );
			max.set( maxVal, maxVal, maxVal, maxVal );

			return this.clamp( min, max );

		};

	} )(),

  floor: function () {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		this.z = Math.floor( this.z );
		this.w = Math.floor( this.w );

		return this;

  },

  ceil: function () {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );
		this.z = Math.ceil( this.z );
		this.w = Math.ceil( this.w );

		return this;

  },

  round: function () {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		this.z = Math.round( this.z );
		this.w = Math.round( this.w );

		return this;

  },

  roundToZero: function () {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
		this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );
		this.w = ( this.w < 0 ) ? Math.ceil( this.w ) : Math.floor( this.w );

		return this;

  },

	negate: function () {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;
		this.w = - this.w;

		return this;

	},

	dot: function ( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;

	},

	lengthSq: function () {

		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;

	},

	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

	},

	lengthManhattan: function () {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z ) + Math.abs( this.w );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	},

	setLength: function ( l ) {

		var oldLength = this.length();

		if ( oldLength !== 0 && l !== oldLength ) {

			this.multiplyScalar( l / oldLength );

		}

		return this;

	},

	lerp: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;
		this.w += ( v.w - this.w ) * alpha;

		return this;

	},

	lerpVectors: function ( v1, v2, alpha ) {

		this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );

		return this;

	},

	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) && ( v.w === this.w ) );

	},

	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];
		this.w = array[ offset + 3 ];

		return this;

	},

	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;
		array[ offset + 3 ] = this.w;

		return array;

	},

	fromAttribute: function ( attribute, index, offset ) {

		if ( offset === undefined ) offset = 0;

		index = index * attribute.itemSize + offset;

		this.x = attribute.array[ index ];
		this.y = attribute.array[ index + 1 ];
		this.z = attribute.array[ index + 2 ];
		this.w = attribute.array[ index + 3 ];

		return this;

	},

	clone: function () {

		return new THREE.Vector4( this.x, this.y, this.z, this.w );

	}

};

// File:src/math/Euler.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */

THREE.Euler = function ( x, y, z, order ) {

	this._x = x || 0;
	this._y = y || 0;
	this._z = z || 0;
	this._order = order || THREE.Euler.DefaultOrder;

};

THREE.Euler.RotationOrders = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ];

THREE.Euler.DefaultOrder = 'XYZ';

THREE.Euler.prototype = {

	constructor: THREE.Euler,

	_x: 0, _y: 0, _z: 0, _order: THREE.Euler.DefaultOrder,

	get x () {

		return this._x;

	},

	set x ( value ) {

		this._x = value;
		this.onChangeCallback();

	},

	get y () {

		return this._y;

	},

	set y ( value ) {

		this._y = value;
		this.onChangeCallback();

	},

	get z () {

		return this._z;

	},

	set z ( value ) {

		this._z = value;
		this.onChangeCallback();

	},

	get order () {

		return this._order;

	},

	set order ( value ) {

		this._order = value;
		this.onChangeCallback();

	},

	set: function ( x, y, z, order ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order || this._order;

		this.onChangeCallback();

		return this;

	},

	copy: function ( euler ) {

		this._x = euler._x;
		this._y = euler._y;
		this._z = euler._z;
		this._order = euler._order;

		this.onChangeCallback();

		return this;

	},

	setFromRotationMatrix: function ( m, order, update ) {

		var clamp = THREE.Math.clamp;

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var te = m.elements;
		var m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
		var m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
		var m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		order = order || this._order;

		if ( order === 'XYZ' ) {

			this._y = Math.asin( clamp( m13, - 1, 1 ) );

			if ( Math.abs( m13 ) < 0.99999 ) {

				this._x = Math.atan2( - m23, m33 );
				this._z = Math.atan2( - m12, m11 );

			} else {

				this._x = Math.atan2( m32, m22 );
				this._z = 0;

			}

		} else if ( order === 'YXZ' ) {

			this._x = Math.asin( - clamp( m23, - 1, 1 ) );

			if ( Math.abs( m23 ) < 0.99999 ) {

				this._y = Math.atan2( m13, m33 );
				this._z = Math.atan2( m21, m22 );

			} else {

				this._y = Math.atan2( - m31, m11 );
				this._z = 0;

			}

		} else if ( order === 'ZXY' ) {

			this._x = Math.asin( clamp( m32, - 1, 1 ) );

			if ( Math.abs( m32 ) < 0.99999 ) {

				this._y = Math.atan2( - m31, m33 );
				this._z = Math.atan2( - m12, m22 );

			} else {

				this._y = 0;
				this._z = Math.atan2( m21, m11 );

			}

		} else if ( order === 'ZYX' ) {

			this._y = Math.asin( - clamp( m31, - 1, 1 ) );

			if ( Math.abs( m31 ) < 0.99999 ) {

				this._x = Math.atan2( m32, m33 );
				this._z = Math.atan2( m21, m11 );

			} else {

				this._x = 0;
				this._z = Math.atan2( - m12, m22 );

			}

		} else if ( order === 'YZX' ) {

			this._z = Math.asin( clamp( m21, - 1, 1 ) );

			if ( Math.abs( m21 ) < 0.99999 ) {

				this._x = Math.atan2( - m23, m22 );
				this._y = Math.atan2( - m31, m11 );

			} else {

				this._x = 0;
				this._y = Math.atan2( m13, m33 );

			}

		} else if ( order === 'XZY' ) {

			this._z = Math.asin( - clamp( m12, - 1, 1 ) );

			if ( Math.abs( m12 ) < 0.99999 ) {

				this._x = Math.atan2( m32, m22 );
				this._y = Math.atan2( m13, m11 );

			} else {

				this._x = Math.atan2( - m23, m33 );
				this._y = 0;

			}

		} else {

			console.warn( 'THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order )

		}

		this._order = order;

		if ( update !== false ) this.onChangeCallback();

		return this;

	},

	setFromQuaternion: function () {

		var matrix;

		return function ( q, order, update ) {

			if ( matrix === undefined ) matrix = new THREE.Matrix4();
			matrix.makeRotationFromQuaternion( q );
			this.setFromRotationMatrix( matrix, order, update );

			return this;

		};

	}(),

	setFromVector3: function ( v, order ) {

		return this.set( v.x, v.y, v.z, order || this._order );

	},

	reorder: function () {

		// WARNING: this discards revolution information -bhouston

		var q = new THREE.Quaternion();

		return function ( newOrder ) {

			q.setFromEuler( this );
			this.setFromQuaternion( q, newOrder );

		};

	}(),

	equals: function ( euler ) {

		return ( euler._x === this._x ) && ( euler._y === this._y ) && ( euler._z === this._z ) && ( euler._order === this._order );

	},

	fromArray: function ( array ) {

		this._x = array[ 0 ];
		this._y = array[ 1 ];
		this._z = array[ 2 ];
		if ( array[ 3 ] !== undefined ) this._order = array[ 3 ];

		this.onChangeCallback();

		return this;

	},

	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this._x;
		array[ offset + 1 ] = this._y;
		array[ offset + 2 ] = this._z;
		array[ offset + 3 ] = this._order;

		return array;
	},

	toVector3: function ( optionalResult ) {

		if ( optionalResult ) {

			return optionalResult.set( this._x, this._y, this._z );

		} else {

			return new THREE.Vector3( this._x, this._y, this._z );

		}

	},

	onChange: function ( callback ) {

		this.onChangeCallback = callback;

		return this;

	},

	onChangeCallback: function () {},

	clone: function () {

		return new THREE.Euler( this._x, this._y, this._z, this._order );

	}

};

// File:src/math/Matrix3.js

/**
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */

THREE.Matrix3 = function () {

	this.elements = new Float32Array( [

		1, 0, 0,
		0, 1, 0,
		0, 0, 1

	] );

	if ( arguments.length > 0 ) {

		console.error( 'THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.' );

	}

};

THREE.Matrix3.prototype = {

	constructor: THREE.Matrix3,

	set: function ( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

		var te = this.elements;

		te[ 0 ] = n11; te[ 3 ] = n12; te[ 6 ] = n13;
		te[ 1 ] = n21; te[ 4 ] = n22; te[ 7 ] = n23;
		te[ 2 ] = n31; te[ 5 ] = n32; te[ 8 ] = n33;

		return this;

	},

	identity: function () {

		this.set(

			1, 0, 0,
			0, 1, 0,
			0, 0, 1

		);

		return this;

	},

	copy: function ( m ) {

		var me = m.elements;

		this.set(

			me[ 0 ], me[ 3 ], me[ 6 ],
			me[ 1 ], me[ 4 ], me[ 7 ],
			me[ 2 ], me[ 5 ], me[ 8 ]

		);

		return this;

	},

	multiplyVector3: function ( vector ) {

		console.warn( 'THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.' );
		return vector.applyMatrix3( this );

	},

	multiplyVector3Array: function ( a ) {

		console.warn( 'THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.' );
		return this.applyToVector3Array( a );

	},

	applyToVector3Array: function () {

		var v1;

		return function ( array, offset, length ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();
			if ( offset === undefined ) offset = 0;
			if ( length === undefined ) length = array.length;

			for ( var i = 0, j = offset; i < length; i += 3, j += 3 ) {

				v1.fromArray( array, j );
				v1.applyMatrix3( this );
				v1.toArray( array, j );

			}

			return array;

		};

	}(),

	applyToBuffer: function () {

		var v1;

		return function applyToBuffer( buffer, offset, length ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();
			if ( offset === undefined ) offset = 0;
			if ( length === undefined ) length = buffer.length / buffer.itemSize;

			for ( var i = 0, j = offset; i < length; i ++, j ++ ) {

				v1.x = buffer.getX( j );
				v1.y = buffer.getY( j );
				v1.z = buffer.getZ( j );

				v1.applyMatrix3( this );

				buffer.setXYZ( v1.x, v1.y, v1.z );

			}

			return buffer;

		};

	}(),

	multiplyScalar: function ( s ) {

		var te = this.elements;

		te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
		te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
		te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;

		return this;

	},

	determinant: function () {

		var te = this.elements;

		var a = te[ 0 ], b = te[ 1 ], c = te[ 2 ],
			d = te[ 3 ], e = te[ 4 ], f = te[ 5 ],
			g = te[ 6 ], h = te[ 7 ], i = te[ 8 ];

		return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;

	},

	getInverse: function ( matrix, throwOnInvertible ) {

		// input: THREE.Matrix4
		// ( based on http://code.google.com/p/webgl-mjs/ )

		var me = matrix.elements;
		var te = this.elements;

		te[ 0 ] =   me[ 10 ] * me[ 5 ] - me[ 6 ] * me[ 9 ];
		te[ 1 ] = - me[ 10 ] * me[ 1 ] + me[ 2 ] * me[ 9 ];
		te[ 2 ] =   me[ 6 ] * me[ 1 ] - me[ 2 ] * me[ 5 ];
		te[ 3 ] = - me[ 10 ] * me[ 4 ] + me[ 6 ] * me[ 8 ];
		te[ 4 ] =   me[ 10 ] * me[ 0 ] - me[ 2 ] * me[ 8 ];
		te[ 5 ] = - me[ 6 ] * me[ 0 ] + me[ 2 ] * me[ 4 ];
		te[ 6 ] =   me[ 9 ] * me[ 4 ] - me[ 5 ] * me[ 8 ];
		te[ 7 ] = - me[ 9 ] * me[ 0 ] + me[ 1 ] * me[ 8 ];
		te[ 8 ] =   me[ 5 ] * me[ 0 ] - me[ 1 ] * me[ 4 ];

		var det = me[ 0 ] * te[ 0 ] + me[ 1 ] * te[ 3 ] + me[ 2 ] * te[ 6 ];

		// no inverse

		if ( det === 0 ) {

			var msg = "Matrix3.getInverse(): can't invert matrix, determinant is 0";

			if ( throwOnInvertible || false ) {

				throw new Error( msg );

			} else {

				console.warn( msg );

			}

			this.identity();

			return this;

		}

		this.multiplyScalar( 1.0 / det );

		return this;

	},

	transpose: function () {

		var tmp, m = this.elements;

		tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
		tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
		tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;

		return this;

	},

	flattenToArrayOffset: function ( array, offset ) {

		var te = this.elements;

		array[ offset     ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];

		array[ offset + 3 ] = te[ 3 ];
		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];

		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];
		array[ offset + 8 ]  = te[ 8 ];

		return array;

	},

	getNormalMatrix: function ( m ) {

		// input: THREE.Matrix4

		this.getInverse( m ).transpose();

		return this;

	},

	transposeIntoArray: function ( r ) {

		var m = this.elements;

		r[ 0 ] = m[ 0 ];
		r[ 1 ] = m[ 3 ];
		r[ 2 ] = m[ 6 ];
		r[ 3 ] = m[ 1 ];
		r[ 4 ] = m[ 4 ];
		r[ 5 ] = m[ 7 ];
		r[ 6 ] = m[ 2 ];
		r[ 7 ] = m[ 5 ];
		r[ 8 ] = m[ 8 ];

		return this;

	},

	fromArray: function ( array ) {

		this.elements.set( array );

		return this;

	},

	toArray: function () {

		var te = this.elements;

		return [
			te[ 0 ], te[ 1 ], te[ 2 ],
			te[ 3 ], te[ 4 ], te[ 5 ],
			te[ 6 ], te[ 7 ], te[ 8 ]
		];

	},

	clone: function () {

		return new THREE.Matrix3().fromArray( this.elements );

	}

};

// File:src/math/Matrix4.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author timknip / http://www.floorplanner.com/
 * @author bhouston / http://exocortex.com
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.Matrix4 = function () {

	this.elements = new Float32Array( [

		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1

	] );

	if ( arguments.length > 0 ) {

		console.error( 'THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.' );

	}

};

THREE.Matrix4.prototype = {

	constructor: THREE.Matrix4,

	set: function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

		var te = this.elements;

		te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
		te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
		te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
		te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;

		return this;

	},

	identity: function () {

		this.set(

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		);

		return this;

	},

	copy: function ( m ) {

		this.elements.set( m.elements );

		return this;

	},

	extractPosition: function ( m ) {

		console.warn( 'THREE.Matrix4: .extractPosition() has been renamed to .copyPosition().' );
		return this.copyPosition( m );

	},

	copyPosition: function ( m ) {

		var te = this.elements;
		var me = m.elements;

		te[ 12 ] = me[ 12 ];
		te[ 13 ] = me[ 13 ];
		te[ 14 ] = me[ 14 ];

		return this;

	},

	extractBasis: function ( xAxis, yAxis, zAxis ) {

		var te = this.elements;

		xAxis.set( te[ 0 ], te[ 1 ], te[ 2 ] );
		yAxis.set( te[ 4 ], te[ 5 ], te[ 6 ] );
		zAxis.set( te[ 8 ], te[ 9 ], te[ 10 ] );

		return this;

	},

	makeBasis: function ( xAxis, yAxis, zAxis ) {

		this.set(
			xAxis.x, yAxis.x, zAxis.x, 0,
			xAxis.y, yAxis.y, zAxis.y, 0,
			xAxis.z, yAxis.z, zAxis.z, 0,
			0,       0,       0,       1
		);

		return this;

	},

	extractRotation: function () {

		var v1;

		return function ( m ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			var te = this.elements;
			var me = m.elements;

			var scaleX = 1 / v1.set( me[ 0 ], me[ 1 ], me[ 2 ] ).length();
			var scaleY = 1 / v1.set( me[ 4 ], me[ 5 ], me[ 6 ] ).length();
			var scaleZ = 1 / v1.set( me[ 8 ], me[ 9 ], me[ 10 ] ).length();

			te[ 0 ] = me[ 0 ] * scaleX;
			te[ 1 ] = me[ 1 ] * scaleX;
			te[ 2 ] = me[ 2 ] * scaleX;

			te[ 4 ] = me[ 4 ] * scaleY;
			te[ 5 ] = me[ 5 ] * scaleY;
			te[ 6 ] = me[ 6 ] * scaleY;

			te[ 8 ] = me[ 8 ] * scaleZ;
			te[ 9 ] = me[ 9 ] * scaleZ;
			te[ 10 ] = me[ 10 ] * scaleZ;

			return this;

		};

	}(),

	makeRotationFromEuler: function ( euler ) {

		if ( euler instanceof THREE.Euler === false ) {

			console.error( 'THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.' );

		}

		var te = this.elements;

		var x = euler.x, y = euler.y, z = euler.z;
		var a = Math.cos( x ), b = Math.sin( x );
		var c = Math.cos( y ), d = Math.sin( y );
		var e = Math.cos( z ), f = Math.sin( z );

		if ( euler.order === 'XYZ' ) {

			var ae = a * e, af = a * f, be = b * e, bf = b * f;

			te[ 0 ] = c * e;
			te[ 4 ] = - c * f;
			te[ 8 ] = d;

			te[ 1 ] = af + be * d;
			te[ 5 ] = ae - bf * d;
			te[ 9 ] = - b * c;

			te[ 2 ] = bf - ae * d;
			te[ 6 ] = be + af * d;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'YXZ' ) {

			var ce = c * e, cf = c * f, de = d * e, df = d * f;

			te[ 0 ] = ce + df * b;
			te[ 4 ] = de * b - cf;
			te[ 8 ] = a * d;

			te[ 1 ] = a * f;
			te[ 5 ] = a * e;
			te[ 9 ] = - b;

			te[ 2 ] = cf * b - de;
			te[ 6 ] = df + ce * b;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'ZXY' ) {

			var ce = c * e, cf = c * f, de = d * e, df = d * f;

			te[ 0 ] = ce - df * b;
			te[ 4 ] = - a * f;
			te[ 8 ] = de + cf * b;

			te[ 1 ] = cf + de * b;
			te[ 5 ] = a * e;
			te[ 9 ] = df - ce * b;

			te[ 2 ] = - a * d;
			te[ 6 ] = b;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'ZYX' ) {

			var ae = a * e, af = a * f, be = b * e, bf = b * f;

			te[ 0 ] = c * e;
			te[ 4 ] = be * d - af;
			te[ 8 ] = ae * d + bf;

			te[ 1 ] = c * f;
			te[ 5 ] = bf * d + ae;
			te[ 9 ] = af * d - be;

			te[ 2 ] = - d;
			te[ 6 ] = b * c;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'YZX' ) {

			var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

			te[ 0 ] = c * e;
			te[ 4 ] = bd - ac * f;
			te[ 8 ] = bc * f + ad;

			te[ 1 ] = f;
			te[ 5 ] = a * e;
			te[ 9 ] = - b * e;

			te[ 2 ] = - d * e;
			te[ 6 ] = ad * f + bc;
			te[ 10 ] = ac - bd * f;

		} else if ( euler.order === 'XZY' ) {

			var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

			te[ 0 ] = c * e;
			te[ 4 ] = - f;
			te[ 8 ] = d * e;

			te[ 1 ] = ac * f + bd;
			te[ 5 ] = a * e;
			te[ 9 ] = ad * f - bc;

			te[ 2 ] = bc * f - ad;
			te[ 6 ] = b * e;
			te[ 10 ] = bd * f + ac;

		}

		// last column
		te[ 3 ] = 0;
		te[ 7 ] = 0;
		te[ 11 ] = 0;

		// bottom row
		te[ 12 ] = 0;
		te[ 13 ] = 0;
		te[ 14 ] = 0;
		te[ 15 ] = 1;

		return this;

	},

	setRotationFromQuaternion: function ( q ) {

		console.warn( 'THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion().' );

		return this.makeRotationFromQuaternion( q );

	},

	makeRotationFromQuaternion: function ( q ) {

		var te = this.elements;

		var x = q.x, y = q.y, z = q.z, w = q.w;
		var x2 = x + x, y2 = y + y, z2 = z + z;
		var xx = x * x2, xy = x * y2, xz = x * z2;
		var yy = y * y2, yz = y * z2, zz = z * z2;
		var wx = w * x2, wy = w * y2, wz = w * z2;

		te[ 0 ] = 1 - ( yy + zz );
		te[ 4 ] = xy - wz;
		te[ 8 ] = xz + wy;

		te[ 1 ] = xy + wz;
		te[ 5 ] = 1 - ( xx + zz );
		te[ 9 ] = yz - wx;

		te[ 2 ] = xz - wy;
		te[ 6 ] = yz + wx;
		te[ 10 ] = 1 - ( xx + yy );

		// last column
		te[ 3 ] = 0;
		te[ 7 ] = 0;
		te[ 11 ] = 0;

		// bottom row
		te[ 12 ] = 0;
		te[ 13 ] = 0;
		te[ 14 ] = 0;
		te[ 15 ] = 1;

		return this;

	},

	lookAt: function () {

		var x, y, z;

		return function ( eye, target, up ) {

			if ( x === undefined ) x = new THREE.Vector3();
			if ( y === undefined ) y = new THREE.Vector3();
			if ( z === undefined ) z = new THREE.Vector3();

			var te = this.elements;

			z.subVectors( eye, target ).normalize();

			if ( z.length() === 0 ) {

				z.z = 1;

			}

			x.crossVectors( up, z ).normalize();

			if ( x.length() === 0 ) {

				z.x += 0.0001;
				x.crossVectors( up, z ).normalize();

			}

			y.crossVectors( z, x );


			te[ 0 ] = x.x; te[ 4 ] = y.x; te[ 8 ] = z.x;
			te[ 1 ] = x.y; te[ 5 ] = y.y; te[ 9 ] = z.y;
			te[ 2 ] = x.z; te[ 6 ] = y.z; te[ 10 ] = z.z;

			return this;

		};

	}(),

	multiply: function ( m, n ) {

		if ( n !== undefined ) {

			console.warn( 'THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.' );
			return this.multiplyMatrices( m, n );

		}

		return this.multiplyMatrices( this, m );

	},

	multiplyMatrices: function ( a, b ) {

		var ae = a.elements;
		var be = b.elements;
		var te = this.elements;

		var a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[ 8 ], a14 = ae[ 12 ];
		var a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[ 9 ], a24 = ae[ 13 ];
		var a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
		var a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

		var b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[ 8 ], b14 = be[ 12 ];
		var b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[ 9 ], b24 = be[ 13 ];
		var b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
		var b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

		te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		te[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		te[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		te[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

		te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		te[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		te[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		te[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

		te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		te[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		te[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		te[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

		te[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		te[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		te[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		te[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

		return this;

	},

	multiplyToArray: function ( a, b, r ) {

		var te = this.elements;

		this.multiplyMatrices( a, b );

		r[ 0 ] = te[ 0 ]; r[ 1 ] = te[ 1 ]; r[ 2 ] = te[ 2 ]; r[ 3 ] = te[ 3 ];
		r[ 4 ] = te[ 4 ]; r[ 5 ] = te[ 5 ]; r[ 6 ] = te[ 6 ]; r[ 7 ] = te[ 7 ];
		r[ 8 ]  = te[ 8 ]; r[ 9 ]  = te[ 9 ]; r[ 10 ] = te[ 10 ]; r[ 11 ] = te[ 11 ];
		r[ 12 ] = te[ 12 ]; r[ 13 ] = te[ 13 ]; r[ 14 ] = te[ 14 ]; r[ 15 ] = te[ 15 ];

		return this;

	},

	multiplyScalar: function ( s ) {

		var te = this.elements;

		te[ 0 ] *= s; te[ 4 ] *= s; te[ 8 ] *= s; te[ 12 ] *= s;
		te[ 1 ] *= s; te[ 5 ] *= s; te[ 9 ] *= s; te[ 13 ] *= s;
		te[ 2 ] *= s; te[ 6 ] *= s; te[ 10 ] *= s; te[ 14 ] *= s;
		te[ 3 ] *= s; te[ 7 ] *= s; te[ 11 ] *= s; te[ 15 ] *= s;

		return this;

	},

	multiplyVector3: function ( vector ) {

		console.warn( 'THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead.' );
		return vector.applyProjection( this );

	},

	multiplyVector4: function ( vector ) {

		console.warn( 'THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.' );
		return vector.applyMatrix4( this );

	},

	multiplyVector3Array: function ( a ) {

		console.warn( 'THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.' );
		return this.applyToVector3Array( a );

	},

	applyToVector3Array: function () {

		var v1;

		return function ( array, offset, length ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();
			if ( offset === undefined ) offset = 0;
			if ( length === undefined ) length = array.length;

			for ( var i = 0, j = offset; i < length; i += 3, j += 3 ) {

				v1.fromArray( array, j );
				v1.applyMatrix4( this );
				v1.toArray( array, j );

			}

			return array;

		};

	}(),

	applyToBuffer: function () {

		var v1;

		return function applyToBuffer( buffer, offset, length ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();
			if ( offset === undefined ) offset = 0;
			if ( length === undefined ) length = buffer.length / buffer.itemSize;

			for ( var i = 0, j = offset; i < length; i ++, j ++ ) {

				v1.x = buffer.getX( j );
				v1.y = buffer.getY( j );
				v1.z = buffer.getZ( j );

				v1.applyMatrix4( this );

				buffer.setXYZ( v1.x, v1.y, v1.z );

			}

			return buffer;

		};

	}(),

	rotateAxis: function ( v ) {

		console.warn( 'THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.' );

		v.transformDirection( this );

	},

	crossVector: function ( vector ) {

		console.warn( 'THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.' );
		return vector.applyMatrix4( this );

	},

	determinant: function () {

		var te = this.elements;

		var n11 = te[ 0 ], n12 = te[ 4 ], n13 = te[ 8 ], n14 = te[ 12 ];
		var n21 = te[ 1 ], n22 = te[ 5 ], n23 = te[ 9 ], n24 = te[ 13 ];
		var n31 = te[ 2 ], n32 = te[ 6 ], n33 = te[ 10 ], n34 = te[ 14 ];
		var n41 = te[ 3 ], n42 = te[ 7 ], n43 = te[ 11 ], n44 = te[ 15 ];

		//TODO: make this more efficient
		//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

		return (
			n41 * (
				+ n14 * n23 * n32
				 - n13 * n24 * n32
				 - n14 * n22 * n33
				 + n12 * n24 * n33
				 + n13 * n22 * n34
				 - n12 * n23 * n34
			) +
			n42 * (
				+ n11 * n23 * n34
				 - n11 * n24 * n33
				 + n14 * n21 * n33
				 - n13 * n21 * n34
				 + n13 * n24 * n31
				 - n14 * n23 * n31
			) +
			n43 * (
				+ n11 * n24 * n32
				 - n11 * n22 * n34
				 - n14 * n21 * n32
				 + n12 * n21 * n34
				 + n14 * n22 * n31
				 - n12 * n24 * n31
			) +
			n44 * (
				- n13 * n22 * n31
				 - n11 * n23 * n32
				 + n11 * n22 * n33
				 + n13 * n21 * n32
				 - n12 * n21 * n33
				 + n12 * n23 * n31
			)

		);

	},

	transpose: function () {

		var te = this.elements;
		var tmp;

		tmp = te[ 1 ]; te[ 1 ] = te[ 4 ]; te[ 4 ] = tmp;
		tmp = te[ 2 ]; te[ 2 ] = te[ 8 ]; te[ 8 ] = tmp;
		tmp = te[ 6 ]; te[ 6 ] = te[ 9 ]; te[ 9 ] = tmp;

		tmp = te[ 3 ]; te[ 3 ] = te[ 12 ]; te[ 12 ] = tmp;
		tmp = te[ 7 ]; te[ 7 ] = te[ 13 ]; te[ 13 ] = tmp;
		tmp = te[ 11 ]; te[ 11 ] = te[ 14 ]; te[ 14 ] = tmp;

		return this;

	},

	flattenToArrayOffset: function ( array, offset ) {

		var te = this.elements;

		array[ offset     ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];
		array[ offset + 3 ] = te[ 3 ];

		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];
		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];

		array[ offset + 8 ]  = te[ 8 ];
		array[ offset + 9 ]  = te[ 9 ];
		array[ offset + 10 ] = te[ 10 ];
		array[ offset + 11 ] = te[ 11 ];

		array[ offset + 12 ] = te[ 12 ];
		array[ offset + 13 ] = te[ 13 ];
		array[ offset + 14 ] = te[ 14 ];
		array[ offset + 15 ] = te[ 15 ];

		return array;

	},

	getPosition: function () {

		var v1;

		return function () {

			if ( v1 === undefined ) v1 = new THREE.Vector3();
			console.warn( 'THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.' );

			var te = this.elements;
			return v1.set( te[ 12 ], te[ 13 ], te[ 14 ] );

		};

	}(),

	setPosition: function ( v ) {

		var te = this.elements;

		te[ 12 ] = v.x;
		te[ 13 ] = v.y;
		te[ 14 ] = v.z;

		return this;

	},

	getInverse: function ( m, throwOnInvertible ) {

		// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
		var te = this.elements;
		var me = m.elements;

		var n11 = me[ 0 ], n12 = me[ 4 ], n13 = me[ 8 ], n14 = me[ 12 ];
		var n21 = me[ 1 ], n22 = me[ 5 ], n23 = me[ 9 ], n24 = me[ 13 ];
		var n31 = me[ 2 ], n32 = me[ 6 ], n33 = me[ 10 ], n34 = me[ 14 ];
		var n41 = me[ 3 ], n42 = me[ 7 ], n43 = me[ 11 ], n44 = me[ 15 ];

		te[ 0 ] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
		te[ 4 ] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
		te[ 8 ] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
		te[ 12 ] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
		te[ 1 ] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
		te[ 5 ] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
		te[ 9 ] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
		te[ 13 ] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
		te[ 2 ] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
		te[ 6 ] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
		te[ 10 ] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
		te[ 14 ] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
		te[ 3 ] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
		te[ 7 ] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
		te[ 11 ] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
		te[ 15 ] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;

		var det = n11 * te[ 0 ] + n21 * te[ 4 ] + n31 * te[ 8 ] + n41 * te[ 12 ];

		if ( det === 0 ) {

			var msg = "THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0";

			if ( throwOnInvertible || false ) {

				throw new Error( msg );

			} else {

				console.warn( msg );

			}

			this.identity();

			return this;

		}

		this.multiplyScalar( 1 / det );

		return this;

	},

	translate: function ( v ) {

		console.error( 'THREE.Matrix4: .translate() has been removed.' );

	},

	rotateX: function ( angle ) {

		console.error( 'THREE.Matrix4: .rotateX() has been removed.' );

	},

	rotateY: function ( angle ) {

		console.error( 'THREE.Matrix4: .rotateY() has been removed.' );

	},

	rotateZ: function ( angle ) {

		console.error( 'THREE.Matrix4: .rotateZ() has been removed.' );

	},

	rotateByAxis: function ( axis, angle ) {

		console.error( 'THREE.Matrix4: .rotateByAxis() has been removed.' );

	},

	scale: function ( v ) {

		var te = this.elements;
		var x = v.x, y = v.y, z = v.z;

		te[ 0 ] *= x; te[ 4 ] *= y; te[ 8 ] *= z;
		te[ 1 ] *= x; te[ 5 ] *= y; te[ 9 ] *= z;
		te[ 2 ] *= x; te[ 6 ] *= y; te[ 10 ] *= z;
		te[ 3 ] *= x; te[ 7 ] *= y; te[ 11 ] *= z;

		return this;

	},

	getMaxScaleOnAxis: function () {

		var te = this.elements;

		var scaleXSq = te[ 0 ] * te[ 0 ] + te[ 1 ] * te[ 1 ] + te[ 2 ] * te[ 2 ];
		var scaleYSq = te[ 4 ] * te[ 4 ] + te[ 5 ] * te[ 5 ] + te[ 6 ] * te[ 6 ];
		var scaleZSq = te[ 8 ] * te[ 8 ] + te[ 9 ] * te[ 9 ] + te[ 10 ] * te[ 10 ];

		return Math.sqrt( Math.max( scaleXSq, Math.max( scaleYSq, scaleZSq ) ) );

	},

	makeTranslation: function ( x, y, z ) {

		this.set(

			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1

		);

		return this;

	},

	makeRotationX: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			1, 0,  0, 0,
			0, c, - s, 0,
			0, s,  c, 0,
			0, 0,  0, 1

		);

		return this;

	},

	makeRotationY: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			 c, 0, s, 0,
			 0, 1, 0, 0,
			- s, 0, c, 0,
			 0, 0, 0, 1

		);

		return this;

	},

	makeRotationZ: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			c, - s, 0, 0,
			s,  c, 0, 0,
			0,  0, 1, 0,
			0,  0, 0, 1

		);

		return this;

	},

	makeRotationAxis: function ( axis, angle ) {

		// Based on http://www.gamedev.net/reference/articles/article1199.asp

		var c = Math.cos( angle );
		var s = Math.sin( angle );
		var t = 1 - c;
		var x = axis.x, y = axis.y, z = axis.z;
		var tx = t * x, ty = t * y;

		this.set(

			tx * x + c, tx * y - s * z, tx * z + s * y, 0,
			tx * y + s * z, ty * y + c, ty * z - s * x, 0,
			tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
			0, 0, 0, 1

		);

		 return this;

	},

	makeScale: function ( x, y, z ) {

		this.set(

			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1

		);

		return this;

	},

	compose: function ( position, quaternion, scale ) {

		this.makeRotationFromQuaternion( quaternion );
		this.scale( scale );
		this.setPosition( position );

		return this;

	},

	decompose: function () {

		var vector, matrix;

		return function ( position, quaternion, scale ) {

			if ( vector === undefined ) vector = new THREE.Vector3();
			if ( matrix === undefined ) matrix = new THREE.Matrix4();

			var te = this.elements;

			var sx = vector.set( te[ 0 ], te[ 1 ], te[ 2 ] ).length();
			var sy = vector.set( te[ 4 ], te[ 5 ], te[ 6 ] ).length();
			var sz = vector.set( te[ 8 ], te[ 9 ], te[ 10 ] ).length();

			// if determine is negative, we need to invert one scale
			var det = this.determinant();
			if ( det < 0 ) {

				sx = - sx;

			}

			position.x = te[ 12 ];
			position.y = te[ 13 ];
			position.z = te[ 14 ];

			// scale the rotation part

			matrix.elements.set( this.elements ); // at this point matrix is incomplete so we can't use .copy()

			var invSX = 1 / sx;
			var invSY = 1 / sy;
			var invSZ = 1 / sz;

			matrix.elements[ 0 ] *= invSX;
			matrix.elements[ 1 ] *= invSX;
			matrix.elements[ 2 ] *= invSX;

			matrix.elements[ 4 ] *= invSY;
			matrix.elements[ 5 ] *= invSY;
			matrix.elements[ 6 ] *= invSY;

			matrix.elements[ 8 ] *= invSZ;
			matrix.elements[ 9 ] *= invSZ;
			matrix.elements[ 10 ] *= invSZ;

			quaternion.setFromRotationMatrix( matrix );

			scale.x = sx;
			scale.y = sy;
			scale.z = sz;

			return this;

		};

	}(),

	makeFrustum: function ( left, right, bottom, top, near, far ) {

		var te = this.elements;
		var x = 2 * near / ( right - left );
		var y = 2 * near / ( top - bottom );

		var a = ( right + left ) / ( right - left );
		var b = ( top + bottom ) / ( top - bottom );
		var c = - ( far + near ) / ( far - near );
		var d = - 2 * far * near / ( far - near );

		te[ 0 ] = x;	te[ 4 ] = 0;	te[ 8 ] = a;	te[ 12 ] = 0;
		te[ 1 ] = 0;	te[ 5 ] = y;	te[ 9 ] = b;	te[ 13 ] = 0;
		te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = c;	te[ 14 ] = d;
		te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = - 1;	te[ 15 ] = 0;

		return this;

	},

	makePerspective: function ( fov, aspect, near, far ) {

		var ymax = near * Math.tan( THREE.Math.degToRad( fov * 0.5 ) );
		var ymin = - ymax;
		var xmin = ymin * aspect;
		var xmax = ymax * aspect;

		return this.makeFrustum( xmin, xmax, ymin, ymax, near, far );

	},

	makeOrthographic: function ( left, right, top, bottom, near, far ) {

		var te = this.elements;
		var w = right - left;
		var h = top - bottom;
		var p = far - near;

		var x = ( right + left ) / w;
		var y = ( top + bottom ) / h;
		var z = ( far + near ) / p;

		te[ 0 ] = 2 / w;	te[ 4 ] = 0;	te[ 8 ] = 0;	te[ 12 ] = - x;
		te[ 1 ] = 0;	te[ 5 ] = 2 / h;	te[ 9 ] = 0;	te[ 13 ] = - y;
		te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = - 2 / p;	te[ 14 ] = - z;
		te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = 0;	te[ 15 ] = 1;

		return this;

	},

	fromArray: function ( array ) {

		this.elements.set( array );

		return this;

	},

	toArray: function () {

		var te = this.elements;

		return [
			te[ 0 ], te[ 1 ], te[ 2 ], te[ 3 ],
			te[ 4 ], te[ 5 ], te[ 6 ], te[ 7 ],
			te[ 8 ], te[ 9 ], te[ 10 ], te[ 11 ],
			te[ 12 ], te[ 13 ], te[ 14 ], te[ 15 ]
		];

	},

	clone: function () {

		return new THREE.Matrix4().fromArray( this.elements );

	}

};

// File:src/math/Math.js

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Math = {

	generateUUID: function () {

		// http://www.broofa.com/Tools/Math.uuid.htm

		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split( '' );
		var uuid = new Array( 36 );
		var rnd = 0, r;

		return function () {

			for ( var i = 0; i < 36; i ++ ) {

				if ( i === 8 || i === 13 || i === 18 || i === 23 ) {

					uuid[ i ] = '-';

				} else if ( i === 14 ) {

					uuid[ i ] = '4';

				} else {

					if ( rnd <= 0x02 ) rnd = 0x2000000 + ( Math.random() * 0x1000000 ) | 0;
					r = rnd & 0xf;
					rnd = rnd >> 4;
					uuid[ i ] = chars[ ( i === 19 ) ? ( r & 0x3 ) | 0x8 : r ];

				}
			}

			return uuid.join( '' );

		};

	}(),

	// Clamp value to range <a, b>

	clamp: function ( x, a, b ) {

		return ( x < a ) ? a : ( ( x > b ) ? b : x );

	},

	// Clamp value to range <a, inf)

	clampBottom: function ( x, a ) {

		return x < a ? a : x;

	},

	// Linear mapping from range <a1, a2> to range <b1, b2>

	mapLinear: function ( x, a1, a2, b1, b2 ) {

		return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

	},

	// http://en.wikipedia.org/wiki/Smoothstep

	smoothstep: function ( x, min, max ) {

		if ( x <= min ) return 0;
		if ( x >= max ) return 1;

		x = ( x - min ) / ( max - min );

		return x * x * ( 3 - 2 * x );

	},

	smootherstep: function ( x, min, max ) {

		if ( x <= min ) return 0;
		if ( x >= max ) return 1;

		x = ( x - min ) / ( max - min );

		return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

	},

	// Random float from <0, 1> with 16 bits of randomness
	// (standard Math.random() creates repetitive patterns when applied over larger space)

	random16: function () {

		return ( 65280 * Math.random() + 255 * Math.random() ) / 65535;

	},

	// Random integer from <low, high> interval

	randInt: function ( low, high ) {

		return Math.floor( this.randFloat( low, high ) );

	},

	// Random float from <low, high> interval

	randFloat: function ( low, high ) {

		return low + Math.random() * ( high - low );

	},

	// Random float from <-range/2, range/2> interval

	randFloatSpread: function ( range ) {

		return range * ( 0.5 - Math.random() );

	},

	degToRad: function () {

		var degreeToRadiansFactor = Math.PI / 180;

		return function ( degrees ) {

			return degrees * degreeToRadiansFactor;

		};

	}(),

	radToDeg: function () {

		var radianToDegreesFactor = 180 / Math.PI;

		return function ( radians ) {

			return radians * radianToDegreesFactor;

		};

	}(),

	isPowerOfTwo: function ( value ) {

		return ( value & ( value - 1 ) ) === 0 && value !== 0;

	},

	nextPowerOfTwo: function ( value ) {

		value --;
		value |= value >> 1;
		value |= value >> 2;
		value |= value >> 4;
		value |= value >> 8;
		value |= value >> 16;
		value ++;

		return value;

	}

};


 /* globals define */
 (function(define){'use strict';define(function(require,exports,module){

function fovToNDCScaleOffset( fov ) {

    var pxscale = 2.0 / (fov.leftTan + fov.rightTan);
    var pxoffset = (fov.leftTan - fov.rightTan) * pxscale * 0.5;
    var pyscale = 2.0 / (fov.upTan + fov.downTan);
    var pyoffset = (fov.upTan - fov.downTan) * pyscale * 0.5;
    return { scale: [ pxscale, pyscale ], offset: [ pxoffset, pyoffset ] };

  }

  function fovPortToProjection( fov, rightHanded, zNear, zFar ) {

    rightHanded = rightHanded === undefined ? true : rightHanded;
    zNear = zNear === undefined ? 0.01 : zNear;
    zFar = zFar === undefined ? 10000.0 : zFar;

    var handednessScale = rightHanded ? -1.0 : 1.0;

    // start with an identity matrix
    var mobj = new THREE.Matrix4();
    var m = mobj.elements;

    // and with scale/offset info for normalized device coords
    var scaleAndOffset = fovToNDCScaleOffset(fov);

    // X result, map clip edges to [-w,+w]
    m[0 * 4 + 0] = scaleAndOffset.scale[0];
    m[0 * 4 + 1] = 0.0;
    m[0 * 4 + 2] = scaleAndOffset.offset[0] * handednessScale;
    m[0 * 4 + 3] = 0.0;

    // Y result, map clip edges to [-w,+w]
    // Y offset is negated because this proj matrix transforms from world coords with Y=up,
    // but the NDC scaling has Y=down (thanks D3D?)
    m[1 * 4 + 0] = 0.0;
    m[1 * 4 + 1] = scaleAndOffset.scale[1];
    m[1 * 4 + 2] = -scaleAndOffset.offset[1] * handednessScale;
    m[1 * 4 + 3] = 0.0;

    // Z result (up to the app)
    m[2 * 4 + 0] = 0.0;
    m[2 * 4 + 1] = 0.0;
    m[2 * 4 + 2] = zFar / (zNear - zFar) * -handednessScale;
    m[2 * 4 + 3] = (zFar * zNear) / (zNear - zFar);

    // W result (= Z in)
    m[3 * 4 + 0] = 0.0;
    m[3 * 4 + 1] = 0.0;
    m[3 * 4 + 2] = handednessScale;
    m[3 * 4 + 3] = 0.0;

    mobj.transpose();

    return mobj;
  }

  function fovToProjection( fov, rightHanded, zNear, zFar ) {

    var DEG2RAD = Math.PI / 180.0;

    var fovPort = {
      upTan: Math.tan( fov.upDegrees * DEG2RAD ),
      downTan: Math.tan( fov.downDegrees * DEG2RAD ),
      leftTan: Math.tan( fov.leftDegrees * DEG2RAD ),
      rightTan: Math.tan( fov.rightDegrees * DEG2RAD )
    };

    return fovPortToProjection( fovPort, rightHanded, zNear, zFar );

  }

  module.exports = {
    fovToProjection: fovToProjection
  };

  });})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){
return w[n];},m.exports,m);w[n]=m.exports;};})('VRPerspective',this));

 /* globals define */
 (function(define){'use strict';define(function(require,exports,module){

    var vrDevices = {};
    var viewport;
    var scene = document.querySelector('#scene');
    var world;
    var camera;
    var fullscreen = false;
    var projectionTransform;
    var fov;
    var x = 0;
    var y = 0;
    var z = 0;
    var rotX = 0;
    var rotY = 0;
    var rotZ = 0;
    var translation = new THREE.Matrix4();
    var rotation;
    var rotationEuler = THREE.Euler(0, 0, 0, "YXZ");
    var requestAnimationFrameID;
    var requestFullScreen;

    var start = parseInt(new Date().getTime());
    setupVRDevices(function() {
      var finish;
      // Creates viewport, camera and world elements
      setupScene();
      // Initiates the camera perspective matrix
      setupPerspective();
      // For mouse look mode when there's no HMD avaialable
      setupInputEventHandlers();
      setupFullscreenHandlers();
      finish = parseInt(new Date().getTime());
      console.log("GET VR Devices time :" + (finish - start));
      // Function that updates the camera orientation from HMD information
      requestAnimationFrameID = window.requestAnimationFrame(updateCamera);
    });

    function setupVRDevices(done) {
      if (navigator.getVRDevices && navigator.getVRDevices().then) {
        navigator.getVRDevices().then(gotVRDevices);
      } else { done(); }
      function gotVRDevices(devices) {
          var i;
          for (var i = 0; i < devices.length; ++i) {
            if (devices[i] instanceof HMDVRDevice) {
              vrDevices.headset = devices[i];
              continue;
            }
            if (devices[i] instanceof PositionSensorVRDevice) {
              vrDevices.position = devices[i];
            }
            if (vrDevices.headset && vrDevices.position) { break; }
          }
          done();
      }
    }

    function enterVR() {
      requestFullScreen.call(scene, { vrDisplay: vrDevices.headset });
    }

    function setupPerspective() {
      fov = vrDevices.headset? vrDevices.headset.getEyeParameters('left').recommendedFieldOfView : { upDegrees: 45, rightDegrees: 45, downDegrees: 45, leftDegrees: 45 };
      //var perspective = VRPerspective.fovToProjection( fov, true, 1, 10000 );
      var perspective = perspectiveMatrix(THREE.Math.degToRad(fov.upDegrees), viewport.offsetWidth / viewport.offsetHeight, 1, 10000);
      perspective = perspective.clone().scale(new THREE.Vector3(viewport.offsetWidth, viewport.offsetHeight, 1));
      projectionTransform = getCSSMatrix(perspective);
      viewport.style.transform = projectionTransform;
    }

    function setupScene() {
      var i;
      var vrEls = scene.children;
      var vrElsLength = vrEls.length;
      viewport = document.createElement('div');
      viewport.classList.add('viewport');
      camera = document.createElement('div');
      camera.classList.add('vr');
      camera.classList.add('camera');
      world = document.createElement('div');
      world.classList.add('vr');
      world.classList.add('world');

      // Setup Hierarchy
      // scene
      //   viewport
      //      camera
      //        world
      //          user-elements
      for(i = 0; i < vrElsLength; ++i) {
        world.appendChild(vrEls[0]);
      }
      scene.appendChild(viewport);
      viewport.appendChild(camera);
      camera.appendChild(world);
      requestFullScreen = scene.mozRequestFullScreen || scene.webkitRequestFullscreen;
    }

    function updateCamera() {
      var transform;
      if (fullscreen) {
        transform = 'translate3d(-50%, -50%, 0px)';
      } else {
        transform = projectionTransform;
      }
      pollHeadOrientation();
      viewport.style.transform = transform;
      window.requestAnimationFrame(updateCamera);
    }

    function pollHeadOrientation() {
      var orientation;
      var quaternion;
      var position
      var state;
      if (vrDevices.position) {
        state = vrDevices.position.getState()
        orientation = state.orientation;
        position = state.position;
        if (orientation) {
          quaternion = new THREE.Quaternion(orientation.x, -orientation.y, orientation.z, orientation.w);
          rotation = new THREE.Matrix4().makeRotationFromQuaternion(quaternion);
        }
        if (position) {
          translation = new THREE.Matrix4().makeTranslation(position.x , position.y , position.z);
        }
      }
      updateElement(camera, {
        rotation: rotation,
        translation: translation
      });
    }

    function setupFullscreenHandlers() {
      document.addEventListener("webkitfullscreenchange", onfullscreenchange);
      document.addEventListener("mozfullscreenchange",    onfullscreenchange);
      document.addEventListener("fullscreenchange",       onfullscreenchange);

      function onfullscreenchange() {
        if ( !document.mozFullScreenElement && !document.webkitFullScreenElement ) {
          viewport.classList.remove('fullscreen');
          fullscreen = false;
          return;
        }
        fullscreen = true;
        viewport.classList.add('fullscreen');
      }
    }

    function perspectiveMatrix(fov, aspect, nearz, farz) {
      var matrix = new THREE.Matrix4();
      var range = Math.tan(fov * 0.5) * nearz;

      matrix.elements[0] = (2 * nearz) / ((range * aspect) - (-range * aspect));
      matrix.elements[1] = 0;
      matrix.elements[2] = 0;
      matrix.elements[3] = 0;
      matrix.elements[4] = 0;
      matrix.elements[5] = (2 * nearz) / (2 * range);
      matrix.elements[6] = 0;
      matrix.elements[7] = 0;
      matrix.elements[8] = 0;
      matrix.elements[9] = 0;
      matrix.elements[10] = -(farz + nearz) / (farz - nearz);
      matrix.elements[11] = -1;
      matrix.elements[12] = 0;
      matrix.elements[13] = 0;
      matrix.elements[14] = -(2 * farz * nearz) / (farz - nearz);
      matrix.elements[15] = 0;
      return matrix.transpose();
    };

    function getCSSMatrix(matrix) {
      var elements = matrix.elements;

      return 'matrix3d(' +
        epsilon( elements[ 0 ] ) + ',' +
        epsilon( elements[ 1 ] ) + ',' +
        epsilon( elements[ 2 ] ) + ',' +
        epsilon( elements[ 3 ] ) + ',' +
        epsilon( elements[ 4 ] ) + ',' +
        epsilon( elements[ 5 ] ) + ',' +
        epsilon( elements[ 6 ] ) + ',' +
        epsilon( elements[ 7 ] ) + ',' +
        epsilon( elements[ 8 ] ) + ',' +
        epsilon( elements[ 9 ] ) + ',' +
        epsilon( elements[ 10 ] ) + ',' +
        epsilon( elements[ 11 ] ) + ',' +
        epsilon( elements[ 12 ] ) + ',' +
        epsilon( elements[ 13 ] ) + ',' +
        epsilon( elements[ 14 ] ) + ',' +
        epsilon( elements[ 15 ] ) +
      ')';
    };

    function epsilon( value ) {
      return Math.abs( value ) < 0.000001 ? 0 : value;
    };

    var rotationEnabled;
    var lastMouseX;
    var lastMouseY;
    var PI_2 = Math.PI / 2;
    var cameraRotation;
    var cameraTranslation;

    function setupInputEventHandlers() {
      scene.addEventListener('mousedown', function(event) {
        rotationEnabled = true;
        scene.classList.add('selection-disabled');
        scene.classList.add('grabbing');
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
      }, true);

      scene.addEventListener('mouseup', function(event) {
        rotationEnabled = false;
        scene.classList.remove('selection-disabled');
        scene.classList.remove('grabbing');
      }, true);

      scene.addEventListener('mousemove', function(event) {
        if (!rotationEnabled) {
          return;
        }
        var deltaX = (event.clientX - lastMouseX) * 0.2;
        var deltaY = (event.clientY - lastMouseY) * 0.2;
        rotX += deltaX;
        rotY -= deltaY;
        // Clamp to [-PI / 2, PI / 2]
        rotY = Math.max( -90, Math.min( 90, rotY ) );

        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
        translation = new THREE.Matrix4().makeTranslation(x , y , z);
        rotationEuler = new THREE.Euler(
          THREE.Math.degToRad(rotY),
          THREE.Math.degToRad(rotX),
          THREE.Math.degToRad(rotZ),
          "XYZ" );
        rotation = new THREE.Matrix4().makeRotationFromEuler(rotationEuler);

      }, true);

      document.documentElement.addEventListener('keydown', function (e) {
          if ( ( e.keycode || e.which ) == 32) {
              e.preventDefault();
          }
      }, false);

    }

    var updateElement = function(object, data) {
      var translation = data.translation.clone() || new THREE.Matrix4();
      var rotation = data.rotation || new THREE.Matrix4();
      object.style.transform = "translate3d(-50%, -50%, 0px) " + getCSSMatrix(translation.multiply(rotation));
    };

    module.exports = {
      zeroSensor: function () {
        rotX = 0;
        rotY = 0;
        rotation = new THREE.Matrix4();
        translation = new THREE.Matrix4();
        if (vrDevices.position) { vrDevices.position.resetSensor(); }
      },
      enterVR: enterVR
    };

});})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){
return w[n];},m.exports,m);w[n]=m.exports;};})('VRCSS',this));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRocmVlLmpzIiwicGVyc3BlY3RpdmUuanMiLCJjc3N2ci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzd3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY3NzdnIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGaWxlOnNyYy9UaHJlZS5qc1xuXG4vKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKi9cblxudmFyIFRIUkVFID0geyBSRVZJU0lPTjogJzcyZGV2JyB9O1xuXG4vLyBicm93c2VyaWZ5IHN1cHBvcnRcblxuaWYgKCB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyApIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IFRIUkVFO1xuXG59XG5cbi8vIHBvbHlmaWxsc1xuXG5pZiAoIE1hdGguc2lnbiA9PT0gdW5kZWZpbmVkICkge1xuXG5cdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hdGgvc2lnblxuXG5cdE1hdGguc2lnbiA9IGZ1bmN0aW9uICggeCApIHtcblxuXHRcdHJldHVybiAoIHggPCAwICkgPyAtIDEgOiAoIHggPiAwICkgPyAxIDogK3g7XG5cblx0fTtcblxufVxuXG4vLyBGaWxlOnNyYy9tYXRoL1F1YXRlcm5pb24uanNcblxuLyoqXG4gKiBAYXV0aG9yIG1pa2FlbCBlbXRpbmdlciAvIGh0dHA6Ly9nb21vLnNlL1xuICogQGF1dGhvciBhbHRlcmVkcSAvIGh0dHA6Ly9hbHRlcmVkcXVhbGlhLmNvbS9cbiAqIEBhdXRob3IgV2VzdExhbmdsZXkgLyBodHRwOi8vZ2l0aHViLmNvbS9XZXN0TGFuZ2xleVxuICogQGF1dGhvciBiaG91c3RvbiAvIGh0dHA6Ly9leG9jb3J0ZXguY29tXG4gKi9cblxuVEhSRUUuUXVhdGVybmlvbiA9IGZ1bmN0aW9uICggeCwgeSwgeiwgdyApIHtcblxuXHR0aGlzLl94ID0geCB8fCAwO1xuXHR0aGlzLl95ID0geSB8fCAwO1xuXHR0aGlzLl96ID0geiB8fCAwO1xuXHR0aGlzLl93ID0gKCB3ICE9PSB1bmRlZmluZWQgKSA/IHcgOiAxO1xuXG59O1xuXG5USFJFRS5RdWF0ZXJuaW9uLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogVEhSRUUuUXVhdGVybmlvbixcblxuXHRfeDogMCxfeTogMCwgX3o6IDAsIF93OiAwLFxuXG5cdGdldCB4ICgpIHtcblxuXHRcdHJldHVybiB0aGlzLl94O1xuXG5cdH0sXG5cblx0c2V0IHggKCB2YWx1ZSApIHtcblxuXHRcdHRoaXMuX3ggPSB2YWx1ZTtcblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHR9LFxuXG5cdGdldCB5ICgpIHtcblxuXHRcdHJldHVybiB0aGlzLl95O1xuXG5cdH0sXG5cblx0c2V0IHkgKCB2YWx1ZSApIHtcblxuXHRcdHRoaXMuX3kgPSB2YWx1ZTtcblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHR9LFxuXG5cdGdldCB6ICgpIHtcblxuXHRcdHJldHVybiB0aGlzLl96O1xuXG5cdH0sXG5cblx0c2V0IHogKCB2YWx1ZSApIHtcblxuXHRcdHRoaXMuX3ogPSB2YWx1ZTtcblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHR9LFxuXG5cdGdldCB3ICgpIHtcblxuXHRcdHJldHVybiB0aGlzLl93O1xuXG5cdH0sXG5cblx0c2V0IHcgKCB2YWx1ZSApIHtcblxuXHRcdHRoaXMuX3cgPSB2YWx1ZTtcblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHR9LFxuXG5cdHNldDogZnVuY3Rpb24gKCB4LCB5LCB6LCB3ICkge1xuXG5cdFx0dGhpcy5feCA9IHg7XG5cdFx0dGhpcy5feSA9IHk7XG5cdFx0dGhpcy5feiA9IHo7XG5cdFx0dGhpcy5fdyA9IHc7XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y29weTogZnVuY3Rpb24gKCBxdWF0ZXJuaW9uICkge1xuXG5cdFx0dGhpcy5feCA9IHF1YXRlcm5pb24ueDtcblx0XHR0aGlzLl95ID0gcXVhdGVybmlvbi55O1xuXHRcdHRoaXMuX3ogPSBxdWF0ZXJuaW9uLno7XG5cdFx0dGhpcy5fdyA9IHF1YXRlcm5pb24udztcblxuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRGcm9tRXVsZXI6IGZ1bmN0aW9uICggZXVsZXIsIHVwZGF0ZSApIHtcblxuXHRcdGlmICggZXVsZXIgaW5zdGFuY2VvZiBUSFJFRS5FdWxlciA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdHRocm93IG5ldyBFcnJvciggJ1RIUkVFLlF1YXRlcm5pb246IC5zZXRGcm9tRXVsZXIoKSBub3cgZXhwZWN0cyBhIEV1bGVyIHJvdGF0aW9uIHJhdGhlciB0aGFuIGEgVmVjdG9yMyBhbmQgb3JkZXIuJyApO1xuXHRcdH1cblxuXHRcdC8vIGh0dHA6Ly93d3cubWF0aHdvcmtzLmNvbS9tYXRsYWJjZW50cmFsL2ZpbGVleGNoYW5nZS9cblx0XHQvLyBcdDIwNjk2LWZ1bmN0aW9uLXRvLWNvbnZlcnQtYmV0d2Vlbi1kY20tZXVsZXItYW5nbGVzLXF1YXRlcm5pb25zLWFuZC1ldWxlci12ZWN0b3JzL1xuXHRcdC8vXHRjb250ZW50L1NwaW5DYWxjLm1cblxuXHRcdHZhciBjMSA9IE1hdGguY29zKCBldWxlci5feCAvIDIgKTtcblx0XHR2YXIgYzIgPSBNYXRoLmNvcyggZXVsZXIuX3kgLyAyICk7XG5cdFx0dmFyIGMzID0gTWF0aC5jb3MoIGV1bGVyLl96IC8gMiApO1xuXHRcdHZhciBzMSA9IE1hdGguc2luKCBldWxlci5feCAvIDIgKTtcblx0XHR2YXIgczIgPSBNYXRoLnNpbiggZXVsZXIuX3kgLyAyICk7XG5cdFx0dmFyIHMzID0gTWF0aC5zaW4oIGV1bGVyLl96IC8gMiApO1xuXG5cdFx0aWYgKCBldWxlci5vcmRlciA9PT0gJ1hZWicgKSB7XG5cblx0XHRcdHRoaXMuX3ggPSBzMSAqIGMyICogYzMgKyBjMSAqIHMyICogczM7XG5cdFx0XHR0aGlzLl95ID0gYzEgKiBzMiAqIGMzIC0gczEgKiBjMiAqIHMzO1xuXHRcdFx0dGhpcy5feiA9IGMxICogYzIgKiBzMyArIHMxICogczIgKiBjMztcblx0XHRcdHRoaXMuX3cgPSBjMSAqIGMyICogYzMgLSBzMSAqIHMyICogczM7XG5cblx0XHR9IGVsc2UgaWYgKCBldWxlci5vcmRlciA9PT0gJ1lYWicgKSB7XG5cblx0XHRcdHRoaXMuX3ggPSBzMSAqIGMyICogYzMgKyBjMSAqIHMyICogczM7XG5cdFx0XHR0aGlzLl95ID0gYzEgKiBzMiAqIGMzIC0gczEgKiBjMiAqIHMzO1xuXHRcdFx0dGhpcy5feiA9IGMxICogYzIgKiBzMyAtIHMxICogczIgKiBjMztcblx0XHRcdHRoaXMuX3cgPSBjMSAqIGMyICogYzMgKyBzMSAqIHMyICogczM7XG5cblx0XHR9IGVsc2UgaWYgKCBldWxlci5vcmRlciA9PT0gJ1pYWScgKSB7XG5cblx0XHRcdHRoaXMuX3ggPSBzMSAqIGMyICogYzMgLSBjMSAqIHMyICogczM7XG5cdFx0XHR0aGlzLl95ID0gYzEgKiBzMiAqIGMzICsgczEgKiBjMiAqIHMzO1xuXHRcdFx0dGhpcy5feiA9IGMxICogYzIgKiBzMyArIHMxICogczIgKiBjMztcblx0XHRcdHRoaXMuX3cgPSBjMSAqIGMyICogYzMgLSBzMSAqIHMyICogczM7XG5cblx0XHR9IGVsc2UgaWYgKCBldWxlci5vcmRlciA9PT0gJ1pZWCcgKSB7XG5cblx0XHRcdHRoaXMuX3ggPSBzMSAqIGMyICogYzMgLSBjMSAqIHMyICogczM7XG5cdFx0XHR0aGlzLl95ID0gYzEgKiBzMiAqIGMzICsgczEgKiBjMiAqIHMzO1xuXHRcdFx0dGhpcy5feiA9IGMxICogYzIgKiBzMyAtIHMxICogczIgKiBjMztcblx0XHRcdHRoaXMuX3cgPSBjMSAqIGMyICogYzMgKyBzMSAqIHMyICogczM7XG5cblx0XHR9IGVsc2UgaWYgKCBldWxlci5vcmRlciA9PT0gJ1laWCcgKSB7XG5cblx0XHRcdHRoaXMuX3ggPSBzMSAqIGMyICogYzMgKyBjMSAqIHMyICogczM7XG5cdFx0XHR0aGlzLl95ID0gYzEgKiBzMiAqIGMzICsgczEgKiBjMiAqIHMzO1xuXHRcdFx0dGhpcy5feiA9IGMxICogYzIgKiBzMyAtIHMxICogczIgKiBjMztcblx0XHRcdHRoaXMuX3cgPSBjMSAqIGMyICogYzMgLSBzMSAqIHMyICogczM7XG5cblx0XHR9IGVsc2UgaWYgKCBldWxlci5vcmRlciA9PT0gJ1haWScgKSB7XG5cblx0XHRcdHRoaXMuX3ggPSBzMSAqIGMyICogYzMgLSBjMSAqIHMyICogczM7XG5cdFx0XHR0aGlzLl95ID0gYzEgKiBzMiAqIGMzIC0gczEgKiBjMiAqIHMzO1xuXHRcdFx0dGhpcy5feiA9IGMxICogYzIgKiBzMyArIHMxICogczIgKiBjMztcblx0XHRcdHRoaXMuX3cgPSBjMSAqIGMyICogYzMgKyBzMSAqIHMyICogczM7XG5cblx0XHR9XG5cblx0XHRpZiAoIHVwZGF0ZSAhPT0gZmFsc2UgKSB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbUF4aXNBbmdsZTogZnVuY3Rpb24gKCBheGlzLCBhbmdsZSApIHtcblxuXHRcdC8vIGh0dHA6Ly93d3cuZXVjbGlkZWFuc3BhY2UuY29tL21hdGhzL2dlb21ldHJ5L3JvdGF0aW9ucy9jb252ZXJzaW9ucy9hbmdsZVRvUXVhdGVybmlvbi9pbmRleC5odG1cblxuXHRcdC8vIGFzc3VtZXMgYXhpcyBpcyBub3JtYWxpemVkXG5cblx0XHR2YXIgaGFsZkFuZ2xlID0gYW5nbGUgLyAyLCBzID0gTWF0aC5zaW4oIGhhbGZBbmdsZSApO1xuXG5cdFx0dGhpcy5feCA9IGF4aXMueCAqIHM7XG5cdFx0dGhpcy5feSA9IGF4aXMueSAqIHM7XG5cdFx0dGhpcy5feiA9IGF4aXMueiAqIHM7XG5cdFx0dGhpcy5fdyA9IE1hdGguY29zKCBoYWxmQW5nbGUgKTtcblxuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRGcm9tUm90YXRpb25NYXRyaXg6IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdC8vIGh0dHA6Ly93d3cuZXVjbGlkZWFuc3BhY2UuY29tL21hdGhzL2dlb21ldHJ5L3JvdGF0aW9ucy9jb252ZXJzaW9ucy9tYXRyaXhUb1F1YXRlcm5pb24vaW5kZXguaHRtXG5cblx0XHQvLyBhc3N1bWVzIHRoZSB1cHBlciAzeDMgb2YgbSBpcyBhIHB1cmUgcm90YXRpb24gbWF0cml4IChpLmUsIHVuc2NhbGVkKVxuXG5cdFx0dmFyIHRlID0gbS5lbGVtZW50cyxcblxuXHRcdFx0bTExID0gdGVbIDAgXSwgbTEyID0gdGVbIDQgXSwgbTEzID0gdGVbIDggXSxcblx0XHRcdG0yMSA9IHRlWyAxIF0sIG0yMiA9IHRlWyA1IF0sIG0yMyA9IHRlWyA5IF0sXG5cdFx0XHRtMzEgPSB0ZVsgMiBdLCBtMzIgPSB0ZVsgNiBdLCBtMzMgPSB0ZVsgMTAgXSxcblxuXHRcdFx0dHJhY2UgPSBtMTEgKyBtMjIgKyBtMzMsXG5cdFx0XHRzO1xuXG5cdFx0aWYgKCB0cmFjZSA+IDAgKSB7XG5cblx0XHRcdHMgPSAwLjUgLyBNYXRoLnNxcnQoIHRyYWNlICsgMS4wICk7XG5cblx0XHRcdHRoaXMuX3cgPSAwLjI1IC8gcztcblx0XHRcdHRoaXMuX3ggPSAoIG0zMiAtIG0yMyApICogcztcblx0XHRcdHRoaXMuX3kgPSAoIG0xMyAtIG0zMSApICogcztcblx0XHRcdHRoaXMuX3ogPSAoIG0yMSAtIG0xMiApICogcztcblxuXHRcdH0gZWxzZSBpZiAoIG0xMSA+IG0yMiAmJiBtMTEgPiBtMzMgKSB7XG5cblx0XHRcdHMgPSAyLjAgKiBNYXRoLnNxcnQoIDEuMCArIG0xMSAtIG0yMiAtIG0zMyApO1xuXG5cdFx0XHR0aGlzLl93ID0gKCBtMzIgLSBtMjMgKSAvIHM7XG5cdFx0XHR0aGlzLl94ID0gMC4yNSAqIHM7XG5cdFx0XHR0aGlzLl95ID0gKCBtMTIgKyBtMjEgKSAvIHM7XG5cdFx0XHR0aGlzLl96ID0gKCBtMTMgKyBtMzEgKSAvIHM7XG5cblx0XHR9IGVsc2UgaWYgKCBtMjIgPiBtMzMgKSB7XG5cblx0XHRcdHMgPSAyLjAgKiBNYXRoLnNxcnQoIDEuMCArIG0yMiAtIG0xMSAtIG0zMyApO1xuXG5cdFx0XHR0aGlzLl93ID0gKCBtMTMgLSBtMzEgKSAvIHM7XG5cdFx0XHR0aGlzLl94ID0gKCBtMTIgKyBtMjEgKSAvIHM7XG5cdFx0XHR0aGlzLl95ID0gMC4yNSAqIHM7XG5cdFx0XHR0aGlzLl96ID0gKCBtMjMgKyBtMzIgKSAvIHM7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRzID0gMi4wICogTWF0aC5zcXJ0KCAxLjAgKyBtMzMgLSBtMTEgLSBtMjIgKTtcblxuXHRcdFx0dGhpcy5fdyA9ICggbTIxIC0gbTEyICkgLyBzO1xuXHRcdFx0dGhpcy5feCA9ICggbTEzICsgbTMxICkgLyBzO1xuXHRcdFx0dGhpcy5feSA9ICggbTIzICsgbTMyICkgLyBzO1xuXHRcdFx0dGhpcy5feiA9IDAuMjUgKiBzO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldEZyb21Vbml0VmVjdG9yczogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gaHR0cDovL2xvbGVuZ2luZS5uZXQvYmxvZy8yMDE0LzAyLzI0L3F1YXRlcm5pb24tZnJvbS10d28tdmVjdG9ycy1maW5hbFxuXG5cdFx0Ly8gYXNzdW1lcyBkaXJlY3Rpb24gdmVjdG9ycyB2RnJvbSBhbmQgdlRvIGFyZSBub3JtYWxpemVkXG5cblx0XHR2YXIgdjEsIHI7XG5cblx0XHR2YXIgRVBTID0gMC4wMDAwMDE7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCB2RnJvbSwgdlRvICkge1xuXG5cdFx0XHRpZiAoIHYxID09PSB1bmRlZmluZWQgKSB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRcdHIgPSB2RnJvbS5kb3QoIHZUbyApICsgMTtcblxuXHRcdFx0aWYgKCByIDwgRVBTICkge1xuXG5cdFx0XHRcdHIgPSAwO1xuXG5cdFx0XHRcdGlmICggTWF0aC5hYnMoIHZGcm9tLnggKSA+IE1hdGguYWJzKCB2RnJvbS56ICkgKSB7XG5cblx0XHRcdFx0XHR2MS5zZXQoIC0gdkZyb20ueSwgdkZyb20ueCwgMCApO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHR2MS5zZXQoIDAsIC0gdkZyb20ueiwgdkZyb20ueSApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR2MS5jcm9zc1ZlY3RvcnMoIHZGcm9tLCB2VG8gKTtcblxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl94ID0gdjEueDtcblx0XHRcdHRoaXMuX3kgPSB2MS55O1xuXHRcdFx0dGhpcy5feiA9IHYxLno7XG5cdFx0XHR0aGlzLl93ID0gcjtcblxuXHRcdFx0dGhpcy5ub3JtYWxpemUoKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9XG5cblx0fSgpLFxuXG5cdGludmVyc2U6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuY29uanVnYXRlKCkubm9ybWFsaXplKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNvbmp1Z2F0ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5feCAqPSAtIDE7XG5cdFx0dGhpcy5feSAqPSAtIDE7XG5cdFx0dGhpcy5feiAqPSAtIDE7XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZG90OiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5feCAqIHYuX3ggKyB0aGlzLl95ICogdi5feSArIHRoaXMuX3ogKiB2Ll96ICsgdGhpcy5fdyAqIHYuX3c7XG5cblx0fSxcblxuXHRsZW5ndGhTcTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX3ggKiB0aGlzLl94ICsgdGhpcy5feSAqIHRoaXMuX3kgKyB0aGlzLl96ICogdGhpcy5feiArIHRoaXMuX3cgKiB0aGlzLl93O1xuXG5cdH0sXG5cblx0bGVuZ3RoOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gTWF0aC5zcXJ0KCB0aGlzLl94ICogdGhpcy5feCArIHRoaXMuX3kgKiB0aGlzLl95ICsgdGhpcy5feiAqIHRoaXMuX3ogKyB0aGlzLl93ICogdGhpcy5fdyApO1xuXG5cdH0sXG5cblx0bm9ybWFsaXplOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgbCA9IHRoaXMubGVuZ3RoKCk7XG5cblx0XHRpZiAoIGwgPT09IDAgKSB7XG5cblx0XHRcdHRoaXMuX3ggPSAwO1xuXHRcdFx0dGhpcy5feSA9IDA7XG5cdFx0XHR0aGlzLl96ID0gMDtcblx0XHRcdHRoaXMuX3cgPSAxO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0bCA9IDEgLyBsO1xuXG5cdFx0XHR0aGlzLl94ID0gdGhpcy5feCAqIGw7XG5cdFx0XHR0aGlzLl95ID0gdGhpcy5feSAqIGw7XG5cdFx0XHR0aGlzLl96ID0gdGhpcy5feiAqIGw7XG5cdFx0XHR0aGlzLl93ID0gdGhpcy5fdyAqIGw7XG5cblx0XHR9XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHk6IGZ1bmN0aW9uICggcSwgcCApIHtcblxuXHRcdGlmICggcCAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5RdWF0ZXJuaW9uOiAubXVsdGlwbHkoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5tdWx0aXBseVF1YXRlcm5pb25zKCBhLCBiICkgaW5zdGVhZC4nICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5tdWx0aXBseVF1YXRlcm5pb25zKCBxLCBwICk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5tdWx0aXBseVF1YXRlcm5pb25zKCB0aGlzLCBxICk7XG5cblx0fSxcblxuXHRtdWx0aXBseVF1YXRlcm5pb25zOiBmdW5jdGlvbiAoIGEsIGIgKSB7XG5cblx0XHQvLyBmcm9tIGh0dHA6Ly93d3cuZXVjbGlkZWFuc3BhY2UuY29tL21hdGhzL2FsZ2VicmEvcmVhbE5vcm1lZEFsZ2VicmEvcXVhdGVybmlvbnMvY29kZS9pbmRleC5odG1cblxuXHRcdHZhciBxYXggPSBhLl94LCBxYXkgPSBhLl95LCBxYXogPSBhLl96LCBxYXcgPSBhLl93O1xuXHRcdHZhciBxYnggPSBiLl94LCBxYnkgPSBiLl95LCBxYnogPSBiLl96LCBxYncgPSBiLl93O1xuXG5cdFx0dGhpcy5feCA9IHFheCAqIHFidyArIHFhdyAqIHFieCArIHFheSAqIHFieiAtIHFheiAqIHFieTtcblx0XHR0aGlzLl95ID0gcWF5ICogcWJ3ICsgcWF3ICogcWJ5ICsgcWF6ICogcWJ4IC0gcWF4ICogcWJ6O1xuXHRcdHRoaXMuX3ogPSBxYXogKiBxYncgKyBxYXcgKiBxYnogKyBxYXggKiBxYnkgLSBxYXkgKiBxYng7XG5cdFx0dGhpcy5fdyA9IHFhdyAqIHFidyAtIHFheCAqIHFieCAtIHFheSAqIHFieSAtIHFheiAqIHFiejtcblxuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtdWx0aXBseVZlY3RvcjM6IGZ1bmN0aW9uICggdmVjdG9yICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuUXVhdGVybmlvbjogLm11bHRpcGx5VmVjdG9yMygpIGhhcyBiZWVuIHJlbW92ZWQuIFVzZSBpcyBub3cgdmVjdG9yLmFwcGx5UXVhdGVybmlvbiggcXVhdGVybmlvbiApIGluc3RlYWQuJyApO1xuXHRcdHJldHVybiB2ZWN0b3IuYXBwbHlRdWF0ZXJuaW9uKCB0aGlzICk7XG5cblx0fSxcblxuXHRzbGVycDogZnVuY3Rpb24gKCBxYiwgdCApIHtcblxuXHRcdGlmICggdCA9PT0gMCApIHJldHVybiB0aGlzO1xuXHRcdGlmICggdCA9PT0gMSApIHJldHVybiB0aGlzLmNvcHkoIHFiICk7XG5cblx0XHR2YXIgeCA9IHRoaXMuX3gsIHkgPSB0aGlzLl95LCB6ID0gdGhpcy5feiwgdyA9IHRoaXMuX3c7XG5cblx0XHQvLyBodHRwOi8vd3d3LmV1Y2xpZGVhbnNwYWNlLmNvbS9tYXRocy9hbGdlYnJhL3JlYWxOb3JtZWRBbGdlYnJhL3F1YXRlcm5pb25zL3NsZXJwL1xuXG5cdFx0dmFyIGNvc0hhbGZUaGV0YSA9IHcgKiBxYi5fdyArIHggKiBxYi5feCArIHkgKiBxYi5feSArIHogKiBxYi5fejtcblxuXHRcdGlmICggY29zSGFsZlRoZXRhIDwgMCApIHtcblxuXHRcdFx0dGhpcy5fdyA9IC0gcWIuX3c7XG5cdFx0XHR0aGlzLl94ID0gLSBxYi5feDtcblx0XHRcdHRoaXMuX3kgPSAtIHFiLl95O1xuXHRcdFx0dGhpcy5feiA9IC0gcWIuX3o7XG5cblx0XHRcdGNvc0hhbGZUaGV0YSA9IC0gY29zSGFsZlRoZXRhO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy5jb3B5KCBxYiApO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCBjb3NIYWxmVGhldGEgPj0gMS4wICkge1xuXG5cdFx0XHR0aGlzLl93ID0gdztcblx0XHRcdHRoaXMuX3ggPSB4O1xuXHRcdFx0dGhpcy5feSA9IHk7XG5cdFx0XHR0aGlzLl96ID0gejtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9XG5cblx0XHR2YXIgaGFsZlRoZXRhID0gTWF0aC5hY29zKCBjb3NIYWxmVGhldGEgKTtcblx0XHR2YXIgc2luSGFsZlRoZXRhID0gTWF0aC5zcXJ0KCAxLjAgLSBjb3NIYWxmVGhldGEgKiBjb3NIYWxmVGhldGEgKTtcblxuXHRcdGlmICggTWF0aC5hYnMoIHNpbkhhbGZUaGV0YSApIDwgMC4wMDEgKSB7XG5cblx0XHRcdHRoaXMuX3cgPSAwLjUgKiAoIHcgKyB0aGlzLl93ICk7XG5cdFx0XHR0aGlzLl94ID0gMC41ICogKCB4ICsgdGhpcy5feCApO1xuXHRcdFx0dGhpcy5feSA9IDAuNSAqICggeSArIHRoaXMuX3kgKTtcblx0XHRcdHRoaXMuX3ogPSAwLjUgKiAoIHogKyB0aGlzLl96ICk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fVxuXG5cdFx0dmFyIHJhdGlvQSA9IE1hdGguc2luKCAoIDEgLSB0ICkgKiBoYWxmVGhldGEgKSAvIHNpbkhhbGZUaGV0YSxcblx0XHRyYXRpb0IgPSBNYXRoLnNpbiggdCAqIGhhbGZUaGV0YSApIC8gc2luSGFsZlRoZXRhO1xuXG5cdFx0dGhpcy5fdyA9ICggdyAqIHJhdGlvQSArIHRoaXMuX3cgKiByYXRpb0IgKTtcblx0XHR0aGlzLl94ID0gKCB4ICogcmF0aW9BICsgdGhpcy5feCAqIHJhdGlvQiApO1xuXHRcdHRoaXMuX3kgPSAoIHkgKiByYXRpb0EgKyB0aGlzLl95ICogcmF0aW9CICk7XG5cdFx0dGhpcy5feiA9ICggeiAqIHJhdGlvQSArIHRoaXMuX3ogKiByYXRpb0IgKTtcblxuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlcXVhbHM6IGZ1bmN0aW9uICggcXVhdGVybmlvbiApIHtcblxuXHRcdHJldHVybiAoIHF1YXRlcm5pb24uX3ggPT09IHRoaXMuX3ggKSAmJiAoIHF1YXRlcm5pb24uX3kgPT09IHRoaXMuX3kgKSAmJiAoIHF1YXRlcm5pb24uX3ogPT09IHRoaXMuX3ogKSAmJiAoIHF1YXRlcm5pb24uX3cgPT09IHRoaXMuX3cgKTtcblxuXHR9LFxuXG5cdGZyb21BcnJheTogZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0ICkge1xuXG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHR0aGlzLl94ID0gYXJyYXlbIG9mZnNldCBdO1xuXHRcdHRoaXMuX3kgPSBhcnJheVsgb2Zmc2V0ICsgMSBdO1xuXHRcdHRoaXMuX3ogPSBhcnJheVsgb2Zmc2V0ICsgMiBdO1xuXHRcdHRoaXMuX3cgPSBhcnJheVsgb2Zmc2V0ICsgMyBdO1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdGlmICggYXJyYXkgPT09IHVuZGVmaW5lZCApIGFycmF5ID0gW107XG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHRhcnJheVsgb2Zmc2V0IF0gPSB0aGlzLl94O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxIF0gPSB0aGlzLl95O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAyIF0gPSB0aGlzLl96O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAzIF0gPSB0aGlzLl93O1xuXG5cdFx0cmV0dXJuIGFycmF5O1xuXG5cdH0sXG5cblx0b25DaGFuZ2U6IGZ1bmN0aW9uICggY2FsbGJhY2sgKSB7XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBjYWxsYmFjaztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25DaGFuZ2VDYWxsYmFjazogZnVuY3Rpb24gKCkge30sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBuZXcgVEhSRUUuUXVhdGVybmlvbiggdGhpcy5feCwgdGhpcy5feSwgdGhpcy5feiwgdGhpcy5fdyApO1xuXG5cdH1cblxufTtcblxuVEhSRUUuUXVhdGVybmlvbi5zbGVycCA9IGZ1bmN0aW9uICggcWEsIHFiLCBxbSwgdCApIHtcblxuXHRyZXR1cm4gcW0uY29weSggcWEgKS5zbGVycCggcWIsIHQgKTtcblxufTtcblxuLy8gRmlsZTpzcmMvbWF0aC9WZWN0b3IyLmpzXG5cbi8qKlxuICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbS9cbiAqIEBhdXRob3IgcGhpbG9nYiAvIGh0dHA6Ly9ibG9nLnRoZWppdC5vcmcvXG4gKiBAYXV0aG9yIGVncmFldGhlciAvIGh0dHA6Ly9lZ3JhZXRoZXIuY29tL1xuICogQGF1dGhvciB6ejg1IC8gaHR0cDovL3d3dy5sYWI0Z2FtZXMubmV0L3p6ODUvYmxvZ1xuICovXG5cblRIUkVFLlZlY3RvcjIgPSBmdW5jdGlvbiAoIHgsIHkgKSB7XG5cblx0dGhpcy54ID0geCB8fCAwO1xuXHR0aGlzLnkgPSB5IHx8IDA7XG5cbn07XG5cblRIUkVFLlZlY3RvcjIucHJvdG90eXBlID0ge1xuXG5cdGNvbnN0cnVjdG9yOiBUSFJFRS5WZWN0b3IyLFxuXG5cdHNldDogZnVuY3Rpb24gKCB4LCB5ICkge1xuXG5cdFx0dGhpcy54ID0geDtcblx0XHR0aGlzLnkgPSB5O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRYOiBmdW5jdGlvbiAoIHggKSB7XG5cblx0XHR0aGlzLnggPSB4O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRZOiBmdW5jdGlvbiAoIHkgKSB7XG5cblx0XHR0aGlzLnkgPSB5O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRDb21wb25lbnQ6IGZ1bmN0aW9uICggaW5kZXgsIHZhbHVlICkge1xuXG5cdFx0c3dpdGNoICggaW5kZXggKSB7XG5cblx0XHRcdGNhc2UgMDogdGhpcy54ID0gdmFsdWU7IGJyZWFrO1xuXHRcdFx0Y2FzZSAxOiB0aGlzLnkgPSB2YWx1ZTsgYnJlYWs7XG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoICdpbmRleCBpcyBvdXQgb2YgcmFuZ2U6ICcgKyBpbmRleCApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Z2V0Q29tcG9uZW50OiBmdW5jdGlvbiAoIGluZGV4ICkge1xuXG5cdFx0c3dpdGNoICggaW5kZXggKSB7XG5cblx0XHRcdGNhc2UgMDogcmV0dXJuIHRoaXMueDtcblx0XHRcdGNhc2UgMTogcmV0dXJuIHRoaXMueTtcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvciggJ2luZGV4IGlzIG91dCBvZiByYW5nZTogJyArIGluZGV4ICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRjb3B5OiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHR0aGlzLnggPSB2Lng7XG5cdFx0dGhpcy55ID0gdi55O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhZGQ6IGZ1bmN0aW9uICggdiwgdyApIHtcblxuXHRcdGlmICggdyAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WZWN0b3IyOiAuYWRkKCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAuYWRkVmVjdG9ycyggYSwgYiApIGluc3RlYWQuJyApO1xuXHRcdFx0cmV0dXJuIHRoaXMuYWRkVmVjdG9ycyggdiwgdyApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy54ICs9IHYueDtcblx0XHR0aGlzLnkgKz0gdi55O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhZGRTY2FsYXI6IGZ1bmN0aW9uICggcyApIHtcblxuXHRcdHRoaXMueCArPSBzO1xuXHRcdHRoaXMueSArPSBzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhZGRWZWN0b3JzOiBmdW5jdGlvbiAoIGEsIGIgKSB7XG5cblx0XHR0aGlzLnggPSBhLnggKyBiLng7XG5cdFx0dGhpcy55ID0gYS55ICsgYi55O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdWI6IGZ1bmN0aW9uICggdiwgdyApIHtcblxuXHRcdGlmICggdyAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WZWN0b3IyOiAuc3ViKCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAuc3ViVmVjdG9ycyggYSwgYiApIGluc3RlYWQuJyApO1xuXHRcdFx0cmV0dXJuIHRoaXMuc3ViVmVjdG9ycyggdiwgdyApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy54IC09IHYueDtcblx0XHR0aGlzLnkgLT0gdi55O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdWJTY2FsYXI6IGZ1bmN0aW9uICggcyApIHtcblxuXHRcdHRoaXMueCAtPSBzO1xuXHRcdHRoaXMueSAtPSBzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdWJWZWN0b3JzOiBmdW5jdGlvbiAoIGEsIGIgKSB7XG5cblx0XHR0aGlzLnggPSBhLnggLSBiLng7XG5cdFx0dGhpcy55ID0gYS55IC0gYi55O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtdWx0aXBseTogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0dGhpcy54ICo9IHYueDtcblx0XHR0aGlzLnkgKj0gdi55O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtdWx0aXBseVNjYWxhcjogZnVuY3Rpb24gKCBzICkge1xuXG5cdFx0dGhpcy54ICo9IHM7XG5cdFx0dGhpcy55ICo9IHM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGRpdmlkZTogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0dGhpcy54IC89IHYueDtcblx0XHR0aGlzLnkgLz0gdi55O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRkaXZpZGVTY2FsYXI6IGZ1bmN0aW9uICggc2NhbGFyICkge1xuXG5cdFx0aWYgKCBzY2FsYXIgIT09IDAgKSB7XG5cblx0XHRcdHZhciBpbnZTY2FsYXIgPSAxIC8gc2NhbGFyO1xuXG5cdFx0XHR0aGlzLnggKj0gaW52U2NhbGFyO1xuXHRcdFx0dGhpcy55ICo9IGludlNjYWxhcjtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMueCA9IDA7XG5cdFx0XHR0aGlzLnkgPSAwO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtaW46IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdGlmICggdGhpcy54ID4gdi54ICkge1xuXG5cdFx0XHR0aGlzLnggPSB2Lng7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMueSA+IHYueSApIHtcblxuXHRcdFx0dGhpcy55ID0gdi55O1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtYXg6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdGlmICggdGhpcy54IDwgdi54ICkge1xuXG5cdFx0XHR0aGlzLnggPSB2Lng7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMueSA8IHYueSApIHtcblxuXHRcdFx0dGhpcy55ID0gdi55O1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjbGFtcDogZnVuY3Rpb24gKCBtaW4sIG1heCApIHtcblxuXHRcdC8vIFRoaXMgZnVuY3Rpb24gYXNzdW1lcyBtaW4gPCBtYXgsIGlmIHRoaXMgYXNzdW1wdGlvbiBpc24ndCB0cnVlIGl0IHdpbGwgbm90IG9wZXJhdGUgY29ycmVjdGx5XG5cblx0XHRpZiAoIHRoaXMueCA8IG1pbi54ICkge1xuXG5cdFx0XHR0aGlzLnggPSBtaW4ueDtcblxuXHRcdH0gZWxzZSBpZiAoIHRoaXMueCA+IG1heC54ICkge1xuXG5cdFx0XHR0aGlzLnggPSBtYXgueDtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy55IDwgbWluLnkgKSB7XG5cblx0XHRcdHRoaXMueSA9IG1pbi55O1xuXG5cdFx0fSBlbHNlIGlmICggdGhpcy55ID4gbWF4LnkgKSB7XG5cblx0XHRcdHRoaXMueSA9IG1heC55O1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0Y2xhbXBTY2FsYXI6ICggZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIG1pbiwgbWF4O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggbWluVmFsLCBtYXhWYWwgKSB7XG5cblx0XHRcdGlmICggbWluID09PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0bWluID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRcdFx0bWF4ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRtaW4uc2V0KCBtaW5WYWwsIG1pblZhbCApO1xuXHRcdFx0bWF4LnNldCggbWF4VmFsLCBtYXhWYWwgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXMuY2xhbXAoIG1pbiwgbWF4ICk7XG5cblx0XHR9O1xuXG5cdH0gKSgpLFxuXG5cdGZsb29yOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnggPSBNYXRoLmZsb29yKCB0aGlzLnggKTtcblx0XHR0aGlzLnkgPSBNYXRoLmZsb29yKCB0aGlzLnkgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2VpbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gTWF0aC5jZWlsKCB0aGlzLnggKTtcblx0XHR0aGlzLnkgPSBNYXRoLmNlaWwoIHRoaXMueSApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRyb3VuZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gTWF0aC5yb3VuZCggdGhpcy54ICk7XG5cdFx0dGhpcy55ID0gTWF0aC5yb3VuZCggdGhpcy55ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHJvdW5kVG9aZXJvOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnggPSAoIHRoaXMueCA8IDAgKSA/IE1hdGguY2VpbCggdGhpcy54ICkgOiBNYXRoLmZsb29yKCB0aGlzLnggKTtcblx0XHR0aGlzLnkgPSAoIHRoaXMueSA8IDAgKSA/IE1hdGguY2VpbCggdGhpcy55ICkgOiBNYXRoLmZsb29yKCB0aGlzLnkgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bmVnYXRlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnggPSAtIHRoaXMueDtcblx0XHR0aGlzLnkgPSAtIHRoaXMueTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZG90OiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRyZXR1cm4gdGhpcy54ICogdi54ICsgdGhpcy55ICogdi55O1xuXG5cdH0sXG5cblx0bGVuZ3RoU3E6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnk7XG5cblx0fSxcblxuXHRsZW5ndGg6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBNYXRoLnNxcnQoIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSApO1xuXG5cdH0sXG5cblx0bm9ybWFsaXplOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5kaXZpZGVTY2FsYXIoIHRoaXMubGVuZ3RoKCkgKTtcblxuXHR9LFxuXG5cdGRpc3RhbmNlVG86IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHJldHVybiBNYXRoLnNxcnQoIHRoaXMuZGlzdGFuY2VUb1NxdWFyZWQoIHYgKSApO1xuXG5cdH0sXG5cblx0ZGlzdGFuY2VUb1NxdWFyZWQ6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHZhciBkeCA9IHRoaXMueCAtIHYueCwgZHkgPSB0aGlzLnkgLSB2Lnk7XG5cdFx0cmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xuXG5cdH0sXG5cblx0c2V0TGVuZ3RoOiBmdW5jdGlvbiAoIGwgKSB7XG5cblx0XHR2YXIgb2xkTGVuZ3RoID0gdGhpcy5sZW5ndGgoKTtcblxuXHRcdGlmICggb2xkTGVuZ3RoICE9PSAwICYmIGwgIT09IG9sZExlbmd0aCApIHtcblxuXHRcdFx0dGhpcy5tdWx0aXBseVNjYWxhciggbCAvIG9sZExlbmd0aCApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bGVycDogZnVuY3Rpb24gKCB2LCBhbHBoYSApIHtcblxuXHRcdHRoaXMueCArPSAoIHYueCAtIHRoaXMueCApICogYWxwaGE7XG5cdFx0dGhpcy55ICs9ICggdi55IC0gdGhpcy55ICkgKiBhbHBoYTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bGVycFZlY3RvcnM6IGZ1bmN0aW9uICggdjEsIHYyLCBhbHBoYSApIHtcblxuXHRcdHRoaXMuc3ViVmVjdG9ycyggdjIsIHYxICkubXVsdGlwbHlTY2FsYXIoIGFscGhhICkuYWRkKCB2MSApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlcXVhbHM6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHJldHVybiAoICggdi54ID09PSB0aGlzLnggKSAmJiAoIHYueSA9PT0gdGhpcy55ICkgKTtcblxuXHR9LFxuXG5cdGZyb21BcnJheTogZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0ICkge1xuXG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHR0aGlzLnggPSBhcnJheVsgb2Zmc2V0IF07XG5cdFx0dGhpcy55ID0gYXJyYXlbIG9mZnNldCArIDEgXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dG9BcnJheTogZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0ICkge1xuXG5cdFx0aWYgKCBhcnJheSA9PT0gdW5kZWZpbmVkICkgYXJyYXkgPSBbXTtcblx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblxuXHRcdGFycmF5WyBvZmZzZXQgXSA9IHRoaXMueDtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMSBdID0gdGhpcy55O1xuXG5cdFx0cmV0dXJuIGFycmF5O1xuXG5cdH0sXG5cblx0ZnJvbUF0dHJpYnV0ZTogZnVuY3Rpb24gKCBhdHRyaWJ1dGUsIGluZGV4LCBvZmZzZXQgKSB7XG5cblx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblxuXHRcdGluZGV4ID0gaW5kZXggKiBhdHRyaWJ1dGUuaXRlbVNpemUgKyBvZmZzZXQ7XG5cblx0XHR0aGlzLnggPSBhdHRyaWJ1dGUuYXJyYXlbIGluZGV4IF07XG5cdFx0dGhpcy55ID0gYXR0cmlidXRlLmFycmF5WyBpbmRleCArIDEgXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMiggdGhpcy54LCB0aGlzLnkgKTtcblxuXHR9XG5cbn07XG5cbi8vIEZpbGU6c3JjL21hdGgvVmVjdG9yMy5qc1xuXG4vKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKiBAYXV0aG9yICpraWxlIC8gaHR0cDovL2tpbGUuc3RyYXZhZ2FuemEub3JnL1xuICogQGF1dGhvciBwaGlsb2diIC8gaHR0cDovL2Jsb2cudGhlaml0Lm9yZy9cbiAqIEBhdXRob3IgbWlrYWVsIGVtdGluZ2VyIC8gaHR0cDovL2dvbW8uc2UvXG4gKiBAYXV0aG9yIGVncmFldGhlciAvIGh0dHA6Ly9lZ3JhZXRoZXIuY29tL1xuICogQGF1dGhvciBXZXN0TGFuZ2xleSAvIGh0dHA6Ly9naXRodWIuY29tL1dlc3RMYW5nbGV5XG4gKi9cblxuVEhSRUUuVmVjdG9yMyA9IGZ1bmN0aW9uICggeCwgeSwgeiApIHtcblxuXHR0aGlzLnggPSB4IHx8IDA7XG5cdHRoaXMueSA9IHkgfHwgMDtcblx0dGhpcy56ID0geiB8fCAwO1xuXG59O1xuXG5USFJFRS5WZWN0b3IzLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogVEhSRUUuVmVjdG9yMyxcblxuXHRzZXQ6IGZ1bmN0aW9uICggeCwgeSwgeiApIHtcblxuXHRcdHRoaXMueCA9IHg7XG5cdFx0dGhpcy55ID0geTtcblx0XHR0aGlzLnogPSB6O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRYOiBmdW5jdGlvbiAoIHggKSB7XG5cblx0XHR0aGlzLnggPSB4O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRZOiBmdW5jdGlvbiAoIHkgKSB7XG5cblx0XHR0aGlzLnkgPSB5O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRaOiBmdW5jdGlvbiAoIHogKSB7XG5cblx0XHR0aGlzLnogPSB6O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRDb21wb25lbnQ6IGZ1bmN0aW9uICggaW5kZXgsIHZhbHVlICkge1xuXG5cdFx0c3dpdGNoICggaW5kZXggKSB7XG5cblx0XHRcdGNhc2UgMDogdGhpcy54ID0gdmFsdWU7IGJyZWFrO1xuXHRcdFx0Y2FzZSAxOiB0aGlzLnkgPSB2YWx1ZTsgYnJlYWs7XG5cdFx0XHRjYXNlIDI6IHRoaXMueiA9IHZhbHVlOyBicmVhaztcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvciggJ2luZGV4IGlzIG91dCBvZiByYW5nZTogJyArIGluZGV4ICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRnZXRDb21wb25lbnQ6IGZ1bmN0aW9uICggaW5kZXggKSB7XG5cblx0XHRzd2l0Y2ggKCBpbmRleCApIHtcblxuXHRcdFx0Y2FzZSAwOiByZXR1cm4gdGhpcy54O1xuXHRcdFx0Y2FzZSAxOiByZXR1cm4gdGhpcy55O1xuXHRcdFx0Y2FzZSAyOiByZXR1cm4gdGhpcy56O1xuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCAnaW5kZXggaXMgb3V0IG9mIHJhbmdlOiAnICsgaW5kZXggKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdGNvcHk6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHRoaXMueCA9IHYueDtcblx0XHR0aGlzLnkgPSB2Lnk7XG5cdFx0dGhpcy56ID0gdi56O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhZGQ6IGZ1bmN0aW9uICggdiwgdyApIHtcblxuXHRcdGlmICggdyAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WZWN0b3IzOiAuYWRkKCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAuYWRkVmVjdG9ycyggYSwgYiApIGluc3RlYWQuJyApO1xuXHRcdFx0cmV0dXJuIHRoaXMuYWRkVmVjdG9ycyggdiwgdyApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy54ICs9IHYueDtcblx0XHR0aGlzLnkgKz0gdi55O1xuXHRcdHRoaXMueiArPSB2Lno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFkZFNjYWxhcjogZnVuY3Rpb24gKCBzICkge1xuXG5cdFx0dGhpcy54ICs9IHM7XG5cdFx0dGhpcy55ICs9IHM7XG5cdFx0dGhpcy56ICs9IHM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFkZFZlY3RvcnM6IGZ1bmN0aW9uICggYSwgYiApIHtcblxuXHRcdHRoaXMueCA9IGEueCArIGIueDtcblx0XHR0aGlzLnkgPSBhLnkgKyBiLnk7XG5cdFx0dGhpcy56ID0gYS56ICsgYi56O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdWI6IGZ1bmN0aW9uICggdiwgdyApIHtcblxuXHRcdGlmICggdyAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WZWN0b3IzOiAuc3ViKCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAuc3ViVmVjdG9ycyggYSwgYiApIGluc3RlYWQuJyApO1xuXHRcdFx0cmV0dXJuIHRoaXMuc3ViVmVjdG9ycyggdiwgdyApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy54IC09IHYueDtcblx0XHR0aGlzLnkgLT0gdi55O1xuXHRcdHRoaXMueiAtPSB2Lno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXHRcblx0c3ViU2NhbGFyOiBmdW5jdGlvbiAoIHMgKSB7XG5cblx0XHR0aGlzLnggLT0gcztcblx0XHR0aGlzLnkgLT0gcztcblx0XHR0aGlzLnogLT0gcztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3ViVmVjdG9yczogZnVuY3Rpb24gKCBhLCBiICkge1xuXG5cdFx0dGhpcy54ID0gYS54IC0gYi54O1xuXHRcdHRoaXMueSA9IGEueSAtIGIueTtcblx0XHR0aGlzLnogPSBhLnogLSBiLno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5OiBmdW5jdGlvbiAoIHYsIHcgKSB7XG5cblx0XHRpZiAoIHcgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVmVjdG9yMzogLm11bHRpcGx5KCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAubXVsdGlwbHlWZWN0b3JzKCBhLCBiICkgaW5zdGVhZC4nICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5tdWx0aXBseVZlY3RvcnMoIHYsIHcgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMueCAqPSB2Lng7XG5cdFx0dGhpcy55ICo9IHYueTtcblx0XHR0aGlzLnogKj0gdi56O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtdWx0aXBseVNjYWxhcjogZnVuY3Rpb24gKCBzY2FsYXIgKSB7XG5cblx0XHR0aGlzLnggKj0gc2NhbGFyO1xuXHRcdHRoaXMueSAqPSBzY2FsYXI7XG5cdFx0dGhpcy56ICo9IHNjYWxhcjtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlWZWN0b3JzOiBmdW5jdGlvbiAoIGEsIGIgKSB7XG5cblx0XHR0aGlzLnggPSBhLnggKiBiLng7XG5cdFx0dGhpcy55ID0gYS55ICogYi55O1xuXHRcdHRoaXMueiA9IGEueiAqIGIuejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YXBwbHlFdWxlcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHF1YXRlcm5pb247XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBldWxlciApIHtcblxuXHRcdFx0aWYgKCBldWxlciBpbnN0YW5jZW9mIFRIUkVFLkV1bGVyID09PSBmYWxzZSApIHtcblxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuVmVjdG9yMzogLmFwcGx5RXVsZXIoKSBub3cgZXhwZWN0cyBhIEV1bGVyIHJvdGF0aW9uIHJhdGhlciB0aGFuIGEgVmVjdG9yMyBhbmQgb3JkZXIuJyApO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggcXVhdGVybmlvbiA9PT0gdW5kZWZpbmVkICkgcXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cblx0XHRcdHRoaXMuYXBwbHlRdWF0ZXJuaW9uKCBxdWF0ZXJuaW9uLnNldEZyb21FdWxlciggZXVsZXIgKSApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGFwcGx5QXhpc0FuZ2xlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgcXVhdGVybmlvbjtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIGF4aXMsIGFuZ2xlICkge1xuXG5cdFx0XHRpZiAoIHF1YXRlcm5pb24gPT09IHVuZGVmaW5lZCApIHF1YXRlcm5pb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5cdFx0XHR0aGlzLmFwcGx5UXVhdGVybmlvbiggcXVhdGVybmlvbi5zZXRGcm9tQXhpc0FuZ2xlKCBheGlzLCBhbmdsZSApICk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0YXBwbHlNYXRyaXgzOiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHR2YXIgeCA9IHRoaXMueDtcblx0XHR2YXIgeSA9IHRoaXMueTtcblx0XHR2YXIgeiA9IHRoaXMuejtcblxuXHRcdHZhciBlID0gbS5lbGVtZW50cztcblxuXHRcdHRoaXMueCA9IGVbIDAgXSAqIHggKyBlWyAzIF0gKiB5ICsgZVsgNiBdICogejtcblx0XHR0aGlzLnkgPSBlWyAxIF0gKiB4ICsgZVsgNCBdICogeSArIGVbIDcgXSAqIHo7XG5cdFx0dGhpcy56ID0gZVsgMiBdICogeCArIGVbIDUgXSAqIHkgKyBlWyA4IF0gKiB6O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhcHBseU1hdHJpeDQ6IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdC8vIGlucHV0OiBUSFJFRS5NYXRyaXg0IGFmZmluZSBtYXRyaXhcblxuXHRcdHZhciB4ID0gdGhpcy54LCB5ID0gdGhpcy55LCB6ID0gdGhpcy56O1xuXG5cdFx0dmFyIGUgPSBtLmVsZW1lbnRzO1xuXG5cdFx0dGhpcy54ID0gZVsgMCBdICogeCArIGVbIDQgXSAqIHkgKyBlWyA4IF0gICogeiArIGVbIDEyIF07XG5cdFx0dGhpcy55ID0gZVsgMSBdICogeCArIGVbIDUgXSAqIHkgKyBlWyA5IF0gICogeiArIGVbIDEzIF07XG5cdFx0dGhpcy56ID0gZVsgMiBdICogeCArIGVbIDYgXSAqIHkgKyBlWyAxMCBdICogeiArIGVbIDE0IF07XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFwcGx5UHJvamVjdGlvbjogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0Ly8gaW5wdXQ6IFRIUkVFLk1hdHJpeDQgcHJvamVjdGlvbiBtYXRyaXhcblxuXHRcdHZhciB4ID0gdGhpcy54LCB5ID0gdGhpcy55LCB6ID0gdGhpcy56O1xuXG5cdFx0dmFyIGUgPSBtLmVsZW1lbnRzO1xuXHRcdHZhciBkID0gMSAvICggZVsgMyBdICogeCArIGVbIDcgXSAqIHkgKyBlWyAxMSBdICogeiArIGVbIDE1IF0gKTsgLy8gcGVyc3BlY3RpdmUgZGl2aWRlXG5cblx0XHR0aGlzLnggPSAoIGVbIDAgXSAqIHggKyBlWyA0IF0gKiB5ICsgZVsgOCBdICAqIHogKyBlWyAxMiBdICkgKiBkO1xuXHRcdHRoaXMueSA9ICggZVsgMSBdICogeCArIGVbIDUgXSAqIHkgKyBlWyA5IF0gICogeiArIGVbIDEzIF0gKSAqIGQ7XG5cdFx0dGhpcy56ID0gKCBlWyAyIF0gKiB4ICsgZVsgNiBdICogeSArIGVbIDEwIF0gKiB6ICsgZVsgMTQgXSApICogZDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YXBwbHlRdWF0ZXJuaW9uOiBmdW5jdGlvbiAoIHEgKSB7XG5cblx0XHR2YXIgeCA9IHRoaXMueDtcblx0XHR2YXIgeSA9IHRoaXMueTtcblx0XHR2YXIgeiA9IHRoaXMuejtcblxuXHRcdHZhciBxeCA9IHEueDtcblx0XHR2YXIgcXkgPSBxLnk7XG5cdFx0dmFyIHF6ID0gcS56O1xuXHRcdHZhciBxdyA9IHEudztcblxuXHRcdC8vIGNhbGN1bGF0ZSBxdWF0ICogdmVjdG9yXG5cblx0XHR2YXIgaXggPSAgcXcgKiB4ICsgcXkgKiB6IC0gcXogKiB5O1xuXHRcdHZhciBpeSA9ICBxdyAqIHkgKyBxeiAqIHggLSBxeCAqIHo7XG5cdFx0dmFyIGl6ID0gIHF3ICogeiArIHF4ICogeSAtIHF5ICogeDtcblx0XHR2YXIgaXcgPSAtIHF4ICogeCAtIHF5ICogeSAtIHF6ICogejtcblxuXHRcdC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcblxuXHRcdHRoaXMueCA9IGl4ICogcXcgKyBpdyAqIC0gcXggKyBpeSAqIC0gcXogLSBpeiAqIC0gcXk7XG5cdFx0dGhpcy55ID0gaXkgKiBxdyArIGl3ICogLSBxeSArIGl6ICogLSBxeCAtIGl4ICogLSBxejtcblx0XHR0aGlzLnogPSBpeiAqIHF3ICsgaXcgKiAtIHF6ICsgaXggKiAtIHF5IC0gaXkgKiAtIHF4O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRwcm9qZWN0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgbWF0cml4O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggY2FtZXJhICkge1xuXG5cdFx0XHRpZiAoIG1hdHJpeCA9PT0gdW5kZWZpbmVkICkgbWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuXHRcdFx0bWF0cml4Lm11bHRpcGx5TWF0cmljZXMoIGNhbWVyYS5wcm9qZWN0aW9uTWF0cml4LCBtYXRyaXguZ2V0SW52ZXJzZSggY2FtZXJhLm1hdHJpeFdvcmxkICkgKTtcblx0XHRcdHJldHVybiB0aGlzLmFwcGx5UHJvamVjdGlvbiggbWF0cml4ICk7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHR1bnByb2plY3Q6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBtYXRyaXg7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBjYW1lcmEgKSB7XG5cblx0XHRcdGlmICggbWF0cml4ID09PSB1bmRlZmluZWQgKSBtYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG5cdFx0XHRtYXRyaXgubXVsdGlwbHlNYXRyaWNlcyggY2FtZXJhLm1hdHJpeFdvcmxkLCBtYXRyaXguZ2V0SW52ZXJzZSggY2FtZXJhLnByb2plY3Rpb25NYXRyaXggKSApO1xuXHRcdFx0cmV0dXJuIHRoaXMuYXBwbHlQcm9qZWN0aW9uKCBtYXRyaXggKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdHRyYW5zZm9ybURpcmVjdGlvbjogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0Ly8gaW5wdXQ6IFRIUkVFLk1hdHJpeDQgYWZmaW5lIG1hdHJpeFxuXHRcdC8vIHZlY3RvciBpbnRlcnByZXRlZCBhcyBhIGRpcmVjdGlvblxuXG5cdFx0dmFyIHggPSB0aGlzLngsIHkgPSB0aGlzLnksIHogPSB0aGlzLno7XG5cblx0XHR2YXIgZSA9IG0uZWxlbWVudHM7XG5cblx0XHR0aGlzLnggPSBlWyAwIF0gKiB4ICsgZVsgNCBdICogeSArIGVbIDggXSAgKiB6O1xuXHRcdHRoaXMueSA9IGVbIDEgXSAqIHggKyBlWyA1IF0gKiB5ICsgZVsgOSBdICAqIHo7XG5cdFx0dGhpcy56ID0gZVsgMiBdICogeCArIGVbIDYgXSAqIHkgKyBlWyAxMCBdICogejtcblxuXHRcdHRoaXMubm9ybWFsaXplKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGRpdmlkZTogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0dGhpcy54IC89IHYueDtcblx0XHR0aGlzLnkgLz0gdi55O1xuXHRcdHRoaXMueiAvPSB2Lno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGRpdmlkZVNjYWxhcjogZnVuY3Rpb24gKCBzY2FsYXIgKSB7XG5cblx0XHRpZiAoIHNjYWxhciAhPT0gMCApIHtcblxuXHRcdFx0dmFyIGludlNjYWxhciA9IDEgLyBzY2FsYXI7XG5cblx0XHRcdHRoaXMueCAqPSBpbnZTY2FsYXI7XG5cdFx0XHR0aGlzLnkgKj0gaW52U2NhbGFyO1xuXHRcdFx0dGhpcy56ICo9IGludlNjYWxhcjtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMueCA9IDA7XG5cdFx0XHR0aGlzLnkgPSAwO1xuXHRcdFx0dGhpcy56ID0gMDtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWluOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRpZiAoIHRoaXMueCA+IHYueCApIHtcblxuXHRcdFx0dGhpcy54ID0gdi54O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnkgPiB2LnkgKSB7XG5cblx0XHRcdHRoaXMueSA9IHYueTtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy56ID4gdi56ICkge1xuXG5cdFx0XHR0aGlzLnogPSB2Lno7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1heDogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0aWYgKCB0aGlzLnggPCB2LnggKSB7XG5cblx0XHRcdHRoaXMueCA9IHYueDtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy55IDwgdi55ICkge1xuXG5cdFx0XHR0aGlzLnkgPSB2Lnk7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMueiA8IHYueiApIHtcblxuXHRcdFx0dGhpcy56ID0gdi56O1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjbGFtcDogZnVuY3Rpb24gKCBtaW4sIG1heCApIHtcblxuXHRcdC8vIFRoaXMgZnVuY3Rpb24gYXNzdW1lcyBtaW4gPCBtYXgsIGlmIHRoaXMgYXNzdW1wdGlvbiBpc24ndCB0cnVlIGl0IHdpbGwgbm90IG9wZXJhdGUgY29ycmVjdGx5XG5cblx0XHRpZiAoIHRoaXMueCA8IG1pbi54ICkge1xuXG5cdFx0XHR0aGlzLnggPSBtaW4ueDtcblxuXHRcdH0gZWxzZSBpZiAoIHRoaXMueCA+IG1heC54ICkge1xuXG5cdFx0XHR0aGlzLnggPSBtYXgueDtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy55IDwgbWluLnkgKSB7XG5cblx0XHRcdHRoaXMueSA9IG1pbi55O1xuXG5cdFx0fSBlbHNlIGlmICggdGhpcy55ID4gbWF4LnkgKSB7XG5cblx0XHRcdHRoaXMueSA9IG1heC55O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnogPCBtaW4ueiApIHtcblxuXHRcdFx0dGhpcy56ID0gbWluLno7XG5cblx0XHR9IGVsc2UgaWYgKCB0aGlzLnogPiBtYXgueiApIHtcblxuXHRcdFx0dGhpcy56ID0gbWF4Lno7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNsYW1wU2NhbGFyOiAoIGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBtaW4sIG1heDtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIG1pblZhbCwgbWF4VmFsICkge1xuXG5cdFx0XHRpZiAoIG1pbiA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdG1pbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdG1heCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRcdH1cblxuXHRcdFx0bWluLnNldCggbWluVmFsLCBtaW5WYWwsIG1pblZhbCApO1xuXHRcdFx0bWF4LnNldCggbWF4VmFsLCBtYXhWYWwsIG1heFZhbCApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5jbGFtcCggbWluLCBtYXggKTtcblxuXHRcdH07XG5cblx0fSApKCksXG5cblx0Zmxvb3I6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9IE1hdGguZmxvb3IoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9IE1hdGguZmxvb3IoIHRoaXMueSApO1xuXHRcdHRoaXMueiA9IE1hdGguZmxvb3IoIHRoaXMueiApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjZWlsOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnggPSBNYXRoLmNlaWwoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9IE1hdGguY2VpbCggdGhpcy55ICk7XG5cdFx0dGhpcy56ID0gTWF0aC5jZWlsKCB0aGlzLnogKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cm91bmQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9IE1hdGgucm91bmQoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9IE1hdGgucm91bmQoIHRoaXMueSApO1xuXHRcdHRoaXMueiA9IE1hdGgucm91bmQoIHRoaXMueiApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRyb3VuZFRvWmVybzogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gKCB0aGlzLnggPCAwICkgPyBNYXRoLmNlaWwoIHRoaXMueCApIDogTWF0aC5mbG9vciggdGhpcy54ICk7XG5cdFx0dGhpcy55ID0gKCB0aGlzLnkgPCAwICkgPyBNYXRoLmNlaWwoIHRoaXMueSApIDogTWF0aC5mbG9vciggdGhpcy55ICk7XG5cdFx0dGhpcy56ID0gKCB0aGlzLnogPCAwICkgPyBNYXRoLmNlaWwoIHRoaXMueiApIDogTWF0aC5mbG9vciggdGhpcy56ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG5lZ2F0ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gLSB0aGlzLng7XG5cdFx0dGhpcy55ID0gLSB0aGlzLnk7XG5cdFx0dGhpcy56ID0gLSB0aGlzLno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGRvdDogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0cmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcblxuXHR9LFxuXG5cdGxlbmd0aFNxOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICsgdGhpcy56ICogdGhpcy56O1xuXG5cdH0sXG5cblx0bGVuZ3RoOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gTWF0aC5zcXJ0KCB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkgKyB0aGlzLnogKiB0aGlzLnogKTtcblxuXHR9LFxuXG5cdGxlbmd0aE1hbmhhdHRhbjogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIE1hdGguYWJzKCB0aGlzLnggKSArIE1hdGguYWJzKCB0aGlzLnkgKSArIE1hdGguYWJzKCB0aGlzLnogKTtcblxuXHR9LFxuXG5cdG5vcm1hbGl6ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuZGl2aWRlU2NhbGFyKCB0aGlzLmxlbmd0aCgpICk7XG5cblx0fSxcblxuXHRzZXRMZW5ndGg6IGZ1bmN0aW9uICggbCApIHtcblxuXHRcdHZhciBvbGRMZW5ndGggPSB0aGlzLmxlbmd0aCgpO1xuXG5cdFx0aWYgKCBvbGRMZW5ndGggIT09IDAgJiYgbCAhPT0gb2xkTGVuZ3RoICApIHtcblxuXHRcdFx0dGhpcy5tdWx0aXBseVNjYWxhciggbCAvIG9sZExlbmd0aCApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bGVycDogZnVuY3Rpb24gKCB2LCBhbHBoYSApIHtcblxuXHRcdHRoaXMueCArPSAoIHYueCAtIHRoaXMueCApICogYWxwaGE7XG5cdFx0dGhpcy55ICs9ICggdi55IC0gdGhpcy55ICkgKiBhbHBoYTtcblx0XHR0aGlzLnogKz0gKCB2LnogLSB0aGlzLnogKSAqIGFscGhhO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRsZXJwVmVjdG9yczogZnVuY3Rpb24gKCB2MSwgdjIsIGFscGhhICkge1xuXG5cdFx0dGhpcy5zdWJWZWN0b3JzKCB2MiwgdjEgKS5tdWx0aXBseVNjYWxhciggYWxwaGEgKS5hZGQoIHYxICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNyb3NzOiBmdW5jdGlvbiAoIHYsIHcgKSB7XG5cblx0XHRpZiAoIHcgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVmVjdG9yMzogLmNyb3NzKCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAuY3Jvc3NWZWN0b3JzKCBhLCBiICkgaW5zdGVhZC4nICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5jcm9zc1ZlY3RvcnMoIHYsIHcgKTtcblxuXHRcdH1cblxuXHRcdHZhciB4ID0gdGhpcy54LCB5ID0gdGhpcy55LCB6ID0gdGhpcy56O1xuXG5cdFx0dGhpcy54ID0geSAqIHYueiAtIHogKiB2Lnk7XG5cdFx0dGhpcy55ID0geiAqIHYueCAtIHggKiB2Lno7XG5cdFx0dGhpcy56ID0geCAqIHYueSAtIHkgKiB2Lng7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNyb3NzVmVjdG9yczogZnVuY3Rpb24gKCBhLCBiICkge1xuXG5cdFx0dmFyIGF4ID0gYS54LCBheSA9IGEueSwgYXogPSBhLno7XG5cdFx0dmFyIGJ4ID0gYi54LCBieSA9IGIueSwgYnogPSBiLno7XG5cblx0XHR0aGlzLnggPSBheSAqIGJ6IC0gYXogKiBieTtcblx0XHR0aGlzLnkgPSBheiAqIGJ4IC0gYXggKiBiejtcblx0XHR0aGlzLnogPSBheCAqIGJ5IC0gYXkgKiBieDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cHJvamVjdE9uVmVjdG9yOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdjEsIGRvdDtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHZlY3RvciApIHtcblxuXHRcdFx0aWYgKCB2MSA9PT0gdW5kZWZpbmVkICkgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0XHR2MS5jb3B5KCB2ZWN0b3IgKS5ub3JtYWxpemUoKTtcblxuXHRcdFx0ZG90ID0gdGhpcy5kb3QoIHYxICk7XG5cblx0XHRcdHJldHVybiB0aGlzLmNvcHkoIHYxICkubXVsdGlwbHlTY2FsYXIoIGRvdCApO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0cHJvamVjdE9uUGxhbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHBsYW5lTm9ybWFsICkge1xuXG5cdFx0XHRpZiAoIHYxID09PSB1bmRlZmluZWQgKSB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRcdHYxLmNvcHkoIHRoaXMgKS5wcm9qZWN0T25WZWN0b3IoIHBsYW5lTm9ybWFsICk7XG5cblx0XHRcdHJldHVybiB0aGlzLnN1YiggdjEgKTtcblxuXHRcdH1cblxuXHR9KCksXG5cblx0cmVmbGVjdDogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gcmVmbGVjdCBpbmNpZGVudCB2ZWN0b3Igb2ZmIHBsYW5lIG9ydGhvZ29uYWwgdG8gbm9ybWFsXG5cdFx0Ly8gbm9ybWFsIGlzIGFzc3VtZWQgdG8gaGF2ZSB1bml0IGxlbmd0aFxuXG5cdFx0dmFyIHYxO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggbm9ybWFsICkge1xuXG5cdFx0XHRpZiAoIHYxID09PSB1bmRlZmluZWQgKSB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRcdHJldHVybiB0aGlzLnN1YiggdjEuY29weSggbm9ybWFsICkubXVsdGlwbHlTY2FsYXIoIDIgKiB0aGlzLmRvdCggbm9ybWFsICkgKSApO1xuXG5cdFx0fVxuXG5cdH0oKSxcblxuXHRhbmdsZVRvOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHR2YXIgdGhldGEgPSB0aGlzLmRvdCggdiApIC8gKCB0aGlzLmxlbmd0aCgpICogdi5sZW5ndGgoKSApO1xuXG5cdFx0Ly8gY2xhbXAsIHRvIGhhbmRsZSBudW1lcmljYWwgcHJvYmxlbXNcblxuXHRcdHJldHVybiBNYXRoLmFjb3MoIFRIUkVFLk1hdGguY2xhbXAoIHRoZXRhLCAtIDEsIDEgKSApO1xuXG5cdH0sXG5cblx0ZGlzdGFuY2VUbzogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0cmV0dXJuIE1hdGguc3FydCggdGhpcy5kaXN0YW5jZVRvU3F1YXJlZCggdiApICk7XG5cblx0fSxcblxuXHRkaXN0YW5jZVRvU3F1YXJlZDogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0dmFyIGR4ID0gdGhpcy54IC0gdi54O1xuXHRcdHZhciBkeSA9IHRoaXMueSAtIHYueTtcblx0XHR2YXIgZHogPSB0aGlzLnogLSB2Lno7XG5cblx0XHRyZXR1cm4gZHggKiBkeCArIGR5ICogZHkgKyBkeiAqIGR6O1xuXG5cdH0sXG5cblx0c2V0RXVsZXJGcm9tUm90YXRpb25NYXRyaXg6IGZ1bmN0aW9uICggbSwgb3JkZXIgKSB7XG5cblx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuVmVjdG9yMzogLnNldEV1bGVyRnJvbVJvdGF0aW9uTWF0cml4KCkgaGFzIGJlZW4gcmVtb3ZlZC4gVXNlIEV1bGVyLnNldEZyb21Sb3RhdGlvbk1hdHJpeCgpIGluc3RlYWQuJyApO1xuXG5cdH0sXG5cblx0c2V0RXVsZXJGcm9tUXVhdGVybmlvbjogZnVuY3Rpb24gKCBxLCBvcmRlciApIHtcblxuXHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5WZWN0b3IzOiAuc2V0RXVsZXJGcm9tUXVhdGVybmlvbigpIGhhcyBiZWVuIHJlbW92ZWQuIFVzZSBFdWxlci5zZXRGcm9tUXVhdGVybmlvbigpIGluc3RlYWQuJyApO1xuXG5cdH0sXG5cblx0Z2V0UG9zaXRpb25Gcm9tTWF0cml4OiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WZWN0b3IzOiAuZ2V0UG9zaXRpb25Gcm9tTWF0cml4KCkgaGFzIGJlZW4gcmVuYW1lZCB0byAuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKCkuJyApO1xuXG5cdFx0cmV0dXJuIHRoaXMuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKCBtICk7XG5cblx0fSxcblxuXHRnZXRTY2FsZUZyb21NYXRyaXg6IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZlY3RvcjM6IC5nZXRTY2FsZUZyb21NYXRyaXgoKSBoYXMgYmVlbiByZW5hbWVkIHRvIC5zZXRGcm9tTWF0cml4U2NhbGUoKS4nICk7XG5cblx0XHRyZXR1cm4gdGhpcy5zZXRGcm9tTWF0cml4U2NhbGUoIG0gKTtcblx0fSxcblxuXHRnZXRDb2x1bW5Gcm9tTWF0cml4OiBmdW5jdGlvbiAoIGluZGV4LCBtYXRyaXggKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WZWN0b3IzOiAuZ2V0Q29sdW1uRnJvbU1hdHJpeCgpIGhhcyBiZWVuIHJlbmFtZWQgdG8gLnNldEZyb21NYXRyaXhDb2x1bW4oKS4nICk7XG5cblx0XHRyZXR1cm4gdGhpcy5zZXRGcm9tTWF0cml4Q29sdW1uKCBpbmRleCwgbWF0cml4ICk7XG5cblx0fSxcblxuXHRzZXRGcm9tTWF0cml4UG9zaXRpb246IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdHRoaXMueCA9IG0uZWxlbWVudHNbIDEyIF07XG5cdFx0dGhpcy55ID0gbS5lbGVtZW50c1sgMTMgXTtcblx0XHR0aGlzLnogPSBtLmVsZW1lbnRzWyAxNCBdO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRGcm9tTWF0cml4U2NhbGU6IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdHZhciBzeCA9IHRoaXMuc2V0KCBtLmVsZW1lbnRzWyAwIF0sIG0uZWxlbWVudHNbIDEgXSwgbS5lbGVtZW50c1sgIDIgXSApLmxlbmd0aCgpO1xuXHRcdHZhciBzeSA9IHRoaXMuc2V0KCBtLmVsZW1lbnRzWyA0IF0sIG0uZWxlbWVudHNbIDUgXSwgbS5lbGVtZW50c1sgIDYgXSApLmxlbmd0aCgpO1xuXHRcdHZhciBzeiA9IHRoaXMuc2V0KCBtLmVsZW1lbnRzWyA4IF0sIG0uZWxlbWVudHNbIDkgXSwgbS5lbGVtZW50c1sgMTAgXSApLmxlbmd0aCgpO1xuXG5cdFx0dGhpcy54ID0gc3g7XG5cdFx0dGhpcy55ID0gc3k7XG5cdFx0dGhpcy56ID0gc3o7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRzZXRGcm9tTWF0cml4Q29sdW1uOiBmdW5jdGlvbiAoIGluZGV4LCBtYXRyaXggKSB7XG5cdFx0XG5cdFx0dmFyIG9mZnNldCA9IGluZGV4ICogNDtcblxuXHRcdHZhciBtZSA9IG1hdHJpeC5lbGVtZW50cztcblxuXHRcdHRoaXMueCA9IG1lWyBvZmZzZXQgXTtcblx0XHR0aGlzLnkgPSBtZVsgb2Zmc2V0ICsgMSBdO1xuXHRcdHRoaXMueiA9IG1lWyBvZmZzZXQgKyAyIF07XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVxdWFsczogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0cmV0dXJuICggKCB2LnggPT09IHRoaXMueCApICYmICggdi55ID09PSB0aGlzLnkgKSAmJiAoIHYueiA9PT0gdGhpcy56ICkgKTtcblxuXHR9LFxuXG5cdGZyb21BcnJheTogZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0ICkge1xuXG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHR0aGlzLnggPSBhcnJheVsgb2Zmc2V0IF07XG5cdFx0dGhpcy55ID0gYXJyYXlbIG9mZnNldCArIDEgXTtcblx0XHR0aGlzLnogPSBhcnJheVsgb2Zmc2V0ICsgMiBdO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR0b0FycmF5OiBmdW5jdGlvbiAoIGFycmF5LCBvZmZzZXQgKSB7XG5cblx0XHRpZiAoIGFycmF5ID09PSB1bmRlZmluZWQgKSBhcnJheSA9IFtdO1xuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0YXJyYXlbIG9mZnNldCBdID0gdGhpcy54O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxIF0gPSB0aGlzLnk7XG5cdFx0YXJyYXlbIG9mZnNldCArIDIgXSA9IHRoaXMuejtcblxuXHRcdHJldHVybiBhcnJheTtcblxuXHR9LFxuXG5cdGZyb21BdHRyaWJ1dGU6IGZ1bmN0aW9uICggYXR0cmlidXRlLCBpbmRleCwgb2Zmc2V0ICkge1xuXG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHRpbmRleCA9IGluZGV4ICogYXR0cmlidXRlLml0ZW1TaXplICsgb2Zmc2V0O1xuXG5cdFx0dGhpcy54ID0gYXR0cmlidXRlLmFycmF5WyBpbmRleCBdO1xuXHRcdHRoaXMueSA9IGF0dHJpYnV0ZS5hcnJheVsgaW5kZXggKyAxIF07XG5cdFx0dGhpcy56ID0gYXR0cmlidXRlLmFycmF5WyBpbmRleCArIDIgXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMyggdGhpcy54LCB0aGlzLnksIHRoaXMueiApO1xuXG5cdH1cblxufTtcblxuLy8gRmlsZTpzcmMvbWF0aC9WZWN0b3I0LmpzXG5cbi8qKlxuICogQGF1dGhvciBzdXBlcmVnZ2JlcnQgLyBodHRwOi8vd3d3LnBhdWxicnVudC5jby51ay9cbiAqIEBhdXRob3IgcGhpbG9nYiAvIGh0dHA6Ly9ibG9nLnRoZWppdC5vcmcvXG4gKiBAYXV0aG9yIG1pa2FlbCBlbXRpbmdlciAvIGh0dHA6Ly9nb21vLnNlL1xuICogQGF1dGhvciBlZ3JhZXRoZXIgLyBodHRwOi8vZWdyYWV0aGVyLmNvbS9cbiAqIEBhdXRob3IgV2VzdExhbmdsZXkgLyBodHRwOi8vZ2l0aHViLmNvbS9XZXN0TGFuZ2xleVxuICovXG5cblRIUkVFLlZlY3RvcjQgPSBmdW5jdGlvbiAoIHgsIHksIHosIHcgKSB7XG5cblx0dGhpcy54ID0geCB8fCAwO1xuXHR0aGlzLnkgPSB5IHx8IDA7XG5cdHRoaXMueiA9IHogfHwgMDtcblx0dGhpcy53ID0gKCB3ICE9PSB1bmRlZmluZWQgKSA/IHcgOiAxO1xuXG59O1xuXG5USFJFRS5WZWN0b3I0LnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogVEhSRUUuVmVjdG9yNCxcblxuXHRzZXQ6IGZ1bmN0aW9uICggeCwgeSwgeiwgdyApIHtcblxuXHRcdHRoaXMueCA9IHg7XG5cdFx0dGhpcy55ID0geTtcblx0XHR0aGlzLnogPSB6O1xuXHRcdHRoaXMudyA9IHc7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldFg6IGZ1bmN0aW9uICggeCApIHtcblxuXHRcdHRoaXMueCA9IHg7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldFk6IGZ1bmN0aW9uICggeSApIHtcblxuXHRcdHRoaXMueSA9IHk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldFo6IGZ1bmN0aW9uICggeiApIHtcblxuXHRcdHRoaXMueiA9IHo7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldFc6IGZ1bmN0aW9uICggdyApIHtcblxuXHRcdHRoaXMudyA9IHc7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldENvbXBvbmVudDogZnVuY3Rpb24gKCBpbmRleCwgdmFsdWUgKSB7XG5cblx0XHRzd2l0Y2ggKCBpbmRleCApIHtcblxuXHRcdFx0Y2FzZSAwOiB0aGlzLnggPSB2YWx1ZTsgYnJlYWs7XG5cdFx0XHRjYXNlIDE6IHRoaXMueSA9IHZhbHVlOyBicmVhaztcblx0XHRcdGNhc2UgMjogdGhpcy56ID0gdmFsdWU7IGJyZWFrO1xuXHRcdFx0Y2FzZSAzOiB0aGlzLncgPSB2YWx1ZTsgYnJlYWs7XG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoICdpbmRleCBpcyBvdXQgb2YgcmFuZ2U6ICcgKyBpbmRleCApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Z2V0Q29tcG9uZW50OiBmdW5jdGlvbiAoIGluZGV4ICkge1xuXG5cdFx0c3dpdGNoICggaW5kZXggKSB7XG5cblx0XHRcdGNhc2UgMDogcmV0dXJuIHRoaXMueDtcblx0XHRcdGNhc2UgMTogcmV0dXJuIHRoaXMueTtcblx0XHRcdGNhc2UgMjogcmV0dXJuIHRoaXMuejtcblx0XHRcdGNhc2UgMzogcmV0dXJuIHRoaXMudztcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvciggJ2luZGV4IGlzIG91dCBvZiByYW5nZTogJyArIGluZGV4ICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRjb3B5OiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHR0aGlzLnggPSB2Lng7XG5cdFx0dGhpcy55ID0gdi55O1xuXHRcdHRoaXMueiA9IHYuejtcblx0XHR0aGlzLncgPSAoIHYudyAhPT0gdW5kZWZpbmVkICkgPyB2LncgOiAxO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhZGQ6IGZ1bmN0aW9uICggdiwgdyApIHtcblxuXHRcdGlmICggdyAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WZWN0b3I0OiAuYWRkKCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAuYWRkVmVjdG9ycyggYSwgYiApIGluc3RlYWQuJyApO1xuXHRcdFx0cmV0dXJuIHRoaXMuYWRkVmVjdG9ycyggdiwgdyApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy54ICs9IHYueDtcblx0XHR0aGlzLnkgKz0gdi55O1xuXHRcdHRoaXMueiArPSB2Lno7XG5cdFx0dGhpcy53ICs9IHYudztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YWRkU2NhbGFyOiBmdW5jdGlvbiAoIHMgKSB7XG5cblx0XHR0aGlzLnggKz0gcztcblx0XHR0aGlzLnkgKz0gcztcblx0XHR0aGlzLnogKz0gcztcblx0XHR0aGlzLncgKz0gcztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YWRkVmVjdG9yczogZnVuY3Rpb24gKCBhLCBiICkge1xuXG5cdFx0dGhpcy54ID0gYS54ICsgYi54O1xuXHRcdHRoaXMueSA9IGEueSArIGIueTtcblx0XHR0aGlzLnogPSBhLnogKyBiLno7XG5cdFx0dGhpcy53ID0gYS53ICsgYi53O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdWI6IGZ1bmN0aW9uICggdiwgdyApIHtcblxuXHRcdGlmICggdyAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WZWN0b3I0OiAuc3ViKCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAuc3ViVmVjdG9ycyggYSwgYiApIGluc3RlYWQuJyApO1xuXHRcdFx0cmV0dXJuIHRoaXMuc3ViVmVjdG9ycyggdiwgdyApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy54IC09IHYueDtcblx0XHR0aGlzLnkgLT0gdi55O1xuXHRcdHRoaXMueiAtPSB2Lno7XG5cdFx0dGhpcy53IC09IHYudztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3ViU2NhbGFyOiBmdW5jdGlvbiAoIHMgKSB7XG5cblx0XHR0aGlzLnggLT0gcztcblx0XHR0aGlzLnkgLT0gcztcblx0XHR0aGlzLnogLT0gcztcblx0XHR0aGlzLncgLT0gcztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3ViVmVjdG9yczogZnVuY3Rpb24gKCBhLCBiICkge1xuXG5cdFx0dGhpcy54ID0gYS54IC0gYi54O1xuXHRcdHRoaXMueSA9IGEueSAtIGIueTtcblx0XHR0aGlzLnogPSBhLnogLSBiLno7XG5cdFx0dGhpcy53ID0gYS53IC0gYi53O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtdWx0aXBseVNjYWxhcjogZnVuY3Rpb24gKCBzY2FsYXIgKSB7XG5cblx0XHR0aGlzLnggKj0gc2NhbGFyO1xuXHRcdHRoaXMueSAqPSBzY2FsYXI7XG5cdFx0dGhpcy56ICo9IHNjYWxhcjtcblx0XHR0aGlzLncgKj0gc2NhbGFyO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhcHBseU1hdHJpeDQ6IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdHZhciB4ID0gdGhpcy54O1xuXHRcdHZhciB5ID0gdGhpcy55O1xuXHRcdHZhciB6ID0gdGhpcy56O1xuXHRcdHZhciB3ID0gdGhpcy53O1xuXG5cdFx0dmFyIGUgPSBtLmVsZW1lbnRzO1xuXG5cdFx0dGhpcy54ID0gZVsgMCBdICogeCArIGVbIDQgXSAqIHkgKyBlWyA4IF0gKiB6ICsgZVsgMTIgXSAqIHc7XG5cdFx0dGhpcy55ID0gZVsgMSBdICogeCArIGVbIDUgXSAqIHkgKyBlWyA5IF0gKiB6ICsgZVsgMTMgXSAqIHc7XG5cdFx0dGhpcy56ID0gZVsgMiBdICogeCArIGVbIDYgXSAqIHkgKyBlWyAxMCBdICogeiArIGVbIDE0IF0gKiB3O1xuXHRcdHRoaXMudyA9IGVbIDMgXSAqIHggKyBlWyA3IF0gKiB5ICsgZVsgMTEgXSAqIHogKyBlWyAxNSBdICogdztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZGl2aWRlU2NhbGFyOiBmdW5jdGlvbiAoIHNjYWxhciApIHtcblxuXHRcdGlmICggc2NhbGFyICE9PSAwICkge1xuXG5cdFx0XHR2YXIgaW52U2NhbGFyID0gMSAvIHNjYWxhcjtcblxuXHRcdFx0dGhpcy54ICo9IGludlNjYWxhcjtcblx0XHRcdHRoaXMueSAqPSBpbnZTY2FsYXI7XG5cdFx0XHR0aGlzLnogKj0gaW52U2NhbGFyO1xuXHRcdFx0dGhpcy53ICo9IGludlNjYWxhcjtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMueCA9IDA7XG5cdFx0XHR0aGlzLnkgPSAwO1xuXHRcdFx0dGhpcy56ID0gMDtcblx0XHRcdHRoaXMudyA9IDE7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldEF4aXNBbmdsZUZyb21RdWF0ZXJuaW9uOiBmdW5jdGlvbiAoIHEgKSB7XG5cblx0XHQvLyBodHRwOi8vd3d3LmV1Y2xpZGVhbnNwYWNlLmNvbS9tYXRocy9nZW9tZXRyeS9yb3RhdGlvbnMvY29udmVyc2lvbnMvcXVhdGVybmlvblRvQW5nbGUvaW5kZXguaHRtXG5cblx0XHQvLyBxIGlzIGFzc3VtZWQgdG8gYmUgbm9ybWFsaXplZFxuXG5cdFx0dGhpcy53ID0gMiAqIE1hdGguYWNvcyggcS53ICk7XG5cblx0XHR2YXIgcyA9IE1hdGguc3FydCggMSAtIHEudyAqIHEudyApO1xuXG5cdFx0aWYgKCBzIDwgMC4wMDAxICkge1xuXG5cdFx0XHQgdGhpcy54ID0gMTtcblx0XHRcdCB0aGlzLnkgPSAwO1xuXHRcdFx0IHRoaXMueiA9IDA7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQgdGhpcy54ID0gcS54IC8gcztcblx0XHRcdCB0aGlzLnkgPSBxLnkgLyBzO1xuXHRcdFx0IHRoaXMueiA9IHEueiAvIHM7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldEF4aXNBbmdsZUZyb21Sb3RhdGlvbk1hdHJpeDogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0Ly8gaHR0cDovL3d3dy5ldWNsaWRlYW5zcGFjZS5jb20vbWF0aHMvZ2VvbWV0cnkvcm90YXRpb25zL2NvbnZlcnNpb25zL21hdHJpeFRvQW5nbGUvaW5kZXguaHRtXG5cblx0XHQvLyBhc3N1bWVzIHRoZSB1cHBlciAzeDMgb2YgbSBpcyBhIHB1cmUgcm90YXRpb24gbWF0cml4IChpLmUsIHVuc2NhbGVkKVxuXG5cdFx0dmFyIGFuZ2xlLCB4LCB5LCB6LFx0XHQvLyB2YXJpYWJsZXMgZm9yIHJlc3VsdFxuXHRcdFx0ZXBzaWxvbiA9IDAuMDEsXHRcdC8vIG1hcmdpbiB0byBhbGxvdyBmb3Igcm91bmRpbmcgZXJyb3JzXG5cdFx0XHRlcHNpbG9uMiA9IDAuMSxcdFx0Ly8gbWFyZ2luIHRvIGRpc3Rpbmd1aXNoIGJldHdlZW4gMCBhbmQgMTgwIGRlZ3JlZXNcblxuXHRcdFx0dGUgPSBtLmVsZW1lbnRzLFxuXG5cdFx0XHRtMTEgPSB0ZVsgMCBdLCBtMTIgPSB0ZVsgNCBdLCBtMTMgPSB0ZVsgOCBdLFxuXHRcdFx0bTIxID0gdGVbIDEgXSwgbTIyID0gdGVbIDUgXSwgbTIzID0gdGVbIDkgXSxcblx0XHRcdG0zMSA9IHRlWyAyIF0sIG0zMiA9IHRlWyA2IF0sIG0zMyA9IHRlWyAxMCBdO1xuXG5cdFx0aWYgKCAoIE1hdGguYWJzKCBtMTIgLSBtMjEgKSA8IGVwc2lsb24gKVxuXHRcdCAgICYmICggTWF0aC5hYnMoIG0xMyAtIG0zMSApIDwgZXBzaWxvbiApXG5cdFx0ICAgJiYgKCBNYXRoLmFicyggbTIzIC0gbTMyICkgPCBlcHNpbG9uICkgKSB7XG5cblx0XHRcdC8vIHNpbmd1bGFyaXR5IGZvdW5kXG5cdFx0XHQvLyBmaXJzdCBjaGVjayBmb3IgaWRlbnRpdHkgbWF0cml4IHdoaWNoIG11c3QgaGF2ZSArMSBmb3IgYWxsIHRlcm1zXG5cdFx0XHQvLyBpbiBsZWFkaW5nIGRpYWdvbmFsIGFuZCB6ZXJvIGluIG90aGVyIHRlcm1zXG5cblx0XHRcdGlmICggKCBNYXRoLmFicyggbTEyICsgbTIxICkgPCBlcHNpbG9uMiApXG5cdFx0XHQgICAmJiAoIE1hdGguYWJzKCBtMTMgKyBtMzEgKSA8IGVwc2lsb24yIClcblx0XHRcdCAgICYmICggTWF0aC5hYnMoIG0yMyArIG0zMiApIDwgZXBzaWxvbjIgKVxuXHRcdFx0ICAgJiYgKCBNYXRoLmFicyggbTExICsgbTIyICsgbTMzIC0gMyApIDwgZXBzaWxvbjIgKSApIHtcblxuXHRcdFx0XHQvLyB0aGlzIHNpbmd1bGFyaXR5IGlzIGlkZW50aXR5IG1hdHJpeCBzbyBhbmdsZSA9IDBcblxuXHRcdFx0XHR0aGlzLnNldCggMSwgMCwgMCwgMCApO1xuXG5cdFx0XHRcdHJldHVybiB0aGlzOyAvLyB6ZXJvIGFuZ2xlLCBhcmJpdHJhcnkgYXhpc1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIG90aGVyd2lzZSB0aGlzIHNpbmd1bGFyaXR5IGlzIGFuZ2xlID0gMTgwXG5cblx0XHRcdGFuZ2xlID0gTWF0aC5QSTtcblxuXHRcdFx0dmFyIHh4ID0gKCBtMTEgKyAxICkgLyAyO1xuXHRcdFx0dmFyIHl5ID0gKCBtMjIgKyAxICkgLyAyO1xuXHRcdFx0dmFyIHp6ID0gKCBtMzMgKyAxICkgLyAyO1xuXHRcdFx0dmFyIHh5ID0gKCBtMTIgKyBtMjEgKSAvIDQ7XG5cdFx0XHR2YXIgeHogPSAoIG0xMyArIG0zMSApIC8gNDtcblx0XHRcdHZhciB5eiA9ICggbTIzICsgbTMyICkgLyA0O1xuXG5cdFx0XHRpZiAoICggeHggPiB5eSApICYmICggeHggPiB6eiApICkgeyAvLyBtMTEgaXMgdGhlIGxhcmdlc3QgZGlhZ29uYWwgdGVybVxuXG5cdFx0XHRcdGlmICggeHggPCBlcHNpbG9uICkge1xuXG5cdFx0XHRcdFx0eCA9IDA7XG5cdFx0XHRcdFx0eSA9IDAuNzA3MTA2NzgxO1xuXHRcdFx0XHRcdHogPSAwLjcwNzEwNjc4MTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0eCA9IE1hdGguc3FydCggeHggKTtcblx0XHRcdFx0XHR5ID0geHkgLyB4O1xuXHRcdFx0XHRcdHogPSB4eiAvIHg7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2UgaWYgKCB5eSA+IHp6ICkgeyAvLyBtMjIgaXMgdGhlIGxhcmdlc3QgZGlhZ29uYWwgdGVybVxuXG5cdFx0XHRcdGlmICggeXkgPCBlcHNpbG9uICkge1xuXG5cdFx0XHRcdFx0eCA9IDAuNzA3MTA2NzgxO1xuXHRcdFx0XHRcdHkgPSAwO1xuXHRcdFx0XHRcdHogPSAwLjcwNzEwNjc4MTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0eSA9IE1hdGguc3FydCggeXkgKTtcblx0XHRcdFx0XHR4ID0geHkgLyB5O1xuXHRcdFx0XHRcdHogPSB5eiAvIHk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2UgeyAvLyBtMzMgaXMgdGhlIGxhcmdlc3QgZGlhZ29uYWwgdGVybSBzbyBiYXNlIHJlc3VsdCBvbiB0aGlzXG5cblx0XHRcdFx0aWYgKCB6eiA8IGVwc2lsb24gKSB7XG5cblx0XHRcdFx0XHR4ID0gMC43MDcxMDY3ODE7XG5cdFx0XHRcdFx0eSA9IDAuNzA3MTA2NzgxO1xuXHRcdFx0XHRcdHogPSAwO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHR6ID0gTWF0aC5zcXJ0KCB6eiApO1xuXHRcdFx0XHRcdHggPSB4eiAvIHo7XG5cdFx0XHRcdFx0eSA9IHl6IC8gejtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdFx0dGhpcy5zZXQoIHgsIHksIHosIGFuZ2xlICk7XG5cblx0XHRcdHJldHVybiB0aGlzOyAvLyByZXR1cm4gMTgwIGRlZyByb3RhdGlvblxuXG5cdFx0fVxuXG5cdFx0Ly8gYXMgd2UgaGF2ZSByZWFjaGVkIGhlcmUgdGhlcmUgYXJlIG5vIHNpbmd1bGFyaXRpZXMgc28gd2UgY2FuIGhhbmRsZSBub3JtYWxseVxuXG5cdFx0dmFyIHMgPSBNYXRoLnNxcnQoICggbTMyIC0gbTIzICkgKiAoIG0zMiAtIG0yMyApXG5cdFx0XHRcdFx0XHQgICsgKCBtMTMgLSBtMzEgKSAqICggbTEzIC0gbTMxIClcblx0XHRcdFx0XHRcdCAgKyAoIG0yMSAtIG0xMiApICogKCBtMjEgLSBtMTIgKSApOyAvLyB1c2VkIHRvIG5vcm1hbGl6ZVxuXG5cdFx0aWYgKCBNYXRoLmFicyggcyApIDwgMC4wMDEgKSBzID0gMTtcblxuXHRcdC8vIHByZXZlbnQgZGl2aWRlIGJ5IHplcm8sIHNob3VsZCBub3QgaGFwcGVuIGlmIG1hdHJpeCBpcyBvcnRob2dvbmFsIGFuZCBzaG91bGQgYmVcblx0XHQvLyBjYXVnaHQgYnkgc2luZ3VsYXJpdHkgdGVzdCBhYm92ZSwgYnV0IEkndmUgbGVmdCBpdCBpbiBqdXN0IGluIGNhc2VcblxuXHRcdHRoaXMueCA9ICggbTMyIC0gbTIzICkgLyBzO1xuXHRcdHRoaXMueSA9ICggbTEzIC0gbTMxICkgLyBzO1xuXHRcdHRoaXMueiA9ICggbTIxIC0gbTEyICkgLyBzO1xuXHRcdHRoaXMudyA9IE1hdGguYWNvcyggKCBtMTEgKyBtMjIgKyBtMzMgLSAxICkgLyAyICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1pbjogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0aWYgKCB0aGlzLnggPiB2LnggKSB7XG5cblx0XHRcdHRoaXMueCA9IHYueDtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy55ID4gdi55ICkge1xuXG5cdFx0XHR0aGlzLnkgPSB2Lnk7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMueiA+IHYueiApIHtcblxuXHRcdFx0dGhpcy56ID0gdi56O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLncgPiB2LncgKSB7XG5cblx0XHRcdHRoaXMudyA9IHYudztcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWF4OiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRpZiAoIHRoaXMueCA8IHYueCApIHtcblxuXHRcdFx0dGhpcy54ID0gdi54O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnkgPCB2LnkgKSB7XG5cblx0XHRcdHRoaXMueSA9IHYueTtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy56IDwgdi56ICkge1xuXG5cdFx0XHR0aGlzLnogPSB2Lno7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMudyA8IHYudyApIHtcblxuXHRcdFx0dGhpcy53ID0gdi53O1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjbGFtcDogZnVuY3Rpb24gKCBtaW4sIG1heCApIHtcblxuXHRcdC8vIFRoaXMgZnVuY3Rpb24gYXNzdW1lcyBtaW4gPCBtYXgsIGlmIHRoaXMgYXNzdW1wdGlvbiBpc24ndCB0cnVlIGl0IHdpbGwgbm90IG9wZXJhdGUgY29ycmVjdGx5XG5cblx0XHRpZiAoIHRoaXMueCA8IG1pbi54ICkge1xuXG5cdFx0XHR0aGlzLnggPSBtaW4ueDtcblxuXHRcdH0gZWxzZSBpZiAoIHRoaXMueCA+IG1heC54ICkge1xuXG5cdFx0XHR0aGlzLnggPSBtYXgueDtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy55IDwgbWluLnkgKSB7XG5cblx0XHRcdHRoaXMueSA9IG1pbi55O1xuXG5cdFx0fSBlbHNlIGlmICggdGhpcy55ID4gbWF4LnkgKSB7XG5cblx0XHRcdHRoaXMueSA9IG1heC55O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnogPCBtaW4ueiApIHtcblxuXHRcdFx0dGhpcy56ID0gbWluLno7XG5cblx0XHR9IGVsc2UgaWYgKCB0aGlzLnogPiBtYXgueiApIHtcblxuXHRcdFx0dGhpcy56ID0gbWF4Lno7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMudyA8IG1pbi53ICkge1xuXG5cdFx0XHR0aGlzLncgPSBtaW4udztcblxuXHRcdH0gZWxzZSBpZiAoIHRoaXMudyA+IG1heC53ICkge1xuXG5cdFx0XHR0aGlzLncgPSBtYXgudztcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2xhbXBTY2FsYXI6ICggZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIG1pbiwgbWF4O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggbWluVmFsLCBtYXhWYWwgKSB7XG5cblx0XHRcdGlmICggbWluID09PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0bWluID0gbmV3IFRIUkVFLlZlY3RvcjQoKTtcblx0XHRcdFx0bWF4ID0gbmV3IFRIUkVFLlZlY3RvcjQoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRtaW4uc2V0KCBtaW5WYWwsIG1pblZhbCwgbWluVmFsLCBtaW5WYWwgKTtcblx0XHRcdG1heC5zZXQoIG1heFZhbCwgbWF4VmFsLCBtYXhWYWwsIG1heFZhbCApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5jbGFtcCggbWluLCBtYXggKTtcblxuXHRcdH07XG5cblx0fSApKCksXG5cbiAgZmxvb3I6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9IE1hdGguZmxvb3IoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9IE1hdGguZmxvb3IoIHRoaXMueSApO1xuXHRcdHRoaXMueiA9IE1hdGguZmxvb3IoIHRoaXMueiApO1xuXHRcdHRoaXMudyA9IE1hdGguZmxvb3IoIHRoaXMudyApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cbiAgfSxcblxuICBjZWlsOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnggPSBNYXRoLmNlaWwoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9IE1hdGguY2VpbCggdGhpcy55ICk7XG5cdFx0dGhpcy56ID0gTWF0aC5jZWlsKCB0aGlzLnogKTtcblx0XHR0aGlzLncgPSBNYXRoLmNlaWwoIHRoaXMudyApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cbiAgfSxcblxuICByb3VuZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gTWF0aC5yb3VuZCggdGhpcy54ICk7XG5cdFx0dGhpcy55ID0gTWF0aC5yb3VuZCggdGhpcy55ICk7XG5cdFx0dGhpcy56ID0gTWF0aC5yb3VuZCggdGhpcy56ICk7XG5cdFx0dGhpcy53ID0gTWF0aC5yb3VuZCggdGhpcy53ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuICB9LFxuXG4gIHJvdW5kVG9aZXJvOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnggPSAoIHRoaXMueCA8IDAgKSA/IE1hdGguY2VpbCggdGhpcy54ICkgOiBNYXRoLmZsb29yKCB0aGlzLnggKTtcblx0XHR0aGlzLnkgPSAoIHRoaXMueSA8IDAgKSA/IE1hdGguY2VpbCggdGhpcy55ICkgOiBNYXRoLmZsb29yKCB0aGlzLnkgKTtcblx0XHR0aGlzLnogPSAoIHRoaXMueiA8IDAgKSA/IE1hdGguY2VpbCggdGhpcy56ICkgOiBNYXRoLmZsb29yKCB0aGlzLnogKTtcblx0XHR0aGlzLncgPSAoIHRoaXMudyA8IDAgKSA/IE1hdGguY2VpbCggdGhpcy53ICkgOiBNYXRoLmZsb29yKCB0aGlzLncgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG4gIH0sXG5cblx0bmVnYXRlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnggPSAtIHRoaXMueDtcblx0XHR0aGlzLnkgPSAtIHRoaXMueTtcblx0XHR0aGlzLnogPSAtIHRoaXMuejtcblx0XHR0aGlzLncgPSAtIHRoaXMudztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZG90OiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRyZXR1cm4gdGhpcy54ICogdi54ICsgdGhpcy55ICogdi55ICsgdGhpcy56ICogdi56ICsgdGhpcy53ICogdi53O1xuXG5cdH0sXG5cblx0bGVuZ3RoU3E6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkgKyB0aGlzLnogKiB0aGlzLnogKyB0aGlzLncgKiB0aGlzLnc7XG5cblx0fSxcblxuXHRsZW5ndGg6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBNYXRoLnNxcnQoIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSArIHRoaXMueiAqIHRoaXMueiArIHRoaXMudyAqIHRoaXMudyApO1xuXG5cdH0sXG5cblx0bGVuZ3RoTWFuaGF0dGFuOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gTWF0aC5hYnMoIHRoaXMueCApICsgTWF0aC5hYnMoIHRoaXMueSApICsgTWF0aC5hYnMoIHRoaXMueiApICsgTWF0aC5hYnMoIHRoaXMudyApO1xuXG5cdH0sXG5cblx0bm9ybWFsaXplOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5kaXZpZGVTY2FsYXIoIHRoaXMubGVuZ3RoKCkgKTtcblxuXHR9LFxuXG5cdHNldExlbmd0aDogZnVuY3Rpb24gKCBsICkge1xuXG5cdFx0dmFyIG9sZExlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XG5cblx0XHRpZiAoIG9sZExlbmd0aCAhPT0gMCAmJiBsICE9PSBvbGRMZW5ndGggKSB7XG5cblx0XHRcdHRoaXMubXVsdGlwbHlTY2FsYXIoIGwgLyBvbGRMZW5ndGggKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bGVycDogZnVuY3Rpb24gKCB2LCBhbHBoYSApIHtcblxuXHRcdHRoaXMueCArPSAoIHYueCAtIHRoaXMueCApICogYWxwaGE7XG5cdFx0dGhpcy55ICs9ICggdi55IC0gdGhpcy55ICkgKiBhbHBoYTtcblx0XHR0aGlzLnogKz0gKCB2LnogLSB0aGlzLnogKSAqIGFscGhhO1xuXHRcdHRoaXMudyArPSAoIHYudyAtIHRoaXMudyApICogYWxwaGE7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGxlcnBWZWN0b3JzOiBmdW5jdGlvbiAoIHYxLCB2MiwgYWxwaGEgKSB7XG5cblx0XHR0aGlzLnN1YlZlY3RvcnMoIHYyLCB2MSApLm11bHRpcGx5U2NhbGFyKCBhbHBoYSApLmFkZCggdjEgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZXF1YWxzOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRyZXR1cm4gKCAoIHYueCA9PT0gdGhpcy54ICkgJiYgKCB2LnkgPT09IHRoaXMueSApICYmICggdi56ID09PSB0aGlzLnogKSAmJiAoIHYudyA9PT0gdGhpcy53ICkgKTtcblxuXHR9LFxuXG5cdGZyb21BcnJheTogZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0ICkge1xuXG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHR0aGlzLnggPSBhcnJheVsgb2Zmc2V0IF07XG5cdFx0dGhpcy55ID0gYXJyYXlbIG9mZnNldCArIDEgXTtcblx0XHR0aGlzLnogPSBhcnJheVsgb2Zmc2V0ICsgMiBdO1xuXHRcdHRoaXMudyA9IGFycmF5WyBvZmZzZXQgKyAzIF07XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdGlmICggYXJyYXkgPT09IHVuZGVmaW5lZCApIGFycmF5ID0gW107XG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHRhcnJheVsgb2Zmc2V0IF0gPSB0aGlzLng7XG5cdFx0YXJyYXlbIG9mZnNldCArIDEgXSA9IHRoaXMueTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMiBdID0gdGhpcy56O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAzIF0gPSB0aGlzLnc7XG5cblx0XHRyZXR1cm4gYXJyYXk7XG5cblx0fSxcblxuXHRmcm9tQXR0cmlidXRlOiBmdW5jdGlvbiAoIGF0dHJpYnV0ZSwgaW5kZXgsIG9mZnNldCApIHtcblxuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0aW5kZXggPSBpbmRleCAqIGF0dHJpYnV0ZS5pdGVtU2l6ZSArIG9mZnNldDtcblxuXHRcdHRoaXMueCA9IGF0dHJpYnV0ZS5hcnJheVsgaW5kZXggXTtcblx0XHR0aGlzLnkgPSBhdHRyaWJ1dGUuYXJyYXlbIGluZGV4ICsgMSBdO1xuXHRcdHRoaXMueiA9IGF0dHJpYnV0ZS5hcnJheVsgaW5kZXggKyAyIF07XG5cdFx0dGhpcy53ID0gYXR0cmlidXRlLmFycmF5WyBpbmRleCArIDMgXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBuZXcgVEhSRUUuVmVjdG9yNCggdGhpcy54LCB0aGlzLnksIHRoaXMueiwgdGhpcy53ICk7XG5cblx0fVxuXG59O1xuXG4vLyBGaWxlOnNyYy9tYXRoL0V1bGVyLmpzXG5cbi8qKlxuICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbS9cbiAqIEBhdXRob3IgV2VzdExhbmdsZXkgLyBodHRwOi8vZ2l0aHViLmNvbS9XZXN0TGFuZ2xleVxuICogQGF1dGhvciBiaG91c3RvbiAvIGh0dHA6Ly9leG9jb3J0ZXguY29tXG4gKi9cblxuVEhSRUUuRXVsZXIgPSBmdW5jdGlvbiAoIHgsIHksIHosIG9yZGVyICkge1xuXG5cdHRoaXMuX3ggPSB4IHx8IDA7XG5cdHRoaXMuX3kgPSB5IHx8IDA7XG5cdHRoaXMuX3ogPSB6IHx8IDA7XG5cdHRoaXMuX29yZGVyID0gb3JkZXIgfHwgVEhSRUUuRXVsZXIuRGVmYXVsdE9yZGVyO1xuXG59O1xuXG5USFJFRS5FdWxlci5Sb3RhdGlvbk9yZGVycyA9IFsgJ1hZWicsICdZWlgnLCAnWlhZJywgJ1haWScsICdZWFonLCAnWllYJyBdO1xuXG5USFJFRS5FdWxlci5EZWZhdWx0T3JkZXIgPSAnWFlaJztcblxuVEhSRUUuRXVsZXIucHJvdG90eXBlID0ge1xuXG5cdGNvbnN0cnVjdG9yOiBUSFJFRS5FdWxlcixcblxuXHRfeDogMCwgX3k6IDAsIF96OiAwLCBfb3JkZXI6IFRIUkVFLkV1bGVyLkRlZmF1bHRPcmRlcixcblxuXHRnZXQgeCAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5feDtcblxuXHR9LFxuXG5cdHNldCB4ICggdmFsdWUgKSB7XG5cblx0XHR0aGlzLl94ID0gdmFsdWU7XG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0fSxcblxuXHRnZXQgeSAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5feTtcblxuXHR9LFxuXG5cdHNldCB5ICggdmFsdWUgKSB7XG5cblx0XHR0aGlzLl95ID0gdmFsdWU7XG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0fSxcblxuXHRnZXQgeiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5fejtcblxuXHR9LFxuXG5cdHNldCB6ICggdmFsdWUgKSB7XG5cblx0XHR0aGlzLl96ID0gdmFsdWU7XG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0fSxcblxuXHRnZXQgb3JkZXIgKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX29yZGVyO1xuXG5cdH0sXG5cblx0c2V0IG9yZGVyICggdmFsdWUgKSB7XG5cblx0XHR0aGlzLl9vcmRlciA9IHZhbHVlO1xuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdH0sXG5cblx0c2V0OiBmdW5jdGlvbiAoIHgsIHksIHosIG9yZGVyICkge1xuXG5cdFx0dGhpcy5feCA9IHg7XG5cdFx0dGhpcy5feSA9IHk7XG5cdFx0dGhpcy5feiA9IHo7XG5cdFx0dGhpcy5fb3JkZXIgPSBvcmRlciB8fCB0aGlzLl9vcmRlcjtcblxuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjb3B5OiBmdW5jdGlvbiAoIGV1bGVyICkge1xuXG5cdFx0dGhpcy5feCA9IGV1bGVyLl94O1xuXHRcdHRoaXMuX3kgPSBldWxlci5feTtcblx0XHR0aGlzLl96ID0gZXVsZXIuX3o7XG5cdFx0dGhpcy5fb3JkZXIgPSBldWxlci5fb3JkZXI7XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbVJvdGF0aW9uTWF0cml4OiBmdW5jdGlvbiAoIG0sIG9yZGVyLCB1cGRhdGUgKSB7XG5cblx0XHR2YXIgY2xhbXAgPSBUSFJFRS5NYXRoLmNsYW1wO1xuXG5cdFx0Ly8gYXNzdW1lcyB0aGUgdXBwZXIgM3gzIG9mIG0gaXMgYSBwdXJlIHJvdGF0aW9uIG1hdHJpeCAoaS5lLCB1bnNjYWxlZClcblxuXHRcdHZhciB0ZSA9IG0uZWxlbWVudHM7XG5cdFx0dmFyIG0xMSA9IHRlWyAwIF0sIG0xMiA9IHRlWyA0IF0sIG0xMyA9IHRlWyA4IF07XG5cdFx0dmFyIG0yMSA9IHRlWyAxIF0sIG0yMiA9IHRlWyA1IF0sIG0yMyA9IHRlWyA5IF07XG5cdFx0dmFyIG0zMSA9IHRlWyAyIF0sIG0zMiA9IHRlWyA2IF0sIG0zMyA9IHRlWyAxMCBdO1xuXG5cdFx0b3JkZXIgPSBvcmRlciB8fCB0aGlzLl9vcmRlcjtcblxuXHRcdGlmICggb3JkZXIgPT09ICdYWVonICkge1xuXG5cdFx0XHR0aGlzLl95ID0gTWF0aC5hc2luKCBjbGFtcCggbTEzLCAtIDEsIDEgKSApO1xuXG5cdFx0XHRpZiAoIE1hdGguYWJzKCBtMTMgKSA8IDAuOTk5OTkgKSB7XG5cblx0XHRcdFx0dGhpcy5feCA9IE1hdGguYXRhbjIoIC0gbTIzLCBtMzMgKTtcblx0XHRcdFx0dGhpcy5feiA9IE1hdGguYXRhbjIoIC0gbTEyLCBtMTEgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR0aGlzLl94ID0gTWF0aC5hdGFuMiggbTMyLCBtMjIgKTtcblx0XHRcdFx0dGhpcy5feiA9IDA7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSBpZiAoIG9yZGVyID09PSAnWVhaJyApIHtcblxuXHRcdFx0dGhpcy5feCA9IE1hdGguYXNpbiggLSBjbGFtcCggbTIzLCAtIDEsIDEgKSApO1xuXG5cdFx0XHRpZiAoIE1hdGguYWJzKCBtMjMgKSA8IDAuOTk5OTkgKSB7XG5cblx0XHRcdFx0dGhpcy5feSA9IE1hdGguYXRhbjIoIG0xMywgbTMzICk7XG5cdFx0XHRcdHRoaXMuX3ogPSBNYXRoLmF0YW4yKCBtMjEsIG0yMiApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHRoaXMuX3kgPSBNYXRoLmF0YW4yKCAtIG0zMSwgbTExICk7XG5cdFx0XHRcdHRoaXMuX3ogPSAwO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2UgaWYgKCBvcmRlciA9PT0gJ1pYWScgKSB7XG5cblx0XHRcdHRoaXMuX3ggPSBNYXRoLmFzaW4oIGNsYW1wKCBtMzIsIC0gMSwgMSApICk7XG5cblx0XHRcdGlmICggTWF0aC5hYnMoIG0zMiApIDwgMC45OTk5OSApIHtcblxuXHRcdFx0XHR0aGlzLl95ID0gTWF0aC5hdGFuMiggLSBtMzEsIG0zMyApO1xuXHRcdFx0XHR0aGlzLl96ID0gTWF0aC5hdGFuMiggLSBtMTIsIG0yMiApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHRoaXMuX3kgPSAwO1xuXHRcdFx0XHR0aGlzLl96ID0gTWF0aC5hdGFuMiggbTIxLCBtMTEgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIGlmICggb3JkZXIgPT09ICdaWVgnICkge1xuXG5cdFx0XHR0aGlzLl95ID0gTWF0aC5hc2luKCAtIGNsYW1wKCBtMzEsIC0gMSwgMSApICk7XG5cblx0XHRcdGlmICggTWF0aC5hYnMoIG0zMSApIDwgMC45OTk5OSApIHtcblxuXHRcdFx0XHR0aGlzLl94ID0gTWF0aC5hdGFuMiggbTMyLCBtMzMgKTtcblx0XHRcdFx0dGhpcy5feiA9IE1hdGguYXRhbjIoIG0yMSwgbTExICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0dGhpcy5feCA9IDA7XG5cdFx0XHRcdHRoaXMuX3ogPSBNYXRoLmF0YW4yKCAtIG0xMiwgbTIyICk7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSBpZiAoIG9yZGVyID09PSAnWVpYJyApIHtcblxuXHRcdFx0dGhpcy5feiA9IE1hdGguYXNpbiggY2xhbXAoIG0yMSwgLSAxLCAxICkgKTtcblxuXHRcdFx0aWYgKCBNYXRoLmFicyggbTIxICkgPCAwLjk5OTk5ICkge1xuXG5cdFx0XHRcdHRoaXMuX3ggPSBNYXRoLmF0YW4yKCAtIG0yMywgbTIyICk7XG5cdFx0XHRcdHRoaXMuX3kgPSBNYXRoLmF0YW4yKCAtIG0zMSwgbTExICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0dGhpcy5feCA9IDA7XG5cdFx0XHRcdHRoaXMuX3kgPSBNYXRoLmF0YW4yKCBtMTMsIG0zMyApO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2UgaWYgKCBvcmRlciA9PT0gJ1haWScgKSB7XG5cblx0XHRcdHRoaXMuX3ogPSBNYXRoLmFzaW4oIC0gY2xhbXAoIG0xMiwgLSAxLCAxICkgKTtcblxuXHRcdFx0aWYgKCBNYXRoLmFicyggbTEyICkgPCAwLjk5OTk5ICkge1xuXG5cdFx0XHRcdHRoaXMuX3ggPSBNYXRoLmF0YW4yKCBtMzIsIG0yMiApO1xuXHRcdFx0XHR0aGlzLl95ID0gTWF0aC5hdGFuMiggbTEzLCBtMTEgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR0aGlzLl94ID0gTWF0aC5hdGFuMiggLSBtMjMsIG0zMyApO1xuXHRcdFx0XHR0aGlzLl95ID0gMDtcblxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuRXVsZXI6IC5zZXRGcm9tUm90YXRpb25NYXRyaXgoKSBnaXZlbiB1bnN1cHBvcnRlZCBvcmRlcjogJyArIG9yZGVyIClcblxuXHRcdH1cblxuXHRcdHRoaXMuX29yZGVyID0gb3JkZXI7XG5cblx0XHRpZiAoIHVwZGF0ZSAhPT0gZmFsc2UgKSB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbVF1YXRlcm5pb246IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBtYXRyaXg7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBxLCBvcmRlciwgdXBkYXRlICkge1xuXG5cdFx0XHRpZiAoIG1hdHJpeCA9PT0gdW5kZWZpbmVkICkgbWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblx0XHRcdG1hdHJpeC5tYWtlUm90YXRpb25Gcm9tUXVhdGVybmlvbiggcSApO1xuXHRcdFx0dGhpcy5zZXRGcm9tUm90YXRpb25NYXRyaXgoIG1hdHJpeCwgb3JkZXIsIHVwZGF0ZSApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdHNldEZyb21WZWN0b3IzOiBmdW5jdGlvbiAoIHYsIG9yZGVyICkge1xuXG5cdFx0cmV0dXJuIHRoaXMuc2V0KCB2LngsIHYueSwgdi56LCBvcmRlciB8fCB0aGlzLl9vcmRlciApO1xuXG5cdH0sXG5cblx0cmVvcmRlcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gV0FSTklORzogdGhpcyBkaXNjYXJkcyByZXZvbHV0aW9uIGluZm9ybWF0aW9uIC1iaG91c3RvblxuXG5cdFx0dmFyIHEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggbmV3T3JkZXIgKSB7XG5cblx0XHRcdHEuc2V0RnJvbUV1bGVyKCB0aGlzICk7XG5cdFx0XHR0aGlzLnNldEZyb21RdWF0ZXJuaW9uKCBxLCBuZXdPcmRlciApO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0ZXF1YWxzOiBmdW5jdGlvbiAoIGV1bGVyICkge1xuXG5cdFx0cmV0dXJuICggZXVsZXIuX3ggPT09IHRoaXMuX3ggKSAmJiAoIGV1bGVyLl95ID09PSB0aGlzLl95ICkgJiYgKCBldWxlci5feiA9PT0gdGhpcy5feiApICYmICggZXVsZXIuX29yZGVyID09PSB0aGlzLl9vcmRlciApO1xuXG5cdH0sXG5cblx0ZnJvbUFycmF5OiBmdW5jdGlvbiAoIGFycmF5ICkge1xuXG5cdFx0dGhpcy5feCA9IGFycmF5WyAwIF07XG5cdFx0dGhpcy5feSA9IGFycmF5WyAxIF07XG5cdFx0dGhpcy5feiA9IGFycmF5WyAyIF07XG5cdFx0aWYgKCBhcnJheVsgMyBdICE9PSB1bmRlZmluZWQgKSB0aGlzLl9vcmRlciA9IGFycmF5WyAzIF07XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dG9BcnJheTogZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0ICkge1xuXG5cdFx0aWYgKCBhcnJheSA9PT0gdW5kZWZpbmVkICkgYXJyYXkgPSBbXTtcblx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblxuXHRcdGFycmF5WyBvZmZzZXQgXSA9IHRoaXMuX3g7XG5cdFx0YXJyYXlbIG9mZnNldCArIDEgXSA9IHRoaXMuX3k7XG5cdFx0YXJyYXlbIG9mZnNldCArIDIgXSA9IHRoaXMuX3o7XG5cdFx0YXJyYXlbIG9mZnNldCArIDMgXSA9IHRoaXMuX29yZGVyO1xuXG5cdFx0cmV0dXJuIGFycmF5O1xuXHR9LFxuXG5cdHRvVmVjdG9yMzogZnVuY3Rpb24gKCBvcHRpb25hbFJlc3VsdCApIHtcblxuXHRcdGlmICggb3B0aW9uYWxSZXN1bHQgKSB7XG5cblx0XHRcdHJldHVybiBvcHRpb25hbFJlc3VsdC5zZXQoIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3ogKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMyggdGhpcy5feCwgdGhpcy5feSwgdGhpcy5feiApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0b25DaGFuZ2U6IGZ1bmN0aW9uICggY2FsbGJhY2sgKSB7XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBjYWxsYmFjaztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25DaGFuZ2VDYWxsYmFjazogZnVuY3Rpb24gKCkge30sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBuZXcgVEhSRUUuRXVsZXIoIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3osIHRoaXMuX29yZGVyICk7XG5cblx0fVxuXG59O1xuXG4vLyBGaWxlOnNyYy9tYXRoL01hdHJpeDMuanNcblxuLyoqXG4gKiBAYXV0aG9yIGFsdGVyZWRxIC8gaHR0cDovL2FsdGVyZWRxdWFsaWEuY29tL1xuICogQGF1dGhvciBXZXN0TGFuZ2xleSAvIGh0dHA6Ly9naXRodWIuY29tL1dlc3RMYW5nbGV5XG4gKiBAYXV0aG9yIGJob3VzdG9uIC8gaHR0cDovL2V4b2NvcnRleC5jb21cbiAqL1xuXG5USFJFRS5NYXRyaXgzID0gZnVuY3Rpb24gKCkge1xuXG5cdHRoaXMuZWxlbWVudHMgPSBuZXcgRmxvYXQzMkFycmF5KCBbXG5cblx0XHQxLCAwLCAwLFxuXHRcdDAsIDEsIDAsXG5cdFx0MCwgMCwgMVxuXG5cdF0gKTtcblxuXHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPiAwICkge1xuXG5cdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLk1hdHJpeDM6IHRoZSBjb25zdHJ1Y3RvciBubyBsb25nZXIgcmVhZHMgYXJndW1lbnRzLiB1c2UgLnNldCgpIGluc3RlYWQuJyApO1xuXG5cdH1cblxufTtcblxuVEhSRUUuTWF0cml4My5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IFRIUkVFLk1hdHJpeDMsXG5cblx0c2V0OiBmdW5jdGlvbiAoIG4xMSwgbjEyLCBuMTMsIG4yMSwgbjIyLCBuMjMsIG4zMSwgbjMyLCBuMzMgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dGVbIDAgXSA9IG4xMTsgdGVbIDMgXSA9IG4xMjsgdGVbIDYgXSA9IG4xMztcblx0XHR0ZVsgMSBdID0gbjIxOyB0ZVsgNCBdID0gbjIyOyB0ZVsgNyBdID0gbjIzO1xuXHRcdHRlWyAyIF0gPSBuMzE7IHRlWyA1IF0gPSBuMzI7IHRlWyA4IF0gPSBuMzM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGlkZW50aXR5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnNldChcblxuXHRcdFx0MSwgMCwgMCxcblx0XHRcdDAsIDEsIDAsXG5cdFx0XHQwLCAwLCAxXG5cblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjb3B5OiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHR2YXIgbWUgPSBtLmVsZW1lbnRzO1xuXG5cdFx0dGhpcy5zZXQoXG5cblx0XHRcdG1lWyAwIF0sIG1lWyAzIF0sIG1lWyA2IF0sXG5cdFx0XHRtZVsgMSBdLCBtZVsgNCBdLCBtZVsgNyBdLFxuXHRcdFx0bWVbIDIgXSwgbWVbIDUgXSwgbWVbIDggXVxuXG5cdFx0KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlWZWN0b3IzOiBmdW5jdGlvbiAoIHZlY3RvciApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk1hdHJpeDM6IC5tdWx0aXBseVZlY3RvcjMoKSBoYXMgYmVlbiByZW1vdmVkLiBVc2UgdmVjdG9yLmFwcGx5TWF0cml4MyggbWF0cml4ICkgaW5zdGVhZC4nICk7XG5cdFx0cmV0dXJuIHZlY3Rvci5hcHBseU1hdHJpeDMoIHRoaXMgKTtcblxuXHR9LFxuXG5cdG11bHRpcGx5VmVjdG9yM0FycmF5OiBmdW5jdGlvbiAoIGEgKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5NYXRyaXgzOiAubXVsdGlwbHlWZWN0b3IzQXJyYXkoKSBoYXMgYmVlbiByZW5hbWVkLiBVc2UgbWF0cml4LmFwcGx5VG9WZWN0b3IzQXJyYXkoIGFycmF5ICkgaW5zdGVhZC4nICk7XG5cdFx0cmV0dXJuIHRoaXMuYXBwbHlUb1ZlY3RvcjNBcnJheSggYSApO1xuXG5cdH0sXG5cblx0YXBwbHlUb1ZlY3RvcjNBcnJheTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYxO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCwgbGVuZ3RoICkge1xuXG5cdFx0XHRpZiAoIHYxID09PSB1bmRlZmluZWQgKSB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblx0XHRcdGlmICggbGVuZ3RoID09PSB1bmRlZmluZWQgKSBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cblx0XHRcdGZvciAoIHZhciBpID0gMCwgaiA9IG9mZnNldDsgaSA8IGxlbmd0aDsgaSArPSAzLCBqICs9IDMgKSB7XG5cblx0XHRcdFx0djEuZnJvbUFycmF5KCBhcnJheSwgaiApO1xuXHRcdFx0XHR2MS5hcHBseU1hdHJpeDMoIHRoaXMgKTtcblx0XHRcdFx0djEudG9BcnJheSggYXJyYXksIGogKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYXJyYXk7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRhcHBseVRvQnVmZmVyOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdjE7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gYXBwbHlUb0J1ZmZlciggYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCApIHtcblxuXHRcdFx0aWYgKCB2MSA9PT0gdW5kZWZpbmVkICkgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cdFx0XHRpZiAoIGxlbmd0aCA9PT0gdW5kZWZpbmVkICkgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aCAvIGJ1ZmZlci5pdGVtU2l6ZTtcblxuXHRcdFx0Zm9yICggdmFyIGkgPSAwLCBqID0gb2Zmc2V0OyBpIDwgbGVuZ3RoOyBpICsrLCBqICsrICkge1xuXG5cdFx0XHRcdHYxLnggPSBidWZmZXIuZ2V0WCggaiApO1xuXHRcdFx0XHR2MS55ID0gYnVmZmVyLmdldFkoIGogKTtcblx0XHRcdFx0djEueiA9IGJ1ZmZlci5nZXRaKCBqICk7XG5cblx0XHRcdFx0djEuYXBwbHlNYXRyaXgzKCB0aGlzICk7XG5cblx0XHRcdFx0YnVmZmVyLnNldFhZWiggdjEueCwgdjEueSwgdjEueiApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBidWZmZXI7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRtdWx0aXBseVNjYWxhcjogZnVuY3Rpb24gKCBzICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHRlWyAwIF0gKj0gczsgdGVbIDMgXSAqPSBzOyB0ZVsgNiBdICo9IHM7XG5cdFx0dGVbIDEgXSAqPSBzOyB0ZVsgNCBdICo9IHM7IHRlWyA3IF0gKj0gcztcblx0XHR0ZVsgMiBdICo9IHM7IHRlWyA1IF0gKj0gczsgdGVbIDggXSAqPSBzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRkZXRlcm1pbmFudDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHZhciBhID0gdGVbIDAgXSwgYiA9IHRlWyAxIF0sIGMgPSB0ZVsgMiBdLFxuXHRcdFx0ZCA9IHRlWyAzIF0sIGUgPSB0ZVsgNCBdLCBmID0gdGVbIDUgXSxcblx0XHRcdGcgPSB0ZVsgNiBdLCBoID0gdGVbIDcgXSwgaSA9IHRlWyA4IF07XG5cblx0XHRyZXR1cm4gYSAqIGUgKiBpIC0gYSAqIGYgKiBoIC0gYiAqIGQgKiBpICsgYiAqIGYgKiBnICsgYyAqIGQgKiBoIC0gYyAqIGUgKiBnO1xuXG5cdH0sXG5cblx0Z2V0SW52ZXJzZTogZnVuY3Rpb24gKCBtYXRyaXgsIHRocm93T25JbnZlcnRpYmxlICkge1xuXG5cdFx0Ly8gaW5wdXQ6IFRIUkVFLk1hdHJpeDRcblx0XHQvLyAoIGJhc2VkIG9uIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC93ZWJnbC1tanMvIClcblxuXHRcdHZhciBtZSA9IG1hdHJpeC5lbGVtZW50cztcblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dGVbIDAgXSA9ICAgbWVbIDEwIF0gKiBtZVsgNSBdIC0gbWVbIDYgXSAqIG1lWyA5IF07XG5cdFx0dGVbIDEgXSA9IC0gbWVbIDEwIF0gKiBtZVsgMSBdICsgbWVbIDIgXSAqIG1lWyA5IF07XG5cdFx0dGVbIDIgXSA9ICAgbWVbIDYgXSAqIG1lWyAxIF0gLSBtZVsgMiBdICogbWVbIDUgXTtcblx0XHR0ZVsgMyBdID0gLSBtZVsgMTAgXSAqIG1lWyA0IF0gKyBtZVsgNiBdICogbWVbIDggXTtcblx0XHR0ZVsgNCBdID0gICBtZVsgMTAgXSAqIG1lWyAwIF0gLSBtZVsgMiBdICogbWVbIDggXTtcblx0XHR0ZVsgNSBdID0gLSBtZVsgNiBdICogbWVbIDAgXSArIG1lWyAyIF0gKiBtZVsgNCBdO1xuXHRcdHRlWyA2IF0gPSAgIG1lWyA5IF0gKiBtZVsgNCBdIC0gbWVbIDUgXSAqIG1lWyA4IF07XG5cdFx0dGVbIDcgXSA9IC0gbWVbIDkgXSAqIG1lWyAwIF0gKyBtZVsgMSBdICogbWVbIDggXTtcblx0XHR0ZVsgOCBdID0gICBtZVsgNSBdICogbWVbIDAgXSAtIG1lWyAxIF0gKiBtZVsgNCBdO1xuXG5cdFx0dmFyIGRldCA9IG1lWyAwIF0gKiB0ZVsgMCBdICsgbWVbIDEgXSAqIHRlWyAzIF0gKyBtZVsgMiBdICogdGVbIDYgXTtcblxuXHRcdC8vIG5vIGludmVyc2VcblxuXHRcdGlmICggZGV0ID09PSAwICkge1xuXG5cdFx0XHR2YXIgbXNnID0gXCJNYXRyaXgzLmdldEludmVyc2UoKTogY2FuJ3QgaW52ZXJ0IG1hdHJpeCwgZGV0ZXJtaW5hbnQgaXMgMFwiO1xuXG5cdFx0XHRpZiAoIHRocm93T25JbnZlcnRpYmxlIHx8IGZhbHNlICkge1xuXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvciggbXNnICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCBtc2cgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmlkZW50aXR5KCk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5tdWx0aXBseVNjYWxhciggMS4wIC8gZGV0ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRyYW5zcG9zZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHRtcCwgbSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR0bXAgPSBtWyAxIF07IG1bIDEgXSA9IG1bIDMgXTsgbVsgMyBdID0gdG1wO1xuXHRcdHRtcCA9IG1bIDIgXTsgbVsgMiBdID0gbVsgNiBdOyBtWyA2IF0gPSB0bXA7XG5cdFx0dG1wID0gbVsgNSBdOyBtWyA1IF0gPSBtWyA3IF07IG1bIDcgXSA9IHRtcDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZmxhdHRlblRvQXJyYXlPZmZzZXQ6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHRhcnJheVsgb2Zmc2V0ICAgICBdID0gdGVbIDAgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMSBdID0gdGVbIDEgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMiBdID0gdGVbIDIgXTtcblxuXHRcdGFycmF5WyBvZmZzZXQgKyAzIF0gPSB0ZVsgMyBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyA0IF0gPSB0ZVsgNCBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyA1IF0gPSB0ZVsgNSBdO1xuXG5cdFx0YXJyYXlbIG9mZnNldCArIDYgXSA9IHRlWyA2IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDcgXSA9IHRlWyA3IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDggXSAgPSB0ZVsgOCBdO1xuXG5cdFx0cmV0dXJuIGFycmF5O1xuXG5cdH0sXG5cblx0Z2V0Tm9ybWFsTWF0cml4OiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHQvLyBpbnB1dDogVEhSRUUuTWF0cml4NFxuXG5cdFx0dGhpcy5nZXRJbnZlcnNlKCBtICkudHJhbnNwb3NlKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRyYW5zcG9zZUludG9BcnJheTogZnVuY3Rpb24gKCByICkge1xuXG5cdFx0dmFyIG0gPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0clsgMCBdID0gbVsgMCBdO1xuXHRcdHJbIDEgXSA9IG1bIDMgXTtcblx0XHRyWyAyIF0gPSBtWyA2IF07XG5cdFx0clsgMyBdID0gbVsgMSBdO1xuXHRcdHJbIDQgXSA9IG1bIDQgXTtcblx0XHRyWyA1IF0gPSBtWyA3IF07XG5cdFx0clsgNiBdID0gbVsgMiBdO1xuXHRcdHJbIDcgXSA9IG1bIDUgXTtcblx0XHRyWyA4IF0gPSBtWyA4IF07XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGZyb21BcnJheTogZnVuY3Rpb24gKCBhcnJheSApIHtcblxuXHRcdHRoaXMuZWxlbWVudHMuc2V0KCBhcnJheSApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0cmV0dXJuIFtcblx0XHRcdHRlWyAwIF0sIHRlWyAxIF0sIHRlWyAyIF0sXG5cdFx0XHR0ZVsgMyBdLCB0ZVsgNCBdLCB0ZVsgNSBdLFxuXHRcdFx0dGVbIDYgXSwgdGVbIDcgXSwgdGVbIDggXVxuXHRcdF07XG5cblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIG5ldyBUSFJFRS5NYXRyaXgzKCkuZnJvbUFycmF5KCB0aGlzLmVsZW1lbnRzICk7XG5cblx0fVxuXG59O1xuXG4vLyBGaWxlOnNyYy9tYXRoL01hdHJpeDQuanNcblxuLyoqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICogQGF1dGhvciBzdXBlcmVnZ2JlcnQgLyBodHRwOi8vd3d3LnBhdWxicnVudC5jby51ay9cbiAqIEBhdXRob3IgcGhpbG9nYiAvIGh0dHA6Ly9ibG9nLnRoZWppdC5vcmcvXG4gKiBAYXV0aG9yIGpvcmRpX3JvcyAvIGh0dHA6Ly9wbGF0dHNvZnQuY29tXG4gKiBAYXV0aG9yIEQxcGxvMWQgLyBodHRwOi8vZ2l0aHViLmNvbS9EMXBsbzFkXG4gKiBAYXV0aG9yIGFsdGVyZWRxIC8gaHR0cDovL2FsdGVyZWRxdWFsaWEuY29tL1xuICogQGF1dGhvciBtaWthZWwgZW10aW5nZXIgLyBodHRwOi8vZ29tby5zZS9cbiAqIEBhdXRob3IgdGlta25pcCAvIGh0dHA6Ly93d3cuZmxvb3JwbGFubmVyLmNvbS9cbiAqIEBhdXRob3IgYmhvdXN0b24gLyBodHRwOi8vZXhvY29ydGV4LmNvbVxuICogQGF1dGhvciBXZXN0TGFuZ2xleSAvIGh0dHA6Ly9naXRodWIuY29tL1dlc3RMYW5nbGV5XG4gKi9cblxuVEhSRUUuTWF0cml4NCA9IGZ1bmN0aW9uICgpIHtcblxuXHR0aGlzLmVsZW1lbnRzID0gbmV3IEZsb2F0MzJBcnJheSggW1xuXG5cdFx0MSwgMCwgMCwgMCxcblx0XHQwLCAxLCAwLCAwLFxuXHRcdDAsIDAsIDEsIDAsXG5cdFx0MCwgMCwgMCwgMVxuXG5cdF0gKTtcblxuXHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPiAwICkge1xuXG5cdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLk1hdHJpeDQ6IHRoZSBjb25zdHJ1Y3RvciBubyBsb25nZXIgcmVhZHMgYXJndW1lbnRzLiB1c2UgLnNldCgpIGluc3RlYWQuJyApO1xuXG5cdH1cblxufTtcblxuVEhSRUUuTWF0cml4NC5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IFRIUkVFLk1hdHJpeDQsXG5cblx0c2V0OiBmdW5jdGlvbiAoIG4xMSwgbjEyLCBuMTMsIG4xNCwgbjIxLCBuMjIsIG4yMywgbjI0LCBuMzEsIG4zMiwgbjMzLCBuMzQsIG40MSwgbjQyLCBuNDMsIG40NCApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR0ZVsgMCBdID0gbjExOyB0ZVsgNCBdID0gbjEyOyB0ZVsgOCBdID0gbjEzOyB0ZVsgMTIgXSA9IG4xNDtcblx0XHR0ZVsgMSBdID0gbjIxOyB0ZVsgNSBdID0gbjIyOyB0ZVsgOSBdID0gbjIzOyB0ZVsgMTMgXSA9IG4yNDtcblx0XHR0ZVsgMiBdID0gbjMxOyB0ZVsgNiBdID0gbjMyOyB0ZVsgMTAgXSA9IG4zMzsgdGVbIDE0IF0gPSBuMzQ7XG5cdFx0dGVbIDMgXSA9IG40MTsgdGVbIDcgXSA9IG40MjsgdGVbIDExIF0gPSBuNDM7IHRlWyAxNSBdID0gbjQ0O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRpZGVudGl0eTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5zZXQoXG5cblx0XHRcdDEsIDAsIDAsIDAsXG5cdFx0XHQwLCAxLCAwLCAwLFxuXHRcdFx0MCwgMCwgMSwgMCxcblx0XHRcdDAsIDAsIDAsIDFcblxuXHRcdCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNvcHk6IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdHRoaXMuZWxlbWVudHMuc2V0KCBtLmVsZW1lbnRzICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGV4dHJhY3RQb3NpdGlvbjogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuTWF0cml4NDogLmV4dHJhY3RQb3NpdGlvbigpIGhhcyBiZWVuIHJlbmFtZWQgdG8gLmNvcHlQb3NpdGlvbigpLicgKTtcblx0XHRyZXR1cm4gdGhpcy5jb3B5UG9zaXRpb24oIG0gKTtcblxuXHR9LFxuXG5cdGNvcHlQb3NpdGlvbjogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblx0XHR2YXIgbWUgPSBtLmVsZW1lbnRzO1xuXG5cdFx0dGVbIDEyIF0gPSBtZVsgMTIgXTtcblx0XHR0ZVsgMTMgXSA9IG1lWyAxMyBdO1xuXHRcdHRlWyAxNCBdID0gbWVbIDE0IF07XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGV4dHJhY3RCYXNpczogZnVuY3Rpb24gKCB4QXhpcywgeUF4aXMsIHpBeGlzICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHhBeGlzLnNldCggdGVbIDAgXSwgdGVbIDEgXSwgdGVbIDIgXSApO1xuXHRcdHlBeGlzLnNldCggdGVbIDQgXSwgdGVbIDUgXSwgdGVbIDYgXSApO1xuXHRcdHpBeGlzLnNldCggdGVbIDggXSwgdGVbIDkgXSwgdGVbIDEwIF0gKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWFrZUJhc2lzOiBmdW5jdGlvbiAoIHhBeGlzLCB5QXhpcywgekF4aXMgKSB7XG5cblx0XHR0aGlzLnNldChcblx0XHRcdHhBeGlzLngsIHlBeGlzLngsIHpBeGlzLngsIDAsXG5cdFx0XHR4QXhpcy55LCB5QXhpcy55LCB6QXhpcy55LCAwLFxuXHRcdFx0eEF4aXMueiwgeUF4aXMueiwgekF4aXMueiwgMCxcblx0XHRcdDAsICAgICAgIDAsICAgICAgIDAsICAgICAgIDFcblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRleHRyYWN0Um90YXRpb246IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHRcdGlmICggdjEgPT09IHVuZGVmaW5lZCApIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblx0XHRcdHZhciBtZSA9IG0uZWxlbWVudHM7XG5cblx0XHRcdHZhciBzY2FsZVggPSAxIC8gdjEuc2V0KCBtZVsgMCBdLCBtZVsgMSBdLCBtZVsgMiBdICkubGVuZ3RoKCk7XG5cdFx0XHR2YXIgc2NhbGVZID0gMSAvIHYxLnNldCggbWVbIDQgXSwgbWVbIDUgXSwgbWVbIDYgXSApLmxlbmd0aCgpO1xuXHRcdFx0dmFyIHNjYWxlWiA9IDEgLyB2MS5zZXQoIG1lWyA4IF0sIG1lWyA5IF0sIG1lWyAxMCBdICkubGVuZ3RoKCk7XG5cblx0XHRcdHRlWyAwIF0gPSBtZVsgMCBdICogc2NhbGVYO1xuXHRcdFx0dGVbIDEgXSA9IG1lWyAxIF0gKiBzY2FsZVg7XG5cdFx0XHR0ZVsgMiBdID0gbWVbIDIgXSAqIHNjYWxlWDtcblxuXHRcdFx0dGVbIDQgXSA9IG1lWyA0IF0gKiBzY2FsZVk7XG5cdFx0XHR0ZVsgNSBdID0gbWVbIDUgXSAqIHNjYWxlWTtcblx0XHRcdHRlWyA2IF0gPSBtZVsgNiBdICogc2NhbGVZO1xuXG5cdFx0XHR0ZVsgOCBdID0gbWVbIDggXSAqIHNjYWxlWjtcblx0XHRcdHRlWyA5IF0gPSBtZVsgOSBdICogc2NhbGVaO1xuXHRcdFx0dGVbIDEwIF0gPSBtZVsgMTAgXSAqIHNjYWxlWjtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRtYWtlUm90YXRpb25Gcm9tRXVsZXI6IGZ1bmN0aW9uICggZXVsZXIgKSB7XG5cblx0XHRpZiAoIGV1bGVyIGluc3RhbmNlb2YgVEhSRUUuRXVsZXIgPT09IGZhbHNlICkge1xuXG5cdFx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuTWF0cml4OiAubWFrZVJvdGF0aW9uRnJvbUV1bGVyKCkgbm93IGV4cGVjdHMgYSBFdWxlciByb3RhdGlvbiByYXRoZXIgdGhhbiBhIFZlY3RvcjMgYW5kIG9yZGVyLicgKTtcblxuXHRcdH1cblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR2YXIgeCA9IGV1bGVyLngsIHkgPSBldWxlci55LCB6ID0gZXVsZXIuejtcblx0XHR2YXIgYSA9IE1hdGguY29zKCB4ICksIGIgPSBNYXRoLnNpbiggeCApO1xuXHRcdHZhciBjID0gTWF0aC5jb3MoIHkgKSwgZCA9IE1hdGguc2luKCB5ICk7XG5cdFx0dmFyIGUgPSBNYXRoLmNvcyggeiApLCBmID0gTWF0aC5zaW4oIHogKTtcblxuXHRcdGlmICggZXVsZXIub3JkZXIgPT09ICdYWVonICkge1xuXG5cdFx0XHR2YXIgYWUgPSBhICogZSwgYWYgPSBhICogZiwgYmUgPSBiICogZSwgYmYgPSBiICogZjtcblxuXHRcdFx0dGVbIDAgXSA9IGMgKiBlO1xuXHRcdFx0dGVbIDQgXSA9IC0gYyAqIGY7XG5cdFx0XHR0ZVsgOCBdID0gZDtcblxuXHRcdFx0dGVbIDEgXSA9IGFmICsgYmUgKiBkO1xuXHRcdFx0dGVbIDUgXSA9IGFlIC0gYmYgKiBkO1xuXHRcdFx0dGVbIDkgXSA9IC0gYiAqIGM7XG5cblx0XHRcdHRlWyAyIF0gPSBiZiAtIGFlICogZDtcblx0XHRcdHRlWyA2IF0gPSBiZSArIGFmICogZDtcblx0XHRcdHRlWyAxMCBdID0gYSAqIGM7XG5cblx0XHR9IGVsc2UgaWYgKCBldWxlci5vcmRlciA9PT0gJ1lYWicgKSB7XG5cblx0XHRcdHZhciBjZSA9IGMgKiBlLCBjZiA9IGMgKiBmLCBkZSA9IGQgKiBlLCBkZiA9IGQgKiBmO1xuXG5cdFx0XHR0ZVsgMCBdID0gY2UgKyBkZiAqIGI7XG5cdFx0XHR0ZVsgNCBdID0gZGUgKiBiIC0gY2Y7XG5cdFx0XHR0ZVsgOCBdID0gYSAqIGQ7XG5cblx0XHRcdHRlWyAxIF0gPSBhICogZjtcblx0XHRcdHRlWyA1IF0gPSBhICogZTtcblx0XHRcdHRlWyA5IF0gPSAtIGI7XG5cblx0XHRcdHRlWyAyIF0gPSBjZiAqIGIgLSBkZTtcblx0XHRcdHRlWyA2IF0gPSBkZiArIGNlICogYjtcblx0XHRcdHRlWyAxMCBdID0gYSAqIGM7XG5cblx0XHR9IGVsc2UgaWYgKCBldWxlci5vcmRlciA9PT0gJ1pYWScgKSB7XG5cblx0XHRcdHZhciBjZSA9IGMgKiBlLCBjZiA9IGMgKiBmLCBkZSA9IGQgKiBlLCBkZiA9IGQgKiBmO1xuXG5cdFx0XHR0ZVsgMCBdID0gY2UgLSBkZiAqIGI7XG5cdFx0XHR0ZVsgNCBdID0gLSBhICogZjtcblx0XHRcdHRlWyA4IF0gPSBkZSArIGNmICogYjtcblxuXHRcdFx0dGVbIDEgXSA9IGNmICsgZGUgKiBiO1xuXHRcdFx0dGVbIDUgXSA9IGEgKiBlO1xuXHRcdFx0dGVbIDkgXSA9IGRmIC0gY2UgKiBiO1xuXG5cdFx0XHR0ZVsgMiBdID0gLSBhICogZDtcblx0XHRcdHRlWyA2IF0gPSBiO1xuXHRcdFx0dGVbIDEwIF0gPSBhICogYztcblxuXHRcdH0gZWxzZSBpZiAoIGV1bGVyLm9yZGVyID09PSAnWllYJyApIHtcblxuXHRcdFx0dmFyIGFlID0gYSAqIGUsIGFmID0gYSAqIGYsIGJlID0gYiAqIGUsIGJmID0gYiAqIGY7XG5cblx0XHRcdHRlWyAwIF0gPSBjICogZTtcblx0XHRcdHRlWyA0IF0gPSBiZSAqIGQgLSBhZjtcblx0XHRcdHRlWyA4IF0gPSBhZSAqIGQgKyBiZjtcblxuXHRcdFx0dGVbIDEgXSA9IGMgKiBmO1xuXHRcdFx0dGVbIDUgXSA9IGJmICogZCArIGFlO1xuXHRcdFx0dGVbIDkgXSA9IGFmICogZCAtIGJlO1xuXG5cdFx0XHR0ZVsgMiBdID0gLSBkO1xuXHRcdFx0dGVbIDYgXSA9IGIgKiBjO1xuXHRcdFx0dGVbIDEwIF0gPSBhICogYztcblxuXHRcdH0gZWxzZSBpZiAoIGV1bGVyLm9yZGVyID09PSAnWVpYJyApIHtcblxuXHRcdFx0dmFyIGFjID0gYSAqIGMsIGFkID0gYSAqIGQsIGJjID0gYiAqIGMsIGJkID0gYiAqIGQ7XG5cblx0XHRcdHRlWyAwIF0gPSBjICogZTtcblx0XHRcdHRlWyA0IF0gPSBiZCAtIGFjICogZjtcblx0XHRcdHRlWyA4IF0gPSBiYyAqIGYgKyBhZDtcblxuXHRcdFx0dGVbIDEgXSA9IGY7XG5cdFx0XHR0ZVsgNSBdID0gYSAqIGU7XG5cdFx0XHR0ZVsgOSBdID0gLSBiICogZTtcblxuXHRcdFx0dGVbIDIgXSA9IC0gZCAqIGU7XG5cdFx0XHR0ZVsgNiBdID0gYWQgKiBmICsgYmM7XG5cdFx0XHR0ZVsgMTAgXSA9IGFjIC0gYmQgKiBmO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdYWlknICkge1xuXG5cdFx0XHR2YXIgYWMgPSBhICogYywgYWQgPSBhICogZCwgYmMgPSBiICogYywgYmQgPSBiICogZDtcblxuXHRcdFx0dGVbIDAgXSA9IGMgKiBlO1xuXHRcdFx0dGVbIDQgXSA9IC0gZjtcblx0XHRcdHRlWyA4IF0gPSBkICogZTtcblxuXHRcdFx0dGVbIDEgXSA9IGFjICogZiArIGJkO1xuXHRcdFx0dGVbIDUgXSA9IGEgKiBlO1xuXHRcdFx0dGVbIDkgXSA9IGFkICogZiAtIGJjO1xuXG5cdFx0XHR0ZVsgMiBdID0gYmMgKiBmIC0gYWQ7XG5cdFx0XHR0ZVsgNiBdID0gYiAqIGU7XG5cdFx0XHR0ZVsgMTAgXSA9IGJkICogZiArIGFjO1xuXG5cdFx0fVxuXG5cdFx0Ly8gbGFzdCBjb2x1bW5cblx0XHR0ZVsgMyBdID0gMDtcblx0XHR0ZVsgNyBdID0gMDtcblx0XHR0ZVsgMTEgXSA9IDA7XG5cblx0XHQvLyBib3R0b20gcm93XG5cdFx0dGVbIDEyIF0gPSAwO1xuXHRcdHRlWyAxMyBdID0gMDtcblx0XHR0ZVsgMTQgXSA9IDA7XG5cdFx0dGVbIDE1IF0gPSAxO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRSb3RhdGlvbkZyb21RdWF0ZXJuaW9uOiBmdW5jdGlvbiAoIHEgKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5NYXRyaXg0OiAuc2V0Um90YXRpb25Gcm9tUXVhdGVybmlvbigpIGhhcyBiZWVuIHJlbmFtZWQgdG8gLm1ha2VSb3RhdGlvbkZyb21RdWF0ZXJuaW9uKCkuJyApO1xuXG5cdFx0cmV0dXJuIHRoaXMubWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb24oIHEgKTtcblxuXHR9LFxuXG5cdG1ha2VSb3RhdGlvbkZyb21RdWF0ZXJuaW9uOiBmdW5jdGlvbiAoIHEgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dmFyIHggPSBxLngsIHkgPSBxLnksIHogPSBxLnosIHcgPSBxLnc7XG5cdFx0dmFyIHgyID0geCArIHgsIHkyID0geSArIHksIHoyID0geiArIHo7XG5cdFx0dmFyIHh4ID0geCAqIHgyLCB4eSA9IHggKiB5MiwgeHogPSB4ICogejI7XG5cdFx0dmFyIHl5ID0geSAqIHkyLCB5eiA9IHkgKiB6MiwgenogPSB6ICogejI7XG5cdFx0dmFyIHd4ID0gdyAqIHgyLCB3eSA9IHcgKiB5Miwgd3ogPSB3ICogejI7XG5cblx0XHR0ZVsgMCBdID0gMSAtICggeXkgKyB6eiApO1xuXHRcdHRlWyA0IF0gPSB4eSAtIHd6O1xuXHRcdHRlWyA4IF0gPSB4eiArIHd5O1xuXG5cdFx0dGVbIDEgXSA9IHh5ICsgd3o7XG5cdFx0dGVbIDUgXSA9IDEgLSAoIHh4ICsgenogKTtcblx0XHR0ZVsgOSBdID0geXogLSB3eDtcblxuXHRcdHRlWyAyIF0gPSB4eiAtIHd5O1xuXHRcdHRlWyA2IF0gPSB5eiArIHd4O1xuXHRcdHRlWyAxMCBdID0gMSAtICggeHggKyB5eSApO1xuXG5cdFx0Ly8gbGFzdCBjb2x1bW5cblx0XHR0ZVsgMyBdID0gMDtcblx0XHR0ZVsgNyBdID0gMDtcblx0XHR0ZVsgMTEgXSA9IDA7XG5cblx0XHQvLyBib3R0b20gcm93XG5cdFx0dGVbIDEyIF0gPSAwO1xuXHRcdHRlWyAxMyBdID0gMDtcblx0XHR0ZVsgMTQgXSA9IDA7XG5cdFx0dGVbIDE1IF0gPSAxO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRsb29rQXQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB4LCB5LCB6O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggZXllLCB0YXJnZXQsIHVwICkge1xuXG5cdFx0XHRpZiAoIHggPT09IHVuZGVmaW5lZCApIHggPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0aWYgKCB5ID09PSB1bmRlZmluZWQgKSB5ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdGlmICggeiA9PT0gdW5kZWZpbmVkICkgeiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHRcdHouc3ViVmVjdG9ycyggZXllLCB0YXJnZXQgKS5ub3JtYWxpemUoKTtcblxuXHRcdFx0aWYgKCB6Lmxlbmd0aCgpID09PSAwICkge1xuXG5cdFx0XHRcdHoueiA9IDE7XG5cblx0XHRcdH1cblxuXHRcdFx0eC5jcm9zc1ZlY3RvcnMoIHVwLCB6ICkubm9ybWFsaXplKCk7XG5cblx0XHRcdGlmICggeC5sZW5ndGgoKSA9PT0gMCApIHtcblxuXHRcdFx0XHR6LnggKz0gMC4wMDAxO1xuXHRcdFx0XHR4LmNyb3NzVmVjdG9ycyggdXAsIHogKS5ub3JtYWxpemUoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHR5LmNyb3NzVmVjdG9ycyggeiwgeCApO1xuXG5cblx0XHRcdHRlWyAwIF0gPSB4Lng7IHRlWyA0IF0gPSB5Lng7IHRlWyA4IF0gPSB6Lng7XG5cdFx0XHR0ZVsgMSBdID0geC55OyB0ZVsgNSBdID0geS55OyB0ZVsgOSBdID0gei55O1xuXHRcdFx0dGVbIDIgXSA9IHguejsgdGVbIDYgXSA9IHkuejsgdGVbIDEwIF0gPSB6Lno7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0bXVsdGlwbHk6IGZ1bmN0aW9uICggbSwgbiApIHtcblxuXHRcdGlmICggbiAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5NYXRyaXg0OiAubXVsdGlwbHkoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5tdWx0aXBseU1hdHJpY2VzKCBhLCBiICkgaW5zdGVhZC4nICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5tdWx0aXBseU1hdHJpY2VzKCBtLCBuICk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5tdWx0aXBseU1hdHJpY2VzKCB0aGlzLCBtICk7XG5cblx0fSxcblxuXHRtdWx0aXBseU1hdHJpY2VzOiBmdW5jdGlvbiAoIGEsIGIgKSB7XG5cblx0XHR2YXIgYWUgPSBhLmVsZW1lbnRzO1xuXHRcdHZhciBiZSA9IGIuZWxlbWVudHM7XG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHZhciBhMTEgPSBhZVsgMCBdLCBhMTIgPSBhZVsgNCBdLCBhMTMgPSBhZVsgOCBdLCBhMTQgPSBhZVsgMTIgXTtcblx0XHR2YXIgYTIxID0gYWVbIDEgXSwgYTIyID0gYWVbIDUgXSwgYTIzID0gYWVbIDkgXSwgYTI0ID0gYWVbIDEzIF07XG5cdFx0dmFyIGEzMSA9IGFlWyAyIF0sIGEzMiA9IGFlWyA2IF0sIGEzMyA9IGFlWyAxMCBdLCBhMzQgPSBhZVsgMTQgXTtcblx0XHR2YXIgYTQxID0gYWVbIDMgXSwgYTQyID0gYWVbIDcgXSwgYTQzID0gYWVbIDExIF0sIGE0NCA9IGFlWyAxNSBdO1xuXG5cdFx0dmFyIGIxMSA9IGJlWyAwIF0sIGIxMiA9IGJlWyA0IF0sIGIxMyA9IGJlWyA4IF0sIGIxNCA9IGJlWyAxMiBdO1xuXHRcdHZhciBiMjEgPSBiZVsgMSBdLCBiMjIgPSBiZVsgNSBdLCBiMjMgPSBiZVsgOSBdLCBiMjQgPSBiZVsgMTMgXTtcblx0XHR2YXIgYjMxID0gYmVbIDIgXSwgYjMyID0gYmVbIDYgXSwgYjMzID0gYmVbIDEwIF0sIGIzNCA9IGJlWyAxNCBdO1xuXHRcdHZhciBiNDEgPSBiZVsgMyBdLCBiNDIgPSBiZVsgNyBdLCBiNDMgPSBiZVsgMTEgXSwgYjQ0ID0gYmVbIDE1IF07XG5cblx0XHR0ZVsgMCBdID0gYTExICogYjExICsgYTEyICogYjIxICsgYTEzICogYjMxICsgYTE0ICogYjQxO1xuXHRcdHRlWyA0IF0gPSBhMTEgKiBiMTIgKyBhMTIgKiBiMjIgKyBhMTMgKiBiMzIgKyBhMTQgKiBiNDI7XG5cdFx0dGVbIDggXSA9IGExMSAqIGIxMyArIGExMiAqIGIyMyArIGExMyAqIGIzMyArIGExNCAqIGI0Mztcblx0XHR0ZVsgMTIgXSA9IGExMSAqIGIxNCArIGExMiAqIGIyNCArIGExMyAqIGIzNCArIGExNCAqIGI0NDtcblxuXHRcdHRlWyAxIF0gPSBhMjEgKiBiMTEgKyBhMjIgKiBiMjEgKyBhMjMgKiBiMzEgKyBhMjQgKiBiNDE7XG5cdFx0dGVbIDUgXSA9IGEyMSAqIGIxMiArIGEyMiAqIGIyMiArIGEyMyAqIGIzMiArIGEyNCAqIGI0Mjtcblx0XHR0ZVsgOSBdID0gYTIxICogYjEzICsgYTIyICogYjIzICsgYTIzICogYjMzICsgYTI0ICogYjQzO1xuXHRcdHRlWyAxMyBdID0gYTIxICogYjE0ICsgYTIyICogYjI0ICsgYTIzICogYjM0ICsgYTI0ICogYjQ0O1xuXG5cdFx0dGVbIDIgXSA9IGEzMSAqIGIxMSArIGEzMiAqIGIyMSArIGEzMyAqIGIzMSArIGEzNCAqIGI0MTtcblx0XHR0ZVsgNiBdID0gYTMxICogYjEyICsgYTMyICogYjIyICsgYTMzICogYjMyICsgYTM0ICogYjQyO1xuXHRcdHRlWyAxMCBdID0gYTMxICogYjEzICsgYTMyICogYjIzICsgYTMzICogYjMzICsgYTM0ICogYjQzO1xuXHRcdHRlWyAxNCBdID0gYTMxICogYjE0ICsgYTMyICogYjI0ICsgYTMzICogYjM0ICsgYTM0ICogYjQ0O1xuXG5cdFx0dGVbIDMgXSA9IGE0MSAqIGIxMSArIGE0MiAqIGIyMSArIGE0MyAqIGIzMSArIGE0NCAqIGI0MTtcblx0XHR0ZVsgNyBdID0gYTQxICogYjEyICsgYTQyICogYjIyICsgYTQzICogYjMyICsgYTQ0ICogYjQyO1xuXHRcdHRlWyAxMSBdID0gYTQxICogYjEzICsgYTQyICogYjIzICsgYTQzICogYjMzICsgYTQ0ICogYjQzO1xuXHRcdHRlWyAxNSBdID0gYTQxICogYjE0ICsgYTQyICogYjI0ICsgYTQzICogYjM0ICsgYTQ0ICogYjQ0O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtdWx0aXBseVRvQXJyYXk6IGZ1bmN0aW9uICggYSwgYiwgciApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR0aGlzLm11bHRpcGx5TWF0cmljZXMoIGEsIGIgKTtcblxuXHRcdHJbIDAgXSA9IHRlWyAwIF07IHJbIDEgXSA9IHRlWyAxIF07IHJbIDIgXSA9IHRlWyAyIF07IHJbIDMgXSA9IHRlWyAzIF07XG5cdFx0clsgNCBdID0gdGVbIDQgXTsgclsgNSBdID0gdGVbIDUgXTsgclsgNiBdID0gdGVbIDYgXTsgclsgNyBdID0gdGVbIDcgXTtcblx0XHRyWyA4IF0gID0gdGVbIDggXTsgclsgOSBdICA9IHRlWyA5IF07IHJbIDEwIF0gPSB0ZVsgMTAgXTsgclsgMTEgXSA9IHRlWyAxMSBdO1xuXHRcdHJbIDEyIF0gPSB0ZVsgMTIgXTsgclsgMTMgXSA9IHRlWyAxMyBdOyByWyAxNCBdID0gdGVbIDE0IF07IHJbIDE1IF0gPSB0ZVsgMTUgXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlTY2FsYXI6IGZ1bmN0aW9uICggcyApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR0ZVsgMCBdICo9IHM7IHRlWyA0IF0gKj0gczsgdGVbIDggXSAqPSBzOyB0ZVsgMTIgXSAqPSBzO1xuXHRcdHRlWyAxIF0gKj0gczsgdGVbIDUgXSAqPSBzOyB0ZVsgOSBdICo9IHM7IHRlWyAxMyBdICo9IHM7XG5cdFx0dGVbIDIgXSAqPSBzOyB0ZVsgNiBdICo9IHM7IHRlWyAxMCBdICo9IHM7IHRlWyAxNCBdICo9IHM7XG5cdFx0dGVbIDMgXSAqPSBzOyB0ZVsgNyBdICo9IHM7IHRlWyAxMSBdICo9IHM7IHRlWyAxNSBdICo9IHM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5VmVjdG9yMzogZnVuY3Rpb24gKCB2ZWN0b3IgKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5NYXRyaXg0OiAubXVsdGlwbHlWZWN0b3IzKCkgaGFzIGJlZW4gcmVtb3ZlZC4gVXNlIHZlY3Rvci5hcHBseU1hdHJpeDQoIG1hdHJpeCApIG9yIHZlY3Rvci5hcHBseVByb2plY3Rpb24oIG1hdHJpeCApIGluc3RlYWQuJyApO1xuXHRcdHJldHVybiB2ZWN0b3IuYXBwbHlQcm9qZWN0aW9uKCB0aGlzICk7XG5cblx0fSxcblxuXHRtdWx0aXBseVZlY3RvcjQ6IGZ1bmN0aW9uICggdmVjdG9yICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuTWF0cml4NDogLm11bHRpcGx5VmVjdG9yNCgpIGhhcyBiZWVuIHJlbW92ZWQuIFVzZSB2ZWN0b3IuYXBwbHlNYXRyaXg0KCBtYXRyaXggKSBpbnN0ZWFkLicgKTtcblx0XHRyZXR1cm4gdmVjdG9yLmFwcGx5TWF0cml4NCggdGhpcyApO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlWZWN0b3IzQXJyYXk6IGZ1bmN0aW9uICggYSApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk1hdHJpeDQ6IC5tdWx0aXBseVZlY3RvcjNBcnJheSgpIGhhcyBiZWVuIHJlbmFtZWQuIFVzZSBtYXRyaXguYXBwbHlUb1ZlY3RvcjNBcnJheSggYXJyYXkgKSBpbnN0ZWFkLicgKTtcblx0XHRyZXR1cm4gdGhpcy5hcHBseVRvVmVjdG9yM0FycmF5KCBhICk7XG5cblx0fSxcblxuXHRhcHBseVRvVmVjdG9yM0FycmF5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdjE7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0LCBsZW5ndGggKSB7XG5cblx0XHRcdGlmICggdjEgPT09IHVuZGVmaW5lZCApIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXHRcdFx0aWYgKCBsZW5ndGggPT09IHVuZGVmaW5lZCApIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuXHRcdFx0Zm9yICggdmFyIGkgPSAwLCBqID0gb2Zmc2V0OyBpIDwgbGVuZ3RoOyBpICs9IDMsIGogKz0gMyApIHtcblxuXHRcdFx0XHR2MS5mcm9tQXJyYXkoIGFycmF5LCBqICk7XG5cdFx0XHRcdHYxLmFwcGx5TWF0cml4NCggdGhpcyApO1xuXHRcdFx0XHR2MS50b0FycmF5KCBhcnJheSwgaiApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhcnJheTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGFwcGx5VG9CdWZmZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiBhcHBseVRvQnVmZmVyKCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoICkge1xuXG5cdFx0XHRpZiAoIHYxID09PSB1bmRlZmluZWQgKSB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblx0XHRcdGlmICggbGVuZ3RoID09PSB1bmRlZmluZWQgKSBsZW5ndGggPSBidWZmZXIubGVuZ3RoIC8gYnVmZmVyLml0ZW1TaXplO1xuXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDAsIGogPSBvZmZzZXQ7IGkgPCBsZW5ndGg7IGkgKyssIGogKysgKSB7XG5cblx0XHRcdFx0djEueCA9IGJ1ZmZlci5nZXRYKCBqICk7XG5cdFx0XHRcdHYxLnkgPSBidWZmZXIuZ2V0WSggaiApO1xuXHRcdFx0XHR2MS56ID0gYnVmZmVyLmdldFooIGogKTtcblxuXHRcdFx0XHR2MS5hcHBseU1hdHJpeDQoIHRoaXMgKTtcblxuXHRcdFx0XHRidWZmZXIuc2V0WFlaKCB2MS54LCB2MS55LCB2MS56ICk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGJ1ZmZlcjtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdHJvdGF0ZUF4aXM6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk1hdHJpeDQ6IC5yb3RhdGVBeGlzKCkgaGFzIGJlZW4gcmVtb3ZlZC4gVXNlIFZlY3RvcjMudHJhbnNmb3JtRGlyZWN0aW9uKCBtYXRyaXggKSBpbnN0ZWFkLicgKTtcblxuXHRcdHYudHJhbnNmb3JtRGlyZWN0aW9uKCB0aGlzICk7XG5cblx0fSxcblxuXHRjcm9zc1ZlY3RvcjogZnVuY3Rpb24gKCB2ZWN0b3IgKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5NYXRyaXg0OiAuY3Jvc3NWZWN0b3IoKSBoYXMgYmVlbiByZW1vdmVkLiBVc2UgdmVjdG9yLmFwcGx5TWF0cml4NCggbWF0cml4ICkgaW5zdGVhZC4nICk7XG5cdFx0cmV0dXJuIHZlY3Rvci5hcHBseU1hdHJpeDQoIHRoaXMgKTtcblxuXHR9LFxuXG5cdGRldGVybWluYW50OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dmFyIG4xMSA9IHRlWyAwIF0sIG4xMiA9IHRlWyA0IF0sIG4xMyA9IHRlWyA4IF0sIG4xNCA9IHRlWyAxMiBdO1xuXHRcdHZhciBuMjEgPSB0ZVsgMSBdLCBuMjIgPSB0ZVsgNSBdLCBuMjMgPSB0ZVsgOSBdLCBuMjQgPSB0ZVsgMTMgXTtcblx0XHR2YXIgbjMxID0gdGVbIDIgXSwgbjMyID0gdGVbIDYgXSwgbjMzID0gdGVbIDEwIF0sIG4zNCA9IHRlWyAxNCBdO1xuXHRcdHZhciBuNDEgPSB0ZVsgMyBdLCBuNDIgPSB0ZVsgNyBdLCBuNDMgPSB0ZVsgMTEgXSwgbjQ0ID0gdGVbIDE1IF07XG5cblx0XHQvL1RPRE86IG1ha2UgdGhpcyBtb3JlIGVmZmljaWVudFxuXHRcdC8vKCBiYXNlZCBvbiBodHRwOi8vd3d3LmV1Y2xpZGVhbnNwYWNlLmNvbS9tYXRocy9hbGdlYnJhL21hdHJpeC9mdW5jdGlvbnMvaW52ZXJzZS9mb3VyRC9pbmRleC5odG0gKVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdG40MSAqIChcblx0XHRcdFx0KyBuMTQgKiBuMjMgKiBuMzJcblx0XHRcdFx0IC0gbjEzICogbjI0ICogbjMyXG5cdFx0XHRcdCAtIG4xNCAqIG4yMiAqIG4zM1xuXHRcdFx0XHQgKyBuMTIgKiBuMjQgKiBuMzNcblx0XHRcdFx0ICsgbjEzICogbjIyICogbjM0XG5cdFx0XHRcdCAtIG4xMiAqIG4yMyAqIG4zNFxuXHRcdFx0KSArXG5cdFx0XHRuNDIgKiAoXG5cdFx0XHRcdCsgbjExICogbjIzICogbjM0XG5cdFx0XHRcdCAtIG4xMSAqIG4yNCAqIG4zM1xuXHRcdFx0XHQgKyBuMTQgKiBuMjEgKiBuMzNcblx0XHRcdFx0IC0gbjEzICogbjIxICogbjM0XG5cdFx0XHRcdCArIG4xMyAqIG4yNCAqIG4zMVxuXHRcdFx0XHQgLSBuMTQgKiBuMjMgKiBuMzFcblx0XHRcdCkgK1xuXHRcdFx0bjQzICogKFxuXHRcdFx0XHQrIG4xMSAqIG4yNCAqIG4zMlxuXHRcdFx0XHQgLSBuMTEgKiBuMjIgKiBuMzRcblx0XHRcdFx0IC0gbjE0ICogbjIxICogbjMyXG5cdFx0XHRcdCArIG4xMiAqIG4yMSAqIG4zNFxuXHRcdFx0XHQgKyBuMTQgKiBuMjIgKiBuMzFcblx0XHRcdFx0IC0gbjEyICogbjI0ICogbjMxXG5cdFx0XHQpICtcblx0XHRcdG40NCAqIChcblx0XHRcdFx0LSBuMTMgKiBuMjIgKiBuMzFcblx0XHRcdFx0IC0gbjExICogbjIzICogbjMyXG5cdFx0XHRcdCArIG4xMSAqIG4yMiAqIG4zM1xuXHRcdFx0XHQgKyBuMTMgKiBuMjEgKiBuMzJcblx0XHRcdFx0IC0gbjEyICogbjIxICogbjMzXG5cdFx0XHRcdCArIG4xMiAqIG4yMyAqIG4zMVxuXHRcdFx0KVxuXG5cdFx0KTtcblxuXHR9LFxuXG5cdHRyYW5zcG9zZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblx0XHR2YXIgdG1wO1xuXG5cdFx0dG1wID0gdGVbIDEgXTsgdGVbIDEgXSA9IHRlWyA0IF07IHRlWyA0IF0gPSB0bXA7XG5cdFx0dG1wID0gdGVbIDIgXTsgdGVbIDIgXSA9IHRlWyA4IF07IHRlWyA4IF0gPSB0bXA7XG5cdFx0dG1wID0gdGVbIDYgXTsgdGVbIDYgXSA9IHRlWyA5IF07IHRlWyA5IF0gPSB0bXA7XG5cblx0XHR0bXAgPSB0ZVsgMyBdOyB0ZVsgMyBdID0gdGVbIDEyIF07IHRlWyAxMiBdID0gdG1wO1xuXHRcdHRtcCA9IHRlWyA3IF07IHRlWyA3IF0gPSB0ZVsgMTMgXTsgdGVbIDEzIF0gPSB0bXA7XG5cdFx0dG1wID0gdGVbIDExIF07IHRlWyAxMSBdID0gdGVbIDE0IF07IHRlWyAxNCBdID0gdG1wO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRmbGF0dGVuVG9BcnJheU9mZnNldDogZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0ICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdGFycmF5WyBvZmZzZXQgICAgIF0gPSB0ZVsgMCBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxIF0gPSB0ZVsgMSBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyAyIF0gPSB0ZVsgMiBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyAzIF0gPSB0ZVsgMyBdO1xuXG5cdFx0YXJyYXlbIG9mZnNldCArIDQgXSA9IHRlWyA0IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDUgXSA9IHRlWyA1IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDYgXSA9IHRlWyA2IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDcgXSA9IHRlWyA3IF07XG5cblx0XHRhcnJheVsgb2Zmc2V0ICsgOCBdICA9IHRlWyA4IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDkgXSAgPSB0ZVsgOSBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxMCBdID0gdGVbIDEwIF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDExIF0gPSB0ZVsgMTEgXTtcblxuXHRcdGFycmF5WyBvZmZzZXQgKyAxMiBdID0gdGVbIDEyIF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDEzIF0gPSB0ZVsgMTMgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMTQgXSA9IHRlWyAxNCBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxNSBdID0gdGVbIDE1IF07XG5cblx0XHRyZXR1cm4gYXJyYXk7XG5cblx0fSxcblxuXHRnZXRQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYxO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0aWYgKCB2MSA9PT0gdW5kZWZpbmVkICkgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuTWF0cml4NDogLmdldFBvc2l0aW9uKCkgaGFzIGJlZW4gcmVtb3ZlZC4gVXNlIFZlY3RvcjMuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKCBtYXRyaXggKSBpbnN0ZWFkLicgKTtcblxuXHRcdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblx0XHRcdHJldHVybiB2MS5zZXQoIHRlWyAxMiBdLCB0ZVsgMTMgXSwgdGVbIDE0IF0gKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdHNldFBvc2l0aW9uOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dGVbIDEyIF0gPSB2Lng7XG5cdFx0dGVbIDEzIF0gPSB2Lnk7XG5cdFx0dGVbIDE0IF0gPSB2Lno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGdldEludmVyc2U6IGZ1bmN0aW9uICggbSwgdGhyb3dPbkludmVydGlibGUgKSB7XG5cblx0XHQvLyBiYXNlZCBvbiBodHRwOi8vd3d3LmV1Y2xpZGVhbnNwYWNlLmNvbS9tYXRocy9hbGdlYnJhL21hdHJpeC9mdW5jdGlvbnMvaW52ZXJzZS9mb3VyRC9pbmRleC5odG1cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXHRcdHZhciBtZSA9IG0uZWxlbWVudHM7XG5cblx0XHR2YXIgbjExID0gbWVbIDAgXSwgbjEyID0gbWVbIDQgXSwgbjEzID0gbWVbIDggXSwgbjE0ID0gbWVbIDEyIF07XG5cdFx0dmFyIG4yMSA9IG1lWyAxIF0sIG4yMiA9IG1lWyA1IF0sIG4yMyA9IG1lWyA5IF0sIG4yNCA9IG1lWyAxMyBdO1xuXHRcdHZhciBuMzEgPSBtZVsgMiBdLCBuMzIgPSBtZVsgNiBdLCBuMzMgPSBtZVsgMTAgXSwgbjM0ID0gbWVbIDE0IF07XG5cdFx0dmFyIG40MSA9IG1lWyAzIF0sIG40MiA9IG1lWyA3IF0sIG40MyA9IG1lWyAxMSBdLCBuNDQgPSBtZVsgMTUgXTtcblxuXHRcdHRlWyAwIF0gPSBuMjMgKiBuMzQgKiBuNDIgLSBuMjQgKiBuMzMgKiBuNDIgKyBuMjQgKiBuMzIgKiBuNDMgLSBuMjIgKiBuMzQgKiBuNDMgLSBuMjMgKiBuMzIgKiBuNDQgKyBuMjIgKiBuMzMgKiBuNDQ7XG5cdFx0dGVbIDQgXSA9IG4xNCAqIG4zMyAqIG40MiAtIG4xMyAqIG4zNCAqIG40MiAtIG4xNCAqIG4zMiAqIG40MyArIG4xMiAqIG4zNCAqIG40MyArIG4xMyAqIG4zMiAqIG40NCAtIG4xMiAqIG4zMyAqIG40NDtcblx0XHR0ZVsgOCBdID0gbjEzICogbjI0ICogbjQyIC0gbjE0ICogbjIzICogbjQyICsgbjE0ICogbjIyICogbjQzIC0gbjEyICogbjI0ICogbjQzIC0gbjEzICogbjIyICogbjQ0ICsgbjEyICogbjIzICogbjQ0O1xuXHRcdHRlWyAxMiBdID0gbjE0ICogbjIzICogbjMyIC0gbjEzICogbjI0ICogbjMyIC0gbjE0ICogbjIyICogbjMzICsgbjEyICogbjI0ICogbjMzICsgbjEzICogbjIyICogbjM0IC0gbjEyICogbjIzICogbjM0O1xuXHRcdHRlWyAxIF0gPSBuMjQgKiBuMzMgKiBuNDEgLSBuMjMgKiBuMzQgKiBuNDEgLSBuMjQgKiBuMzEgKiBuNDMgKyBuMjEgKiBuMzQgKiBuNDMgKyBuMjMgKiBuMzEgKiBuNDQgLSBuMjEgKiBuMzMgKiBuNDQ7XG5cdFx0dGVbIDUgXSA9IG4xMyAqIG4zNCAqIG40MSAtIG4xNCAqIG4zMyAqIG40MSArIG4xNCAqIG4zMSAqIG40MyAtIG4xMSAqIG4zNCAqIG40MyAtIG4xMyAqIG4zMSAqIG40NCArIG4xMSAqIG4zMyAqIG40NDtcblx0XHR0ZVsgOSBdID0gbjE0ICogbjIzICogbjQxIC0gbjEzICogbjI0ICogbjQxIC0gbjE0ICogbjIxICogbjQzICsgbjExICogbjI0ICogbjQzICsgbjEzICogbjIxICogbjQ0IC0gbjExICogbjIzICogbjQ0O1xuXHRcdHRlWyAxMyBdID0gbjEzICogbjI0ICogbjMxIC0gbjE0ICogbjIzICogbjMxICsgbjE0ICogbjIxICogbjMzIC0gbjExICogbjI0ICogbjMzIC0gbjEzICogbjIxICogbjM0ICsgbjExICogbjIzICogbjM0O1xuXHRcdHRlWyAyIF0gPSBuMjIgKiBuMzQgKiBuNDEgLSBuMjQgKiBuMzIgKiBuNDEgKyBuMjQgKiBuMzEgKiBuNDIgLSBuMjEgKiBuMzQgKiBuNDIgLSBuMjIgKiBuMzEgKiBuNDQgKyBuMjEgKiBuMzIgKiBuNDQ7XG5cdFx0dGVbIDYgXSA9IG4xNCAqIG4zMiAqIG40MSAtIG4xMiAqIG4zNCAqIG40MSAtIG4xNCAqIG4zMSAqIG40MiArIG4xMSAqIG4zNCAqIG40MiArIG4xMiAqIG4zMSAqIG40NCAtIG4xMSAqIG4zMiAqIG40NDtcblx0XHR0ZVsgMTAgXSA9IG4xMiAqIG4yNCAqIG40MSAtIG4xNCAqIG4yMiAqIG40MSArIG4xNCAqIG4yMSAqIG40MiAtIG4xMSAqIG4yNCAqIG40MiAtIG4xMiAqIG4yMSAqIG40NCArIG4xMSAqIG4yMiAqIG40NDtcblx0XHR0ZVsgMTQgXSA9IG4xNCAqIG4yMiAqIG4zMSAtIG4xMiAqIG4yNCAqIG4zMSAtIG4xNCAqIG4yMSAqIG4zMiArIG4xMSAqIG4yNCAqIG4zMiArIG4xMiAqIG4yMSAqIG4zNCAtIG4xMSAqIG4yMiAqIG4zNDtcblx0XHR0ZVsgMyBdID0gbjIzICogbjMyICogbjQxIC0gbjIyICogbjMzICogbjQxIC0gbjIzICogbjMxICogbjQyICsgbjIxICogbjMzICogbjQyICsgbjIyICogbjMxICogbjQzIC0gbjIxICogbjMyICogbjQzO1xuXHRcdHRlWyA3IF0gPSBuMTIgKiBuMzMgKiBuNDEgLSBuMTMgKiBuMzIgKiBuNDEgKyBuMTMgKiBuMzEgKiBuNDIgLSBuMTEgKiBuMzMgKiBuNDIgLSBuMTIgKiBuMzEgKiBuNDMgKyBuMTEgKiBuMzIgKiBuNDM7XG5cdFx0dGVbIDExIF0gPSBuMTMgKiBuMjIgKiBuNDEgLSBuMTIgKiBuMjMgKiBuNDEgLSBuMTMgKiBuMjEgKiBuNDIgKyBuMTEgKiBuMjMgKiBuNDIgKyBuMTIgKiBuMjEgKiBuNDMgLSBuMTEgKiBuMjIgKiBuNDM7XG5cdFx0dGVbIDE1IF0gPSBuMTIgKiBuMjMgKiBuMzEgLSBuMTMgKiBuMjIgKiBuMzEgKyBuMTMgKiBuMjEgKiBuMzIgLSBuMTEgKiBuMjMgKiBuMzIgLSBuMTIgKiBuMjEgKiBuMzMgKyBuMTEgKiBuMjIgKiBuMzM7XG5cblx0XHR2YXIgZGV0ID0gbjExICogdGVbIDAgXSArIG4yMSAqIHRlWyA0IF0gKyBuMzEgKiB0ZVsgOCBdICsgbjQxICogdGVbIDEyIF07XG5cblx0XHRpZiAoIGRldCA9PT0gMCApIHtcblxuXHRcdFx0dmFyIG1zZyA9IFwiVEhSRUUuTWF0cml4NC5nZXRJbnZlcnNlKCk6IGNhbid0IGludmVydCBtYXRyaXgsIGRldGVybWluYW50IGlzIDBcIjtcblxuXHRcdFx0aWYgKCB0aHJvd09uSW52ZXJ0aWJsZSB8fCBmYWxzZSApIHtcblxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIG1zZyApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGNvbnNvbGUud2FybiggbXNnICk7XG5cblx0XHRcdH1cblxuXHRcdFx0dGhpcy5pZGVudGl0eSgpO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH1cblxuXHRcdHRoaXMubXVsdGlwbHlTY2FsYXIoIDEgLyBkZXQgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dHJhbnNsYXRlOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuTWF0cml4NDogLnRyYW5zbGF0ZSgpIGhhcyBiZWVuIHJlbW92ZWQuJyApO1xuXG5cdH0sXG5cblx0cm90YXRlWDogZnVuY3Rpb24gKCBhbmdsZSApIHtcblxuXHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5NYXRyaXg0OiAucm90YXRlWCgpIGhhcyBiZWVuIHJlbW92ZWQuJyApO1xuXG5cdH0sXG5cblx0cm90YXRlWTogZnVuY3Rpb24gKCBhbmdsZSApIHtcblxuXHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5NYXRyaXg0OiAucm90YXRlWSgpIGhhcyBiZWVuIHJlbW92ZWQuJyApO1xuXG5cdH0sXG5cblx0cm90YXRlWjogZnVuY3Rpb24gKCBhbmdsZSApIHtcblxuXHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5NYXRyaXg0OiAucm90YXRlWigpIGhhcyBiZWVuIHJlbW92ZWQuJyApO1xuXG5cdH0sXG5cblx0cm90YXRlQnlBeGlzOiBmdW5jdGlvbiAoIGF4aXMsIGFuZ2xlICkge1xuXG5cdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLk1hdHJpeDQ6IC5yb3RhdGVCeUF4aXMoKSBoYXMgYmVlbiByZW1vdmVkLicgKTtcblxuXHR9LFxuXG5cdHNjYWxlOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXHRcdHZhciB4ID0gdi54LCB5ID0gdi55LCB6ID0gdi56O1xuXG5cdFx0dGVbIDAgXSAqPSB4OyB0ZVsgNCBdICo9IHk7IHRlWyA4IF0gKj0gejtcblx0XHR0ZVsgMSBdICo9IHg7IHRlWyA1IF0gKj0geTsgdGVbIDkgXSAqPSB6O1xuXHRcdHRlWyAyIF0gKj0geDsgdGVbIDYgXSAqPSB5OyB0ZVsgMTAgXSAqPSB6O1xuXHRcdHRlWyAzIF0gKj0geDsgdGVbIDcgXSAqPSB5OyB0ZVsgMTEgXSAqPSB6O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRnZXRNYXhTY2FsZU9uQXhpczogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHZhciBzY2FsZVhTcSA9IHRlWyAwIF0gKiB0ZVsgMCBdICsgdGVbIDEgXSAqIHRlWyAxIF0gKyB0ZVsgMiBdICogdGVbIDIgXTtcblx0XHR2YXIgc2NhbGVZU3EgPSB0ZVsgNCBdICogdGVbIDQgXSArIHRlWyA1IF0gKiB0ZVsgNSBdICsgdGVbIDYgXSAqIHRlWyA2IF07XG5cdFx0dmFyIHNjYWxlWlNxID0gdGVbIDggXSAqIHRlWyA4IF0gKyB0ZVsgOSBdICogdGVbIDkgXSArIHRlWyAxMCBdICogdGVbIDEwIF07XG5cblx0XHRyZXR1cm4gTWF0aC5zcXJ0KCBNYXRoLm1heCggc2NhbGVYU3EsIE1hdGgubWF4KCBzY2FsZVlTcSwgc2NhbGVaU3EgKSApICk7XG5cblx0fSxcblxuXHRtYWtlVHJhbnNsYXRpb246IGZ1bmN0aW9uICggeCwgeSwgeiApIHtcblxuXHRcdHRoaXMuc2V0KFxuXG5cdFx0XHQxLCAwLCAwLCB4LFxuXHRcdFx0MCwgMSwgMCwgeSxcblx0XHRcdDAsIDAsIDEsIHosXG5cdFx0XHQwLCAwLCAwLCAxXG5cblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtYWtlUm90YXRpb25YOiBmdW5jdGlvbiAoIHRoZXRhICkge1xuXG5cdFx0dmFyIGMgPSBNYXRoLmNvcyggdGhldGEgKSwgcyA9IE1hdGguc2luKCB0aGV0YSApO1xuXG5cdFx0dGhpcy5zZXQoXG5cblx0XHRcdDEsIDAsICAwLCAwLFxuXHRcdFx0MCwgYywgLSBzLCAwLFxuXHRcdFx0MCwgcywgIGMsIDAsXG5cdFx0XHQwLCAwLCAgMCwgMVxuXG5cdFx0KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWFrZVJvdGF0aW9uWTogZnVuY3Rpb24gKCB0aGV0YSApIHtcblxuXHRcdHZhciBjID0gTWF0aC5jb3MoIHRoZXRhICksIHMgPSBNYXRoLnNpbiggdGhldGEgKTtcblxuXHRcdHRoaXMuc2V0KFxuXG5cdFx0XHQgYywgMCwgcywgMCxcblx0XHRcdCAwLCAxLCAwLCAwLFxuXHRcdFx0LSBzLCAwLCBjLCAwLFxuXHRcdFx0IDAsIDAsIDAsIDFcblxuXHRcdCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1ha2VSb3RhdGlvblo6IGZ1bmN0aW9uICggdGhldGEgKSB7XG5cblx0XHR2YXIgYyA9IE1hdGguY29zKCB0aGV0YSApLCBzID0gTWF0aC5zaW4oIHRoZXRhICk7XG5cblx0XHR0aGlzLnNldChcblxuXHRcdFx0YywgLSBzLCAwLCAwLFxuXHRcdFx0cywgIGMsIDAsIDAsXG5cdFx0XHQwLCAgMCwgMSwgMCxcblx0XHRcdDAsICAwLCAwLCAxXG5cblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtYWtlUm90YXRpb25BeGlzOiBmdW5jdGlvbiAoIGF4aXMsIGFuZ2xlICkge1xuXG5cdFx0Ly8gQmFzZWQgb24gaHR0cDovL3d3dy5nYW1lZGV2Lm5ldC9yZWZlcmVuY2UvYXJ0aWNsZXMvYXJ0aWNsZTExOTkuYXNwXG5cblx0XHR2YXIgYyA9IE1hdGguY29zKCBhbmdsZSApO1xuXHRcdHZhciBzID0gTWF0aC5zaW4oIGFuZ2xlICk7XG5cdFx0dmFyIHQgPSAxIC0gYztcblx0XHR2YXIgeCA9IGF4aXMueCwgeSA9IGF4aXMueSwgeiA9IGF4aXMuejtcblx0XHR2YXIgdHggPSB0ICogeCwgdHkgPSB0ICogeTtcblxuXHRcdHRoaXMuc2V0KFxuXG5cdFx0XHR0eCAqIHggKyBjLCB0eCAqIHkgLSBzICogeiwgdHggKiB6ICsgcyAqIHksIDAsXG5cdFx0XHR0eCAqIHkgKyBzICogeiwgdHkgKiB5ICsgYywgdHkgKiB6IC0gcyAqIHgsIDAsXG5cdFx0XHR0eCAqIHogLSBzICogeSwgdHkgKiB6ICsgcyAqIHgsIHQgKiB6ICogeiArIGMsIDAsXG5cdFx0XHQwLCAwLCAwLCAxXG5cblx0XHQpO1xuXG5cdFx0IHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWFrZVNjYWxlOiBmdW5jdGlvbiAoIHgsIHksIHogKSB7XG5cblx0XHR0aGlzLnNldChcblxuXHRcdFx0eCwgMCwgMCwgMCxcblx0XHRcdDAsIHksIDAsIDAsXG5cdFx0XHQwLCAwLCB6LCAwLFxuXHRcdFx0MCwgMCwgMCwgMVxuXG5cdFx0KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y29tcG9zZTogZnVuY3Rpb24gKCBwb3NpdGlvbiwgcXVhdGVybmlvbiwgc2NhbGUgKSB7XG5cblx0XHR0aGlzLm1ha2VSb3RhdGlvbkZyb21RdWF0ZXJuaW9uKCBxdWF0ZXJuaW9uICk7XG5cdFx0dGhpcy5zY2FsZSggc2NhbGUgKTtcblx0XHR0aGlzLnNldFBvc2l0aW9uKCBwb3NpdGlvbiApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRkZWNvbXBvc2U6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2ZWN0b3IsIG1hdHJpeDtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHBvc2l0aW9uLCBxdWF0ZXJuaW9uLCBzY2FsZSApIHtcblxuXHRcdFx0aWYgKCB2ZWN0b3IgPT09IHVuZGVmaW5lZCApIHZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRpZiAoIG1hdHJpeCA9PT0gdW5kZWZpbmVkICkgbWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuXHRcdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdFx0dmFyIHN4ID0gdmVjdG9yLnNldCggdGVbIDAgXSwgdGVbIDEgXSwgdGVbIDIgXSApLmxlbmd0aCgpO1xuXHRcdFx0dmFyIHN5ID0gdmVjdG9yLnNldCggdGVbIDQgXSwgdGVbIDUgXSwgdGVbIDYgXSApLmxlbmd0aCgpO1xuXHRcdFx0dmFyIHN6ID0gdmVjdG9yLnNldCggdGVbIDggXSwgdGVbIDkgXSwgdGVbIDEwIF0gKS5sZW5ndGgoKTtcblxuXHRcdFx0Ly8gaWYgZGV0ZXJtaW5lIGlzIG5lZ2F0aXZlLCB3ZSBuZWVkIHRvIGludmVydCBvbmUgc2NhbGVcblx0XHRcdHZhciBkZXQgPSB0aGlzLmRldGVybWluYW50KCk7XG5cdFx0XHRpZiAoIGRldCA8IDAgKSB7XG5cblx0XHRcdFx0c3ggPSAtIHN4O1xuXG5cdFx0XHR9XG5cblx0XHRcdHBvc2l0aW9uLnggPSB0ZVsgMTIgXTtcblx0XHRcdHBvc2l0aW9uLnkgPSB0ZVsgMTMgXTtcblx0XHRcdHBvc2l0aW9uLnogPSB0ZVsgMTQgXTtcblxuXHRcdFx0Ly8gc2NhbGUgdGhlIHJvdGF0aW9uIHBhcnRcblxuXHRcdFx0bWF0cml4LmVsZW1lbnRzLnNldCggdGhpcy5lbGVtZW50cyApOyAvLyBhdCB0aGlzIHBvaW50IG1hdHJpeCBpcyBpbmNvbXBsZXRlIHNvIHdlIGNhbid0IHVzZSAuY29weSgpXG5cblx0XHRcdHZhciBpbnZTWCA9IDEgLyBzeDtcblx0XHRcdHZhciBpbnZTWSA9IDEgLyBzeTtcblx0XHRcdHZhciBpbnZTWiA9IDEgLyBzejtcblxuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyAwIF0gKj0gaW52U1g7XG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDEgXSAqPSBpbnZTWDtcblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMiBdICo9IGludlNYO1xuXG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDQgXSAqPSBpbnZTWTtcblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgNSBdICo9IGludlNZO1xuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyA2IF0gKj0gaW52U1k7XG5cblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgOCBdICo9IGludlNaO1xuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyA5IF0gKj0gaW52U1o7XG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDEwIF0gKj0gaW52U1o7XG5cblx0XHRcdHF1YXRlcm5pb24uc2V0RnJvbVJvdGF0aW9uTWF0cml4KCBtYXRyaXggKTtcblxuXHRcdFx0c2NhbGUueCA9IHN4O1xuXHRcdFx0c2NhbGUueSA9IHN5O1xuXHRcdFx0c2NhbGUueiA9IHN6O1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdG1ha2VGcnVzdHVtOiBmdW5jdGlvbiAoIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblx0XHR2YXIgeCA9IDIgKiBuZWFyIC8gKCByaWdodCAtIGxlZnQgKTtcblx0XHR2YXIgeSA9IDIgKiBuZWFyIC8gKCB0b3AgLSBib3R0b20gKTtcblxuXHRcdHZhciBhID0gKCByaWdodCArIGxlZnQgKSAvICggcmlnaHQgLSBsZWZ0ICk7XG5cdFx0dmFyIGIgPSAoIHRvcCArIGJvdHRvbSApIC8gKCB0b3AgLSBib3R0b20gKTtcblx0XHR2YXIgYyA9IC0gKCBmYXIgKyBuZWFyICkgLyAoIGZhciAtIG5lYXIgKTtcblx0XHR2YXIgZCA9IC0gMiAqIGZhciAqIG5lYXIgLyAoIGZhciAtIG5lYXIgKTtcblxuXHRcdHRlWyAwIF0gPSB4O1x0dGVbIDQgXSA9IDA7XHR0ZVsgOCBdID0gYTtcdHRlWyAxMiBdID0gMDtcblx0XHR0ZVsgMSBdID0gMDtcdHRlWyA1IF0gPSB5O1x0dGVbIDkgXSA9IGI7XHR0ZVsgMTMgXSA9IDA7XG5cdFx0dGVbIDIgXSA9IDA7XHR0ZVsgNiBdID0gMDtcdHRlWyAxMCBdID0gYztcdHRlWyAxNCBdID0gZDtcblx0XHR0ZVsgMyBdID0gMDtcdHRlWyA3IF0gPSAwO1x0dGVbIDExIF0gPSAtIDE7XHR0ZVsgMTUgXSA9IDA7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1ha2VQZXJzcGVjdGl2ZTogZnVuY3Rpb24gKCBmb3YsIGFzcGVjdCwgbmVhciwgZmFyICkge1xuXG5cdFx0dmFyIHltYXggPSBuZWFyICogTWF0aC50YW4oIFRIUkVFLk1hdGguZGVnVG9SYWQoIGZvdiAqIDAuNSApICk7XG5cdFx0dmFyIHltaW4gPSAtIHltYXg7XG5cdFx0dmFyIHhtaW4gPSB5bWluICogYXNwZWN0O1xuXHRcdHZhciB4bWF4ID0geW1heCAqIGFzcGVjdDtcblxuXHRcdHJldHVybiB0aGlzLm1ha2VGcnVzdHVtKCB4bWluLCB4bWF4LCB5bWluLCB5bWF4LCBuZWFyLCBmYXIgKTtcblxuXHR9LFxuXG5cdG1ha2VPcnRob2dyYXBoaWM6IGZ1bmN0aW9uICggbGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tLCBuZWFyLCBmYXIgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXHRcdHZhciB3ID0gcmlnaHQgLSBsZWZ0O1xuXHRcdHZhciBoID0gdG9wIC0gYm90dG9tO1xuXHRcdHZhciBwID0gZmFyIC0gbmVhcjtcblxuXHRcdHZhciB4ID0gKCByaWdodCArIGxlZnQgKSAvIHc7XG5cdFx0dmFyIHkgPSAoIHRvcCArIGJvdHRvbSApIC8gaDtcblx0XHR2YXIgeiA9ICggZmFyICsgbmVhciApIC8gcDtcblxuXHRcdHRlWyAwIF0gPSAyIC8gdztcdHRlWyA0IF0gPSAwO1x0dGVbIDggXSA9IDA7XHR0ZVsgMTIgXSA9IC0geDtcblx0XHR0ZVsgMSBdID0gMDtcdHRlWyA1IF0gPSAyIC8gaDtcdHRlWyA5IF0gPSAwO1x0dGVbIDEzIF0gPSAtIHk7XG5cdFx0dGVbIDIgXSA9IDA7XHR0ZVsgNiBdID0gMDtcdHRlWyAxMCBdID0gLSAyIC8gcDtcdHRlWyAxNCBdID0gLSB6O1xuXHRcdHRlWyAzIF0gPSAwO1x0dGVbIDcgXSA9IDA7XHR0ZVsgMTEgXSA9IDA7XHR0ZVsgMTUgXSA9IDE7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGZyb21BcnJheTogZnVuY3Rpb24gKCBhcnJheSApIHtcblxuXHRcdHRoaXMuZWxlbWVudHMuc2V0KCBhcnJheSApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0cmV0dXJuIFtcblx0XHRcdHRlWyAwIF0sIHRlWyAxIF0sIHRlWyAyIF0sIHRlWyAzIF0sXG5cdFx0XHR0ZVsgNCBdLCB0ZVsgNSBdLCB0ZVsgNiBdLCB0ZVsgNyBdLFxuXHRcdFx0dGVbIDggXSwgdGVbIDkgXSwgdGVbIDEwIF0sIHRlWyAxMSBdLFxuXHRcdFx0dGVbIDEyIF0sIHRlWyAxMyBdLCB0ZVsgMTQgXSwgdGVbIDE1IF1cblx0XHRdO1xuXG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBuZXcgVEhSRUUuTWF0cml4NCgpLmZyb21BcnJheSggdGhpcy5lbGVtZW50cyApO1xuXG5cdH1cblxufTtcblxuLy8gRmlsZTpzcmMvbWF0aC9NYXRoLmpzXG5cbi8qKlxuICogQGF1dGhvciBhbHRlcmVkcSAvIGh0dHA6Ly9hbHRlcmVkcXVhbGlhLmNvbS9cbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKi9cblxuVEhSRUUuTWF0aCA9IHtcblxuXHRnZW5lcmF0ZVVVSUQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIGh0dHA6Ly93d3cuYnJvb2ZhLmNvbS9Ub29scy9NYXRoLnV1aWQuaHRtXG5cblx0XHR2YXIgY2hhcnMgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonLnNwbGl0KCAnJyApO1xuXHRcdHZhciB1dWlkID0gbmV3IEFycmF5KCAzNiApO1xuXHRcdHZhciBybmQgPSAwLCByO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgMzY7IGkgKysgKSB7XG5cblx0XHRcdFx0aWYgKCBpID09PSA4IHx8IGkgPT09IDEzIHx8IGkgPT09IDE4IHx8IGkgPT09IDIzICkge1xuXG5cdFx0XHRcdFx0dXVpZFsgaSBdID0gJy0nO1xuXG5cdFx0XHRcdH0gZWxzZSBpZiAoIGkgPT09IDE0ICkge1xuXG5cdFx0XHRcdFx0dXVpZFsgaSBdID0gJzQnO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRpZiAoIHJuZCA8PSAweDAyICkgcm5kID0gMHgyMDAwMDAwICsgKCBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwICkgfCAwO1xuXHRcdFx0XHRcdHIgPSBybmQgJiAweGY7XG5cdFx0XHRcdFx0cm5kID0gcm5kID4+IDQ7XG5cdFx0XHRcdFx0dXVpZFsgaSBdID0gY2hhcnNbICggaSA9PT0gMTkgKSA/ICggciAmIDB4MyApIHwgMHg4IDogciBdO1xuXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHV1aWQuam9pbiggJycgKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdC8vIENsYW1wIHZhbHVlIHRvIHJhbmdlIDxhLCBiPlxuXG5cdGNsYW1wOiBmdW5jdGlvbiAoIHgsIGEsIGIgKSB7XG5cblx0XHRyZXR1cm4gKCB4IDwgYSApID8gYSA6ICggKCB4ID4gYiApID8gYiA6IHggKTtcblxuXHR9LFxuXG5cdC8vIENsYW1wIHZhbHVlIHRvIHJhbmdlIDxhLCBpbmYpXG5cblx0Y2xhbXBCb3R0b206IGZ1bmN0aW9uICggeCwgYSApIHtcblxuXHRcdHJldHVybiB4IDwgYSA/IGEgOiB4O1xuXG5cdH0sXG5cblx0Ly8gTGluZWFyIG1hcHBpbmcgZnJvbSByYW5nZSA8YTEsIGEyPiB0byByYW5nZSA8YjEsIGIyPlxuXG5cdG1hcExpbmVhcjogZnVuY3Rpb24gKCB4LCBhMSwgYTIsIGIxLCBiMiApIHtcblxuXHRcdHJldHVybiBiMSArICggeCAtIGExICkgKiAoIGIyIC0gYjEgKSAvICggYTIgLSBhMSApO1xuXG5cdH0sXG5cblx0Ly8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9TbW9vdGhzdGVwXG5cblx0c21vb3Roc3RlcDogZnVuY3Rpb24gKCB4LCBtaW4sIG1heCApIHtcblxuXHRcdGlmICggeCA8PSBtaW4gKSByZXR1cm4gMDtcblx0XHRpZiAoIHggPj0gbWF4ICkgcmV0dXJuIDE7XG5cblx0XHR4ID0gKCB4IC0gbWluICkgLyAoIG1heCAtIG1pbiApO1xuXG5cdFx0cmV0dXJuIHggKiB4ICogKCAzIC0gMiAqIHggKTtcblxuXHR9LFxuXG5cdHNtb290aGVyc3RlcDogZnVuY3Rpb24gKCB4LCBtaW4sIG1heCApIHtcblxuXHRcdGlmICggeCA8PSBtaW4gKSByZXR1cm4gMDtcblx0XHRpZiAoIHggPj0gbWF4ICkgcmV0dXJuIDE7XG5cblx0XHR4ID0gKCB4IC0gbWluICkgLyAoIG1heCAtIG1pbiApO1xuXG5cdFx0cmV0dXJuIHggKiB4ICogeCAqICggeCAqICggeCAqIDYgLSAxNSApICsgMTAgKTtcblxuXHR9LFxuXG5cdC8vIFJhbmRvbSBmbG9hdCBmcm9tIDwwLCAxPiB3aXRoIDE2IGJpdHMgb2YgcmFuZG9tbmVzc1xuXHQvLyAoc3RhbmRhcmQgTWF0aC5yYW5kb20oKSBjcmVhdGVzIHJlcGV0aXRpdmUgcGF0dGVybnMgd2hlbiBhcHBsaWVkIG92ZXIgbGFyZ2VyIHNwYWNlKVxuXG5cdHJhbmRvbTE2OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gKCA2NTI4MCAqIE1hdGgucmFuZG9tKCkgKyAyNTUgKiBNYXRoLnJhbmRvbSgpICkgLyA2NTUzNTtcblxuXHR9LFxuXG5cdC8vIFJhbmRvbSBpbnRlZ2VyIGZyb20gPGxvdywgaGlnaD4gaW50ZXJ2YWxcblxuXHRyYW5kSW50OiBmdW5jdGlvbiAoIGxvdywgaGlnaCApIHtcblxuXHRcdHJldHVybiBNYXRoLmZsb29yKCB0aGlzLnJhbmRGbG9hdCggbG93LCBoaWdoICkgKTtcblxuXHR9LFxuXG5cdC8vIFJhbmRvbSBmbG9hdCBmcm9tIDxsb3csIGhpZ2g+IGludGVydmFsXG5cblx0cmFuZEZsb2F0OiBmdW5jdGlvbiAoIGxvdywgaGlnaCApIHtcblxuXHRcdHJldHVybiBsb3cgKyBNYXRoLnJhbmRvbSgpICogKCBoaWdoIC0gbG93ICk7XG5cblx0fSxcblxuXHQvLyBSYW5kb20gZmxvYXQgZnJvbSA8LXJhbmdlLzIsIHJhbmdlLzI+IGludGVydmFsXG5cblx0cmFuZEZsb2F0U3ByZWFkOiBmdW5jdGlvbiAoIHJhbmdlICkge1xuXG5cdFx0cmV0dXJuIHJhbmdlICogKCAwLjUgLSBNYXRoLnJhbmRvbSgpICk7XG5cblx0fSxcblxuXHRkZWdUb1JhZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIGRlZ3JlZVRvUmFkaWFuc0ZhY3RvciA9IE1hdGguUEkgLyAxODA7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBkZWdyZWVzICkge1xuXG5cdFx0XHRyZXR1cm4gZGVncmVlcyAqIGRlZ3JlZVRvUmFkaWFuc0ZhY3RvcjtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdHJhZFRvRGVnOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgcmFkaWFuVG9EZWdyZWVzRmFjdG9yID0gMTgwIC8gTWF0aC5QSTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHJhZGlhbnMgKSB7XG5cblx0XHRcdHJldHVybiByYWRpYW5zICogcmFkaWFuVG9EZWdyZWVzRmFjdG9yO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0aXNQb3dlck9mVHdvOiBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG5cdFx0cmV0dXJuICggdmFsdWUgJiAoIHZhbHVlIC0gMSApICkgPT09IDAgJiYgdmFsdWUgIT09IDA7XG5cblx0fSxcblxuXHRuZXh0UG93ZXJPZlR3bzogZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdHZhbHVlIC0tO1xuXHRcdHZhbHVlIHw9IHZhbHVlID4+IDE7XG5cdFx0dmFsdWUgfD0gdmFsdWUgPj4gMjtcblx0XHR2YWx1ZSB8PSB2YWx1ZSA+PiA0O1xuXHRcdHZhbHVlIHw9IHZhbHVlID4+IDg7XG5cdFx0dmFsdWUgfD0gdmFsdWUgPj4gMTY7XG5cdFx0dmFsdWUgKys7XG5cblx0XHRyZXR1cm4gdmFsdWU7XG5cblx0fVxuXG59O1xuXG4iLCIgLyogZ2xvYmFscyBkZWZpbmUgKi9cbiAoZnVuY3Rpb24oZGVmaW5lKXsndXNlIHN0cmljdCc7ZGVmaW5lKGZ1bmN0aW9uKHJlcXVpcmUsZXhwb3J0cyxtb2R1bGUpe1xuXG5mdW5jdGlvbiBmb3ZUb05EQ1NjYWxlT2Zmc2V0KCBmb3YgKSB7XG5cbiAgICB2YXIgcHhzY2FsZSA9IDIuMCAvIChmb3YubGVmdFRhbiArIGZvdi5yaWdodFRhbik7XG4gICAgdmFyIHB4b2Zmc2V0ID0gKGZvdi5sZWZ0VGFuIC0gZm92LnJpZ2h0VGFuKSAqIHB4c2NhbGUgKiAwLjU7XG4gICAgdmFyIHB5c2NhbGUgPSAyLjAgLyAoZm92LnVwVGFuICsgZm92LmRvd25UYW4pO1xuICAgIHZhciBweW9mZnNldCA9IChmb3YudXBUYW4gLSBmb3YuZG93blRhbikgKiBweXNjYWxlICogMC41O1xuICAgIHJldHVybiB7IHNjYWxlOiBbIHB4c2NhbGUsIHB5c2NhbGUgXSwgb2Zmc2V0OiBbIHB4b2Zmc2V0LCBweW9mZnNldCBdIH07XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGZvdlBvcnRUb1Byb2plY3Rpb24oIGZvdiwgcmlnaHRIYW5kZWQsIHpOZWFyLCB6RmFyICkge1xuXG4gICAgcmlnaHRIYW5kZWQgPSByaWdodEhhbmRlZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHJpZ2h0SGFuZGVkO1xuICAgIHpOZWFyID0gek5lYXIgPT09IHVuZGVmaW5lZCA/IDAuMDEgOiB6TmVhcjtcbiAgICB6RmFyID0gekZhciA9PT0gdW5kZWZpbmVkID8gMTAwMDAuMCA6IHpGYXI7XG5cbiAgICB2YXIgaGFuZGVkbmVzc1NjYWxlID0gcmlnaHRIYW5kZWQgPyAtMS4wIDogMS4wO1xuXG4gICAgLy8gc3RhcnQgd2l0aCBhbiBpZGVudGl0eSBtYXRyaXhcbiAgICB2YXIgbW9iaiA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG4gICAgdmFyIG0gPSBtb2JqLmVsZW1lbnRzO1xuXG4gICAgLy8gYW5kIHdpdGggc2NhbGUvb2Zmc2V0IGluZm8gZm9yIG5vcm1hbGl6ZWQgZGV2aWNlIGNvb3Jkc1xuICAgIHZhciBzY2FsZUFuZE9mZnNldCA9IGZvdlRvTkRDU2NhbGVPZmZzZXQoZm92KTtcblxuICAgIC8vIFggcmVzdWx0LCBtYXAgY2xpcCBlZGdlcyB0byBbLXcsK3ddXG4gICAgbVswICogNCArIDBdID0gc2NhbGVBbmRPZmZzZXQuc2NhbGVbMF07XG4gICAgbVswICogNCArIDFdID0gMC4wO1xuICAgIG1bMCAqIDQgKyAyXSA9IHNjYWxlQW5kT2Zmc2V0Lm9mZnNldFswXSAqIGhhbmRlZG5lc3NTY2FsZTtcbiAgICBtWzAgKiA0ICsgM10gPSAwLjA7XG5cbiAgICAvLyBZIHJlc3VsdCwgbWFwIGNsaXAgZWRnZXMgdG8gWy13LCt3XVxuICAgIC8vIFkgb2Zmc2V0IGlzIG5lZ2F0ZWQgYmVjYXVzZSB0aGlzIHByb2ogbWF0cml4IHRyYW5zZm9ybXMgZnJvbSB3b3JsZCBjb29yZHMgd2l0aCBZPXVwLFxuICAgIC8vIGJ1dCB0aGUgTkRDIHNjYWxpbmcgaGFzIFk9ZG93biAodGhhbmtzIEQzRD8pXG4gICAgbVsxICogNCArIDBdID0gMC4wO1xuICAgIG1bMSAqIDQgKyAxXSA9IHNjYWxlQW5kT2Zmc2V0LnNjYWxlWzFdO1xuICAgIG1bMSAqIDQgKyAyXSA9IC1zY2FsZUFuZE9mZnNldC5vZmZzZXRbMV0gKiBoYW5kZWRuZXNzU2NhbGU7XG4gICAgbVsxICogNCArIDNdID0gMC4wO1xuXG4gICAgLy8gWiByZXN1bHQgKHVwIHRvIHRoZSBhcHApXG4gICAgbVsyICogNCArIDBdID0gMC4wO1xuICAgIG1bMiAqIDQgKyAxXSA9IDAuMDtcbiAgICBtWzIgKiA0ICsgMl0gPSB6RmFyIC8gKHpOZWFyIC0gekZhcikgKiAtaGFuZGVkbmVzc1NjYWxlO1xuICAgIG1bMiAqIDQgKyAzXSA9ICh6RmFyICogek5lYXIpIC8gKHpOZWFyIC0gekZhcik7XG5cbiAgICAvLyBXIHJlc3VsdCAoPSBaIGluKVxuICAgIG1bMyAqIDQgKyAwXSA9IDAuMDtcbiAgICBtWzMgKiA0ICsgMV0gPSAwLjA7XG4gICAgbVszICogNCArIDJdID0gaGFuZGVkbmVzc1NjYWxlO1xuICAgIG1bMyAqIDQgKyAzXSA9IDAuMDtcblxuICAgIG1vYmoudHJhbnNwb3NlKCk7XG5cbiAgICByZXR1cm4gbW9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvdlRvUHJvamVjdGlvbiggZm92LCByaWdodEhhbmRlZCwgek5lYXIsIHpGYXIgKSB7XG5cbiAgICB2YXIgREVHMlJBRCA9IE1hdGguUEkgLyAxODAuMDtcblxuICAgIHZhciBmb3ZQb3J0ID0ge1xuICAgICAgdXBUYW46IE1hdGgudGFuKCBmb3YudXBEZWdyZWVzICogREVHMlJBRCApLFxuICAgICAgZG93blRhbjogTWF0aC50YW4oIGZvdi5kb3duRGVncmVlcyAqIERFRzJSQUQgKSxcbiAgICAgIGxlZnRUYW46IE1hdGgudGFuKCBmb3YubGVmdERlZ3JlZXMgKiBERUcyUkFEICksXG4gICAgICByaWdodFRhbjogTWF0aC50YW4oIGZvdi5yaWdodERlZ3JlZXMgKiBERUcyUkFEIClcbiAgICB9O1xuXG4gICAgcmV0dXJuIGZvdlBvcnRUb1Byb2plY3Rpb24oIGZvdlBvcnQsIHJpZ2h0SGFuZGVkLCB6TmVhciwgekZhciApO1xuXG4gIH1cblxuICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmb3ZUb1Byb2plY3Rpb246IGZvdlRvUHJvamVjdGlvblxuICB9O1xuXG4gIH0pO30pKHR5cGVvZiBkZWZpbmU9PSdmdW5jdGlvbicmJmRlZmluZS5hbWQ/ZGVmaW5lXG46KGZ1bmN0aW9uKG4sdyl7J3VzZSBzdHJpY3QnO3JldHVybiB0eXBlb2YgbW9kdWxlPT0nb2JqZWN0Jz9mdW5jdGlvbihjKXtcbmMocmVxdWlyZSxleHBvcnRzLG1vZHVsZSk7fTpmdW5jdGlvbihjKXt2YXIgbT17ZXhwb3J0czp7fX07YyhmdW5jdGlvbihuKXtcbnJldHVybiB3W25dO30sbS5leHBvcnRzLG0pO3dbbl09bS5leHBvcnRzO307fSkoJ1ZSUGVyc3BlY3RpdmUnLHRoaXMpKTtcbiIsIiAvKiBnbG9iYWxzIGRlZmluZSAqL1xuIChmdW5jdGlvbihkZWZpbmUpeyd1c2Ugc3RyaWN0JztkZWZpbmUoZnVuY3Rpb24ocmVxdWlyZSxleHBvcnRzLG1vZHVsZSl7XG5cbiAgICB2YXIgdnJEZXZpY2VzID0ge307XG4gICAgdmFyIHZpZXdwb3J0O1xuICAgIHZhciBzY2VuZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY2VuZScpO1xuICAgIHZhciB3b3JsZDtcbiAgICB2YXIgY2FtZXJhO1xuICAgIHZhciBmdWxsc2NyZWVuID0gZmFsc2U7XG4gICAgdmFyIHByb2plY3Rpb25UcmFuc2Zvcm07XG4gICAgdmFyIGZvdjtcbiAgICB2YXIgeCA9IDA7XG4gICAgdmFyIHkgPSAwO1xuICAgIHZhciB6ID0gMDtcbiAgICB2YXIgcm90WCA9IDA7XG4gICAgdmFyIHJvdFkgPSAwO1xuICAgIHZhciByb3RaID0gMDtcbiAgICB2YXIgdHJhbnNsYXRpb24gPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuICAgIHZhciByb3RhdGlvbjtcbiAgICB2YXIgcm90YXRpb25FdWxlciA9IFRIUkVFLkV1bGVyKDAsIDAsIDAsIFwiWVhaXCIpO1xuICAgIHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVJRDtcbiAgICB2YXIgcmVxdWVzdEZ1bGxTY3JlZW47XG5cbiAgICB2YXIgc3RhcnQgPSBwYXJzZUludChuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gICAgc2V0dXBWUkRldmljZXMoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZmluaXNoO1xuICAgICAgLy8gQ3JlYXRlcyB2aWV3cG9ydCwgY2FtZXJhIGFuZCB3b3JsZCBlbGVtZW50c1xuICAgICAgc2V0dXBTY2VuZSgpO1xuICAgICAgLy8gSW5pdGlhdGVzIHRoZSBjYW1lcmEgcGVyc3BlY3RpdmUgbWF0cml4XG4gICAgICBzZXR1cFBlcnNwZWN0aXZlKCk7XG4gICAgICAvLyBGb3IgbW91c2UgbG9vayBtb2RlIHdoZW4gdGhlcmUncyBubyBITUQgYXZhaWFsYWJsZVxuICAgICAgc2V0dXBJbnB1dEV2ZW50SGFuZGxlcnMoKTtcbiAgICAgIHNldHVwRnVsbHNjcmVlbkhhbmRsZXJzKCk7XG4gICAgICBmaW5pc2ggPSBwYXJzZUludChuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gICAgICBjb25zb2xlLmxvZyhcIkdFVCBWUiBEZXZpY2VzIHRpbWUgOlwiICsgKGZpbmlzaCAtIHN0YXJ0KSk7XG4gICAgICAvLyBGdW5jdGlvbiB0aGF0IHVwZGF0ZXMgdGhlIGNhbWVyYSBvcmllbnRhdGlvbiBmcm9tIEhNRCBpbmZvcm1hdGlvblxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lSUQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZUNhbWVyYSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzZXR1cFZSRGV2aWNlcyhkb25lKSB7XG4gICAgICBpZiAobmF2aWdhdG9yLmdldFZSRGV2aWNlcyAmJiBuYXZpZ2F0b3IuZ2V0VlJEZXZpY2VzKCkudGhlbikge1xuICAgICAgICBuYXZpZ2F0b3IuZ2V0VlJEZXZpY2VzKCkudGhlbihnb3RWUkRldmljZXMpO1xuICAgICAgfSBlbHNlIHsgZG9uZSgpOyB9XG4gICAgICBmdW5jdGlvbiBnb3RWUkRldmljZXMoZGV2aWNlcykge1xuICAgICAgICAgIHZhciBpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGV2aWNlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGRldmljZXNbaV0gaW5zdGFuY2VvZiBITURWUkRldmljZSkge1xuICAgICAgICAgICAgICB2ckRldmljZXMuaGVhZHNldCA9IGRldmljZXNbaV07XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRldmljZXNbaV0gaW5zdGFuY2VvZiBQb3NpdGlvblNlbnNvclZSRGV2aWNlKSB7XG4gICAgICAgICAgICAgIHZyRGV2aWNlcy5wb3NpdGlvbiA9IGRldmljZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodnJEZXZpY2VzLmhlYWRzZXQgJiYgdnJEZXZpY2VzLnBvc2l0aW9uKSB7IGJyZWFrOyB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGRvbmUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbnRlclZSKCkge1xuICAgICAgcmVxdWVzdEZ1bGxTY3JlZW4uY2FsbChzY2VuZSwgeyB2ckRpc3BsYXk6IHZyRGV2aWNlcy5oZWFkc2V0IH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwUGVyc3BlY3RpdmUoKSB7XG4gICAgICBmb3YgPSB2ckRldmljZXMuaGVhZHNldD8gdnJEZXZpY2VzLmhlYWRzZXQuZ2V0RXllUGFyYW1ldGVycygnbGVmdCcpLnJlY29tbWVuZGVkRmllbGRPZlZpZXcgOiB7IHVwRGVncmVlczogNDUsIHJpZ2h0RGVncmVlczogNDUsIGRvd25EZWdyZWVzOiA0NSwgbGVmdERlZ3JlZXM6IDQ1IH07XG4gICAgICAvL3ZhciBwZXJzcGVjdGl2ZSA9IFZSUGVyc3BlY3RpdmUuZm92VG9Qcm9qZWN0aW9uKCBmb3YsIHRydWUsIDEsIDEwMDAwICk7XG4gICAgICB2YXIgcGVyc3BlY3RpdmUgPSBwZXJzcGVjdGl2ZU1hdHJpeChUSFJFRS5NYXRoLmRlZ1RvUmFkKGZvdi51cERlZ3JlZXMpLCB2aWV3cG9ydC5vZmZzZXRXaWR0aCAvIHZpZXdwb3J0Lm9mZnNldEhlaWdodCwgMSwgMTAwMDApO1xuICAgICAgcGVyc3BlY3RpdmUgPSBwZXJzcGVjdGl2ZS5jbG9uZSgpLnNjYWxlKG5ldyBUSFJFRS5WZWN0b3IzKHZpZXdwb3J0Lm9mZnNldFdpZHRoLCB2aWV3cG9ydC5vZmZzZXRIZWlnaHQsIDEpKTtcbiAgICAgIHByb2plY3Rpb25UcmFuc2Zvcm0gPSBnZXRDU1NNYXRyaXgocGVyc3BlY3RpdmUpO1xuICAgICAgdmlld3BvcnQuc3R5bGUudHJhbnNmb3JtID0gcHJvamVjdGlvblRyYW5zZm9ybTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cFNjZW5lKCkge1xuICAgICAgdmFyIGk7XG4gICAgICB2YXIgdnJFbHMgPSBzY2VuZS5jaGlsZHJlbjtcbiAgICAgIHZhciB2ckVsc0xlbmd0aCA9IHZyRWxzLmxlbmd0aDtcbiAgICAgIHZpZXdwb3J0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB2aWV3cG9ydC5jbGFzc0xpc3QuYWRkKCd2aWV3cG9ydCcpO1xuICAgICAgY2FtZXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjYW1lcmEuY2xhc3NMaXN0LmFkZCgndnInKTtcbiAgICAgIGNhbWVyYS5jbGFzc0xpc3QuYWRkKCdjYW1lcmEnKTtcbiAgICAgIHdvcmxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB3b3JsZC5jbGFzc0xpc3QuYWRkKCd2cicpO1xuICAgICAgd29ybGQuY2xhc3NMaXN0LmFkZCgnd29ybGQnKTtcblxuICAgICAgLy8gU2V0dXAgSGllcmFyY2h5XG4gICAgICAvLyBzY2VuZVxuICAgICAgLy8gICB2aWV3cG9ydFxuICAgICAgLy8gICAgICBjYW1lcmFcbiAgICAgIC8vICAgICAgICB3b3JsZFxuICAgICAgLy8gICAgICAgICAgdXNlci1lbGVtZW50c1xuICAgICAgZm9yKGkgPSAwOyBpIDwgdnJFbHNMZW5ndGg7ICsraSkge1xuICAgICAgICB3b3JsZC5hcHBlbmRDaGlsZCh2ckVsc1swXSk7XG4gICAgICB9XG4gICAgICBzY2VuZS5hcHBlbmRDaGlsZCh2aWV3cG9ydCk7XG4gICAgICB2aWV3cG9ydC5hcHBlbmRDaGlsZChjYW1lcmEpO1xuICAgICAgY2FtZXJhLmFwcGVuZENoaWxkKHdvcmxkKTtcbiAgICAgIHJlcXVlc3RGdWxsU2NyZWVuID0gc2NlbmUubW96UmVxdWVzdEZ1bGxTY3JlZW4gfHwgc2NlbmUud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQ2FtZXJhKCkge1xuICAgICAgdmFyIHRyYW5zZm9ybTtcbiAgICAgIGlmIChmdWxsc2NyZWVuKSB7XG4gICAgICAgIHRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgtNTAlLCAtNTAlLCAwcHgpJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zZm9ybSA9IHByb2plY3Rpb25UcmFuc2Zvcm07XG4gICAgICB9XG4gICAgICBwb2xsSGVhZE9yaWVudGF0aW9uKCk7XG4gICAgICB2aWV3cG9ydC5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZUNhbWVyYSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9sbEhlYWRPcmllbnRhdGlvbigpIHtcbiAgICAgIHZhciBvcmllbnRhdGlvbjtcbiAgICAgIHZhciBxdWF0ZXJuaW9uO1xuICAgICAgdmFyIHBvc2l0aW9uXG4gICAgICB2YXIgc3RhdGU7XG4gICAgICBpZiAodnJEZXZpY2VzLnBvc2l0aW9uKSB7XG4gICAgICAgIHN0YXRlID0gdnJEZXZpY2VzLnBvc2l0aW9uLmdldFN0YXRlKClcbiAgICAgICAgb3JpZW50YXRpb24gPSBzdGF0ZS5vcmllbnRhdGlvbjtcbiAgICAgICAgcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgcXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKG9yaWVudGF0aW9uLngsIC1vcmllbnRhdGlvbi55LCBvcmllbnRhdGlvbi56LCBvcmllbnRhdGlvbi53KTtcbiAgICAgICAgICByb3RhdGlvbiA9IG5ldyBUSFJFRS5NYXRyaXg0KCkubWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgICAgdHJhbnNsYXRpb24gPSBuZXcgVEhSRUUuTWF0cml4NCgpLm1ha2VUcmFuc2xhdGlvbihwb3NpdGlvbi54ICwgcG9zaXRpb24ueSAsIHBvc2l0aW9uLnopO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB1cGRhdGVFbGVtZW50KGNhbWVyYSwge1xuICAgICAgICByb3RhdGlvbjogcm90YXRpb24sXG4gICAgICAgIHRyYW5zbGF0aW9uOiB0cmFuc2xhdGlvblxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dXBGdWxsc2NyZWVuSGFuZGxlcnMoKSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwid2Via2l0ZnVsbHNjcmVlbmNoYW5nZVwiLCBvbmZ1bGxzY3JlZW5jaGFuZ2UpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vemZ1bGxzY3JlZW5jaGFuZ2VcIiwgICAgb25mdWxsc2NyZWVuY2hhbmdlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmdWxsc2NyZWVuY2hhbmdlXCIsICAgICAgIG9uZnVsbHNjcmVlbmNoYW5nZSk7XG5cbiAgICAgIGZ1bmN0aW9uIG9uZnVsbHNjcmVlbmNoYW5nZSgpIHtcbiAgICAgICAgaWYgKCAhZG9jdW1lbnQubW96RnVsbFNjcmVlbkVsZW1lbnQgJiYgIWRvY3VtZW50LndlYmtpdEZ1bGxTY3JlZW5FbGVtZW50ICkge1xuICAgICAgICAgIHZpZXdwb3J0LmNsYXNzTGlzdC5yZW1vdmUoJ2Z1bGxzY3JlZW4nKTtcbiAgICAgICAgICBmdWxsc2NyZWVuID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZ1bGxzY3JlZW4gPSB0cnVlO1xuICAgICAgICB2aWV3cG9ydC5jbGFzc0xpc3QuYWRkKCdmdWxsc2NyZWVuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGVyc3BlY3RpdmVNYXRyaXgoZm92LCBhc3BlY3QsIG5lYXJ6LCBmYXJ6KSB7XG4gICAgICB2YXIgbWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcbiAgICAgIHZhciByYW5nZSA9IE1hdGgudGFuKGZvdiAqIDAuNSkgKiBuZWFyejtcblxuICAgICAgbWF0cml4LmVsZW1lbnRzWzBdID0gKDIgKiBuZWFyeikgLyAoKHJhbmdlICogYXNwZWN0KSAtICgtcmFuZ2UgKiBhc3BlY3QpKTtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1sxXSA9IDA7XG4gICAgICBtYXRyaXguZWxlbWVudHNbMl0gPSAwO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzNdID0gMDtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1s0XSA9IDA7XG4gICAgICBtYXRyaXguZWxlbWVudHNbNV0gPSAoMiAqIG5lYXJ6KSAvICgyICogcmFuZ2UpO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzZdID0gMDtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1s3XSA9IDA7XG4gICAgICBtYXRyaXguZWxlbWVudHNbOF0gPSAwO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzldID0gMDtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1sxMF0gPSAtKGZhcnogKyBuZWFyeikgLyAoZmFyeiAtIG5lYXJ6KTtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1sxMV0gPSAtMTtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1sxMl0gPSAwO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzEzXSA9IDA7XG4gICAgICBtYXRyaXguZWxlbWVudHNbMTRdID0gLSgyICogZmFyeiAqIG5lYXJ6KSAvIChmYXJ6IC0gbmVhcnopO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzE1XSA9IDA7XG4gICAgICByZXR1cm4gbWF0cml4LnRyYW5zcG9zZSgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRDU1NNYXRyaXgobWF0cml4KSB7XG4gICAgICB2YXIgZWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XG5cbiAgICAgIHJldHVybiAnbWF0cml4M2QoJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyAwIF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyAxIF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyAyIF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyAzIF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyA0IF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyA1IF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyA2IF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyA3IF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyA4IF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyA5IF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyAxMCBdICkgKyAnLCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgMTEgXSApICsgJywnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDEyIF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyAxMyBdICkgKyAnLCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgMTQgXSApICsgJywnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDE1IF0gKSArXG4gICAgICAnKSc7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGVwc2lsb24oIHZhbHVlICkge1xuICAgICAgcmV0dXJuIE1hdGguYWJzKCB2YWx1ZSApIDwgMC4wMDAwMDEgPyAwIDogdmFsdWU7XG4gICAgfTtcblxuICAgIHZhciByb3RhdGlvbkVuYWJsZWQ7XG4gICAgdmFyIGxhc3RNb3VzZVg7XG4gICAgdmFyIGxhc3RNb3VzZVk7XG4gICAgdmFyIFBJXzIgPSBNYXRoLlBJIC8gMjtcbiAgICB2YXIgY2FtZXJhUm90YXRpb247XG4gICAgdmFyIGNhbWVyYVRyYW5zbGF0aW9uO1xuXG4gICAgZnVuY3Rpb24gc2V0dXBJbnB1dEV2ZW50SGFuZGxlcnMoKSB7XG4gICAgICBzY2VuZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICByb3RhdGlvbkVuYWJsZWQgPSB0cnVlO1xuICAgICAgICBzY2VuZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3Rpb24tZGlzYWJsZWQnKTtcbiAgICAgICAgc2NlbmUuY2xhc3NMaXN0LmFkZCgnZ3JhYmJpbmcnKTtcbiAgICAgICAgbGFzdE1vdXNlWCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIGxhc3RNb3VzZVkgPSBldmVudC5jbGllbnRZO1xuICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgIHNjZW5lLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICByb3RhdGlvbkVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgc2NlbmUuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0aW9uLWRpc2FibGVkJyk7XG4gICAgICAgIHNjZW5lLmNsYXNzTGlzdC5yZW1vdmUoJ2dyYWJiaW5nJyk7XG4gICAgICB9LCB0cnVlKTtcblxuICAgICAgc2NlbmUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKCFyb3RhdGlvbkVuYWJsZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlbHRhWCA9IChldmVudC5jbGllbnRYIC0gbGFzdE1vdXNlWCkgKiAwLjI7XG4gICAgICAgIHZhciBkZWx0YVkgPSAoZXZlbnQuY2xpZW50WSAtIGxhc3RNb3VzZVkpICogMC4yO1xuICAgICAgICByb3RYICs9IGRlbHRhWDtcbiAgICAgICAgcm90WSAtPSBkZWx0YVk7XG4gICAgICAgIC8vIENsYW1wIHRvIFstUEkgLyAyLCBQSSAvIDJdXG4gICAgICAgIHJvdFkgPSBNYXRoLm1heCggLTkwLCBNYXRoLm1pbiggOTAsIHJvdFkgKSApO1xuXG4gICAgICAgIGxhc3RNb3VzZVggPSBldmVudC5jbGllbnRYO1xuICAgICAgICBsYXN0TW91c2VZID0gZXZlbnQuY2xpZW50WTtcbiAgICAgICAgdHJhbnNsYXRpb24gPSBuZXcgVEhSRUUuTWF0cml4NCgpLm1ha2VUcmFuc2xhdGlvbih4ICwgeSAsIHopO1xuICAgICAgICByb3RhdGlvbkV1bGVyID0gbmV3IFRIUkVFLkV1bGVyKFxuICAgICAgICAgIFRIUkVFLk1hdGguZGVnVG9SYWQocm90WSksXG4gICAgICAgICAgVEhSRUUuTWF0aC5kZWdUb1JhZChyb3RYKSxcbiAgICAgICAgICBUSFJFRS5NYXRoLmRlZ1RvUmFkKHJvdFopLFxuICAgICAgICAgIFwiWFlaXCIgKTtcbiAgICAgICAgcm90YXRpb24gPSBuZXcgVEhSRUUuTWF0cml4NCgpLm1ha2VSb3RhdGlvbkZyb21FdWxlcihyb3RhdGlvbkV1bGVyKTtcblxuICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBpZiAoICggZS5rZXljb2RlIHx8IGUud2hpY2ggKSA9PSAzMikge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuICAgICAgfSwgZmFsc2UpO1xuXG4gICAgfVxuXG4gICAgdmFyIHVwZGF0ZUVsZW1lbnQgPSBmdW5jdGlvbihvYmplY3QsIGRhdGEpIHtcbiAgICAgIHZhciB0cmFuc2xhdGlvbiA9IGRhdGEudHJhbnNsYXRpb24uY2xvbmUoKSB8fCBuZXcgVEhSRUUuTWF0cml4NCgpO1xuICAgICAgdmFyIHJvdGF0aW9uID0gZGF0YS5yb3RhdGlvbiB8fCBuZXcgVEhSRUUuTWF0cml4NCgpO1xuICAgICAgb2JqZWN0LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlM2QoLTUwJSwgLTUwJSwgMHB4KSBcIiArIGdldENTU01hdHJpeCh0cmFuc2xhdGlvbi5tdWx0aXBseShyb3RhdGlvbikpO1xuICAgIH07XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAgIHplcm9TZW5zb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcm90WCA9IDA7XG4gICAgICAgIHJvdFkgPSAwO1xuICAgICAgICByb3RhdGlvbiA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG4gICAgICAgIHRyYW5zbGF0aW9uID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcbiAgICAgICAgaWYgKHZyRGV2aWNlcy5wb3NpdGlvbikgeyB2ckRldmljZXMucG9zaXRpb24ucmVzZXRTZW5zb3IoKTsgfVxuICAgICAgfSxcbiAgICAgIGVudGVyVlI6IGVudGVyVlJcbiAgICB9O1xuXG59KTt9KSh0eXBlb2YgZGVmaW5lPT0nZnVuY3Rpb24nJiZkZWZpbmUuYW1kP2RlZmluZVxuOihmdW5jdGlvbihuLHcpeyd1c2Ugc3RyaWN0JztyZXR1cm4gdHlwZW9mIG1vZHVsZT09J29iamVjdCc/ZnVuY3Rpb24oYyl7XG5jKHJlcXVpcmUsZXhwb3J0cyxtb2R1bGUpO306ZnVuY3Rpb24oYyl7dmFyIG09e2V4cG9ydHM6e319O2MoZnVuY3Rpb24obil7XG5yZXR1cm4gd1tuXTt9LG0uZXhwb3J0cyxtKTt3W25dPW0uZXhwb3J0czt9O30pKCdWUkNTUycsdGhpcykpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9