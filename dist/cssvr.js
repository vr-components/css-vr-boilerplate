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

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.button

THREE.MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2 };

// GL STATE CONSTANTS

THREE.CullFaceNone = 0;
THREE.CullFaceBack = 1;
THREE.CullFaceFront = 2;
THREE.CullFaceFrontBack = 3;

THREE.FrontFaceDirectionCW = 0;
THREE.FrontFaceDirectionCCW = 1;

// SHADOWING TYPES

THREE.BasicShadowMap = 0;
THREE.PCFShadowMap = 1;
THREE.PCFSoftShadowMap = 2;

// MATERIAL CONSTANTS

// side

THREE.FrontSide = 0;
THREE.BackSide = 1;
THREE.DoubleSide = 2;

// shading

THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;

// colors

THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;

// blending modes

THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.CustomBlending = 5;

// custom blending equations
// (numbers start from 100 not to clash with other
//  mappings to OpenGL constants defined in Texture.js)

THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;
THREE.MinEquation = 103;
THREE.MaxEquation = 104;

// custom blending destination factors

THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;

// custom blending source factors

//THREE.ZeroFactor = 200;
//THREE.OneFactor = 201;
//THREE.SrcAlphaFactor = 204;
//THREE.OneMinusSrcAlphaFactor = 205;
//THREE.DstAlphaFactor = 206;
//THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;

// depth modes

THREE.NeverDepth = 0;
THREE.AlwaysDepth = 1;
THREE.LessDepth = 2;
THREE.LessEqualDepth = 3;
THREE.EqualDepth = 4;
THREE.GreaterEqualDepth = 5;
THREE.GreaterDepth = 6;
THREE.NotEqualDepth = 7;


// TEXTURE CONSTANTS

THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.AddOperation = 2;

// Mapping modes

THREE.UVMapping = 300;

THREE.CubeReflectionMapping = 301;
THREE.CubeRefractionMapping = 302;

THREE.EquirectangularReflectionMapping = 303;
THREE.EquirectangularRefractionMapping = 304;

THREE.SphericalReflectionMapping = 305;

// Wrapping modes

THREE.RepeatWrapping = 1000;
THREE.ClampToEdgeWrapping = 1001;
THREE.MirroredRepeatWrapping = 1002;

// Filters

THREE.NearestFilter = 1003;
THREE.NearestMipMapNearestFilter = 1004;
THREE.NearestMipMapLinearFilter = 1005;
THREE.LinearFilter = 1006;
THREE.LinearMipMapNearestFilter = 1007;
THREE.LinearMipMapLinearFilter = 1008;

// Data types

THREE.UnsignedByteType = 1009;
THREE.ByteType = 1010;
THREE.ShortType = 1011;
THREE.UnsignedShortType = 1012;
THREE.IntType = 1013;
THREE.UnsignedIntType = 1014;
THREE.FloatType = 1015;
THREE.HalfFloatType = 1025;

// Pixel types

//THREE.UnsignedByteType = 1009;
THREE.UnsignedShort4444Type = 1016;
THREE.UnsignedShort5551Type = 1017;
THREE.UnsignedShort565Type = 1018;

// Pixel formats

THREE.AlphaFormat = 1019;
THREE.RGBFormat = 1020;
THREE.RGBAFormat = 1021;
THREE.LuminanceFormat = 1022;
THREE.LuminanceAlphaFormat = 1023;
// THREE.RGBEFormat handled as THREE.RGBAFormat in shaders
THREE.RGBEFormat = THREE.RGBAFormat; //1024;

// DDS / ST3C Compressed texture formats

THREE.RGB_S3TC_DXT1_Format = 2001;
THREE.RGBA_S3TC_DXT1_Format = 2002;
THREE.RGBA_S3TC_DXT3_Format = 2003;
THREE.RGBA_S3TC_DXT5_Format = 2004;


// PVRTC compressed texture formats

THREE.RGB_PVRTC_4BPPV1_Format = 2100;
THREE.RGB_PVRTC_2BPPV1_Format = 2101;
THREE.RGBA_PVRTC_4BPPV1_Format = 2102;
THREE.RGBA_PVRTC_2BPPV1_Format = 2103;


// DEPRECATED

THREE.Projector = function () {

	console.error( 'THREE.Projector has been moved to /examples/js/renderers/Projector.js.' );

	this.projectVector = function ( vector, camera ) {

		console.warn( 'THREE.Projector: .projectVector() is now vector.project().' );
		vector.project( camera );

	};

	this.unprojectVector = function ( vector, camera ) {

		console.warn( 'THREE.Projector: .unprojectVector() is now vector.unproject().' );
		vector.unproject( camera );

	};

	this.pickingRay = function ( vector, camera ) {

		console.error( 'THREE.Projector: .pickingRay() is now raycaster.setFromCamera().' );

	};

};

THREE.CanvasRenderer = function () {

	console.error( 'THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js' );

	this.domElement = document.createElement( 'canvas' );
	this.clear = function () {};
	this.render = function () {};
	this.setClearColor = function () {};
	this.setSize = function () {};

};

// File:src/math/Color.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Color = function ( color ) {

	if ( arguments.length === 3 ) {

		return this.setRGB( arguments[ 0 ], arguments[ 1 ], arguments[ 2 ] );

	}

	return this.set( color )

};

THREE.Color.prototype = {

	constructor: THREE.Color,

	r: 1, g: 1, b: 1,

	set: function ( value ) {

		if ( value instanceof THREE.Color ) {

			this.copy( value );

		} else if ( typeof value === 'number' ) {

			this.setHex( value );

		} else if ( typeof value === 'string' ) {

			this.setStyle( value );

		}

		return this;

	},

	setHex: function ( hex ) {

		hex = Math.floor( hex );

		this.r = ( hex >> 16 & 255 ) / 255;
		this.g = ( hex >> 8 & 255 ) / 255;
		this.b = ( hex & 255 ) / 255;

		return this;

	},

	setRGB: function ( r, g, b ) {

		this.r = r;
		this.g = g;
		this.b = b;

		return this;

	},

	setHSL: function ( h, s, l ) {

		// h,s,l ranges are in 0.0 - 1.0

		if ( s === 0 ) {

			this.r = this.g = this.b = l;

		} else {

			var hue2rgb = function ( p, q, t ) {

				if ( t < 0 ) t += 1;
				if ( t > 1 ) t -= 1;
				if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
				if ( t < 1 / 2 ) return q;
				if ( t < 2 / 3 ) return p + ( q - p ) * 6 * ( 2 / 3 - t );
				return p;

			};

			var p = l <= 0.5 ? l * ( 1 + s ) : l + s - ( l * s );
			var q = ( 2 * l ) - p;

			this.r = hue2rgb( q, p, h + 1 / 3 );
			this.g = hue2rgb( q, p, h );
			this.b = hue2rgb( q, p, h - 1 / 3 );

		}

		return this;

	},

	setStyle: function ( style ) {

		// rgb(255,0,0)

		if ( /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test( style ) ) {

			var color = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec( style );

			this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;
			this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;
			this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;

			return this;

		}

		// rgb(100%,0%,0%)

		if ( /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test( style ) ) {

			var color = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec( style );

			this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;
			this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;
			this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;

			return this;

		}

		// #ff0000

		if ( /^\#([0-9a-f]{6})$/i.test( style ) ) {

			var color = /^\#([0-9a-f]{6})$/i.exec( style );

			this.setHex( parseInt( color[ 1 ], 16 ) );

			return this;

		}

		// #f00

		if ( /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test( style ) ) {

			var color = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec( style );

			this.setHex( parseInt( color[ 1 ] + color[ 1 ] + color[ 2 ] + color[ 2 ] + color[ 3 ] + color[ 3 ], 16 ) );

			return this;

		}

		// red

		if ( /^(\w+)$/i.test( style ) ) {

			this.setHex( THREE.ColorKeywords[ style ] );

			return this;

		}


	},

	copy: function ( color ) {

		this.r = color.r;
		this.g = color.g;
		this.b = color.b;

		return this;

	},

	copyGammaToLinear: function ( color, gammaFactor ) {

		if ( gammaFactor === undefined ) gammaFactor = 2.0;

		this.r = Math.pow( color.r, gammaFactor );
		this.g = Math.pow( color.g, gammaFactor );
		this.b = Math.pow( color.b, gammaFactor );

		return this;

	},

	copyLinearToGamma: function ( color, gammaFactor ) {

		if ( gammaFactor === undefined ) gammaFactor = 2.0;

		var safeInverse = ( gammaFactor > 0 ) ? ( 1.0 / gammaFactor ) : 1.0;

		this.r = Math.pow( color.r, safeInverse );
		this.g = Math.pow( color.g, safeInverse );
		this.b = Math.pow( color.b, safeInverse );

		return this;

	},

	convertGammaToLinear: function () {

		var r = this.r, g = this.g, b = this.b;

		this.r = r * r;
		this.g = g * g;
		this.b = b * b;

		return this;

	},

	convertLinearToGamma: function () {

		this.r = Math.sqrt( this.r );
		this.g = Math.sqrt( this.g );
		this.b = Math.sqrt( this.b );

		return this;

	},

	getHex: function () {

		return ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;

	},

	getHexString: function () {

		return ( '000000' + this.getHex().toString( 16 ) ).slice( - 6 );

	},

	getHSL: function ( optionalTarget ) {

		// h,s,l ranges are in 0.0 - 1.0

		var hsl = optionalTarget || { h: 0, s: 0, l: 0 };

		var r = this.r, g = this.g, b = this.b;

		var max = Math.max( r, g, b );
		var min = Math.min( r, g, b );

		var hue, saturation;
		var lightness = ( min + max ) / 2.0;

		if ( min === max ) {

			hue = 0;
			saturation = 0;

		} else {

			var delta = max - min;

			saturation = lightness <= 0.5 ? delta / ( max + min ) : delta / ( 2 - max - min );

			switch ( max ) {

				case r: hue = ( g - b ) / delta + ( g < b ? 6 : 0 ); break;
				case g: hue = ( b - r ) / delta + 2; break;
				case b: hue = ( r - g ) / delta + 4; break;

			}

			hue /= 6;

		}

		hsl.h = hue;
		hsl.s = saturation;
		hsl.l = lightness;

		return hsl;

	},

	getStyle: function () {

		return 'rgb(' + ( ( this.r * 255 ) | 0 ) + ',' + ( ( this.g * 255 ) | 0 ) + ',' + ( ( this.b * 255 ) | 0 ) + ')';

	},

	offsetHSL: function ( h, s, l ) {

		var hsl = this.getHSL();

		hsl.h += h; hsl.s += s; hsl.l += l;

		this.setHSL( hsl.h, hsl.s, hsl.l );

		return this;

	},

	add: function ( color ) {

		this.r += color.r;
		this.g += color.g;
		this.b += color.b;

		return this;

	},

	addColors: function ( color1, color2 ) {

		this.r = color1.r + color2.r;
		this.g = color1.g + color2.g;
		this.b = color1.b + color2.b;

		return this;

	},

	addScalar: function ( s ) {

		this.r += s;
		this.g += s;
		this.b += s;

		return this;

	},

	multiply: function ( color ) {

		this.r *= color.r;
		this.g *= color.g;
		this.b *= color.b;

		return this;

	},

	multiplyScalar: function ( s ) {

		this.r *= s;
		this.g *= s;
		this.b *= s;

		return this;

	},

	lerp: function ( color, alpha ) {

		this.r += ( color.r - this.r ) * alpha;
		this.g += ( color.g - this.g ) * alpha;
		this.b += ( color.b - this.b ) * alpha;

		return this;

	},

	equals: function ( c ) {

		return ( c.r === this.r ) && ( c.g === this.g ) && ( c.b === this.b );

	},

	fromArray: function ( array ) {

		this.r = array[ 0 ];
		this.g = array[ 1 ];
		this.b = array[ 2 ];

		return this;

	},

	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this.r;
		array[ offset + 1 ] = this.g;
		array[ offset + 2 ] = this.b;

		return array;
	},

	clone: function () {

		return new THREE.Color().setRGB( this.r, this.g, this.b );

	}

};

THREE.ColorKeywords = { 'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32 };

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

// File:src/math/Line3.js

/**
 * @author bhouston / http://exocortex.com
 */

THREE.Line3 = function ( start, end ) {

	this.start = ( start !== undefined ) ? start : new THREE.Vector3();
	this.end = ( end !== undefined ) ? end : new THREE.Vector3();

};

THREE.Line3.prototype = {

	constructor: THREE.Line3,

	set: function ( start, end ) {

		this.start.copy( start );
		this.end.copy( end );

		return this;

	},

	copy: function ( line ) {

		this.start.copy( line.start );
		this.end.copy( line.end );

		return this;

	},

	center: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.addVectors( this.start, this.end ).multiplyScalar( 0.5 );

	},

	delta: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.subVectors( this.end, this.start );

	},

	distanceSq: function () {

		return this.start.distanceToSquared( this.end );

	},

	distance: function () {

		return this.start.distanceTo( this.end );

	},

	at: function ( t, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();

		return this.delta( result ).multiplyScalar( t ).add( this.start );

	},

	closestPointToPointParameter: function () {

		var startP = new THREE.Vector3();
		var startEnd = new THREE.Vector3();

		return function ( point, clampToLine ) {

			startP.subVectors( point, this.start );
			startEnd.subVectors( this.end, this.start );

			var startEnd2 = startEnd.dot( startEnd );
			var startEnd_startP = startEnd.dot( startP );

			var t = startEnd_startP / startEnd2;

			if ( clampToLine ) {

				t = THREE.Math.clamp( t, 0, 1 );

			}

			return t;

		};

	}(),

	closestPointToPoint: function ( point, clampToLine, optionalTarget ) {

		var t = this.closestPointToPointParameter( point, clampToLine );

		var result = optionalTarget || new THREE.Vector3();

		return this.delta( result ).multiplyScalar( t ).add( this.start );

	},

	applyMatrix4: function ( matrix ) {

		this.start.applyMatrix4( matrix );
		this.end.applyMatrix4( matrix );

		return this;

	},

	equals: function ( line ) {

		return line.start.equals( this.start ) && line.end.equals( this.end );

	},

	clone: function () {

		return new THREE.Line3().copy( this );

	}

};

// File:src/math/Box2.js

/**
 * @author bhouston / http://exocortex.com
 */

THREE.Box2 = function ( min, max ) {

	this.min = ( min !== undefined ) ? min : new THREE.Vector2( Infinity, Infinity );
	this.max = ( max !== undefined ) ? max : new THREE.Vector2( - Infinity, - Infinity );

};

THREE.Box2.prototype = {

	constructor: THREE.Box2,

	set: function ( min, max ) {

		this.min.copy( min );
		this.max.copy( max );

		return this;

	},

	setFromPoints: function ( points ) {

		this.makeEmpty();

		for ( var i = 0, il = points.length; i < il; i ++ ) {

			this.expandByPoint( points[ i ] )

		}

		return this;

	},

	setFromCenterAndSize: function () {

		var v1 = new THREE.Vector2();

		return function ( center, size ) {

			var halfSize = v1.copy( size ).multiplyScalar( 0.5 );
			this.min.copy( center ).sub( halfSize );
			this.max.copy( center ).add( halfSize );

			return this;

		};

	}(),

	copy: function ( box ) {

		this.min.copy( box.min );
		this.max.copy( box.max );

		return this;

	},

	makeEmpty: function () {

		this.min.x = this.min.y = Infinity;
		this.max.x = this.max.y = - Infinity;

		return this;

	},

	empty: function () {

		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

		return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y );

	},

	center: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector2();
		return result.addVectors( this.min, this.max ).multiplyScalar( 0.5 );

	},

	size: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector2();
		return result.subVectors( this.max, this.min );

	},

	expandByPoint: function ( point ) {

		this.min.min( point );
		this.max.max( point );

		return this;
	},

	expandByVector: function ( vector ) {

		this.min.sub( vector );
		this.max.add( vector );

		return this;
	},

	expandByScalar: function ( scalar ) {

		this.min.addScalar( - scalar );
		this.max.addScalar( scalar );

		return this;
	},

	containsPoint: function ( point ) {

		if ( point.x < this.min.x || point.x > this.max.x ||
		     point.y < this.min.y || point.y > this.max.y ) {

			return false;

		}

		return true;

	},

	containsBox: function ( box ) {

		if ( ( this.min.x <= box.min.x ) && ( box.max.x <= this.max.x ) &&
		     ( this.min.y <= box.min.y ) && ( box.max.y <= this.max.y ) ) {

			return true;

		}

		return false;

	},

	getParameter: function ( point, optionalTarget ) {

		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.

		var result = optionalTarget || new THREE.Vector2();

		return result.set(
			( point.x - this.min.x ) / ( this.max.x - this.min.x ),
			( point.y - this.min.y ) / ( this.max.y - this.min.y )
		);

	},

	isIntersectionBox: function ( box ) {

		// using 6 splitting planes to rule out intersections.

		if ( box.max.x < this.min.x || box.min.x > this.max.x ||
		     box.max.y < this.min.y || box.min.y > this.max.y ) {

			return false;

		}

		return true;

	},

	clampPoint: function ( point, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector2();
		return result.copy( point ).clamp( this.min, this.max );

	},

	distanceToPoint: function () {

		var v1 = new THREE.Vector2();

		return function ( point ) {

			var clampedPoint = v1.copy( point ).clamp( this.min, this.max );
			return clampedPoint.sub( point ).length();

		};

	}(),

	intersect: function ( box ) {

		this.min.max( box.min );
		this.max.min( box.max );

		return this;

	},

	union: function ( box ) {

		this.min.min( box.min );
		this.max.max( box.max );

		return this;

	},

	translate: function ( offset ) {

		this.min.add( offset );
		this.max.add( offset );

		return this;

	},

	equals: function ( box ) {

		return box.min.equals( this.min ) && box.max.equals( this.max );

	},

	clone: function () {

		return new THREE.Box2().copy( this );

	}

};

// File:src/math/Box3.js

/**
 * @author bhouston / http://exocortex.com
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.Box3 = function ( min, max ) {

	this.min = ( min !== undefined ) ? min : new THREE.Vector3( Infinity, Infinity, Infinity );
	this.max = ( max !== undefined ) ? max : new THREE.Vector3( - Infinity, - Infinity, - Infinity );

};

THREE.Box3.prototype = {

	constructor: THREE.Box3,

	set: function ( min, max ) {

		this.min.copy( min );
		this.max.copy( max );

		return this;

	},

	setFromPoints: function ( points ) {

		this.makeEmpty();

		for ( var i = 0, il = points.length; i < il; i ++ ) {

			this.expandByPoint( points[ i ] );

		}

		return this;

	},

	setFromCenterAndSize: function () {

		var v1 = new THREE.Vector3();

		return function ( center, size ) {

			var halfSize = v1.copy( size ).multiplyScalar( 0.5 );

			this.min.copy( center ).sub( halfSize );
			this.max.copy( center ).add( halfSize );

			return this;

		};

	}(),

	setFromObject: function () {

		// Computes the world-axis-aligned bounding box of an object (including its children),
		// accounting for both the object's, and childrens', world transforms

		var v1 = new THREE.Vector3();

		return function ( object ) {

			var scope = this;

			object.updateMatrixWorld( true );

			this.makeEmpty();

			object.traverse( function ( node ) {

				var geometry = node.geometry;

				if ( geometry !== undefined ) {

					if ( geometry instanceof THREE.Geometry ) {

						var vertices = geometry.vertices;

						for ( var i = 0, il = vertices.length; i < il; i ++ ) {

							v1.copy( vertices[ i ] );

							v1.applyMatrix4( node.matrixWorld );

							scope.expandByPoint( v1 );

						}

					} else if ( geometry instanceof THREE.BufferGeometry && geometry.attributes[ 'position' ] !== undefined ) {

						var positions = geometry.attributes[ 'position' ].array;

						for ( var i = 0, il = positions.length; i < il; i += 3 ) {

							v1.set( positions[ i ], positions[ i + 1 ], positions[ i + 2 ] );

							v1.applyMatrix4( node.matrixWorld );

							scope.expandByPoint( v1 );

						}

					}

				}

			} );

			return this;

		};

	}(),

	copy: function ( box ) {

		this.min.copy( box.min );
		this.max.copy( box.max );

		return this;

	},

	makeEmpty: function () {

		this.min.x = this.min.y = this.min.z = Infinity;
		this.max.x = this.max.y = this.max.z = - Infinity;

		return this;

	},

	empty: function () {

		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

		return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y ) || ( this.max.z < this.min.z );

	},

	center: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.addVectors( this.min, this.max ).multiplyScalar( 0.5 );

	},

	size: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.subVectors( this.max, this.min );

	},

	expandByPoint: function ( point ) {

		this.min.min( point );
		this.max.max( point );

		return this;

	},

	expandByVector: function ( vector ) {

		this.min.sub( vector );
		this.max.add( vector );

		return this;

	},

	expandByScalar: function ( scalar ) {

		this.min.addScalar( - scalar );
		this.max.addScalar( scalar );

		return this;

	},

	containsPoint: function ( point ) {

		if ( point.x < this.min.x || point.x > this.max.x ||
		     point.y < this.min.y || point.y > this.max.y ||
		     point.z < this.min.z || point.z > this.max.z ) {

			return false;

		}

		return true;

	},

	containsBox: function ( box ) {

		if ( ( this.min.x <= box.min.x ) && ( box.max.x <= this.max.x ) &&
			 ( this.min.y <= box.min.y ) && ( box.max.y <= this.max.y ) &&
			 ( this.min.z <= box.min.z ) && ( box.max.z <= this.max.z ) ) {

			return true;

		}

		return false;

	},

	getParameter: function ( point, optionalTarget ) {

		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.

		var result = optionalTarget || new THREE.Vector3();

		return result.set(
			( point.x - this.min.x ) / ( this.max.x - this.min.x ),
			( point.y - this.min.y ) / ( this.max.y - this.min.y ),
			( point.z - this.min.z ) / ( this.max.z - this.min.z )
		);

	},

	isIntersectionBox: function ( box ) {

		// using 6 splitting planes to rule out intersections.

		if ( box.max.x < this.min.x || box.min.x > this.max.x ||
		     box.max.y < this.min.y || box.min.y > this.max.y ||
		     box.max.z < this.min.z || box.min.z > this.max.z ) {

			return false;

		}

		return true;

	},

	clampPoint: function ( point, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.copy( point ).clamp( this.min, this.max );

	},

	distanceToPoint: function () {

		var v1 = new THREE.Vector3();

		return function ( point ) {

			var clampedPoint = v1.copy( point ).clamp( this.min, this.max );
			return clampedPoint.sub( point ).length();

		};

	}(),

	getBoundingSphere: function () {

		var v1 = new THREE.Vector3();

		return function ( optionalTarget ) {

			var result = optionalTarget || new THREE.Sphere();

			result.center = this.center();
			result.radius = this.size( v1 ).length() * 0.5;

			return result;

		};

	}(),

	intersect: function ( box ) {

		this.min.max( box.min );
		this.max.min( box.max );

		return this;

	},

	union: function ( box ) {

		this.min.min( box.min );
		this.max.max( box.max );

		return this;

	},

	applyMatrix4: function () {

		var points = [
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3()
		];

		return function ( matrix ) {

			// NOTE: I am using a binary pattern to specify all 2^3 combinations below
			points[ 0 ].set( this.min.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 000
			points[ 1 ].set( this.min.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 001
			points[ 2 ].set( this.min.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 010
			points[ 3 ].set( this.min.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 011
			points[ 4 ].set( this.max.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 100
			points[ 5 ].set( this.max.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 101
			points[ 6 ].set( this.max.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 110
			points[ 7 ].set( this.max.x, this.max.y, this.max.z ).applyMatrix4( matrix );  // 111

			this.makeEmpty();
			this.setFromPoints( points );

			return this;

		};

	}(),

	translate: function ( offset ) {

		this.min.add( offset );
		this.max.add( offset );

		return this;

	},

	equals: function ( box ) {

		return box.min.equals( this.min ) && box.max.equals( this.max );

	},

	clone: function () {

		return new THREE.Box3().copy( this );

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

// File:src/math/Ray.js

/**
 * @author bhouston / http://exocortex.com
 */

THREE.Ray = function ( origin, direction ) {

	this.origin = ( origin !== undefined ) ? origin : new THREE.Vector3();
	this.direction = ( direction !== undefined ) ? direction : new THREE.Vector3();

};

THREE.Ray.prototype = {

	constructor: THREE.Ray,

	set: function ( origin, direction ) {

		this.origin.copy( origin );
		this.direction.copy( direction );

		return this;

	},

	copy: function ( ray ) {

		this.origin.copy( ray.origin );
		this.direction.copy( ray.direction );

		return this;

	},

	at: function ( t, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();

		return result.copy( this.direction ).multiplyScalar( t ).add( this.origin );

	},

	recast: function () {

		var v1 = new THREE.Vector3();

		return function ( t ) {

			this.origin.copy( this.at( t, v1 ) );

			return this;

		};

	}(),

	closestPointToPoint: function ( point, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		result.subVectors( point, this.origin );
		var directionDistance = result.dot( this.direction );

		if ( directionDistance < 0 ) {

			return result.copy( this.origin );

		}

		return result.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );

	},

	distanceToPoint: function () {

		var v1 = new THREE.Vector3();

		return function ( point ) {

			var directionDistance = v1.subVectors( point, this.origin ).dot( this.direction );

			// point behind the ray

			if ( directionDistance < 0 ) {

				return this.origin.distanceTo( point );

			}

			v1.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );

			return v1.distanceTo( point );

		};

	}(),

	distanceSqToSegment: function () {

		var segCenter = new THREE.Vector3();
		var segDir = new THREE.Vector3();
		var diff = new THREE.Vector3();

		return function ( v0, v1, optionalPointOnRay, optionalPointOnSegment ) {

			// from http://www.geometrictools.com/LibMathematics/Distance/Wm5DistRay3Segment3.cpp
			// It returns the min distance between the ray and the segment
			// defined by v0 and v1
			// It can also set two optional targets :
			// - The closest point on the ray
			// - The closest point on the segment

			segCenter.copy( v0 ).add( v1 ).multiplyScalar( 0.5 );
			segDir.copy( v1 ).sub( v0 ).normalize();
			diff.copy( this.origin ).sub( segCenter );

			var segExtent = v0.distanceTo( v1 ) * 0.5;
			var a01 = - this.direction.dot( segDir );
			var b0 = diff.dot( this.direction );
			var b1 = - diff.dot( segDir );
			var c = diff.lengthSq();
			var det = Math.abs( 1 - a01 * a01 );
			var s0, s1, sqrDist, extDet;

			if ( det > 0 ) {

				// The ray and segment are not parallel.

				s0 = a01 * b1 - b0;
				s1 = a01 * b0 - b1;
				extDet = segExtent * det;

				if ( s0 >= 0 ) {

					if ( s1 >= - extDet ) {

						if ( s1 <= extDet ) {

							// region 0
							// Minimum at interior points of ray and segment.

							var invDet = 1 / det;
							s0 *= invDet;
							s1 *= invDet;
							sqrDist = s0 * ( s0 + a01 * s1 + 2 * b0 ) + s1 * ( a01 * s0 + s1 + 2 * b1 ) + c;

						} else {

							// region 1

							s1 = segExtent;
							s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
							sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

						}

					} else {

						// region 5

						s1 = - segExtent;
						s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
						sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

					}

				} else {

					if ( s1 <= - extDet ) {

						// region 4

						s0 = Math.max( 0, - ( - a01 * segExtent + b0 ) );
						s1 = ( s0 > 0 ) ? - segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
						sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

					} else if ( s1 <= extDet ) {

						// region 3

						s0 = 0;
						s1 = Math.min( Math.max( - segExtent, - b1 ), segExtent );
						sqrDist = s1 * ( s1 + 2 * b1 ) + c;

					} else {

						// region 2

						s0 = Math.max( 0, - ( a01 * segExtent + b0 ) );
						s1 = ( s0 > 0 ) ? segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
						sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

					}

				}

			} else {

				// Ray and segment are parallel.

				s1 = ( a01 > 0 ) ? - segExtent : segExtent;
				s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
				sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

			}

			if ( optionalPointOnRay ) {

				optionalPointOnRay.copy( this.direction ).multiplyScalar( s0 ).add( this.origin );

			}

			if ( optionalPointOnSegment ) {

				optionalPointOnSegment.copy( segDir ).multiplyScalar( s1 ).add( segCenter );

			}

			return sqrDist;

		};

	}(),


	isIntersectionSphere: function ( sphere ) {

		return this.distanceToPoint( sphere.center ) <= sphere.radius;

	},

	intersectSphere: function () {

		// from http://www.scratchapixel.com/lessons/3d-basic-lessons/lesson-7-intersecting-simple-shapes/ray-sphere-intersection/

		var v1 = new THREE.Vector3();

		return function ( sphere, optionalTarget ) {

			v1.subVectors( sphere.center, this.origin );

			var tca = v1.dot( this.direction );

			var d2 = v1.dot( v1 ) - tca * tca;

			var radius2 = sphere.radius * sphere.radius;

			if ( d2 > radius2 ) return null;

			var thc = Math.sqrt( radius2 - d2 );

			// t0 = first intersect point - entrance on front of sphere
			var t0 = tca - thc;

			// t1 = second intersect point - exit point on back of sphere
			var t1 = tca + thc;

			// test to see if both t0 and t1 are behind the ray - if so, return null
			if ( t0 < 0 && t1 < 0 ) return null;

			// test to see if t0 is behind the ray:
			// if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
			// in order to always return an intersect point that is in front of the ray.
			if ( t0 < 0 ) return this.at( t1, optionalTarget );

			// else t0 is in front of the ray, so return the first collision point scaled by t0
			return this.at( t0, optionalTarget );

		}

	}(),

	isIntersectionPlane: function ( plane ) {

		// check if the ray lies on the plane first

		var distToPoint = plane.distanceToPoint( this.origin );

		if ( distToPoint === 0 ) {

			return true;

		}

		var denominator = plane.normal.dot( this.direction );

		if ( denominator * distToPoint < 0 ) {

			return true;

		}

		// ray origin is behind the plane (and is pointing behind it)

		return false;

	},

	distanceToPlane: function ( plane ) {

		var denominator = plane.normal.dot( this.direction );
		if ( denominator === 0 ) {

			// line is coplanar, return origin
			if ( plane.distanceToPoint( this.origin ) === 0 ) {

				return 0;

			}

			// Null is preferable to undefined since undefined means.... it is undefined

			return null;

		}

		var t = - ( this.origin.dot( plane.normal ) + plane.constant ) / denominator;

		// Return if the ray never intersects the plane

		return t >= 0 ? t :  null;

	},

	intersectPlane: function ( plane, optionalTarget ) {

		var t = this.distanceToPlane( plane );

		if ( t === null ) {

			return null;
		}

		return this.at( t, optionalTarget );

	},

	isIntersectionBox: function () {

		var v = new THREE.Vector3();

		return function ( box ) {

			return this.intersectBox( box, v ) !== null;

		};

	}(),

	intersectBox: function ( box, optionalTarget ) {

		// http://www.scratchapixel.com/lessons/3d-basic-lessons/lesson-7-intersecting-simple-shapes/ray-box-intersection/

		var tmin,tmax,tymin,tymax,tzmin,tzmax;

		var invdirx = 1 / this.direction.x,
			invdiry = 1 / this.direction.y,
			invdirz = 1 / this.direction.z;

		var origin = this.origin;

		if ( invdirx >= 0 ) {

			tmin = ( box.min.x - origin.x ) * invdirx;
			tmax = ( box.max.x - origin.x ) * invdirx;

		} else {

			tmin = ( box.max.x - origin.x ) * invdirx;
			tmax = ( box.min.x - origin.x ) * invdirx;
		}

		if ( invdiry >= 0 ) {

			tymin = ( box.min.y - origin.y ) * invdiry;
			tymax = ( box.max.y - origin.y ) * invdiry;

		} else {

			tymin = ( box.max.y - origin.y ) * invdiry;
			tymax = ( box.min.y - origin.y ) * invdiry;
		}

		if ( ( tmin > tymax ) || ( tymin > tmax ) ) return null;

		// These lines also handle the case where tmin or tmax is NaN
		// (result of 0 * Infinity). x !== x returns true if x is NaN

		if ( tymin > tmin || tmin !== tmin ) tmin = tymin;

		if ( tymax < tmax || tmax !== tmax ) tmax = tymax;

		if ( invdirz >= 0 ) {

			tzmin = ( box.min.z - origin.z ) * invdirz;
			tzmax = ( box.max.z - origin.z ) * invdirz;

		} else {

			tzmin = ( box.max.z - origin.z ) * invdirz;
			tzmax = ( box.min.z - origin.z ) * invdirz;
		}

		if ( ( tmin > tzmax ) || ( tzmin > tmax ) ) return null;

		if ( tzmin > tmin || tmin !== tmin ) tmin = tzmin;

		if ( tzmax < tmax || tmax !== tmax ) tmax = tzmax;

		//return point closest to the ray (positive side)

		if ( tmax < 0 ) return null;

		return this.at( tmin >= 0 ? tmin : tmax, optionalTarget );

	},

	intersectTriangle: function () {

		// Compute the offset origin, edges, and normal.
		var diff = new THREE.Vector3();
		var edge1 = new THREE.Vector3();
		var edge2 = new THREE.Vector3();
		var normal = new THREE.Vector3();

		return function ( a, b, c, backfaceCulling, optionalTarget ) {

			// from http://www.geometrictools.com/LibMathematics/Intersection/Wm5IntrRay3Triangle3.cpp

			edge1.subVectors( b, a );
			edge2.subVectors( c, a );
			normal.crossVectors( edge1, edge2 );

			// Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
			// E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
			//   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
			//   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
			//   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
			var DdN = this.direction.dot( normal );
			var sign;

			if ( DdN > 0 ) {

				if ( backfaceCulling ) return null;
				sign = 1;

			} else if ( DdN < 0 ) {

				sign = - 1;
				DdN = - DdN;

			} else {

				return null;

			}

			diff.subVectors( this.origin, a );
			var DdQxE2 = sign * this.direction.dot( edge2.crossVectors( diff, edge2 ) );

			// b1 < 0, no intersection
			if ( DdQxE2 < 0 ) {

				return null;

			}

			var DdE1xQ = sign * this.direction.dot( edge1.cross( diff ) );

			// b2 < 0, no intersection
			if ( DdE1xQ < 0 ) {

				return null;

			}

			// b1+b2 > 1, no intersection
			if ( DdQxE2 + DdE1xQ > DdN ) {

				return null;

			}

			// Line intersects triangle, check if ray does.
			var QdN = - sign * diff.dot( normal );

			// t < 0, no intersection
			if ( QdN < 0 ) {

				return null;

			}

			// Ray intersects triangle.
			return this.at( QdN / DdN, optionalTarget );

		};

	}(),

	applyMatrix4: function ( matrix4 ) {

		this.direction.add( this.origin ).applyMatrix4( matrix4 );
		this.origin.applyMatrix4( matrix4 );
		this.direction.sub( this.origin );
		this.direction.normalize();

		return this;
	},

	equals: function ( ray ) {

		return ray.origin.equals( this.origin ) && ray.direction.equals( this.direction );

	},

	clone: function () {

		return new THREE.Ray().copy( this );

	}

};

// File:src/math/Sphere.js

/**
 * @author bhouston / http://exocortex.com
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Sphere = function ( center, radius ) {

	this.center = ( center !== undefined ) ? center : new THREE.Vector3();
	this.radius = ( radius !== undefined ) ? radius : 0;

};

THREE.Sphere.prototype = {

	constructor: THREE.Sphere,

	set: function ( center, radius ) {

		this.center.copy( center );
		this.radius = radius;

		return this;
	},

	setFromPoints: function () {

		var box = new THREE.Box3();

		return function ( points, optionalCenter ) {

			var center = this.center;

			if ( optionalCenter !== undefined ) {

				center.copy( optionalCenter );

			} else {

				box.setFromPoints( points ).center( center );

			}

			var maxRadiusSq = 0;

			for ( var i = 0, il = points.length; i < il; i ++ ) {

				maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( points[ i ] ) );

			}

			this.radius = Math.sqrt( maxRadiusSq );

			return this;

		};

	}(),

	copy: function ( sphere ) {

		this.center.copy( sphere.center );
		this.radius = sphere.radius;

		return this;

	},

	empty: function () {

		return ( this.radius <= 0 );

	},

	containsPoint: function ( point ) {

		return ( point.distanceToSquared( this.center ) <= ( this.radius * this.radius ) );

	},

	distanceToPoint: function ( point ) {

		return ( point.distanceTo( this.center ) - this.radius );

	},

	intersectsSphere: function ( sphere ) {

		var radiusSum = this.radius + sphere.radius;

		return sphere.center.distanceToSquared( this.center ) <= ( radiusSum * radiusSum );

	},

	clampPoint: function ( point, optionalTarget ) {

		var deltaLengthSq = this.center.distanceToSquared( point );

		var result = optionalTarget || new THREE.Vector3();
		result.copy( point );

		if ( deltaLengthSq > ( this.radius * this.radius ) ) {

			result.sub( this.center ).normalize();
			result.multiplyScalar( this.radius ).add( this.center );

		}

		return result;

	},

	getBoundingBox: function ( optionalTarget ) {

		var box = optionalTarget || new THREE.Box3();

		box.set( this.center, this.center );
		box.expandByScalar( this.radius );

		return box;

	},

	applyMatrix4: function ( matrix ) {

		this.center.applyMatrix4( matrix );
		this.radius = this.radius * matrix.getMaxScaleOnAxis();

		return this;

	},

	translate: function ( offset ) {

		this.center.add( offset );

		return this;

	},

	equals: function ( sphere ) {

		return sphere.center.equals( this.center ) && ( sphere.radius === this.radius );

	},

	clone: function () {

		return new THREE.Sphere().copy( this );

	}

};

// File:src/math/Frustum.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author bhouston / http://exocortex.com
 */

THREE.Frustum = function ( p0, p1, p2, p3, p4, p5 ) {

	this.planes = [

		( p0 !== undefined ) ? p0 : new THREE.Plane(),
		( p1 !== undefined ) ? p1 : new THREE.Plane(),
		( p2 !== undefined ) ? p2 : new THREE.Plane(),
		( p3 !== undefined ) ? p3 : new THREE.Plane(),
		( p4 !== undefined ) ? p4 : new THREE.Plane(),
		( p5 !== undefined ) ? p5 : new THREE.Plane()

	];

};

THREE.Frustum.prototype = {

	constructor: THREE.Frustum,

	set: function ( p0, p1, p2, p3, p4, p5 ) {

		var planes = this.planes;

		planes[ 0 ].copy( p0 );
		planes[ 1 ].copy( p1 );
		planes[ 2 ].copy( p2 );
		planes[ 3 ].copy( p3 );
		planes[ 4 ].copy( p4 );
		planes[ 5 ].copy( p5 );

		return this;

	},

	copy: function ( frustum ) {

		var planes = this.planes;

		for ( var i = 0; i < 6; i ++ ) {

			planes[ i ].copy( frustum.planes[ i ] );

		}

		return this;

	},

	setFromMatrix: function ( m ) {

		var planes = this.planes;
		var me = m.elements;
		var me0 = me[ 0 ], me1 = me[ 1 ], me2 = me[ 2 ], me3 = me[ 3 ];
		var me4 = me[ 4 ], me5 = me[ 5 ], me6 = me[ 6 ], me7 = me[ 7 ];
		var me8 = me[ 8 ], me9 = me[ 9 ], me10 = me[ 10 ], me11 = me[ 11 ];
		var me12 = me[ 12 ], me13 = me[ 13 ], me14 = me[ 14 ], me15 = me[ 15 ];

		planes[ 0 ].setComponents( me3 - me0, me7 - me4, me11 - me8, me15 - me12 ).normalize();
		planes[ 1 ].setComponents( me3 + me0, me7 + me4, me11 + me8, me15 + me12 ).normalize();
		planes[ 2 ].setComponents( me3 + me1, me7 + me5, me11 + me9, me15 + me13 ).normalize();
		planes[ 3 ].setComponents( me3 - me1, me7 - me5, me11 - me9, me15 - me13 ).normalize();
		planes[ 4 ].setComponents( me3 - me2, me7 - me6, me11 - me10, me15 - me14 ).normalize();
		planes[ 5 ].setComponents( me3 + me2, me7 + me6, me11 + me10, me15 + me14 ).normalize();

		return this;

	},

	intersectsObject: function () {

		var sphere = new THREE.Sphere();

		return function ( object ) {

			var geometry = object.geometry;

			if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

			sphere.copy( geometry.boundingSphere );
			sphere.applyMatrix4( object.matrixWorld );

			return this.intersectsSphere( sphere );

		};

	}(),

	intersectsSphere: function ( sphere ) {

		var planes = this.planes;
		var center = sphere.center;
		var negRadius = - sphere.radius;

		for ( var i = 0; i < 6; i ++ ) {

			var distance = planes[ i ].distanceToPoint( center );

			if ( distance < negRadius ) {

				return false;

			}

		}

		return true;

	},

	intersectsBox: function () {

		var p1 = new THREE.Vector3(),
			p2 = new THREE.Vector3();

		return function ( box ) {

			var planes = this.planes;

			for ( var i = 0; i < 6 ; i ++ ) {

				var plane = planes[ i ];

				p1.x = plane.normal.x > 0 ? box.min.x : box.max.x;
				p2.x = plane.normal.x > 0 ? box.max.x : box.min.x;
				p1.y = plane.normal.y > 0 ? box.min.y : box.max.y;
				p2.y = plane.normal.y > 0 ? box.max.y : box.min.y;
				p1.z = plane.normal.z > 0 ? box.min.z : box.max.z;
				p2.z = plane.normal.z > 0 ? box.max.z : box.min.z;

				var d1 = plane.distanceToPoint( p1 );
				var d2 = plane.distanceToPoint( p2 );

				// if both outside plane, no intersection

				if ( d1 < 0 && d2 < 0 ) {

					return false;

				}
			}

			return true;
		};

	}(),


	containsPoint: function ( point ) {

		var planes = this.planes;

		for ( var i = 0; i < 6; i ++ ) {

			if ( planes[ i ].distanceToPoint( point ) < 0 ) {

				return false;

			}

		}

		return true;

	},

	clone: function () {

		return new THREE.Frustum().copy( this );

	}

};

// File:src/math/Plane.js

/**
 * @author bhouston / http://exocortex.com
 */

THREE.Plane = function ( normal, constant ) {

	this.normal = ( normal !== undefined ) ? normal : new THREE.Vector3( 1, 0, 0 );
	this.constant = ( constant !== undefined ) ? constant : 0;

};

THREE.Plane.prototype = {

	constructor: THREE.Plane,

	set: function ( normal, constant ) {

		this.normal.copy( normal );
		this.constant = constant;

		return this;

	},

	setComponents: function ( x, y, z, w ) {

		this.normal.set( x, y, z );
		this.constant = w;

		return this;

	},

	setFromNormalAndCoplanarPoint: function ( normal, point ) {

		this.normal.copy( normal );
		this.constant = - point.dot( this.normal );	// must be this.normal, not normal, as this.normal is normalized

		return this;

	},

	setFromCoplanarPoints: function () {

		var v1 = new THREE.Vector3();
		var v2 = new THREE.Vector3();

		return function ( a, b, c ) {

			var normal = v1.subVectors( c, b ).cross( v2.subVectors( a, b ) ).normalize();

			// Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

			this.setFromNormalAndCoplanarPoint( normal, a );

			return this;

		};

	}(),


	copy: function ( plane ) {

		this.normal.copy( plane.normal );
		this.constant = plane.constant;

		return this;

	},

	normalize: function () {

		// Note: will lead to a divide by zero if the plane is invalid.

		var inverseNormalLength = 1.0 / this.normal.length();
		this.normal.multiplyScalar( inverseNormalLength );
		this.constant *= inverseNormalLength;

		return this;

	},

	negate: function () {

		this.constant *= - 1;
		this.normal.negate();

		return this;

	},

	distanceToPoint: function ( point ) {

		return this.normal.dot( point ) + this.constant;

	},

	distanceToSphere: function ( sphere ) {

		return this.distanceToPoint( sphere.center ) - sphere.radius;

	},

	projectPoint: function ( point, optionalTarget ) {

		return this.orthoPoint( point, optionalTarget ).sub( point ).negate();

	},

	orthoPoint: function ( point, optionalTarget ) {

		var perpendicularMagnitude = this.distanceToPoint( point );

		var result = optionalTarget || new THREE.Vector3();
		return result.copy( this.normal ).multiplyScalar( perpendicularMagnitude );

	},

	isIntersectionLine: function ( line ) {

		// Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

		var startSign = this.distanceToPoint( line.start );
		var endSign = this.distanceToPoint( line.end );

		return ( startSign < 0 && endSign > 0 ) || ( endSign < 0 && startSign > 0 );

	},

	intersectLine: function () {

		var v1 = new THREE.Vector3();

		return function ( line, optionalTarget ) {

			var result = optionalTarget || new THREE.Vector3();

			var direction = line.delta( v1 );

			var denominator = this.normal.dot( direction );

			if ( denominator === 0 ) {

				// line is coplanar, return origin
				if ( this.distanceToPoint( line.start ) === 0 ) {

					return result.copy( line.start );

				}

				// Unsure if this is the correct method to handle this case.
				return undefined;

			}

			var t = - ( line.start.dot( this.normal ) + this.constant ) / denominator;

			if ( t < 0 || t > 1 ) {

				return undefined;

			}

			return result.copy( direction ).multiplyScalar( t ).add( line.start );

		};

	}(),


	coplanarPoint: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.copy( this.normal ).multiplyScalar( - this.constant );

	},

	applyMatrix4: function () {

		var v1 = new THREE.Vector3();
		var v2 = new THREE.Vector3();
		var m1 = new THREE.Matrix3();

		return function ( matrix, optionalNormalMatrix ) {

			// compute new normal based on theory here:
			// http://www.songho.ca/opengl/gl_normaltransform.html
			var normalMatrix = optionalNormalMatrix || m1.getNormalMatrix( matrix );
			var newNormal = v1.copy( this.normal ).applyMatrix3( normalMatrix );

			var newCoplanarPoint = this.coplanarPoint( v2 );
			newCoplanarPoint.applyMatrix4( matrix );

			this.setFromNormalAndCoplanarPoint( newNormal, newCoplanarPoint );

			return this;

		};

	}(),

	translate: function ( offset ) {

		this.constant = this.constant - offset.dot( this.normal );

		return this;

	},

	equals: function ( plane ) {

		return plane.normal.equals( this.normal ) && ( plane.constant === this.constant );

	},

	clone: function () {

		return new THREE.Plane().copy( this );

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

// File:src/math/Spline.js

/**
 * Spline from Tween.js, slightly optimized (and trashed)
 * http://sole.github.com/tween.js/examples/05_spline.html
 *
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Spline = function ( points ) {

	this.points = points;

	var c = [], v3 = { x: 0, y: 0, z: 0 },
	point, intPoint, weight, w2, w3,
	pa, pb, pc, pd;

	this.initFromArray = function ( a ) {

		this.points = [];

		for ( var i = 0; i < a.length; i ++ ) {

			this.points[ i ] = { x: a[ i ][ 0 ], y: a[ i ][ 1 ], z: a[ i ][ 2 ] };

		}

	};

	this.getPoint = function ( k ) {

		point = ( this.points.length - 1 ) * k;
		intPoint = Math.floor( point );
		weight = point - intPoint;

		c[ 0 ] = intPoint === 0 ? intPoint : intPoint - 1;
		c[ 1 ] = intPoint;
		c[ 2 ] = intPoint  > this.points.length - 2 ? this.points.length - 1 : intPoint + 1;
		c[ 3 ] = intPoint  > this.points.length - 3 ? this.points.length - 1 : intPoint + 2;

		pa = this.points[ c[ 0 ] ];
		pb = this.points[ c[ 1 ] ];
		pc = this.points[ c[ 2 ] ];
		pd = this.points[ c[ 3 ] ];

		w2 = weight * weight;
		w3 = weight * w2;

		v3.x = interpolate( pa.x, pb.x, pc.x, pd.x, weight, w2, w3 );
		v3.y = interpolate( pa.y, pb.y, pc.y, pd.y, weight, w2, w3 );
		v3.z = interpolate( pa.z, pb.z, pc.z, pd.z, weight, w2, w3 );

		return v3;

	};

	this.getControlPointsArray = function () {

		var i, p, l = this.points.length,
			coords = [];

		for ( i = 0; i < l; i ++ ) {

			p = this.points[ i ];
			coords[ i ] = [ p.x, p.y, p.z ];

		}

		return coords;

	};

	// approximate length by summing linear segments

	this.getLength = function ( nSubDivisions ) {

		var i, index, nSamples, position,
			point = 0, intPoint = 0, oldIntPoint = 0,
			oldPosition = new THREE.Vector3(),
			tmpVec = new THREE.Vector3(),
			chunkLengths = [],
			totalLength = 0;

		// first point has 0 length

		chunkLengths[ 0 ] = 0;

		if ( ! nSubDivisions ) nSubDivisions = 100;

		nSamples = this.points.length * nSubDivisions;

		oldPosition.copy( this.points[ 0 ] );

		for ( i = 1; i < nSamples; i ++ ) {

			index = i / nSamples;

			position = this.getPoint( index );
			tmpVec.copy( position );

			totalLength += tmpVec.distanceTo( oldPosition );

			oldPosition.copy( position );

			point = ( this.points.length - 1 ) * index;
			intPoint = Math.floor( point );

			if ( intPoint !== oldIntPoint ) {

				chunkLengths[ intPoint ] = totalLength;
				oldIntPoint = intPoint;

			}

		}

		// last point ends with total length

		chunkLengths[ chunkLengths.length ] = totalLength;

		return { chunks: chunkLengths, total: totalLength };

	};

	this.reparametrizeByArcLength = function ( samplingCoef ) {

		var i, j,
			index, indexCurrent, indexNext,
			realDistance,
			sampling, position,
			newpoints = [],
			tmpVec = new THREE.Vector3(),
			sl = this.getLength();

		newpoints.push( tmpVec.copy( this.points[ 0 ] ).clone() );

		for ( i = 1; i < this.points.length; i ++ ) {

			//tmpVec.copy( this.points[ i - 1 ] );
			//linearDistance = tmpVec.distanceTo( this.points[ i ] );

			realDistance = sl.chunks[ i ] - sl.chunks[ i - 1 ];

			sampling = Math.ceil( samplingCoef * realDistance / sl.total );

			indexCurrent = ( i - 1 ) / ( this.points.length - 1 );
			indexNext = i / ( this.points.length - 1 );

			for ( j = 1; j < sampling - 1; j ++ ) {

				index = indexCurrent + j * ( 1 / sampling ) * ( indexNext - indexCurrent );

				position = this.getPoint( index );
				newpoints.push( tmpVec.copy( position ).clone() );

			}

			newpoints.push( tmpVec.copy( this.points[ i ] ).clone() );

		}

		this.points = newpoints;

	};

	// Catmull-Rom

	function interpolate( p0, p1, p2, p3, t, t2, t3 ) {

		var v0 = ( p2 - p0 ) * 0.5,
			v1 = ( p3 - p1 ) * 0.5;

		return ( 2 * ( p1 - p2 ) + v0 + v1 ) * t3 + ( - 3 * ( p1 - p2 ) - 2 * v0 - v1 ) * t2 + v0 * t + p1;

	}

};

// File:src/math/Triangle.js

/**
 * @author bhouston / http://exocortex.com
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Triangle = function ( a, b, c ) {

	this.a = ( a !== undefined ) ? a : new THREE.Vector3();
	this.b = ( b !== undefined ) ? b : new THREE.Vector3();
	this.c = ( c !== undefined ) ? c : new THREE.Vector3();

};

THREE.Triangle.normal = function () {

	var v0 = new THREE.Vector3();

	return function ( a, b, c, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();

		result.subVectors( c, b );
		v0.subVectors( a, b );
		result.cross( v0 );

		var resultLengthSq = result.lengthSq();
		if ( resultLengthSq > 0 ) {

			return result.multiplyScalar( 1 / Math.sqrt( resultLengthSq ) );

		}

		return result.set( 0, 0, 0 );

	};

}();

// static/instance method to calculate barycoordinates
// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
THREE.Triangle.barycoordFromPoint = function () {

	var v0 = new THREE.Vector3();
	var v1 = new THREE.Vector3();
	var v2 = new THREE.Vector3();

	return function ( point, a, b, c, optionalTarget ) {

		v0.subVectors( c, a );
		v1.subVectors( b, a );
		v2.subVectors( point, a );

		var dot00 = v0.dot( v0 );
		var dot01 = v0.dot( v1 );
		var dot02 = v0.dot( v2 );
		var dot11 = v1.dot( v1 );
		var dot12 = v1.dot( v2 );

		var denom = ( dot00 * dot11 - dot01 * dot01 );

		var result = optionalTarget || new THREE.Vector3();

		// colinear or singular triangle
		if ( denom === 0 ) {
			// arbitrary location outside of triangle?
			// not sure if this is the best idea, maybe should be returning undefined
			return result.set( - 2, - 1, - 1 );
		}

		var invDenom = 1 / denom;
		var u = ( dot11 * dot02 - dot01 * dot12 ) * invDenom;
		var v = ( dot00 * dot12 - dot01 * dot02 ) * invDenom;

		// barycoordinates must always sum to 1
		return result.set( 1 - u - v, v, u );

	};

}();

THREE.Triangle.containsPoint = function () {

	var v1 = new THREE.Vector3();

	return function ( point, a, b, c ) {

		var result = THREE.Triangle.barycoordFromPoint( point, a, b, c, v1 );

		return ( result.x >= 0 ) && ( result.y >= 0 ) && ( ( result.x + result.y ) <= 1 );

	};

}();

THREE.Triangle.prototype = {

	constructor: THREE.Triangle,

	set: function ( a, b, c ) {

		this.a.copy( a );
		this.b.copy( b );
		this.c.copy( c );

		return this;

	},

	setFromPointsAndIndices: function ( points, i0, i1, i2 ) {

		this.a.copy( points[ i0 ] );
		this.b.copy( points[ i1 ] );
		this.c.copy( points[ i2 ] );

		return this;

	},

	copy: function ( triangle ) {

		this.a.copy( triangle.a );
		this.b.copy( triangle.b );
		this.c.copy( triangle.c );

		return this;

	},

	area: function () {

		var v0 = new THREE.Vector3();
		var v1 = new THREE.Vector3();

		return function () {

			v0.subVectors( this.c, this.b );
			v1.subVectors( this.a, this.b );

			return v0.cross( v1 ).length() * 0.5;

		};

	}(),

	midpoint: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.addVectors( this.a, this.b ).add( this.c ).multiplyScalar( 1 / 3 );

	},

	normal: function ( optionalTarget ) {

		return THREE.Triangle.normal( this.a, this.b, this.c, optionalTarget );

	},

	plane: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Plane();

		return result.setFromCoplanarPoints( this.a, this.b, this.c );

	},

	barycoordFromPoint: function ( point, optionalTarget ) {

		return THREE.Triangle.barycoordFromPoint( point, this.a, this.b, this.c, optionalTarget );

	},

	containsPoint: function ( point ) {

		return THREE.Triangle.containsPoint( point, this.a, this.b, this.c );

	},

	equals: function ( triangle ) {

		return triangle.a.equals( this.a ) && triangle.b.equals( this.b ) && triangle.c.equals( this.c );

	},

	clone: function () {

		return new THREE.Triangle().copy( this );

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


    setupVRDevices(function() {
      // Creates viewport, camera and world elements
      setupScene();
      // Initiates the camera perspective matrix
      setupPerspective();
      // For mouse look mode when there's no HMD avaialable
      setupInputEventHandlers();
      setupFullscreenHandlers();
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
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
      }, true);

      scene.addEventListener('mouseup', function(event) {
        rotationEnabled = false;
        scene.classList.remove('selection-disabled');
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRocmVlLmpzIiwicGVyc3BlY3RpdmUuanMiLCJjc3N2ci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDemdPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNzc3ZyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRmlsZTpzcmMvVGhyZWUuanNcblxuLyoqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICovXG5cbnZhciBUSFJFRSA9IHsgUkVWSVNJT046ICc3MmRldicgfTtcblxuLy8gYnJvd3NlcmlmeSBzdXBwb3J0XG5cbmlmICggdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBUSFJFRTtcblxufVxuXG4vLyBwb2x5ZmlsbHNcblxuaWYgKCBNYXRoLnNpZ24gPT09IHVuZGVmaW5lZCApIHtcblxuXHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXRoL3NpZ25cblxuXHRNYXRoLnNpZ24gPSBmdW5jdGlvbiAoIHggKSB7XG5cblx0XHRyZXR1cm4gKCB4IDwgMCApID8gLSAxIDogKCB4ID4gMCApID8gMSA6ICt4O1xuXG5cdH07XG5cbn1cblxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01vdXNlRXZlbnQuYnV0dG9uXG5cblRIUkVFLk1PVVNFID0geyBMRUZUOiAwLCBNSURETEU6IDEsIFJJR0hUOiAyIH07XG5cbi8vIEdMIFNUQVRFIENPTlNUQU5UU1xuXG5USFJFRS5DdWxsRmFjZU5vbmUgPSAwO1xuVEhSRUUuQ3VsbEZhY2VCYWNrID0gMTtcblRIUkVFLkN1bGxGYWNlRnJvbnQgPSAyO1xuVEhSRUUuQ3VsbEZhY2VGcm9udEJhY2sgPSAzO1xuXG5USFJFRS5Gcm9udEZhY2VEaXJlY3Rpb25DVyA9IDA7XG5USFJFRS5Gcm9udEZhY2VEaXJlY3Rpb25DQ1cgPSAxO1xuXG4vLyBTSEFET1dJTkcgVFlQRVNcblxuVEhSRUUuQmFzaWNTaGFkb3dNYXAgPSAwO1xuVEhSRUUuUENGU2hhZG93TWFwID0gMTtcblRIUkVFLlBDRlNvZnRTaGFkb3dNYXAgPSAyO1xuXG4vLyBNQVRFUklBTCBDT05TVEFOVFNcblxuLy8gc2lkZVxuXG5USFJFRS5Gcm9udFNpZGUgPSAwO1xuVEhSRUUuQmFja1NpZGUgPSAxO1xuVEhSRUUuRG91YmxlU2lkZSA9IDI7XG5cbi8vIHNoYWRpbmdcblxuVEhSRUUuTm9TaGFkaW5nID0gMDtcblRIUkVFLkZsYXRTaGFkaW5nID0gMTtcblRIUkVFLlNtb290aFNoYWRpbmcgPSAyO1xuXG4vLyBjb2xvcnNcblxuVEhSRUUuTm9Db2xvcnMgPSAwO1xuVEhSRUUuRmFjZUNvbG9ycyA9IDE7XG5USFJFRS5WZXJ0ZXhDb2xvcnMgPSAyO1xuXG4vLyBibGVuZGluZyBtb2Rlc1xuXG5USFJFRS5Ob0JsZW5kaW5nID0gMDtcblRIUkVFLk5vcm1hbEJsZW5kaW5nID0gMTtcblRIUkVFLkFkZGl0aXZlQmxlbmRpbmcgPSAyO1xuVEhSRUUuU3VidHJhY3RpdmVCbGVuZGluZyA9IDM7XG5USFJFRS5NdWx0aXBseUJsZW5kaW5nID0gNDtcblRIUkVFLkN1c3RvbUJsZW5kaW5nID0gNTtcblxuLy8gY3VzdG9tIGJsZW5kaW5nIGVxdWF0aW9uc1xuLy8gKG51bWJlcnMgc3RhcnQgZnJvbSAxMDAgbm90IHRvIGNsYXNoIHdpdGggb3RoZXJcbi8vICBtYXBwaW5ncyB0byBPcGVuR0wgY29uc3RhbnRzIGRlZmluZWQgaW4gVGV4dHVyZS5qcylcblxuVEhSRUUuQWRkRXF1YXRpb24gPSAxMDA7XG5USFJFRS5TdWJ0cmFjdEVxdWF0aW9uID0gMTAxO1xuVEhSRUUuUmV2ZXJzZVN1YnRyYWN0RXF1YXRpb24gPSAxMDI7XG5USFJFRS5NaW5FcXVhdGlvbiA9IDEwMztcblRIUkVFLk1heEVxdWF0aW9uID0gMTA0O1xuXG4vLyBjdXN0b20gYmxlbmRpbmcgZGVzdGluYXRpb24gZmFjdG9yc1xuXG5USFJFRS5aZXJvRmFjdG9yID0gMjAwO1xuVEhSRUUuT25lRmFjdG9yID0gMjAxO1xuVEhSRUUuU3JjQ29sb3JGYWN0b3IgPSAyMDI7XG5USFJFRS5PbmVNaW51c1NyY0NvbG9yRmFjdG9yID0gMjAzO1xuVEhSRUUuU3JjQWxwaGFGYWN0b3IgPSAyMDQ7XG5USFJFRS5PbmVNaW51c1NyY0FscGhhRmFjdG9yID0gMjA1O1xuVEhSRUUuRHN0QWxwaGFGYWN0b3IgPSAyMDY7XG5USFJFRS5PbmVNaW51c0RzdEFscGhhRmFjdG9yID0gMjA3O1xuXG4vLyBjdXN0b20gYmxlbmRpbmcgc291cmNlIGZhY3RvcnNcblxuLy9USFJFRS5aZXJvRmFjdG9yID0gMjAwO1xuLy9USFJFRS5PbmVGYWN0b3IgPSAyMDE7XG4vL1RIUkVFLlNyY0FscGhhRmFjdG9yID0gMjA0O1xuLy9USFJFRS5PbmVNaW51c1NyY0FscGhhRmFjdG9yID0gMjA1O1xuLy9USFJFRS5Ec3RBbHBoYUZhY3RvciA9IDIwNjtcbi8vVEhSRUUuT25lTWludXNEc3RBbHBoYUZhY3RvciA9IDIwNztcblRIUkVFLkRzdENvbG9yRmFjdG9yID0gMjA4O1xuVEhSRUUuT25lTWludXNEc3RDb2xvckZhY3RvciA9IDIwOTtcblRIUkVFLlNyY0FscGhhU2F0dXJhdGVGYWN0b3IgPSAyMTA7XG5cbi8vIGRlcHRoIG1vZGVzXG5cblRIUkVFLk5ldmVyRGVwdGggPSAwO1xuVEhSRUUuQWx3YXlzRGVwdGggPSAxO1xuVEhSRUUuTGVzc0RlcHRoID0gMjtcblRIUkVFLkxlc3NFcXVhbERlcHRoID0gMztcblRIUkVFLkVxdWFsRGVwdGggPSA0O1xuVEhSRUUuR3JlYXRlckVxdWFsRGVwdGggPSA1O1xuVEhSRUUuR3JlYXRlckRlcHRoID0gNjtcblRIUkVFLk5vdEVxdWFsRGVwdGggPSA3O1xuXG5cbi8vIFRFWFRVUkUgQ09OU1RBTlRTXG5cblRIUkVFLk11bHRpcGx5T3BlcmF0aW9uID0gMDtcblRIUkVFLk1peE9wZXJhdGlvbiA9IDE7XG5USFJFRS5BZGRPcGVyYXRpb24gPSAyO1xuXG4vLyBNYXBwaW5nIG1vZGVzXG5cblRIUkVFLlVWTWFwcGluZyA9IDMwMDtcblxuVEhSRUUuQ3ViZVJlZmxlY3Rpb25NYXBwaW5nID0gMzAxO1xuVEhSRUUuQ3ViZVJlZnJhY3Rpb25NYXBwaW5nID0gMzAyO1xuXG5USFJFRS5FcXVpcmVjdGFuZ3VsYXJSZWZsZWN0aW9uTWFwcGluZyA9IDMwMztcblRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZnJhY3Rpb25NYXBwaW5nID0gMzA0O1xuXG5USFJFRS5TcGhlcmljYWxSZWZsZWN0aW9uTWFwcGluZyA9IDMwNTtcblxuLy8gV3JhcHBpbmcgbW9kZXNcblxuVEhSRUUuUmVwZWF0V3JhcHBpbmcgPSAxMDAwO1xuVEhSRUUuQ2xhbXBUb0VkZ2VXcmFwcGluZyA9IDEwMDE7XG5USFJFRS5NaXJyb3JlZFJlcGVhdFdyYXBwaW5nID0gMTAwMjtcblxuLy8gRmlsdGVyc1xuXG5USFJFRS5OZWFyZXN0RmlsdGVyID0gMTAwMztcblRIUkVFLk5lYXJlc3RNaXBNYXBOZWFyZXN0RmlsdGVyID0gMTAwNDtcblRIUkVFLk5lYXJlc3RNaXBNYXBMaW5lYXJGaWx0ZXIgPSAxMDA1O1xuVEhSRUUuTGluZWFyRmlsdGVyID0gMTAwNjtcblRIUkVFLkxpbmVhck1pcE1hcE5lYXJlc3RGaWx0ZXIgPSAxMDA3O1xuVEhSRUUuTGluZWFyTWlwTWFwTGluZWFyRmlsdGVyID0gMTAwODtcblxuLy8gRGF0YSB0eXBlc1xuXG5USFJFRS5VbnNpZ25lZEJ5dGVUeXBlID0gMTAwOTtcblRIUkVFLkJ5dGVUeXBlID0gMTAxMDtcblRIUkVFLlNob3J0VHlwZSA9IDEwMTE7XG5USFJFRS5VbnNpZ25lZFNob3J0VHlwZSA9IDEwMTI7XG5USFJFRS5JbnRUeXBlID0gMTAxMztcblRIUkVFLlVuc2lnbmVkSW50VHlwZSA9IDEwMTQ7XG5USFJFRS5GbG9hdFR5cGUgPSAxMDE1O1xuVEhSRUUuSGFsZkZsb2F0VHlwZSA9IDEwMjU7XG5cbi8vIFBpeGVsIHR5cGVzXG5cbi8vVEhSRUUuVW5zaWduZWRCeXRlVHlwZSA9IDEwMDk7XG5USFJFRS5VbnNpZ25lZFNob3J0NDQ0NFR5cGUgPSAxMDE2O1xuVEhSRUUuVW5zaWduZWRTaG9ydDU1NTFUeXBlID0gMTAxNztcblRIUkVFLlVuc2lnbmVkU2hvcnQ1NjVUeXBlID0gMTAxODtcblxuLy8gUGl4ZWwgZm9ybWF0c1xuXG5USFJFRS5BbHBoYUZvcm1hdCA9IDEwMTk7XG5USFJFRS5SR0JGb3JtYXQgPSAxMDIwO1xuVEhSRUUuUkdCQUZvcm1hdCA9IDEwMjE7XG5USFJFRS5MdW1pbmFuY2VGb3JtYXQgPSAxMDIyO1xuVEhSRUUuTHVtaW5hbmNlQWxwaGFGb3JtYXQgPSAxMDIzO1xuLy8gVEhSRUUuUkdCRUZvcm1hdCBoYW5kbGVkIGFzIFRIUkVFLlJHQkFGb3JtYXQgaW4gc2hhZGVyc1xuVEhSRUUuUkdCRUZvcm1hdCA9IFRIUkVFLlJHQkFGb3JtYXQ7IC8vMTAyNDtcblxuLy8gRERTIC8gU1QzQyBDb21wcmVzc2VkIHRleHR1cmUgZm9ybWF0c1xuXG5USFJFRS5SR0JfUzNUQ19EWFQxX0Zvcm1hdCA9IDIwMDE7XG5USFJFRS5SR0JBX1MzVENfRFhUMV9Gb3JtYXQgPSAyMDAyO1xuVEhSRUUuUkdCQV9TM1RDX0RYVDNfRm9ybWF0ID0gMjAwMztcblRIUkVFLlJHQkFfUzNUQ19EWFQ1X0Zvcm1hdCA9IDIwMDQ7XG5cblxuLy8gUFZSVEMgY29tcHJlc3NlZCB0ZXh0dXJlIGZvcm1hdHNcblxuVEhSRUUuUkdCX1BWUlRDXzRCUFBWMV9Gb3JtYXQgPSAyMTAwO1xuVEhSRUUuUkdCX1BWUlRDXzJCUFBWMV9Gb3JtYXQgPSAyMTAxO1xuVEhSRUUuUkdCQV9QVlJUQ180QlBQVjFfRm9ybWF0ID0gMjEwMjtcblRIUkVFLlJHQkFfUFZSVENfMkJQUFYxX0Zvcm1hdCA9IDIxMDM7XG5cblxuLy8gREVQUkVDQVRFRFxuXG5USFJFRS5Qcm9qZWN0b3IgPSBmdW5jdGlvbiAoKSB7XG5cblx0Y29uc29sZS5lcnJvciggJ1RIUkVFLlByb2plY3RvciBoYXMgYmVlbiBtb3ZlZCB0byAvZXhhbXBsZXMvanMvcmVuZGVyZXJzL1Byb2plY3Rvci5qcy4nICk7XG5cblx0dGhpcy5wcm9qZWN0VmVjdG9yID0gZnVuY3Rpb24gKCB2ZWN0b3IsIGNhbWVyYSApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlByb2plY3RvcjogLnByb2plY3RWZWN0b3IoKSBpcyBub3cgdmVjdG9yLnByb2plY3QoKS4nICk7XG5cdFx0dmVjdG9yLnByb2plY3QoIGNhbWVyYSApO1xuXG5cdH07XG5cblx0dGhpcy51bnByb2plY3RWZWN0b3IgPSBmdW5jdGlvbiAoIHZlY3RvciwgY2FtZXJhICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuUHJvamVjdG9yOiAudW5wcm9qZWN0VmVjdG9yKCkgaXMgbm93IHZlY3Rvci51bnByb2plY3QoKS4nICk7XG5cdFx0dmVjdG9yLnVucHJvamVjdCggY2FtZXJhICk7XG5cblx0fTtcblxuXHR0aGlzLnBpY2tpbmdSYXkgPSBmdW5jdGlvbiAoIHZlY3RvciwgY2FtZXJhICkge1xuXG5cdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLlByb2plY3RvcjogLnBpY2tpbmdSYXkoKSBpcyBub3cgcmF5Y2FzdGVyLnNldEZyb21DYW1lcmEoKS4nICk7XG5cblx0fTtcblxufTtcblxuVEhSRUUuQ2FudmFzUmVuZGVyZXIgPSBmdW5jdGlvbiAoKSB7XG5cblx0Y29uc29sZS5lcnJvciggJ1RIUkVFLkNhbnZhc1JlbmRlcmVyIGhhcyBiZWVuIG1vdmVkIHRvIC9leGFtcGxlcy9qcy9yZW5kZXJlcnMvQ2FudmFzUmVuZGVyZXIuanMnICk7XG5cblx0dGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2NhbnZhcycgKTtcblx0dGhpcy5jbGVhciA9IGZ1bmN0aW9uICgpIHt9O1xuXHR0aGlzLnJlbmRlciA9IGZ1bmN0aW9uICgpIHt9O1xuXHR0aGlzLnNldENsZWFyQ29sb3IgPSBmdW5jdGlvbiAoKSB7fTtcblx0dGhpcy5zZXRTaXplID0gZnVuY3Rpb24gKCkge307XG5cbn07XG5cbi8vIEZpbGU6c3JjL21hdGgvQ29sb3IuanNcblxuLyoqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICovXG5cblRIUkVFLkNvbG9yID0gZnVuY3Rpb24gKCBjb2xvciApIHtcblxuXHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPT09IDMgKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5zZXRSR0IoIGFyZ3VtZW50c1sgMCBdLCBhcmd1bWVudHNbIDEgXSwgYXJndW1lbnRzWyAyIF0gKTtcblxuXHR9XG5cblx0cmV0dXJuIHRoaXMuc2V0KCBjb2xvciApXG5cbn07XG5cblRIUkVFLkNvbG9yLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogVEhSRUUuQ29sb3IsXG5cblx0cjogMSwgZzogMSwgYjogMSxcblxuXHRzZXQ6IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRpZiAoIHZhbHVlIGluc3RhbmNlb2YgVEhSRUUuQ29sb3IgKSB7XG5cblx0XHRcdHRoaXMuY29weSggdmFsdWUgKTtcblxuXHRcdH0gZWxzZSBpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgKSB7XG5cblx0XHRcdHRoaXMuc2V0SGV4KCB2YWx1ZSApO1xuXG5cdFx0fSBlbHNlIGlmICggdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyApIHtcblxuXHRcdFx0dGhpcy5zZXRTdHlsZSggdmFsdWUgKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0SGV4OiBmdW5jdGlvbiAoIGhleCApIHtcblxuXHRcdGhleCA9IE1hdGguZmxvb3IoIGhleCApO1xuXG5cdFx0dGhpcy5yID0gKCBoZXggPj4gMTYgJiAyNTUgKSAvIDI1NTtcblx0XHR0aGlzLmcgPSAoIGhleCA+PiA4ICYgMjU1ICkgLyAyNTU7XG5cdFx0dGhpcy5iID0gKCBoZXggJiAyNTUgKSAvIDI1NTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0UkdCOiBmdW5jdGlvbiAoIHIsIGcsIGIgKSB7XG5cblx0XHR0aGlzLnIgPSByO1xuXHRcdHRoaXMuZyA9IGc7XG5cdFx0dGhpcy5iID0gYjtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0SFNMOiBmdW5jdGlvbiAoIGgsIHMsIGwgKSB7XG5cblx0XHQvLyBoLHMsbCByYW5nZXMgYXJlIGluIDAuMCAtIDEuMFxuXG5cdFx0aWYgKCBzID09PSAwICkge1xuXG5cdFx0XHR0aGlzLnIgPSB0aGlzLmcgPSB0aGlzLmIgPSBsO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dmFyIGh1ZTJyZ2IgPSBmdW5jdGlvbiAoIHAsIHEsIHQgKSB7XG5cblx0XHRcdFx0aWYgKCB0IDwgMCApIHQgKz0gMTtcblx0XHRcdFx0aWYgKCB0ID4gMSApIHQgLT0gMTtcblx0XHRcdFx0aWYgKCB0IDwgMSAvIDYgKSByZXR1cm4gcCArICggcSAtIHAgKSAqIDYgKiB0O1xuXHRcdFx0XHRpZiAoIHQgPCAxIC8gMiApIHJldHVybiBxO1xuXHRcdFx0XHRpZiAoIHQgPCAyIC8gMyApIHJldHVybiBwICsgKCBxIC0gcCApICogNiAqICggMiAvIDMgLSB0ICk7XG5cdFx0XHRcdHJldHVybiBwO1xuXG5cdFx0XHR9O1xuXG5cdFx0XHR2YXIgcCA9IGwgPD0gMC41ID8gbCAqICggMSArIHMgKSA6IGwgKyBzIC0gKCBsICogcyApO1xuXHRcdFx0dmFyIHEgPSAoIDIgKiBsICkgLSBwO1xuXG5cdFx0XHR0aGlzLnIgPSBodWUycmdiKCBxLCBwLCBoICsgMSAvIDMgKTtcblx0XHRcdHRoaXMuZyA9IGh1ZTJyZ2IoIHEsIHAsIGggKTtcblx0XHRcdHRoaXMuYiA9IGh1ZTJyZ2IoIHEsIHAsIGggLSAxIC8gMyApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRTdHlsZTogZnVuY3Rpb24gKCBzdHlsZSApIHtcblxuXHRcdC8vIHJnYigyNTUsMCwwKVxuXG5cdFx0aWYgKCAvXnJnYlxcKChcXGQrKSwgPyhcXGQrKSwgPyhcXGQrKVxcKSQvaS50ZXN0KCBzdHlsZSApICkge1xuXG5cdFx0XHR2YXIgY29sb3IgPSAvXnJnYlxcKChcXGQrKSwgPyhcXGQrKSwgPyhcXGQrKVxcKSQvaS5leGVjKCBzdHlsZSApO1xuXG5cdFx0XHR0aGlzLnIgPSBNYXRoLm1pbiggMjU1LCBwYXJzZUludCggY29sb3JbIDEgXSwgMTAgKSApIC8gMjU1O1xuXHRcdFx0dGhpcy5nID0gTWF0aC5taW4oIDI1NSwgcGFyc2VJbnQoIGNvbG9yWyAyIF0sIDEwICkgKSAvIDI1NTtcblx0XHRcdHRoaXMuYiA9IE1hdGgubWluKCAyNTUsIHBhcnNlSW50KCBjb2xvclsgMyBdLCAxMCApICkgLyAyNTU7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fVxuXG5cdFx0Ly8gcmdiKDEwMCUsMCUsMCUpXG5cblx0XHRpZiAoIC9ecmdiXFwoKFxcZCspXFwlLCA/KFxcZCspXFwlLCA/KFxcZCspXFwlXFwpJC9pLnRlc3QoIHN0eWxlICkgKSB7XG5cblx0XHRcdHZhciBjb2xvciA9IC9ecmdiXFwoKFxcZCspXFwlLCA/KFxcZCspXFwlLCA/KFxcZCspXFwlXFwpJC9pLmV4ZWMoIHN0eWxlICk7XG5cblx0XHRcdHRoaXMuciA9IE1hdGgubWluKCAxMDAsIHBhcnNlSW50KCBjb2xvclsgMSBdLCAxMCApICkgLyAxMDA7XG5cdFx0XHR0aGlzLmcgPSBNYXRoLm1pbiggMTAwLCBwYXJzZUludCggY29sb3JbIDIgXSwgMTAgKSApIC8gMTAwO1xuXHRcdFx0dGhpcy5iID0gTWF0aC5taW4oIDEwMCwgcGFyc2VJbnQoIGNvbG9yWyAzIF0sIDEwICkgKSAvIDEwMDtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9XG5cblx0XHQvLyAjZmYwMDAwXG5cblx0XHRpZiAoIC9eXFwjKFswLTlhLWZdezZ9KSQvaS50ZXN0KCBzdHlsZSApICkge1xuXG5cdFx0XHR2YXIgY29sb3IgPSAvXlxcIyhbMC05YS1mXXs2fSkkL2kuZXhlYyggc3R5bGUgKTtcblxuXHRcdFx0dGhpcy5zZXRIZXgoIHBhcnNlSW50KCBjb2xvclsgMSBdLCAxNiApICk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fVxuXG5cdFx0Ly8gI2YwMFxuXG5cdFx0aWYgKCAvXlxcIyhbMC05YS1mXSkoWzAtOWEtZl0pKFswLTlhLWZdKSQvaS50ZXN0KCBzdHlsZSApICkge1xuXG5cdFx0XHR2YXIgY29sb3IgPSAvXlxcIyhbMC05YS1mXSkoWzAtOWEtZl0pKFswLTlhLWZdKSQvaS5leGVjKCBzdHlsZSApO1xuXG5cdFx0XHR0aGlzLnNldEhleCggcGFyc2VJbnQoIGNvbG9yWyAxIF0gKyBjb2xvclsgMSBdICsgY29sb3JbIDIgXSArIGNvbG9yWyAyIF0gKyBjb2xvclsgMyBdICsgY29sb3JbIDMgXSwgMTYgKSApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH1cblxuXHRcdC8vIHJlZFxuXG5cdFx0aWYgKCAvXihcXHcrKSQvaS50ZXN0KCBzdHlsZSApICkge1xuXG5cdFx0XHR0aGlzLnNldEhleCggVEhSRUUuQ29sb3JLZXl3b3Jkc1sgc3R5bGUgXSApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH1cblxuXG5cdH0sXG5cblx0Y29weTogZnVuY3Rpb24gKCBjb2xvciApIHtcblxuXHRcdHRoaXMuciA9IGNvbG9yLnI7XG5cdFx0dGhpcy5nID0gY29sb3IuZztcblx0XHR0aGlzLmIgPSBjb2xvci5iO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjb3B5R2FtbWFUb0xpbmVhcjogZnVuY3Rpb24gKCBjb2xvciwgZ2FtbWFGYWN0b3IgKSB7XG5cblx0XHRpZiAoIGdhbW1hRmFjdG9yID09PSB1bmRlZmluZWQgKSBnYW1tYUZhY3RvciA9IDIuMDtcblxuXHRcdHRoaXMuciA9IE1hdGgucG93KCBjb2xvci5yLCBnYW1tYUZhY3RvciApO1xuXHRcdHRoaXMuZyA9IE1hdGgucG93KCBjb2xvci5nLCBnYW1tYUZhY3RvciApO1xuXHRcdHRoaXMuYiA9IE1hdGgucG93KCBjb2xvci5iLCBnYW1tYUZhY3RvciApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjb3B5TGluZWFyVG9HYW1tYTogZnVuY3Rpb24gKCBjb2xvciwgZ2FtbWFGYWN0b3IgKSB7XG5cblx0XHRpZiAoIGdhbW1hRmFjdG9yID09PSB1bmRlZmluZWQgKSBnYW1tYUZhY3RvciA9IDIuMDtcblxuXHRcdHZhciBzYWZlSW52ZXJzZSA9ICggZ2FtbWFGYWN0b3IgPiAwICkgPyAoIDEuMCAvIGdhbW1hRmFjdG9yICkgOiAxLjA7XG5cblx0XHR0aGlzLnIgPSBNYXRoLnBvdyggY29sb3Iuciwgc2FmZUludmVyc2UgKTtcblx0XHR0aGlzLmcgPSBNYXRoLnBvdyggY29sb3IuZywgc2FmZUludmVyc2UgKTtcblx0XHR0aGlzLmIgPSBNYXRoLnBvdyggY29sb3IuYiwgc2FmZUludmVyc2UgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y29udmVydEdhbW1hVG9MaW5lYXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciByID0gdGhpcy5yLCBnID0gdGhpcy5nLCBiID0gdGhpcy5iO1xuXG5cdFx0dGhpcy5yID0gciAqIHI7XG5cdFx0dGhpcy5nID0gZyAqIGc7XG5cdFx0dGhpcy5iID0gYiAqIGI7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNvbnZlcnRMaW5lYXJUb0dhbW1hOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnIgPSBNYXRoLnNxcnQoIHRoaXMuciApO1xuXHRcdHRoaXMuZyA9IE1hdGguc3FydCggdGhpcy5nICk7XG5cdFx0dGhpcy5iID0gTWF0aC5zcXJ0KCB0aGlzLmIgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Z2V0SGV4OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gKCB0aGlzLnIgKiAyNTUgKSA8PCAxNiBeICggdGhpcy5nICogMjU1ICkgPDwgOCBeICggdGhpcy5iICogMjU1ICkgPDwgMDtcblxuXHR9LFxuXG5cdGdldEhleFN0cmluZzogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuICggJzAwMDAwMCcgKyB0aGlzLmdldEhleCgpLnRvU3RyaW5nKCAxNiApICkuc2xpY2UoIC0gNiApO1xuXG5cdH0sXG5cblx0Z2V0SFNMOiBmdW5jdGlvbiAoIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0Ly8gaCxzLGwgcmFuZ2VzIGFyZSBpbiAwLjAgLSAxLjBcblxuXHRcdHZhciBoc2wgPSBvcHRpb25hbFRhcmdldCB8fCB7IGg6IDAsIHM6IDAsIGw6IDAgfTtcblxuXHRcdHZhciByID0gdGhpcy5yLCBnID0gdGhpcy5nLCBiID0gdGhpcy5iO1xuXG5cdFx0dmFyIG1heCA9IE1hdGgubWF4KCByLCBnLCBiICk7XG5cdFx0dmFyIG1pbiA9IE1hdGgubWluKCByLCBnLCBiICk7XG5cblx0XHR2YXIgaHVlLCBzYXR1cmF0aW9uO1xuXHRcdHZhciBsaWdodG5lc3MgPSAoIG1pbiArIG1heCApIC8gMi4wO1xuXG5cdFx0aWYgKCBtaW4gPT09IG1heCApIHtcblxuXHRcdFx0aHVlID0gMDtcblx0XHRcdHNhdHVyYXRpb24gPSAwO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dmFyIGRlbHRhID0gbWF4IC0gbWluO1xuXG5cdFx0XHRzYXR1cmF0aW9uID0gbGlnaHRuZXNzIDw9IDAuNSA/IGRlbHRhIC8gKCBtYXggKyBtaW4gKSA6IGRlbHRhIC8gKCAyIC0gbWF4IC0gbWluICk7XG5cblx0XHRcdHN3aXRjaCAoIG1heCApIHtcblxuXHRcdFx0XHRjYXNlIHI6IGh1ZSA9ICggZyAtIGIgKSAvIGRlbHRhICsgKCBnIDwgYiA/IDYgOiAwICk7IGJyZWFrO1xuXHRcdFx0XHRjYXNlIGc6IGh1ZSA9ICggYiAtIHIgKSAvIGRlbHRhICsgMjsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgYjogaHVlID0gKCByIC0gZyApIC8gZGVsdGEgKyA0OyBicmVhaztcblxuXHRcdFx0fVxuXG5cdFx0XHRodWUgLz0gNjtcblxuXHRcdH1cblxuXHRcdGhzbC5oID0gaHVlO1xuXHRcdGhzbC5zID0gc2F0dXJhdGlvbjtcblx0XHRoc2wubCA9IGxpZ2h0bmVzcztcblxuXHRcdHJldHVybiBoc2w7XG5cblx0fSxcblxuXHRnZXRTdHlsZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuICdyZ2IoJyArICggKCB0aGlzLnIgKiAyNTUgKSB8IDAgKSArICcsJyArICggKCB0aGlzLmcgKiAyNTUgKSB8IDAgKSArICcsJyArICggKCB0aGlzLmIgKiAyNTUgKSB8IDAgKSArICcpJztcblxuXHR9LFxuXG5cdG9mZnNldEhTTDogZnVuY3Rpb24gKCBoLCBzLCBsICkge1xuXG5cdFx0dmFyIGhzbCA9IHRoaXMuZ2V0SFNMKCk7XG5cblx0XHRoc2wuaCArPSBoOyBoc2wucyArPSBzOyBoc2wubCArPSBsO1xuXG5cdFx0dGhpcy5zZXRIU0woIGhzbC5oLCBoc2wucywgaHNsLmwgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YWRkOiBmdW5jdGlvbiAoIGNvbG9yICkge1xuXG5cdFx0dGhpcy5yICs9IGNvbG9yLnI7XG5cdFx0dGhpcy5nICs9IGNvbG9yLmc7XG5cdFx0dGhpcy5iICs9IGNvbG9yLmI7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFkZENvbG9yczogZnVuY3Rpb24gKCBjb2xvcjEsIGNvbG9yMiApIHtcblxuXHRcdHRoaXMuciA9IGNvbG9yMS5yICsgY29sb3IyLnI7XG5cdFx0dGhpcy5nID0gY29sb3IxLmcgKyBjb2xvcjIuZztcblx0XHR0aGlzLmIgPSBjb2xvcjEuYiArIGNvbG9yMi5iO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhZGRTY2FsYXI6IGZ1bmN0aW9uICggcyApIHtcblxuXHRcdHRoaXMuciArPSBzO1xuXHRcdHRoaXMuZyArPSBzO1xuXHRcdHRoaXMuYiArPSBzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtdWx0aXBseTogZnVuY3Rpb24gKCBjb2xvciApIHtcblxuXHRcdHRoaXMuciAqPSBjb2xvci5yO1xuXHRcdHRoaXMuZyAqPSBjb2xvci5nO1xuXHRcdHRoaXMuYiAqPSBjb2xvci5iO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtdWx0aXBseVNjYWxhcjogZnVuY3Rpb24gKCBzICkge1xuXG5cdFx0dGhpcy5yICo9IHM7XG5cdFx0dGhpcy5nICo9IHM7XG5cdFx0dGhpcy5iICo9IHM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGxlcnA6IGZ1bmN0aW9uICggY29sb3IsIGFscGhhICkge1xuXG5cdFx0dGhpcy5yICs9ICggY29sb3IuciAtIHRoaXMuciApICogYWxwaGE7XG5cdFx0dGhpcy5nICs9ICggY29sb3IuZyAtIHRoaXMuZyApICogYWxwaGE7XG5cdFx0dGhpcy5iICs9ICggY29sb3IuYiAtIHRoaXMuYiApICogYWxwaGE7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVxdWFsczogZnVuY3Rpb24gKCBjICkge1xuXG5cdFx0cmV0dXJuICggYy5yID09PSB0aGlzLnIgKSAmJiAoIGMuZyA9PT0gdGhpcy5nICkgJiYgKCBjLmIgPT09IHRoaXMuYiApO1xuXG5cdH0sXG5cblx0ZnJvbUFycmF5OiBmdW5jdGlvbiAoIGFycmF5ICkge1xuXG5cdFx0dGhpcy5yID0gYXJyYXlbIDAgXTtcblx0XHR0aGlzLmcgPSBhcnJheVsgMSBdO1xuXHRcdHRoaXMuYiA9IGFycmF5WyAyIF07XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdGlmICggYXJyYXkgPT09IHVuZGVmaW5lZCApIGFycmF5ID0gW107XG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHRhcnJheVsgb2Zmc2V0IF0gPSB0aGlzLnI7XG5cdFx0YXJyYXlbIG9mZnNldCArIDEgXSA9IHRoaXMuZztcblx0XHRhcnJheVsgb2Zmc2V0ICsgMiBdID0gdGhpcy5iO1xuXG5cdFx0cmV0dXJuIGFycmF5O1xuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFRIUkVFLkNvbG9yKCkuc2V0UkdCKCB0aGlzLnIsIHRoaXMuZywgdGhpcy5iICk7XG5cblx0fVxuXG59O1xuXG5USFJFRS5Db2xvcktleXdvcmRzID0geyAnYWxpY2VibHVlJzogMHhGMEY4RkYsICdhbnRpcXVld2hpdGUnOiAweEZBRUJENywgJ2FxdWEnOiAweDAwRkZGRiwgJ2FxdWFtYXJpbmUnOiAweDdGRkZENCwgJ2F6dXJlJzogMHhGMEZGRkYsXG4nYmVpZ2UnOiAweEY1RjVEQywgJ2Jpc3F1ZSc6IDB4RkZFNEM0LCAnYmxhY2snOiAweDAwMDAwMCwgJ2JsYW5jaGVkYWxtb25kJzogMHhGRkVCQ0QsICdibHVlJzogMHgwMDAwRkYsICdibHVldmlvbGV0JzogMHg4QTJCRTIsXG4nYnJvd24nOiAweEE1MkEyQSwgJ2J1cmx5d29vZCc6IDB4REVCODg3LCAnY2FkZXRibHVlJzogMHg1RjlFQTAsICdjaGFydHJldXNlJzogMHg3RkZGMDAsICdjaG9jb2xhdGUnOiAweEQyNjkxRSwgJ2NvcmFsJzogMHhGRjdGNTAsXG4nY29ybmZsb3dlcmJsdWUnOiAweDY0OTVFRCwgJ2Nvcm5zaWxrJzogMHhGRkY4REMsICdjcmltc29uJzogMHhEQzE0M0MsICdjeWFuJzogMHgwMEZGRkYsICdkYXJrYmx1ZSc6IDB4MDAwMDhCLCAnZGFya2N5YW4nOiAweDAwOEI4QixcbidkYXJrZ29sZGVucm9kJzogMHhCODg2MEIsICdkYXJrZ3JheSc6IDB4QTlBOUE5LCAnZGFya2dyZWVuJzogMHgwMDY0MDAsICdkYXJrZ3JleSc6IDB4QTlBOUE5LCAnZGFya2toYWtpJzogMHhCREI3NkIsICdkYXJrbWFnZW50YSc6IDB4OEIwMDhCLFxuJ2RhcmtvbGl2ZWdyZWVuJzogMHg1NTZCMkYsICdkYXJrb3JhbmdlJzogMHhGRjhDMDAsICdkYXJrb3JjaGlkJzogMHg5OTMyQ0MsICdkYXJrcmVkJzogMHg4QjAwMDAsICdkYXJrc2FsbW9uJzogMHhFOTk2N0EsICdkYXJrc2VhZ3JlZW4nOiAweDhGQkM4RixcbidkYXJrc2xhdGVibHVlJzogMHg0ODNEOEIsICdkYXJrc2xhdGVncmF5JzogMHgyRjRGNEYsICdkYXJrc2xhdGVncmV5JzogMHgyRjRGNEYsICdkYXJrdHVycXVvaXNlJzogMHgwMENFRDEsICdkYXJrdmlvbGV0JzogMHg5NDAwRDMsXG4nZGVlcHBpbmsnOiAweEZGMTQ5MywgJ2RlZXBza3libHVlJzogMHgwMEJGRkYsICdkaW1ncmF5JzogMHg2OTY5NjksICdkaW1ncmV5JzogMHg2OTY5NjksICdkb2RnZXJibHVlJzogMHgxRTkwRkYsICdmaXJlYnJpY2snOiAweEIyMjIyMixcbidmbG9yYWx3aGl0ZSc6IDB4RkZGQUYwLCAnZm9yZXN0Z3JlZW4nOiAweDIyOEIyMiwgJ2Z1Y2hzaWEnOiAweEZGMDBGRiwgJ2dhaW5zYm9ybyc6IDB4RENEQ0RDLCAnZ2hvc3R3aGl0ZSc6IDB4RjhGOEZGLCAnZ29sZCc6IDB4RkZENzAwLFxuJ2dvbGRlbnJvZCc6IDB4REFBNTIwLCAnZ3JheSc6IDB4ODA4MDgwLCAnZ3JlZW4nOiAweDAwODAwMCwgJ2dyZWVueWVsbG93JzogMHhBREZGMkYsICdncmV5JzogMHg4MDgwODAsICdob25leWRldyc6IDB4RjBGRkYwLCAnaG90cGluayc6IDB4RkY2OUI0LFxuJ2luZGlhbnJlZCc6IDB4Q0Q1QzVDLCAnaW5kaWdvJzogMHg0QjAwODIsICdpdm9yeSc6IDB4RkZGRkYwLCAna2hha2knOiAweEYwRTY4QywgJ2xhdmVuZGVyJzogMHhFNkU2RkEsICdsYXZlbmRlcmJsdXNoJzogMHhGRkYwRjUsICdsYXduZ3JlZW4nOiAweDdDRkMwMCxcbidsZW1vbmNoaWZmb24nOiAweEZGRkFDRCwgJ2xpZ2h0Ymx1ZSc6IDB4QUREOEU2LCAnbGlnaHRjb3JhbCc6IDB4RjA4MDgwLCAnbGlnaHRjeWFuJzogMHhFMEZGRkYsICdsaWdodGdvbGRlbnJvZHllbGxvdyc6IDB4RkFGQUQyLCAnbGlnaHRncmF5JzogMHhEM0QzRDMsXG4nbGlnaHRncmVlbic6IDB4OTBFRTkwLCAnbGlnaHRncmV5JzogMHhEM0QzRDMsICdsaWdodHBpbmsnOiAweEZGQjZDMSwgJ2xpZ2h0c2FsbW9uJzogMHhGRkEwN0EsICdsaWdodHNlYWdyZWVuJzogMHgyMEIyQUEsICdsaWdodHNreWJsdWUnOiAweDg3Q0VGQSxcbidsaWdodHNsYXRlZ3JheSc6IDB4Nzc4ODk5LCAnbGlnaHRzbGF0ZWdyZXknOiAweDc3ODg5OSwgJ2xpZ2h0c3RlZWxibHVlJzogMHhCMEM0REUsICdsaWdodHllbGxvdyc6IDB4RkZGRkUwLCAnbGltZSc6IDB4MDBGRjAwLCAnbGltZWdyZWVuJzogMHgzMkNEMzIsXG4nbGluZW4nOiAweEZBRjBFNiwgJ21hZ2VudGEnOiAweEZGMDBGRiwgJ21hcm9vbic6IDB4ODAwMDAwLCAnbWVkaXVtYXF1YW1hcmluZSc6IDB4NjZDREFBLCAnbWVkaXVtYmx1ZSc6IDB4MDAwMENELCAnbWVkaXVtb3JjaGlkJzogMHhCQTU1RDMsXG4nbWVkaXVtcHVycGxlJzogMHg5MzcwREIsICdtZWRpdW1zZWFncmVlbic6IDB4M0NCMzcxLCAnbWVkaXVtc2xhdGVibHVlJzogMHg3QjY4RUUsICdtZWRpdW1zcHJpbmdncmVlbic6IDB4MDBGQTlBLCAnbWVkaXVtdHVycXVvaXNlJzogMHg0OEQxQ0MsXG4nbWVkaXVtdmlvbGV0cmVkJzogMHhDNzE1ODUsICdtaWRuaWdodGJsdWUnOiAweDE5MTk3MCwgJ21pbnRjcmVhbSc6IDB4RjVGRkZBLCAnbWlzdHlyb3NlJzogMHhGRkU0RTEsICdtb2NjYXNpbic6IDB4RkZFNEI1LCAnbmF2YWpvd2hpdGUnOiAweEZGREVBRCxcbiduYXZ5JzogMHgwMDAwODAsICdvbGRsYWNlJzogMHhGREY1RTYsICdvbGl2ZSc6IDB4ODA4MDAwLCAnb2xpdmVkcmFiJzogMHg2QjhFMjMsICdvcmFuZ2UnOiAweEZGQTUwMCwgJ29yYW5nZXJlZCc6IDB4RkY0NTAwLCAnb3JjaGlkJzogMHhEQTcwRDYsXG4ncGFsZWdvbGRlbnJvZCc6IDB4RUVFOEFBLCAncGFsZWdyZWVuJzogMHg5OEZCOTgsICdwYWxldHVycXVvaXNlJzogMHhBRkVFRUUsICdwYWxldmlvbGV0cmVkJzogMHhEQjcwOTMsICdwYXBheWF3aGlwJzogMHhGRkVGRDUsICdwZWFjaHB1ZmYnOiAweEZGREFCOSxcbidwZXJ1JzogMHhDRDg1M0YsICdwaW5rJzogMHhGRkMwQ0IsICdwbHVtJzogMHhEREEwREQsICdwb3dkZXJibHVlJzogMHhCMEUwRTYsICdwdXJwbGUnOiAweDgwMDA4MCwgJ3JlZCc6IDB4RkYwMDAwLCAncm9zeWJyb3duJzogMHhCQzhGOEYsXG4ncm95YWxibHVlJzogMHg0MTY5RTEsICdzYWRkbGVicm93bic6IDB4OEI0NTEzLCAnc2FsbW9uJzogMHhGQTgwNzIsICdzYW5keWJyb3duJzogMHhGNEE0NjAsICdzZWFncmVlbic6IDB4MkU4QjU3LCAnc2Vhc2hlbGwnOiAweEZGRjVFRSxcbidzaWVubmEnOiAweEEwNTIyRCwgJ3NpbHZlcic6IDB4QzBDMEMwLCAnc2t5Ymx1ZSc6IDB4ODdDRUVCLCAnc2xhdGVibHVlJzogMHg2QTVBQ0QsICdzbGF0ZWdyYXknOiAweDcwODA5MCwgJ3NsYXRlZ3JleSc6IDB4NzA4MDkwLCAnc25vdyc6IDB4RkZGQUZBLFxuJ3NwcmluZ2dyZWVuJzogMHgwMEZGN0YsICdzdGVlbGJsdWUnOiAweDQ2ODJCNCwgJ3Rhbic6IDB4RDJCNDhDLCAndGVhbCc6IDB4MDA4MDgwLCAndGhpc3RsZSc6IDB4RDhCRkQ4LCAndG9tYXRvJzogMHhGRjYzNDcsICd0dXJxdW9pc2UnOiAweDQwRTBEMCxcbid2aW9sZXQnOiAweEVFODJFRSwgJ3doZWF0JzogMHhGNURFQjMsICd3aGl0ZSc6IDB4RkZGRkZGLCAnd2hpdGVzbW9rZSc6IDB4RjVGNUY1LCAneWVsbG93JzogMHhGRkZGMDAsICd5ZWxsb3dncmVlbic6IDB4OUFDRDMyIH07XG5cbi8vIEZpbGU6c3JjL21hdGgvUXVhdGVybmlvbi5qc1xuXG4vKipcbiAqIEBhdXRob3IgbWlrYWVsIGVtdGluZ2VyIC8gaHR0cDovL2dvbW8uc2UvXG4gKiBAYXV0aG9yIGFsdGVyZWRxIC8gaHR0cDovL2FsdGVyZWRxdWFsaWEuY29tL1xuICogQGF1dGhvciBXZXN0TGFuZ2xleSAvIGh0dHA6Ly9naXRodWIuY29tL1dlc3RMYW5nbGV5XG4gKiBAYXV0aG9yIGJob3VzdG9uIC8gaHR0cDovL2V4b2NvcnRleC5jb21cbiAqL1xuXG5USFJFRS5RdWF0ZXJuaW9uID0gZnVuY3Rpb24gKCB4LCB5LCB6LCB3ICkge1xuXG5cdHRoaXMuX3ggPSB4IHx8IDA7XG5cdHRoaXMuX3kgPSB5IHx8IDA7XG5cdHRoaXMuX3ogPSB6IHx8IDA7XG5cdHRoaXMuX3cgPSAoIHcgIT09IHVuZGVmaW5lZCApID8gdyA6IDE7XG5cbn07XG5cblRIUkVFLlF1YXRlcm5pb24ucHJvdG90eXBlID0ge1xuXG5cdGNvbnN0cnVjdG9yOiBUSFJFRS5RdWF0ZXJuaW9uLFxuXG5cdF94OiAwLF95OiAwLCBfejogMCwgX3c6IDAsXG5cblx0Z2V0IHggKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX3g7XG5cblx0fSxcblxuXHRzZXQgeCAoIHZhbHVlICkge1xuXG5cdFx0dGhpcy5feCA9IHZhbHVlO1xuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdH0sXG5cblx0Z2V0IHkgKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX3k7XG5cblx0fSxcblxuXHRzZXQgeSAoIHZhbHVlICkge1xuXG5cdFx0dGhpcy5feSA9IHZhbHVlO1xuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdH0sXG5cblx0Z2V0IHogKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX3o7XG5cblx0fSxcblxuXHRzZXQgeiAoIHZhbHVlICkge1xuXG5cdFx0dGhpcy5feiA9IHZhbHVlO1xuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdH0sXG5cblx0Z2V0IHcgKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX3c7XG5cblx0fSxcblxuXHRzZXQgdyAoIHZhbHVlICkge1xuXG5cdFx0dGhpcy5fdyA9IHZhbHVlO1xuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdH0sXG5cblx0c2V0OiBmdW5jdGlvbiAoIHgsIHksIHosIHcgKSB7XG5cblx0XHR0aGlzLl94ID0geDtcblx0XHR0aGlzLl95ID0geTtcblx0XHR0aGlzLl96ID0gejtcblx0XHR0aGlzLl93ID0gdztcblxuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjb3B5OiBmdW5jdGlvbiAoIHF1YXRlcm5pb24gKSB7XG5cblx0XHR0aGlzLl94ID0gcXVhdGVybmlvbi54O1xuXHRcdHRoaXMuX3kgPSBxdWF0ZXJuaW9uLnk7XG5cdFx0dGhpcy5feiA9IHF1YXRlcm5pb24uejtcblx0XHR0aGlzLl93ID0gcXVhdGVybmlvbi53O1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldEZyb21FdWxlcjogZnVuY3Rpb24gKCBldWxlciwgdXBkYXRlICkge1xuXG5cdFx0aWYgKCBldWxlciBpbnN0YW5jZW9mIFRIUkVFLkV1bGVyID09PSBmYWxzZSApIHtcblxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCAnVEhSRUUuUXVhdGVybmlvbjogLnNldEZyb21FdWxlcigpIG5vdyBleHBlY3RzIGEgRXVsZXIgcm90YXRpb24gcmF0aGVyIHRoYW4gYSBWZWN0b3IzIGFuZCBvcmRlci4nICk7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cDovL3d3dy5tYXRod29ya3MuY29tL21hdGxhYmNlbnRyYWwvZmlsZWV4Y2hhbmdlL1xuXHRcdC8vIFx0MjA2OTYtZnVuY3Rpb24tdG8tY29udmVydC1iZXR3ZWVuLWRjbS1ldWxlci1hbmdsZXMtcXVhdGVybmlvbnMtYW5kLWV1bGVyLXZlY3RvcnMvXG5cdFx0Ly9cdGNvbnRlbnQvU3BpbkNhbGMubVxuXG5cdFx0dmFyIGMxID0gTWF0aC5jb3MoIGV1bGVyLl94IC8gMiApO1xuXHRcdHZhciBjMiA9IE1hdGguY29zKCBldWxlci5feSAvIDIgKTtcblx0XHR2YXIgYzMgPSBNYXRoLmNvcyggZXVsZXIuX3ogLyAyICk7XG5cdFx0dmFyIHMxID0gTWF0aC5zaW4oIGV1bGVyLl94IC8gMiApO1xuXHRcdHZhciBzMiA9IE1hdGguc2luKCBldWxlci5feSAvIDIgKTtcblx0XHR2YXIgczMgPSBNYXRoLnNpbiggZXVsZXIuX3ogLyAyICk7XG5cblx0XHRpZiAoIGV1bGVyLm9yZGVyID09PSAnWFlaJyApIHtcblxuXHRcdFx0dGhpcy5feCA9IHMxICogYzIgKiBjMyArIGMxICogczIgKiBzMztcblx0XHRcdHRoaXMuX3kgPSBjMSAqIHMyICogYzMgLSBzMSAqIGMyICogczM7XG5cdFx0XHR0aGlzLl96ID0gYzEgKiBjMiAqIHMzICsgczEgKiBzMiAqIGMzO1xuXHRcdFx0dGhpcy5fdyA9IGMxICogYzIgKiBjMyAtIHMxICogczIgKiBzMztcblxuXHRcdH0gZWxzZSBpZiAoIGV1bGVyLm9yZGVyID09PSAnWVhaJyApIHtcblxuXHRcdFx0dGhpcy5feCA9IHMxICogYzIgKiBjMyArIGMxICogczIgKiBzMztcblx0XHRcdHRoaXMuX3kgPSBjMSAqIHMyICogYzMgLSBzMSAqIGMyICogczM7XG5cdFx0XHR0aGlzLl96ID0gYzEgKiBjMiAqIHMzIC0gczEgKiBzMiAqIGMzO1xuXHRcdFx0dGhpcy5fdyA9IGMxICogYzIgKiBjMyArIHMxICogczIgKiBzMztcblxuXHRcdH0gZWxzZSBpZiAoIGV1bGVyLm9yZGVyID09PSAnWlhZJyApIHtcblxuXHRcdFx0dGhpcy5feCA9IHMxICogYzIgKiBjMyAtIGMxICogczIgKiBzMztcblx0XHRcdHRoaXMuX3kgPSBjMSAqIHMyICogYzMgKyBzMSAqIGMyICogczM7XG5cdFx0XHR0aGlzLl96ID0gYzEgKiBjMiAqIHMzICsgczEgKiBzMiAqIGMzO1xuXHRcdFx0dGhpcy5fdyA9IGMxICogYzIgKiBjMyAtIHMxICogczIgKiBzMztcblxuXHRcdH0gZWxzZSBpZiAoIGV1bGVyLm9yZGVyID09PSAnWllYJyApIHtcblxuXHRcdFx0dGhpcy5feCA9IHMxICogYzIgKiBjMyAtIGMxICogczIgKiBzMztcblx0XHRcdHRoaXMuX3kgPSBjMSAqIHMyICogYzMgKyBzMSAqIGMyICogczM7XG5cdFx0XHR0aGlzLl96ID0gYzEgKiBjMiAqIHMzIC0gczEgKiBzMiAqIGMzO1xuXHRcdFx0dGhpcy5fdyA9IGMxICogYzIgKiBjMyArIHMxICogczIgKiBzMztcblxuXHRcdH0gZWxzZSBpZiAoIGV1bGVyLm9yZGVyID09PSAnWVpYJyApIHtcblxuXHRcdFx0dGhpcy5feCA9IHMxICogYzIgKiBjMyArIGMxICogczIgKiBzMztcblx0XHRcdHRoaXMuX3kgPSBjMSAqIHMyICogYzMgKyBzMSAqIGMyICogczM7XG5cdFx0XHR0aGlzLl96ID0gYzEgKiBjMiAqIHMzIC0gczEgKiBzMiAqIGMzO1xuXHRcdFx0dGhpcy5fdyA9IGMxICogYzIgKiBjMyAtIHMxICogczIgKiBzMztcblxuXHRcdH0gZWxzZSBpZiAoIGV1bGVyLm9yZGVyID09PSAnWFpZJyApIHtcblxuXHRcdFx0dGhpcy5feCA9IHMxICogYzIgKiBjMyAtIGMxICogczIgKiBzMztcblx0XHRcdHRoaXMuX3kgPSBjMSAqIHMyICogYzMgLSBzMSAqIGMyICogczM7XG5cdFx0XHR0aGlzLl96ID0gYzEgKiBjMiAqIHMzICsgczEgKiBzMiAqIGMzO1xuXHRcdFx0dGhpcy5fdyA9IGMxICogYzIgKiBjMyArIHMxICogczIgKiBzMztcblxuXHRcdH1cblxuXHRcdGlmICggdXBkYXRlICE9PSBmYWxzZSApIHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRGcm9tQXhpc0FuZ2xlOiBmdW5jdGlvbiAoIGF4aXMsIGFuZ2xlICkge1xuXG5cdFx0Ly8gaHR0cDovL3d3dy5ldWNsaWRlYW5zcGFjZS5jb20vbWF0aHMvZ2VvbWV0cnkvcm90YXRpb25zL2NvbnZlcnNpb25zL2FuZ2xlVG9RdWF0ZXJuaW9uL2luZGV4Lmh0bVxuXG5cdFx0Ly8gYXNzdW1lcyBheGlzIGlzIG5vcm1hbGl6ZWRcblxuXHRcdHZhciBoYWxmQW5nbGUgPSBhbmdsZSAvIDIsIHMgPSBNYXRoLnNpbiggaGFsZkFuZ2xlICk7XG5cblx0XHR0aGlzLl94ID0gYXhpcy54ICogcztcblx0XHR0aGlzLl95ID0gYXhpcy55ICogcztcblx0XHR0aGlzLl96ID0gYXhpcy56ICogcztcblx0XHR0aGlzLl93ID0gTWF0aC5jb3MoIGhhbGZBbmdsZSApO1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldEZyb21Sb3RhdGlvbk1hdHJpeDogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0Ly8gaHR0cDovL3d3dy5ldWNsaWRlYW5zcGFjZS5jb20vbWF0aHMvZ2VvbWV0cnkvcm90YXRpb25zL2NvbnZlcnNpb25zL21hdHJpeFRvUXVhdGVybmlvbi9pbmRleC5odG1cblxuXHRcdC8vIGFzc3VtZXMgdGhlIHVwcGVyIDN4MyBvZiBtIGlzIGEgcHVyZSByb3RhdGlvbiBtYXRyaXggKGkuZSwgdW5zY2FsZWQpXG5cblx0XHR2YXIgdGUgPSBtLmVsZW1lbnRzLFxuXG5cdFx0XHRtMTEgPSB0ZVsgMCBdLCBtMTIgPSB0ZVsgNCBdLCBtMTMgPSB0ZVsgOCBdLFxuXHRcdFx0bTIxID0gdGVbIDEgXSwgbTIyID0gdGVbIDUgXSwgbTIzID0gdGVbIDkgXSxcblx0XHRcdG0zMSA9IHRlWyAyIF0sIG0zMiA9IHRlWyA2IF0sIG0zMyA9IHRlWyAxMCBdLFxuXG5cdFx0XHR0cmFjZSA9IG0xMSArIG0yMiArIG0zMyxcblx0XHRcdHM7XG5cblx0XHRpZiAoIHRyYWNlID4gMCApIHtcblxuXHRcdFx0cyA9IDAuNSAvIE1hdGguc3FydCggdHJhY2UgKyAxLjAgKTtcblxuXHRcdFx0dGhpcy5fdyA9IDAuMjUgLyBzO1xuXHRcdFx0dGhpcy5feCA9ICggbTMyIC0gbTIzICkgKiBzO1xuXHRcdFx0dGhpcy5feSA9ICggbTEzIC0gbTMxICkgKiBzO1xuXHRcdFx0dGhpcy5feiA9ICggbTIxIC0gbTEyICkgKiBzO1xuXG5cdFx0fSBlbHNlIGlmICggbTExID4gbTIyICYmIG0xMSA+IG0zMyApIHtcblxuXHRcdFx0cyA9IDIuMCAqIE1hdGguc3FydCggMS4wICsgbTExIC0gbTIyIC0gbTMzICk7XG5cblx0XHRcdHRoaXMuX3cgPSAoIG0zMiAtIG0yMyApIC8gcztcblx0XHRcdHRoaXMuX3ggPSAwLjI1ICogcztcblx0XHRcdHRoaXMuX3kgPSAoIG0xMiArIG0yMSApIC8gcztcblx0XHRcdHRoaXMuX3ogPSAoIG0xMyArIG0zMSApIC8gcztcblxuXHRcdH0gZWxzZSBpZiAoIG0yMiA+IG0zMyApIHtcblxuXHRcdFx0cyA9IDIuMCAqIE1hdGguc3FydCggMS4wICsgbTIyIC0gbTExIC0gbTMzICk7XG5cblx0XHRcdHRoaXMuX3cgPSAoIG0xMyAtIG0zMSApIC8gcztcblx0XHRcdHRoaXMuX3ggPSAoIG0xMiArIG0yMSApIC8gcztcblx0XHRcdHRoaXMuX3kgPSAwLjI1ICogcztcblx0XHRcdHRoaXMuX3ogPSAoIG0yMyArIG0zMiApIC8gcztcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHMgPSAyLjAgKiBNYXRoLnNxcnQoIDEuMCArIG0zMyAtIG0xMSAtIG0yMiApO1xuXG5cdFx0XHR0aGlzLl93ID0gKCBtMjEgLSBtMTIgKSAvIHM7XG5cdFx0XHR0aGlzLl94ID0gKCBtMTMgKyBtMzEgKSAvIHM7XG5cdFx0XHR0aGlzLl95ID0gKCBtMjMgKyBtMzIgKSAvIHM7XG5cdFx0XHR0aGlzLl96ID0gMC4yNSAqIHM7XG5cblx0XHR9XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbVVuaXRWZWN0b3JzOiBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBodHRwOi8vbG9sZW5naW5lLm5ldC9ibG9nLzIwMTQvMDIvMjQvcXVhdGVybmlvbi1mcm9tLXR3by12ZWN0b3JzLWZpbmFsXG5cblx0XHQvLyBhc3N1bWVzIGRpcmVjdGlvbiB2ZWN0b3JzIHZGcm9tIGFuZCB2VG8gYXJlIG5vcm1hbGl6ZWRcblxuXHRcdHZhciB2MSwgcjtcblxuXHRcdHZhciBFUFMgPSAwLjAwMDAwMTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHZGcm9tLCB2VG8gKSB7XG5cblx0XHRcdGlmICggdjEgPT09IHVuZGVmaW5lZCApIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdFx0ciA9IHZGcm9tLmRvdCggdlRvICkgKyAxO1xuXG5cdFx0XHRpZiAoIHIgPCBFUFMgKSB7XG5cblx0XHRcdFx0ciA9IDA7XG5cblx0XHRcdFx0aWYgKCBNYXRoLmFicyggdkZyb20ueCApID4gTWF0aC5hYnMoIHZGcm9tLnogKSApIHtcblxuXHRcdFx0XHRcdHYxLnNldCggLSB2RnJvbS55LCB2RnJvbS54LCAwICk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdHYxLnNldCggMCwgLSB2RnJvbS56LCB2RnJvbS55ICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHYxLmNyb3NzVmVjdG9ycyggdkZyb20sIHZUbyApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3ggPSB2MS54O1xuXHRcdFx0dGhpcy5feSA9IHYxLnk7XG5cdFx0XHR0aGlzLl96ID0gdjEuejtcblx0XHRcdHRoaXMuX3cgPSByO1xuXG5cdFx0XHR0aGlzLm5vcm1hbGl6ZSgpO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH1cblxuXHR9KCksXG5cblx0aW52ZXJzZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5jb25qdWdhdGUoKS5ub3JtYWxpemUoKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y29uanVnYXRlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLl94ICo9IC0gMTtcblx0XHR0aGlzLl95ICo9IC0gMTtcblx0XHR0aGlzLl96ICo9IC0gMTtcblxuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRkb3Q6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHJldHVybiB0aGlzLl94ICogdi5feCArIHRoaXMuX3kgKiB2Ll95ICsgdGhpcy5feiAqIHYuX3ogKyB0aGlzLl93ICogdi5fdztcblxuXHR9LFxuXG5cdGxlbmd0aFNxOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5feCAqIHRoaXMuX3ggKyB0aGlzLl95ICogdGhpcy5feSArIHRoaXMuX3ogKiB0aGlzLl96ICsgdGhpcy5fdyAqIHRoaXMuX3c7XG5cblx0fSxcblxuXHRsZW5ndGg6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBNYXRoLnNxcnQoIHRoaXMuX3ggKiB0aGlzLl94ICsgdGhpcy5feSAqIHRoaXMuX3kgKyB0aGlzLl96ICogdGhpcy5feiArIHRoaXMuX3cgKiB0aGlzLl93ICk7XG5cblx0fSxcblxuXHRub3JtYWxpemU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBsID0gdGhpcy5sZW5ndGgoKTtcblxuXHRcdGlmICggbCA9PT0gMCApIHtcblxuXHRcdFx0dGhpcy5feCA9IDA7XG5cdFx0XHR0aGlzLl95ID0gMDtcblx0XHRcdHRoaXMuX3ogPSAwO1xuXHRcdFx0dGhpcy5fdyA9IDE7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRsID0gMSAvIGw7XG5cblx0XHRcdHRoaXMuX3ggPSB0aGlzLl94ICogbDtcblx0XHRcdHRoaXMuX3kgPSB0aGlzLl95ICogbDtcblx0XHRcdHRoaXMuX3ogPSB0aGlzLl96ICogbDtcblx0XHRcdHRoaXMuX3cgPSB0aGlzLl93ICogbDtcblxuXHRcdH1cblxuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtdWx0aXBseTogZnVuY3Rpb24gKCBxLCBwICkge1xuXG5cdFx0aWYgKCBwICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlF1YXRlcm5pb246IC5tdWx0aXBseSgpIG5vdyBvbmx5IGFjY2VwdHMgb25lIGFyZ3VtZW50LiBVc2UgLm11bHRpcGx5UXVhdGVybmlvbnMoIGEsIGIgKSBpbnN0ZWFkLicgKTtcblx0XHRcdHJldHVybiB0aGlzLm11bHRpcGx5UXVhdGVybmlvbnMoIHEsIHAgKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLm11bHRpcGx5UXVhdGVybmlvbnMoIHRoaXMsIHEgKTtcblxuXHR9LFxuXG5cdG11bHRpcGx5UXVhdGVybmlvbnM6IGZ1bmN0aW9uICggYSwgYiApIHtcblxuXHRcdC8vIGZyb20gaHR0cDovL3d3dy5ldWNsaWRlYW5zcGFjZS5jb20vbWF0aHMvYWxnZWJyYS9yZWFsTm9ybWVkQWxnZWJyYS9xdWF0ZXJuaW9ucy9jb2RlL2luZGV4Lmh0bVxuXG5cdFx0dmFyIHFheCA9IGEuX3gsIHFheSA9IGEuX3ksIHFheiA9IGEuX3osIHFhdyA9IGEuX3c7XG5cdFx0dmFyIHFieCA9IGIuX3gsIHFieSA9IGIuX3ksIHFieiA9IGIuX3osIHFidyA9IGIuX3c7XG5cblx0XHR0aGlzLl94ID0gcWF4ICogcWJ3ICsgcWF3ICogcWJ4ICsgcWF5ICogcWJ6IC0gcWF6ICogcWJ5O1xuXHRcdHRoaXMuX3kgPSBxYXkgKiBxYncgKyBxYXcgKiBxYnkgKyBxYXogKiBxYnggLSBxYXggKiBxYno7XG5cdFx0dGhpcy5feiA9IHFheiAqIHFidyArIHFhdyAqIHFieiArIHFheCAqIHFieSAtIHFheSAqIHFieDtcblx0XHR0aGlzLl93ID0gcWF3ICogcWJ3IC0gcWF4ICogcWJ4IC0gcWF5ICogcWJ5IC0gcWF6ICogcWJ6O1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5VmVjdG9yMzogZnVuY3Rpb24gKCB2ZWN0b3IgKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5RdWF0ZXJuaW9uOiAubXVsdGlwbHlWZWN0b3IzKCkgaGFzIGJlZW4gcmVtb3ZlZC4gVXNlIGlzIG5vdyB2ZWN0b3IuYXBwbHlRdWF0ZXJuaW9uKCBxdWF0ZXJuaW9uICkgaW5zdGVhZC4nICk7XG5cdFx0cmV0dXJuIHZlY3Rvci5hcHBseVF1YXRlcm5pb24oIHRoaXMgKTtcblxuXHR9LFxuXG5cdHNsZXJwOiBmdW5jdGlvbiAoIHFiLCB0ICkge1xuXG5cdFx0aWYgKCB0ID09PSAwICkgcmV0dXJuIHRoaXM7XG5cdFx0aWYgKCB0ID09PSAxICkgcmV0dXJuIHRoaXMuY29weSggcWIgKTtcblxuXHRcdHZhciB4ID0gdGhpcy5feCwgeSA9IHRoaXMuX3ksIHogPSB0aGlzLl96LCB3ID0gdGhpcy5fdztcblxuXHRcdC8vIGh0dHA6Ly93d3cuZXVjbGlkZWFuc3BhY2UuY29tL21hdGhzL2FsZ2VicmEvcmVhbE5vcm1lZEFsZ2VicmEvcXVhdGVybmlvbnMvc2xlcnAvXG5cblx0XHR2YXIgY29zSGFsZlRoZXRhID0gdyAqIHFiLl93ICsgeCAqIHFiLl94ICsgeSAqIHFiLl95ICsgeiAqIHFiLl96O1xuXG5cdFx0aWYgKCBjb3NIYWxmVGhldGEgPCAwICkge1xuXG5cdFx0XHR0aGlzLl93ID0gLSBxYi5fdztcblx0XHRcdHRoaXMuX3ggPSAtIHFiLl94O1xuXHRcdFx0dGhpcy5feSA9IC0gcWIuX3k7XG5cdFx0XHR0aGlzLl96ID0gLSBxYi5fejtcblxuXHRcdFx0Y29zSGFsZlRoZXRhID0gLSBjb3NIYWxmVGhldGE7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLmNvcHkoIHFiICk7XG5cblx0XHR9XG5cblx0XHRpZiAoIGNvc0hhbGZUaGV0YSA+PSAxLjAgKSB7XG5cblx0XHRcdHRoaXMuX3cgPSB3O1xuXHRcdFx0dGhpcy5feCA9IHg7XG5cdFx0XHR0aGlzLl95ID0geTtcblx0XHRcdHRoaXMuX3ogPSB6O1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH1cblxuXHRcdHZhciBoYWxmVGhldGEgPSBNYXRoLmFjb3MoIGNvc0hhbGZUaGV0YSApO1xuXHRcdHZhciBzaW5IYWxmVGhldGEgPSBNYXRoLnNxcnQoIDEuMCAtIGNvc0hhbGZUaGV0YSAqIGNvc0hhbGZUaGV0YSApO1xuXG5cdFx0aWYgKCBNYXRoLmFicyggc2luSGFsZlRoZXRhICkgPCAwLjAwMSApIHtcblxuXHRcdFx0dGhpcy5fdyA9IDAuNSAqICggdyArIHRoaXMuX3cgKTtcblx0XHRcdHRoaXMuX3ggPSAwLjUgKiAoIHggKyB0aGlzLl94ICk7XG5cdFx0XHR0aGlzLl95ID0gMC41ICogKCB5ICsgdGhpcy5feSApO1xuXHRcdFx0dGhpcy5feiA9IDAuNSAqICggeiArIHRoaXMuX3ogKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9XG5cblx0XHR2YXIgcmF0aW9BID0gTWF0aC5zaW4oICggMSAtIHQgKSAqIGhhbGZUaGV0YSApIC8gc2luSGFsZlRoZXRhLFxuXHRcdHJhdGlvQiA9IE1hdGguc2luKCB0ICogaGFsZlRoZXRhICkgLyBzaW5IYWxmVGhldGE7XG5cblx0XHR0aGlzLl93ID0gKCB3ICogcmF0aW9BICsgdGhpcy5fdyAqIHJhdGlvQiApO1xuXHRcdHRoaXMuX3ggPSAoIHggKiByYXRpb0EgKyB0aGlzLl94ICogcmF0aW9CICk7XG5cdFx0dGhpcy5feSA9ICggeSAqIHJhdGlvQSArIHRoaXMuX3kgKiByYXRpb0IgKTtcblx0XHR0aGlzLl96ID0gKCB6ICogcmF0aW9BICsgdGhpcy5feiAqIHJhdGlvQiApO1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVxdWFsczogZnVuY3Rpb24gKCBxdWF0ZXJuaW9uICkge1xuXG5cdFx0cmV0dXJuICggcXVhdGVybmlvbi5feCA9PT0gdGhpcy5feCApICYmICggcXVhdGVybmlvbi5feSA9PT0gdGhpcy5feSApICYmICggcXVhdGVybmlvbi5feiA9PT0gdGhpcy5feiApICYmICggcXVhdGVybmlvbi5fdyA9PT0gdGhpcy5fdyApO1xuXG5cdH0sXG5cblx0ZnJvbUFycmF5OiBmdW5jdGlvbiAoIGFycmF5LCBvZmZzZXQgKSB7XG5cblx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblxuXHRcdHRoaXMuX3ggPSBhcnJheVsgb2Zmc2V0IF07XG5cdFx0dGhpcy5feSA9IGFycmF5WyBvZmZzZXQgKyAxIF07XG5cdFx0dGhpcy5feiA9IGFycmF5WyBvZmZzZXQgKyAyIF07XG5cdFx0dGhpcy5fdyA9IGFycmF5WyBvZmZzZXQgKyAzIF07XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dG9BcnJheTogZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0ICkge1xuXG5cdFx0aWYgKCBhcnJheSA9PT0gdW5kZWZpbmVkICkgYXJyYXkgPSBbXTtcblx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblxuXHRcdGFycmF5WyBvZmZzZXQgXSA9IHRoaXMuX3g7XG5cdFx0YXJyYXlbIG9mZnNldCArIDEgXSA9IHRoaXMuX3k7XG5cdFx0YXJyYXlbIG9mZnNldCArIDIgXSA9IHRoaXMuX3o7XG5cdFx0YXJyYXlbIG9mZnNldCArIDMgXSA9IHRoaXMuX3c7XG5cblx0XHRyZXR1cm4gYXJyYXk7XG5cblx0fSxcblxuXHRvbkNoYW5nZTogZnVuY3Rpb24gKCBjYWxsYmFjayApIHtcblxuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGNhbGxiYWNrO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvbkNoYW5nZUNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7fSxcblxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLl96LCB0aGlzLl93ICk7XG5cblx0fVxuXG59O1xuXG5USFJFRS5RdWF0ZXJuaW9uLnNsZXJwID0gZnVuY3Rpb24gKCBxYSwgcWIsIHFtLCB0ICkge1xuXG5cdHJldHVybiBxbS5jb3B5KCBxYSApLnNsZXJwKCBxYiwgdCApO1xuXG59O1xuXG4vLyBGaWxlOnNyYy9tYXRoL1ZlY3RvcjIuanNcblxuLyoqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICogQGF1dGhvciBwaGlsb2diIC8gaHR0cDovL2Jsb2cudGhlaml0Lm9yZy9cbiAqIEBhdXRob3IgZWdyYWV0aGVyIC8gaHR0cDovL2VncmFldGhlci5jb20vXG4gKiBAYXV0aG9yIHp6ODUgLyBodHRwOi8vd3d3LmxhYjRnYW1lcy5uZXQveno4NS9ibG9nXG4gKi9cblxuVEhSRUUuVmVjdG9yMiA9IGZ1bmN0aW9uICggeCwgeSApIHtcblxuXHR0aGlzLnggPSB4IHx8IDA7XG5cdHRoaXMueSA9IHkgfHwgMDtcblxufTtcblxuVEhSRUUuVmVjdG9yMi5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IFRIUkVFLlZlY3RvcjIsXG5cblx0c2V0OiBmdW5jdGlvbiAoIHgsIHkgKSB7XG5cblx0XHR0aGlzLnggPSB4O1xuXHRcdHRoaXMueSA9IHk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldFg6IGZ1bmN0aW9uICggeCApIHtcblxuXHRcdHRoaXMueCA9IHg7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldFk6IGZ1bmN0aW9uICggeSApIHtcblxuXHRcdHRoaXMueSA9IHk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldENvbXBvbmVudDogZnVuY3Rpb24gKCBpbmRleCwgdmFsdWUgKSB7XG5cblx0XHRzd2l0Y2ggKCBpbmRleCApIHtcblxuXHRcdFx0Y2FzZSAwOiB0aGlzLnggPSB2YWx1ZTsgYnJlYWs7XG5cdFx0XHRjYXNlIDE6IHRoaXMueSA9IHZhbHVlOyBicmVhaztcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvciggJ2luZGV4IGlzIG91dCBvZiByYW5nZTogJyArIGluZGV4ICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRnZXRDb21wb25lbnQ6IGZ1bmN0aW9uICggaW5kZXggKSB7XG5cblx0XHRzd2l0Y2ggKCBpbmRleCApIHtcblxuXHRcdFx0Y2FzZSAwOiByZXR1cm4gdGhpcy54O1xuXHRcdFx0Y2FzZSAxOiByZXR1cm4gdGhpcy55O1xuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCAnaW5kZXggaXMgb3V0IG9mIHJhbmdlOiAnICsgaW5kZXggKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdGNvcHk6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHRoaXMueCA9IHYueDtcblx0XHR0aGlzLnkgPSB2Lnk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFkZDogZnVuY3Rpb24gKCB2LCB3ICkge1xuXG5cdFx0aWYgKCB3ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZlY3RvcjI6IC5hZGQoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5hZGRWZWN0b3JzKCBhLCBiICkgaW5zdGVhZC4nICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5hZGRWZWN0b3JzKCB2LCB3ICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnggKz0gdi54O1xuXHRcdHRoaXMueSArPSB2Lnk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFkZFNjYWxhcjogZnVuY3Rpb24gKCBzICkge1xuXG5cdFx0dGhpcy54ICs9IHM7XG5cdFx0dGhpcy55ICs9IHM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFkZFZlY3RvcnM6IGZ1bmN0aW9uICggYSwgYiApIHtcblxuXHRcdHRoaXMueCA9IGEueCArIGIueDtcblx0XHR0aGlzLnkgPSBhLnkgKyBiLnk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN1YjogZnVuY3Rpb24gKCB2LCB3ICkge1xuXG5cdFx0aWYgKCB3ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZlY3RvcjI6IC5zdWIoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5zdWJWZWN0b3JzKCBhLCBiICkgaW5zdGVhZC4nICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5zdWJWZWN0b3JzKCB2LCB3ICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnggLT0gdi54O1xuXHRcdHRoaXMueSAtPSB2Lnk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN1YlNjYWxhcjogZnVuY3Rpb24gKCBzICkge1xuXG5cdFx0dGhpcy54IC09IHM7XG5cdFx0dGhpcy55IC09IHM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN1YlZlY3RvcnM6IGZ1bmN0aW9uICggYSwgYiApIHtcblxuXHRcdHRoaXMueCA9IGEueCAtIGIueDtcblx0XHR0aGlzLnkgPSBhLnkgLSBiLnk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5OiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHR0aGlzLnggKj0gdi54O1xuXHRcdHRoaXMueSAqPSB2Lnk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5U2NhbGFyOiBmdW5jdGlvbiAoIHMgKSB7XG5cblx0XHR0aGlzLnggKj0gcztcblx0XHR0aGlzLnkgKj0gcztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZGl2aWRlOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHR0aGlzLnggLz0gdi54O1xuXHRcdHRoaXMueSAvPSB2Lnk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGRpdmlkZVNjYWxhcjogZnVuY3Rpb24gKCBzY2FsYXIgKSB7XG5cblx0XHRpZiAoIHNjYWxhciAhPT0gMCApIHtcblxuXHRcdFx0dmFyIGludlNjYWxhciA9IDEgLyBzY2FsYXI7XG5cblx0XHRcdHRoaXMueCAqPSBpbnZTY2FsYXI7XG5cdFx0XHR0aGlzLnkgKj0gaW52U2NhbGFyO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy54ID0gMDtcblx0XHRcdHRoaXMueSA9IDA7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1pbjogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0aWYgKCB0aGlzLnggPiB2LnggKSB7XG5cblx0XHRcdHRoaXMueCA9IHYueDtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy55ID4gdi55ICkge1xuXG5cdFx0XHR0aGlzLnkgPSB2Lnk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1heDogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0aWYgKCB0aGlzLnggPCB2LnggKSB7XG5cblx0XHRcdHRoaXMueCA9IHYueDtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy55IDwgdi55ICkge1xuXG5cdFx0XHR0aGlzLnkgPSB2Lnk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNsYW1wOiBmdW5jdGlvbiAoIG1pbiwgbWF4ICkge1xuXG5cdFx0Ly8gVGhpcyBmdW5jdGlvbiBhc3N1bWVzIG1pbiA8IG1heCwgaWYgdGhpcyBhc3N1bXB0aW9uIGlzbid0IHRydWUgaXQgd2lsbCBub3Qgb3BlcmF0ZSBjb3JyZWN0bHlcblxuXHRcdGlmICggdGhpcy54IDwgbWluLnggKSB7XG5cblx0XHRcdHRoaXMueCA9IG1pbi54O1xuXG5cdFx0fSBlbHNlIGlmICggdGhpcy54ID4gbWF4LnggKSB7XG5cblx0XHRcdHRoaXMueCA9IG1heC54O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnkgPCBtaW4ueSApIHtcblxuXHRcdFx0dGhpcy55ID0gbWluLnk7XG5cblx0XHR9IGVsc2UgaWYgKCB0aGlzLnkgPiBtYXgueSApIHtcblxuXHRcdFx0dGhpcy55ID0gbWF4Lnk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRjbGFtcFNjYWxhcjogKCBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgbWluLCBtYXg7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBtaW5WYWwsIG1heFZhbCApIHtcblxuXHRcdFx0aWYgKCBtaW4gPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRtaW4gPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdFx0XHRtYXggPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG5cdFx0XHR9XG5cblx0XHRcdG1pbi5zZXQoIG1pblZhbCwgbWluVmFsICk7XG5cdFx0XHRtYXguc2V0KCBtYXhWYWwsIG1heFZhbCApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5jbGFtcCggbWluLCBtYXggKTtcblxuXHRcdH07XG5cblx0fSApKCksXG5cblx0Zmxvb3I6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9IE1hdGguZmxvb3IoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9IE1hdGguZmxvb3IoIHRoaXMueSApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjZWlsOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnggPSBNYXRoLmNlaWwoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9IE1hdGguY2VpbCggdGhpcy55ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHJvdW5kOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnggPSBNYXRoLnJvdW5kKCB0aGlzLnggKTtcblx0XHR0aGlzLnkgPSBNYXRoLnJvdW5kKCB0aGlzLnkgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cm91bmRUb1plcm86IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9ICggdGhpcy54IDwgMCApID8gTWF0aC5jZWlsKCB0aGlzLnggKSA6IE1hdGguZmxvb3IoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9ICggdGhpcy55IDwgMCApID8gTWF0aC5jZWlsKCB0aGlzLnkgKSA6IE1hdGguZmxvb3IoIHRoaXMueSApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRuZWdhdGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9IC0gdGhpcy54O1xuXHRcdHRoaXMueSA9IC0gdGhpcy55O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRkb3Q6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2Lnk7XG5cblx0fSxcblxuXHRsZW5ndGhTcTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueTtcblxuXHR9LFxuXG5cdGxlbmd0aDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIE1hdGguc3FydCggdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICk7XG5cblx0fSxcblxuXHRub3JtYWxpemU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLmRpdmlkZVNjYWxhciggdGhpcy5sZW5ndGgoKSApO1xuXG5cdH0sXG5cblx0ZGlzdGFuY2VUbzogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0cmV0dXJuIE1hdGguc3FydCggdGhpcy5kaXN0YW5jZVRvU3F1YXJlZCggdiApICk7XG5cblx0fSxcblxuXHRkaXN0YW5jZVRvU3F1YXJlZDogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0dmFyIGR4ID0gdGhpcy54IC0gdi54LCBkeSA9IHRoaXMueSAtIHYueTtcblx0XHRyZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG5cblx0fSxcblxuXHRzZXRMZW5ndGg6IGZ1bmN0aW9uICggbCApIHtcblxuXHRcdHZhciBvbGRMZW5ndGggPSB0aGlzLmxlbmd0aCgpO1xuXG5cdFx0aWYgKCBvbGRMZW5ndGggIT09IDAgJiYgbCAhPT0gb2xkTGVuZ3RoICkge1xuXG5cdFx0XHR0aGlzLm11bHRpcGx5U2NhbGFyKCBsIC8gb2xkTGVuZ3RoICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRsZXJwOiBmdW5jdGlvbiAoIHYsIGFscGhhICkge1xuXG5cdFx0dGhpcy54ICs9ICggdi54IC0gdGhpcy54ICkgKiBhbHBoYTtcblx0XHR0aGlzLnkgKz0gKCB2LnkgLSB0aGlzLnkgKSAqIGFscGhhO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRsZXJwVmVjdG9yczogZnVuY3Rpb24gKCB2MSwgdjIsIGFscGhhICkge1xuXG5cdFx0dGhpcy5zdWJWZWN0b3JzKCB2MiwgdjEgKS5tdWx0aXBseVNjYWxhciggYWxwaGEgKS5hZGQoIHYxICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVxdWFsczogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0cmV0dXJuICggKCB2LnggPT09IHRoaXMueCApICYmICggdi55ID09PSB0aGlzLnkgKSApO1xuXG5cdH0sXG5cblx0ZnJvbUFycmF5OiBmdW5jdGlvbiAoIGFycmF5LCBvZmZzZXQgKSB7XG5cblx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblxuXHRcdHRoaXMueCA9IGFycmF5WyBvZmZzZXQgXTtcblx0XHR0aGlzLnkgPSBhcnJheVsgb2Zmc2V0ICsgMSBdO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR0b0FycmF5OiBmdW5jdGlvbiAoIGFycmF5LCBvZmZzZXQgKSB7XG5cblx0XHRpZiAoIGFycmF5ID09PSB1bmRlZmluZWQgKSBhcnJheSA9IFtdO1xuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0YXJyYXlbIG9mZnNldCBdID0gdGhpcy54O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxIF0gPSB0aGlzLnk7XG5cblx0XHRyZXR1cm4gYXJyYXk7XG5cblx0fSxcblxuXHRmcm9tQXR0cmlidXRlOiBmdW5jdGlvbiAoIGF0dHJpYnV0ZSwgaW5kZXgsIG9mZnNldCApIHtcblxuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0aW5kZXggPSBpbmRleCAqIGF0dHJpYnV0ZS5pdGVtU2l6ZSArIG9mZnNldDtcblxuXHRcdHRoaXMueCA9IGF0dHJpYnV0ZS5hcnJheVsgaW5kZXggXTtcblx0XHR0aGlzLnkgPSBhdHRyaWJ1dGUuYXJyYXlbIGluZGV4ICsgMSBdO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IyKCB0aGlzLngsIHRoaXMueSApO1xuXG5cdH1cblxufTtcblxuLy8gRmlsZTpzcmMvbWF0aC9WZWN0b3IzLmpzXG5cbi8qKlxuICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbS9cbiAqIEBhdXRob3IgKmtpbGUgLyBodHRwOi8va2lsZS5zdHJhdmFnYW56YS5vcmcvXG4gKiBAYXV0aG9yIHBoaWxvZ2IgLyBodHRwOi8vYmxvZy50aGVqaXQub3JnL1xuICogQGF1dGhvciBtaWthZWwgZW10aW5nZXIgLyBodHRwOi8vZ29tby5zZS9cbiAqIEBhdXRob3IgZWdyYWV0aGVyIC8gaHR0cDovL2VncmFldGhlci5jb20vXG4gKiBAYXV0aG9yIFdlc3RMYW5nbGV5IC8gaHR0cDovL2dpdGh1Yi5jb20vV2VzdExhbmdsZXlcbiAqL1xuXG5USFJFRS5WZWN0b3IzID0gZnVuY3Rpb24gKCB4LCB5LCB6ICkge1xuXG5cdHRoaXMueCA9IHggfHwgMDtcblx0dGhpcy55ID0geSB8fCAwO1xuXHR0aGlzLnogPSB6IHx8IDA7XG5cbn07XG5cblRIUkVFLlZlY3RvcjMucHJvdG90eXBlID0ge1xuXG5cdGNvbnN0cnVjdG9yOiBUSFJFRS5WZWN0b3IzLFxuXG5cdHNldDogZnVuY3Rpb24gKCB4LCB5LCB6ICkge1xuXG5cdFx0dGhpcy54ID0geDtcblx0XHR0aGlzLnkgPSB5O1xuXHRcdHRoaXMueiA9IHo7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldFg6IGZ1bmN0aW9uICggeCApIHtcblxuXHRcdHRoaXMueCA9IHg7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldFk6IGZ1bmN0aW9uICggeSApIHtcblxuXHRcdHRoaXMueSA9IHk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldFo6IGZ1bmN0aW9uICggeiApIHtcblxuXHRcdHRoaXMueiA9IHo7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldENvbXBvbmVudDogZnVuY3Rpb24gKCBpbmRleCwgdmFsdWUgKSB7XG5cblx0XHRzd2l0Y2ggKCBpbmRleCApIHtcblxuXHRcdFx0Y2FzZSAwOiB0aGlzLnggPSB2YWx1ZTsgYnJlYWs7XG5cdFx0XHRjYXNlIDE6IHRoaXMueSA9IHZhbHVlOyBicmVhaztcblx0XHRcdGNhc2UgMjogdGhpcy56ID0gdmFsdWU7IGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCAnaW5kZXggaXMgb3V0IG9mIHJhbmdlOiAnICsgaW5kZXggKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdGdldENvbXBvbmVudDogZnVuY3Rpb24gKCBpbmRleCApIHtcblxuXHRcdHN3aXRjaCAoIGluZGV4ICkge1xuXG5cdFx0XHRjYXNlIDA6IHJldHVybiB0aGlzLng7XG5cdFx0XHRjYXNlIDE6IHJldHVybiB0aGlzLnk7XG5cdFx0XHRjYXNlIDI6IHJldHVybiB0aGlzLno7XG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoICdpbmRleCBpcyBvdXQgb2YgcmFuZ2U6ICcgKyBpbmRleCApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Y29weTogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0dGhpcy54ID0gdi54O1xuXHRcdHRoaXMueSA9IHYueTtcblx0XHR0aGlzLnogPSB2Lno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFkZDogZnVuY3Rpb24gKCB2LCB3ICkge1xuXG5cdFx0aWYgKCB3ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZlY3RvcjM6IC5hZGQoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5hZGRWZWN0b3JzKCBhLCBiICkgaW5zdGVhZC4nICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5hZGRWZWN0b3JzKCB2LCB3ICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnggKz0gdi54O1xuXHRcdHRoaXMueSArPSB2Lnk7XG5cdFx0dGhpcy56ICs9IHYuejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YWRkU2NhbGFyOiBmdW5jdGlvbiAoIHMgKSB7XG5cblx0XHR0aGlzLnggKz0gcztcblx0XHR0aGlzLnkgKz0gcztcblx0XHR0aGlzLnogKz0gcztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YWRkVmVjdG9yczogZnVuY3Rpb24gKCBhLCBiICkge1xuXG5cdFx0dGhpcy54ID0gYS54ICsgYi54O1xuXHRcdHRoaXMueSA9IGEueSArIGIueTtcblx0XHR0aGlzLnogPSBhLnogKyBiLno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN1YjogZnVuY3Rpb24gKCB2LCB3ICkge1xuXG5cdFx0aWYgKCB3ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZlY3RvcjM6IC5zdWIoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5zdWJWZWN0b3JzKCBhLCBiICkgaW5zdGVhZC4nICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5zdWJWZWN0b3JzKCB2LCB3ICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnggLT0gdi54O1xuXHRcdHRoaXMueSAtPSB2Lnk7XG5cdFx0dGhpcy56IC09IHYuejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cdFxuXHRzdWJTY2FsYXI6IGZ1bmN0aW9uICggcyApIHtcblxuXHRcdHRoaXMueCAtPSBzO1xuXHRcdHRoaXMueSAtPSBzO1xuXHRcdHRoaXMueiAtPSBzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdWJWZWN0b3JzOiBmdW5jdGlvbiAoIGEsIGIgKSB7XG5cblx0XHR0aGlzLnggPSBhLnggLSBiLng7XG5cdFx0dGhpcy55ID0gYS55IC0gYi55O1xuXHRcdHRoaXMueiA9IGEueiAtIGIuejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHk6IGZ1bmN0aW9uICggdiwgdyApIHtcblxuXHRcdGlmICggdyAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WZWN0b3IzOiAubXVsdGlwbHkoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5tdWx0aXBseVZlY3RvcnMoIGEsIGIgKSBpbnN0ZWFkLicgKTtcblx0XHRcdHJldHVybiB0aGlzLm11bHRpcGx5VmVjdG9ycyggdiwgdyApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy54ICo9IHYueDtcblx0XHR0aGlzLnkgKj0gdi55O1xuXHRcdHRoaXMueiAqPSB2Lno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5U2NhbGFyOiBmdW5jdGlvbiAoIHNjYWxhciApIHtcblxuXHRcdHRoaXMueCAqPSBzY2FsYXI7XG5cdFx0dGhpcy55ICo9IHNjYWxhcjtcblx0XHR0aGlzLnogKj0gc2NhbGFyO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtdWx0aXBseVZlY3RvcnM6IGZ1bmN0aW9uICggYSwgYiApIHtcblxuXHRcdHRoaXMueCA9IGEueCAqIGIueDtcblx0XHR0aGlzLnkgPSBhLnkgKiBiLnk7XG5cdFx0dGhpcy56ID0gYS56ICogYi56O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhcHBseUV1bGVyOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgcXVhdGVybmlvbjtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIGV1bGVyICkge1xuXG5cdFx0XHRpZiAoIGV1bGVyIGluc3RhbmNlb2YgVEhSRUUuRXVsZXIgPT09IGZhbHNlICkge1xuXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5WZWN0b3IzOiAuYXBwbHlFdWxlcigpIG5vdyBleHBlY3RzIGEgRXVsZXIgcm90YXRpb24gcmF0aGVyIHRoYW4gYSBWZWN0b3IzIGFuZCBvcmRlci4nICk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBxdWF0ZXJuaW9uID09PSB1bmRlZmluZWQgKSBxdWF0ZXJuaW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuXHRcdFx0dGhpcy5hcHBseVF1YXRlcm5pb24oIHF1YXRlcm5pb24uc2V0RnJvbUV1bGVyKCBldWxlciApICk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0YXBwbHlBeGlzQW5nbGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBxdWF0ZXJuaW9uO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggYXhpcywgYW5nbGUgKSB7XG5cblx0XHRcdGlmICggcXVhdGVybmlvbiA9PT0gdW5kZWZpbmVkICkgcXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cblx0XHRcdHRoaXMuYXBwbHlRdWF0ZXJuaW9uKCBxdWF0ZXJuaW9uLnNldEZyb21BeGlzQW5nbGUoIGF4aXMsIGFuZ2xlICkgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRhcHBseU1hdHJpeDM6IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdHZhciB4ID0gdGhpcy54O1xuXHRcdHZhciB5ID0gdGhpcy55O1xuXHRcdHZhciB6ID0gdGhpcy56O1xuXG5cdFx0dmFyIGUgPSBtLmVsZW1lbnRzO1xuXG5cdFx0dGhpcy54ID0gZVsgMCBdICogeCArIGVbIDMgXSAqIHkgKyBlWyA2IF0gKiB6O1xuXHRcdHRoaXMueSA9IGVbIDEgXSAqIHggKyBlWyA0IF0gKiB5ICsgZVsgNyBdICogejtcblx0XHR0aGlzLnogPSBlWyAyIF0gKiB4ICsgZVsgNSBdICogeSArIGVbIDggXSAqIHo7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFwcGx5TWF0cml4NDogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0Ly8gaW5wdXQ6IFRIUkVFLk1hdHJpeDQgYWZmaW5lIG1hdHJpeFxuXG5cdFx0dmFyIHggPSB0aGlzLngsIHkgPSB0aGlzLnksIHogPSB0aGlzLno7XG5cblx0XHR2YXIgZSA9IG0uZWxlbWVudHM7XG5cblx0XHR0aGlzLnggPSBlWyAwIF0gKiB4ICsgZVsgNCBdICogeSArIGVbIDggXSAgKiB6ICsgZVsgMTIgXTtcblx0XHR0aGlzLnkgPSBlWyAxIF0gKiB4ICsgZVsgNSBdICogeSArIGVbIDkgXSAgKiB6ICsgZVsgMTMgXTtcblx0XHR0aGlzLnogPSBlWyAyIF0gKiB4ICsgZVsgNiBdICogeSArIGVbIDEwIF0gKiB6ICsgZVsgMTQgXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YXBwbHlQcm9qZWN0aW9uOiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHQvLyBpbnB1dDogVEhSRUUuTWF0cml4NCBwcm9qZWN0aW9uIG1hdHJpeFxuXG5cdFx0dmFyIHggPSB0aGlzLngsIHkgPSB0aGlzLnksIHogPSB0aGlzLno7XG5cblx0XHR2YXIgZSA9IG0uZWxlbWVudHM7XG5cdFx0dmFyIGQgPSAxIC8gKCBlWyAzIF0gKiB4ICsgZVsgNyBdICogeSArIGVbIDExIF0gKiB6ICsgZVsgMTUgXSApOyAvLyBwZXJzcGVjdGl2ZSBkaXZpZGVcblxuXHRcdHRoaXMueCA9ICggZVsgMCBdICogeCArIGVbIDQgXSAqIHkgKyBlWyA4IF0gICogeiArIGVbIDEyIF0gKSAqIGQ7XG5cdFx0dGhpcy55ID0gKCBlWyAxIF0gKiB4ICsgZVsgNSBdICogeSArIGVbIDkgXSAgKiB6ICsgZVsgMTMgXSApICogZDtcblx0XHR0aGlzLnogPSAoIGVbIDIgXSAqIHggKyBlWyA2IF0gKiB5ICsgZVsgMTAgXSAqIHogKyBlWyAxNCBdICkgKiBkO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhcHBseVF1YXRlcm5pb246IGZ1bmN0aW9uICggcSApIHtcblxuXHRcdHZhciB4ID0gdGhpcy54O1xuXHRcdHZhciB5ID0gdGhpcy55O1xuXHRcdHZhciB6ID0gdGhpcy56O1xuXG5cdFx0dmFyIHF4ID0gcS54O1xuXHRcdHZhciBxeSA9IHEueTtcblx0XHR2YXIgcXogPSBxLno7XG5cdFx0dmFyIHF3ID0gcS53O1xuXG5cdFx0Ly8gY2FsY3VsYXRlIHF1YXQgKiB2ZWN0b3JcblxuXHRcdHZhciBpeCA9ICBxdyAqIHggKyBxeSAqIHogLSBxeiAqIHk7XG5cdFx0dmFyIGl5ID0gIHF3ICogeSArIHF6ICogeCAtIHF4ICogejtcblx0XHR2YXIgaXogPSAgcXcgKiB6ICsgcXggKiB5IC0gcXkgKiB4O1xuXHRcdHZhciBpdyA9IC0gcXggKiB4IC0gcXkgKiB5IC0gcXogKiB6O1xuXG5cdFx0Ly8gY2FsY3VsYXRlIHJlc3VsdCAqIGludmVyc2UgcXVhdFxuXG5cdFx0dGhpcy54ID0gaXggKiBxdyArIGl3ICogLSBxeCArIGl5ICogLSBxeiAtIGl6ICogLSBxeTtcblx0XHR0aGlzLnkgPSBpeSAqIHF3ICsgaXcgKiAtIHF5ICsgaXogKiAtIHF4IC0gaXggKiAtIHF6O1xuXHRcdHRoaXMueiA9IGl6ICogcXcgKyBpdyAqIC0gcXogKyBpeCAqIC0gcXkgLSBpeSAqIC0gcXg7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHByb2plY3Q6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBtYXRyaXg7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBjYW1lcmEgKSB7XG5cblx0XHRcdGlmICggbWF0cml4ID09PSB1bmRlZmluZWQgKSBtYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG5cdFx0XHRtYXRyaXgubXVsdGlwbHlNYXRyaWNlcyggY2FtZXJhLnByb2plY3Rpb25NYXRyaXgsIG1hdHJpeC5nZXRJbnZlcnNlKCBjYW1lcmEubWF0cml4V29ybGQgKSApO1xuXHRcdFx0cmV0dXJuIHRoaXMuYXBwbHlQcm9qZWN0aW9uKCBtYXRyaXggKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdHVucHJvamVjdDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIG1hdHJpeDtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIGNhbWVyYSApIHtcblxuXHRcdFx0aWYgKCBtYXRyaXggPT09IHVuZGVmaW5lZCApIG1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cblx0XHRcdG1hdHJpeC5tdWx0aXBseU1hdHJpY2VzKCBjYW1lcmEubWF0cml4V29ybGQsIG1hdHJpeC5nZXRJbnZlcnNlKCBjYW1lcmEucHJvamVjdGlvbk1hdHJpeCApICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5hcHBseVByb2plY3Rpb24oIG1hdHJpeCApO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0dHJhbnNmb3JtRGlyZWN0aW9uOiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHQvLyBpbnB1dDogVEhSRUUuTWF0cml4NCBhZmZpbmUgbWF0cml4XG5cdFx0Ly8gdmVjdG9yIGludGVycHJldGVkIGFzIGEgZGlyZWN0aW9uXG5cblx0XHR2YXIgeCA9IHRoaXMueCwgeSA9IHRoaXMueSwgeiA9IHRoaXMuejtcblxuXHRcdHZhciBlID0gbS5lbGVtZW50cztcblxuXHRcdHRoaXMueCA9IGVbIDAgXSAqIHggKyBlWyA0IF0gKiB5ICsgZVsgOCBdICAqIHo7XG5cdFx0dGhpcy55ID0gZVsgMSBdICogeCArIGVbIDUgXSAqIHkgKyBlWyA5IF0gICogejtcblx0XHR0aGlzLnogPSBlWyAyIF0gKiB4ICsgZVsgNiBdICogeSArIGVbIDEwIF0gKiB6O1xuXG5cdFx0dGhpcy5ub3JtYWxpemUoKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZGl2aWRlOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHR0aGlzLnggLz0gdi54O1xuXHRcdHRoaXMueSAvPSB2Lnk7XG5cdFx0dGhpcy56IC89IHYuejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZGl2aWRlU2NhbGFyOiBmdW5jdGlvbiAoIHNjYWxhciApIHtcblxuXHRcdGlmICggc2NhbGFyICE9PSAwICkge1xuXG5cdFx0XHR2YXIgaW52U2NhbGFyID0gMSAvIHNjYWxhcjtcblxuXHRcdFx0dGhpcy54ICo9IGludlNjYWxhcjtcblx0XHRcdHRoaXMueSAqPSBpbnZTY2FsYXI7XG5cdFx0XHR0aGlzLnogKj0gaW52U2NhbGFyO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy54ID0gMDtcblx0XHRcdHRoaXMueSA9IDA7XG5cdFx0XHR0aGlzLnogPSAwO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtaW46IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdGlmICggdGhpcy54ID4gdi54ICkge1xuXG5cdFx0XHR0aGlzLnggPSB2Lng7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMueSA+IHYueSApIHtcblxuXHRcdFx0dGhpcy55ID0gdi55O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnogPiB2LnogKSB7XG5cblx0XHRcdHRoaXMueiA9IHYuejtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWF4OiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRpZiAoIHRoaXMueCA8IHYueCApIHtcblxuXHRcdFx0dGhpcy54ID0gdi54O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnkgPCB2LnkgKSB7XG5cblx0XHRcdHRoaXMueSA9IHYueTtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy56IDwgdi56ICkge1xuXG5cdFx0XHR0aGlzLnogPSB2Lno7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNsYW1wOiBmdW5jdGlvbiAoIG1pbiwgbWF4ICkge1xuXG5cdFx0Ly8gVGhpcyBmdW5jdGlvbiBhc3N1bWVzIG1pbiA8IG1heCwgaWYgdGhpcyBhc3N1bXB0aW9uIGlzbid0IHRydWUgaXQgd2lsbCBub3Qgb3BlcmF0ZSBjb3JyZWN0bHlcblxuXHRcdGlmICggdGhpcy54IDwgbWluLnggKSB7XG5cblx0XHRcdHRoaXMueCA9IG1pbi54O1xuXG5cdFx0fSBlbHNlIGlmICggdGhpcy54ID4gbWF4LnggKSB7XG5cblx0XHRcdHRoaXMueCA9IG1heC54O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnkgPCBtaW4ueSApIHtcblxuXHRcdFx0dGhpcy55ID0gbWluLnk7XG5cblx0XHR9IGVsc2UgaWYgKCB0aGlzLnkgPiBtYXgueSApIHtcblxuXHRcdFx0dGhpcy55ID0gbWF4Lnk7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMueiA8IG1pbi56ICkge1xuXG5cdFx0XHR0aGlzLnogPSBtaW4uejtcblxuXHRcdH0gZWxzZSBpZiAoIHRoaXMueiA+IG1heC56ICkge1xuXG5cdFx0XHR0aGlzLnogPSBtYXguejtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2xhbXBTY2FsYXI6ICggZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIG1pbiwgbWF4O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggbWluVmFsLCBtYXhWYWwgKSB7XG5cblx0XHRcdGlmICggbWluID09PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0bWluID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdFx0bWF4ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRtaW4uc2V0KCBtaW5WYWwsIG1pblZhbCwgbWluVmFsICk7XG5cdFx0XHRtYXguc2V0KCBtYXhWYWwsIG1heFZhbCwgbWF4VmFsICk7XG5cblx0XHRcdHJldHVybiB0aGlzLmNsYW1wKCBtaW4sIG1heCApO1xuXG5cdFx0fTtcblxuXHR9ICkoKSxcblxuXHRmbG9vcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gTWF0aC5mbG9vciggdGhpcy54ICk7XG5cdFx0dGhpcy55ID0gTWF0aC5mbG9vciggdGhpcy55ICk7XG5cdFx0dGhpcy56ID0gTWF0aC5mbG9vciggdGhpcy56ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNlaWw6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9IE1hdGguY2VpbCggdGhpcy54ICk7XG5cdFx0dGhpcy55ID0gTWF0aC5jZWlsKCB0aGlzLnkgKTtcblx0XHR0aGlzLnogPSBNYXRoLmNlaWwoIHRoaXMueiApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRyb3VuZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gTWF0aC5yb3VuZCggdGhpcy54ICk7XG5cdFx0dGhpcy55ID0gTWF0aC5yb3VuZCggdGhpcy55ICk7XG5cdFx0dGhpcy56ID0gTWF0aC5yb3VuZCggdGhpcy56ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHJvdW5kVG9aZXJvOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnggPSAoIHRoaXMueCA8IDAgKSA/IE1hdGguY2VpbCggdGhpcy54ICkgOiBNYXRoLmZsb29yKCB0aGlzLnggKTtcblx0XHR0aGlzLnkgPSAoIHRoaXMueSA8IDAgKSA/IE1hdGguY2VpbCggdGhpcy55ICkgOiBNYXRoLmZsb29yKCB0aGlzLnkgKTtcblx0XHR0aGlzLnogPSAoIHRoaXMueiA8IDAgKSA/IE1hdGguY2VpbCggdGhpcy56ICkgOiBNYXRoLmZsb29yKCB0aGlzLnogKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bmVnYXRlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnggPSAtIHRoaXMueDtcblx0XHR0aGlzLnkgPSAtIHRoaXMueTtcblx0XHR0aGlzLnogPSAtIHRoaXMuejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZG90OiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRyZXR1cm4gdGhpcy54ICogdi54ICsgdGhpcy55ICogdi55ICsgdGhpcy56ICogdi56O1xuXG5cdH0sXG5cblx0bGVuZ3RoU3E6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkgKyB0aGlzLnogKiB0aGlzLno7XG5cblx0fSxcblxuXHRsZW5ndGg6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBNYXRoLnNxcnQoIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSArIHRoaXMueiAqIHRoaXMueiApO1xuXG5cdH0sXG5cblx0bGVuZ3RoTWFuaGF0dGFuOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gTWF0aC5hYnMoIHRoaXMueCApICsgTWF0aC5hYnMoIHRoaXMueSApICsgTWF0aC5hYnMoIHRoaXMueiApO1xuXG5cdH0sXG5cblx0bm9ybWFsaXplOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5kaXZpZGVTY2FsYXIoIHRoaXMubGVuZ3RoKCkgKTtcblxuXHR9LFxuXG5cdHNldExlbmd0aDogZnVuY3Rpb24gKCBsICkge1xuXG5cdFx0dmFyIG9sZExlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XG5cblx0XHRpZiAoIG9sZExlbmd0aCAhPT0gMCAmJiBsICE9PSBvbGRMZW5ndGggICkge1xuXG5cdFx0XHR0aGlzLm11bHRpcGx5U2NhbGFyKCBsIC8gb2xkTGVuZ3RoICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRsZXJwOiBmdW5jdGlvbiAoIHYsIGFscGhhICkge1xuXG5cdFx0dGhpcy54ICs9ICggdi54IC0gdGhpcy54ICkgKiBhbHBoYTtcblx0XHR0aGlzLnkgKz0gKCB2LnkgLSB0aGlzLnkgKSAqIGFscGhhO1xuXHRcdHRoaXMueiArPSAoIHYueiAtIHRoaXMueiApICogYWxwaGE7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGxlcnBWZWN0b3JzOiBmdW5jdGlvbiAoIHYxLCB2MiwgYWxwaGEgKSB7XG5cblx0XHR0aGlzLnN1YlZlY3RvcnMoIHYyLCB2MSApLm11bHRpcGx5U2NhbGFyKCBhbHBoYSApLmFkZCggdjEgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y3Jvc3M6IGZ1bmN0aW9uICggdiwgdyApIHtcblxuXHRcdGlmICggdyAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WZWN0b3IzOiAuY3Jvc3MoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5jcm9zc1ZlY3RvcnMoIGEsIGIgKSBpbnN0ZWFkLicgKTtcblx0XHRcdHJldHVybiB0aGlzLmNyb3NzVmVjdG9ycyggdiwgdyApO1xuXG5cdFx0fVxuXG5cdFx0dmFyIHggPSB0aGlzLngsIHkgPSB0aGlzLnksIHogPSB0aGlzLno7XG5cblx0XHR0aGlzLnggPSB5ICogdi56IC0geiAqIHYueTtcblx0XHR0aGlzLnkgPSB6ICogdi54IC0geCAqIHYuejtcblx0XHR0aGlzLnogPSB4ICogdi55IC0geSAqIHYueDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y3Jvc3NWZWN0b3JzOiBmdW5jdGlvbiAoIGEsIGIgKSB7XG5cblx0XHR2YXIgYXggPSBhLngsIGF5ID0gYS55LCBheiA9IGEuejtcblx0XHR2YXIgYnggPSBiLngsIGJ5ID0gYi55LCBieiA9IGIuejtcblxuXHRcdHRoaXMueCA9IGF5ICogYnogLSBheiAqIGJ5O1xuXHRcdHRoaXMueSA9IGF6ICogYnggLSBheCAqIGJ6O1xuXHRcdHRoaXMueiA9IGF4ICogYnkgLSBheSAqIGJ4O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRwcm9qZWN0T25WZWN0b3I6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MSwgZG90O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggdmVjdG9yICkge1xuXG5cdFx0XHRpZiAoIHYxID09PSB1bmRlZmluZWQgKSB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRcdHYxLmNvcHkoIHZlY3RvciApLm5vcm1hbGl6ZSgpO1xuXG5cdFx0XHRkb3QgPSB0aGlzLmRvdCggdjEgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXMuY29weSggdjEgKS5tdWx0aXBseVNjYWxhciggZG90ICk7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRwcm9qZWN0T25QbGFuZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYxO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggcGxhbmVOb3JtYWwgKSB7XG5cblx0XHRcdGlmICggdjEgPT09IHVuZGVmaW5lZCApIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdFx0djEuY29weSggdGhpcyApLnByb2plY3RPblZlY3RvciggcGxhbmVOb3JtYWwgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXMuc3ViKCB2MSApO1xuXG5cdFx0fVxuXG5cdH0oKSxcblxuXHRyZWZsZWN0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyByZWZsZWN0IGluY2lkZW50IHZlY3RvciBvZmYgcGxhbmUgb3J0aG9nb25hbCB0byBub3JtYWxcblx0XHQvLyBub3JtYWwgaXMgYXNzdW1lZCB0byBoYXZlIHVuaXQgbGVuZ3RoXG5cblx0XHR2YXIgdjE7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBub3JtYWwgKSB7XG5cblx0XHRcdGlmICggdjEgPT09IHVuZGVmaW5lZCApIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdFx0cmV0dXJuIHRoaXMuc3ViKCB2MS5jb3B5KCBub3JtYWwgKS5tdWx0aXBseVNjYWxhciggMiAqIHRoaXMuZG90KCBub3JtYWwgKSApICk7XG5cblx0XHR9XG5cblx0fSgpLFxuXG5cdGFuZ2xlVG86IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHZhciB0aGV0YSA9IHRoaXMuZG90KCB2ICkgLyAoIHRoaXMubGVuZ3RoKCkgKiB2Lmxlbmd0aCgpICk7XG5cblx0XHQvLyBjbGFtcCwgdG8gaGFuZGxlIG51bWVyaWNhbCBwcm9ibGVtc1xuXG5cdFx0cmV0dXJuIE1hdGguYWNvcyggVEhSRUUuTWF0aC5jbGFtcCggdGhldGEsIC0gMSwgMSApICk7XG5cblx0fSxcblxuXHRkaXN0YW5jZVRvOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRyZXR1cm4gTWF0aC5zcXJ0KCB0aGlzLmRpc3RhbmNlVG9TcXVhcmVkKCB2ICkgKTtcblxuXHR9LFxuXG5cdGRpc3RhbmNlVG9TcXVhcmVkOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHR2YXIgZHggPSB0aGlzLnggLSB2Lng7XG5cdFx0dmFyIGR5ID0gdGhpcy55IC0gdi55O1xuXHRcdHZhciBkeiA9IHRoaXMueiAtIHYuejtcblxuXHRcdHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeSArIGR6ICogZHo7XG5cblx0fSxcblxuXHRzZXRFdWxlckZyb21Sb3RhdGlvbk1hdHJpeDogZnVuY3Rpb24gKCBtLCBvcmRlciApIHtcblxuXHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5WZWN0b3IzOiAuc2V0RXVsZXJGcm9tUm90YXRpb25NYXRyaXgoKSBoYXMgYmVlbiByZW1vdmVkLiBVc2UgRXVsZXIuc2V0RnJvbVJvdGF0aW9uTWF0cml4KCkgaW5zdGVhZC4nICk7XG5cblx0fSxcblxuXHRzZXRFdWxlckZyb21RdWF0ZXJuaW9uOiBmdW5jdGlvbiAoIHEsIG9yZGVyICkge1xuXG5cdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLlZlY3RvcjM6IC5zZXRFdWxlckZyb21RdWF0ZXJuaW9uKCkgaGFzIGJlZW4gcmVtb3ZlZC4gVXNlIEV1bGVyLnNldEZyb21RdWF0ZXJuaW9uKCkgaW5zdGVhZC4nICk7XG5cblx0fSxcblxuXHRnZXRQb3NpdGlvbkZyb21NYXRyaXg6IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZlY3RvcjM6IC5nZXRQb3NpdGlvbkZyb21NYXRyaXgoKSBoYXMgYmVlbiByZW5hbWVkIHRvIC5zZXRGcm9tTWF0cml4UG9zaXRpb24oKS4nICk7XG5cblx0XHRyZXR1cm4gdGhpcy5zZXRGcm9tTWF0cml4UG9zaXRpb24oIG0gKTtcblxuXHR9LFxuXG5cdGdldFNjYWxlRnJvbU1hdHJpeDogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVmVjdG9yMzogLmdldFNjYWxlRnJvbU1hdHJpeCgpIGhhcyBiZWVuIHJlbmFtZWQgdG8gLnNldEZyb21NYXRyaXhTY2FsZSgpLicgKTtcblxuXHRcdHJldHVybiB0aGlzLnNldEZyb21NYXRyaXhTY2FsZSggbSApO1xuXHR9LFxuXG5cdGdldENvbHVtbkZyb21NYXRyaXg6IGZ1bmN0aW9uICggaW5kZXgsIG1hdHJpeCApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZlY3RvcjM6IC5nZXRDb2x1bW5Gcm9tTWF0cml4KCkgaGFzIGJlZW4gcmVuYW1lZCB0byAuc2V0RnJvbU1hdHJpeENvbHVtbigpLicgKTtcblxuXHRcdHJldHVybiB0aGlzLnNldEZyb21NYXRyaXhDb2x1bW4oIGluZGV4LCBtYXRyaXggKTtcblxuXHR9LFxuXG5cdHNldEZyb21NYXRyaXhQb3NpdGlvbjogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0dGhpcy54ID0gbS5lbGVtZW50c1sgMTIgXTtcblx0XHR0aGlzLnkgPSBtLmVsZW1lbnRzWyAxMyBdO1xuXHRcdHRoaXMueiA9IG0uZWxlbWVudHNbIDE0IF07XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldEZyb21NYXRyaXhTY2FsZTogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0dmFyIHN4ID0gdGhpcy5zZXQoIG0uZWxlbWVudHNbIDAgXSwgbS5lbGVtZW50c1sgMSBdLCBtLmVsZW1lbnRzWyAgMiBdICkubGVuZ3RoKCk7XG5cdFx0dmFyIHN5ID0gdGhpcy5zZXQoIG0uZWxlbWVudHNbIDQgXSwgbS5lbGVtZW50c1sgNSBdLCBtLmVsZW1lbnRzWyAgNiBdICkubGVuZ3RoKCk7XG5cdFx0dmFyIHN6ID0gdGhpcy5zZXQoIG0uZWxlbWVudHNbIDggXSwgbS5lbGVtZW50c1sgOSBdLCBtLmVsZW1lbnRzWyAxMCBdICkubGVuZ3RoKCk7XG5cblx0XHR0aGlzLnggPSBzeDtcblx0XHR0aGlzLnkgPSBzeTtcblx0XHR0aGlzLnogPSBzejtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHNldEZyb21NYXRyaXhDb2x1bW46IGZ1bmN0aW9uICggaW5kZXgsIG1hdHJpeCApIHtcblx0XHRcblx0XHR2YXIgb2Zmc2V0ID0gaW5kZXggKiA0O1xuXG5cdFx0dmFyIG1lID0gbWF0cml4LmVsZW1lbnRzO1xuXG5cdFx0dGhpcy54ID0gbWVbIG9mZnNldCBdO1xuXHRcdHRoaXMueSA9IG1lWyBvZmZzZXQgKyAxIF07XG5cdFx0dGhpcy56ID0gbWVbIG9mZnNldCArIDIgXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZXF1YWxzOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRyZXR1cm4gKCAoIHYueCA9PT0gdGhpcy54ICkgJiYgKCB2LnkgPT09IHRoaXMueSApICYmICggdi56ID09PSB0aGlzLnogKSApO1xuXG5cdH0sXG5cblx0ZnJvbUFycmF5OiBmdW5jdGlvbiAoIGFycmF5LCBvZmZzZXQgKSB7XG5cblx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblxuXHRcdHRoaXMueCA9IGFycmF5WyBvZmZzZXQgXTtcblx0XHR0aGlzLnkgPSBhcnJheVsgb2Zmc2V0ICsgMSBdO1xuXHRcdHRoaXMueiA9IGFycmF5WyBvZmZzZXQgKyAyIF07XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdGlmICggYXJyYXkgPT09IHVuZGVmaW5lZCApIGFycmF5ID0gW107XG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHRhcnJheVsgb2Zmc2V0IF0gPSB0aGlzLng7XG5cdFx0YXJyYXlbIG9mZnNldCArIDEgXSA9IHRoaXMueTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMiBdID0gdGhpcy56O1xuXG5cdFx0cmV0dXJuIGFycmF5O1xuXG5cdH0sXG5cblx0ZnJvbUF0dHJpYnV0ZTogZnVuY3Rpb24gKCBhdHRyaWJ1dGUsIGluZGV4LCBvZmZzZXQgKSB7XG5cblx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblxuXHRcdGluZGV4ID0gaW5kZXggKiBhdHRyaWJ1dGUuaXRlbVNpemUgKyBvZmZzZXQ7XG5cblx0XHR0aGlzLnggPSBhdHRyaWJ1dGUuYXJyYXlbIGluZGV4IF07XG5cdFx0dGhpcy55ID0gYXR0cmlidXRlLmFycmF5WyBpbmRleCArIDEgXTtcblx0XHR0aGlzLnogPSBhdHRyaWJ1dGUuYXJyYXlbIGluZGV4ICsgMiBdO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IzKCB0aGlzLngsIHRoaXMueSwgdGhpcy56ICk7XG5cblx0fVxuXG59O1xuXG4vLyBGaWxlOnNyYy9tYXRoL1ZlY3RvcjQuanNcblxuLyoqXG4gKiBAYXV0aG9yIHN1cGVyZWdnYmVydCAvIGh0dHA6Ly93d3cucGF1bGJydW50LmNvLnVrL1xuICogQGF1dGhvciBwaGlsb2diIC8gaHR0cDovL2Jsb2cudGhlaml0Lm9yZy9cbiAqIEBhdXRob3IgbWlrYWVsIGVtdGluZ2VyIC8gaHR0cDovL2dvbW8uc2UvXG4gKiBAYXV0aG9yIGVncmFldGhlciAvIGh0dHA6Ly9lZ3JhZXRoZXIuY29tL1xuICogQGF1dGhvciBXZXN0TGFuZ2xleSAvIGh0dHA6Ly9naXRodWIuY29tL1dlc3RMYW5nbGV5XG4gKi9cblxuVEhSRUUuVmVjdG9yNCA9IGZ1bmN0aW9uICggeCwgeSwgeiwgdyApIHtcblxuXHR0aGlzLnggPSB4IHx8IDA7XG5cdHRoaXMueSA9IHkgfHwgMDtcblx0dGhpcy56ID0geiB8fCAwO1xuXHR0aGlzLncgPSAoIHcgIT09IHVuZGVmaW5lZCApID8gdyA6IDE7XG5cbn07XG5cblRIUkVFLlZlY3RvcjQucHJvdG90eXBlID0ge1xuXG5cdGNvbnN0cnVjdG9yOiBUSFJFRS5WZWN0b3I0LFxuXG5cdHNldDogZnVuY3Rpb24gKCB4LCB5LCB6LCB3ICkge1xuXG5cdFx0dGhpcy54ID0geDtcblx0XHR0aGlzLnkgPSB5O1xuXHRcdHRoaXMueiA9IHo7XG5cdFx0dGhpcy53ID0gdztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0WDogZnVuY3Rpb24gKCB4ICkge1xuXG5cdFx0dGhpcy54ID0geDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0WTogZnVuY3Rpb24gKCB5ICkge1xuXG5cdFx0dGhpcy55ID0geTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0WjogZnVuY3Rpb24gKCB6ICkge1xuXG5cdFx0dGhpcy56ID0gejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0VzogZnVuY3Rpb24gKCB3ICkge1xuXG5cdFx0dGhpcy53ID0gdztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0Q29tcG9uZW50OiBmdW5jdGlvbiAoIGluZGV4LCB2YWx1ZSApIHtcblxuXHRcdHN3aXRjaCAoIGluZGV4ICkge1xuXG5cdFx0XHRjYXNlIDA6IHRoaXMueCA9IHZhbHVlOyBicmVhaztcblx0XHRcdGNhc2UgMTogdGhpcy55ID0gdmFsdWU7IGJyZWFrO1xuXHRcdFx0Y2FzZSAyOiB0aGlzLnogPSB2YWx1ZTsgYnJlYWs7XG5cdFx0XHRjYXNlIDM6IHRoaXMudyA9IHZhbHVlOyBicmVhaztcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvciggJ2luZGV4IGlzIG91dCBvZiByYW5nZTogJyArIGluZGV4ICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRnZXRDb21wb25lbnQ6IGZ1bmN0aW9uICggaW5kZXggKSB7XG5cblx0XHRzd2l0Y2ggKCBpbmRleCApIHtcblxuXHRcdFx0Y2FzZSAwOiByZXR1cm4gdGhpcy54O1xuXHRcdFx0Y2FzZSAxOiByZXR1cm4gdGhpcy55O1xuXHRcdFx0Y2FzZSAyOiByZXR1cm4gdGhpcy56O1xuXHRcdFx0Y2FzZSAzOiByZXR1cm4gdGhpcy53O1xuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCAnaW5kZXggaXMgb3V0IG9mIHJhbmdlOiAnICsgaW5kZXggKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdGNvcHk6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHRoaXMueCA9IHYueDtcblx0XHR0aGlzLnkgPSB2Lnk7XG5cdFx0dGhpcy56ID0gdi56O1xuXHRcdHRoaXMudyA9ICggdi53ICE9PSB1bmRlZmluZWQgKSA/IHYudyA6IDE7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFkZDogZnVuY3Rpb24gKCB2LCB3ICkge1xuXG5cdFx0aWYgKCB3ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZlY3RvcjQ6IC5hZGQoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5hZGRWZWN0b3JzKCBhLCBiICkgaW5zdGVhZC4nICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5hZGRWZWN0b3JzKCB2LCB3ICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnggKz0gdi54O1xuXHRcdHRoaXMueSArPSB2Lnk7XG5cdFx0dGhpcy56ICs9IHYuejtcblx0XHR0aGlzLncgKz0gdi53O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhZGRTY2FsYXI6IGZ1bmN0aW9uICggcyApIHtcblxuXHRcdHRoaXMueCArPSBzO1xuXHRcdHRoaXMueSArPSBzO1xuXHRcdHRoaXMueiArPSBzO1xuXHRcdHRoaXMudyArPSBzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhZGRWZWN0b3JzOiBmdW5jdGlvbiAoIGEsIGIgKSB7XG5cblx0XHR0aGlzLnggPSBhLnggKyBiLng7XG5cdFx0dGhpcy55ID0gYS55ICsgYi55O1xuXHRcdHRoaXMueiA9IGEueiArIGIuejtcblx0XHR0aGlzLncgPSBhLncgKyBiLnc7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN1YjogZnVuY3Rpb24gKCB2LCB3ICkge1xuXG5cdFx0aWYgKCB3ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZlY3RvcjQ6IC5zdWIoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5zdWJWZWN0b3JzKCBhLCBiICkgaW5zdGVhZC4nICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5zdWJWZWN0b3JzKCB2LCB3ICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnggLT0gdi54O1xuXHRcdHRoaXMueSAtPSB2Lnk7XG5cdFx0dGhpcy56IC09IHYuejtcblx0XHR0aGlzLncgLT0gdi53O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdWJTY2FsYXI6IGZ1bmN0aW9uICggcyApIHtcblxuXHRcdHRoaXMueCAtPSBzO1xuXHRcdHRoaXMueSAtPSBzO1xuXHRcdHRoaXMueiAtPSBzO1xuXHRcdHRoaXMudyAtPSBzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdWJWZWN0b3JzOiBmdW5jdGlvbiAoIGEsIGIgKSB7XG5cblx0XHR0aGlzLnggPSBhLnggLSBiLng7XG5cdFx0dGhpcy55ID0gYS55IC0gYi55O1xuXHRcdHRoaXMueiA9IGEueiAtIGIuejtcblx0XHR0aGlzLncgPSBhLncgLSBiLnc7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5U2NhbGFyOiBmdW5jdGlvbiAoIHNjYWxhciApIHtcblxuXHRcdHRoaXMueCAqPSBzY2FsYXI7XG5cdFx0dGhpcy55ICo9IHNjYWxhcjtcblx0XHR0aGlzLnogKj0gc2NhbGFyO1xuXHRcdHRoaXMudyAqPSBzY2FsYXI7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFwcGx5TWF0cml4NDogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0dmFyIHggPSB0aGlzLng7XG5cdFx0dmFyIHkgPSB0aGlzLnk7XG5cdFx0dmFyIHogPSB0aGlzLno7XG5cdFx0dmFyIHcgPSB0aGlzLnc7XG5cblx0XHR2YXIgZSA9IG0uZWxlbWVudHM7XG5cblx0XHR0aGlzLnggPSBlWyAwIF0gKiB4ICsgZVsgNCBdICogeSArIGVbIDggXSAqIHogKyBlWyAxMiBdICogdztcblx0XHR0aGlzLnkgPSBlWyAxIF0gKiB4ICsgZVsgNSBdICogeSArIGVbIDkgXSAqIHogKyBlWyAxMyBdICogdztcblx0XHR0aGlzLnogPSBlWyAyIF0gKiB4ICsgZVsgNiBdICogeSArIGVbIDEwIF0gKiB6ICsgZVsgMTQgXSAqIHc7XG5cdFx0dGhpcy53ID0gZVsgMyBdICogeCArIGVbIDcgXSAqIHkgKyBlWyAxMSBdICogeiArIGVbIDE1IF0gKiB3O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRkaXZpZGVTY2FsYXI6IGZ1bmN0aW9uICggc2NhbGFyICkge1xuXG5cdFx0aWYgKCBzY2FsYXIgIT09IDAgKSB7XG5cblx0XHRcdHZhciBpbnZTY2FsYXIgPSAxIC8gc2NhbGFyO1xuXG5cdFx0XHR0aGlzLnggKj0gaW52U2NhbGFyO1xuXHRcdFx0dGhpcy55ICo9IGludlNjYWxhcjtcblx0XHRcdHRoaXMueiAqPSBpbnZTY2FsYXI7XG5cdFx0XHR0aGlzLncgKj0gaW52U2NhbGFyO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy54ID0gMDtcblx0XHRcdHRoaXMueSA9IDA7XG5cdFx0XHR0aGlzLnogPSAwO1xuXHRcdFx0dGhpcy53ID0gMTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0QXhpc0FuZ2xlRnJvbVF1YXRlcm5pb246IGZ1bmN0aW9uICggcSApIHtcblxuXHRcdC8vIGh0dHA6Ly93d3cuZXVjbGlkZWFuc3BhY2UuY29tL21hdGhzL2dlb21ldHJ5L3JvdGF0aW9ucy9jb252ZXJzaW9ucy9xdWF0ZXJuaW9uVG9BbmdsZS9pbmRleC5odG1cblxuXHRcdC8vIHEgaXMgYXNzdW1lZCB0byBiZSBub3JtYWxpemVkXG5cblx0XHR0aGlzLncgPSAyICogTWF0aC5hY29zKCBxLncgKTtcblxuXHRcdHZhciBzID0gTWF0aC5zcXJ0KCAxIC0gcS53ICogcS53ICk7XG5cblx0XHRpZiAoIHMgPCAwLjAwMDEgKSB7XG5cblx0XHRcdCB0aGlzLnggPSAxO1xuXHRcdFx0IHRoaXMueSA9IDA7XG5cdFx0XHQgdGhpcy56ID0gMDtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdCB0aGlzLnggPSBxLnggLyBzO1xuXHRcdFx0IHRoaXMueSA9IHEueSAvIHM7XG5cdFx0XHQgdGhpcy56ID0gcS56IC8gcztcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0QXhpc0FuZ2xlRnJvbVJvdGF0aW9uTWF0cml4OiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHQvLyBodHRwOi8vd3d3LmV1Y2xpZGVhbnNwYWNlLmNvbS9tYXRocy9nZW9tZXRyeS9yb3RhdGlvbnMvY29udmVyc2lvbnMvbWF0cml4VG9BbmdsZS9pbmRleC5odG1cblxuXHRcdC8vIGFzc3VtZXMgdGhlIHVwcGVyIDN4MyBvZiBtIGlzIGEgcHVyZSByb3RhdGlvbiBtYXRyaXggKGkuZSwgdW5zY2FsZWQpXG5cblx0XHR2YXIgYW5nbGUsIHgsIHksIHosXHRcdC8vIHZhcmlhYmxlcyBmb3IgcmVzdWx0XG5cdFx0XHRlcHNpbG9uID0gMC4wMSxcdFx0Ly8gbWFyZ2luIHRvIGFsbG93IGZvciByb3VuZGluZyBlcnJvcnNcblx0XHRcdGVwc2lsb24yID0gMC4xLFx0XHQvLyBtYXJnaW4gdG8gZGlzdGluZ3Vpc2ggYmV0d2VlbiAwIGFuZCAxODAgZGVncmVlc1xuXG5cdFx0XHR0ZSA9IG0uZWxlbWVudHMsXG5cblx0XHRcdG0xMSA9IHRlWyAwIF0sIG0xMiA9IHRlWyA0IF0sIG0xMyA9IHRlWyA4IF0sXG5cdFx0XHRtMjEgPSB0ZVsgMSBdLCBtMjIgPSB0ZVsgNSBdLCBtMjMgPSB0ZVsgOSBdLFxuXHRcdFx0bTMxID0gdGVbIDIgXSwgbTMyID0gdGVbIDYgXSwgbTMzID0gdGVbIDEwIF07XG5cblx0XHRpZiAoICggTWF0aC5hYnMoIG0xMiAtIG0yMSApIDwgZXBzaWxvbiApXG5cdFx0ICAgJiYgKCBNYXRoLmFicyggbTEzIC0gbTMxICkgPCBlcHNpbG9uIClcblx0XHQgICAmJiAoIE1hdGguYWJzKCBtMjMgLSBtMzIgKSA8IGVwc2lsb24gKSApIHtcblxuXHRcdFx0Ly8gc2luZ3VsYXJpdHkgZm91bmRcblx0XHRcdC8vIGZpcnN0IGNoZWNrIGZvciBpZGVudGl0eSBtYXRyaXggd2hpY2ggbXVzdCBoYXZlICsxIGZvciBhbGwgdGVybXNcblx0XHRcdC8vIGluIGxlYWRpbmcgZGlhZ29uYWwgYW5kIHplcm8gaW4gb3RoZXIgdGVybXNcblxuXHRcdFx0aWYgKCAoIE1hdGguYWJzKCBtMTIgKyBtMjEgKSA8IGVwc2lsb24yIClcblx0XHRcdCAgICYmICggTWF0aC5hYnMoIG0xMyArIG0zMSApIDwgZXBzaWxvbjIgKVxuXHRcdFx0ICAgJiYgKCBNYXRoLmFicyggbTIzICsgbTMyICkgPCBlcHNpbG9uMiApXG5cdFx0XHQgICAmJiAoIE1hdGguYWJzKCBtMTEgKyBtMjIgKyBtMzMgLSAzICkgPCBlcHNpbG9uMiApICkge1xuXG5cdFx0XHRcdC8vIHRoaXMgc2luZ3VsYXJpdHkgaXMgaWRlbnRpdHkgbWF0cml4IHNvIGFuZ2xlID0gMFxuXG5cdFx0XHRcdHRoaXMuc2V0KCAxLCAwLCAwLCAwICk7XG5cblx0XHRcdFx0cmV0dXJuIHRoaXM7IC8vIHplcm8gYW5nbGUsIGFyYml0cmFyeSBheGlzXG5cblx0XHRcdH1cblxuXHRcdFx0Ly8gb3RoZXJ3aXNlIHRoaXMgc2luZ3VsYXJpdHkgaXMgYW5nbGUgPSAxODBcblxuXHRcdFx0YW5nbGUgPSBNYXRoLlBJO1xuXG5cdFx0XHR2YXIgeHggPSAoIG0xMSArIDEgKSAvIDI7XG5cdFx0XHR2YXIgeXkgPSAoIG0yMiArIDEgKSAvIDI7XG5cdFx0XHR2YXIgenogPSAoIG0zMyArIDEgKSAvIDI7XG5cdFx0XHR2YXIgeHkgPSAoIG0xMiArIG0yMSApIC8gNDtcblx0XHRcdHZhciB4eiA9ICggbTEzICsgbTMxICkgLyA0O1xuXHRcdFx0dmFyIHl6ID0gKCBtMjMgKyBtMzIgKSAvIDQ7XG5cblx0XHRcdGlmICggKCB4eCA+IHl5ICkgJiYgKCB4eCA+IHp6ICkgKSB7IC8vIG0xMSBpcyB0aGUgbGFyZ2VzdCBkaWFnb25hbCB0ZXJtXG5cblx0XHRcdFx0aWYgKCB4eCA8IGVwc2lsb24gKSB7XG5cblx0XHRcdFx0XHR4ID0gMDtcblx0XHRcdFx0XHR5ID0gMC43MDcxMDY3ODE7XG5cdFx0XHRcdFx0eiA9IDAuNzA3MTA2NzgxO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHR4ID0gTWF0aC5zcXJ0KCB4eCApO1xuXHRcdFx0XHRcdHkgPSB4eSAvIHg7XG5cdFx0XHRcdFx0eiA9IHh6IC8geDtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSBpZiAoIHl5ID4genogKSB7IC8vIG0yMiBpcyB0aGUgbGFyZ2VzdCBkaWFnb25hbCB0ZXJtXG5cblx0XHRcdFx0aWYgKCB5eSA8IGVwc2lsb24gKSB7XG5cblx0XHRcdFx0XHR4ID0gMC43MDcxMDY3ODE7XG5cdFx0XHRcdFx0eSA9IDA7XG5cdFx0XHRcdFx0eiA9IDAuNzA3MTA2NzgxO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHR5ID0gTWF0aC5zcXJ0KCB5eSApO1xuXHRcdFx0XHRcdHggPSB4eSAvIHk7XG5cdFx0XHRcdFx0eiA9IHl6IC8geTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7IC8vIG0zMyBpcyB0aGUgbGFyZ2VzdCBkaWFnb25hbCB0ZXJtIHNvIGJhc2UgcmVzdWx0IG9uIHRoaXNcblxuXHRcdFx0XHRpZiAoIHp6IDwgZXBzaWxvbiApIHtcblxuXHRcdFx0XHRcdHggPSAwLjcwNzEwNjc4MTtcblx0XHRcdFx0XHR5ID0gMC43MDcxMDY3ODE7XG5cdFx0XHRcdFx0eiA9IDA7XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdHogPSBNYXRoLnNxcnQoIHp6ICk7XG5cdFx0XHRcdFx0eCA9IHh6IC8gejtcblx0XHRcdFx0XHR5ID0geXogLyB6O1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnNldCggeCwgeSwgeiwgYW5nbGUgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7IC8vIHJldHVybiAxODAgZGVnIHJvdGF0aW9uXG5cblx0XHR9XG5cblx0XHQvLyBhcyB3ZSBoYXZlIHJlYWNoZWQgaGVyZSB0aGVyZSBhcmUgbm8gc2luZ3VsYXJpdGllcyBzbyB3ZSBjYW4gaGFuZGxlIG5vcm1hbGx5XG5cblx0XHR2YXIgcyA9IE1hdGguc3FydCggKCBtMzIgLSBtMjMgKSAqICggbTMyIC0gbTIzIClcblx0XHRcdFx0XHRcdCAgKyAoIG0xMyAtIG0zMSApICogKCBtMTMgLSBtMzEgKVxuXHRcdFx0XHRcdFx0ICArICggbTIxIC0gbTEyICkgKiAoIG0yMSAtIG0xMiApICk7IC8vIHVzZWQgdG8gbm9ybWFsaXplXG5cblx0XHRpZiAoIE1hdGguYWJzKCBzICkgPCAwLjAwMSApIHMgPSAxO1xuXG5cdFx0Ly8gcHJldmVudCBkaXZpZGUgYnkgemVybywgc2hvdWxkIG5vdCBoYXBwZW4gaWYgbWF0cml4IGlzIG9ydGhvZ29uYWwgYW5kIHNob3VsZCBiZVxuXHRcdC8vIGNhdWdodCBieSBzaW5ndWxhcml0eSB0ZXN0IGFib3ZlLCBidXQgSSd2ZSBsZWZ0IGl0IGluIGp1c3QgaW4gY2FzZVxuXG5cdFx0dGhpcy54ID0gKCBtMzIgLSBtMjMgKSAvIHM7XG5cdFx0dGhpcy55ID0gKCBtMTMgLSBtMzEgKSAvIHM7XG5cdFx0dGhpcy56ID0gKCBtMjEgLSBtMTIgKSAvIHM7XG5cdFx0dGhpcy53ID0gTWF0aC5hY29zKCAoIG0xMSArIG0yMiArIG0zMyAtIDEgKSAvIDIgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWluOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRpZiAoIHRoaXMueCA+IHYueCApIHtcblxuXHRcdFx0dGhpcy54ID0gdi54O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnkgPiB2LnkgKSB7XG5cblx0XHRcdHRoaXMueSA9IHYueTtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy56ID4gdi56ICkge1xuXG5cdFx0XHR0aGlzLnogPSB2Lno7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMudyA+IHYudyApIHtcblxuXHRcdFx0dGhpcy53ID0gdi53O1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtYXg6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdGlmICggdGhpcy54IDwgdi54ICkge1xuXG5cdFx0XHR0aGlzLnggPSB2Lng7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMueSA8IHYueSApIHtcblxuXHRcdFx0dGhpcy55ID0gdi55O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnogPCB2LnogKSB7XG5cblx0XHRcdHRoaXMueiA9IHYuejtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy53IDwgdi53ICkge1xuXG5cdFx0XHR0aGlzLncgPSB2Lnc7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNsYW1wOiBmdW5jdGlvbiAoIG1pbiwgbWF4ICkge1xuXG5cdFx0Ly8gVGhpcyBmdW5jdGlvbiBhc3N1bWVzIG1pbiA8IG1heCwgaWYgdGhpcyBhc3N1bXB0aW9uIGlzbid0IHRydWUgaXQgd2lsbCBub3Qgb3BlcmF0ZSBjb3JyZWN0bHlcblxuXHRcdGlmICggdGhpcy54IDwgbWluLnggKSB7XG5cblx0XHRcdHRoaXMueCA9IG1pbi54O1xuXG5cdFx0fSBlbHNlIGlmICggdGhpcy54ID4gbWF4LnggKSB7XG5cblx0XHRcdHRoaXMueCA9IG1heC54O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnkgPCBtaW4ueSApIHtcblxuXHRcdFx0dGhpcy55ID0gbWluLnk7XG5cblx0XHR9IGVsc2UgaWYgKCB0aGlzLnkgPiBtYXgueSApIHtcblxuXHRcdFx0dGhpcy55ID0gbWF4Lnk7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMueiA8IG1pbi56ICkge1xuXG5cdFx0XHR0aGlzLnogPSBtaW4uejtcblxuXHRcdH0gZWxzZSBpZiAoIHRoaXMueiA+IG1heC56ICkge1xuXG5cdFx0XHR0aGlzLnogPSBtYXguejtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy53IDwgbWluLncgKSB7XG5cblx0XHRcdHRoaXMudyA9IG1pbi53O1xuXG5cdFx0fSBlbHNlIGlmICggdGhpcy53ID4gbWF4LncgKSB7XG5cblx0XHRcdHRoaXMudyA9IG1heC53O1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjbGFtcFNjYWxhcjogKCBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgbWluLCBtYXg7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBtaW5WYWwsIG1heFZhbCApIHtcblxuXHRcdFx0aWYgKCBtaW4gPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRtaW4gPSBuZXcgVEhSRUUuVmVjdG9yNCgpO1xuXHRcdFx0XHRtYXggPSBuZXcgVEhSRUUuVmVjdG9yNCgpO1xuXG5cdFx0XHR9XG5cblx0XHRcdG1pbi5zZXQoIG1pblZhbCwgbWluVmFsLCBtaW5WYWwsIG1pblZhbCApO1xuXHRcdFx0bWF4LnNldCggbWF4VmFsLCBtYXhWYWwsIG1heFZhbCwgbWF4VmFsICk7XG5cblx0XHRcdHJldHVybiB0aGlzLmNsYW1wKCBtaW4sIG1heCApO1xuXG5cdFx0fTtcblxuXHR9ICkoKSxcblxuICBmbG9vcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gTWF0aC5mbG9vciggdGhpcy54ICk7XG5cdFx0dGhpcy55ID0gTWF0aC5mbG9vciggdGhpcy55ICk7XG5cdFx0dGhpcy56ID0gTWF0aC5mbG9vciggdGhpcy56ICk7XG5cdFx0dGhpcy53ID0gTWF0aC5mbG9vciggdGhpcy53ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuICB9LFxuXG4gIGNlaWw6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9IE1hdGguY2VpbCggdGhpcy54ICk7XG5cdFx0dGhpcy55ID0gTWF0aC5jZWlsKCB0aGlzLnkgKTtcblx0XHR0aGlzLnogPSBNYXRoLmNlaWwoIHRoaXMueiApO1xuXHRcdHRoaXMudyA9IE1hdGguY2VpbCggdGhpcy53ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuICB9LFxuXG4gIHJvdW5kOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnggPSBNYXRoLnJvdW5kKCB0aGlzLnggKTtcblx0XHR0aGlzLnkgPSBNYXRoLnJvdW5kKCB0aGlzLnkgKTtcblx0XHR0aGlzLnogPSBNYXRoLnJvdW5kKCB0aGlzLnogKTtcblx0XHR0aGlzLncgPSBNYXRoLnJvdW5kKCB0aGlzLncgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG4gIH0sXG5cbiAgcm91bmRUb1plcm86IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9ICggdGhpcy54IDwgMCApID8gTWF0aC5jZWlsKCB0aGlzLnggKSA6IE1hdGguZmxvb3IoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9ICggdGhpcy55IDwgMCApID8gTWF0aC5jZWlsKCB0aGlzLnkgKSA6IE1hdGguZmxvb3IoIHRoaXMueSApO1xuXHRcdHRoaXMueiA9ICggdGhpcy56IDwgMCApID8gTWF0aC5jZWlsKCB0aGlzLnogKSA6IE1hdGguZmxvb3IoIHRoaXMueiApO1xuXHRcdHRoaXMudyA9ICggdGhpcy53IDwgMCApID8gTWF0aC5jZWlsKCB0aGlzLncgKSA6IE1hdGguZmxvb3IoIHRoaXMudyApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cbiAgfSxcblxuXHRuZWdhdGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9IC0gdGhpcy54O1xuXHRcdHRoaXMueSA9IC0gdGhpcy55O1xuXHRcdHRoaXMueiA9IC0gdGhpcy56O1xuXHRcdHRoaXMudyA9IC0gdGhpcy53O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRkb3Q6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2LnkgKyB0aGlzLnogKiB2LnogKyB0aGlzLncgKiB2Lnc7XG5cblx0fSxcblxuXHRsZW5ndGhTcTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSArIHRoaXMueiAqIHRoaXMueiArIHRoaXMudyAqIHRoaXMudztcblxuXHR9LFxuXG5cdGxlbmd0aDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIE1hdGguc3FydCggdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICsgdGhpcy56ICogdGhpcy56ICsgdGhpcy53ICogdGhpcy53ICk7XG5cblx0fSxcblxuXHRsZW5ndGhNYW5oYXR0YW46IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBNYXRoLmFicyggdGhpcy54ICkgKyBNYXRoLmFicyggdGhpcy55ICkgKyBNYXRoLmFicyggdGhpcy56ICkgKyBNYXRoLmFicyggdGhpcy53ICk7XG5cblx0fSxcblxuXHRub3JtYWxpemU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLmRpdmlkZVNjYWxhciggdGhpcy5sZW5ndGgoKSApO1xuXG5cdH0sXG5cblx0c2V0TGVuZ3RoOiBmdW5jdGlvbiAoIGwgKSB7XG5cblx0XHR2YXIgb2xkTGVuZ3RoID0gdGhpcy5sZW5ndGgoKTtcblxuXHRcdGlmICggb2xkTGVuZ3RoICE9PSAwICYmIGwgIT09IG9sZExlbmd0aCApIHtcblxuXHRcdFx0dGhpcy5tdWx0aXBseVNjYWxhciggbCAvIG9sZExlbmd0aCApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRsZXJwOiBmdW5jdGlvbiAoIHYsIGFscGhhICkge1xuXG5cdFx0dGhpcy54ICs9ICggdi54IC0gdGhpcy54ICkgKiBhbHBoYTtcblx0XHR0aGlzLnkgKz0gKCB2LnkgLSB0aGlzLnkgKSAqIGFscGhhO1xuXHRcdHRoaXMueiArPSAoIHYueiAtIHRoaXMueiApICogYWxwaGE7XG5cdFx0dGhpcy53ICs9ICggdi53IC0gdGhpcy53ICkgKiBhbHBoYTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bGVycFZlY3RvcnM6IGZ1bmN0aW9uICggdjEsIHYyLCBhbHBoYSApIHtcblxuXHRcdHRoaXMuc3ViVmVjdG9ycyggdjIsIHYxICkubXVsdGlwbHlTY2FsYXIoIGFscGhhICkuYWRkKCB2MSApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlcXVhbHM6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHJldHVybiAoICggdi54ID09PSB0aGlzLnggKSAmJiAoIHYueSA9PT0gdGhpcy55ICkgJiYgKCB2LnogPT09IHRoaXMueiApICYmICggdi53ID09PSB0aGlzLncgKSApO1xuXG5cdH0sXG5cblx0ZnJvbUFycmF5OiBmdW5jdGlvbiAoIGFycmF5LCBvZmZzZXQgKSB7XG5cblx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblxuXHRcdHRoaXMueCA9IGFycmF5WyBvZmZzZXQgXTtcblx0XHR0aGlzLnkgPSBhcnJheVsgb2Zmc2V0ICsgMSBdO1xuXHRcdHRoaXMueiA9IGFycmF5WyBvZmZzZXQgKyAyIF07XG5cdFx0dGhpcy53ID0gYXJyYXlbIG9mZnNldCArIDMgXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dG9BcnJheTogZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0ICkge1xuXG5cdFx0aWYgKCBhcnJheSA9PT0gdW5kZWZpbmVkICkgYXJyYXkgPSBbXTtcblx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblxuXHRcdGFycmF5WyBvZmZzZXQgXSA9IHRoaXMueDtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMSBdID0gdGhpcy55O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAyIF0gPSB0aGlzLno7XG5cdFx0YXJyYXlbIG9mZnNldCArIDMgXSA9IHRoaXMudztcblxuXHRcdHJldHVybiBhcnJheTtcblxuXHR9LFxuXG5cdGZyb21BdHRyaWJ1dGU6IGZ1bmN0aW9uICggYXR0cmlidXRlLCBpbmRleCwgb2Zmc2V0ICkge1xuXG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHRpbmRleCA9IGluZGV4ICogYXR0cmlidXRlLml0ZW1TaXplICsgb2Zmc2V0O1xuXG5cdFx0dGhpcy54ID0gYXR0cmlidXRlLmFycmF5WyBpbmRleCBdO1xuXHRcdHRoaXMueSA9IGF0dHJpYnV0ZS5hcnJheVsgaW5kZXggKyAxIF07XG5cdFx0dGhpcy56ID0gYXR0cmlidXRlLmFycmF5WyBpbmRleCArIDIgXTtcblx0XHR0aGlzLncgPSBhdHRyaWJ1dGUuYXJyYXlbIGluZGV4ICsgMyBdO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIG5ldyBUSFJFRS5WZWN0b3I0KCB0aGlzLngsIHRoaXMueSwgdGhpcy56LCB0aGlzLncgKTtcblxuXHR9XG5cbn07XG5cbi8vIEZpbGU6c3JjL21hdGgvRXVsZXIuanNcblxuLyoqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICogQGF1dGhvciBXZXN0TGFuZ2xleSAvIGh0dHA6Ly9naXRodWIuY29tL1dlc3RMYW5nbGV5XG4gKiBAYXV0aG9yIGJob3VzdG9uIC8gaHR0cDovL2V4b2NvcnRleC5jb21cbiAqL1xuXG5USFJFRS5FdWxlciA9IGZ1bmN0aW9uICggeCwgeSwgeiwgb3JkZXIgKSB7XG5cblx0dGhpcy5feCA9IHggfHwgMDtcblx0dGhpcy5feSA9IHkgfHwgMDtcblx0dGhpcy5feiA9IHogfHwgMDtcblx0dGhpcy5fb3JkZXIgPSBvcmRlciB8fCBUSFJFRS5FdWxlci5EZWZhdWx0T3JkZXI7XG5cbn07XG5cblRIUkVFLkV1bGVyLlJvdGF0aW9uT3JkZXJzID0gWyAnWFlaJywgJ1laWCcsICdaWFknLCAnWFpZJywgJ1lYWicsICdaWVgnIF07XG5cblRIUkVFLkV1bGVyLkRlZmF1bHRPcmRlciA9ICdYWVonO1xuXG5USFJFRS5FdWxlci5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IFRIUkVFLkV1bGVyLFxuXG5cdF94OiAwLCBfeTogMCwgX3o6IDAsIF9vcmRlcjogVEhSRUUuRXVsZXIuRGVmYXVsdE9yZGVyLFxuXG5cdGdldCB4ICgpIHtcblxuXHRcdHJldHVybiB0aGlzLl94O1xuXG5cdH0sXG5cblx0c2V0IHggKCB2YWx1ZSApIHtcblxuXHRcdHRoaXMuX3ggPSB2YWx1ZTtcblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHR9LFxuXG5cdGdldCB5ICgpIHtcblxuXHRcdHJldHVybiB0aGlzLl95O1xuXG5cdH0sXG5cblx0c2V0IHkgKCB2YWx1ZSApIHtcblxuXHRcdHRoaXMuX3kgPSB2YWx1ZTtcblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHR9LFxuXG5cdGdldCB6ICgpIHtcblxuXHRcdHJldHVybiB0aGlzLl96O1xuXG5cdH0sXG5cblx0c2V0IHogKCB2YWx1ZSApIHtcblxuXHRcdHRoaXMuX3ogPSB2YWx1ZTtcblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHR9LFxuXG5cdGdldCBvcmRlciAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5fb3JkZXI7XG5cblx0fSxcblxuXHRzZXQgb3JkZXIgKCB2YWx1ZSApIHtcblxuXHRcdHRoaXMuX29yZGVyID0gdmFsdWU7XG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0fSxcblxuXHRzZXQ6IGZ1bmN0aW9uICggeCwgeSwgeiwgb3JkZXIgKSB7XG5cblx0XHR0aGlzLl94ID0geDtcblx0XHR0aGlzLl95ID0geTtcblx0XHR0aGlzLl96ID0gejtcblx0XHR0aGlzLl9vcmRlciA9IG9yZGVyIHx8IHRoaXMuX29yZGVyO1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNvcHk6IGZ1bmN0aW9uICggZXVsZXIgKSB7XG5cblx0XHR0aGlzLl94ID0gZXVsZXIuX3g7XG5cdFx0dGhpcy5feSA9IGV1bGVyLl95O1xuXHRcdHRoaXMuX3ogPSBldWxlci5fejtcblx0XHR0aGlzLl9vcmRlciA9IGV1bGVyLl9vcmRlcjtcblxuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRGcm9tUm90YXRpb25NYXRyaXg6IGZ1bmN0aW9uICggbSwgb3JkZXIsIHVwZGF0ZSApIHtcblxuXHRcdHZhciBjbGFtcCA9IFRIUkVFLk1hdGguY2xhbXA7XG5cblx0XHQvLyBhc3N1bWVzIHRoZSB1cHBlciAzeDMgb2YgbSBpcyBhIHB1cmUgcm90YXRpb24gbWF0cml4IChpLmUsIHVuc2NhbGVkKVxuXG5cdFx0dmFyIHRlID0gbS5lbGVtZW50cztcblx0XHR2YXIgbTExID0gdGVbIDAgXSwgbTEyID0gdGVbIDQgXSwgbTEzID0gdGVbIDggXTtcblx0XHR2YXIgbTIxID0gdGVbIDEgXSwgbTIyID0gdGVbIDUgXSwgbTIzID0gdGVbIDkgXTtcblx0XHR2YXIgbTMxID0gdGVbIDIgXSwgbTMyID0gdGVbIDYgXSwgbTMzID0gdGVbIDEwIF07XG5cblx0XHRvcmRlciA9IG9yZGVyIHx8IHRoaXMuX29yZGVyO1xuXG5cdFx0aWYgKCBvcmRlciA9PT0gJ1hZWicgKSB7XG5cblx0XHRcdHRoaXMuX3kgPSBNYXRoLmFzaW4oIGNsYW1wKCBtMTMsIC0gMSwgMSApICk7XG5cblx0XHRcdGlmICggTWF0aC5hYnMoIG0xMyApIDwgMC45OTk5OSApIHtcblxuXHRcdFx0XHR0aGlzLl94ID0gTWF0aC5hdGFuMiggLSBtMjMsIG0zMyApO1xuXHRcdFx0XHR0aGlzLl96ID0gTWF0aC5hdGFuMiggLSBtMTIsIG0xMSApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHRoaXMuX3ggPSBNYXRoLmF0YW4yKCBtMzIsIG0yMiApO1xuXHRcdFx0XHR0aGlzLl96ID0gMDtcblxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIGlmICggb3JkZXIgPT09ICdZWFonICkge1xuXG5cdFx0XHR0aGlzLl94ID0gTWF0aC5hc2luKCAtIGNsYW1wKCBtMjMsIC0gMSwgMSApICk7XG5cblx0XHRcdGlmICggTWF0aC5hYnMoIG0yMyApIDwgMC45OTk5OSApIHtcblxuXHRcdFx0XHR0aGlzLl95ID0gTWF0aC5hdGFuMiggbTEzLCBtMzMgKTtcblx0XHRcdFx0dGhpcy5feiA9IE1hdGguYXRhbjIoIG0yMSwgbTIyICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0dGhpcy5feSA9IE1hdGguYXRhbjIoIC0gbTMxLCBtMTEgKTtcblx0XHRcdFx0dGhpcy5feiA9IDA7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSBpZiAoIG9yZGVyID09PSAnWlhZJyApIHtcblxuXHRcdFx0dGhpcy5feCA9IE1hdGguYXNpbiggY2xhbXAoIG0zMiwgLSAxLCAxICkgKTtcblxuXHRcdFx0aWYgKCBNYXRoLmFicyggbTMyICkgPCAwLjk5OTk5ICkge1xuXG5cdFx0XHRcdHRoaXMuX3kgPSBNYXRoLmF0YW4yKCAtIG0zMSwgbTMzICk7XG5cdFx0XHRcdHRoaXMuX3ogPSBNYXRoLmF0YW4yKCAtIG0xMiwgbTIyICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0dGhpcy5feSA9IDA7XG5cdFx0XHRcdHRoaXMuX3ogPSBNYXRoLmF0YW4yKCBtMjEsIG0xMSApO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2UgaWYgKCBvcmRlciA9PT0gJ1pZWCcgKSB7XG5cblx0XHRcdHRoaXMuX3kgPSBNYXRoLmFzaW4oIC0gY2xhbXAoIG0zMSwgLSAxLCAxICkgKTtcblxuXHRcdFx0aWYgKCBNYXRoLmFicyggbTMxICkgPCAwLjk5OTk5ICkge1xuXG5cdFx0XHRcdHRoaXMuX3ggPSBNYXRoLmF0YW4yKCBtMzIsIG0zMyApO1xuXHRcdFx0XHR0aGlzLl96ID0gTWF0aC5hdGFuMiggbTIxLCBtMTEgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR0aGlzLl94ID0gMDtcblx0XHRcdFx0dGhpcy5feiA9IE1hdGguYXRhbjIoIC0gbTEyLCBtMjIgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIGlmICggb3JkZXIgPT09ICdZWlgnICkge1xuXG5cdFx0XHR0aGlzLl96ID0gTWF0aC5hc2luKCBjbGFtcCggbTIxLCAtIDEsIDEgKSApO1xuXG5cdFx0XHRpZiAoIE1hdGguYWJzKCBtMjEgKSA8IDAuOTk5OTkgKSB7XG5cblx0XHRcdFx0dGhpcy5feCA9IE1hdGguYXRhbjIoIC0gbTIzLCBtMjIgKTtcblx0XHRcdFx0dGhpcy5feSA9IE1hdGguYXRhbjIoIC0gbTMxLCBtMTEgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR0aGlzLl94ID0gMDtcblx0XHRcdFx0dGhpcy5feSA9IE1hdGguYXRhbjIoIG0xMywgbTMzICk7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSBpZiAoIG9yZGVyID09PSAnWFpZJyApIHtcblxuXHRcdFx0dGhpcy5feiA9IE1hdGguYXNpbiggLSBjbGFtcCggbTEyLCAtIDEsIDEgKSApO1xuXG5cdFx0XHRpZiAoIE1hdGguYWJzKCBtMTIgKSA8IDAuOTk5OTkgKSB7XG5cblx0XHRcdFx0dGhpcy5feCA9IE1hdGguYXRhbjIoIG0zMiwgbTIyICk7XG5cdFx0XHRcdHRoaXMuX3kgPSBNYXRoLmF0YW4yKCBtMTMsIG0xMSApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHRoaXMuX3ggPSBNYXRoLmF0YW4yKCAtIG0yMywgbTMzICk7XG5cdFx0XHRcdHRoaXMuX3kgPSAwO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5FdWxlcjogLnNldEZyb21Sb3RhdGlvbk1hdHJpeCgpIGdpdmVuIHVuc3VwcG9ydGVkIG9yZGVyOiAnICsgb3JkZXIgKVxuXG5cdFx0fVxuXG5cdFx0dGhpcy5fb3JkZXIgPSBvcmRlcjtcblxuXHRcdGlmICggdXBkYXRlICE9PSBmYWxzZSApIHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRGcm9tUXVhdGVybmlvbjogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIG1hdHJpeDtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHEsIG9yZGVyLCB1cGRhdGUgKSB7XG5cblx0XHRcdGlmICggbWF0cml4ID09PSB1bmRlZmluZWQgKSBtYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXHRcdFx0bWF0cml4Lm1ha2VSb3RhdGlvbkZyb21RdWF0ZXJuaW9uKCBxICk7XG5cdFx0XHR0aGlzLnNldEZyb21Sb3RhdGlvbk1hdHJpeCggbWF0cml4LCBvcmRlciwgdXBkYXRlICk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0c2V0RnJvbVZlY3RvcjM6IGZ1bmN0aW9uICggdiwgb3JkZXIgKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5zZXQoIHYueCwgdi55LCB2LnosIG9yZGVyIHx8IHRoaXMuX29yZGVyICk7XG5cblx0fSxcblxuXHRyZW9yZGVyOiBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBXQVJOSU5HOiB0aGlzIGRpc2NhcmRzIHJldm9sdXRpb24gaW5mb3JtYXRpb24gLWJob3VzdG9uXG5cblx0XHR2YXIgcSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBuZXdPcmRlciApIHtcblxuXHRcdFx0cS5zZXRGcm9tRXVsZXIoIHRoaXMgKTtcblx0XHRcdHRoaXMuc2V0RnJvbVF1YXRlcm5pb24oIHEsIG5ld09yZGVyICk7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRlcXVhbHM6IGZ1bmN0aW9uICggZXVsZXIgKSB7XG5cblx0XHRyZXR1cm4gKCBldWxlci5feCA9PT0gdGhpcy5feCApICYmICggZXVsZXIuX3kgPT09IHRoaXMuX3kgKSAmJiAoIGV1bGVyLl96ID09PSB0aGlzLl96ICkgJiYgKCBldWxlci5fb3JkZXIgPT09IHRoaXMuX29yZGVyICk7XG5cblx0fSxcblxuXHRmcm9tQXJyYXk6IGZ1bmN0aW9uICggYXJyYXkgKSB7XG5cblx0XHR0aGlzLl94ID0gYXJyYXlbIDAgXTtcblx0XHR0aGlzLl95ID0gYXJyYXlbIDEgXTtcblx0XHR0aGlzLl96ID0gYXJyYXlbIDIgXTtcblx0XHRpZiAoIGFycmF5WyAzIF0gIT09IHVuZGVmaW5lZCApIHRoaXMuX29yZGVyID0gYXJyYXlbIDMgXTtcblxuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR0b0FycmF5OiBmdW5jdGlvbiAoIGFycmF5LCBvZmZzZXQgKSB7XG5cblx0XHRpZiAoIGFycmF5ID09PSB1bmRlZmluZWQgKSBhcnJheSA9IFtdO1xuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0YXJyYXlbIG9mZnNldCBdID0gdGhpcy5feDtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMSBdID0gdGhpcy5feTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMiBdID0gdGhpcy5fejtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMyBdID0gdGhpcy5fb3JkZXI7XG5cblx0XHRyZXR1cm4gYXJyYXk7XG5cdH0sXG5cblx0dG9WZWN0b3IzOiBmdW5jdGlvbiAoIG9wdGlvbmFsUmVzdWx0ICkge1xuXG5cdFx0aWYgKCBvcHRpb25hbFJlc3VsdCApIHtcblxuXHRcdFx0cmV0dXJuIG9wdGlvbmFsUmVzdWx0LnNldCggdGhpcy5feCwgdGhpcy5feSwgdGhpcy5feiApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0cmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IzKCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLl96ICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRvbkNoYW5nZTogZnVuY3Rpb24gKCBjYWxsYmFjayApIHtcblxuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGNhbGxiYWNrO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvbkNoYW5nZUNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7fSxcblxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIG5ldyBUSFJFRS5FdWxlciggdGhpcy5feCwgdGhpcy5feSwgdGhpcy5feiwgdGhpcy5fb3JkZXIgKTtcblxuXHR9XG5cbn07XG5cbi8vIEZpbGU6c3JjL21hdGgvTGluZTMuanNcblxuLyoqXG4gKiBAYXV0aG9yIGJob3VzdG9uIC8gaHR0cDovL2V4b2NvcnRleC5jb21cbiAqL1xuXG5USFJFRS5MaW5lMyA9IGZ1bmN0aW9uICggc3RhcnQsIGVuZCApIHtcblxuXHR0aGlzLnN0YXJ0ID0gKCBzdGFydCAhPT0gdW5kZWZpbmVkICkgPyBzdGFydCA6IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdHRoaXMuZW5kID0gKCBlbmQgIT09IHVuZGVmaW5lZCApID8gZW5kIDogbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxufTtcblxuVEhSRUUuTGluZTMucHJvdG90eXBlID0ge1xuXG5cdGNvbnN0cnVjdG9yOiBUSFJFRS5MaW5lMyxcblxuXHRzZXQ6IGZ1bmN0aW9uICggc3RhcnQsIGVuZCApIHtcblxuXHRcdHRoaXMuc3RhcnQuY29weSggc3RhcnQgKTtcblx0XHR0aGlzLmVuZC5jb3B5KCBlbmQgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y29weTogZnVuY3Rpb24gKCBsaW5lICkge1xuXG5cdFx0dGhpcy5zdGFydC5jb3B5KCBsaW5lLnN0YXJ0ICk7XG5cdFx0dGhpcy5lbmQuY29weSggbGluZS5lbmQgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2VudGVyOiBmdW5jdGlvbiAoIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0cmV0dXJuIHJlc3VsdC5hZGRWZWN0b3JzKCB0aGlzLnN0YXJ0LCB0aGlzLmVuZCApLm11bHRpcGx5U2NhbGFyKCAwLjUgKTtcblxuXHR9LFxuXG5cdGRlbHRhOiBmdW5jdGlvbiAoIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0cmV0dXJuIHJlc3VsdC5zdWJWZWN0b3JzKCB0aGlzLmVuZCwgdGhpcy5zdGFydCApO1xuXG5cdH0sXG5cblx0ZGlzdGFuY2VTcTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuc3RhcnQuZGlzdGFuY2VUb1NxdWFyZWQoIHRoaXMuZW5kICk7XG5cblx0fSxcblxuXHRkaXN0YW5jZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuc3RhcnQuZGlzdGFuY2VUbyggdGhpcy5lbmQgKTtcblxuXHR9LFxuXG5cdGF0OiBmdW5jdGlvbiAoIHQsIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5kZWx0YSggcmVzdWx0ICkubXVsdGlwbHlTY2FsYXIoIHQgKS5hZGQoIHRoaXMuc3RhcnQgKTtcblxuXHR9LFxuXG5cdGNsb3Nlc3RQb2ludFRvUG9pbnRQYXJhbWV0ZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBzdGFydFAgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHZhciBzdGFydEVuZCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBwb2ludCwgY2xhbXBUb0xpbmUgKSB7XG5cblx0XHRcdHN0YXJ0UC5zdWJWZWN0b3JzKCBwb2ludCwgdGhpcy5zdGFydCApO1xuXHRcdFx0c3RhcnRFbmQuc3ViVmVjdG9ycyggdGhpcy5lbmQsIHRoaXMuc3RhcnQgKTtcblxuXHRcdFx0dmFyIHN0YXJ0RW5kMiA9IHN0YXJ0RW5kLmRvdCggc3RhcnRFbmQgKTtcblx0XHRcdHZhciBzdGFydEVuZF9zdGFydFAgPSBzdGFydEVuZC5kb3QoIHN0YXJ0UCApO1xuXG5cdFx0XHR2YXIgdCA9IHN0YXJ0RW5kX3N0YXJ0UCAvIHN0YXJ0RW5kMjtcblxuXHRcdFx0aWYgKCBjbGFtcFRvTGluZSApIHtcblxuXHRcdFx0XHR0ID0gVEhSRUUuTWF0aC5jbGFtcCggdCwgMCwgMSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0O1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0Y2xvc2VzdFBvaW50VG9Qb2ludDogZnVuY3Rpb24gKCBwb2ludCwgY2xhbXBUb0xpbmUsIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIHQgPSB0aGlzLmNsb3Nlc3RQb2ludFRvUG9pbnRQYXJhbWV0ZXIoIHBvaW50LCBjbGFtcFRvTGluZSApO1xuXG5cdFx0dmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5kZWx0YSggcmVzdWx0ICkubXVsdGlwbHlTY2FsYXIoIHQgKS5hZGQoIHRoaXMuc3RhcnQgKTtcblxuXHR9LFxuXG5cdGFwcGx5TWF0cml4NDogZnVuY3Rpb24gKCBtYXRyaXggKSB7XG5cblx0XHR0aGlzLnN0YXJ0LmFwcGx5TWF0cml4NCggbWF0cml4ICk7XG5cdFx0dGhpcy5lbmQuYXBwbHlNYXRyaXg0KCBtYXRyaXggKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZXF1YWxzOiBmdW5jdGlvbiAoIGxpbmUgKSB7XG5cblx0XHRyZXR1cm4gbGluZS5zdGFydC5lcXVhbHMoIHRoaXMuc3RhcnQgKSAmJiBsaW5lLmVuZC5lcXVhbHMoIHRoaXMuZW5kICk7XG5cblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIG5ldyBUSFJFRS5MaW5lMygpLmNvcHkoIHRoaXMgKTtcblxuXHR9XG5cbn07XG5cbi8vIEZpbGU6c3JjL21hdGgvQm94Mi5qc1xuXG4vKipcbiAqIEBhdXRob3IgYmhvdXN0b24gLyBodHRwOi8vZXhvY29ydGV4LmNvbVxuICovXG5cblRIUkVFLkJveDIgPSBmdW5jdGlvbiAoIG1pbiwgbWF4ICkge1xuXG5cdHRoaXMubWluID0gKCBtaW4gIT09IHVuZGVmaW5lZCApID8gbWluIDogbmV3IFRIUkVFLlZlY3RvcjIoIEluZmluaXR5LCBJbmZpbml0eSApO1xuXHR0aGlzLm1heCA9ICggbWF4ICE9PSB1bmRlZmluZWQgKSA/IG1heCA6IG5ldyBUSFJFRS5WZWN0b3IyKCAtIEluZmluaXR5LCAtIEluZmluaXR5ICk7XG5cbn07XG5cblRIUkVFLkJveDIucHJvdG90eXBlID0ge1xuXG5cdGNvbnN0cnVjdG9yOiBUSFJFRS5Cb3gyLFxuXG5cdHNldDogZnVuY3Rpb24gKCBtaW4sIG1heCApIHtcblxuXHRcdHRoaXMubWluLmNvcHkoIG1pbiApO1xuXHRcdHRoaXMubWF4LmNvcHkoIG1heCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRGcm9tUG9pbnRzOiBmdW5jdGlvbiAoIHBvaW50cyApIHtcblxuXHRcdHRoaXMubWFrZUVtcHR5KCk7XG5cblx0XHRmb3IgKCB2YXIgaSA9IDAsIGlsID0gcG9pbnRzLmxlbmd0aDsgaSA8IGlsOyBpICsrICkge1xuXG5cdFx0XHR0aGlzLmV4cGFuZEJ5UG9pbnQoIHBvaW50c1sgaSBdIClcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbUNlbnRlckFuZFNpemU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBjZW50ZXIsIHNpemUgKSB7XG5cblx0XHRcdHZhciBoYWxmU2l6ZSA9IHYxLmNvcHkoIHNpemUgKS5tdWx0aXBseVNjYWxhciggMC41ICk7XG5cdFx0XHR0aGlzLm1pbi5jb3B5KCBjZW50ZXIgKS5zdWIoIGhhbGZTaXplICk7XG5cdFx0XHR0aGlzLm1heC5jb3B5KCBjZW50ZXIgKS5hZGQoIGhhbGZTaXplICk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0Y29weTogZnVuY3Rpb24gKCBib3ggKSB7XG5cblx0XHR0aGlzLm1pbi5jb3B5KCBib3gubWluICk7XG5cdFx0dGhpcy5tYXguY29weSggYm94Lm1heCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtYWtlRW1wdHk6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMubWluLnggPSB0aGlzLm1pbi55ID0gSW5maW5pdHk7XG5cdFx0dGhpcy5tYXgueCA9IHRoaXMubWF4LnkgPSAtIEluZmluaXR5O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlbXB0eTogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gdGhpcyBpcyBhIG1vcmUgcm9idXN0IGNoZWNrIGZvciBlbXB0eSB0aGFuICggdm9sdW1lIDw9IDAgKSBiZWNhdXNlIHZvbHVtZSBjYW4gZ2V0IHBvc2l0aXZlIHdpdGggdHdvIG5lZ2F0aXZlIGF4ZXNcblxuXHRcdHJldHVybiAoIHRoaXMubWF4LnggPCB0aGlzLm1pbi54ICkgfHwgKCB0aGlzLm1heC55IDwgdGhpcy5taW4ueSApO1xuXG5cdH0sXG5cblx0Y2VudGVyOiBmdW5jdGlvbiAoIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0cmV0dXJuIHJlc3VsdC5hZGRWZWN0b3JzKCB0aGlzLm1pbiwgdGhpcy5tYXggKS5tdWx0aXBseVNjYWxhciggMC41ICk7XG5cblx0fSxcblxuXHRzaXplOiBmdW5jdGlvbiAoIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0cmV0dXJuIHJlc3VsdC5zdWJWZWN0b3JzKCB0aGlzLm1heCwgdGhpcy5taW4gKTtcblxuXHR9LFxuXG5cdGV4cGFuZEJ5UG9pbnQ6IGZ1bmN0aW9uICggcG9pbnQgKSB7XG5cblx0XHR0aGlzLm1pbi5taW4oIHBvaW50ICk7XG5cdFx0dGhpcy5tYXgubWF4KCBwb2ludCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0ZXhwYW5kQnlWZWN0b3I6IGZ1bmN0aW9uICggdmVjdG9yICkge1xuXG5cdFx0dGhpcy5taW4uc3ViKCB2ZWN0b3IgKTtcblx0XHR0aGlzLm1heC5hZGQoIHZlY3RvciApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0ZXhwYW5kQnlTY2FsYXI6IGZ1bmN0aW9uICggc2NhbGFyICkge1xuXG5cdFx0dGhpcy5taW4uYWRkU2NhbGFyKCAtIHNjYWxhciApO1xuXHRcdHRoaXMubWF4LmFkZFNjYWxhciggc2NhbGFyICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRjb250YWluc1BvaW50OiBmdW5jdGlvbiAoIHBvaW50ICkge1xuXG5cdFx0aWYgKCBwb2ludC54IDwgdGhpcy5taW4ueCB8fCBwb2ludC54ID4gdGhpcy5tYXgueCB8fFxuXHRcdCAgICAgcG9pbnQueSA8IHRoaXMubWluLnkgfHwgcG9pbnQueSA+IHRoaXMubWF4LnkgKSB7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXG5cdH0sXG5cblx0Y29udGFpbnNCb3g6IGZ1bmN0aW9uICggYm94ICkge1xuXG5cdFx0aWYgKCAoIHRoaXMubWluLnggPD0gYm94Lm1pbi54ICkgJiYgKCBib3gubWF4LnggPD0gdGhpcy5tYXgueCApICYmXG5cdFx0ICAgICAoIHRoaXMubWluLnkgPD0gYm94Lm1pbi55ICkgJiYgKCBib3gubWF4LnkgPD0gdGhpcy5tYXgueSApICkge1xuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblxuXHR9LFxuXG5cdGdldFBhcmFtZXRlcjogZnVuY3Rpb24gKCBwb2ludCwgb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHQvLyBUaGlzIGNhbiBwb3RlbnRpYWxseSBoYXZlIGEgZGl2aWRlIGJ5IHplcm8gaWYgdGhlIGJveFxuXHRcdC8vIGhhcyBhIHNpemUgZGltZW5zaW9uIG9mIDAuXG5cblx0XHR2YXIgcmVzdWx0ID0gb3B0aW9uYWxUYXJnZXQgfHwgbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuXHRcdHJldHVybiByZXN1bHQuc2V0KFxuXHRcdFx0KCBwb2ludC54IC0gdGhpcy5taW4ueCApIC8gKCB0aGlzLm1heC54IC0gdGhpcy5taW4ueCApLFxuXHRcdFx0KCBwb2ludC55IC0gdGhpcy5taW4ueSApIC8gKCB0aGlzLm1heC55IC0gdGhpcy5taW4ueSApXG5cdFx0KTtcblxuXHR9LFxuXG5cdGlzSW50ZXJzZWN0aW9uQm94OiBmdW5jdGlvbiAoIGJveCApIHtcblxuXHRcdC8vIHVzaW5nIDYgc3BsaXR0aW5nIHBsYW5lcyB0byBydWxlIG91dCBpbnRlcnNlY3Rpb25zLlxuXG5cdFx0aWYgKCBib3gubWF4LnggPCB0aGlzLm1pbi54IHx8IGJveC5taW4ueCA+IHRoaXMubWF4LnggfHxcblx0XHQgICAgIGJveC5tYXgueSA8IHRoaXMubWluLnkgfHwgYm94Lm1pbi55ID4gdGhpcy5tYXgueSApIHtcblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0fSxcblxuXHRjbGFtcFBvaW50OiBmdW5jdGlvbiAoIHBvaW50LCBvcHRpb25hbFRhcmdldCApIHtcblxuXHRcdHZhciByZXN1bHQgPSBvcHRpb25hbFRhcmdldCB8fCBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdHJldHVybiByZXN1bHQuY29weSggcG9pbnQgKS5jbGFtcCggdGhpcy5taW4sIHRoaXMubWF4ICk7XG5cblx0fSxcblxuXHRkaXN0YW5jZVRvUG9pbnQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBwb2ludCApIHtcblxuXHRcdFx0dmFyIGNsYW1wZWRQb2ludCA9IHYxLmNvcHkoIHBvaW50ICkuY2xhbXAoIHRoaXMubWluLCB0aGlzLm1heCApO1xuXHRcdFx0cmV0dXJuIGNsYW1wZWRQb2ludC5zdWIoIHBvaW50ICkubGVuZ3RoKCk7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRpbnRlcnNlY3Q6IGZ1bmN0aW9uICggYm94ICkge1xuXG5cdFx0dGhpcy5taW4ubWF4KCBib3gubWluICk7XG5cdFx0dGhpcy5tYXgubWluKCBib3gubWF4ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHVuaW9uOiBmdW5jdGlvbiAoIGJveCApIHtcblxuXHRcdHRoaXMubWluLm1pbiggYm94Lm1pbiApO1xuXHRcdHRoaXMubWF4Lm1heCggYm94Lm1heCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR0cmFuc2xhdGU6IGZ1bmN0aW9uICggb2Zmc2V0ICkge1xuXG5cdFx0dGhpcy5taW4uYWRkKCBvZmZzZXQgKTtcblx0XHR0aGlzLm1heC5hZGQoIG9mZnNldCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlcXVhbHM6IGZ1bmN0aW9uICggYm94ICkge1xuXG5cdFx0cmV0dXJuIGJveC5taW4uZXF1YWxzKCB0aGlzLm1pbiApICYmIGJveC5tYXguZXF1YWxzKCB0aGlzLm1heCApO1xuXG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBuZXcgVEhSRUUuQm94MigpLmNvcHkoIHRoaXMgKTtcblxuXHR9XG5cbn07XG5cbi8vIEZpbGU6c3JjL21hdGgvQm94My5qc1xuXG4vKipcbiAqIEBhdXRob3IgYmhvdXN0b24gLyBodHRwOi8vZXhvY29ydGV4LmNvbVxuICogQGF1dGhvciBXZXN0TGFuZ2xleSAvIGh0dHA6Ly9naXRodWIuY29tL1dlc3RMYW5nbGV5XG4gKi9cblxuVEhSRUUuQm94MyA9IGZ1bmN0aW9uICggbWluLCBtYXggKSB7XG5cblx0dGhpcy5taW4gPSAoIG1pbiAhPT0gdW5kZWZpbmVkICkgPyBtaW4gOiBuZXcgVEhSRUUuVmVjdG9yMyggSW5maW5pdHksIEluZmluaXR5LCBJbmZpbml0eSApO1xuXHR0aGlzLm1heCA9ICggbWF4ICE9PSB1bmRlZmluZWQgKSA/IG1heCA6IG5ldyBUSFJFRS5WZWN0b3IzKCAtIEluZmluaXR5LCAtIEluZmluaXR5LCAtIEluZmluaXR5ICk7XG5cbn07XG5cblRIUkVFLkJveDMucHJvdG90eXBlID0ge1xuXG5cdGNvbnN0cnVjdG9yOiBUSFJFRS5Cb3gzLFxuXG5cdHNldDogZnVuY3Rpb24gKCBtaW4sIG1heCApIHtcblxuXHRcdHRoaXMubWluLmNvcHkoIG1pbiApO1xuXHRcdHRoaXMubWF4LmNvcHkoIG1heCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRGcm9tUG9pbnRzOiBmdW5jdGlvbiAoIHBvaW50cyApIHtcblxuXHRcdHRoaXMubWFrZUVtcHR5KCk7XG5cblx0XHRmb3IgKCB2YXIgaSA9IDAsIGlsID0gcG9pbnRzLmxlbmd0aDsgaSA8IGlsOyBpICsrICkge1xuXG5cdFx0XHR0aGlzLmV4cGFuZEJ5UG9pbnQoIHBvaW50c1sgaSBdICk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldEZyb21DZW50ZXJBbmRTaXplOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggY2VudGVyLCBzaXplICkge1xuXG5cdFx0XHR2YXIgaGFsZlNpemUgPSB2MS5jb3B5KCBzaXplICkubXVsdGlwbHlTY2FsYXIoIDAuNSApO1xuXG5cdFx0XHR0aGlzLm1pbi5jb3B5KCBjZW50ZXIgKS5zdWIoIGhhbGZTaXplICk7XG5cdFx0XHR0aGlzLm1heC5jb3B5KCBjZW50ZXIgKS5hZGQoIGhhbGZTaXplICk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0c2V0RnJvbU9iamVjdDogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gQ29tcHV0ZXMgdGhlIHdvcmxkLWF4aXMtYWxpZ25lZCBib3VuZGluZyBib3ggb2YgYW4gb2JqZWN0IChpbmNsdWRpbmcgaXRzIGNoaWxkcmVuKSxcblx0XHQvLyBhY2NvdW50aW5nIGZvciBib3RoIHRoZSBvYmplY3QncywgYW5kIGNoaWxkcmVucycsIHdvcmxkIHRyYW5zZm9ybXNcblxuXHRcdHZhciB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBvYmplY3QgKSB7XG5cblx0XHRcdHZhciBzY29wZSA9IHRoaXM7XG5cblx0XHRcdG9iamVjdC51cGRhdGVNYXRyaXhXb3JsZCggdHJ1ZSApO1xuXG5cdFx0XHR0aGlzLm1ha2VFbXB0eSgpO1xuXG5cdFx0XHRvYmplY3QudHJhdmVyc2UoIGZ1bmN0aW9uICggbm9kZSApIHtcblxuXHRcdFx0XHR2YXIgZ2VvbWV0cnkgPSBub2RlLmdlb21ldHJ5O1xuXG5cdFx0XHRcdGlmICggZ2VvbWV0cnkgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRcdGlmICggZ2VvbWV0cnkgaW5zdGFuY2VvZiBUSFJFRS5HZW9tZXRyeSApIHtcblxuXHRcdFx0XHRcdFx0dmFyIHZlcnRpY2VzID0gZ2VvbWV0cnkudmVydGljZXM7XG5cblx0XHRcdFx0XHRcdGZvciAoIHZhciBpID0gMCwgaWwgPSB2ZXJ0aWNlcy5sZW5ndGg7IGkgPCBpbDsgaSArKyApIHtcblxuXHRcdFx0XHRcdFx0XHR2MS5jb3B5KCB2ZXJ0aWNlc1sgaSBdICk7XG5cblx0XHRcdFx0XHRcdFx0djEuYXBwbHlNYXRyaXg0KCBub2RlLm1hdHJpeFdvcmxkICk7XG5cblx0XHRcdFx0XHRcdFx0c2NvcGUuZXhwYW5kQnlQb2ludCggdjEgKTtcblxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0fSBlbHNlIGlmICggZ2VvbWV0cnkgaW5zdGFuY2VvZiBUSFJFRS5CdWZmZXJHZW9tZXRyeSAmJiBnZW9tZXRyeS5hdHRyaWJ1dGVzWyAncG9zaXRpb24nIF0gIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9ucyA9IGdlb21ldHJ5LmF0dHJpYnV0ZXNbICdwb3NpdGlvbicgXS5hcnJheTtcblxuXHRcdFx0XHRcdFx0Zm9yICggdmFyIGkgPSAwLCBpbCA9IHBvc2l0aW9ucy5sZW5ndGg7IGkgPCBpbDsgaSArPSAzICkge1xuXG5cdFx0XHRcdFx0XHRcdHYxLnNldCggcG9zaXRpb25zWyBpIF0sIHBvc2l0aW9uc1sgaSArIDEgXSwgcG9zaXRpb25zWyBpICsgMiBdICk7XG5cblx0XHRcdFx0XHRcdFx0djEuYXBwbHlNYXRyaXg0KCBub2RlLm1hdHJpeFdvcmxkICk7XG5cblx0XHRcdFx0XHRcdFx0c2NvcGUuZXhwYW5kQnlQb2ludCggdjEgKTtcblxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblxuXHRcdFx0fSApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGNvcHk6IGZ1bmN0aW9uICggYm94ICkge1xuXG5cdFx0dGhpcy5taW4uY29weSggYm94Lm1pbiApO1xuXHRcdHRoaXMubWF4LmNvcHkoIGJveC5tYXggKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWFrZUVtcHR5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLm1pbi54ID0gdGhpcy5taW4ueSA9IHRoaXMubWluLnogPSBJbmZpbml0eTtcblx0XHR0aGlzLm1heC54ID0gdGhpcy5tYXgueSA9IHRoaXMubWF4LnogPSAtIEluZmluaXR5O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlbXB0eTogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gdGhpcyBpcyBhIG1vcmUgcm9idXN0IGNoZWNrIGZvciBlbXB0eSB0aGFuICggdm9sdW1lIDw9IDAgKSBiZWNhdXNlIHZvbHVtZSBjYW4gZ2V0IHBvc2l0aXZlIHdpdGggdHdvIG5lZ2F0aXZlIGF4ZXNcblxuXHRcdHJldHVybiAoIHRoaXMubWF4LnggPCB0aGlzLm1pbi54ICkgfHwgKCB0aGlzLm1heC55IDwgdGhpcy5taW4ueSApIHx8ICggdGhpcy5tYXgueiA8IHRoaXMubWluLnogKTtcblxuXHR9LFxuXG5cdGNlbnRlcjogZnVuY3Rpb24gKCBvcHRpb25hbFRhcmdldCApIHtcblxuXHRcdHZhciByZXN1bHQgPSBvcHRpb25hbFRhcmdldCB8fCBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHJldHVybiByZXN1bHQuYWRkVmVjdG9ycyggdGhpcy5taW4sIHRoaXMubWF4ICkubXVsdGlwbHlTY2FsYXIoIDAuNSApO1xuXG5cdH0sXG5cblx0c2l6ZTogZnVuY3Rpb24gKCBvcHRpb25hbFRhcmdldCApIHtcblxuXHRcdHZhciByZXN1bHQgPSBvcHRpb25hbFRhcmdldCB8fCBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHJldHVybiByZXN1bHQuc3ViVmVjdG9ycyggdGhpcy5tYXgsIHRoaXMubWluICk7XG5cblx0fSxcblxuXHRleHBhbmRCeVBvaW50OiBmdW5jdGlvbiAoIHBvaW50ICkge1xuXG5cdFx0dGhpcy5taW4ubWluKCBwb2ludCApO1xuXHRcdHRoaXMubWF4Lm1heCggcG9pbnQgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZXhwYW5kQnlWZWN0b3I6IGZ1bmN0aW9uICggdmVjdG9yICkge1xuXG5cdFx0dGhpcy5taW4uc3ViKCB2ZWN0b3IgKTtcblx0XHR0aGlzLm1heC5hZGQoIHZlY3RvciApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRleHBhbmRCeVNjYWxhcjogZnVuY3Rpb24gKCBzY2FsYXIgKSB7XG5cblx0XHR0aGlzLm1pbi5hZGRTY2FsYXIoIC0gc2NhbGFyICk7XG5cdFx0dGhpcy5tYXguYWRkU2NhbGFyKCBzY2FsYXIgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y29udGFpbnNQb2ludDogZnVuY3Rpb24gKCBwb2ludCApIHtcblxuXHRcdGlmICggcG9pbnQueCA8IHRoaXMubWluLnggfHwgcG9pbnQueCA+IHRoaXMubWF4LnggfHxcblx0XHQgICAgIHBvaW50LnkgPCB0aGlzLm1pbi55IHx8IHBvaW50LnkgPiB0aGlzLm1heC55IHx8XG5cdFx0ICAgICBwb2ludC56IDwgdGhpcy5taW4ueiB8fCBwb2ludC56ID4gdGhpcy5tYXgueiApIHtcblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0fSxcblxuXHRjb250YWluc0JveDogZnVuY3Rpb24gKCBib3ggKSB7XG5cblx0XHRpZiAoICggdGhpcy5taW4ueCA8PSBib3gubWluLnggKSAmJiAoIGJveC5tYXgueCA8PSB0aGlzLm1heC54ICkgJiZcblx0XHRcdCAoIHRoaXMubWluLnkgPD0gYm94Lm1pbi55ICkgJiYgKCBib3gubWF4LnkgPD0gdGhpcy5tYXgueSApICYmXG5cdFx0XHQgKCB0aGlzLm1pbi56IDw9IGJveC5taW4ueiApICYmICggYm94Lm1heC56IDw9IHRoaXMubWF4LnogKSApIHtcblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cblx0fSxcblxuXHRnZXRQYXJhbWV0ZXI6IGZ1bmN0aW9uICggcG9pbnQsIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0Ly8gVGhpcyBjYW4gcG90ZW50aWFsbHkgaGF2ZSBhIGRpdmlkZSBieSB6ZXJvIGlmIHRoZSBib3hcblx0XHQvLyBoYXMgYSBzaXplIGRpbWVuc2lvbiBvZiAwLlxuXG5cdFx0dmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRyZXR1cm4gcmVzdWx0LnNldChcblx0XHRcdCggcG9pbnQueCAtIHRoaXMubWluLnggKSAvICggdGhpcy5tYXgueCAtIHRoaXMubWluLnggKSxcblx0XHRcdCggcG9pbnQueSAtIHRoaXMubWluLnkgKSAvICggdGhpcy5tYXgueSAtIHRoaXMubWluLnkgKSxcblx0XHRcdCggcG9pbnQueiAtIHRoaXMubWluLnogKSAvICggdGhpcy5tYXgueiAtIHRoaXMubWluLnogKVxuXHRcdCk7XG5cblx0fSxcblxuXHRpc0ludGVyc2VjdGlvbkJveDogZnVuY3Rpb24gKCBib3ggKSB7XG5cblx0XHQvLyB1c2luZyA2IHNwbGl0dGluZyBwbGFuZXMgdG8gcnVsZSBvdXQgaW50ZXJzZWN0aW9ucy5cblxuXHRcdGlmICggYm94Lm1heC54IDwgdGhpcy5taW4ueCB8fCBib3gubWluLnggPiB0aGlzLm1heC54IHx8XG5cdFx0ICAgICBib3gubWF4LnkgPCB0aGlzLm1pbi55IHx8IGJveC5taW4ueSA+IHRoaXMubWF4LnkgfHxcblx0XHQgICAgIGJveC5tYXgueiA8IHRoaXMubWluLnogfHwgYm94Lm1pbi56ID4gdGhpcy5tYXgueiApIHtcblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0fSxcblxuXHRjbGFtcFBvaW50OiBmdW5jdGlvbiAoIHBvaW50LCBvcHRpb25hbFRhcmdldCApIHtcblxuXHRcdHZhciByZXN1bHQgPSBvcHRpb25hbFRhcmdldCB8fCBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHJldHVybiByZXN1bHQuY29weSggcG9pbnQgKS5jbGFtcCggdGhpcy5taW4sIHRoaXMubWF4ICk7XG5cblx0fSxcblxuXHRkaXN0YW5jZVRvUG9pbnQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBwb2ludCApIHtcblxuXHRcdFx0dmFyIGNsYW1wZWRQb2ludCA9IHYxLmNvcHkoIHBvaW50ICkuY2xhbXAoIHRoaXMubWluLCB0aGlzLm1heCApO1xuXHRcdFx0cmV0dXJuIGNsYW1wZWRQb2ludC5zdWIoIHBvaW50ICkubGVuZ3RoKCk7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRnZXRCb3VuZGluZ1NwaGVyZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0XHR2YXIgcmVzdWx0ID0gb3B0aW9uYWxUYXJnZXQgfHwgbmV3IFRIUkVFLlNwaGVyZSgpO1xuXG5cdFx0XHRyZXN1bHQuY2VudGVyID0gdGhpcy5jZW50ZXIoKTtcblx0XHRcdHJlc3VsdC5yYWRpdXMgPSB0aGlzLnNpemUoIHYxICkubGVuZ3RoKCkgKiAwLjU7XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRpbnRlcnNlY3Q6IGZ1bmN0aW9uICggYm94ICkge1xuXG5cdFx0dGhpcy5taW4ubWF4KCBib3gubWluICk7XG5cdFx0dGhpcy5tYXgubWluKCBib3gubWF4ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHVuaW9uOiBmdW5jdGlvbiAoIGJveCApIHtcblxuXHRcdHRoaXMubWluLm1pbiggYm94Lm1pbiApO1xuXHRcdHRoaXMubWF4Lm1heCggYm94Lm1heCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhcHBseU1hdHJpeDQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBwb2ludHMgPSBbXG5cdFx0XHRuZXcgVEhSRUUuVmVjdG9yMygpLFxuXHRcdFx0bmV3IFRIUkVFLlZlY3RvcjMoKSxcblx0XHRcdG5ldyBUSFJFRS5WZWN0b3IzKCksXG5cdFx0XHRuZXcgVEhSRUUuVmVjdG9yMygpLFxuXHRcdFx0bmV3IFRIUkVFLlZlY3RvcjMoKSxcblx0XHRcdG5ldyBUSFJFRS5WZWN0b3IzKCksXG5cdFx0XHRuZXcgVEhSRUUuVmVjdG9yMygpLFxuXHRcdFx0bmV3IFRIUkVFLlZlY3RvcjMoKVxuXHRcdF07XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBtYXRyaXggKSB7XG5cblx0XHRcdC8vIE5PVEU6IEkgYW0gdXNpbmcgYSBiaW5hcnkgcGF0dGVybiB0byBzcGVjaWZ5IGFsbCAyXjMgY29tYmluYXRpb25zIGJlbG93XG5cdFx0XHRwb2ludHNbIDAgXS5zZXQoIHRoaXMubWluLngsIHRoaXMubWluLnksIHRoaXMubWluLnogKS5hcHBseU1hdHJpeDQoIG1hdHJpeCApOyAvLyAwMDBcblx0XHRcdHBvaW50c1sgMSBdLnNldCggdGhpcy5taW4ueCwgdGhpcy5taW4ueSwgdGhpcy5tYXgueiApLmFwcGx5TWF0cml4NCggbWF0cml4ICk7IC8vIDAwMVxuXHRcdFx0cG9pbnRzWyAyIF0uc2V0KCB0aGlzLm1pbi54LCB0aGlzLm1heC55LCB0aGlzLm1pbi56ICkuYXBwbHlNYXRyaXg0KCBtYXRyaXggKTsgLy8gMDEwXG5cdFx0XHRwb2ludHNbIDMgXS5zZXQoIHRoaXMubWluLngsIHRoaXMubWF4LnksIHRoaXMubWF4LnogKS5hcHBseU1hdHJpeDQoIG1hdHJpeCApOyAvLyAwMTFcblx0XHRcdHBvaW50c1sgNCBdLnNldCggdGhpcy5tYXgueCwgdGhpcy5taW4ueSwgdGhpcy5taW4ueiApLmFwcGx5TWF0cml4NCggbWF0cml4ICk7IC8vIDEwMFxuXHRcdFx0cG9pbnRzWyA1IF0uc2V0KCB0aGlzLm1heC54LCB0aGlzLm1pbi55LCB0aGlzLm1heC56ICkuYXBwbHlNYXRyaXg0KCBtYXRyaXggKTsgLy8gMTAxXG5cdFx0XHRwb2ludHNbIDYgXS5zZXQoIHRoaXMubWF4LngsIHRoaXMubWF4LnksIHRoaXMubWluLnogKS5hcHBseU1hdHJpeDQoIG1hdHJpeCApOyAvLyAxMTBcblx0XHRcdHBvaW50c1sgNyBdLnNldCggdGhpcy5tYXgueCwgdGhpcy5tYXgueSwgdGhpcy5tYXgueiApLmFwcGx5TWF0cml4NCggbWF0cml4ICk7ICAvLyAxMTFcblxuXHRcdFx0dGhpcy5tYWtlRW1wdHkoKTtcblx0XHRcdHRoaXMuc2V0RnJvbVBvaW50cyggcG9pbnRzICk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0dHJhbnNsYXRlOiBmdW5jdGlvbiAoIG9mZnNldCApIHtcblxuXHRcdHRoaXMubWluLmFkZCggb2Zmc2V0ICk7XG5cdFx0dGhpcy5tYXguYWRkKCBvZmZzZXQgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZXF1YWxzOiBmdW5jdGlvbiAoIGJveCApIHtcblxuXHRcdHJldHVybiBib3gubWluLmVxdWFscyggdGhpcy5taW4gKSAmJiBib3gubWF4LmVxdWFscyggdGhpcy5tYXggKTtcblxuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFRIUkVFLkJveDMoKS5jb3B5KCB0aGlzICk7XG5cblx0fVxuXG59O1xuXG4vLyBGaWxlOnNyYy9tYXRoL01hdHJpeDMuanNcblxuLyoqXG4gKiBAYXV0aG9yIGFsdGVyZWRxIC8gaHR0cDovL2FsdGVyZWRxdWFsaWEuY29tL1xuICogQGF1dGhvciBXZXN0TGFuZ2xleSAvIGh0dHA6Ly9naXRodWIuY29tL1dlc3RMYW5nbGV5XG4gKiBAYXV0aG9yIGJob3VzdG9uIC8gaHR0cDovL2V4b2NvcnRleC5jb21cbiAqL1xuXG5USFJFRS5NYXRyaXgzID0gZnVuY3Rpb24gKCkge1xuXG5cdHRoaXMuZWxlbWVudHMgPSBuZXcgRmxvYXQzMkFycmF5KCBbXG5cblx0XHQxLCAwLCAwLFxuXHRcdDAsIDEsIDAsXG5cdFx0MCwgMCwgMVxuXG5cdF0gKTtcblxuXHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPiAwICkge1xuXG5cdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLk1hdHJpeDM6IHRoZSBjb25zdHJ1Y3RvciBubyBsb25nZXIgcmVhZHMgYXJndW1lbnRzLiB1c2UgLnNldCgpIGluc3RlYWQuJyApO1xuXG5cdH1cblxufTtcblxuVEhSRUUuTWF0cml4My5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IFRIUkVFLk1hdHJpeDMsXG5cblx0c2V0OiBmdW5jdGlvbiAoIG4xMSwgbjEyLCBuMTMsIG4yMSwgbjIyLCBuMjMsIG4zMSwgbjMyLCBuMzMgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dGVbIDAgXSA9IG4xMTsgdGVbIDMgXSA9IG4xMjsgdGVbIDYgXSA9IG4xMztcblx0XHR0ZVsgMSBdID0gbjIxOyB0ZVsgNCBdID0gbjIyOyB0ZVsgNyBdID0gbjIzO1xuXHRcdHRlWyAyIF0gPSBuMzE7IHRlWyA1IF0gPSBuMzI7IHRlWyA4IF0gPSBuMzM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGlkZW50aXR5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnNldChcblxuXHRcdFx0MSwgMCwgMCxcblx0XHRcdDAsIDEsIDAsXG5cdFx0XHQwLCAwLCAxXG5cblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjb3B5OiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHR2YXIgbWUgPSBtLmVsZW1lbnRzO1xuXG5cdFx0dGhpcy5zZXQoXG5cblx0XHRcdG1lWyAwIF0sIG1lWyAzIF0sIG1lWyA2IF0sXG5cdFx0XHRtZVsgMSBdLCBtZVsgNCBdLCBtZVsgNyBdLFxuXHRcdFx0bWVbIDIgXSwgbWVbIDUgXSwgbWVbIDggXVxuXG5cdFx0KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlWZWN0b3IzOiBmdW5jdGlvbiAoIHZlY3RvciApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk1hdHJpeDM6IC5tdWx0aXBseVZlY3RvcjMoKSBoYXMgYmVlbiByZW1vdmVkLiBVc2UgdmVjdG9yLmFwcGx5TWF0cml4MyggbWF0cml4ICkgaW5zdGVhZC4nICk7XG5cdFx0cmV0dXJuIHZlY3Rvci5hcHBseU1hdHJpeDMoIHRoaXMgKTtcblxuXHR9LFxuXG5cdG11bHRpcGx5VmVjdG9yM0FycmF5OiBmdW5jdGlvbiAoIGEgKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5NYXRyaXgzOiAubXVsdGlwbHlWZWN0b3IzQXJyYXkoKSBoYXMgYmVlbiByZW5hbWVkLiBVc2UgbWF0cml4LmFwcGx5VG9WZWN0b3IzQXJyYXkoIGFycmF5ICkgaW5zdGVhZC4nICk7XG5cdFx0cmV0dXJuIHRoaXMuYXBwbHlUb1ZlY3RvcjNBcnJheSggYSApO1xuXG5cdH0sXG5cblx0YXBwbHlUb1ZlY3RvcjNBcnJheTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYxO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCwgbGVuZ3RoICkge1xuXG5cdFx0XHRpZiAoIHYxID09PSB1bmRlZmluZWQgKSB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblx0XHRcdGlmICggbGVuZ3RoID09PSB1bmRlZmluZWQgKSBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cblx0XHRcdGZvciAoIHZhciBpID0gMCwgaiA9IG9mZnNldDsgaSA8IGxlbmd0aDsgaSArPSAzLCBqICs9IDMgKSB7XG5cblx0XHRcdFx0djEuZnJvbUFycmF5KCBhcnJheSwgaiApO1xuXHRcdFx0XHR2MS5hcHBseU1hdHJpeDMoIHRoaXMgKTtcblx0XHRcdFx0djEudG9BcnJheSggYXJyYXksIGogKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYXJyYXk7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRhcHBseVRvQnVmZmVyOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdjE7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gYXBwbHlUb0J1ZmZlciggYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCApIHtcblxuXHRcdFx0aWYgKCB2MSA9PT0gdW5kZWZpbmVkICkgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cdFx0XHRpZiAoIGxlbmd0aCA9PT0gdW5kZWZpbmVkICkgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aCAvIGJ1ZmZlci5pdGVtU2l6ZTtcblxuXHRcdFx0Zm9yICggdmFyIGkgPSAwLCBqID0gb2Zmc2V0OyBpIDwgbGVuZ3RoOyBpICsrLCBqICsrICkge1xuXG5cdFx0XHRcdHYxLnggPSBidWZmZXIuZ2V0WCggaiApO1xuXHRcdFx0XHR2MS55ID0gYnVmZmVyLmdldFkoIGogKTtcblx0XHRcdFx0djEueiA9IGJ1ZmZlci5nZXRaKCBqICk7XG5cblx0XHRcdFx0djEuYXBwbHlNYXRyaXgzKCB0aGlzICk7XG5cblx0XHRcdFx0YnVmZmVyLnNldFhZWiggdjEueCwgdjEueSwgdjEueiApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBidWZmZXI7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRtdWx0aXBseVNjYWxhcjogZnVuY3Rpb24gKCBzICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHRlWyAwIF0gKj0gczsgdGVbIDMgXSAqPSBzOyB0ZVsgNiBdICo9IHM7XG5cdFx0dGVbIDEgXSAqPSBzOyB0ZVsgNCBdICo9IHM7IHRlWyA3IF0gKj0gcztcblx0XHR0ZVsgMiBdICo9IHM7IHRlWyA1IF0gKj0gczsgdGVbIDggXSAqPSBzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRkZXRlcm1pbmFudDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHZhciBhID0gdGVbIDAgXSwgYiA9IHRlWyAxIF0sIGMgPSB0ZVsgMiBdLFxuXHRcdFx0ZCA9IHRlWyAzIF0sIGUgPSB0ZVsgNCBdLCBmID0gdGVbIDUgXSxcblx0XHRcdGcgPSB0ZVsgNiBdLCBoID0gdGVbIDcgXSwgaSA9IHRlWyA4IF07XG5cblx0XHRyZXR1cm4gYSAqIGUgKiBpIC0gYSAqIGYgKiBoIC0gYiAqIGQgKiBpICsgYiAqIGYgKiBnICsgYyAqIGQgKiBoIC0gYyAqIGUgKiBnO1xuXG5cdH0sXG5cblx0Z2V0SW52ZXJzZTogZnVuY3Rpb24gKCBtYXRyaXgsIHRocm93T25JbnZlcnRpYmxlICkge1xuXG5cdFx0Ly8gaW5wdXQ6IFRIUkVFLk1hdHJpeDRcblx0XHQvLyAoIGJhc2VkIG9uIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC93ZWJnbC1tanMvIClcblxuXHRcdHZhciBtZSA9IG1hdHJpeC5lbGVtZW50cztcblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dGVbIDAgXSA9ICAgbWVbIDEwIF0gKiBtZVsgNSBdIC0gbWVbIDYgXSAqIG1lWyA5IF07XG5cdFx0dGVbIDEgXSA9IC0gbWVbIDEwIF0gKiBtZVsgMSBdICsgbWVbIDIgXSAqIG1lWyA5IF07XG5cdFx0dGVbIDIgXSA9ICAgbWVbIDYgXSAqIG1lWyAxIF0gLSBtZVsgMiBdICogbWVbIDUgXTtcblx0XHR0ZVsgMyBdID0gLSBtZVsgMTAgXSAqIG1lWyA0IF0gKyBtZVsgNiBdICogbWVbIDggXTtcblx0XHR0ZVsgNCBdID0gICBtZVsgMTAgXSAqIG1lWyAwIF0gLSBtZVsgMiBdICogbWVbIDggXTtcblx0XHR0ZVsgNSBdID0gLSBtZVsgNiBdICogbWVbIDAgXSArIG1lWyAyIF0gKiBtZVsgNCBdO1xuXHRcdHRlWyA2IF0gPSAgIG1lWyA5IF0gKiBtZVsgNCBdIC0gbWVbIDUgXSAqIG1lWyA4IF07XG5cdFx0dGVbIDcgXSA9IC0gbWVbIDkgXSAqIG1lWyAwIF0gKyBtZVsgMSBdICogbWVbIDggXTtcblx0XHR0ZVsgOCBdID0gICBtZVsgNSBdICogbWVbIDAgXSAtIG1lWyAxIF0gKiBtZVsgNCBdO1xuXG5cdFx0dmFyIGRldCA9IG1lWyAwIF0gKiB0ZVsgMCBdICsgbWVbIDEgXSAqIHRlWyAzIF0gKyBtZVsgMiBdICogdGVbIDYgXTtcblxuXHRcdC8vIG5vIGludmVyc2VcblxuXHRcdGlmICggZGV0ID09PSAwICkge1xuXG5cdFx0XHR2YXIgbXNnID0gXCJNYXRyaXgzLmdldEludmVyc2UoKTogY2FuJ3QgaW52ZXJ0IG1hdHJpeCwgZGV0ZXJtaW5hbnQgaXMgMFwiO1xuXG5cdFx0XHRpZiAoIHRocm93T25JbnZlcnRpYmxlIHx8IGZhbHNlICkge1xuXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvciggbXNnICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCBtc2cgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmlkZW50aXR5KCk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5tdWx0aXBseVNjYWxhciggMS4wIC8gZGV0ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRyYW5zcG9zZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHRtcCwgbSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR0bXAgPSBtWyAxIF07IG1bIDEgXSA9IG1bIDMgXTsgbVsgMyBdID0gdG1wO1xuXHRcdHRtcCA9IG1bIDIgXTsgbVsgMiBdID0gbVsgNiBdOyBtWyA2IF0gPSB0bXA7XG5cdFx0dG1wID0gbVsgNSBdOyBtWyA1IF0gPSBtWyA3IF07IG1bIDcgXSA9IHRtcDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZmxhdHRlblRvQXJyYXlPZmZzZXQ6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHRhcnJheVsgb2Zmc2V0ICAgICBdID0gdGVbIDAgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMSBdID0gdGVbIDEgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMiBdID0gdGVbIDIgXTtcblxuXHRcdGFycmF5WyBvZmZzZXQgKyAzIF0gPSB0ZVsgMyBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyA0IF0gPSB0ZVsgNCBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyA1IF0gPSB0ZVsgNSBdO1xuXG5cdFx0YXJyYXlbIG9mZnNldCArIDYgXSA9IHRlWyA2IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDcgXSA9IHRlWyA3IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDggXSAgPSB0ZVsgOCBdO1xuXG5cdFx0cmV0dXJuIGFycmF5O1xuXG5cdH0sXG5cblx0Z2V0Tm9ybWFsTWF0cml4OiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHQvLyBpbnB1dDogVEhSRUUuTWF0cml4NFxuXG5cdFx0dGhpcy5nZXRJbnZlcnNlKCBtICkudHJhbnNwb3NlKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRyYW5zcG9zZUludG9BcnJheTogZnVuY3Rpb24gKCByICkge1xuXG5cdFx0dmFyIG0gPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0clsgMCBdID0gbVsgMCBdO1xuXHRcdHJbIDEgXSA9IG1bIDMgXTtcblx0XHRyWyAyIF0gPSBtWyA2IF07XG5cdFx0clsgMyBdID0gbVsgMSBdO1xuXHRcdHJbIDQgXSA9IG1bIDQgXTtcblx0XHRyWyA1IF0gPSBtWyA3IF07XG5cdFx0clsgNiBdID0gbVsgMiBdO1xuXHRcdHJbIDcgXSA9IG1bIDUgXTtcblx0XHRyWyA4IF0gPSBtWyA4IF07XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGZyb21BcnJheTogZnVuY3Rpb24gKCBhcnJheSApIHtcblxuXHRcdHRoaXMuZWxlbWVudHMuc2V0KCBhcnJheSApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0cmV0dXJuIFtcblx0XHRcdHRlWyAwIF0sIHRlWyAxIF0sIHRlWyAyIF0sXG5cdFx0XHR0ZVsgMyBdLCB0ZVsgNCBdLCB0ZVsgNSBdLFxuXHRcdFx0dGVbIDYgXSwgdGVbIDcgXSwgdGVbIDggXVxuXHRcdF07XG5cblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIG5ldyBUSFJFRS5NYXRyaXgzKCkuZnJvbUFycmF5KCB0aGlzLmVsZW1lbnRzICk7XG5cblx0fVxuXG59O1xuXG4vLyBGaWxlOnNyYy9tYXRoL01hdHJpeDQuanNcblxuLyoqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICogQGF1dGhvciBzdXBlcmVnZ2JlcnQgLyBodHRwOi8vd3d3LnBhdWxicnVudC5jby51ay9cbiAqIEBhdXRob3IgcGhpbG9nYiAvIGh0dHA6Ly9ibG9nLnRoZWppdC5vcmcvXG4gKiBAYXV0aG9yIGpvcmRpX3JvcyAvIGh0dHA6Ly9wbGF0dHNvZnQuY29tXG4gKiBAYXV0aG9yIEQxcGxvMWQgLyBodHRwOi8vZ2l0aHViLmNvbS9EMXBsbzFkXG4gKiBAYXV0aG9yIGFsdGVyZWRxIC8gaHR0cDovL2FsdGVyZWRxdWFsaWEuY29tL1xuICogQGF1dGhvciBtaWthZWwgZW10aW5nZXIgLyBodHRwOi8vZ29tby5zZS9cbiAqIEBhdXRob3IgdGlta25pcCAvIGh0dHA6Ly93d3cuZmxvb3JwbGFubmVyLmNvbS9cbiAqIEBhdXRob3IgYmhvdXN0b24gLyBodHRwOi8vZXhvY29ydGV4LmNvbVxuICogQGF1dGhvciBXZXN0TGFuZ2xleSAvIGh0dHA6Ly9naXRodWIuY29tL1dlc3RMYW5nbGV5XG4gKi9cblxuVEhSRUUuTWF0cml4NCA9IGZ1bmN0aW9uICgpIHtcblxuXHR0aGlzLmVsZW1lbnRzID0gbmV3IEZsb2F0MzJBcnJheSggW1xuXG5cdFx0MSwgMCwgMCwgMCxcblx0XHQwLCAxLCAwLCAwLFxuXHRcdDAsIDAsIDEsIDAsXG5cdFx0MCwgMCwgMCwgMVxuXG5cdF0gKTtcblxuXHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPiAwICkge1xuXG5cdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLk1hdHJpeDQ6IHRoZSBjb25zdHJ1Y3RvciBubyBsb25nZXIgcmVhZHMgYXJndW1lbnRzLiB1c2UgLnNldCgpIGluc3RlYWQuJyApO1xuXG5cdH1cblxufTtcblxuVEhSRUUuTWF0cml4NC5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IFRIUkVFLk1hdHJpeDQsXG5cblx0c2V0OiBmdW5jdGlvbiAoIG4xMSwgbjEyLCBuMTMsIG4xNCwgbjIxLCBuMjIsIG4yMywgbjI0LCBuMzEsIG4zMiwgbjMzLCBuMzQsIG40MSwgbjQyLCBuNDMsIG40NCApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR0ZVsgMCBdID0gbjExOyB0ZVsgNCBdID0gbjEyOyB0ZVsgOCBdID0gbjEzOyB0ZVsgMTIgXSA9IG4xNDtcblx0XHR0ZVsgMSBdID0gbjIxOyB0ZVsgNSBdID0gbjIyOyB0ZVsgOSBdID0gbjIzOyB0ZVsgMTMgXSA9IG4yNDtcblx0XHR0ZVsgMiBdID0gbjMxOyB0ZVsgNiBdID0gbjMyOyB0ZVsgMTAgXSA9IG4zMzsgdGVbIDE0IF0gPSBuMzQ7XG5cdFx0dGVbIDMgXSA9IG40MTsgdGVbIDcgXSA9IG40MjsgdGVbIDExIF0gPSBuNDM7IHRlWyAxNSBdID0gbjQ0O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRpZGVudGl0eTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5zZXQoXG5cblx0XHRcdDEsIDAsIDAsIDAsXG5cdFx0XHQwLCAxLCAwLCAwLFxuXHRcdFx0MCwgMCwgMSwgMCxcblx0XHRcdDAsIDAsIDAsIDFcblxuXHRcdCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNvcHk6IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdHRoaXMuZWxlbWVudHMuc2V0KCBtLmVsZW1lbnRzICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGV4dHJhY3RQb3NpdGlvbjogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuTWF0cml4NDogLmV4dHJhY3RQb3NpdGlvbigpIGhhcyBiZWVuIHJlbmFtZWQgdG8gLmNvcHlQb3NpdGlvbigpLicgKTtcblx0XHRyZXR1cm4gdGhpcy5jb3B5UG9zaXRpb24oIG0gKTtcblxuXHR9LFxuXG5cdGNvcHlQb3NpdGlvbjogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblx0XHR2YXIgbWUgPSBtLmVsZW1lbnRzO1xuXG5cdFx0dGVbIDEyIF0gPSBtZVsgMTIgXTtcblx0XHR0ZVsgMTMgXSA9IG1lWyAxMyBdO1xuXHRcdHRlWyAxNCBdID0gbWVbIDE0IF07XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGV4dHJhY3RCYXNpczogZnVuY3Rpb24gKCB4QXhpcywgeUF4aXMsIHpBeGlzICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHhBeGlzLnNldCggdGVbIDAgXSwgdGVbIDEgXSwgdGVbIDIgXSApO1xuXHRcdHlBeGlzLnNldCggdGVbIDQgXSwgdGVbIDUgXSwgdGVbIDYgXSApO1xuXHRcdHpBeGlzLnNldCggdGVbIDggXSwgdGVbIDkgXSwgdGVbIDEwIF0gKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWFrZUJhc2lzOiBmdW5jdGlvbiAoIHhBeGlzLCB5QXhpcywgekF4aXMgKSB7XG5cblx0XHR0aGlzLnNldChcblx0XHRcdHhBeGlzLngsIHlBeGlzLngsIHpBeGlzLngsIDAsXG5cdFx0XHR4QXhpcy55LCB5QXhpcy55LCB6QXhpcy55LCAwLFxuXHRcdFx0eEF4aXMueiwgeUF4aXMueiwgekF4aXMueiwgMCxcblx0XHRcdDAsICAgICAgIDAsICAgICAgIDAsICAgICAgIDFcblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRleHRyYWN0Um90YXRpb246IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHRcdGlmICggdjEgPT09IHVuZGVmaW5lZCApIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblx0XHRcdHZhciBtZSA9IG0uZWxlbWVudHM7XG5cblx0XHRcdHZhciBzY2FsZVggPSAxIC8gdjEuc2V0KCBtZVsgMCBdLCBtZVsgMSBdLCBtZVsgMiBdICkubGVuZ3RoKCk7XG5cdFx0XHR2YXIgc2NhbGVZID0gMSAvIHYxLnNldCggbWVbIDQgXSwgbWVbIDUgXSwgbWVbIDYgXSApLmxlbmd0aCgpO1xuXHRcdFx0dmFyIHNjYWxlWiA9IDEgLyB2MS5zZXQoIG1lWyA4IF0sIG1lWyA5IF0sIG1lWyAxMCBdICkubGVuZ3RoKCk7XG5cblx0XHRcdHRlWyAwIF0gPSBtZVsgMCBdICogc2NhbGVYO1xuXHRcdFx0dGVbIDEgXSA9IG1lWyAxIF0gKiBzY2FsZVg7XG5cdFx0XHR0ZVsgMiBdID0gbWVbIDIgXSAqIHNjYWxlWDtcblxuXHRcdFx0dGVbIDQgXSA9IG1lWyA0IF0gKiBzY2FsZVk7XG5cdFx0XHR0ZVsgNSBdID0gbWVbIDUgXSAqIHNjYWxlWTtcblx0XHRcdHRlWyA2IF0gPSBtZVsgNiBdICogc2NhbGVZO1xuXG5cdFx0XHR0ZVsgOCBdID0gbWVbIDggXSAqIHNjYWxlWjtcblx0XHRcdHRlWyA5IF0gPSBtZVsgOSBdICogc2NhbGVaO1xuXHRcdFx0dGVbIDEwIF0gPSBtZVsgMTAgXSAqIHNjYWxlWjtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRtYWtlUm90YXRpb25Gcm9tRXVsZXI6IGZ1bmN0aW9uICggZXVsZXIgKSB7XG5cblx0XHRpZiAoIGV1bGVyIGluc3RhbmNlb2YgVEhSRUUuRXVsZXIgPT09IGZhbHNlICkge1xuXG5cdFx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuTWF0cml4OiAubWFrZVJvdGF0aW9uRnJvbUV1bGVyKCkgbm93IGV4cGVjdHMgYSBFdWxlciByb3RhdGlvbiByYXRoZXIgdGhhbiBhIFZlY3RvcjMgYW5kIG9yZGVyLicgKTtcblxuXHRcdH1cblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR2YXIgeCA9IGV1bGVyLngsIHkgPSBldWxlci55LCB6ID0gZXVsZXIuejtcblx0XHR2YXIgYSA9IE1hdGguY29zKCB4ICksIGIgPSBNYXRoLnNpbiggeCApO1xuXHRcdHZhciBjID0gTWF0aC5jb3MoIHkgKSwgZCA9IE1hdGguc2luKCB5ICk7XG5cdFx0dmFyIGUgPSBNYXRoLmNvcyggeiApLCBmID0gTWF0aC5zaW4oIHogKTtcblxuXHRcdGlmICggZXVsZXIub3JkZXIgPT09ICdYWVonICkge1xuXG5cdFx0XHR2YXIgYWUgPSBhICogZSwgYWYgPSBhICogZiwgYmUgPSBiICogZSwgYmYgPSBiICogZjtcblxuXHRcdFx0dGVbIDAgXSA9IGMgKiBlO1xuXHRcdFx0dGVbIDQgXSA9IC0gYyAqIGY7XG5cdFx0XHR0ZVsgOCBdID0gZDtcblxuXHRcdFx0dGVbIDEgXSA9IGFmICsgYmUgKiBkO1xuXHRcdFx0dGVbIDUgXSA9IGFlIC0gYmYgKiBkO1xuXHRcdFx0dGVbIDkgXSA9IC0gYiAqIGM7XG5cblx0XHRcdHRlWyAyIF0gPSBiZiAtIGFlICogZDtcblx0XHRcdHRlWyA2IF0gPSBiZSArIGFmICogZDtcblx0XHRcdHRlWyAxMCBdID0gYSAqIGM7XG5cblx0XHR9IGVsc2UgaWYgKCBldWxlci5vcmRlciA9PT0gJ1lYWicgKSB7XG5cblx0XHRcdHZhciBjZSA9IGMgKiBlLCBjZiA9IGMgKiBmLCBkZSA9IGQgKiBlLCBkZiA9IGQgKiBmO1xuXG5cdFx0XHR0ZVsgMCBdID0gY2UgKyBkZiAqIGI7XG5cdFx0XHR0ZVsgNCBdID0gZGUgKiBiIC0gY2Y7XG5cdFx0XHR0ZVsgOCBdID0gYSAqIGQ7XG5cblx0XHRcdHRlWyAxIF0gPSBhICogZjtcblx0XHRcdHRlWyA1IF0gPSBhICogZTtcblx0XHRcdHRlWyA5IF0gPSAtIGI7XG5cblx0XHRcdHRlWyAyIF0gPSBjZiAqIGIgLSBkZTtcblx0XHRcdHRlWyA2IF0gPSBkZiArIGNlICogYjtcblx0XHRcdHRlWyAxMCBdID0gYSAqIGM7XG5cblx0XHR9IGVsc2UgaWYgKCBldWxlci5vcmRlciA9PT0gJ1pYWScgKSB7XG5cblx0XHRcdHZhciBjZSA9IGMgKiBlLCBjZiA9IGMgKiBmLCBkZSA9IGQgKiBlLCBkZiA9IGQgKiBmO1xuXG5cdFx0XHR0ZVsgMCBdID0gY2UgLSBkZiAqIGI7XG5cdFx0XHR0ZVsgNCBdID0gLSBhICogZjtcblx0XHRcdHRlWyA4IF0gPSBkZSArIGNmICogYjtcblxuXHRcdFx0dGVbIDEgXSA9IGNmICsgZGUgKiBiO1xuXHRcdFx0dGVbIDUgXSA9IGEgKiBlO1xuXHRcdFx0dGVbIDkgXSA9IGRmIC0gY2UgKiBiO1xuXG5cdFx0XHR0ZVsgMiBdID0gLSBhICogZDtcblx0XHRcdHRlWyA2IF0gPSBiO1xuXHRcdFx0dGVbIDEwIF0gPSBhICogYztcblxuXHRcdH0gZWxzZSBpZiAoIGV1bGVyLm9yZGVyID09PSAnWllYJyApIHtcblxuXHRcdFx0dmFyIGFlID0gYSAqIGUsIGFmID0gYSAqIGYsIGJlID0gYiAqIGUsIGJmID0gYiAqIGY7XG5cblx0XHRcdHRlWyAwIF0gPSBjICogZTtcblx0XHRcdHRlWyA0IF0gPSBiZSAqIGQgLSBhZjtcblx0XHRcdHRlWyA4IF0gPSBhZSAqIGQgKyBiZjtcblxuXHRcdFx0dGVbIDEgXSA9IGMgKiBmO1xuXHRcdFx0dGVbIDUgXSA9IGJmICogZCArIGFlO1xuXHRcdFx0dGVbIDkgXSA9IGFmICogZCAtIGJlO1xuXG5cdFx0XHR0ZVsgMiBdID0gLSBkO1xuXHRcdFx0dGVbIDYgXSA9IGIgKiBjO1xuXHRcdFx0dGVbIDEwIF0gPSBhICogYztcblxuXHRcdH0gZWxzZSBpZiAoIGV1bGVyLm9yZGVyID09PSAnWVpYJyApIHtcblxuXHRcdFx0dmFyIGFjID0gYSAqIGMsIGFkID0gYSAqIGQsIGJjID0gYiAqIGMsIGJkID0gYiAqIGQ7XG5cblx0XHRcdHRlWyAwIF0gPSBjICogZTtcblx0XHRcdHRlWyA0IF0gPSBiZCAtIGFjICogZjtcblx0XHRcdHRlWyA4IF0gPSBiYyAqIGYgKyBhZDtcblxuXHRcdFx0dGVbIDEgXSA9IGY7XG5cdFx0XHR0ZVsgNSBdID0gYSAqIGU7XG5cdFx0XHR0ZVsgOSBdID0gLSBiICogZTtcblxuXHRcdFx0dGVbIDIgXSA9IC0gZCAqIGU7XG5cdFx0XHR0ZVsgNiBdID0gYWQgKiBmICsgYmM7XG5cdFx0XHR0ZVsgMTAgXSA9IGFjIC0gYmQgKiBmO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdYWlknICkge1xuXG5cdFx0XHR2YXIgYWMgPSBhICogYywgYWQgPSBhICogZCwgYmMgPSBiICogYywgYmQgPSBiICogZDtcblxuXHRcdFx0dGVbIDAgXSA9IGMgKiBlO1xuXHRcdFx0dGVbIDQgXSA9IC0gZjtcblx0XHRcdHRlWyA4IF0gPSBkICogZTtcblxuXHRcdFx0dGVbIDEgXSA9IGFjICogZiArIGJkO1xuXHRcdFx0dGVbIDUgXSA9IGEgKiBlO1xuXHRcdFx0dGVbIDkgXSA9IGFkICogZiAtIGJjO1xuXG5cdFx0XHR0ZVsgMiBdID0gYmMgKiBmIC0gYWQ7XG5cdFx0XHR0ZVsgNiBdID0gYiAqIGU7XG5cdFx0XHR0ZVsgMTAgXSA9IGJkICogZiArIGFjO1xuXG5cdFx0fVxuXG5cdFx0Ly8gbGFzdCBjb2x1bW5cblx0XHR0ZVsgMyBdID0gMDtcblx0XHR0ZVsgNyBdID0gMDtcblx0XHR0ZVsgMTEgXSA9IDA7XG5cblx0XHQvLyBib3R0b20gcm93XG5cdFx0dGVbIDEyIF0gPSAwO1xuXHRcdHRlWyAxMyBdID0gMDtcblx0XHR0ZVsgMTQgXSA9IDA7XG5cdFx0dGVbIDE1IF0gPSAxO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRSb3RhdGlvbkZyb21RdWF0ZXJuaW9uOiBmdW5jdGlvbiAoIHEgKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5NYXRyaXg0OiAuc2V0Um90YXRpb25Gcm9tUXVhdGVybmlvbigpIGhhcyBiZWVuIHJlbmFtZWQgdG8gLm1ha2VSb3RhdGlvbkZyb21RdWF0ZXJuaW9uKCkuJyApO1xuXG5cdFx0cmV0dXJuIHRoaXMubWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb24oIHEgKTtcblxuXHR9LFxuXG5cdG1ha2VSb3RhdGlvbkZyb21RdWF0ZXJuaW9uOiBmdW5jdGlvbiAoIHEgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dmFyIHggPSBxLngsIHkgPSBxLnksIHogPSBxLnosIHcgPSBxLnc7XG5cdFx0dmFyIHgyID0geCArIHgsIHkyID0geSArIHksIHoyID0geiArIHo7XG5cdFx0dmFyIHh4ID0geCAqIHgyLCB4eSA9IHggKiB5MiwgeHogPSB4ICogejI7XG5cdFx0dmFyIHl5ID0geSAqIHkyLCB5eiA9IHkgKiB6MiwgenogPSB6ICogejI7XG5cdFx0dmFyIHd4ID0gdyAqIHgyLCB3eSA9IHcgKiB5Miwgd3ogPSB3ICogejI7XG5cblx0XHR0ZVsgMCBdID0gMSAtICggeXkgKyB6eiApO1xuXHRcdHRlWyA0IF0gPSB4eSAtIHd6O1xuXHRcdHRlWyA4IF0gPSB4eiArIHd5O1xuXG5cdFx0dGVbIDEgXSA9IHh5ICsgd3o7XG5cdFx0dGVbIDUgXSA9IDEgLSAoIHh4ICsgenogKTtcblx0XHR0ZVsgOSBdID0geXogLSB3eDtcblxuXHRcdHRlWyAyIF0gPSB4eiAtIHd5O1xuXHRcdHRlWyA2IF0gPSB5eiArIHd4O1xuXHRcdHRlWyAxMCBdID0gMSAtICggeHggKyB5eSApO1xuXG5cdFx0Ly8gbGFzdCBjb2x1bW5cblx0XHR0ZVsgMyBdID0gMDtcblx0XHR0ZVsgNyBdID0gMDtcblx0XHR0ZVsgMTEgXSA9IDA7XG5cblx0XHQvLyBib3R0b20gcm93XG5cdFx0dGVbIDEyIF0gPSAwO1xuXHRcdHRlWyAxMyBdID0gMDtcblx0XHR0ZVsgMTQgXSA9IDA7XG5cdFx0dGVbIDE1IF0gPSAxO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRsb29rQXQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB4LCB5LCB6O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggZXllLCB0YXJnZXQsIHVwICkge1xuXG5cdFx0XHRpZiAoIHggPT09IHVuZGVmaW5lZCApIHggPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0aWYgKCB5ID09PSB1bmRlZmluZWQgKSB5ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdGlmICggeiA9PT0gdW5kZWZpbmVkICkgeiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHRcdHouc3ViVmVjdG9ycyggZXllLCB0YXJnZXQgKS5ub3JtYWxpemUoKTtcblxuXHRcdFx0aWYgKCB6Lmxlbmd0aCgpID09PSAwICkge1xuXG5cdFx0XHRcdHoueiA9IDE7XG5cblx0XHRcdH1cblxuXHRcdFx0eC5jcm9zc1ZlY3RvcnMoIHVwLCB6ICkubm9ybWFsaXplKCk7XG5cblx0XHRcdGlmICggeC5sZW5ndGgoKSA9PT0gMCApIHtcblxuXHRcdFx0XHR6LnggKz0gMC4wMDAxO1xuXHRcdFx0XHR4LmNyb3NzVmVjdG9ycyggdXAsIHogKS5ub3JtYWxpemUoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHR5LmNyb3NzVmVjdG9ycyggeiwgeCApO1xuXG5cblx0XHRcdHRlWyAwIF0gPSB4Lng7IHRlWyA0IF0gPSB5Lng7IHRlWyA4IF0gPSB6Lng7XG5cdFx0XHR0ZVsgMSBdID0geC55OyB0ZVsgNSBdID0geS55OyB0ZVsgOSBdID0gei55O1xuXHRcdFx0dGVbIDIgXSA9IHguejsgdGVbIDYgXSA9IHkuejsgdGVbIDEwIF0gPSB6Lno7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0bXVsdGlwbHk6IGZ1bmN0aW9uICggbSwgbiApIHtcblxuXHRcdGlmICggbiAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5NYXRyaXg0OiAubXVsdGlwbHkoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5tdWx0aXBseU1hdHJpY2VzKCBhLCBiICkgaW5zdGVhZC4nICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5tdWx0aXBseU1hdHJpY2VzKCBtLCBuICk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5tdWx0aXBseU1hdHJpY2VzKCB0aGlzLCBtICk7XG5cblx0fSxcblxuXHRtdWx0aXBseU1hdHJpY2VzOiBmdW5jdGlvbiAoIGEsIGIgKSB7XG5cblx0XHR2YXIgYWUgPSBhLmVsZW1lbnRzO1xuXHRcdHZhciBiZSA9IGIuZWxlbWVudHM7XG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHZhciBhMTEgPSBhZVsgMCBdLCBhMTIgPSBhZVsgNCBdLCBhMTMgPSBhZVsgOCBdLCBhMTQgPSBhZVsgMTIgXTtcblx0XHR2YXIgYTIxID0gYWVbIDEgXSwgYTIyID0gYWVbIDUgXSwgYTIzID0gYWVbIDkgXSwgYTI0ID0gYWVbIDEzIF07XG5cdFx0dmFyIGEzMSA9IGFlWyAyIF0sIGEzMiA9IGFlWyA2IF0sIGEzMyA9IGFlWyAxMCBdLCBhMzQgPSBhZVsgMTQgXTtcblx0XHR2YXIgYTQxID0gYWVbIDMgXSwgYTQyID0gYWVbIDcgXSwgYTQzID0gYWVbIDExIF0sIGE0NCA9IGFlWyAxNSBdO1xuXG5cdFx0dmFyIGIxMSA9IGJlWyAwIF0sIGIxMiA9IGJlWyA0IF0sIGIxMyA9IGJlWyA4IF0sIGIxNCA9IGJlWyAxMiBdO1xuXHRcdHZhciBiMjEgPSBiZVsgMSBdLCBiMjIgPSBiZVsgNSBdLCBiMjMgPSBiZVsgOSBdLCBiMjQgPSBiZVsgMTMgXTtcblx0XHR2YXIgYjMxID0gYmVbIDIgXSwgYjMyID0gYmVbIDYgXSwgYjMzID0gYmVbIDEwIF0sIGIzNCA9IGJlWyAxNCBdO1xuXHRcdHZhciBiNDEgPSBiZVsgMyBdLCBiNDIgPSBiZVsgNyBdLCBiNDMgPSBiZVsgMTEgXSwgYjQ0ID0gYmVbIDE1IF07XG5cblx0XHR0ZVsgMCBdID0gYTExICogYjExICsgYTEyICogYjIxICsgYTEzICogYjMxICsgYTE0ICogYjQxO1xuXHRcdHRlWyA0IF0gPSBhMTEgKiBiMTIgKyBhMTIgKiBiMjIgKyBhMTMgKiBiMzIgKyBhMTQgKiBiNDI7XG5cdFx0dGVbIDggXSA9IGExMSAqIGIxMyArIGExMiAqIGIyMyArIGExMyAqIGIzMyArIGExNCAqIGI0Mztcblx0XHR0ZVsgMTIgXSA9IGExMSAqIGIxNCArIGExMiAqIGIyNCArIGExMyAqIGIzNCArIGExNCAqIGI0NDtcblxuXHRcdHRlWyAxIF0gPSBhMjEgKiBiMTEgKyBhMjIgKiBiMjEgKyBhMjMgKiBiMzEgKyBhMjQgKiBiNDE7XG5cdFx0dGVbIDUgXSA9IGEyMSAqIGIxMiArIGEyMiAqIGIyMiArIGEyMyAqIGIzMiArIGEyNCAqIGI0Mjtcblx0XHR0ZVsgOSBdID0gYTIxICogYjEzICsgYTIyICogYjIzICsgYTIzICogYjMzICsgYTI0ICogYjQzO1xuXHRcdHRlWyAxMyBdID0gYTIxICogYjE0ICsgYTIyICogYjI0ICsgYTIzICogYjM0ICsgYTI0ICogYjQ0O1xuXG5cdFx0dGVbIDIgXSA9IGEzMSAqIGIxMSArIGEzMiAqIGIyMSArIGEzMyAqIGIzMSArIGEzNCAqIGI0MTtcblx0XHR0ZVsgNiBdID0gYTMxICogYjEyICsgYTMyICogYjIyICsgYTMzICogYjMyICsgYTM0ICogYjQyO1xuXHRcdHRlWyAxMCBdID0gYTMxICogYjEzICsgYTMyICogYjIzICsgYTMzICogYjMzICsgYTM0ICogYjQzO1xuXHRcdHRlWyAxNCBdID0gYTMxICogYjE0ICsgYTMyICogYjI0ICsgYTMzICogYjM0ICsgYTM0ICogYjQ0O1xuXG5cdFx0dGVbIDMgXSA9IGE0MSAqIGIxMSArIGE0MiAqIGIyMSArIGE0MyAqIGIzMSArIGE0NCAqIGI0MTtcblx0XHR0ZVsgNyBdID0gYTQxICogYjEyICsgYTQyICogYjIyICsgYTQzICogYjMyICsgYTQ0ICogYjQyO1xuXHRcdHRlWyAxMSBdID0gYTQxICogYjEzICsgYTQyICogYjIzICsgYTQzICogYjMzICsgYTQ0ICogYjQzO1xuXHRcdHRlWyAxNSBdID0gYTQxICogYjE0ICsgYTQyICogYjI0ICsgYTQzICogYjM0ICsgYTQ0ICogYjQ0O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtdWx0aXBseVRvQXJyYXk6IGZ1bmN0aW9uICggYSwgYiwgciApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR0aGlzLm11bHRpcGx5TWF0cmljZXMoIGEsIGIgKTtcblxuXHRcdHJbIDAgXSA9IHRlWyAwIF07IHJbIDEgXSA9IHRlWyAxIF07IHJbIDIgXSA9IHRlWyAyIF07IHJbIDMgXSA9IHRlWyAzIF07XG5cdFx0clsgNCBdID0gdGVbIDQgXTsgclsgNSBdID0gdGVbIDUgXTsgclsgNiBdID0gdGVbIDYgXTsgclsgNyBdID0gdGVbIDcgXTtcblx0XHRyWyA4IF0gID0gdGVbIDggXTsgclsgOSBdICA9IHRlWyA5IF07IHJbIDEwIF0gPSB0ZVsgMTAgXTsgclsgMTEgXSA9IHRlWyAxMSBdO1xuXHRcdHJbIDEyIF0gPSB0ZVsgMTIgXTsgclsgMTMgXSA9IHRlWyAxMyBdOyByWyAxNCBdID0gdGVbIDE0IF07IHJbIDE1IF0gPSB0ZVsgMTUgXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlTY2FsYXI6IGZ1bmN0aW9uICggcyApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR0ZVsgMCBdICo9IHM7IHRlWyA0IF0gKj0gczsgdGVbIDggXSAqPSBzOyB0ZVsgMTIgXSAqPSBzO1xuXHRcdHRlWyAxIF0gKj0gczsgdGVbIDUgXSAqPSBzOyB0ZVsgOSBdICo9IHM7IHRlWyAxMyBdICo9IHM7XG5cdFx0dGVbIDIgXSAqPSBzOyB0ZVsgNiBdICo9IHM7IHRlWyAxMCBdICo9IHM7IHRlWyAxNCBdICo9IHM7XG5cdFx0dGVbIDMgXSAqPSBzOyB0ZVsgNyBdICo9IHM7IHRlWyAxMSBdICo9IHM7IHRlWyAxNSBdICo9IHM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5VmVjdG9yMzogZnVuY3Rpb24gKCB2ZWN0b3IgKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5NYXRyaXg0OiAubXVsdGlwbHlWZWN0b3IzKCkgaGFzIGJlZW4gcmVtb3ZlZC4gVXNlIHZlY3Rvci5hcHBseU1hdHJpeDQoIG1hdHJpeCApIG9yIHZlY3Rvci5hcHBseVByb2plY3Rpb24oIG1hdHJpeCApIGluc3RlYWQuJyApO1xuXHRcdHJldHVybiB2ZWN0b3IuYXBwbHlQcm9qZWN0aW9uKCB0aGlzICk7XG5cblx0fSxcblxuXHRtdWx0aXBseVZlY3RvcjQ6IGZ1bmN0aW9uICggdmVjdG9yICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuTWF0cml4NDogLm11bHRpcGx5VmVjdG9yNCgpIGhhcyBiZWVuIHJlbW92ZWQuIFVzZSB2ZWN0b3IuYXBwbHlNYXRyaXg0KCBtYXRyaXggKSBpbnN0ZWFkLicgKTtcblx0XHRyZXR1cm4gdmVjdG9yLmFwcGx5TWF0cml4NCggdGhpcyApO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlWZWN0b3IzQXJyYXk6IGZ1bmN0aW9uICggYSApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk1hdHJpeDQ6IC5tdWx0aXBseVZlY3RvcjNBcnJheSgpIGhhcyBiZWVuIHJlbmFtZWQuIFVzZSBtYXRyaXguYXBwbHlUb1ZlY3RvcjNBcnJheSggYXJyYXkgKSBpbnN0ZWFkLicgKTtcblx0XHRyZXR1cm4gdGhpcy5hcHBseVRvVmVjdG9yM0FycmF5KCBhICk7XG5cblx0fSxcblxuXHRhcHBseVRvVmVjdG9yM0FycmF5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdjE7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0LCBsZW5ndGggKSB7XG5cblx0XHRcdGlmICggdjEgPT09IHVuZGVmaW5lZCApIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXHRcdFx0aWYgKCBsZW5ndGggPT09IHVuZGVmaW5lZCApIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuXHRcdFx0Zm9yICggdmFyIGkgPSAwLCBqID0gb2Zmc2V0OyBpIDwgbGVuZ3RoOyBpICs9IDMsIGogKz0gMyApIHtcblxuXHRcdFx0XHR2MS5mcm9tQXJyYXkoIGFycmF5LCBqICk7XG5cdFx0XHRcdHYxLmFwcGx5TWF0cml4NCggdGhpcyApO1xuXHRcdFx0XHR2MS50b0FycmF5KCBhcnJheSwgaiApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhcnJheTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGFwcGx5VG9CdWZmZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiBhcHBseVRvQnVmZmVyKCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoICkge1xuXG5cdFx0XHRpZiAoIHYxID09PSB1bmRlZmluZWQgKSB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblx0XHRcdGlmICggbGVuZ3RoID09PSB1bmRlZmluZWQgKSBsZW5ndGggPSBidWZmZXIubGVuZ3RoIC8gYnVmZmVyLml0ZW1TaXplO1xuXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDAsIGogPSBvZmZzZXQ7IGkgPCBsZW5ndGg7IGkgKyssIGogKysgKSB7XG5cblx0XHRcdFx0djEueCA9IGJ1ZmZlci5nZXRYKCBqICk7XG5cdFx0XHRcdHYxLnkgPSBidWZmZXIuZ2V0WSggaiApO1xuXHRcdFx0XHR2MS56ID0gYnVmZmVyLmdldFooIGogKTtcblxuXHRcdFx0XHR2MS5hcHBseU1hdHJpeDQoIHRoaXMgKTtcblxuXHRcdFx0XHRidWZmZXIuc2V0WFlaKCB2MS54LCB2MS55LCB2MS56ICk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGJ1ZmZlcjtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdHJvdGF0ZUF4aXM6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk1hdHJpeDQ6IC5yb3RhdGVBeGlzKCkgaGFzIGJlZW4gcmVtb3ZlZC4gVXNlIFZlY3RvcjMudHJhbnNmb3JtRGlyZWN0aW9uKCBtYXRyaXggKSBpbnN0ZWFkLicgKTtcblxuXHRcdHYudHJhbnNmb3JtRGlyZWN0aW9uKCB0aGlzICk7XG5cblx0fSxcblxuXHRjcm9zc1ZlY3RvcjogZnVuY3Rpb24gKCB2ZWN0b3IgKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5NYXRyaXg0OiAuY3Jvc3NWZWN0b3IoKSBoYXMgYmVlbiByZW1vdmVkLiBVc2UgdmVjdG9yLmFwcGx5TWF0cml4NCggbWF0cml4ICkgaW5zdGVhZC4nICk7XG5cdFx0cmV0dXJuIHZlY3Rvci5hcHBseU1hdHJpeDQoIHRoaXMgKTtcblxuXHR9LFxuXG5cdGRldGVybWluYW50OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dmFyIG4xMSA9IHRlWyAwIF0sIG4xMiA9IHRlWyA0IF0sIG4xMyA9IHRlWyA4IF0sIG4xNCA9IHRlWyAxMiBdO1xuXHRcdHZhciBuMjEgPSB0ZVsgMSBdLCBuMjIgPSB0ZVsgNSBdLCBuMjMgPSB0ZVsgOSBdLCBuMjQgPSB0ZVsgMTMgXTtcblx0XHR2YXIgbjMxID0gdGVbIDIgXSwgbjMyID0gdGVbIDYgXSwgbjMzID0gdGVbIDEwIF0sIG4zNCA9IHRlWyAxNCBdO1xuXHRcdHZhciBuNDEgPSB0ZVsgMyBdLCBuNDIgPSB0ZVsgNyBdLCBuNDMgPSB0ZVsgMTEgXSwgbjQ0ID0gdGVbIDE1IF07XG5cblx0XHQvL1RPRE86IG1ha2UgdGhpcyBtb3JlIGVmZmljaWVudFxuXHRcdC8vKCBiYXNlZCBvbiBodHRwOi8vd3d3LmV1Y2xpZGVhbnNwYWNlLmNvbS9tYXRocy9hbGdlYnJhL21hdHJpeC9mdW5jdGlvbnMvaW52ZXJzZS9mb3VyRC9pbmRleC5odG0gKVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdG40MSAqIChcblx0XHRcdFx0KyBuMTQgKiBuMjMgKiBuMzJcblx0XHRcdFx0IC0gbjEzICogbjI0ICogbjMyXG5cdFx0XHRcdCAtIG4xNCAqIG4yMiAqIG4zM1xuXHRcdFx0XHQgKyBuMTIgKiBuMjQgKiBuMzNcblx0XHRcdFx0ICsgbjEzICogbjIyICogbjM0XG5cdFx0XHRcdCAtIG4xMiAqIG4yMyAqIG4zNFxuXHRcdFx0KSArXG5cdFx0XHRuNDIgKiAoXG5cdFx0XHRcdCsgbjExICogbjIzICogbjM0XG5cdFx0XHRcdCAtIG4xMSAqIG4yNCAqIG4zM1xuXHRcdFx0XHQgKyBuMTQgKiBuMjEgKiBuMzNcblx0XHRcdFx0IC0gbjEzICogbjIxICogbjM0XG5cdFx0XHRcdCArIG4xMyAqIG4yNCAqIG4zMVxuXHRcdFx0XHQgLSBuMTQgKiBuMjMgKiBuMzFcblx0XHRcdCkgK1xuXHRcdFx0bjQzICogKFxuXHRcdFx0XHQrIG4xMSAqIG4yNCAqIG4zMlxuXHRcdFx0XHQgLSBuMTEgKiBuMjIgKiBuMzRcblx0XHRcdFx0IC0gbjE0ICogbjIxICogbjMyXG5cdFx0XHRcdCArIG4xMiAqIG4yMSAqIG4zNFxuXHRcdFx0XHQgKyBuMTQgKiBuMjIgKiBuMzFcblx0XHRcdFx0IC0gbjEyICogbjI0ICogbjMxXG5cdFx0XHQpICtcblx0XHRcdG40NCAqIChcblx0XHRcdFx0LSBuMTMgKiBuMjIgKiBuMzFcblx0XHRcdFx0IC0gbjExICogbjIzICogbjMyXG5cdFx0XHRcdCArIG4xMSAqIG4yMiAqIG4zM1xuXHRcdFx0XHQgKyBuMTMgKiBuMjEgKiBuMzJcblx0XHRcdFx0IC0gbjEyICogbjIxICogbjMzXG5cdFx0XHRcdCArIG4xMiAqIG4yMyAqIG4zMVxuXHRcdFx0KVxuXG5cdFx0KTtcblxuXHR9LFxuXG5cdHRyYW5zcG9zZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblx0XHR2YXIgdG1wO1xuXG5cdFx0dG1wID0gdGVbIDEgXTsgdGVbIDEgXSA9IHRlWyA0IF07IHRlWyA0IF0gPSB0bXA7XG5cdFx0dG1wID0gdGVbIDIgXTsgdGVbIDIgXSA9IHRlWyA4IF07IHRlWyA4IF0gPSB0bXA7XG5cdFx0dG1wID0gdGVbIDYgXTsgdGVbIDYgXSA9IHRlWyA5IF07IHRlWyA5IF0gPSB0bXA7XG5cblx0XHR0bXAgPSB0ZVsgMyBdOyB0ZVsgMyBdID0gdGVbIDEyIF07IHRlWyAxMiBdID0gdG1wO1xuXHRcdHRtcCA9IHRlWyA3IF07IHRlWyA3IF0gPSB0ZVsgMTMgXTsgdGVbIDEzIF0gPSB0bXA7XG5cdFx0dG1wID0gdGVbIDExIF07IHRlWyAxMSBdID0gdGVbIDE0IF07IHRlWyAxNCBdID0gdG1wO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRmbGF0dGVuVG9BcnJheU9mZnNldDogZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0ICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdGFycmF5WyBvZmZzZXQgICAgIF0gPSB0ZVsgMCBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxIF0gPSB0ZVsgMSBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyAyIF0gPSB0ZVsgMiBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyAzIF0gPSB0ZVsgMyBdO1xuXG5cdFx0YXJyYXlbIG9mZnNldCArIDQgXSA9IHRlWyA0IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDUgXSA9IHRlWyA1IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDYgXSA9IHRlWyA2IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDcgXSA9IHRlWyA3IF07XG5cblx0XHRhcnJheVsgb2Zmc2V0ICsgOCBdICA9IHRlWyA4IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDkgXSAgPSB0ZVsgOSBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxMCBdID0gdGVbIDEwIF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDExIF0gPSB0ZVsgMTEgXTtcblxuXHRcdGFycmF5WyBvZmZzZXQgKyAxMiBdID0gdGVbIDEyIF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDEzIF0gPSB0ZVsgMTMgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMTQgXSA9IHRlWyAxNCBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxNSBdID0gdGVbIDE1IF07XG5cblx0XHRyZXR1cm4gYXJyYXk7XG5cblx0fSxcblxuXHRnZXRQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYxO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0aWYgKCB2MSA9PT0gdW5kZWZpbmVkICkgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuTWF0cml4NDogLmdldFBvc2l0aW9uKCkgaGFzIGJlZW4gcmVtb3ZlZC4gVXNlIFZlY3RvcjMuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKCBtYXRyaXggKSBpbnN0ZWFkLicgKTtcblxuXHRcdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblx0XHRcdHJldHVybiB2MS5zZXQoIHRlWyAxMiBdLCB0ZVsgMTMgXSwgdGVbIDE0IF0gKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdHNldFBvc2l0aW9uOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dGVbIDEyIF0gPSB2Lng7XG5cdFx0dGVbIDEzIF0gPSB2Lnk7XG5cdFx0dGVbIDE0IF0gPSB2Lno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGdldEludmVyc2U6IGZ1bmN0aW9uICggbSwgdGhyb3dPbkludmVydGlibGUgKSB7XG5cblx0XHQvLyBiYXNlZCBvbiBodHRwOi8vd3d3LmV1Y2xpZGVhbnNwYWNlLmNvbS9tYXRocy9hbGdlYnJhL21hdHJpeC9mdW5jdGlvbnMvaW52ZXJzZS9mb3VyRC9pbmRleC5odG1cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXHRcdHZhciBtZSA9IG0uZWxlbWVudHM7XG5cblx0XHR2YXIgbjExID0gbWVbIDAgXSwgbjEyID0gbWVbIDQgXSwgbjEzID0gbWVbIDggXSwgbjE0ID0gbWVbIDEyIF07XG5cdFx0dmFyIG4yMSA9IG1lWyAxIF0sIG4yMiA9IG1lWyA1IF0sIG4yMyA9IG1lWyA5IF0sIG4yNCA9IG1lWyAxMyBdO1xuXHRcdHZhciBuMzEgPSBtZVsgMiBdLCBuMzIgPSBtZVsgNiBdLCBuMzMgPSBtZVsgMTAgXSwgbjM0ID0gbWVbIDE0IF07XG5cdFx0dmFyIG40MSA9IG1lWyAzIF0sIG40MiA9IG1lWyA3IF0sIG40MyA9IG1lWyAxMSBdLCBuNDQgPSBtZVsgMTUgXTtcblxuXHRcdHRlWyAwIF0gPSBuMjMgKiBuMzQgKiBuNDIgLSBuMjQgKiBuMzMgKiBuNDIgKyBuMjQgKiBuMzIgKiBuNDMgLSBuMjIgKiBuMzQgKiBuNDMgLSBuMjMgKiBuMzIgKiBuNDQgKyBuMjIgKiBuMzMgKiBuNDQ7XG5cdFx0dGVbIDQgXSA9IG4xNCAqIG4zMyAqIG40MiAtIG4xMyAqIG4zNCAqIG40MiAtIG4xNCAqIG4zMiAqIG40MyArIG4xMiAqIG4zNCAqIG40MyArIG4xMyAqIG4zMiAqIG40NCAtIG4xMiAqIG4zMyAqIG40NDtcblx0XHR0ZVsgOCBdID0gbjEzICogbjI0ICogbjQyIC0gbjE0ICogbjIzICogbjQyICsgbjE0ICogbjIyICogbjQzIC0gbjEyICogbjI0ICogbjQzIC0gbjEzICogbjIyICogbjQ0ICsgbjEyICogbjIzICogbjQ0O1xuXHRcdHRlWyAxMiBdID0gbjE0ICogbjIzICogbjMyIC0gbjEzICogbjI0ICogbjMyIC0gbjE0ICogbjIyICogbjMzICsgbjEyICogbjI0ICogbjMzICsgbjEzICogbjIyICogbjM0IC0gbjEyICogbjIzICogbjM0O1xuXHRcdHRlWyAxIF0gPSBuMjQgKiBuMzMgKiBuNDEgLSBuMjMgKiBuMzQgKiBuNDEgLSBuMjQgKiBuMzEgKiBuNDMgKyBuMjEgKiBuMzQgKiBuNDMgKyBuMjMgKiBuMzEgKiBuNDQgLSBuMjEgKiBuMzMgKiBuNDQ7XG5cdFx0dGVbIDUgXSA9IG4xMyAqIG4zNCAqIG40MSAtIG4xNCAqIG4zMyAqIG40MSArIG4xNCAqIG4zMSAqIG40MyAtIG4xMSAqIG4zNCAqIG40MyAtIG4xMyAqIG4zMSAqIG40NCArIG4xMSAqIG4zMyAqIG40NDtcblx0XHR0ZVsgOSBdID0gbjE0ICogbjIzICogbjQxIC0gbjEzICogbjI0ICogbjQxIC0gbjE0ICogbjIxICogbjQzICsgbjExICogbjI0ICogbjQzICsgbjEzICogbjIxICogbjQ0IC0gbjExICogbjIzICogbjQ0O1xuXHRcdHRlWyAxMyBdID0gbjEzICogbjI0ICogbjMxIC0gbjE0ICogbjIzICogbjMxICsgbjE0ICogbjIxICogbjMzIC0gbjExICogbjI0ICogbjMzIC0gbjEzICogbjIxICogbjM0ICsgbjExICogbjIzICogbjM0O1xuXHRcdHRlWyAyIF0gPSBuMjIgKiBuMzQgKiBuNDEgLSBuMjQgKiBuMzIgKiBuNDEgKyBuMjQgKiBuMzEgKiBuNDIgLSBuMjEgKiBuMzQgKiBuNDIgLSBuMjIgKiBuMzEgKiBuNDQgKyBuMjEgKiBuMzIgKiBuNDQ7XG5cdFx0dGVbIDYgXSA9IG4xNCAqIG4zMiAqIG40MSAtIG4xMiAqIG4zNCAqIG40MSAtIG4xNCAqIG4zMSAqIG40MiArIG4xMSAqIG4zNCAqIG40MiArIG4xMiAqIG4zMSAqIG40NCAtIG4xMSAqIG4zMiAqIG40NDtcblx0XHR0ZVsgMTAgXSA9IG4xMiAqIG4yNCAqIG40MSAtIG4xNCAqIG4yMiAqIG40MSArIG4xNCAqIG4yMSAqIG40MiAtIG4xMSAqIG4yNCAqIG40MiAtIG4xMiAqIG4yMSAqIG40NCArIG4xMSAqIG4yMiAqIG40NDtcblx0XHR0ZVsgMTQgXSA9IG4xNCAqIG4yMiAqIG4zMSAtIG4xMiAqIG4yNCAqIG4zMSAtIG4xNCAqIG4yMSAqIG4zMiArIG4xMSAqIG4yNCAqIG4zMiArIG4xMiAqIG4yMSAqIG4zNCAtIG4xMSAqIG4yMiAqIG4zNDtcblx0XHR0ZVsgMyBdID0gbjIzICogbjMyICogbjQxIC0gbjIyICogbjMzICogbjQxIC0gbjIzICogbjMxICogbjQyICsgbjIxICogbjMzICogbjQyICsgbjIyICogbjMxICogbjQzIC0gbjIxICogbjMyICogbjQzO1xuXHRcdHRlWyA3IF0gPSBuMTIgKiBuMzMgKiBuNDEgLSBuMTMgKiBuMzIgKiBuNDEgKyBuMTMgKiBuMzEgKiBuNDIgLSBuMTEgKiBuMzMgKiBuNDIgLSBuMTIgKiBuMzEgKiBuNDMgKyBuMTEgKiBuMzIgKiBuNDM7XG5cdFx0dGVbIDExIF0gPSBuMTMgKiBuMjIgKiBuNDEgLSBuMTIgKiBuMjMgKiBuNDEgLSBuMTMgKiBuMjEgKiBuNDIgKyBuMTEgKiBuMjMgKiBuNDIgKyBuMTIgKiBuMjEgKiBuNDMgLSBuMTEgKiBuMjIgKiBuNDM7XG5cdFx0dGVbIDE1IF0gPSBuMTIgKiBuMjMgKiBuMzEgLSBuMTMgKiBuMjIgKiBuMzEgKyBuMTMgKiBuMjEgKiBuMzIgLSBuMTEgKiBuMjMgKiBuMzIgLSBuMTIgKiBuMjEgKiBuMzMgKyBuMTEgKiBuMjIgKiBuMzM7XG5cblx0XHR2YXIgZGV0ID0gbjExICogdGVbIDAgXSArIG4yMSAqIHRlWyA0IF0gKyBuMzEgKiB0ZVsgOCBdICsgbjQxICogdGVbIDEyIF07XG5cblx0XHRpZiAoIGRldCA9PT0gMCApIHtcblxuXHRcdFx0dmFyIG1zZyA9IFwiVEhSRUUuTWF0cml4NC5nZXRJbnZlcnNlKCk6IGNhbid0IGludmVydCBtYXRyaXgsIGRldGVybWluYW50IGlzIDBcIjtcblxuXHRcdFx0aWYgKCB0aHJvd09uSW52ZXJ0aWJsZSB8fCBmYWxzZSApIHtcblxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIG1zZyApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGNvbnNvbGUud2FybiggbXNnICk7XG5cblx0XHRcdH1cblxuXHRcdFx0dGhpcy5pZGVudGl0eSgpO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH1cblxuXHRcdHRoaXMubXVsdGlwbHlTY2FsYXIoIDEgLyBkZXQgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dHJhbnNsYXRlOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuTWF0cml4NDogLnRyYW5zbGF0ZSgpIGhhcyBiZWVuIHJlbW92ZWQuJyApO1xuXG5cdH0sXG5cblx0cm90YXRlWDogZnVuY3Rpb24gKCBhbmdsZSApIHtcblxuXHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5NYXRyaXg0OiAucm90YXRlWCgpIGhhcyBiZWVuIHJlbW92ZWQuJyApO1xuXG5cdH0sXG5cblx0cm90YXRlWTogZnVuY3Rpb24gKCBhbmdsZSApIHtcblxuXHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5NYXRyaXg0OiAucm90YXRlWSgpIGhhcyBiZWVuIHJlbW92ZWQuJyApO1xuXG5cdH0sXG5cblx0cm90YXRlWjogZnVuY3Rpb24gKCBhbmdsZSApIHtcblxuXHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5NYXRyaXg0OiAucm90YXRlWigpIGhhcyBiZWVuIHJlbW92ZWQuJyApO1xuXG5cdH0sXG5cblx0cm90YXRlQnlBeGlzOiBmdW5jdGlvbiAoIGF4aXMsIGFuZ2xlICkge1xuXG5cdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLk1hdHJpeDQ6IC5yb3RhdGVCeUF4aXMoKSBoYXMgYmVlbiByZW1vdmVkLicgKTtcblxuXHR9LFxuXG5cdHNjYWxlOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXHRcdHZhciB4ID0gdi54LCB5ID0gdi55LCB6ID0gdi56O1xuXG5cdFx0dGVbIDAgXSAqPSB4OyB0ZVsgNCBdICo9IHk7IHRlWyA4IF0gKj0gejtcblx0XHR0ZVsgMSBdICo9IHg7IHRlWyA1IF0gKj0geTsgdGVbIDkgXSAqPSB6O1xuXHRcdHRlWyAyIF0gKj0geDsgdGVbIDYgXSAqPSB5OyB0ZVsgMTAgXSAqPSB6O1xuXHRcdHRlWyAzIF0gKj0geDsgdGVbIDcgXSAqPSB5OyB0ZVsgMTEgXSAqPSB6O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRnZXRNYXhTY2FsZU9uQXhpczogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHZhciBzY2FsZVhTcSA9IHRlWyAwIF0gKiB0ZVsgMCBdICsgdGVbIDEgXSAqIHRlWyAxIF0gKyB0ZVsgMiBdICogdGVbIDIgXTtcblx0XHR2YXIgc2NhbGVZU3EgPSB0ZVsgNCBdICogdGVbIDQgXSArIHRlWyA1IF0gKiB0ZVsgNSBdICsgdGVbIDYgXSAqIHRlWyA2IF07XG5cdFx0dmFyIHNjYWxlWlNxID0gdGVbIDggXSAqIHRlWyA4IF0gKyB0ZVsgOSBdICogdGVbIDkgXSArIHRlWyAxMCBdICogdGVbIDEwIF07XG5cblx0XHRyZXR1cm4gTWF0aC5zcXJ0KCBNYXRoLm1heCggc2NhbGVYU3EsIE1hdGgubWF4KCBzY2FsZVlTcSwgc2NhbGVaU3EgKSApICk7XG5cblx0fSxcblxuXHRtYWtlVHJhbnNsYXRpb246IGZ1bmN0aW9uICggeCwgeSwgeiApIHtcblxuXHRcdHRoaXMuc2V0KFxuXG5cdFx0XHQxLCAwLCAwLCB4LFxuXHRcdFx0MCwgMSwgMCwgeSxcblx0XHRcdDAsIDAsIDEsIHosXG5cdFx0XHQwLCAwLCAwLCAxXG5cblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtYWtlUm90YXRpb25YOiBmdW5jdGlvbiAoIHRoZXRhICkge1xuXG5cdFx0dmFyIGMgPSBNYXRoLmNvcyggdGhldGEgKSwgcyA9IE1hdGguc2luKCB0aGV0YSApO1xuXG5cdFx0dGhpcy5zZXQoXG5cblx0XHRcdDEsIDAsICAwLCAwLFxuXHRcdFx0MCwgYywgLSBzLCAwLFxuXHRcdFx0MCwgcywgIGMsIDAsXG5cdFx0XHQwLCAwLCAgMCwgMVxuXG5cdFx0KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWFrZVJvdGF0aW9uWTogZnVuY3Rpb24gKCB0aGV0YSApIHtcblxuXHRcdHZhciBjID0gTWF0aC5jb3MoIHRoZXRhICksIHMgPSBNYXRoLnNpbiggdGhldGEgKTtcblxuXHRcdHRoaXMuc2V0KFxuXG5cdFx0XHQgYywgMCwgcywgMCxcblx0XHRcdCAwLCAxLCAwLCAwLFxuXHRcdFx0LSBzLCAwLCBjLCAwLFxuXHRcdFx0IDAsIDAsIDAsIDFcblxuXHRcdCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1ha2VSb3RhdGlvblo6IGZ1bmN0aW9uICggdGhldGEgKSB7XG5cblx0XHR2YXIgYyA9IE1hdGguY29zKCB0aGV0YSApLCBzID0gTWF0aC5zaW4oIHRoZXRhICk7XG5cblx0XHR0aGlzLnNldChcblxuXHRcdFx0YywgLSBzLCAwLCAwLFxuXHRcdFx0cywgIGMsIDAsIDAsXG5cdFx0XHQwLCAgMCwgMSwgMCxcblx0XHRcdDAsICAwLCAwLCAxXG5cblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtYWtlUm90YXRpb25BeGlzOiBmdW5jdGlvbiAoIGF4aXMsIGFuZ2xlICkge1xuXG5cdFx0Ly8gQmFzZWQgb24gaHR0cDovL3d3dy5nYW1lZGV2Lm5ldC9yZWZlcmVuY2UvYXJ0aWNsZXMvYXJ0aWNsZTExOTkuYXNwXG5cblx0XHR2YXIgYyA9IE1hdGguY29zKCBhbmdsZSApO1xuXHRcdHZhciBzID0gTWF0aC5zaW4oIGFuZ2xlICk7XG5cdFx0dmFyIHQgPSAxIC0gYztcblx0XHR2YXIgeCA9IGF4aXMueCwgeSA9IGF4aXMueSwgeiA9IGF4aXMuejtcblx0XHR2YXIgdHggPSB0ICogeCwgdHkgPSB0ICogeTtcblxuXHRcdHRoaXMuc2V0KFxuXG5cdFx0XHR0eCAqIHggKyBjLCB0eCAqIHkgLSBzICogeiwgdHggKiB6ICsgcyAqIHksIDAsXG5cdFx0XHR0eCAqIHkgKyBzICogeiwgdHkgKiB5ICsgYywgdHkgKiB6IC0gcyAqIHgsIDAsXG5cdFx0XHR0eCAqIHogLSBzICogeSwgdHkgKiB6ICsgcyAqIHgsIHQgKiB6ICogeiArIGMsIDAsXG5cdFx0XHQwLCAwLCAwLCAxXG5cblx0XHQpO1xuXG5cdFx0IHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWFrZVNjYWxlOiBmdW5jdGlvbiAoIHgsIHksIHogKSB7XG5cblx0XHR0aGlzLnNldChcblxuXHRcdFx0eCwgMCwgMCwgMCxcblx0XHRcdDAsIHksIDAsIDAsXG5cdFx0XHQwLCAwLCB6LCAwLFxuXHRcdFx0MCwgMCwgMCwgMVxuXG5cdFx0KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y29tcG9zZTogZnVuY3Rpb24gKCBwb3NpdGlvbiwgcXVhdGVybmlvbiwgc2NhbGUgKSB7XG5cblx0XHR0aGlzLm1ha2VSb3RhdGlvbkZyb21RdWF0ZXJuaW9uKCBxdWF0ZXJuaW9uICk7XG5cdFx0dGhpcy5zY2FsZSggc2NhbGUgKTtcblx0XHR0aGlzLnNldFBvc2l0aW9uKCBwb3NpdGlvbiApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRkZWNvbXBvc2U6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2ZWN0b3IsIG1hdHJpeDtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHBvc2l0aW9uLCBxdWF0ZXJuaW9uLCBzY2FsZSApIHtcblxuXHRcdFx0aWYgKCB2ZWN0b3IgPT09IHVuZGVmaW5lZCApIHZlY3RvciA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRpZiAoIG1hdHJpeCA9PT0gdW5kZWZpbmVkICkgbWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuXHRcdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdFx0dmFyIHN4ID0gdmVjdG9yLnNldCggdGVbIDAgXSwgdGVbIDEgXSwgdGVbIDIgXSApLmxlbmd0aCgpO1xuXHRcdFx0dmFyIHN5ID0gdmVjdG9yLnNldCggdGVbIDQgXSwgdGVbIDUgXSwgdGVbIDYgXSApLmxlbmd0aCgpO1xuXHRcdFx0dmFyIHN6ID0gdmVjdG9yLnNldCggdGVbIDggXSwgdGVbIDkgXSwgdGVbIDEwIF0gKS5sZW5ndGgoKTtcblxuXHRcdFx0Ly8gaWYgZGV0ZXJtaW5lIGlzIG5lZ2F0aXZlLCB3ZSBuZWVkIHRvIGludmVydCBvbmUgc2NhbGVcblx0XHRcdHZhciBkZXQgPSB0aGlzLmRldGVybWluYW50KCk7XG5cdFx0XHRpZiAoIGRldCA8IDAgKSB7XG5cblx0XHRcdFx0c3ggPSAtIHN4O1xuXG5cdFx0XHR9XG5cblx0XHRcdHBvc2l0aW9uLnggPSB0ZVsgMTIgXTtcblx0XHRcdHBvc2l0aW9uLnkgPSB0ZVsgMTMgXTtcblx0XHRcdHBvc2l0aW9uLnogPSB0ZVsgMTQgXTtcblxuXHRcdFx0Ly8gc2NhbGUgdGhlIHJvdGF0aW9uIHBhcnRcblxuXHRcdFx0bWF0cml4LmVsZW1lbnRzLnNldCggdGhpcy5lbGVtZW50cyApOyAvLyBhdCB0aGlzIHBvaW50IG1hdHJpeCBpcyBpbmNvbXBsZXRlIHNvIHdlIGNhbid0IHVzZSAuY29weSgpXG5cblx0XHRcdHZhciBpbnZTWCA9IDEgLyBzeDtcblx0XHRcdHZhciBpbnZTWSA9IDEgLyBzeTtcblx0XHRcdHZhciBpbnZTWiA9IDEgLyBzejtcblxuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyAwIF0gKj0gaW52U1g7XG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDEgXSAqPSBpbnZTWDtcblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMiBdICo9IGludlNYO1xuXG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDQgXSAqPSBpbnZTWTtcblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgNSBdICo9IGludlNZO1xuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyA2IF0gKj0gaW52U1k7XG5cblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgOCBdICo9IGludlNaO1xuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyA5IF0gKj0gaW52U1o7XG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDEwIF0gKj0gaW52U1o7XG5cblx0XHRcdHF1YXRlcm5pb24uc2V0RnJvbVJvdGF0aW9uTWF0cml4KCBtYXRyaXggKTtcblxuXHRcdFx0c2NhbGUueCA9IHN4O1xuXHRcdFx0c2NhbGUueSA9IHN5O1xuXHRcdFx0c2NhbGUueiA9IHN6O1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdG1ha2VGcnVzdHVtOiBmdW5jdGlvbiAoIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblx0XHR2YXIgeCA9IDIgKiBuZWFyIC8gKCByaWdodCAtIGxlZnQgKTtcblx0XHR2YXIgeSA9IDIgKiBuZWFyIC8gKCB0b3AgLSBib3R0b20gKTtcblxuXHRcdHZhciBhID0gKCByaWdodCArIGxlZnQgKSAvICggcmlnaHQgLSBsZWZ0ICk7XG5cdFx0dmFyIGIgPSAoIHRvcCArIGJvdHRvbSApIC8gKCB0b3AgLSBib3R0b20gKTtcblx0XHR2YXIgYyA9IC0gKCBmYXIgKyBuZWFyICkgLyAoIGZhciAtIG5lYXIgKTtcblx0XHR2YXIgZCA9IC0gMiAqIGZhciAqIG5lYXIgLyAoIGZhciAtIG5lYXIgKTtcblxuXHRcdHRlWyAwIF0gPSB4O1x0dGVbIDQgXSA9IDA7XHR0ZVsgOCBdID0gYTtcdHRlWyAxMiBdID0gMDtcblx0XHR0ZVsgMSBdID0gMDtcdHRlWyA1IF0gPSB5O1x0dGVbIDkgXSA9IGI7XHR0ZVsgMTMgXSA9IDA7XG5cdFx0dGVbIDIgXSA9IDA7XHR0ZVsgNiBdID0gMDtcdHRlWyAxMCBdID0gYztcdHRlWyAxNCBdID0gZDtcblx0XHR0ZVsgMyBdID0gMDtcdHRlWyA3IF0gPSAwO1x0dGVbIDExIF0gPSAtIDE7XHR0ZVsgMTUgXSA9IDA7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1ha2VQZXJzcGVjdGl2ZTogZnVuY3Rpb24gKCBmb3YsIGFzcGVjdCwgbmVhciwgZmFyICkge1xuXG5cdFx0dmFyIHltYXggPSBuZWFyICogTWF0aC50YW4oIFRIUkVFLk1hdGguZGVnVG9SYWQoIGZvdiAqIDAuNSApICk7XG5cdFx0dmFyIHltaW4gPSAtIHltYXg7XG5cdFx0dmFyIHhtaW4gPSB5bWluICogYXNwZWN0O1xuXHRcdHZhciB4bWF4ID0geW1heCAqIGFzcGVjdDtcblxuXHRcdHJldHVybiB0aGlzLm1ha2VGcnVzdHVtKCB4bWluLCB4bWF4LCB5bWluLCB5bWF4LCBuZWFyLCBmYXIgKTtcblxuXHR9LFxuXG5cdG1ha2VPcnRob2dyYXBoaWM6IGZ1bmN0aW9uICggbGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tLCBuZWFyLCBmYXIgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXHRcdHZhciB3ID0gcmlnaHQgLSBsZWZ0O1xuXHRcdHZhciBoID0gdG9wIC0gYm90dG9tO1xuXHRcdHZhciBwID0gZmFyIC0gbmVhcjtcblxuXHRcdHZhciB4ID0gKCByaWdodCArIGxlZnQgKSAvIHc7XG5cdFx0dmFyIHkgPSAoIHRvcCArIGJvdHRvbSApIC8gaDtcblx0XHR2YXIgeiA9ICggZmFyICsgbmVhciApIC8gcDtcblxuXHRcdHRlWyAwIF0gPSAyIC8gdztcdHRlWyA0IF0gPSAwO1x0dGVbIDggXSA9IDA7XHR0ZVsgMTIgXSA9IC0geDtcblx0XHR0ZVsgMSBdID0gMDtcdHRlWyA1IF0gPSAyIC8gaDtcdHRlWyA5IF0gPSAwO1x0dGVbIDEzIF0gPSAtIHk7XG5cdFx0dGVbIDIgXSA9IDA7XHR0ZVsgNiBdID0gMDtcdHRlWyAxMCBdID0gLSAyIC8gcDtcdHRlWyAxNCBdID0gLSB6O1xuXHRcdHRlWyAzIF0gPSAwO1x0dGVbIDcgXSA9IDA7XHR0ZVsgMTEgXSA9IDA7XHR0ZVsgMTUgXSA9IDE7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGZyb21BcnJheTogZnVuY3Rpb24gKCBhcnJheSApIHtcblxuXHRcdHRoaXMuZWxlbWVudHMuc2V0KCBhcnJheSApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0cmV0dXJuIFtcblx0XHRcdHRlWyAwIF0sIHRlWyAxIF0sIHRlWyAyIF0sIHRlWyAzIF0sXG5cdFx0XHR0ZVsgNCBdLCB0ZVsgNSBdLCB0ZVsgNiBdLCB0ZVsgNyBdLFxuXHRcdFx0dGVbIDggXSwgdGVbIDkgXSwgdGVbIDEwIF0sIHRlWyAxMSBdLFxuXHRcdFx0dGVbIDEyIF0sIHRlWyAxMyBdLCB0ZVsgMTQgXSwgdGVbIDE1IF1cblx0XHRdO1xuXG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBuZXcgVEhSRUUuTWF0cml4NCgpLmZyb21BcnJheSggdGhpcy5lbGVtZW50cyApO1xuXG5cdH1cblxufTtcblxuLy8gRmlsZTpzcmMvbWF0aC9SYXkuanNcblxuLyoqXG4gKiBAYXV0aG9yIGJob3VzdG9uIC8gaHR0cDovL2V4b2NvcnRleC5jb21cbiAqL1xuXG5USFJFRS5SYXkgPSBmdW5jdGlvbiAoIG9yaWdpbiwgZGlyZWN0aW9uICkge1xuXG5cdHRoaXMub3JpZ2luID0gKCBvcmlnaW4gIT09IHVuZGVmaW5lZCApID8gb3JpZ2luIDogbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0dGhpcy5kaXJlY3Rpb24gPSAoIGRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkICkgPyBkaXJlY3Rpb24gOiBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG59O1xuXG5USFJFRS5SYXkucHJvdG90eXBlID0ge1xuXG5cdGNvbnN0cnVjdG9yOiBUSFJFRS5SYXksXG5cblx0c2V0OiBmdW5jdGlvbiAoIG9yaWdpbiwgZGlyZWN0aW9uICkge1xuXG5cdFx0dGhpcy5vcmlnaW4uY29weSggb3JpZ2luICk7XG5cdFx0dGhpcy5kaXJlY3Rpb24uY29weSggZGlyZWN0aW9uICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNvcHk6IGZ1bmN0aW9uICggcmF5ICkge1xuXG5cdFx0dGhpcy5vcmlnaW4uY29weSggcmF5Lm9yaWdpbiApO1xuXHRcdHRoaXMuZGlyZWN0aW9uLmNvcHkoIHJheS5kaXJlY3Rpb24gKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YXQ6IGZ1bmN0aW9uICggdCwgb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHR2YXIgcmVzdWx0ID0gb3B0aW9uYWxUYXJnZXQgfHwgbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJldHVybiByZXN1bHQuY29weSggdGhpcy5kaXJlY3Rpb24gKS5tdWx0aXBseVNjYWxhciggdCApLmFkZCggdGhpcy5vcmlnaW4gKTtcblxuXHR9LFxuXG5cdHJlY2FzdDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHQgKSB7XG5cblx0XHRcdHRoaXMub3JpZ2luLmNvcHkoIHRoaXMuYXQoIHQsIHYxICkgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRjbG9zZXN0UG9pbnRUb1BvaW50OiBmdW5jdGlvbiAoIHBvaW50LCBvcHRpb25hbFRhcmdldCApIHtcblxuXHRcdHZhciByZXN1bHQgPSBvcHRpb25hbFRhcmdldCB8fCBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHJlc3VsdC5zdWJWZWN0b3JzKCBwb2ludCwgdGhpcy5vcmlnaW4gKTtcblx0XHR2YXIgZGlyZWN0aW9uRGlzdGFuY2UgPSByZXN1bHQuZG90KCB0aGlzLmRpcmVjdGlvbiApO1xuXG5cdFx0aWYgKCBkaXJlY3Rpb25EaXN0YW5jZSA8IDAgKSB7XG5cblx0XHRcdHJldHVybiByZXN1bHQuY29weSggdGhpcy5vcmlnaW4gKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQuY29weSggdGhpcy5kaXJlY3Rpb24gKS5tdWx0aXBseVNjYWxhciggZGlyZWN0aW9uRGlzdGFuY2UgKS5hZGQoIHRoaXMub3JpZ2luICk7XG5cblx0fSxcblxuXHRkaXN0YW5jZVRvUG9pbnQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBwb2ludCApIHtcblxuXHRcdFx0dmFyIGRpcmVjdGlvbkRpc3RhbmNlID0gdjEuc3ViVmVjdG9ycyggcG9pbnQsIHRoaXMub3JpZ2luICkuZG90KCB0aGlzLmRpcmVjdGlvbiApO1xuXG5cdFx0XHQvLyBwb2ludCBiZWhpbmQgdGhlIHJheVxuXG5cdFx0XHRpZiAoIGRpcmVjdGlvbkRpc3RhbmNlIDwgMCApIHtcblxuXHRcdFx0XHRyZXR1cm4gdGhpcy5vcmlnaW4uZGlzdGFuY2VUbyggcG9pbnQgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHR2MS5jb3B5KCB0aGlzLmRpcmVjdGlvbiApLm11bHRpcGx5U2NhbGFyKCBkaXJlY3Rpb25EaXN0YW5jZSApLmFkZCggdGhpcy5vcmlnaW4gKTtcblxuXHRcdFx0cmV0dXJuIHYxLmRpc3RhbmNlVG8oIHBvaW50ICk7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRkaXN0YW5jZVNxVG9TZWdtZW50OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgc2VnQ2VudGVyID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHR2YXIgc2VnRGlyID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHR2YXIgZGlmZiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCB2MCwgdjEsIG9wdGlvbmFsUG9pbnRPblJheSwgb3B0aW9uYWxQb2ludE9uU2VnbWVudCApIHtcblxuXHRcdFx0Ly8gZnJvbSBodHRwOi8vd3d3Lmdlb21ldHJpY3Rvb2xzLmNvbS9MaWJNYXRoZW1hdGljcy9EaXN0YW5jZS9XbTVEaXN0UmF5M1NlZ21lbnQzLmNwcFxuXHRcdFx0Ly8gSXQgcmV0dXJucyB0aGUgbWluIGRpc3RhbmNlIGJldHdlZW4gdGhlIHJheSBhbmQgdGhlIHNlZ21lbnRcblx0XHRcdC8vIGRlZmluZWQgYnkgdjAgYW5kIHYxXG5cdFx0XHQvLyBJdCBjYW4gYWxzbyBzZXQgdHdvIG9wdGlvbmFsIHRhcmdldHMgOlxuXHRcdFx0Ly8gLSBUaGUgY2xvc2VzdCBwb2ludCBvbiB0aGUgcmF5XG5cdFx0XHQvLyAtIFRoZSBjbG9zZXN0IHBvaW50IG9uIHRoZSBzZWdtZW50XG5cblx0XHRcdHNlZ0NlbnRlci5jb3B5KCB2MCApLmFkZCggdjEgKS5tdWx0aXBseVNjYWxhciggMC41ICk7XG5cdFx0XHRzZWdEaXIuY29weSggdjEgKS5zdWIoIHYwICkubm9ybWFsaXplKCk7XG5cdFx0XHRkaWZmLmNvcHkoIHRoaXMub3JpZ2luICkuc3ViKCBzZWdDZW50ZXIgKTtcblxuXHRcdFx0dmFyIHNlZ0V4dGVudCA9IHYwLmRpc3RhbmNlVG8oIHYxICkgKiAwLjU7XG5cdFx0XHR2YXIgYTAxID0gLSB0aGlzLmRpcmVjdGlvbi5kb3QoIHNlZ0RpciApO1xuXHRcdFx0dmFyIGIwID0gZGlmZi5kb3QoIHRoaXMuZGlyZWN0aW9uICk7XG5cdFx0XHR2YXIgYjEgPSAtIGRpZmYuZG90KCBzZWdEaXIgKTtcblx0XHRcdHZhciBjID0gZGlmZi5sZW5ndGhTcSgpO1xuXHRcdFx0dmFyIGRldCA9IE1hdGguYWJzKCAxIC0gYTAxICogYTAxICk7XG5cdFx0XHR2YXIgczAsIHMxLCBzcXJEaXN0LCBleHREZXQ7XG5cblx0XHRcdGlmICggZGV0ID4gMCApIHtcblxuXHRcdFx0XHQvLyBUaGUgcmF5IGFuZCBzZWdtZW50IGFyZSBub3QgcGFyYWxsZWwuXG5cblx0XHRcdFx0czAgPSBhMDEgKiBiMSAtIGIwO1xuXHRcdFx0XHRzMSA9IGEwMSAqIGIwIC0gYjE7XG5cdFx0XHRcdGV4dERldCA9IHNlZ0V4dGVudCAqIGRldDtcblxuXHRcdFx0XHRpZiAoIHMwID49IDAgKSB7XG5cblx0XHRcdFx0XHRpZiAoIHMxID49IC0gZXh0RGV0ICkge1xuXG5cdFx0XHRcdFx0XHRpZiAoIHMxIDw9IGV4dERldCApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyByZWdpb24gMFxuXHRcdFx0XHRcdFx0XHQvLyBNaW5pbXVtIGF0IGludGVyaW9yIHBvaW50cyBvZiByYXkgYW5kIHNlZ21lbnQuXG5cblx0XHRcdFx0XHRcdFx0dmFyIGludkRldCA9IDEgLyBkZXQ7XG5cdFx0XHRcdFx0XHRcdHMwICo9IGludkRldDtcblx0XHRcdFx0XHRcdFx0czEgKj0gaW52RGV0O1xuXHRcdFx0XHRcdFx0XHRzcXJEaXN0ID0gczAgKiAoIHMwICsgYTAxICogczEgKyAyICogYjAgKSArIHMxICogKCBhMDEgKiBzMCArIHMxICsgMiAqIGIxICkgKyBjO1xuXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdC8vIHJlZ2lvbiAxXG5cblx0XHRcdFx0XHRcdFx0czEgPSBzZWdFeHRlbnQ7XG5cdFx0XHRcdFx0XHRcdHMwID0gTWF0aC5tYXgoIDAsIC0gKCBhMDEgKiBzMSArIGIwICkgKTtcblx0XHRcdFx0XHRcdFx0c3FyRGlzdCA9IC0gczAgKiBzMCArIHMxICogKCBzMSArIDIgKiBiMSApICsgYztcblxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0Ly8gcmVnaW9uIDVcblxuXHRcdFx0XHRcdFx0czEgPSAtIHNlZ0V4dGVudDtcblx0XHRcdFx0XHRcdHMwID0gTWF0aC5tYXgoIDAsIC0gKCBhMDEgKiBzMSArIGIwICkgKTtcblx0XHRcdFx0XHRcdHNxckRpc3QgPSAtIHMwICogczAgKyBzMSAqICggczEgKyAyICogYjEgKSArIGM7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdGlmICggczEgPD0gLSBleHREZXQgKSB7XG5cblx0XHRcdFx0XHRcdC8vIHJlZ2lvbiA0XG5cblx0XHRcdFx0XHRcdHMwID0gTWF0aC5tYXgoIDAsIC0gKCAtIGEwMSAqIHNlZ0V4dGVudCArIGIwICkgKTtcblx0XHRcdFx0XHRcdHMxID0gKCBzMCA+IDAgKSA/IC0gc2VnRXh0ZW50IDogTWF0aC5taW4oIE1hdGgubWF4KCAtIHNlZ0V4dGVudCwgLSBiMSApLCBzZWdFeHRlbnQgKTtcblx0XHRcdFx0XHRcdHNxckRpc3QgPSAtIHMwICogczAgKyBzMSAqICggczEgKyAyICogYjEgKSArIGM7XG5cblx0XHRcdFx0XHR9IGVsc2UgaWYgKCBzMSA8PSBleHREZXQgKSB7XG5cblx0XHRcdFx0XHRcdC8vIHJlZ2lvbiAzXG5cblx0XHRcdFx0XHRcdHMwID0gMDtcblx0XHRcdFx0XHRcdHMxID0gTWF0aC5taW4oIE1hdGgubWF4KCAtIHNlZ0V4dGVudCwgLSBiMSApLCBzZWdFeHRlbnQgKTtcblx0XHRcdFx0XHRcdHNxckRpc3QgPSBzMSAqICggczEgKyAyICogYjEgKSArIGM7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHQvLyByZWdpb24gMlxuXG5cdFx0XHRcdFx0XHRzMCA9IE1hdGgubWF4KCAwLCAtICggYTAxICogc2VnRXh0ZW50ICsgYjAgKSApO1xuXHRcdFx0XHRcdFx0czEgPSAoIHMwID4gMCApID8gc2VnRXh0ZW50IDogTWF0aC5taW4oIE1hdGgubWF4KCAtIHNlZ0V4dGVudCwgLSBiMSApLCBzZWdFeHRlbnQgKTtcblx0XHRcdFx0XHRcdHNxckRpc3QgPSAtIHMwICogczAgKyBzMSAqICggczEgKyAyICogYjEgKSArIGM7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIFJheSBhbmQgc2VnbWVudCBhcmUgcGFyYWxsZWwuXG5cblx0XHRcdFx0czEgPSAoIGEwMSA+IDAgKSA/IC0gc2VnRXh0ZW50IDogc2VnRXh0ZW50O1xuXHRcdFx0XHRzMCA9IE1hdGgubWF4KCAwLCAtICggYTAxICogczEgKyBiMCApICk7XG5cdFx0XHRcdHNxckRpc3QgPSAtIHMwICogczAgKyBzMSAqICggczEgKyAyICogYjEgKSArIGM7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBvcHRpb25hbFBvaW50T25SYXkgKSB7XG5cblx0XHRcdFx0b3B0aW9uYWxQb2ludE9uUmF5LmNvcHkoIHRoaXMuZGlyZWN0aW9uICkubXVsdGlwbHlTY2FsYXIoIHMwICkuYWRkKCB0aGlzLm9yaWdpbiApO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggb3B0aW9uYWxQb2ludE9uU2VnbWVudCApIHtcblxuXHRcdFx0XHRvcHRpb25hbFBvaW50T25TZWdtZW50LmNvcHkoIHNlZ0RpciApLm11bHRpcGx5U2NhbGFyKCBzMSApLmFkZCggc2VnQ2VudGVyICk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHNxckRpc3Q7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXG5cdGlzSW50ZXJzZWN0aW9uU3BoZXJlOiBmdW5jdGlvbiAoIHNwaGVyZSApIHtcblxuXHRcdHJldHVybiB0aGlzLmRpc3RhbmNlVG9Qb2ludCggc3BoZXJlLmNlbnRlciApIDw9IHNwaGVyZS5yYWRpdXM7XG5cblx0fSxcblxuXHRpbnRlcnNlY3RTcGhlcmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIGZyb20gaHR0cDovL3d3dy5zY3JhdGNoYXBpeGVsLmNvbS9sZXNzb25zLzNkLWJhc2ljLWxlc3NvbnMvbGVzc29uLTctaW50ZXJzZWN0aW5nLXNpbXBsZS1zaGFwZXMvcmF5LXNwaGVyZS1pbnRlcnNlY3Rpb24vXG5cblx0XHR2YXIgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggc3BoZXJlLCBvcHRpb25hbFRhcmdldCApIHtcblxuXHRcdFx0djEuc3ViVmVjdG9ycyggc3BoZXJlLmNlbnRlciwgdGhpcy5vcmlnaW4gKTtcblxuXHRcdFx0dmFyIHRjYSA9IHYxLmRvdCggdGhpcy5kaXJlY3Rpb24gKTtcblxuXHRcdFx0dmFyIGQyID0gdjEuZG90KCB2MSApIC0gdGNhICogdGNhO1xuXG5cdFx0XHR2YXIgcmFkaXVzMiA9IHNwaGVyZS5yYWRpdXMgKiBzcGhlcmUucmFkaXVzO1xuXG5cdFx0XHRpZiAoIGQyID4gcmFkaXVzMiApIHJldHVybiBudWxsO1xuXG5cdFx0XHR2YXIgdGhjID0gTWF0aC5zcXJ0KCByYWRpdXMyIC0gZDIgKTtcblxuXHRcdFx0Ly8gdDAgPSBmaXJzdCBpbnRlcnNlY3QgcG9pbnQgLSBlbnRyYW5jZSBvbiBmcm9udCBvZiBzcGhlcmVcblx0XHRcdHZhciB0MCA9IHRjYSAtIHRoYztcblxuXHRcdFx0Ly8gdDEgPSBzZWNvbmQgaW50ZXJzZWN0IHBvaW50IC0gZXhpdCBwb2ludCBvbiBiYWNrIG9mIHNwaGVyZVxuXHRcdFx0dmFyIHQxID0gdGNhICsgdGhjO1xuXG5cdFx0XHQvLyB0ZXN0IHRvIHNlZSBpZiBib3RoIHQwIGFuZCB0MSBhcmUgYmVoaW5kIHRoZSByYXkgLSBpZiBzbywgcmV0dXJuIG51bGxcblx0XHRcdGlmICggdDAgPCAwICYmIHQxIDwgMCApIHJldHVybiBudWxsO1xuXG5cdFx0XHQvLyB0ZXN0IHRvIHNlZSBpZiB0MCBpcyBiZWhpbmQgdGhlIHJheTpcblx0XHRcdC8vIGlmIGl0IGlzLCB0aGUgcmF5IGlzIGluc2lkZSB0aGUgc3BoZXJlLCBzbyByZXR1cm4gdGhlIHNlY29uZCBleGl0IHBvaW50IHNjYWxlZCBieSB0MSxcblx0XHRcdC8vIGluIG9yZGVyIHRvIGFsd2F5cyByZXR1cm4gYW4gaW50ZXJzZWN0IHBvaW50IHRoYXQgaXMgaW4gZnJvbnQgb2YgdGhlIHJheS5cblx0XHRcdGlmICggdDAgPCAwICkgcmV0dXJuIHRoaXMuYXQoIHQxLCBvcHRpb25hbFRhcmdldCApO1xuXG5cdFx0XHQvLyBlbHNlIHQwIGlzIGluIGZyb250IG9mIHRoZSByYXksIHNvIHJldHVybiB0aGUgZmlyc3QgY29sbGlzaW9uIHBvaW50IHNjYWxlZCBieSB0MFxuXHRcdFx0cmV0dXJuIHRoaXMuYXQoIHQwLCBvcHRpb25hbFRhcmdldCApO1xuXG5cdFx0fVxuXG5cdH0oKSxcblxuXHRpc0ludGVyc2VjdGlvblBsYW5lOiBmdW5jdGlvbiAoIHBsYW5lICkge1xuXG5cdFx0Ly8gY2hlY2sgaWYgdGhlIHJheSBsaWVzIG9uIHRoZSBwbGFuZSBmaXJzdFxuXG5cdFx0dmFyIGRpc3RUb1BvaW50ID0gcGxhbmUuZGlzdGFuY2VUb1BvaW50KCB0aGlzLm9yaWdpbiApO1xuXG5cdFx0aWYgKCBkaXN0VG9Qb2ludCA9PT0gMCApIHtcblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHR9XG5cblx0XHR2YXIgZGVub21pbmF0b3IgPSBwbGFuZS5ub3JtYWwuZG90KCB0aGlzLmRpcmVjdGlvbiApO1xuXG5cdFx0aWYgKCBkZW5vbWluYXRvciAqIGRpc3RUb1BvaW50IDwgMCApIHtcblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHR9XG5cblx0XHQvLyByYXkgb3JpZ2luIGlzIGJlaGluZCB0aGUgcGxhbmUgKGFuZCBpcyBwb2ludGluZyBiZWhpbmQgaXQpXG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cblx0fSxcblxuXHRkaXN0YW5jZVRvUGxhbmU6IGZ1bmN0aW9uICggcGxhbmUgKSB7XG5cblx0XHR2YXIgZGVub21pbmF0b3IgPSBwbGFuZS5ub3JtYWwuZG90KCB0aGlzLmRpcmVjdGlvbiApO1xuXHRcdGlmICggZGVub21pbmF0b3IgPT09IDAgKSB7XG5cblx0XHRcdC8vIGxpbmUgaXMgY29wbGFuYXIsIHJldHVybiBvcmlnaW5cblx0XHRcdGlmICggcGxhbmUuZGlzdGFuY2VUb1BvaW50KCB0aGlzLm9yaWdpbiApID09PSAwICkge1xuXG5cdFx0XHRcdHJldHVybiAwO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIE51bGwgaXMgcHJlZmVyYWJsZSB0byB1bmRlZmluZWQgc2luY2UgdW5kZWZpbmVkIG1lYW5zLi4uLiBpdCBpcyB1bmRlZmluZWRcblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHR9XG5cblx0XHR2YXIgdCA9IC0gKCB0aGlzLm9yaWdpbi5kb3QoIHBsYW5lLm5vcm1hbCApICsgcGxhbmUuY29uc3RhbnQgKSAvIGRlbm9taW5hdG9yO1xuXG5cdFx0Ly8gUmV0dXJuIGlmIHRoZSByYXkgbmV2ZXIgaW50ZXJzZWN0cyB0aGUgcGxhbmVcblxuXHRcdHJldHVybiB0ID49IDAgPyB0IDogIG51bGw7XG5cblx0fSxcblxuXHRpbnRlcnNlY3RQbGFuZTogZnVuY3Rpb24gKCBwbGFuZSwgb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHR2YXIgdCA9IHRoaXMuZGlzdGFuY2VUb1BsYW5lKCBwbGFuZSApO1xuXG5cdFx0aWYgKCB0ID09PSBudWxsICkge1xuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5hdCggdCwgb3B0aW9uYWxUYXJnZXQgKTtcblxuXHR9LFxuXG5cdGlzSW50ZXJzZWN0aW9uQm94OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBib3ggKSB7XG5cblx0XHRcdHJldHVybiB0aGlzLmludGVyc2VjdEJveCggYm94LCB2ICkgIT09IG51bGw7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRpbnRlcnNlY3RCb3g6IGZ1bmN0aW9uICggYm94LCBvcHRpb25hbFRhcmdldCApIHtcblxuXHRcdC8vIGh0dHA6Ly93d3cuc2NyYXRjaGFwaXhlbC5jb20vbGVzc29ucy8zZC1iYXNpYy1sZXNzb25zL2xlc3Nvbi03LWludGVyc2VjdGluZy1zaW1wbGUtc2hhcGVzL3JheS1ib3gtaW50ZXJzZWN0aW9uL1xuXG5cdFx0dmFyIHRtaW4sdG1heCx0eW1pbix0eW1heCx0em1pbix0em1heDtcblxuXHRcdHZhciBpbnZkaXJ4ID0gMSAvIHRoaXMuZGlyZWN0aW9uLngsXG5cdFx0XHRpbnZkaXJ5ID0gMSAvIHRoaXMuZGlyZWN0aW9uLnksXG5cdFx0XHRpbnZkaXJ6ID0gMSAvIHRoaXMuZGlyZWN0aW9uLno7XG5cblx0XHR2YXIgb3JpZ2luID0gdGhpcy5vcmlnaW47XG5cblx0XHRpZiAoIGludmRpcnggPj0gMCApIHtcblxuXHRcdFx0dG1pbiA9ICggYm94Lm1pbi54IC0gb3JpZ2luLnggKSAqIGludmRpcng7XG5cdFx0XHR0bWF4ID0gKCBib3gubWF4LnggLSBvcmlnaW4ueCApICogaW52ZGlyeDtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRtaW4gPSAoIGJveC5tYXgueCAtIG9yaWdpbi54ICkgKiBpbnZkaXJ4O1xuXHRcdFx0dG1heCA9ICggYm94Lm1pbi54IC0gb3JpZ2luLnggKSAqIGludmRpcng7XG5cdFx0fVxuXG5cdFx0aWYgKCBpbnZkaXJ5ID49IDAgKSB7XG5cblx0XHRcdHR5bWluID0gKCBib3gubWluLnkgLSBvcmlnaW4ueSApICogaW52ZGlyeTtcblx0XHRcdHR5bWF4ID0gKCBib3gubWF4LnkgLSBvcmlnaW4ueSApICogaW52ZGlyeTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHR5bWluID0gKCBib3gubWF4LnkgLSBvcmlnaW4ueSApICogaW52ZGlyeTtcblx0XHRcdHR5bWF4ID0gKCBib3gubWluLnkgLSBvcmlnaW4ueSApICogaW52ZGlyeTtcblx0XHR9XG5cblx0XHRpZiAoICggdG1pbiA+IHR5bWF4ICkgfHwgKCB0eW1pbiA+IHRtYXggKSApIHJldHVybiBudWxsO1xuXG5cdFx0Ly8gVGhlc2UgbGluZXMgYWxzbyBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgdG1pbiBvciB0bWF4IGlzIE5hTlxuXHRcdC8vIChyZXN1bHQgb2YgMCAqIEluZmluaXR5KS4geCAhPT0geCByZXR1cm5zIHRydWUgaWYgeCBpcyBOYU5cblxuXHRcdGlmICggdHltaW4gPiB0bWluIHx8IHRtaW4gIT09IHRtaW4gKSB0bWluID0gdHltaW47XG5cblx0XHRpZiAoIHR5bWF4IDwgdG1heCB8fCB0bWF4ICE9PSB0bWF4ICkgdG1heCA9IHR5bWF4O1xuXG5cdFx0aWYgKCBpbnZkaXJ6ID49IDAgKSB7XG5cblx0XHRcdHR6bWluID0gKCBib3gubWluLnogLSBvcmlnaW4ueiApICogaW52ZGlyejtcblx0XHRcdHR6bWF4ID0gKCBib3gubWF4LnogLSBvcmlnaW4ueiApICogaW52ZGlyejtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHR6bWluID0gKCBib3gubWF4LnogLSBvcmlnaW4ueiApICogaW52ZGlyejtcblx0XHRcdHR6bWF4ID0gKCBib3gubWluLnogLSBvcmlnaW4ueiApICogaW52ZGlyejtcblx0XHR9XG5cblx0XHRpZiAoICggdG1pbiA+IHR6bWF4ICkgfHwgKCB0em1pbiA+IHRtYXggKSApIHJldHVybiBudWxsO1xuXG5cdFx0aWYgKCB0em1pbiA+IHRtaW4gfHwgdG1pbiAhPT0gdG1pbiApIHRtaW4gPSB0em1pbjtcblxuXHRcdGlmICggdHptYXggPCB0bWF4IHx8IHRtYXggIT09IHRtYXggKSB0bWF4ID0gdHptYXg7XG5cblx0XHQvL3JldHVybiBwb2ludCBjbG9zZXN0IHRvIHRoZSByYXkgKHBvc2l0aXZlIHNpZGUpXG5cblx0XHRpZiAoIHRtYXggPCAwICkgcmV0dXJuIG51bGw7XG5cblx0XHRyZXR1cm4gdGhpcy5hdCggdG1pbiA+PSAwID8gdG1pbiA6IHRtYXgsIG9wdGlvbmFsVGFyZ2V0ICk7XG5cblx0fSxcblxuXHRpbnRlcnNlY3RUcmlhbmdsZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gQ29tcHV0ZSB0aGUgb2Zmc2V0IG9yaWdpbiwgZWRnZXMsIGFuZCBub3JtYWwuXG5cdFx0dmFyIGRpZmYgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHZhciBlZGdlMSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0dmFyIGVkZ2UyID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHR2YXIgbm9ybWFsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIGEsIGIsIGMsIGJhY2tmYWNlQ3VsbGluZywgb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHRcdC8vIGZyb20gaHR0cDovL3d3dy5nZW9tZXRyaWN0b29scy5jb20vTGliTWF0aGVtYXRpY3MvSW50ZXJzZWN0aW9uL1dtNUludHJSYXkzVHJpYW5nbGUzLmNwcFxuXG5cdFx0XHRlZGdlMS5zdWJWZWN0b3JzKCBiLCBhICk7XG5cdFx0XHRlZGdlMi5zdWJWZWN0b3JzKCBjLCBhICk7XG5cdFx0XHRub3JtYWwuY3Jvc3NWZWN0b3JzKCBlZGdlMSwgZWRnZTIgKTtcblxuXHRcdFx0Ly8gU29sdmUgUSArIHQqRCA9IGIxKkUxICsgYjIqRTIgKFEgPSBrRGlmZiwgRCA9IHJheSBkaXJlY3Rpb24sXG5cdFx0XHQvLyBFMSA9IGtFZGdlMSwgRTIgPSBrRWRnZTIsIE4gPSBDcm9zcyhFMSxFMikpIGJ5XG5cdFx0XHQvLyAgIHxEb3QoRCxOKXwqYjEgPSBzaWduKERvdChELE4pKSpEb3QoRCxDcm9zcyhRLEUyKSlcblx0XHRcdC8vICAgfERvdChELE4pfCpiMiA9IHNpZ24oRG90KEQsTikpKkRvdChELENyb3NzKEUxLFEpKVxuXHRcdFx0Ly8gICB8RG90KEQsTil8KnQgPSAtc2lnbihEb3QoRCxOKSkqRG90KFEsTilcblx0XHRcdHZhciBEZE4gPSB0aGlzLmRpcmVjdGlvbi5kb3QoIG5vcm1hbCApO1xuXHRcdFx0dmFyIHNpZ247XG5cblx0XHRcdGlmICggRGROID4gMCApIHtcblxuXHRcdFx0XHRpZiAoIGJhY2tmYWNlQ3VsbGluZyApIHJldHVybiBudWxsO1xuXHRcdFx0XHRzaWduID0gMTtcblxuXHRcdFx0fSBlbHNlIGlmICggRGROIDwgMCApIHtcblxuXHRcdFx0XHRzaWduID0gLSAxO1xuXHRcdFx0XHREZE4gPSAtIERkTjtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdFx0fVxuXG5cdFx0XHRkaWZmLnN1YlZlY3RvcnMoIHRoaXMub3JpZ2luLCBhICk7XG5cdFx0XHR2YXIgRGRReEUyID0gc2lnbiAqIHRoaXMuZGlyZWN0aW9uLmRvdCggZWRnZTIuY3Jvc3NWZWN0b3JzKCBkaWZmLCBlZGdlMiApICk7XG5cblx0XHRcdC8vIGIxIDwgMCwgbm8gaW50ZXJzZWN0aW9uXG5cdFx0XHRpZiAoIERkUXhFMiA8IDAgKSB7XG5cblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHRcdH1cblxuXHRcdFx0dmFyIERkRTF4USA9IHNpZ24gKiB0aGlzLmRpcmVjdGlvbi5kb3QoIGVkZ2UxLmNyb3NzKCBkaWZmICkgKTtcblxuXHRcdFx0Ly8gYjIgPCAwLCBubyBpbnRlcnNlY3Rpb25cblx0XHRcdGlmICggRGRFMXhRIDwgMCApIHtcblxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBiMStiMiA+IDEsIG5vIGludGVyc2VjdGlvblxuXHRcdFx0aWYgKCBEZFF4RTIgKyBEZEUxeFEgPiBEZE4gKSB7XG5cblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHRcdH1cblxuXHRcdFx0Ly8gTGluZSBpbnRlcnNlY3RzIHRyaWFuZ2xlLCBjaGVjayBpZiByYXkgZG9lcy5cblx0XHRcdHZhciBRZE4gPSAtIHNpZ24gKiBkaWZmLmRvdCggbm9ybWFsICk7XG5cblx0XHRcdC8vIHQgPCAwLCBubyBpbnRlcnNlY3Rpb25cblx0XHRcdGlmICggUWROIDwgMCApIHtcblxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBSYXkgaW50ZXJzZWN0cyB0cmlhbmdsZS5cblx0XHRcdHJldHVybiB0aGlzLmF0KCBRZE4gLyBEZE4sIG9wdGlvbmFsVGFyZ2V0ICk7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRhcHBseU1hdHJpeDQ6IGZ1bmN0aW9uICggbWF0cml4NCApIHtcblxuXHRcdHRoaXMuZGlyZWN0aW9uLmFkZCggdGhpcy5vcmlnaW4gKS5hcHBseU1hdHJpeDQoIG1hdHJpeDQgKTtcblx0XHR0aGlzLm9yaWdpbi5hcHBseU1hdHJpeDQoIG1hdHJpeDQgKTtcblx0XHR0aGlzLmRpcmVjdGlvbi5zdWIoIHRoaXMub3JpZ2luICk7XG5cdFx0dGhpcy5kaXJlY3Rpb24ubm9ybWFsaXplKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRlcXVhbHM6IGZ1bmN0aW9uICggcmF5ICkge1xuXG5cdFx0cmV0dXJuIHJheS5vcmlnaW4uZXF1YWxzKCB0aGlzLm9yaWdpbiApICYmIHJheS5kaXJlY3Rpb24uZXF1YWxzKCB0aGlzLmRpcmVjdGlvbiApO1xuXG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBuZXcgVEhSRUUuUmF5KCkuY29weSggdGhpcyApO1xuXG5cdH1cblxufTtcblxuLy8gRmlsZTpzcmMvbWF0aC9TcGhlcmUuanNcblxuLyoqXG4gKiBAYXV0aG9yIGJob3VzdG9uIC8gaHR0cDovL2V4b2NvcnRleC5jb21cbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKi9cblxuVEhSRUUuU3BoZXJlID0gZnVuY3Rpb24gKCBjZW50ZXIsIHJhZGl1cyApIHtcblxuXHR0aGlzLmNlbnRlciA9ICggY2VudGVyICE9PSB1bmRlZmluZWQgKSA/IGNlbnRlciA6IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdHRoaXMucmFkaXVzID0gKCByYWRpdXMgIT09IHVuZGVmaW5lZCApID8gcmFkaXVzIDogMDtcblxufTtcblxuVEhSRUUuU3BoZXJlLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogVEhSRUUuU3BoZXJlLFxuXG5cdHNldDogZnVuY3Rpb24gKCBjZW50ZXIsIHJhZGl1cyApIHtcblxuXHRcdHRoaXMuY2VudGVyLmNvcHkoIGNlbnRlciApO1xuXHRcdHRoaXMucmFkaXVzID0gcmFkaXVzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0c2V0RnJvbVBvaW50czogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIGJveCA9IG5ldyBUSFJFRS5Cb3gzKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBwb2ludHMsIG9wdGlvbmFsQ2VudGVyICkge1xuXG5cdFx0XHR2YXIgY2VudGVyID0gdGhpcy5jZW50ZXI7XG5cblx0XHRcdGlmICggb3B0aW9uYWxDZW50ZXIgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRjZW50ZXIuY29weSggb3B0aW9uYWxDZW50ZXIgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRib3guc2V0RnJvbVBvaW50cyggcG9pbnRzICkuY2VudGVyKCBjZW50ZXIgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgbWF4UmFkaXVzU3EgPSAwO1xuXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDAsIGlsID0gcG9pbnRzLmxlbmd0aDsgaSA8IGlsOyBpICsrICkge1xuXG5cdFx0XHRcdG1heFJhZGl1c1NxID0gTWF0aC5tYXgoIG1heFJhZGl1c1NxLCBjZW50ZXIuZGlzdGFuY2VUb1NxdWFyZWQoIHBvaW50c1sgaSBdICkgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnJhZGl1cyA9IE1hdGguc3FydCggbWF4UmFkaXVzU3EgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRjb3B5OiBmdW5jdGlvbiAoIHNwaGVyZSApIHtcblxuXHRcdHRoaXMuY2VudGVyLmNvcHkoIHNwaGVyZS5jZW50ZXIgKTtcblx0XHR0aGlzLnJhZGl1cyA9IHNwaGVyZS5yYWRpdXM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVtcHR5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gKCB0aGlzLnJhZGl1cyA8PSAwICk7XG5cblx0fSxcblxuXHRjb250YWluc1BvaW50OiBmdW5jdGlvbiAoIHBvaW50ICkge1xuXG5cdFx0cmV0dXJuICggcG9pbnQuZGlzdGFuY2VUb1NxdWFyZWQoIHRoaXMuY2VudGVyICkgPD0gKCB0aGlzLnJhZGl1cyAqIHRoaXMucmFkaXVzICkgKTtcblxuXHR9LFxuXG5cdGRpc3RhbmNlVG9Qb2ludDogZnVuY3Rpb24gKCBwb2ludCApIHtcblxuXHRcdHJldHVybiAoIHBvaW50LmRpc3RhbmNlVG8oIHRoaXMuY2VudGVyICkgLSB0aGlzLnJhZGl1cyApO1xuXG5cdH0sXG5cblx0aW50ZXJzZWN0c1NwaGVyZTogZnVuY3Rpb24gKCBzcGhlcmUgKSB7XG5cblx0XHR2YXIgcmFkaXVzU3VtID0gdGhpcy5yYWRpdXMgKyBzcGhlcmUucmFkaXVzO1xuXG5cdFx0cmV0dXJuIHNwaGVyZS5jZW50ZXIuZGlzdGFuY2VUb1NxdWFyZWQoIHRoaXMuY2VudGVyICkgPD0gKCByYWRpdXNTdW0gKiByYWRpdXNTdW0gKTtcblxuXHR9LFxuXG5cdGNsYW1wUG9pbnQ6IGZ1bmN0aW9uICggcG9pbnQsIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIGRlbHRhTGVuZ3RoU3EgPSB0aGlzLmNlbnRlci5kaXN0YW5jZVRvU3F1YXJlZCggcG9pbnQgKTtcblxuXHRcdHZhciByZXN1bHQgPSBvcHRpb25hbFRhcmdldCB8fCBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHJlc3VsdC5jb3B5KCBwb2ludCApO1xuXG5cdFx0aWYgKCBkZWx0YUxlbmd0aFNxID4gKCB0aGlzLnJhZGl1cyAqIHRoaXMucmFkaXVzICkgKSB7XG5cblx0XHRcdHJlc3VsdC5zdWIoIHRoaXMuY2VudGVyICkubm9ybWFsaXplKCk7XG5cdFx0XHRyZXN1bHQubXVsdGlwbHlTY2FsYXIoIHRoaXMucmFkaXVzICkuYWRkKCB0aGlzLmNlbnRlciApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblxuXHR9LFxuXG5cdGdldEJvdW5kaW5nQm94OiBmdW5jdGlvbiAoIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIGJveCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5Cb3gzKCk7XG5cblx0XHRib3guc2V0KCB0aGlzLmNlbnRlciwgdGhpcy5jZW50ZXIgKTtcblx0XHRib3guZXhwYW5kQnlTY2FsYXIoIHRoaXMucmFkaXVzICk7XG5cblx0XHRyZXR1cm4gYm94O1xuXG5cdH0sXG5cblx0YXBwbHlNYXRyaXg0OiBmdW5jdGlvbiAoIG1hdHJpeCApIHtcblxuXHRcdHRoaXMuY2VudGVyLmFwcGx5TWF0cml4NCggbWF0cml4ICk7XG5cdFx0dGhpcy5yYWRpdXMgPSB0aGlzLnJhZGl1cyAqIG1hdHJpeC5nZXRNYXhTY2FsZU9uQXhpcygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR0cmFuc2xhdGU6IGZ1bmN0aW9uICggb2Zmc2V0ICkge1xuXG5cdFx0dGhpcy5jZW50ZXIuYWRkKCBvZmZzZXQgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZXF1YWxzOiBmdW5jdGlvbiAoIHNwaGVyZSApIHtcblxuXHRcdHJldHVybiBzcGhlcmUuY2VudGVyLmVxdWFscyggdGhpcy5jZW50ZXIgKSAmJiAoIHNwaGVyZS5yYWRpdXMgPT09IHRoaXMucmFkaXVzICk7XG5cblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIG5ldyBUSFJFRS5TcGhlcmUoKS5jb3B5KCB0aGlzICk7XG5cblx0fVxuXG59O1xuXG4vLyBGaWxlOnNyYy9tYXRoL0ZydXN0dW0uanNcblxuLyoqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICogQGF1dGhvciBhbHRlcmVkcSAvIGh0dHA6Ly9hbHRlcmVkcXVhbGlhLmNvbS9cbiAqIEBhdXRob3IgYmhvdXN0b24gLyBodHRwOi8vZXhvY29ydGV4LmNvbVxuICovXG5cblRIUkVFLkZydXN0dW0gPSBmdW5jdGlvbiAoIHAwLCBwMSwgcDIsIHAzLCBwNCwgcDUgKSB7XG5cblx0dGhpcy5wbGFuZXMgPSBbXG5cblx0XHQoIHAwICE9PSB1bmRlZmluZWQgKSA/IHAwIDogbmV3IFRIUkVFLlBsYW5lKCksXG5cdFx0KCBwMSAhPT0gdW5kZWZpbmVkICkgPyBwMSA6IG5ldyBUSFJFRS5QbGFuZSgpLFxuXHRcdCggcDIgIT09IHVuZGVmaW5lZCApID8gcDIgOiBuZXcgVEhSRUUuUGxhbmUoKSxcblx0XHQoIHAzICE9PSB1bmRlZmluZWQgKSA/IHAzIDogbmV3IFRIUkVFLlBsYW5lKCksXG5cdFx0KCBwNCAhPT0gdW5kZWZpbmVkICkgPyBwNCA6IG5ldyBUSFJFRS5QbGFuZSgpLFxuXHRcdCggcDUgIT09IHVuZGVmaW5lZCApID8gcDUgOiBuZXcgVEhSRUUuUGxhbmUoKVxuXG5cdF07XG5cbn07XG5cblRIUkVFLkZydXN0dW0ucHJvdG90eXBlID0ge1xuXG5cdGNvbnN0cnVjdG9yOiBUSFJFRS5GcnVzdHVtLFxuXG5cdHNldDogZnVuY3Rpb24gKCBwMCwgcDEsIHAyLCBwMywgcDQsIHA1ICkge1xuXG5cdFx0dmFyIHBsYW5lcyA9IHRoaXMucGxhbmVzO1xuXG5cdFx0cGxhbmVzWyAwIF0uY29weSggcDAgKTtcblx0XHRwbGFuZXNbIDEgXS5jb3B5KCBwMSApO1xuXHRcdHBsYW5lc1sgMiBdLmNvcHkoIHAyICk7XG5cdFx0cGxhbmVzWyAzIF0uY29weSggcDMgKTtcblx0XHRwbGFuZXNbIDQgXS5jb3B5KCBwNCApO1xuXHRcdHBsYW5lc1sgNSBdLmNvcHkoIHA1ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNvcHk6IGZ1bmN0aW9uICggZnJ1c3R1bSApIHtcblxuXHRcdHZhciBwbGFuZXMgPSB0aGlzLnBsYW5lcztcblxuXHRcdGZvciAoIHZhciBpID0gMDsgaSA8IDY7IGkgKysgKSB7XG5cblx0XHRcdHBsYW5lc1sgaSBdLmNvcHkoIGZydXN0dW0ucGxhbmVzWyBpIF0gKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbU1hdHJpeDogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0dmFyIHBsYW5lcyA9IHRoaXMucGxhbmVzO1xuXHRcdHZhciBtZSA9IG0uZWxlbWVudHM7XG5cdFx0dmFyIG1lMCA9IG1lWyAwIF0sIG1lMSA9IG1lWyAxIF0sIG1lMiA9IG1lWyAyIF0sIG1lMyA9IG1lWyAzIF07XG5cdFx0dmFyIG1lNCA9IG1lWyA0IF0sIG1lNSA9IG1lWyA1IF0sIG1lNiA9IG1lWyA2IF0sIG1lNyA9IG1lWyA3IF07XG5cdFx0dmFyIG1lOCA9IG1lWyA4IF0sIG1lOSA9IG1lWyA5IF0sIG1lMTAgPSBtZVsgMTAgXSwgbWUxMSA9IG1lWyAxMSBdO1xuXHRcdHZhciBtZTEyID0gbWVbIDEyIF0sIG1lMTMgPSBtZVsgMTMgXSwgbWUxNCA9IG1lWyAxNCBdLCBtZTE1ID0gbWVbIDE1IF07XG5cblx0XHRwbGFuZXNbIDAgXS5zZXRDb21wb25lbnRzKCBtZTMgLSBtZTAsIG1lNyAtIG1lNCwgbWUxMSAtIG1lOCwgbWUxNSAtIG1lMTIgKS5ub3JtYWxpemUoKTtcblx0XHRwbGFuZXNbIDEgXS5zZXRDb21wb25lbnRzKCBtZTMgKyBtZTAsIG1lNyArIG1lNCwgbWUxMSArIG1lOCwgbWUxNSArIG1lMTIgKS5ub3JtYWxpemUoKTtcblx0XHRwbGFuZXNbIDIgXS5zZXRDb21wb25lbnRzKCBtZTMgKyBtZTEsIG1lNyArIG1lNSwgbWUxMSArIG1lOSwgbWUxNSArIG1lMTMgKS5ub3JtYWxpemUoKTtcblx0XHRwbGFuZXNbIDMgXS5zZXRDb21wb25lbnRzKCBtZTMgLSBtZTEsIG1lNyAtIG1lNSwgbWUxMSAtIG1lOSwgbWUxNSAtIG1lMTMgKS5ub3JtYWxpemUoKTtcblx0XHRwbGFuZXNbIDQgXS5zZXRDb21wb25lbnRzKCBtZTMgLSBtZTIsIG1lNyAtIG1lNiwgbWUxMSAtIG1lMTAsIG1lMTUgLSBtZTE0ICkubm9ybWFsaXplKCk7XG5cdFx0cGxhbmVzWyA1IF0uc2V0Q29tcG9uZW50cyggbWUzICsgbWUyLCBtZTcgKyBtZTYsIG1lMTEgKyBtZTEwLCBtZTE1ICsgbWUxNCApLm5vcm1hbGl6ZSgpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRpbnRlcnNlY3RzT2JqZWN0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgc3BoZXJlID0gbmV3IFRIUkVFLlNwaGVyZSgpO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggb2JqZWN0ICkge1xuXG5cdFx0XHR2YXIgZ2VvbWV0cnkgPSBvYmplY3QuZ2VvbWV0cnk7XG5cblx0XHRcdGlmICggZ2VvbWV0cnkuYm91bmRpbmdTcGhlcmUgPT09IG51bGwgKSBnZW9tZXRyeS5jb21wdXRlQm91bmRpbmdTcGhlcmUoKTtcblxuXHRcdFx0c3BoZXJlLmNvcHkoIGdlb21ldHJ5LmJvdW5kaW5nU3BoZXJlICk7XG5cdFx0XHRzcGhlcmUuYXBwbHlNYXRyaXg0KCBvYmplY3QubWF0cml4V29ybGQgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXMuaW50ZXJzZWN0c1NwaGVyZSggc3BoZXJlICk7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRpbnRlcnNlY3RzU3BoZXJlOiBmdW5jdGlvbiAoIHNwaGVyZSApIHtcblxuXHRcdHZhciBwbGFuZXMgPSB0aGlzLnBsYW5lcztcblx0XHR2YXIgY2VudGVyID0gc3BoZXJlLmNlbnRlcjtcblx0XHR2YXIgbmVnUmFkaXVzID0gLSBzcGhlcmUucmFkaXVzO1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgNjsgaSArKyApIHtcblxuXHRcdFx0dmFyIGRpc3RhbmNlID0gcGxhbmVzWyBpIF0uZGlzdGFuY2VUb1BvaW50KCBjZW50ZXIgKTtcblxuXHRcdFx0aWYgKCBkaXN0YW5jZSA8IG5lZ1JhZGl1cyApIHtcblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXG5cdH0sXG5cblx0aW50ZXJzZWN0c0JveDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHAxID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcblx0XHRcdHAyID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIGJveCApIHtcblxuXHRcdFx0dmFyIHBsYW5lcyA9IHRoaXMucGxhbmVzO1xuXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCA2IDsgaSArKyApIHtcblxuXHRcdFx0XHR2YXIgcGxhbmUgPSBwbGFuZXNbIGkgXTtcblxuXHRcdFx0XHRwMS54ID0gcGxhbmUubm9ybWFsLnggPiAwID8gYm94Lm1pbi54IDogYm94Lm1heC54O1xuXHRcdFx0XHRwMi54ID0gcGxhbmUubm9ybWFsLnggPiAwID8gYm94Lm1heC54IDogYm94Lm1pbi54O1xuXHRcdFx0XHRwMS55ID0gcGxhbmUubm9ybWFsLnkgPiAwID8gYm94Lm1pbi55IDogYm94Lm1heC55O1xuXHRcdFx0XHRwMi55ID0gcGxhbmUubm9ybWFsLnkgPiAwID8gYm94Lm1heC55IDogYm94Lm1pbi55O1xuXHRcdFx0XHRwMS56ID0gcGxhbmUubm9ybWFsLnogPiAwID8gYm94Lm1pbi56IDogYm94Lm1heC56O1xuXHRcdFx0XHRwMi56ID0gcGxhbmUubm9ybWFsLnogPiAwID8gYm94Lm1heC56IDogYm94Lm1pbi56O1xuXG5cdFx0XHRcdHZhciBkMSA9IHBsYW5lLmRpc3RhbmNlVG9Qb2ludCggcDEgKTtcblx0XHRcdFx0dmFyIGQyID0gcGxhbmUuZGlzdGFuY2VUb1BvaW50KCBwMiApO1xuXG5cdFx0XHRcdC8vIGlmIGJvdGggb3V0c2lkZSBwbGFuZSwgbm8gaW50ZXJzZWN0aW9uXG5cblx0XHRcdFx0aWYgKCBkMSA8IDAgJiYgZDIgPCAwICkge1xuXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fTtcblxuXHR9KCksXG5cblxuXHRjb250YWluc1BvaW50OiBmdW5jdGlvbiAoIHBvaW50ICkge1xuXG5cdFx0dmFyIHBsYW5lcyA9IHRoaXMucGxhbmVzO1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgNjsgaSArKyApIHtcblxuXHRcdFx0aWYgKCBwbGFuZXNbIGkgXS5kaXN0YW5jZVRvUG9pbnQoIHBvaW50ICkgPCAwICkge1xuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIG5ldyBUSFJFRS5GcnVzdHVtKCkuY29weSggdGhpcyApO1xuXG5cdH1cblxufTtcblxuLy8gRmlsZTpzcmMvbWF0aC9QbGFuZS5qc1xuXG4vKipcbiAqIEBhdXRob3IgYmhvdXN0b24gLyBodHRwOi8vZXhvY29ydGV4LmNvbVxuICovXG5cblRIUkVFLlBsYW5lID0gZnVuY3Rpb24gKCBub3JtYWwsIGNvbnN0YW50ICkge1xuXG5cdHRoaXMubm9ybWFsID0gKCBub3JtYWwgIT09IHVuZGVmaW5lZCApID8gbm9ybWFsIDogbmV3IFRIUkVFLlZlY3RvcjMoIDEsIDAsIDAgKTtcblx0dGhpcy5jb25zdGFudCA9ICggY29uc3RhbnQgIT09IHVuZGVmaW5lZCApID8gY29uc3RhbnQgOiAwO1xuXG59O1xuXG5USFJFRS5QbGFuZS5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IFRIUkVFLlBsYW5lLFxuXG5cdHNldDogZnVuY3Rpb24gKCBub3JtYWwsIGNvbnN0YW50ICkge1xuXG5cdFx0dGhpcy5ub3JtYWwuY29weSggbm9ybWFsICk7XG5cdFx0dGhpcy5jb25zdGFudCA9IGNvbnN0YW50O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRDb21wb25lbnRzOiBmdW5jdGlvbiAoIHgsIHksIHosIHcgKSB7XG5cblx0XHR0aGlzLm5vcm1hbC5zZXQoIHgsIHksIHogKTtcblx0XHR0aGlzLmNvbnN0YW50ID0gdztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbU5vcm1hbEFuZENvcGxhbmFyUG9pbnQ6IGZ1bmN0aW9uICggbm9ybWFsLCBwb2ludCApIHtcblxuXHRcdHRoaXMubm9ybWFsLmNvcHkoIG5vcm1hbCApO1xuXHRcdHRoaXMuY29uc3RhbnQgPSAtIHBvaW50LmRvdCggdGhpcy5ub3JtYWwgKTtcdC8vIG11c3QgYmUgdGhpcy5ub3JtYWwsIG5vdCBub3JtYWwsIGFzIHRoaXMubm9ybWFsIGlzIG5vcm1hbGl6ZWRcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbUNvcGxhbmFyUG9pbnRzOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHZhciB2MiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBhLCBiLCBjICkge1xuXG5cdFx0XHR2YXIgbm9ybWFsID0gdjEuc3ViVmVjdG9ycyggYywgYiApLmNyb3NzKCB2Mi5zdWJWZWN0b3JzKCBhLCBiICkgKS5ub3JtYWxpemUoKTtcblxuXHRcdFx0Ly8gUTogc2hvdWxkIGFuIGVycm9yIGJlIHRocm93biBpZiBub3JtYWwgaXMgemVybyAoZS5nLiBkZWdlbmVyYXRlIHBsYW5lKT9cblxuXHRcdFx0dGhpcy5zZXRGcm9tTm9ybWFsQW5kQ29wbGFuYXJQb2ludCggbm9ybWFsLCBhICk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblxuXHRjb3B5OiBmdW5jdGlvbiAoIHBsYW5lICkge1xuXG5cdFx0dGhpcy5ub3JtYWwuY29weSggcGxhbmUubm9ybWFsICk7XG5cdFx0dGhpcy5jb25zdGFudCA9IHBsYW5lLmNvbnN0YW50O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRub3JtYWxpemU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIE5vdGU6IHdpbGwgbGVhZCB0byBhIGRpdmlkZSBieSB6ZXJvIGlmIHRoZSBwbGFuZSBpcyBpbnZhbGlkLlxuXG5cdFx0dmFyIGludmVyc2VOb3JtYWxMZW5ndGggPSAxLjAgLyB0aGlzLm5vcm1hbC5sZW5ndGgoKTtcblx0XHR0aGlzLm5vcm1hbC5tdWx0aXBseVNjYWxhciggaW52ZXJzZU5vcm1hbExlbmd0aCApO1xuXHRcdHRoaXMuY29uc3RhbnQgKj0gaW52ZXJzZU5vcm1hbExlbmd0aDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bmVnYXRlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLmNvbnN0YW50ICo9IC0gMTtcblx0XHR0aGlzLm5vcm1hbC5uZWdhdGUoKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZGlzdGFuY2VUb1BvaW50OiBmdW5jdGlvbiAoIHBvaW50ICkge1xuXG5cdFx0cmV0dXJuIHRoaXMubm9ybWFsLmRvdCggcG9pbnQgKSArIHRoaXMuY29uc3RhbnQ7XG5cblx0fSxcblxuXHRkaXN0YW5jZVRvU3BoZXJlOiBmdW5jdGlvbiAoIHNwaGVyZSApIHtcblxuXHRcdHJldHVybiB0aGlzLmRpc3RhbmNlVG9Qb2ludCggc3BoZXJlLmNlbnRlciApIC0gc3BoZXJlLnJhZGl1cztcblxuXHR9LFxuXG5cdHByb2plY3RQb2ludDogZnVuY3Rpb24gKCBwb2ludCwgb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5vcnRob1BvaW50KCBwb2ludCwgb3B0aW9uYWxUYXJnZXQgKS5zdWIoIHBvaW50ICkubmVnYXRlKCk7XG5cblx0fSxcblxuXHRvcnRob1BvaW50OiBmdW5jdGlvbiAoIHBvaW50LCBvcHRpb25hbFRhcmdldCApIHtcblxuXHRcdHZhciBwZXJwZW5kaWN1bGFyTWFnbml0dWRlID0gdGhpcy5kaXN0YW5jZVRvUG9pbnQoIHBvaW50ICk7XG5cblx0XHR2YXIgcmVzdWx0ID0gb3B0aW9uYWxUYXJnZXQgfHwgbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRyZXR1cm4gcmVzdWx0LmNvcHkoIHRoaXMubm9ybWFsICkubXVsdGlwbHlTY2FsYXIoIHBlcnBlbmRpY3VsYXJNYWduaXR1ZGUgKTtcblxuXHR9LFxuXG5cdGlzSW50ZXJzZWN0aW9uTGluZTogZnVuY3Rpb24gKCBsaW5lICkge1xuXG5cdFx0Ly8gTm90ZTogdGhpcyB0ZXN0cyBpZiBhIGxpbmUgaW50ZXJzZWN0cyB0aGUgcGxhbmUsIG5vdCB3aGV0aGVyIGl0IChvciBpdHMgZW5kLXBvaW50cykgYXJlIGNvcGxhbmFyIHdpdGggaXQuXG5cblx0XHR2YXIgc3RhcnRTaWduID0gdGhpcy5kaXN0YW5jZVRvUG9pbnQoIGxpbmUuc3RhcnQgKTtcblx0XHR2YXIgZW5kU2lnbiA9IHRoaXMuZGlzdGFuY2VUb1BvaW50KCBsaW5lLmVuZCApO1xuXG5cdFx0cmV0dXJuICggc3RhcnRTaWduIDwgMCAmJiBlbmRTaWduID4gMCApIHx8ICggZW5kU2lnbiA8IDAgJiYgc3RhcnRTaWduID4gMCApO1xuXG5cdH0sXG5cblx0aW50ZXJzZWN0TGluZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIGxpbmUsIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0XHR2YXIgcmVzdWx0ID0gb3B0aW9uYWxUYXJnZXQgfHwgbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdFx0dmFyIGRpcmVjdGlvbiA9IGxpbmUuZGVsdGEoIHYxICk7XG5cblx0XHRcdHZhciBkZW5vbWluYXRvciA9IHRoaXMubm9ybWFsLmRvdCggZGlyZWN0aW9uICk7XG5cblx0XHRcdGlmICggZGVub21pbmF0b3IgPT09IDAgKSB7XG5cblx0XHRcdFx0Ly8gbGluZSBpcyBjb3BsYW5hciwgcmV0dXJuIG9yaWdpblxuXHRcdFx0XHRpZiAoIHRoaXMuZGlzdGFuY2VUb1BvaW50KCBsaW5lLnN0YXJ0ICkgPT09IDAgKSB7XG5cblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0LmNvcHkoIGxpbmUuc3RhcnQgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVW5zdXJlIGlmIHRoaXMgaXMgdGhlIGNvcnJlY3QgbWV0aG9kIHRvIGhhbmRsZSB0aGlzIGNhc2UuXG5cdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cblx0XHRcdH1cblxuXHRcdFx0dmFyIHQgPSAtICggbGluZS5zdGFydC5kb3QoIHRoaXMubm9ybWFsICkgKyB0aGlzLmNvbnN0YW50ICkgLyBkZW5vbWluYXRvcjtcblxuXHRcdFx0aWYgKCB0IDwgMCB8fCB0ID4gMSApIHtcblxuXHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQuY29weSggZGlyZWN0aW9uICkubXVsdGlwbHlTY2FsYXIoIHQgKS5hZGQoIGxpbmUuc3RhcnQgKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cblx0Y29wbGFuYXJQb2ludDogZnVuY3Rpb24gKCBvcHRpb25hbFRhcmdldCApIHtcblxuXHRcdHZhciByZXN1bHQgPSBvcHRpb25hbFRhcmdldCB8fCBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHJldHVybiByZXN1bHQuY29weSggdGhpcy5ub3JtYWwgKS5tdWx0aXBseVNjYWxhciggLSB0aGlzLmNvbnN0YW50ICk7XG5cblx0fSxcblxuXHRhcHBseU1hdHJpeDQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0dmFyIHYyID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHR2YXIgbTEgPSBuZXcgVEhSRUUuTWF0cml4MygpO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggbWF0cml4LCBvcHRpb25hbE5vcm1hbE1hdHJpeCApIHtcblxuXHRcdFx0Ly8gY29tcHV0ZSBuZXcgbm9ybWFsIGJhc2VkIG9uIHRoZW9yeSBoZXJlOlxuXHRcdFx0Ly8gaHR0cDovL3d3dy5zb25naG8uY2Evb3BlbmdsL2dsX25vcm1hbHRyYW5zZm9ybS5odG1sXG5cdFx0XHR2YXIgbm9ybWFsTWF0cml4ID0gb3B0aW9uYWxOb3JtYWxNYXRyaXggfHwgbTEuZ2V0Tm9ybWFsTWF0cml4KCBtYXRyaXggKTtcblx0XHRcdHZhciBuZXdOb3JtYWwgPSB2MS5jb3B5KCB0aGlzLm5vcm1hbCApLmFwcGx5TWF0cml4Myggbm9ybWFsTWF0cml4ICk7XG5cblx0XHRcdHZhciBuZXdDb3BsYW5hclBvaW50ID0gdGhpcy5jb3BsYW5hclBvaW50KCB2MiApO1xuXHRcdFx0bmV3Q29wbGFuYXJQb2ludC5hcHBseU1hdHJpeDQoIG1hdHJpeCApO1xuXG5cdFx0XHR0aGlzLnNldEZyb21Ob3JtYWxBbmRDb3BsYW5hclBvaW50KCBuZXdOb3JtYWwsIG5ld0NvcGxhbmFyUG9pbnQgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHR0cmFuc2xhdGU6IGZ1bmN0aW9uICggb2Zmc2V0ICkge1xuXG5cdFx0dGhpcy5jb25zdGFudCA9IHRoaXMuY29uc3RhbnQgLSBvZmZzZXQuZG90KCB0aGlzLm5vcm1hbCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlcXVhbHM6IGZ1bmN0aW9uICggcGxhbmUgKSB7XG5cblx0XHRyZXR1cm4gcGxhbmUubm9ybWFsLmVxdWFscyggdGhpcy5ub3JtYWwgKSAmJiAoIHBsYW5lLmNvbnN0YW50ID09PSB0aGlzLmNvbnN0YW50ICk7XG5cblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIG5ldyBUSFJFRS5QbGFuZSgpLmNvcHkoIHRoaXMgKTtcblxuXHR9XG5cbn07XG5cbi8vIEZpbGU6c3JjL21hdGgvTWF0aC5qc1xuXG4vKipcbiAqIEBhdXRob3IgYWx0ZXJlZHEgLyBodHRwOi8vYWx0ZXJlZHF1YWxpYS5jb20vXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICovXG5cblRIUkVFLk1hdGggPSB7XG5cblx0Z2VuZXJhdGVVVUlEOiBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBodHRwOi8vd3d3LmJyb29mYS5jb20vVG9vbHMvTWF0aC51dWlkLmh0bVxuXG5cdFx0dmFyIGNoYXJzID0gJzAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6Jy5zcGxpdCggJycgKTtcblx0XHR2YXIgdXVpZCA9IG5ldyBBcnJheSggMzYgKTtcblx0XHR2YXIgcm5kID0gMCwgcjtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGZvciAoIHZhciBpID0gMDsgaSA8IDM2OyBpICsrICkge1xuXG5cdFx0XHRcdGlmICggaSA9PT0gOCB8fCBpID09PSAxMyB8fCBpID09PSAxOCB8fCBpID09PSAyMyApIHtcblxuXHRcdFx0XHRcdHV1aWRbIGkgXSA9ICctJztcblxuXHRcdFx0XHR9IGVsc2UgaWYgKCBpID09PSAxNCApIHtcblxuXHRcdFx0XHRcdHV1aWRbIGkgXSA9ICc0JztcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0aWYgKCBybmQgPD0gMHgwMiApIHJuZCA9IDB4MjAwMDAwMCArICggTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMCApIHwgMDtcblx0XHRcdFx0XHRyID0gcm5kICYgMHhmO1xuXHRcdFx0XHRcdHJuZCA9IHJuZCA+PiA0O1xuXHRcdFx0XHRcdHV1aWRbIGkgXSA9IGNoYXJzWyAoIGkgPT09IDE5ICkgPyAoIHIgJiAweDMgKSB8IDB4OCA6IHIgXTtcblxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB1dWlkLmpvaW4oICcnICk7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHQvLyBDbGFtcCB2YWx1ZSB0byByYW5nZSA8YSwgYj5cblxuXHRjbGFtcDogZnVuY3Rpb24gKCB4LCBhLCBiICkge1xuXG5cdFx0cmV0dXJuICggeCA8IGEgKSA/IGEgOiAoICggeCA+IGIgKSA/IGIgOiB4ICk7XG5cblx0fSxcblxuXHQvLyBDbGFtcCB2YWx1ZSB0byByYW5nZSA8YSwgaW5mKVxuXG5cdGNsYW1wQm90dG9tOiBmdW5jdGlvbiAoIHgsIGEgKSB7XG5cblx0XHRyZXR1cm4geCA8IGEgPyBhIDogeDtcblxuXHR9LFxuXG5cdC8vIExpbmVhciBtYXBwaW5nIGZyb20gcmFuZ2UgPGExLCBhMj4gdG8gcmFuZ2UgPGIxLCBiMj5cblxuXHRtYXBMaW5lYXI6IGZ1bmN0aW9uICggeCwgYTEsIGEyLCBiMSwgYjIgKSB7XG5cblx0XHRyZXR1cm4gYjEgKyAoIHggLSBhMSApICogKCBiMiAtIGIxICkgLyAoIGEyIC0gYTEgKTtcblxuXHR9LFxuXG5cdC8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvU21vb3Roc3RlcFxuXG5cdHNtb290aHN0ZXA6IGZ1bmN0aW9uICggeCwgbWluLCBtYXggKSB7XG5cblx0XHRpZiAoIHggPD0gbWluICkgcmV0dXJuIDA7XG5cdFx0aWYgKCB4ID49IG1heCApIHJldHVybiAxO1xuXG5cdFx0eCA9ICggeCAtIG1pbiApIC8gKCBtYXggLSBtaW4gKTtcblxuXHRcdHJldHVybiB4ICogeCAqICggMyAtIDIgKiB4ICk7XG5cblx0fSxcblxuXHRzbW9vdGhlcnN0ZXA6IGZ1bmN0aW9uICggeCwgbWluLCBtYXggKSB7XG5cblx0XHRpZiAoIHggPD0gbWluICkgcmV0dXJuIDA7XG5cdFx0aWYgKCB4ID49IG1heCApIHJldHVybiAxO1xuXG5cdFx0eCA9ICggeCAtIG1pbiApIC8gKCBtYXggLSBtaW4gKTtcblxuXHRcdHJldHVybiB4ICogeCAqIHggKiAoIHggKiAoIHggKiA2IC0gMTUgKSArIDEwICk7XG5cblx0fSxcblxuXHQvLyBSYW5kb20gZmxvYXQgZnJvbSA8MCwgMT4gd2l0aCAxNiBiaXRzIG9mIHJhbmRvbW5lc3Ncblx0Ly8gKHN0YW5kYXJkIE1hdGgucmFuZG9tKCkgY3JlYXRlcyByZXBldGl0aXZlIHBhdHRlcm5zIHdoZW4gYXBwbGllZCBvdmVyIGxhcmdlciBzcGFjZSlcblxuXHRyYW5kb20xNjogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuICggNjUyODAgKiBNYXRoLnJhbmRvbSgpICsgMjU1ICogTWF0aC5yYW5kb20oKSApIC8gNjU1MzU7XG5cblx0fSxcblxuXHQvLyBSYW5kb20gaW50ZWdlciBmcm9tIDxsb3csIGhpZ2g+IGludGVydmFsXG5cblx0cmFuZEludDogZnVuY3Rpb24gKCBsb3csIGhpZ2ggKSB7XG5cblx0XHRyZXR1cm4gTWF0aC5mbG9vciggdGhpcy5yYW5kRmxvYXQoIGxvdywgaGlnaCApICk7XG5cblx0fSxcblxuXHQvLyBSYW5kb20gZmxvYXQgZnJvbSA8bG93LCBoaWdoPiBpbnRlcnZhbFxuXG5cdHJhbmRGbG9hdDogZnVuY3Rpb24gKCBsb3csIGhpZ2ggKSB7XG5cblx0XHRyZXR1cm4gbG93ICsgTWF0aC5yYW5kb20oKSAqICggaGlnaCAtIGxvdyApO1xuXG5cdH0sXG5cblx0Ly8gUmFuZG9tIGZsb2F0IGZyb20gPC1yYW5nZS8yLCByYW5nZS8yPiBpbnRlcnZhbFxuXG5cdHJhbmRGbG9hdFNwcmVhZDogZnVuY3Rpb24gKCByYW5nZSApIHtcblxuXHRcdHJldHVybiByYW5nZSAqICggMC41IC0gTWF0aC5yYW5kb20oKSApO1xuXG5cdH0sXG5cblx0ZGVnVG9SYWQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBkZWdyZWVUb1JhZGlhbnNGYWN0b3IgPSBNYXRoLlBJIC8gMTgwO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggZGVncmVlcyApIHtcblxuXHRcdFx0cmV0dXJuIGRlZ3JlZXMgKiBkZWdyZWVUb1JhZGlhbnNGYWN0b3I7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRyYWRUb0RlZzogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHJhZGlhblRvRGVncmVlc0ZhY3RvciA9IDE4MCAvIE1hdGguUEk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCByYWRpYW5zICkge1xuXG5cdFx0XHRyZXR1cm4gcmFkaWFucyAqIHJhZGlhblRvRGVncmVlc0ZhY3RvcjtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGlzUG93ZXJPZlR3bzogZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdHJldHVybiAoIHZhbHVlICYgKCB2YWx1ZSAtIDEgKSApID09PSAwICYmIHZhbHVlICE9PSAwO1xuXG5cdH0sXG5cblx0bmV4dFBvd2VyT2ZUd286IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHR2YWx1ZSAtLTtcblx0XHR2YWx1ZSB8PSB2YWx1ZSA+PiAxO1xuXHRcdHZhbHVlIHw9IHZhbHVlID4+IDI7XG5cdFx0dmFsdWUgfD0gdmFsdWUgPj4gNDtcblx0XHR2YWx1ZSB8PSB2YWx1ZSA+PiA4O1xuXHRcdHZhbHVlIHw9IHZhbHVlID4+IDE2O1xuXHRcdHZhbHVlICsrO1xuXG5cdFx0cmV0dXJuIHZhbHVlO1xuXG5cdH1cblxufTtcblxuLy8gRmlsZTpzcmMvbWF0aC9TcGxpbmUuanNcblxuLyoqXG4gKiBTcGxpbmUgZnJvbSBUd2Vlbi5qcywgc2xpZ2h0bHkgb3B0aW1pemVkIChhbmQgdHJhc2hlZClcbiAqIGh0dHA6Ly9zb2xlLmdpdGh1Yi5jb20vdHdlZW4uanMvZXhhbXBsZXMvMDVfc3BsaW5lLmh0bWxcbiAqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICogQGF1dGhvciBhbHRlcmVkcSAvIGh0dHA6Ly9hbHRlcmVkcXVhbGlhLmNvbS9cbiAqL1xuXG5USFJFRS5TcGxpbmUgPSBmdW5jdGlvbiAoIHBvaW50cyApIHtcblxuXHR0aGlzLnBvaW50cyA9IHBvaW50cztcblxuXHR2YXIgYyA9IFtdLCB2MyA9IHsgeDogMCwgeTogMCwgejogMCB9LFxuXHRwb2ludCwgaW50UG9pbnQsIHdlaWdodCwgdzIsIHczLFxuXHRwYSwgcGIsIHBjLCBwZDtcblxuXHR0aGlzLmluaXRGcm9tQXJyYXkgPSBmdW5jdGlvbiAoIGEgKSB7XG5cblx0XHR0aGlzLnBvaW50cyA9IFtdO1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdHRoaXMucG9pbnRzWyBpIF0gPSB7IHg6IGFbIGkgXVsgMCBdLCB5OiBhWyBpIF1bIDEgXSwgejogYVsgaSBdWyAyIF0gfTtcblxuXHRcdH1cblxuXHR9O1xuXG5cdHRoaXMuZ2V0UG9pbnQgPSBmdW5jdGlvbiAoIGsgKSB7XG5cblx0XHRwb2ludCA9ICggdGhpcy5wb2ludHMubGVuZ3RoIC0gMSApICogaztcblx0XHRpbnRQb2ludCA9IE1hdGguZmxvb3IoIHBvaW50ICk7XG5cdFx0d2VpZ2h0ID0gcG9pbnQgLSBpbnRQb2ludDtcblxuXHRcdGNbIDAgXSA9IGludFBvaW50ID09PSAwID8gaW50UG9pbnQgOiBpbnRQb2ludCAtIDE7XG5cdFx0Y1sgMSBdID0gaW50UG9pbnQ7XG5cdFx0Y1sgMiBdID0gaW50UG9pbnQgID4gdGhpcy5wb2ludHMubGVuZ3RoIC0gMiA/IHRoaXMucG9pbnRzLmxlbmd0aCAtIDEgOiBpbnRQb2ludCArIDE7XG5cdFx0Y1sgMyBdID0gaW50UG9pbnQgID4gdGhpcy5wb2ludHMubGVuZ3RoIC0gMyA/IHRoaXMucG9pbnRzLmxlbmd0aCAtIDEgOiBpbnRQb2ludCArIDI7XG5cblx0XHRwYSA9IHRoaXMucG9pbnRzWyBjWyAwIF0gXTtcblx0XHRwYiA9IHRoaXMucG9pbnRzWyBjWyAxIF0gXTtcblx0XHRwYyA9IHRoaXMucG9pbnRzWyBjWyAyIF0gXTtcblx0XHRwZCA9IHRoaXMucG9pbnRzWyBjWyAzIF0gXTtcblxuXHRcdHcyID0gd2VpZ2h0ICogd2VpZ2h0O1xuXHRcdHczID0gd2VpZ2h0ICogdzI7XG5cblx0XHR2My54ID0gaW50ZXJwb2xhdGUoIHBhLngsIHBiLngsIHBjLngsIHBkLngsIHdlaWdodCwgdzIsIHczICk7XG5cdFx0djMueSA9IGludGVycG9sYXRlKCBwYS55LCBwYi55LCBwYy55LCBwZC55LCB3ZWlnaHQsIHcyLCB3MyApO1xuXHRcdHYzLnogPSBpbnRlcnBvbGF0ZSggcGEueiwgcGIueiwgcGMueiwgcGQueiwgd2VpZ2h0LCB3MiwgdzMgKTtcblxuXHRcdHJldHVybiB2MztcblxuXHR9O1xuXG5cdHRoaXMuZ2V0Q29udHJvbFBvaW50c0FycmF5ID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIGksIHAsIGwgPSB0aGlzLnBvaW50cy5sZW5ndGgsXG5cdFx0XHRjb29yZHMgPSBbXTtcblxuXHRcdGZvciAoIGkgPSAwOyBpIDwgbDsgaSArKyApIHtcblxuXHRcdFx0cCA9IHRoaXMucG9pbnRzWyBpIF07XG5cdFx0XHRjb29yZHNbIGkgXSA9IFsgcC54LCBwLnksIHAueiBdO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvb3JkcztcblxuXHR9O1xuXG5cdC8vIGFwcHJveGltYXRlIGxlbmd0aCBieSBzdW1taW5nIGxpbmVhciBzZWdtZW50c1xuXG5cdHRoaXMuZ2V0TGVuZ3RoID0gZnVuY3Rpb24gKCBuU3ViRGl2aXNpb25zICkge1xuXG5cdFx0dmFyIGksIGluZGV4LCBuU2FtcGxlcywgcG9zaXRpb24sXG5cdFx0XHRwb2ludCA9IDAsIGludFBvaW50ID0gMCwgb2xkSW50UG9pbnQgPSAwLFxuXHRcdFx0b2xkUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpLFxuXHRcdFx0dG1wVmVjID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcblx0XHRcdGNodW5rTGVuZ3RocyA9IFtdLFxuXHRcdFx0dG90YWxMZW5ndGggPSAwO1xuXG5cdFx0Ly8gZmlyc3QgcG9pbnQgaGFzIDAgbGVuZ3RoXG5cblx0XHRjaHVua0xlbmd0aHNbIDAgXSA9IDA7XG5cblx0XHRpZiAoICEgblN1YkRpdmlzaW9ucyApIG5TdWJEaXZpc2lvbnMgPSAxMDA7XG5cblx0XHRuU2FtcGxlcyA9IHRoaXMucG9pbnRzLmxlbmd0aCAqIG5TdWJEaXZpc2lvbnM7XG5cblx0XHRvbGRQb3NpdGlvbi5jb3B5KCB0aGlzLnBvaW50c1sgMCBdICk7XG5cblx0XHRmb3IgKCBpID0gMTsgaSA8IG5TYW1wbGVzOyBpICsrICkge1xuXG5cdFx0XHRpbmRleCA9IGkgLyBuU2FtcGxlcztcblxuXHRcdFx0cG9zaXRpb24gPSB0aGlzLmdldFBvaW50KCBpbmRleCApO1xuXHRcdFx0dG1wVmVjLmNvcHkoIHBvc2l0aW9uICk7XG5cblx0XHRcdHRvdGFsTGVuZ3RoICs9IHRtcFZlYy5kaXN0YW5jZVRvKCBvbGRQb3NpdGlvbiApO1xuXG5cdFx0XHRvbGRQb3NpdGlvbi5jb3B5KCBwb3NpdGlvbiApO1xuXG5cdFx0XHRwb2ludCA9ICggdGhpcy5wb2ludHMubGVuZ3RoIC0gMSApICogaW5kZXg7XG5cdFx0XHRpbnRQb2ludCA9IE1hdGguZmxvb3IoIHBvaW50ICk7XG5cblx0XHRcdGlmICggaW50UG9pbnQgIT09IG9sZEludFBvaW50ICkge1xuXG5cdFx0XHRcdGNodW5rTGVuZ3Roc1sgaW50UG9pbnQgXSA9IHRvdGFsTGVuZ3RoO1xuXHRcdFx0XHRvbGRJbnRQb2ludCA9IGludFBvaW50O1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHQvLyBsYXN0IHBvaW50IGVuZHMgd2l0aCB0b3RhbCBsZW5ndGhcblxuXHRcdGNodW5rTGVuZ3Roc1sgY2h1bmtMZW5ndGhzLmxlbmd0aCBdID0gdG90YWxMZW5ndGg7XG5cblx0XHRyZXR1cm4geyBjaHVua3M6IGNodW5rTGVuZ3RocywgdG90YWw6IHRvdGFsTGVuZ3RoIH07XG5cblx0fTtcblxuXHR0aGlzLnJlcGFyYW1ldHJpemVCeUFyY0xlbmd0aCA9IGZ1bmN0aW9uICggc2FtcGxpbmdDb2VmICkge1xuXG5cdFx0dmFyIGksIGosXG5cdFx0XHRpbmRleCwgaW5kZXhDdXJyZW50LCBpbmRleE5leHQsXG5cdFx0XHRyZWFsRGlzdGFuY2UsXG5cdFx0XHRzYW1wbGluZywgcG9zaXRpb24sXG5cdFx0XHRuZXdwb2ludHMgPSBbXSxcblx0XHRcdHRtcFZlYyA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXG5cdFx0XHRzbCA9IHRoaXMuZ2V0TGVuZ3RoKCk7XG5cblx0XHRuZXdwb2ludHMucHVzaCggdG1wVmVjLmNvcHkoIHRoaXMucG9pbnRzWyAwIF0gKS5jbG9uZSgpICk7XG5cblx0XHRmb3IgKCBpID0gMTsgaSA8IHRoaXMucG9pbnRzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0Ly90bXBWZWMuY29weSggdGhpcy5wb2ludHNbIGkgLSAxIF0gKTtcblx0XHRcdC8vbGluZWFyRGlzdGFuY2UgPSB0bXBWZWMuZGlzdGFuY2VUbyggdGhpcy5wb2ludHNbIGkgXSApO1xuXG5cdFx0XHRyZWFsRGlzdGFuY2UgPSBzbC5jaHVua3NbIGkgXSAtIHNsLmNodW5rc1sgaSAtIDEgXTtcblxuXHRcdFx0c2FtcGxpbmcgPSBNYXRoLmNlaWwoIHNhbXBsaW5nQ29lZiAqIHJlYWxEaXN0YW5jZSAvIHNsLnRvdGFsICk7XG5cblx0XHRcdGluZGV4Q3VycmVudCA9ICggaSAtIDEgKSAvICggdGhpcy5wb2ludHMubGVuZ3RoIC0gMSApO1xuXHRcdFx0aW5kZXhOZXh0ID0gaSAvICggdGhpcy5wb2ludHMubGVuZ3RoIC0gMSApO1xuXG5cdFx0XHRmb3IgKCBqID0gMTsgaiA8IHNhbXBsaW5nIC0gMTsgaiArKyApIHtcblxuXHRcdFx0XHRpbmRleCA9IGluZGV4Q3VycmVudCArIGogKiAoIDEgLyBzYW1wbGluZyApICogKCBpbmRleE5leHQgLSBpbmRleEN1cnJlbnQgKTtcblxuXHRcdFx0XHRwb3NpdGlvbiA9IHRoaXMuZ2V0UG9pbnQoIGluZGV4ICk7XG5cdFx0XHRcdG5ld3BvaW50cy5wdXNoKCB0bXBWZWMuY29weSggcG9zaXRpb24gKS5jbG9uZSgpICk7XG5cblx0XHRcdH1cblxuXHRcdFx0bmV3cG9pbnRzLnB1c2goIHRtcFZlYy5jb3B5KCB0aGlzLnBvaW50c1sgaSBdICkuY2xvbmUoKSApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5wb2ludHMgPSBuZXdwb2ludHM7XG5cblx0fTtcblxuXHQvLyBDYXRtdWxsLVJvbVxuXG5cdGZ1bmN0aW9uIGludGVycG9sYXRlKCBwMCwgcDEsIHAyLCBwMywgdCwgdDIsIHQzICkge1xuXG5cdFx0dmFyIHYwID0gKCBwMiAtIHAwICkgKiAwLjUsXG5cdFx0XHR2MSA9ICggcDMgLSBwMSApICogMC41O1xuXG5cdFx0cmV0dXJuICggMiAqICggcDEgLSBwMiApICsgdjAgKyB2MSApICogdDMgKyAoIC0gMyAqICggcDEgLSBwMiApIC0gMiAqIHYwIC0gdjEgKSAqIHQyICsgdjAgKiB0ICsgcDE7XG5cblx0fVxuXG59O1xuXG4vLyBGaWxlOnNyYy9tYXRoL1RyaWFuZ2xlLmpzXG5cbi8qKlxuICogQGF1dGhvciBiaG91c3RvbiAvIGh0dHA6Ly9leG9jb3J0ZXguY29tXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICovXG5cblRIUkVFLlRyaWFuZ2xlID0gZnVuY3Rpb24gKCBhLCBiLCBjICkge1xuXG5cdHRoaXMuYSA9ICggYSAhPT0gdW5kZWZpbmVkICkgPyBhIDogbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0dGhpcy5iID0gKCBiICE9PSB1bmRlZmluZWQgKSA/IGIgOiBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHR0aGlzLmMgPSAoIGMgIT09IHVuZGVmaW5lZCApID8gYyA6IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbn07XG5cblRIUkVFLlRyaWFuZ2xlLm5vcm1hbCA9IGZ1bmN0aW9uICgpIHtcblxuXHR2YXIgdjAgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoIGEsIGIsIGMsIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRyZXN1bHQuc3ViVmVjdG9ycyggYywgYiApO1xuXHRcdHYwLnN1YlZlY3RvcnMoIGEsIGIgKTtcblx0XHRyZXN1bHQuY3Jvc3MoIHYwICk7XG5cblx0XHR2YXIgcmVzdWx0TGVuZ3RoU3EgPSByZXN1bHQubGVuZ3RoU3EoKTtcblx0XHRpZiAoIHJlc3VsdExlbmd0aFNxID4gMCApIHtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdC5tdWx0aXBseVNjYWxhciggMSAvIE1hdGguc3FydCggcmVzdWx0TGVuZ3RoU3EgKSApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5zZXQoIDAsIDAsIDAgKTtcblxuXHR9O1xuXG59KCk7XG5cbi8vIHN0YXRpYy9pbnN0YW5jZSBtZXRob2QgdG8gY2FsY3VsYXRlIGJhcnljb29yZGluYXRlc1xuLy8gYmFzZWQgb246IGh0dHA6Ly93d3cuYmxhY2twYXduLmNvbS90ZXh0cy9wb2ludGlucG9seS9kZWZhdWx0Lmh0bWxcblRIUkVFLlRyaWFuZ2xlLmJhcnljb29yZEZyb21Qb2ludCA9IGZ1bmN0aW9uICgpIHtcblxuXHR2YXIgdjAgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHR2YXIgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHR2YXIgdjIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoIHBvaW50LCBhLCBiLCBjLCBvcHRpb25hbFRhcmdldCApIHtcblxuXHRcdHYwLnN1YlZlY3RvcnMoIGMsIGEgKTtcblx0XHR2MS5zdWJWZWN0b3JzKCBiLCBhICk7XG5cdFx0djIuc3ViVmVjdG9ycyggcG9pbnQsIGEgKTtcblxuXHRcdHZhciBkb3QwMCA9IHYwLmRvdCggdjAgKTtcblx0XHR2YXIgZG90MDEgPSB2MC5kb3QoIHYxICk7XG5cdFx0dmFyIGRvdDAyID0gdjAuZG90KCB2MiApO1xuXHRcdHZhciBkb3QxMSA9IHYxLmRvdCggdjEgKTtcblx0XHR2YXIgZG90MTIgPSB2MS5kb3QoIHYyICk7XG5cblx0XHR2YXIgZGVub20gPSAoIGRvdDAwICogZG90MTEgLSBkb3QwMSAqIGRvdDAxICk7XG5cblx0XHR2YXIgcmVzdWx0ID0gb3B0aW9uYWxUYXJnZXQgfHwgbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdC8vIGNvbGluZWFyIG9yIHNpbmd1bGFyIHRyaWFuZ2xlXG5cdFx0aWYgKCBkZW5vbSA9PT0gMCApIHtcblx0XHRcdC8vIGFyYml0cmFyeSBsb2NhdGlvbiBvdXRzaWRlIG9mIHRyaWFuZ2xlP1xuXHRcdFx0Ly8gbm90IHN1cmUgaWYgdGhpcyBpcyB0aGUgYmVzdCBpZGVhLCBtYXliZSBzaG91bGQgYmUgcmV0dXJuaW5nIHVuZGVmaW5lZFxuXHRcdFx0cmV0dXJuIHJlc3VsdC5zZXQoIC0gMiwgLSAxLCAtIDEgKTtcblx0XHR9XG5cblx0XHR2YXIgaW52RGVub20gPSAxIC8gZGVub207XG5cdFx0dmFyIHUgPSAoIGRvdDExICogZG90MDIgLSBkb3QwMSAqIGRvdDEyICkgKiBpbnZEZW5vbTtcblx0XHR2YXIgdiA9ICggZG90MDAgKiBkb3QxMiAtIGRvdDAxICogZG90MDIgKSAqIGludkRlbm9tO1xuXG5cdFx0Ly8gYmFyeWNvb3JkaW5hdGVzIG11c3QgYWx3YXlzIHN1bSB0byAxXG5cdFx0cmV0dXJuIHJlc3VsdC5zZXQoIDEgLSB1IC0gdiwgdiwgdSApO1xuXG5cdH07XG5cbn0oKTtcblxuVEhSRUUuVHJpYW5nbGUuY29udGFpbnNQb2ludCA9IGZ1bmN0aW9uICgpIHtcblxuXHR2YXIgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoIHBvaW50LCBhLCBiLCBjICkge1xuXG5cdFx0dmFyIHJlc3VsdCA9IFRIUkVFLlRyaWFuZ2xlLmJhcnljb29yZEZyb21Qb2ludCggcG9pbnQsIGEsIGIsIGMsIHYxICk7XG5cblx0XHRyZXR1cm4gKCByZXN1bHQueCA+PSAwICkgJiYgKCByZXN1bHQueSA+PSAwICkgJiYgKCAoIHJlc3VsdC54ICsgcmVzdWx0LnkgKSA8PSAxICk7XG5cblx0fTtcblxufSgpO1xuXG5USFJFRS5UcmlhbmdsZS5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IFRIUkVFLlRyaWFuZ2xlLFxuXG5cdHNldDogZnVuY3Rpb24gKCBhLCBiLCBjICkge1xuXG5cdFx0dGhpcy5hLmNvcHkoIGEgKTtcblx0XHR0aGlzLmIuY29weSggYiApO1xuXHRcdHRoaXMuYy5jb3B5KCBjICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldEZyb21Qb2ludHNBbmRJbmRpY2VzOiBmdW5jdGlvbiAoIHBvaW50cywgaTAsIGkxLCBpMiApIHtcblxuXHRcdHRoaXMuYS5jb3B5KCBwb2ludHNbIGkwIF0gKTtcblx0XHR0aGlzLmIuY29weSggcG9pbnRzWyBpMSBdICk7XG5cdFx0dGhpcy5jLmNvcHkoIHBvaW50c1sgaTIgXSApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjb3B5OiBmdW5jdGlvbiAoIHRyaWFuZ2xlICkge1xuXG5cdFx0dGhpcy5hLmNvcHkoIHRyaWFuZ2xlLmEgKTtcblx0XHR0aGlzLmIuY29weSggdHJpYW5nbGUuYiApO1xuXHRcdHRoaXMuYy5jb3B5KCB0cmlhbmdsZS5jICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFyZWE6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0dmFyIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHYwLnN1YlZlY3RvcnMoIHRoaXMuYywgdGhpcy5iICk7XG5cdFx0XHR2MS5zdWJWZWN0b3JzKCB0aGlzLmEsIHRoaXMuYiApO1xuXG5cdFx0XHRyZXR1cm4gdjAuY3Jvc3MoIHYxICkubGVuZ3RoKCkgKiAwLjU7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRtaWRwb2ludDogZnVuY3Rpb24gKCBvcHRpb25hbFRhcmdldCApIHtcblxuXHRcdHZhciByZXN1bHQgPSBvcHRpb25hbFRhcmdldCB8fCBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHJldHVybiByZXN1bHQuYWRkVmVjdG9ycyggdGhpcy5hLCB0aGlzLmIgKS5hZGQoIHRoaXMuYyApLm11bHRpcGx5U2NhbGFyKCAxIC8gMyApO1xuXG5cdH0sXG5cblx0bm9ybWFsOiBmdW5jdGlvbiAoIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0cmV0dXJuIFRIUkVFLlRyaWFuZ2xlLm5vcm1hbCggdGhpcy5hLCB0aGlzLmIsIHRoaXMuYywgb3B0aW9uYWxUYXJnZXQgKTtcblxuXHR9LFxuXG5cdHBsYW5lOiBmdW5jdGlvbiAoIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5QbGFuZSgpO1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5zZXRGcm9tQ29wbGFuYXJQb2ludHMoIHRoaXMuYSwgdGhpcy5iLCB0aGlzLmMgKTtcblxuXHR9LFxuXG5cdGJhcnljb29yZEZyb21Qb2ludDogZnVuY3Rpb24gKCBwb2ludCwgb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHRyZXR1cm4gVEhSRUUuVHJpYW5nbGUuYmFyeWNvb3JkRnJvbVBvaW50KCBwb2ludCwgdGhpcy5hLCB0aGlzLmIsIHRoaXMuYywgb3B0aW9uYWxUYXJnZXQgKTtcblxuXHR9LFxuXG5cdGNvbnRhaW5zUG9pbnQ6IGZ1bmN0aW9uICggcG9pbnQgKSB7XG5cblx0XHRyZXR1cm4gVEhSRUUuVHJpYW5nbGUuY29udGFpbnNQb2ludCggcG9pbnQsIHRoaXMuYSwgdGhpcy5iLCB0aGlzLmMgKTtcblxuXHR9LFxuXG5cdGVxdWFsczogZnVuY3Rpb24gKCB0cmlhbmdsZSApIHtcblxuXHRcdHJldHVybiB0cmlhbmdsZS5hLmVxdWFscyggdGhpcy5hICkgJiYgdHJpYW5nbGUuYi5lcXVhbHMoIHRoaXMuYiApICYmIHRyaWFuZ2xlLmMuZXF1YWxzKCB0aGlzLmMgKTtcblxuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFRIUkVFLlRyaWFuZ2xlKCkuY29weSggdGhpcyApO1xuXG5cdH1cblxufTtcblxuIiwiIC8qIGdsb2JhbHMgZGVmaW5lICovXG4gKGZ1bmN0aW9uKGRlZmluZSl7J3VzZSBzdHJpY3QnO2RlZmluZShmdW5jdGlvbihyZXF1aXJlLGV4cG9ydHMsbW9kdWxlKXtcblxuZnVuY3Rpb24gZm92VG9ORENTY2FsZU9mZnNldCggZm92ICkge1xuXG4gICAgdmFyIHB4c2NhbGUgPSAyLjAgLyAoZm92LmxlZnRUYW4gKyBmb3YucmlnaHRUYW4pO1xuICAgIHZhciBweG9mZnNldCA9IChmb3YubGVmdFRhbiAtIGZvdi5yaWdodFRhbikgKiBweHNjYWxlICogMC41O1xuICAgIHZhciBweXNjYWxlID0gMi4wIC8gKGZvdi51cFRhbiArIGZvdi5kb3duVGFuKTtcbiAgICB2YXIgcHlvZmZzZXQgPSAoZm92LnVwVGFuIC0gZm92LmRvd25UYW4pICogcHlzY2FsZSAqIDAuNTtcbiAgICByZXR1cm4geyBzY2FsZTogWyBweHNjYWxlLCBweXNjYWxlIF0sIG9mZnNldDogWyBweG9mZnNldCwgcHlvZmZzZXQgXSB9O1xuXG4gIH1cblxuICBmdW5jdGlvbiBmb3ZQb3J0VG9Qcm9qZWN0aW9uKCBmb3YsIHJpZ2h0SGFuZGVkLCB6TmVhciwgekZhciApIHtcblxuICAgIHJpZ2h0SGFuZGVkID0gcmlnaHRIYW5kZWQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiByaWdodEhhbmRlZDtcbiAgICB6TmVhciA9IHpOZWFyID09PSB1bmRlZmluZWQgPyAwLjAxIDogek5lYXI7XG4gICAgekZhciA9IHpGYXIgPT09IHVuZGVmaW5lZCA/IDEwMDAwLjAgOiB6RmFyO1xuXG4gICAgdmFyIGhhbmRlZG5lc3NTY2FsZSA9IHJpZ2h0SGFuZGVkID8gLTEuMCA6IDEuMDtcblxuICAgIC8vIHN0YXJ0IHdpdGggYW4gaWRlbnRpdHkgbWF0cml4XG4gICAgdmFyIG1vYmogPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuICAgIHZhciBtID0gbW9iai5lbGVtZW50cztcblxuICAgIC8vIGFuZCB3aXRoIHNjYWxlL29mZnNldCBpbmZvIGZvciBub3JtYWxpemVkIGRldmljZSBjb29yZHNcbiAgICB2YXIgc2NhbGVBbmRPZmZzZXQgPSBmb3ZUb05EQ1NjYWxlT2Zmc2V0KGZvdik7XG5cbiAgICAvLyBYIHJlc3VsdCwgbWFwIGNsaXAgZWRnZXMgdG8gWy13LCt3XVxuICAgIG1bMCAqIDQgKyAwXSA9IHNjYWxlQW5kT2Zmc2V0LnNjYWxlWzBdO1xuICAgIG1bMCAqIDQgKyAxXSA9IDAuMDtcbiAgICBtWzAgKiA0ICsgMl0gPSBzY2FsZUFuZE9mZnNldC5vZmZzZXRbMF0gKiBoYW5kZWRuZXNzU2NhbGU7XG4gICAgbVswICogNCArIDNdID0gMC4wO1xuXG4gICAgLy8gWSByZXN1bHQsIG1hcCBjbGlwIGVkZ2VzIHRvIFstdywrd11cbiAgICAvLyBZIG9mZnNldCBpcyBuZWdhdGVkIGJlY2F1c2UgdGhpcyBwcm9qIG1hdHJpeCB0cmFuc2Zvcm1zIGZyb20gd29ybGQgY29vcmRzIHdpdGggWT11cCxcbiAgICAvLyBidXQgdGhlIE5EQyBzY2FsaW5nIGhhcyBZPWRvd24gKHRoYW5rcyBEM0Q/KVxuICAgIG1bMSAqIDQgKyAwXSA9IDAuMDtcbiAgICBtWzEgKiA0ICsgMV0gPSBzY2FsZUFuZE9mZnNldC5zY2FsZVsxXTtcbiAgICBtWzEgKiA0ICsgMl0gPSAtc2NhbGVBbmRPZmZzZXQub2Zmc2V0WzFdICogaGFuZGVkbmVzc1NjYWxlO1xuICAgIG1bMSAqIDQgKyAzXSA9IDAuMDtcblxuICAgIC8vIFogcmVzdWx0ICh1cCB0byB0aGUgYXBwKVxuICAgIG1bMiAqIDQgKyAwXSA9IDAuMDtcbiAgICBtWzIgKiA0ICsgMV0gPSAwLjA7XG4gICAgbVsyICogNCArIDJdID0gekZhciAvICh6TmVhciAtIHpGYXIpICogLWhhbmRlZG5lc3NTY2FsZTtcbiAgICBtWzIgKiA0ICsgM10gPSAoekZhciAqIHpOZWFyKSAvICh6TmVhciAtIHpGYXIpO1xuXG4gICAgLy8gVyByZXN1bHQgKD0gWiBpbilcbiAgICBtWzMgKiA0ICsgMF0gPSAwLjA7XG4gICAgbVszICogNCArIDFdID0gMC4wO1xuICAgIG1bMyAqIDQgKyAyXSA9IGhhbmRlZG5lc3NTY2FsZTtcbiAgICBtWzMgKiA0ICsgM10gPSAwLjA7XG5cbiAgICBtb2JqLnRyYW5zcG9zZSgpO1xuXG4gICAgcmV0dXJuIG1vYmo7XG4gIH1cblxuICBmdW5jdGlvbiBmb3ZUb1Byb2plY3Rpb24oIGZvdiwgcmlnaHRIYW5kZWQsIHpOZWFyLCB6RmFyICkge1xuXG4gICAgdmFyIERFRzJSQUQgPSBNYXRoLlBJIC8gMTgwLjA7XG5cbiAgICB2YXIgZm92UG9ydCA9IHtcbiAgICAgIHVwVGFuOiBNYXRoLnRhbiggZm92LnVwRGVncmVlcyAqIERFRzJSQUQgKSxcbiAgICAgIGRvd25UYW46IE1hdGgudGFuKCBmb3YuZG93bkRlZ3JlZXMgKiBERUcyUkFEICksXG4gICAgICBsZWZ0VGFuOiBNYXRoLnRhbiggZm92LmxlZnREZWdyZWVzICogREVHMlJBRCApLFxuICAgICAgcmlnaHRUYW46IE1hdGgudGFuKCBmb3YucmlnaHREZWdyZWVzICogREVHMlJBRCApXG4gICAgfTtcblxuICAgIHJldHVybiBmb3ZQb3J0VG9Qcm9qZWN0aW9uKCBmb3ZQb3J0LCByaWdodEhhbmRlZCwgek5lYXIsIHpGYXIgKTtcblxuICB9XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm92VG9Qcm9qZWN0aW9uOiBmb3ZUb1Byb2plY3Rpb25cbiAgfTtcblxuICB9KTt9KSh0eXBlb2YgZGVmaW5lPT0nZnVuY3Rpb24nJiZkZWZpbmUuYW1kP2RlZmluZVxuOihmdW5jdGlvbihuLHcpeyd1c2Ugc3RyaWN0JztyZXR1cm4gdHlwZW9mIG1vZHVsZT09J29iamVjdCc/ZnVuY3Rpb24oYyl7XG5jKHJlcXVpcmUsZXhwb3J0cyxtb2R1bGUpO306ZnVuY3Rpb24oYyl7dmFyIG09e2V4cG9ydHM6e319O2MoZnVuY3Rpb24obil7XG5yZXR1cm4gd1tuXTt9LG0uZXhwb3J0cyxtKTt3W25dPW0uZXhwb3J0czt9O30pKCdWUlBlcnNwZWN0aXZlJyx0aGlzKSk7XG4iLCIgLyogZ2xvYmFscyBkZWZpbmUgKi9cbiAoZnVuY3Rpb24oZGVmaW5lKXsndXNlIHN0cmljdCc7ZGVmaW5lKGZ1bmN0aW9uKHJlcXVpcmUsZXhwb3J0cyxtb2R1bGUpe1xuXG4gICAgdmFyIHZyRGV2aWNlcyA9IHt9O1xuICAgIHZhciB2aWV3cG9ydDtcbiAgICB2YXIgc2NlbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NlbmUnKTtcbiAgICB2YXIgd29ybGQ7XG4gICAgdmFyIGNhbWVyYTtcbiAgICB2YXIgZnVsbHNjcmVlbiA9IGZhbHNlO1xuICAgIHZhciBwcm9qZWN0aW9uVHJhbnNmb3JtO1xuICAgIHZhciBmb3Y7XG4gICAgdmFyIHggPSAwO1xuICAgIHZhciB5ID0gMDtcbiAgICB2YXIgeiA9IDA7XG4gICAgdmFyIHJvdFggPSAwO1xuICAgIHZhciByb3RZID0gMDtcbiAgICB2YXIgcm90WiA9IDA7XG4gICAgdmFyIHRyYW5zbGF0aW9uID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcbiAgICB2YXIgcm90YXRpb247XG4gICAgdmFyIHJvdGF0aW9uRXVsZXIgPSBUSFJFRS5FdWxlcigwLCAwLCAwLCBcIllYWlwiKTtcbiAgICB2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lSUQ7XG4gICAgdmFyIHJlcXVlc3RGdWxsU2NyZWVuO1xuXG5cbiAgICBzZXR1cFZSRGV2aWNlcyhmdW5jdGlvbigpIHtcbiAgICAgIC8vIENyZWF0ZXMgdmlld3BvcnQsIGNhbWVyYSBhbmQgd29ybGQgZWxlbWVudHNcbiAgICAgIHNldHVwU2NlbmUoKTtcbiAgICAgIC8vIEluaXRpYXRlcyB0aGUgY2FtZXJhIHBlcnNwZWN0aXZlIG1hdHJpeFxuICAgICAgc2V0dXBQZXJzcGVjdGl2ZSgpO1xuICAgICAgLy8gRm9yIG1vdXNlIGxvb2sgbW9kZSB3aGVuIHRoZXJlJ3Mgbm8gSE1EIGF2YWlhbGFibGVcbiAgICAgIHNldHVwSW5wdXRFdmVudEhhbmRsZXJzKCk7XG4gICAgICBzZXR1cEZ1bGxzY3JlZW5IYW5kbGVycygpO1xuICAgICAgLy8gRnVuY3Rpb24gdGhhdCB1cGRhdGVzIHRoZSBjYW1lcmEgb3JpZW50YXRpb24gZnJvbSBITUQgaW5mb3JtYXRpb25cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZUlEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGVDYW1lcmEpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gc2V0dXBWUkRldmljZXMoZG9uZSkge1xuICAgICAgaWYgKG5hdmlnYXRvci5nZXRWUkRldmljZXMgJiYgbmF2aWdhdG9yLmdldFZSRGV2aWNlcygpLnRoZW4pIHtcbiAgICAgICAgbmF2aWdhdG9yLmdldFZSRGV2aWNlcygpLnRoZW4oZ290VlJEZXZpY2VzKTtcbiAgICAgIH0gZWxzZSB7IGRvbmUoKTsgfVxuICAgICAgZnVuY3Rpb24gZ290VlJEZXZpY2VzKGRldmljZXMpIHtcbiAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRldmljZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChkZXZpY2VzW2ldIGluc3RhbmNlb2YgSE1EVlJEZXZpY2UpIHtcbiAgICAgICAgICAgICAgdnJEZXZpY2VzLmhlYWRzZXQgPSBkZXZpY2VzW2ldO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZXZpY2VzW2ldIGluc3RhbmNlb2YgUG9zaXRpb25TZW5zb3JWUkRldmljZSkge1xuICAgICAgICAgICAgICB2ckRldmljZXMucG9zaXRpb24gPSBkZXZpY2VzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZyRGV2aWNlcy5oZWFkc2V0ICYmIHZyRGV2aWNlcy5wb3NpdGlvbikgeyBicmVhazsgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkb25lKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW50ZXJWUigpIHtcbiAgICAgIHJlcXVlc3RGdWxsU2NyZWVuLmNhbGwoc2NlbmUsIHsgdnJEaXNwbGF5OiB2ckRldmljZXMuaGVhZHNldCB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cFBlcnNwZWN0aXZlKCkge1xuICAgICAgZm92ID0gdnJEZXZpY2VzLmhlYWRzZXQ/IHZyRGV2aWNlcy5oZWFkc2V0LmdldEV5ZVBhcmFtZXRlcnMoJ2xlZnQnKS5yZWNvbW1lbmRlZEZpZWxkT2ZWaWV3IDogeyB1cERlZ3JlZXM6IDQ1LCByaWdodERlZ3JlZXM6IDQ1LCBkb3duRGVncmVlczogNDUsIGxlZnREZWdyZWVzOiA0NSB9O1xuICAgICAgLy92YXIgcGVyc3BlY3RpdmUgPSBWUlBlcnNwZWN0aXZlLmZvdlRvUHJvamVjdGlvbiggZm92LCB0cnVlLCAxLCAxMDAwMCApO1xuICAgICAgdmFyIHBlcnNwZWN0aXZlID0gcGVyc3BlY3RpdmVNYXRyaXgoVEhSRUUuTWF0aC5kZWdUb1JhZChmb3YudXBEZWdyZWVzKSwgdmlld3BvcnQub2Zmc2V0V2lkdGggLyB2aWV3cG9ydC5vZmZzZXRIZWlnaHQsIDEsIDEwMDAwKTtcbiAgICAgIHBlcnNwZWN0aXZlID0gcGVyc3BlY3RpdmUuY2xvbmUoKS5zY2FsZShuZXcgVEhSRUUuVmVjdG9yMyh2aWV3cG9ydC5vZmZzZXRXaWR0aCwgdmlld3BvcnQub2Zmc2V0SGVpZ2h0LCAxKSk7XG4gICAgICBwcm9qZWN0aW9uVHJhbnNmb3JtID0gZ2V0Q1NTTWF0cml4KHBlcnNwZWN0aXZlKTtcbiAgICAgIHZpZXdwb3J0LnN0eWxlLnRyYW5zZm9ybSA9IHByb2plY3Rpb25UcmFuc2Zvcm07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dXBTY2VuZSgpIHtcbiAgICAgIHZhciBpO1xuICAgICAgdmFyIHZyRWxzID0gc2NlbmUuY2hpbGRyZW47XG4gICAgICB2YXIgdnJFbHNMZW5ndGggPSB2ckVscy5sZW5ndGg7XG4gICAgICB2aWV3cG9ydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdmlld3BvcnQuY2xhc3NMaXN0LmFkZCgndmlld3BvcnQnKTtcbiAgICAgIGNhbWVyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY2FtZXJhLmNsYXNzTGlzdC5hZGQoJ3ZyJyk7XG4gICAgICBjYW1lcmEuY2xhc3NMaXN0LmFkZCgnY2FtZXJhJyk7XG4gICAgICB3b3JsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgd29ybGQuY2xhc3NMaXN0LmFkZCgndnInKTtcbiAgICAgIHdvcmxkLmNsYXNzTGlzdC5hZGQoJ3dvcmxkJyk7XG5cbiAgICAgIC8vIFNldHVwIEhpZXJhcmNoeVxuICAgICAgLy8gc2NlbmVcbiAgICAgIC8vICAgdmlld3BvcnRcbiAgICAgIC8vICAgICAgY2FtZXJhXG4gICAgICAvLyAgICAgICAgd29ybGRcbiAgICAgIC8vICAgICAgICAgIHVzZXItZWxlbWVudHNcbiAgICAgIGZvcihpID0gMDsgaSA8IHZyRWxzTGVuZ3RoOyArK2kpIHtcbiAgICAgICAgd29ybGQuYXBwZW5kQ2hpbGQodnJFbHNbMF0pO1xuICAgICAgfVxuICAgICAgc2NlbmUuYXBwZW5kQ2hpbGQodmlld3BvcnQpO1xuICAgICAgdmlld3BvcnQuYXBwZW5kQ2hpbGQoY2FtZXJhKTtcbiAgICAgIGNhbWVyYS5hcHBlbmRDaGlsZCh3b3JsZCk7XG4gICAgICByZXF1ZXN0RnVsbFNjcmVlbiA9IHNjZW5lLm1velJlcXVlc3RGdWxsU2NyZWVuIHx8IHNjZW5lLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNhbWVyYSgpIHtcbiAgICAgIHZhciB0cmFuc2Zvcm07XG4gICAgICBpZiAoZnVsbHNjcmVlbikge1xuICAgICAgICB0cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoLTUwJSwgLTUwJSwgMHB4KSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFuc2Zvcm0gPSBwcm9qZWN0aW9uVHJhbnNmb3JtO1xuICAgICAgfVxuICAgICAgcG9sbEhlYWRPcmllbnRhdGlvbigpO1xuICAgICAgdmlld3BvcnQuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGVDYW1lcmEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvbGxIZWFkT3JpZW50YXRpb24oKSB7XG4gICAgICB2YXIgb3JpZW50YXRpb247XG4gICAgICB2YXIgcXVhdGVybmlvbjtcbiAgICAgIHZhciBwb3NpdGlvblxuICAgICAgdmFyIHN0YXRlO1xuICAgICAgaWYgKHZyRGV2aWNlcy5wb3NpdGlvbikge1xuICAgICAgICBzdGF0ZSA9IHZyRGV2aWNlcy5wb3NpdGlvbi5nZXRTdGF0ZSgpXG4gICAgICAgIG9yaWVudGF0aW9uID0gc3RhdGUub3JpZW50YXRpb247XG4gICAgICAgIHBvc2l0aW9uID0gc3RhdGUucG9zaXRpb247XG4gICAgICAgIGlmIChvcmllbnRhdGlvbikge1xuICAgICAgICAgIHF1YXRlcm5pb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbihvcmllbnRhdGlvbi54LCAtb3JpZW50YXRpb24ueSwgb3JpZW50YXRpb24ueiwgb3JpZW50YXRpb24udyk7XG4gICAgICAgICAgcm90YXRpb24gPSBuZXcgVEhSRUUuTWF0cml4NCgpLm1ha2VSb3RhdGlvbkZyb21RdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgIHRyYW5zbGF0aW9uID0gbmV3IFRIUkVFLk1hdHJpeDQoKS5tYWtlVHJhbnNsYXRpb24ocG9zaXRpb24ueCAsIHBvc2l0aW9uLnkgLCBwb3NpdGlvbi56KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdXBkYXRlRWxlbWVudChjYW1lcmEsIHtcbiAgICAgICAgcm90YXRpb246IHJvdGF0aW9uLFxuICAgICAgICB0cmFuc2xhdGlvbjogdHJhbnNsYXRpb25cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwRnVsbHNjcmVlbkhhbmRsZXJzKCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2VcIiwgb25mdWxsc2NyZWVuY2hhbmdlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3pmdWxsc2NyZWVuY2hhbmdlXCIsICAgIG9uZnVsbHNjcmVlbmNoYW5nZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZnVsbHNjcmVlbmNoYW5nZVwiLCAgICAgICBvbmZ1bGxzY3JlZW5jaGFuZ2UpO1xuXG4gICAgICBmdW5jdGlvbiBvbmZ1bGxzY3JlZW5jaGFuZ2UoKSB7XG4gICAgICAgIGlmICggIWRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50ICYmICFkb2N1bWVudC53ZWJraXRGdWxsU2NyZWVuRWxlbWVudCApIHtcbiAgICAgICAgICB2aWV3cG9ydC5jbGFzc0xpc3QucmVtb3ZlKCdmdWxsc2NyZWVuJyk7XG4gICAgICAgICAgZnVsbHNjcmVlbiA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmdWxsc2NyZWVuID0gdHJ1ZTtcbiAgICAgICAgdmlld3BvcnQuY2xhc3NMaXN0LmFkZCgnZnVsbHNjcmVlbicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBlcnNwZWN0aXZlTWF0cml4KGZvdiwgYXNwZWN0LCBuZWFyeiwgZmFyeikge1xuICAgICAgdmFyIG1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG4gICAgICB2YXIgcmFuZ2UgPSBNYXRoLnRhbihmb3YgKiAwLjUpICogbmVhcno7XG5cbiAgICAgIG1hdHJpeC5lbGVtZW50c1swXSA9ICgyICogbmVhcnopIC8gKChyYW5nZSAqIGFzcGVjdCkgLSAoLXJhbmdlICogYXNwZWN0KSk7XG4gICAgICBtYXRyaXguZWxlbWVudHNbMV0gPSAwO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzJdID0gMDtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1szXSA9IDA7XG4gICAgICBtYXRyaXguZWxlbWVudHNbNF0gPSAwO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzVdID0gKDIgKiBuZWFyeikgLyAoMiAqIHJhbmdlKTtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1s2XSA9IDA7XG4gICAgICBtYXRyaXguZWxlbWVudHNbN10gPSAwO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzhdID0gMDtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1s5XSA9IDA7XG4gICAgICBtYXRyaXguZWxlbWVudHNbMTBdID0gLShmYXJ6ICsgbmVhcnopIC8gKGZhcnogLSBuZWFyeik7XG4gICAgICBtYXRyaXguZWxlbWVudHNbMTFdID0gLTE7XG4gICAgICBtYXRyaXguZWxlbWVudHNbMTJdID0gMDtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1sxM10gPSAwO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzE0XSA9IC0oMiAqIGZhcnogKiBuZWFyeikgLyAoZmFyeiAtIG5lYXJ6KTtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1sxNV0gPSAwO1xuICAgICAgcmV0dXJuIG1hdHJpeC50cmFuc3Bvc2UoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0Q1NTTWF0cml4KG1hdHJpeCkge1xuICAgICAgdmFyIGVsZW1lbnRzID0gbWF0cml4LmVsZW1lbnRzO1xuXG4gICAgICByZXR1cm4gJ21hdHJpeDNkKCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgMCBdICkgKyAnLCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgMSBdICkgKyAnLCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgMiBdICkgKyAnLCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgMyBdICkgKyAnLCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgNCBdICkgKyAnLCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgNSBdICkgKyAnLCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgNiBdICkgKyAnLCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgNyBdICkgKyAnLCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgOCBdICkgKyAnLCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgOSBdICkgKyAnLCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgMTAgXSApICsgJywnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDExIF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyAxMiBdICkgKyAnLCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgMTMgXSApICsgJywnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDE0IF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyAxNSBdICkgK1xuICAgICAgJyknO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBlcHNpbG9uKCB2YWx1ZSApIHtcbiAgICAgIHJldHVybiBNYXRoLmFicyggdmFsdWUgKSA8IDAuMDAwMDAxID8gMCA6IHZhbHVlO1xuICAgIH07XG5cbiAgICB2YXIgcm90YXRpb25FbmFibGVkO1xuICAgIHZhciBsYXN0TW91c2VYO1xuICAgIHZhciBsYXN0TW91c2VZO1xuICAgIHZhciBQSV8yID0gTWF0aC5QSSAvIDI7XG4gICAgdmFyIGNhbWVyYVJvdGF0aW9uO1xuICAgIHZhciBjYW1lcmFUcmFuc2xhdGlvbjtcblxuICAgIGZ1bmN0aW9uIHNldHVwSW5wdXRFdmVudEhhbmRsZXJzKCkge1xuICAgICAgc2NlbmUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgcm90YXRpb25FbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgc2NlbmUuY2xhc3NMaXN0LmFkZCgnc2VsZWN0aW9uLWRpc2FibGVkJyk7XG4gICAgICAgIGxhc3RNb3VzZVggPSBldmVudC5jbGllbnRYO1xuICAgICAgICBsYXN0TW91c2VZID0gZXZlbnQuY2xpZW50WTtcbiAgICAgIH0sIHRydWUpO1xuXG4gICAgICBzY2VuZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgcm90YXRpb25FbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHNjZW5lLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGlvbi1kaXNhYmxlZCcpO1xuICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgIHNjZW5lLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmICghcm90YXRpb25FbmFibGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWx0YVggPSAoZXZlbnQuY2xpZW50WCAtIGxhc3RNb3VzZVgpICogMC4yO1xuICAgICAgICB2YXIgZGVsdGFZID0gKGV2ZW50LmNsaWVudFkgLSBsYXN0TW91c2VZKSAqIDAuMjtcbiAgICAgICAgcm90WCArPSBkZWx0YVg7XG4gICAgICAgIHJvdFkgLT0gZGVsdGFZO1xuICAgICAgICAvLyBDbGFtcCB0byBbLVBJIC8gMiwgUEkgLyAyXVxuICAgICAgICByb3RZID0gTWF0aC5tYXgoIC05MCwgTWF0aC5taW4oIDkwLCByb3RZICkgKTtcblxuICAgICAgICBsYXN0TW91c2VYID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgbGFzdE1vdXNlWSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICAgIHRyYW5zbGF0aW9uID0gbmV3IFRIUkVFLk1hdHJpeDQoKS5tYWtlVHJhbnNsYXRpb24oeCAsIHkgLCB6KTtcbiAgICAgICAgcm90YXRpb25FdWxlciA9IG5ldyBUSFJFRS5FdWxlcihcbiAgICAgICAgICBUSFJFRS5NYXRoLmRlZ1RvUmFkKHJvdFkpLFxuICAgICAgICAgIFRIUkVFLk1hdGguZGVnVG9SYWQocm90WCksXG4gICAgICAgICAgVEhSRUUuTWF0aC5kZWdUb1JhZChyb3RaKSxcbiAgICAgICAgICBcIlhZWlwiICk7XG4gICAgICAgIHJvdGF0aW9uID0gbmV3IFRIUkVFLk1hdHJpeDQoKS5tYWtlUm90YXRpb25Gcm9tRXVsZXIocm90YXRpb25FdWxlcik7XG5cbiAgICAgIH0sIHRydWUpO1xuXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgaWYgKCAoIGUua2V5Y29kZSB8fCBlLndoaWNoICkgPT0gMzIpIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgIH0sIGZhbHNlKTtcblxuICAgIH1cblxuICAgIHZhciB1cGRhdGVFbGVtZW50ID0gZnVuY3Rpb24ob2JqZWN0LCBkYXRhKSB7XG4gICAgICB2YXIgdHJhbnNsYXRpb24gPSBkYXRhLnRyYW5zbGF0aW9uLmNsb25lKCkgfHwgbmV3IFRIUkVFLk1hdHJpeDQoKTtcbiAgICAgIHZhciByb3RhdGlvbiA9IGRhdGEucm90YXRpb24gfHwgbmV3IFRIUkVFLk1hdHJpeDQoKTtcbiAgICAgIG9iamVjdC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZTNkKC01MCUsIC01MCUsIDBweCkgXCIgKyBnZXRDU1NNYXRyaXgodHJhbnNsYXRpb24ubXVsdGlwbHkocm90YXRpb24pKTtcbiAgICB9O1xuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgICB6ZXJvU2Vuc29yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJvdFggPSAwO1xuICAgICAgICByb3RZID0gMDtcbiAgICAgICAgcm90YXRpb24gPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuICAgICAgICB0cmFuc2xhdGlvbiA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG4gICAgICAgIGlmICh2ckRldmljZXMucG9zaXRpb24pIHsgdnJEZXZpY2VzLnBvc2l0aW9uLnJlc2V0U2Vuc29yKCk7IH1cbiAgICAgIH0sXG4gICAgICBlbnRlclZSOiBlbnRlclZSXG4gICAgfTtcblxufSk7fSkodHlwZW9mIGRlZmluZT09J2Z1bmN0aW9uJyYmZGVmaW5lLmFtZD9kZWZpbmVcbjooZnVuY3Rpb24obix3KXsndXNlIHN0cmljdCc7cmV0dXJuIHR5cGVvZiBtb2R1bGU9PSdvYmplY3QnP2Z1bmN0aW9uKGMpe1xuYyhyZXF1aXJlLGV4cG9ydHMsbW9kdWxlKTt9OmZ1bmN0aW9uKGMpe3ZhciBtPXtleHBvcnRzOnt9fTtjKGZ1bmN0aW9uKG4pe1xucmV0dXJuIHdbbl07fSxtLmV4cG9ydHMsbSk7d1tuXT1tLmV4cG9ydHM7fTt9KSgnVlJDU1MnLHRoaXMpKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==