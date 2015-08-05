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
    var cursorEnabled = false;
    var sceneReady = false;

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
      if (cursorEnabled) {
        VRCursor.enable(true);
      }
      sceneReady = true;
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
      viewport.style.webkitTransform = projectionTransform;
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
      viewport.style.webkitTransform = transform;
      VRCursor.intersect(fullscreen);
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
      var cssMatrix = getCSSMatrix(translation.multiply(rotation));
      object.style.transform = "translate3d(-50%, -50%, 0) " + cssMatrix;
      object.style.webkitTransform = "translate3d(-50%, -50%, 0) " + cssMatrix;
    };

    function enableCursor(enable) {
      cursorEnabled = !!enable;
      if (sceneReady) { VRCursor.enable(true); }
    }

    module.exports = {
      zeroSensor: function () {
        rotX = 0;
        rotY = 0;
        rotation = new THREE.Matrix4();
        translation = new THREE.Matrix4();
        if (vrDevices.position) { vrDevices.position.resetSensor(); }
      },
      enterVR: enterVR,
      enableCursor: enableCursor
    };

});})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){
return w[n];},m.exports,m);w[n]=m.exports;};})('VRCSS',this));

 /* globals define */
 (function(define){'use strict';define(function(require,exports,module){

    var viewport;
    var cursor;
    var intersectedEl;

    function setupCursor() {
      viewport = document.querySelector('.viewport');
      cursor = document.createElement('div');
      cursor.classList.add('vr');
      cursor.classList.add('cursor');
      cursor.classList.add('world');
      viewport.appendChild(cursor);
    }

    function intersect(vrEnabled) {
      var rect = cursor.getBoundingClientRect();
      var el;
      if (vrEnabled) {
        el = document.elementFromPoint(0, 0);
      } else {
        el = document.elementFromPoint(rect.x, rect.y);
      }
      console.log("RECT " + rect.x + " " + rect.y);
      if (el) {
        if (el === intersectedEl) { return; }
        if (intersectedEl) {
          intersectedEl.classList.remove('hover');
        }
        intersectedEl = el;
        intersectedEl.classList.add('hover');
      } else {
        intersectedEl = undefined;
      }
    }

    module.exports = {
      enable: function (enable) {
        if (enable) {
          setupCursor();
        }
      },
      intersect: intersect
    };


  });})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){
return w[n];},m.exports,m);w[n]=m.exports;};})('VRCursor',this));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRocmVlLmpzIiwicGVyc3BlY3RpdmUuanMiLCJjc3N2ci5qcyIsInZyLWN1cnNvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbFNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNzc3ZyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRmlsZTpzcmMvVGhyZWUuanNcblxuLyoqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICovXG5cbnZhciBUSFJFRSA9IHsgUkVWSVNJT046ICc3MmRldicgfTtcblxuLy8gYnJvd3NlcmlmeSBzdXBwb3J0XG5cbmlmICggdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBUSFJFRTtcblxufVxuXG4vLyBwb2x5ZmlsbHNcblxuaWYgKCBNYXRoLnNpZ24gPT09IHVuZGVmaW5lZCApIHtcblxuXHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXRoL3NpZ25cblxuXHRNYXRoLnNpZ24gPSBmdW5jdGlvbiAoIHggKSB7XG5cblx0XHRyZXR1cm4gKCB4IDwgMCApID8gLSAxIDogKCB4ID4gMCApID8gMSA6ICt4O1xuXG5cdH07XG5cbn1cblxuLy8gRmlsZTpzcmMvbWF0aC9RdWF0ZXJuaW9uLmpzXG5cbi8qKlxuICogQGF1dGhvciBtaWthZWwgZW10aW5nZXIgLyBodHRwOi8vZ29tby5zZS9cbiAqIEBhdXRob3IgYWx0ZXJlZHEgLyBodHRwOi8vYWx0ZXJlZHF1YWxpYS5jb20vXG4gKiBAYXV0aG9yIFdlc3RMYW5nbGV5IC8gaHR0cDovL2dpdGh1Yi5jb20vV2VzdExhbmdsZXlcbiAqIEBhdXRob3IgYmhvdXN0b24gLyBodHRwOi8vZXhvY29ydGV4LmNvbVxuICovXG5cblRIUkVFLlF1YXRlcm5pb24gPSBmdW5jdGlvbiAoIHgsIHksIHosIHcgKSB7XG5cblx0dGhpcy5feCA9IHggfHwgMDtcblx0dGhpcy5feSA9IHkgfHwgMDtcblx0dGhpcy5feiA9IHogfHwgMDtcblx0dGhpcy5fdyA9ICggdyAhPT0gdW5kZWZpbmVkICkgPyB3IDogMTtcblxufTtcblxuVEhSRUUuUXVhdGVybmlvbi5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IFRIUkVFLlF1YXRlcm5pb24sXG5cblx0X3g6IDAsX3k6IDAsIF96OiAwLCBfdzogMCxcblxuXHRnZXQgeCAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5feDtcblxuXHR9LFxuXG5cdHNldCB4ICggdmFsdWUgKSB7XG5cblx0XHR0aGlzLl94ID0gdmFsdWU7XG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0fSxcblxuXHRnZXQgeSAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5feTtcblxuXHR9LFxuXG5cdHNldCB5ICggdmFsdWUgKSB7XG5cblx0XHR0aGlzLl95ID0gdmFsdWU7XG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0fSxcblxuXHRnZXQgeiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5fejtcblxuXHR9LFxuXG5cdHNldCB6ICggdmFsdWUgKSB7XG5cblx0XHR0aGlzLl96ID0gdmFsdWU7XG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0fSxcblxuXHRnZXQgdyAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5fdztcblxuXHR9LFxuXG5cdHNldCB3ICggdmFsdWUgKSB7XG5cblx0XHR0aGlzLl93ID0gdmFsdWU7XG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0fSxcblxuXHRzZXQ6IGZ1bmN0aW9uICggeCwgeSwgeiwgdyApIHtcblxuXHRcdHRoaXMuX3ggPSB4O1xuXHRcdHRoaXMuX3kgPSB5O1xuXHRcdHRoaXMuX3ogPSB6O1xuXHRcdHRoaXMuX3cgPSB3O1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNvcHk6IGZ1bmN0aW9uICggcXVhdGVybmlvbiApIHtcblxuXHRcdHRoaXMuX3ggPSBxdWF0ZXJuaW9uLng7XG5cdFx0dGhpcy5feSA9IHF1YXRlcm5pb24ueTtcblx0XHR0aGlzLl96ID0gcXVhdGVybmlvbi56O1xuXHRcdHRoaXMuX3cgPSBxdWF0ZXJuaW9uLnc7XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbUV1bGVyOiBmdW5jdGlvbiAoIGV1bGVyLCB1cGRhdGUgKSB7XG5cblx0XHRpZiAoIGV1bGVyIGluc3RhbmNlb2YgVEhSRUUuRXVsZXIgPT09IGZhbHNlICkge1xuXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoICdUSFJFRS5RdWF0ZXJuaW9uOiAuc2V0RnJvbUV1bGVyKCkgbm93IGV4cGVjdHMgYSBFdWxlciByb3RhdGlvbiByYXRoZXIgdGhhbiBhIFZlY3RvcjMgYW5kIG9yZGVyLicgKTtcblx0XHR9XG5cblx0XHQvLyBodHRwOi8vd3d3Lm1hdGh3b3Jrcy5jb20vbWF0bGFiY2VudHJhbC9maWxlZXhjaGFuZ2UvXG5cdFx0Ly8gXHQyMDY5Ni1mdW5jdGlvbi10by1jb252ZXJ0LWJldHdlZW4tZGNtLWV1bGVyLWFuZ2xlcy1xdWF0ZXJuaW9ucy1hbmQtZXVsZXItdmVjdG9ycy9cblx0XHQvL1x0Y29udGVudC9TcGluQ2FsYy5tXG5cblx0XHR2YXIgYzEgPSBNYXRoLmNvcyggZXVsZXIuX3ggLyAyICk7XG5cdFx0dmFyIGMyID0gTWF0aC5jb3MoIGV1bGVyLl95IC8gMiApO1xuXHRcdHZhciBjMyA9IE1hdGguY29zKCBldWxlci5feiAvIDIgKTtcblx0XHR2YXIgczEgPSBNYXRoLnNpbiggZXVsZXIuX3ggLyAyICk7XG5cdFx0dmFyIHMyID0gTWF0aC5zaW4oIGV1bGVyLl95IC8gMiApO1xuXHRcdHZhciBzMyA9IE1hdGguc2luKCBldWxlci5feiAvIDIgKTtcblxuXHRcdGlmICggZXVsZXIub3JkZXIgPT09ICdYWVonICkge1xuXG5cdFx0XHR0aGlzLl94ID0gczEgKiBjMiAqIGMzICsgYzEgKiBzMiAqIHMzO1xuXHRcdFx0dGhpcy5feSA9IGMxICogczIgKiBjMyAtIHMxICogYzIgKiBzMztcblx0XHRcdHRoaXMuX3ogPSBjMSAqIGMyICogczMgKyBzMSAqIHMyICogYzM7XG5cdFx0XHR0aGlzLl93ID0gYzEgKiBjMiAqIGMzIC0gczEgKiBzMiAqIHMzO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdZWFonICkge1xuXG5cdFx0XHR0aGlzLl94ID0gczEgKiBjMiAqIGMzICsgYzEgKiBzMiAqIHMzO1xuXHRcdFx0dGhpcy5feSA9IGMxICogczIgKiBjMyAtIHMxICogYzIgKiBzMztcblx0XHRcdHRoaXMuX3ogPSBjMSAqIGMyICogczMgLSBzMSAqIHMyICogYzM7XG5cdFx0XHR0aGlzLl93ID0gYzEgKiBjMiAqIGMzICsgczEgKiBzMiAqIHMzO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdaWFknICkge1xuXG5cdFx0XHR0aGlzLl94ID0gczEgKiBjMiAqIGMzIC0gYzEgKiBzMiAqIHMzO1xuXHRcdFx0dGhpcy5feSA9IGMxICogczIgKiBjMyArIHMxICogYzIgKiBzMztcblx0XHRcdHRoaXMuX3ogPSBjMSAqIGMyICogczMgKyBzMSAqIHMyICogYzM7XG5cdFx0XHR0aGlzLl93ID0gYzEgKiBjMiAqIGMzIC0gczEgKiBzMiAqIHMzO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdaWVgnICkge1xuXG5cdFx0XHR0aGlzLl94ID0gczEgKiBjMiAqIGMzIC0gYzEgKiBzMiAqIHMzO1xuXHRcdFx0dGhpcy5feSA9IGMxICogczIgKiBjMyArIHMxICogYzIgKiBzMztcblx0XHRcdHRoaXMuX3ogPSBjMSAqIGMyICogczMgLSBzMSAqIHMyICogYzM7XG5cdFx0XHR0aGlzLl93ID0gYzEgKiBjMiAqIGMzICsgczEgKiBzMiAqIHMzO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdZWlgnICkge1xuXG5cdFx0XHR0aGlzLl94ID0gczEgKiBjMiAqIGMzICsgYzEgKiBzMiAqIHMzO1xuXHRcdFx0dGhpcy5feSA9IGMxICogczIgKiBjMyArIHMxICogYzIgKiBzMztcblx0XHRcdHRoaXMuX3ogPSBjMSAqIGMyICogczMgLSBzMSAqIHMyICogYzM7XG5cdFx0XHR0aGlzLl93ID0gYzEgKiBjMiAqIGMzIC0gczEgKiBzMiAqIHMzO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdYWlknICkge1xuXG5cdFx0XHR0aGlzLl94ID0gczEgKiBjMiAqIGMzIC0gYzEgKiBzMiAqIHMzO1xuXHRcdFx0dGhpcy5feSA9IGMxICogczIgKiBjMyAtIHMxICogYzIgKiBzMztcblx0XHRcdHRoaXMuX3ogPSBjMSAqIGMyICogczMgKyBzMSAqIHMyICogYzM7XG5cdFx0XHR0aGlzLl93ID0gYzEgKiBjMiAqIGMzICsgczEgKiBzMiAqIHMzO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB1cGRhdGUgIT09IGZhbHNlICkgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldEZyb21BeGlzQW5nbGU6IGZ1bmN0aW9uICggYXhpcywgYW5nbGUgKSB7XG5cblx0XHQvLyBodHRwOi8vd3d3LmV1Y2xpZGVhbnNwYWNlLmNvbS9tYXRocy9nZW9tZXRyeS9yb3RhdGlvbnMvY29udmVyc2lvbnMvYW5nbGVUb1F1YXRlcm5pb24vaW5kZXguaHRtXG5cblx0XHQvLyBhc3N1bWVzIGF4aXMgaXMgbm9ybWFsaXplZFxuXG5cdFx0dmFyIGhhbGZBbmdsZSA9IGFuZ2xlIC8gMiwgcyA9IE1hdGguc2luKCBoYWxmQW5nbGUgKTtcblxuXHRcdHRoaXMuX3ggPSBheGlzLnggKiBzO1xuXHRcdHRoaXMuX3kgPSBheGlzLnkgKiBzO1xuXHRcdHRoaXMuX3ogPSBheGlzLnogKiBzO1xuXHRcdHRoaXMuX3cgPSBNYXRoLmNvcyggaGFsZkFuZ2xlICk7XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbVJvdGF0aW9uTWF0cml4OiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHQvLyBodHRwOi8vd3d3LmV1Y2xpZGVhbnNwYWNlLmNvbS9tYXRocy9nZW9tZXRyeS9yb3RhdGlvbnMvY29udmVyc2lvbnMvbWF0cml4VG9RdWF0ZXJuaW9uL2luZGV4Lmh0bVxuXG5cdFx0Ly8gYXNzdW1lcyB0aGUgdXBwZXIgM3gzIG9mIG0gaXMgYSBwdXJlIHJvdGF0aW9uIG1hdHJpeCAoaS5lLCB1bnNjYWxlZClcblxuXHRcdHZhciB0ZSA9IG0uZWxlbWVudHMsXG5cblx0XHRcdG0xMSA9IHRlWyAwIF0sIG0xMiA9IHRlWyA0IF0sIG0xMyA9IHRlWyA4IF0sXG5cdFx0XHRtMjEgPSB0ZVsgMSBdLCBtMjIgPSB0ZVsgNSBdLCBtMjMgPSB0ZVsgOSBdLFxuXHRcdFx0bTMxID0gdGVbIDIgXSwgbTMyID0gdGVbIDYgXSwgbTMzID0gdGVbIDEwIF0sXG5cblx0XHRcdHRyYWNlID0gbTExICsgbTIyICsgbTMzLFxuXHRcdFx0cztcblxuXHRcdGlmICggdHJhY2UgPiAwICkge1xuXG5cdFx0XHRzID0gMC41IC8gTWF0aC5zcXJ0KCB0cmFjZSArIDEuMCApO1xuXG5cdFx0XHR0aGlzLl93ID0gMC4yNSAvIHM7XG5cdFx0XHR0aGlzLl94ID0gKCBtMzIgLSBtMjMgKSAqIHM7XG5cdFx0XHR0aGlzLl95ID0gKCBtMTMgLSBtMzEgKSAqIHM7XG5cdFx0XHR0aGlzLl96ID0gKCBtMjEgLSBtMTIgKSAqIHM7XG5cblx0XHR9IGVsc2UgaWYgKCBtMTEgPiBtMjIgJiYgbTExID4gbTMzICkge1xuXG5cdFx0XHRzID0gMi4wICogTWF0aC5zcXJ0KCAxLjAgKyBtMTEgLSBtMjIgLSBtMzMgKTtcblxuXHRcdFx0dGhpcy5fdyA9ICggbTMyIC0gbTIzICkgLyBzO1xuXHRcdFx0dGhpcy5feCA9IDAuMjUgKiBzO1xuXHRcdFx0dGhpcy5feSA9ICggbTEyICsgbTIxICkgLyBzO1xuXHRcdFx0dGhpcy5feiA9ICggbTEzICsgbTMxICkgLyBzO1xuXG5cdFx0fSBlbHNlIGlmICggbTIyID4gbTMzICkge1xuXG5cdFx0XHRzID0gMi4wICogTWF0aC5zcXJ0KCAxLjAgKyBtMjIgLSBtMTEgLSBtMzMgKTtcblxuXHRcdFx0dGhpcy5fdyA9ICggbTEzIC0gbTMxICkgLyBzO1xuXHRcdFx0dGhpcy5feCA9ICggbTEyICsgbTIxICkgLyBzO1xuXHRcdFx0dGhpcy5feSA9IDAuMjUgKiBzO1xuXHRcdFx0dGhpcy5feiA9ICggbTIzICsgbTMyICkgLyBzO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0cyA9IDIuMCAqIE1hdGguc3FydCggMS4wICsgbTMzIC0gbTExIC0gbTIyICk7XG5cblx0XHRcdHRoaXMuX3cgPSAoIG0yMSAtIG0xMiApIC8gcztcblx0XHRcdHRoaXMuX3ggPSAoIG0xMyArIG0zMSApIC8gcztcblx0XHRcdHRoaXMuX3kgPSAoIG0yMyArIG0zMiApIC8gcztcblx0XHRcdHRoaXMuX3ogPSAwLjI1ICogcztcblxuXHRcdH1cblxuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRGcm9tVW5pdFZlY3RvcnM6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIGh0dHA6Ly9sb2xlbmdpbmUubmV0L2Jsb2cvMjAxNC8wMi8yNC9xdWF0ZXJuaW9uLWZyb20tdHdvLXZlY3RvcnMtZmluYWxcblxuXHRcdC8vIGFzc3VtZXMgZGlyZWN0aW9uIHZlY3RvcnMgdkZyb20gYW5kIHZUbyBhcmUgbm9ybWFsaXplZFxuXG5cdFx0dmFyIHYxLCByO1xuXG5cdFx0dmFyIEVQUyA9IDAuMDAwMDAxO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggdkZyb20sIHZUbyApIHtcblxuXHRcdFx0aWYgKCB2MSA9PT0gdW5kZWZpbmVkICkgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0XHRyID0gdkZyb20uZG90KCB2VG8gKSArIDE7XG5cblx0XHRcdGlmICggciA8IEVQUyApIHtcblxuXHRcdFx0XHRyID0gMDtcblxuXHRcdFx0XHRpZiAoIE1hdGguYWJzKCB2RnJvbS54ICkgPiBNYXRoLmFicyggdkZyb20ueiApICkge1xuXG5cdFx0XHRcdFx0djEuc2V0KCAtIHZGcm9tLnksIHZGcm9tLngsIDAgKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0djEuc2V0KCAwLCAtIHZGcm9tLnosIHZGcm9tLnkgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0djEuY3Jvc3NWZWN0b3JzKCB2RnJvbSwgdlRvICk7XG5cblx0XHRcdH1cblxuXHRcdFx0dGhpcy5feCA9IHYxLng7XG5cdFx0XHR0aGlzLl95ID0gdjEueTtcblx0XHRcdHRoaXMuX3ogPSB2MS56O1xuXHRcdFx0dGhpcy5fdyA9IHI7XG5cblx0XHRcdHRoaXMubm9ybWFsaXplKCk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fVxuXG5cdH0oKSxcblxuXHRpbnZlcnNlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLmNvbmp1Z2F0ZSgpLm5vcm1hbGl6ZSgpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjb25qdWdhdGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuX3ggKj0gLSAxO1xuXHRcdHRoaXMuX3kgKj0gLSAxO1xuXHRcdHRoaXMuX3ogKj0gLSAxO1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGRvdDogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX3ggKiB2Ll94ICsgdGhpcy5feSAqIHYuX3kgKyB0aGlzLl96ICogdi5feiArIHRoaXMuX3cgKiB2Ll93O1xuXG5cdH0sXG5cblx0bGVuZ3RoU3E6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLl94ICogdGhpcy5feCArIHRoaXMuX3kgKiB0aGlzLl95ICsgdGhpcy5feiAqIHRoaXMuX3ogKyB0aGlzLl93ICogdGhpcy5fdztcblxuXHR9LFxuXG5cdGxlbmd0aDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIE1hdGguc3FydCggdGhpcy5feCAqIHRoaXMuX3ggKyB0aGlzLl95ICogdGhpcy5feSArIHRoaXMuX3ogKiB0aGlzLl96ICsgdGhpcy5fdyAqIHRoaXMuX3cgKTtcblxuXHR9LFxuXG5cdG5vcm1hbGl6ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIGwgPSB0aGlzLmxlbmd0aCgpO1xuXG5cdFx0aWYgKCBsID09PSAwICkge1xuXG5cdFx0XHR0aGlzLl94ID0gMDtcblx0XHRcdHRoaXMuX3kgPSAwO1xuXHRcdFx0dGhpcy5feiA9IDA7XG5cdFx0XHR0aGlzLl93ID0gMTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGwgPSAxIC8gbDtcblxuXHRcdFx0dGhpcy5feCA9IHRoaXMuX3ggKiBsO1xuXHRcdFx0dGhpcy5feSA9IHRoaXMuX3kgKiBsO1xuXHRcdFx0dGhpcy5feiA9IHRoaXMuX3ogKiBsO1xuXHRcdFx0dGhpcy5fdyA9IHRoaXMuX3cgKiBsO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5OiBmdW5jdGlvbiAoIHEsIHAgKSB7XG5cblx0XHRpZiAoIHAgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuUXVhdGVybmlvbjogLm11bHRpcGx5KCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAubXVsdGlwbHlRdWF0ZXJuaW9ucyggYSwgYiApIGluc3RlYWQuJyApO1xuXHRcdFx0cmV0dXJuIHRoaXMubXVsdGlwbHlRdWF0ZXJuaW9ucyggcSwgcCApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMubXVsdGlwbHlRdWF0ZXJuaW9ucyggdGhpcywgcSApO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlRdWF0ZXJuaW9uczogZnVuY3Rpb24gKCBhLCBiICkge1xuXG5cdFx0Ly8gZnJvbSBodHRwOi8vd3d3LmV1Y2xpZGVhbnNwYWNlLmNvbS9tYXRocy9hbGdlYnJhL3JlYWxOb3JtZWRBbGdlYnJhL3F1YXRlcm5pb25zL2NvZGUvaW5kZXguaHRtXG5cblx0XHR2YXIgcWF4ID0gYS5feCwgcWF5ID0gYS5feSwgcWF6ID0gYS5feiwgcWF3ID0gYS5fdztcblx0XHR2YXIgcWJ4ID0gYi5feCwgcWJ5ID0gYi5feSwgcWJ6ID0gYi5feiwgcWJ3ID0gYi5fdztcblxuXHRcdHRoaXMuX3ggPSBxYXggKiBxYncgKyBxYXcgKiBxYnggKyBxYXkgKiBxYnogLSBxYXogKiBxYnk7XG5cdFx0dGhpcy5feSA9IHFheSAqIHFidyArIHFhdyAqIHFieSArIHFheiAqIHFieCAtIHFheCAqIHFiejtcblx0XHR0aGlzLl96ID0gcWF6ICogcWJ3ICsgcWF3ICogcWJ6ICsgcWF4ICogcWJ5IC0gcWF5ICogcWJ4O1xuXHRcdHRoaXMuX3cgPSBxYXcgKiBxYncgLSBxYXggKiBxYnggLSBxYXkgKiBxYnkgLSBxYXogKiBxYno7XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlWZWN0b3IzOiBmdW5jdGlvbiAoIHZlY3RvciApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlF1YXRlcm5pb246IC5tdWx0aXBseVZlY3RvcjMoKSBoYXMgYmVlbiByZW1vdmVkLiBVc2UgaXMgbm93IHZlY3Rvci5hcHBseVF1YXRlcm5pb24oIHF1YXRlcm5pb24gKSBpbnN0ZWFkLicgKTtcblx0XHRyZXR1cm4gdmVjdG9yLmFwcGx5UXVhdGVybmlvbiggdGhpcyApO1xuXG5cdH0sXG5cblx0c2xlcnA6IGZ1bmN0aW9uICggcWIsIHQgKSB7XG5cblx0XHRpZiAoIHQgPT09IDAgKSByZXR1cm4gdGhpcztcblx0XHRpZiAoIHQgPT09IDEgKSByZXR1cm4gdGhpcy5jb3B5KCBxYiApO1xuXG5cdFx0dmFyIHggPSB0aGlzLl94LCB5ID0gdGhpcy5feSwgeiA9IHRoaXMuX3osIHcgPSB0aGlzLl93O1xuXG5cdFx0Ly8gaHR0cDovL3d3dy5ldWNsaWRlYW5zcGFjZS5jb20vbWF0aHMvYWxnZWJyYS9yZWFsTm9ybWVkQWxnZWJyYS9xdWF0ZXJuaW9ucy9zbGVycC9cblxuXHRcdHZhciBjb3NIYWxmVGhldGEgPSB3ICogcWIuX3cgKyB4ICogcWIuX3ggKyB5ICogcWIuX3kgKyB6ICogcWIuX3o7XG5cblx0XHRpZiAoIGNvc0hhbGZUaGV0YSA8IDAgKSB7XG5cblx0XHRcdHRoaXMuX3cgPSAtIHFiLl93O1xuXHRcdFx0dGhpcy5feCA9IC0gcWIuX3g7XG5cdFx0XHR0aGlzLl95ID0gLSBxYi5feTtcblx0XHRcdHRoaXMuX3ogPSAtIHFiLl96O1xuXG5cdFx0XHRjb3NIYWxmVGhldGEgPSAtIGNvc0hhbGZUaGV0YTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMuY29weSggcWIgKTtcblxuXHRcdH1cblxuXHRcdGlmICggY29zSGFsZlRoZXRhID49IDEuMCApIHtcblxuXHRcdFx0dGhpcy5fdyA9IHc7XG5cdFx0XHR0aGlzLl94ID0geDtcblx0XHRcdHRoaXMuX3kgPSB5O1xuXHRcdFx0dGhpcy5feiA9IHo7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fVxuXG5cdFx0dmFyIGhhbGZUaGV0YSA9IE1hdGguYWNvcyggY29zSGFsZlRoZXRhICk7XG5cdFx0dmFyIHNpbkhhbGZUaGV0YSA9IE1hdGguc3FydCggMS4wIC0gY29zSGFsZlRoZXRhICogY29zSGFsZlRoZXRhICk7XG5cblx0XHRpZiAoIE1hdGguYWJzKCBzaW5IYWxmVGhldGEgKSA8IDAuMDAxICkge1xuXG5cdFx0XHR0aGlzLl93ID0gMC41ICogKCB3ICsgdGhpcy5fdyApO1xuXHRcdFx0dGhpcy5feCA9IDAuNSAqICggeCArIHRoaXMuX3ggKTtcblx0XHRcdHRoaXMuX3kgPSAwLjUgKiAoIHkgKyB0aGlzLl95ICk7XG5cdFx0XHR0aGlzLl96ID0gMC41ICogKCB6ICsgdGhpcy5feiApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH1cblxuXHRcdHZhciByYXRpb0EgPSBNYXRoLnNpbiggKCAxIC0gdCApICogaGFsZlRoZXRhICkgLyBzaW5IYWxmVGhldGEsXG5cdFx0cmF0aW9CID0gTWF0aC5zaW4oIHQgKiBoYWxmVGhldGEgKSAvIHNpbkhhbGZUaGV0YTtcblxuXHRcdHRoaXMuX3cgPSAoIHcgKiByYXRpb0EgKyB0aGlzLl93ICogcmF0aW9CICk7XG5cdFx0dGhpcy5feCA9ICggeCAqIHJhdGlvQSArIHRoaXMuX3ggKiByYXRpb0IgKTtcblx0XHR0aGlzLl95ID0gKCB5ICogcmF0aW9BICsgdGhpcy5feSAqIHJhdGlvQiApO1xuXHRcdHRoaXMuX3ogPSAoIHogKiByYXRpb0EgKyB0aGlzLl96ICogcmF0aW9CICk7XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZXF1YWxzOiBmdW5jdGlvbiAoIHF1YXRlcm5pb24gKSB7XG5cblx0XHRyZXR1cm4gKCBxdWF0ZXJuaW9uLl94ID09PSB0aGlzLl94ICkgJiYgKCBxdWF0ZXJuaW9uLl95ID09PSB0aGlzLl95ICkgJiYgKCBxdWF0ZXJuaW9uLl96ID09PSB0aGlzLl96ICkgJiYgKCBxdWF0ZXJuaW9uLl93ID09PSB0aGlzLl93ICk7XG5cblx0fSxcblxuXHRmcm9tQXJyYXk6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0dGhpcy5feCA9IGFycmF5WyBvZmZzZXQgXTtcblx0XHR0aGlzLl95ID0gYXJyYXlbIG9mZnNldCArIDEgXTtcblx0XHR0aGlzLl96ID0gYXJyYXlbIG9mZnNldCArIDIgXTtcblx0XHR0aGlzLl93ID0gYXJyYXlbIG9mZnNldCArIDMgXTtcblxuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR0b0FycmF5OiBmdW5jdGlvbiAoIGFycmF5LCBvZmZzZXQgKSB7XG5cblx0XHRpZiAoIGFycmF5ID09PSB1bmRlZmluZWQgKSBhcnJheSA9IFtdO1xuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0YXJyYXlbIG9mZnNldCBdID0gdGhpcy5feDtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMSBdID0gdGhpcy5feTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMiBdID0gdGhpcy5fejtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMyBdID0gdGhpcy5fdztcblxuXHRcdHJldHVybiBhcnJheTtcblxuXHR9LFxuXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbiAoIGNhbGxiYWNrICkge1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uQ2hhbmdlQ2FsbGJhY2s6IGZ1bmN0aW9uICgpIHt9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFRIUkVFLlF1YXRlcm5pb24oIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3osIHRoaXMuX3cgKTtcblxuXHR9XG5cbn07XG5cblRIUkVFLlF1YXRlcm5pb24uc2xlcnAgPSBmdW5jdGlvbiAoIHFhLCBxYiwgcW0sIHQgKSB7XG5cblx0cmV0dXJuIHFtLmNvcHkoIHFhICkuc2xlcnAoIHFiLCB0ICk7XG5cbn07XG5cbi8vIEZpbGU6c3JjL21hdGgvVmVjdG9yMy5qc1xuXG4vKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKiBAYXV0aG9yICpraWxlIC8gaHR0cDovL2tpbGUuc3RyYXZhZ2FuemEub3JnL1xuICogQGF1dGhvciBwaGlsb2diIC8gaHR0cDovL2Jsb2cudGhlaml0Lm9yZy9cbiAqIEBhdXRob3IgbWlrYWVsIGVtdGluZ2VyIC8gaHR0cDovL2dvbW8uc2UvXG4gKiBAYXV0aG9yIGVncmFldGhlciAvIGh0dHA6Ly9lZ3JhZXRoZXIuY29tL1xuICogQGF1dGhvciBXZXN0TGFuZ2xleSAvIGh0dHA6Ly9naXRodWIuY29tL1dlc3RMYW5nbGV5XG4gKi9cblxuVEhSRUUuVmVjdG9yMyA9IGZ1bmN0aW9uICggeCwgeSwgeiApIHtcblxuXHR0aGlzLnggPSB4IHx8IDA7XG5cdHRoaXMueSA9IHkgfHwgMDtcblx0dGhpcy56ID0geiB8fCAwO1xuXG59O1xuXG5USFJFRS5WZWN0b3IzLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogVEhSRUUuVmVjdG9yMyxcblxuXHRzZXQ6IGZ1bmN0aW9uICggeCwgeSwgeiApIHtcblxuXHRcdHRoaXMueCA9IHg7XG5cdFx0dGhpcy55ID0geTtcblx0XHR0aGlzLnogPSB6O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRYOiBmdW5jdGlvbiAoIHggKSB7XG5cblx0XHR0aGlzLnggPSB4O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRZOiBmdW5jdGlvbiAoIHkgKSB7XG5cblx0XHR0aGlzLnkgPSB5O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRaOiBmdW5jdGlvbiAoIHogKSB7XG5cblx0XHR0aGlzLnogPSB6O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRDb21wb25lbnQ6IGZ1bmN0aW9uICggaW5kZXgsIHZhbHVlICkge1xuXG5cdFx0c3dpdGNoICggaW5kZXggKSB7XG5cblx0XHRcdGNhc2UgMDogdGhpcy54ID0gdmFsdWU7IGJyZWFrO1xuXHRcdFx0Y2FzZSAxOiB0aGlzLnkgPSB2YWx1ZTsgYnJlYWs7XG5cdFx0XHRjYXNlIDI6IHRoaXMueiA9IHZhbHVlOyBicmVhaztcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvciggJ2luZGV4IGlzIG91dCBvZiByYW5nZTogJyArIGluZGV4ICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRnZXRDb21wb25lbnQ6IGZ1bmN0aW9uICggaW5kZXggKSB7XG5cblx0XHRzd2l0Y2ggKCBpbmRleCApIHtcblxuXHRcdFx0Y2FzZSAwOiByZXR1cm4gdGhpcy54O1xuXHRcdFx0Y2FzZSAxOiByZXR1cm4gdGhpcy55O1xuXHRcdFx0Y2FzZSAyOiByZXR1cm4gdGhpcy56O1xuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCAnaW5kZXggaXMgb3V0IG9mIHJhbmdlOiAnICsgaW5kZXggKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdGNvcHk6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHRoaXMueCA9IHYueDtcblx0XHR0aGlzLnkgPSB2Lnk7XG5cdFx0dGhpcy56ID0gdi56O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhZGQ6IGZ1bmN0aW9uICggdiwgdyApIHtcblxuXHRcdGlmICggdyAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WZWN0b3IzOiAuYWRkKCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAuYWRkVmVjdG9ycyggYSwgYiApIGluc3RlYWQuJyApO1xuXHRcdFx0cmV0dXJuIHRoaXMuYWRkVmVjdG9ycyggdiwgdyApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy54ICs9IHYueDtcblx0XHR0aGlzLnkgKz0gdi55O1xuXHRcdHRoaXMueiArPSB2Lno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFkZFNjYWxhcjogZnVuY3Rpb24gKCBzICkge1xuXG5cdFx0dGhpcy54ICs9IHM7XG5cdFx0dGhpcy55ICs9IHM7XG5cdFx0dGhpcy56ICs9IHM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFkZFZlY3RvcnM6IGZ1bmN0aW9uICggYSwgYiApIHtcblxuXHRcdHRoaXMueCA9IGEueCArIGIueDtcblx0XHR0aGlzLnkgPSBhLnkgKyBiLnk7XG5cdFx0dGhpcy56ID0gYS56ICsgYi56O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdWI6IGZ1bmN0aW9uICggdiwgdyApIHtcblxuXHRcdGlmICggdyAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WZWN0b3IzOiAuc3ViKCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAuc3ViVmVjdG9ycyggYSwgYiApIGluc3RlYWQuJyApO1xuXHRcdFx0cmV0dXJuIHRoaXMuc3ViVmVjdG9ycyggdiwgdyApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy54IC09IHYueDtcblx0XHR0aGlzLnkgLT0gdi55O1xuXHRcdHRoaXMueiAtPSB2Lno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXHRcblx0c3ViU2NhbGFyOiBmdW5jdGlvbiAoIHMgKSB7XG5cblx0XHR0aGlzLnggLT0gcztcblx0XHR0aGlzLnkgLT0gcztcblx0XHR0aGlzLnogLT0gcztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3ViVmVjdG9yczogZnVuY3Rpb24gKCBhLCBiICkge1xuXG5cdFx0dGhpcy54ID0gYS54IC0gYi54O1xuXHRcdHRoaXMueSA9IGEueSAtIGIueTtcblx0XHR0aGlzLnogPSBhLnogLSBiLno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5OiBmdW5jdGlvbiAoIHYsIHcgKSB7XG5cblx0XHRpZiAoIHcgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVmVjdG9yMzogLm11bHRpcGx5KCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAubXVsdGlwbHlWZWN0b3JzKCBhLCBiICkgaW5zdGVhZC4nICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5tdWx0aXBseVZlY3RvcnMoIHYsIHcgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMueCAqPSB2Lng7XG5cdFx0dGhpcy55ICo9IHYueTtcblx0XHR0aGlzLnogKj0gdi56O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtdWx0aXBseVNjYWxhcjogZnVuY3Rpb24gKCBzY2FsYXIgKSB7XG5cblx0XHR0aGlzLnggKj0gc2NhbGFyO1xuXHRcdHRoaXMueSAqPSBzY2FsYXI7XG5cdFx0dGhpcy56ICo9IHNjYWxhcjtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlWZWN0b3JzOiBmdW5jdGlvbiAoIGEsIGIgKSB7XG5cblx0XHR0aGlzLnggPSBhLnggKiBiLng7XG5cdFx0dGhpcy55ID0gYS55ICogYi55O1xuXHRcdHRoaXMueiA9IGEueiAqIGIuejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YXBwbHlFdWxlcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHF1YXRlcm5pb247XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBldWxlciApIHtcblxuXHRcdFx0aWYgKCBldWxlciBpbnN0YW5jZW9mIFRIUkVFLkV1bGVyID09PSBmYWxzZSApIHtcblxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuVmVjdG9yMzogLmFwcGx5RXVsZXIoKSBub3cgZXhwZWN0cyBhIEV1bGVyIHJvdGF0aW9uIHJhdGhlciB0aGFuIGEgVmVjdG9yMyBhbmQgb3JkZXIuJyApO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggcXVhdGVybmlvbiA9PT0gdW5kZWZpbmVkICkgcXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cblx0XHRcdHRoaXMuYXBwbHlRdWF0ZXJuaW9uKCBxdWF0ZXJuaW9uLnNldEZyb21FdWxlciggZXVsZXIgKSApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGFwcGx5QXhpc0FuZ2xlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgcXVhdGVybmlvbjtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIGF4aXMsIGFuZ2xlICkge1xuXG5cdFx0XHRpZiAoIHF1YXRlcm5pb24gPT09IHVuZGVmaW5lZCApIHF1YXRlcm5pb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5cdFx0XHR0aGlzLmFwcGx5UXVhdGVybmlvbiggcXVhdGVybmlvbi5zZXRGcm9tQXhpc0FuZ2xlKCBheGlzLCBhbmdsZSApICk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0YXBwbHlNYXRyaXgzOiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHR2YXIgeCA9IHRoaXMueDtcblx0XHR2YXIgeSA9IHRoaXMueTtcblx0XHR2YXIgeiA9IHRoaXMuejtcblxuXHRcdHZhciBlID0gbS5lbGVtZW50cztcblxuXHRcdHRoaXMueCA9IGVbIDAgXSAqIHggKyBlWyAzIF0gKiB5ICsgZVsgNiBdICogejtcblx0XHR0aGlzLnkgPSBlWyAxIF0gKiB4ICsgZVsgNCBdICogeSArIGVbIDcgXSAqIHo7XG5cdFx0dGhpcy56ID0gZVsgMiBdICogeCArIGVbIDUgXSAqIHkgKyBlWyA4IF0gKiB6O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhcHBseU1hdHJpeDQ6IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdC8vIGlucHV0OiBUSFJFRS5NYXRyaXg0IGFmZmluZSBtYXRyaXhcblxuXHRcdHZhciB4ID0gdGhpcy54LCB5ID0gdGhpcy55LCB6ID0gdGhpcy56O1xuXG5cdFx0dmFyIGUgPSBtLmVsZW1lbnRzO1xuXG5cdFx0dGhpcy54ID0gZVsgMCBdICogeCArIGVbIDQgXSAqIHkgKyBlWyA4IF0gICogeiArIGVbIDEyIF07XG5cdFx0dGhpcy55ID0gZVsgMSBdICogeCArIGVbIDUgXSAqIHkgKyBlWyA5IF0gICogeiArIGVbIDEzIF07XG5cdFx0dGhpcy56ID0gZVsgMiBdICogeCArIGVbIDYgXSAqIHkgKyBlWyAxMCBdICogeiArIGVbIDE0IF07XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFwcGx5UHJvamVjdGlvbjogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0Ly8gaW5wdXQ6IFRIUkVFLk1hdHJpeDQgcHJvamVjdGlvbiBtYXRyaXhcblxuXHRcdHZhciB4ID0gdGhpcy54LCB5ID0gdGhpcy55LCB6ID0gdGhpcy56O1xuXG5cdFx0dmFyIGUgPSBtLmVsZW1lbnRzO1xuXHRcdHZhciBkID0gMSAvICggZVsgMyBdICogeCArIGVbIDcgXSAqIHkgKyBlWyAxMSBdICogeiArIGVbIDE1IF0gKTsgLy8gcGVyc3BlY3RpdmUgZGl2aWRlXG5cblx0XHR0aGlzLnggPSAoIGVbIDAgXSAqIHggKyBlWyA0IF0gKiB5ICsgZVsgOCBdICAqIHogKyBlWyAxMiBdICkgKiBkO1xuXHRcdHRoaXMueSA9ICggZVsgMSBdICogeCArIGVbIDUgXSAqIHkgKyBlWyA5IF0gICogeiArIGVbIDEzIF0gKSAqIGQ7XG5cdFx0dGhpcy56ID0gKCBlWyAyIF0gKiB4ICsgZVsgNiBdICogeSArIGVbIDEwIF0gKiB6ICsgZVsgMTQgXSApICogZDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YXBwbHlRdWF0ZXJuaW9uOiBmdW5jdGlvbiAoIHEgKSB7XG5cblx0XHR2YXIgeCA9IHRoaXMueDtcblx0XHR2YXIgeSA9IHRoaXMueTtcblx0XHR2YXIgeiA9IHRoaXMuejtcblxuXHRcdHZhciBxeCA9IHEueDtcblx0XHR2YXIgcXkgPSBxLnk7XG5cdFx0dmFyIHF6ID0gcS56O1xuXHRcdHZhciBxdyA9IHEudztcblxuXHRcdC8vIGNhbGN1bGF0ZSBxdWF0ICogdmVjdG9yXG5cblx0XHR2YXIgaXggPSAgcXcgKiB4ICsgcXkgKiB6IC0gcXogKiB5O1xuXHRcdHZhciBpeSA9ICBxdyAqIHkgKyBxeiAqIHggLSBxeCAqIHo7XG5cdFx0dmFyIGl6ID0gIHF3ICogeiArIHF4ICogeSAtIHF5ICogeDtcblx0XHR2YXIgaXcgPSAtIHF4ICogeCAtIHF5ICogeSAtIHF6ICogejtcblxuXHRcdC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcblxuXHRcdHRoaXMueCA9IGl4ICogcXcgKyBpdyAqIC0gcXggKyBpeSAqIC0gcXogLSBpeiAqIC0gcXk7XG5cdFx0dGhpcy55ID0gaXkgKiBxdyArIGl3ICogLSBxeSArIGl6ICogLSBxeCAtIGl4ICogLSBxejtcblx0XHR0aGlzLnogPSBpeiAqIHF3ICsgaXcgKiAtIHF6ICsgaXggKiAtIHF5IC0gaXkgKiAtIHF4O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRwcm9qZWN0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgbWF0cml4O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggY2FtZXJhICkge1xuXG5cdFx0XHRpZiAoIG1hdHJpeCA9PT0gdW5kZWZpbmVkICkgbWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuXHRcdFx0bWF0cml4Lm11bHRpcGx5TWF0cmljZXMoIGNhbWVyYS5wcm9qZWN0aW9uTWF0cml4LCBtYXRyaXguZ2V0SW52ZXJzZSggY2FtZXJhLm1hdHJpeFdvcmxkICkgKTtcblx0XHRcdHJldHVybiB0aGlzLmFwcGx5UHJvamVjdGlvbiggbWF0cml4ICk7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHR1bnByb2plY3Q6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBtYXRyaXg7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBjYW1lcmEgKSB7XG5cblx0XHRcdGlmICggbWF0cml4ID09PSB1bmRlZmluZWQgKSBtYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG5cdFx0XHRtYXRyaXgubXVsdGlwbHlNYXRyaWNlcyggY2FtZXJhLm1hdHJpeFdvcmxkLCBtYXRyaXguZ2V0SW52ZXJzZSggY2FtZXJhLnByb2plY3Rpb25NYXRyaXggKSApO1xuXHRcdFx0cmV0dXJuIHRoaXMuYXBwbHlQcm9qZWN0aW9uKCBtYXRyaXggKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdHRyYW5zZm9ybURpcmVjdGlvbjogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0Ly8gaW5wdXQ6IFRIUkVFLk1hdHJpeDQgYWZmaW5lIG1hdHJpeFxuXHRcdC8vIHZlY3RvciBpbnRlcnByZXRlZCBhcyBhIGRpcmVjdGlvblxuXG5cdFx0dmFyIHggPSB0aGlzLngsIHkgPSB0aGlzLnksIHogPSB0aGlzLno7XG5cblx0XHR2YXIgZSA9IG0uZWxlbWVudHM7XG5cblx0XHR0aGlzLnggPSBlWyAwIF0gKiB4ICsgZVsgNCBdICogeSArIGVbIDggXSAgKiB6O1xuXHRcdHRoaXMueSA9IGVbIDEgXSAqIHggKyBlWyA1IF0gKiB5ICsgZVsgOSBdICAqIHo7XG5cdFx0dGhpcy56ID0gZVsgMiBdICogeCArIGVbIDYgXSAqIHkgKyBlWyAxMCBdICogejtcblxuXHRcdHRoaXMubm9ybWFsaXplKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGRpdmlkZTogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0dGhpcy54IC89IHYueDtcblx0XHR0aGlzLnkgLz0gdi55O1xuXHRcdHRoaXMueiAvPSB2Lno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGRpdmlkZVNjYWxhcjogZnVuY3Rpb24gKCBzY2FsYXIgKSB7XG5cblx0XHRpZiAoIHNjYWxhciAhPT0gMCApIHtcblxuXHRcdFx0dmFyIGludlNjYWxhciA9IDEgLyBzY2FsYXI7XG5cblx0XHRcdHRoaXMueCAqPSBpbnZTY2FsYXI7XG5cdFx0XHR0aGlzLnkgKj0gaW52U2NhbGFyO1xuXHRcdFx0dGhpcy56ICo9IGludlNjYWxhcjtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMueCA9IDA7XG5cdFx0XHR0aGlzLnkgPSAwO1xuXHRcdFx0dGhpcy56ID0gMDtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWluOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRpZiAoIHRoaXMueCA+IHYueCApIHtcblxuXHRcdFx0dGhpcy54ID0gdi54O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnkgPiB2LnkgKSB7XG5cblx0XHRcdHRoaXMueSA9IHYueTtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy56ID4gdi56ICkge1xuXG5cdFx0XHR0aGlzLnogPSB2Lno7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1heDogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0aWYgKCB0aGlzLnggPCB2LnggKSB7XG5cblx0XHRcdHRoaXMueCA9IHYueDtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy55IDwgdi55ICkge1xuXG5cdFx0XHR0aGlzLnkgPSB2Lnk7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMueiA8IHYueiApIHtcblxuXHRcdFx0dGhpcy56ID0gdi56O1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjbGFtcDogZnVuY3Rpb24gKCBtaW4sIG1heCApIHtcblxuXHRcdC8vIFRoaXMgZnVuY3Rpb24gYXNzdW1lcyBtaW4gPCBtYXgsIGlmIHRoaXMgYXNzdW1wdGlvbiBpc24ndCB0cnVlIGl0IHdpbGwgbm90IG9wZXJhdGUgY29ycmVjdGx5XG5cblx0XHRpZiAoIHRoaXMueCA8IG1pbi54ICkge1xuXG5cdFx0XHR0aGlzLnggPSBtaW4ueDtcblxuXHRcdH0gZWxzZSBpZiAoIHRoaXMueCA+IG1heC54ICkge1xuXG5cdFx0XHR0aGlzLnggPSBtYXgueDtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy55IDwgbWluLnkgKSB7XG5cblx0XHRcdHRoaXMueSA9IG1pbi55O1xuXG5cdFx0fSBlbHNlIGlmICggdGhpcy55ID4gbWF4LnkgKSB7XG5cblx0XHRcdHRoaXMueSA9IG1heC55O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnogPCBtaW4ueiApIHtcblxuXHRcdFx0dGhpcy56ID0gbWluLno7XG5cblx0XHR9IGVsc2UgaWYgKCB0aGlzLnogPiBtYXgueiApIHtcblxuXHRcdFx0dGhpcy56ID0gbWF4Lno7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNsYW1wU2NhbGFyOiAoIGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBtaW4sIG1heDtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIG1pblZhbCwgbWF4VmFsICkge1xuXG5cdFx0XHRpZiAoIG1pbiA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdG1pbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRcdG1heCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRcdH1cblxuXHRcdFx0bWluLnNldCggbWluVmFsLCBtaW5WYWwsIG1pblZhbCApO1xuXHRcdFx0bWF4LnNldCggbWF4VmFsLCBtYXhWYWwsIG1heFZhbCApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5jbGFtcCggbWluLCBtYXggKTtcblxuXHRcdH07XG5cblx0fSApKCksXG5cblx0Zmxvb3I6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9IE1hdGguZmxvb3IoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9IE1hdGguZmxvb3IoIHRoaXMueSApO1xuXHRcdHRoaXMueiA9IE1hdGguZmxvb3IoIHRoaXMueiApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjZWlsOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnggPSBNYXRoLmNlaWwoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9IE1hdGguY2VpbCggdGhpcy55ICk7XG5cdFx0dGhpcy56ID0gTWF0aC5jZWlsKCB0aGlzLnogKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cm91bmQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9IE1hdGgucm91bmQoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9IE1hdGgucm91bmQoIHRoaXMueSApO1xuXHRcdHRoaXMueiA9IE1hdGgucm91bmQoIHRoaXMueiApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRyb3VuZFRvWmVybzogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gKCB0aGlzLnggPCAwICkgPyBNYXRoLmNlaWwoIHRoaXMueCApIDogTWF0aC5mbG9vciggdGhpcy54ICk7XG5cdFx0dGhpcy55ID0gKCB0aGlzLnkgPCAwICkgPyBNYXRoLmNlaWwoIHRoaXMueSApIDogTWF0aC5mbG9vciggdGhpcy55ICk7XG5cdFx0dGhpcy56ID0gKCB0aGlzLnogPCAwICkgPyBNYXRoLmNlaWwoIHRoaXMueiApIDogTWF0aC5mbG9vciggdGhpcy56ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG5lZ2F0ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gLSB0aGlzLng7XG5cdFx0dGhpcy55ID0gLSB0aGlzLnk7XG5cdFx0dGhpcy56ID0gLSB0aGlzLno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGRvdDogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0cmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcblxuXHR9LFxuXG5cdGxlbmd0aFNxOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICsgdGhpcy56ICogdGhpcy56O1xuXG5cdH0sXG5cblx0bGVuZ3RoOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gTWF0aC5zcXJ0KCB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkgKyB0aGlzLnogKiB0aGlzLnogKTtcblxuXHR9LFxuXG5cdGxlbmd0aE1hbmhhdHRhbjogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIE1hdGguYWJzKCB0aGlzLnggKSArIE1hdGguYWJzKCB0aGlzLnkgKSArIE1hdGguYWJzKCB0aGlzLnogKTtcblxuXHR9LFxuXG5cdG5vcm1hbGl6ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuZGl2aWRlU2NhbGFyKCB0aGlzLmxlbmd0aCgpICk7XG5cblx0fSxcblxuXHRzZXRMZW5ndGg6IGZ1bmN0aW9uICggbCApIHtcblxuXHRcdHZhciBvbGRMZW5ndGggPSB0aGlzLmxlbmd0aCgpO1xuXG5cdFx0aWYgKCBvbGRMZW5ndGggIT09IDAgJiYgbCAhPT0gb2xkTGVuZ3RoICApIHtcblxuXHRcdFx0dGhpcy5tdWx0aXBseVNjYWxhciggbCAvIG9sZExlbmd0aCApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bGVycDogZnVuY3Rpb24gKCB2LCBhbHBoYSApIHtcblxuXHRcdHRoaXMueCArPSAoIHYueCAtIHRoaXMueCApICogYWxwaGE7XG5cdFx0dGhpcy55ICs9ICggdi55IC0gdGhpcy55ICkgKiBhbHBoYTtcblx0XHR0aGlzLnogKz0gKCB2LnogLSB0aGlzLnogKSAqIGFscGhhO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRsZXJwVmVjdG9yczogZnVuY3Rpb24gKCB2MSwgdjIsIGFscGhhICkge1xuXG5cdFx0dGhpcy5zdWJWZWN0b3JzKCB2MiwgdjEgKS5tdWx0aXBseVNjYWxhciggYWxwaGEgKS5hZGQoIHYxICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNyb3NzOiBmdW5jdGlvbiAoIHYsIHcgKSB7XG5cblx0XHRpZiAoIHcgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVmVjdG9yMzogLmNyb3NzKCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAuY3Jvc3NWZWN0b3JzKCBhLCBiICkgaW5zdGVhZC4nICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5jcm9zc1ZlY3RvcnMoIHYsIHcgKTtcblxuXHRcdH1cblxuXHRcdHZhciB4ID0gdGhpcy54LCB5ID0gdGhpcy55LCB6ID0gdGhpcy56O1xuXG5cdFx0dGhpcy54ID0geSAqIHYueiAtIHogKiB2Lnk7XG5cdFx0dGhpcy55ID0geiAqIHYueCAtIHggKiB2Lno7XG5cdFx0dGhpcy56ID0geCAqIHYueSAtIHkgKiB2Lng7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNyb3NzVmVjdG9yczogZnVuY3Rpb24gKCBhLCBiICkge1xuXG5cdFx0dmFyIGF4ID0gYS54LCBheSA9IGEueSwgYXogPSBhLno7XG5cdFx0dmFyIGJ4ID0gYi54LCBieSA9IGIueSwgYnogPSBiLno7XG5cblx0XHR0aGlzLnggPSBheSAqIGJ6IC0gYXogKiBieTtcblx0XHR0aGlzLnkgPSBheiAqIGJ4IC0gYXggKiBiejtcblx0XHR0aGlzLnogPSBheCAqIGJ5IC0gYXkgKiBieDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cHJvamVjdE9uVmVjdG9yOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdjEsIGRvdDtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHZlY3RvciApIHtcblxuXHRcdFx0aWYgKCB2MSA9PT0gdW5kZWZpbmVkICkgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0XHR2MS5jb3B5KCB2ZWN0b3IgKS5ub3JtYWxpemUoKTtcblxuXHRcdFx0ZG90ID0gdGhpcy5kb3QoIHYxICk7XG5cblx0XHRcdHJldHVybiB0aGlzLmNvcHkoIHYxICkubXVsdGlwbHlTY2FsYXIoIGRvdCApO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0cHJvamVjdE9uUGxhbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHBsYW5lTm9ybWFsICkge1xuXG5cdFx0XHRpZiAoIHYxID09PSB1bmRlZmluZWQgKSB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRcdHYxLmNvcHkoIHRoaXMgKS5wcm9qZWN0T25WZWN0b3IoIHBsYW5lTm9ybWFsICk7XG5cblx0XHRcdHJldHVybiB0aGlzLnN1YiggdjEgKTtcblxuXHRcdH1cblxuXHR9KCksXG5cblx0cmVmbGVjdDogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gcmVmbGVjdCBpbmNpZGVudCB2ZWN0b3Igb2ZmIHBsYW5lIG9ydGhvZ29uYWwgdG8gbm9ybWFsXG5cdFx0Ly8gbm9ybWFsIGlzIGFzc3VtZWQgdG8gaGF2ZSB1bml0IGxlbmd0aFxuXG5cdFx0dmFyIHYxO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggbm9ybWFsICkge1xuXG5cdFx0XHRpZiAoIHYxID09PSB1bmRlZmluZWQgKSB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRcdHJldHVybiB0aGlzLnN1YiggdjEuY29weSggbm9ybWFsICkubXVsdGlwbHlTY2FsYXIoIDIgKiB0aGlzLmRvdCggbm9ybWFsICkgKSApO1xuXG5cdFx0fVxuXG5cdH0oKSxcblxuXHRhbmdsZVRvOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHR2YXIgdGhldGEgPSB0aGlzLmRvdCggdiApIC8gKCB0aGlzLmxlbmd0aCgpICogdi5sZW5ndGgoKSApO1xuXG5cdFx0Ly8gY2xhbXAsIHRvIGhhbmRsZSBudW1lcmljYWwgcHJvYmxlbXNcblxuXHRcdHJldHVybiBNYXRoLmFjb3MoIFRIUkVFLk1hdGguY2xhbXAoIHRoZXRhLCAtIDEsIDEgKSApO1xuXG5cdH0sXG5cblx0ZGlzdGFuY2VUbzogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0cmV0dXJuIE1hdGguc3FydCggdGhpcy5kaXN0YW5jZVRvU3F1YXJlZCggdiApICk7XG5cblx0fSxcblxuXHRkaXN0YW5jZVRvU3F1YXJlZDogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0dmFyIGR4ID0gdGhpcy54IC0gdi54O1xuXHRcdHZhciBkeSA9IHRoaXMueSAtIHYueTtcblx0XHR2YXIgZHogPSB0aGlzLnogLSB2Lno7XG5cblx0XHRyZXR1cm4gZHggKiBkeCArIGR5ICogZHkgKyBkeiAqIGR6O1xuXG5cdH0sXG5cblx0c2V0RXVsZXJGcm9tUm90YXRpb25NYXRyaXg6IGZ1bmN0aW9uICggbSwgb3JkZXIgKSB7XG5cblx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuVmVjdG9yMzogLnNldEV1bGVyRnJvbVJvdGF0aW9uTWF0cml4KCkgaGFzIGJlZW4gcmVtb3ZlZC4gVXNlIEV1bGVyLnNldEZyb21Sb3RhdGlvbk1hdHJpeCgpIGluc3RlYWQuJyApO1xuXG5cdH0sXG5cblx0c2V0RXVsZXJGcm9tUXVhdGVybmlvbjogZnVuY3Rpb24gKCBxLCBvcmRlciApIHtcblxuXHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5WZWN0b3IzOiAuc2V0RXVsZXJGcm9tUXVhdGVybmlvbigpIGhhcyBiZWVuIHJlbW92ZWQuIFVzZSBFdWxlci5zZXRGcm9tUXVhdGVybmlvbigpIGluc3RlYWQuJyApO1xuXG5cdH0sXG5cblx0Z2V0UG9zaXRpb25Gcm9tTWF0cml4OiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WZWN0b3IzOiAuZ2V0UG9zaXRpb25Gcm9tTWF0cml4KCkgaGFzIGJlZW4gcmVuYW1lZCB0byAuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKCkuJyApO1xuXG5cdFx0cmV0dXJuIHRoaXMuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKCBtICk7XG5cblx0fSxcblxuXHRnZXRTY2FsZUZyb21NYXRyaXg6IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZlY3RvcjM6IC5nZXRTY2FsZUZyb21NYXRyaXgoKSBoYXMgYmVlbiByZW5hbWVkIHRvIC5zZXRGcm9tTWF0cml4U2NhbGUoKS4nICk7XG5cblx0XHRyZXR1cm4gdGhpcy5zZXRGcm9tTWF0cml4U2NhbGUoIG0gKTtcblx0fSxcblxuXHRnZXRDb2x1bW5Gcm9tTWF0cml4OiBmdW5jdGlvbiAoIGluZGV4LCBtYXRyaXggKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WZWN0b3IzOiAuZ2V0Q29sdW1uRnJvbU1hdHJpeCgpIGhhcyBiZWVuIHJlbmFtZWQgdG8gLnNldEZyb21NYXRyaXhDb2x1bW4oKS4nICk7XG5cblx0XHRyZXR1cm4gdGhpcy5zZXRGcm9tTWF0cml4Q29sdW1uKCBpbmRleCwgbWF0cml4ICk7XG5cblx0fSxcblxuXHRzZXRGcm9tTWF0cml4UG9zaXRpb246IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdHRoaXMueCA9IG0uZWxlbWVudHNbIDEyIF07XG5cdFx0dGhpcy55ID0gbS5lbGVtZW50c1sgMTMgXTtcblx0XHR0aGlzLnogPSBtLmVsZW1lbnRzWyAxNCBdO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRGcm9tTWF0cml4U2NhbGU6IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdHZhciBzeCA9IHRoaXMuc2V0KCBtLmVsZW1lbnRzWyAwIF0sIG0uZWxlbWVudHNbIDEgXSwgbS5lbGVtZW50c1sgIDIgXSApLmxlbmd0aCgpO1xuXHRcdHZhciBzeSA9IHRoaXMuc2V0KCBtLmVsZW1lbnRzWyA0IF0sIG0uZWxlbWVudHNbIDUgXSwgbS5lbGVtZW50c1sgIDYgXSApLmxlbmd0aCgpO1xuXHRcdHZhciBzeiA9IHRoaXMuc2V0KCBtLmVsZW1lbnRzWyA4IF0sIG0uZWxlbWVudHNbIDkgXSwgbS5lbGVtZW50c1sgMTAgXSApLmxlbmd0aCgpO1xuXG5cdFx0dGhpcy54ID0gc3g7XG5cdFx0dGhpcy55ID0gc3k7XG5cdFx0dGhpcy56ID0gc3o7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRzZXRGcm9tTWF0cml4Q29sdW1uOiBmdW5jdGlvbiAoIGluZGV4LCBtYXRyaXggKSB7XG5cdFx0XG5cdFx0dmFyIG9mZnNldCA9IGluZGV4ICogNDtcblxuXHRcdHZhciBtZSA9IG1hdHJpeC5lbGVtZW50cztcblxuXHRcdHRoaXMueCA9IG1lWyBvZmZzZXQgXTtcblx0XHR0aGlzLnkgPSBtZVsgb2Zmc2V0ICsgMSBdO1xuXHRcdHRoaXMueiA9IG1lWyBvZmZzZXQgKyAyIF07XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVxdWFsczogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0cmV0dXJuICggKCB2LnggPT09IHRoaXMueCApICYmICggdi55ID09PSB0aGlzLnkgKSAmJiAoIHYueiA9PT0gdGhpcy56ICkgKTtcblxuXHR9LFxuXG5cdGZyb21BcnJheTogZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0ICkge1xuXG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHR0aGlzLnggPSBhcnJheVsgb2Zmc2V0IF07XG5cdFx0dGhpcy55ID0gYXJyYXlbIG9mZnNldCArIDEgXTtcblx0XHR0aGlzLnogPSBhcnJheVsgb2Zmc2V0ICsgMiBdO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR0b0FycmF5OiBmdW5jdGlvbiAoIGFycmF5LCBvZmZzZXQgKSB7XG5cblx0XHRpZiAoIGFycmF5ID09PSB1bmRlZmluZWQgKSBhcnJheSA9IFtdO1xuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0YXJyYXlbIG9mZnNldCBdID0gdGhpcy54O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxIF0gPSB0aGlzLnk7XG5cdFx0YXJyYXlbIG9mZnNldCArIDIgXSA9IHRoaXMuejtcblxuXHRcdHJldHVybiBhcnJheTtcblxuXHR9LFxuXG5cdGZyb21BdHRyaWJ1dGU6IGZ1bmN0aW9uICggYXR0cmlidXRlLCBpbmRleCwgb2Zmc2V0ICkge1xuXG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHRpbmRleCA9IGluZGV4ICogYXR0cmlidXRlLml0ZW1TaXplICsgb2Zmc2V0O1xuXG5cdFx0dGhpcy54ID0gYXR0cmlidXRlLmFycmF5WyBpbmRleCBdO1xuXHRcdHRoaXMueSA9IGF0dHJpYnV0ZS5hcnJheVsgaW5kZXggKyAxIF07XG5cdFx0dGhpcy56ID0gYXR0cmlidXRlLmFycmF5WyBpbmRleCArIDIgXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMyggdGhpcy54LCB0aGlzLnksIHRoaXMueiApO1xuXG5cdH1cblxufTtcblxuLy8gRmlsZTpzcmMvbWF0aC9FdWxlci5qc1xuXG4vKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKiBAYXV0aG9yIFdlc3RMYW5nbGV5IC8gaHR0cDovL2dpdGh1Yi5jb20vV2VzdExhbmdsZXlcbiAqIEBhdXRob3IgYmhvdXN0b24gLyBodHRwOi8vZXhvY29ydGV4LmNvbVxuICovXG5cblRIUkVFLkV1bGVyID0gZnVuY3Rpb24gKCB4LCB5LCB6LCBvcmRlciApIHtcblxuXHR0aGlzLl94ID0geCB8fCAwO1xuXHR0aGlzLl95ID0geSB8fCAwO1xuXHR0aGlzLl96ID0geiB8fCAwO1xuXHR0aGlzLl9vcmRlciA9IG9yZGVyIHx8IFRIUkVFLkV1bGVyLkRlZmF1bHRPcmRlcjtcblxufTtcblxuVEhSRUUuRXVsZXIuUm90YXRpb25PcmRlcnMgPSBbICdYWVonLCAnWVpYJywgJ1pYWScsICdYWlknLCAnWVhaJywgJ1pZWCcgXTtcblxuVEhSRUUuRXVsZXIuRGVmYXVsdE9yZGVyID0gJ1hZWic7XG5cblRIUkVFLkV1bGVyLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogVEhSRUUuRXVsZXIsXG5cblx0X3g6IDAsIF95OiAwLCBfejogMCwgX29yZGVyOiBUSFJFRS5FdWxlci5EZWZhdWx0T3JkZXIsXG5cblx0Z2V0IHggKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX3g7XG5cblx0fSxcblxuXHRzZXQgeCAoIHZhbHVlICkge1xuXG5cdFx0dGhpcy5feCA9IHZhbHVlO1xuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdH0sXG5cblx0Z2V0IHkgKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX3k7XG5cblx0fSxcblxuXHRzZXQgeSAoIHZhbHVlICkge1xuXG5cdFx0dGhpcy5feSA9IHZhbHVlO1xuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdH0sXG5cblx0Z2V0IHogKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX3o7XG5cblx0fSxcblxuXHRzZXQgeiAoIHZhbHVlICkge1xuXG5cdFx0dGhpcy5feiA9IHZhbHVlO1xuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdH0sXG5cblx0Z2V0IG9yZGVyICgpIHtcblxuXHRcdHJldHVybiB0aGlzLl9vcmRlcjtcblxuXHR9LFxuXG5cdHNldCBvcmRlciAoIHZhbHVlICkge1xuXG5cdFx0dGhpcy5fb3JkZXIgPSB2YWx1ZTtcblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHR9LFxuXG5cdHNldDogZnVuY3Rpb24gKCB4LCB5LCB6LCBvcmRlciApIHtcblxuXHRcdHRoaXMuX3ggPSB4O1xuXHRcdHRoaXMuX3kgPSB5O1xuXHRcdHRoaXMuX3ogPSB6O1xuXHRcdHRoaXMuX29yZGVyID0gb3JkZXIgfHwgdGhpcy5fb3JkZXI7XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y29weTogZnVuY3Rpb24gKCBldWxlciApIHtcblxuXHRcdHRoaXMuX3ggPSBldWxlci5feDtcblx0XHR0aGlzLl95ID0gZXVsZXIuX3k7XG5cdFx0dGhpcy5feiA9IGV1bGVyLl96O1xuXHRcdHRoaXMuX29yZGVyID0gZXVsZXIuX29yZGVyO1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldEZyb21Sb3RhdGlvbk1hdHJpeDogZnVuY3Rpb24gKCBtLCBvcmRlciwgdXBkYXRlICkge1xuXG5cdFx0dmFyIGNsYW1wID0gVEhSRUUuTWF0aC5jbGFtcDtcblxuXHRcdC8vIGFzc3VtZXMgdGhlIHVwcGVyIDN4MyBvZiBtIGlzIGEgcHVyZSByb3RhdGlvbiBtYXRyaXggKGkuZSwgdW5zY2FsZWQpXG5cblx0XHR2YXIgdGUgPSBtLmVsZW1lbnRzO1xuXHRcdHZhciBtMTEgPSB0ZVsgMCBdLCBtMTIgPSB0ZVsgNCBdLCBtMTMgPSB0ZVsgOCBdO1xuXHRcdHZhciBtMjEgPSB0ZVsgMSBdLCBtMjIgPSB0ZVsgNSBdLCBtMjMgPSB0ZVsgOSBdO1xuXHRcdHZhciBtMzEgPSB0ZVsgMiBdLCBtMzIgPSB0ZVsgNiBdLCBtMzMgPSB0ZVsgMTAgXTtcblxuXHRcdG9yZGVyID0gb3JkZXIgfHwgdGhpcy5fb3JkZXI7XG5cblx0XHRpZiAoIG9yZGVyID09PSAnWFlaJyApIHtcblxuXHRcdFx0dGhpcy5feSA9IE1hdGguYXNpbiggY2xhbXAoIG0xMywgLSAxLCAxICkgKTtcblxuXHRcdFx0aWYgKCBNYXRoLmFicyggbTEzICkgPCAwLjk5OTk5ICkge1xuXG5cdFx0XHRcdHRoaXMuX3ggPSBNYXRoLmF0YW4yKCAtIG0yMywgbTMzICk7XG5cdFx0XHRcdHRoaXMuX3ogPSBNYXRoLmF0YW4yKCAtIG0xMiwgbTExICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0dGhpcy5feCA9IE1hdGguYXRhbjIoIG0zMiwgbTIyICk7XG5cdFx0XHRcdHRoaXMuX3ogPSAwO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2UgaWYgKCBvcmRlciA9PT0gJ1lYWicgKSB7XG5cblx0XHRcdHRoaXMuX3ggPSBNYXRoLmFzaW4oIC0gY2xhbXAoIG0yMywgLSAxLCAxICkgKTtcblxuXHRcdFx0aWYgKCBNYXRoLmFicyggbTIzICkgPCAwLjk5OTk5ICkge1xuXG5cdFx0XHRcdHRoaXMuX3kgPSBNYXRoLmF0YW4yKCBtMTMsIG0zMyApO1xuXHRcdFx0XHR0aGlzLl96ID0gTWF0aC5hdGFuMiggbTIxLCBtMjIgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR0aGlzLl95ID0gTWF0aC5hdGFuMiggLSBtMzEsIG0xMSApO1xuXHRcdFx0XHR0aGlzLl96ID0gMDtcblxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIGlmICggb3JkZXIgPT09ICdaWFknICkge1xuXG5cdFx0XHR0aGlzLl94ID0gTWF0aC5hc2luKCBjbGFtcCggbTMyLCAtIDEsIDEgKSApO1xuXG5cdFx0XHRpZiAoIE1hdGguYWJzKCBtMzIgKSA8IDAuOTk5OTkgKSB7XG5cblx0XHRcdFx0dGhpcy5feSA9IE1hdGguYXRhbjIoIC0gbTMxLCBtMzMgKTtcblx0XHRcdFx0dGhpcy5feiA9IE1hdGguYXRhbjIoIC0gbTEyLCBtMjIgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR0aGlzLl95ID0gMDtcblx0XHRcdFx0dGhpcy5feiA9IE1hdGguYXRhbjIoIG0yMSwgbTExICk7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSBpZiAoIG9yZGVyID09PSAnWllYJyApIHtcblxuXHRcdFx0dGhpcy5feSA9IE1hdGguYXNpbiggLSBjbGFtcCggbTMxLCAtIDEsIDEgKSApO1xuXG5cdFx0XHRpZiAoIE1hdGguYWJzKCBtMzEgKSA8IDAuOTk5OTkgKSB7XG5cblx0XHRcdFx0dGhpcy5feCA9IE1hdGguYXRhbjIoIG0zMiwgbTMzICk7XG5cdFx0XHRcdHRoaXMuX3ogPSBNYXRoLmF0YW4yKCBtMjEsIG0xMSApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHRoaXMuX3ggPSAwO1xuXHRcdFx0XHR0aGlzLl96ID0gTWF0aC5hdGFuMiggLSBtMTIsIG0yMiApO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2UgaWYgKCBvcmRlciA9PT0gJ1laWCcgKSB7XG5cblx0XHRcdHRoaXMuX3ogPSBNYXRoLmFzaW4oIGNsYW1wKCBtMjEsIC0gMSwgMSApICk7XG5cblx0XHRcdGlmICggTWF0aC5hYnMoIG0yMSApIDwgMC45OTk5OSApIHtcblxuXHRcdFx0XHR0aGlzLl94ID0gTWF0aC5hdGFuMiggLSBtMjMsIG0yMiApO1xuXHRcdFx0XHR0aGlzLl95ID0gTWF0aC5hdGFuMiggLSBtMzEsIG0xMSApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHRoaXMuX3ggPSAwO1xuXHRcdFx0XHR0aGlzLl95ID0gTWF0aC5hdGFuMiggbTEzLCBtMzMgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIGlmICggb3JkZXIgPT09ICdYWlknICkge1xuXG5cdFx0XHR0aGlzLl96ID0gTWF0aC5hc2luKCAtIGNsYW1wKCBtMTIsIC0gMSwgMSApICk7XG5cblx0XHRcdGlmICggTWF0aC5hYnMoIG0xMiApIDwgMC45OTk5OSApIHtcblxuXHRcdFx0XHR0aGlzLl94ID0gTWF0aC5hdGFuMiggbTMyLCBtMjIgKTtcblx0XHRcdFx0dGhpcy5feSA9IE1hdGguYXRhbjIoIG0xMywgbTExICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0dGhpcy5feCA9IE1hdGguYXRhbjIoIC0gbTIzLCBtMzMgKTtcblx0XHRcdFx0dGhpcy5feSA9IDA7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLkV1bGVyOiAuc2V0RnJvbVJvdGF0aW9uTWF0cml4KCkgZ2l2ZW4gdW5zdXBwb3J0ZWQgb3JkZXI6ICcgKyBvcmRlciApXG5cblx0XHR9XG5cblx0XHR0aGlzLl9vcmRlciA9IG9yZGVyO1xuXG5cdFx0aWYgKCB1cGRhdGUgIT09IGZhbHNlICkgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldEZyb21RdWF0ZXJuaW9uOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgbWF0cml4O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggcSwgb3JkZXIsIHVwZGF0ZSApIHtcblxuXHRcdFx0aWYgKCBtYXRyaXggPT09IHVuZGVmaW5lZCApIG1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cdFx0XHRtYXRyaXgubWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb24oIHEgKTtcblx0XHRcdHRoaXMuc2V0RnJvbVJvdGF0aW9uTWF0cml4KCBtYXRyaXgsIG9yZGVyLCB1cGRhdGUgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRzZXRGcm9tVmVjdG9yMzogZnVuY3Rpb24gKCB2LCBvcmRlciApIHtcblxuXHRcdHJldHVybiB0aGlzLnNldCggdi54LCB2LnksIHYueiwgb3JkZXIgfHwgdGhpcy5fb3JkZXIgKTtcblxuXHR9LFxuXG5cdHJlb3JkZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIFdBUk5JTkc6IHRoaXMgZGlzY2FyZHMgcmV2b2x1dGlvbiBpbmZvcm1hdGlvbiAtYmhvdXN0b25cblxuXHRcdHZhciBxID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIG5ld09yZGVyICkge1xuXG5cdFx0XHRxLnNldEZyb21FdWxlciggdGhpcyApO1xuXHRcdFx0dGhpcy5zZXRGcm9tUXVhdGVybmlvbiggcSwgbmV3T3JkZXIgKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGVxdWFsczogZnVuY3Rpb24gKCBldWxlciApIHtcblxuXHRcdHJldHVybiAoIGV1bGVyLl94ID09PSB0aGlzLl94ICkgJiYgKCBldWxlci5feSA9PT0gdGhpcy5feSApICYmICggZXVsZXIuX3ogPT09IHRoaXMuX3ogKSAmJiAoIGV1bGVyLl9vcmRlciA9PT0gdGhpcy5fb3JkZXIgKTtcblxuXHR9LFxuXG5cdGZyb21BcnJheTogZnVuY3Rpb24gKCBhcnJheSApIHtcblxuXHRcdHRoaXMuX3ggPSBhcnJheVsgMCBdO1xuXHRcdHRoaXMuX3kgPSBhcnJheVsgMSBdO1xuXHRcdHRoaXMuX3ogPSBhcnJheVsgMiBdO1xuXHRcdGlmICggYXJyYXlbIDMgXSAhPT0gdW5kZWZpbmVkICkgdGhpcy5fb3JkZXIgPSBhcnJheVsgMyBdO1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdGlmICggYXJyYXkgPT09IHVuZGVmaW5lZCApIGFycmF5ID0gW107XG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHRhcnJheVsgb2Zmc2V0IF0gPSB0aGlzLl94O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxIF0gPSB0aGlzLl95O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAyIF0gPSB0aGlzLl96O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAzIF0gPSB0aGlzLl9vcmRlcjtcblxuXHRcdHJldHVybiBhcnJheTtcblx0fSxcblxuXHR0b1ZlY3RvcjM6IGZ1bmN0aW9uICggb3B0aW9uYWxSZXN1bHQgKSB7XG5cblx0XHRpZiAoIG9wdGlvbmFsUmVzdWx0ICkge1xuXG5cdFx0XHRyZXR1cm4gb3B0aW9uYWxSZXN1bHQuc2V0KCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLl96ICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRyZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjMoIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3ogKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbiAoIGNhbGxiYWNrICkge1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uQ2hhbmdlQ2FsbGJhY2s6IGZ1bmN0aW9uICgpIHt9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFRIUkVFLkV1bGVyKCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLl96LCB0aGlzLl9vcmRlciApO1xuXG5cdH1cblxufTtcblxuLy8gRmlsZTpzcmMvbWF0aC9NYXRyaXg0LmpzXG5cbi8qKlxuICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbS9cbiAqIEBhdXRob3Igc3VwZXJlZ2diZXJ0IC8gaHR0cDovL3d3dy5wYXVsYnJ1bnQuY28udWsvXG4gKiBAYXV0aG9yIHBoaWxvZ2IgLyBodHRwOi8vYmxvZy50aGVqaXQub3JnL1xuICogQGF1dGhvciBqb3JkaV9yb3MgLyBodHRwOi8vcGxhdHRzb2Z0LmNvbVxuICogQGF1dGhvciBEMXBsbzFkIC8gaHR0cDovL2dpdGh1Yi5jb20vRDFwbG8xZFxuICogQGF1dGhvciBhbHRlcmVkcSAvIGh0dHA6Ly9hbHRlcmVkcXVhbGlhLmNvbS9cbiAqIEBhdXRob3IgbWlrYWVsIGVtdGluZ2VyIC8gaHR0cDovL2dvbW8uc2UvXG4gKiBAYXV0aG9yIHRpbWtuaXAgLyBodHRwOi8vd3d3LmZsb29ycGxhbm5lci5jb20vXG4gKiBAYXV0aG9yIGJob3VzdG9uIC8gaHR0cDovL2V4b2NvcnRleC5jb21cbiAqIEBhdXRob3IgV2VzdExhbmdsZXkgLyBodHRwOi8vZ2l0aHViLmNvbS9XZXN0TGFuZ2xleVxuICovXG5cblRIUkVFLk1hdHJpeDQgPSBmdW5jdGlvbiAoKSB7XG5cblx0dGhpcy5lbGVtZW50cyA9IG5ldyBGbG9hdDMyQXJyYXkoIFtcblxuXHRcdDEsIDAsIDAsIDAsXG5cdFx0MCwgMSwgMCwgMCxcblx0XHQwLCAwLCAxLCAwLFxuXHRcdDAsIDAsIDAsIDFcblxuXHRdICk7XG5cblx0aWYgKCBhcmd1bWVudHMubGVuZ3RoID4gMCApIHtcblxuXHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5NYXRyaXg0OiB0aGUgY29uc3RydWN0b3Igbm8gbG9uZ2VyIHJlYWRzIGFyZ3VtZW50cy4gdXNlIC5zZXQoKSBpbnN0ZWFkLicgKTtcblxuXHR9XG5cbn07XG5cblRIUkVFLk1hdHJpeDQucHJvdG90eXBlID0ge1xuXG5cdGNvbnN0cnVjdG9yOiBUSFJFRS5NYXRyaXg0LFxuXG5cdHNldDogZnVuY3Rpb24gKCBuMTEsIG4xMiwgbjEzLCBuMTQsIG4yMSwgbjIyLCBuMjMsIG4yNCwgbjMxLCBuMzIsIG4zMywgbjM0LCBuNDEsIG40MiwgbjQzLCBuNDQgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dGVbIDAgXSA9IG4xMTsgdGVbIDQgXSA9IG4xMjsgdGVbIDggXSA9IG4xMzsgdGVbIDEyIF0gPSBuMTQ7XG5cdFx0dGVbIDEgXSA9IG4yMTsgdGVbIDUgXSA9IG4yMjsgdGVbIDkgXSA9IG4yMzsgdGVbIDEzIF0gPSBuMjQ7XG5cdFx0dGVbIDIgXSA9IG4zMTsgdGVbIDYgXSA9IG4zMjsgdGVbIDEwIF0gPSBuMzM7IHRlWyAxNCBdID0gbjM0O1xuXHRcdHRlWyAzIF0gPSBuNDE7IHRlWyA3IF0gPSBuNDI7IHRlWyAxMSBdID0gbjQzOyB0ZVsgMTUgXSA9IG40NDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0aWRlbnRpdHk6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuc2V0KFxuXG5cdFx0XHQxLCAwLCAwLCAwLFxuXHRcdFx0MCwgMSwgMCwgMCxcblx0XHRcdDAsIDAsIDEsIDAsXG5cdFx0XHQwLCAwLCAwLCAxXG5cblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjb3B5OiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHR0aGlzLmVsZW1lbnRzLnNldCggbS5lbGVtZW50cyApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRleHRyYWN0UG9zaXRpb246IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk1hdHJpeDQ6IC5leHRyYWN0UG9zaXRpb24oKSBoYXMgYmVlbiByZW5hbWVkIHRvIC5jb3B5UG9zaXRpb24oKS4nICk7XG5cdFx0cmV0dXJuIHRoaXMuY29weVBvc2l0aW9uKCBtICk7XG5cblx0fSxcblxuXHRjb3B5UG9zaXRpb246IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cdFx0dmFyIG1lID0gbS5lbGVtZW50cztcblxuXHRcdHRlWyAxMiBdID0gbWVbIDEyIF07XG5cdFx0dGVbIDEzIF0gPSBtZVsgMTMgXTtcblx0XHR0ZVsgMTQgXSA9IG1lWyAxNCBdO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRleHRyYWN0QmFzaXM6IGZ1bmN0aW9uICggeEF4aXMsIHlBeGlzLCB6QXhpcyApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR4QXhpcy5zZXQoIHRlWyAwIF0sIHRlWyAxIF0sIHRlWyAyIF0gKTtcblx0XHR5QXhpcy5zZXQoIHRlWyA0IF0sIHRlWyA1IF0sIHRlWyA2IF0gKTtcblx0XHR6QXhpcy5zZXQoIHRlWyA4IF0sIHRlWyA5IF0sIHRlWyAxMCBdICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1ha2VCYXNpczogZnVuY3Rpb24gKCB4QXhpcywgeUF4aXMsIHpBeGlzICkge1xuXG5cdFx0dGhpcy5zZXQoXG5cdFx0XHR4QXhpcy54LCB5QXhpcy54LCB6QXhpcy54LCAwLFxuXHRcdFx0eEF4aXMueSwgeUF4aXMueSwgekF4aXMueSwgMCxcblx0XHRcdHhBeGlzLnosIHlBeGlzLnosIHpBeGlzLnosIDAsXG5cdFx0XHQwLCAgICAgICAwLCAgICAgICAwLCAgICAgICAxXG5cdFx0KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZXh0cmFjdFJvdGF0aW9uOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdjE7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0XHRpZiAoIHYxID09PSB1bmRlZmluZWQgKSB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cdFx0XHR2YXIgbWUgPSBtLmVsZW1lbnRzO1xuXG5cdFx0XHR2YXIgc2NhbGVYID0gMSAvIHYxLnNldCggbWVbIDAgXSwgbWVbIDEgXSwgbWVbIDIgXSApLmxlbmd0aCgpO1xuXHRcdFx0dmFyIHNjYWxlWSA9IDEgLyB2MS5zZXQoIG1lWyA0IF0sIG1lWyA1IF0sIG1lWyA2IF0gKS5sZW5ndGgoKTtcblx0XHRcdHZhciBzY2FsZVogPSAxIC8gdjEuc2V0KCBtZVsgOCBdLCBtZVsgOSBdLCBtZVsgMTAgXSApLmxlbmd0aCgpO1xuXG5cdFx0XHR0ZVsgMCBdID0gbWVbIDAgXSAqIHNjYWxlWDtcblx0XHRcdHRlWyAxIF0gPSBtZVsgMSBdICogc2NhbGVYO1xuXHRcdFx0dGVbIDIgXSA9IG1lWyAyIF0gKiBzY2FsZVg7XG5cblx0XHRcdHRlWyA0IF0gPSBtZVsgNCBdICogc2NhbGVZO1xuXHRcdFx0dGVbIDUgXSA9IG1lWyA1IF0gKiBzY2FsZVk7XG5cdFx0XHR0ZVsgNiBdID0gbWVbIDYgXSAqIHNjYWxlWTtcblxuXHRcdFx0dGVbIDggXSA9IG1lWyA4IF0gKiBzY2FsZVo7XG5cdFx0XHR0ZVsgOSBdID0gbWVbIDkgXSAqIHNjYWxlWjtcblx0XHRcdHRlWyAxMCBdID0gbWVbIDEwIF0gKiBzY2FsZVo7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0bWFrZVJvdGF0aW9uRnJvbUV1bGVyOiBmdW5jdGlvbiAoIGV1bGVyICkge1xuXG5cdFx0aWYgKCBldWxlciBpbnN0YW5jZW9mIFRIUkVFLkV1bGVyID09PSBmYWxzZSApIHtcblxuXHRcdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLk1hdHJpeDogLm1ha2VSb3RhdGlvbkZyb21FdWxlcigpIG5vdyBleHBlY3RzIGEgRXVsZXIgcm90YXRpb24gcmF0aGVyIHRoYW4gYSBWZWN0b3IzIGFuZCBvcmRlci4nICk7XG5cblx0XHR9XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dmFyIHggPSBldWxlci54LCB5ID0gZXVsZXIueSwgeiA9IGV1bGVyLno7XG5cdFx0dmFyIGEgPSBNYXRoLmNvcyggeCApLCBiID0gTWF0aC5zaW4oIHggKTtcblx0XHR2YXIgYyA9IE1hdGguY29zKCB5ICksIGQgPSBNYXRoLnNpbiggeSApO1xuXHRcdHZhciBlID0gTWF0aC5jb3MoIHogKSwgZiA9IE1hdGguc2luKCB6ICk7XG5cblx0XHRpZiAoIGV1bGVyLm9yZGVyID09PSAnWFlaJyApIHtcblxuXHRcdFx0dmFyIGFlID0gYSAqIGUsIGFmID0gYSAqIGYsIGJlID0gYiAqIGUsIGJmID0gYiAqIGY7XG5cblx0XHRcdHRlWyAwIF0gPSBjICogZTtcblx0XHRcdHRlWyA0IF0gPSAtIGMgKiBmO1xuXHRcdFx0dGVbIDggXSA9IGQ7XG5cblx0XHRcdHRlWyAxIF0gPSBhZiArIGJlICogZDtcblx0XHRcdHRlWyA1IF0gPSBhZSAtIGJmICogZDtcblx0XHRcdHRlWyA5IF0gPSAtIGIgKiBjO1xuXG5cdFx0XHR0ZVsgMiBdID0gYmYgLSBhZSAqIGQ7XG5cdFx0XHR0ZVsgNiBdID0gYmUgKyBhZiAqIGQ7XG5cdFx0XHR0ZVsgMTAgXSA9IGEgKiBjO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdZWFonICkge1xuXG5cdFx0XHR2YXIgY2UgPSBjICogZSwgY2YgPSBjICogZiwgZGUgPSBkICogZSwgZGYgPSBkICogZjtcblxuXHRcdFx0dGVbIDAgXSA9IGNlICsgZGYgKiBiO1xuXHRcdFx0dGVbIDQgXSA9IGRlICogYiAtIGNmO1xuXHRcdFx0dGVbIDggXSA9IGEgKiBkO1xuXG5cdFx0XHR0ZVsgMSBdID0gYSAqIGY7XG5cdFx0XHR0ZVsgNSBdID0gYSAqIGU7XG5cdFx0XHR0ZVsgOSBdID0gLSBiO1xuXG5cdFx0XHR0ZVsgMiBdID0gY2YgKiBiIC0gZGU7XG5cdFx0XHR0ZVsgNiBdID0gZGYgKyBjZSAqIGI7XG5cdFx0XHR0ZVsgMTAgXSA9IGEgKiBjO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdaWFknICkge1xuXG5cdFx0XHR2YXIgY2UgPSBjICogZSwgY2YgPSBjICogZiwgZGUgPSBkICogZSwgZGYgPSBkICogZjtcblxuXHRcdFx0dGVbIDAgXSA9IGNlIC0gZGYgKiBiO1xuXHRcdFx0dGVbIDQgXSA9IC0gYSAqIGY7XG5cdFx0XHR0ZVsgOCBdID0gZGUgKyBjZiAqIGI7XG5cblx0XHRcdHRlWyAxIF0gPSBjZiArIGRlICogYjtcblx0XHRcdHRlWyA1IF0gPSBhICogZTtcblx0XHRcdHRlWyA5IF0gPSBkZiAtIGNlICogYjtcblxuXHRcdFx0dGVbIDIgXSA9IC0gYSAqIGQ7XG5cdFx0XHR0ZVsgNiBdID0gYjtcblx0XHRcdHRlWyAxMCBdID0gYSAqIGM7XG5cblx0XHR9IGVsc2UgaWYgKCBldWxlci5vcmRlciA9PT0gJ1pZWCcgKSB7XG5cblx0XHRcdHZhciBhZSA9IGEgKiBlLCBhZiA9IGEgKiBmLCBiZSA9IGIgKiBlLCBiZiA9IGIgKiBmO1xuXG5cdFx0XHR0ZVsgMCBdID0gYyAqIGU7XG5cdFx0XHR0ZVsgNCBdID0gYmUgKiBkIC0gYWY7XG5cdFx0XHR0ZVsgOCBdID0gYWUgKiBkICsgYmY7XG5cblx0XHRcdHRlWyAxIF0gPSBjICogZjtcblx0XHRcdHRlWyA1IF0gPSBiZiAqIGQgKyBhZTtcblx0XHRcdHRlWyA5IF0gPSBhZiAqIGQgLSBiZTtcblxuXHRcdFx0dGVbIDIgXSA9IC0gZDtcblx0XHRcdHRlWyA2IF0gPSBiICogYztcblx0XHRcdHRlWyAxMCBdID0gYSAqIGM7XG5cblx0XHR9IGVsc2UgaWYgKCBldWxlci5vcmRlciA9PT0gJ1laWCcgKSB7XG5cblx0XHRcdHZhciBhYyA9IGEgKiBjLCBhZCA9IGEgKiBkLCBiYyA9IGIgKiBjLCBiZCA9IGIgKiBkO1xuXG5cdFx0XHR0ZVsgMCBdID0gYyAqIGU7XG5cdFx0XHR0ZVsgNCBdID0gYmQgLSBhYyAqIGY7XG5cdFx0XHR0ZVsgOCBdID0gYmMgKiBmICsgYWQ7XG5cblx0XHRcdHRlWyAxIF0gPSBmO1xuXHRcdFx0dGVbIDUgXSA9IGEgKiBlO1xuXHRcdFx0dGVbIDkgXSA9IC0gYiAqIGU7XG5cblx0XHRcdHRlWyAyIF0gPSAtIGQgKiBlO1xuXHRcdFx0dGVbIDYgXSA9IGFkICogZiArIGJjO1xuXHRcdFx0dGVbIDEwIF0gPSBhYyAtIGJkICogZjtcblxuXHRcdH0gZWxzZSBpZiAoIGV1bGVyLm9yZGVyID09PSAnWFpZJyApIHtcblxuXHRcdFx0dmFyIGFjID0gYSAqIGMsIGFkID0gYSAqIGQsIGJjID0gYiAqIGMsIGJkID0gYiAqIGQ7XG5cblx0XHRcdHRlWyAwIF0gPSBjICogZTtcblx0XHRcdHRlWyA0IF0gPSAtIGY7XG5cdFx0XHR0ZVsgOCBdID0gZCAqIGU7XG5cblx0XHRcdHRlWyAxIF0gPSBhYyAqIGYgKyBiZDtcblx0XHRcdHRlWyA1IF0gPSBhICogZTtcblx0XHRcdHRlWyA5IF0gPSBhZCAqIGYgLSBiYztcblxuXHRcdFx0dGVbIDIgXSA9IGJjICogZiAtIGFkO1xuXHRcdFx0dGVbIDYgXSA9IGIgKiBlO1xuXHRcdFx0dGVbIDEwIF0gPSBiZCAqIGYgKyBhYztcblxuXHRcdH1cblxuXHRcdC8vIGxhc3QgY29sdW1uXG5cdFx0dGVbIDMgXSA9IDA7XG5cdFx0dGVbIDcgXSA9IDA7XG5cdFx0dGVbIDExIF0gPSAwO1xuXG5cdFx0Ly8gYm90dG9tIHJvd1xuXHRcdHRlWyAxMiBdID0gMDtcblx0XHR0ZVsgMTMgXSA9IDA7XG5cdFx0dGVbIDE0IF0gPSAwO1xuXHRcdHRlWyAxNSBdID0gMTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0Um90YXRpb25Gcm9tUXVhdGVybmlvbjogZnVuY3Rpb24gKCBxICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuTWF0cml4NDogLnNldFJvdGF0aW9uRnJvbVF1YXRlcm5pb24oKSBoYXMgYmVlbiByZW5hbWVkIHRvIC5tYWtlUm90YXRpb25Gcm9tUXVhdGVybmlvbigpLicgKTtcblxuXHRcdHJldHVybiB0aGlzLm1ha2VSb3RhdGlvbkZyb21RdWF0ZXJuaW9uKCBxICk7XG5cblx0fSxcblxuXHRtYWtlUm90YXRpb25Gcm9tUXVhdGVybmlvbjogZnVuY3Rpb24gKCBxICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHZhciB4ID0gcS54LCB5ID0gcS55LCB6ID0gcS56LCB3ID0gcS53O1xuXHRcdHZhciB4MiA9IHggKyB4LCB5MiA9IHkgKyB5LCB6MiA9IHogKyB6O1xuXHRcdHZhciB4eCA9IHggKiB4MiwgeHkgPSB4ICogeTIsIHh6ID0geCAqIHoyO1xuXHRcdHZhciB5eSA9IHkgKiB5MiwgeXogPSB5ICogejIsIHp6ID0geiAqIHoyO1xuXHRcdHZhciB3eCA9IHcgKiB4Miwgd3kgPSB3ICogeTIsIHd6ID0gdyAqIHoyO1xuXG5cdFx0dGVbIDAgXSA9IDEgLSAoIHl5ICsgenogKTtcblx0XHR0ZVsgNCBdID0geHkgLSB3ejtcblx0XHR0ZVsgOCBdID0geHogKyB3eTtcblxuXHRcdHRlWyAxIF0gPSB4eSArIHd6O1xuXHRcdHRlWyA1IF0gPSAxIC0gKCB4eCArIHp6ICk7XG5cdFx0dGVbIDkgXSA9IHl6IC0gd3g7XG5cblx0XHR0ZVsgMiBdID0geHogLSB3eTtcblx0XHR0ZVsgNiBdID0geXogKyB3eDtcblx0XHR0ZVsgMTAgXSA9IDEgLSAoIHh4ICsgeXkgKTtcblxuXHRcdC8vIGxhc3QgY29sdW1uXG5cdFx0dGVbIDMgXSA9IDA7XG5cdFx0dGVbIDcgXSA9IDA7XG5cdFx0dGVbIDExIF0gPSAwO1xuXG5cdFx0Ly8gYm90dG9tIHJvd1xuXHRcdHRlWyAxMiBdID0gMDtcblx0XHR0ZVsgMTMgXSA9IDA7XG5cdFx0dGVbIDE0IF0gPSAwO1xuXHRcdHRlWyAxNSBdID0gMTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bG9va0F0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgeCwgeSwgejtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIGV5ZSwgdGFyZ2V0LCB1cCApIHtcblxuXHRcdFx0aWYgKCB4ID09PSB1bmRlZmluZWQgKSB4ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdGlmICggeSA9PT0gdW5kZWZpbmVkICkgeSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRpZiAoIHogPT09IHVuZGVmaW5lZCApIHogPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0XHR6LnN1YlZlY3RvcnMoIGV5ZSwgdGFyZ2V0ICkubm9ybWFsaXplKCk7XG5cblx0XHRcdGlmICggei5sZW5ndGgoKSA9PT0gMCApIHtcblxuXHRcdFx0XHR6LnogPSAxO1xuXG5cdFx0XHR9XG5cblx0XHRcdHguY3Jvc3NWZWN0b3JzKCB1cCwgeiApLm5vcm1hbGl6ZSgpO1xuXG5cdFx0XHRpZiAoIHgubGVuZ3RoKCkgPT09IDAgKSB7XG5cblx0XHRcdFx0ei54ICs9IDAuMDAwMTtcblx0XHRcdFx0eC5jcm9zc1ZlY3RvcnMoIHVwLCB6ICkubm9ybWFsaXplKCk7XG5cblx0XHRcdH1cblxuXHRcdFx0eS5jcm9zc1ZlY3RvcnMoIHosIHggKTtcblxuXG5cdFx0XHR0ZVsgMCBdID0geC54OyB0ZVsgNCBdID0geS54OyB0ZVsgOCBdID0gei54O1xuXHRcdFx0dGVbIDEgXSA9IHgueTsgdGVbIDUgXSA9IHkueTsgdGVbIDkgXSA9IHoueTtcblx0XHRcdHRlWyAyIF0gPSB4Lno7IHRlWyA2IF0gPSB5Lno7IHRlWyAxMCBdID0gei56O1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdG11bHRpcGx5OiBmdW5jdGlvbiAoIG0sIG4gKSB7XG5cblx0XHRpZiAoIG4gIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuTWF0cml4NDogLm11bHRpcGx5KCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAubXVsdGlwbHlNYXRyaWNlcyggYSwgYiApIGluc3RlYWQuJyApO1xuXHRcdFx0cmV0dXJuIHRoaXMubXVsdGlwbHlNYXRyaWNlcyggbSwgbiApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMubXVsdGlwbHlNYXRyaWNlcyggdGhpcywgbSApO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlNYXRyaWNlczogZnVuY3Rpb24gKCBhLCBiICkge1xuXG5cdFx0dmFyIGFlID0gYS5lbGVtZW50cztcblx0XHR2YXIgYmUgPSBiLmVsZW1lbnRzO1xuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR2YXIgYTExID0gYWVbIDAgXSwgYTEyID0gYWVbIDQgXSwgYTEzID0gYWVbIDggXSwgYTE0ID0gYWVbIDEyIF07XG5cdFx0dmFyIGEyMSA9IGFlWyAxIF0sIGEyMiA9IGFlWyA1IF0sIGEyMyA9IGFlWyA5IF0sIGEyNCA9IGFlWyAxMyBdO1xuXHRcdHZhciBhMzEgPSBhZVsgMiBdLCBhMzIgPSBhZVsgNiBdLCBhMzMgPSBhZVsgMTAgXSwgYTM0ID0gYWVbIDE0IF07XG5cdFx0dmFyIGE0MSA9IGFlWyAzIF0sIGE0MiA9IGFlWyA3IF0sIGE0MyA9IGFlWyAxMSBdLCBhNDQgPSBhZVsgMTUgXTtcblxuXHRcdHZhciBiMTEgPSBiZVsgMCBdLCBiMTIgPSBiZVsgNCBdLCBiMTMgPSBiZVsgOCBdLCBiMTQgPSBiZVsgMTIgXTtcblx0XHR2YXIgYjIxID0gYmVbIDEgXSwgYjIyID0gYmVbIDUgXSwgYjIzID0gYmVbIDkgXSwgYjI0ID0gYmVbIDEzIF07XG5cdFx0dmFyIGIzMSA9IGJlWyAyIF0sIGIzMiA9IGJlWyA2IF0sIGIzMyA9IGJlWyAxMCBdLCBiMzQgPSBiZVsgMTQgXTtcblx0XHR2YXIgYjQxID0gYmVbIDMgXSwgYjQyID0gYmVbIDcgXSwgYjQzID0gYmVbIDExIF0sIGI0NCA9IGJlWyAxNSBdO1xuXG5cdFx0dGVbIDAgXSA9IGExMSAqIGIxMSArIGExMiAqIGIyMSArIGExMyAqIGIzMSArIGExNCAqIGI0MTtcblx0XHR0ZVsgNCBdID0gYTExICogYjEyICsgYTEyICogYjIyICsgYTEzICogYjMyICsgYTE0ICogYjQyO1xuXHRcdHRlWyA4IF0gPSBhMTEgKiBiMTMgKyBhMTIgKiBiMjMgKyBhMTMgKiBiMzMgKyBhMTQgKiBiNDM7XG5cdFx0dGVbIDEyIF0gPSBhMTEgKiBiMTQgKyBhMTIgKiBiMjQgKyBhMTMgKiBiMzQgKyBhMTQgKiBiNDQ7XG5cblx0XHR0ZVsgMSBdID0gYTIxICogYjExICsgYTIyICogYjIxICsgYTIzICogYjMxICsgYTI0ICogYjQxO1xuXHRcdHRlWyA1IF0gPSBhMjEgKiBiMTIgKyBhMjIgKiBiMjIgKyBhMjMgKiBiMzIgKyBhMjQgKiBiNDI7XG5cdFx0dGVbIDkgXSA9IGEyMSAqIGIxMyArIGEyMiAqIGIyMyArIGEyMyAqIGIzMyArIGEyNCAqIGI0Mztcblx0XHR0ZVsgMTMgXSA9IGEyMSAqIGIxNCArIGEyMiAqIGIyNCArIGEyMyAqIGIzNCArIGEyNCAqIGI0NDtcblxuXHRcdHRlWyAyIF0gPSBhMzEgKiBiMTEgKyBhMzIgKiBiMjEgKyBhMzMgKiBiMzEgKyBhMzQgKiBiNDE7XG5cdFx0dGVbIDYgXSA9IGEzMSAqIGIxMiArIGEzMiAqIGIyMiArIGEzMyAqIGIzMiArIGEzNCAqIGI0Mjtcblx0XHR0ZVsgMTAgXSA9IGEzMSAqIGIxMyArIGEzMiAqIGIyMyArIGEzMyAqIGIzMyArIGEzNCAqIGI0Mztcblx0XHR0ZVsgMTQgXSA9IGEzMSAqIGIxNCArIGEzMiAqIGIyNCArIGEzMyAqIGIzNCArIGEzNCAqIGI0NDtcblxuXHRcdHRlWyAzIF0gPSBhNDEgKiBiMTEgKyBhNDIgKiBiMjEgKyBhNDMgKiBiMzEgKyBhNDQgKiBiNDE7XG5cdFx0dGVbIDcgXSA9IGE0MSAqIGIxMiArIGE0MiAqIGIyMiArIGE0MyAqIGIzMiArIGE0NCAqIGI0Mjtcblx0XHR0ZVsgMTEgXSA9IGE0MSAqIGIxMyArIGE0MiAqIGIyMyArIGE0MyAqIGIzMyArIGE0NCAqIGI0Mztcblx0XHR0ZVsgMTUgXSA9IGE0MSAqIGIxNCArIGE0MiAqIGIyNCArIGE0MyAqIGIzNCArIGE0NCAqIGI0NDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlUb0FycmF5OiBmdW5jdGlvbiAoIGEsIGIsIHIgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dGhpcy5tdWx0aXBseU1hdHJpY2VzKCBhLCBiICk7XG5cblx0XHRyWyAwIF0gPSB0ZVsgMCBdOyByWyAxIF0gPSB0ZVsgMSBdOyByWyAyIF0gPSB0ZVsgMiBdOyByWyAzIF0gPSB0ZVsgMyBdO1xuXHRcdHJbIDQgXSA9IHRlWyA0IF07IHJbIDUgXSA9IHRlWyA1IF07IHJbIDYgXSA9IHRlWyA2IF07IHJbIDcgXSA9IHRlWyA3IF07XG5cdFx0clsgOCBdICA9IHRlWyA4IF07IHJbIDkgXSAgPSB0ZVsgOSBdOyByWyAxMCBdID0gdGVbIDEwIF07IHJbIDExIF0gPSB0ZVsgMTEgXTtcblx0XHRyWyAxMiBdID0gdGVbIDEyIF07IHJbIDEzIF0gPSB0ZVsgMTMgXTsgclsgMTQgXSA9IHRlWyAxNCBdOyByWyAxNSBdID0gdGVbIDE1IF07XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5U2NhbGFyOiBmdW5jdGlvbiAoIHMgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dGVbIDAgXSAqPSBzOyB0ZVsgNCBdICo9IHM7IHRlWyA4IF0gKj0gczsgdGVbIDEyIF0gKj0gcztcblx0XHR0ZVsgMSBdICo9IHM7IHRlWyA1IF0gKj0gczsgdGVbIDkgXSAqPSBzOyB0ZVsgMTMgXSAqPSBzO1xuXHRcdHRlWyAyIF0gKj0gczsgdGVbIDYgXSAqPSBzOyB0ZVsgMTAgXSAqPSBzOyB0ZVsgMTQgXSAqPSBzO1xuXHRcdHRlWyAzIF0gKj0gczsgdGVbIDcgXSAqPSBzOyB0ZVsgMTEgXSAqPSBzOyB0ZVsgMTUgXSAqPSBzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtdWx0aXBseVZlY3RvcjM6IGZ1bmN0aW9uICggdmVjdG9yICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuTWF0cml4NDogLm11bHRpcGx5VmVjdG9yMygpIGhhcyBiZWVuIHJlbW92ZWQuIFVzZSB2ZWN0b3IuYXBwbHlNYXRyaXg0KCBtYXRyaXggKSBvciB2ZWN0b3IuYXBwbHlQcm9qZWN0aW9uKCBtYXRyaXggKSBpbnN0ZWFkLicgKTtcblx0XHRyZXR1cm4gdmVjdG9yLmFwcGx5UHJvamVjdGlvbiggdGhpcyApO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlWZWN0b3I0OiBmdW5jdGlvbiAoIHZlY3RvciApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk1hdHJpeDQ6IC5tdWx0aXBseVZlY3RvcjQoKSBoYXMgYmVlbiByZW1vdmVkLiBVc2UgdmVjdG9yLmFwcGx5TWF0cml4NCggbWF0cml4ICkgaW5zdGVhZC4nICk7XG5cdFx0cmV0dXJuIHZlY3Rvci5hcHBseU1hdHJpeDQoIHRoaXMgKTtcblxuXHR9LFxuXG5cdG11bHRpcGx5VmVjdG9yM0FycmF5OiBmdW5jdGlvbiAoIGEgKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5NYXRyaXg0OiAubXVsdGlwbHlWZWN0b3IzQXJyYXkoKSBoYXMgYmVlbiByZW5hbWVkLiBVc2UgbWF0cml4LmFwcGx5VG9WZWN0b3IzQXJyYXkoIGFycmF5ICkgaW5zdGVhZC4nICk7XG5cdFx0cmV0dXJuIHRoaXMuYXBwbHlUb1ZlY3RvcjNBcnJheSggYSApO1xuXG5cdH0sXG5cblx0YXBwbHlUb1ZlY3RvcjNBcnJheTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYxO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCwgbGVuZ3RoICkge1xuXG5cdFx0XHRpZiAoIHYxID09PSB1bmRlZmluZWQgKSB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblx0XHRcdGlmICggbGVuZ3RoID09PSB1bmRlZmluZWQgKSBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cblx0XHRcdGZvciAoIHZhciBpID0gMCwgaiA9IG9mZnNldDsgaSA8IGxlbmd0aDsgaSArPSAzLCBqICs9IDMgKSB7XG5cblx0XHRcdFx0djEuZnJvbUFycmF5KCBhcnJheSwgaiApO1xuXHRcdFx0XHR2MS5hcHBseU1hdHJpeDQoIHRoaXMgKTtcblx0XHRcdFx0djEudG9BcnJheSggYXJyYXksIGogKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYXJyYXk7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRhcHBseVRvQnVmZmVyOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdjE7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gYXBwbHlUb0J1ZmZlciggYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCApIHtcblxuXHRcdFx0aWYgKCB2MSA9PT0gdW5kZWZpbmVkICkgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cdFx0XHRpZiAoIGxlbmd0aCA9PT0gdW5kZWZpbmVkICkgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aCAvIGJ1ZmZlci5pdGVtU2l6ZTtcblxuXHRcdFx0Zm9yICggdmFyIGkgPSAwLCBqID0gb2Zmc2V0OyBpIDwgbGVuZ3RoOyBpICsrLCBqICsrICkge1xuXG5cdFx0XHRcdHYxLnggPSBidWZmZXIuZ2V0WCggaiApO1xuXHRcdFx0XHR2MS55ID0gYnVmZmVyLmdldFkoIGogKTtcblx0XHRcdFx0djEueiA9IGJ1ZmZlci5nZXRaKCBqICk7XG5cblx0XHRcdFx0djEuYXBwbHlNYXRyaXg0KCB0aGlzICk7XG5cblx0XHRcdFx0YnVmZmVyLnNldFhZWiggdjEueCwgdjEueSwgdjEueiApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBidWZmZXI7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRyb3RhdGVBeGlzOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5NYXRyaXg0OiAucm90YXRlQXhpcygpIGhhcyBiZWVuIHJlbW92ZWQuIFVzZSBWZWN0b3IzLnRyYW5zZm9ybURpcmVjdGlvbiggbWF0cml4ICkgaW5zdGVhZC4nICk7XG5cblx0XHR2LnRyYW5zZm9ybURpcmVjdGlvbiggdGhpcyApO1xuXG5cdH0sXG5cblx0Y3Jvc3NWZWN0b3I6IGZ1bmN0aW9uICggdmVjdG9yICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuTWF0cml4NDogLmNyb3NzVmVjdG9yKCkgaGFzIGJlZW4gcmVtb3ZlZC4gVXNlIHZlY3Rvci5hcHBseU1hdHJpeDQoIG1hdHJpeCApIGluc3RlYWQuJyApO1xuXHRcdHJldHVybiB2ZWN0b3IuYXBwbHlNYXRyaXg0KCB0aGlzICk7XG5cblx0fSxcblxuXHRkZXRlcm1pbmFudDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHZhciBuMTEgPSB0ZVsgMCBdLCBuMTIgPSB0ZVsgNCBdLCBuMTMgPSB0ZVsgOCBdLCBuMTQgPSB0ZVsgMTIgXTtcblx0XHR2YXIgbjIxID0gdGVbIDEgXSwgbjIyID0gdGVbIDUgXSwgbjIzID0gdGVbIDkgXSwgbjI0ID0gdGVbIDEzIF07XG5cdFx0dmFyIG4zMSA9IHRlWyAyIF0sIG4zMiA9IHRlWyA2IF0sIG4zMyA9IHRlWyAxMCBdLCBuMzQgPSB0ZVsgMTQgXTtcblx0XHR2YXIgbjQxID0gdGVbIDMgXSwgbjQyID0gdGVbIDcgXSwgbjQzID0gdGVbIDExIF0sIG40NCA9IHRlWyAxNSBdO1xuXG5cdFx0Ly9UT0RPOiBtYWtlIHRoaXMgbW9yZSBlZmZpY2llbnRcblx0XHQvLyggYmFzZWQgb24gaHR0cDovL3d3dy5ldWNsaWRlYW5zcGFjZS5jb20vbWF0aHMvYWxnZWJyYS9tYXRyaXgvZnVuY3Rpb25zL2ludmVyc2UvZm91ckQvaW5kZXguaHRtIClcblxuXHRcdHJldHVybiAoXG5cdFx0XHRuNDEgKiAoXG5cdFx0XHRcdCsgbjE0ICogbjIzICogbjMyXG5cdFx0XHRcdCAtIG4xMyAqIG4yNCAqIG4zMlxuXHRcdFx0XHQgLSBuMTQgKiBuMjIgKiBuMzNcblx0XHRcdFx0ICsgbjEyICogbjI0ICogbjMzXG5cdFx0XHRcdCArIG4xMyAqIG4yMiAqIG4zNFxuXHRcdFx0XHQgLSBuMTIgKiBuMjMgKiBuMzRcblx0XHRcdCkgK1xuXHRcdFx0bjQyICogKFxuXHRcdFx0XHQrIG4xMSAqIG4yMyAqIG4zNFxuXHRcdFx0XHQgLSBuMTEgKiBuMjQgKiBuMzNcblx0XHRcdFx0ICsgbjE0ICogbjIxICogbjMzXG5cdFx0XHRcdCAtIG4xMyAqIG4yMSAqIG4zNFxuXHRcdFx0XHQgKyBuMTMgKiBuMjQgKiBuMzFcblx0XHRcdFx0IC0gbjE0ICogbjIzICogbjMxXG5cdFx0XHQpICtcblx0XHRcdG40MyAqIChcblx0XHRcdFx0KyBuMTEgKiBuMjQgKiBuMzJcblx0XHRcdFx0IC0gbjExICogbjIyICogbjM0XG5cdFx0XHRcdCAtIG4xNCAqIG4yMSAqIG4zMlxuXHRcdFx0XHQgKyBuMTIgKiBuMjEgKiBuMzRcblx0XHRcdFx0ICsgbjE0ICogbjIyICogbjMxXG5cdFx0XHRcdCAtIG4xMiAqIG4yNCAqIG4zMVxuXHRcdFx0KSArXG5cdFx0XHRuNDQgKiAoXG5cdFx0XHRcdC0gbjEzICogbjIyICogbjMxXG5cdFx0XHRcdCAtIG4xMSAqIG4yMyAqIG4zMlxuXHRcdFx0XHQgKyBuMTEgKiBuMjIgKiBuMzNcblx0XHRcdFx0ICsgbjEzICogbjIxICogbjMyXG5cdFx0XHRcdCAtIG4xMiAqIG4yMSAqIG4zM1xuXHRcdFx0XHQgKyBuMTIgKiBuMjMgKiBuMzFcblx0XHRcdClcblxuXHRcdCk7XG5cblx0fSxcblxuXHR0cmFuc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cdFx0dmFyIHRtcDtcblxuXHRcdHRtcCA9IHRlWyAxIF07IHRlWyAxIF0gPSB0ZVsgNCBdOyB0ZVsgNCBdID0gdG1wO1xuXHRcdHRtcCA9IHRlWyAyIF07IHRlWyAyIF0gPSB0ZVsgOCBdOyB0ZVsgOCBdID0gdG1wO1xuXHRcdHRtcCA9IHRlWyA2IF07IHRlWyA2IF0gPSB0ZVsgOSBdOyB0ZVsgOSBdID0gdG1wO1xuXG5cdFx0dG1wID0gdGVbIDMgXTsgdGVbIDMgXSA9IHRlWyAxMiBdOyB0ZVsgMTIgXSA9IHRtcDtcblx0XHR0bXAgPSB0ZVsgNyBdOyB0ZVsgNyBdID0gdGVbIDEzIF07IHRlWyAxMyBdID0gdG1wO1xuXHRcdHRtcCA9IHRlWyAxMSBdOyB0ZVsgMTEgXSA9IHRlWyAxNCBdOyB0ZVsgMTQgXSA9IHRtcDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZmxhdHRlblRvQXJyYXlPZmZzZXQ6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHRhcnJheVsgb2Zmc2V0ICAgICBdID0gdGVbIDAgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMSBdID0gdGVbIDEgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMiBdID0gdGVbIDIgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMyBdID0gdGVbIDMgXTtcblxuXHRcdGFycmF5WyBvZmZzZXQgKyA0IF0gPSB0ZVsgNCBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyA1IF0gPSB0ZVsgNSBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyA2IF0gPSB0ZVsgNiBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyA3IF0gPSB0ZVsgNyBdO1xuXG5cdFx0YXJyYXlbIG9mZnNldCArIDggXSAgPSB0ZVsgOCBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyA5IF0gID0gdGVbIDkgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMTAgXSA9IHRlWyAxMCBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxMSBdID0gdGVbIDExIF07XG5cblx0XHRhcnJheVsgb2Zmc2V0ICsgMTIgXSA9IHRlWyAxMiBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxMyBdID0gdGVbIDEzIF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDE0IF0gPSB0ZVsgMTQgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMTUgXSA9IHRlWyAxNSBdO1xuXG5cdFx0cmV0dXJuIGFycmF5O1xuXG5cdH0sXG5cblx0Z2V0UG9zaXRpb246IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGlmICggdjEgPT09IHVuZGVmaW5lZCApIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk1hdHJpeDQ6IC5nZXRQb3NpdGlvbigpIGhhcyBiZWVuIHJlbW92ZWQuIFVzZSBWZWN0b3IzLnNldEZyb21NYXRyaXhQb3NpdGlvbiggbWF0cml4ICkgaW5zdGVhZC4nICk7XG5cblx0XHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cdFx0XHRyZXR1cm4gdjEuc2V0KCB0ZVsgMTIgXSwgdGVbIDEzIF0sIHRlWyAxNCBdICk7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRzZXRQb3NpdGlvbjogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHRlWyAxMiBdID0gdi54O1xuXHRcdHRlWyAxMyBdID0gdi55O1xuXHRcdHRlWyAxNCBdID0gdi56O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRnZXRJbnZlcnNlOiBmdW5jdGlvbiAoIG0sIHRocm93T25JbnZlcnRpYmxlICkge1xuXG5cdFx0Ly8gYmFzZWQgb24gaHR0cDovL3d3dy5ldWNsaWRlYW5zcGFjZS5jb20vbWF0aHMvYWxnZWJyYS9tYXRyaXgvZnVuY3Rpb25zL2ludmVyc2UvZm91ckQvaW5kZXguaHRtXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblx0XHR2YXIgbWUgPSBtLmVsZW1lbnRzO1xuXG5cdFx0dmFyIG4xMSA9IG1lWyAwIF0sIG4xMiA9IG1lWyA0IF0sIG4xMyA9IG1lWyA4IF0sIG4xNCA9IG1lWyAxMiBdO1xuXHRcdHZhciBuMjEgPSBtZVsgMSBdLCBuMjIgPSBtZVsgNSBdLCBuMjMgPSBtZVsgOSBdLCBuMjQgPSBtZVsgMTMgXTtcblx0XHR2YXIgbjMxID0gbWVbIDIgXSwgbjMyID0gbWVbIDYgXSwgbjMzID0gbWVbIDEwIF0sIG4zNCA9IG1lWyAxNCBdO1xuXHRcdHZhciBuNDEgPSBtZVsgMyBdLCBuNDIgPSBtZVsgNyBdLCBuNDMgPSBtZVsgMTEgXSwgbjQ0ID0gbWVbIDE1IF07XG5cblx0XHR0ZVsgMCBdID0gbjIzICogbjM0ICogbjQyIC0gbjI0ICogbjMzICogbjQyICsgbjI0ICogbjMyICogbjQzIC0gbjIyICogbjM0ICogbjQzIC0gbjIzICogbjMyICogbjQ0ICsgbjIyICogbjMzICogbjQ0O1xuXHRcdHRlWyA0IF0gPSBuMTQgKiBuMzMgKiBuNDIgLSBuMTMgKiBuMzQgKiBuNDIgLSBuMTQgKiBuMzIgKiBuNDMgKyBuMTIgKiBuMzQgKiBuNDMgKyBuMTMgKiBuMzIgKiBuNDQgLSBuMTIgKiBuMzMgKiBuNDQ7XG5cdFx0dGVbIDggXSA9IG4xMyAqIG4yNCAqIG40MiAtIG4xNCAqIG4yMyAqIG40MiArIG4xNCAqIG4yMiAqIG40MyAtIG4xMiAqIG4yNCAqIG40MyAtIG4xMyAqIG4yMiAqIG40NCArIG4xMiAqIG4yMyAqIG40NDtcblx0XHR0ZVsgMTIgXSA9IG4xNCAqIG4yMyAqIG4zMiAtIG4xMyAqIG4yNCAqIG4zMiAtIG4xNCAqIG4yMiAqIG4zMyArIG4xMiAqIG4yNCAqIG4zMyArIG4xMyAqIG4yMiAqIG4zNCAtIG4xMiAqIG4yMyAqIG4zNDtcblx0XHR0ZVsgMSBdID0gbjI0ICogbjMzICogbjQxIC0gbjIzICogbjM0ICogbjQxIC0gbjI0ICogbjMxICogbjQzICsgbjIxICogbjM0ICogbjQzICsgbjIzICogbjMxICogbjQ0IC0gbjIxICogbjMzICogbjQ0O1xuXHRcdHRlWyA1IF0gPSBuMTMgKiBuMzQgKiBuNDEgLSBuMTQgKiBuMzMgKiBuNDEgKyBuMTQgKiBuMzEgKiBuNDMgLSBuMTEgKiBuMzQgKiBuNDMgLSBuMTMgKiBuMzEgKiBuNDQgKyBuMTEgKiBuMzMgKiBuNDQ7XG5cdFx0dGVbIDkgXSA9IG4xNCAqIG4yMyAqIG40MSAtIG4xMyAqIG4yNCAqIG40MSAtIG4xNCAqIG4yMSAqIG40MyArIG4xMSAqIG4yNCAqIG40MyArIG4xMyAqIG4yMSAqIG40NCAtIG4xMSAqIG4yMyAqIG40NDtcblx0XHR0ZVsgMTMgXSA9IG4xMyAqIG4yNCAqIG4zMSAtIG4xNCAqIG4yMyAqIG4zMSArIG4xNCAqIG4yMSAqIG4zMyAtIG4xMSAqIG4yNCAqIG4zMyAtIG4xMyAqIG4yMSAqIG4zNCArIG4xMSAqIG4yMyAqIG4zNDtcblx0XHR0ZVsgMiBdID0gbjIyICogbjM0ICogbjQxIC0gbjI0ICogbjMyICogbjQxICsgbjI0ICogbjMxICogbjQyIC0gbjIxICogbjM0ICogbjQyIC0gbjIyICogbjMxICogbjQ0ICsgbjIxICogbjMyICogbjQ0O1xuXHRcdHRlWyA2IF0gPSBuMTQgKiBuMzIgKiBuNDEgLSBuMTIgKiBuMzQgKiBuNDEgLSBuMTQgKiBuMzEgKiBuNDIgKyBuMTEgKiBuMzQgKiBuNDIgKyBuMTIgKiBuMzEgKiBuNDQgLSBuMTEgKiBuMzIgKiBuNDQ7XG5cdFx0dGVbIDEwIF0gPSBuMTIgKiBuMjQgKiBuNDEgLSBuMTQgKiBuMjIgKiBuNDEgKyBuMTQgKiBuMjEgKiBuNDIgLSBuMTEgKiBuMjQgKiBuNDIgLSBuMTIgKiBuMjEgKiBuNDQgKyBuMTEgKiBuMjIgKiBuNDQ7XG5cdFx0dGVbIDE0IF0gPSBuMTQgKiBuMjIgKiBuMzEgLSBuMTIgKiBuMjQgKiBuMzEgLSBuMTQgKiBuMjEgKiBuMzIgKyBuMTEgKiBuMjQgKiBuMzIgKyBuMTIgKiBuMjEgKiBuMzQgLSBuMTEgKiBuMjIgKiBuMzQ7XG5cdFx0dGVbIDMgXSA9IG4yMyAqIG4zMiAqIG40MSAtIG4yMiAqIG4zMyAqIG40MSAtIG4yMyAqIG4zMSAqIG40MiArIG4yMSAqIG4zMyAqIG40MiArIG4yMiAqIG4zMSAqIG40MyAtIG4yMSAqIG4zMiAqIG40Mztcblx0XHR0ZVsgNyBdID0gbjEyICogbjMzICogbjQxIC0gbjEzICogbjMyICogbjQxICsgbjEzICogbjMxICogbjQyIC0gbjExICogbjMzICogbjQyIC0gbjEyICogbjMxICogbjQzICsgbjExICogbjMyICogbjQzO1xuXHRcdHRlWyAxMSBdID0gbjEzICogbjIyICogbjQxIC0gbjEyICogbjIzICogbjQxIC0gbjEzICogbjIxICogbjQyICsgbjExICogbjIzICogbjQyICsgbjEyICogbjIxICogbjQzIC0gbjExICogbjIyICogbjQzO1xuXHRcdHRlWyAxNSBdID0gbjEyICogbjIzICogbjMxIC0gbjEzICogbjIyICogbjMxICsgbjEzICogbjIxICogbjMyIC0gbjExICogbjIzICogbjMyIC0gbjEyICogbjIxICogbjMzICsgbjExICogbjIyICogbjMzO1xuXG5cdFx0dmFyIGRldCA9IG4xMSAqIHRlWyAwIF0gKyBuMjEgKiB0ZVsgNCBdICsgbjMxICogdGVbIDggXSArIG40MSAqIHRlWyAxMiBdO1xuXG5cdFx0aWYgKCBkZXQgPT09IDAgKSB7XG5cblx0XHRcdHZhciBtc2cgPSBcIlRIUkVFLk1hdHJpeDQuZ2V0SW52ZXJzZSgpOiBjYW4ndCBpbnZlcnQgbWF0cml4LCBkZXRlcm1pbmFudCBpcyAwXCI7XG5cblx0XHRcdGlmICggdGhyb3dPbkludmVydGlibGUgfHwgZmFsc2UgKSB7XG5cblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBtc2cgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4oIG1zZyApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuaWRlbnRpdHkoKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9XG5cblx0XHR0aGlzLm11bHRpcGx5U2NhbGFyKCAxIC8gZGV0ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRyYW5zbGF0ZTogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLk1hdHJpeDQ6IC50cmFuc2xhdGUoKSBoYXMgYmVlbiByZW1vdmVkLicgKTtcblxuXHR9LFxuXG5cdHJvdGF0ZVg6IGZ1bmN0aW9uICggYW5nbGUgKSB7XG5cblx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuTWF0cml4NDogLnJvdGF0ZVgoKSBoYXMgYmVlbiByZW1vdmVkLicgKTtcblxuXHR9LFxuXG5cdHJvdGF0ZVk6IGZ1bmN0aW9uICggYW5nbGUgKSB7XG5cblx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuTWF0cml4NDogLnJvdGF0ZVkoKSBoYXMgYmVlbiByZW1vdmVkLicgKTtcblxuXHR9LFxuXG5cdHJvdGF0ZVo6IGZ1bmN0aW9uICggYW5nbGUgKSB7XG5cblx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuTWF0cml4NDogLnJvdGF0ZVooKSBoYXMgYmVlbiByZW1vdmVkLicgKTtcblxuXHR9LFxuXG5cdHJvdGF0ZUJ5QXhpczogZnVuY3Rpb24gKCBheGlzLCBhbmdsZSApIHtcblxuXHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5NYXRyaXg0OiAucm90YXRlQnlBeGlzKCkgaGFzIGJlZW4gcmVtb3ZlZC4nICk7XG5cblx0fSxcblxuXHRzY2FsZTogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblx0XHR2YXIgeCA9IHYueCwgeSA9IHYueSwgeiA9IHYuejtcblxuXHRcdHRlWyAwIF0gKj0geDsgdGVbIDQgXSAqPSB5OyB0ZVsgOCBdICo9IHo7XG5cdFx0dGVbIDEgXSAqPSB4OyB0ZVsgNSBdICo9IHk7IHRlWyA5IF0gKj0gejtcblx0XHR0ZVsgMiBdICo9IHg7IHRlWyA2IF0gKj0geTsgdGVbIDEwIF0gKj0gejtcblx0XHR0ZVsgMyBdICo9IHg7IHRlWyA3IF0gKj0geTsgdGVbIDExIF0gKj0gejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Z2V0TWF4U2NhbGVPbkF4aXM6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR2YXIgc2NhbGVYU3EgPSB0ZVsgMCBdICogdGVbIDAgXSArIHRlWyAxIF0gKiB0ZVsgMSBdICsgdGVbIDIgXSAqIHRlWyAyIF07XG5cdFx0dmFyIHNjYWxlWVNxID0gdGVbIDQgXSAqIHRlWyA0IF0gKyB0ZVsgNSBdICogdGVbIDUgXSArIHRlWyA2IF0gKiB0ZVsgNiBdO1xuXHRcdHZhciBzY2FsZVpTcSA9IHRlWyA4IF0gKiB0ZVsgOCBdICsgdGVbIDkgXSAqIHRlWyA5IF0gKyB0ZVsgMTAgXSAqIHRlWyAxMCBdO1xuXG5cdFx0cmV0dXJuIE1hdGguc3FydCggTWF0aC5tYXgoIHNjYWxlWFNxLCBNYXRoLm1heCggc2NhbGVZU3EsIHNjYWxlWlNxICkgKSApO1xuXG5cdH0sXG5cblx0bWFrZVRyYW5zbGF0aW9uOiBmdW5jdGlvbiAoIHgsIHksIHogKSB7XG5cblx0XHR0aGlzLnNldChcblxuXHRcdFx0MSwgMCwgMCwgeCxcblx0XHRcdDAsIDEsIDAsIHksXG5cdFx0XHQwLCAwLCAxLCB6LFxuXHRcdFx0MCwgMCwgMCwgMVxuXG5cdFx0KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWFrZVJvdGF0aW9uWDogZnVuY3Rpb24gKCB0aGV0YSApIHtcblxuXHRcdHZhciBjID0gTWF0aC5jb3MoIHRoZXRhICksIHMgPSBNYXRoLnNpbiggdGhldGEgKTtcblxuXHRcdHRoaXMuc2V0KFxuXG5cdFx0XHQxLCAwLCAgMCwgMCxcblx0XHRcdDAsIGMsIC0gcywgMCxcblx0XHRcdDAsIHMsICBjLCAwLFxuXHRcdFx0MCwgMCwgIDAsIDFcblxuXHRcdCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1ha2VSb3RhdGlvblk6IGZ1bmN0aW9uICggdGhldGEgKSB7XG5cblx0XHR2YXIgYyA9IE1hdGguY29zKCB0aGV0YSApLCBzID0gTWF0aC5zaW4oIHRoZXRhICk7XG5cblx0XHR0aGlzLnNldChcblxuXHRcdFx0IGMsIDAsIHMsIDAsXG5cdFx0XHQgMCwgMSwgMCwgMCxcblx0XHRcdC0gcywgMCwgYywgMCxcblx0XHRcdCAwLCAwLCAwLCAxXG5cblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtYWtlUm90YXRpb25aOiBmdW5jdGlvbiAoIHRoZXRhICkge1xuXG5cdFx0dmFyIGMgPSBNYXRoLmNvcyggdGhldGEgKSwgcyA9IE1hdGguc2luKCB0aGV0YSApO1xuXG5cdFx0dGhpcy5zZXQoXG5cblx0XHRcdGMsIC0gcywgMCwgMCxcblx0XHRcdHMsICBjLCAwLCAwLFxuXHRcdFx0MCwgIDAsIDEsIDAsXG5cdFx0XHQwLCAgMCwgMCwgMVxuXG5cdFx0KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWFrZVJvdGF0aW9uQXhpczogZnVuY3Rpb24gKCBheGlzLCBhbmdsZSApIHtcblxuXHRcdC8vIEJhc2VkIG9uIGh0dHA6Ly93d3cuZ2FtZWRldi5uZXQvcmVmZXJlbmNlL2FydGljbGVzL2FydGljbGUxMTk5LmFzcFxuXG5cdFx0dmFyIGMgPSBNYXRoLmNvcyggYW5nbGUgKTtcblx0XHR2YXIgcyA9IE1hdGguc2luKCBhbmdsZSApO1xuXHRcdHZhciB0ID0gMSAtIGM7XG5cdFx0dmFyIHggPSBheGlzLngsIHkgPSBheGlzLnksIHogPSBheGlzLno7XG5cdFx0dmFyIHR4ID0gdCAqIHgsIHR5ID0gdCAqIHk7XG5cblx0XHR0aGlzLnNldChcblxuXHRcdFx0dHggKiB4ICsgYywgdHggKiB5IC0gcyAqIHosIHR4ICogeiArIHMgKiB5LCAwLFxuXHRcdFx0dHggKiB5ICsgcyAqIHosIHR5ICogeSArIGMsIHR5ICogeiAtIHMgKiB4LCAwLFxuXHRcdFx0dHggKiB6IC0gcyAqIHksIHR5ICogeiArIHMgKiB4LCB0ICogeiAqIHogKyBjLCAwLFxuXHRcdFx0MCwgMCwgMCwgMVxuXG5cdFx0KTtcblxuXHRcdCByZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1ha2VTY2FsZTogZnVuY3Rpb24gKCB4LCB5LCB6ICkge1xuXG5cdFx0dGhpcy5zZXQoXG5cblx0XHRcdHgsIDAsIDAsIDAsXG5cdFx0XHQwLCB5LCAwLCAwLFxuXHRcdFx0MCwgMCwgeiwgMCxcblx0XHRcdDAsIDAsIDAsIDFcblxuXHRcdCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNvbXBvc2U6IGZ1bmN0aW9uICggcG9zaXRpb24sIHF1YXRlcm5pb24sIHNjYWxlICkge1xuXG5cdFx0dGhpcy5tYWtlUm90YXRpb25Gcm9tUXVhdGVybmlvbiggcXVhdGVybmlvbiApO1xuXHRcdHRoaXMuc2NhbGUoIHNjYWxlICk7XG5cdFx0dGhpcy5zZXRQb3NpdGlvbiggcG9zaXRpb24gKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZGVjb21wb3NlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdmVjdG9yLCBtYXRyaXg7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBwb3NpdGlvbiwgcXVhdGVybmlvbiwgc2NhbGUgKSB7XG5cblx0XHRcdGlmICggdmVjdG9yID09PSB1bmRlZmluZWQgKSB2ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0aWYgKCBtYXRyaXggPT09IHVuZGVmaW5lZCApIG1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cblx0XHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHRcdHZhciBzeCA9IHZlY3Rvci5zZXQoIHRlWyAwIF0sIHRlWyAxIF0sIHRlWyAyIF0gKS5sZW5ndGgoKTtcblx0XHRcdHZhciBzeSA9IHZlY3Rvci5zZXQoIHRlWyA0IF0sIHRlWyA1IF0sIHRlWyA2IF0gKS5sZW5ndGgoKTtcblx0XHRcdHZhciBzeiA9IHZlY3Rvci5zZXQoIHRlWyA4IF0sIHRlWyA5IF0sIHRlWyAxMCBdICkubGVuZ3RoKCk7XG5cblx0XHRcdC8vIGlmIGRldGVybWluZSBpcyBuZWdhdGl2ZSwgd2UgbmVlZCB0byBpbnZlcnQgb25lIHNjYWxlXG5cdFx0XHR2YXIgZGV0ID0gdGhpcy5kZXRlcm1pbmFudCgpO1xuXHRcdFx0aWYgKCBkZXQgPCAwICkge1xuXG5cdFx0XHRcdHN4ID0gLSBzeDtcblxuXHRcdFx0fVxuXG5cdFx0XHRwb3NpdGlvbi54ID0gdGVbIDEyIF07XG5cdFx0XHRwb3NpdGlvbi55ID0gdGVbIDEzIF07XG5cdFx0XHRwb3NpdGlvbi56ID0gdGVbIDE0IF07XG5cblx0XHRcdC8vIHNjYWxlIHRoZSByb3RhdGlvbiBwYXJ0XG5cblx0XHRcdG1hdHJpeC5lbGVtZW50cy5zZXQoIHRoaXMuZWxlbWVudHMgKTsgLy8gYXQgdGhpcyBwb2ludCBtYXRyaXggaXMgaW5jb21wbGV0ZSBzbyB3ZSBjYW4ndCB1c2UgLmNvcHkoKVxuXG5cdFx0XHR2YXIgaW52U1ggPSAxIC8gc3g7XG5cdFx0XHR2YXIgaW52U1kgPSAxIC8gc3k7XG5cdFx0XHR2YXIgaW52U1ogPSAxIC8gc3o7XG5cblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMCBdICo9IGludlNYO1xuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyAxIF0gKj0gaW52U1g7XG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDIgXSAqPSBpbnZTWDtcblxuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyA0IF0gKj0gaW52U1k7XG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDUgXSAqPSBpbnZTWTtcblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgNiBdICo9IGludlNZO1xuXG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDggXSAqPSBpbnZTWjtcblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgOSBdICo9IGludlNaO1xuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyAxMCBdICo9IGludlNaO1xuXG5cdFx0XHRxdWF0ZXJuaW9uLnNldEZyb21Sb3RhdGlvbk1hdHJpeCggbWF0cml4ICk7XG5cblx0XHRcdHNjYWxlLnggPSBzeDtcblx0XHRcdHNjYWxlLnkgPSBzeTtcblx0XHRcdHNjYWxlLnogPSBzejtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRtYWtlRnJ1c3R1bTogZnVuY3Rpb24gKCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhciApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cdFx0dmFyIHggPSAyICogbmVhciAvICggcmlnaHQgLSBsZWZ0ICk7XG5cdFx0dmFyIHkgPSAyICogbmVhciAvICggdG9wIC0gYm90dG9tICk7XG5cblx0XHR2YXIgYSA9ICggcmlnaHQgKyBsZWZ0ICkgLyAoIHJpZ2h0IC0gbGVmdCApO1xuXHRcdHZhciBiID0gKCB0b3AgKyBib3R0b20gKSAvICggdG9wIC0gYm90dG9tICk7XG5cdFx0dmFyIGMgPSAtICggZmFyICsgbmVhciApIC8gKCBmYXIgLSBuZWFyICk7XG5cdFx0dmFyIGQgPSAtIDIgKiBmYXIgKiBuZWFyIC8gKCBmYXIgLSBuZWFyICk7XG5cblx0XHR0ZVsgMCBdID0geDtcdHRlWyA0IF0gPSAwO1x0dGVbIDggXSA9IGE7XHR0ZVsgMTIgXSA9IDA7XG5cdFx0dGVbIDEgXSA9IDA7XHR0ZVsgNSBdID0geTtcdHRlWyA5IF0gPSBiO1x0dGVbIDEzIF0gPSAwO1xuXHRcdHRlWyAyIF0gPSAwO1x0dGVbIDYgXSA9IDA7XHR0ZVsgMTAgXSA9IGM7XHR0ZVsgMTQgXSA9IGQ7XG5cdFx0dGVbIDMgXSA9IDA7XHR0ZVsgNyBdID0gMDtcdHRlWyAxMSBdID0gLSAxO1x0dGVbIDE1IF0gPSAwO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtYWtlUGVyc3BlY3RpdmU6IGZ1bmN0aW9uICggZm92LCBhc3BlY3QsIG5lYXIsIGZhciApIHtcblxuXHRcdHZhciB5bWF4ID0gbmVhciAqIE1hdGgudGFuKCBUSFJFRS5NYXRoLmRlZ1RvUmFkKCBmb3YgKiAwLjUgKSApO1xuXHRcdHZhciB5bWluID0gLSB5bWF4O1xuXHRcdHZhciB4bWluID0geW1pbiAqIGFzcGVjdDtcblx0XHR2YXIgeG1heCA9IHltYXggKiBhc3BlY3Q7XG5cblx0XHRyZXR1cm4gdGhpcy5tYWtlRnJ1c3R1bSggeG1pbiwgeG1heCwgeW1pbiwgeW1heCwgbmVhciwgZmFyICk7XG5cblx0fSxcblxuXHRtYWtlT3J0aG9ncmFwaGljOiBmdW5jdGlvbiAoIGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbSwgbmVhciwgZmFyICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblx0XHR2YXIgdyA9IHJpZ2h0IC0gbGVmdDtcblx0XHR2YXIgaCA9IHRvcCAtIGJvdHRvbTtcblx0XHR2YXIgcCA9IGZhciAtIG5lYXI7XG5cblx0XHR2YXIgeCA9ICggcmlnaHQgKyBsZWZ0ICkgLyB3O1xuXHRcdHZhciB5ID0gKCB0b3AgKyBib3R0b20gKSAvIGg7XG5cdFx0dmFyIHogPSAoIGZhciArIG5lYXIgKSAvIHA7XG5cblx0XHR0ZVsgMCBdID0gMiAvIHc7XHR0ZVsgNCBdID0gMDtcdHRlWyA4IF0gPSAwO1x0dGVbIDEyIF0gPSAtIHg7XG5cdFx0dGVbIDEgXSA9IDA7XHR0ZVsgNSBdID0gMiAvIGg7XHR0ZVsgOSBdID0gMDtcdHRlWyAxMyBdID0gLSB5O1xuXHRcdHRlWyAyIF0gPSAwO1x0dGVbIDYgXSA9IDA7XHR0ZVsgMTAgXSA9IC0gMiAvIHA7XHR0ZVsgMTQgXSA9IC0gejtcblx0XHR0ZVsgMyBdID0gMDtcdHRlWyA3IF0gPSAwO1x0dGVbIDExIF0gPSAwO1x0dGVbIDE1IF0gPSAxO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRmcm9tQXJyYXk6IGZ1bmN0aW9uICggYXJyYXkgKSB7XG5cblx0XHR0aGlzLmVsZW1lbnRzLnNldCggYXJyYXkgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dG9BcnJheTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHJldHVybiBbXG5cdFx0XHR0ZVsgMCBdLCB0ZVsgMSBdLCB0ZVsgMiBdLCB0ZVsgMyBdLFxuXHRcdFx0dGVbIDQgXSwgdGVbIDUgXSwgdGVbIDYgXSwgdGVbIDcgXSxcblx0XHRcdHRlWyA4IF0sIHRlWyA5IF0sIHRlWyAxMCBdLCB0ZVsgMTEgXSxcblx0XHRcdHRlWyAxMiBdLCB0ZVsgMTMgXSwgdGVbIDE0IF0sIHRlWyAxNSBdXG5cdFx0XTtcblxuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFRIUkVFLk1hdHJpeDQoKS5mcm9tQXJyYXkoIHRoaXMuZWxlbWVudHMgKTtcblxuXHR9XG5cbn07XG5cbi8vIEZpbGU6c3JjL21hdGgvTWF0aC5qc1xuXG4vKipcbiAqIEBhdXRob3IgYWx0ZXJlZHEgLyBodHRwOi8vYWx0ZXJlZHF1YWxpYS5jb20vXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICovXG5cblRIUkVFLk1hdGggPSB7XG5cblx0Z2VuZXJhdGVVVUlEOiBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBodHRwOi8vd3d3LmJyb29mYS5jb20vVG9vbHMvTWF0aC51dWlkLmh0bVxuXG5cdFx0dmFyIGNoYXJzID0gJzAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6Jy5zcGxpdCggJycgKTtcblx0XHR2YXIgdXVpZCA9IG5ldyBBcnJheSggMzYgKTtcblx0XHR2YXIgcm5kID0gMCwgcjtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGZvciAoIHZhciBpID0gMDsgaSA8IDM2OyBpICsrICkge1xuXG5cdFx0XHRcdGlmICggaSA9PT0gOCB8fCBpID09PSAxMyB8fCBpID09PSAxOCB8fCBpID09PSAyMyApIHtcblxuXHRcdFx0XHRcdHV1aWRbIGkgXSA9ICctJztcblxuXHRcdFx0XHR9IGVsc2UgaWYgKCBpID09PSAxNCApIHtcblxuXHRcdFx0XHRcdHV1aWRbIGkgXSA9ICc0JztcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0aWYgKCBybmQgPD0gMHgwMiApIHJuZCA9IDB4MjAwMDAwMCArICggTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMCApIHwgMDtcblx0XHRcdFx0XHRyID0gcm5kICYgMHhmO1xuXHRcdFx0XHRcdHJuZCA9IHJuZCA+PiA0O1xuXHRcdFx0XHRcdHV1aWRbIGkgXSA9IGNoYXJzWyAoIGkgPT09IDE5ICkgPyAoIHIgJiAweDMgKSB8IDB4OCA6IHIgXTtcblxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB1dWlkLmpvaW4oICcnICk7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHQvLyBDbGFtcCB2YWx1ZSB0byByYW5nZSA8YSwgYj5cblxuXHRjbGFtcDogZnVuY3Rpb24gKCB4LCBhLCBiICkge1xuXG5cdFx0cmV0dXJuICggeCA8IGEgKSA/IGEgOiAoICggeCA+IGIgKSA/IGIgOiB4ICk7XG5cblx0fSxcblxuXHQvLyBDbGFtcCB2YWx1ZSB0byByYW5nZSA8YSwgaW5mKVxuXG5cdGNsYW1wQm90dG9tOiBmdW5jdGlvbiAoIHgsIGEgKSB7XG5cblx0XHRyZXR1cm4geCA8IGEgPyBhIDogeDtcblxuXHR9LFxuXG5cdC8vIExpbmVhciBtYXBwaW5nIGZyb20gcmFuZ2UgPGExLCBhMj4gdG8gcmFuZ2UgPGIxLCBiMj5cblxuXHRtYXBMaW5lYXI6IGZ1bmN0aW9uICggeCwgYTEsIGEyLCBiMSwgYjIgKSB7XG5cblx0XHRyZXR1cm4gYjEgKyAoIHggLSBhMSApICogKCBiMiAtIGIxICkgLyAoIGEyIC0gYTEgKTtcblxuXHR9LFxuXG5cdC8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvU21vb3Roc3RlcFxuXG5cdHNtb290aHN0ZXA6IGZ1bmN0aW9uICggeCwgbWluLCBtYXggKSB7XG5cblx0XHRpZiAoIHggPD0gbWluICkgcmV0dXJuIDA7XG5cdFx0aWYgKCB4ID49IG1heCApIHJldHVybiAxO1xuXG5cdFx0eCA9ICggeCAtIG1pbiApIC8gKCBtYXggLSBtaW4gKTtcblxuXHRcdHJldHVybiB4ICogeCAqICggMyAtIDIgKiB4ICk7XG5cblx0fSxcblxuXHRzbW9vdGhlcnN0ZXA6IGZ1bmN0aW9uICggeCwgbWluLCBtYXggKSB7XG5cblx0XHRpZiAoIHggPD0gbWluICkgcmV0dXJuIDA7XG5cdFx0aWYgKCB4ID49IG1heCApIHJldHVybiAxO1xuXG5cdFx0eCA9ICggeCAtIG1pbiApIC8gKCBtYXggLSBtaW4gKTtcblxuXHRcdHJldHVybiB4ICogeCAqIHggKiAoIHggKiAoIHggKiA2IC0gMTUgKSArIDEwICk7XG5cblx0fSxcblxuXHQvLyBSYW5kb20gZmxvYXQgZnJvbSA8MCwgMT4gd2l0aCAxNiBiaXRzIG9mIHJhbmRvbW5lc3Ncblx0Ly8gKHN0YW5kYXJkIE1hdGgucmFuZG9tKCkgY3JlYXRlcyByZXBldGl0aXZlIHBhdHRlcm5zIHdoZW4gYXBwbGllZCBvdmVyIGxhcmdlciBzcGFjZSlcblxuXHRyYW5kb20xNjogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuICggNjUyODAgKiBNYXRoLnJhbmRvbSgpICsgMjU1ICogTWF0aC5yYW5kb20oKSApIC8gNjU1MzU7XG5cblx0fSxcblxuXHQvLyBSYW5kb20gaW50ZWdlciBmcm9tIDxsb3csIGhpZ2g+IGludGVydmFsXG5cblx0cmFuZEludDogZnVuY3Rpb24gKCBsb3csIGhpZ2ggKSB7XG5cblx0XHRyZXR1cm4gTWF0aC5mbG9vciggdGhpcy5yYW5kRmxvYXQoIGxvdywgaGlnaCApICk7XG5cblx0fSxcblxuXHQvLyBSYW5kb20gZmxvYXQgZnJvbSA8bG93LCBoaWdoPiBpbnRlcnZhbFxuXG5cdHJhbmRGbG9hdDogZnVuY3Rpb24gKCBsb3csIGhpZ2ggKSB7XG5cblx0XHRyZXR1cm4gbG93ICsgTWF0aC5yYW5kb20oKSAqICggaGlnaCAtIGxvdyApO1xuXG5cdH0sXG5cblx0Ly8gUmFuZG9tIGZsb2F0IGZyb20gPC1yYW5nZS8yLCByYW5nZS8yPiBpbnRlcnZhbFxuXG5cdHJhbmRGbG9hdFNwcmVhZDogZnVuY3Rpb24gKCByYW5nZSApIHtcblxuXHRcdHJldHVybiByYW5nZSAqICggMC41IC0gTWF0aC5yYW5kb20oKSApO1xuXG5cdH0sXG5cblx0ZGVnVG9SYWQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBkZWdyZWVUb1JhZGlhbnNGYWN0b3IgPSBNYXRoLlBJIC8gMTgwO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggZGVncmVlcyApIHtcblxuXHRcdFx0cmV0dXJuIGRlZ3JlZXMgKiBkZWdyZWVUb1JhZGlhbnNGYWN0b3I7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRyYWRUb0RlZzogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHJhZGlhblRvRGVncmVlc0ZhY3RvciA9IDE4MCAvIE1hdGguUEk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCByYWRpYW5zICkge1xuXG5cdFx0XHRyZXR1cm4gcmFkaWFucyAqIHJhZGlhblRvRGVncmVlc0ZhY3RvcjtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGlzUG93ZXJPZlR3bzogZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdHJldHVybiAoIHZhbHVlICYgKCB2YWx1ZSAtIDEgKSApID09PSAwICYmIHZhbHVlICE9PSAwO1xuXG5cdH0sXG5cblx0bmV4dFBvd2VyT2ZUd286IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHR2YWx1ZSAtLTtcblx0XHR2YWx1ZSB8PSB2YWx1ZSA+PiAxO1xuXHRcdHZhbHVlIHw9IHZhbHVlID4+IDI7XG5cdFx0dmFsdWUgfD0gdmFsdWUgPj4gNDtcblx0XHR2YWx1ZSB8PSB2YWx1ZSA+PiA4O1xuXHRcdHZhbHVlIHw9IHZhbHVlID4+IDE2O1xuXHRcdHZhbHVlICsrO1xuXG5cdFx0cmV0dXJuIHZhbHVlO1xuXG5cdH1cblxufTtcblxuIiwiIC8qIGdsb2JhbHMgZGVmaW5lICovXG4gKGZ1bmN0aW9uKGRlZmluZSl7J3VzZSBzdHJpY3QnO2RlZmluZShmdW5jdGlvbihyZXF1aXJlLGV4cG9ydHMsbW9kdWxlKXtcblxuZnVuY3Rpb24gZm92VG9ORENTY2FsZU9mZnNldCggZm92ICkge1xuXG4gICAgdmFyIHB4c2NhbGUgPSAyLjAgLyAoZm92LmxlZnRUYW4gKyBmb3YucmlnaHRUYW4pO1xuICAgIHZhciBweG9mZnNldCA9IChmb3YubGVmdFRhbiAtIGZvdi5yaWdodFRhbikgKiBweHNjYWxlICogMC41O1xuICAgIHZhciBweXNjYWxlID0gMi4wIC8gKGZvdi51cFRhbiArIGZvdi5kb3duVGFuKTtcbiAgICB2YXIgcHlvZmZzZXQgPSAoZm92LnVwVGFuIC0gZm92LmRvd25UYW4pICogcHlzY2FsZSAqIDAuNTtcbiAgICByZXR1cm4geyBzY2FsZTogWyBweHNjYWxlLCBweXNjYWxlIF0sIG9mZnNldDogWyBweG9mZnNldCwgcHlvZmZzZXQgXSB9O1xuXG4gIH1cblxuICBmdW5jdGlvbiBmb3ZQb3J0VG9Qcm9qZWN0aW9uKCBmb3YsIHJpZ2h0SGFuZGVkLCB6TmVhciwgekZhciApIHtcblxuICAgIHJpZ2h0SGFuZGVkID0gcmlnaHRIYW5kZWQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiByaWdodEhhbmRlZDtcbiAgICB6TmVhciA9IHpOZWFyID09PSB1bmRlZmluZWQgPyAwLjAxIDogek5lYXI7XG4gICAgekZhciA9IHpGYXIgPT09IHVuZGVmaW5lZCA/IDEwMDAwLjAgOiB6RmFyO1xuXG4gICAgdmFyIGhhbmRlZG5lc3NTY2FsZSA9IHJpZ2h0SGFuZGVkID8gLTEuMCA6IDEuMDtcblxuICAgIC8vIHN0YXJ0IHdpdGggYW4gaWRlbnRpdHkgbWF0cml4XG4gICAgdmFyIG1vYmogPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuICAgIHZhciBtID0gbW9iai5lbGVtZW50cztcblxuICAgIC8vIGFuZCB3aXRoIHNjYWxlL29mZnNldCBpbmZvIGZvciBub3JtYWxpemVkIGRldmljZSBjb29yZHNcbiAgICB2YXIgc2NhbGVBbmRPZmZzZXQgPSBmb3ZUb05EQ1NjYWxlT2Zmc2V0KGZvdik7XG5cbiAgICAvLyBYIHJlc3VsdCwgbWFwIGNsaXAgZWRnZXMgdG8gWy13LCt3XVxuICAgIG1bMCAqIDQgKyAwXSA9IHNjYWxlQW5kT2Zmc2V0LnNjYWxlWzBdO1xuICAgIG1bMCAqIDQgKyAxXSA9IDAuMDtcbiAgICBtWzAgKiA0ICsgMl0gPSBzY2FsZUFuZE9mZnNldC5vZmZzZXRbMF0gKiBoYW5kZWRuZXNzU2NhbGU7XG4gICAgbVswICogNCArIDNdID0gMC4wO1xuXG4gICAgLy8gWSByZXN1bHQsIG1hcCBjbGlwIGVkZ2VzIHRvIFstdywrd11cbiAgICAvLyBZIG9mZnNldCBpcyBuZWdhdGVkIGJlY2F1c2UgdGhpcyBwcm9qIG1hdHJpeCB0cmFuc2Zvcm1zIGZyb20gd29ybGQgY29vcmRzIHdpdGggWT11cCxcbiAgICAvLyBidXQgdGhlIE5EQyBzY2FsaW5nIGhhcyBZPWRvd24gKHRoYW5rcyBEM0Q/KVxuICAgIG1bMSAqIDQgKyAwXSA9IDAuMDtcbiAgICBtWzEgKiA0ICsgMV0gPSBzY2FsZUFuZE9mZnNldC5zY2FsZVsxXTtcbiAgICBtWzEgKiA0ICsgMl0gPSAtc2NhbGVBbmRPZmZzZXQub2Zmc2V0WzFdICogaGFuZGVkbmVzc1NjYWxlO1xuICAgIG1bMSAqIDQgKyAzXSA9IDAuMDtcblxuICAgIC8vIFogcmVzdWx0ICh1cCB0byB0aGUgYXBwKVxuICAgIG1bMiAqIDQgKyAwXSA9IDAuMDtcbiAgICBtWzIgKiA0ICsgMV0gPSAwLjA7XG4gICAgbVsyICogNCArIDJdID0gekZhciAvICh6TmVhciAtIHpGYXIpICogLWhhbmRlZG5lc3NTY2FsZTtcbiAgICBtWzIgKiA0ICsgM10gPSAoekZhciAqIHpOZWFyKSAvICh6TmVhciAtIHpGYXIpO1xuXG4gICAgLy8gVyByZXN1bHQgKD0gWiBpbilcbiAgICBtWzMgKiA0ICsgMF0gPSAwLjA7XG4gICAgbVszICogNCArIDFdID0gMC4wO1xuICAgIG1bMyAqIDQgKyAyXSA9IGhhbmRlZG5lc3NTY2FsZTtcbiAgICBtWzMgKiA0ICsgM10gPSAwLjA7XG5cbiAgICBtb2JqLnRyYW5zcG9zZSgpO1xuXG4gICAgcmV0dXJuIG1vYmo7XG4gIH1cblxuICBmdW5jdGlvbiBmb3ZUb1Byb2plY3Rpb24oIGZvdiwgcmlnaHRIYW5kZWQsIHpOZWFyLCB6RmFyICkge1xuXG4gICAgdmFyIERFRzJSQUQgPSBNYXRoLlBJIC8gMTgwLjA7XG5cbiAgICB2YXIgZm92UG9ydCA9IHtcbiAgICAgIHVwVGFuOiBNYXRoLnRhbiggZm92LnVwRGVncmVlcyAqIERFRzJSQUQgKSxcbiAgICAgIGRvd25UYW46IE1hdGgudGFuKCBmb3YuZG93bkRlZ3JlZXMgKiBERUcyUkFEICksXG4gICAgICBsZWZ0VGFuOiBNYXRoLnRhbiggZm92LmxlZnREZWdyZWVzICogREVHMlJBRCApLFxuICAgICAgcmlnaHRUYW46IE1hdGgudGFuKCBmb3YucmlnaHREZWdyZWVzICogREVHMlJBRCApXG4gICAgfTtcblxuICAgIHJldHVybiBmb3ZQb3J0VG9Qcm9qZWN0aW9uKCBmb3ZQb3J0LCByaWdodEhhbmRlZCwgek5lYXIsIHpGYXIgKTtcblxuICB9XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm92VG9Qcm9qZWN0aW9uOiBmb3ZUb1Byb2plY3Rpb25cbiAgfTtcblxuICB9KTt9KSh0eXBlb2YgZGVmaW5lPT0nZnVuY3Rpb24nJiZkZWZpbmUuYW1kP2RlZmluZVxuOihmdW5jdGlvbihuLHcpeyd1c2Ugc3RyaWN0JztyZXR1cm4gdHlwZW9mIG1vZHVsZT09J29iamVjdCc/ZnVuY3Rpb24oYyl7XG5jKHJlcXVpcmUsZXhwb3J0cyxtb2R1bGUpO306ZnVuY3Rpb24oYyl7dmFyIG09e2V4cG9ydHM6e319O2MoZnVuY3Rpb24obil7XG5yZXR1cm4gd1tuXTt9LG0uZXhwb3J0cyxtKTt3W25dPW0uZXhwb3J0czt9O30pKCdWUlBlcnNwZWN0aXZlJyx0aGlzKSk7XG4iLCIgLyogZ2xvYmFscyBkZWZpbmUgKi9cbiAoZnVuY3Rpb24oZGVmaW5lKXsndXNlIHN0cmljdCc7ZGVmaW5lKGZ1bmN0aW9uKHJlcXVpcmUsZXhwb3J0cyxtb2R1bGUpe1xuXG4gICAgdmFyIHZyRGV2aWNlcyA9IHt9O1xuICAgIHZhciB2aWV3cG9ydDtcbiAgICB2YXIgc2NlbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NlbmUnKTtcbiAgICB2YXIgd29ybGQ7XG4gICAgdmFyIGNhbWVyYTtcbiAgICB2YXIgZnVsbHNjcmVlbiA9IGZhbHNlO1xuICAgIHZhciBwcm9qZWN0aW9uVHJhbnNmb3JtO1xuICAgIHZhciBmb3Y7XG4gICAgdmFyIHggPSAwO1xuICAgIHZhciB5ID0gMDtcbiAgICB2YXIgeiA9IDA7XG4gICAgdmFyIHJvdFggPSAwO1xuICAgIHZhciByb3RZID0gMDtcbiAgICB2YXIgcm90WiA9IDA7XG4gICAgdmFyIHRyYW5zbGF0aW9uID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcbiAgICB2YXIgcm90YXRpb247XG4gICAgdmFyIHJvdGF0aW9uRXVsZXIgPSBUSFJFRS5FdWxlcigwLCAwLCAwLCBcIllYWlwiKTtcbiAgICB2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lSUQ7XG4gICAgdmFyIHJlcXVlc3RGdWxsU2NyZWVuO1xuICAgIHZhciBjdXJzb3JFbmFibGVkID0gZmFsc2U7XG4gICAgdmFyIHNjZW5lUmVhZHkgPSBmYWxzZTtcblxuICAgIHZhciBzdGFydCA9IHBhcnNlSW50KG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbiAgICBzZXR1cFZSRGV2aWNlcyhmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmaW5pc2g7XG4gICAgICAvLyBDcmVhdGVzIHZpZXdwb3J0LCBjYW1lcmEgYW5kIHdvcmxkIGVsZW1lbnRzXG4gICAgICBzZXR1cFNjZW5lKCk7XG4gICAgICAvLyBJbml0aWF0ZXMgdGhlIGNhbWVyYSBwZXJzcGVjdGl2ZSBtYXRyaXhcbiAgICAgIHNldHVwUGVyc3BlY3RpdmUoKTtcbiAgICAgIC8vIEZvciBtb3VzZSBsb29rIG1vZGUgd2hlbiB0aGVyZSdzIG5vIEhNRCBhdmFpYWxhYmxlXG4gICAgICBzZXR1cElucHV0RXZlbnRIYW5kbGVycygpO1xuICAgICAgc2V0dXBGdWxsc2NyZWVuSGFuZGxlcnMoKTtcbiAgICAgIGlmIChjdXJzb3JFbmFibGVkKSB7XG4gICAgICAgIFZSQ3Vyc29yLmVuYWJsZSh0cnVlKTtcbiAgICAgIH1cbiAgICAgIHNjZW5lUmVhZHkgPSB0cnVlO1xuICAgICAgLy8gRnVuY3Rpb24gdGhhdCB1cGRhdGVzIHRoZSBjYW1lcmEgb3JpZW50YXRpb24gZnJvbSBITUQgaW5mb3JtYXRpb25cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZUlEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGVDYW1lcmEpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gc2V0dXBWUkRldmljZXMoZG9uZSkge1xuICAgICAgaWYgKG5hdmlnYXRvci5nZXRWUkRldmljZXMgJiYgbmF2aWdhdG9yLmdldFZSRGV2aWNlcygpLnRoZW4pIHtcbiAgICAgICAgbmF2aWdhdG9yLmdldFZSRGV2aWNlcygpLnRoZW4oZ290VlJEZXZpY2VzKTtcbiAgICAgIH0gZWxzZSB7IGRvbmUoKTsgfVxuICAgICAgZnVuY3Rpb24gZ290VlJEZXZpY2VzKGRldmljZXMpIHtcbiAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRldmljZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChkZXZpY2VzW2ldIGluc3RhbmNlb2YgSE1EVlJEZXZpY2UpIHtcbiAgICAgICAgICAgICAgdnJEZXZpY2VzLmhlYWRzZXQgPSBkZXZpY2VzW2ldO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZXZpY2VzW2ldIGluc3RhbmNlb2YgUG9zaXRpb25TZW5zb3JWUkRldmljZSkge1xuICAgICAgICAgICAgICB2ckRldmljZXMucG9zaXRpb24gPSBkZXZpY2VzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZyRGV2aWNlcy5oZWFkc2V0ICYmIHZyRGV2aWNlcy5wb3NpdGlvbikgeyBicmVhazsgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkb25lKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW50ZXJWUigpIHtcbiAgICAgIHJlcXVlc3RGdWxsU2NyZWVuLmNhbGwoc2NlbmUsIHsgdnJEaXNwbGF5OiB2ckRldmljZXMuaGVhZHNldCB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cFBlcnNwZWN0aXZlKCkge1xuICAgICAgZm92ID0gdnJEZXZpY2VzLmhlYWRzZXQ/IHZyRGV2aWNlcy5oZWFkc2V0LmdldEV5ZVBhcmFtZXRlcnMoJ2xlZnQnKS5yZWNvbW1lbmRlZEZpZWxkT2ZWaWV3IDogeyB1cERlZ3JlZXM6IDQ1LCByaWdodERlZ3JlZXM6IDQ1LCBkb3duRGVncmVlczogNDUsIGxlZnREZWdyZWVzOiA0NSB9O1xuICAgICAgLy92YXIgcGVyc3BlY3RpdmUgPSBWUlBlcnNwZWN0aXZlLmZvdlRvUHJvamVjdGlvbiggZm92LCB0cnVlLCAxLCAxMDAwMCApO1xuICAgICAgdmFyIHBlcnNwZWN0aXZlID0gcGVyc3BlY3RpdmVNYXRyaXgoVEhSRUUuTWF0aC5kZWdUb1JhZChmb3YudXBEZWdyZWVzKSwgdmlld3BvcnQub2Zmc2V0V2lkdGggLyB2aWV3cG9ydC5vZmZzZXRIZWlnaHQsIDEsIDEwMDAwKTtcbiAgICAgIHBlcnNwZWN0aXZlID0gcGVyc3BlY3RpdmUuY2xvbmUoKS5zY2FsZShuZXcgVEhSRUUuVmVjdG9yMyh2aWV3cG9ydC5vZmZzZXRXaWR0aCwgdmlld3BvcnQub2Zmc2V0SGVpZ2h0LCAxKSk7XG4gICAgICBwcm9qZWN0aW9uVHJhbnNmb3JtID0gZ2V0Q1NTTWF0cml4KHBlcnNwZWN0aXZlKTtcbiAgICAgIHZpZXdwb3J0LnN0eWxlLnRyYW5zZm9ybSA9IHByb2plY3Rpb25UcmFuc2Zvcm07XG4gICAgICB2aWV3cG9ydC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBwcm9qZWN0aW9uVHJhbnNmb3JtO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwU2NlbmUoKSB7XG4gICAgICB2YXIgaTtcbiAgICAgIHZhciB2ckVscyA9IHNjZW5lLmNoaWxkcmVuO1xuICAgICAgdmFyIHZyRWxzTGVuZ3RoID0gdnJFbHMubGVuZ3RoO1xuICAgICAgdmlld3BvcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHZpZXdwb3J0LmNsYXNzTGlzdC5hZGQoJ3ZpZXdwb3J0Jyk7XG4gICAgICBjYW1lcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNhbWVyYS5jbGFzc0xpc3QuYWRkKCd2cicpO1xuICAgICAgY2FtZXJhLmNsYXNzTGlzdC5hZGQoJ2NhbWVyYScpO1xuICAgICAgd29ybGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHdvcmxkLmNsYXNzTGlzdC5hZGQoJ3ZyJyk7XG4gICAgICB3b3JsZC5jbGFzc0xpc3QuYWRkKCd3b3JsZCcpO1xuXG4gICAgICAvLyBTZXR1cCBIaWVyYXJjaHlcbiAgICAgIC8vIHNjZW5lXG4gICAgICAvLyAgIHZpZXdwb3J0XG4gICAgICAvLyAgICAgIGNhbWVyYVxuICAgICAgLy8gICAgICAgIHdvcmxkXG4gICAgICAvLyAgICAgICAgICB1c2VyLWVsZW1lbnRzXG4gICAgICBmb3IoaSA9IDA7IGkgPCB2ckVsc0xlbmd0aDsgKytpKSB7XG4gICAgICAgIHdvcmxkLmFwcGVuZENoaWxkKHZyRWxzWzBdKTtcbiAgICAgIH1cbiAgICAgIHNjZW5lLmFwcGVuZENoaWxkKHZpZXdwb3J0KTtcbiAgICAgIHZpZXdwb3J0LmFwcGVuZENoaWxkKGNhbWVyYSk7XG4gICAgICBjYW1lcmEuYXBwZW5kQ2hpbGQod29ybGQpO1xuICAgICAgcmVxdWVzdEZ1bGxTY3JlZW4gPSBzY2VuZS5tb3pSZXF1ZXN0RnVsbFNjcmVlbiB8fCBzY2VuZS53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVDYW1lcmEoKSB7XG4gICAgICB2YXIgdHJhbnNmb3JtO1xuICAgICAgaWYgKGZ1bGxzY3JlZW4pIHtcbiAgICAgICAgdHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKC01MCUsIC01MCUsIDBweCknO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJhbnNmb3JtID0gcHJvamVjdGlvblRyYW5zZm9ybTtcbiAgICAgIH1cbiAgICAgIHBvbGxIZWFkT3JpZW50YXRpb24oKTtcbiAgICAgIHZpZXdwb3J0LnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICAgIHZpZXdwb3J0LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICAgIFZSQ3Vyc29yLmludGVyc2VjdChmdWxsc2NyZWVuKTtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlQ2FtZXJhKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb2xsSGVhZE9yaWVudGF0aW9uKCkge1xuICAgICAgdmFyIG9yaWVudGF0aW9uO1xuICAgICAgdmFyIHF1YXRlcm5pb247XG4gICAgICB2YXIgcG9zaXRpb25cbiAgICAgIHZhciBzdGF0ZTtcbiAgICAgIGlmICh2ckRldmljZXMucG9zaXRpb24pIHtcbiAgICAgICAgc3RhdGUgPSB2ckRldmljZXMucG9zaXRpb24uZ2V0U3RhdGUoKVxuICAgICAgICBvcmllbnRhdGlvbiA9IHN0YXRlLm9yaWVudGF0aW9uO1xuICAgICAgICBwb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uO1xuICAgICAgICBpZiAob3JpZW50YXRpb24pIHtcbiAgICAgICAgICBxdWF0ZXJuaW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24ob3JpZW50YXRpb24ueCwgLW9yaWVudGF0aW9uLnksIG9yaWVudGF0aW9uLnosIG9yaWVudGF0aW9uLncpO1xuICAgICAgICAgIHJvdGF0aW9uID0gbmV3IFRIUkVFLk1hdHJpeDQoKS5tYWtlUm90YXRpb25Gcm9tUXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgICB0cmFuc2xhdGlvbiA9IG5ldyBUSFJFRS5NYXRyaXg0KCkubWFrZVRyYW5zbGF0aW9uKHBvc2l0aW9uLnggLCBwb3NpdGlvbi55ICwgcG9zaXRpb24ueik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHVwZGF0ZUVsZW1lbnQoY2FtZXJhLCB7XG4gICAgICAgIHJvdGF0aW9uOiByb3RhdGlvbixcbiAgICAgICAgdHJhbnNsYXRpb246IHRyYW5zbGF0aW9uXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cEZ1bGxzY3JlZW5IYW5kbGVycygpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsIG9uZnVsbHNjcmVlbmNoYW5nZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW96ZnVsbHNjcmVlbmNoYW5nZVwiLCAgICBvbmZ1bGxzY3JlZW5jaGFuZ2UpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZ1bGxzY3JlZW5jaGFuZ2VcIiwgICAgICAgb25mdWxsc2NyZWVuY2hhbmdlKTtcblxuICAgICAgZnVuY3Rpb24gb25mdWxsc2NyZWVuY2hhbmdlKCkge1xuICAgICAgICBpZiAoICFkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudCAmJiAhZG9jdW1lbnQud2Via2l0RnVsbFNjcmVlbkVsZW1lbnQgKSB7XG4gICAgICAgICAgdmlld3BvcnQuY2xhc3NMaXN0LnJlbW92ZSgnZnVsbHNjcmVlbicpO1xuICAgICAgICAgIGZ1bGxzY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZnVsbHNjcmVlbiA9IHRydWU7XG4gICAgICAgIHZpZXdwb3J0LmNsYXNzTGlzdC5hZGQoJ2Z1bGxzY3JlZW4nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwZXJzcGVjdGl2ZU1hdHJpeChmb3YsIGFzcGVjdCwgbmVhcnosIGZhcnopIHtcbiAgICAgIHZhciBtYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuICAgICAgdmFyIHJhbmdlID0gTWF0aC50YW4oZm92ICogMC41KSAqIG5lYXJ6O1xuXG4gICAgICBtYXRyaXguZWxlbWVudHNbMF0gPSAoMiAqIG5lYXJ6KSAvICgocmFuZ2UgKiBhc3BlY3QpIC0gKC1yYW5nZSAqIGFzcGVjdCkpO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzFdID0gMDtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1syXSA9IDA7XG4gICAgICBtYXRyaXguZWxlbWVudHNbM10gPSAwO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzRdID0gMDtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1s1XSA9ICgyICogbmVhcnopIC8gKDIgKiByYW5nZSk7XG4gICAgICBtYXRyaXguZWxlbWVudHNbNl0gPSAwO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzddID0gMDtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1s4XSA9IDA7XG4gICAgICBtYXRyaXguZWxlbWVudHNbOV0gPSAwO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzEwXSA9IC0oZmFyeiArIG5lYXJ6KSAvIChmYXJ6IC0gbmVhcnopO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzExXSA9IC0xO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzEyXSA9IDA7XG4gICAgICBtYXRyaXguZWxlbWVudHNbMTNdID0gMDtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1sxNF0gPSAtKDIgKiBmYXJ6ICogbmVhcnopIC8gKGZhcnogLSBuZWFyeik7XG4gICAgICBtYXRyaXguZWxlbWVudHNbMTVdID0gMDtcbiAgICAgIHJldHVybiBtYXRyaXgudHJhbnNwb3NlKCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldENTU01hdHJpeChtYXRyaXgpIHtcbiAgICAgIHZhciBlbGVtZW50cyA9IG1hdHJpeC5lbGVtZW50cztcblxuICAgICAgcmV0dXJuICdtYXRyaXgzZCgnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDAgXSApICsgJywnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDEgXSApICsgJywnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDIgXSApICsgJywnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDMgXSApICsgJywnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDQgXSApICsgJywnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDUgXSApICsgJywnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDYgXSApICsgJywnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDcgXSApICsgJywnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDggXSApICsgJywnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDkgXSApICsgJywnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDEwIF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyAxMSBdICkgKyAnLCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgMTIgXSApICsgJywnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDEzIF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyAxNCBdICkgKyAnLCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgMTUgXSApICtcbiAgICAgICcpJztcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZXBzaWxvbiggdmFsdWUgKSB7XG4gICAgICByZXR1cm4gTWF0aC5hYnMoIHZhbHVlICkgPCAwLjAwMDAwMSA/IDAgOiB2YWx1ZTtcbiAgICB9O1xuXG4gICAgdmFyIHJvdGF0aW9uRW5hYmxlZDtcbiAgICB2YXIgbGFzdE1vdXNlWDtcbiAgICB2YXIgbGFzdE1vdXNlWTtcbiAgICB2YXIgUElfMiA9IE1hdGguUEkgLyAyO1xuICAgIHZhciBjYW1lcmFSb3RhdGlvbjtcbiAgICB2YXIgY2FtZXJhVHJhbnNsYXRpb247XG5cbiAgICBmdW5jdGlvbiBzZXR1cElucHV0RXZlbnRIYW5kbGVycygpIHtcbiAgICAgIHNjZW5lLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHJvdGF0aW9uRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHNjZW5lLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGlvbi1kaXNhYmxlZCcpO1xuICAgICAgICBzY2VuZS5jbGFzc0xpc3QuYWRkKCdncmFiYmluZycpO1xuICAgICAgICBsYXN0TW91c2VYID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgbGFzdE1vdXNlWSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICB9LCB0cnVlKTtcblxuICAgICAgc2NlbmUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHJvdGF0aW9uRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICBzY2VuZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3Rpb24tZGlzYWJsZWQnKTtcbiAgICAgICAgc2NlbmUuY2xhc3NMaXN0LnJlbW92ZSgnZ3JhYmJpbmcnKTtcbiAgICAgIH0sIHRydWUpO1xuXG4gICAgICBzY2VuZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoIXJvdGF0aW9uRW5hYmxlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVsdGFYID0gKGV2ZW50LmNsaWVudFggLSBsYXN0TW91c2VYKSAqIDAuMjtcbiAgICAgICAgdmFyIGRlbHRhWSA9IChldmVudC5jbGllbnRZIC0gbGFzdE1vdXNlWSkgKiAwLjI7XG4gICAgICAgIHJvdFggKz0gZGVsdGFYO1xuICAgICAgICByb3RZIC09IGRlbHRhWTtcbiAgICAgICAgLy8gQ2xhbXAgdG8gWy1QSSAvIDIsIFBJIC8gMl1cbiAgICAgICAgcm90WSA9IE1hdGgubWF4KCAtOTAsIE1hdGgubWluKCA5MCwgcm90WSApICk7XG5cbiAgICAgICAgbGFzdE1vdXNlWCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIGxhc3RNb3VzZVkgPSBldmVudC5jbGllbnRZO1xuICAgICAgICB0cmFuc2xhdGlvbiA9IG5ldyBUSFJFRS5NYXRyaXg0KCkubWFrZVRyYW5zbGF0aW9uKHggLCB5ICwgeik7XG4gICAgICAgIHJvdGF0aW9uRXVsZXIgPSBuZXcgVEhSRUUuRXVsZXIoXG4gICAgICAgICAgVEhSRUUuTWF0aC5kZWdUb1JhZChyb3RZKSxcbiAgICAgICAgICBUSFJFRS5NYXRoLmRlZ1RvUmFkKHJvdFgpLFxuICAgICAgICAgIFRIUkVFLk1hdGguZGVnVG9SYWQocm90WiksXG4gICAgICAgICAgXCJYWVpcIiApO1xuICAgICAgICByb3RhdGlvbiA9IG5ldyBUSFJFRS5NYXRyaXg0KCkubWFrZVJvdGF0aW9uRnJvbUV1bGVyKHJvdGF0aW9uRXVsZXIpO1xuXG4gICAgICB9LCB0cnVlKTtcblxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGlmICggKCBlLmtleWNvZGUgfHwgZS53aGljaCApID09IDMyKSB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICB9LCBmYWxzZSk7XG5cbiAgICB9XG5cbiAgICB2YXIgdXBkYXRlRWxlbWVudCA9IGZ1bmN0aW9uKG9iamVjdCwgZGF0YSkge1xuICAgICAgdmFyIHRyYW5zbGF0aW9uID0gZGF0YS50cmFuc2xhdGlvbi5jbG9uZSgpIHx8IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG4gICAgICB2YXIgcm90YXRpb24gPSBkYXRhLnJvdGF0aW9uIHx8IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG4gICAgICB2YXIgY3NzTWF0cml4ID0gZ2V0Q1NTTWF0cml4KHRyYW5zbGF0aW9uLm11bHRpcGx5KHJvdGF0aW9uKSk7XG4gICAgICBvYmplY3Quc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUzZCgtNTAlLCAtNTAlLCAwKSBcIiArIGNzc01hdHJpeDtcbiAgICAgIG9iamVjdC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBcInRyYW5zbGF0ZTNkKC01MCUsIC01MCUsIDApIFwiICsgY3NzTWF0cml4O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBlbmFibGVDdXJzb3IoZW5hYmxlKSB7XG4gICAgICBjdXJzb3JFbmFibGVkID0gISFlbmFibGU7XG4gICAgICBpZiAoc2NlbmVSZWFkeSkgeyBWUkN1cnNvci5lbmFibGUodHJ1ZSk7IH1cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAgIHplcm9TZW5zb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcm90WCA9IDA7XG4gICAgICAgIHJvdFkgPSAwO1xuICAgICAgICByb3RhdGlvbiA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG4gICAgICAgIHRyYW5zbGF0aW9uID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcbiAgICAgICAgaWYgKHZyRGV2aWNlcy5wb3NpdGlvbikgeyB2ckRldmljZXMucG9zaXRpb24ucmVzZXRTZW5zb3IoKTsgfVxuICAgICAgfSxcbiAgICAgIGVudGVyVlI6IGVudGVyVlIsXG4gICAgICBlbmFibGVDdXJzb3I6IGVuYWJsZUN1cnNvclxuICAgIH07XG5cbn0pO30pKHR5cGVvZiBkZWZpbmU9PSdmdW5jdGlvbicmJmRlZmluZS5hbWQ/ZGVmaW5lXG46KGZ1bmN0aW9uKG4sdyl7J3VzZSBzdHJpY3QnO3JldHVybiB0eXBlb2YgbW9kdWxlPT0nb2JqZWN0Jz9mdW5jdGlvbihjKXtcbmMocmVxdWlyZSxleHBvcnRzLG1vZHVsZSk7fTpmdW5jdGlvbihjKXt2YXIgbT17ZXhwb3J0czp7fX07YyhmdW5jdGlvbihuKXtcbnJldHVybiB3W25dO30sbS5leHBvcnRzLG0pO3dbbl09bS5leHBvcnRzO307fSkoJ1ZSQ1NTJyx0aGlzKSk7XG4iLCIgLyogZ2xvYmFscyBkZWZpbmUgKi9cbiAoZnVuY3Rpb24oZGVmaW5lKXsndXNlIHN0cmljdCc7ZGVmaW5lKGZ1bmN0aW9uKHJlcXVpcmUsZXhwb3J0cyxtb2R1bGUpe1xuXG4gICAgdmFyIHZpZXdwb3J0O1xuICAgIHZhciBjdXJzb3I7XG4gICAgdmFyIGludGVyc2VjdGVkRWw7XG5cbiAgICBmdW5jdGlvbiBzZXR1cEN1cnNvcigpIHtcbiAgICAgIHZpZXdwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZpZXdwb3J0Jyk7XG4gICAgICBjdXJzb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGN1cnNvci5jbGFzc0xpc3QuYWRkKCd2cicpO1xuICAgICAgY3Vyc29yLmNsYXNzTGlzdC5hZGQoJ2N1cnNvcicpO1xuICAgICAgY3Vyc29yLmNsYXNzTGlzdC5hZGQoJ3dvcmxkJyk7XG4gICAgICB2aWV3cG9ydC5hcHBlbmRDaGlsZChjdXJzb3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGludGVyc2VjdCh2ckVuYWJsZWQpIHtcbiAgICAgIHZhciByZWN0ID0gY3Vyc29yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdmFyIGVsO1xuICAgICAgaWYgKHZyRW5hYmxlZCkge1xuICAgICAgICBlbCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoMCwgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQocmVjdC54LCByZWN0LnkpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coXCJSRUNUIFwiICsgcmVjdC54ICsgXCIgXCIgKyByZWN0LnkpO1xuICAgICAgaWYgKGVsKSB7XG4gICAgICAgIGlmIChlbCA9PT0gaW50ZXJzZWN0ZWRFbCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKGludGVyc2VjdGVkRWwpIHtcbiAgICAgICAgICBpbnRlcnNlY3RlZEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgaW50ZXJzZWN0ZWRFbCA9IGVsO1xuICAgICAgICBpbnRlcnNlY3RlZEVsLmNsYXNzTGlzdC5hZGQoJ2hvdmVyJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnRlcnNlY3RlZEVsID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xuICAgICAgZW5hYmxlOiBmdW5jdGlvbiAoZW5hYmxlKSB7XG4gICAgICAgIGlmIChlbmFibGUpIHtcbiAgICAgICAgICBzZXR1cEN1cnNvcigpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW50ZXJzZWN0OiBpbnRlcnNlY3RcbiAgICB9O1xuXG5cbiAgfSk7fSkodHlwZW9mIGRlZmluZT09J2Z1bmN0aW9uJyYmZGVmaW5lLmFtZD9kZWZpbmVcbjooZnVuY3Rpb24obix3KXsndXNlIHN0cmljdCc7cmV0dXJuIHR5cGVvZiBtb2R1bGU9PSdvYmplY3QnP2Z1bmN0aW9uKGMpe1xuYyhyZXF1aXJlLGV4cG9ydHMsbW9kdWxlKTt9OmZ1bmN0aW9uKGMpe3ZhciBtPXtleHBvcnRzOnt9fTtjKGZ1bmN0aW9uKG4pe1xucmV0dXJuIHdbbl07fSxtLmV4cG9ydHMsbSk7d1tuXT1tLmV4cG9ydHM7fTt9KSgnVlJDdXJzb3InLHRoaXMpKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==