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
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
      }, true);

      scene.addEventListener('mouseup', function(event) {
        rotationEnabled = false;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRocmVlLmpzIiwicGVyc3BlY3RpdmUuanMiLCJjc3N2ci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDemdPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY3NzdnIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGaWxlOnNyYy9UaHJlZS5qc1xuXG4vKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKi9cblxudmFyIFRIUkVFID0geyBSRVZJU0lPTjogJzcyZGV2JyB9O1xuXG4vLyBicm93c2VyaWZ5IHN1cHBvcnRcblxuaWYgKCB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyApIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IFRIUkVFO1xuXG59XG5cbi8vIHBvbHlmaWxsc1xuXG5pZiAoIE1hdGguc2lnbiA9PT0gdW5kZWZpbmVkICkge1xuXG5cdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hdGgvc2lnblxuXG5cdE1hdGguc2lnbiA9IGZ1bmN0aW9uICggeCApIHtcblxuXHRcdHJldHVybiAoIHggPCAwICkgPyAtIDEgOiAoIHggPiAwICkgPyAxIDogK3g7XG5cblx0fTtcblxufVxuXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTW91c2VFdmVudC5idXR0b25cblxuVEhSRUUuTU9VU0UgPSB7IExFRlQ6IDAsIE1JRERMRTogMSwgUklHSFQ6IDIgfTtcblxuLy8gR0wgU1RBVEUgQ09OU1RBTlRTXG5cblRIUkVFLkN1bGxGYWNlTm9uZSA9IDA7XG5USFJFRS5DdWxsRmFjZUJhY2sgPSAxO1xuVEhSRUUuQ3VsbEZhY2VGcm9udCA9IDI7XG5USFJFRS5DdWxsRmFjZUZyb250QmFjayA9IDM7XG5cblRIUkVFLkZyb250RmFjZURpcmVjdGlvbkNXID0gMDtcblRIUkVFLkZyb250RmFjZURpcmVjdGlvbkNDVyA9IDE7XG5cbi8vIFNIQURPV0lORyBUWVBFU1xuXG5USFJFRS5CYXNpY1NoYWRvd01hcCA9IDA7XG5USFJFRS5QQ0ZTaGFkb3dNYXAgPSAxO1xuVEhSRUUuUENGU29mdFNoYWRvd01hcCA9IDI7XG5cbi8vIE1BVEVSSUFMIENPTlNUQU5UU1xuXG4vLyBzaWRlXG5cblRIUkVFLkZyb250U2lkZSA9IDA7XG5USFJFRS5CYWNrU2lkZSA9IDE7XG5USFJFRS5Eb3VibGVTaWRlID0gMjtcblxuLy8gc2hhZGluZ1xuXG5USFJFRS5Ob1NoYWRpbmcgPSAwO1xuVEhSRUUuRmxhdFNoYWRpbmcgPSAxO1xuVEhSRUUuU21vb3RoU2hhZGluZyA9IDI7XG5cbi8vIGNvbG9yc1xuXG5USFJFRS5Ob0NvbG9ycyA9IDA7XG5USFJFRS5GYWNlQ29sb3JzID0gMTtcblRIUkVFLlZlcnRleENvbG9ycyA9IDI7XG5cbi8vIGJsZW5kaW5nIG1vZGVzXG5cblRIUkVFLk5vQmxlbmRpbmcgPSAwO1xuVEhSRUUuTm9ybWFsQmxlbmRpbmcgPSAxO1xuVEhSRUUuQWRkaXRpdmVCbGVuZGluZyA9IDI7XG5USFJFRS5TdWJ0cmFjdGl2ZUJsZW5kaW5nID0gMztcblRIUkVFLk11bHRpcGx5QmxlbmRpbmcgPSA0O1xuVEhSRUUuQ3VzdG9tQmxlbmRpbmcgPSA1O1xuXG4vLyBjdXN0b20gYmxlbmRpbmcgZXF1YXRpb25zXG4vLyAobnVtYmVycyBzdGFydCBmcm9tIDEwMCBub3QgdG8gY2xhc2ggd2l0aCBvdGhlclxuLy8gIG1hcHBpbmdzIHRvIE9wZW5HTCBjb25zdGFudHMgZGVmaW5lZCBpbiBUZXh0dXJlLmpzKVxuXG5USFJFRS5BZGRFcXVhdGlvbiA9IDEwMDtcblRIUkVFLlN1YnRyYWN0RXF1YXRpb24gPSAxMDE7XG5USFJFRS5SZXZlcnNlU3VidHJhY3RFcXVhdGlvbiA9IDEwMjtcblRIUkVFLk1pbkVxdWF0aW9uID0gMTAzO1xuVEhSRUUuTWF4RXF1YXRpb24gPSAxMDQ7XG5cbi8vIGN1c3RvbSBibGVuZGluZyBkZXN0aW5hdGlvbiBmYWN0b3JzXG5cblRIUkVFLlplcm9GYWN0b3IgPSAyMDA7XG5USFJFRS5PbmVGYWN0b3IgPSAyMDE7XG5USFJFRS5TcmNDb2xvckZhY3RvciA9IDIwMjtcblRIUkVFLk9uZU1pbnVzU3JjQ29sb3JGYWN0b3IgPSAyMDM7XG5USFJFRS5TcmNBbHBoYUZhY3RvciA9IDIwNDtcblRIUkVFLk9uZU1pbnVzU3JjQWxwaGFGYWN0b3IgPSAyMDU7XG5USFJFRS5Ec3RBbHBoYUZhY3RvciA9IDIwNjtcblRIUkVFLk9uZU1pbnVzRHN0QWxwaGFGYWN0b3IgPSAyMDc7XG5cbi8vIGN1c3RvbSBibGVuZGluZyBzb3VyY2UgZmFjdG9yc1xuXG4vL1RIUkVFLlplcm9GYWN0b3IgPSAyMDA7XG4vL1RIUkVFLk9uZUZhY3RvciA9IDIwMTtcbi8vVEhSRUUuU3JjQWxwaGFGYWN0b3IgPSAyMDQ7XG4vL1RIUkVFLk9uZU1pbnVzU3JjQWxwaGFGYWN0b3IgPSAyMDU7XG4vL1RIUkVFLkRzdEFscGhhRmFjdG9yID0gMjA2O1xuLy9USFJFRS5PbmVNaW51c0RzdEFscGhhRmFjdG9yID0gMjA3O1xuVEhSRUUuRHN0Q29sb3JGYWN0b3IgPSAyMDg7XG5USFJFRS5PbmVNaW51c0RzdENvbG9yRmFjdG9yID0gMjA5O1xuVEhSRUUuU3JjQWxwaGFTYXR1cmF0ZUZhY3RvciA9IDIxMDtcblxuLy8gZGVwdGggbW9kZXNcblxuVEhSRUUuTmV2ZXJEZXB0aCA9IDA7XG5USFJFRS5BbHdheXNEZXB0aCA9IDE7XG5USFJFRS5MZXNzRGVwdGggPSAyO1xuVEhSRUUuTGVzc0VxdWFsRGVwdGggPSAzO1xuVEhSRUUuRXF1YWxEZXB0aCA9IDQ7XG5USFJFRS5HcmVhdGVyRXF1YWxEZXB0aCA9IDU7XG5USFJFRS5HcmVhdGVyRGVwdGggPSA2O1xuVEhSRUUuTm90RXF1YWxEZXB0aCA9IDc7XG5cblxuLy8gVEVYVFVSRSBDT05TVEFOVFNcblxuVEhSRUUuTXVsdGlwbHlPcGVyYXRpb24gPSAwO1xuVEhSRUUuTWl4T3BlcmF0aW9uID0gMTtcblRIUkVFLkFkZE9wZXJhdGlvbiA9IDI7XG5cbi8vIE1hcHBpbmcgbW9kZXNcblxuVEhSRUUuVVZNYXBwaW5nID0gMzAwO1xuXG5USFJFRS5DdWJlUmVmbGVjdGlvbk1hcHBpbmcgPSAzMDE7XG5USFJFRS5DdWJlUmVmcmFjdGlvbk1hcHBpbmcgPSAzMDI7XG5cblRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZmxlY3Rpb25NYXBwaW5nID0gMzAzO1xuVEhSRUUuRXF1aXJlY3Rhbmd1bGFyUmVmcmFjdGlvbk1hcHBpbmcgPSAzMDQ7XG5cblRIUkVFLlNwaGVyaWNhbFJlZmxlY3Rpb25NYXBwaW5nID0gMzA1O1xuXG4vLyBXcmFwcGluZyBtb2Rlc1xuXG5USFJFRS5SZXBlYXRXcmFwcGluZyA9IDEwMDA7XG5USFJFRS5DbGFtcFRvRWRnZVdyYXBwaW5nID0gMTAwMTtcblRIUkVFLk1pcnJvcmVkUmVwZWF0V3JhcHBpbmcgPSAxMDAyO1xuXG4vLyBGaWx0ZXJzXG5cblRIUkVFLk5lYXJlc3RGaWx0ZXIgPSAxMDAzO1xuVEhSRUUuTmVhcmVzdE1pcE1hcE5lYXJlc3RGaWx0ZXIgPSAxMDA0O1xuVEhSRUUuTmVhcmVzdE1pcE1hcExpbmVhckZpbHRlciA9IDEwMDU7XG5USFJFRS5MaW5lYXJGaWx0ZXIgPSAxMDA2O1xuVEhSRUUuTGluZWFyTWlwTWFwTmVhcmVzdEZpbHRlciA9IDEwMDc7XG5USFJFRS5MaW5lYXJNaXBNYXBMaW5lYXJGaWx0ZXIgPSAxMDA4O1xuXG4vLyBEYXRhIHR5cGVzXG5cblRIUkVFLlVuc2lnbmVkQnl0ZVR5cGUgPSAxMDA5O1xuVEhSRUUuQnl0ZVR5cGUgPSAxMDEwO1xuVEhSRUUuU2hvcnRUeXBlID0gMTAxMTtcblRIUkVFLlVuc2lnbmVkU2hvcnRUeXBlID0gMTAxMjtcblRIUkVFLkludFR5cGUgPSAxMDEzO1xuVEhSRUUuVW5zaWduZWRJbnRUeXBlID0gMTAxNDtcblRIUkVFLkZsb2F0VHlwZSA9IDEwMTU7XG5USFJFRS5IYWxmRmxvYXRUeXBlID0gMTAyNTtcblxuLy8gUGl4ZWwgdHlwZXNcblxuLy9USFJFRS5VbnNpZ25lZEJ5dGVUeXBlID0gMTAwOTtcblRIUkVFLlVuc2lnbmVkU2hvcnQ0NDQ0VHlwZSA9IDEwMTY7XG5USFJFRS5VbnNpZ25lZFNob3J0NTU1MVR5cGUgPSAxMDE3O1xuVEhSRUUuVW5zaWduZWRTaG9ydDU2NVR5cGUgPSAxMDE4O1xuXG4vLyBQaXhlbCBmb3JtYXRzXG5cblRIUkVFLkFscGhhRm9ybWF0ID0gMTAxOTtcblRIUkVFLlJHQkZvcm1hdCA9IDEwMjA7XG5USFJFRS5SR0JBRm9ybWF0ID0gMTAyMTtcblRIUkVFLkx1bWluYW5jZUZvcm1hdCA9IDEwMjI7XG5USFJFRS5MdW1pbmFuY2VBbHBoYUZvcm1hdCA9IDEwMjM7XG4vLyBUSFJFRS5SR0JFRm9ybWF0IGhhbmRsZWQgYXMgVEhSRUUuUkdCQUZvcm1hdCBpbiBzaGFkZXJzXG5USFJFRS5SR0JFRm9ybWF0ID0gVEhSRUUuUkdCQUZvcm1hdDsgLy8xMDI0O1xuXG4vLyBERFMgLyBTVDNDIENvbXByZXNzZWQgdGV4dHVyZSBmb3JtYXRzXG5cblRIUkVFLlJHQl9TM1RDX0RYVDFfRm9ybWF0ID0gMjAwMTtcblRIUkVFLlJHQkFfUzNUQ19EWFQxX0Zvcm1hdCA9IDIwMDI7XG5USFJFRS5SR0JBX1MzVENfRFhUM19Gb3JtYXQgPSAyMDAzO1xuVEhSRUUuUkdCQV9TM1RDX0RYVDVfRm9ybWF0ID0gMjAwNDtcblxuXG4vLyBQVlJUQyBjb21wcmVzc2VkIHRleHR1cmUgZm9ybWF0c1xuXG5USFJFRS5SR0JfUFZSVENfNEJQUFYxX0Zvcm1hdCA9IDIxMDA7XG5USFJFRS5SR0JfUFZSVENfMkJQUFYxX0Zvcm1hdCA9IDIxMDE7XG5USFJFRS5SR0JBX1BWUlRDXzRCUFBWMV9Gb3JtYXQgPSAyMTAyO1xuVEhSRUUuUkdCQV9QVlJUQ18yQlBQVjFfRm9ybWF0ID0gMjEwMztcblxuXG4vLyBERVBSRUNBVEVEXG5cblRIUkVFLlByb2plY3RvciA9IGZ1bmN0aW9uICgpIHtcblxuXHRjb25zb2xlLmVycm9yKCAnVEhSRUUuUHJvamVjdG9yIGhhcyBiZWVuIG1vdmVkIHRvIC9leGFtcGxlcy9qcy9yZW5kZXJlcnMvUHJvamVjdG9yLmpzLicgKTtcblxuXHR0aGlzLnByb2plY3RWZWN0b3IgPSBmdW5jdGlvbiAoIHZlY3RvciwgY2FtZXJhICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuUHJvamVjdG9yOiAucHJvamVjdFZlY3RvcigpIGlzIG5vdyB2ZWN0b3IucHJvamVjdCgpLicgKTtcblx0XHR2ZWN0b3IucHJvamVjdCggY2FtZXJhICk7XG5cblx0fTtcblxuXHR0aGlzLnVucHJvamVjdFZlY3RvciA9IGZ1bmN0aW9uICggdmVjdG9yLCBjYW1lcmEgKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5Qcm9qZWN0b3I6IC51bnByb2plY3RWZWN0b3IoKSBpcyBub3cgdmVjdG9yLnVucHJvamVjdCgpLicgKTtcblx0XHR2ZWN0b3IudW5wcm9qZWN0KCBjYW1lcmEgKTtcblxuXHR9O1xuXG5cdHRoaXMucGlja2luZ1JheSA9IGZ1bmN0aW9uICggdmVjdG9yLCBjYW1lcmEgKSB7XG5cblx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuUHJvamVjdG9yOiAucGlja2luZ1JheSgpIGlzIG5vdyByYXljYXN0ZXIuc2V0RnJvbUNhbWVyYSgpLicgKTtcblxuXHR9O1xuXG59O1xuXG5USFJFRS5DYW52YXNSZW5kZXJlciA9IGZ1bmN0aW9uICgpIHtcblxuXHRjb25zb2xlLmVycm9yKCAnVEhSRUUuQ2FudmFzUmVuZGVyZXIgaGFzIGJlZW4gbW92ZWQgdG8gL2V4YW1wbGVzL2pzL3JlbmRlcmVycy9DYW52YXNSZW5kZXJlci5qcycgKTtcblxuXHR0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApO1xuXHR0aGlzLmNsZWFyID0gZnVuY3Rpb24gKCkge307XG5cdHRoaXMucmVuZGVyID0gZnVuY3Rpb24gKCkge307XG5cdHRoaXMuc2V0Q2xlYXJDb2xvciA9IGZ1bmN0aW9uICgpIHt9O1xuXHR0aGlzLnNldFNpemUgPSBmdW5jdGlvbiAoKSB7fTtcblxufTtcblxuLy8gRmlsZTpzcmMvbWF0aC9Db2xvci5qc1xuXG4vKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKi9cblxuVEhSRUUuQ29sb3IgPSBmdW5jdGlvbiAoIGNvbG9yICkge1xuXG5cdGlmICggYXJndW1lbnRzLmxlbmd0aCA9PT0gMyApIHtcblxuXHRcdHJldHVybiB0aGlzLnNldFJHQiggYXJndW1lbnRzWyAwIF0sIGFyZ3VtZW50c1sgMSBdLCBhcmd1bWVudHNbIDIgXSApO1xuXG5cdH1cblxuXHRyZXR1cm4gdGhpcy5zZXQoIGNvbG9yIClcblxufTtcblxuVEhSRUUuQ29sb3IucHJvdG90eXBlID0ge1xuXG5cdGNvbnN0cnVjdG9yOiBUSFJFRS5Db2xvcixcblxuXHRyOiAxLCBnOiAxLCBiOiAxLFxuXG5cdHNldDogZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdGlmICggdmFsdWUgaW5zdGFuY2VvZiBUSFJFRS5Db2xvciApIHtcblxuXHRcdFx0dGhpcy5jb3B5KCB2YWx1ZSApO1xuXG5cdFx0fSBlbHNlIGlmICggdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyApIHtcblxuXHRcdFx0dGhpcy5zZXRIZXgoIHZhbHVlICk7XG5cblx0XHR9IGVsc2UgaWYgKCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICkge1xuXG5cdFx0XHR0aGlzLnNldFN0eWxlKCB2YWx1ZSApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRIZXg6IGZ1bmN0aW9uICggaGV4ICkge1xuXG5cdFx0aGV4ID0gTWF0aC5mbG9vciggaGV4ICk7XG5cblx0XHR0aGlzLnIgPSAoIGhleCA+PiAxNiAmIDI1NSApIC8gMjU1O1xuXHRcdHRoaXMuZyA9ICggaGV4ID4+IDggJiAyNTUgKSAvIDI1NTtcblx0XHR0aGlzLmIgPSAoIGhleCAmIDI1NSApIC8gMjU1O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRSR0I6IGZ1bmN0aW9uICggciwgZywgYiApIHtcblxuXHRcdHRoaXMuciA9IHI7XG5cdFx0dGhpcy5nID0gZztcblx0XHR0aGlzLmIgPSBiO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRIU0w6IGZ1bmN0aW9uICggaCwgcywgbCApIHtcblxuXHRcdC8vIGgscyxsIHJhbmdlcyBhcmUgaW4gMC4wIC0gMS4wXG5cblx0XHRpZiAoIHMgPT09IDAgKSB7XG5cblx0XHRcdHRoaXMuciA9IHRoaXMuZyA9IHRoaXMuYiA9IGw7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR2YXIgaHVlMnJnYiA9IGZ1bmN0aW9uICggcCwgcSwgdCApIHtcblxuXHRcdFx0XHRpZiAoIHQgPCAwICkgdCArPSAxO1xuXHRcdFx0XHRpZiAoIHQgPiAxICkgdCAtPSAxO1xuXHRcdFx0XHRpZiAoIHQgPCAxIC8gNiApIHJldHVybiBwICsgKCBxIC0gcCApICogNiAqIHQ7XG5cdFx0XHRcdGlmICggdCA8IDEgLyAyICkgcmV0dXJuIHE7XG5cdFx0XHRcdGlmICggdCA8IDIgLyAzICkgcmV0dXJuIHAgKyAoIHEgLSBwICkgKiA2ICogKCAyIC8gMyAtIHQgKTtcblx0XHRcdFx0cmV0dXJuIHA7XG5cblx0XHRcdH07XG5cblx0XHRcdHZhciBwID0gbCA8PSAwLjUgPyBsICogKCAxICsgcyApIDogbCArIHMgLSAoIGwgKiBzICk7XG5cdFx0XHR2YXIgcSA9ICggMiAqIGwgKSAtIHA7XG5cblx0XHRcdHRoaXMuciA9IGh1ZTJyZ2IoIHEsIHAsIGggKyAxIC8gMyApO1xuXHRcdFx0dGhpcy5nID0gaHVlMnJnYiggcSwgcCwgaCApO1xuXHRcdFx0dGhpcy5iID0gaHVlMnJnYiggcSwgcCwgaCAtIDEgLyAzICk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldFN0eWxlOiBmdW5jdGlvbiAoIHN0eWxlICkge1xuXG5cdFx0Ly8gcmdiKDI1NSwwLDApXG5cblx0XHRpZiAoIC9ecmdiXFwoKFxcZCspLCA/KFxcZCspLCA/KFxcZCspXFwpJC9pLnRlc3QoIHN0eWxlICkgKSB7XG5cblx0XHRcdHZhciBjb2xvciA9IC9ecmdiXFwoKFxcZCspLCA/KFxcZCspLCA/KFxcZCspXFwpJC9pLmV4ZWMoIHN0eWxlICk7XG5cblx0XHRcdHRoaXMuciA9IE1hdGgubWluKCAyNTUsIHBhcnNlSW50KCBjb2xvclsgMSBdLCAxMCApICkgLyAyNTU7XG5cdFx0XHR0aGlzLmcgPSBNYXRoLm1pbiggMjU1LCBwYXJzZUludCggY29sb3JbIDIgXSwgMTAgKSApIC8gMjU1O1xuXHRcdFx0dGhpcy5iID0gTWF0aC5taW4oIDI1NSwgcGFyc2VJbnQoIGNvbG9yWyAzIF0sIDEwICkgKSAvIDI1NTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9XG5cblx0XHQvLyByZ2IoMTAwJSwwJSwwJSlcblxuXHRcdGlmICggL15yZ2JcXCgoXFxkKylcXCUsID8oXFxkKylcXCUsID8oXFxkKylcXCVcXCkkL2kudGVzdCggc3R5bGUgKSApIHtcblxuXHRcdFx0dmFyIGNvbG9yID0gL15yZ2JcXCgoXFxkKylcXCUsID8oXFxkKylcXCUsID8oXFxkKylcXCVcXCkkL2kuZXhlYyggc3R5bGUgKTtcblxuXHRcdFx0dGhpcy5yID0gTWF0aC5taW4oIDEwMCwgcGFyc2VJbnQoIGNvbG9yWyAxIF0sIDEwICkgKSAvIDEwMDtcblx0XHRcdHRoaXMuZyA9IE1hdGgubWluKCAxMDAsIHBhcnNlSW50KCBjb2xvclsgMiBdLCAxMCApICkgLyAxMDA7XG5cdFx0XHR0aGlzLmIgPSBNYXRoLm1pbiggMTAwLCBwYXJzZUludCggY29sb3JbIDMgXSwgMTAgKSApIC8gMTAwO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH1cblxuXHRcdC8vICNmZjAwMDBcblxuXHRcdGlmICggL15cXCMoWzAtOWEtZl17Nn0pJC9pLnRlc3QoIHN0eWxlICkgKSB7XG5cblx0XHRcdHZhciBjb2xvciA9IC9eXFwjKFswLTlhLWZdezZ9KSQvaS5leGVjKCBzdHlsZSApO1xuXG5cdFx0XHR0aGlzLnNldEhleCggcGFyc2VJbnQoIGNvbG9yWyAxIF0sIDE2ICkgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9XG5cblx0XHQvLyAjZjAwXG5cblx0XHRpZiAoIC9eXFwjKFswLTlhLWZdKShbMC05YS1mXSkoWzAtOWEtZl0pJC9pLnRlc3QoIHN0eWxlICkgKSB7XG5cblx0XHRcdHZhciBjb2xvciA9IC9eXFwjKFswLTlhLWZdKShbMC05YS1mXSkoWzAtOWEtZl0pJC9pLmV4ZWMoIHN0eWxlICk7XG5cblx0XHRcdHRoaXMuc2V0SGV4KCBwYXJzZUludCggY29sb3JbIDEgXSArIGNvbG9yWyAxIF0gKyBjb2xvclsgMiBdICsgY29sb3JbIDIgXSArIGNvbG9yWyAzIF0gKyBjb2xvclsgMyBdLCAxNiApICk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fVxuXG5cdFx0Ly8gcmVkXG5cblx0XHRpZiAoIC9eKFxcdyspJC9pLnRlc3QoIHN0eWxlICkgKSB7XG5cblx0XHRcdHRoaXMuc2V0SGV4KCBUSFJFRS5Db2xvcktleXdvcmRzWyBzdHlsZSBdICk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fVxuXG5cblx0fSxcblxuXHRjb3B5OiBmdW5jdGlvbiAoIGNvbG9yICkge1xuXG5cdFx0dGhpcy5yID0gY29sb3Iucjtcblx0XHR0aGlzLmcgPSBjb2xvci5nO1xuXHRcdHRoaXMuYiA9IGNvbG9yLmI7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNvcHlHYW1tYVRvTGluZWFyOiBmdW5jdGlvbiAoIGNvbG9yLCBnYW1tYUZhY3RvciApIHtcblxuXHRcdGlmICggZ2FtbWFGYWN0b3IgPT09IHVuZGVmaW5lZCApIGdhbW1hRmFjdG9yID0gMi4wO1xuXG5cdFx0dGhpcy5yID0gTWF0aC5wb3coIGNvbG9yLnIsIGdhbW1hRmFjdG9yICk7XG5cdFx0dGhpcy5nID0gTWF0aC5wb3coIGNvbG9yLmcsIGdhbW1hRmFjdG9yICk7XG5cdFx0dGhpcy5iID0gTWF0aC5wb3coIGNvbG9yLmIsIGdhbW1hRmFjdG9yICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNvcHlMaW5lYXJUb0dhbW1hOiBmdW5jdGlvbiAoIGNvbG9yLCBnYW1tYUZhY3RvciApIHtcblxuXHRcdGlmICggZ2FtbWFGYWN0b3IgPT09IHVuZGVmaW5lZCApIGdhbW1hRmFjdG9yID0gMi4wO1xuXG5cdFx0dmFyIHNhZmVJbnZlcnNlID0gKCBnYW1tYUZhY3RvciA+IDAgKSA/ICggMS4wIC8gZ2FtbWFGYWN0b3IgKSA6IDEuMDtcblxuXHRcdHRoaXMuciA9IE1hdGgucG93KCBjb2xvci5yLCBzYWZlSW52ZXJzZSApO1xuXHRcdHRoaXMuZyA9IE1hdGgucG93KCBjb2xvci5nLCBzYWZlSW52ZXJzZSApO1xuXHRcdHRoaXMuYiA9IE1hdGgucG93KCBjb2xvci5iLCBzYWZlSW52ZXJzZSApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjb252ZXJ0R2FtbWFUb0xpbmVhcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHIgPSB0aGlzLnIsIGcgPSB0aGlzLmcsIGIgPSB0aGlzLmI7XG5cblx0XHR0aGlzLnIgPSByICogcjtcblx0XHR0aGlzLmcgPSBnICogZztcblx0XHR0aGlzLmIgPSBiICogYjtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y29udmVydExpbmVhclRvR2FtbWE6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuciA9IE1hdGguc3FydCggdGhpcy5yICk7XG5cdFx0dGhpcy5nID0gTWF0aC5zcXJ0KCB0aGlzLmcgKTtcblx0XHR0aGlzLmIgPSBNYXRoLnNxcnQoIHRoaXMuYiApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRnZXRIZXg6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiAoIHRoaXMuciAqIDI1NSApIDw8IDE2IF4gKCB0aGlzLmcgKiAyNTUgKSA8PCA4IF4gKCB0aGlzLmIgKiAyNTUgKSA8PCAwO1xuXG5cdH0sXG5cblx0Z2V0SGV4U3RyaW5nOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gKCAnMDAwMDAwJyArIHRoaXMuZ2V0SGV4KCkudG9TdHJpbmcoIDE2ICkgKS5zbGljZSggLSA2ICk7XG5cblx0fSxcblxuXHRnZXRIU0w6IGZ1bmN0aW9uICggb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHQvLyBoLHMsbCByYW5nZXMgYXJlIGluIDAuMCAtIDEuMFxuXG5cdFx0dmFyIGhzbCA9IG9wdGlvbmFsVGFyZ2V0IHx8IHsgaDogMCwgczogMCwgbDogMCB9O1xuXG5cdFx0dmFyIHIgPSB0aGlzLnIsIGcgPSB0aGlzLmcsIGIgPSB0aGlzLmI7XG5cblx0XHR2YXIgbWF4ID0gTWF0aC5tYXgoIHIsIGcsIGIgKTtcblx0XHR2YXIgbWluID0gTWF0aC5taW4oIHIsIGcsIGIgKTtcblxuXHRcdHZhciBodWUsIHNhdHVyYXRpb247XG5cdFx0dmFyIGxpZ2h0bmVzcyA9ICggbWluICsgbWF4ICkgLyAyLjA7XG5cblx0XHRpZiAoIG1pbiA9PT0gbWF4ICkge1xuXG5cdFx0XHRodWUgPSAwO1xuXHRcdFx0c2F0dXJhdGlvbiA9IDA7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR2YXIgZGVsdGEgPSBtYXggLSBtaW47XG5cblx0XHRcdHNhdHVyYXRpb24gPSBsaWdodG5lc3MgPD0gMC41ID8gZGVsdGEgLyAoIG1heCArIG1pbiApIDogZGVsdGEgLyAoIDIgLSBtYXggLSBtaW4gKTtcblxuXHRcdFx0c3dpdGNoICggbWF4ICkge1xuXG5cdFx0XHRcdGNhc2UgcjogaHVlID0gKCBnIC0gYiApIC8gZGVsdGEgKyAoIGcgPCBiID8gNiA6IDAgKTsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgZzogaHVlID0gKCBiIC0gciApIC8gZGVsdGEgKyAyOyBicmVhaztcblx0XHRcdFx0Y2FzZSBiOiBodWUgPSAoIHIgLSBnICkgLyBkZWx0YSArIDQ7IGJyZWFrO1xuXG5cdFx0XHR9XG5cblx0XHRcdGh1ZSAvPSA2O1xuXG5cdFx0fVxuXG5cdFx0aHNsLmggPSBodWU7XG5cdFx0aHNsLnMgPSBzYXR1cmF0aW9uO1xuXHRcdGhzbC5sID0gbGlnaHRuZXNzO1xuXG5cdFx0cmV0dXJuIGhzbDtcblxuXHR9LFxuXG5cdGdldFN0eWxlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gJ3JnYignICsgKCAoIHRoaXMuciAqIDI1NSApIHwgMCApICsgJywnICsgKCAoIHRoaXMuZyAqIDI1NSApIHwgMCApICsgJywnICsgKCAoIHRoaXMuYiAqIDI1NSApIHwgMCApICsgJyknO1xuXG5cdH0sXG5cblx0b2Zmc2V0SFNMOiBmdW5jdGlvbiAoIGgsIHMsIGwgKSB7XG5cblx0XHR2YXIgaHNsID0gdGhpcy5nZXRIU0woKTtcblxuXHRcdGhzbC5oICs9IGg7IGhzbC5zICs9IHM7IGhzbC5sICs9IGw7XG5cblx0XHR0aGlzLnNldEhTTCggaHNsLmgsIGhzbC5zLCBoc2wubCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhZGQ6IGZ1bmN0aW9uICggY29sb3IgKSB7XG5cblx0XHR0aGlzLnIgKz0gY29sb3Iucjtcblx0XHR0aGlzLmcgKz0gY29sb3IuZztcblx0XHR0aGlzLmIgKz0gY29sb3IuYjtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YWRkQ29sb3JzOiBmdW5jdGlvbiAoIGNvbG9yMSwgY29sb3IyICkge1xuXG5cdFx0dGhpcy5yID0gY29sb3IxLnIgKyBjb2xvcjIucjtcblx0XHR0aGlzLmcgPSBjb2xvcjEuZyArIGNvbG9yMi5nO1xuXHRcdHRoaXMuYiA9IGNvbG9yMS5iICsgY29sb3IyLmI7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFkZFNjYWxhcjogZnVuY3Rpb24gKCBzICkge1xuXG5cdFx0dGhpcy5yICs9IHM7XG5cdFx0dGhpcy5nICs9IHM7XG5cdFx0dGhpcy5iICs9IHM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5OiBmdW5jdGlvbiAoIGNvbG9yICkge1xuXG5cdFx0dGhpcy5yICo9IGNvbG9yLnI7XG5cdFx0dGhpcy5nICo9IGNvbG9yLmc7XG5cdFx0dGhpcy5iICo9IGNvbG9yLmI7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5U2NhbGFyOiBmdW5jdGlvbiAoIHMgKSB7XG5cblx0XHR0aGlzLnIgKj0gcztcblx0XHR0aGlzLmcgKj0gcztcblx0XHR0aGlzLmIgKj0gcztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bGVycDogZnVuY3Rpb24gKCBjb2xvciwgYWxwaGEgKSB7XG5cblx0XHR0aGlzLnIgKz0gKCBjb2xvci5yIC0gdGhpcy5yICkgKiBhbHBoYTtcblx0XHR0aGlzLmcgKz0gKCBjb2xvci5nIC0gdGhpcy5nICkgKiBhbHBoYTtcblx0XHR0aGlzLmIgKz0gKCBjb2xvci5iIC0gdGhpcy5iICkgKiBhbHBoYTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZXF1YWxzOiBmdW5jdGlvbiAoIGMgKSB7XG5cblx0XHRyZXR1cm4gKCBjLnIgPT09IHRoaXMuciApICYmICggYy5nID09PSB0aGlzLmcgKSAmJiAoIGMuYiA9PT0gdGhpcy5iICk7XG5cblx0fSxcblxuXHRmcm9tQXJyYXk6IGZ1bmN0aW9uICggYXJyYXkgKSB7XG5cblx0XHR0aGlzLnIgPSBhcnJheVsgMCBdO1xuXHRcdHRoaXMuZyA9IGFycmF5WyAxIF07XG5cdFx0dGhpcy5iID0gYXJyYXlbIDIgXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dG9BcnJheTogZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0ICkge1xuXG5cdFx0aWYgKCBhcnJheSA9PT0gdW5kZWZpbmVkICkgYXJyYXkgPSBbXTtcblx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblxuXHRcdGFycmF5WyBvZmZzZXQgXSA9IHRoaXMucjtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMSBdID0gdGhpcy5nO1xuXHRcdGFycmF5WyBvZmZzZXQgKyAyIF0gPSB0aGlzLmI7XG5cblx0XHRyZXR1cm4gYXJyYXk7XG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBuZXcgVEhSRUUuQ29sb3IoKS5zZXRSR0IoIHRoaXMuciwgdGhpcy5nLCB0aGlzLmIgKTtcblxuXHR9XG5cbn07XG5cblRIUkVFLkNvbG9yS2V5d29yZHMgPSB7ICdhbGljZWJsdWUnOiAweEYwRjhGRiwgJ2FudGlxdWV3aGl0ZSc6IDB4RkFFQkQ3LCAnYXF1YSc6IDB4MDBGRkZGLCAnYXF1YW1hcmluZSc6IDB4N0ZGRkQ0LCAnYXp1cmUnOiAweEYwRkZGRixcbidiZWlnZSc6IDB4RjVGNURDLCAnYmlzcXVlJzogMHhGRkU0QzQsICdibGFjayc6IDB4MDAwMDAwLCAnYmxhbmNoZWRhbG1vbmQnOiAweEZGRUJDRCwgJ2JsdWUnOiAweDAwMDBGRiwgJ2JsdWV2aW9sZXQnOiAweDhBMkJFMixcbidicm93bic6IDB4QTUyQTJBLCAnYnVybHl3b29kJzogMHhERUI4ODcsICdjYWRldGJsdWUnOiAweDVGOUVBMCwgJ2NoYXJ0cmV1c2UnOiAweDdGRkYwMCwgJ2Nob2NvbGF0ZSc6IDB4RDI2OTFFLCAnY29yYWwnOiAweEZGN0Y1MCxcbidjb3JuZmxvd2VyYmx1ZSc6IDB4NjQ5NUVELCAnY29ybnNpbGsnOiAweEZGRjhEQywgJ2NyaW1zb24nOiAweERDMTQzQywgJ2N5YW4nOiAweDAwRkZGRiwgJ2RhcmtibHVlJzogMHgwMDAwOEIsICdkYXJrY3lhbic6IDB4MDA4QjhCLFxuJ2Rhcmtnb2xkZW5yb2QnOiAweEI4ODYwQiwgJ2RhcmtncmF5JzogMHhBOUE5QTksICdkYXJrZ3JlZW4nOiAweDAwNjQwMCwgJ2RhcmtncmV5JzogMHhBOUE5QTksICdkYXJra2hha2knOiAweEJEQjc2QiwgJ2RhcmttYWdlbnRhJzogMHg4QjAwOEIsXG4nZGFya29saXZlZ3JlZW4nOiAweDU1NkIyRiwgJ2RhcmtvcmFuZ2UnOiAweEZGOEMwMCwgJ2RhcmtvcmNoaWQnOiAweDk5MzJDQywgJ2RhcmtyZWQnOiAweDhCMDAwMCwgJ2RhcmtzYWxtb24nOiAweEU5OTY3QSwgJ2RhcmtzZWFncmVlbic6IDB4OEZCQzhGLFxuJ2RhcmtzbGF0ZWJsdWUnOiAweDQ4M0Q4QiwgJ2RhcmtzbGF0ZWdyYXknOiAweDJGNEY0RiwgJ2RhcmtzbGF0ZWdyZXknOiAweDJGNEY0RiwgJ2Rhcmt0dXJxdW9pc2UnOiAweDAwQ0VEMSwgJ2Rhcmt2aW9sZXQnOiAweDk0MDBEMyxcbidkZWVwcGluayc6IDB4RkYxNDkzLCAnZGVlcHNreWJsdWUnOiAweDAwQkZGRiwgJ2RpbWdyYXknOiAweDY5Njk2OSwgJ2RpbWdyZXknOiAweDY5Njk2OSwgJ2RvZGdlcmJsdWUnOiAweDFFOTBGRiwgJ2ZpcmVicmljayc6IDB4QjIyMjIyLFxuJ2Zsb3JhbHdoaXRlJzogMHhGRkZBRjAsICdmb3Jlc3RncmVlbic6IDB4MjI4QjIyLCAnZnVjaHNpYSc6IDB4RkYwMEZGLCAnZ2FpbnNib3JvJzogMHhEQ0RDREMsICdnaG9zdHdoaXRlJzogMHhGOEY4RkYsICdnb2xkJzogMHhGRkQ3MDAsXG4nZ29sZGVucm9kJzogMHhEQUE1MjAsICdncmF5JzogMHg4MDgwODAsICdncmVlbic6IDB4MDA4MDAwLCAnZ3JlZW55ZWxsb3cnOiAweEFERkYyRiwgJ2dyZXknOiAweDgwODA4MCwgJ2hvbmV5ZGV3JzogMHhGMEZGRjAsICdob3RwaW5rJzogMHhGRjY5QjQsXG4naW5kaWFucmVkJzogMHhDRDVDNUMsICdpbmRpZ28nOiAweDRCMDA4MiwgJ2l2b3J5JzogMHhGRkZGRjAsICdraGFraSc6IDB4RjBFNjhDLCAnbGF2ZW5kZXInOiAweEU2RTZGQSwgJ2xhdmVuZGVyYmx1c2gnOiAweEZGRjBGNSwgJ2xhd25ncmVlbic6IDB4N0NGQzAwLFxuJ2xlbW9uY2hpZmZvbic6IDB4RkZGQUNELCAnbGlnaHRibHVlJzogMHhBREQ4RTYsICdsaWdodGNvcmFsJzogMHhGMDgwODAsICdsaWdodGN5YW4nOiAweEUwRkZGRiwgJ2xpZ2h0Z29sZGVucm9keWVsbG93JzogMHhGQUZBRDIsICdsaWdodGdyYXknOiAweEQzRDNEMyxcbidsaWdodGdyZWVuJzogMHg5MEVFOTAsICdsaWdodGdyZXknOiAweEQzRDNEMywgJ2xpZ2h0cGluayc6IDB4RkZCNkMxLCAnbGlnaHRzYWxtb24nOiAweEZGQTA3QSwgJ2xpZ2h0c2VhZ3JlZW4nOiAweDIwQjJBQSwgJ2xpZ2h0c2t5Ymx1ZSc6IDB4ODdDRUZBLFxuJ2xpZ2h0c2xhdGVncmF5JzogMHg3Nzg4OTksICdsaWdodHNsYXRlZ3JleSc6IDB4Nzc4ODk5LCAnbGlnaHRzdGVlbGJsdWUnOiAweEIwQzRERSwgJ2xpZ2h0eWVsbG93JzogMHhGRkZGRTAsICdsaW1lJzogMHgwMEZGMDAsICdsaW1lZ3JlZW4nOiAweDMyQ0QzMixcbidsaW5lbic6IDB4RkFGMEU2LCAnbWFnZW50YSc6IDB4RkYwMEZGLCAnbWFyb29uJzogMHg4MDAwMDAsICdtZWRpdW1hcXVhbWFyaW5lJzogMHg2NkNEQUEsICdtZWRpdW1ibHVlJzogMHgwMDAwQ0QsICdtZWRpdW1vcmNoaWQnOiAweEJBNTVEMyxcbidtZWRpdW1wdXJwbGUnOiAweDkzNzBEQiwgJ21lZGl1bXNlYWdyZWVuJzogMHgzQ0IzNzEsICdtZWRpdW1zbGF0ZWJsdWUnOiAweDdCNjhFRSwgJ21lZGl1bXNwcmluZ2dyZWVuJzogMHgwMEZBOUEsICdtZWRpdW10dXJxdW9pc2UnOiAweDQ4RDFDQyxcbidtZWRpdW12aW9sZXRyZWQnOiAweEM3MTU4NSwgJ21pZG5pZ2h0Ymx1ZSc6IDB4MTkxOTcwLCAnbWludGNyZWFtJzogMHhGNUZGRkEsICdtaXN0eXJvc2UnOiAweEZGRTRFMSwgJ21vY2Nhc2luJzogMHhGRkU0QjUsICduYXZham93aGl0ZSc6IDB4RkZERUFELFxuJ25hdnknOiAweDAwMDA4MCwgJ29sZGxhY2UnOiAweEZERjVFNiwgJ29saXZlJzogMHg4MDgwMDAsICdvbGl2ZWRyYWInOiAweDZCOEUyMywgJ29yYW5nZSc6IDB4RkZBNTAwLCAnb3JhbmdlcmVkJzogMHhGRjQ1MDAsICdvcmNoaWQnOiAweERBNzBENixcbidwYWxlZ29sZGVucm9kJzogMHhFRUU4QUEsICdwYWxlZ3JlZW4nOiAweDk4RkI5OCwgJ3BhbGV0dXJxdW9pc2UnOiAweEFGRUVFRSwgJ3BhbGV2aW9sZXRyZWQnOiAweERCNzA5MywgJ3BhcGF5YXdoaXAnOiAweEZGRUZENSwgJ3BlYWNocHVmZic6IDB4RkZEQUI5LFxuJ3BlcnUnOiAweENEODUzRiwgJ3BpbmsnOiAweEZGQzBDQiwgJ3BsdW0nOiAweEREQTBERCwgJ3Bvd2RlcmJsdWUnOiAweEIwRTBFNiwgJ3B1cnBsZSc6IDB4ODAwMDgwLCAncmVkJzogMHhGRjAwMDAsICdyb3N5YnJvd24nOiAweEJDOEY4Rixcbidyb3lhbGJsdWUnOiAweDQxNjlFMSwgJ3NhZGRsZWJyb3duJzogMHg4QjQ1MTMsICdzYWxtb24nOiAweEZBODA3MiwgJ3NhbmR5YnJvd24nOiAweEY0QTQ2MCwgJ3NlYWdyZWVuJzogMHgyRThCNTcsICdzZWFzaGVsbCc6IDB4RkZGNUVFLFxuJ3NpZW5uYSc6IDB4QTA1MjJELCAnc2lsdmVyJzogMHhDMEMwQzAsICdza3libHVlJzogMHg4N0NFRUIsICdzbGF0ZWJsdWUnOiAweDZBNUFDRCwgJ3NsYXRlZ3JheSc6IDB4NzA4MDkwLCAnc2xhdGVncmV5JzogMHg3MDgwOTAsICdzbm93JzogMHhGRkZBRkEsXG4nc3ByaW5nZ3JlZW4nOiAweDAwRkY3RiwgJ3N0ZWVsYmx1ZSc6IDB4NDY4MkI0LCAndGFuJzogMHhEMkI0OEMsICd0ZWFsJzogMHgwMDgwODAsICd0aGlzdGxlJzogMHhEOEJGRDgsICd0b21hdG8nOiAweEZGNjM0NywgJ3R1cnF1b2lzZSc6IDB4NDBFMEQwLFxuJ3Zpb2xldCc6IDB4RUU4MkVFLCAnd2hlYXQnOiAweEY1REVCMywgJ3doaXRlJzogMHhGRkZGRkYsICd3aGl0ZXNtb2tlJzogMHhGNUY1RjUsICd5ZWxsb3cnOiAweEZGRkYwMCwgJ3llbGxvd2dyZWVuJzogMHg5QUNEMzIgfTtcblxuLy8gRmlsZTpzcmMvbWF0aC9RdWF0ZXJuaW9uLmpzXG5cbi8qKlxuICogQGF1dGhvciBtaWthZWwgZW10aW5nZXIgLyBodHRwOi8vZ29tby5zZS9cbiAqIEBhdXRob3IgYWx0ZXJlZHEgLyBodHRwOi8vYWx0ZXJlZHF1YWxpYS5jb20vXG4gKiBAYXV0aG9yIFdlc3RMYW5nbGV5IC8gaHR0cDovL2dpdGh1Yi5jb20vV2VzdExhbmdsZXlcbiAqIEBhdXRob3IgYmhvdXN0b24gLyBodHRwOi8vZXhvY29ydGV4LmNvbVxuICovXG5cblRIUkVFLlF1YXRlcm5pb24gPSBmdW5jdGlvbiAoIHgsIHksIHosIHcgKSB7XG5cblx0dGhpcy5feCA9IHggfHwgMDtcblx0dGhpcy5feSA9IHkgfHwgMDtcblx0dGhpcy5feiA9IHogfHwgMDtcblx0dGhpcy5fdyA9ICggdyAhPT0gdW5kZWZpbmVkICkgPyB3IDogMTtcblxufTtcblxuVEhSRUUuUXVhdGVybmlvbi5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IFRIUkVFLlF1YXRlcm5pb24sXG5cblx0X3g6IDAsX3k6IDAsIF96OiAwLCBfdzogMCxcblxuXHRnZXQgeCAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5feDtcblxuXHR9LFxuXG5cdHNldCB4ICggdmFsdWUgKSB7XG5cblx0XHR0aGlzLl94ID0gdmFsdWU7XG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0fSxcblxuXHRnZXQgeSAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5feTtcblxuXHR9LFxuXG5cdHNldCB5ICggdmFsdWUgKSB7XG5cblx0XHR0aGlzLl95ID0gdmFsdWU7XG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0fSxcblxuXHRnZXQgeiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5fejtcblxuXHR9LFxuXG5cdHNldCB6ICggdmFsdWUgKSB7XG5cblx0XHR0aGlzLl96ID0gdmFsdWU7XG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0fSxcblxuXHRnZXQgdyAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5fdztcblxuXHR9LFxuXG5cdHNldCB3ICggdmFsdWUgKSB7XG5cblx0XHR0aGlzLl93ID0gdmFsdWU7XG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0fSxcblxuXHRzZXQ6IGZ1bmN0aW9uICggeCwgeSwgeiwgdyApIHtcblxuXHRcdHRoaXMuX3ggPSB4O1xuXHRcdHRoaXMuX3kgPSB5O1xuXHRcdHRoaXMuX3ogPSB6O1xuXHRcdHRoaXMuX3cgPSB3O1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNvcHk6IGZ1bmN0aW9uICggcXVhdGVybmlvbiApIHtcblxuXHRcdHRoaXMuX3ggPSBxdWF0ZXJuaW9uLng7XG5cdFx0dGhpcy5feSA9IHF1YXRlcm5pb24ueTtcblx0XHR0aGlzLl96ID0gcXVhdGVybmlvbi56O1xuXHRcdHRoaXMuX3cgPSBxdWF0ZXJuaW9uLnc7XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbUV1bGVyOiBmdW5jdGlvbiAoIGV1bGVyLCB1cGRhdGUgKSB7XG5cblx0XHRpZiAoIGV1bGVyIGluc3RhbmNlb2YgVEhSRUUuRXVsZXIgPT09IGZhbHNlICkge1xuXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoICdUSFJFRS5RdWF0ZXJuaW9uOiAuc2V0RnJvbUV1bGVyKCkgbm93IGV4cGVjdHMgYSBFdWxlciByb3RhdGlvbiByYXRoZXIgdGhhbiBhIFZlY3RvcjMgYW5kIG9yZGVyLicgKTtcblx0XHR9XG5cblx0XHQvLyBodHRwOi8vd3d3Lm1hdGh3b3Jrcy5jb20vbWF0bGFiY2VudHJhbC9maWxlZXhjaGFuZ2UvXG5cdFx0Ly8gXHQyMDY5Ni1mdW5jdGlvbi10by1jb252ZXJ0LWJldHdlZW4tZGNtLWV1bGVyLWFuZ2xlcy1xdWF0ZXJuaW9ucy1hbmQtZXVsZXItdmVjdG9ycy9cblx0XHQvL1x0Y29udGVudC9TcGluQ2FsYy5tXG5cblx0XHR2YXIgYzEgPSBNYXRoLmNvcyggZXVsZXIuX3ggLyAyICk7XG5cdFx0dmFyIGMyID0gTWF0aC5jb3MoIGV1bGVyLl95IC8gMiApO1xuXHRcdHZhciBjMyA9IE1hdGguY29zKCBldWxlci5feiAvIDIgKTtcblx0XHR2YXIgczEgPSBNYXRoLnNpbiggZXVsZXIuX3ggLyAyICk7XG5cdFx0dmFyIHMyID0gTWF0aC5zaW4oIGV1bGVyLl95IC8gMiApO1xuXHRcdHZhciBzMyA9IE1hdGguc2luKCBldWxlci5feiAvIDIgKTtcblxuXHRcdGlmICggZXVsZXIub3JkZXIgPT09ICdYWVonICkge1xuXG5cdFx0XHR0aGlzLl94ID0gczEgKiBjMiAqIGMzICsgYzEgKiBzMiAqIHMzO1xuXHRcdFx0dGhpcy5feSA9IGMxICogczIgKiBjMyAtIHMxICogYzIgKiBzMztcblx0XHRcdHRoaXMuX3ogPSBjMSAqIGMyICogczMgKyBzMSAqIHMyICogYzM7XG5cdFx0XHR0aGlzLl93ID0gYzEgKiBjMiAqIGMzIC0gczEgKiBzMiAqIHMzO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdZWFonICkge1xuXG5cdFx0XHR0aGlzLl94ID0gczEgKiBjMiAqIGMzICsgYzEgKiBzMiAqIHMzO1xuXHRcdFx0dGhpcy5feSA9IGMxICogczIgKiBjMyAtIHMxICogYzIgKiBzMztcblx0XHRcdHRoaXMuX3ogPSBjMSAqIGMyICogczMgLSBzMSAqIHMyICogYzM7XG5cdFx0XHR0aGlzLl93ID0gYzEgKiBjMiAqIGMzICsgczEgKiBzMiAqIHMzO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdaWFknICkge1xuXG5cdFx0XHR0aGlzLl94ID0gczEgKiBjMiAqIGMzIC0gYzEgKiBzMiAqIHMzO1xuXHRcdFx0dGhpcy5feSA9IGMxICogczIgKiBjMyArIHMxICogYzIgKiBzMztcblx0XHRcdHRoaXMuX3ogPSBjMSAqIGMyICogczMgKyBzMSAqIHMyICogYzM7XG5cdFx0XHR0aGlzLl93ID0gYzEgKiBjMiAqIGMzIC0gczEgKiBzMiAqIHMzO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdaWVgnICkge1xuXG5cdFx0XHR0aGlzLl94ID0gczEgKiBjMiAqIGMzIC0gYzEgKiBzMiAqIHMzO1xuXHRcdFx0dGhpcy5feSA9IGMxICogczIgKiBjMyArIHMxICogYzIgKiBzMztcblx0XHRcdHRoaXMuX3ogPSBjMSAqIGMyICogczMgLSBzMSAqIHMyICogYzM7XG5cdFx0XHR0aGlzLl93ID0gYzEgKiBjMiAqIGMzICsgczEgKiBzMiAqIHMzO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdZWlgnICkge1xuXG5cdFx0XHR0aGlzLl94ID0gczEgKiBjMiAqIGMzICsgYzEgKiBzMiAqIHMzO1xuXHRcdFx0dGhpcy5feSA9IGMxICogczIgKiBjMyArIHMxICogYzIgKiBzMztcblx0XHRcdHRoaXMuX3ogPSBjMSAqIGMyICogczMgLSBzMSAqIHMyICogYzM7XG5cdFx0XHR0aGlzLl93ID0gYzEgKiBjMiAqIGMzIC0gczEgKiBzMiAqIHMzO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdYWlknICkge1xuXG5cdFx0XHR0aGlzLl94ID0gczEgKiBjMiAqIGMzIC0gYzEgKiBzMiAqIHMzO1xuXHRcdFx0dGhpcy5feSA9IGMxICogczIgKiBjMyAtIHMxICogYzIgKiBzMztcblx0XHRcdHRoaXMuX3ogPSBjMSAqIGMyICogczMgKyBzMSAqIHMyICogYzM7XG5cdFx0XHR0aGlzLl93ID0gYzEgKiBjMiAqIGMzICsgczEgKiBzMiAqIHMzO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB1cGRhdGUgIT09IGZhbHNlICkgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldEZyb21BeGlzQW5nbGU6IGZ1bmN0aW9uICggYXhpcywgYW5nbGUgKSB7XG5cblx0XHQvLyBodHRwOi8vd3d3LmV1Y2xpZGVhbnNwYWNlLmNvbS9tYXRocy9nZW9tZXRyeS9yb3RhdGlvbnMvY29udmVyc2lvbnMvYW5nbGVUb1F1YXRlcm5pb24vaW5kZXguaHRtXG5cblx0XHQvLyBhc3N1bWVzIGF4aXMgaXMgbm9ybWFsaXplZFxuXG5cdFx0dmFyIGhhbGZBbmdsZSA9IGFuZ2xlIC8gMiwgcyA9IE1hdGguc2luKCBoYWxmQW5nbGUgKTtcblxuXHRcdHRoaXMuX3ggPSBheGlzLnggKiBzO1xuXHRcdHRoaXMuX3kgPSBheGlzLnkgKiBzO1xuXHRcdHRoaXMuX3ogPSBheGlzLnogKiBzO1xuXHRcdHRoaXMuX3cgPSBNYXRoLmNvcyggaGFsZkFuZ2xlICk7XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbVJvdGF0aW9uTWF0cml4OiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHQvLyBodHRwOi8vd3d3LmV1Y2xpZGVhbnNwYWNlLmNvbS9tYXRocy9nZW9tZXRyeS9yb3RhdGlvbnMvY29udmVyc2lvbnMvbWF0cml4VG9RdWF0ZXJuaW9uL2luZGV4Lmh0bVxuXG5cdFx0Ly8gYXNzdW1lcyB0aGUgdXBwZXIgM3gzIG9mIG0gaXMgYSBwdXJlIHJvdGF0aW9uIG1hdHJpeCAoaS5lLCB1bnNjYWxlZClcblxuXHRcdHZhciB0ZSA9IG0uZWxlbWVudHMsXG5cblx0XHRcdG0xMSA9IHRlWyAwIF0sIG0xMiA9IHRlWyA0IF0sIG0xMyA9IHRlWyA4IF0sXG5cdFx0XHRtMjEgPSB0ZVsgMSBdLCBtMjIgPSB0ZVsgNSBdLCBtMjMgPSB0ZVsgOSBdLFxuXHRcdFx0bTMxID0gdGVbIDIgXSwgbTMyID0gdGVbIDYgXSwgbTMzID0gdGVbIDEwIF0sXG5cblx0XHRcdHRyYWNlID0gbTExICsgbTIyICsgbTMzLFxuXHRcdFx0cztcblxuXHRcdGlmICggdHJhY2UgPiAwICkge1xuXG5cdFx0XHRzID0gMC41IC8gTWF0aC5zcXJ0KCB0cmFjZSArIDEuMCApO1xuXG5cdFx0XHR0aGlzLl93ID0gMC4yNSAvIHM7XG5cdFx0XHR0aGlzLl94ID0gKCBtMzIgLSBtMjMgKSAqIHM7XG5cdFx0XHR0aGlzLl95ID0gKCBtMTMgLSBtMzEgKSAqIHM7XG5cdFx0XHR0aGlzLl96ID0gKCBtMjEgLSBtMTIgKSAqIHM7XG5cblx0XHR9IGVsc2UgaWYgKCBtMTEgPiBtMjIgJiYgbTExID4gbTMzICkge1xuXG5cdFx0XHRzID0gMi4wICogTWF0aC5zcXJ0KCAxLjAgKyBtMTEgLSBtMjIgLSBtMzMgKTtcblxuXHRcdFx0dGhpcy5fdyA9ICggbTMyIC0gbTIzICkgLyBzO1xuXHRcdFx0dGhpcy5feCA9IDAuMjUgKiBzO1xuXHRcdFx0dGhpcy5feSA9ICggbTEyICsgbTIxICkgLyBzO1xuXHRcdFx0dGhpcy5feiA9ICggbTEzICsgbTMxICkgLyBzO1xuXG5cdFx0fSBlbHNlIGlmICggbTIyID4gbTMzICkge1xuXG5cdFx0XHRzID0gMi4wICogTWF0aC5zcXJ0KCAxLjAgKyBtMjIgLSBtMTEgLSBtMzMgKTtcblxuXHRcdFx0dGhpcy5fdyA9ICggbTEzIC0gbTMxICkgLyBzO1xuXHRcdFx0dGhpcy5feCA9ICggbTEyICsgbTIxICkgLyBzO1xuXHRcdFx0dGhpcy5feSA9IDAuMjUgKiBzO1xuXHRcdFx0dGhpcy5feiA9ICggbTIzICsgbTMyICkgLyBzO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0cyA9IDIuMCAqIE1hdGguc3FydCggMS4wICsgbTMzIC0gbTExIC0gbTIyICk7XG5cblx0XHRcdHRoaXMuX3cgPSAoIG0yMSAtIG0xMiApIC8gcztcblx0XHRcdHRoaXMuX3ggPSAoIG0xMyArIG0zMSApIC8gcztcblx0XHRcdHRoaXMuX3kgPSAoIG0yMyArIG0zMiApIC8gcztcblx0XHRcdHRoaXMuX3ogPSAwLjI1ICogcztcblxuXHRcdH1cblxuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRGcm9tVW5pdFZlY3RvcnM6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIGh0dHA6Ly9sb2xlbmdpbmUubmV0L2Jsb2cvMjAxNC8wMi8yNC9xdWF0ZXJuaW9uLWZyb20tdHdvLXZlY3RvcnMtZmluYWxcblxuXHRcdC8vIGFzc3VtZXMgZGlyZWN0aW9uIHZlY3RvcnMgdkZyb20gYW5kIHZUbyBhcmUgbm9ybWFsaXplZFxuXG5cdFx0dmFyIHYxLCByO1xuXG5cdFx0dmFyIEVQUyA9IDAuMDAwMDAxO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggdkZyb20sIHZUbyApIHtcblxuXHRcdFx0aWYgKCB2MSA9PT0gdW5kZWZpbmVkICkgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0XHRyID0gdkZyb20uZG90KCB2VG8gKSArIDE7XG5cblx0XHRcdGlmICggciA8IEVQUyApIHtcblxuXHRcdFx0XHRyID0gMDtcblxuXHRcdFx0XHRpZiAoIE1hdGguYWJzKCB2RnJvbS54ICkgPiBNYXRoLmFicyggdkZyb20ueiApICkge1xuXG5cdFx0XHRcdFx0djEuc2V0KCAtIHZGcm9tLnksIHZGcm9tLngsIDAgKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0djEuc2V0KCAwLCAtIHZGcm9tLnosIHZGcm9tLnkgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0djEuY3Jvc3NWZWN0b3JzKCB2RnJvbSwgdlRvICk7XG5cblx0XHRcdH1cblxuXHRcdFx0dGhpcy5feCA9IHYxLng7XG5cdFx0XHR0aGlzLl95ID0gdjEueTtcblx0XHRcdHRoaXMuX3ogPSB2MS56O1xuXHRcdFx0dGhpcy5fdyA9IHI7XG5cblx0XHRcdHRoaXMubm9ybWFsaXplKCk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fVxuXG5cdH0oKSxcblxuXHRpbnZlcnNlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLmNvbmp1Z2F0ZSgpLm5vcm1hbGl6ZSgpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjb25qdWdhdGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuX3ggKj0gLSAxO1xuXHRcdHRoaXMuX3kgKj0gLSAxO1xuXHRcdHRoaXMuX3ogKj0gLSAxO1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGRvdDogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX3ggKiB2Ll94ICsgdGhpcy5feSAqIHYuX3kgKyB0aGlzLl96ICogdi5feiArIHRoaXMuX3cgKiB2Ll93O1xuXG5cdH0sXG5cblx0bGVuZ3RoU3E6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLl94ICogdGhpcy5feCArIHRoaXMuX3kgKiB0aGlzLl95ICsgdGhpcy5feiAqIHRoaXMuX3ogKyB0aGlzLl93ICogdGhpcy5fdztcblxuXHR9LFxuXG5cdGxlbmd0aDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIE1hdGguc3FydCggdGhpcy5feCAqIHRoaXMuX3ggKyB0aGlzLl95ICogdGhpcy5feSArIHRoaXMuX3ogKiB0aGlzLl96ICsgdGhpcy5fdyAqIHRoaXMuX3cgKTtcblxuXHR9LFxuXG5cdG5vcm1hbGl6ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIGwgPSB0aGlzLmxlbmd0aCgpO1xuXG5cdFx0aWYgKCBsID09PSAwICkge1xuXG5cdFx0XHR0aGlzLl94ID0gMDtcblx0XHRcdHRoaXMuX3kgPSAwO1xuXHRcdFx0dGhpcy5feiA9IDA7XG5cdFx0XHR0aGlzLl93ID0gMTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGwgPSAxIC8gbDtcblxuXHRcdFx0dGhpcy5feCA9IHRoaXMuX3ggKiBsO1xuXHRcdFx0dGhpcy5feSA9IHRoaXMuX3kgKiBsO1xuXHRcdFx0dGhpcy5feiA9IHRoaXMuX3ogKiBsO1xuXHRcdFx0dGhpcy5fdyA9IHRoaXMuX3cgKiBsO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5OiBmdW5jdGlvbiAoIHEsIHAgKSB7XG5cblx0XHRpZiAoIHAgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuUXVhdGVybmlvbjogLm11bHRpcGx5KCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAubXVsdGlwbHlRdWF0ZXJuaW9ucyggYSwgYiApIGluc3RlYWQuJyApO1xuXHRcdFx0cmV0dXJuIHRoaXMubXVsdGlwbHlRdWF0ZXJuaW9ucyggcSwgcCApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMubXVsdGlwbHlRdWF0ZXJuaW9ucyggdGhpcywgcSApO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlRdWF0ZXJuaW9uczogZnVuY3Rpb24gKCBhLCBiICkge1xuXG5cdFx0Ly8gZnJvbSBodHRwOi8vd3d3LmV1Y2xpZGVhbnNwYWNlLmNvbS9tYXRocy9hbGdlYnJhL3JlYWxOb3JtZWRBbGdlYnJhL3F1YXRlcm5pb25zL2NvZGUvaW5kZXguaHRtXG5cblx0XHR2YXIgcWF4ID0gYS5feCwgcWF5ID0gYS5feSwgcWF6ID0gYS5feiwgcWF3ID0gYS5fdztcblx0XHR2YXIgcWJ4ID0gYi5feCwgcWJ5ID0gYi5feSwgcWJ6ID0gYi5feiwgcWJ3ID0gYi5fdztcblxuXHRcdHRoaXMuX3ggPSBxYXggKiBxYncgKyBxYXcgKiBxYnggKyBxYXkgKiBxYnogLSBxYXogKiBxYnk7XG5cdFx0dGhpcy5feSA9IHFheSAqIHFidyArIHFhdyAqIHFieSArIHFheiAqIHFieCAtIHFheCAqIHFiejtcblx0XHR0aGlzLl96ID0gcWF6ICogcWJ3ICsgcWF3ICogcWJ6ICsgcWF4ICogcWJ5IC0gcWF5ICogcWJ4O1xuXHRcdHRoaXMuX3cgPSBxYXcgKiBxYncgLSBxYXggKiBxYnggLSBxYXkgKiBxYnkgLSBxYXogKiBxYno7XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlWZWN0b3IzOiBmdW5jdGlvbiAoIHZlY3RvciApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlF1YXRlcm5pb246IC5tdWx0aXBseVZlY3RvcjMoKSBoYXMgYmVlbiByZW1vdmVkLiBVc2UgaXMgbm93IHZlY3Rvci5hcHBseVF1YXRlcm5pb24oIHF1YXRlcm5pb24gKSBpbnN0ZWFkLicgKTtcblx0XHRyZXR1cm4gdmVjdG9yLmFwcGx5UXVhdGVybmlvbiggdGhpcyApO1xuXG5cdH0sXG5cblx0c2xlcnA6IGZ1bmN0aW9uICggcWIsIHQgKSB7XG5cblx0XHRpZiAoIHQgPT09IDAgKSByZXR1cm4gdGhpcztcblx0XHRpZiAoIHQgPT09IDEgKSByZXR1cm4gdGhpcy5jb3B5KCBxYiApO1xuXG5cdFx0dmFyIHggPSB0aGlzLl94LCB5ID0gdGhpcy5feSwgeiA9IHRoaXMuX3osIHcgPSB0aGlzLl93O1xuXG5cdFx0Ly8gaHR0cDovL3d3dy5ldWNsaWRlYW5zcGFjZS5jb20vbWF0aHMvYWxnZWJyYS9yZWFsTm9ybWVkQWxnZWJyYS9xdWF0ZXJuaW9ucy9zbGVycC9cblxuXHRcdHZhciBjb3NIYWxmVGhldGEgPSB3ICogcWIuX3cgKyB4ICogcWIuX3ggKyB5ICogcWIuX3kgKyB6ICogcWIuX3o7XG5cblx0XHRpZiAoIGNvc0hhbGZUaGV0YSA8IDAgKSB7XG5cblx0XHRcdHRoaXMuX3cgPSAtIHFiLl93O1xuXHRcdFx0dGhpcy5feCA9IC0gcWIuX3g7XG5cdFx0XHR0aGlzLl95ID0gLSBxYi5feTtcblx0XHRcdHRoaXMuX3ogPSAtIHFiLl96O1xuXG5cdFx0XHRjb3NIYWxmVGhldGEgPSAtIGNvc0hhbGZUaGV0YTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMuY29weSggcWIgKTtcblxuXHRcdH1cblxuXHRcdGlmICggY29zSGFsZlRoZXRhID49IDEuMCApIHtcblxuXHRcdFx0dGhpcy5fdyA9IHc7XG5cdFx0XHR0aGlzLl94ID0geDtcblx0XHRcdHRoaXMuX3kgPSB5O1xuXHRcdFx0dGhpcy5feiA9IHo7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fVxuXG5cdFx0dmFyIGhhbGZUaGV0YSA9IE1hdGguYWNvcyggY29zSGFsZlRoZXRhICk7XG5cdFx0dmFyIHNpbkhhbGZUaGV0YSA9IE1hdGguc3FydCggMS4wIC0gY29zSGFsZlRoZXRhICogY29zSGFsZlRoZXRhICk7XG5cblx0XHRpZiAoIE1hdGguYWJzKCBzaW5IYWxmVGhldGEgKSA8IDAuMDAxICkge1xuXG5cdFx0XHR0aGlzLl93ID0gMC41ICogKCB3ICsgdGhpcy5fdyApO1xuXHRcdFx0dGhpcy5feCA9IDAuNSAqICggeCArIHRoaXMuX3ggKTtcblx0XHRcdHRoaXMuX3kgPSAwLjUgKiAoIHkgKyB0aGlzLl95ICk7XG5cdFx0XHR0aGlzLl96ID0gMC41ICogKCB6ICsgdGhpcy5feiApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH1cblxuXHRcdHZhciByYXRpb0EgPSBNYXRoLnNpbiggKCAxIC0gdCApICogaGFsZlRoZXRhICkgLyBzaW5IYWxmVGhldGEsXG5cdFx0cmF0aW9CID0gTWF0aC5zaW4oIHQgKiBoYWxmVGhldGEgKSAvIHNpbkhhbGZUaGV0YTtcblxuXHRcdHRoaXMuX3cgPSAoIHcgKiByYXRpb0EgKyB0aGlzLl93ICogcmF0aW9CICk7XG5cdFx0dGhpcy5feCA9ICggeCAqIHJhdGlvQSArIHRoaXMuX3ggKiByYXRpb0IgKTtcblx0XHR0aGlzLl95ID0gKCB5ICogcmF0aW9BICsgdGhpcy5feSAqIHJhdGlvQiApO1xuXHRcdHRoaXMuX3ogPSAoIHogKiByYXRpb0EgKyB0aGlzLl96ICogcmF0aW9CICk7XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZXF1YWxzOiBmdW5jdGlvbiAoIHF1YXRlcm5pb24gKSB7XG5cblx0XHRyZXR1cm4gKCBxdWF0ZXJuaW9uLl94ID09PSB0aGlzLl94ICkgJiYgKCBxdWF0ZXJuaW9uLl95ID09PSB0aGlzLl95ICkgJiYgKCBxdWF0ZXJuaW9uLl96ID09PSB0aGlzLl96ICkgJiYgKCBxdWF0ZXJuaW9uLl93ID09PSB0aGlzLl93ICk7XG5cblx0fSxcblxuXHRmcm9tQXJyYXk6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0dGhpcy5feCA9IGFycmF5WyBvZmZzZXQgXTtcblx0XHR0aGlzLl95ID0gYXJyYXlbIG9mZnNldCArIDEgXTtcblx0XHR0aGlzLl96ID0gYXJyYXlbIG9mZnNldCArIDIgXTtcblx0XHR0aGlzLl93ID0gYXJyYXlbIG9mZnNldCArIDMgXTtcblxuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR0b0FycmF5OiBmdW5jdGlvbiAoIGFycmF5LCBvZmZzZXQgKSB7XG5cblx0XHRpZiAoIGFycmF5ID09PSB1bmRlZmluZWQgKSBhcnJheSA9IFtdO1xuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0YXJyYXlbIG9mZnNldCBdID0gdGhpcy5feDtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMSBdID0gdGhpcy5feTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMiBdID0gdGhpcy5fejtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMyBdID0gdGhpcy5fdztcblxuXHRcdHJldHVybiBhcnJheTtcblxuXHR9LFxuXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbiAoIGNhbGxiYWNrICkge1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uQ2hhbmdlQ2FsbGJhY2s6IGZ1bmN0aW9uICgpIHt9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFRIUkVFLlF1YXRlcm5pb24oIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3osIHRoaXMuX3cgKTtcblxuXHR9XG5cbn07XG5cblRIUkVFLlF1YXRlcm5pb24uc2xlcnAgPSBmdW5jdGlvbiAoIHFhLCBxYiwgcW0sIHQgKSB7XG5cblx0cmV0dXJuIHFtLmNvcHkoIHFhICkuc2xlcnAoIHFiLCB0ICk7XG5cbn07XG5cbi8vIEZpbGU6c3JjL21hdGgvVmVjdG9yMi5qc1xuXG4vKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKiBAYXV0aG9yIHBoaWxvZ2IgLyBodHRwOi8vYmxvZy50aGVqaXQub3JnL1xuICogQGF1dGhvciBlZ3JhZXRoZXIgLyBodHRwOi8vZWdyYWV0aGVyLmNvbS9cbiAqIEBhdXRob3Igeno4NSAvIGh0dHA6Ly93d3cubGFiNGdhbWVzLm5ldC96ejg1L2Jsb2dcbiAqL1xuXG5USFJFRS5WZWN0b3IyID0gZnVuY3Rpb24gKCB4LCB5ICkge1xuXG5cdHRoaXMueCA9IHggfHwgMDtcblx0dGhpcy55ID0geSB8fCAwO1xuXG59O1xuXG5USFJFRS5WZWN0b3IyLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogVEhSRUUuVmVjdG9yMixcblxuXHRzZXQ6IGZ1bmN0aW9uICggeCwgeSApIHtcblxuXHRcdHRoaXMueCA9IHg7XG5cdFx0dGhpcy55ID0geTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0WDogZnVuY3Rpb24gKCB4ICkge1xuXG5cdFx0dGhpcy54ID0geDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0WTogZnVuY3Rpb24gKCB5ICkge1xuXG5cdFx0dGhpcy55ID0geTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0Q29tcG9uZW50OiBmdW5jdGlvbiAoIGluZGV4LCB2YWx1ZSApIHtcblxuXHRcdHN3aXRjaCAoIGluZGV4ICkge1xuXG5cdFx0XHRjYXNlIDA6IHRoaXMueCA9IHZhbHVlOyBicmVhaztcblx0XHRcdGNhc2UgMTogdGhpcy55ID0gdmFsdWU7IGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCAnaW5kZXggaXMgb3V0IG9mIHJhbmdlOiAnICsgaW5kZXggKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdGdldENvbXBvbmVudDogZnVuY3Rpb24gKCBpbmRleCApIHtcblxuXHRcdHN3aXRjaCAoIGluZGV4ICkge1xuXG5cdFx0XHRjYXNlIDA6IHJldHVybiB0aGlzLng7XG5cdFx0XHRjYXNlIDE6IHJldHVybiB0aGlzLnk7XG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoICdpbmRleCBpcyBvdXQgb2YgcmFuZ2U6ICcgKyBpbmRleCApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Y29weTogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0dGhpcy54ID0gdi54O1xuXHRcdHRoaXMueSA9IHYueTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YWRkOiBmdW5jdGlvbiAoIHYsIHcgKSB7XG5cblx0XHRpZiAoIHcgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVmVjdG9yMjogLmFkZCgpIG5vdyBvbmx5IGFjY2VwdHMgb25lIGFyZ3VtZW50LiBVc2UgLmFkZFZlY3RvcnMoIGEsIGIgKSBpbnN0ZWFkLicgKTtcblx0XHRcdHJldHVybiB0aGlzLmFkZFZlY3RvcnMoIHYsIHcgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMueCArPSB2Lng7XG5cdFx0dGhpcy55ICs9IHYueTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YWRkU2NhbGFyOiBmdW5jdGlvbiAoIHMgKSB7XG5cblx0XHR0aGlzLnggKz0gcztcblx0XHR0aGlzLnkgKz0gcztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YWRkVmVjdG9yczogZnVuY3Rpb24gKCBhLCBiICkge1xuXG5cdFx0dGhpcy54ID0gYS54ICsgYi54O1xuXHRcdHRoaXMueSA9IGEueSArIGIueTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3ViOiBmdW5jdGlvbiAoIHYsIHcgKSB7XG5cblx0XHRpZiAoIHcgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVmVjdG9yMjogLnN1YigpIG5vdyBvbmx5IGFjY2VwdHMgb25lIGFyZ3VtZW50LiBVc2UgLnN1YlZlY3RvcnMoIGEsIGIgKSBpbnN0ZWFkLicgKTtcblx0XHRcdHJldHVybiB0aGlzLnN1YlZlY3RvcnMoIHYsIHcgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMueCAtPSB2Lng7XG5cdFx0dGhpcy55IC09IHYueTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3ViU2NhbGFyOiBmdW5jdGlvbiAoIHMgKSB7XG5cblx0XHR0aGlzLnggLT0gcztcblx0XHR0aGlzLnkgLT0gcztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3ViVmVjdG9yczogZnVuY3Rpb24gKCBhLCBiICkge1xuXG5cdFx0dGhpcy54ID0gYS54IC0gYi54O1xuXHRcdHRoaXMueSA9IGEueSAtIGIueTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHk6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHRoaXMueCAqPSB2Lng7XG5cdFx0dGhpcy55ICo9IHYueTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlTY2FsYXI6IGZ1bmN0aW9uICggcyApIHtcblxuXHRcdHRoaXMueCAqPSBzO1xuXHRcdHRoaXMueSAqPSBzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRkaXZpZGU6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHRoaXMueCAvPSB2Lng7XG5cdFx0dGhpcy55IC89IHYueTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZGl2aWRlU2NhbGFyOiBmdW5jdGlvbiAoIHNjYWxhciApIHtcblxuXHRcdGlmICggc2NhbGFyICE9PSAwICkge1xuXG5cdFx0XHR2YXIgaW52U2NhbGFyID0gMSAvIHNjYWxhcjtcblxuXHRcdFx0dGhpcy54ICo9IGludlNjYWxhcjtcblx0XHRcdHRoaXMueSAqPSBpbnZTY2FsYXI7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLnggPSAwO1xuXHRcdFx0dGhpcy55ID0gMDtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWluOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRpZiAoIHRoaXMueCA+IHYueCApIHtcblxuXHRcdFx0dGhpcy54ID0gdi54O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnkgPiB2LnkgKSB7XG5cblx0XHRcdHRoaXMueSA9IHYueTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWF4OiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRpZiAoIHRoaXMueCA8IHYueCApIHtcblxuXHRcdFx0dGhpcy54ID0gdi54O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnkgPCB2LnkgKSB7XG5cblx0XHRcdHRoaXMueSA9IHYueTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2xhbXA6IGZ1bmN0aW9uICggbWluLCBtYXggKSB7XG5cblx0XHQvLyBUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgbWluIDwgbWF4LCBpZiB0aGlzIGFzc3VtcHRpb24gaXNuJ3QgdHJ1ZSBpdCB3aWxsIG5vdCBvcGVyYXRlIGNvcnJlY3RseVxuXG5cdFx0aWYgKCB0aGlzLnggPCBtaW4ueCApIHtcblxuXHRcdFx0dGhpcy54ID0gbWluLng7XG5cblx0XHR9IGVsc2UgaWYgKCB0aGlzLnggPiBtYXgueCApIHtcblxuXHRcdFx0dGhpcy54ID0gbWF4Lng7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMueSA8IG1pbi55ICkge1xuXG5cdFx0XHR0aGlzLnkgPSBtaW4ueTtcblxuXHRcdH0gZWxzZSBpZiAoIHRoaXMueSA+IG1heC55ICkge1xuXG5cdFx0XHR0aGlzLnkgPSBtYXgueTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGNsYW1wU2NhbGFyOiAoIGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBtaW4sIG1heDtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIG1pblZhbCwgbWF4VmFsICkge1xuXG5cdFx0XHRpZiAoIG1pbiA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdG1pbiA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0XHRcdG1heCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cblx0XHRcdH1cblxuXHRcdFx0bWluLnNldCggbWluVmFsLCBtaW5WYWwgKTtcblx0XHRcdG1heC5zZXQoIG1heFZhbCwgbWF4VmFsICk7XG5cblx0XHRcdHJldHVybiB0aGlzLmNsYW1wKCBtaW4sIG1heCApO1xuXG5cdFx0fTtcblxuXHR9ICkoKSxcblxuXHRmbG9vcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gTWF0aC5mbG9vciggdGhpcy54ICk7XG5cdFx0dGhpcy55ID0gTWF0aC5mbG9vciggdGhpcy55ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNlaWw6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9IE1hdGguY2VpbCggdGhpcy54ICk7XG5cdFx0dGhpcy55ID0gTWF0aC5jZWlsKCB0aGlzLnkgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cm91bmQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9IE1hdGgucm91bmQoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9IE1hdGgucm91bmQoIHRoaXMueSApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRyb3VuZFRvWmVybzogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gKCB0aGlzLnggPCAwICkgPyBNYXRoLmNlaWwoIHRoaXMueCApIDogTWF0aC5mbG9vciggdGhpcy54ICk7XG5cdFx0dGhpcy55ID0gKCB0aGlzLnkgPCAwICkgPyBNYXRoLmNlaWwoIHRoaXMueSApIDogTWF0aC5mbG9vciggdGhpcy55ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG5lZ2F0ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gLSB0aGlzLng7XG5cdFx0dGhpcy55ID0gLSB0aGlzLnk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGRvdDogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0cmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueTtcblxuXHR9LFxuXG5cdGxlbmd0aFNxOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55O1xuXG5cdH0sXG5cblx0bGVuZ3RoOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gTWF0aC5zcXJ0KCB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkgKTtcblxuXHR9LFxuXG5cdG5vcm1hbGl6ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuZGl2aWRlU2NhbGFyKCB0aGlzLmxlbmd0aCgpICk7XG5cblx0fSxcblxuXHRkaXN0YW5jZVRvOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRyZXR1cm4gTWF0aC5zcXJ0KCB0aGlzLmRpc3RhbmNlVG9TcXVhcmVkKCB2ICkgKTtcblxuXHR9LFxuXG5cdGRpc3RhbmNlVG9TcXVhcmVkOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHR2YXIgZHggPSB0aGlzLnggLSB2LngsIGR5ID0gdGhpcy55IC0gdi55O1xuXHRcdHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcblxuXHR9LFxuXG5cdHNldExlbmd0aDogZnVuY3Rpb24gKCBsICkge1xuXG5cdFx0dmFyIG9sZExlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XG5cblx0XHRpZiAoIG9sZExlbmd0aCAhPT0gMCAmJiBsICE9PSBvbGRMZW5ndGggKSB7XG5cblx0XHRcdHRoaXMubXVsdGlwbHlTY2FsYXIoIGwgLyBvbGRMZW5ndGggKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGxlcnA6IGZ1bmN0aW9uICggdiwgYWxwaGEgKSB7XG5cblx0XHR0aGlzLnggKz0gKCB2LnggLSB0aGlzLnggKSAqIGFscGhhO1xuXHRcdHRoaXMueSArPSAoIHYueSAtIHRoaXMueSApICogYWxwaGE7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGxlcnBWZWN0b3JzOiBmdW5jdGlvbiAoIHYxLCB2MiwgYWxwaGEgKSB7XG5cblx0XHR0aGlzLnN1YlZlY3RvcnMoIHYyLCB2MSApLm11bHRpcGx5U2NhbGFyKCBhbHBoYSApLmFkZCggdjEgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZXF1YWxzOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRyZXR1cm4gKCAoIHYueCA9PT0gdGhpcy54ICkgJiYgKCB2LnkgPT09IHRoaXMueSApICk7XG5cblx0fSxcblxuXHRmcm9tQXJyYXk6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0dGhpcy54ID0gYXJyYXlbIG9mZnNldCBdO1xuXHRcdHRoaXMueSA9IGFycmF5WyBvZmZzZXQgKyAxIF07XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdGlmICggYXJyYXkgPT09IHVuZGVmaW5lZCApIGFycmF5ID0gW107XG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHRhcnJheVsgb2Zmc2V0IF0gPSB0aGlzLng7XG5cdFx0YXJyYXlbIG9mZnNldCArIDEgXSA9IHRoaXMueTtcblxuXHRcdHJldHVybiBhcnJheTtcblxuXHR9LFxuXG5cdGZyb21BdHRyaWJ1dGU6IGZ1bmN0aW9uICggYXR0cmlidXRlLCBpbmRleCwgb2Zmc2V0ICkge1xuXG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHRpbmRleCA9IGluZGV4ICogYXR0cmlidXRlLml0ZW1TaXplICsgb2Zmc2V0O1xuXG5cdFx0dGhpcy54ID0gYXR0cmlidXRlLmFycmF5WyBpbmRleCBdO1xuXHRcdHRoaXMueSA9IGF0dHJpYnV0ZS5hcnJheVsgaW5kZXggKyAxIF07XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjIoIHRoaXMueCwgdGhpcy55ICk7XG5cblx0fVxuXG59O1xuXG4vLyBGaWxlOnNyYy9tYXRoL1ZlY3RvcjMuanNcblxuLyoqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICogQGF1dGhvciAqa2lsZSAvIGh0dHA6Ly9raWxlLnN0cmF2YWdhbnphLm9yZy9cbiAqIEBhdXRob3IgcGhpbG9nYiAvIGh0dHA6Ly9ibG9nLnRoZWppdC5vcmcvXG4gKiBAYXV0aG9yIG1pa2FlbCBlbXRpbmdlciAvIGh0dHA6Ly9nb21vLnNlL1xuICogQGF1dGhvciBlZ3JhZXRoZXIgLyBodHRwOi8vZWdyYWV0aGVyLmNvbS9cbiAqIEBhdXRob3IgV2VzdExhbmdsZXkgLyBodHRwOi8vZ2l0aHViLmNvbS9XZXN0TGFuZ2xleVxuICovXG5cblRIUkVFLlZlY3RvcjMgPSBmdW5jdGlvbiAoIHgsIHksIHogKSB7XG5cblx0dGhpcy54ID0geCB8fCAwO1xuXHR0aGlzLnkgPSB5IHx8IDA7XG5cdHRoaXMueiA9IHogfHwgMDtcblxufTtcblxuVEhSRUUuVmVjdG9yMy5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IFRIUkVFLlZlY3RvcjMsXG5cblx0c2V0OiBmdW5jdGlvbiAoIHgsIHksIHogKSB7XG5cblx0XHR0aGlzLnggPSB4O1xuXHRcdHRoaXMueSA9IHk7XG5cdFx0dGhpcy56ID0gejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0WDogZnVuY3Rpb24gKCB4ICkge1xuXG5cdFx0dGhpcy54ID0geDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0WTogZnVuY3Rpb24gKCB5ICkge1xuXG5cdFx0dGhpcy55ID0geTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0WjogZnVuY3Rpb24gKCB6ICkge1xuXG5cdFx0dGhpcy56ID0gejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0Q29tcG9uZW50OiBmdW5jdGlvbiAoIGluZGV4LCB2YWx1ZSApIHtcblxuXHRcdHN3aXRjaCAoIGluZGV4ICkge1xuXG5cdFx0XHRjYXNlIDA6IHRoaXMueCA9IHZhbHVlOyBicmVhaztcblx0XHRcdGNhc2UgMTogdGhpcy55ID0gdmFsdWU7IGJyZWFrO1xuXHRcdFx0Y2FzZSAyOiB0aGlzLnogPSB2YWx1ZTsgYnJlYWs7XG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoICdpbmRleCBpcyBvdXQgb2YgcmFuZ2U6ICcgKyBpbmRleCApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Z2V0Q29tcG9uZW50OiBmdW5jdGlvbiAoIGluZGV4ICkge1xuXG5cdFx0c3dpdGNoICggaW5kZXggKSB7XG5cblx0XHRcdGNhc2UgMDogcmV0dXJuIHRoaXMueDtcblx0XHRcdGNhc2UgMTogcmV0dXJuIHRoaXMueTtcblx0XHRcdGNhc2UgMjogcmV0dXJuIHRoaXMuejtcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvciggJ2luZGV4IGlzIG91dCBvZiByYW5nZTogJyArIGluZGV4ICk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRjb3B5OiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHR0aGlzLnggPSB2Lng7XG5cdFx0dGhpcy55ID0gdi55O1xuXHRcdHRoaXMueiA9IHYuejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YWRkOiBmdW5jdGlvbiAoIHYsIHcgKSB7XG5cblx0XHRpZiAoIHcgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVmVjdG9yMzogLmFkZCgpIG5vdyBvbmx5IGFjY2VwdHMgb25lIGFyZ3VtZW50LiBVc2UgLmFkZFZlY3RvcnMoIGEsIGIgKSBpbnN0ZWFkLicgKTtcblx0XHRcdHJldHVybiB0aGlzLmFkZFZlY3RvcnMoIHYsIHcgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMueCArPSB2Lng7XG5cdFx0dGhpcy55ICs9IHYueTtcblx0XHR0aGlzLnogKz0gdi56O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhZGRTY2FsYXI6IGZ1bmN0aW9uICggcyApIHtcblxuXHRcdHRoaXMueCArPSBzO1xuXHRcdHRoaXMueSArPSBzO1xuXHRcdHRoaXMueiArPSBzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhZGRWZWN0b3JzOiBmdW5jdGlvbiAoIGEsIGIgKSB7XG5cblx0XHR0aGlzLnggPSBhLnggKyBiLng7XG5cdFx0dGhpcy55ID0gYS55ICsgYi55O1xuXHRcdHRoaXMueiA9IGEueiArIGIuejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3ViOiBmdW5jdGlvbiAoIHYsIHcgKSB7XG5cblx0XHRpZiAoIHcgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVmVjdG9yMzogLnN1YigpIG5vdyBvbmx5IGFjY2VwdHMgb25lIGFyZ3VtZW50LiBVc2UgLnN1YlZlY3RvcnMoIGEsIGIgKSBpbnN0ZWFkLicgKTtcblx0XHRcdHJldHVybiB0aGlzLnN1YlZlY3RvcnMoIHYsIHcgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMueCAtPSB2Lng7XG5cdFx0dGhpcy55IC09IHYueTtcblx0XHR0aGlzLnogLT0gdi56O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblx0XG5cdHN1YlNjYWxhcjogZnVuY3Rpb24gKCBzICkge1xuXG5cdFx0dGhpcy54IC09IHM7XG5cdFx0dGhpcy55IC09IHM7XG5cdFx0dGhpcy56IC09IHM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN1YlZlY3RvcnM6IGZ1bmN0aW9uICggYSwgYiApIHtcblxuXHRcdHRoaXMueCA9IGEueCAtIGIueDtcblx0XHR0aGlzLnkgPSBhLnkgLSBiLnk7XG5cdFx0dGhpcy56ID0gYS56IC0gYi56O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtdWx0aXBseTogZnVuY3Rpb24gKCB2LCB3ICkge1xuXG5cdFx0aWYgKCB3ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZlY3RvcjM6IC5tdWx0aXBseSgpIG5vdyBvbmx5IGFjY2VwdHMgb25lIGFyZ3VtZW50LiBVc2UgLm11bHRpcGx5VmVjdG9ycyggYSwgYiApIGluc3RlYWQuJyApO1xuXHRcdFx0cmV0dXJuIHRoaXMubXVsdGlwbHlWZWN0b3JzKCB2LCB3ICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnggKj0gdi54O1xuXHRcdHRoaXMueSAqPSB2Lnk7XG5cdFx0dGhpcy56ICo9IHYuejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlTY2FsYXI6IGZ1bmN0aW9uICggc2NhbGFyICkge1xuXG5cdFx0dGhpcy54ICo9IHNjYWxhcjtcblx0XHR0aGlzLnkgKj0gc2NhbGFyO1xuXHRcdHRoaXMueiAqPSBzY2FsYXI7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5VmVjdG9yczogZnVuY3Rpb24gKCBhLCBiICkge1xuXG5cdFx0dGhpcy54ID0gYS54ICogYi54O1xuXHRcdHRoaXMueSA9IGEueSAqIGIueTtcblx0XHR0aGlzLnogPSBhLnogKiBiLno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFwcGx5RXVsZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBxdWF0ZXJuaW9uO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggZXVsZXIgKSB7XG5cblx0XHRcdGlmICggZXVsZXIgaW5zdGFuY2VvZiBUSFJFRS5FdWxlciA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLlZlY3RvcjM6IC5hcHBseUV1bGVyKCkgbm93IGV4cGVjdHMgYSBFdWxlciByb3RhdGlvbiByYXRoZXIgdGhhbiBhIFZlY3RvcjMgYW5kIG9yZGVyLicgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHF1YXRlcm5pb24gPT09IHVuZGVmaW5lZCApIHF1YXRlcm5pb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5cdFx0XHR0aGlzLmFwcGx5UXVhdGVybmlvbiggcXVhdGVybmlvbi5zZXRGcm9tRXVsZXIoIGV1bGVyICkgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRhcHBseUF4aXNBbmdsZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHF1YXRlcm5pb247XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBheGlzLCBhbmdsZSApIHtcblxuXHRcdFx0aWYgKCBxdWF0ZXJuaW9uID09PSB1bmRlZmluZWQgKSBxdWF0ZXJuaW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuXHRcdFx0dGhpcy5hcHBseVF1YXRlcm5pb24oIHF1YXRlcm5pb24uc2V0RnJvbUF4aXNBbmdsZSggYXhpcywgYW5nbGUgKSApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGFwcGx5TWF0cml4MzogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0dmFyIHggPSB0aGlzLng7XG5cdFx0dmFyIHkgPSB0aGlzLnk7XG5cdFx0dmFyIHogPSB0aGlzLno7XG5cblx0XHR2YXIgZSA9IG0uZWxlbWVudHM7XG5cblx0XHR0aGlzLnggPSBlWyAwIF0gKiB4ICsgZVsgMyBdICogeSArIGVbIDYgXSAqIHo7XG5cdFx0dGhpcy55ID0gZVsgMSBdICogeCArIGVbIDQgXSAqIHkgKyBlWyA3IF0gKiB6O1xuXHRcdHRoaXMueiA9IGVbIDIgXSAqIHggKyBlWyA1IF0gKiB5ICsgZVsgOCBdICogejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YXBwbHlNYXRyaXg0OiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHQvLyBpbnB1dDogVEhSRUUuTWF0cml4NCBhZmZpbmUgbWF0cml4XG5cblx0XHR2YXIgeCA9IHRoaXMueCwgeSA9IHRoaXMueSwgeiA9IHRoaXMuejtcblxuXHRcdHZhciBlID0gbS5lbGVtZW50cztcblxuXHRcdHRoaXMueCA9IGVbIDAgXSAqIHggKyBlWyA0IF0gKiB5ICsgZVsgOCBdICAqIHogKyBlWyAxMiBdO1xuXHRcdHRoaXMueSA9IGVbIDEgXSAqIHggKyBlWyA1IF0gKiB5ICsgZVsgOSBdICAqIHogKyBlWyAxMyBdO1xuXHRcdHRoaXMueiA9IGVbIDIgXSAqIHggKyBlWyA2IF0gKiB5ICsgZVsgMTAgXSAqIHogKyBlWyAxNCBdO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhcHBseVByb2plY3Rpb246IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdC8vIGlucHV0OiBUSFJFRS5NYXRyaXg0IHByb2plY3Rpb24gbWF0cml4XG5cblx0XHR2YXIgeCA9IHRoaXMueCwgeSA9IHRoaXMueSwgeiA9IHRoaXMuejtcblxuXHRcdHZhciBlID0gbS5lbGVtZW50cztcblx0XHR2YXIgZCA9IDEgLyAoIGVbIDMgXSAqIHggKyBlWyA3IF0gKiB5ICsgZVsgMTEgXSAqIHogKyBlWyAxNSBdICk7IC8vIHBlcnNwZWN0aXZlIGRpdmlkZVxuXG5cdFx0dGhpcy54ID0gKCBlWyAwIF0gKiB4ICsgZVsgNCBdICogeSArIGVbIDggXSAgKiB6ICsgZVsgMTIgXSApICogZDtcblx0XHR0aGlzLnkgPSAoIGVbIDEgXSAqIHggKyBlWyA1IF0gKiB5ICsgZVsgOSBdICAqIHogKyBlWyAxMyBdICkgKiBkO1xuXHRcdHRoaXMueiA9ICggZVsgMiBdICogeCArIGVbIDYgXSAqIHkgKyBlWyAxMCBdICogeiArIGVbIDE0IF0gKSAqIGQ7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFwcGx5UXVhdGVybmlvbjogZnVuY3Rpb24gKCBxICkge1xuXG5cdFx0dmFyIHggPSB0aGlzLng7XG5cdFx0dmFyIHkgPSB0aGlzLnk7XG5cdFx0dmFyIHogPSB0aGlzLno7XG5cblx0XHR2YXIgcXggPSBxLng7XG5cdFx0dmFyIHF5ID0gcS55O1xuXHRcdHZhciBxeiA9IHEuejtcblx0XHR2YXIgcXcgPSBxLnc7XG5cblx0XHQvLyBjYWxjdWxhdGUgcXVhdCAqIHZlY3RvclxuXG5cdFx0dmFyIGl4ID0gIHF3ICogeCArIHF5ICogeiAtIHF6ICogeTtcblx0XHR2YXIgaXkgPSAgcXcgKiB5ICsgcXogKiB4IC0gcXggKiB6O1xuXHRcdHZhciBpeiA9ICBxdyAqIHogKyBxeCAqIHkgLSBxeSAqIHg7XG5cdFx0dmFyIGl3ID0gLSBxeCAqIHggLSBxeSAqIHkgLSBxeiAqIHo7XG5cblx0XHQvLyBjYWxjdWxhdGUgcmVzdWx0ICogaW52ZXJzZSBxdWF0XG5cblx0XHR0aGlzLnggPSBpeCAqIHF3ICsgaXcgKiAtIHF4ICsgaXkgKiAtIHF6IC0gaXogKiAtIHF5O1xuXHRcdHRoaXMueSA9IGl5ICogcXcgKyBpdyAqIC0gcXkgKyBpeiAqIC0gcXggLSBpeCAqIC0gcXo7XG5cdFx0dGhpcy56ID0gaXogKiBxdyArIGl3ICogLSBxeiArIGl4ICogLSBxeSAtIGl5ICogLSBxeDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cHJvamVjdDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIG1hdHJpeDtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIGNhbWVyYSApIHtcblxuXHRcdFx0aWYgKCBtYXRyaXggPT09IHVuZGVmaW5lZCApIG1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cblx0XHRcdG1hdHJpeC5tdWx0aXBseU1hdHJpY2VzKCBjYW1lcmEucHJvamVjdGlvbk1hdHJpeCwgbWF0cml4LmdldEludmVyc2UoIGNhbWVyYS5tYXRyaXhXb3JsZCApICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5hcHBseVByb2plY3Rpb24oIG1hdHJpeCApO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0dW5wcm9qZWN0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgbWF0cml4O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggY2FtZXJhICkge1xuXG5cdFx0XHRpZiAoIG1hdHJpeCA9PT0gdW5kZWZpbmVkICkgbWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuXHRcdFx0bWF0cml4Lm11bHRpcGx5TWF0cmljZXMoIGNhbWVyYS5tYXRyaXhXb3JsZCwgbWF0cml4LmdldEludmVyc2UoIGNhbWVyYS5wcm9qZWN0aW9uTWF0cml4ICkgKTtcblx0XHRcdHJldHVybiB0aGlzLmFwcGx5UHJvamVjdGlvbiggbWF0cml4ICk7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHR0cmFuc2Zvcm1EaXJlY3Rpb246IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdC8vIGlucHV0OiBUSFJFRS5NYXRyaXg0IGFmZmluZSBtYXRyaXhcblx0XHQvLyB2ZWN0b3IgaW50ZXJwcmV0ZWQgYXMgYSBkaXJlY3Rpb25cblxuXHRcdHZhciB4ID0gdGhpcy54LCB5ID0gdGhpcy55LCB6ID0gdGhpcy56O1xuXG5cdFx0dmFyIGUgPSBtLmVsZW1lbnRzO1xuXG5cdFx0dGhpcy54ID0gZVsgMCBdICogeCArIGVbIDQgXSAqIHkgKyBlWyA4IF0gICogejtcblx0XHR0aGlzLnkgPSBlWyAxIF0gKiB4ICsgZVsgNSBdICogeSArIGVbIDkgXSAgKiB6O1xuXHRcdHRoaXMueiA9IGVbIDIgXSAqIHggKyBlWyA2IF0gKiB5ICsgZVsgMTAgXSAqIHo7XG5cblx0XHR0aGlzLm5vcm1hbGl6ZSgpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRkaXZpZGU6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHRoaXMueCAvPSB2Lng7XG5cdFx0dGhpcy55IC89IHYueTtcblx0XHR0aGlzLnogLz0gdi56O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRkaXZpZGVTY2FsYXI6IGZ1bmN0aW9uICggc2NhbGFyICkge1xuXG5cdFx0aWYgKCBzY2FsYXIgIT09IDAgKSB7XG5cblx0XHRcdHZhciBpbnZTY2FsYXIgPSAxIC8gc2NhbGFyO1xuXG5cdFx0XHR0aGlzLnggKj0gaW52U2NhbGFyO1xuXHRcdFx0dGhpcy55ICo9IGludlNjYWxhcjtcblx0XHRcdHRoaXMueiAqPSBpbnZTY2FsYXI7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLnggPSAwO1xuXHRcdFx0dGhpcy55ID0gMDtcblx0XHRcdHRoaXMueiA9IDA7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1pbjogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0aWYgKCB0aGlzLnggPiB2LnggKSB7XG5cblx0XHRcdHRoaXMueCA9IHYueDtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy55ID4gdi55ICkge1xuXG5cdFx0XHR0aGlzLnkgPSB2Lnk7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMueiA+IHYueiApIHtcblxuXHRcdFx0dGhpcy56ID0gdi56O1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtYXg6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdGlmICggdGhpcy54IDwgdi54ICkge1xuXG5cdFx0XHR0aGlzLnggPSB2Lng7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMueSA8IHYueSApIHtcblxuXHRcdFx0dGhpcy55ID0gdi55O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnogPCB2LnogKSB7XG5cblx0XHRcdHRoaXMueiA9IHYuejtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2xhbXA6IGZ1bmN0aW9uICggbWluLCBtYXggKSB7XG5cblx0XHQvLyBUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgbWluIDwgbWF4LCBpZiB0aGlzIGFzc3VtcHRpb24gaXNuJ3QgdHJ1ZSBpdCB3aWxsIG5vdCBvcGVyYXRlIGNvcnJlY3RseVxuXG5cdFx0aWYgKCB0aGlzLnggPCBtaW4ueCApIHtcblxuXHRcdFx0dGhpcy54ID0gbWluLng7XG5cblx0XHR9IGVsc2UgaWYgKCB0aGlzLnggPiBtYXgueCApIHtcblxuXHRcdFx0dGhpcy54ID0gbWF4Lng7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMueSA8IG1pbi55ICkge1xuXG5cdFx0XHR0aGlzLnkgPSBtaW4ueTtcblxuXHRcdH0gZWxzZSBpZiAoIHRoaXMueSA+IG1heC55ICkge1xuXG5cdFx0XHR0aGlzLnkgPSBtYXgueTtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy56IDwgbWluLnogKSB7XG5cblx0XHRcdHRoaXMueiA9IG1pbi56O1xuXG5cdFx0fSBlbHNlIGlmICggdGhpcy56ID4gbWF4LnogKSB7XG5cblx0XHRcdHRoaXMueiA9IG1heC56O1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjbGFtcFNjYWxhcjogKCBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgbWluLCBtYXg7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBtaW5WYWwsIG1heFZhbCApIHtcblxuXHRcdFx0aWYgKCBtaW4gPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRtaW4gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0XHRtYXggPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0XHR9XG5cblx0XHRcdG1pbi5zZXQoIG1pblZhbCwgbWluVmFsLCBtaW5WYWwgKTtcblx0XHRcdG1heC5zZXQoIG1heFZhbCwgbWF4VmFsLCBtYXhWYWwgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXMuY2xhbXAoIG1pbiwgbWF4ICk7XG5cblx0XHR9O1xuXG5cdH0gKSgpLFxuXG5cdGZsb29yOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnggPSBNYXRoLmZsb29yKCB0aGlzLnggKTtcblx0XHR0aGlzLnkgPSBNYXRoLmZsb29yKCB0aGlzLnkgKTtcblx0XHR0aGlzLnogPSBNYXRoLmZsb29yKCB0aGlzLnogKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2VpbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gTWF0aC5jZWlsKCB0aGlzLnggKTtcblx0XHR0aGlzLnkgPSBNYXRoLmNlaWwoIHRoaXMueSApO1xuXHRcdHRoaXMueiA9IE1hdGguY2VpbCggdGhpcy56ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHJvdW5kOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnggPSBNYXRoLnJvdW5kKCB0aGlzLnggKTtcblx0XHR0aGlzLnkgPSBNYXRoLnJvdW5kKCB0aGlzLnkgKTtcblx0XHR0aGlzLnogPSBNYXRoLnJvdW5kKCB0aGlzLnogKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cm91bmRUb1plcm86IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9ICggdGhpcy54IDwgMCApID8gTWF0aC5jZWlsKCB0aGlzLnggKSA6IE1hdGguZmxvb3IoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9ICggdGhpcy55IDwgMCApID8gTWF0aC5jZWlsKCB0aGlzLnkgKSA6IE1hdGguZmxvb3IoIHRoaXMueSApO1xuXHRcdHRoaXMueiA9ICggdGhpcy56IDwgMCApID8gTWF0aC5jZWlsKCB0aGlzLnogKSA6IE1hdGguZmxvb3IoIHRoaXMueiApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRuZWdhdGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9IC0gdGhpcy54O1xuXHRcdHRoaXMueSA9IC0gdGhpcy55O1xuXHRcdHRoaXMueiA9IC0gdGhpcy56O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRkb3Q6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2LnkgKyB0aGlzLnogKiB2Lno7XG5cblx0fSxcblxuXHRsZW5ndGhTcTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSArIHRoaXMueiAqIHRoaXMuejtcblxuXHR9LFxuXG5cdGxlbmd0aDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIE1hdGguc3FydCggdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICsgdGhpcy56ICogdGhpcy56ICk7XG5cblx0fSxcblxuXHRsZW5ndGhNYW5oYXR0YW46IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBNYXRoLmFicyggdGhpcy54ICkgKyBNYXRoLmFicyggdGhpcy55ICkgKyBNYXRoLmFicyggdGhpcy56ICk7XG5cblx0fSxcblxuXHRub3JtYWxpemU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLmRpdmlkZVNjYWxhciggdGhpcy5sZW5ndGgoKSApO1xuXG5cdH0sXG5cblx0c2V0TGVuZ3RoOiBmdW5jdGlvbiAoIGwgKSB7XG5cblx0XHR2YXIgb2xkTGVuZ3RoID0gdGhpcy5sZW5ndGgoKTtcblxuXHRcdGlmICggb2xkTGVuZ3RoICE9PSAwICYmIGwgIT09IG9sZExlbmd0aCAgKSB7XG5cblx0XHRcdHRoaXMubXVsdGlwbHlTY2FsYXIoIGwgLyBvbGRMZW5ndGggKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGxlcnA6IGZ1bmN0aW9uICggdiwgYWxwaGEgKSB7XG5cblx0XHR0aGlzLnggKz0gKCB2LnggLSB0aGlzLnggKSAqIGFscGhhO1xuXHRcdHRoaXMueSArPSAoIHYueSAtIHRoaXMueSApICogYWxwaGE7XG5cdFx0dGhpcy56ICs9ICggdi56IC0gdGhpcy56ICkgKiBhbHBoYTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bGVycFZlY3RvcnM6IGZ1bmN0aW9uICggdjEsIHYyLCBhbHBoYSApIHtcblxuXHRcdHRoaXMuc3ViVmVjdG9ycyggdjIsIHYxICkubXVsdGlwbHlTY2FsYXIoIGFscGhhICkuYWRkKCB2MSApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjcm9zczogZnVuY3Rpb24gKCB2LCB3ICkge1xuXG5cdFx0aWYgKCB3ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZlY3RvcjM6IC5jcm9zcygpIG5vdyBvbmx5IGFjY2VwdHMgb25lIGFyZ3VtZW50LiBVc2UgLmNyb3NzVmVjdG9ycyggYSwgYiApIGluc3RlYWQuJyApO1xuXHRcdFx0cmV0dXJuIHRoaXMuY3Jvc3NWZWN0b3JzKCB2LCB3ICk7XG5cblx0XHR9XG5cblx0XHR2YXIgeCA9IHRoaXMueCwgeSA9IHRoaXMueSwgeiA9IHRoaXMuejtcblxuXHRcdHRoaXMueCA9IHkgKiB2LnogLSB6ICogdi55O1xuXHRcdHRoaXMueSA9IHogKiB2LnggLSB4ICogdi56O1xuXHRcdHRoaXMueiA9IHggKiB2LnkgLSB5ICogdi54O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjcm9zc1ZlY3RvcnM6IGZ1bmN0aW9uICggYSwgYiApIHtcblxuXHRcdHZhciBheCA9IGEueCwgYXkgPSBhLnksIGF6ID0gYS56O1xuXHRcdHZhciBieCA9IGIueCwgYnkgPSBiLnksIGJ6ID0gYi56O1xuXG5cdFx0dGhpcy54ID0gYXkgKiBieiAtIGF6ICogYnk7XG5cdFx0dGhpcy55ID0gYXogKiBieCAtIGF4ICogYno7XG5cdFx0dGhpcy56ID0gYXggKiBieSAtIGF5ICogYng7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHByb2plY3RPblZlY3RvcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYxLCBkb3Q7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCB2ZWN0b3IgKSB7XG5cblx0XHRcdGlmICggdjEgPT09IHVuZGVmaW5lZCApIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdFx0djEuY29weSggdmVjdG9yICkubm9ybWFsaXplKCk7XG5cblx0XHRcdGRvdCA9IHRoaXMuZG90KCB2MSApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5jb3B5KCB2MSApLm11bHRpcGx5U2NhbGFyKCBkb3QgKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdHByb2plY3RPblBsYW5lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdjE7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBwbGFuZU5vcm1hbCApIHtcblxuXHRcdFx0aWYgKCB2MSA9PT0gdW5kZWZpbmVkICkgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0XHR2MS5jb3B5KCB0aGlzICkucHJvamVjdE9uVmVjdG9yKCBwbGFuZU5vcm1hbCApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5zdWIoIHYxICk7XG5cblx0XHR9XG5cblx0fSgpLFxuXG5cdHJlZmxlY3Q6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIHJlZmxlY3QgaW5jaWRlbnQgdmVjdG9yIG9mZiBwbGFuZSBvcnRob2dvbmFsIHRvIG5vcm1hbFxuXHRcdC8vIG5vcm1hbCBpcyBhc3N1bWVkIHRvIGhhdmUgdW5pdCBsZW5ndGhcblxuXHRcdHZhciB2MTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIG5vcm1hbCApIHtcblxuXHRcdFx0aWYgKCB2MSA9PT0gdW5kZWZpbmVkICkgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5zdWIoIHYxLmNvcHkoIG5vcm1hbCApLm11bHRpcGx5U2NhbGFyKCAyICogdGhpcy5kb3QoIG5vcm1hbCApICkgKTtcblxuXHRcdH1cblxuXHR9KCksXG5cblx0YW5nbGVUbzogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0dmFyIHRoZXRhID0gdGhpcy5kb3QoIHYgKSAvICggdGhpcy5sZW5ndGgoKSAqIHYubGVuZ3RoKCkgKTtcblxuXHRcdC8vIGNsYW1wLCB0byBoYW5kbGUgbnVtZXJpY2FsIHByb2JsZW1zXG5cblx0XHRyZXR1cm4gTWF0aC5hY29zKCBUSFJFRS5NYXRoLmNsYW1wKCB0aGV0YSwgLSAxLCAxICkgKTtcblxuXHR9LFxuXG5cdGRpc3RhbmNlVG86IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHJldHVybiBNYXRoLnNxcnQoIHRoaXMuZGlzdGFuY2VUb1NxdWFyZWQoIHYgKSApO1xuXG5cdH0sXG5cblx0ZGlzdGFuY2VUb1NxdWFyZWQ6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHZhciBkeCA9IHRoaXMueCAtIHYueDtcblx0XHR2YXIgZHkgPSB0aGlzLnkgLSB2Lnk7XG5cdFx0dmFyIGR6ID0gdGhpcy56IC0gdi56O1xuXG5cdFx0cmV0dXJuIGR4ICogZHggKyBkeSAqIGR5ICsgZHogKiBkejtcblxuXHR9LFxuXG5cdHNldEV1bGVyRnJvbVJvdGF0aW9uTWF0cml4OiBmdW5jdGlvbiAoIG0sIG9yZGVyICkge1xuXG5cdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLlZlY3RvcjM6IC5zZXRFdWxlckZyb21Sb3RhdGlvbk1hdHJpeCgpIGhhcyBiZWVuIHJlbW92ZWQuIFVzZSBFdWxlci5zZXRGcm9tUm90YXRpb25NYXRyaXgoKSBpbnN0ZWFkLicgKTtcblxuXHR9LFxuXG5cdHNldEV1bGVyRnJvbVF1YXRlcm5pb246IGZ1bmN0aW9uICggcSwgb3JkZXIgKSB7XG5cblx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuVmVjdG9yMzogLnNldEV1bGVyRnJvbVF1YXRlcm5pb24oKSBoYXMgYmVlbiByZW1vdmVkLiBVc2UgRXVsZXIuc2V0RnJvbVF1YXRlcm5pb24oKSBpbnN0ZWFkLicgKTtcblxuXHR9LFxuXG5cdGdldFBvc2l0aW9uRnJvbU1hdHJpeDogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVmVjdG9yMzogLmdldFBvc2l0aW9uRnJvbU1hdHJpeCgpIGhhcyBiZWVuIHJlbmFtZWQgdG8gLnNldEZyb21NYXRyaXhQb3NpdGlvbigpLicgKTtcblxuXHRcdHJldHVybiB0aGlzLnNldEZyb21NYXRyaXhQb3NpdGlvbiggbSApO1xuXG5cdH0sXG5cblx0Z2V0U2NhbGVGcm9tTWF0cml4OiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WZWN0b3IzOiAuZ2V0U2NhbGVGcm9tTWF0cml4KCkgaGFzIGJlZW4gcmVuYW1lZCB0byAuc2V0RnJvbU1hdHJpeFNjYWxlKCkuJyApO1xuXG5cdFx0cmV0dXJuIHRoaXMuc2V0RnJvbU1hdHJpeFNjYWxlKCBtICk7XG5cdH0sXG5cblx0Z2V0Q29sdW1uRnJvbU1hdHJpeDogZnVuY3Rpb24gKCBpbmRleCwgbWF0cml4ICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVmVjdG9yMzogLmdldENvbHVtbkZyb21NYXRyaXgoKSBoYXMgYmVlbiByZW5hbWVkIHRvIC5zZXRGcm9tTWF0cml4Q29sdW1uKCkuJyApO1xuXG5cdFx0cmV0dXJuIHRoaXMuc2V0RnJvbU1hdHJpeENvbHVtbiggaW5kZXgsIG1hdHJpeCApO1xuXG5cdH0sXG5cblx0c2V0RnJvbU1hdHJpeFBvc2l0aW9uOiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHR0aGlzLnggPSBtLmVsZW1lbnRzWyAxMiBdO1xuXHRcdHRoaXMueSA9IG0uZWxlbWVudHNbIDEzIF07XG5cdFx0dGhpcy56ID0gbS5lbGVtZW50c1sgMTQgXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbU1hdHJpeFNjYWxlOiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHR2YXIgc3ggPSB0aGlzLnNldCggbS5lbGVtZW50c1sgMCBdLCBtLmVsZW1lbnRzWyAxIF0sIG0uZWxlbWVudHNbICAyIF0gKS5sZW5ndGgoKTtcblx0XHR2YXIgc3kgPSB0aGlzLnNldCggbS5lbGVtZW50c1sgNCBdLCBtLmVsZW1lbnRzWyA1IF0sIG0uZWxlbWVudHNbICA2IF0gKS5sZW5ndGgoKTtcblx0XHR2YXIgc3ogPSB0aGlzLnNldCggbS5lbGVtZW50c1sgOCBdLCBtLmVsZW1lbnRzWyA5IF0sIG0uZWxlbWVudHNbIDEwIF0gKS5sZW5ndGgoKTtcblxuXHRcdHRoaXMueCA9IHN4O1xuXHRcdHRoaXMueSA9IHN5O1xuXHRcdHRoaXMueiA9IHN6O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0c2V0RnJvbU1hdHJpeENvbHVtbjogZnVuY3Rpb24gKCBpbmRleCwgbWF0cml4ICkge1xuXHRcdFxuXHRcdHZhciBvZmZzZXQgPSBpbmRleCAqIDQ7XG5cblx0XHR2YXIgbWUgPSBtYXRyaXguZWxlbWVudHM7XG5cblx0XHR0aGlzLnggPSBtZVsgb2Zmc2V0IF07XG5cdFx0dGhpcy55ID0gbWVbIG9mZnNldCArIDEgXTtcblx0XHR0aGlzLnogPSBtZVsgb2Zmc2V0ICsgMiBdO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlcXVhbHM6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHJldHVybiAoICggdi54ID09PSB0aGlzLnggKSAmJiAoIHYueSA9PT0gdGhpcy55ICkgJiYgKCB2LnogPT09IHRoaXMueiApICk7XG5cblx0fSxcblxuXHRmcm9tQXJyYXk6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0dGhpcy54ID0gYXJyYXlbIG9mZnNldCBdO1xuXHRcdHRoaXMueSA9IGFycmF5WyBvZmZzZXQgKyAxIF07XG5cdFx0dGhpcy56ID0gYXJyYXlbIG9mZnNldCArIDIgXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dG9BcnJheTogZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0ICkge1xuXG5cdFx0aWYgKCBhcnJheSA9PT0gdW5kZWZpbmVkICkgYXJyYXkgPSBbXTtcblx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblxuXHRcdGFycmF5WyBvZmZzZXQgXSA9IHRoaXMueDtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMSBdID0gdGhpcy55O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAyIF0gPSB0aGlzLno7XG5cblx0XHRyZXR1cm4gYXJyYXk7XG5cblx0fSxcblxuXHRmcm9tQXR0cmlidXRlOiBmdW5jdGlvbiAoIGF0dHJpYnV0ZSwgaW5kZXgsIG9mZnNldCApIHtcblxuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0aW5kZXggPSBpbmRleCAqIGF0dHJpYnV0ZS5pdGVtU2l6ZSArIG9mZnNldDtcblxuXHRcdHRoaXMueCA9IGF0dHJpYnV0ZS5hcnJheVsgaW5kZXggXTtcblx0XHR0aGlzLnkgPSBhdHRyaWJ1dGUuYXJyYXlbIGluZGV4ICsgMSBdO1xuXHRcdHRoaXMueiA9IGF0dHJpYnV0ZS5hcnJheVsgaW5kZXggKyAyIF07XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjMoIHRoaXMueCwgdGhpcy55LCB0aGlzLnogKTtcblxuXHR9XG5cbn07XG5cbi8vIEZpbGU6c3JjL21hdGgvVmVjdG9yNC5qc1xuXG4vKipcbiAqIEBhdXRob3Igc3VwZXJlZ2diZXJ0IC8gaHR0cDovL3d3dy5wYXVsYnJ1bnQuY28udWsvXG4gKiBAYXV0aG9yIHBoaWxvZ2IgLyBodHRwOi8vYmxvZy50aGVqaXQub3JnL1xuICogQGF1dGhvciBtaWthZWwgZW10aW5nZXIgLyBodHRwOi8vZ29tby5zZS9cbiAqIEBhdXRob3IgZWdyYWV0aGVyIC8gaHR0cDovL2VncmFldGhlci5jb20vXG4gKiBAYXV0aG9yIFdlc3RMYW5nbGV5IC8gaHR0cDovL2dpdGh1Yi5jb20vV2VzdExhbmdsZXlcbiAqL1xuXG5USFJFRS5WZWN0b3I0ID0gZnVuY3Rpb24gKCB4LCB5LCB6LCB3ICkge1xuXG5cdHRoaXMueCA9IHggfHwgMDtcblx0dGhpcy55ID0geSB8fCAwO1xuXHR0aGlzLnogPSB6IHx8IDA7XG5cdHRoaXMudyA9ICggdyAhPT0gdW5kZWZpbmVkICkgPyB3IDogMTtcblxufTtcblxuVEhSRUUuVmVjdG9yNC5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IFRIUkVFLlZlY3RvcjQsXG5cblx0c2V0OiBmdW5jdGlvbiAoIHgsIHksIHosIHcgKSB7XG5cblx0XHR0aGlzLnggPSB4O1xuXHRcdHRoaXMueSA9IHk7XG5cdFx0dGhpcy56ID0gejtcblx0XHR0aGlzLncgPSB3O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRYOiBmdW5jdGlvbiAoIHggKSB7XG5cblx0XHR0aGlzLnggPSB4O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRZOiBmdW5jdGlvbiAoIHkgKSB7XG5cblx0XHR0aGlzLnkgPSB5O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRaOiBmdW5jdGlvbiAoIHogKSB7XG5cblx0XHR0aGlzLnogPSB6O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRXOiBmdW5jdGlvbiAoIHcgKSB7XG5cblx0XHR0aGlzLncgPSB3O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRDb21wb25lbnQ6IGZ1bmN0aW9uICggaW5kZXgsIHZhbHVlICkge1xuXG5cdFx0c3dpdGNoICggaW5kZXggKSB7XG5cblx0XHRcdGNhc2UgMDogdGhpcy54ID0gdmFsdWU7IGJyZWFrO1xuXHRcdFx0Y2FzZSAxOiB0aGlzLnkgPSB2YWx1ZTsgYnJlYWs7XG5cdFx0XHRjYXNlIDI6IHRoaXMueiA9IHZhbHVlOyBicmVhaztcblx0XHRcdGNhc2UgMzogdGhpcy53ID0gdmFsdWU7IGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCAnaW5kZXggaXMgb3V0IG9mIHJhbmdlOiAnICsgaW5kZXggKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdGdldENvbXBvbmVudDogZnVuY3Rpb24gKCBpbmRleCApIHtcblxuXHRcdHN3aXRjaCAoIGluZGV4ICkge1xuXG5cdFx0XHRjYXNlIDA6IHJldHVybiB0aGlzLng7XG5cdFx0XHRjYXNlIDE6IHJldHVybiB0aGlzLnk7XG5cdFx0XHRjYXNlIDI6IHJldHVybiB0aGlzLno7XG5cdFx0XHRjYXNlIDM6IHJldHVybiB0aGlzLnc7XG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoICdpbmRleCBpcyBvdXQgb2YgcmFuZ2U6ICcgKyBpbmRleCApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Y29weTogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0dGhpcy54ID0gdi54O1xuXHRcdHRoaXMueSA9IHYueTtcblx0XHR0aGlzLnogPSB2Lno7XG5cdFx0dGhpcy53ID0gKCB2LncgIT09IHVuZGVmaW5lZCApID8gdi53IDogMTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YWRkOiBmdW5jdGlvbiAoIHYsIHcgKSB7XG5cblx0XHRpZiAoIHcgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVmVjdG9yNDogLmFkZCgpIG5vdyBvbmx5IGFjY2VwdHMgb25lIGFyZ3VtZW50LiBVc2UgLmFkZFZlY3RvcnMoIGEsIGIgKSBpbnN0ZWFkLicgKTtcblx0XHRcdHJldHVybiB0aGlzLmFkZFZlY3RvcnMoIHYsIHcgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMueCArPSB2Lng7XG5cdFx0dGhpcy55ICs9IHYueTtcblx0XHR0aGlzLnogKz0gdi56O1xuXHRcdHRoaXMudyArPSB2Lnc7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFkZFNjYWxhcjogZnVuY3Rpb24gKCBzICkge1xuXG5cdFx0dGhpcy54ICs9IHM7XG5cdFx0dGhpcy55ICs9IHM7XG5cdFx0dGhpcy56ICs9IHM7XG5cdFx0dGhpcy53ICs9IHM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFkZFZlY3RvcnM6IGZ1bmN0aW9uICggYSwgYiApIHtcblxuXHRcdHRoaXMueCA9IGEueCArIGIueDtcblx0XHR0aGlzLnkgPSBhLnkgKyBiLnk7XG5cdFx0dGhpcy56ID0gYS56ICsgYi56O1xuXHRcdHRoaXMudyA9IGEudyArIGIudztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3ViOiBmdW5jdGlvbiAoIHYsIHcgKSB7XG5cblx0XHRpZiAoIHcgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVmVjdG9yNDogLnN1YigpIG5vdyBvbmx5IGFjY2VwdHMgb25lIGFyZ3VtZW50LiBVc2UgLnN1YlZlY3RvcnMoIGEsIGIgKSBpbnN0ZWFkLicgKTtcblx0XHRcdHJldHVybiB0aGlzLnN1YlZlY3RvcnMoIHYsIHcgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMueCAtPSB2Lng7XG5cdFx0dGhpcy55IC09IHYueTtcblx0XHR0aGlzLnogLT0gdi56O1xuXHRcdHRoaXMudyAtPSB2Lnc7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN1YlNjYWxhcjogZnVuY3Rpb24gKCBzICkge1xuXG5cdFx0dGhpcy54IC09IHM7XG5cdFx0dGhpcy55IC09IHM7XG5cdFx0dGhpcy56IC09IHM7XG5cdFx0dGhpcy53IC09IHM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN1YlZlY3RvcnM6IGZ1bmN0aW9uICggYSwgYiApIHtcblxuXHRcdHRoaXMueCA9IGEueCAtIGIueDtcblx0XHR0aGlzLnkgPSBhLnkgLSBiLnk7XG5cdFx0dGhpcy56ID0gYS56IC0gYi56O1xuXHRcdHRoaXMudyA9IGEudyAtIGIudztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlTY2FsYXI6IGZ1bmN0aW9uICggc2NhbGFyICkge1xuXG5cdFx0dGhpcy54ICo9IHNjYWxhcjtcblx0XHR0aGlzLnkgKj0gc2NhbGFyO1xuXHRcdHRoaXMueiAqPSBzY2FsYXI7XG5cdFx0dGhpcy53ICo9IHNjYWxhcjtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YXBwbHlNYXRyaXg0OiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHR2YXIgeCA9IHRoaXMueDtcblx0XHR2YXIgeSA9IHRoaXMueTtcblx0XHR2YXIgeiA9IHRoaXMuejtcblx0XHR2YXIgdyA9IHRoaXMudztcblxuXHRcdHZhciBlID0gbS5lbGVtZW50cztcblxuXHRcdHRoaXMueCA9IGVbIDAgXSAqIHggKyBlWyA0IF0gKiB5ICsgZVsgOCBdICogeiArIGVbIDEyIF0gKiB3O1xuXHRcdHRoaXMueSA9IGVbIDEgXSAqIHggKyBlWyA1IF0gKiB5ICsgZVsgOSBdICogeiArIGVbIDEzIF0gKiB3O1xuXHRcdHRoaXMueiA9IGVbIDIgXSAqIHggKyBlWyA2IF0gKiB5ICsgZVsgMTAgXSAqIHogKyBlWyAxNCBdICogdztcblx0XHR0aGlzLncgPSBlWyAzIF0gKiB4ICsgZVsgNyBdICogeSArIGVbIDExIF0gKiB6ICsgZVsgMTUgXSAqIHc7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGRpdmlkZVNjYWxhcjogZnVuY3Rpb24gKCBzY2FsYXIgKSB7XG5cblx0XHRpZiAoIHNjYWxhciAhPT0gMCApIHtcblxuXHRcdFx0dmFyIGludlNjYWxhciA9IDEgLyBzY2FsYXI7XG5cblx0XHRcdHRoaXMueCAqPSBpbnZTY2FsYXI7XG5cdFx0XHR0aGlzLnkgKj0gaW52U2NhbGFyO1xuXHRcdFx0dGhpcy56ICo9IGludlNjYWxhcjtcblx0XHRcdHRoaXMudyAqPSBpbnZTY2FsYXI7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLnggPSAwO1xuXHRcdFx0dGhpcy55ID0gMDtcblx0XHRcdHRoaXMueiA9IDA7XG5cdFx0XHR0aGlzLncgPSAxO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRBeGlzQW5nbGVGcm9tUXVhdGVybmlvbjogZnVuY3Rpb24gKCBxICkge1xuXG5cdFx0Ly8gaHR0cDovL3d3dy5ldWNsaWRlYW5zcGFjZS5jb20vbWF0aHMvZ2VvbWV0cnkvcm90YXRpb25zL2NvbnZlcnNpb25zL3F1YXRlcm5pb25Ub0FuZ2xlL2luZGV4Lmh0bVxuXG5cdFx0Ly8gcSBpcyBhc3N1bWVkIHRvIGJlIG5vcm1hbGl6ZWRcblxuXHRcdHRoaXMudyA9IDIgKiBNYXRoLmFjb3MoIHEudyApO1xuXG5cdFx0dmFyIHMgPSBNYXRoLnNxcnQoIDEgLSBxLncgKiBxLncgKTtcblxuXHRcdGlmICggcyA8IDAuMDAwMSApIHtcblxuXHRcdFx0IHRoaXMueCA9IDE7XG5cdFx0XHQgdGhpcy55ID0gMDtcblx0XHRcdCB0aGlzLnogPSAwO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0IHRoaXMueCA9IHEueCAvIHM7XG5cdFx0XHQgdGhpcy55ID0gcS55IC8gcztcblx0XHRcdCB0aGlzLnogPSBxLnogLyBzO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRBeGlzQW5nbGVGcm9tUm90YXRpb25NYXRyaXg6IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdC8vIGh0dHA6Ly93d3cuZXVjbGlkZWFuc3BhY2UuY29tL21hdGhzL2dlb21ldHJ5L3JvdGF0aW9ucy9jb252ZXJzaW9ucy9tYXRyaXhUb0FuZ2xlL2luZGV4Lmh0bVxuXG5cdFx0Ly8gYXNzdW1lcyB0aGUgdXBwZXIgM3gzIG9mIG0gaXMgYSBwdXJlIHJvdGF0aW9uIG1hdHJpeCAoaS5lLCB1bnNjYWxlZClcblxuXHRcdHZhciBhbmdsZSwgeCwgeSwgeixcdFx0Ly8gdmFyaWFibGVzIGZvciByZXN1bHRcblx0XHRcdGVwc2lsb24gPSAwLjAxLFx0XHQvLyBtYXJnaW4gdG8gYWxsb3cgZm9yIHJvdW5kaW5nIGVycm9yc1xuXHRcdFx0ZXBzaWxvbjIgPSAwLjEsXHRcdC8vIG1hcmdpbiB0byBkaXN0aW5ndWlzaCBiZXR3ZWVuIDAgYW5kIDE4MCBkZWdyZWVzXG5cblx0XHRcdHRlID0gbS5lbGVtZW50cyxcblxuXHRcdFx0bTExID0gdGVbIDAgXSwgbTEyID0gdGVbIDQgXSwgbTEzID0gdGVbIDggXSxcblx0XHRcdG0yMSA9IHRlWyAxIF0sIG0yMiA9IHRlWyA1IF0sIG0yMyA9IHRlWyA5IF0sXG5cdFx0XHRtMzEgPSB0ZVsgMiBdLCBtMzIgPSB0ZVsgNiBdLCBtMzMgPSB0ZVsgMTAgXTtcblxuXHRcdGlmICggKCBNYXRoLmFicyggbTEyIC0gbTIxICkgPCBlcHNpbG9uIClcblx0XHQgICAmJiAoIE1hdGguYWJzKCBtMTMgLSBtMzEgKSA8IGVwc2lsb24gKVxuXHRcdCAgICYmICggTWF0aC5hYnMoIG0yMyAtIG0zMiApIDwgZXBzaWxvbiApICkge1xuXG5cdFx0XHQvLyBzaW5ndWxhcml0eSBmb3VuZFxuXHRcdFx0Ly8gZmlyc3QgY2hlY2sgZm9yIGlkZW50aXR5IG1hdHJpeCB3aGljaCBtdXN0IGhhdmUgKzEgZm9yIGFsbCB0ZXJtc1xuXHRcdFx0Ly8gaW4gbGVhZGluZyBkaWFnb25hbCBhbmQgemVybyBpbiBvdGhlciB0ZXJtc1xuXG5cdFx0XHRpZiAoICggTWF0aC5hYnMoIG0xMiArIG0yMSApIDwgZXBzaWxvbjIgKVxuXHRcdFx0ICAgJiYgKCBNYXRoLmFicyggbTEzICsgbTMxICkgPCBlcHNpbG9uMiApXG5cdFx0XHQgICAmJiAoIE1hdGguYWJzKCBtMjMgKyBtMzIgKSA8IGVwc2lsb24yIClcblx0XHRcdCAgICYmICggTWF0aC5hYnMoIG0xMSArIG0yMiArIG0zMyAtIDMgKSA8IGVwc2lsb24yICkgKSB7XG5cblx0XHRcdFx0Ly8gdGhpcyBzaW5ndWxhcml0eSBpcyBpZGVudGl0eSBtYXRyaXggc28gYW5nbGUgPSAwXG5cblx0XHRcdFx0dGhpcy5zZXQoIDEsIDAsIDAsIDAgKTtcblxuXHRcdFx0XHRyZXR1cm4gdGhpczsgLy8gemVybyBhbmdsZSwgYXJiaXRyYXJ5IGF4aXNcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBvdGhlcndpc2UgdGhpcyBzaW5ndWxhcml0eSBpcyBhbmdsZSA9IDE4MFxuXG5cdFx0XHRhbmdsZSA9IE1hdGguUEk7XG5cblx0XHRcdHZhciB4eCA9ICggbTExICsgMSApIC8gMjtcblx0XHRcdHZhciB5eSA9ICggbTIyICsgMSApIC8gMjtcblx0XHRcdHZhciB6eiA9ICggbTMzICsgMSApIC8gMjtcblx0XHRcdHZhciB4eSA9ICggbTEyICsgbTIxICkgLyA0O1xuXHRcdFx0dmFyIHh6ID0gKCBtMTMgKyBtMzEgKSAvIDQ7XG5cdFx0XHR2YXIgeXogPSAoIG0yMyArIG0zMiApIC8gNDtcblxuXHRcdFx0aWYgKCAoIHh4ID4geXkgKSAmJiAoIHh4ID4genogKSApIHsgLy8gbTExIGlzIHRoZSBsYXJnZXN0IGRpYWdvbmFsIHRlcm1cblxuXHRcdFx0XHRpZiAoIHh4IDwgZXBzaWxvbiApIHtcblxuXHRcdFx0XHRcdHggPSAwO1xuXHRcdFx0XHRcdHkgPSAwLjcwNzEwNjc4MTtcblx0XHRcdFx0XHR6ID0gMC43MDcxMDY3ODE7XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdHggPSBNYXRoLnNxcnQoIHh4ICk7XG5cdFx0XHRcdFx0eSA9IHh5IC8geDtcblx0XHRcdFx0XHR6ID0geHogLyB4O1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIGlmICggeXkgPiB6eiApIHsgLy8gbTIyIGlzIHRoZSBsYXJnZXN0IGRpYWdvbmFsIHRlcm1cblxuXHRcdFx0XHRpZiAoIHl5IDwgZXBzaWxvbiApIHtcblxuXHRcdFx0XHRcdHggPSAwLjcwNzEwNjc4MTtcblx0XHRcdFx0XHR5ID0gMDtcblx0XHRcdFx0XHR6ID0gMC43MDcxMDY3ODE7XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdHkgPSBNYXRoLnNxcnQoIHl5ICk7XG5cdFx0XHRcdFx0eCA9IHh5IC8geTtcblx0XHRcdFx0XHR6ID0geXogLyB5O1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHsgLy8gbTMzIGlzIHRoZSBsYXJnZXN0IGRpYWdvbmFsIHRlcm0gc28gYmFzZSByZXN1bHQgb24gdGhpc1xuXG5cdFx0XHRcdGlmICggenogPCBlcHNpbG9uICkge1xuXG5cdFx0XHRcdFx0eCA9IDAuNzA3MTA2NzgxO1xuXHRcdFx0XHRcdHkgPSAwLjcwNzEwNjc4MTtcblx0XHRcdFx0XHR6ID0gMDtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0eiA9IE1hdGguc3FydCggenogKTtcblx0XHRcdFx0XHR4ID0geHogLyB6O1xuXHRcdFx0XHRcdHkgPSB5eiAvIHo7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2V0KCB4LCB5LCB6LCBhbmdsZSApO1xuXG5cdFx0XHRyZXR1cm4gdGhpczsgLy8gcmV0dXJuIDE4MCBkZWcgcm90YXRpb25cblxuXHRcdH1cblxuXHRcdC8vIGFzIHdlIGhhdmUgcmVhY2hlZCBoZXJlIHRoZXJlIGFyZSBubyBzaW5ndWxhcml0aWVzIHNvIHdlIGNhbiBoYW5kbGUgbm9ybWFsbHlcblxuXHRcdHZhciBzID0gTWF0aC5zcXJ0KCAoIG0zMiAtIG0yMyApICogKCBtMzIgLSBtMjMgKVxuXHRcdFx0XHRcdFx0ICArICggbTEzIC0gbTMxICkgKiAoIG0xMyAtIG0zMSApXG5cdFx0XHRcdFx0XHQgICsgKCBtMjEgLSBtMTIgKSAqICggbTIxIC0gbTEyICkgKTsgLy8gdXNlZCB0byBub3JtYWxpemVcblxuXHRcdGlmICggTWF0aC5hYnMoIHMgKSA8IDAuMDAxICkgcyA9IDE7XG5cblx0XHQvLyBwcmV2ZW50IGRpdmlkZSBieSB6ZXJvLCBzaG91bGQgbm90IGhhcHBlbiBpZiBtYXRyaXggaXMgb3J0aG9nb25hbCBhbmQgc2hvdWxkIGJlXG5cdFx0Ly8gY2F1Z2h0IGJ5IHNpbmd1bGFyaXR5IHRlc3QgYWJvdmUsIGJ1dCBJJ3ZlIGxlZnQgaXQgaW4ganVzdCBpbiBjYXNlXG5cblx0XHR0aGlzLnggPSAoIG0zMiAtIG0yMyApIC8gcztcblx0XHR0aGlzLnkgPSAoIG0xMyAtIG0zMSApIC8gcztcblx0XHR0aGlzLnogPSAoIG0yMSAtIG0xMiApIC8gcztcblx0XHR0aGlzLncgPSBNYXRoLmFjb3MoICggbTExICsgbTIyICsgbTMzIC0gMSApIC8gMiApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtaW46IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdGlmICggdGhpcy54ID4gdi54ICkge1xuXG5cdFx0XHR0aGlzLnggPSB2Lng7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMueSA+IHYueSApIHtcblxuXHRcdFx0dGhpcy55ID0gdi55O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnogPiB2LnogKSB7XG5cblx0XHRcdHRoaXMueiA9IHYuejtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy53ID4gdi53ICkge1xuXG5cdFx0XHR0aGlzLncgPSB2Lnc7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1heDogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0aWYgKCB0aGlzLnggPCB2LnggKSB7XG5cblx0XHRcdHRoaXMueCA9IHYueDtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy55IDwgdi55ICkge1xuXG5cdFx0XHR0aGlzLnkgPSB2Lnk7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMueiA8IHYueiApIHtcblxuXHRcdFx0dGhpcy56ID0gdi56O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLncgPCB2LncgKSB7XG5cblx0XHRcdHRoaXMudyA9IHYudztcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2xhbXA6IGZ1bmN0aW9uICggbWluLCBtYXggKSB7XG5cblx0XHQvLyBUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgbWluIDwgbWF4LCBpZiB0aGlzIGFzc3VtcHRpb24gaXNuJ3QgdHJ1ZSBpdCB3aWxsIG5vdCBvcGVyYXRlIGNvcnJlY3RseVxuXG5cdFx0aWYgKCB0aGlzLnggPCBtaW4ueCApIHtcblxuXHRcdFx0dGhpcy54ID0gbWluLng7XG5cblx0XHR9IGVsc2UgaWYgKCB0aGlzLnggPiBtYXgueCApIHtcblxuXHRcdFx0dGhpcy54ID0gbWF4Lng7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMueSA8IG1pbi55ICkge1xuXG5cdFx0XHR0aGlzLnkgPSBtaW4ueTtcblxuXHRcdH0gZWxzZSBpZiAoIHRoaXMueSA+IG1heC55ICkge1xuXG5cdFx0XHR0aGlzLnkgPSBtYXgueTtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy56IDwgbWluLnogKSB7XG5cblx0XHRcdHRoaXMueiA9IG1pbi56O1xuXG5cdFx0fSBlbHNlIGlmICggdGhpcy56ID4gbWF4LnogKSB7XG5cblx0XHRcdHRoaXMueiA9IG1heC56O1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLncgPCBtaW4udyApIHtcblxuXHRcdFx0dGhpcy53ID0gbWluLnc7XG5cblx0XHR9IGVsc2UgaWYgKCB0aGlzLncgPiBtYXgudyApIHtcblxuXHRcdFx0dGhpcy53ID0gbWF4Lnc7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNsYW1wU2NhbGFyOiAoIGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBtaW4sIG1heDtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIG1pblZhbCwgbWF4VmFsICkge1xuXG5cdFx0XHRpZiAoIG1pbiA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdG1pbiA9IG5ldyBUSFJFRS5WZWN0b3I0KCk7XG5cdFx0XHRcdG1heCA9IG5ldyBUSFJFRS5WZWN0b3I0KCk7XG5cblx0XHRcdH1cblxuXHRcdFx0bWluLnNldCggbWluVmFsLCBtaW5WYWwsIG1pblZhbCwgbWluVmFsICk7XG5cdFx0XHRtYXguc2V0KCBtYXhWYWwsIG1heFZhbCwgbWF4VmFsLCBtYXhWYWwgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXMuY2xhbXAoIG1pbiwgbWF4ICk7XG5cblx0XHR9O1xuXG5cdH0gKSgpLFxuXG4gIGZsb29yOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnggPSBNYXRoLmZsb29yKCB0aGlzLnggKTtcblx0XHR0aGlzLnkgPSBNYXRoLmZsb29yKCB0aGlzLnkgKTtcblx0XHR0aGlzLnogPSBNYXRoLmZsb29yKCB0aGlzLnogKTtcblx0XHR0aGlzLncgPSBNYXRoLmZsb29yKCB0aGlzLncgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG4gIH0sXG5cbiAgY2VpbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gTWF0aC5jZWlsKCB0aGlzLnggKTtcblx0XHR0aGlzLnkgPSBNYXRoLmNlaWwoIHRoaXMueSApO1xuXHRcdHRoaXMueiA9IE1hdGguY2VpbCggdGhpcy56ICk7XG5cdFx0dGhpcy53ID0gTWF0aC5jZWlsKCB0aGlzLncgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG4gIH0sXG5cbiAgcm91bmQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9IE1hdGgucm91bmQoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9IE1hdGgucm91bmQoIHRoaXMueSApO1xuXHRcdHRoaXMueiA9IE1hdGgucm91bmQoIHRoaXMueiApO1xuXHRcdHRoaXMudyA9IE1hdGgucm91bmQoIHRoaXMudyApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cbiAgfSxcblxuICByb3VuZFRvWmVybzogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gKCB0aGlzLnggPCAwICkgPyBNYXRoLmNlaWwoIHRoaXMueCApIDogTWF0aC5mbG9vciggdGhpcy54ICk7XG5cdFx0dGhpcy55ID0gKCB0aGlzLnkgPCAwICkgPyBNYXRoLmNlaWwoIHRoaXMueSApIDogTWF0aC5mbG9vciggdGhpcy55ICk7XG5cdFx0dGhpcy56ID0gKCB0aGlzLnogPCAwICkgPyBNYXRoLmNlaWwoIHRoaXMueiApIDogTWF0aC5mbG9vciggdGhpcy56ICk7XG5cdFx0dGhpcy53ID0gKCB0aGlzLncgPCAwICkgPyBNYXRoLmNlaWwoIHRoaXMudyApIDogTWF0aC5mbG9vciggdGhpcy53ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuICB9LFxuXG5cdG5lZ2F0ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gLSB0aGlzLng7XG5cdFx0dGhpcy55ID0gLSB0aGlzLnk7XG5cdFx0dGhpcy56ID0gLSB0aGlzLno7XG5cdFx0dGhpcy53ID0gLSB0aGlzLnc7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGRvdDogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0cmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYueiArIHRoaXMudyAqIHYudztcblxuXHR9LFxuXG5cdGxlbmd0aFNxOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICsgdGhpcy56ICogdGhpcy56ICsgdGhpcy53ICogdGhpcy53O1xuXG5cdH0sXG5cblx0bGVuZ3RoOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gTWF0aC5zcXJ0KCB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkgKyB0aGlzLnogKiB0aGlzLnogKyB0aGlzLncgKiB0aGlzLncgKTtcblxuXHR9LFxuXG5cdGxlbmd0aE1hbmhhdHRhbjogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIE1hdGguYWJzKCB0aGlzLnggKSArIE1hdGguYWJzKCB0aGlzLnkgKSArIE1hdGguYWJzKCB0aGlzLnogKSArIE1hdGguYWJzKCB0aGlzLncgKTtcblxuXHR9LFxuXG5cdG5vcm1hbGl6ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuZGl2aWRlU2NhbGFyKCB0aGlzLmxlbmd0aCgpICk7XG5cblx0fSxcblxuXHRzZXRMZW5ndGg6IGZ1bmN0aW9uICggbCApIHtcblxuXHRcdHZhciBvbGRMZW5ndGggPSB0aGlzLmxlbmd0aCgpO1xuXG5cdFx0aWYgKCBvbGRMZW5ndGggIT09IDAgJiYgbCAhPT0gb2xkTGVuZ3RoICkge1xuXG5cdFx0XHR0aGlzLm11bHRpcGx5U2NhbGFyKCBsIC8gb2xkTGVuZ3RoICk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGxlcnA6IGZ1bmN0aW9uICggdiwgYWxwaGEgKSB7XG5cblx0XHR0aGlzLnggKz0gKCB2LnggLSB0aGlzLnggKSAqIGFscGhhO1xuXHRcdHRoaXMueSArPSAoIHYueSAtIHRoaXMueSApICogYWxwaGE7XG5cdFx0dGhpcy56ICs9ICggdi56IC0gdGhpcy56ICkgKiBhbHBoYTtcblx0XHR0aGlzLncgKz0gKCB2LncgLSB0aGlzLncgKSAqIGFscGhhO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRsZXJwVmVjdG9yczogZnVuY3Rpb24gKCB2MSwgdjIsIGFscGhhICkge1xuXG5cdFx0dGhpcy5zdWJWZWN0b3JzKCB2MiwgdjEgKS5tdWx0aXBseVNjYWxhciggYWxwaGEgKS5hZGQoIHYxICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVxdWFsczogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0cmV0dXJuICggKCB2LnggPT09IHRoaXMueCApICYmICggdi55ID09PSB0aGlzLnkgKSAmJiAoIHYueiA9PT0gdGhpcy56ICkgJiYgKCB2LncgPT09IHRoaXMudyApICk7XG5cblx0fSxcblxuXHRmcm9tQXJyYXk6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0dGhpcy54ID0gYXJyYXlbIG9mZnNldCBdO1xuXHRcdHRoaXMueSA9IGFycmF5WyBvZmZzZXQgKyAxIF07XG5cdFx0dGhpcy56ID0gYXJyYXlbIG9mZnNldCArIDIgXTtcblx0XHR0aGlzLncgPSBhcnJheVsgb2Zmc2V0ICsgMyBdO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR0b0FycmF5OiBmdW5jdGlvbiAoIGFycmF5LCBvZmZzZXQgKSB7XG5cblx0XHRpZiAoIGFycmF5ID09PSB1bmRlZmluZWQgKSBhcnJheSA9IFtdO1xuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0YXJyYXlbIG9mZnNldCBdID0gdGhpcy54O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxIF0gPSB0aGlzLnk7XG5cdFx0YXJyYXlbIG9mZnNldCArIDIgXSA9IHRoaXMuejtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMyBdID0gdGhpcy53O1xuXG5cdFx0cmV0dXJuIGFycmF5O1xuXG5cdH0sXG5cblx0ZnJvbUF0dHJpYnV0ZTogZnVuY3Rpb24gKCBhdHRyaWJ1dGUsIGluZGV4LCBvZmZzZXQgKSB7XG5cblx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblxuXHRcdGluZGV4ID0gaW5kZXggKiBhdHRyaWJ1dGUuaXRlbVNpemUgKyBvZmZzZXQ7XG5cblx0XHR0aGlzLnggPSBhdHRyaWJ1dGUuYXJyYXlbIGluZGV4IF07XG5cdFx0dGhpcy55ID0gYXR0cmlidXRlLmFycmF5WyBpbmRleCArIDEgXTtcblx0XHR0aGlzLnogPSBhdHRyaWJ1dGUuYXJyYXlbIGluZGV4ICsgMiBdO1xuXHRcdHRoaXMudyA9IGF0dHJpYnV0ZS5hcnJheVsgaW5kZXggKyAzIF07XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjQoIHRoaXMueCwgdGhpcy55LCB0aGlzLnosIHRoaXMudyApO1xuXG5cdH1cblxufTtcblxuLy8gRmlsZTpzcmMvbWF0aC9FdWxlci5qc1xuXG4vKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKiBAYXV0aG9yIFdlc3RMYW5nbGV5IC8gaHR0cDovL2dpdGh1Yi5jb20vV2VzdExhbmdsZXlcbiAqIEBhdXRob3IgYmhvdXN0b24gLyBodHRwOi8vZXhvY29ydGV4LmNvbVxuICovXG5cblRIUkVFLkV1bGVyID0gZnVuY3Rpb24gKCB4LCB5LCB6LCBvcmRlciApIHtcblxuXHR0aGlzLl94ID0geCB8fCAwO1xuXHR0aGlzLl95ID0geSB8fCAwO1xuXHR0aGlzLl96ID0geiB8fCAwO1xuXHR0aGlzLl9vcmRlciA9IG9yZGVyIHx8IFRIUkVFLkV1bGVyLkRlZmF1bHRPcmRlcjtcblxufTtcblxuVEhSRUUuRXVsZXIuUm90YXRpb25PcmRlcnMgPSBbICdYWVonLCAnWVpYJywgJ1pYWScsICdYWlknLCAnWVhaJywgJ1pZWCcgXTtcblxuVEhSRUUuRXVsZXIuRGVmYXVsdE9yZGVyID0gJ1hZWic7XG5cblRIUkVFLkV1bGVyLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogVEhSRUUuRXVsZXIsXG5cblx0X3g6IDAsIF95OiAwLCBfejogMCwgX29yZGVyOiBUSFJFRS5FdWxlci5EZWZhdWx0T3JkZXIsXG5cblx0Z2V0IHggKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX3g7XG5cblx0fSxcblxuXHRzZXQgeCAoIHZhbHVlICkge1xuXG5cdFx0dGhpcy5feCA9IHZhbHVlO1xuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdH0sXG5cblx0Z2V0IHkgKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX3k7XG5cblx0fSxcblxuXHRzZXQgeSAoIHZhbHVlICkge1xuXG5cdFx0dGhpcy5feSA9IHZhbHVlO1xuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdH0sXG5cblx0Z2V0IHogKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX3o7XG5cblx0fSxcblxuXHRzZXQgeiAoIHZhbHVlICkge1xuXG5cdFx0dGhpcy5feiA9IHZhbHVlO1xuXHRcdHRoaXMub25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdH0sXG5cblx0Z2V0IG9yZGVyICgpIHtcblxuXHRcdHJldHVybiB0aGlzLl9vcmRlcjtcblxuXHR9LFxuXG5cdHNldCBvcmRlciAoIHZhbHVlICkge1xuXG5cdFx0dGhpcy5fb3JkZXIgPSB2YWx1ZTtcblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHR9LFxuXG5cdHNldDogZnVuY3Rpb24gKCB4LCB5LCB6LCBvcmRlciApIHtcblxuXHRcdHRoaXMuX3ggPSB4O1xuXHRcdHRoaXMuX3kgPSB5O1xuXHRcdHRoaXMuX3ogPSB6O1xuXHRcdHRoaXMuX29yZGVyID0gb3JkZXIgfHwgdGhpcy5fb3JkZXI7XG5cblx0XHR0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y29weTogZnVuY3Rpb24gKCBldWxlciApIHtcblxuXHRcdHRoaXMuX3ggPSBldWxlci5feDtcblx0XHR0aGlzLl95ID0gZXVsZXIuX3k7XG5cdFx0dGhpcy5feiA9IGV1bGVyLl96O1xuXHRcdHRoaXMuX29yZGVyID0gZXVsZXIuX29yZGVyO1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldEZyb21Sb3RhdGlvbk1hdHJpeDogZnVuY3Rpb24gKCBtLCBvcmRlciwgdXBkYXRlICkge1xuXG5cdFx0dmFyIGNsYW1wID0gVEhSRUUuTWF0aC5jbGFtcDtcblxuXHRcdC8vIGFzc3VtZXMgdGhlIHVwcGVyIDN4MyBvZiBtIGlzIGEgcHVyZSByb3RhdGlvbiBtYXRyaXggKGkuZSwgdW5zY2FsZWQpXG5cblx0XHR2YXIgdGUgPSBtLmVsZW1lbnRzO1xuXHRcdHZhciBtMTEgPSB0ZVsgMCBdLCBtMTIgPSB0ZVsgNCBdLCBtMTMgPSB0ZVsgOCBdO1xuXHRcdHZhciBtMjEgPSB0ZVsgMSBdLCBtMjIgPSB0ZVsgNSBdLCBtMjMgPSB0ZVsgOSBdO1xuXHRcdHZhciBtMzEgPSB0ZVsgMiBdLCBtMzIgPSB0ZVsgNiBdLCBtMzMgPSB0ZVsgMTAgXTtcblxuXHRcdG9yZGVyID0gb3JkZXIgfHwgdGhpcy5fb3JkZXI7XG5cblx0XHRpZiAoIG9yZGVyID09PSAnWFlaJyApIHtcblxuXHRcdFx0dGhpcy5feSA9IE1hdGguYXNpbiggY2xhbXAoIG0xMywgLSAxLCAxICkgKTtcblxuXHRcdFx0aWYgKCBNYXRoLmFicyggbTEzICkgPCAwLjk5OTk5ICkge1xuXG5cdFx0XHRcdHRoaXMuX3ggPSBNYXRoLmF0YW4yKCAtIG0yMywgbTMzICk7XG5cdFx0XHRcdHRoaXMuX3ogPSBNYXRoLmF0YW4yKCAtIG0xMiwgbTExICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0dGhpcy5feCA9IE1hdGguYXRhbjIoIG0zMiwgbTIyICk7XG5cdFx0XHRcdHRoaXMuX3ogPSAwO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2UgaWYgKCBvcmRlciA9PT0gJ1lYWicgKSB7XG5cblx0XHRcdHRoaXMuX3ggPSBNYXRoLmFzaW4oIC0gY2xhbXAoIG0yMywgLSAxLCAxICkgKTtcblxuXHRcdFx0aWYgKCBNYXRoLmFicyggbTIzICkgPCAwLjk5OTk5ICkge1xuXG5cdFx0XHRcdHRoaXMuX3kgPSBNYXRoLmF0YW4yKCBtMTMsIG0zMyApO1xuXHRcdFx0XHR0aGlzLl96ID0gTWF0aC5hdGFuMiggbTIxLCBtMjIgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR0aGlzLl95ID0gTWF0aC5hdGFuMiggLSBtMzEsIG0xMSApO1xuXHRcdFx0XHR0aGlzLl96ID0gMDtcblxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIGlmICggb3JkZXIgPT09ICdaWFknICkge1xuXG5cdFx0XHR0aGlzLl94ID0gTWF0aC5hc2luKCBjbGFtcCggbTMyLCAtIDEsIDEgKSApO1xuXG5cdFx0XHRpZiAoIE1hdGguYWJzKCBtMzIgKSA8IDAuOTk5OTkgKSB7XG5cblx0XHRcdFx0dGhpcy5feSA9IE1hdGguYXRhbjIoIC0gbTMxLCBtMzMgKTtcblx0XHRcdFx0dGhpcy5feiA9IE1hdGguYXRhbjIoIC0gbTEyLCBtMjIgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR0aGlzLl95ID0gMDtcblx0XHRcdFx0dGhpcy5feiA9IE1hdGguYXRhbjIoIG0yMSwgbTExICk7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSBpZiAoIG9yZGVyID09PSAnWllYJyApIHtcblxuXHRcdFx0dGhpcy5feSA9IE1hdGguYXNpbiggLSBjbGFtcCggbTMxLCAtIDEsIDEgKSApO1xuXG5cdFx0XHRpZiAoIE1hdGguYWJzKCBtMzEgKSA8IDAuOTk5OTkgKSB7XG5cblx0XHRcdFx0dGhpcy5feCA9IE1hdGguYXRhbjIoIG0zMiwgbTMzICk7XG5cdFx0XHRcdHRoaXMuX3ogPSBNYXRoLmF0YW4yKCBtMjEsIG0xMSApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHRoaXMuX3ggPSAwO1xuXHRcdFx0XHR0aGlzLl96ID0gTWF0aC5hdGFuMiggLSBtMTIsIG0yMiApO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2UgaWYgKCBvcmRlciA9PT0gJ1laWCcgKSB7XG5cblx0XHRcdHRoaXMuX3ogPSBNYXRoLmFzaW4oIGNsYW1wKCBtMjEsIC0gMSwgMSApICk7XG5cblx0XHRcdGlmICggTWF0aC5hYnMoIG0yMSApIDwgMC45OTk5OSApIHtcblxuXHRcdFx0XHR0aGlzLl94ID0gTWF0aC5hdGFuMiggLSBtMjMsIG0yMiApO1xuXHRcdFx0XHR0aGlzLl95ID0gTWF0aC5hdGFuMiggLSBtMzEsIG0xMSApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHRoaXMuX3ggPSAwO1xuXHRcdFx0XHR0aGlzLl95ID0gTWF0aC5hdGFuMiggbTEzLCBtMzMgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIGlmICggb3JkZXIgPT09ICdYWlknICkge1xuXG5cdFx0XHR0aGlzLl96ID0gTWF0aC5hc2luKCAtIGNsYW1wKCBtMTIsIC0gMSwgMSApICk7XG5cblx0XHRcdGlmICggTWF0aC5hYnMoIG0xMiApIDwgMC45OTk5OSApIHtcblxuXHRcdFx0XHR0aGlzLl94ID0gTWF0aC5hdGFuMiggbTMyLCBtMjIgKTtcblx0XHRcdFx0dGhpcy5feSA9IE1hdGguYXRhbjIoIG0xMywgbTExICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0dGhpcy5feCA9IE1hdGguYXRhbjIoIC0gbTIzLCBtMzMgKTtcblx0XHRcdFx0dGhpcy5feSA9IDA7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLkV1bGVyOiAuc2V0RnJvbVJvdGF0aW9uTWF0cml4KCkgZ2l2ZW4gdW5zdXBwb3J0ZWQgb3JkZXI6ICcgKyBvcmRlciApXG5cblx0XHR9XG5cblx0XHR0aGlzLl9vcmRlciA9IG9yZGVyO1xuXG5cdFx0aWYgKCB1cGRhdGUgIT09IGZhbHNlICkgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldEZyb21RdWF0ZXJuaW9uOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgbWF0cml4O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggcSwgb3JkZXIsIHVwZGF0ZSApIHtcblxuXHRcdFx0aWYgKCBtYXRyaXggPT09IHVuZGVmaW5lZCApIG1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cdFx0XHRtYXRyaXgubWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb24oIHEgKTtcblx0XHRcdHRoaXMuc2V0RnJvbVJvdGF0aW9uTWF0cml4KCBtYXRyaXgsIG9yZGVyLCB1cGRhdGUgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRzZXRGcm9tVmVjdG9yMzogZnVuY3Rpb24gKCB2LCBvcmRlciApIHtcblxuXHRcdHJldHVybiB0aGlzLnNldCggdi54LCB2LnksIHYueiwgb3JkZXIgfHwgdGhpcy5fb3JkZXIgKTtcblxuXHR9LFxuXG5cdHJlb3JkZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIFdBUk5JTkc6IHRoaXMgZGlzY2FyZHMgcmV2b2x1dGlvbiBpbmZvcm1hdGlvbiAtYmhvdXN0b25cblxuXHRcdHZhciBxID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIG5ld09yZGVyICkge1xuXG5cdFx0XHRxLnNldEZyb21FdWxlciggdGhpcyApO1xuXHRcdFx0dGhpcy5zZXRGcm9tUXVhdGVybmlvbiggcSwgbmV3T3JkZXIgKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGVxdWFsczogZnVuY3Rpb24gKCBldWxlciApIHtcblxuXHRcdHJldHVybiAoIGV1bGVyLl94ID09PSB0aGlzLl94ICkgJiYgKCBldWxlci5feSA9PT0gdGhpcy5feSApICYmICggZXVsZXIuX3ogPT09IHRoaXMuX3ogKSAmJiAoIGV1bGVyLl9vcmRlciA9PT0gdGhpcy5fb3JkZXIgKTtcblxuXHR9LFxuXG5cdGZyb21BcnJheTogZnVuY3Rpb24gKCBhcnJheSApIHtcblxuXHRcdHRoaXMuX3ggPSBhcnJheVsgMCBdO1xuXHRcdHRoaXMuX3kgPSBhcnJheVsgMSBdO1xuXHRcdHRoaXMuX3ogPSBhcnJheVsgMiBdO1xuXHRcdGlmICggYXJyYXlbIDMgXSAhPT0gdW5kZWZpbmVkICkgdGhpcy5fb3JkZXIgPSBhcnJheVsgMyBdO1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdGlmICggYXJyYXkgPT09IHVuZGVmaW5lZCApIGFycmF5ID0gW107XG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHRhcnJheVsgb2Zmc2V0IF0gPSB0aGlzLl94O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxIF0gPSB0aGlzLl95O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAyIF0gPSB0aGlzLl96O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAzIF0gPSB0aGlzLl9vcmRlcjtcblxuXHRcdHJldHVybiBhcnJheTtcblx0fSxcblxuXHR0b1ZlY3RvcjM6IGZ1bmN0aW9uICggb3B0aW9uYWxSZXN1bHQgKSB7XG5cblx0XHRpZiAoIG9wdGlvbmFsUmVzdWx0ICkge1xuXG5cdFx0XHRyZXR1cm4gb3B0aW9uYWxSZXN1bHQuc2V0KCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLl96ICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRyZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjMoIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3ogKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdG9uQ2hhbmdlOiBmdW5jdGlvbiAoIGNhbGxiYWNrICkge1xuXG5cdFx0dGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uQ2hhbmdlQ2FsbGJhY2s6IGZ1bmN0aW9uICgpIHt9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFRIUkVFLkV1bGVyKCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLl96LCB0aGlzLl9vcmRlciApO1xuXG5cdH1cblxufTtcblxuLy8gRmlsZTpzcmMvbWF0aC9MaW5lMy5qc1xuXG4vKipcbiAqIEBhdXRob3IgYmhvdXN0b24gLyBodHRwOi8vZXhvY29ydGV4LmNvbVxuICovXG5cblRIUkVFLkxpbmUzID0gZnVuY3Rpb24gKCBzdGFydCwgZW5kICkge1xuXG5cdHRoaXMuc3RhcnQgPSAoIHN0YXJ0ICE9PSB1bmRlZmluZWQgKSA/IHN0YXJ0IDogbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0dGhpcy5lbmQgPSAoIGVuZCAhPT0gdW5kZWZpbmVkICkgPyBlbmQgOiBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG59O1xuXG5USFJFRS5MaW5lMy5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IFRIUkVFLkxpbmUzLFxuXG5cdHNldDogZnVuY3Rpb24gKCBzdGFydCwgZW5kICkge1xuXG5cdFx0dGhpcy5zdGFydC5jb3B5KCBzdGFydCApO1xuXHRcdHRoaXMuZW5kLmNvcHkoIGVuZCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjb3B5OiBmdW5jdGlvbiAoIGxpbmUgKSB7XG5cblx0XHR0aGlzLnN0YXJ0LmNvcHkoIGxpbmUuc3RhcnQgKTtcblx0XHR0aGlzLmVuZC5jb3B5KCBsaW5lLmVuZCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjZW50ZXI6IGZ1bmN0aW9uICggb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHR2YXIgcmVzdWx0ID0gb3B0aW9uYWxUYXJnZXQgfHwgbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRyZXR1cm4gcmVzdWx0LmFkZFZlY3RvcnMoIHRoaXMuc3RhcnQsIHRoaXMuZW5kICkubXVsdGlwbHlTY2FsYXIoIDAuNSApO1xuXG5cdH0sXG5cblx0ZGVsdGE6IGZ1bmN0aW9uICggb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHR2YXIgcmVzdWx0ID0gb3B0aW9uYWxUYXJnZXQgfHwgbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRyZXR1cm4gcmVzdWx0LnN1YlZlY3RvcnMoIHRoaXMuZW5kLCB0aGlzLnN0YXJ0ICk7XG5cblx0fSxcblxuXHRkaXN0YW5jZVNxOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5zdGFydC5kaXN0YW5jZVRvU3F1YXJlZCggdGhpcy5lbmQgKTtcblxuXHR9LFxuXG5cdGRpc3RhbmNlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5zdGFydC5kaXN0YW5jZVRvKCB0aGlzLmVuZCApO1xuXG5cdH0sXG5cblx0YXQ6IGZ1bmN0aW9uICggdCwgb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHR2YXIgcmVzdWx0ID0gb3B0aW9uYWxUYXJnZXQgfHwgbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJldHVybiB0aGlzLmRlbHRhKCByZXN1bHQgKS5tdWx0aXBseVNjYWxhciggdCApLmFkZCggdGhpcy5zdGFydCApO1xuXG5cdH0sXG5cblx0Y2xvc2VzdFBvaW50VG9Qb2ludFBhcmFtZXRlcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHN0YXJ0UCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0dmFyIHN0YXJ0RW5kID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHBvaW50LCBjbGFtcFRvTGluZSApIHtcblxuXHRcdFx0c3RhcnRQLnN1YlZlY3RvcnMoIHBvaW50LCB0aGlzLnN0YXJ0ICk7XG5cdFx0XHRzdGFydEVuZC5zdWJWZWN0b3JzKCB0aGlzLmVuZCwgdGhpcy5zdGFydCApO1xuXG5cdFx0XHR2YXIgc3RhcnRFbmQyID0gc3RhcnRFbmQuZG90KCBzdGFydEVuZCApO1xuXHRcdFx0dmFyIHN0YXJ0RW5kX3N0YXJ0UCA9IHN0YXJ0RW5kLmRvdCggc3RhcnRQICk7XG5cblx0XHRcdHZhciB0ID0gc3RhcnRFbmRfc3RhcnRQIC8gc3RhcnRFbmQyO1xuXG5cdFx0XHRpZiAoIGNsYW1wVG9MaW5lICkge1xuXG5cdFx0XHRcdHQgPSBUSFJFRS5NYXRoLmNsYW1wKCB0LCAwLCAxICk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHQ7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRjbG9zZXN0UG9pbnRUb1BvaW50OiBmdW5jdGlvbiAoIHBvaW50LCBjbGFtcFRvTGluZSwgb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHR2YXIgdCA9IHRoaXMuY2xvc2VzdFBvaW50VG9Qb2ludFBhcmFtZXRlciggcG9pbnQsIGNsYW1wVG9MaW5lICk7XG5cblx0XHR2YXIgcmVzdWx0ID0gb3B0aW9uYWxUYXJnZXQgfHwgbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJldHVybiB0aGlzLmRlbHRhKCByZXN1bHQgKS5tdWx0aXBseVNjYWxhciggdCApLmFkZCggdGhpcy5zdGFydCApO1xuXG5cdH0sXG5cblx0YXBwbHlNYXRyaXg0OiBmdW5jdGlvbiAoIG1hdHJpeCApIHtcblxuXHRcdHRoaXMuc3RhcnQuYXBwbHlNYXRyaXg0KCBtYXRyaXggKTtcblx0XHR0aGlzLmVuZC5hcHBseU1hdHJpeDQoIG1hdHJpeCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlcXVhbHM6IGZ1bmN0aW9uICggbGluZSApIHtcblxuXHRcdHJldHVybiBsaW5lLnN0YXJ0LmVxdWFscyggdGhpcy5zdGFydCApICYmIGxpbmUuZW5kLmVxdWFscyggdGhpcy5lbmQgKTtcblxuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFRIUkVFLkxpbmUzKCkuY29weSggdGhpcyApO1xuXG5cdH1cblxufTtcblxuLy8gRmlsZTpzcmMvbWF0aC9Cb3gyLmpzXG5cbi8qKlxuICogQGF1dGhvciBiaG91c3RvbiAvIGh0dHA6Ly9leG9jb3J0ZXguY29tXG4gKi9cblxuVEhSRUUuQm94MiA9IGZ1bmN0aW9uICggbWluLCBtYXggKSB7XG5cblx0dGhpcy5taW4gPSAoIG1pbiAhPT0gdW5kZWZpbmVkICkgPyBtaW4gOiBuZXcgVEhSRUUuVmVjdG9yMiggSW5maW5pdHksIEluZmluaXR5ICk7XG5cdHRoaXMubWF4ID0gKCBtYXggIT09IHVuZGVmaW5lZCApID8gbWF4IDogbmV3IFRIUkVFLlZlY3RvcjIoIC0gSW5maW5pdHksIC0gSW5maW5pdHkgKTtcblxufTtcblxuVEhSRUUuQm94Mi5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IFRIUkVFLkJveDIsXG5cblx0c2V0OiBmdW5jdGlvbiAoIG1pbiwgbWF4ICkge1xuXG5cdFx0dGhpcy5taW4uY29weSggbWluICk7XG5cdFx0dGhpcy5tYXguY29weSggbWF4ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldEZyb21Qb2ludHM6IGZ1bmN0aW9uICggcG9pbnRzICkge1xuXG5cdFx0dGhpcy5tYWtlRW1wdHkoKTtcblxuXHRcdGZvciAoIHZhciBpID0gMCwgaWwgPSBwb2ludHMubGVuZ3RoOyBpIDwgaWw7IGkgKysgKSB7XG5cblx0XHRcdHRoaXMuZXhwYW5kQnlQb2ludCggcG9pbnRzWyBpIF0gKVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRGcm9tQ2VudGVyQW5kU2l6ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYxID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIGNlbnRlciwgc2l6ZSApIHtcblxuXHRcdFx0dmFyIGhhbGZTaXplID0gdjEuY29weSggc2l6ZSApLm11bHRpcGx5U2NhbGFyKCAwLjUgKTtcblx0XHRcdHRoaXMubWluLmNvcHkoIGNlbnRlciApLnN1YiggaGFsZlNpemUgKTtcblx0XHRcdHRoaXMubWF4LmNvcHkoIGNlbnRlciApLmFkZCggaGFsZlNpemUgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRjb3B5OiBmdW5jdGlvbiAoIGJveCApIHtcblxuXHRcdHRoaXMubWluLmNvcHkoIGJveC5taW4gKTtcblx0XHR0aGlzLm1heC5jb3B5KCBib3gubWF4ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1ha2VFbXB0eTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy5taW4ueCA9IHRoaXMubWluLnkgPSBJbmZpbml0eTtcblx0XHR0aGlzLm1heC54ID0gdGhpcy5tYXgueSA9IC0gSW5maW5pdHk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVtcHR5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyB0aGlzIGlzIGEgbW9yZSByb2J1c3QgY2hlY2sgZm9yIGVtcHR5IHRoYW4gKCB2b2x1bWUgPD0gMCApIGJlY2F1c2Ugdm9sdW1lIGNhbiBnZXQgcG9zaXRpdmUgd2l0aCB0d28gbmVnYXRpdmUgYXhlc1xuXG5cdFx0cmV0dXJuICggdGhpcy5tYXgueCA8IHRoaXMubWluLnggKSB8fCAoIHRoaXMubWF4LnkgPCB0aGlzLm1pbi55ICk7XG5cblx0fSxcblxuXHRjZW50ZXI6IGZ1bmN0aW9uICggb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHR2YXIgcmVzdWx0ID0gb3B0aW9uYWxUYXJnZXQgfHwgbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRyZXR1cm4gcmVzdWx0LmFkZFZlY3RvcnMoIHRoaXMubWluLCB0aGlzLm1heCApLm11bHRpcGx5U2NhbGFyKCAwLjUgKTtcblxuXHR9LFxuXG5cdHNpemU6IGZ1bmN0aW9uICggb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHR2YXIgcmVzdWx0ID0gb3B0aW9uYWxUYXJnZXQgfHwgbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRyZXR1cm4gcmVzdWx0LnN1YlZlY3RvcnMoIHRoaXMubWF4LCB0aGlzLm1pbiApO1xuXG5cdH0sXG5cblx0ZXhwYW5kQnlQb2ludDogZnVuY3Rpb24gKCBwb2ludCApIHtcblxuXHRcdHRoaXMubWluLm1pbiggcG9pbnQgKTtcblx0XHR0aGlzLm1heC5tYXgoIHBvaW50ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRleHBhbmRCeVZlY3RvcjogZnVuY3Rpb24gKCB2ZWN0b3IgKSB7XG5cblx0XHR0aGlzLm1pbi5zdWIoIHZlY3RvciApO1xuXHRcdHRoaXMubWF4LmFkZCggdmVjdG9yICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRleHBhbmRCeVNjYWxhcjogZnVuY3Rpb24gKCBzY2FsYXIgKSB7XG5cblx0XHR0aGlzLm1pbi5hZGRTY2FsYXIoIC0gc2NhbGFyICk7XG5cdFx0dGhpcy5tYXguYWRkU2NhbGFyKCBzY2FsYXIgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGNvbnRhaW5zUG9pbnQ6IGZ1bmN0aW9uICggcG9pbnQgKSB7XG5cblx0XHRpZiAoIHBvaW50LnggPCB0aGlzLm1pbi54IHx8IHBvaW50LnggPiB0aGlzLm1heC54IHx8XG5cdFx0ICAgICBwb2ludC55IDwgdGhpcy5taW4ueSB8fCBwb2ludC55ID4gdGhpcy5tYXgueSApIHtcblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0fSxcblxuXHRjb250YWluc0JveDogZnVuY3Rpb24gKCBib3ggKSB7XG5cblx0XHRpZiAoICggdGhpcy5taW4ueCA8PSBib3gubWluLnggKSAmJiAoIGJveC5tYXgueCA8PSB0aGlzLm1heC54ICkgJiZcblx0XHQgICAgICggdGhpcy5taW4ueSA8PSBib3gubWluLnkgKSAmJiAoIGJveC5tYXgueSA8PSB0aGlzLm1heC55ICkgKSB7XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXG5cdH0sXG5cblx0Z2V0UGFyYW1ldGVyOiBmdW5jdGlvbiAoIHBvaW50LCBvcHRpb25hbFRhcmdldCApIHtcblxuXHRcdC8vIFRoaXMgY2FuIHBvdGVudGlhbGx5IGhhdmUgYSBkaXZpZGUgYnkgemVybyBpZiB0aGUgYm94XG5cdFx0Ly8gaGFzIGEgc2l6ZSBkaW1lbnNpb24gb2YgMC5cblxuXHRcdHZhciByZXN1bHQgPSBvcHRpb25hbFRhcmdldCB8fCBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5zZXQoXG5cdFx0XHQoIHBvaW50LnggLSB0aGlzLm1pbi54ICkgLyAoIHRoaXMubWF4LnggLSB0aGlzLm1pbi54ICksXG5cdFx0XHQoIHBvaW50LnkgLSB0aGlzLm1pbi55ICkgLyAoIHRoaXMubWF4LnkgLSB0aGlzLm1pbi55IClcblx0XHQpO1xuXG5cdH0sXG5cblx0aXNJbnRlcnNlY3Rpb25Cb3g6IGZ1bmN0aW9uICggYm94ICkge1xuXG5cdFx0Ly8gdXNpbmcgNiBzcGxpdHRpbmcgcGxhbmVzIHRvIHJ1bGUgb3V0IGludGVyc2VjdGlvbnMuXG5cblx0XHRpZiAoIGJveC5tYXgueCA8IHRoaXMubWluLnggfHwgYm94Lm1pbi54ID4gdGhpcy5tYXgueCB8fFxuXHRcdCAgICAgYm94Lm1heC55IDwgdGhpcy5taW4ueSB8fCBib3gubWluLnkgPiB0aGlzLm1heC55ICkge1xuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHR9LFxuXG5cdGNsYW1wUG9pbnQ6IGZ1bmN0aW9uICggcG9pbnQsIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0cmV0dXJuIHJlc3VsdC5jb3B5KCBwb2ludCApLmNsYW1wKCB0aGlzLm1pbiwgdGhpcy5tYXggKTtcblxuXHR9LFxuXG5cdGRpc3RhbmNlVG9Qb2ludDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYxID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHBvaW50ICkge1xuXG5cdFx0XHR2YXIgY2xhbXBlZFBvaW50ID0gdjEuY29weSggcG9pbnQgKS5jbGFtcCggdGhpcy5taW4sIHRoaXMubWF4ICk7XG5cdFx0XHRyZXR1cm4gY2xhbXBlZFBvaW50LnN1YiggcG9pbnQgKS5sZW5ndGgoKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGludGVyc2VjdDogZnVuY3Rpb24gKCBib3ggKSB7XG5cblx0XHR0aGlzLm1pbi5tYXgoIGJveC5taW4gKTtcblx0XHR0aGlzLm1heC5taW4oIGJveC5tYXggKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dW5pb246IGZ1bmN0aW9uICggYm94ICkge1xuXG5cdFx0dGhpcy5taW4ubWluKCBib3gubWluICk7XG5cdFx0dGhpcy5tYXgubWF4KCBib3gubWF4ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRyYW5zbGF0ZTogZnVuY3Rpb24gKCBvZmZzZXQgKSB7XG5cblx0XHR0aGlzLm1pbi5hZGQoIG9mZnNldCApO1xuXHRcdHRoaXMubWF4LmFkZCggb2Zmc2V0ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVxdWFsczogZnVuY3Rpb24gKCBib3ggKSB7XG5cblx0XHRyZXR1cm4gYm94Lm1pbi5lcXVhbHMoIHRoaXMubWluICkgJiYgYm94Lm1heC5lcXVhbHMoIHRoaXMubWF4ICk7XG5cblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIG5ldyBUSFJFRS5Cb3gyKCkuY29weSggdGhpcyApO1xuXG5cdH1cblxufTtcblxuLy8gRmlsZTpzcmMvbWF0aC9Cb3gzLmpzXG5cbi8qKlxuICogQGF1dGhvciBiaG91c3RvbiAvIGh0dHA6Ly9leG9jb3J0ZXguY29tXG4gKiBAYXV0aG9yIFdlc3RMYW5nbGV5IC8gaHR0cDovL2dpdGh1Yi5jb20vV2VzdExhbmdsZXlcbiAqL1xuXG5USFJFRS5Cb3gzID0gZnVuY3Rpb24gKCBtaW4sIG1heCApIHtcblxuXHR0aGlzLm1pbiA9ICggbWluICE9PSB1bmRlZmluZWQgKSA/IG1pbiA6IG5ldyBUSFJFRS5WZWN0b3IzKCBJbmZpbml0eSwgSW5maW5pdHksIEluZmluaXR5ICk7XG5cdHRoaXMubWF4ID0gKCBtYXggIT09IHVuZGVmaW5lZCApID8gbWF4IDogbmV3IFRIUkVFLlZlY3RvcjMoIC0gSW5maW5pdHksIC0gSW5maW5pdHksIC0gSW5maW5pdHkgKTtcblxufTtcblxuVEhSRUUuQm94My5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IFRIUkVFLkJveDMsXG5cblx0c2V0OiBmdW5jdGlvbiAoIG1pbiwgbWF4ICkge1xuXG5cdFx0dGhpcy5taW4uY29weSggbWluICk7XG5cdFx0dGhpcy5tYXguY29weSggbWF4ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldEZyb21Qb2ludHM6IGZ1bmN0aW9uICggcG9pbnRzICkge1xuXG5cdFx0dGhpcy5tYWtlRW1wdHkoKTtcblxuXHRcdGZvciAoIHZhciBpID0gMCwgaWwgPSBwb2ludHMubGVuZ3RoOyBpIDwgaWw7IGkgKysgKSB7XG5cblx0XHRcdHRoaXMuZXhwYW5kQnlQb2ludCggcG9pbnRzWyBpIF0gKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbUNlbnRlckFuZFNpemU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBjZW50ZXIsIHNpemUgKSB7XG5cblx0XHRcdHZhciBoYWxmU2l6ZSA9IHYxLmNvcHkoIHNpemUgKS5tdWx0aXBseVNjYWxhciggMC41ICk7XG5cblx0XHRcdHRoaXMubWluLmNvcHkoIGNlbnRlciApLnN1YiggaGFsZlNpemUgKTtcblx0XHRcdHRoaXMubWF4LmNvcHkoIGNlbnRlciApLmFkZCggaGFsZlNpemUgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRzZXRGcm9tT2JqZWN0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBDb21wdXRlcyB0aGUgd29ybGQtYXhpcy1hbGlnbmVkIGJvdW5kaW5nIGJveCBvZiBhbiBvYmplY3QgKGluY2x1ZGluZyBpdHMgY2hpbGRyZW4pLFxuXHRcdC8vIGFjY291bnRpbmcgZm9yIGJvdGggdGhlIG9iamVjdCdzLCBhbmQgY2hpbGRyZW5zJywgd29ybGQgdHJhbnNmb3Jtc1xuXG5cdFx0dmFyIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIG9iamVjdCApIHtcblxuXHRcdFx0dmFyIHNjb3BlID0gdGhpcztcblxuXHRcdFx0b2JqZWN0LnVwZGF0ZU1hdHJpeFdvcmxkKCB0cnVlICk7XG5cblx0XHRcdHRoaXMubWFrZUVtcHR5KCk7XG5cblx0XHRcdG9iamVjdC50cmF2ZXJzZSggZnVuY3Rpb24gKCBub2RlICkge1xuXG5cdFx0XHRcdHZhciBnZW9tZXRyeSA9IG5vZGUuZ2VvbWV0cnk7XG5cblx0XHRcdFx0aWYgKCBnZW9tZXRyeSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdFx0aWYgKCBnZW9tZXRyeSBpbnN0YW5jZW9mIFRIUkVFLkdlb21ldHJ5ICkge1xuXG5cdFx0XHRcdFx0XHR2YXIgdmVydGljZXMgPSBnZW9tZXRyeS52ZXJ0aWNlcztcblxuXHRcdFx0XHRcdFx0Zm9yICggdmFyIGkgPSAwLCBpbCA9IHZlcnRpY2VzLmxlbmd0aDsgaSA8IGlsOyBpICsrICkge1xuXG5cdFx0XHRcdFx0XHRcdHYxLmNvcHkoIHZlcnRpY2VzWyBpIF0gKTtcblxuXHRcdFx0XHRcdFx0XHR2MS5hcHBseU1hdHJpeDQoIG5vZGUubWF0cml4V29ybGQgKTtcblxuXHRcdFx0XHRcdFx0XHRzY29wZS5leHBhbmRCeVBvaW50KCB2MSApO1xuXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9IGVsc2UgaWYgKCBnZW9tZXRyeSBpbnN0YW5jZW9mIFRIUkVFLkJ1ZmZlckdlb21ldHJ5ICYmIGdlb21ldHJ5LmF0dHJpYnV0ZXNbICdwb3NpdGlvbicgXSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdFx0XHR2YXIgcG9zaXRpb25zID0gZ2VvbWV0cnkuYXR0cmlidXRlc1sgJ3Bvc2l0aW9uJyBdLmFycmF5O1xuXG5cdFx0XHRcdFx0XHRmb3IgKCB2YXIgaSA9IDAsIGlsID0gcG9zaXRpb25zLmxlbmd0aDsgaSA8IGlsOyBpICs9IDMgKSB7XG5cblx0XHRcdFx0XHRcdFx0djEuc2V0KCBwb3NpdGlvbnNbIGkgXSwgcG9zaXRpb25zWyBpICsgMSBdLCBwb3NpdGlvbnNbIGkgKyAyIF0gKTtcblxuXHRcdFx0XHRcdFx0XHR2MS5hcHBseU1hdHJpeDQoIG5vZGUubWF0cml4V29ybGQgKTtcblxuXHRcdFx0XHRcdFx0XHRzY29wZS5leHBhbmRCeVBvaW50KCB2MSApO1xuXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9ICk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0Y29weTogZnVuY3Rpb24gKCBib3ggKSB7XG5cblx0XHR0aGlzLm1pbi5jb3B5KCBib3gubWluICk7XG5cdFx0dGhpcy5tYXguY29weSggYm94Lm1heCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtYWtlRW1wdHk6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMubWluLnggPSB0aGlzLm1pbi55ID0gdGhpcy5taW4ueiA9IEluZmluaXR5O1xuXHRcdHRoaXMubWF4LnggPSB0aGlzLm1heC55ID0gdGhpcy5tYXgueiA9IC0gSW5maW5pdHk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVtcHR5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyB0aGlzIGlzIGEgbW9yZSByb2J1c3QgY2hlY2sgZm9yIGVtcHR5IHRoYW4gKCB2b2x1bWUgPD0gMCApIGJlY2F1c2Ugdm9sdW1lIGNhbiBnZXQgcG9zaXRpdmUgd2l0aCB0d28gbmVnYXRpdmUgYXhlc1xuXG5cdFx0cmV0dXJuICggdGhpcy5tYXgueCA8IHRoaXMubWluLnggKSB8fCAoIHRoaXMubWF4LnkgPCB0aGlzLm1pbi55ICkgfHwgKCB0aGlzLm1heC56IDwgdGhpcy5taW4ueiApO1xuXG5cdH0sXG5cblx0Y2VudGVyOiBmdW5jdGlvbiAoIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0cmV0dXJuIHJlc3VsdC5hZGRWZWN0b3JzKCB0aGlzLm1pbiwgdGhpcy5tYXggKS5tdWx0aXBseVNjYWxhciggMC41ICk7XG5cblx0fSxcblxuXHRzaXplOiBmdW5jdGlvbiAoIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0cmV0dXJuIHJlc3VsdC5zdWJWZWN0b3JzKCB0aGlzLm1heCwgdGhpcy5taW4gKTtcblxuXHR9LFxuXG5cdGV4cGFuZEJ5UG9pbnQ6IGZ1bmN0aW9uICggcG9pbnQgKSB7XG5cblx0XHR0aGlzLm1pbi5taW4oIHBvaW50ICk7XG5cdFx0dGhpcy5tYXgubWF4KCBwb2ludCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRleHBhbmRCeVZlY3RvcjogZnVuY3Rpb24gKCB2ZWN0b3IgKSB7XG5cblx0XHR0aGlzLm1pbi5zdWIoIHZlY3RvciApO1xuXHRcdHRoaXMubWF4LmFkZCggdmVjdG9yICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGV4cGFuZEJ5U2NhbGFyOiBmdW5jdGlvbiAoIHNjYWxhciApIHtcblxuXHRcdHRoaXMubWluLmFkZFNjYWxhciggLSBzY2FsYXIgKTtcblx0XHR0aGlzLm1heC5hZGRTY2FsYXIoIHNjYWxhciApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjb250YWluc1BvaW50OiBmdW5jdGlvbiAoIHBvaW50ICkge1xuXG5cdFx0aWYgKCBwb2ludC54IDwgdGhpcy5taW4ueCB8fCBwb2ludC54ID4gdGhpcy5tYXgueCB8fFxuXHRcdCAgICAgcG9pbnQueSA8IHRoaXMubWluLnkgfHwgcG9pbnQueSA+IHRoaXMubWF4LnkgfHxcblx0XHQgICAgIHBvaW50LnogPCB0aGlzLm1pbi56IHx8IHBvaW50LnogPiB0aGlzLm1heC56ICkge1xuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHR9LFxuXG5cdGNvbnRhaW5zQm94OiBmdW5jdGlvbiAoIGJveCApIHtcblxuXHRcdGlmICggKCB0aGlzLm1pbi54IDw9IGJveC5taW4ueCApICYmICggYm94Lm1heC54IDw9IHRoaXMubWF4LnggKSAmJlxuXHRcdFx0ICggdGhpcy5taW4ueSA8PSBib3gubWluLnkgKSAmJiAoIGJveC5tYXgueSA8PSB0aGlzLm1heC55ICkgJiZcblx0XHRcdCAoIHRoaXMubWluLnogPD0gYm94Lm1pbi56ICkgJiYgKCBib3gubWF4LnogPD0gdGhpcy5tYXgueiApICkge1xuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblxuXHR9LFxuXG5cdGdldFBhcmFtZXRlcjogZnVuY3Rpb24gKCBwb2ludCwgb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHQvLyBUaGlzIGNhbiBwb3RlbnRpYWxseSBoYXZlIGEgZGl2aWRlIGJ5IHplcm8gaWYgdGhlIGJveFxuXHRcdC8vIGhhcyBhIHNpemUgZGltZW5zaW9uIG9mIDAuXG5cblx0XHR2YXIgcmVzdWx0ID0gb3B0aW9uYWxUYXJnZXQgfHwgbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJldHVybiByZXN1bHQuc2V0KFxuXHRcdFx0KCBwb2ludC54IC0gdGhpcy5taW4ueCApIC8gKCB0aGlzLm1heC54IC0gdGhpcy5taW4ueCApLFxuXHRcdFx0KCBwb2ludC55IC0gdGhpcy5taW4ueSApIC8gKCB0aGlzLm1heC55IC0gdGhpcy5taW4ueSApLFxuXHRcdFx0KCBwb2ludC56IC0gdGhpcy5taW4ueiApIC8gKCB0aGlzLm1heC56IC0gdGhpcy5taW4ueiApXG5cdFx0KTtcblxuXHR9LFxuXG5cdGlzSW50ZXJzZWN0aW9uQm94OiBmdW5jdGlvbiAoIGJveCApIHtcblxuXHRcdC8vIHVzaW5nIDYgc3BsaXR0aW5nIHBsYW5lcyB0byBydWxlIG91dCBpbnRlcnNlY3Rpb25zLlxuXG5cdFx0aWYgKCBib3gubWF4LnggPCB0aGlzLm1pbi54IHx8IGJveC5taW4ueCA+IHRoaXMubWF4LnggfHxcblx0XHQgICAgIGJveC5tYXgueSA8IHRoaXMubWluLnkgfHwgYm94Lm1pbi55ID4gdGhpcy5tYXgueSB8fFxuXHRcdCAgICAgYm94Lm1heC56IDwgdGhpcy5taW4ueiB8fCBib3gubWluLnogPiB0aGlzLm1heC56ICkge1xuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHR9LFxuXG5cdGNsYW1wUG9pbnQ6IGZ1bmN0aW9uICggcG9pbnQsIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0cmV0dXJuIHJlc3VsdC5jb3B5KCBwb2ludCApLmNsYW1wKCB0aGlzLm1pbiwgdGhpcy5tYXggKTtcblxuXHR9LFxuXG5cdGRpc3RhbmNlVG9Qb2ludDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHBvaW50ICkge1xuXG5cdFx0XHR2YXIgY2xhbXBlZFBvaW50ID0gdjEuY29weSggcG9pbnQgKS5jbGFtcCggdGhpcy5taW4sIHRoaXMubWF4ICk7XG5cdFx0XHRyZXR1cm4gY2xhbXBlZFBvaW50LnN1YiggcG9pbnQgKS5sZW5ndGgoKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGdldEJvdW5kaW5nU3BoZXJlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHRcdHZhciByZXN1bHQgPSBvcHRpb25hbFRhcmdldCB8fCBuZXcgVEhSRUUuU3BoZXJlKCk7XG5cblx0XHRcdHJlc3VsdC5jZW50ZXIgPSB0aGlzLmNlbnRlcigpO1xuXHRcdFx0cmVzdWx0LnJhZGl1cyA9IHRoaXMuc2l6ZSggdjEgKS5sZW5ndGgoKSAqIDAuNTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGludGVyc2VjdDogZnVuY3Rpb24gKCBib3ggKSB7XG5cblx0XHR0aGlzLm1pbi5tYXgoIGJveC5taW4gKTtcblx0XHR0aGlzLm1heC5taW4oIGJveC5tYXggKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dW5pb246IGZ1bmN0aW9uICggYm94ICkge1xuXG5cdFx0dGhpcy5taW4ubWluKCBib3gubWluICk7XG5cdFx0dGhpcy5tYXgubWF4KCBib3gubWF4ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFwcGx5TWF0cml4NDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHBvaW50cyA9IFtcblx0XHRcdG5ldyBUSFJFRS5WZWN0b3IzKCksXG5cdFx0XHRuZXcgVEhSRUUuVmVjdG9yMygpLFxuXHRcdFx0bmV3IFRIUkVFLlZlY3RvcjMoKSxcblx0XHRcdG5ldyBUSFJFRS5WZWN0b3IzKCksXG5cdFx0XHRuZXcgVEhSRUUuVmVjdG9yMygpLFxuXHRcdFx0bmV3IFRIUkVFLlZlY3RvcjMoKSxcblx0XHRcdG5ldyBUSFJFRS5WZWN0b3IzKCksXG5cdFx0XHRuZXcgVEhSRUUuVmVjdG9yMygpXG5cdFx0XTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIG1hdHJpeCApIHtcblxuXHRcdFx0Ly8gTk9URTogSSBhbSB1c2luZyBhIGJpbmFyeSBwYXR0ZXJuIHRvIHNwZWNpZnkgYWxsIDJeMyBjb21iaW5hdGlvbnMgYmVsb3dcblx0XHRcdHBvaW50c1sgMCBdLnNldCggdGhpcy5taW4ueCwgdGhpcy5taW4ueSwgdGhpcy5taW4ueiApLmFwcGx5TWF0cml4NCggbWF0cml4ICk7IC8vIDAwMFxuXHRcdFx0cG9pbnRzWyAxIF0uc2V0KCB0aGlzLm1pbi54LCB0aGlzLm1pbi55LCB0aGlzLm1heC56ICkuYXBwbHlNYXRyaXg0KCBtYXRyaXggKTsgLy8gMDAxXG5cdFx0XHRwb2ludHNbIDIgXS5zZXQoIHRoaXMubWluLngsIHRoaXMubWF4LnksIHRoaXMubWluLnogKS5hcHBseU1hdHJpeDQoIG1hdHJpeCApOyAvLyAwMTBcblx0XHRcdHBvaW50c1sgMyBdLnNldCggdGhpcy5taW4ueCwgdGhpcy5tYXgueSwgdGhpcy5tYXgueiApLmFwcGx5TWF0cml4NCggbWF0cml4ICk7IC8vIDAxMVxuXHRcdFx0cG9pbnRzWyA0IF0uc2V0KCB0aGlzLm1heC54LCB0aGlzLm1pbi55LCB0aGlzLm1pbi56ICkuYXBwbHlNYXRyaXg0KCBtYXRyaXggKTsgLy8gMTAwXG5cdFx0XHRwb2ludHNbIDUgXS5zZXQoIHRoaXMubWF4LngsIHRoaXMubWluLnksIHRoaXMubWF4LnogKS5hcHBseU1hdHJpeDQoIG1hdHJpeCApOyAvLyAxMDFcblx0XHRcdHBvaW50c1sgNiBdLnNldCggdGhpcy5tYXgueCwgdGhpcy5tYXgueSwgdGhpcy5taW4ueiApLmFwcGx5TWF0cml4NCggbWF0cml4ICk7IC8vIDExMFxuXHRcdFx0cG9pbnRzWyA3IF0uc2V0KCB0aGlzLm1heC54LCB0aGlzLm1heC55LCB0aGlzLm1heC56ICkuYXBwbHlNYXRyaXg0KCBtYXRyaXggKTsgIC8vIDExMVxuXG5cdFx0XHR0aGlzLm1ha2VFbXB0eSgpO1xuXHRcdFx0dGhpcy5zZXRGcm9tUG9pbnRzKCBwb2ludHMgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHR0cmFuc2xhdGU6IGZ1bmN0aW9uICggb2Zmc2V0ICkge1xuXG5cdFx0dGhpcy5taW4uYWRkKCBvZmZzZXQgKTtcblx0XHR0aGlzLm1heC5hZGQoIG9mZnNldCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlcXVhbHM6IGZ1bmN0aW9uICggYm94ICkge1xuXG5cdFx0cmV0dXJuIGJveC5taW4uZXF1YWxzKCB0aGlzLm1pbiApICYmIGJveC5tYXguZXF1YWxzKCB0aGlzLm1heCApO1xuXG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBuZXcgVEhSRUUuQm94MygpLmNvcHkoIHRoaXMgKTtcblxuXHR9XG5cbn07XG5cbi8vIEZpbGU6c3JjL21hdGgvTWF0cml4My5qc1xuXG4vKipcbiAqIEBhdXRob3IgYWx0ZXJlZHEgLyBodHRwOi8vYWx0ZXJlZHF1YWxpYS5jb20vXG4gKiBAYXV0aG9yIFdlc3RMYW5nbGV5IC8gaHR0cDovL2dpdGh1Yi5jb20vV2VzdExhbmdsZXlcbiAqIEBhdXRob3IgYmhvdXN0b24gLyBodHRwOi8vZXhvY29ydGV4LmNvbVxuICovXG5cblRIUkVFLk1hdHJpeDMgPSBmdW5jdGlvbiAoKSB7XG5cblx0dGhpcy5lbGVtZW50cyA9IG5ldyBGbG9hdDMyQXJyYXkoIFtcblxuXHRcdDEsIDAsIDAsXG5cdFx0MCwgMSwgMCxcblx0XHQwLCAwLCAxXG5cblx0XSApO1xuXG5cdGlmICggYXJndW1lbnRzLmxlbmd0aCA+IDAgKSB7XG5cblx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuTWF0cml4MzogdGhlIGNvbnN0cnVjdG9yIG5vIGxvbmdlciByZWFkcyBhcmd1bWVudHMuIHVzZSAuc2V0KCkgaW5zdGVhZC4nICk7XG5cblx0fVxuXG59O1xuXG5USFJFRS5NYXRyaXgzLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogVEhSRUUuTWF0cml4MyxcblxuXHRzZXQ6IGZ1bmN0aW9uICggbjExLCBuMTIsIG4xMywgbjIxLCBuMjIsIG4yMywgbjMxLCBuMzIsIG4zMyApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR0ZVsgMCBdID0gbjExOyB0ZVsgMyBdID0gbjEyOyB0ZVsgNiBdID0gbjEzO1xuXHRcdHRlWyAxIF0gPSBuMjE7IHRlWyA0IF0gPSBuMjI7IHRlWyA3IF0gPSBuMjM7XG5cdFx0dGVbIDIgXSA9IG4zMTsgdGVbIDUgXSA9IG4zMjsgdGVbIDggXSA9IG4zMztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0aWRlbnRpdHk6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuc2V0KFxuXG5cdFx0XHQxLCAwLCAwLFxuXHRcdFx0MCwgMSwgMCxcblx0XHRcdDAsIDAsIDFcblxuXHRcdCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNvcHk6IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdHZhciBtZSA9IG0uZWxlbWVudHM7XG5cblx0XHR0aGlzLnNldChcblxuXHRcdFx0bWVbIDAgXSwgbWVbIDMgXSwgbWVbIDYgXSxcblx0XHRcdG1lWyAxIF0sIG1lWyA0IF0sIG1lWyA3IF0sXG5cdFx0XHRtZVsgMiBdLCBtZVsgNSBdLCBtZVsgOCBdXG5cblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtdWx0aXBseVZlY3RvcjM6IGZ1bmN0aW9uICggdmVjdG9yICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuTWF0cml4MzogLm11bHRpcGx5VmVjdG9yMygpIGhhcyBiZWVuIHJlbW92ZWQuIFVzZSB2ZWN0b3IuYXBwbHlNYXRyaXgzKCBtYXRyaXggKSBpbnN0ZWFkLicgKTtcblx0XHRyZXR1cm4gdmVjdG9yLmFwcGx5TWF0cml4MyggdGhpcyApO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlWZWN0b3IzQXJyYXk6IGZ1bmN0aW9uICggYSApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk1hdHJpeDM6IC5tdWx0aXBseVZlY3RvcjNBcnJheSgpIGhhcyBiZWVuIHJlbmFtZWQuIFVzZSBtYXRyaXguYXBwbHlUb1ZlY3RvcjNBcnJheSggYXJyYXkgKSBpbnN0ZWFkLicgKTtcblx0XHRyZXR1cm4gdGhpcy5hcHBseVRvVmVjdG9yM0FycmF5KCBhICk7XG5cblx0fSxcblxuXHRhcHBseVRvVmVjdG9yM0FycmF5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdjE7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0LCBsZW5ndGggKSB7XG5cblx0XHRcdGlmICggdjEgPT09IHVuZGVmaW5lZCApIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXHRcdFx0aWYgKCBsZW5ndGggPT09IHVuZGVmaW5lZCApIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuXHRcdFx0Zm9yICggdmFyIGkgPSAwLCBqID0gb2Zmc2V0OyBpIDwgbGVuZ3RoOyBpICs9IDMsIGogKz0gMyApIHtcblxuXHRcdFx0XHR2MS5mcm9tQXJyYXkoIGFycmF5LCBqICk7XG5cdFx0XHRcdHYxLmFwcGx5TWF0cml4MyggdGhpcyApO1xuXHRcdFx0XHR2MS50b0FycmF5KCBhcnJheSwgaiApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhcnJheTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGFwcGx5VG9CdWZmZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiBhcHBseVRvQnVmZmVyKCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoICkge1xuXG5cdFx0XHRpZiAoIHYxID09PSB1bmRlZmluZWQgKSB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblx0XHRcdGlmICggbGVuZ3RoID09PSB1bmRlZmluZWQgKSBsZW5ndGggPSBidWZmZXIubGVuZ3RoIC8gYnVmZmVyLml0ZW1TaXplO1xuXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDAsIGogPSBvZmZzZXQ7IGkgPCBsZW5ndGg7IGkgKyssIGogKysgKSB7XG5cblx0XHRcdFx0djEueCA9IGJ1ZmZlci5nZXRYKCBqICk7XG5cdFx0XHRcdHYxLnkgPSBidWZmZXIuZ2V0WSggaiApO1xuXHRcdFx0XHR2MS56ID0gYnVmZmVyLmdldFooIGogKTtcblxuXHRcdFx0XHR2MS5hcHBseU1hdHJpeDMoIHRoaXMgKTtcblxuXHRcdFx0XHRidWZmZXIuc2V0WFlaKCB2MS54LCB2MS55LCB2MS56ICk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGJ1ZmZlcjtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdG11bHRpcGx5U2NhbGFyOiBmdW5jdGlvbiAoIHMgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dGVbIDAgXSAqPSBzOyB0ZVsgMyBdICo9IHM7IHRlWyA2IF0gKj0gcztcblx0XHR0ZVsgMSBdICo9IHM7IHRlWyA0IF0gKj0gczsgdGVbIDcgXSAqPSBzO1xuXHRcdHRlWyAyIF0gKj0gczsgdGVbIDUgXSAqPSBzOyB0ZVsgOCBdICo9IHM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGRldGVybWluYW50OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dmFyIGEgPSB0ZVsgMCBdLCBiID0gdGVbIDEgXSwgYyA9IHRlWyAyIF0sXG5cdFx0XHRkID0gdGVbIDMgXSwgZSA9IHRlWyA0IF0sIGYgPSB0ZVsgNSBdLFxuXHRcdFx0ZyA9IHRlWyA2IF0sIGggPSB0ZVsgNyBdLCBpID0gdGVbIDggXTtcblxuXHRcdHJldHVybiBhICogZSAqIGkgLSBhICogZiAqIGggLSBiICogZCAqIGkgKyBiICogZiAqIGcgKyBjICogZCAqIGggLSBjICogZSAqIGc7XG5cblx0fSxcblxuXHRnZXRJbnZlcnNlOiBmdW5jdGlvbiAoIG1hdHJpeCwgdGhyb3dPbkludmVydGlibGUgKSB7XG5cblx0XHQvLyBpbnB1dDogVEhSRUUuTWF0cml4NFxuXHRcdC8vICggYmFzZWQgb24gaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL3dlYmdsLW1qcy8gKVxuXG5cdFx0dmFyIG1lID0gbWF0cml4LmVsZW1lbnRzO1xuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR0ZVsgMCBdID0gICBtZVsgMTAgXSAqIG1lWyA1IF0gLSBtZVsgNiBdICogbWVbIDkgXTtcblx0XHR0ZVsgMSBdID0gLSBtZVsgMTAgXSAqIG1lWyAxIF0gKyBtZVsgMiBdICogbWVbIDkgXTtcblx0XHR0ZVsgMiBdID0gICBtZVsgNiBdICogbWVbIDEgXSAtIG1lWyAyIF0gKiBtZVsgNSBdO1xuXHRcdHRlWyAzIF0gPSAtIG1lWyAxMCBdICogbWVbIDQgXSArIG1lWyA2IF0gKiBtZVsgOCBdO1xuXHRcdHRlWyA0IF0gPSAgIG1lWyAxMCBdICogbWVbIDAgXSAtIG1lWyAyIF0gKiBtZVsgOCBdO1xuXHRcdHRlWyA1IF0gPSAtIG1lWyA2IF0gKiBtZVsgMCBdICsgbWVbIDIgXSAqIG1lWyA0IF07XG5cdFx0dGVbIDYgXSA9ICAgbWVbIDkgXSAqIG1lWyA0IF0gLSBtZVsgNSBdICogbWVbIDggXTtcblx0XHR0ZVsgNyBdID0gLSBtZVsgOSBdICogbWVbIDAgXSArIG1lWyAxIF0gKiBtZVsgOCBdO1xuXHRcdHRlWyA4IF0gPSAgIG1lWyA1IF0gKiBtZVsgMCBdIC0gbWVbIDEgXSAqIG1lWyA0IF07XG5cblx0XHR2YXIgZGV0ID0gbWVbIDAgXSAqIHRlWyAwIF0gKyBtZVsgMSBdICogdGVbIDMgXSArIG1lWyAyIF0gKiB0ZVsgNiBdO1xuXG5cdFx0Ly8gbm8gaW52ZXJzZVxuXG5cdFx0aWYgKCBkZXQgPT09IDAgKSB7XG5cblx0XHRcdHZhciBtc2cgPSBcIk1hdHJpeDMuZ2V0SW52ZXJzZSgpOiBjYW4ndCBpbnZlcnQgbWF0cml4LCBkZXRlcm1pbmFudCBpcyAwXCI7XG5cblx0XHRcdGlmICggdGhyb3dPbkludmVydGlibGUgfHwgZmFsc2UgKSB7XG5cblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBtc2cgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4oIG1zZyApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuaWRlbnRpdHkoKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9XG5cblx0XHR0aGlzLm11bHRpcGx5U2NhbGFyKCAxLjAgLyBkZXQgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dHJhbnNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdG1wLCBtID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHRtcCA9IG1bIDEgXTsgbVsgMSBdID0gbVsgMyBdOyBtWyAzIF0gPSB0bXA7XG5cdFx0dG1wID0gbVsgMiBdOyBtWyAyIF0gPSBtWyA2IF07IG1bIDYgXSA9IHRtcDtcblx0XHR0bXAgPSBtWyA1IF07IG1bIDUgXSA9IG1bIDcgXTsgbVsgNyBdID0gdG1wO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRmbGF0dGVuVG9BcnJheU9mZnNldDogZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0ICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdGFycmF5WyBvZmZzZXQgICAgIF0gPSB0ZVsgMCBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxIF0gPSB0ZVsgMSBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyAyIF0gPSB0ZVsgMiBdO1xuXG5cdFx0YXJyYXlbIG9mZnNldCArIDMgXSA9IHRlWyAzIF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDQgXSA9IHRlWyA0IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDUgXSA9IHRlWyA1IF07XG5cblx0XHRhcnJheVsgb2Zmc2V0ICsgNiBdID0gdGVbIDYgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgNyBdID0gdGVbIDcgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgOCBdICA9IHRlWyA4IF07XG5cblx0XHRyZXR1cm4gYXJyYXk7XG5cblx0fSxcblxuXHRnZXROb3JtYWxNYXRyaXg6IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdC8vIGlucHV0OiBUSFJFRS5NYXRyaXg0XG5cblx0XHR0aGlzLmdldEludmVyc2UoIG0gKS50cmFuc3Bvc2UoKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dHJhbnNwb3NlSW50b0FycmF5OiBmdW5jdGlvbiAoIHIgKSB7XG5cblx0XHR2YXIgbSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHRyWyAwIF0gPSBtWyAwIF07XG5cdFx0clsgMSBdID0gbVsgMyBdO1xuXHRcdHJbIDIgXSA9IG1bIDYgXTtcblx0XHRyWyAzIF0gPSBtWyAxIF07XG5cdFx0clsgNCBdID0gbVsgNCBdO1xuXHRcdHJbIDUgXSA9IG1bIDcgXTtcblx0XHRyWyA2IF0gPSBtWyAyIF07XG5cdFx0clsgNyBdID0gbVsgNSBdO1xuXHRcdHJbIDggXSA9IG1bIDggXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZnJvbUFycmF5OiBmdW5jdGlvbiAoIGFycmF5ICkge1xuXG5cdFx0dGhpcy5lbGVtZW50cy5zZXQoIGFycmF5ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHRyZXR1cm4gW1xuXHRcdFx0dGVbIDAgXSwgdGVbIDEgXSwgdGVbIDIgXSxcblx0XHRcdHRlWyAzIF0sIHRlWyA0IF0sIHRlWyA1IF0sXG5cdFx0XHR0ZVsgNiBdLCB0ZVsgNyBdLCB0ZVsgOCBdXG5cdFx0XTtcblxuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFRIUkVFLk1hdHJpeDMoKS5mcm9tQXJyYXkoIHRoaXMuZWxlbWVudHMgKTtcblxuXHR9XG5cbn07XG5cbi8vIEZpbGU6c3JjL21hdGgvTWF0cml4NC5qc1xuXG4vKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKiBAYXV0aG9yIHN1cGVyZWdnYmVydCAvIGh0dHA6Ly93d3cucGF1bGJydW50LmNvLnVrL1xuICogQGF1dGhvciBwaGlsb2diIC8gaHR0cDovL2Jsb2cudGhlaml0Lm9yZy9cbiAqIEBhdXRob3Igam9yZGlfcm9zIC8gaHR0cDovL3BsYXR0c29mdC5jb21cbiAqIEBhdXRob3IgRDFwbG8xZCAvIGh0dHA6Ly9naXRodWIuY29tL0QxcGxvMWRcbiAqIEBhdXRob3IgYWx0ZXJlZHEgLyBodHRwOi8vYWx0ZXJlZHF1YWxpYS5jb20vXG4gKiBAYXV0aG9yIG1pa2FlbCBlbXRpbmdlciAvIGh0dHA6Ly9nb21vLnNlL1xuICogQGF1dGhvciB0aW1rbmlwIC8gaHR0cDovL3d3dy5mbG9vcnBsYW5uZXIuY29tL1xuICogQGF1dGhvciBiaG91c3RvbiAvIGh0dHA6Ly9leG9jb3J0ZXguY29tXG4gKiBAYXV0aG9yIFdlc3RMYW5nbGV5IC8gaHR0cDovL2dpdGh1Yi5jb20vV2VzdExhbmdsZXlcbiAqL1xuXG5USFJFRS5NYXRyaXg0ID0gZnVuY3Rpb24gKCkge1xuXG5cdHRoaXMuZWxlbWVudHMgPSBuZXcgRmxvYXQzMkFycmF5KCBbXG5cblx0XHQxLCAwLCAwLCAwLFxuXHRcdDAsIDEsIDAsIDAsXG5cdFx0MCwgMCwgMSwgMCxcblx0XHQwLCAwLCAwLCAxXG5cblx0XSApO1xuXG5cdGlmICggYXJndW1lbnRzLmxlbmd0aCA+IDAgKSB7XG5cblx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuTWF0cml4NDogdGhlIGNvbnN0cnVjdG9yIG5vIGxvbmdlciByZWFkcyBhcmd1bWVudHMuIHVzZSAuc2V0KCkgaW5zdGVhZC4nICk7XG5cblx0fVxuXG59O1xuXG5USFJFRS5NYXRyaXg0LnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogVEhSRUUuTWF0cml4NCxcblxuXHRzZXQ6IGZ1bmN0aW9uICggbjExLCBuMTIsIG4xMywgbjE0LCBuMjEsIG4yMiwgbjIzLCBuMjQsIG4zMSwgbjMyLCBuMzMsIG4zNCwgbjQxLCBuNDIsIG40MywgbjQ0ICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHRlWyAwIF0gPSBuMTE7IHRlWyA0IF0gPSBuMTI7IHRlWyA4IF0gPSBuMTM7IHRlWyAxMiBdID0gbjE0O1xuXHRcdHRlWyAxIF0gPSBuMjE7IHRlWyA1IF0gPSBuMjI7IHRlWyA5IF0gPSBuMjM7IHRlWyAxMyBdID0gbjI0O1xuXHRcdHRlWyAyIF0gPSBuMzE7IHRlWyA2IF0gPSBuMzI7IHRlWyAxMCBdID0gbjMzOyB0ZVsgMTQgXSA9IG4zNDtcblx0XHR0ZVsgMyBdID0gbjQxOyB0ZVsgNyBdID0gbjQyOyB0ZVsgMTEgXSA9IG40MzsgdGVbIDE1IF0gPSBuNDQ7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGlkZW50aXR5OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnNldChcblxuXHRcdFx0MSwgMCwgMCwgMCxcblx0XHRcdDAsIDEsIDAsIDAsXG5cdFx0XHQwLCAwLCAxLCAwLFxuXHRcdFx0MCwgMCwgMCwgMVxuXG5cdFx0KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y29weTogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0dGhpcy5lbGVtZW50cy5zZXQoIG0uZWxlbWVudHMgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZXh0cmFjdFBvc2l0aW9uOiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5NYXRyaXg0OiAuZXh0cmFjdFBvc2l0aW9uKCkgaGFzIGJlZW4gcmVuYW1lZCB0byAuY29weVBvc2l0aW9uKCkuJyApO1xuXHRcdHJldHVybiB0aGlzLmNvcHlQb3NpdGlvbiggbSApO1xuXG5cdH0sXG5cblx0Y29weVBvc2l0aW9uOiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXHRcdHZhciBtZSA9IG0uZWxlbWVudHM7XG5cblx0XHR0ZVsgMTIgXSA9IG1lWyAxMiBdO1xuXHRcdHRlWyAxMyBdID0gbWVbIDEzIF07XG5cdFx0dGVbIDE0IF0gPSBtZVsgMTQgXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZXh0cmFjdEJhc2lzOiBmdW5jdGlvbiAoIHhBeGlzLCB5QXhpcywgekF4aXMgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0eEF4aXMuc2V0KCB0ZVsgMCBdLCB0ZVsgMSBdLCB0ZVsgMiBdICk7XG5cdFx0eUF4aXMuc2V0KCB0ZVsgNCBdLCB0ZVsgNSBdLCB0ZVsgNiBdICk7XG5cdFx0ekF4aXMuc2V0KCB0ZVsgOCBdLCB0ZVsgOSBdLCB0ZVsgMTAgXSApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtYWtlQmFzaXM6IGZ1bmN0aW9uICggeEF4aXMsIHlBeGlzLCB6QXhpcyApIHtcblxuXHRcdHRoaXMuc2V0KFxuXHRcdFx0eEF4aXMueCwgeUF4aXMueCwgekF4aXMueCwgMCxcblx0XHRcdHhBeGlzLnksIHlBeGlzLnksIHpBeGlzLnksIDAsXG5cdFx0XHR4QXhpcy56LCB5QXhpcy56LCB6QXhpcy56LCAwLFxuXHRcdFx0MCwgICAgICAgMCwgICAgICAgMCwgICAgICAgMVxuXHRcdCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGV4dHJhY3RSb3RhdGlvbjogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYxO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggbSApIHtcblxuXHRcdFx0aWYgKCB2MSA9PT0gdW5kZWZpbmVkICkgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXHRcdFx0dmFyIG1lID0gbS5lbGVtZW50cztcblxuXHRcdFx0dmFyIHNjYWxlWCA9IDEgLyB2MS5zZXQoIG1lWyAwIF0sIG1lWyAxIF0sIG1lWyAyIF0gKS5sZW5ndGgoKTtcblx0XHRcdHZhciBzY2FsZVkgPSAxIC8gdjEuc2V0KCBtZVsgNCBdLCBtZVsgNSBdLCBtZVsgNiBdICkubGVuZ3RoKCk7XG5cdFx0XHR2YXIgc2NhbGVaID0gMSAvIHYxLnNldCggbWVbIDggXSwgbWVbIDkgXSwgbWVbIDEwIF0gKS5sZW5ndGgoKTtcblxuXHRcdFx0dGVbIDAgXSA9IG1lWyAwIF0gKiBzY2FsZVg7XG5cdFx0XHR0ZVsgMSBdID0gbWVbIDEgXSAqIHNjYWxlWDtcblx0XHRcdHRlWyAyIF0gPSBtZVsgMiBdICogc2NhbGVYO1xuXG5cdFx0XHR0ZVsgNCBdID0gbWVbIDQgXSAqIHNjYWxlWTtcblx0XHRcdHRlWyA1IF0gPSBtZVsgNSBdICogc2NhbGVZO1xuXHRcdFx0dGVbIDYgXSA9IG1lWyA2IF0gKiBzY2FsZVk7XG5cblx0XHRcdHRlWyA4IF0gPSBtZVsgOCBdICogc2NhbGVaO1xuXHRcdFx0dGVbIDkgXSA9IG1lWyA5IF0gKiBzY2FsZVo7XG5cdFx0XHR0ZVsgMTAgXSA9IG1lWyAxMCBdICogc2NhbGVaO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdG1ha2VSb3RhdGlvbkZyb21FdWxlcjogZnVuY3Rpb24gKCBldWxlciApIHtcblxuXHRcdGlmICggZXVsZXIgaW5zdGFuY2VvZiBUSFJFRS5FdWxlciA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5NYXRyaXg6IC5tYWtlUm90YXRpb25Gcm9tRXVsZXIoKSBub3cgZXhwZWN0cyBhIEV1bGVyIHJvdGF0aW9uIHJhdGhlciB0aGFuIGEgVmVjdG9yMyBhbmQgb3JkZXIuJyApO1xuXG5cdFx0fVxuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHZhciB4ID0gZXVsZXIueCwgeSA9IGV1bGVyLnksIHogPSBldWxlci56O1xuXHRcdHZhciBhID0gTWF0aC5jb3MoIHggKSwgYiA9IE1hdGguc2luKCB4ICk7XG5cdFx0dmFyIGMgPSBNYXRoLmNvcyggeSApLCBkID0gTWF0aC5zaW4oIHkgKTtcblx0XHR2YXIgZSA9IE1hdGguY29zKCB6ICksIGYgPSBNYXRoLnNpbiggeiApO1xuXG5cdFx0aWYgKCBldWxlci5vcmRlciA9PT0gJ1hZWicgKSB7XG5cblx0XHRcdHZhciBhZSA9IGEgKiBlLCBhZiA9IGEgKiBmLCBiZSA9IGIgKiBlLCBiZiA9IGIgKiBmO1xuXG5cdFx0XHR0ZVsgMCBdID0gYyAqIGU7XG5cdFx0XHR0ZVsgNCBdID0gLSBjICogZjtcblx0XHRcdHRlWyA4IF0gPSBkO1xuXG5cdFx0XHR0ZVsgMSBdID0gYWYgKyBiZSAqIGQ7XG5cdFx0XHR0ZVsgNSBdID0gYWUgLSBiZiAqIGQ7XG5cdFx0XHR0ZVsgOSBdID0gLSBiICogYztcblxuXHRcdFx0dGVbIDIgXSA9IGJmIC0gYWUgKiBkO1xuXHRcdFx0dGVbIDYgXSA9IGJlICsgYWYgKiBkO1xuXHRcdFx0dGVbIDEwIF0gPSBhICogYztcblxuXHRcdH0gZWxzZSBpZiAoIGV1bGVyLm9yZGVyID09PSAnWVhaJyApIHtcblxuXHRcdFx0dmFyIGNlID0gYyAqIGUsIGNmID0gYyAqIGYsIGRlID0gZCAqIGUsIGRmID0gZCAqIGY7XG5cblx0XHRcdHRlWyAwIF0gPSBjZSArIGRmICogYjtcblx0XHRcdHRlWyA0IF0gPSBkZSAqIGIgLSBjZjtcblx0XHRcdHRlWyA4IF0gPSBhICogZDtcblxuXHRcdFx0dGVbIDEgXSA9IGEgKiBmO1xuXHRcdFx0dGVbIDUgXSA9IGEgKiBlO1xuXHRcdFx0dGVbIDkgXSA9IC0gYjtcblxuXHRcdFx0dGVbIDIgXSA9IGNmICogYiAtIGRlO1xuXHRcdFx0dGVbIDYgXSA9IGRmICsgY2UgKiBiO1xuXHRcdFx0dGVbIDEwIF0gPSBhICogYztcblxuXHRcdH0gZWxzZSBpZiAoIGV1bGVyLm9yZGVyID09PSAnWlhZJyApIHtcblxuXHRcdFx0dmFyIGNlID0gYyAqIGUsIGNmID0gYyAqIGYsIGRlID0gZCAqIGUsIGRmID0gZCAqIGY7XG5cblx0XHRcdHRlWyAwIF0gPSBjZSAtIGRmICogYjtcblx0XHRcdHRlWyA0IF0gPSAtIGEgKiBmO1xuXHRcdFx0dGVbIDggXSA9IGRlICsgY2YgKiBiO1xuXG5cdFx0XHR0ZVsgMSBdID0gY2YgKyBkZSAqIGI7XG5cdFx0XHR0ZVsgNSBdID0gYSAqIGU7XG5cdFx0XHR0ZVsgOSBdID0gZGYgLSBjZSAqIGI7XG5cblx0XHRcdHRlWyAyIF0gPSAtIGEgKiBkO1xuXHRcdFx0dGVbIDYgXSA9IGI7XG5cdFx0XHR0ZVsgMTAgXSA9IGEgKiBjO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdaWVgnICkge1xuXG5cdFx0XHR2YXIgYWUgPSBhICogZSwgYWYgPSBhICogZiwgYmUgPSBiICogZSwgYmYgPSBiICogZjtcblxuXHRcdFx0dGVbIDAgXSA9IGMgKiBlO1xuXHRcdFx0dGVbIDQgXSA9IGJlICogZCAtIGFmO1xuXHRcdFx0dGVbIDggXSA9IGFlICogZCArIGJmO1xuXG5cdFx0XHR0ZVsgMSBdID0gYyAqIGY7XG5cdFx0XHR0ZVsgNSBdID0gYmYgKiBkICsgYWU7XG5cdFx0XHR0ZVsgOSBdID0gYWYgKiBkIC0gYmU7XG5cblx0XHRcdHRlWyAyIF0gPSAtIGQ7XG5cdFx0XHR0ZVsgNiBdID0gYiAqIGM7XG5cdFx0XHR0ZVsgMTAgXSA9IGEgKiBjO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdZWlgnICkge1xuXG5cdFx0XHR2YXIgYWMgPSBhICogYywgYWQgPSBhICogZCwgYmMgPSBiICogYywgYmQgPSBiICogZDtcblxuXHRcdFx0dGVbIDAgXSA9IGMgKiBlO1xuXHRcdFx0dGVbIDQgXSA9IGJkIC0gYWMgKiBmO1xuXHRcdFx0dGVbIDggXSA9IGJjICogZiArIGFkO1xuXG5cdFx0XHR0ZVsgMSBdID0gZjtcblx0XHRcdHRlWyA1IF0gPSBhICogZTtcblx0XHRcdHRlWyA5IF0gPSAtIGIgKiBlO1xuXG5cdFx0XHR0ZVsgMiBdID0gLSBkICogZTtcblx0XHRcdHRlWyA2IF0gPSBhZCAqIGYgKyBiYztcblx0XHRcdHRlWyAxMCBdID0gYWMgLSBiZCAqIGY7XG5cblx0XHR9IGVsc2UgaWYgKCBldWxlci5vcmRlciA9PT0gJ1haWScgKSB7XG5cblx0XHRcdHZhciBhYyA9IGEgKiBjLCBhZCA9IGEgKiBkLCBiYyA9IGIgKiBjLCBiZCA9IGIgKiBkO1xuXG5cdFx0XHR0ZVsgMCBdID0gYyAqIGU7XG5cdFx0XHR0ZVsgNCBdID0gLSBmO1xuXHRcdFx0dGVbIDggXSA9IGQgKiBlO1xuXG5cdFx0XHR0ZVsgMSBdID0gYWMgKiBmICsgYmQ7XG5cdFx0XHR0ZVsgNSBdID0gYSAqIGU7XG5cdFx0XHR0ZVsgOSBdID0gYWQgKiBmIC0gYmM7XG5cblx0XHRcdHRlWyAyIF0gPSBiYyAqIGYgLSBhZDtcblx0XHRcdHRlWyA2IF0gPSBiICogZTtcblx0XHRcdHRlWyAxMCBdID0gYmQgKiBmICsgYWM7XG5cblx0XHR9XG5cblx0XHQvLyBsYXN0IGNvbHVtblxuXHRcdHRlWyAzIF0gPSAwO1xuXHRcdHRlWyA3IF0gPSAwO1xuXHRcdHRlWyAxMSBdID0gMDtcblxuXHRcdC8vIGJvdHRvbSByb3dcblx0XHR0ZVsgMTIgXSA9IDA7XG5cdFx0dGVbIDEzIF0gPSAwO1xuXHRcdHRlWyAxNCBdID0gMDtcblx0XHR0ZVsgMTUgXSA9IDE7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldFJvdGF0aW9uRnJvbVF1YXRlcm5pb246IGZ1bmN0aW9uICggcSApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk1hdHJpeDQ6IC5zZXRSb3RhdGlvbkZyb21RdWF0ZXJuaW9uKCkgaGFzIGJlZW4gcmVuYW1lZCB0byAubWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb24oKS4nICk7XG5cblx0XHRyZXR1cm4gdGhpcy5tYWtlUm90YXRpb25Gcm9tUXVhdGVybmlvbiggcSApO1xuXG5cdH0sXG5cblx0bWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb246IGZ1bmN0aW9uICggcSApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR2YXIgeCA9IHEueCwgeSA9IHEueSwgeiA9IHEueiwgdyA9IHEudztcblx0XHR2YXIgeDIgPSB4ICsgeCwgeTIgPSB5ICsgeSwgejIgPSB6ICsgejtcblx0XHR2YXIgeHggPSB4ICogeDIsIHh5ID0geCAqIHkyLCB4eiA9IHggKiB6Mjtcblx0XHR2YXIgeXkgPSB5ICogeTIsIHl6ID0geSAqIHoyLCB6eiA9IHogKiB6Mjtcblx0XHR2YXIgd3ggPSB3ICogeDIsIHd5ID0gdyAqIHkyLCB3eiA9IHcgKiB6MjtcblxuXHRcdHRlWyAwIF0gPSAxIC0gKCB5eSArIHp6ICk7XG5cdFx0dGVbIDQgXSA9IHh5IC0gd3o7XG5cdFx0dGVbIDggXSA9IHh6ICsgd3k7XG5cblx0XHR0ZVsgMSBdID0geHkgKyB3ejtcblx0XHR0ZVsgNSBdID0gMSAtICggeHggKyB6eiApO1xuXHRcdHRlWyA5IF0gPSB5eiAtIHd4O1xuXG5cdFx0dGVbIDIgXSA9IHh6IC0gd3k7XG5cdFx0dGVbIDYgXSA9IHl6ICsgd3g7XG5cdFx0dGVbIDEwIF0gPSAxIC0gKCB4eCArIHl5ICk7XG5cblx0XHQvLyBsYXN0IGNvbHVtblxuXHRcdHRlWyAzIF0gPSAwO1xuXHRcdHRlWyA3IF0gPSAwO1xuXHRcdHRlWyAxMSBdID0gMDtcblxuXHRcdC8vIGJvdHRvbSByb3dcblx0XHR0ZVsgMTIgXSA9IDA7XG5cdFx0dGVbIDEzIF0gPSAwO1xuXHRcdHRlWyAxNCBdID0gMDtcblx0XHR0ZVsgMTUgXSA9IDE7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGxvb2tBdDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHgsIHksIHo7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBleWUsIHRhcmdldCwgdXAgKSB7XG5cblx0XHRcdGlmICggeCA9PT0gdW5kZWZpbmVkICkgeCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRpZiAoIHkgPT09IHVuZGVmaW5lZCApIHkgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0aWYgKCB6ID09PSB1bmRlZmluZWQgKSB6ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdFx0ei5zdWJWZWN0b3JzKCBleWUsIHRhcmdldCApLm5vcm1hbGl6ZSgpO1xuXG5cdFx0XHRpZiAoIHoubGVuZ3RoKCkgPT09IDAgKSB7XG5cblx0XHRcdFx0ei56ID0gMTtcblxuXHRcdFx0fVxuXG5cdFx0XHR4LmNyb3NzVmVjdG9ycyggdXAsIHogKS5ub3JtYWxpemUoKTtcblxuXHRcdFx0aWYgKCB4Lmxlbmd0aCgpID09PSAwICkge1xuXG5cdFx0XHRcdHoueCArPSAwLjAwMDE7XG5cdFx0XHRcdHguY3Jvc3NWZWN0b3JzKCB1cCwgeiApLm5vcm1hbGl6ZSgpO1xuXG5cdFx0XHR9XG5cblx0XHRcdHkuY3Jvc3NWZWN0b3JzKCB6LCB4ICk7XG5cblxuXHRcdFx0dGVbIDAgXSA9IHgueDsgdGVbIDQgXSA9IHkueDsgdGVbIDggXSA9IHoueDtcblx0XHRcdHRlWyAxIF0gPSB4Lnk7IHRlWyA1IF0gPSB5Lnk7IHRlWyA5IF0gPSB6Lnk7XG5cdFx0XHR0ZVsgMiBdID0geC56OyB0ZVsgNiBdID0geS56OyB0ZVsgMTAgXSA9IHouejtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRtdWx0aXBseTogZnVuY3Rpb24gKCBtLCBuICkge1xuXG5cdFx0aWYgKCBuICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk1hdHJpeDQ6IC5tdWx0aXBseSgpIG5vdyBvbmx5IGFjY2VwdHMgb25lIGFyZ3VtZW50LiBVc2UgLm11bHRpcGx5TWF0cmljZXMoIGEsIGIgKSBpbnN0ZWFkLicgKTtcblx0XHRcdHJldHVybiB0aGlzLm11bHRpcGx5TWF0cmljZXMoIG0sIG4gKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLm11bHRpcGx5TWF0cmljZXMoIHRoaXMsIG0gKTtcblxuXHR9LFxuXG5cdG11bHRpcGx5TWF0cmljZXM6IGZ1bmN0aW9uICggYSwgYiApIHtcblxuXHRcdHZhciBhZSA9IGEuZWxlbWVudHM7XG5cdFx0dmFyIGJlID0gYi5lbGVtZW50cztcblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dmFyIGExMSA9IGFlWyAwIF0sIGExMiA9IGFlWyA0IF0sIGExMyA9IGFlWyA4IF0sIGExNCA9IGFlWyAxMiBdO1xuXHRcdHZhciBhMjEgPSBhZVsgMSBdLCBhMjIgPSBhZVsgNSBdLCBhMjMgPSBhZVsgOSBdLCBhMjQgPSBhZVsgMTMgXTtcblx0XHR2YXIgYTMxID0gYWVbIDIgXSwgYTMyID0gYWVbIDYgXSwgYTMzID0gYWVbIDEwIF0sIGEzNCA9IGFlWyAxNCBdO1xuXHRcdHZhciBhNDEgPSBhZVsgMyBdLCBhNDIgPSBhZVsgNyBdLCBhNDMgPSBhZVsgMTEgXSwgYTQ0ID0gYWVbIDE1IF07XG5cblx0XHR2YXIgYjExID0gYmVbIDAgXSwgYjEyID0gYmVbIDQgXSwgYjEzID0gYmVbIDggXSwgYjE0ID0gYmVbIDEyIF07XG5cdFx0dmFyIGIyMSA9IGJlWyAxIF0sIGIyMiA9IGJlWyA1IF0sIGIyMyA9IGJlWyA5IF0sIGIyNCA9IGJlWyAxMyBdO1xuXHRcdHZhciBiMzEgPSBiZVsgMiBdLCBiMzIgPSBiZVsgNiBdLCBiMzMgPSBiZVsgMTAgXSwgYjM0ID0gYmVbIDE0IF07XG5cdFx0dmFyIGI0MSA9IGJlWyAzIF0sIGI0MiA9IGJlWyA3IF0sIGI0MyA9IGJlWyAxMSBdLCBiNDQgPSBiZVsgMTUgXTtcblxuXHRcdHRlWyAwIF0gPSBhMTEgKiBiMTEgKyBhMTIgKiBiMjEgKyBhMTMgKiBiMzEgKyBhMTQgKiBiNDE7XG5cdFx0dGVbIDQgXSA9IGExMSAqIGIxMiArIGExMiAqIGIyMiArIGExMyAqIGIzMiArIGExNCAqIGI0Mjtcblx0XHR0ZVsgOCBdID0gYTExICogYjEzICsgYTEyICogYjIzICsgYTEzICogYjMzICsgYTE0ICogYjQzO1xuXHRcdHRlWyAxMiBdID0gYTExICogYjE0ICsgYTEyICogYjI0ICsgYTEzICogYjM0ICsgYTE0ICogYjQ0O1xuXG5cdFx0dGVbIDEgXSA9IGEyMSAqIGIxMSArIGEyMiAqIGIyMSArIGEyMyAqIGIzMSArIGEyNCAqIGI0MTtcblx0XHR0ZVsgNSBdID0gYTIxICogYjEyICsgYTIyICogYjIyICsgYTIzICogYjMyICsgYTI0ICogYjQyO1xuXHRcdHRlWyA5IF0gPSBhMjEgKiBiMTMgKyBhMjIgKiBiMjMgKyBhMjMgKiBiMzMgKyBhMjQgKiBiNDM7XG5cdFx0dGVbIDEzIF0gPSBhMjEgKiBiMTQgKyBhMjIgKiBiMjQgKyBhMjMgKiBiMzQgKyBhMjQgKiBiNDQ7XG5cblx0XHR0ZVsgMiBdID0gYTMxICogYjExICsgYTMyICogYjIxICsgYTMzICogYjMxICsgYTM0ICogYjQxO1xuXHRcdHRlWyA2IF0gPSBhMzEgKiBiMTIgKyBhMzIgKiBiMjIgKyBhMzMgKiBiMzIgKyBhMzQgKiBiNDI7XG5cdFx0dGVbIDEwIF0gPSBhMzEgKiBiMTMgKyBhMzIgKiBiMjMgKyBhMzMgKiBiMzMgKyBhMzQgKiBiNDM7XG5cdFx0dGVbIDE0IF0gPSBhMzEgKiBiMTQgKyBhMzIgKiBiMjQgKyBhMzMgKiBiMzQgKyBhMzQgKiBiNDQ7XG5cblx0XHR0ZVsgMyBdID0gYTQxICogYjExICsgYTQyICogYjIxICsgYTQzICogYjMxICsgYTQ0ICogYjQxO1xuXHRcdHRlWyA3IF0gPSBhNDEgKiBiMTIgKyBhNDIgKiBiMjIgKyBhNDMgKiBiMzIgKyBhNDQgKiBiNDI7XG5cdFx0dGVbIDExIF0gPSBhNDEgKiBiMTMgKyBhNDIgKiBiMjMgKyBhNDMgKiBiMzMgKyBhNDQgKiBiNDM7XG5cdFx0dGVbIDE1IF0gPSBhNDEgKiBiMTQgKyBhNDIgKiBiMjQgKyBhNDMgKiBiMzQgKyBhNDQgKiBiNDQ7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5VG9BcnJheTogZnVuY3Rpb24gKCBhLCBiLCByICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHRoaXMubXVsdGlwbHlNYXRyaWNlcyggYSwgYiApO1xuXG5cdFx0clsgMCBdID0gdGVbIDAgXTsgclsgMSBdID0gdGVbIDEgXTsgclsgMiBdID0gdGVbIDIgXTsgclsgMyBdID0gdGVbIDMgXTtcblx0XHRyWyA0IF0gPSB0ZVsgNCBdOyByWyA1IF0gPSB0ZVsgNSBdOyByWyA2IF0gPSB0ZVsgNiBdOyByWyA3IF0gPSB0ZVsgNyBdO1xuXHRcdHJbIDggXSAgPSB0ZVsgOCBdOyByWyA5IF0gID0gdGVbIDkgXTsgclsgMTAgXSA9IHRlWyAxMCBdOyByWyAxMSBdID0gdGVbIDExIF07XG5cdFx0clsgMTIgXSA9IHRlWyAxMiBdOyByWyAxMyBdID0gdGVbIDEzIF07IHJbIDE0IF0gPSB0ZVsgMTQgXTsgclsgMTUgXSA9IHRlWyAxNSBdO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtdWx0aXBseVNjYWxhcjogZnVuY3Rpb24gKCBzICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHRlWyAwIF0gKj0gczsgdGVbIDQgXSAqPSBzOyB0ZVsgOCBdICo9IHM7IHRlWyAxMiBdICo9IHM7XG5cdFx0dGVbIDEgXSAqPSBzOyB0ZVsgNSBdICo9IHM7IHRlWyA5IF0gKj0gczsgdGVbIDEzIF0gKj0gcztcblx0XHR0ZVsgMiBdICo9IHM7IHRlWyA2IF0gKj0gczsgdGVbIDEwIF0gKj0gczsgdGVbIDE0IF0gKj0gcztcblx0XHR0ZVsgMyBdICo9IHM7IHRlWyA3IF0gKj0gczsgdGVbIDExIF0gKj0gczsgdGVbIDE1IF0gKj0gcztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlWZWN0b3IzOiBmdW5jdGlvbiAoIHZlY3RvciApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk1hdHJpeDQ6IC5tdWx0aXBseVZlY3RvcjMoKSBoYXMgYmVlbiByZW1vdmVkLiBVc2UgdmVjdG9yLmFwcGx5TWF0cml4NCggbWF0cml4ICkgb3IgdmVjdG9yLmFwcGx5UHJvamVjdGlvbiggbWF0cml4ICkgaW5zdGVhZC4nICk7XG5cdFx0cmV0dXJuIHZlY3Rvci5hcHBseVByb2plY3Rpb24oIHRoaXMgKTtcblxuXHR9LFxuXG5cdG11bHRpcGx5VmVjdG9yNDogZnVuY3Rpb24gKCB2ZWN0b3IgKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5NYXRyaXg0OiAubXVsdGlwbHlWZWN0b3I0KCkgaGFzIGJlZW4gcmVtb3ZlZC4gVXNlIHZlY3Rvci5hcHBseU1hdHJpeDQoIG1hdHJpeCApIGluc3RlYWQuJyApO1xuXHRcdHJldHVybiB2ZWN0b3IuYXBwbHlNYXRyaXg0KCB0aGlzICk7XG5cblx0fSxcblxuXHRtdWx0aXBseVZlY3RvcjNBcnJheTogZnVuY3Rpb24gKCBhICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuTWF0cml4NDogLm11bHRpcGx5VmVjdG9yM0FycmF5KCkgaGFzIGJlZW4gcmVuYW1lZC4gVXNlIG1hdHJpeC5hcHBseVRvVmVjdG9yM0FycmF5KCBhcnJheSApIGluc3RlYWQuJyApO1xuXHRcdHJldHVybiB0aGlzLmFwcGx5VG9WZWN0b3IzQXJyYXkoIGEgKTtcblxuXHR9LFxuXG5cdGFwcGx5VG9WZWN0b3IzQXJyYXk6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIGFycmF5LCBvZmZzZXQsIGxlbmd0aCApIHtcblxuXHRcdFx0aWYgKCB2MSA9PT0gdW5kZWZpbmVkICkgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cdFx0XHRpZiAoIGxlbmd0aCA9PT0gdW5kZWZpbmVkICkgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDAsIGogPSBvZmZzZXQ7IGkgPCBsZW5ndGg7IGkgKz0gMywgaiArPSAzICkge1xuXG5cdFx0XHRcdHYxLmZyb21BcnJheSggYXJyYXksIGogKTtcblx0XHRcdFx0djEuYXBwbHlNYXRyaXg0KCB0aGlzICk7XG5cdFx0XHRcdHYxLnRvQXJyYXkoIGFycmF5LCBqICk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGFycmF5O1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0YXBwbHlUb0J1ZmZlcjogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYxO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGFwcGx5VG9CdWZmZXIoIGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGggKSB7XG5cblx0XHRcdGlmICggdjEgPT09IHVuZGVmaW5lZCApIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXHRcdFx0aWYgKCBsZW5ndGggPT09IHVuZGVmaW5lZCApIGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGggLyBidWZmZXIuaXRlbVNpemU7XG5cblx0XHRcdGZvciAoIHZhciBpID0gMCwgaiA9IG9mZnNldDsgaSA8IGxlbmd0aDsgaSArKywgaiArKyApIHtcblxuXHRcdFx0XHR2MS54ID0gYnVmZmVyLmdldFgoIGogKTtcblx0XHRcdFx0djEueSA9IGJ1ZmZlci5nZXRZKCBqICk7XG5cdFx0XHRcdHYxLnogPSBidWZmZXIuZ2V0WiggaiApO1xuXG5cdFx0XHRcdHYxLmFwcGx5TWF0cml4NCggdGhpcyApO1xuXG5cdFx0XHRcdGJ1ZmZlci5zZXRYWVooIHYxLngsIHYxLnksIHYxLnogKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYnVmZmVyO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0cm90YXRlQXhpczogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuTWF0cml4NDogLnJvdGF0ZUF4aXMoKSBoYXMgYmVlbiByZW1vdmVkLiBVc2UgVmVjdG9yMy50cmFuc2Zvcm1EaXJlY3Rpb24oIG1hdHJpeCApIGluc3RlYWQuJyApO1xuXG5cdFx0di50cmFuc2Zvcm1EaXJlY3Rpb24oIHRoaXMgKTtcblxuXHR9LFxuXG5cdGNyb3NzVmVjdG9yOiBmdW5jdGlvbiAoIHZlY3RvciApIHtcblxuXHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk1hdHJpeDQ6IC5jcm9zc1ZlY3RvcigpIGhhcyBiZWVuIHJlbW92ZWQuIFVzZSB2ZWN0b3IuYXBwbHlNYXRyaXg0KCBtYXRyaXggKSBpbnN0ZWFkLicgKTtcblx0XHRyZXR1cm4gdmVjdG9yLmFwcGx5TWF0cml4NCggdGhpcyApO1xuXG5cdH0sXG5cblx0ZGV0ZXJtaW5hbnQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR2YXIgbjExID0gdGVbIDAgXSwgbjEyID0gdGVbIDQgXSwgbjEzID0gdGVbIDggXSwgbjE0ID0gdGVbIDEyIF07XG5cdFx0dmFyIG4yMSA9IHRlWyAxIF0sIG4yMiA9IHRlWyA1IF0sIG4yMyA9IHRlWyA5IF0sIG4yNCA9IHRlWyAxMyBdO1xuXHRcdHZhciBuMzEgPSB0ZVsgMiBdLCBuMzIgPSB0ZVsgNiBdLCBuMzMgPSB0ZVsgMTAgXSwgbjM0ID0gdGVbIDE0IF07XG5cdFx0dmFyIG40MSA9IHRlWyAzIF0sIG40MiA9IHRlWyA3IF0sIG40MyA9IHRlWyAxMSBdLCBuNDQgPSB0ZVsgMTUgXTtcblxuXHRcdC8vVE9ETzogbWFrZSB0aGlzIG1vcmUgZWZmaWNpZW50XG5cdFx0Ly8oIGJhc2VkIG9uIGh0dHA6Ly93d3cuZXVjbGlkZWFuc3BhY2UuY29tL21hdGhzL2FsZ2VicmEvbWF0cml4L2Z1bmN0aW9ucy9pbnZlcnNlL2ZvdXJEL2luZGV4Lmh0bSApXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0bjQxICogKFxuXHRcdFx0XHQrIG4xNCAqIG4yMyAqIG4zMlxuXHRcdFx0XHQgLSBuMTMgKiBuMjQgKiBuMzJcblx0XHRcdFx0IC0gbjE0ICogbjIyICogbjMzXG5cdFx0XHRcdCArIG4xMiAqIG4yNCAqIG4zM1xuXHRcdFx0XHQgKyBuMTMgKiBuMjIgKiBuMzRcblx0XHRcdFx0IC0gbjEyICogbjIzICogbjM0XG5cdFx0XHQpICtcblx0XHRcdG40MiAqIChcblx0XHRcdFx0KyBuMTEgKiBuMjMgKiBuMzRcblx0XHRcdFx0IC0gbjExICogbjI0ICogbjMzXG5cdFx0XHRcdCArIG4xNCAqIG4yMSAqIG4zM1xuXHRcdFx0XHQgLSBuMTMgKiBuMjEgKiBuMzRcblx0XHRcdFx0ICsgbjEzICogbjI0ICogbjMxXG5cdFx0XHRcdCAtIG4xNCAqIG4yMyAqIG4zMVxuXHRcdFx0KSArXG5cdFx0XHRuNDMgKiAoXG5cdFx0XHRcdCsgbjExICogbjI0ICogbjMyXG5cdFx0XHRcdCAtIG4xMSAqIG4yMiAqIG4zNFxuXHRcdFx0XHQgLSBuMTQgKiBuMjEgKiBuMzJcblx0XHRcdFx0ICsgbjEyICogbjIxICogbjM0XG5cdFx0XHRcdCArIG4xNCAqIG4yMiAqIG4zMVxuXHRcdFx0XHQgLSBuMTIgKiBuMjQgKiBuMzFcblx0XHRcdCkgK1xuXHRcdFx0bjQ0ICogKFxuXHRcdFx0XHQtIG4xMyAqIG4yMiAqIG4zMVxuXHRcdFx0XHQgLSBuMTEgKiBuMjMgKiBuMzJcblx0XHRcdFx0ICsgbjExICogbjIyICogbjMzXG5cdFx0XHRcdCArIG4xMyAqIG4yMSAqIG4zMlxuXHRcdFx0XHQgLSBuMTIgKiBuMjEgKiBuMzNcblx0XHRcdFx0ICsgbjEyICogbjIzICogbjMxXG5cdFx0XHQpXG5cblx0XHQpO1xuXG5cdH0sXG5cblx0dHJhbnNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXHRcdHZhciB0bXA7XG5cblx0XHR0bXAgPSB0ZVsgMSBdOyB0ZVsgMSBdID0gdGVbIDQgXTsgdGVbIDQgXSA9IHRtcDtcblx0XHR0bXAgPSB0ZVsgMiBdOyB0ZVsgMiBdID0gdGVbIDggXTsgdGVbIDggXSA9IHRtcDtcblx0XHR0bXAgPSB0ZVsgNiBdOyB0ZVsgNiBdID0gdGVbIDkgXTsgdGVbIDkgXSA9IHRtcDtcblxuXHRcdHRtcCA9IHRlWyAzIF07IHRlWyAzIF0gPSB0ZVsgMTIgXTsgdGVbIDEyIF0gPSB0bXA7XG5cdFx0dG1wID0gdGVbIDcgXTsgdGVbIDcgXSA9IHRlWyAxMyBdOyB0ZVsgMTMgXSA9IHRtcDtcblx0XHR0bXAgPSB0ZVsgMTEgXTsgdGVbIDExIF0gPSB0ZVsgMTQgXTsgdGVbIDE0IF0gPSB0bXA7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGZsYXR0ZW5Ub0FycmF5T2Zmc2V0OiBmdW5jdGlvbiAoIGFycmF5LCBvZmZzZXQgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0YXJyYXlbIG9mZnNldCAgICAgXSA9IHRlWyAwIF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDEgXSA9IHRlWyAxIF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDIgXSA9IHRlWyAyIF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDMgXSA9IHRlWyAzIF07XG5cblx0XHRhcnJheVsgb2Zmc2V0ICsgNCBdID0gdGVbIDQgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgNSBdID0gdGVbIDUgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgNiBdID0gdGVbIDYgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgNyBdID0gdGVbIDcgXTtcblxuXHRcdGFycmF5WyBvZmZzZXQgKyA4IF0gID0gdGVbIDggXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgOSBdICA9IHRlWyA5IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDEwIF0gPSB0ZVsgMTAgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMTEgXSA9IHRlWyAxMSBdO1xuXG5cdFx0YXJyYXlbIG9mZnNldCArIDEyIF0gPSB0ZVsgMTIgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMTMgXSA9IHRlWyAxMyBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxNCBdID0gdGVbIDE0IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDE1IF0gPSB0ZVsgMTUgXTtcblxuXHRcdHJldHVybiBhcnJheTtcblxuXHR9LFxuXG5cdGdldFBvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdjE7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRpZiAoIHYxID09PSB1bmRlZmluZWQgKSB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5NYXRyaXg0OiAuZ2V0UG9zaXRpb24oKSBoYXMgYmVlbiByZW1vdmVkLiBVc2UgVmVjdG9yMy5zZXRGcm9tTWF0cml4UG9zaXRpb24oIG1hdHJpeCApIGluc3RlYWQuJyApO1xuXG5cdFx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXHRcdFx0cmV0dXJuIHYxLnNldCggdGVbIDEyIF0sIHRlWyAxMyBdLCB0ZVsgMTQgXSApO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0c2V0UG9zaXRpb246IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR0ZVsgMTIgXSA9IHYueDtcblx0XHR0ZVsgMTMgXSA9IHYueTtcblx0XHR0ZVsgMTQgXSA9IHYuejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Z2V0SW52ZXJzZTogZnVuY3Rpb24gKCBtLCB0aHJvd09uSW52ZXJ0aWJsZSApIHtcblxuXHRcdC8vIGJhc2VkIG9uIGh0dHA6Ly93d3cuZXVjbGlkZWFuc3BhY2UuY29tL21hdGhzL2FsZ2VicmEvbWF0cml4L2Z1bmN0aW9ucy9pbnZlcnNlL2ZvdXJEL2luZGV4Lmh0bVxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cdFx0dmFyIG1lID0gbS5lbGVtZW50cztcblxuXHRcdHZhciBuMTEgPSBtZVsgMCBdLCBuMTIgPSBtZVsgNCBdLCBuMTMgPSBtZVsgOCBdLCBuMTQgPSBtZVsgMTIgXTtcblx0XHR2YXIgbjIxID0gbWVbIDEgXSwgbjIyID0gbWVbIDUgXSwgbjIzID0gbWVbIDkgXSwgbjI0ID0gbWVbIDEzIF07XG5cdFx0dmFyIG4zMSA9IG1lWyAyIF0sIG4zMiA9IG1lWyA2IF0sIG4zMyA9IG1lWyAxMCBdLCBuMzQgPSBtZVsgMTQgXTtcblx0XHR2YXIgbjQxID0gbWVbIDMgXSwgbjQyID0gbWVbIDcgXSwgbjQzID0gbWVbIDExIF0sIG40NCA9IG1lWyAxNSBdO1xuXG5cdFx0dGVbIDAgXSA9IG4yMyAqIG4zNCAqIG40MiAtIG4yNCAqIG4zMyAqIG40MiArIG4yNCAqIG4zMiAqIG40MyAtIG4yMiAqIG4zNCAqIG40MyAtIG4yMyAqIG4zMiAqIG40NCArIG4yMiAqIG4zMyAqIG40NDtcblx0XHR0ZVsgNCBdID0gbjE0ICogbjMzICogbjQyIC0gbjEzICogbjM0ICogbjQyIC0gbjE0ICogbjMyICogbjQzICsgbjEyICogbjM0ICogbjQzICsgbjEzICogbjMyICogbjQ0IC0gbjEyICogbjMzICogbjQ0O1xuXHRcdHRlWyA4IF0gPSBuMTMgKiBuMjQgKiBuNDIgLSBuMTQgKiBuMjMgKiBuNDIgKyBuMTQgKiBuMjIgKiBuNDMgLSBuMTIgKiBuMjQgKiBuNDMgLSBuMTMgKiBuMjIgKiBuNDQgKyBuMTIgKiBuMjMgKiBuNDQ7XG5cdFx0dGVbIDEyIF0gPSBuMTQgKiBuMjMgKiBuMzIgLSBuMTMgKiBuMjQgKiBuMzIgLSBuMTQgKiBuMjIgKiBuMzMgKyBuMTIgKiBuMjQgKiBuMzMgKyBuMTMgKiBuMjIgKiBuMzQgLSBuMTIgKiBuMjMgKiBuMzQ7XG5cdFx0dGVbIDEgXSA9IG4yNCAqIG4zMyAqIG40MSAtIG4yMyAqIG4zNCAqIG40MSAtIG4yNCAqIG4zMSAqIG40MyArIG4yMSAqIG4zNCAqIG40MyArIG4yMyAqIG4zMSAqIG40NCAtIG4yMSAqIG4zMyAqIG40NDtcblx0XHR0ZVsgNSBdID0gbjEzICogbjM0ICogbjQxIC0gbjE0ICogbjMzICogbjQxICsgbjE0ICogbjMxICogbjQzIC0gbjExICogbjM0ICogbjQzIC0gbjEzICogbjMxICogbjQ0ICsgbjExICogbjMzICogbjQ0O1xuXHRcdHRlWyA5IF0gPSBuMTQgKiBuMjMgKiBuNDEgLSBuMTMgKiBuMjQgKiBuNDEgLSBuMTQgKiBuMjEgKiBuNDMgKyBuMTEgKiBuMjQgKiBuNDMgKyBuMTMgKiBuMjEgKiBuNDQgLSBuMTEgKiBuMjMgKiBuNDQ7XG5cdFx0dGVbIDEzIF0gPSBuMTMgKiBuMjQgKiBuMzEgLSBuMTQgKiBuMjMgKiBuMzEgKyBuMTQgKiBuMjEgKiBuMzMgLSBuMTEgKiBuMjQgKiBuMzMgLSBuMTMgKiBuMjEgKiBuMzQgKyBuMTEgKiBuMjMgKiBuMzQ7XG5cdFx0dGVbIDIgXSA9IG4yMiAqIG4zNCAqIG40MSAtIG4yNCAqIG4zMiAqIG40MSArIG4yNCAqIG4zMSAqIG40MiAtIG4yMSAqIG4zNCAqIG40MiAtIG4yMiAqIG4zMSAqIG40NCArIG4yMSAqIG4zMiAqIG40NDtcblx0XHR0ZVsgNiBdID0gbjE0ICogbjMyICogbjQxIC0gbjEyICogbjM0ICogbjQxIC0gbjE0ICogbjMxICogbjQyICsgbjExICogbjM0ICogbjQyICsgbjEyICogbjMxICogbjQ0IC0gbjExICogbjMyICogbjQ0O1xuXHRcdHRlWyAxMCBdID0gbjEyICogbjI0ICogbjQxIC0gbjE0ICogbjIyICogbjQxICsgbjE0ICogbjIxICogbjQyIC0gbjExICogbjI0ICogbjQyIC0gbjEyICogbjIxICogbjQ0ICsgbjExICogbjIyICogbjQ0O1xuXHRcdHRlWyAxNCBdID0gbjE0ICogbjIyICogbjMxIC0gbjEyICogbjI0ICogbjMxIC0gbjE0ICogbjIxICogbjMyICsgbjExICogbjI0ICogbjMyICsgbjEyICogbjIxICogbjM0IC0gbjExICogbjIyICogbjM0O1xuXHRcdHRlWyAzIF0gPSBuMjMgKiBuMzIgKiBuNDEgLSBuMjIgKiBuMzMgKiBuNDEgLSBuMjMgKiBuMzEgKiBuNDIgKyBuMjEgKiBuMzMgKiBuNDIgKyBuMjIgKiBuMzEgKiBuNDMgLSBuMjEgKiBuMzIgKiBuNDM7XG5cdFx0dGVbIDcgXSA9IG4xMiAqIG4zMyAqIG40MSAtIG4xMyAqIG4zMiAqIG40MSArIG4xMyAqIG4zMSAqIG40MiAtIG4xMSAqIG4zMyAqIG40MiAtIG4xMiAqIG4zMSAqIG40MyArIG4xMSAqIG4zMiAqIG40Mztcblx0XHR0ZVsgMTEgXSA9IG4xMyAqIG4yMiAqIG40MSAtIG4xMiAqIG4yMyAqIG40MSAtIG4xMyAqIG4yMSAqIG40MiArIG4xMSAqIG4yMyAqIG40MiArIG4xMiAqIG4yMSAqIG40MyAtIG4xMSAqIG4yMiAqIG40Mztcblx0XHR0ZVsgMTUgXSA9IG4xMiAqIG4yMyAqIG4zMSAtIG4xMyAqIG4yMiAqIG4zMSArIG4xMyAqIG4yMSAqIG4zMiAtIG4xMSAqIG4yMyAqIG4zMiAtIG4xMiAqIG4yMSAqIG4zMyArIG4xMSAqIG4yMiAqIG4zMztcblxuXHRcdHZhciBkZXQgPSBuMTEgKiB0ZVsgMCBdICsgbjIxICogdGVbIDQgXSArIG4zMSAqIHRlWyA4IF0gKyBuNDEgKiB0ZVsgMTIgXTtcblxuXHRcdGlmICggZGV0ID09PSAwICkge1xuXG5cdFx0XHR2YXIgbXNnID0gXCJUSFJFRS5NYXRyaXg0LmdldEludmVyc2UoKTogY2FuJ3QgaW52ZXJ0IG1hdHJpeCwgZGV0ZXJtaW5hbnQgaXMgMFwiO1xuXG5cdFx0XHRpZiAoIHRocm93T25JbnZlcnRpYmxlIHx8IGZhbHNlICkge1xuXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvciggbXNnICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCBtc2cgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmlkZW50aXR5KCk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5tdWx0aXBseVNjYWxhciggMSAvIGRldCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR0cmFuc2xhdGU6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5NYXRyaXg0OiAudHJhbnNsYXRlKCkgaGFzIGJlZW4gcmVtb3ZlZC4nICk7XG5cblx0fSxcblxuXHRyb3RhdGVYOiBmdW5jdGlvbiAoIGFuZ2xlICkge1xuXG5cdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLk1hdHJpeDQ6IC5yb3RhdGVYKCkgaGFzIGJlZW4gcmVtb3ZlZC4nICk7XG5cblx0fSxcblxuXHRyb3RhdGVZOiBmdW5jdGlvbiAoIGFuZ2xlICkge1xuXG5cdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLk1hdHJpeDQ6IC5yb3RhdGVZKCkgaGFzIGJlZW4gcmVtb3ZlZC4nICk7XG5cblx0fSxcblxuXHRyb3RhdGVaOiBmdW5jdGlvbiAoIGFuZ2xlICkge1xuXG5cdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLk1hdHJpeDQ6IC5yb3RhdGVaKCkgaGFzIGJlZW4gcmVtb3ZlZC4nICk7XG5cblx0fSxcblxuXHRyb3RhdGVCeUF4aXM6IGZ1bmN0aW9uICggYXhpcywgYW5nbGUgKSB7XG5cblx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuTWF0cml4NDogLnJvdGF0ZUJ5QXhpcygpIGhhcyBiZWVuIHJlbW92ZWQuJyApO1xuXG5cdH0sXG5cblx0c2NhbGU6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cdFx0dmFyIHggPSB2LngsIHkgPSB2LnksIHogPSB2Lno7XG5cblx0XHR0ZVsgMCBdICo9IHg7IHRlWyA0IF0gKj0geTsgdGVbIDggXSAqPSB6O1xuXHRcdHRlWyAxIF0gKj0geDsgdGVbIDUgXSAqPSB5OyB0ZVsgOSBdICo9IHo7XG5cdFx0dGVbIDIgXSAqPSB4OyB0ZVsgNiBdICo9IHk7IHRlWyAxMCBdICo9IHo7XG5cdFx0dGVbIDMgXSAqPSB4OyB0ZVsgNyBdICo9IHk7IHRlWyAxMSBdICo9IHo7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGdldE1heFNjYWxlT25BeGlzOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dmFyIHNjYWxlWFNxID0gdGVbIDAgXSAqIHRlWyAwIF0gKyB0ZVsgMSBdICogdGVbIDEgXSArIHRlWyAyIF0gKiB0ZVsgMiBdO1xuXHRcdHZhciBzY2FsZVlTcSA9IHRlWyA0IF0gKiB0ZVsgNCBdICsgdGVbIDUgXSAqIHRlWyA1IF0gKyB0ZVsgNiBdICogdGVbIDYgXTtcblx0XHR2YXIgc2NhbGVaU3EgPSB0ZVsgOCBdICogdGVbIDggXSArIHRlWyA5IF0gKiB0ZVsgOSBdICsgdGVbIDEwIF0gKiB0ZVsgMTAgXTtcblxuXHRcdHJldHVybiBNYXRoLnNxcnQoIE1hdGgubWF4KCBzY2FsZVhTcSwgTWF0aC5tYXgoIHNjYWxlWVNxLCBzY2FsZVpTcSApICkgKTtcblxuXHR9LFxuXG5cdG1ha2VUcmFuc2xhdGlvbjogZnVuY3Rpb24gKCB4LCB5LCB6ICkge1xuXG5cdFx0dGhpcy5zZXQoXG5cblx0XHRcdDEsIDAsIDAsIHgsXG5cdFx0XHQwLCAxLCAwLCB5LFxuXHRcdFx0MCwgMCwgMSwgeixcblx0XHRcdDAsIDAsIDAsIDFcblxuXHRcdCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1ha2VSb3RhdGlvblg6IGZ1bmN0aW9uICggdGhldGEgKSB7XG5cblx0XHR2YXIgYyA9IE1hdGguY29zKCB0aGV0YSApLCBzID0gTWF0aC5zaW4oIHRoZXRhICk7XG5cblx0XHR0aGlzLnNldChcblxuXHRcdFx0MSwgMCwgIDAsIDAsXG5cdFx0XHQwLCBjLCAtIHMsIDAsXG5cdFx0XHQwLCBzLCAgYywgMCxcblx0XHRcdDAsIDAsICAwLCAxXG5cblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtYWtlUm90YXRpb25ZOiBmdW5jdGlvbiAoIHRoZXRhICkge1xuXG5cdFx0dmFyIGMgPSBNYXRoLmNvcyggdGhldGEgKSwgcyA9IE1hdGguc2luKCB0aGV0YSApO1xuXG5cdFx0dGhpcy5zZXQoXG5cblx0XHRcdCBjLCAwLCBzLCAwLFxuXHRcdFx0IDAsIDEsIDAsIDAsXG5cdFx0XHQtIHMsIDAsIGMsIDAsXG5cdFx0XHQgMCwgMCwgMCwgMVxuXG5cdFx0KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWFrZVJvdGF0aW9uWjogZnVuY3Rpb24gKCB0aGV0YSApIHtcblxuXHRcdHZhciBjID0gTWF0aC5jb3MoIHRoZXRhICksIHMgPSBNYXRoLnNpbiggdGhldGEgKTtcblxuXHRcdHRoaXMuc2V0KFxuXG5cdFx0XHRjLCAtIHMsIDAsIDAsXG5cdFx0XHRzLCAgYywgMCwgMCxcblx0XHRcdDAsICAwLCAxLCAwLFxuXHRcdFx0MCwgIDAsIDAsIDFcblxuXHRcdCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1ha2VSb3RhdGlvbkF4aXM6IGZ1bmN0aW9uICggYXhpcywgYW5nbGUgKSB7XG5cblx0XHQvLyBCYXNlZCBvbiBodHRwOi8vd3d3LmdhbWVkZXYubmV0L3JlZmVyZW5jZS9hcnRpY2xlcy9hcnRpY2xlMTE5OS5hc3BcblxuXHRcdHZhciBjID0gTWF0aC5jb3MoIGFuZ2xlICk7XG5cdFx0dmFyIHMgPSBNYXRoLnNpbiggYW5nbGUgKTtcblx0XHR2YXIgdCA9IDEgLSBjO1xuXHRcdHZhciB4ID0gYXhpcy54LCB5ID0gYXhpcy55LCB6ID0gYXhpcy56O1xuXHRcdHZhciB0eCA9IHQgKiB4LCB0eSA9IHQgKiB5O1xuXG5cdFx0dGhpcy5zZXQoXG5cblx0XHRcdHR4ICogeCArIGMsIHR4ICogeSAtIHMgKiB6LCB0eCAqIHogKyBzICogeSwgMCxcblx0XHRcdHR4ICogeSArIHMgKiB6LCB0eSAqIHkgKyBjLCB0eSAqIHogLSBzICogeCwgMCxcblx0XHRcdHR4ICogeiAtIHMgKiB5LCB0eSAqIHogKyBzICogeCwgdCAqIHogKiB6ICsgYywgMCxcblx0XHRcdDAsIDAsIDAsIDFcblxuXHRcdCk7XG5cblx0XHQgcmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtYWtlU2NhbGU6IGZ1bmN0aW9uICggeCwgeSwgeiApIHtcblxuXHRcdHRoaXMuc2V0KFxuXG5cdFx0XHR4LCAwLCAwLCAwLFxuXHRcdFx0MCwgeSwgMCwgMCxcblx0XHRcdDAsIDAsIHosIDAsXG5cdFx0XHQwLCAwLCAwLCAxXG5cblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjb21wb3NlOiBmdW5jdGlvbiAoIHBvc2l0aW9uLCBxdWF0ZXJuaW9uLCBzY2FsZSApIHtcblxuXHRcdHRoaXMubWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb24oIHF1YXRlcm5pb24gKTtcblx0XHR0aGlzLnNjYWxlKCBzY2FsZSApO1xuXHRcdHRoaXMuc2V0UG9zaXRpb24oIHBvc2l0aW9uICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGRlY29tcG9zZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHZlY3RvciwgbWF0cml4O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggcG9zaXRpb24sIHF1YXRlcm5pb24sIHNjYWxlICkge1xuXG5cdFx0XHRpZiAoIHZlY3RvciA9PT0gdW5kZWZpbmVkICkgdmVjdG9yID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHRcdGlmICggbWF0cml4ID09PSB1bmRlZmluZWQgKSBtYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG5cdFx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0XHR2YXIgc3ggPSB2ZWN0b3Iuc2V0KCB0ZVsgMCBdLCB0ZVsgMSBdLCB0ZVsgMiBdICkubGVuZ3RoKCk7XG5cdFx0XHR2YXIgc3kgPSB2ZWN0b3Iuc2V0KCB0ZVsgNCBdLCB0ZVsgNSBdLCB0ZVsgNiBdICkubGVuZ3RoKCk7XG5cdFx0XHR2YXIgc3ogPSB2ZWN0b3Iuc2V0KCB0ZVsgOCBdLCB0ZVsgOSBdLCB0ZVsgMTAgXSApLmxlbmd0aCgpO1xuXG5cdFx0XHQvLyBpZiBkZXRlcm1pbmUgaXMgbmVnYXRpdmUsIHdlIG5lZWQgdG8gaW52ZXJ0IG9uZSBzY2FsZVxuXHRcdFx0dmFyIGRldCA9IHRoaXMuZGV0ZXJtaW5hbnQoKTtcblx0XHRcdGlmICggZGV0IDwgMCApIHtcblxuXHRcdFx0XHRzeCA9IC0gc3g7XG5cblx0XHRcdH1cblxuXHRcdFx0cG9zaXRpb24ueCA9IHRlWyAxMiBdO1xuXHRcdFx0cG9zaXRpb24ueSA9IHRlWyAxMyBdO1xuXHRcdFx0cG9zaXRpb24ueiA9IHRlWyAxNCBdO1xuXG5cdFx0XHQvLyBzY2FsZSB0aGUgcm90YXRpb24gcGFydFxuXG5cdFx0XHRtYXRyaXguZWxlbWVudHMuc2V0KCB0aGlzLmVsZW1lbnRzICk7IC8vIGF0IHRoaXMgcG9pbnQgbWF0cml4IGlzIGluY29tcGxldGUgc28gd2UgY2FuJ3QgdXNlIC5jb3B5KClcblxuXHRcdFx0dmFyIGludlNYID0gMSAvIHN4O1xuXHRcdFx0dmFyIGludlNZID0gMSAvIHN5O1xuXHRcdFx0dmFyIGludlNaID0gMSAvIHN6O1xuXG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDAgXSAqPSBpbnZTWDtcblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMSBdICo9IGludlNYO1xuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyAyIF0gKj0gaW52U1g7XG5cblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgNCBdICo9IGludlNZO1xuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyA1IF0gKj0gaW52U1k7XG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDYgXSAqPSBpbnZTWTtcblxuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyA4IF0gKj0gaW52U1o7XG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDkgXSAqPSBpbnZTWjtcblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMTAgXSAqPSBpbnZTWjtcblxuXHRcdFx0cXVhdGVybmlvbi5zZXRGcm9tUm90YXRpb25NYXRyaXgoIG1hdHJpeCApO1xuXG5cdFx0XHRzY2FsZS54ID0gc3g7XG5cdFx0XHRzY2FsZS55ID0gc3k7XG5cdFx0XHRzY2FsZS56ID0gc3o7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0bWFrZUZydXN0dW06IGZ1bmN0aW9uICggbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXHRcdHZhciB4ID0gMiAqIG5lYXIgLyAoIHJpZ2h0IC0gbGVmdCApO1xuXHRcdHZhciB5ID0gMiAqIG5lYXIgLyAoIHRvcCAtIGJvdHRvbSApO1xuXG5cdFx0dmFyIGEgPSAoIHJpZ2h0ICsgbGVmdCApIC8gKCByaWdodCAtIGxlZnQgKTtcblx0XHR2YXIgYiA9ICggdG9wICsgYm90dG9tICkgLyAoIHRvcCAtIGJvdHRvbSApO1xuXHRcdHZhciBjID0gLSAoIGZhciArIG5lYXIgKSAvICggZmFyIC0gbmVhciApO1xuXHRcdHZhciBkID0gLSAyICogZmFyICogbmVhciAvICggZmFyIC0gbmVhciApO1xuXG5cdFx0dGVbIDAgXSA9IHg7XHR0ZVsgNCBdID0gMDtcdHRlWyA4IF0gPSBhO1x0dGVbIDEyIF0gPSAwO1xuXHRcdHRlWyAxIF0gPSAwO1x0dGVbIDUgXSA9IHk7XHR0ZVsgOSBdID0gYjtcdHRlWyAxMyBdID0gMDtcblx0XHR0ZVsgMiBdID0gMDtcdHRlWyA2IF0gPSAwO1x0dGVbIDEwIF0gPSBjO1x0dGVbIDE0IF0gPSBkO1xuXHRcdHRlWyAzIF0gPSAwO1x0dGVbIDcgXSA9IDA7XHR0ZVsgMTEgXSA9IC0gMTtcdHRlWyAxNSBdID0gMDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWFrZVBlcnNwZWN0aXZlOiBmdW5jdGlvbiAoIGZvdiwgYXNwZWN0LCBuZWFyLCBmYXIgKSB7XG5cblx0XHR2YXIgeW1heCA9IG5lYXIgKiBNYXRoLnRhbiggVEhSRUUuTWF0aC5kZWdUb1JhZCggZm92ICogMC41ICkgKTtcblx0XHR2YXIgeW1pbiA9IC0geW1heDtcblx0XHR2YXIgeG1pbiA9IHltaW4gKiBhc3BlY3Q7XG5cdFx0dmFyIHhtYXggPSB5bWF4ICogYXNwZWN0O1xuXG5cdFx0cmV0dXJuIHRoaXMubWFrZUZydXN0dW0oIHhtaW4sIHhtYXgsIHltaW4sIHltYXgsIG5lYXIsIGZhciApO1xuXG5cdH0sXG5cblx0bWFrZU9ydGhvZ3JhcGhpYzogZnVuY3Rpb24gKCBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20sIG5lYXIsIGZhciApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cdFx0dmFyIHcgPSByaWdodCAtIGxlZnQ7XG5cdFx0dmFyIGggPSB0b3AgLSBib3R0b207XG5cdFx0dmFyIHAgPSBmYXIgLSBuZWFyO1xuXG5cdFx0dmFyIHggPSAoIHJpZ2h0ICsgbGVmdCApIC8gdztcblx0XHR2YXIgeSA9ICggdG9wICsgYm90dG9tICkgLyBoO1xuXHRcdHZhciB6ID0gKCBmYXIgKyBuZWFyICkgLyBwO1xuXG5cdFx0dGVbIDAgXSA9IDIgLyB3O1x0dGVbIDQgXSA9IDA7XHR0ZVsgOCBdID0gMDtcdHRlWyAxMiBdID0gLSB4O1xuXHRcdHRlWyAxIF0gPSAwO1x0dGVbIDUgXSA9IDIgLyBoO1x0dGVbIDkgXSA9IDA7XHR0ZVsgMTMgXSA9IC0geTtcblx0XHR0ZVsgMiBdID0gMDtcdHRlWyA2IF0gPSAwO1x0dGVbIDEwIF0gPSAtIDIgLyBwO1x0dGVbIDE0IF0gPSAtIHo7XG5cdFx0dGVbIDMgXSA9IDA7XHR0ZVsgNyBdID0gMDtcdHRlWyAxMSBdID0gMDtcdHRlWyAxNSBdID0gMTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZnJvbUFycmF5OiBmdW5jdGlvbiAoIGFycmF5ICkge1xuXG5cdFx0dGhpcy5lbGVtZW50cy5zZXQoIGFycmF5ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHRyZXR1cm4gW1xuXHRcdFx0dGVbIDAgXSwgdGVbIDEgXSwgdGVbIDIgXSwgdGVbIDMgXSxcblx0XHRcdHRlWyA0IF0sIHRlWyA1IF0sIHRlWyA2IF0sIHRlWyA3IF0sXG5cdFx0XHR0ZVsgOCBdLCB0ZVsgOSBdLCB0ZVsgMTAgXSwgdGVbIDExIF0sXG5cdFx0XHR0ZVsgMTIgXSwgdGVbIDEzIF0sIHRlWyAxNCBdLCB0ZVsgMTUgXVxuXHRcdF07XG5cblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIG5ldyBUSFJFRS5NYXRyaXg0KCkuZnJvbUFycmF5KCB0aGlzLmVsZW1lbnRzICk7XG5cblx0fVxuXG59O1xuXG4vLyBGaWxlOnNyYy9tYXRoL1JheS5qc1xuXG4vKipcbiAqIEBhdXRob3IgYmhvdXN0b24gLyBodHRwOi8vZXhvY29ydGV4LmNvbVxuICovXG5cblRIUkVFLlJheSA9IGZ1bmN0aW9uICggb3JpZ2luLCBkaXJlY3Rpb24gKSB7XG5cblx0dGhpcy5vcmlnaW4gPSAoIG9yaWdpbiAhPT0gdW5kZWZpbmVkICkgPyBvcmlnaW4gOiBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHR0aGlzLmRpcmVjdGlvbiA9ICggZGlyZWN0aW9uICE9PSB1bmRlZmluZWQgKSA/IGRpcmVjdGlvbiA6IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbn07XG5cblRIUkVFLlJheS5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IFRIUkVFLlJheSxcblxuXHRzZXQ6IGZ1bmN0aW9uICggb3JpZ2luLCBkaXJlY3Rpb24gKSB7XG5cblx0XHR0aGlzLm9yaWdpbi5jb3B5KCBvcmlnaW4gKTtcblx0XHR0aGlzLmRpcmVjdGlvbi5jb3B5KCBkaXJlY3Rpb24gKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y29weTogZnVuY3Rpb24gKCByYXkgKSB7XG5cblx0XHR0aGlzLm9yaWdpbi5jb3B5KCByYXkub3JpZ2luICk7XG5cdFx0dGhpcy5kaXJlY3Rpb24uY29weSggcmF5LmRpcmVjdGlvbiApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhdDogZnVuY3Rpb24gKCB0LCBvcHRpb25hbFRhcmdldCApIHtcblxuXHRcdHZhciByZXN1bHQgPSBvcHRpb25hbFRhcmdldCB8fCBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5jb3B5KCB0aGlzLmRpcmVjdGlvbiApLm11bHRpcGx5U2NhbGFyKCB0ICkuYWRkKCB0aGlzLm9yaWdpbiApO1xuXG5cdH0sXG5cblx0cmVjYXN0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggdCApIHtcblxuXHRcdFx0dGhpcy5vcmlnaW4uY29weSggdGhpcy5hdCggdCwgdjEgKSApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGNsb3Nlc3RQb2ludFRvUG9pbnQ6IGZ1bmN0aW9uICggcG9pbnQsIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0cmVzdWx0LnN1YlZlY3RvcnMoIHBvaW50LCB0aGlzLm9yaWdpbiApO1xuXHRcdHZhciBkaXJlY3Rpb25EaXN0YW5jZSA9IHJlc3VsdC5kb3QoIHRoaXMuZGlyZWN0aW9uICk7XG5cblx0XHRpZiAoIGRpcmVjdGlvbkRpc3RhbmNlIDwgMCApIHtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdC5jb3B5KCB0aGlzLm9yaWdpbiApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5jb3B5KCB0aGlzLmRpcmVjdGlvbiApLm11bHRpcGx5U2NhbGFyKCBkaXJlY3Rpb25EaXN0YW5jZSApLmFkZCggdGhpcy5vcmlnaW4gKTtcblxuXHR9LFxuXG5cdGRpc3RhbmNlVG9Qb2ludDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHBvaW50ICkge1xuXG5cdFx0XHR2YXIgZGlyZWN0aW9uRGlzdGFuY2UgPSB2MS5zdWJWZWN0b3JzKCBwb2ludCwgdGhpcy5vcmlnaW4gKS5kb3QoIHRoaXMuZGlyZWN0aW9uICk7XG5cblx0XHRcdC8vIHBvaW50IGJlaGluZCB0aGUgcmF5XG5cblx0XHRcdGlmICggZGlyZWN0aW9uRGlzdGFuY2UgPCAwICkge1xuXG5cdFx0XHRcdHJldHVybiB0aGlzLm9yaWdpbi5kaXN0YW5jZVRvKCBwb2ludCApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHYxLmNvcHkoIHRoaXMuZGlyZWN0aW9uICkubXVsdGlwbHlTY2FsYXIoIGRpcmVjdGlvbkRpc3RhbmNlICkuYWRkKCB0aGlzLm9yaWdpbiApO1xuXG5cdFx0XHRyZXR1cm4gdjEuZGlzdGFuY2VUbyggcG9pbnQgKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGRpc3RhbmNlU3FUb1NlZ21lbnQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBzZWdDZW50ZXIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHZhciBzZWdEaXIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHZhciBkaWZmID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHYwLCB2MSwgb3B0aW9uYWxQb2ludE9uUmF5LCBvcHRpb25hbFBvaW50T25TZWdtZW50ICkge1xuXG5cdFx0XHQvLyBmcm9tIGh0dHA6Ly93d3cuZ2VvbWV0cmljdG9vbHMuY29tL0xpYk1hdGhlbWF0aWNzL0Rpc3RhbmNlL1dtNURpc3RSYXkzU2VnbWVudDMuY3BwXG5cdFx0XHQvLyBJdCByZXR1cm5zIHRoZSBtaW4gZGlzdGFuY2UgYmV0d2VlbiB0aGUgcmF5IGFuZCB0aGUgc2VnbWVudFxuXHRcdFx0Ly8gZGVmaW5lZCBieSB2MCBhbmQgdjFcblx0XHRcdC8vIEl0IGNhbiBhbHNvIHNldCB0d28gb3B0aW9uYWwgdGFyZ2V0cyA6XG5cdFx0XHQvLyAtIFRoZSBjbG9zZXN0IHBvaW50IG9uIHRoZSByYXlcblx0XHRcdC8vIC0gVGhlIGNsb3Nlc3QgcG9pbnQgb24gdGhlIHNlZ21lbnRcblxuXHRcdFx0c2VnQ2VudGVyLmNvcHkoIHYwICkuYWRkKCB2MSApLm11bHRpcGx5U2NhbGFyKCAwLjUgKTtcblx0XHRcdHNlZ0Rpci5jb3B5KCB2MSApLnN1YiggdjAgKS5ub3JtYWxpemUoKTtcblx0XHRcdGRpZmYuY29weSggdGhpcy5vcmlnaW4gKS5zdWIoIHNlZ0NlbnRlciApO1xuXG5cdFx0XHR2YXIgc2VnRXh0ZW50ID0gdjAuZGlzdGFuY2VUbyggdjEgKSAqIDAuNTtcblx0XHRcdHZhciBhMDEgPSAtIHRoaXMuZGlyZWN0aW9uLmRvdCggc2VnRGlyICk7XG5cdFx0XHR2YXIgYjAgPSBkaWZmLmRvdCggdGhpcy5kaXJlY3Rpb24gKTtcblx0XHRcdHZhciBiMSA9IC0gZGlmZi5kb3QoIHNlZ0RpciApO1xuXHRcdFx0dmFyIGMgPSBkaWZmLmxlbmd0aFNxKCk7XG5cdFx0XHR2YXIgZGV0ID0gTWF0aC5hYnMoIDEgLSBhMDEgKiBhMDEgKTtcblx0XHRcdHZhciBzMCwgczEsIHNxckRpc3QsIGV4dERldDtcblxuXHRcdFx0aWYgKCBkZXQgPiAwICkge1xuXG5cdFx0XHRcdC8vIFRoZSByYXkgYW5kIHNlZ21lbnQgYXJlIG5vdCBwYXJhbGxlbC5cblxuXHRcdFx0XHRzMCA9IGEwMSAqIGIxIC0gYjA7XG5cdFx0XHRcdHMxID0gYTAxICogYjAgLSBiMTtcblx0XHRcdFx0ZXh0RGV0ID0gc2VnRXh0ZW50ICogZGV0O1xuXG5cdFx0XHRcdGlmICggczAgPj0gMCApIHtcblxuXHRcdFx0XHRcdGlmICggczEgPj0gLSBleHREZXQgKSB7XG5cblx0XHRcdFx0XHRcdGlmICggczEgPD0gZXh0RGV0ICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIHJlZ2lvbiAwXG5cdFx0XHRcdFx0XHRcdC8vIE1pbmltdW0gYXQgaW50ZXJpb3IgcG9pbnRzIG9mIHJheSBhbmQgc2VnbWVudC5cblxuXHRcdFx0XHRcdFx0XHR2YXIgaW52RGV0ID0gMSAvIGRldDtcblx0XHRcdFx0XHRcdFx0czAgKj0gaW52RGV0O1xuXHRcdFx0XHRcdFx0XHRzMSAqPSBpbnZEZXQ7XG5cdFx0XHRcdFx0XHRcdHNxckRpc3QgPSBzMCAqICggczAgKyBhMDEgKiBzMSArIDIgKiBiMCApICsgczEgKiAoIGEwMSAqIHMwICsgczEgKyAyICogYjEgKSArIGM7XG5cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gcmVnaW9uIDFcblxuXHRcdFx0XHRcdFx0XHRzMSA9IHNlZ0V4dGVudDtcblx0XHRcdFx0XHRcdFx0czAgPSBNYXRoLm1heCggMCwgLSAoIGEwMSAqIHMxICsgYjAgKSApO1xuXHRcdFx0XHRcdFx0XHRzcXJEaXN0ID0gLSBzMCAqIHMwICsgczEgKiAoIHMxICsgMiAqIGIxICkgKyBjO1xuXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHQvLyByZWdpb24gNVxuXG5cdFx0XHRcdFx0XHRzMSA9IC0gc2VnRXh0ZW50O1xuXHRcdFx0XHRcdFx0czAgPSBNYXRoLm1heCggMCwgLSAoIGEwMSAqIHMxICsgYjAgKSApO1xuXHRcdFx0XHRcdFx0c3FyRGlzdCA9IC0gczAgKiBzMCArIHMxICogKCBzMSArIDIgKiBiMSApICsgYztcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0aWYgKCBzMSA8PSAtIGV4dERldCApIHtcblxuXHRcdFx0XHRcdFx0Ly8gcmVnaW9uIDRcblxuXHRcdFx0XHRcdFx0czAgPSBNYXRoLm1heCggMCwgLSAoIC0gYTAxICogc2VnRXh0ZW50ICsgYjAgKSApO1xuXHRcdFx0XHRcdFx0czEgPSAoIHMwID4gMCApID8gLSBzZWdFeHRlbnQgOiBNYXRoLm1pbiggTWF0aC5tYXgoIC0gc2VnRXh0ZW50LCAtIGIxICksIHNlZ0V4dGVudCApO1xuXHRcdFx0XHRcdFx0c3FyRGlzdCA9IC0gczAgKiBzMCArIHMxICogKCBzMSArIDIgKiBiMSApICsgYztcblxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoIHMxIDw9IGV4dERldCApIHtcblxuXHRcdFx0XHRcdFx0Ly8gcmVnaW9uIDNcblxuXHRcdFx0XHRcdFx0czAgPSAwO1xuXHRcdFx0XHRcdFx0czEgPSBNYXRoLm1pbiggTWF0aC5tYXgoIC0gc2VnRXh0ZW50LCAtIGIxICksIHNlZ0V4dGVudCApO1xuXHRcdFx0XHRcdFx0c3FyRGlzdCA9IHMxICogKCBzMSArIDIgKiBiMSApICsgYztcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdC8vIHJlZ2lvbiAyXG5cblx0XHRcdFx0XHRcdHMwID0gTWF0aC5tYXgoIDAsIC0gKCBhMDEgKiBzZWdFeHRlbnQgKyBiMCApICk7XG5cdFx0XHRcdFx0XHRzMSA9ICggczAgPiAwICkgPyBzZWdFeHRlbnQgOiBNYXRoLm1pbiggTWF0aC5tYXgoIC0gc2VnRXh0ZW50LCAtIGIxICksIHNlZ0V4dGVudCApO1xuXHRcdFx0XHRcdFx0c3FyRGlzdCA9IC0gczAgKiBzMCArIHMxICogKCBzMSArIDIgKiBiMSApICsgYztcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gUmF5IGFuZCBzZWdtZW50IGFyZSBwYXJhbGxlbC5cblxuXHRcdFx0XHRzMSA9ICggYTAxID4gMCApID8gLSBzZWdFeHRlbnQgOiBzZWdFeHRlbnQ7XG5cdFx0XHRcdHMwID0gTWF0aC5tYXgoIDAsIC0gKCBhMDEgKiBzMSArIGIwICkgKTtcblx0XHRcdFx0c3FyRGlzdCA9IC0gczAgKiBzMCArIHMxICogKCBzMSArIDIgKiBiMSApICsgYztcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIG9wdGlvbmFsUG9pbnRPblJheSApIHtcblxuXHRcdFx0XHRvcHRpb25hbFBvaW50T25SYXkuY29weSggdGhpcy5kaXJlY3Rpb24gKS5tdWx0aXBseVNjYWxhciggczAgKS5hZGQoIHRoaXMub3JpZ2luICk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBvcHRpb25hbFBvaW50T25TZWdtZW50ICkge1xuXG5cdFx0XHRcdG9wdGlvbmFsUG9pbnRPblNlZ21lbnQuY29weSggc2VnRGlyICkubXVsdGlwbHlTY2FsYXIoIHMxICkuYWRkKCBzZWdDZW50ZXIgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc3FyRGlzdDtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cblx0aXNJbnRlcnNlY3Rpb25TcGhlcmU6IGZ1bmN0aW9uICggc3BoZXJlICkge1xuXG5cdFx0cmV0dXJuIHRoaXMuZGlzdGFuY2VUb1BvaW50KCBzcGhlcmUuY2VudGVyICkgPD0gc3BoZXJlLnJhZGl1cztcblxuXHR9LFxuXG5cdGludGVyc2VjdFNwaGVyZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gZnJvbSBodHRwOi8vd3d3LnNjcmF0Y2hhcGl4ZWwuY29tL2xlc3NvbnMvM2QtYmFzaWMtbGVzc29ucy9sZXNzb24tNy1pbnRlcnNlY3Rpbmctc2ltcGxlLXNoYXBlcy9yYXktc3BoZXJlLWludGVyc2VjdGlvbi9cblxuXHRcdHZhciB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBzcGhlcmUsIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0XHR2MS5zdWJWZWN0b3JzKCBzcGhlcmUuY2VudGVyLCB0aGlzLm9yaWdpbiApO1xuXG5cdFx0XHR2YXIgdGNhID0gdjEuZG90KCB0aGlzLmRpcmVjdGlvbiApO1xuXG5cdFx0XHR2YXIgZDIgPSB2MS5kb3QoIHYxICkgLSB0Y2EgKiB0Y2E7XG5cblx0XHRcdHZhciByYWRpdXMyID0gc3BoZXJlLnJhZGl1cyAqIHNwaGVyZS5yYWRpdXM7XG5cblx0XHRcdGlmICggZDIgPiByYWRpdXMyICkgcmV0dXJuIG51bGw7XG5cblx0XHRcdHZhciB0aGMgPSBNYXRoLnNxcnQoIHJhZGl1czIgLSBkMiApO1xuXG5cdFx0XHQvLyB0MCA9IGZpcnN0IGludGVyc2VjdCBwb2ludCAtIGVudHJhbmNlIG9uIGZyb250IG9mIHNwaGVyZVxuXHRcdFx0dmFyIHQwID0gdGNhIC0gdGhjO1xuXG5cdFx0XHQvLyB0MSA9IHNlY29uZCBpbnRlcnNlY3QgcG9pbnQgLSBleGl0IHBvaW50IG9uIGJhY2sgb2Ygc3BoZXJlXG5cdFx0XHR2YXIgdDEgPSB0Y2EgKyB0aGM7XG5cblx0XHRcdC8vIHRlc3QgdG8gc2VlIGlmIGJvdGggdDAgYW5kIHQxIGFyZSBiZWhpbmQgdGhlIHJheSAtIGlmIHNvLCByZXR1cm4gbnVsbFxuXHRcdFx0aWYgKCB0MCA8IDAgJiYgdDEgPCAwICkgcmV0dXJuIG51bGw7XG5cblx0XHRcdC8vIHRlc3QgdG8gc2VlIGlmIHQwIGlzIGJlaGluZCB0aGUgcmF5OlxuXHRcdFx0Ly8gaWYgaXQgaXMsIHRoZSByYXkgaXMgaW5zaWRlIHRoZSBzcGhlcmUsIHNvIHJldHVybiB0aGUgc2Vjb25kIGV4aXQgcG9pbnQgc2NhbGVkIGJ5IHQxLFxuXHRcdFx0Ly8gaW4gb3JkZXIgdG8gYWx3YXlzIHJldHVybiBhbiBpbnRlcnNlY3QgcG9pbnQgdGhhdCBpcyBpbiBmcm9udCBvZiB0aGUgcmF5LlxuXHRcdFx0aWYgKCB0MCA8IDAgKSByZXR1cm4gdGhpcy5hdCggdDEsIG9wdGlvbmFsVGFyZ2V0ICk7XG5cblx0XHRcdC8vIGVsc2UgdDAgaXMgaW4gZnJvbnQgb2YgdGhlIHJheSwgc28gcmV0dXJuIHRoZSBmaXJzdCBjb2xsaXNpb24gcG9pbnQgc2NhbGVkIGJ5IHQwXG5cdFx0XHRyZXR1cm4gdGhpcy5hdCggdDAsIG9wdGlvbmFsVGFyZ2V0ICk7XG5cblx0XHR9XG5cblx0fSgpLFxuXG5cdGlzSW50ZXJzZWN0aW9uUGxhbmU6IGZ1bmN0aW9uICggcGxhbmUgKSB7XG5cblx0XHQvLyBjaGVjayBpZiB0aGUgcmF5IGxpZXMgb24gdGhlIHBsYW5lIGZpcnN0XG5cblx0XHR2YXIgZGlzdFRvUG9pbnQgPSBwbGFuZS5kaXN0YW5jZVRvUG9pbnQoIHRoaXMub3JpZ2luICk7XG5cblx0XHRpZiAoIGRpc3RUb1BvaW50ID09PSAwICkge1xuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdH1cblxuXHRcdHZhciBkZW5vbWluYXRvciA9IHBsYW5lLm5vcm1hbC5kb3QoIHRoaXMuZGlyZWN0aW9uICk7XG5cblx0XHRpZiAoIGRlbm9taW5hdG9yICogZGlzdFRvUG9pbnQgPCAwICkge1xuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdH1cblxuXHRcdC8vIHJheSBvcmlnaW4gaXMgYmVoaW5kIHRoZSBwbGFuZSAoYW5kIGlzIHBvaW50aW5nIGJlaGluZCBpdClcblxuXHRcdHJldHVybiBmYWxzZTtcblxuXHR9LFxuXG5cdGRpc3RhbmNlVG9QbGFuZTogZnVuY3Rpb24gKCBwbGFuZSApIHtcblxuXHRcdHZhciBkZW5vbWluYXRvciA9IHBsYW5lLm5vcm1hbC5kb3QoIHRoaXMuZGlyZWN0aW9uICk7XG5cdFx0aWYgKCBkZW5vbWluYXRvciA9PT0gMCApIHtcblxuXHRcdFx0Ly8gbGluZSBpcyBjb3BsYW5hciwgcmV0dXJuIG9yaWdpblxuXHRcdFx0aWYgKCBwbGFuZS5kaXN0YW5jZVRvUG9pbnQoIHRoaXMub3JpZ2luICkgPT09IDAgKSB7XG5cblx0XHRcdFx0cmV0dXJuIDA7XG5cblx0XHRcdH1cblxuXHRcdFx0Ly8gTnVsbCBpcyBwcmVmZXJhYmxlIHRvIHVuZGVmaW5lZCBzaW5jZSB1bmRlZmluZWQgbWVhbnMuLi4uIGl0IGlzIHVuZGVmaW5lZFxuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdH1cblxuXHRcdHZhciB0ID0gLSAoIHRoaXMub3JpZ2luLmRvdCggcGxhbmUubm9ybWFsICkgKyBwbGFuZS5jb25zdGFudCApIC8gZGVub21pbmF0b3I7XG5cblx0XHQvLyBSZXR1cm4gaWYgdGhlIHJheSBuZXZlciBpbnRlcnNlY3RzIHRoZSBwbGFuZVxuXG5cdFx0cmV0dXJuIHQgPj0gMCA/IHQgOiAgbnVsbDtcblxuXHR9LFxuXG5cdGludGVyc2VjdFBsYW5lOiBmdW5jdGlvbiAoIHBsYW5lLCBvcHRpb25hbFRhcmdldCApIHtcblxuXHRcdHZhciB0ID0gdGhpcy5kaXN0YW5jZVRvUGxhbmUoIHBsYW5lICk7XG5cblx0XHRpZiAoIHQgPT09IG51bGwgKSB7XG5cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmF0KCB0LCBvcHRpb25hbFRhcmdldCApO1xuXG5cdH0sXG5cblx0aXNJbnRlcnNlY3Rpb25Cb3g6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIGJveCApIHtcblxuXHRcdFx0cmV0dXJuIHRoaXMuaW50ZXJzZWN0Qm94KCBib3gsIHYgKSAhPT0gbnVsbDtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGludGVyc2VjdEJveDogZnVuY3Rpb24gKCBib3gsIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0Ly8gaHR0cDovL3d3dy5zY3JhdGNoYXBpeGVsLmNvbS9sZXNzb25zLzNkLWJhc2ljLWxlc3NvbnMvbGVzc29uLTctaW50ZXJzZWN0aW5nLXNpbXBsZS1zaGFwZXMvcmF5LWJveC1pbnRlcnNlY3Rpb24vXG5cblx0XHR2YXIgdG1pbix0bWF4LHR5bWluLHR5bWF4LHR6bWluLHR6bWF4O1xuXG5cdFx0dmFyIGludmRpcnggPSAxIC8gdGhpcy5kaXJlY3Rpb24ueCxcblx0XHRcdGludmRpcnkgPSAxIC8gdGhpcy5kaXJlY3Rpb24ueSxcblx0XHRcdGludmRpcnogPSAxIC8gdGhpcy5kaXJlY3Rpb24uejtcblxuXHRcdHZhciBvcmlnaW4gPSB0aGlzLm9yaWdpbjtcblxuXHRcdGlmICggaW52ZGlyeCA+PSAwICkge1xuXG5cdFx0XHR0bWluID0gKCBib3gubWluLnggLSBvcmlnaW4ueCApICogaW52ZGlyeDtcblx0XHRcdHRtYXggPSAoIGJveC5tYXgueCAtIG9yaWdpbi54ICkgKiBpbnZkaXJ4O1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dG1pbiA9ICggYm94Lm1heC54IC0gb3JpZ2luLnggKSAqIGludmRpcng7XG5cdFx0XHR0bWF4ID0gKCBib3gubWluLnggLSBvcmlnaW4ueCApICogaW52ZGlyeDtcblx0XHR9XG5cblx0XHRpZiAoIGludmRpcnkgPj0gMCApIHtcblxuXHRcdFx0dHltaW4gPSAoIGJveC5taW4ueSAtIG9yaWdpbi55ICkgKiBpbnZkaXJ5O1xuXHRcdFx0dHltYXggPSAoIGJveC5tYXgueSAtIG9yaWdpbi55ICkgKiBpbnZkaXJ5O1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dHltaW4gPSAoIGJveC5tYXgueSAtIG9yaWdpbi55ICkgKiBpbnZkaXJ5O1xuXHRcdFx0dHltYXggPSAoIGJveC5taW4ueSAtIG9yaWdpbi55ICkgKiBpbnZkaXJ5O1xuXHRcdH1cblxuXHRcdGlmICggKCB0bWluID4gdHltYXggKSB8fCAoIHR5bWluID4gdG1heCApICkgcmV0dXJuIG51bGw7XG5cblx0XHQvLyBUaGVzZSBsaW5lcyBhbHNvIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSB0bWluIG9yIHRtYXggaXMgTmFOXG5cdFx0Ly8gKHJlc3VsdCBvZiAwICogSW5maW5pdHkpLiB4ICE9PSB4IHJldHVybnMgdHJ1ZSBpZiB4IGlzIE5hTlxuXG5cdFx0aWYgKCB0eW1pbiA+IHRtaW4gfHwgdG1pbiAhPT0gdG1pbiApIHRtaW4gPSB0eW1pbjtcblxuXHRcdGlmICggdHltYXggPCB0bWF4IHx8IHRtYXggIT09IHRtYXggKSB0bWF4ID0gdHltYXg7XG5cblx0XHRpZiAoIGludmRpcnogPj0gMCApIHtcblxuXHRcdFx0dHptaW4gPSAoIGJveC5taW4ueiAtIG9yaWdpbi56ICkgKiBpbnZkaXJ6O1xuXHRcdFx0dHptYXggPSAoIGJveC5tYXgueiAtIG9yaWdpbi56ICkgKiBpbnZkaXJ6O1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dHptaW4gPSAoIGJveC5tYXgueiAtIG9yaWdpbi56ICkgKiBpbnZkaXJ6O1xuXHRcdFx0dHptYXggPSAoIGJveC5taW4ueiAtIG9yaWdpbi56ICkgKiBpbnZkaXJ6O1xuXHRcdH1cblxuXHRcdGlmICggKCB0bWluID4gdHptYXggKSB8fCAoIHR6bWluID4gdG1heCApICkgcmV0dXJuIG51bGw7XG5cblx0XHRpZiAoIHR6bWluID4gdG1pbiB8fCB0bWluICE9PSB0bWluICkgdG1pbiA9IHR6bWluO1xuXG5cdFx0aWYgKCB0em1heCA8IHRtYXggfHwgdG1heCAhPT0gdG1heCApIHRtYXggPSB0em1heDtcblxuXHRcdC8vcmV0dXJuIHBvaW50IGNsb3Nlc3QgdG8gdGhlIHJheSAocG9zaXRpdmUgc2lkZSlcblxuXHRcdGlmICggdG1heCA8IDAgKSByZXR1cm4gbnVsbDtcblxuXHRcdHJldHVybiB0aGlzLmF0KCB0bWluID49IDAgPyB0bWluIDogdG1heCwgb3B0aW9uYWxUYXJnZXQgKTtcblxuXHR9LFxuXG5cdGludGVyc2VjdFRyaWFuZ2xlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBDb21wdXRlIHRoZSBvZmZzZXQgb3JpZ2luLCBlZGdlcywgYW5kIG5vcm1hbC5cblx0XHR2YXIgZGlmZiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0dmFyIGVkZ2UxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHR2YXIgZWRnZTIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHZhciBub3JtYWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggYSwgYiwgYywgYmFja2ZhY2VDdWxsaW5nLCBvcHRpb25hbFRhcmdldCApIHtcblxuXHRcdFx0Ly8gZnJvbSBodHRwOi8vd3d3Lmdlb21ldHJpY3Rvb2xzLmNvbS9MaWJNYXRoZW1hdGljcy9JbnRlcnNlY3Rpb24vV201SW50clJheTNUcmlhbmdsZTMuY3BwXG5cblx0XHRcdGVkZ2UxLnN1YlZlY3RvcnMoIGIsIGEgKTtcblx0XHRcdGVkZ2UyLnN1YlZlY3RvcnMoIGMsIGEgKTtcblx0XHRcdG5vcm1hbC5jcm9zc1ZlY3RvcnMoIGVkZ2UxLCBlZGdlMiApO1xuXG5cdFx0XHQvLyBTb2x2ZSBRICsgdCpEID0gYjEqRTEgKyBiMipFMiAoUSA9IGtEaWZmLCBEID0gcmF5IGRpcmVjdGlvbixcblx0XHRcdC8vIEUxID0ga0VkZ2UxLCBFMiA9IGtFZGdlMiwgTiA9IENyb3NzKEUxLEUyKSkgYnlcblx0XHRcdC8vICAgfERvdChELE4pfCpiMSA9IHNpZ24oRG90KEQsTikpKkRvdChELENyb3NzKFEsRTIpKVxuXHRcdFx0Ly8gICB8RG90KEQsTil8KmIyID0gc2lnbihEb3QoRCxOKSkqRG90KEQsQ3Jvc3MoRTEsUSkpXG5cdFx0XHQvLyAgIHxEb3QoRCxOKXwqdCA9IC1zaWduKERvdChELE4pKSpEb3QoUSxOKVxuXHRcdFx0dmFyIERkTiA9IHRoaXMuZGlyZWN0aW9uLmRvdCggbm9ybWFsICk7XG5cdFx0XHR2YXIgc2lnbjtcblxuXHRcdFx0aWYgKCBEZE4gPiAwICkge1xuXG5cdFx0XHRcdGlmICggYmFja2ZhY2VDdWxsaW5nICkgcmV0dXJuIG51bGw7XG5cdFx0XHRcdHNpZ24gPSAxO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCBEZE4gPCAwICkge1xuXG5cdFx0XHRcdHNpZ24gPSAtIDE7XG5cdFx0XHRcdERkTiA9IC0gRGROO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHJldHVybiBudWxsO1xuXG5cdFx0XHR9XG5cblx0XHRcdGRpZmYuc3ViVmVjdG9ycyggdGhpcy5vcmlnaW4sIGEgKTtcblx0XHRcdHZhciBEZFF4RTIgPSBzaWduICogdGhpcy5kaXJlY3Rpb24uZG90KCBlZGdlMi5jcm9zc1ZlY3RvcnMoIGRpZmYsIGVkZ2UyICkgKTtcblxuXHRcdFx0Ly8gYjEgPCAwLCBubyBpbnRlcnNlY3Rpb25cblx0XHRcdGlmICggRGRReEUyIDwgMCApIHtcblxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgRGRFMXhRID0gc2lnbiAqIHRoaXMuZGlyZWN0aW9uLmRvdCggZWRnZTEuY3Jvc3MoIGRpZmYgKSApO1xuXG5cdFx0XHQvLyBiMiA8IDAsIG5vIGludGVyc2VjdGlvblxuXHRcdFx0aWYgKCBEZEUxeFEgPCAwICkge1xuXG5cdFx0XHRcdHJldHVybiBudWxsO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIGIxK2IyID4gMSwgbm8gaW50ZXJzZWN0aW9uXG5cdFx0XHRpZiAoIERkUXhFMiArIERkRTF4USA+IERkTiApIHtcblxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBMaW5lIGludGVyc2VjdHMgdHJpYW5nbGUsIGNoZWNrIGlmIHJheSBkb2VzLlxuXHRcdFx0dmFyIFFkTiA9IC0gc2lnbiAqIGRpZmYuZG90KCBub3JtYWwgKTtcblxuXHRcdFx0Ly8gdCA8IDAsIG5vIGludGVyc2VjdGlvblxuXHRcdFx0aWYgKCBRZE4gPCAwICkge1xuXG5cdFx0XHRcdHJldHVybiBudWxsO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIFJheSBpbnRlcnNlY3RzIHRyaWFuZ2xlLlxuXHRcdFx0cmV0dXJuIHRoaXMuYXQoIFFkTiAvIERkTiwgb3B0aW9uYWxUYXJnZXQgKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGFwcGx5TWF0cml4NDogZnVuY3Rpb24gKCBtYXRyaXg0ICkge1xuXG5cdFx0dGhpcy5kaXJlY3Rpb24uYWRkKCB0aGlzLm9yaWdpbiApLmFwcGx5TWF0cml4NCggbWF0cml4NCApO1xuXHRcdHRoaXMub3JpZ2luLmFwcGx5TWF0cml4NCggbWF0cml4NCApO1xuXHRcdHRoaXMuZGlyZWN0aW9uLnN1YiggdGhpcy5vcmlnaW4gKTtcblx0XHR0aGlzLmRpcmVjdGlvbi5ub3JtYWxpemUoKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGVxdWFsczogZnVuY3Rpb24gKCByYXkgKSB7XG5cblx0XHRyZXR1cm4gcmF5Lm9yaWdpbi5lcXVhbHMoIHRoaXMub3JpZ2luICkgJiYgcmF5LmRpcmVjdGlvbi5lcXVhbHMoIHRoaXMuZGlyZWN0aW9uICk7XG5cblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIG5ldyBUSFJFRS5SYXkoKS5jb3B5KCB0aGlzICk7XG5cblx0fVxuXG59O1xuXG4vLyBGaWxlOnNyYy9tYXRoL1NwaGVyZS5qc1xuXG4vKipcbiAqIEBhdXRob3IgYmhvdXN0b24gLyBodHRwOi8vZXhvY29ydGV4LmNvbVxuICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbS9cbiAqL1xuXG5USFJFRS5TcGhlcmUgPSBmdW5jdGlvbiAoIGNlbnRlciwgcmFkaXVzICkge1xuXG5cdHRoaXMuY2VudGVyID0gKCBjZW50ZXIgIT09IHVuZGVmaW5lZCApID8gY2VudGVyIDogbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0dGhpcy5yYWRpdXMgPSAoIHJhZGl1cyAhPT0gdW5kZWZpbmVkICkgPyByYWRpdXMgOiAwO1xuXG59O1xuXG5USFJFRS5TcGhlcmUucHJvdG90eXBlID0ge1xuXG5cdGNvbnN0cnVjdG9yOiBUSFJFRS5TcGhlcmUsXG5cblx0c2V0OiBmdW5jdGlvbiAoIGNlbnRlciwgcmFkaXVzICkge1xuXG5cdFx0dGhpcy5jZW50ZXIuY29weSggY2VudGVyICk7XG5cdFx0dGhpcy5yYWRpdXMgPSByYWRpdXM7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRzZXRGcm9tUG9pbnRzOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgYm94ID0gbmV3IFRIUkVFLkJveDMoKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHBvaW50cywgb3B0aW9uYWxDZW50ZXIgKSB7XG5cblx0XHRcdHZhciBjZW50ZXIgPSB0aGlzLmNlbnRlcjtcblxuXHRcdFx0aWYgKCBvcHRpb25hbENlbnRlciAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdGNlbnRlci5jb3B5KCBvcHRpb25hbENlbnRlciApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGJveC5zZXRGcm9tUG9pbnRzKCBwb2ludHMgKS5jZW50ZXIoIGNlbnRlciApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHZhciBtYXhSYWRpdXNTcSA9IDA7XG5cblx0XHRcdGZvciAoIHZhciBpID0gMCwgaWwgPSBwb2ludHMubGVuZ3RoOyBpIDwgaWw7IGkgKysgKSB7XG5cblx0XHRcdFx0bWF4UmFkaXVzU3EgPSBNYXRoLm1heCggbWF4UmFkaXVzU3EsIGNlbnRlci5kaXN0YW5jZVRvU3F1YXJlZCggcG9pbnRzWyBpIF0gKSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMucmFkaXVzID0gTWF0aC5zcXJ0KCBtYXhSYWRpdXNTcSApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGNvcHk6IGZ1bmN0aW9uICggc3BoZXJlICkge1xuXG5cdFx0dGhpcy5jZW50ZXIuY29weSggc3BoZXJlLmNlbnRlciApO1xuXHRcdHRoaXMucmFkaXVzID0gc3BoZXJlLnJhZGl1cztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZW1wdHk6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiAoIHRoaXMucmFkaXVzIDw9IDAgKTtcblxuXHR9LFxuXG5cdGNvbnRhaW5zUG9pbnQ6IGZ1bmN0aW9uICggcG9pbnQgKSB7XG5cblx0XHRyZXR1cm4gKCBwb2ludC5kaXN0YW5jZVRvU3F1YXJlZCggdGhpcy5jZW50ZXIgKSA8PSAoIHRoaXMucmFkaXVzICogdGhpcy5yYWRpdXMgKSApO1xuXG5cdH0sXG5cblx0ZGlzdGFuY2VUb1BvaW50OiBmdW5jdGlvbiAoIHBvaW50ICkge1xuXG5cdFx0cmV0dXJuICggcG9pbnQuZGlzdGFuY2VUbyggdGhpcy5jZW50ZXIgKSAtIHRoaXMucmFkaXVzICk7XG5cblx0fSxcblxuXHRpbnRlcnNlY3RzU3BoZXJlOiBmdW5jdGlvbiAoIHNwaGVyZSApIHtcblxuXHRcdHZhciByYWRpdXNTdW0gPSB0aGlzLnJhZGl1cyArIHNwaGVyZS5yYWRpdXM7XG5cblx0XHRyZXR1cm4gc3BoZXJlLmNlbnRlci5kaXN0YW5jZVRvU3F1YXJlZCggdGhpcy5jZW50ZXIgKSA8PSAoIHJhZGl1c1N1bSAqIHJhZGl1c1N1bSApO1xuXG5cdH0sXG5cblx0Y2xhbXBQb2ludDogZnVuY3Rpb24gKCBwb2ludCwgb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHR2YXIgZGVsdGFMZW5ndGhTcSA9IHRoaXMuY2VudGVyLmRpc3RhbmNlVG9TcXVhcmVkKCBwb2ludCApO1xuXG5cdFx0dmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0cmVzdWx0LmNvcHkoIHBvaW50ICk7XG5cblx0XHRpZiAoIGRlbHRhTGVuZ3RoU3EgPiAoIHRoaXMucmFkaXVzICogdGhpcy5yYWRpdXMgKSApIHtcblxuXHRcdFx0cmVzdWx0LnN1YiggdGhpcy5jZW50ZXIgKS5ub3JtYWxpemUoKTtcblx0XHRcdHJlc3VsdC5tdWx0aXBseVNjYWxhciggdGhpcy5yYWRpdXMgKS5hZGQoIHRoaXMuY2VudGVyICk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXG5cdH0sXG5cblx0Z2V0Qm91bmRpbmdCb3g6IGZ1bmN0aW9uICggb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHR2YXIgYm94ID0gb3B0aW9uYWxUYXJnZXQgfHwgbmV3IFRIUkVFLkJveDMoKTtcblxuXHRcdGJveC5zZXQoIHRoaXMuY2VudGVyLCB0aGlzLmNlbnRlciApO1xuXHRcdGJveC5leHBhbmRCeVNjYWxhciggdGhpcy5yYWRpdXMgKTtcblxuXHRcdHJldHVybiBib3g7XG5cblx0fSxcblxuXHRhcHBseU1hdHJpeDQ6IGZ1bmN0aW9uICggbWF0cml4ICkge1xuXG5cdFx0dGhpcy5jZW50ZXIuYXBwbHlNYXRyaXg0KCBtYXRyaXggKTtcblx0XHR0aGlzLnJhZGl1cyA9IHRoaXMucmFkaXVzICogbWF0cml4LmdldE1heFNjYWxlT25BeGlzKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRyYW5zbGF0ZTogZnVuY3Rpb24gKCBvZmZzZXQgKSB7XG5cblx0XHR0aGlzLmNlbnRlci5hZGQoIG9mZnNldCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlcXVhbHM6IGZ1bmN0aW9uICggc3BoZXJlICkge1xuXG5cdFx0cmV0dXJuIHNwaGVyZS5jZW50ZXIuZXF1YWxzKCB0aGlzLmNlbnRlciApICYmICggc3BoZXJlLnJhZGl1cyA9PT0gdGhpcy5yYWRpdXMgKTtcblxuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFRIUkVFLlNwaGVyZSgpLmNvcHkoIHRoaXMgKTtcblxuXHR9XG5cbn07XG5cbi8vIEZpbGU6c3JjL21hdGgvRnJ1c3R1bS5qc1xuXG4vKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKiBAYXV0aG9yIGFsdGVyZWRxIC8gaHR0cDovL2FsdGVyZWRxdWFsaWEuY29tL1xuICogQGF1dGhvciBiaG91c3RvbiAvIGh0dHA6Ly9leG9jb3J0ZXguY29tXG4gKi9cblxuVEhSRUUuRnJ1c3R1bSA9IGZ1bmN0aW9uICggcDAsIHAxLCBwMiwgcDMsIHA0LCBwNSApIHtcblxuXHR0aGlzLnBsYW5lcyA9IFtcblxuXHRcdCggcDAgIT09IHVuZGVmaW5lZCApID8gcDAgOiBuZXcgVEhSRUUuUGxhbmUoKSxcblx0XHQoIHAxICE9PSB1bmRlZmluZWQgKSA/IHAxIDogbmV3IFRIUkVFLlBsYW5lKCksXG5cdFx0KCBwMiAhPT0gdW5kZWZpbmVkICkgPyBwMiA6IG5ldyBUSFJFRS5QbGFuZSgpLFxuXHRcdCggcDMgIT09IHVuZGVmaW5lZCApID8gcDMgOiBuZXcgVEhSRUUuUGxhbmUoKSxcblx0XHQoIHA0ICE9PSB1bmRlZmluZWQgKSA/IHA0IDogbmV3IFRIUkVFLlBsYW5lKCksXG5cdFx0KCBwNSAhPT0gdW5kZWZpbmVkICkgPyBwNSA6IG5ldyBUSFJFRS5QbGFuZSgpXG5cblx0XTtcblxufTtcblxuVEhSRUUuRnJ1c3R1bS5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IFRIUkVFLkZydXN0dW0sXG5cblx0c2V0OiBmdW5jdGlvbiAoIHAwLCBwMSwgcDIsIHAzLCBwNCwgcDUgKSB7XG5cblx0XHR2YXIgcGxhbmVzID0gdGhpcy5wbGFuZXM7XG5cblx0XHRwbGFuZXNbIDAgXS5jb3B5KCBwMCApO1xuXHRcdHBsYW5lc1sgMSBdLmNvcHkoIHAxICk7XG5cdFx0cGxhbmVzWyAyIF0uY29weSggcDIgKTtcblx0XHRwbGFuZXNbIDMgXS5jb3B5KCBwMyApO1xuXHRcdHBsYW5lc1sgNCBdLmNvcHkoIHA0ICk7XG5cdFx0cGxhbmVzWyA1IF0uY29weSggcDUgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y29weTogZnVuY3Rpb24gKCBmcnVzdHVtICkge1xuXG5cdFx0dmFyIHBsYW5lcyA9IHRoaXMucGxhbmVzO1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgNjsgaSArKyApIHtcblxuXHRcdFx0cGxhbmVzWyBpIF0uY29weSggZnJ1c3R1bS5wbGFuZXNbIGkgXSApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRGcm9tTWF0cml4OiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHR2YXIgcGxhbmVzID0gdGhpcy5wbGFuZXM7XG5cdFx0dmFyIG1lID0gbS5lbGVtZW50cztcblx0XHR2YXIgbWUwID0gbWVbIDAgXSwgbWUxID0gbWVbIDEgXSwgbWUyID0gbWVbIDIgXSwgbWUzID0gbWVbIDMgXTtcblx0XHR2YXIgbWU0ID0gbWVbIDQgXSwgbWU1ID0gbWVbIDUgXSwgbWU2ID0gbWVbIDYgXSwgbWU3ID0gbWVbIDcgXTtcblx0XHR2YXIgbWU4ID0gbWVbIDggXSwgbWU5ID0gbWVbIDkgXSwgbWUxMCA9IG1lWyAxMCBdLCBtZTExID0gbWVbIDExIF07XG5cdFx0dmFyIG1lMTIgPSBtZVsgMTIgXSwgbWUxMyA9IG1lWyAxMyBdLCBtZTE0ID0gbWVbIDE0IF0sIG1lMTUgPSBtZVsgMTUgXTtcblxuXHRcdHBsYW5lc1sgMCBdLnNldENvbXBvbmVudHMoIG1lMyAtIG1lMCwgbWU3IC0gbWU0LCBtZTExIC0gbWU4LCBtZTE1IC0gbWUxMiApLm5vcm1hbGl6ZSgpO1xuXHRcdHBsYW5lc1sgMSBdLnNldENvbXBvbmVudHMoIG1lMyArIG1lMCwgbWU3ICsgbWU0LCBtZTExICsgbWU4LCBtZTE1ICsgbWUxMiApLm5vcm1hbGl6ZSgpO1xuXHRcdHBsYW5lc1sgMiBdLnNldENvbXBvbmVudHMoIG1lMyArIG1lMSwgbWU3ICsgbWU1LCBtZTExICsgbWU5LCBtZTE1ICsgbWUxMyApLm5vcm1hbGl6ZSgpO1xuXHRcdHBsYW5lc1sgMyBdLnNldENvbXBvbmVudHMoIG1lMyAtIG1lMSwgbWU3IC0gbWU1LCBtZTExIC0gbWU5LCBtZTE1IC0gbWUxMyApLm5vcm1hbGl6ZSgpO1xuXHRcdHBsYW5lc1sgNCBdLnNldENvbXBvbmVudHMoIG1lMyAtIG1lMiwgbWU3IC0gbWU2LCBtZTExIC0gbWUxMCwgbWUxNSAtIG1lMTQgKS5ub3JtYWxpemUoKTtcblx0XHRwbGFuZXNbIDUgXS5zZXRDb21wb25lbnRzKCBtZTMgKyBtZTIsIG1lNyArIG1lNiwgbWUxMSArIG1lMTAsIG1lMTUgKyBtZTE0ICkubm9ybWFsaXplKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGludGVyc2VjdHNPYmplY3Q6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBzcGhlcmUgPSBuZXcgVEhSRUUuU3BoZXJlKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBvYmplY3QgKSB7XG5cblx0XHRcdHZhciBnZW9tZXRyeSA9IG9iamVjdC5nZW9tZXRyeTtcblxuXHRcdFx0aWYgKCBnZW9tZXRyeS5ib3VuZGluZ1NwaGVyZSA9PT0gbnVsbCApIGdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpO1xuXG5cdFx0XHRzcGhlcmUuY29weSggZ2VvbWV0cnkuYm91bmRpbmdTcGhlcmUgKTtcblx0XHRcdHNwaGVyZS5hcHBseU1hdHJpeDQoIG9iamVjdC5tYXRyaXhXb3JsZCApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5pbnRlcnNlY3RzU3BoZXJlKCBzcGhlcmUgKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdGludGVyc2VjdHNTcGhlcmU6IGZ1bmN0aW9uICggc3BoZXJlICkge1xuXG5cdFx0dmFyIHBsYW5lcyA9IHRoaXMucGxhbmVzO1xuXHRcdHZhciBjZW50ZXIgPSBzcGhlcmUuY2VudGVyO1xuXHRcdHZhciBuZWdSYWRpdXMgPSAtIHNwaGVyZS5yYWRpdXM7XG5cblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCA2OyBpICsrICkge1xuXG5cdFx0XHR2YXIgZGlzdGFuY2UgPSBwbGFuZXNbIGkgXS5kaXN0YW5jZVRvUG9pbnQoIGNlbnRlciApO1xuXG5cdFx0XHRpZiAoIGRpc3RhbmNlIDwgbmVnUmFkaXVzICkge1xuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0fSxcblxuXHRpbnRlcnNlY3RzQm94OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgcDEgPSBuZXcgVEhSRUUuVmVjdG9yMygpLFxuXHRcdFx0cDIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggYm94ICkge1xuXG5cdFx0XHR2YXIgcGxhbmVzID0gdGhpcy5wbGFuZXM7XG5cblx0XHRcdGZvciAoIHZhciBpID0gMDsgaSA8IDYgOyBpICsrICkge1xuXG5cdFx0XHRcdHZhciBwbGFuZSA9IHBsYW5lc1sgaSBdO1xuXG5cdFx0XHRcdHAxLnggPSBwbGFuZS5ub3JtYWwueCA+IDAgPyBib3gubWluLnggOiBib3gubWF4Lng7XG5cdFx0XHRcdHAyLnggPSBwbGFuZS5ub3JtYWwueCA+IDAgPyBib3gubWF4LnggOiBib3gubWluLng7XG5cdFx0XHRcdHAxLnkgPSBwbGFuZS5ub3JtYWwueSA+IDAgPyBib3gubWluLnkgOiBib3gubWF4Lnk7XG5cdFx0XHRcdHAyLnkgPSBwbGFuZS5ub3JtYWwueSA+IDAgPyBib3gubWF4LnkgOiBib3gubWluLnk7XG5cdFx0XHRcdHAxLnogPSBwbGFuZS5ub3JtYWwueiA+IDAgPyBib3gubWluLnogOiBib3gubWF4Lno7XG5cdFx0XHRcdHAyLnogPSBwbGFuZS5ub3JtYWwueiA+IDAgPyBib3gubWF4LnogOiBib3gubWluLno7XG5cblx0XHRcdFx0dmFyIGQxID0gcGxhbmUuZGlzdGFuY2VUb1BvaW50KCBwMSApO1xuXHRcdFx0XHR2YXIgZDIgPSBwbGFuZS5kaXN0YW5jZVRvUG9pbnQoIHAyICk7XG5cblx0XHRcdFx0Ly8gaWYgYm90aCBvdXRzaWRlIHBsYW5lLCBubyBpbnRlcnNlY3Rpb25cblxuXHRcdFx0XHRpZiAoIGQxIDwgMCAmJiBkMiA8IDAgKSB7XG5cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9O1xuXG5cdH0oKSxcblxuXG5cdGNvbnRhaW5zUG9pbnQ6IGZ1bmN0aW9uICggcG9pbnQgKSB7XG5cblx0XHR2YXIgcGxhbmVzID0gdGhpcy5wbGFuZXM7XG5cblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCA2OyBpICsrICkge1xuXG5cdFx0XHRpZiAoIHBsYW5lc1sgaSBdLmRpc3RhbmNlVG9Qb2ludCggcG9pbnQgKSA8IDAgKSB7XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFRIUkVFLkZydXN0dW0oKS5jb3B5KCB0aGlzICk7XG5cblx0fVxuXG59O1xuXG4vLyBGaWxlOnNyYy9tYXRoL1BsYW5lLmpzXG5cbi8qKlxuICogQGF1dGhvciBiaG91c3RvbiAvIGh0dHA6Ly9leG9jb3J0ZXguY29tXG4gKi9cblxuVEhSRUUuUGxhbmUgPSBmdW5jdGlvbiAoIG5vcm1hbCwgY29uc3RhbnQgKSB7XG5cblx0dGhpcy5ub3JtYWwgPSAoIG5vcm1hbCAhPT0gdW5kZWZpbmVkICkgPyBub3JtYWwgOiBuZXcgVEhSRUUuVmVjdG9yMyggMSwgMCwgMCApO1xuXHR0aGlzLmNvbnN0YW50ID0gKCBjb25zdGFudCAhPT0gdW5kZWZpbmVkICkgPyBjb25zdGFudCA6IDA7XG5cbn07XG5cblRIUkVFLlBsYW5lLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogVEhSRUUuUGxhbmUsXG5cblx0c2V0OiBmdW5jdGlvbiAoIG5vcm1hbCwgY29uc3RhbnQgKSB7XG5cblx0XHR0aGlzLm5vcm1hbC5jb3B5KCBub3JtYWwgKTtcblx0XHR0aGlzLmNvbnN0YW50ID0gY29uc3RhbnQ7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHNldENvbXBvbmVudHM6IGZ1bmN0aW9uICggeCwgeSwgeiwgdyApIHtcblxuXHRcdHRoaXMubm9ybWFsLnNldCggeCwgeSwgeiApO1xuXHRcdHRoaXMuY29uc3RhbnQgPSB3O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRGcm9tTm9ybWFsQW5kQ29wbGFuYXJQb2ludDogZnVuY3Rpb24gKCBub3JtYWwsIHBvaW50ICkge1xuXG5cdFx0dGhpcy5ub3JtYWwuY29weSggbm9ybWFsICk7XG5cdFx0dGhpcy5jb25zdGFudCA9IC0gcG9pbnQuZG90KCB0aGlzLm5vcm1hbCApO1x0Ly8gbXVzdCBiZSB0aGlzLm5vcm1hbCwgbm90IG5vcm1hbCwgYXMgdGhpcy5ub3JtYWwgaXMgbm9ybWFsaXplZFxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRGcm9tQ29wbGFuYXJQb2ludHM6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0dmFyIHYyID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIGEsIGIsIGMgKSB7XG5cblx0XHRcdHZhciBub3JtYWwgPSB2MS5zdWJWZWN0b3JzKCBjLCBiICkuY3Jvc3MoIHYyLnN1YlZlY3RvcnMoIGEsIGIgKSApLm5vcm1hbGl6ZSgpO1xuXG5cdFx0XHQvLyBROiBzaG91bGQgYW4gZXJyb3IgYmUgdGhyb3duIGlmIG5vcm1hbCBpcyB6ZXJvIChlLmcuIGRlZ2VuZXJhdGUgcGxhbmUpP1xuXG5cdFx0XHR0aGlzLnNldEZyb21Ob3JtYWxBbmRDb3BsYW5hclBvaW50KCBub3JtYWwsIGEgKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXG5cdGNvcHk6IGZ1bmN0aW9uICggcGxhbmUgKSB7XG5cblx0XHR0aGlzLm5vcm1hbC5jb3B5KCBwbGFuZS5ub3JtYWwgKTtcblx0XHR0aGlzLmNvbnN0YW50ID0gcGxhbmUuY29uc3RhbnQ7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG5vcm1hbGl6ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gTm90ZTogd2lsbCBsZWFkIHRvIGEgZGl2aWRlIGJ5IHplcm8gaWYgdGhlIHBsYW5lIGlzIGludmFsaWQuXG5cblx0XHR2YXIgaW52ZXJzZU5vcm1hbExlbmd0aCA9IDEuMCAvIHRoaXMubm9ybWFsLmxlbmd0aCgpO1xuXHRcdHRoaXMubm9ybWFsLm11bHRpcGx5U2NhbGFyKCBpbnZlcnNlTm9ybWFsTGVuZ3RoICk7XG5cdFx0dGhpcy5jb25zdGFudCAqPSBpbnZlcnNlTm9ybWFsTGVuZ3RoO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRuZWdhdGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuY29uc3RhbnQgKj0gLSAxO1xuXHRcdHRoaXMubm9ybWFsLm5lZ2F0ZSgpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRkaXN0YW5jZVRvUG9pbnQ6IGZ1bmN0aW9uICggcG9pbnQgKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5ub3JtYWwuZG90KCBwb2ludCApICsgdGhpcy5jb25zdGFudDtcblxuXHR9LFxuXG5cdGRpc3RhbmNlVG9TcGhlcmU6IGZ1bmN0aW9uICggc3BoZXJlICkge1xuXG5cdFx0cmV0dXJuIHRoaXMuZGlzdGFuY2VUb1BvaW50KCBzcGhlcmUuY2VudGVyICkgLSBzcGhlcmUucmFkaXVzO1xuXG5cdH0sXG5cblx0cHJvamVjdFBvaW50OiBmdW5jdGlvbiAoIHBvaW50LCBvcHRpb25hbFRhcmdldCApIHtcblxuXHRcdHJldHVybiB0aGlzLm9ydGhvUG9pbnQoIHBvaW50LCBvcHRpb25hbFRhcmdldCApLnN1YiggcG9pbnQgKS5uZWdhdGUoKTtcblxuXHR9LFxuXG5cdG9ydGhvUG9pbnQ6IGZ1bmN0aW9uICggcG9pbnQsIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIHBlcnBlbmRpY3VsYXJNYWduaXR1ZGUgPSB0aGlzLmRpc3RhbmNlVG9Qb2ludCggcG9pbnQgKTtcblxuXHRcdHZhciByZXN1bHQgPSBvcHRpb25hbFRhcmdldCB8fCBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHJldHVybiByZXN1bHQuY29weSggdGhpcy5ub3JtYWwgKS5tdWx0aXBseVNjYWxhciggcGVycGVuZGljdWxhck1hZ25pdHVkZSApO1xuXG5cdH0sXG5cblx0aXNJbnRlcnNlY3Rpb25MaW5lOiBmdW5jdGlvbiAoIGxpbmUgKSB7XG5cblx0XHQvLyBOb3RlOiB0aGlzIHRlc3RzIGlmIGEgbGluZSBpbnRlcnNlY3RzIHRoZSBwbGFuZSwgbm90IHdoZXRoZXIgaXQgKG9yIGl0cyBlbmQtcG9pbnRzKSBhcmUgY29wbGFuYXIgd2l0aCBpdC5cblxuXHRcdHZhciBzdGFydFNpZ24gPSB0aGlzLmRpc3RhbmNlVG9Qb2ludCggbGluZS5zdGFydCApO1xuXHRcdHZhciBlbmRTaWduID0gdGhpcy5kaXN0YW5jZVRvUG9pbnQoIGxpbmUuZW5kICk7XG5cblx0XHRyZXR1cm4gKCBzdGFydFNpZ24gPCAwICYmIGVuZFNpZ24gPiAwICkgfHwgKCBlbmRTaWduIDwgMCAmJiBzdGFydFNpZ24gPiAwICk7XG5cblx0fSxcblxuXHRpbnRlcnNlY3RMaW5lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICggbGluZSwgb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHRcdHZhciByZXN1bHQgPSBvcHRpb25hbFRhcmdldCB8fCBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0XHR2YXIgZGlyZWN0aW9uID0gbGluZS5kZWx0YSggdjEgKTtcblxuXHRcdFx0dmFyIGRlbm9taW5hdG9yID0gdGhpcy5ub3JtYWwuZG90KCBkaXJlY3Rpb24gKTtcblxuXHRcdFx0aWYgKCBkZW5vbWluYXRvciA9PT0gMCApIHtcblxuXHRcdFx0XHQvLyBsaW5lIGlzIGNvcGxhbmFyLCByZXR1cm4gb3JpZ2luXG5cdFx0XHRcdGlmICggdGhpcy5kaXN0YW5jZVRvUG9pbnQoIGxpbmUuc3RhcnQgKSA9PT0gMCApIHtcblxuXHRcdFx0XHRcdHJldHVybiByZXN1bHQuY29weSggbGluZS5zdGFydCApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBVbnN1cmUgaWYgdGhpcyBpcyB0aGUgY29ycmVjdCBtZXRob2QgdG8gaGFuZGxlIHRoaXMgY2FzZS5cblx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgdCA9IC0gKCBsaW5lLnN0YXJ0LmRvdCggdGhpcy5ub3JtYWwgKSArIHRoaXMuY29uc3RhbnQgKSAvIGRlbm9taW5hdG9yO1xuXG5cdFx0XHRpZiAoIHQgPCAwIHx8IHQgPiAxICkge1xuXG5cdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdC5jb3B5KCBkaXJlY3Rpb24gKS5tdWx0aXBseVNjYWxhciggdCApLmFkZCggbGluZS5zdGFydCApO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblxuXHRjb3BsYW5hclBvaW50OiBmdW5jdGlvbiAoIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0cmV0dXJuIHJlc3VsdC5jb3B5KCB0aGlzLm5vcm1hbCApLm11bHRpcGx5U2NhbGFyKCAtIHRoaXMuY29uc3RhbnQgKTtcblxuXHR9LFxuXG5cdGFwcGx5TWF0cml4NDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYxID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHR2YXIgdjIgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHRcdHZhciBtMSA9IG5ldyBUSFJFRS5NYXRyaXgzKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBtYXRyaXgsIG9wdGlvbmFsTm9ybWFsTWF0cml4ICkge1xuXG5cdFx0XHQvLyBjb21wdXRlIG5ldyBub3JtYWwgYmFzZWQgb24gdGhlb3J5IGhlcmU6XG5cdFx0XHQvLyBodHRwOi8vd3d3LnNvbmdoby5jYS9vcGVuZ2wvZ2xfbm9ybWFsdHJhbnNmb3JtLmh0bWxcblx0XHRcdHZhciBub3JtYWxNYXRyaXggPSBvcHRpb25hbE5vcm1hbE1hdHJpeCB8fCBtMS5nZXROb3JtYWxNYXRyaXgoIG1hdHJpeCApO1xuXHRcdFx0dmFyIG5ld05vcm1hbCA9IHYxLmNvcHkoIHRoaXMubm9ybWFsICkuYXBwbHlNYXRyaXgzKCBub3JtYWxNYXRyaXggKTtcblxuXHRcdFx0dmFyIG5ld0NvcGxhbmFyUG9pbnQgPSB0aGlzLmNvcGxhbmFyUG9pbnQoIHYyICk7XG5cdFx0XHRuZXdDb3BsYW5hclBvaW50LmFwcGx5TWF0cml4NCggbWF0cml4ICk7XG5cblx0XHRcdHRoaXMuc2V0RnJvbU5vcm1hbEFuZENvcGxhbmFyUG9pbnQoIG5ld05vcm1hbCwgbmV3Q29wbGFuYXJQb2ludCApO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdHRyYW5zbGF0ZTogZnVuY3Rpb24gKCBvZmZzZXQgKSB7XG5cblx0XHR0aGlzLmNvbnN0YW50ID0gdGhpcy5jb25zdGFudCAtIG9mZnNldC5kb3QoIHRoaXMubm9ybWFsICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVxdWFsczogZnVuY3Rpb24gKCBwbGFuZSApIHtcblxuXHRcdHJldHVybiBwbGFuZS5ub3JtYWwuZXF1YWxzKCB0aGlzLm5vcm1hbCApICYmICggcGxhbmUuY29uc3RhbnQgPT09IHRoaXMuY29uc3RhbnQgKTtcblxuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gbmV3IFRIUkVFLlBsYW5lKCkuY29weSggdGhpcyApO1xuXG5cdH1cblxufTtcblxuLy8gRmlsZTpzcmMvbWF0aC9NYXRoLmpzXG5cbi8qKlxuICogQGF1dGhvciBhbHRlcmVkcSAvIGh0dHA6Ly9hbHRlcmVkcXVhbGlhLmNvbS9cbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKi9cblxuVEhSRUUuTWF0aCA9IHtcblxuXHRnZW5lcmF0ZVVVSUQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIGh0dHA6Ly93d3cuYnJvb2ZhLmNvbS9Ub29scy9NYXRoLnV1aWQuaHRtXG5cblx0XHR2YXIgY2hhcnMgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonLnNwbGl0KCAnJyApO1xuXHRcdHZhciB1dWlkID0gbmV3IEFycmF5KCAzNiApO1xuXHRcdHZhciBybmQgPSAwLCByO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgMzY7IGkgKysgKSB7XG5cblx0XHRcdFx0aWYgKCBpID09PSA4IHx8IGkgPT09IDEzIHx8IGkgPT09IDE4IHx8IGkgPT09IDIzICkge1xuXG5cdFx0XHRcdFx0dXVpZFsgaSBdID0gJy0nO1xuXG5cdFx0XHRcdH0gZWxzZSBpZiAoIGkgPT09IDE0ICkge1xuXG5cdFx0XHRcdFx0dXVpZFsgaSBdID0gJzQnO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRpZiAoIHJuZCA8PSAweDAyICkgcm5kID0gMHgyMDAwMDAwICsgKCBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwICkgfCAwO1xuXHRcdFx0XHRcdHIgPSBybmQgJiAweGY7XG5cdFx0XHRcdFx0cm5kID0gcm5kID4+IDQ7XG5cdFx0XHRcdFx0dXVpZFsgaSBdID0gY2hhcnNbICggaSA9PT0gMTkgKSA/ICggciAmIDB4MyApIHwgMHg4IDogciBdO1xuXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHV1aWQuam9pbiggJycgKTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdC8vIENsYW1wIHZhbHVlIHRvIHJhbmdlIDxhLCBiPlxuXG5cdGNsYW1wOiBmdW5jdGlvbiAoIHgsIGEsIGIgKSB7XG5cblx0XHRyZXR1cm4gKCB4IDwgYSApID8gYSA6ICggKCB4ID4gYiApID8gYiA6IHggKTtcblxuXHR9LFxuXG5cdC8vIENsYW1wIHZhbHVlIHRvIHJhbmdlIDxhLCBpbmYpXG5cblx0Y2xhbXBCb3R0b206IGZ1bmN0aW9uICggeCwgYSApIHtcblxuXHRcdHJldHVybiB4IDwgYSA/IGEgOiB4O1xuXG5cdH0sXG5cblx0Ly8gTGluZWFyIG1hcHBpbmcgZnJvbSByYW5nZSA8YTEsIGEyPiB0byByYW5nZSA8YjEsIGIyPlxuXG5cdG1hcExpbmVhcjogZnVuY3Rpb24gKCB4LCBhMSwgYTIsIGIxLCBiMiApIHtcblxuXHRcdHJldHVybiBiMSArICggeCAtIGExICkgKiAoIGIyIC0gYjEgKSAvICggYTIgLSBhMSApO1xuXG5cdH0sXG5cblx0Ly8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9TbW9vdGhzdGVwXG5cblx0c21vb3Roc3RlcDogZnVuY3Rpb24gKCB4LCBtaW4sIG1heCApIHtcblxuXHRcdGlmICggeCA8PSBtaW4gKSByZXR1cm4gMDtcblx0XHRpZiAoIHggPj0gbWF4ICkgcmV0dXJuIDE7XG5cblx0XHR4ID0gKCB4IC0gbWluICkgLyAoIG1heCAtIG1pbiApO1xuXG5cdFx0cmV0dXJuIHggKiB4ICogKCAzIC0gMiAqIHggKTtcblxuXHR9LFxuXG5cdHNtb290aGVyc3RlcDogZnVuY3Rpb24gKCB4LCBtaW4sIG1heCApIHtcblxuXHRcdGlmICggeCA8PSBtaW4gKSByZXR1cm4gMDtcblx0XHRpZiAoIHggPj0gbWF4ICkgcmV0dXJuIDE7XG5cblx0XHR4ID0gKCB4IC0gbWluICkgLyAoIG1heCAtIG1pbiApO1xuXG5cdFx0cmV0dXJuIHggKiB4ICogeCAqICggeCAqICggeCAqIDYgLSAxNSApICsgMTAgKTtcblxuXHR9LFxuXG5cdC8vIFJhbmRvbSBmbG9hdCBmcm9tIDwwLCAxPiB3aXRoIDE2IGJpdHMgb2YgcmFuZG9tbmVzc1xuXHQvLyAoc3RhbmRhcmQgTWF0aC5yYW5kb20oKSBjcmVhdGVzIHJlcGV0aXRpdmUgcGF0dGVybnMgd2hlbiBhcHBsaWVkIG92ZXIgbGFyZ2VyIHNwYWNlKVxuXG5cdHJhbmRvbTE2OiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gKCA2NTI4MCAqIE1hdGgucmFuZG9tKCkgKyAyNTUgKiBNYXRoLnJhbmRvbSgpICkgLyA2NTUzNTtcblxuXHR9LFxuXG5cdC8vIFJhbmRvbSBpbnRlZ2VyIGZyb20gPGxvdywgaGlnaD4gaW50ZXJ2YWxcblxuXHRyYW5kSW50OiBmdW5jdGlvbiAoIGxvdywgaGlnaCApIHtcblxuXHRcdHJldHVybiBNYXRoLmZsb29yKCB0aGlzLnJhbmRGbG9hdCggbG93LCBoaWdoICkgKTtcblxuXHR9LFxuXG5cdC8vIFJhbmRvbSBmbG9hdCBmcm9tIDxsb3csIGhpZ2g+IGludGVydmFsXG5cblx0cmFuZEZsb2F0OiBmdW5jdGlvbiAoIGxvdywgaGlnaCApIHtcblxuXHRcdHJldHVybiBsb3cgKyBNYXRoLnJhbmRvbSgpICogKCBoaWdoIC0gbG93ICk7XG5cblx0fSxcblxuXHQvLyBSYW5kb20gZmxvYXQgZnJvbSA8LXJhbmdlLzIsIHJhbmdlLzI+IGludGVydmFsXG5cblx0cmFuZEZsb2F0U3ByZWFkOiBmdW5jdGlvbiAoIHJhbmdlICkge1xuXG5cdFx0cmV0dXJuIHJhbmdlICogKCAwLjUgLSBNYXRoLnJhbmRvbSgpICk7XG5cblx0fSxcblxuXHRkZWdUb1JhZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIGRlZ3JlZVRvUmFkaWFuc0ZhY3RvciA9IE1hdGguUEkgLyAxODA7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKCBkZWdyZWVzICkge1xuXG5cdFx0XHRyZXR1cm4gZGVncmVlcyAqIGRlZ3JlZVRvUmFkaWFuc0ZhY3RvcjtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdHJhZFRvRGVnOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgcmFkaWFuVG9EZWdyZWVzRmFjdG9yID0gMTgwIC8gTWF0aC5QSTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHJhZGlhbnMgKSB7XG5cblx0XHRcdHJldHVybiByYWRpYW5zICogcmFkaWFuVG9EZWdyZWVzRmFjdG9yO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0aXNQb3dlck9mVHdvOiBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG5cdFx0cmV0dXJuICggdmFsdWUgJiAoIHZhbHVlIC0gMSApICkgPT09IDAgJiYgdmFsdWUgIT09IDA7XG5cblx0fSxcblxuXHRuZXh0UG93ZXJPZlR3bzogZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdHZhbHVlIC0tO1xuXHRcdHZhbHVlIHw9IHZhbHVlID4+IDE7XG5cdFx0dmFsdWUgfD0gdmFsdWUgPj4gMjtcblx0XHR2YWx1ZSB8PSB2YWx1ZSA+PiA0O1xuXHRcdHZhbHVlIHw9IHZhbHVlID4+IDg7XG5cdFx0dmFsdWUgfD0gdmFsdWUgPj4gMTY7XG5cdFx0dmFsdWUgKys7XG5cblx0XHRyZXR1cm4gdmFsdWU7XG5cblx0fVxuXG59O1xuXG4vLyBGaWxlOnNyYy9tYXRoL1NwbGluZS5qc1xuXG4vKipcbiAqIFNwbGluZSBmcm9tIFR3ZWVuLmpzLCBzbGlnaHRseSBvcHRpbWl6ZWQgKGFuZCB0cmFzaGVkKVxuICogaHR0cDovL3NvbGUuZ2l0aHViLmNvbS90d2Vlbi5qcy9leGFtcGxlcy8wNV9zcGxpbmUuaHRtbFxuICpcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKiBAYXV0aG9yIGFsdGVyZWRxIC8gaHR0cDovL2FsdGVyZWRxdWFsaWEuY29tL1xuICovXG5cblRIUkVFLlNwbGluZSA9IGZ1bmN0aW9uICggcG9pbnRzICkge1xuXG5cdHRoaXMucG9pbnRzID0gcG9pbnRzO1xuXG5cdHZhciBjID0gW10sIHYzID0geyB4OiAwLCB5OiAwLCB6OiAwIH0sXG5cdHBvaW50LCBpbnRQb2ludCwgd2VpZ2h0LCB3MiwgdzMsXG5cdHBhLCBwYiwgcGMsIHBkO1xuXG5cdHRoaXMuaW5pdEZyb21BcnJheSA9IGZ1bmN0aW9uICggYSApIHtcblxuXHRcdHRoaXMucG9pbnRzID0gW107XG5cblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0dGhpcy5wb2ludHNbIGkgXSA9IHsgeDogYVsgaSBdWyAwIF0sIHk6IGFbIGkgXVsgMSBdLCB6OiBhWyBpIF1bIDIgXSB9O1xuXG5cdFx0fVxuXG5cdH07XG5cblx0dGhpcy5nZXRQb2ludCA9IGZ1bmN0aW9uICggayApIHtcblxuXHRcdHBvaW50ID0gKCB0aGlzLnBvaW50cy5sZW5ndGggLSAxICkgKiBrO1xuXHRcdGludFBvaW50ID0gTWF0aC5mbG9vciggcG9pbnQgKTtcblx0XHR3ZWlnaHQgPSBwb2ludCAtIGludFBvaW50O1xuXG5cdFx0Y1sgMCBdID0gaW50UG9pbnQgPT09IDAgPyBpbnRQb2ludCA6IGludFBvaW50IC0gMTtcblx0XHRjWyAxIF0gPSBpbnRQb2ludDtcblx0XHRjWyAyIF0gPSBpbnRQb2ludCAgPiB0aGlzLnBvaW50cy5sZW5ndGggLSAyID8gdGhpcy5wb2ludHMubGVuZ3RoIC0gMSA6IGludFBvaW50ICsgMTtcblx0XHRjWyAzIF0gPSBpbnRQb2ludCAgPiB0aGlzLnBvaW50cy5sZW5ndGggLSAzID8gdGhpcy5wb2ludHMubGVuZ3RoIC0gMSA6IGludFBvaW50ICsgMjtcblxuXHRcdHBhID0gdGhpcy5wb2ludHNbIGNbIDAgXSBdO1xuXHRcdHBiID0gdGhpcy5wb2ludHNbIGNbIDEgXSBdO1xuXHRcdHBjID0gdGhpcy5wb2ludHNbIGNbIDIgXSBdO1xuXHRcdHBkID0gdGhpcy5wb2ludHNbIGNbIDMgXSBdO1xuXG5cdFx0dzIgPSB3ZWlnaHQgKiB3ZWlnaHQ7XG5cdFx0dzMgPSB3ZWlnaHQgKiB3MjtcblxuXHRcdHYzLnggPSBpbnRlcnBvbGF0ZSggcGEueCwgcGIueCwgcGMueCwgcGQueCwgd2VpZ2h0LCB3MiwgdzMgKTtcblx0XHR2My55ID0gaW50ZXJwb2xhdGUoIHBhLnksIHBiLnksIHBjLnksIHBkLnksIHdlaWdodCwgdzIsIHczICk7XG5cdFx0djMueiA9IGludGVycG9sYXRlKCBwYS56LCBwYi56LCBwYy56LCBwZC56LCB3ZWlnaHQsIHcyLCB3MyApO1xuXG5cdFx0cmV0dXJuIHYzO1xuXG5cdH07XG5cblx0dGhpcy5nZXRDb250cm9sUG9pbnRzQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgaSwgcCwgbCA9IHRoaXMucG9pbnRzLmxlbmd0aCxcblx0XHRcdGNvb3JkcyA9IFtdO1xuXG5cdFx0Zm9yICggaSA9IDA7IGkgPCBsOyBpICsrICkge1xuXG5cdFx0XHRwID0gdGhpcy5wb2ludHNbIGkgXTtcblx0XHRcdGNvb3Jkc1sgaSBdID0gWyBwLngsIHAueSwgcC56IF07XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gY29vcmRzO1xuXG5cdH07XG5cblx0Ly8gYXBwcm94aW1hdGUgbGVuZ3RoIGJ5IHN1bW1pbmcgbGluZWFyIHNlZ21lbnRzXG5cblx0dGhpcy5nZXRMZW5ndGggPSBmdW5jdGlvbiAoIG5TdWJEaXZpc2lvbnMgKSB7XG5cblx0XHR2YXIgaSwgaW5kZXgsIG5TYW1wbGVzLCBwb3NpdGlvbixcblx0XHRcdHBvaW50ID0gMCwgaW50UG9pbnQgPSAwLCBvbGRJbnRQb2ludCA9IDAsXG5cdFx0XHRvbGRQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCksXG5cdFx0XHR0bXBWZWMgPSBuZXcgVEhSRUUuVmVjdG9yMygpLFxuXHRcdFx0Y2h1bmtMZW5ndGhzID0gW10sXG5cdFx0XHR0b3RhbExlbmd0aCA9IDA7XG5cblx0XHQvLyBmaXJzdCBwb2ludCBoYXMgMCBsZW5ndGhcblxuXHRcdGNodW5rTGVuZ3Roc1sgMCBdID0gMDtcblxuXHRcdGlmICggISBuU3ViRGl2aXNpb25zICkgblN1YkRpdmlzaW9ucyA9IDEwMDtcblxuXHRcdG5TYW1wbGVzID0gdGhpcy5wb2ludHMubGVuZ3RoICogblN1YkRpdmlzaW9ucztcblxuXHRcdG9sZFBvc2l0aW9uLmNvcHkoIHRoaXMucG9pbnRzWyAwIF0gKTtcblxuXHRcdGZvciAoIGkgPSAxOyBpIDwgblNhbXBsZXM7IGkgKysgKSB7XG5cblx0XHRcdGluZGV4ID0gaSAvIG5TYW1wbGVzO1xuXG5cdFx0XHRwb3NpdGlvbiA9IHRoaXMuZ2V0UG9pbnQoIGluZGV4ICk7XG5cdFx0XHR0bXBWZWMuY29weSggcG9zaXRpb24gKTtcblxuXHRcdFx0dG90YWxMZW5ndGggKz0gdG1wVmVjLmRpc3RhbmNlVG8oIG9sZFBvc2l0aW9uICk7XG5cblx0XHRcdG9sZFBvc2l0aW9uLmNvcHkoIHBvc2l0aW9uICk7XG5cblx0XHRcdHBvaW50ID0gKCB0aGlzLnBvaW50cy5sZW5ndGggLSAxICkgKiBpbmRleDtcblx0XHRcdGludFBvaW50ID0gTWF0aC5mbG9vciggcG9pbnQgKTtcblxuXHRcdFx0aWYgKCBpbnRQb2ludCAhPT0gb2xkSW50UG9pbnQgKSB7XG5cblx0XHRcdFx0Y2h1bmtMZW5ndGhzWyBpbnRQb2ludCBdID0gdG90YWxMZW5ndGg7XG5cdFx0XHRcdG9sZEludFBvaW50ID0gaW50UG9pbnQ7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdC8vIGxhc3QgcG9pbnQgZW5kcyB3aXRoIHRvdGFsIGxlbmd0aFxuXG5cdFx0Y2h1bmtMZW5ndGhzWyBjaHVua0xlbmd0aHMubGVuZ3RoIF0gPSB0b3RhbExlbmd0aDtcblxuXHRcdHJldHVybiB7IGNodW5rczogY2h1bmtMZW5ndGhzLCB0b3RhbDogdG90YWxMZW5ndGggfTtcblxuXHR9O1xuXG5cdHRoaXMucmVwYXJhbWV0cml6ZUJ5QXJjTGVuZ3RoID0gZnVuY3Rpb24gKCBzYW1wbGluZ0NvZWYgKSB7XG5cblx0XHR2YXIgaSwgaixcblx0XHRcdGluZGV4LCBpbmRleEN1cnJlbnQsIGluZGV4TmV4dCxcblx0XHRcdHJlYWxEaXN0YW5jZSxcblx0XHRcdHNhbXBsaW5nLCBwb3NpdGlvbixcblx0XHRcdG5ld3BvaW50cyA9IFtdLFxuXHRcdFx0dG1wVmVjID0gbmV3IFRIUkVFLlZlY3RvcjMoKSxcblx0XHRcdHNsID0gdGhpcy5nZXRMZW5ndGgoKTtcblxuXHRcdG5ld3BvaW50cy5wdXNoKCB0bXBWZWMuY29weSggdGhpcy5wb2ludHNbIDAgXSApLmNsb25lKCkgKTtcblxuXHRcdGZvciAoIGkgPSAxOyBpIDwgdGhpcy5wb2ludHMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHQvL3RtcFZlYy5jb3B5KCB0aGlzLnBvaW50c1sgaSAtIDEgXSApO1xuXHRcdFx0Ly9saW5lYXJEaXN0YW5jZSA9IHRtcFZlYy5kaXN0YW5jZVRvKCB0aGlzLnBvaW50c1sgaSBdICk7XG5cblx0XHRcdHJlYWxEaXN0YW5jZSA9IHNsLmNodW5rc1sgaSBdIC0gc2wuY2h1bmtzWyBpIC0gMSBdO1xuXG5cdFx0XHRzYW1wbGluZyA9IE1hdGguY2VpbCggc2FtcGxpbmdDb2VmICogcmVhbERpc3RhbmNlIC8gc2wudG90YWwgKTtcblxuXHRcdFx0aW5kZXhDdXJyZW50ID0gKCBpIC0gMSApIC8gKCB0aGlzLnBvaW50cy5sZW5ndGggLSAxICk7XG5cdFx0XHRpbmRleE5leHQgPSBpIC8gKCB0aGlzLnBvaW50cy5sZW5ndGggLSAxICk7XG5cblx0XHRcdGZvciAoIGogPSAxOyBqIDwgc2FtcGxpbmcgLSAxOyBqICsrICkge1xuXG5cdFx0XHRcdGluZGV4ID0gaW5kZXhDdXJyZW50ICsgaiAqICggMSAvIHNhbXBsaW5nICkgKiAoIGluZGV4TmV4dCAtIGluZGV4Q3VycmVudCApO1xuXG5cdFx0XHRcdHBvc2l0aW9uID0gdGhpcy5nZXRQb2ludCggaW5kZXggKTtcblx0XHRcdFx0bmV3cG9pbnRzLnB1c2goIHRtcFZlYy5jb3B5KCBwb3NpdGlvbiApLmNsb25lKCkgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRuZXdwb2ludHMucHVzaCggdG1wVmVjLmNvcHkoIHRoaXMucG9pbnRzWyBpIF0gKS5jbG9uZSgpICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnBvaW50cyA9IG5ld3BvaW50cztcblxuXHR9O1xuXG5cdC8vIENhdG11bGwtUm9tXG5cblx0ZnVuY3Rpb24gaW50ZXJwb2xhdGUoIHAwLCBwMSwgcDIsIHAzLCB0LCB0MiwgdDMgKSB7XG5cblx0XHR2YXIgdjAgPSAoIHAyIC0gcDAgKSAqIDAuNSxcblx0XHRcdHYxID0gKCBwMyAtIHAxICkgKiAwLjU7XG5cblx0XHRyZXR1cm4gKCAyICogKCBwMSAtIHAyICkgKyB2MCArIHYxICkgKiB0MyArICggLSAzICogKCBwMSAtIHAyICkgLSAyICogdjAgLSB2MSApICogdDIgKyB2MCAqIHQgKyBwMTtcblxuXHR9XG5cbn07XG5cbi8vIEZpbGU6c3JjL21hdGgvVHJpYW5nbGUuanNcblxuLyoqXG4gKiBAYXV0aG9yIGJob3VzdG9uIC8gaHR0cDovL2V4b2NvcnRleC5jb21cbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKi9cblxuVEhSRUUuVHJpYW5nbGUgPSBmdW5jdGlvbiAoIGEsIGIsIGMgKSB7XG5cblx0dGhpcy5hID0gKCBhICE9PSB1bmRlZmluZWQgKSA/IGEgOiBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXHR0aGlzLmIgPSAoIGIgIT09IHVuZGVmaW5lZCApID8gYiA6IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdHRoaXMuYyA9ICggYyAhPT0gdW5kZWZpbmVkICkgPyBjIDogbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxufTtcblxuVEhSRUUuVHJpYW5nbGUubm9ybWFsID0gZnVuY3Rpb24gKCkge1xuXG5cdHZhciB2MCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uICggYSwgYiwgYywgb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHR2YXIgcmVzdWx0ID0gb3B0aW9uYWxUYXJnZXQgfHwgbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuXHRcdHJlc3VsdC5zdWJWZWN0b3JzKCBjLCBiICk7XG5cdFx0djAuc3ViVmVjdG9ycyggYSwgYiApO1xuXHRcdHJlc3VsdC5jcm9zcyggdjAgKTtcblxuXHRcdHZhciByZXN1bHRMZW5ndGhTcSA9IHJlc3VsdC5sZW5ndGhTcSgpO1xuXHRcdGlmICggcmVzdWx0TGVuZ3RoU3EgPiAwICkge1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0Lm11bHRpcGx5U2NhbGFyKCAxIC8gTWF0aC5zcXJ0KCByZXN1bHRMZW5ndGhTcSApICk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0LnNldCggMCwgMCwgMCApO1xuXG5cdH07XG5cbn0oKTtcblxuLy8gc3RhdGljL2luc3RhbmNlIG1ldGhvZCB0byBjYWxjdWxhdGUgYmFyeWNvb3JkaW5hdGVzXG4vLyBiYXNlZCBvbjogaHR0cDovL3d3dy5ibGFja3Bhd24uY29tL3RleHRzL3BvaW50aW5wb2x5L2RlZmF1bHQuaHRtbFxuVEhSRUUuVHJpYW5nbGUuYmFyeWNvb3JkRnJvbVBvaW50ID0gZnVuY3Rpb24gKCkge1xuXG5cdHZhciB2MCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdHZhciB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdHZhciB2MiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uICggcG9pbnQsIGEsIGIsIGMsIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0djAuc3ViVmVjdG9ycyggYywgYSApO1xuXHRcdHYxLnN1YlZlY3RvcnMoIGIsIGEgKTtcblx0XHR2Mi5zdWJWZWN0b3JzKCBwb2ludCwgYSApO1xuXG5cdFx0dmFyIGRvdDAwID0gdjAuZG90KCB2MCApO1xuXHRcdHZhciBkb3QwMSA9IHYwLmRvdCggdjEgKTtcblx0XHR2YXIgZG90MDIgPSB2MC5kb3QoIHYyICk7XG5cdFx0dmFyIGRvdDExID0gdjEuZG90KCB2MSApO1xuXHRcdHZhciBkb3QxMiA9IHYxLmRvdCggdjIgKTtcblxuXHRcdHZhciBkZW5vbSA9ICggZG90MDAgKiBkb3QxMSAtIGRvdDAxICogZG90MDEgKTtcblxuXHRcdHZhciByZXN1bHQgPSBvcHRpb25hbFRhcmdldCB8fCBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0Ly8gY29saW5lYXIgb3Igc2luZ3VsYXIgdHJpYW5nbGVcblx0XHRpZiAoIGRlbm9tID09PSAwICkge1xuXHRcdFx0Ly8gYXJiaXRyYXJ5IGxvY2F0aW9uIG91dHNpZGUgb2YgdHJpYW5nbGU/XG5cdFx0XHQvLyBub3Qgc3VyZSBpZiB0aGlzIGlzIHRoZSBiZXN0IGlkZWEsIG1heWJlIHNob3VsZCBiZSByZXR1cm5pbmcgdW5kZWZpbmVkXG5cdFx0XHRyZXR1cm4gcmVzdWx0LnNldCggLSAyLCAtIDEsIC0gMSApO1xuXHRcdH1cblxuXHRcdHZhciBpbnZEZW5vbSA9IDEgLyBkZW5vbTtcblx0XHR2YXIgdSA9ICggZG90MTEgKiBkb3QwMiAtIGRvdDAxICogZG90MTIgKSAqIGludkRlbm9tO1xuXHRcdHZhciB2ID0gKCBkb3QwMCAqIGRvdDEyIC0gZG90MDEgKiBkb3QwMiApICogaW52RGVub207XG5cblx0XHQvLyBiYXJ5Y29vcmRpbmF0ZXMgbXVzdCBhbHdheXMgc3VtIHRvIDFcblx0XHRyZXR1cm4gcmVzdWx0LnNldCggMSAtIHUgLSB2LCB2LCB1ICk7XG5cblx0fTtcblxufSgpO1xuXG5USFJFRS5UcmlhbmdsZS5jb250YWluc1BvaW50ID0gZnVuY3Rpb24gKCkge1xuXG5cdHZhciB2MSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uICggcG9pbnQsIGEsIGIsIGMgKSB7XG5cblx0XHR2YXIgcmVzdWx0ID0gVEhSRUUuVHJpYW5nbGUuYmFyeWNvb3JkRnJvbVBvaW50KCBwb2ludCwgYSwgYiwgYywgdjEgKTtcblxuXHRcdHJldHVybiAoIHJlc3VsdC54ID49IDAgKSAmJiAoIHJlc3VsdC55ID49IDAgKSAmJiAoICggcmVzdWx0LnggKyByZXN1bHQueSApIDw9IDEgKTtcblxuXHR9O1xuXG59KCk7XG5cblRIUkVFLlRyaWFuZ2xlLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogVEhSRUUuVHJpYW5nbGUsXG5cblx0c2V0OiBmdW5jdGlvbiAoIGEsIGIsIGMgKSB7XG5cblx0XHR0aGlzLmEuY29weSggYSApO1xuXHRcdHRoaXMuYi5jb3B5KCBiICk7XG5cdFx0dGhpcy5jLmNvcHkoIGMgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbVBvaW50c0FuZEluZGljZXM6IGZ1bmN0aW9uICggcG9pbnRzLCBpMCwgaTEsIGkyICkge1xuXG5cdFx0dGhpcy5hLmNvcHkoIHBvaW50c1sgaTAgXSApO1xuXHRcdHRoaXMuYi5jb3B5KCBwb2ludHNbIGkxIF0gKTtcblx0XHR0aGlzLmMuY29weSggcG9pbnRzWyBpMiBdICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNvcHk6IGZ1bmN0aW9uICggdHJpYW5nbGUgKSB7XG5cblx0XHR0aGlzLmEuY29weSggdHJpYW5nbGUuYSApO1xuXHRcdHRoaXMuYi5jb3B5KCB0cmlhbmdsZS5iICk7XG5cdFx0dGhpcy5jLmNvcHkoIHRyaWFuZ2xlLmMgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YXJlYTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHYwID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblx0XHR2YXIgdjEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0djAuc3ViVmVjdG9ycyggdGhpcy5jLCB0aGlzLmIgKTtcblx0XHRcdHYxLnN1YlZlY3RvcnMoIHRoaXMuYSwgdGhpcy5iICk7XG5cblx0XHRcdHJldHVybiB2MC5jcm9zcyggdjEgKS5sZW5ndGgoKSAqIDAuNTtcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdG1pZHBvaW50OiBmdW5jdGlvbiAoIG9wdGlvbmFsVGFyZ2V0ICkge1xuXG5cdFx0dmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cdFx0cmV0dXJuIHJlc3VsdC5hZGRWZWN0b3JzKCB0aGlzLmEsIHRoaXMuYiApLmFkZCggdGhpcy5jICkubXVsdGlwbHlTY2FsYXIoIDEgLyAzICk7XG5cblx0fSxcblxuXHRub3JtYWw6IGZ1bmN0aW9uICggb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHRyZXR1cm4gVEhSRUUuVHJpYW5nbGUubm9ybWFsKCB0aGlzLmEsIHRoaXMuYiwgdGhpcy5jLCBvcHRpb25hbFRhcmdldCApO1xuXG5cdH0sXG5cblx0cGxhbmU6IGZ1bmN0aW9uICggb3B0aW9uYWxUYXJnZXQgKSB7XG5cblx0XHR2YXIgcmVzdWx0ID0gb3B0aW9uYWxUYXJnZXQgfHwgbmV3IFRIUkVFLlBsYW5lKCk7XG5cblx0XHRyZXR1cm4gcmVzdWx0LnNldEZyb21Db3BsYW5hclBvaW50cyggdGhpcy5hLCB0aGlzLmIsIHRoaXMuYyApO1xuXG5cdH0sXG5cblx0YmFyeWNvb3JkRnJvbVBvaW50OiBmdW5jdGlvbiAoIHBvaW50LCBvcHRpb25hbFRhcmdldCApIHtcblxuXHRcdHJldHVybiBUSFJFRS5UcmlhbmdsZS5iYXJ5Y29vcmRGcm9tUG9pbnQoIHBvaW50LCB0aGlzLmEsIHRoaXMuYiwgdGhpcy5jLCBvcHRpb25hbFRhcmdldCApO1xuXG5cdH0sXG5cblx0Y29udGFpbnNQb2ludDogZnVuY3Rpb24gKCBwb2ludCApIHtcblxuXHRcdHJldHVybiBUSFJFRS5UcmlhbmdsZS5jb250YWluc1BvaW50KCBwb2ludCwgdGhpcy5hLCB0aGlzLmIsIHRoaXMuYyApO1xuXG5cdH0sXG5cblx0ZXF1YWxzOiBmdW5jdGlvbiAoIHRyaWFuZ2xlICkge1xuXG5cdFx0cmV0dXJuIHRyaWFuZ2xlLmEuZXF1YWxzKCB0aGlzLmEgKSAmJiB0cmlhbmdsZS5iLmVxdWFscyggdGhpcy5iICkgJiYgdHJpYW5nbGUuYy5lcXVhbHMoIHRoaXMuYyApO1xuXG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBuZXcgVEhSRUUuVHJpYW5nbGUoKS5jb3B5KCB0aGlzICk7XG5cblx0fVxuXG59O1xuXG4iLCIgLyogZ2xvYmFscyBkZWZpbmUgKi9cbiAoZnVuY3Rpb24oZGVmaW5lKXsndXNlIHN0cmljdCc7ZGVmaW5lKGZ1bmN0aW9uKHJlcXVpcmUsZXhwb3J0cyxtb2R1bGUpe1xuXG5mdW5jdGlvbiBmb3ZUb05EQ1NjYWxlT2Zmc2V0KCBmb3YgKSB7XG5cbiAgICB2YXIgcHhzY2FsZSA9IDIuMCAvIChmb3YubGVmdFRhbiArIGZvdi5yaWdodFRhbik7XG4gICAgdmFyIHB4b2Zmc2V0ID0gKGZvdi5sZWZ0VGFuIC0gZm92LnJpZ2h0VGFuKSAqIHB4c2NhbGUgKiAwLjU7XG4gICAgdmFyIHB5c2NhbGUgPSAyLjAgLyAoZm92LnVwVGFuICsgZm92LmRvd25UYW4pO1xuICAgIHZhciBweW9mZnNldCA9IChmb3YudXBUYW4gLSBmb3YuZG93blRhbikgKiBweXNjYWxlICogMC41O1xuICAgIHJldHVybiB7IHNjYWxlOiBbIHB4c2NhbGUsIHB5c2NhbGUgXSwgb2Zmc2V0OiBbIHB4b2Zmc2V0LCBweW9mZnNldCBdIH07XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGZvdlBvcnRUb1Byb2plY3Rpb24oIGZvdiwgcmlnaHRIYW5kZWQsIHpOZWFyLCB6RmFyICkge1xuXG4gICAgcmlnaHRIYW5kZWQgPSByaWdodEhhbmRlZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHJpZ2h0SGFuZGVkO1xuICAgIHpOZWFyID0gek5lYXIgPT09IHVuZGVmaW5lZCA/IDAuMDEgOiB6TmVhcjtcbiAgICB6RmFyID0gekZhciA9PT0gdW5kZWZpbmVkID8gMTAwMDAuMCA6IHpGYXI7XG5cbiAgICB2YXIgaGFuZGVkbmVzc1NjYWxlID0gcmlnaHRIYW5kZWQgPyAtMS4wIDogMS4wO1xuXG4gICAgLy8gc3RhcnQgd2l0aCBhbiBpZGVudGl0eSBtYXRyaXhcbiAgICB2YXIgbW9iaiA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG4gICAgdmFyIG0gPSBtb2JqLmVsZW1lbnRzO1xuXG4gICAgLy8gYW5kIHdpdGggc2NhbGUvb2Zmc2V0IGluZm8gZm9yIG5vcm1hbGl6ZWQgZGV2aWNlIGNvb3Jkc1xuICAgIHZhciBzY2FsZUFuZE9mZnNldCA9IGZvdlRvTkRDU2NhbGVPZmZzZXQoZm92KTtcblxuICAgIC8vIFggcmVzdWx0LCBtYXAgY2xpcCBlZGdlcyB0byBbLXcsK3ddXG4gICAgbVswICogNCArIDBdID0gc2NhbGVBbmRPZmZzZXQuc2NhbGVbMF07XG4gICAgbVswICogNCArIDFdID0gMC4wO1xuICAgIG1bMCAqIDQgKyAyXSA9IHNjYWxlQW5kT2Zmc2V0Lm9mZnNldFswXSAqIGhhbmRlZG5lc3NTY2FsZTtcbiAgICBtWzAgKiA0ICsgM10gPSAwLjA7XG5cbiAgICAvLyBZIHJlc3VsdCwgbWFwIGNsaXAgZWRnZXMgdG8gWy13LCt3XVxuICAgIC8vIFkgb2Zmc2V0IGlzIG5lZ2F0ZWQgYmVjYXVzZSB0aGlzIHByb2ogbWF0cml4IHRyYW5zZm9ybXMgZnJvbSB3b3JsZCBjb29yZHMgd2l0aCBZPXVwLFxuICAgIC8vIGJ1dCB0aGUgTkRDIHNjYWxpbmcgaGFzIFk9ZG93biAodGhhbmtzIEQzRD8pXG4gICAgbVsxICogNCArIDBdID0gMC4wO1xuICAgIG1bMSAqIDQgKyAxXSA9IHNjYWxlQW5kT2Zmc2V0LnNjYWxlWzFdO1xuICAgIG1bMSAqIDQgKyAyXSA9IC1zY2FsZUFuZE9mZnNldC5vZmZzZXRbMV0gKiBoYW5kZWRuZXNzU2NhbGU7XG4gICAgbVsxICogNCArIDNdID0gMC4wO1xuXG4gICAgLy8gWiByZXN1bHQgKHVwIHRvIHRoZSBhcHApXG4gICAgbVsyICogNCArIDBdID0gMC4wO1xuICAgIG1bMiAqIDQgKyAxXSA9IDAuMDtcbiAgICBtWzIgKiA0ICsgMl0gPSB6RmFyIC8gKHpOZWFyIC0gekZhcikgKiAtaGFuZGVkbmVzc1NjYWxlO1xuICAgIG1bMiAqIDQgKyAzXSA9ICh6RmFyICogek5lYXIpIC8gKHpOZWFyIC0gekZhcik7XG5cbiAgICAvLyBXIHJlc3VsdCAoPSBaIGluKVxuICAgIG1bMyAqIDQgKyAwXSA9IDAuMDtcbiAgICBtWzMgKiA0ICsgMV0gPSAwLjA7XG4gICAgbVszICogNCArIDJdID0gaGFuZGVkbmVzc1NjYWxlO1xuICAgIG1bMyAqIDQgKyAzXSA9IDAuMDtcblxuICAgIG1vYmoudHJhbnNwb3NlKCk7XG5cbiAgICByZXR1cm4gbW9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvdlRvUHJvamVjdGlvbiggZm92LCByaWdodEhhbmRlZCwgek5lYXIsIHpGYXIgKSB7XG5cbiAgICB2YXIgREVHMlJBRCA9IE1hdGguUEkgLyAxODAuMDtcblxuICAgIHZhciBmb3ZQb3J0ID0ge1xuICAgICAgdXBUYW46IE1hdGgudGFuKCBmb3YudXBEZWdyZWVzICogREVHMlJBRCApLFxuICAgICAgZG93blRhbjogTWF0aC50YW4oIGZvdi5kb3duRGVncmVlcyAqIERFRzJSQUQgKSxcbiAgICAgIGxlZnRUYW46IE1hdGgudGFuKCBmb3YubGVmdERlZ3JlZXMgKiBERUcyUkFEICksXG4gICAgICByaWdodFRhbjogTWF0aC50YW4oIGZvdi5yaWdodERlZ3JlZXMgKiBERUcyUkFEIClcbiAgICB9O1xuXG4gICAgcmV0dXJuIGZvdlBvcnRUb1Byb2plY3Rpb24oIGZvdlBvcnQsIHJpZ2h0SGFuZGVkLCB6TmVhciwgekZhciApO1xuXG4gIH1cblxuICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmb3ZUb1Byb2plY3Rpb246IGZvdlRvUHJvamVjdGlvblxuICB9O1xuXG4gIH0pO30pKHR5cGVvZiBkZWZpbmU9PSdmdW5jdGlvbicmJmRlZmluZS5hbWQ/ZGVmaW5lXG46KGZ1bmN0aW9uKG4sdyl7J3VzZSBzdHJpY3QnO3JldHVybiB0eXBlb2YgbW9kdWxlPT0nb2JqZWN0Jz9mdW5jdGlvbihjKXtcbmMocmVxdWlyZSxleHBvcnRzLG1vZHVsZSk7fTpmdW5jdGlvbihjKXt2YXIgbT17ZXhwb3J0czp7fX07YyhmdW5jdGlvbihuKXtcbnJldHVybiB3W25dO30sbS5leHBvcnRzLG0pO3dbbl09bS5leHBvcnRzO307fSkoJ1ZSUGVyc3BlY3RpdmUnLHRoaXMpKTtcbiIsIiAvKiBnbG9iYWxzIGRlZmluZSAqL1xuIChmdW5jdGlvbihkZWZpbmUpeyd1c2Ugc3RyaWN0JztkZWZpbmUoZnVuY3Rpb24ocmVxdWlyZSxleHBvcnRzLG1vZHVsZSl7XG5cbiAgICB2YXIgdnJEZXZpY2VzID0ge307XG4gICAgdmFyIHZpZXdwb3J0O1xuICAgIHZhciBzY2VuZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY2VuZScpO1xuICAgIHZhciB3b3JsZDtcbiAgICB2YXIgY2FtZXJhO1xuICAgIHZhciBmdWxsc2NyZWVuID0gZmFsc2U7XG4gICAgdmFyIHByb2plY3Rpb25UcmFuc2Zvcm07XG4gICAgdmFyIGZvdjtcbiAgICB2YXIgeCA9IDA7XG4gICAgdmFyIHkgPSAwO1xuICAgIHZhciB6ID0gMDtcbiAgICB2YXIgcm90WCA9IDA7XG4gICAgdmFyIHJvdFkgPSAwO1xuICAgIHZhciByb3RaID0gMDtcbiAgICB2YXIgdHJhbnNsYXRpb24gPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuICAgIHZhciByb3RhdGlvbjtcbiAgICB2YXIgcm90YXRpb25FdWxlciA9IFRIUkVFLkV1bGVyKDAsIDAsIDAsIFwiWVhaXCIpO1xuICAgIHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVJRDtcbiAgICB2YXIgcmVxdWVzdEZ1bGxTY3JlZW47XG5cblxuICAgIHNldHVwVlJEZXZpY2VzKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gQ3JlYXRlcyB2aWV3cG9ydCwgY2FtZXJhIGFuZCB3b3JsZCBlbGVtZW50c1xuICAgICAgc2V0dXBTY2VuZSgpO1xuICAgICAgLy8gSW5pdGlhdGVzIHRoZSBjYW1lcmEgcGVyc3BlY3RpdmUgbWF0cml4XG4gICAgICBzZXR1cFBlcnNwZWN0aXZlKCk7XG4gICAgICAvLyBGb3IgbW91c2UgbG9vayBtb2RlIHdoZW4gdGhlcmUncyBubyBITUQgYXZhaWFsYWJsZVxuICAgICAgc2V0dXBJbnB1dEV2ZW50SGFuZGxlcnMoKTtcbiAgICAgIHNldHVwRnVsbHNjcmVlbkhhbmRsZXJzKCk7XG4gICAgICAvLyBGdW5jdGlvbiB0aGF0IHVwZGF0ZXMgdGhlIGNhbWVyYSBvcmllbnRhdGlvbiBmcm9tIEhNRCBpbmZvcm1hdGlvblxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lSUQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZUNhbWVyYSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzZXR1cFZSRGV2aWNlcyhkb25lKSB7XG4gICAgICBpZiAobmF2aWdhdG9yLmdldFZSRGV2aWNlcyAmJiBuYXZpZ2F0b3IuZ2V0VlJEZXZpY2VzKCkudGhlbikge1xuICAgICAgICBuYXZpZ2F0b3IuZ2V0VlJEZXZpY2VzKCkudGhlbihnb3RWUkRldmljZXMpO1xuICAgICAgfSBlbHNlIHsgZG9uZSgpOyB9XG4gICAgICBmdW5jdGlvbiBnb3RWUkRldmljZXMoZGV2aWNlcykge1xuICAgICAgICAgIHZhciBpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGV2aWNlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGRldmljZXNbaV0gaW5zdGFuY2VvZiBITURWUkRldmljZSkge1xuICAgICAgICAgICAgICB2ckRldmljZXMuaGVhZHNldCA9IGRldmljZXNbaV07XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRldmljZXNbaV0gaW5zdGFuY2VvZiBQb3NpdGlvblNlbnNvclZSRGV2aWNlKSB7XG4gICAgICAgICAgICAgIHZyRGV2aWNlcy5wb3NpdGlvbiA9IGRldmljZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodnJEZXZpY2VzLmhlYWRzZXQgJiYgdnJEZXZpY2VzLnBvc2l0aW9uKSB7IGJyZWFrOyB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGRvbmUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbnRlclZSKCkge1xuICAgICAgcmVxdWVzdEZ1bGxTY3JlZW4uY2FsbChzY2VuZSwgeyB2ckRpc3BsYXk6IHZyRGV2aWNlcy5oZWFkc2V0IH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwUGVyc3BlY3RpdmUoKSB7XG4gICAgICBmb3YgPSB2ckRldmljZXMuaGVhZHNldD8gdnJEZXZpY2VzLmhlYWRzZXQuZ2V0RXllUGFyYW1ldGVycygnbGVmdCcpLnJlY29tbWVuZGVkRmllbGRPZlZpZXcgOiB7IHVwRGVncmVlczogNDUsIHJpZ2h0RGVncmVlczogNDUsIGRvd25EZWdyZWVzOiA0NSwgbGVmdERlZ3JlZXM6IDQ1IH07XG4gICAgICAvL3ZhciBwZXJzcGVjdGl2ZSA9IFZSUGVyc3BlY3RpdmUuZm92VG9Qcm9qZWN0aW9uKCBmb3YsIHRydWUsIDEsIDEwMDAwICk7XG4gICAgICB2YXIgcGVyc3BlY3RpdmUgPSBwZXJzcGVjdGl2ZU1hdHJpeChUSFJFRS5NYXRoLmRlZ1RvUmFkKGZvdi51cERlZ3JlZXMpLCB2aWV3cG9ydC5vZmZzZXRXaWR0aCAvIHZpZXdwb3J0Lm9mZnNldEhlaWdodCwgMSwgMTAwMDApO1xuICAgICAgcGVyc3BlY3RpdmUgPSBwZXJzcGVjdGl2ZS5jbG9uZSgpLnNjYWxlKG5ldyBUSFJFRS5WZWN0b3IzKHZpZXdwb3J0Lm9mZnNldFdpZHRoLCB2aWV3cG9ydC5vZmZzZXRIZWlnaHQsIDEpKTtcbiAgICAgIHByb2plY3Rpb25UcmFuc2Zvcm0gPSBnZXRDU1NNYXRyaXgocGVyc3BlY3RpdmUpO1xuICAgICAgdmlld3BvcnQuc3R5bGUudHJhbnNmb3JtID0gcHJvamVjdGlvblRyYW5zZm9ybTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cFNjZW5lKCkge1xuICAgICAgdmFyIGk7XG4gICAgICB2YXIgdnJFbHMgPSBzY2VuZS5jaGlsZHJlbjtcbiAgICAgIHZhciB2ckVsc0xlbmd0aCA9IHZyRWxzLmxlbmd0aDtcbiAgICAgIHZpZXdwb3J0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB2aWV3cG9ydC5jbGFzc0xpc3QuYWRkKCd2aWV3cG9ydCcpO1xuICAgICAgY2FtZXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjYW1lcmEuY2xhc3NMaXN0LmFkZCgndnInKTtcbiAgICAgIGNhbWVyYS5jbGFzc0xpc3QuYWRkKCdjYW1lcmEnKTtcbiAgICAgIHdvcmxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB3b3JsZC5jbGFzc0xpc3QuYWRkKCd2cicpO1xuICAgICAgd29ybGQuY2xhc3NMaXN0LmFkZCgnd29ybGQnKTtcblxuICAgICAgLy8gU2V0dXAgSGllcmFyY2h5XG4gICAgICAvLyBzY2VuZVxuICAgICAgLy8gICB2aWV3cG9ydFxuICAgICAgLy8gICAgICBjYW1lcmFcbiAgICAgIC8vICAgICAgICB3b3JsZFxuICAgICAgLy8gICAgICAgICAgdXNlci1lbGVtZW50c1xuICAgICAgZm9yKGkgPSAwOyBpIDwgdnJFbHNMZW5ndGg7ICsraSkge1xuICAgICAgICB3b3JsZC5hcHBlbmRDaGlsZCh2ckVsc1swXSk7XG4gICAgICB9XG4gICAgICBzY2VuZS5hcHBlbmRDaGlsZCh2aWV3cG9ydCk7XG4gICAgICB2aWV3cG9ydC5hcHBlbmRDaGlsZChjYW1lcmEpO1xuICAgICAgY2FtZXJhLmFwcGVuZENoaWxkKHdvcmxkKTtcbiAgICAgIHJlcXVlc3RGdWxsU2NyZWVuID0gc2NlbmUubW96UmVxdWVzdEZ1bGxTY3JlZW4gfHwgc2NlbmUud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQ2FtZXJhKCkge1xuICAgICAgdmFyIHRyYW5zZm9ybTtcbiAgICAgIGlmIChmdWxsc2NyZWVuKSB7XG4gICAgICAgIHRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgtNTAlLCAtNTAlLCAwcHgpJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zZm9ybSA9IHByb2plY3Rpb25UcmFuc2Zvcm07XG4gICAgICB9XG4gICAgICBwb2xsSGVhZE9yaWVudGF0aW9uKCk7XG4gICAgICB2aWV3cG9ydC5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZUNhbWVyYSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9sbEhlYWRPcmllbnRhdGlvbigpIHtcbiAgICAgIHZhciBvcmllbnRhdGlvbjtcbiAgICAgIHZhciBxdWF0ZXJuaW9uO1xuICAgICAgdmFyIHBvc2l0aW9uXG4gICAgICB2YXIgc3RhdGU7XG4gICAgICBpZiAodnJEZXZpY2VzLnBvc2l0aW9uKSB7XG4gICAgICAgIHN0YXRlID0gdnJEZXZpY2VzLnBvc2l0aW9uLmdldFN0YXRlKClcbiAgICAgICAgb3JpZW50YXRpb24gPSBzdGF0ZS5vcmllbnRhdGlvbjtcbiAgICAgICAgcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgcXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKG9yaWVudGF0aW9uLngsIC1vcmllbnRhdGlvbi55LCBvcmllbnRhdGlvbi56LCBvcmllbnRhdGlvbi53KTtcbiAgICAgICAgICByb3RhdGlvbiA9IG5ldyBUSFJFRS5NYXRyaXg0KCkubWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgICAgdHJhbnNsYXRpb24gPSBuZXcgVEhSRUUuTWF0cml4NCgpLm1ha2VUcmFuc2xhdGlvbihwb3NpdGlvbi54ICwgcG9zaXRpb24ueSAsIHBvc2l0aW9uLnopO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB1cGRhdGVFbGVtZW50KGNhbWVyYSwge1xuICAgICAgICByb3RhdGlvbjogcm90YXRpb24sXG4gICAgICAgIHRyYW5zbGF0aW9uOiB0cmFuc2xhdGlvblxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dXBGdWxsc2NyZWVuSGFuZGxlcnMoKSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwid2Via2l0ZnVsbHNjcmVlbmNoYW5nZVwiLCBvbmZ1bGxzY3JlZW5jaGFuZ2UpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vemZ1bGxzY3JlZW5jaGFuZ2VcIiwgICAgb25mdWxsc2NyZWVuY2hhbmdlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmdWxsc2NyZWVuY2hhbmdlXCIsICAgICAgIG9uZnVsbHNjcmVlbmNoYW5nZSk7XG5cbiAgICAgIGZ1bmN0aW9uIG9uZnVsbHNjcmVlbmNoYW5nZSgpIHtcbiAgICAgICAgaWYgKCAhZG9jdW1lbnQubW96RnVsbFNjcmVlbkVsZW1lbnQgJiYgIWRvY3VtZW50LndlYmtpdEZ1bGxTY3JlZW5FbGVtZW50ICkge1xuICAgICAgICAgIHZpZXdwb3J0LmNsYXNzTGlzdC5yZW1vdmUoJ2Z1bGxzY3JlZW4nKTtcbiAgICAgICAgICBmdWxsc2NyZWVuID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZ1bGxzY3JlZW4gPSB0cnVlO1xuICAgICAgICB2aWV3cG9ydC5jbGFzc0xpc3QuYWRkKCdmdWxsc2NyZWVuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGVyc3BlY3RpdmVNYXRyaXgoZm92LCBhc3BlY3QsIG5lYXJ6LCBmYXJ6KSB7XG4gICAgICB2YXIgbWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcbiAgICAgIHZhciByYW5nZSA9IE1hdGgudGFuKGZvdiAqIDAuNSkgKiBuZWFyejtcblxuICAgICAgbWF0cml4LmVsZW1lbnRzWzBdID0gKDIgKiBuZWFyeikgLyAoKHJhbmdlICogYXNwZWN0KSAtICgtcmFuZ2UgKiBhc3BlY3QpKTtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1sxXSA9IDA7XG4gICAgICBtYXRyaXguZWxlbWVudHNbMl0gPSAwO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzNdID0gMDtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1s0XSA9IDA7XG4gICAgICBtYXRyaXguZWxlbWVudHNbNV0gPSAoMiAqIG5lYXJ6KSAvICgyICogcmFuZ2UpO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzZdID0gMDtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1s3XSA9IDA7XG4gICAgICBtYXRyaXguZWxlbWVudHNbOF0gPSAwO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzldID0gMDtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1sxMF0gPSAtKGZhcnogKyBuZWFyeikgLyAoZmFyeiAtIG5lYXJ6KTtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1sxMV0gPSAtMTtcbiAgICAgIG1hdHJpeC5lbGVtZW50c1sxMl0gPSAwO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzEzXSA9IDA7XG4gICAgICBtYXRyaXguZWxlbWVudHNbMTRdID0gLSgyICogZmFyeiAqIG5lYXJ6KSAvIChmYXJ6IC0gbmVhcnopO1xuICAgICAgbWF0cml4LmVsZW1lbnRzWzE1XSA9IDA7XG4gICAgICByZXR1cm4gbWF0cml4LnRyYW5zcG9zZSgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRDU1NNYXRyaXgobWF0cml4KSB7XG4gICAgICB2YXIgZWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XG5cbiAgICAgIHJldHVybiAnbWF0cml4M2QoJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyAwIF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyAxIF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyAyIF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyAzIF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyA0IF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyA1IF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyA2IF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyA3IF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyA4IF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyA5IF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyAxMCBdICkgKyAnLCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgMTEgXSApICsgJywnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDEyIF0gKSArICcsJyArXG4gICAgICAgIGVwc2lsb24oIGVsZW1lbnRzWyAxMyBdICkgKyAnLCcgK1xuICAgICAgICBlcHNpbG9uKCBlbGVtZW50c1sgMTQgXSApICsgJywnICtcbiAgICAgICAgZXBzaWxvbiggZWxlbWVudHNbIDE1IF0gKSArXG4gICAgICAnKSc7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGVwc2lsb24oIHZhbHVlICkge1xuICAgICAgcmV0dXJuIE1hdGguYWJzKCB2YWx1ZSApIDwgMC4wMDAwMDEgPyAwIDogdmFsdWU7XG4gICAgfTtcblxuICAgIHZhciByb3RhdGlvbkVuYWJsZWQ7XG4gICAgdmFyIGxhc3RNb3VzZVg7XG4gICAgdmFyIGxhc3RNb3VzZVk7XG4gICAgdmFyIFBJXzIgPSBNYXRoLlBJIC8gMjtcbiAgICB2YXIgY2FtZXJhUm90YXRpb247XG4gICAgdmFyIGNhbWVyYVRyYW5zbGF0aW9uO1xuXG4gICAgZnVuY3Rpb24gc2V0dXBJbnB1dEV2ZW50SGFuZGxlcnMoKSB7XG4gICAgICBzY2VuZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICByb3RhdGlvbkVuYWJsZWQgPSB0cnVlO1xuICAgICAgICBsYXN0TW91c2VYID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgbGFzdE1vdXNlWSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICB9LCB0cnVlKTtcblxuICAgICAgc2NlbmUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHJvdGF0aW9uRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgIHNjZW5lLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmICghcm90YXRpb25FbmFibGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWx0YVggPSAoZXZlbnQuY2xpZW50WCAtIGxhc3RNb3VzZVgpICogMC4yO1xuICAgICAgICB2YXIgZGVsdGFZID0gKGV2ZW50LmNsaWVudFkgLSBsYXN0TW91c2VZKSAqIDAuMjtcbiAgICAgICAgcm90WCArPSBkZWx0YVg7XG4gICAgICAgIHJvdFkgLT0gZGVsdGFZO1xuICAgICAgICAvLyBDbGFtcCB0byBbLVBJIC8gMiwgUEkgLyAyXVxuICAgICAgICByb3RZID0gTWF0aC5tYXgoIC05MCwgTWF0aC5taW4oIDkwLCByb3RZICkgKTtcblxuICAgICAgICBsYXN0TW91c2VYID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgbGFzdE1vdXNlWSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICAgIHRyYW5zbGF0aW9uID0gbmV3IFRIUkVFLk1hdHJpeDQoKS5tYWtlVHJhbnNsYXRpb24oeCAsIHkgLCB6KTtcbiAgICAgICAgcm90YXRpb25FdWxlciA9IG5ldyBUSFJFRS5FdWxlcihcbiAgICAgICAgICBUSFJFRS5NYXRoLmRlZ1RvUmFkKHJvdFkpLFxuICAgICAgICAgIFRIUkVFLk1hdGguZGVnVG9SYWQocm90WCksXG4gICAgICAgICAgVEhSRUUuTWF0aC5kZWdUb1JhZChyb3RaKSxcbiAgICAgICAgICBcIlhZWlwiICk7XG4gICAgICAgIHJvdGF0aW9uID0gbmV3IFRIUkVFLk1hdHJpeDQoKS5tYWtlUm90YXRpb25Gcm9tRXVsZXIocm90YXRpb25FdWxlcik7XG5cbiAgICAgIH0sIHRydWUpO1xuXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgaWYgKCAoIGUua2V5Y29kZSB8fCBlLndoaWNoICkgPT0gMzIpIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgIH0sIGZhbHNlKTtcblxuICAgIH1cblxuICAgIHZhciB1cGRhdGVFbGVtZW50ID0gZnVuY3Rpb24ob2JqZWN0LCBkYXRhKSB7XG4gICAgICB2YXIgdHJhbnNsYXRpb24gPSBkYXRhLnRyYW5zbGF0aW9uLmNsb25lKCkgfHwgbmV3IFRIUkVFLk1hdHJpeDQoKTtcbiAgICAgIHZhciByb3RhdGlvbiA9IGRhdGEucm90YXRpb24gfHwgbmV3IFRIUkVFLk1hdHJpeDQoKTtcbiAgICAgIG9iamVjdC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZTNkKC01MCUsIC01MCUsIDBweCkgXCIgKyBnZXRDU1NNYXRyaXgodHJhbnNsYXRpb24ubXVsdGlwbHkocm90YXRpb24pKTtcbiAgICB9O1xuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgICB6ZXJvU2Vuc29yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJvdFggPSAwO1xuICAgICAgICByb3RZID0gMDtcbiAgICAgICAgcm90YXRpb24gPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuICAgICAgICB0cmFuc2xhdGlvbiA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG4gICAgICAgIGlmICh2ckRldmljZXMucG9zaXRpb24pIHsgdnJEZXZpY2VzLnBvc2l0aW9uLnJlc2V0U2Vuc29yKCk7IH1cbiAgICAgIH0sXG4gICAgICBlbnRlclZSOiBlbnRlclZSXG4gICAgfTtcblxufSk7fSkodHlwZW9mIGRlZmluZT09J2Z1bmN0aW9uJyYmZGVmaW5lLmFtZD9kZWZpbmVcbjooZnVuY3Rpb24obix3KXsndXNlIHN0cmljdCc7cmV0dXJuIHR5cGVvZiBtb2R1bGU9PSdvYmplY3QnP2Z1bmN0aW9uKGMpe1xuYyhyZXF1aXJlLGV4cG9ydHMsbW9kdWxlKTt9OmZ1bmN0aW9uKGMpe3ZhciBtPXtleHBvcnRzOnt9fTtjKGZ1bmN0aW9uKG4pe1xucmV0dXJuIHdbbl07fSxtLmV4cG9ydHMsbSk7d1tuXT1tLmV4cG9ydHM7fTt9KSgnVlJDU1MnLHRoaXMpKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==