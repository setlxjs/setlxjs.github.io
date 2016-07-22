/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _execute = __webpack_require__(1);

	var _execute2 = _interopRequireDefault(_execute);

	var _printToDiv = __webpack_require__(110);

	var _printToDiv2 = _interopRequireDefault(_printToDiv);

	__webpack_require__(111);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var editor = document.getElementById('editor');
	var cons = document.getElementById('cons');

	var button = document.createElement('button');
	button.innerHTML = 'RUN!';
	button.style.position = 'fixed';
	button.style.top = '10px';
	button.style.right = '10px';

	document.body.appendChild(editor);
	document.body.appendChild(button);
	document.body.appendChild(cons);

	var codemirror = CodeMirror(editor, {
	  theme: 'monokai',
	  value: 'print("hello world");',
	  lineNumbers: true,
	  mode: 'setlx'
	});

	editor.firstChild.style.height = '100%';

	var print = (0, _printToDiv2.default)(cons);

	button.onclick = function () {
	  cons.innerHTML = '';
	  (0, _execute2.default)(codemirror.getValue(), print).catch(function (error) {
	    print(error);

	    codemirror.addLineClass(error.line - 1, 'background', 'error-line');
	    var evt = codemirror.on('change', function me() {
	      codemirror.removeLineClass(error.line - 1, 'background', 'error-line');
	      codemirror.off('change', me);
	    });
	  });
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = execute;

	var _setlxjsTranspiler = __webpack_require__(2);

	var _setlxjsTranspiler2 = _interopRequireDefault(_setlxjsTranspiler);

	var _hlp = __webpack_require__(77);

	var hlp = _interopRequireWildcard(_hlp);

	var _std = __webpack_require__(96);

	var std = _interopRequireWildcard(_std);

	var _StdLibPluginBrowser = __webpack_require__(108);

	var _StdLibPluginBrowser2 = _interopRequireDefault(_StdLibPluginBrowser);

	var _HelperPluginBrowser = __webpack_require__(109);

	var _HelperPluginBrowser2 = _interopRequireDefault(_HelperPluginBrowser);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function execute(content, print) {
	  var startedAt = performance.now();
	  return (0, _setlxjsTranspiler2.default)(content, {
	    plugins: {
	      stdLibPlugin: new _StdLibPluginBrowser2.default(),
	      helperPlugin: new _HelperPluginBrowser2.default()
	    }
	  }).then(function (res) {
	    var code = new Function('$$stdLib', '$$hlpLib', 'print', res);
	    var transpiledAt = performance.now();
	    code(std, hlp, print);
	    var executedAt = performance.now();
	    print('');
	    print('Finished programm:');
	    print('Transpilation took ' + (transpiledAt - startedAt) + ' ms.');
	    print('Execution took ' + (executedAt - transpiledAt) + ' ms.');
	  });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* eslint no-var: 0, func-names: 0, no-console: 0, prefer-arrow-callback: 0 */
	var parser = __webpack_require__(3);
	var transpiler = __webpack_require__(42);

	function exp(input, options, cb) {
	  var callback;
	  var opts;
	  var promise;
	  var out;
	  if (typeof options === 'function') {
	    callback = options;
	  } else if (typeof options === 'undefined') {
	    opts = {};
	  } else {
	    opts = options;
	    callback = cb;
	  }

	  if (opts.tree) {
	    try {
	      out = parser(input);
	      promise = Promise.resolve(out);
	    } catch (error) {
	      promise = Promise.reject(error);
	    }
	  } else {
	    try {
	      out = transpiler(input, opts.plugins);
	      promise = Promise.resolve(out);
	    } catch (error) {
	      promise = Promise.reject(error);
	    }
	  }

	  if (typeof callback === 'function') {
	    promise.then(function (output) {
	      callback(null, output);
	    }).catch(callback);
	    return null;
	  }
	  return promise;
	}

	module.exports = exp;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = parser;

	var _grammarGrammar = __webpack_require__(4);

	// eslint-disable-line import/no-unresolved

	function parser(fileContent) {
	  try {
	    return (0, _grammarGrammar.parse)(fileContent);
	  } catch (error) {
	    if (error.name === 'SyntaxError') {
	      error.message = error.message.replace(/\.$/, '') + (' in line ' + error.line + ':' + error.column + '.');
	      throw error;
	    }
	    throw error;
	  }
	}

	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";module.exports=function(){/*
	   * Generated by PEG.js 0.8.0.
	   *
	   * http://pegjs.majda.cz/
	   */function peg$subclass(child,parent){function ctor(){this.constructor=child;}ctor.prototype=parent.prototype;child.prototype=new ctor();}function SyntaxError(message,expected,found,offset,line,column){this.message=message;this.expected=expected;this.found=found;this.offset=offset;this.line=line;this.column=column;this.name="SyntaxError";}peg$subclass(SyntaxError,Error);function parse(input){var options=arguments.length>1?arguments[1]:{},peg$FAILED={},peg$startRuleFunctions={InitBlock:peg$parseInitBlock},peg$startRuleFunction=peg$parseInitBlock,peg$c0=peg$FAILED,peg$c1=[],peg$c2=function peg$c2(stmts){return InitBlock(stmts);},peg$c3=function peg$c3(stmts){return Block(stmts);},peg$c4=";",peg$c5={type:"literal",value:";",description:"\";\""},peg$c6=function peg$c6(assign){return Statement(assign);},peg$c7="return",peg$c8={type:"literal",value:"return",description:"\"return\""},peg$c9=null,peg$c10=function peg$c10(expr){return Return(expr);},peg$c11="break",peg$c12={type:"literal",value:"break",description:"\"break\""},peg$c13=function peg$c13(){return Break();},peg$c14=function peg$c14(expr){return Statement(expr);},peg$c15="for",peg$c16={type:"literal",value:"for",description:"\"for\""},peg$c17="(",peg$c18={type:"literal",value:"(",description:"\"(\""},peg$c19="|",peg$c20={type:"literal",value:"|",description:"\"|\""},peg$c21=")",peg$c22={type:"literal",value:")",description:"\")\""},peg$c23="{",peg$c24={type:"literal",value:"{",description:"\"{\""},peg$c25="}",peg$c26={type:"literal",value:"}",description:"\"}\""},peg$c27=function peg$c27(iterators,expr,blk){return ForLoop(iterators,expr?expr[3]:null,blk);},peg$c28="while",peg$c29={type:"literal",value:"while",description:"\"while\""},peg$c30=function peg$c30(expr,blk){return WhileLoop(expr,blk);},peg$c31="switch",peg$c32={type:"literal",value:"switch",description:"\"switch\""},peg$c33="case",peg$c34={type:"literal",value:"case",description:"\"case\""},peg$c35=":",peg$c36={type:"literal",value:":",description:"\":\""},peg$c37=function peg$c37(expr,blk){return CaseStmt(expr,blk);},peg$c38="default",peg$c39={type:"literal",value:"default",description:"\"default\""},peg$c40=function peg$c40(blk){return CaseStmt(null,blk);},peg$c41=function peg$c41(cases,deflt){cases=cases||[];if(deflt){cases.push(deflt);}return SwitchStmt(cases);},peg$c42="if",peg$c43={type:"literal",value:"if",description:"\"if\""},peg$c44="else",peg$c45={type:"literal",value:"else",description:"\"else\""},peg$c46=function peg$c46(expr,blk){return function(elseblk){return IfStmt(expr,blk,elseblk);};},peg$c47=function peg$c47(blk){return blk;},peg$c48=function peg$c48(expr,blk,elseif,elseblk){return IfStmt(expr,blk,elseif.reduceRight(reduceApply,elseblk));},peg$c49=function peg$c49(id){return id;},peg$c50="+=",peg$c51={type:"literal",value:"+=",description:"\"+=\""},peg$c52=function peg$c52(){return ops.PLUS;},peg$c53="*=",peg$c54={type:"literal",value:"*=",description:"\"*=\""},peg$c55=function peg$c55(){return ops.TIMES;},peg$c56="-=",peg$c57={type:"literal",value:"-=",description:"\"-=\""},peg$c58=function peg$c58(){return ops.MINUS;},peg$c59="/=",peg$c60={type:"literal",value:"/=",description:"\"/=\""},peg$c61=function peg$c61(){return ops.DIVIDED_BY;},peg$c62="%=",peg$c63={type:"literal",value:"%=",description:"\"%=\""},peg$c64=function peg$c64(){return ops.MODULO;},peg$c65="\\=",peg$c66={type:"literal",value:"\\=",description:"\"\\\\=\""},peg$c67=function peg$c67(){return ops.INTEGER_DIVISION;},peg$c68=function peg$c68(asable,op,expr){if(op===ops.PLUS||op===ops.MINUS){return Assignment(asable,Sum(op,asable,expr));}return Assignment(asable,Product(op,asable,expr));},peg$c69=":=",peg$c70={type:"literal",value:":=",description:"\":=\""},peg$c71=function peg$c71(asable,expr){return Assignment(asable,expr);},peg$c72="[",peg$c73={type:"literal",value:"[",description:"\"[\""},peg$c74="]",peg$c75={type:"literal",value:"]",description:"\"]\""},peg$c76=function peg$c76(vari,coll){return coll?Call(vari,CollectionAccess(coll[1])):vari;},peg$c77=function peg$c77(aslist){return aslist;},peg$c78=",",peg$c79={type:"literal",value:",",description:"\",\""},peg$c80=function peg$c80(as1,as2){return AssignableList(makeList(as1,as2));},peg$c81=function peg$c81(pro){return pro;},peg$c82="<==>",peg$c83={type:"literal",value:"<==>",description:"\"<==>\""},peg$c84=function peg$c84(){return ops.IF_ONLY_IF;},peg$c85="<!=>",peg$c86={type:"literal",value:"<!=>",description:"\"<!=>\""},peg$c87=function peg$c87(){return ops.NOT_IF_ONLY_IF;},peg$c88=function peg$c88(i1,i2){return i2?Implication(i2[1],i1,i2[3]):i1;},peg$c89="|->",peg$c90={type:"literal",value:"|->",description:"\"|->\""},peg$c91=function peg$c91(){return true;},peg$c92="|=>",peg$c93={type:"literal",value:"|=>",description:"\"|=>\""},peg$c94=function peg$c94(){return false;},peg$c95=function peg$c95(params,clos,expr){return Procedure(params,Block([Return(expr)]),clos);},peg$c96=function peg$c96(vari){return[vari];},peg$c97=function peg$c97(v1,v2){return makeList(v1,v2);},peg$c98="=>",peg$c99={type:"literal",value:"=>",description:"\"=>\""},peg$c100=function peg$c100(dis,impl){return impl?Implication(ops.IMPLIES,dis,impl[3]):dis;},peg$c101="||",peg$c102={type:"literal",value:"||",description:"\"||\""},peg$c103=function peg$c103(con2){return function(lhs){return Disjunction(lhs,con2);};},peg$c104=function peg$c104(con1,disj){return disj.reduce(reduceApply,con1);},peg$c105="&&",peg$c106={type:"literal",value:"&&",description:"\"&&\""},peg$c107=function peg$c107(comp2){return function(lhs){return Conjunction(lhs,comp2);};},peg$c108=function peg$c108(comp1,conj){return conj.reduce(reduceApply,comp1);},peg$c109="==",peg$c110={type:"literal",value:"==",description:"\"==\""},peg$c111=function peg$c111(){return ops.EQUAL;},peg$c112="!=",peg$c113={type:"literal",value:"!=",description:"\"!=\""},peg$c114=function peg$c114(){return ops.NOT_EQUAL;},peg$c115=">=",peg$c116={type:"literal",value:">=",description:"\">=\""},peg$c117=function peg$c117(){return ops.GREATER_EQUAL_THAN;},peg$c118="<=",peg$c119={type:"literal",value:"<=",description:"\"<=\""},peg$c120=function peg$c120(){return ops.LESS_EQUAL_THAN;},peg$c121=">",peg$c122={type:"literal",value:">",description:"\">\""},peg$c123=function peg$c123(){return ops.GREATER_THAN;},peg$c124="<",peg$c125={type:"literal",value:"<",description:"\"<\""},peg$c126=function peg$c126(){return ops.LESS_THAN;},peg$c127="in",peg$c128={type:"literal",value:"in",description:"\"in\""},peg$c129=function peg$c129(){return ops.IS_IN;},peg$c130="notin",peg$c131={type:"literal",value:"notin",description:"\"notin\""},peg$c132=function peg$c132(){return ops.IS_NOT_IN;},peg$c133=function peg$c133(s1,s2){return s2?Comparison(s2[1],s1,s2[3]):s1;},peg$c134="+",peg$c135={type:"literal",value:"+",description:"\"+\""},peg$c136=function peg$c136(){return ops.PLUS;},peg$c137="-",peg$c138={type:"literal",value:"-",description:"\"-\""},peg$c139=function peg$c139(){return ops.MINUS;},peg$c140=function peg$c140(op,p2){return function(lhs){return Sum(op,lhs,p2);};},peg$c141=function peg$c141(p1,sum){return sum?sum.reduce(reduceApply,p1):p1;},peg$c142="*",peg$c143={type:"literal",value:"*",description:"\"*\""},peg$c144=function peg$c144(){return ops.TIMES;},peg$c145="/",peg$c146={type:"literal",value:"/",description:"\"/\""},peg$c147=function peg$c147(){return ops.DIVIDED_BY;},peg$c148="%",peg$c149={type:"literal",value:"%",description:"\"%\""},peg$c150=function peg$c150(){return ops.MODULO;},peg$c151="\\",peg$c152={type:"literal",value:"\\",description:"\"\\\\\""},peg$c153=function peg$c153(op,r2){return function(lhs){return Product(op,lhs,r2);};},peg$c154=function peg$c154(r1,prod){return prod?prod.reduce(reduceApply,r1):r1;},peg$c155=function peg$c155(pre){return pre;},peg$c156="**",peg$c157={type:"literal",value:"**",description:"\"**\""},peg$c158=function peg$c158(f1,f2){return f2?Exponential(f1,f2[3]):f1;},peg$c159="+/",peg$c160={type:"literal",value:"+/",description:"\"+/\""},peg$c161=function peg$c161(pre){return PrefixOperation(ops.PREFIX_PLUS,pre);},peg$c162="*/",peg$c163={type:"literal",value:"*/",description:"\"*/\""},peg$c164=function peg$c164(pre){return PrefixOperation(ops.PREFIX_TIMES,pre);},peg$c165="#",peg$c166={type:"literal",value:"#",description:"\"#\""},peg$c167=function peg$c167(pre){return PrefixOperation(ops.PREFIX_LENGTH,pre);},peg$c168=function peg$c168(pre){return PrefixOperation(ops.PREFIX_MINUS,pre);},peg$c169="!",peg$c170={type:"literal",value:"!",description:"\"!\""},peg$c171=function peg$c171(fact){return PrefixOperation(ops.PREFIX_NOT,fact);},peg$c172="forall",peg$c173={type:"literal",value:"forall",description:"\"forall\""},peg$c174=function peg$c174(its,cond){return Forall(its,cond);},peg$c175="exists",peg$c176={type:"literal",value:"exists",description:"\"exists\""},peg$c177=function peg$c177(its,cond){return Exists(its,cond);},peg$c178=function peg$c178(vali,factorial){return factorial?Factorial(vali):vali;},peg$c179=function peg$c179(expr){return expr;},peg$c180=function peg$c180(proc){return proc;},peg$c181=function peg$c181(vari){return vari;},peg$c182=function peg$c182(receiv,calls,factorial){var ret=calls.reduce(function(p,call){return Call(p,call);},receiv);return factorial?Factorial(ret):ret;},peg$c183="procedure",peg$c184={type:"literal",value:"procedure",description:"\"procedure\""},peg$c185=function peg$c185(params,blk){return Procedure(params||[],blk);},peg$c186="closure",peg$c187={type:"literal",value:"closure",description:"\"closure\""},peg$c188=function peg$c188(params,blk){return Procedure(params||[],blk,true);},peg$c189=function peg$c189(params){return FunctionCall(params);},peg$c190=function peg$c190(acc){return CollectionAccess(acc);},peg$c191=function peg$c191(exprl){return exprl||[];},peg$c192=function peg$c192(expr2){return expr;},peg$c193=function peg$c193(exprl){return function(expr1){exprl.unshift(expr1);return exprl;};},peg$c194=function peg$c194(expr2){return function(expr1){return Range(expr1,expr2);};},peg$c195=function peg$c195(expr,more){return more?more(expr):expr;},peg$c196=function peg$c196(expr1){return makeList(expr1,expr2);},peg$c197=function peg$c197(expr1){return Range(expr1,expr2);},peg$c198=function peg$c198(expr){return Range(Primitive(types.INTEGER,1),expr);},peg$c199=function peg$c199(expr1,expr2){return makeList(expr1,expr2);},peg$c200=function peg$c200(builder){return builder?List(builder):List();},peg$c201=function peg$c201(builder){return builder?SetlSet(builder):SetlSet();},peg$c202=function peg$c202(prim){return prim;},peg$c203=function peg$c203(exprs){var ret=exprs.map(function(expr){return expr[3];});return function(expr){ret.unshift(expr);return ret;};},peg$c204=function peg$c204(chain,expr2){return function(expr1){return Generator(expr1,chain,(expr2||[])[3]);};},peg$c205=function peg$c205(expr1,make){return make?make(expr1):[expr1];},peg$c206=function peg$c206(it1,it2){return makeList(it1,it2);},peg$c207=function peg$c207(as,expr){return Iterator(as,expr);},peg$c208={type:"other",description:"bool"},peg$c209="true",peg$c210={type:"literal",value:"true",description:"\"true\""},peg$c211="false",peg$c212={type:"literal",value:"false",description:"\"false\""},peg$c213=function peg$c213(){return Primitive(types.BOOLEAN,text()==='true');},peg$c214={type:"other",description:"identifier"},peg$c215=/^[a-z]/,peg$c216={type:"class",value:"[a-z]",description:"[a-z]"},peg$c217=/^[a-zA-Z_0-9]/,peg$c218={type:"class",value:"[a-zA-Z_0-9]",description:"[a-zA-Z_0-9]"},peg$c219=function peg$c219(){return Identifier(text());},peg$c220={type:"other",description:"number"},peg$c221="0",peg$c222={type:"literal",value:"0",description:"\"0\""},peg$c223=function peg$c223(){return Primitive(types.INTEGER,0);},peg$c224=/^[1-9]/,peg$c225={type:"class",value:"[1-9]",description:"[1-9]"},peg$c226=/^[0-9]/,peg$c227={type:"class",value:"[0-9]",description:"[0-9]"},peg$c228=function peg$c228(){return Primitive(types.INTEGER,parseInt(text(),10));},peg$c229={type:"other",description:"double"},peg$c230=".",peg$c231={type:"literal",value:".",description:"\".\""},peg$c232=/^[eE]/,peg$c233={type:"class",value:"[eE]",description:"[eE]"},peg$c234=function peg$c234(){return Primitive(types.DOUBLE,text());},peg$c235={type:"other",description:".."},peg$c236="..",peg$c237={type:"literal",value:"..",description:"\"..\""},peg$c238={type:"other",description:"string"},peg$c239="\"",peg$c240={type:"literal",value:"\"",description:"\"\\\"\""},peg$c241="\\\"",peg$c242={type:"literal",value:"\\\"",description:"\"\\\\\\\"\""},peg$c243=/^[^"]/,peg$c244={type:"class",value:"[^\"]",description:"[^\"]"},peg$c245=function peg$c245(){return Primitive(types.STRING,text());},peg$c246="\n",peg$c247={type:"literal",value:"\n",description:"\"\\n\""},peg$c248="\r\n",peg$c249={type:"literal",value:"\r\n",description:"\"\\r\\n\""},peg$c250="\r",peg$c251={type:"literal",value:"\r",description:"\"\\r\""},peg$c252="//",peg$c253={type:"literal",value:"//",description:"\"//\""},peg$c254=void 0,peg$c255={type:"any",description:"any character"},peg$c256="/*",peg$c257={type:"literal",value:"/*",description:"\"/*\""},peg$c258={type:"other",description:"whitespace"},peg$c259=/^[ \t\n\r]/,peg$c260={type:"class",value:"[ \\t\\n\\r]",description:"[ \\t\\n\\r]"},peg$c261=function peg$c261(){return null;},peg$currPos=0,peg$reportedPos=0,peg$cachedPos=0,peg$cachedPosDetails={line:1,column:1,seenCR:false},peg$maxFailPos=0,peg$maxFailExpected=[],peg$silentFails=0,peg$result;if("startRule"in options){if(!(options.startRule in peg$startRuleFunctions)){throw new Error("Can't start parsing from rule \""+options.startRule+"\".");}peg$startRuleFunction=peg$startRuleFunctions[options.startRule];}function text(){return input.substring(peg$reportedPos,peg$currPos);}function offset(){return peg$reportedPos;}function line(){return peg$computePosDetails(peg$reportedPos).line;}function column(){return peg$computePosDetails(peg$reportedPos).column;}function expected(description){throw peg$buildException(null,[{type:"other",description:description}],peg$reportedPos);}function error(message){throw peg$buildException(message,null,peg$reportedPos);}function peg$computePosDetails(pos){function advance(details,startPos,endPos){var p,ch;for(p=startPos;p<endPos;p++){ch=input.charAt(p);if(ch==="\n"){if(!details.seenCR){details.line++;}details.column=1;details.seenCR=false;}else if(ch==="\r"||ch==="\u2028"||ch==="\u2029"){details.line++;details.column=1;details.seenCR=true;}else{details.column++;details.seenCR=false;}}}if(peg$cachedPos!==pos){if(peg$cachedPos>pos){peg$cachedPos=0;peg$cachedPosDetails={line:1,column:1,seenCR:false};}advance(peg$cachedPosDetails,peg$cachedPos,pos);peg$cachedPos=pos;}return peg$cachedPosDetails;}function peg$fail(expected){if(peg$currPos<peg$maxFailPos){return;}if(peg$currPos>peg$maxFailPos){peg$maxFailPos=peg$currPos;peg$maxFailExpected=[];}peg$maxFailExpected.push(expected);}function peg$buildException(message,expected,pos){function cleanupExpected(expected){var i=1;expected.sort(function(a,b){if(a.description<b.description){return-1;}else if(a.description>b.description){return 1;}else{return 0;}});while(i<expected.length){if(expected[i-1]===expected[i]){expected.splice(i,1);}else{i++;}}}function buildMessage(expected,found){function stringEscape(s){function hex(ch){return ch.charCodeAt(0).toString(16).toUpperCase();}return s.replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\x08/g,'\\b').replace(/\t/g,'\\t').replace(/\n/g,'\\n').replace(/\f/g,'\\f').replace(/\r/g,'\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g,function(ch){return'\\x0'+hex(ch);}).replace(/[\x10-\x1F\x80-\xFF]/g,function(ch){return'\\x'+hex(ch);}).replace(/[\u0180-\u0FFF]/g,function(ch){return"\\u0"+hex(ch);}).replace(/[\u1080-\uFFFF]/g,function(ch){return"\\u"+hex(ch);});}var expectedDescs=new Array(expected.length),expectedDesc,foundDesc,i;for(i=0;i<expected.length;i++){expectedDescs[i]=expected[i].description;}expectedDesc=expected.length>1?expectedDescs.slice(0,-1).join(", ")+" or "+expectedDescs[expected.length-1]:expectedDescs[0];foundDesc=found?"\""+stringEscape(found)+"\"":"end of input";return"Expected "+expectedDesc+" but "+foundDesc+" found.";}var posDetails=peg$computePosDetails(pos),found=pos<input.length?input.charAt(pos):null;if(expected!==null){cleanupExpected(expected);}return new SyntaxError(message!==null?message:buildMessage(expected,found),expected,found,pos,posDetails.line,posDetails.column);}function peg$parseInitBlock(){var s0,s1,s2;s0=peg$currPos;s1=[];s2=peg$parseStatement();if(s2!==peg$FAILED){while(s2!==peg$FAILED){s1.push(s2);s2=peg$parseStatement();}}else{s1=peg$c0;}if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c2(s1);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseBlock(){var s0,s1,s2;s0=peg$currPos;s1=[];s2=peg$parseStatement();while(s2!==peg$FAILED){s1.push(s2);s2=peg$parseStatement();}if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c3(s1);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseStatement(){var s0,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s26,s27;s0=peg$currPos;s1=peg$parseWS();if(s1!==peg$FAILED){s2=peg$parseAssignmentOther();if(s2!==peg$FAILED){s3=peg$parseWS();if(s3!==peg$FAILED){if(input.charCodeAt(peg$currPos)===59){s4=peg$c4;peg$currPos++;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c5);}}if(s4!==peg$FAILED){peg$reportedPos=s0;s1=peg$c6(s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;s1=peg$parseWS();if(s1!==peg$FAILED){s2=peg$parseAssignmentDirect();if(s2!==peg$FAILED){s3=peg$parseWS();if(s3!==peg$FAILED){if(input.charCodeAt(peg$currPos)===59){s4=peg$c4;peg$currPos++;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c5);}}if(s4!==peg$FAILED){peg$reportedPos=s0;s1=peg$c6(s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;s1=peg$parseWS();if(s1!==peg$FAILED){if(input.substr(peg$currPos,6)===peg$c7){s2=peg$c7;peg$currPos+=6;}else{s2=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c8);}}if(s2!==peg$FAILED){s3=peg$parseWS();if(s3!==peg$FAILED){s4=peg$parseExpression();if(s4===peg$FAILED){s4=peg$c9;}if(s4!==peg$FAILED){s5=peg$parseWS();if(s5!==peg$FAILED){if(input.charCodeAt(peg$currPos)===59){s6=peg$c4;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c5);}}if(s6!==peg$FAILED){peg$reportedPos=s0;s1=peg$c10(s4);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;s1=peg$parseWS();if(s1!==peg$FAILED){if(input.substr(peg$currPos,5)===peg$c11){s2=peg$c11;peg$currPos+=5;}else{s2=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c12);}}if(s2!==peg$FAILED){s3=peg$parseWS();if(s3!==peg$FAILED){if(input.charCodeAt(peg$currPos)===59){s4=peg$c4;peg$currPos++;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c5);}}if(s4!==peg$FAILED){peg$reportedPos=s0;s1=peg$c13();s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;s1=peg$parseWS();if(s1!==peg$FAILED){s2=peg$parseExpression();if(s2!==peg$FAILED){s3=peg$parseWS();if(s3!==peg$FAILED){if(input.charCodeAt(peg$currPos)===59){s4=peg$c4;peg$currPos++;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c5);}}if(s4!==peg$FAILED){peg$reportedPos=s0;s1=peg$c14(s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;s1=peg$parseWS();if(s1!==peg$FAILED){if(input.substr(peg$currPos,3)===peg$c15){s2=peg$c15;peg$currPos+=3;}else{s2=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c16);}}if(s2!==peg$FAILED){s3=peg$parseWS();if(s3!==peg$FAILED){if(input.charCodeAt(peg$currPos)===40){s4=peg$c17;peg$currPos++;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c18);}}if(s4!==peg$FAILED){s5=peg$parseIteratorChain();if(s5!==peg$FAILED){s6=peg$currPos;s7=peg$parseWS();if(s7!==peg$FAILED){if(input.charCodeAt(peg$currPos)===124){s8=peg$c19;peg$currPos++;}else{s8=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c20);}}if(s8!==peg$FAILED){s9=peg$parseWS();if(s9!==peg$FAILED){s10=peg$parseExpression();if(s10!==peg$FAILED){s7=[s7,s8,s9,s10];s6=s7;}else{peg$currPos=s6;s6=peg$c0;}}else{peg$currPos=s6;s6=peg$c0;}}else{peg$currPos=s6;s6=peg$c0;}}else{peg$currPos=s6;s6=peg$c0;}if(s6===peg$FAILED){s6=peg$c9;}if(s6!==peg$FAILED){if(input.charCodeAt(peg$currPos)===41){s7=peg$c21;peg$currPos++;}else{s7=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c22);}}if(s7!==peg$FAILED){s8=peg$parseWS();if(s8!==peg$FAILED){if(input.charCodeAt(peg$currPos)===123){s9=peg$c23;peg$currPos++;}else{s9=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c24);}}if(s9!==peg$FAILED){s10=peg$parseBlock();if(s10!==peg$FAILED){if(input.charCodeAt(peg$currPos)===125){s11=peg$c25;peg$currPos++;}else{s11=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c26);}}if(s11!==peg$FAILED){peg$reportedPos=s0;s1=peg$c27(s5,s6,s10);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;s1=peg$parseWS();if(s1!==peg$FAILED){if(input.substr(peg$currPos,5)===peg$c28){s2=peg$c28;peg$currPos+=5;}else{s2=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c29);}}if(s2!==peg$FAILED){s3=peg$parseWS();if(s3!==peg$FAILED){if(input.charCodeAt(peg$currPos)===40){s4=peg$c17;peg$currPos++;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c18);}}if(s4!==peg$FAILED){s5=peg$parseExpression();if(s5!==peg$FAILED){if(input.charCodeAt(peg$currPos)===41){s6=peg$c21;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c22);}}if(s6!==peg$FAILED){s7=peg$parseWS();if(s7!==peg$FAILED){if(input.charCodeAt(peg$currPos)===123){s8=peg$c23;peg$currPos++;}else{s8=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c24);}}if(s8!==peg$FAILED){s9=peg$parseBlock();if(s9!==peg$FAILED){if(input.charCodeAt(peg$currPos)===125){s10=peg$c25;peg$currPos++;}else{s10=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c26);}}if(s10!==peg$FAILED){peg$reportedPos=s0;s1=peg$c30(s5,s9);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;s1=peg$parseWS();if(s1!==peg$FAILED){if(input.substr(peg$currPos,6)===peg$c31){s2=peg$c31;peg$currPos+=6;}else{s2=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c32);}}if(s2!==peg$FAILED){s3=peg$parseWS();if(s3!==peg$FAILED){if(input.charCodeAt(peg$currPos)===123){s4=peg$c23;peg$currPos++;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c24);}}if(s4!==peg$FAILED){s5=[];s6=peg$currPos;s7=peg$parseWS();if(s7!==peg$FAILED){if(input.substr(peg$currPos,4)===peg$c33){s8=peg$c33;peg$currPos+=4;}else{s8=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c34);}}if(s8!==peg$FAILED){s9=peg$parseWS();if(s9!==peg$FAILED){s10=peg$parseExpression();if(s10!==peg$FAILED){if(input.charCodeAt(peg$currPos)===58){s11=peg$c35;peg$currPos++;}else{s11=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c36);}}if(s11!==peg$FAILED){s12=peg$parseBlock();if(s12!==peg$FAILED){peg$reportedPos=s6;s7=peg$c37(s10,s12);s6=s7;}else{peg$currPos=s6;s6=peg$c0;}}else{peg$currPos=s6;s6=peg$c0;}}else{peg$currPos=s6;s6=peg$c0;}}else{peg$currPos=s6;s6=peg$c0;}}else{peg$currPos=s6;s6=peg$c0;}}else{peg$currPos=s6;s6=peg$c0;}while(s6!==peg$FAILED){s5.push(s6);s6=peg$currPos;s7=peg$parseWS();if(s7!==peg$FAILED){if(input.substr(peg$currPos,4)===peg$c33){s8=peg$c33;peg$currPos+=4;}else{s8=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c34);}}if(s8!==peg$FAILED){s9=peg$parseWS();if(s9!==peg$FAILED){s10=peg$parseExpression();if(s10!==peg$FAILED){if(input.charCodeAt(peg$currPos)===58){s11=peg$c35;peg$currPos++;}else{s11=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c36);}}if(s11!==peg$FAILED){s12=peg$parseBlock();if(s12!==peg$FAILED){peg$reportedPos=s6;s7=peg$c37(s10,s12);s6=s7;}else{peg$currPos=s6;s6=peg$c0;}}else{peg$currPos=s6;s6=peg$c0;}}else{peg$currPos=s6;s6=peg$c0;}}else{peg$currPos=s6;s6=peg$c0;}}else{peg$currPos=s6;s6=peg$c0;}}else{peg$currPos=s6;s6=peg$c0;}}if(s5!==peg$FAILED){s6=peg$currPos;s7=peg$parseWS();if(s7!==peg$FAILED){if(input.substr(peg$currPos,7)===peg$c38){s8=peg$c38;peg$currPos+=7;}else{s8=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c39);}}if(s8!==peg$FAILED){s9=peg$parseWS();if(s9!==peg$FAILED){if(input.charCodeAt(peg$currPos)===58){s10=peg$c35;peg$currPos++;}else{s10=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c36);}}if(s10!==peg$FAILED){s11=peg$parseBlock();if(s11!==peg$FAILED){peg$reportedPos=s6;s7=peg$c40(s11);s6=s7;}else{peg$currPos=s6;s6=peg$c0;}}else{peg$currPos=s6;s6=peg$c0;}}else{peg$currPos=s6;s6=peg$c0;}}else{peg$currPos=s6;s6=peg$c0;}}else{peg$currPos=s6;s6=peg$c0;}if(s6===peg$FAILED){s6=peg$c9;}if(s6!==peg$FAILED){if(input.charCodeAt(peg$currPos)===125){s7=peg$c25;peg$currPos++;}else{s7=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c26);}}if(s7!==peg$FAILED){peg$reportedPos=s0;s1=peg$c41(s5,s6);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;s1=peg$parseWS();if(s1!==peg$FAILED){if(input.substr(peg$currPos,2)===peg$c42){s2=peg$c42;peg$currPos+=2;}else{s2=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c43);}}if(s2!==peg$FAILED){s3=peg$parseWS();if(s3!==peg$FAILED){if(input.charCodeAt(peg$currPos)===40){s4=peg$c17;peg$currPos++;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c18);}}if(s4!==peg$FAILED){s5=peg$parseWS();if(s5!==peg$FAILED){s6=peg$parseExpression();if(s6!==peg$FAILED){s7=peg$parseWS();if(s7!==peg$FAILED){if(input.charCodeAt(peg$currPos)===41){s8=peg$c21;peg$currPos++;}else{s8=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c22);}}if(s8!==peg$FAILED){s9=peg$parseWS();if(s9!==peg$FAILED){if(input.charCodeAt(peg$currPos)===123){s10=peg$c23;peg$currPos++;}else{s10=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c24);}}if(s10!==peg$FAILED){s11=peg$parseBlock();if(s11!==peg$FAILED){if(input.charCodeAt(peg$currPos)===125){s12=peg$c25;peg$currPos++;}else{s12=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c26);}}if(s12!==peg$FAILED){s13=[];s14=peg$currPos;s15=peg$parseWS();if(s15!==peg$FAILED){if(input.substr(peg$currPos,4)===peg$c44){s16=peg$c44;peg$currPos+=4;}else{s16=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c45);}}if(s16!==peg$FAILED){s17=peg$parseWS();if(s17!==peg$FAILED){if(input.substr(peg$currPos,2)===peg$c42){s18=peg$c42;peg$currPos+=2;}else{s18=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c43);}}if(s18!==peg$FAILED){s19=peg$parseWS();if(s19!==peg$FAILED){if(input.charCodeAt(peg$currPos)===40){s20=peg$c17;peg$currPos++;}else{s20=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c18);}}if(s20!==peg$FAILED){s21=peg$parseWS();if(s21!==peg$FAILED){s22=peg$parseExpression();if(s22!==peg$FAILED){if(input.charCodeAt(peg$currPos)===41){s23=peg$c21;peg$currPos++;}else{s23=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c22);}}if(s23!==peg$FAILED){s24=peg$parseWS();if(s24!==peg$FAILED){if(input.charCodeAt(peg$currPos)===123){s25=peg$c23;peg$currPos++;}else{s25=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c24);}}if(s25!==peg$FAILED){s26=peg$parseBlock();if(s26!==peg$FAILED){if(input.charCodeAt(peg$currPos)===125){s27=peg$c25;peg$currPos++;}else{s27=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c26);}}if(s27!==peg$FAILED){peg$reportedPos=s14;s15=peg$c46(s22,s26);s14=s15;}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}while(s14!==peg$FAILED){s13.push(s14);s14=peg$currPos;s15=peg$parseWS();if(s15!==peg$FAILED){if(input.substr(peg$currPos,4)===peg$c44){s16=peg$c44;peg$currPos+=4;}else{s16=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c45);}}if(s16!==peg$FAILED){s17=peg$parseWS();if(s17!==peg$FAILED){if(input.substr(peg$currPos,2)===peg$c42){s18=peg$c42;peg$currPos+=2;}else{s18=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c43);}}if(s18!==peg$FAILED){s19=peg$parseWS();if(s19!==peg$FAILED){if(input.charCodeAt(peg$currPos)===40){s20=peg$c17;peg$currPos++;}else{s20=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c18);}}if(s20!==peg$FAILED){s21=peg$parseWS();if(s21!==peg$FAILED){s22=peg$parseExpression();if(s22!==peg$FAILED){if(input.charCodeAt(peg$currPos)===41){s23=peg$c21;peg$currPos++;}else{s23=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c22);}}if(s23!==peg$FAILED){s24=peg$parseWS();if(s24!==peg$FAILED){if(input.charCodeAt(peg$currPos)===123){s25=peg$c23;peg$currPos++;}else{s25=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c24);}}if(s25!==peg$FAILED){s26=peg$parseBlock();if(s26!==peg$FAILED){if(input.charCodeAt(peg$currPos)===125){s27=peg$c25;peg$currPos++;}else{s27=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c26);}}if(s27!==peg$FAILED){peg$reportedPos=s14;s15=peg$c46(s22,s26);s14=s15;}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}if(s13!==peg$FAILED){s14=peg$currPos;s15=peg$parseWS();if(s15!==peg$FAILED){if(input.substr(peg$currPos,4)===peg$c44){s16=peg$c44;peg$currPos+=4;}else{s16=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c45);}}if(s16!==peg$FAILED){s17=peg$parseWS();if(s17!==peg$FAILED){if(input.charCodeAt(peg$currPos)===123){s18=peg$c23;peg$currPos++;}else{s18=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c24);}}if(s18!==peg$FAILED){s19=peg$parseBlock();if(s19!==peg$FAILED){if(input.charCodeAt(peg$currPos)===125){s20=peg$c25;peg$currPos++;}else{s20=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c26);}}if(s20!==peg$FAILED){peg$reportedPos=s14;s15=peg$c47(s19);s14=s15;}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}}else{peg$currPos=s14;s14=peg$c0;}if(s14===peg$FAILED){s14=peg$c9;}if(s14!==peg$FAILED){peg$reportedPos=s0;s1=peg$c48(s6,s11,s13,s14);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}}}}}}}}return s0;}function peg$parseVariable(){var s0,s1;s0=peg$currPos;s1=peg$parseID();if(s1!==peg$FAILED){peg$reportedPos=s0;s1=peg$c49(s1);}s0=s1;return s0;}function peg$parseAssignmentOther(){var s0,s1,s2,s3,s4,s5;s0=peg$currPos;s1=peg$parseAssignable();if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){s3=peg$currPos;if(input.substr(peg$currPos,2)===peg$c50){s4=peg$c50;peg$currPos+=2;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c51);}}if(s4!==peg$FAILED){peg$reportedPos=s3;s4=peg$c52();}s3=s4;if(s3===peg$FAILED){s3=peg$currPos;if(input.substr(peg$currPos,2)===peg$c53){s4=peg$c53;peg$currPos+=2;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c54);}}if(s4!==peg$FAILED){peg$reportedPos=s3;s4=peg$c55();}s3=s4;if(s3===peg$FAILED){s3=peg$currPos;if(input.substr(peg$currPos,2)===peg$c56){s4=peg$c56;peg$currPos+=2;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c57);}}if(s4!==peg$FAILED){peg$reportedPos=s3;s4=peg$c58();}s3=s4;if(s3===peg$FAILED){s3=peg$currPos;if(input.substr(peg$currPos,2)===peg$c59){s4=peg$c59;peg$currPos+=2;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c60);}}if(s4!==peg$FAILED){peg$reportedPos=s3;s4=peg$c61();}s3=s4;if(s3===peg$FAILED){s3=peg$currPos;if(input.substr(peg$currPos,2)===peg$c62){s4=peg$c62;peg$currPos+=2;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c63);}}if(s4!==peg$FAILED){peg$reportedPos=s3;s4=peg$c64();}s3=s4;if(s3===peg$FAILED){s3=peg$currPos;if(input.substr(peg$currPos,2)===peg$c65){s4=peg$c65;peg$currPos+=2;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c66);}}if(s4!==peg$FAILED){peg$reportedPos=s3;s4=peg$c67();}s3=s4;}}}}}if(s3!==peg$FAILED){s4=peg$parseWS();if(s4!==peg$FAILED){s5=peg$parseExpression();if(s5!==peg$FAILED){peg$reportedPos=s0;s1=peg$c68(s1,s3,s5);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseAssignmentDirect(){var s0,s1,s2,s3,s4,s5;s0=peg$currPos;s1=peg$parseAssignable();if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){if(input.substr(peg$currPos,2)===peg$c69){s3=peg$c69;peg$currPos+=2;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c70);}}if(s3!==peg$FAILED){s4=peg$parseWS();if(s4!==peg$FAILED){s5=peg$parseAssignmentDirect();if(s5===peg$FAILED){s5=peg$parseExpression();}if(s5!==peg$FAILED){peg$reportedPos=s0;s1=peg$c71(s1,s5);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseAssignable(){var s0,s1,s2,s3,s4,s5;s0=peg$currPos;s1=peg$parseVariable();if(s1!==peg$FAILED){s2=peg$currPos;if(input.charCodeAt(peg$currPos)===91){s3=peg$c72;peg$currPos++;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c73);}}if(s3!==peg$FAILED){s4=peg$parseExpression();if(s4!==peg$FAILED){if(input.charCodeAt(peg$currPos)===93){s5=peg$c74;peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c75);}}if(s5!==peg$FAILED){s3=[s3,s4,s5];s2=s3;}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}if(s2===peg$FAILED){s2=peg$c9;}if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c76(s1,s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;if(input.charCodeAt(peg$currPos)===91){s1=peg$c72;peg$currPos++;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c73);}}if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){s3=peg$parseExplicitAssignList();if(s3!==peg$FAILED){s4=peg$parseWS();if(s4!==peg$FAILED){if(input.charCodeAt(peg$currPos)===93){s5=peg$c74;peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c75);}}if(s5!==peg$FAILED){peg$reportedPos=s0;s1=peg$c77(s3);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}return s0;}function peg$parseExplicitAssignList(){var s0,s1,s2,s3,s4,s5,s6,s7;s0=peg$currPos;s1=peg$parseAssignable();if(s1!==peg$FAILED){s2=[];s3=peg$currPos;s4=peg$parseWS();if(s4!==peg$FAILED){if(input.charCodeAt(peg$currPos)===44){s5=peg$c78;peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c79);}}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){s7=peg$parseAssignable();if(s7!==peg$FAILED){s4=[s4,s5,s6,s7];s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}while(s3!==peg$FAILED){s2.push(s3);s3=peg$currPos;s4=peg$parseWS();if(s4!==peg$FAILED){if(input.charCodeAt(peg$currPos)===44){s5=peg$c78;peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c79);}}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){s7=peg$parseAssignable();if(s7!==peg$FAILED){s4=[s4,s5,s6,s7];s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c80(s1,s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseExpression(){var s0,s1,s2,s3,s4,s5,s6;s0=peg$currPos;s1=peg$parseLambdaProcedure();if(s1!==peg$FAILED){peg$reportedPos=s0;s1=peg$c81(s1);}s0=s1;if(s0===peg$FAILED){s0=peg$currPos;s1=peg$parseImplication();if(s1!==peg$FAILED){s2=peg$currPos;s3=peg$parseWS();if(s3!==peg$FAILED){s4=peg$currPos;if(input.substr(peg$currPos,4)===peg$c82){s5=peg$c82;peg$currPos+=4;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c83);}}if(s5!==peg$FAILED){peg$reportedPos=s4;s5=peg$c84();}s4=s5;if(s4===peg$FAILED){s4=peg$currPos;if(input.substr(peg$currPos,4)===peg$c85){s5=peg$c85;peg$currPos+=4;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c86);}}if(s5!==peg$FAILED){peg$reportedPos=s4;s5=peg$c87();}s4=s5;}if(s4!==peg$FAILED){s5=peg$parseWS();if(s5!==peg$FAILED){s6=peg$parseImplication();if(s6!==peg$FAILED){s3=[s3,s4,s5,s6];s2=s3;}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}if(s2===peg$FAILED){s2=peg$c9;}if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c88(s1,s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}return s0;}function peg$parseLambdaProcedure(){var s0,s1,s2,s3,s4,s5;s0=peg$currPos;s1=peg$parseLambdaParameters();if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){s3=peg$currPos;if(input.substr(peg$currPos,3)===peg$c89){s4=peg$c89;peg$currPos+=3;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c90);}}if(s4!==peg$FAILED){peg$reportedPos=s3;s4=peg$c91();}s3=s4;if(s3===peg$FAILED){s3=peg$currPos;if(input.substr(peg$currPos,3)===peg$c92){s4=peg$c92;peg$currPos+=3;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c93);}}if(s4!==peg$FAILED){peg$reportedPos=s3;s4=peg$c94();}s3=s4;}if(s3!==peg$FAILED){s4=peg$parseWS();if(s4!==peg$FAILED){s5=peg$parseExpression();if(s5!==peg$FAILED){peg$reportedPos=s0;s1=peg$c95(s1,s3,s5);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseLambdaParameters(){var s0,s1,s2,s3,s4,s5,s6,s7,s8,s9;s0=peg$currPos;s1=peg$parseVariable();if(s1!==peg$FAILED){peg$reportedPos=s0;s1=peg$c96(s1);}s0=s1;if(s0===peg$FAILED){s0=peg$currPos;if(input.charCodeAt(peg$currPos)===91){s1=peg$c72;peg$currPos++;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c73);}}if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){s3=peg$parseVariable();if(s3!==peg$FAILED){s4=[];s5=peg$currPos;s6=peg$parseWS();if(s6!==peg$FAILED){if(input.charCodeAt(peg$currPos)===44){s7=peg$c78;peg$currPos++;}else{s7=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c79);}}if(s7!==peg$FAILED){s8=peg$parseWS();if(s8!==peg$FAILED){s9=peg$parseVariable();if(s9!==peg$FAILED){s6=[s6,s7,s8,s9];s5=s6;}else{peg$currPos=s5;s5=peg$c0;}}else{peg$currPos=s5;s5=peg$c0;}}else{peg$currPos=s5;s5=peg$c0;}}else{peg$currPos=s5;s5=peg$c0;}while(s5!==peg$FAILED){s4.push(s5);s5=peg$currPos;s6=peg$parseWS();if(s6!==peg$FAILED){if(input.charCodeAt(peg$currPos)===44){s7=peg$c78;peg$currPos++;}else{s7=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c79);}}if(s7!==peg$FAILED){s8=peg$parseWS();if(s8!==peg$FAILED){s9=peg$parseVariable();if(s9!==peg$FAILED){s6=[s6,s7,s8,s9];s5=s6;}else{peg$currPos=s5;s5=peg$c0;}}else{peg$currPos=s5;s5=peg$c0;}}else{peg$currPos=s5;s5=peg$c0;}}else{peg$currPos=s5;s5=peg$c0;}}if(s4!==peg$FAILED){s5=peg$parseWS();if(s5!==peg$FAILED){if(input.charCodeAt(peg$currPos)===93){s6=peg$c74;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c75);}}if(s6!==peg$FAILED){peg$reportedPos=s0;s1=peg$c97(s3,s4);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}return s0;}function peg$parseImplication(){var s0,s1,s2,s3,s4,s5,s6;s0=peg$currPos;s1=peg$parseDisjunction();if(s1!==peg$FAILED){s2=peg$currPos;s3=peg$parseWS();if(s3!==peg$FAILED){if(input.substr(peg$currPos,2)===peg$c98){s4=peg$c98;peg$currPos+=2;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c99);}}if(s4!==peg$FAILED){s5=peg$parseWS();if(s5!==peg$FAILED){s6=peg$parseImplication();if(s6!==peg$FAILED){s3=[s3,s4,s5,s6];s2=s3;}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}if(s2===peg$FAILED){s2=peg$c9;}if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c100(s1,s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseDisjunction(){var s0,s1,s2,s3,s4,s5,s6,s7;s0=peg$currPos;s1=peg$parseConjunction();if(s1!==peg$FAILED){s2=[];s3=peg$currPos;s4=peg$parseWS();if(s4!==peg$FAILED){if(input.substr(peg$currPos,2)===peg$c101){s5=peg$c101;peg$currPos+=2;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c102);}}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){s7=peg$parseConjunction();if(s7!==peg$FAILED){peg$reportedPos=s3;s4=peg$c103(s7);s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}while(s3!==peg$FAILED){s2.push(s3);s3=peg$currPos;s4=peg$parseWS();if(s4!==peg$FAILED){if(input.substr(peg$currPos,2)===peg$c101){s5=peg$c101;peg$currPos+=2;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c102);}}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){s7=peg$parseConjunction();if(s7!==peg$FAILED){peg$reportedPos=s3;s4=peg$c103(s7);s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c104(s1,s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseConjunction(){var s0,s1,s2,s3,s4,s5,s6,s7;s0=peg$currPos;s1=peg$parseComparison();if(s1!==peg$FAILED){s2=[];s3=peg$currPos;s4=peg$parseWS();if(s4!==peg$FAILED){if(input.substr(peg$currPos,2)===peg$c105){s5=peg$c105;peg$currPos+=2;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c106);}}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){s7=peg$parseComparison();if(s7!==peg$FAILED){peg$reportedPos=s3;s4=peg$c107(s7);s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}while(s3!==peg$FAILED){s2.push(s3);s3=peg$currPos;s4=peg$parseWS();if(s4!==peg$FAILED){if(input.substr(peg$currPos,2)===peg$c105){s5=peg$c105;peg$currPos+=2;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c106);}}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){s7=peg$parseComparison();if(s7!==peg$FAILED){peg$reportedPos=s3;s4=peg$c107(s7);s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c108(s1,s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseComparison(){var s0,s1,s2,s3,s4,s5,s6;s0=peg$currPos;s1=peg$parseSum();if(s1!==peg$FAILED){s2=peg$currPos;s3=peg$parseWS();if(s3!==peg$FAILED){s4=peg$currPos;if(input.substr(peg$currPos,2)===peg$c109){s5=peg$c109;peg$currPos+=2;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c110);}}if(s5!==peg$FAILED){peg$reportedPos=s4;s5=peg$c111();}s4=s5;if(s4===peg$FAILED){s4=peg$currPos;if(input.substr(peg$currPos,2)===peg$c112){s5=peg$c112;peg$currPos+=2;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c113);}}if(s5!==peg$FAILED){peg$reportedPos=s4;s5=peg$c114();}s4=s5;if(s4===peg$FAILED){s4=peg$currPos;if(input.substr(peg$currPos,2)===peg$c115){s5=peg$c115;peg$currPos+=2;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c116);}}if(s5!==peg$FAILED){peg$reportedPos=s4;s5=peg$c117();}s4=s5;if(s4===peg$FAILED){s4=peg$currPos;if(input.substr(peg$currPos,2)===peg$c118){s5=peg$c118;peg$currPos+=2;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c119);}}if(s5!==peg$FAILED){peg$reportedPos=s4;s5=peg$c120();}s4=s5;if(s4===peg$FAILED){s4=peg$currPos;if(input.charCodeAt(peg$currPos)===62){s5=peg$c121;peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c122);}}if(s5!==peg$FAILED){peg$reportedPos=s4;s5=peg$c123();}s4=s5;if(s4===peg$FAILED){s4=peg$currPos;if(input.charCodeAt(peg$currPos)===60){s5=peg$c124;peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c125);}}if(s5!==peg$FAILED){peg$reportedPos=s4;s5=peg$c126();}s4=s5;if(s4===peg$FAILED){s4=peg$currPos;if(input.substr(peg$currPos,2)===peg$c127){s5=peg$c127;peg$currPos+=2;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c128);}}if(s5!==peg$FAILED){peg$reportedPos=s4;s5=peg$c129();}s4=s5;if(s4===peg$FAILED){s4=peg$currPos;if(input.substr(peg$currPos,5)===peg$c130){s5=peg$c130;peg$currPos+=5;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c131);}}if(s5!==peg$FAILED){peg$reportedPos=s4;s5=peg$c132();}s4=s5;}}}}}}}if(s4!==peg$FAILED){s5=peg$parseWS();if(s5!==peg$FAILED){s6=peg$parseSum();if(s6!==peg$FAILED){s3=[s3,s4,s5,s6];s2=s3;}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}if(s2===peg$FAILED){s2=peg$c9;}if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c133(s1,s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseSum(){var s0,s1,s2,s3,s4,s5,s6,s7;s0=peg$currPos;s1=peg$parseProduct();if(s1!==peg$FAILED){s2=[];s3=peg$currPos;s4=peg$parseWS();if(s4!==peg$FAILED){s5=peg$currPos;if(input.charCodeAt(peg$currPos)===43){s6=peg$c134;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c135);}}if(s6!==peg$FAILED){peg$reportedPos=s5;s6=peg$c136();}s5=s6;if(s5===peg$FAILED){s5=peg$currPos;if(input.charCodeAt(peg$currPos)===45){s6=peg$c137;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c138);}}if(s6!==peg$FAILED){peg$reportedPos=s5;s6=peg$c139();}s5=s6;}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){s7=peg$parseProduct();if(s7!==peg$FAILED){peg$reportedPos=s3;s4=peg$c140(s5,s7);s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}while(s3!==peg$FAILED){s2.push(s3);s3=peg$currPos;s4=peg$parseWS();if(s4!==peg$FAILED){s5=peg$currPos;if(input.charCodeAt(peg$currPos)===43){s6=peg$c134;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c135);}}if(s6!==peg$FAILED){peg$reportedPos=s5;s6=peg$c136();}s5=s6;if(s5===peg$FAILED){s5=peg$currPos;if(input.charCodeAt(peg$currPos)===45){s6=peg$c137;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c138);}}if(s6!==peg$FAILED){peg$reportedPos=s5;s6=peg$c139();}s5=s6;}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){s7=peg$parseProduct();if(s7!==peg$FAILED){peg$reportedPos=s3;s4=peg$c140(s5,s7);s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c141(s1,s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseProduct(){var s0,s1,s2,s3,s4,s5,s6,s7;s0=peg$currPos;s1=peg$parseReduce();if(s1!==peg$FAILED){s2=[];s3=peg$currPos;s4=peg$parseWS();if(s4!==peg$FAILED){s5=peg$currPos;if(input.charCodeAt(peg$currPos)===42){s6=peg$c142;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c143);}}if(s6!==peg$FAILED){peg$reportedPos=s5;s6=peg$c144();}s5=s6;if(s5===peg$FAILED){s5=peg$currPos;if(input.charCodeAt(peg$currPos)===47){s6=peg$c145;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c146);}}if(s6!==peg$FAILED){peg$reportedPos=s5;s6=peg$c147();}s5=s6;if(s5===peg$FAILED){s5=peg$currPos;if(input.charCodeAt(peg$currPos)===37){s6=peg$c148;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c149);}}if(s6!==peg$FAILED){peg$reportedPos=s5;s6=peg$c150();}s5=s6;if(s5===peg$FAILED){s5=peg$currPos;if(input.charCodeAt(peg$currPos)===92){s6=peg$c151;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c152);}}if(s6!==peg$FAILED){peg$reportedPos=s5;s6=peg$c67();}s5=s6;}}}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){s7=peg$parseReduce();if(s7!==peg$FAILED){peg$reportedPos=s3;s4=peg$c153(s5,s7);s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}while(s3!==peg$FAILED){s2.push(s3);s3=peg$currPos;s4=peg$parseWS();if(s4!==peg$FAILED){s5=peg$currPos;if(input.charCodeAt(peg$currPos)===42){s6=peg$c142;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c143);}}if(s6!==peg$FAILED){peg$reportedPos=s5;s6=peg$c144();}s5=s6;if(s5===peg$FAILED){s5=peg$currPos;if(input.charCodeAt(peg$currPos)===47){s6=peg$c145;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c146);}}if(s6!==peg$FAILED){peg$reportedPos=s5;s6=peg$c147();}s5=s6;if(s5===peg$FAILED){s5=peg$currPos;if(input.charCodeAt(peg$currPos)===37){s6=peg$c148;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c149);}}if(s6!==peg$FAILED){peg$reportedPos=s5;s6=peg$c150();}s5=s6;if(s5===peg$FAILED){s5=peg$currPos;if(input.charCodeAt(peg$currPos)===92){s6=peg$c151;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c152);}}if(s6!==peg$FAILED){peg$reportedPos=s5;s6=peg$c67();}s5=s6;}}}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){s7=peg$parseReduce();if(s7!==peg$FAILED){peg$reportedPos=s3;s4=peg$c153(s5,s7);s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c154(s1,s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseReduce(){var s0,s1;s0=peg$currPos;s1=peg$parsePrefixOperation();if(s1!==peg$FAILED){peg$reportedPos=s0;s1=peg$c155(s1);}s0=s1;return s0;}function peg$parsePrefixOperation(){var s0,s1,s2,s3,s4,s5,s6;s0=peg$currPos;s1=peg$parseFactor();if(s1!==peg$FAILED){s2=peg$currPos;s3=peg$parseWS();if(s3!==peg$FAILED){if(input.substr(peg$currPos,2)===peg$c156){s4=peg$c156;peg$currPos+=2;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c157);}}if(s4!==peg$FAILED){s5=peg$parseWS();if(s5!==peg$FAILED){s6=peg$parsePrefixOperation();if(s6!==peg$FAILED){s3=[s3,s4,s5,s6];s2=s3;}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}if(s2===peg$FAILED){s2=peg$c9;}if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c158(s1,s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;if(input.substr(peg$currPos,2)===peg$c159){s1=peg$c159;peg$currPos+=2;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c160);}}if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){s3=peg$parsePrefixOperation();if(s3!==peg$FAILED){peg$reportedPos=s0;s1=peg$c161(s3);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;if(input.substr(peg$currPos,2)===peg$c162){s1=peg$c162;peg$currPos+=2;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c163);}}if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){s3=peg$parsePrefixOperation();if(s3!==peg$FAILED){peg$reportedPos=s0;s1=peg$c164(s3);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;if(input.charCodeAt(peg$currPos)===35){s1=peg$c165;peg$currPos++;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c166);}}if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){s3=peg$parsePrefixOperation();if(s3!==peg$FAILED){peg$reportedPos=s0;s1=peg$c167(s3);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;if(input.charCodeAt(peg$currPos)===45){s1=peg$c137;peg$currPos++;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c138);}}if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){s3=peg$parsePrefixOperation();if(s3!==peg$FAILED){peg$reportedPos=s0;s1=peg$c168(s3);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}}}}return s0;}function peg$parseFactor(){var s0,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11;s0=peg$currPos;if(input.charCodeAt(peg$currPos)===33){s1=peg$c169;peg$currPos++;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c170);}}if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){s3=peg$parseFactor();if(s3!==peg$FAILED){peg$reportedPos=s0;s1=peg$c171(s3);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;if(input.substr(peg$currPos,6)===peg$c172){s1=peg$c172;peg$currPos+=6;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c173);}}if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){if(input.charCodeAt(peg$currPos)===40){s3=peg$c17;peg$currPos++;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c18);}}if(s3!==peg$FAILED){s4=peg$parseWS();if(s4!==peg$FAILED){s5=peg$parseIteratorChain();if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){if(input.charCodeAt(peg$currPos)===124){s7=peg$c19;peg$currPos++;}else{s7=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c20);}}if(s7!==peg$FAILED){s8=peg$parseWS();if(s8!==peg$FAILED){s9=peg$parseExpression();if(s9!==peg$FAILED){s10=peg$parseWS();if(s10!==peg$FAILED){if(input.charCodeAt(peg$currPos)===41){s11=peg$c21;peg$currPos++;}else{s11=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c22);}}if(s11!==peg$FAILED){peg$reportedPos=s0;s1=peg$c174(s5,s9);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;if(input.substr(peg$currPos,6)===peg$c175){s1=peg$c175;peg$currPos+=6;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c176);}}if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){if(input.charCodeAt(peg$currPos)===40){s3=peg$c17;peg$currPos++;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c18);}}if(s3!==peg$FAILED){s4=peg$parseWS();if(s4!==peg$FAILED){s5=peg$parseIteratorChain();if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){if(input.charCodeAt(peg$currPos)===124){s7=peg$c19;peg$currPos++;}else{s7=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c20);}}if(s7!==peg$FAILED){s8=peg$parseWS();if(s8!==peg$FAILED){s9=peg$parseExpression();if(s9!==peg$FAILED){s10=peg$parseWS();if(s10!==peg$FAILED){if(input.charCodeAt(peg$currPos)===41){s11=peg$c21;peg$currPos++;}else{s11=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c22);}}if(s11!==peg$FAILED){peg$reportedPos=s0;s1=peg$c177(s5,s9);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;s1=peg$parseValue();if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){if(input.charCodeAt(peg$currPos)===33){s3=peg$c169;peg$currPos++;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c170);}}if(s3===peg$FAILED){s3=peg$c9;}if(s3!==peg$FAILED){peg$reportedPos=s0;s1=peg$c178(s1,s3);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;s1=peg$currPos;if(input.charCodeAt(peg$currPos)===40){s2=peg$c17;peg$currPos++;}else{s2=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c18);}}if(s2!==peg$FAILED){s3=peg$parseWS();if(s3!==peg$FAILED){s4=peg$parseExpression();if(s4!==peg$FAILED){s5=peg$parseWS();if(s5!==peg$FAILED){if(input.charCodeAt(peg$currPos)===41){s6=peg$c21;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c22);}}if(s6!==peg$FAILED){peg$reportedPos=s1;s2=peg$c179(s4);s1=s2;}else{peg$currPos=s1;s1=peg$c0;}}else{peg$currPos=s1;s1=peg$c0;}}else{peg$currPos=s1;s1=peg$c0;}}else{peg$currPos=s1;s1=peg$c0;}}else{peg$currPos=s1;s1=peg$c0;}if(s1===peg$FAILED){s1=peg$currPos;s2=peg$parseProcedure();if(s2!==peg$FAILED){peg$reportedPos=s1;s2=peg$c180(s2);}s1=s2;if(s1===peg$FAILED){s1=peg$currPos;s2=peg$parseVariable();if(s2!==peg$FAILED){peg$reportedPos=s1;s2=peg$c181(s2);}s1=s2;}}if(s1!==peg$FAILED){s2=[];s3=peg$parseCall();while(s3!==peg$FAILED){s2.push(s3);s3=peg$parseCall();}if(s2!==peg$FAILED){if(input.charCodeAt(peg$currPos)===33){s3=peg$c169;peg$currPos++;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c170);}}if(s3===peg$FAILED){s3=peg$c9;}if(s3!==peg$FAILED){peg$reportedPos=s0;s1=peg$c182(s1,s2,s3);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}}}}return s0;}function peg$parseProcedure(){var s0,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11;s0=peg$currPos;if(input.substr(peg$currPos,9)===peg$c183){s1=peg$c183;peg$currPos+=9;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c184);}}if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){if(input.charCodeAt(peg$currPos)===40){s3=peg$c17;peg$currPos++;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c18);}}if(s3!==peg$FAILED){s4=peg$parseWS();if(s4!==peg$FAILED){s5=peg$parseProcedureParameters();if(s5===peg$FAILED){s5=peg$c9;}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){if(input.charCodeAt(peg$currPos)===41){s7=peg$c21;peg$currPos++;}else{s7=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c22);}}if(s7!==peg$FAILED){s8=peg$parseWS();if(s8!==peg$FAILED){if(input.charCodeAt(peg$currPos)===123){s9=peg$c23;peg$currPos++;}else{s9=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c24);}}if(s9!==peg$FAILED){s10=peg$parseBlock();if(s10!==peg$FAILED){if(input.charCodeAt(peg$currPos)===125){s11=peg$c25;peg$currPos++;}else{s11=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c26);}}if(s11!==peg$FAILED){peg$reportedPos=s0;s1=peg$c185(s5,s10);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;if(input.substr(peg$currPos,7)===peg$c186){s1=peg$c186;peg$currPos+=7;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c187);}}if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){if(input.charCodeAt(peg$currPos)===40){s3=peg$c17;peg$currPos++;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c18);}}if(s3!==peg$FAILED){s4=peg$parseWS();if(s4!==peg$FAILED){s5=peg$parseProcedureParameters();if(s5===peg$FAILED){s5=peg$c9;}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){if(input.charCodeAt(peg$currPos)===41){s7=peg$c21;peg$currPos++;}else{s7=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c22);}}if(s7!==peg$FAILED){s8=peg$parseWS();if(s8!==peg$FAILED){if(input.charCodeAt(peg$currPos)===123){s9=peg$c23;peg$currPos++;}else{s9=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c24);}}if(s9!==peg$FAILED){s10=peg$parseBlock();if(s10!==peg$FAILED){if(input.charCodeAt(peg$currPos)===125){s11=peg$c25;peg$currPos++;}else{s11=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c26);}}if(s11!==peg$FAILED){peg$reportedPos=s0;s1=peg$c188(s5,s10);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}return s0;}function peg$parseProcedureParameters(){var s0,s1,s2,s3,s4,s5,s6,s7;s0=peg$currPos;s1=peg$parseVariable();if(s1!==peg$FAILED){s2=[];s3=peg$currPos;s4=peg$parseWS();if(s4!==peg$FAILED){if(input.charCodeAt(peg$currPos)===44){s5=peg$c78;peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c79);}}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){s7=peg$parseVariable();if(s7!==peg$FAILED){s4=[s4,s5,s6,s7];s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}while(s3!==peg$FAILED){s2.push(s3);s3=peg$currPos;s4=peg$parseWS();if(s4!==peg$FAILED){if(input.charCodeAt(peg$currPos)===44){s5=peg$c78;peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c79);}}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){s7=peg$parseVariable();if(s7!==peg$FAILED){s4=[s4,s5,s6,s7];s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c97(s1,s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseCall(){var s0,s1,s2,s3,s4,s5;s0=peg$currPos;if(input.charCodeAt(peg$currPos)===40){s1=peg$c17;peg$currPos++;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c18);}}if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){s3=peg$parseCallParameters();if(s3!==peg$FAILED){s4=peg$parseWS();if(s4!==peg$FAILED){if(input.charCodeAt(peg$currPos)===41){s5=peg$c21;peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c22);}}if(s5!==peg$FAILED){peg$reportedPos=s0;s1=peg$c189(s3);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;if(input.charCodeAt(peg$currPos)===91){s1=peg$c72;peg$currPos++;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c73);}}if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){s3=peg$parseCollectionAccessParams();if(s3!==peg$FAILED){s4=peg$parseWS();if(s4!==peg$FAILED){if(input.charCodeAt(peg$currPos)===93){s5=peg$c74;peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c75);}}if(s5!==peg$FAILED){peg$reportedPos=s0;s1=peg$c190(s3);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}return s0;}function peg$parseCallParameters(){var s0,s1;s0=peg$currPos;s1=peg$parseExprList();if(s1===peg$FAILED){s1=peg$c9;}if(s1!==peg$FAILED){peg$reportedPos=s0;s1=peg$c191(s1);}s0=s1;return s0;}function peg$parseCollectionAccessParams(){var s0,s1,s2,s3,s4,s5,s6,s7,s8;s0=peg$currPos;s1=peg$parseExpression();if(s1!==peg$FAILED){s2=peg$currPos;s3=[];s4=peg$currPos;s5=peg$parseWS();if(s5!==peg$FAILED){if(input.charCodeAt(peg$currPos)===44){s6=peg$c78;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c79);}}if(s6!==peg$FAILED){s7=peg$parseWS();if(s7!==peg$FAILED){s8=peg$parseExpression();if(s8!==peg$FAILED){peg$reportedPos=s4;s5=peg$c192(s8);s4=s5;}else{peg$currPos=s4;s4=peg$c0;}}else{peg$currPos=s4;s4=peg$c0;}}else{peg$currPos=s4;s4=peg$c0;}}else{peg$currPos=s4;s4=peg$c0;}if(s4!==peg$FAILED){while(s4!==peg$FAILED){s3.push(s4);s4=peg$currPos;s5=peg$parseWS();if(s5!==peg$FAILED){if(input.charCodeAt(peg$currPos)===44){s6=peg$c78;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c79);}}if(s6!==peg$FAILED){s7=peg$parseWS();if(s7!==peg$FAILED){s8=peg$parseExpression();if(s8!==peg$FAILED){peg$reportedPos=s4;s5=peg$c192(s8);s4=s5;}else{peg$currPos=s4;s4=peg$c0;}}else{peg$currPos=s4;s4=peg$c0;}}else{peg$currPos=s4;s4=peg$c0;}}else{peg$currPos=s4;s4=peg$c0;}}}else{s3=peg$c0;}if(s3!==peg$FAILED){peg$reportedPos=s2;s3=peg$c193(s3);}s2=s3;if(s2===peg$FAILED){s2=peg$currPos;s3=peg$parseWS();if(s3!==peg$FAILED){s4=peg$parseRANGE_SIGN();if(s4!==peg$FAILED){s5=peg$parseWS();if(s5!==peg$FAILED){s6=peg$parseExpression();if(s6===peg$FAILED){s6=peg$c9;}if(s6!==peg$FAILED){peg$reportedPos=s2;s3=peg$c194(s6);s2=s3;}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}if(s2===peg$FAILED){s2=peg$c9;}if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c195(s1,s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;s1=peg$parseExpression();if(s1!==peg$FAILED){peg$reportedPos=s0;s1=peg$c196(s1);}s0=s1;if(s0===peg$FAILED){s0=peg$currPos;s1=peg$parseExpression();if(s1!==peg$FAILED){peg$reportedPos=s0;s1=peg$c197(s1);}s0=s1;if(s0===peg$FAILED){s0=peg$currPos;s1=peg$parseRANGE_SIGN();if(s1!==peg$FAILED){s2=peg$parseExpression();if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c198(s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}}}return s0;}function peg$parseExprList(){var s0,s1,s2,s3,s4,s5,s6,s7;s0=peg$currPos;s1=peg$parseExpression();if(s1!==peg$FAILED){s2=[];s3=peg$currPos;s4=peg$parseWS();if(s4!==peg$FAILED){if(input.charCodeAt(peg$currPos)===44){s5=peg$c78;peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c79);}}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){s7=peg$parseExpression();if(s7!==peg$FAILED){s4=[s4,s5,s6,s7];s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}while(s3!==peg$FAILED){s2.push(s3);s3=peg$currPos;s4=peg$parseWS();if(s4!==peg$FAILED){if(input.charCodeAt(peg$currPos)===44){s5=peg$c78;peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c79);}}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){s7=peg$parseExpression();if(s7!==peg$FAILED){s4=[s4,s5,s6,s7];s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c199(s1,s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseValue(){var s0,s1,s2,s3,s4,s5;s0=peg$currPos;if(input.charCodeAt(peg$currPos)===91){s1=peg$c72;peg$currPos++;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c73);}}if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){s3=peg$parseCollectionBuilder();if(s3===peg$FAILED){s3=peg$c9;}if(s3!==peg$FAILED){s4=peg$parseWS();if(s4!==peg$FAILED){if(input.charCodeAt(peg$currPos)===93){s5=peg$c74;peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c75);}}if(s5!==peg$FAILED){peg$reportedPos=s0;s1=peg$c200(s3);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;if(input.charCodeAt(peg$currPos)===123){s1=peg$c23;peg$currPos++;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c24);}}if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){s3=peg$parseCollectionBuilder();if(s3===peg$FAILED){s3=peg$c9;}if(s3!==peg$FAILED){s4=peg$parseWS();if(s4!==peg$FAILED){if(input.charCodeAt(peg$currPos)===125){s5=peg$c25;peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c26);}}if(s5!==peg$FAILED){peg$reportedPos=s0;s1=peg$c201(s3);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}if(s0===peg$FAILED){s0=peg$currPos;s1=peg$parseSTRING();if(s1===peg$FAILED){s1=peg$parseDOUBLE();if(s1===peg$FAILED){s1=peg$parseNUMBER();if(s1===peg$FAILED){s1=peg$parseBOOLEAN();}}}if(s1!==peg$FAILED){peg$reportedPos=s0;s1=peg$c202(s1);}s0=s1;}}return s0;}function peg$parseCollectionBuilder(){var s0,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11;s0=peg$currPos;s1=peg$parseExpression();if(s1!==peg$FAILED){s2=peg$currPos;s3=[];s4=peg$currPos;s5=peg$parseWS();if(s5!==peg$FAILED){if(input.charCodeAt(peg$currPos)===44){s6=peg$c78;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c79);}}if(s6!==peg$FAILED){s7=peg$parseWS();if(s7!==peg$FAILED){s8=peg$parseExpression();if(s8!==peg$FAILED){s5=[s5,s6,s7,s8];s4=s5;}else{peg$currPos=s4;s4=peg$c0;}}else{peg$currPos=s4;s4=peg$c0;}}else{peg$currPos=s4;s4=peg$c0;}}else{peg$currPos=s4;s4=peg$c0;}if(s4!==peg$FAILED){while(s4!==peg$FAILED){s3.push(s4);s4=peg$currPos;s5=peg$parseWS();if(s5!==peg$FAILED){if(input.charCodeAt(peg$currPos)===44){s6=peg$c78;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c79);}}if(s6!==peg$FAILED){s7=peg$parseWS();if(s7!==peg$FAILED){s8=peg$parseExpression();if(s8!==peg$FAILED){s5=[s5,s6,s7,s8];s4=s5;}else{peg$currPos=s4;s4=peg$c0;}}else{peg$currPos=s4;s4=peg$c0;}}else{peg$currPos=s4;s4=peg$c0;}}else{peg$currPos=s4;s4=peg$c0;}}}else{s3=peg$c0;}if(s3!==peg$FAILED){peg$reportedPos=s2;s3=peg$c203(s3);}s2=s3;if(s2===peg$FAILED){s2=peg$currPos;s3=peg$parseWS();if(s3!==peg$FAILED){s4=peg$parseRANGE_SIGN();if(s4!==peg$FAILED){s5=peg$parseWS();if(s5!==peg$FAILED){s6=peg$parseExpression();if(s6!==peg$FAILED){peg$reportedPos=s2;s3=peg$c194(s6);s2=s3;}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}if(s2===peg$FAILED){s2=peg$currPos;s3=peg$parseWS();if(s3!==peg$FAILED){if(input.charCodeAt(peg$currPos)===58){s4=peg$c35;peg$currPos++;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c36);}}if(s4!==peg$FAILED){s5=peg$parseWS();if(s5!==peg$FAILED){s6=peg$parseIteratorChain();if(s6!==peg$FAILED){s7=peg$currPos;s8=peg$parseWS();if(s8!==peg$FAILED){if(input.charCodeAt(peg$currPos)===124){s9=peg$c19;peg$currPos++;}else{s9=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c20);}}if(s9!==peg$FAILED){s10=peg$parseWS();if(s10!==peg$FAILED){s11=peg$parseExpression();if(s11!==peg$FAILED){s8=[s8,s9,s10,s11];s7=s8;}else{peg$currPos=s7;s7=peg$c0;}}else{peg$currPos=s7;s7=peg$c0;}}else{peg$currPos=s7;s7=peg$c0;}}else{peg$currPos=s7;s7=peg$c0;}if(s7===peg$FAILED){s7=peg$c9;}if(s7!==peg$FAILED){peg$reportedPos=s2;s3=peg$c204(s6,s7);s2=s3;}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}else{peg$currPos=s2;s2=peg$c0;}}}if(s2===peg$FAILED){s2=peg$c9;}if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c205(s1,s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseIteratorChain(){var s0,s1,s2,s3,s4,s5,s6,s7;s0=peg$currPos;s1=peg$parseIterator();if(s1!==peg$FAILED){s2=[];s3=peg$currPos;s4=peg$parseWS();if(s4!==peg$FAILED){if(input.charCodeAt(peg$currPos)===44){s5=peg$c78;peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c79);}}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){s7=peg$parseIterator();if(s7!==peg$FAILED){s4=[s4,s5,s6,s7];s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}while(s3!==peg$FAILED){s2.push(s3);s3=peg$currPos;s4=peg$parseWS();if(s4!==peg$FAILED){if(input.charCodeAt(peg$currPos)===44){s5=peg$c78;peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c79);}}if(s5!==peg$FAILED){s6=peg$parseWS();if(s6!==peg$FAILED){s7=peg$parseIterator();if(s7!==peg$FAILED){s4=[s4,s5,s6,s7];s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c206(s1,s2);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseIterator(){var s0,s1,s2,s3,s4,s5;s0=peg$currPos;s1=peg$parseAssignable();if(s1!==peg$FAILED){s2=peg$parseWS();if(s2!==peg$FAILED){if(input.substr(peg$currPos,2)===peg$c127){s3=peg$c127;peg$currPos+=2;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c128);}}if(s3!==peg$FAILED){s4=peg$parseWS();if(s4!==peg$FAILED){s5=peg$parseExpression();if(s5!==peg$FAILED){peg$reportedPos=s0;s1=peg$c207(s1,s5);s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseBOOLEAN(){var s0,s1;peg$silentFails++;s0=peg$currPos;if(input.substr(peg$currPos,4)===peg$c209){s1=peg$c209;peg$currPos+=4;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c210);}}if(s1===peg$FAILED){if(input.substr(peg$currPos,5)===peg$c211){s1=peg$c211;peg$currPos+=5;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c212);}}}if(s1!==peg$FAILED){peg$reportedPos=s0;s1=peg$c213();}s0=s1;peg$silentFails--;if(s0===peg$FAILED){s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c208);}}return s0;}function peg$parseID(){var s0,s1,s2,s3;peg$silentFails++;s0=peg$currPos;if(peg$c215.test(input.charAt(peg$currPos))){s1=input.charAt(peg$currPos);peg$currPos++;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c216);}}if(s1!==peg$FAILED){s2=[];if(peg$c217.test(input.charAt(peg$currPos))){s3=input.charAt(peg$currPos);peg$currPos++;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c218);}}while(s3!==peg$FAILED){s2.push(s3);if(peg$c217.test(input.charAt(peg$currPos))){s3=input.charAt(peg$currPos);peg$currPos++;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c218);}}}if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c219();s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}peg$silentFails--;if(s0===peg$FAILED){s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c214);}}return s0;}function peg$parseNUMBER(){var s0,s1,s2,s3;peg$silentFails++;s0=peg$currPos;if(input.charCodeAt(peg$currPos)===48){s1=peg$c221;peg$currPos++;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c222);}}if(s1!==peg$FAILED){peg$reportedPos=s0;s1=peg$c223();}s0=s1;if(s0===peg$FAILED){s0=peg$currPos;if(peg$c224.test(input.charAt(peg$currPos))){s1=input.charAt(peg$currPos);peg$currPos++;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c225);}}if(s1!==peg$FAILED){s2=[];if(peg$c226.test(input.charAt(peg$currPos))){s3=input.charAt(peg$currPos);peg$currPos++;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c227);}}while(s3!==peg$FAILED){s2.push(s3);if(peg$c226.test(input.charAt(peg$currPos))){s3=input.charAt(peg$currPos);peg$currPos++;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c227);}}}if(s2!==peg$FAILED){peg$reportedPos=s0;s1=peg$c228();s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}peg$silentFails--;if(s0===peg$FAILED){s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c220);}}return s0;}function peg$parseDOUBLE(){var s0,s1,s2,s3,s4,s5,s6,s7,s8;peg$silentFails++;s0=peg$currPos;s1=peg$parseNUMBER();if(s1===peg$FAILED){s1=peg$c9;}if(s1!==peg$FAILED){if(input.charCodeAt(peg$currPos)===46){s2=peg$c230;peg$currPos++;}else{s2=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c231);}}if(s2!==peg$FAILED){s3=[];if(peg$c226.test(input.charAt(peg$currPos))){s4=input.charAt(peg$currPos);peg$currPos++;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c227);}}if(s4!==peg$FAILED){while(s4!==peg$FAILED){s3.push(s4);if(peg$c226.test(input.charAt(peg$currPos))){s4=input.charAt(peg$currPos);peg$currPos++;}else{s4=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c227);}}}}else{s3=peg$c0;}if(s3!==peg$FAILED){s4=peg$currPos;if(peg$c232.test(input.charAt(peg$currPos))){s5=input.charAt(peg$currPos);peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c233);}}if(s5!==peg$FAILED){if(input.charCodeAt(peg$currPos)===43){s6=peg$c134;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c135);}}if(s6===peg$FAILED){if(input.charCodeAt(peg$currPos)===45){s6=peg$c137;peg$currPos++;}else{s6=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c138);}}}if(s6===peg$FAILED){s6=peg$c9;}if(s6!==peg$FAILED){s7=[];if(peg$c226.test(input.charAt(peg$currPos))){s8=input.charAt(peg$currPos);peg$currPos++;}else{s8=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c227);}}if(s8!==peg$FAILED){while(s8!==peg$FAILED){s7.push(s8);if(peg$c226.test(input.charAt(peg$currPos))){s8=input.charAt(peg$currPos);peg$currPos++;}else{s8=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c227);}}}}else{s7=peg$c0;}if(s7!==peg$FAILED){s5=[s5,s6,s7];s4=s5;}else{peg$currPos=s4;s4=peg$c0;}}else{peg$currPos=s4;s4=peg$c0;}}else{peg$currPos=s4;s4=peg$c0;}if(s4===peg$FAILED){s4=peg$c9;}if(s4!==peg$FAILED){peg$reportedPos=s0;s1=peg$c234();s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}peg$silentFails--;if(s0===peg$FAILED){s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c229);}}return s0;}function peg$parseRANGE_SIGN(){var s0,s1;peg$silentFails++;if(input.substr(peg$currPos,2)===peg$c236){s0=peg$c236;peg$currPos+=2;}else{s0=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c237);}}peg$silentFails--;if(s0===peg$FAILED){s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c235);}}return s0;}function peg$parseSTRING(){var s0,s1,s2,s3;peg$silentFails++;s0=peg$currPos;if(input.charCodeAt(peg$currPos)===34){s1=peg$c239;peg$currPos++;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c240);}}if(s1!==peg$FAILED){s2=[];if(input.substr(peg$currPos,2)===peg$c241){s3=peg$c241;peg$currPos+=2;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c242);}}if(s3===peg$FAILED){if(peg$c243.test(input.charAt(peg$currPos))){s3=input.charAt(peg$currPos);peg$currPos++;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c244);}}}while(s3!==peg$FAILED){s2.push(s3);if(input.substr(peg$currPos,2)===peg$c241){s3=peg$c241;peg$currPos+=2;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c242);}}if(s3===peg$FAILED){if(peg$c243.test(input.charAt(peg$currPos))){s3=input.charAt(peg$currPos);peg$currPos++;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c244);}}}}if(s2!==peg$FAILED){if(input.charCodeAt(peg$currPos)===34){s3=peg$c239;peg$currPos++;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c240);}}if(s3!==peg$FAILED){peg$reportedPos=s0;s1=peg$c245();s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}peg$silentFails--;if(s0===peg$FAILED){s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c238);}}return s0;}function peg$parseLINE_TERMINATOR(){var s0;if(input.charCodeAt(peg$currPos)===10){s0=peg$c246;peg$currPos++;}else{s0=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c247);}}if(s0===peg$FAILED){if(input.substr(peg$currPos,2)===peg$c248){s0=peg$c248;peg$currPos+=2;}else{s0=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c249);}}if(s0===peg$FAILED){if(input.charCodeAt(peg$currPos)===13){s0=peg$c250;peg$currPos++;}else{s0=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c251);}}}}return s0;}function peg$parseSINGLE_LINE_COMMENT(){var s0,s1,s2,s3,s4,s5;s0=peg$currPos;if(input.substr(peg$currPos,2)===peg$c252){s1=peg$c252;peg$currPos+=2;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c253);}}if(s1!==peg$FAILED){s2=[];s3=peg$currPos;s4=peg$currPos;peg$silentFails++;s5=peg$parseLINE_TERMINATOR();peg$silentFails--;if(s5===peg$FAILED){s4=peg$c254;}else{peg$currPos=s4;s4=peg$c0;}if(s4!==peg$FAILED){if(input.length>peg$currPos){s5=input.charAt(peg$currPos);peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c255);}}if(s5!==peg$FAILED){s4=[s4,s5];s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}while(s3!==peg$FAILED){s2.push(s3);s3=peg$currPos;s4=peg$currPos;peg$silentFails++;s5=peg$parseLINE_TERMINATOR();peg$silentFails--;if(s5===peg$FAILED){s4=peg$c254;}else{peg$currPos=s4;s4=peg$c0;}if(s4!==peg$FAILED){if(input.length>peg$currPos){s5=input.charAt(peg$currPos);peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c255);}}if(s5!==peg$FAILED){s4=[s4,s5];s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}if(s2!==peg$FAILED){s3=peg$parseLINE_TERMINATOR();if(s3!==peg$FAILED){s1=[s1,s2,s3];s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseMULTI_LINE_COMMENT(){var s0,s1,s2,s3,s4,s5;s0=peg$currPos;if(input.substr(peg$currPos,2)===peg$c256){s1=peg$c256;peg$currPos+=2;}else{s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c257);}}if(s1!==peg$FAILED){s2=[];s3=peg$currPos;s4=peg$currPos;peg$silentFails++;if(input.substr(peg$currPos,2)===peg$c162){s5=peg$c162;peg$currPos+=2;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c163);}}peg$silentFails--;if(s5===peg$FAILED){s4=peg$c254;}else{peg$currPos=s4;s4=peg$c0;}if(s4!==peg$FAILED){if(input.length>peg$currPos){s5=input.charAt(peg$currPos);peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c255);}}if(s5!==peg$FAILED){s4=[s4,s5];s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}while(s3!==peg$FAILED){s2.push(s3);s3=peg$currPos;s4=peg$currPos;peg$silentFails++;if(input.substr(peg$currPos,2)===peg$c162){s5=peg$c162;peg$currPos+=2;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c163);}}peg$silentFails--;if(s5===peg$FAILED){s4=peg$c254;}else{peg$currPos=s4;s4=peg$c0;}if(s4!==peg$FAILED){if(input.length>peg$currPos){s5=input.charAt(peg$currPos);peg$currPos++;}else{s5=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c255);}}if(s5!==peg$FAILED){s4=[s4,s5];s3=s4;}else{peg$currPos=s3;s3=peg$c0;}}else{peg$currPos=s3;s3=peg$c0;}}if(s2!==peg$FAILED){if(input.substr(peg$currPos,2)===peg$c162){s3=peg$c162;peg$currPos+=2;}else{s3=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c163);}}if(s3!==peg$FAILED){s1=[s1,s2,s3];s0=s1;}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}}else{peg$currPos=s0;s0=peg$c0;}return s0;}function peg$parseWS(){var s0,s1,s2;peg$silentFails++;s0=peg$currPos;s1=[];s2=peg$parseSINGLE_LINE_COMMENT();if(s2===peg$FAILED){s2=peg$parseMULTI_LINE_COMMENT();if(s2===peg$FAILED){if(peg$c259.test(input.charAt(peg$currPos))){s2=input.charAt(peg$currPos);peg$currPos++;}else{s2=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c260);}}}}while(s2!==peg$FAILED){s1.push(s2);s2=peg$parseSINGLE_LINE_COMMENT();if(s2===peg$FAILED){s2=peg$parseMULTI_LINE_COMMENT();if(s2===peg$FAILED){if(peg$c259.test(input.charAt(peg$currPos))){s2=input.charAt(peg$currPos);peg$currPos++;}else{s2=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c260);}}}}}if(s1!==peg$FAILED){peg$reportedPos=s0;s1=peg$c261();}s0=s1;peg$silentFails--;if(s0===peg$FAILED){s1=peg$FAILED;if(peg$silentFails===0){peg$fail(peg$c258);}}return s0;}var AssignableList=__webpack_require__(5);var Assignment=__webpack_require__(8);var Block=__webpack_require__(9);var Break=__webpack_require__(11);var Call=__webpack_require__(12);var CaseStmt=__webpack_require__(13);var Comparison=__webpack_require__(14);var Conjunction=__webpack_require__(15);var CollectionAccess=__webpack_require__(16);var Disjunction=__webpack_require__(17);var Exists=__webpack_require__(18);var Exponential=__webpack_require__(19);var Forall=__webpack_require__(20);var ForLoop=__webpack_require__(21);var FunctionCall=__webpack_require__(22);var Generator=__webpack_require__(23);var Identifier=__webpack_require__(24);var IfStmt=__webpack_require__(25);var InitBlock=__webpack_require__(26);var Iterator=__webpack_require__(27);var List=__webpack_require__(28);var PrefixOperation=__webpack_require__(29);var Primitive=__webpack_require__(30);var Procedure=__webpack_require__(31);var Product=__webpack_require__(32);var Range=__webpack_require__(33);var Return=__webpack_require__(34);var SetlSet=__webpack_require__(35);var Statement=__webpack_require__(36);var SwitchStmt=__webpack_require__(37);var Sum=__webpack_require__(38);var WhileLoop=__webpack_require__(39);var types=__webpack_require__(40);var ops=__webpack_require__(41);function makeList(first,second){var ret=[];if(second){ret=second.map(function(el){return el[3];});}ret.unshift(first);return ret;}function reduceApply(p,n){return n(p);}peg$result=peg$startRuleFunction();if(peg$result!==peg$FAILED&&peg$currPos===input.length){return peg$result;}else{if(peg$result!==peg$FAILED&&peg$currPos<input.length){peg$fail({type:"end",description:"end of input"});}throw peg$buildException(null,peg$maxFailExpected,peg$maxFailPos);}}return{SyntaxError:SyntaxError,parse:parse};}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var _errorsUnsupportedError = __webpack_require__(7);

	var AssignableList = function () {
	  function AssignableList(assignables) {
	    _classCallCheck(this, AssignableList);

	    this.token = _constantsTokens.ASSIGNABLE_LIST;
	    this.assignables = assignables;
	  }

	  _createClass(AssignableList, [{
	    key: 'toString',
	    value: function toString() {
	      return 'AssignableList( ' + this.assignables.join(', ') + ')';
	    }
	  }]);

	  return AssignableList;
	}();

	function creator(assignables) {
	  if (!assignables.every(function (assignable) {
	    return assignable.token === _constantsTokens.IDENTIFIER;
	  })) {
	    throw new _errorsUnsupportedError.UnsupportedError('Nested list assignments');
	  }
	  return new AssignableList(assignables);
	}

	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var ASSIGNABLE_LIST = 'ASSIGNABLE_LIST';
	exports.ASSIGNABLE_LIST = ASSIGNABLE_LIST;
	var ASSIGNMENT = 'ASSIGNMENT';
	exports.ASSIGNMENT = ASSIGNMENT;
	var BLOCK = 'BLOCK';
	exports.BLOCK = BLOCK;
	var BREAK_STMT = 'BREAK_STMT';
	exports.BREAK_STMT = BREAK_STMT;
	var CALL = 'CALL';
	exports.CALL = CALL;
	var COLLECTION_ACCESS = 'COLLECTION_ACCESS';
	exports.COLLECTION_ACCESS = COLLECTION_ACCESS;
	var COMPARISON = 'COMPARISON';
	exports.COMPARISON = COMPARISON;
	var CONJUNCTION = 'CONJUNCTION';
	exports.CONJUNCTION = CONJUNCTION;
	var DISJUNCTION = 'DISJUNCTION';
	exports.DISJUNCTION = DISJUNCTION;
	var EXISTS = 'EXISTS';
	exports.EXISTS = EXISTS;
	var EXPONENTIAL = 'EXPONENTIAL';
	exports.EXPONENTIAL = EXPONENTIAL;
	var FORALL = 'FORALL';
	exports.FORALL = FORALL;
	var FOR_LOOP = 'FOR_LOOP';
	exports.FOR_LOOP = FOR_LOOP;
	var FUNCTION_CALL = 'FUNCTION_CALL';
	exports.FUNCTION_CALL = FUNCTION_CALL;
	var GENERATOR = 'GENERATOR';
	exports.GENERATOR = GENERATOR;
	var IDENTIFIER = 'IDENTIFIER';
	exports.IDENTIFIER = IDENTIFIER;
	var IF_STMT = 'IF_STMT';
	exports.IF_STMT = IF_STMT;
	var INIT_BLOCK = 'INIT_BLOCK';
	exports.INIT_BLOCK = INIT_BLOCK;
	var ITERATOR = 'ITERATOR';
	exports.ITERATOR = ITERATOR;
	var LIST = 'LIST';
	exports.LIST = LIST;
	var PRIMITIVE = 'PRIMITIVE';
	exports.PRIMITIVE = PRIMITIVE;
	var PREFIX_OPERATION = 'PREFIX_OPERATION';
	exports.PREFIX_OPERATION = PREFIX_OPERATION;
	var PROCEDURE = 'PROCEDURE';
	exports.PROCEDURE = PROCEDURE;
	var PRODUCT = 'PRODUCT';
	exports.PRODUCT = PRODUCT;
	var RANGE = 'RANGE';
	exports.RANGE = RANGE;
	var RETURN = 'RETURN';
	exports.RETURN = RETURN;
	var SET = 'SET';
	exports.SET = SET;
	var STATEMENT = 'STATEMENT';
	exports.STATEMENT = STATEMENT;
	var SUM = 'SUM';
	exports.SUM = SUM;
	var WHILE_LOOP = 'WHILE_LOOP';
	exports.WHILE_LOOP = WHILE_LOOP;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(_x2, _x3, _x4) {
	  var _again = true;_function: while (_again) {
	    var object = _x2,
	        property = _x3,
	        receiver = _x4;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x2 = parent;_x3 = property;_x4 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var UnsupportedError = function (_Error) {
	  _inherits(UnsupportedError, _Error);

	  function UnsupportedError(feature) {
	    var location = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	    _classCallCheck(this, UnsupportedError);

	    _get(Object.getPrototypeOf(UnsupportedError.prototype), 'constructor', this).call(this, feature + ' is not supported by Setlx.js');

	    this.feature = feature;
	    this.location = location;
	  }

	  _createClass(UnsupportedError, [{
	    key: 'message',
	    get: function get() {
	      if (this.location) {
	        return this.feature + ' in line ' + this.location.line + ':' + this.location.column + ' is not supported by Setlx.js';
	      }
	      return this.feature + ' is not supported by Setlx.js';
	    }
	  }]);

	  return UnsupportedError;
	}(Error);

	exports['default'] = UnsupportedError;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var Assignment = function () {
	  function Assignment(receiver, expression) {
	    _classCallCheck(this, Assignment);

	    this.token = _constantsTokens.ASSIGNMENT;
	    this.receiver = receiver;
	    this.expression = expression;
	  }

	  _createClass(Assignment, [{
	    key: 'toString',
	    value: function toString() {
	      return 'Assignment( ' + this.receiver + ', ' + this.expression + ' )';
	    }
	  }]);

	  return Assignment;
	}();

	function creator(receiver, expression) {
	  return new Assignment(receiver, expression);
	}

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var _utilIndent = __webpack_require__(10);

	var _utilIndent2 = _interopRequireDefault(_utilIndent);

	var Block = function () {
	  function Block(statements) {
	    _classCallCheck(this, Block);

	    this.token = _constantsTokens.BLOCK;
	    this.statements = statements;
	  }

	  _createClass(Block, [{
	    key: 'toString',
	    value: function toString() {
	      return 'Block(\n' + (0, _utilIndent2['default'])(2, this.statements.join(',\n')) + '\n)';
	    }
	  }]);

	  return Block;
	}();

	function creator(statements) {
	  return new Block(statements);
	}

	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = indent;
	var mapper = function mapper(ind) {
	  return function (line) {
	    if (line === '') {
	      return '';
	    }
	    return ind + line;
	  };
	};

	function indent(amount, string) {
	  if (!amount) {
	    return string;
	  }

	  var ind = ' ';
	  for (var index = 1; index < amount; index++) {
	    ind += ' ';
	  }

	  return string.split('\n').map(mapper(ind)).join('\n');
	}

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var Break = function () {
	  function Break() {
	    _classCallCheck(this, Break);

	    this.token = _constantsTokens.BREAK_STMT;
	  }

	  _createClass(Break, [{
	    key: 'toString',
	    value: function toString() {
	      return 'Break()';
	    }
	  }]);

	  return Break;
	}();

	function creator() {
	  return new Break();
	}

	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var _utilIndent = __webpack_require__(10);

	var _utilIndent2 = _interopRequireDefault(_utilIndent);

	var Call = function () {
	  function Call(receiver, call) {
	    _classCallCheck(this, Call);

	    this.token = _constantsTokens.CALL;
	    this.receiver = receiver;
	    this.call = call;
	  }

	  _createClass(Call, [{
	    key: 'toString',
	    value: function toString() {
	      var params = (0, _utilIndent2['default'])(2, this.receiver + ',\n ' + this.call);
	      return 'Call(\n' + params + '\n)';
	    }
	  }]);

	  return Call;
	}();

	function creator(receiver, call) {
	  return new Call(receiver, call);
	}

	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var _utilIndent = __webpack_require__(10);

	var _utilIndent2 = _interopRequireDefault(_utilIndent);

	var CaseStmt = function () {
	  function CaseStmt(expression, blk) {
	    _classCallCheck(this, CaseStmt);

	    this.token = _constantsTokens.CASE_STMT;
	    this.block = blk;
	    this.expression = expression;
	  }

	  _createClass(CaseStmt, [{
	    key: 'toString',
	    value: function toString() {
	      var params = (0, _utilIndent2['default'])(2, this.expression + ',\n ' + this.block);
	      return 'CaseStmt(\n' + params + '\n)';
	    }
	  }]);

	  return CaseStmt;
	}();

	function creator(expression, blk) {
	  return new CaseStmt(expression, blk);
	}

	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var Comparison = function () {
	  function Comparison(op, lefthand, righthand) {
	    _classCallCheck(this, Comparison);

	    this.token = _constantsTokens.COMPARISON;
	    this.operator = op;
	    this.lefthand = lefthand;
	    this.righthand = righthand;
	  }

	  _createClass(Comparison, [{
	    key: 'toString',
	    value: function toString() {
	      return 'Comparison( ' + this.operator + ', ' + this.lefthand + ', ' + this.righthand + ' )';
	    }
	  }]);

	  return Comparison;
	}();

	function creator(op, lefthand, righthand) {
	  return new Comparison(op, lefthand, righthand);
	}

	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var Conjunction = function () {
	  function Conjunction(lefthand, righthand) {
	    _classCallCheck(this, Conjunction);

	    this.token = _constantsTokens.CONJUNCTION;
	    this.lefthand = lefthand;
	    this.righthand = righthand;
	  }

	  _createClass(Conjunction, [{
	    key: 'toString',
	    value: function toString() {
	      return 'Conjunction( ' + this.lefthand + ', ' + this.righthand + ' )';
	    }
	  }]);

	  return Conjunction;
	}();

	function creator(lefthand, righthand) {
	  return new Conjunction(lefthand, righthand);
	}

	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var CollectionAccess = function () {
	  function CollectionAccess(accessor) {
	    _classCallCheck(this, CollectionAccess);

	    this.token = _constantsTokens.COLLECTION_ACCESS;
	    this.accessor = accessor;
	  }

	  _createClass(CollectionAccess, [{
	    key: 'toString',
	    value: function toString() {
	      return 'CollectionAccess( ' + this.accessor + ' )';
	    }
	  }]);

	  return CollectionAccess;
	}();

	function creator(accessor) {
	  return new CollectionAccess(accessor);
	}

	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var Disjunction = function () {
	  function Disjunction(lefthand, righthand) {
	    _classCallCheck(this, Disjunction);

	    this.token = _constantsTokens.DISJUNCTION;
	    this.lefthand = lefthand;
	    this.righthand = righthand;
	  }

	  _createClass(Disjunction, [{
	    key: 'toString',
	    value: function toString() {
	      return 'Disjunction( ' + this.lefthand + ', ' + this.righthand + ' )';
	    }
	  }]);

	  return Disjunction;
	}();

	function creator(lefthand, righthand) {
	  return new Disjunction(lefthand, righthand);
	}

	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var Exists = function () {
	  function Exists(iterators, condition) {
	    _classCallCheck(this, Exists);

	    this.token = _constantsTokens.EXISTS;
	    this.iterators = iterators;
	    this.condition = condition;
	  }

	  _createClass(Exists, [{
	    key: 'toString',
	    value: function toString() {
	      return 'Exists([' + this.iterators.join(', ') + '], ' + this.condition + ')';
	    }
	  }]);

	  return Exists;
	}();

	function creator(iterators, condition) {
	  return new Exists(iterators, condition);
	}

	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var Exponential = function () {
	  function Exponential(lefthand, righthand) {
	    _classCallCheck(this, Exponential);

	    this.token = _constantsTokens.EXPONENTIAL;
	    this.lefthand = lefthand;
	    this.righthand = righthand;
	  }

	  _createClass(Exponential, [{
	    key: 'toString',
	    value: function toString() {
	      return 'Exponential( ' + this.lefthand + ', ' + this.righthand + ' )';
	    }
	  }]);

	  return Exponential;
	}();

	function creator(lefthand, righthand) {
	  return new Exponential(lefthand, righthand);
	}

	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var Forall = function () {
	  function Forall(iterators, condition) {
	    _classCallCheck(this, Forall);

	    this.token = _constantsTokens.FORALL;
	    this.iterators = iterators;
	    this.condition = condition;
	  }

	  _createClass(Forall, [{
	    key: 'toString',
	    value: function toString() {
	      return 'Forall([' + this.iterators.join(', ') + '], ' + this.condition + ')';
	    }
	  }]);

	  return Forall;
	}();

	function creator(iterators, condition) {
	  return new Forall(iterators, condition);
	}

	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var ForLoop = function () {
	  function ForLoop(iterators, expression, block) {
	    _classCallCheck(this, ForLoop);

	    this.token = _constantsTokens.FOR_LOOP;
	    this.iterators = iterators;
	    this.block = block;
	    this.expression = expression;
	  }

	  _createClass(ForLoop, [{
	    key: 'toString',
	    value: function toString() {
	      if (this.expression) {
	        return 'ForLoop(\n  ' + this.iterators + ',\n  ' + this.expression + ',\n  ' + this.block + ' \n)';
	      }
	      return 'ForLoop(\n  ' + this.iterators + ',\n  ' + this.block + ' \n)';
	    }
	  }]);

	  return ForLoop;
	}();

	function creator(iterators, expression, block) {
	  return new ForLoop(iterators, expression, block);
	}

	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var FunctionCall = function () {
	  function FunctionCall(parameters) {
	    _classCallCheck(this, FunctionCall);

	    this.token = _constantsTokens.FUNCTION_CALL;
	    this.parameters = parameters;
	  }

	  _createClass(FunctionCall, [{
	    key: 'toString',
	    value: function toString() {
	      return 'FunctionCall( ' + this.parameters.join(', ') + ' )';
	    }
	  }]);

	  return FunctionCall;
	}();

	function creator(parameters) {
	  return new FunctionCall(parameters);
	}

	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var Generator = function () {
	  function Generator(mapper, iterators, expression) {
	    _classCallCheck(this, Generator);

	    this.token = _constantsTokens.GENERATOR;
	    this.mapper = mapper;
	    this.iterators = iterators;
	    this.expression = expression;
	  }

	  _createClass(Generator, [{
	    key: 'toString',
	    value: function toString() {
	      if (this.expression) {
	        return 'Generator(\n  ' + this.mapper + ',\n  ' + this.iterators.join(', ') + ',\n  ' + this.expression + '\n)';
	      }
	      return 'Generator(\n  ' + this.mapper + '\n ' + this.iterators.join(', ') + '\n)';
	    }
	  }]);

	  return Generator;
	}();

	function creator(mapper, iterators, expression) {
	  return new Generator(mapper, iterators, expression);
	}

	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var Identifier = function () {
	  function Identifier(name) {
	    _classCallCheck(this, Identifier);

	    this.token = _constantsTokens.IDENTIFIER;
	    this.name = name;
	  }

	  _createClass(Identifier, [{
	    key: 'toString',
	    value: function toString() {
	      return 'Identifier';
	    }
	  }]);

	  return Identifier;
	}();

	function creator(name) {
	  return new Identifier(name);
	}

	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var IfStmt = function () {
	  function IfStmt(condition, block) {
	    var elseBlock = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	    _classCallCheck(this, IfStmt);

	    this.token = _constantsTokens.IF_STMT;
	    this.condition = condition;
	    this.block = block;
	    this.elseBlock = elseBlock;
	  }

	  _createClass(IfStmt, [{
	    key: 'toString',
	    value: function toString() {
	      if (this.elseBlk === null) {
	        return 'IfStmt( ' + this.condition + ', ' + this.block + ' )';
	      }
	      return 'IfStmt( ' + this.condition + ', ' + this.block + ', ' + this.elseBlock + ' )';
	    }
	  }]);

	  return IfStmt;
	}();

	function creator(condition, block) {
	  var elseBlock = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	  return new IfStmt(condition, block, elseBlock);
	}

	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var _utilIndent = __webpack_require__(10);

	var _utilIndent2 = _interopRequireDefault(_utilIndent);

	var Block = function () {
	  function Block(statements) {
	    _classCallCheck(this, Block);

	    this.token = _constantsTokens.INIT_BLOCK;
	    this.statements = statements;
	  }

	  _createClass(Block, [{
	    key: 'toString',
	    value: function toString() {
	      return 'InitBlock(\n' + (0, _utilIndent2['default'])(2, this.statements.join(',\n')) + '\n)';
	    }
	  }]);

	  return Block;
	}();

	function creator(statements) {
	  return new Block(statements);
	}

	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var Iterator = function () {
	  function Iterator(assignable, expression) {
	    _classCallCheck(this, Iterator);

	    this.token = _constantsTokens.ITERATOR;
	    this.assignable = assignable;
	    this.expression = expression;
	  }

	  _createClass(Iterator, [{
	    key: 'toString',
	    value: function toString() {
	      return 'Iterator( ' + this.assignable + ', ' + this.expression + ' )';
	    }
	  }]);

	  return Iterator;
	}();

	function creator(assignable, expression) {
	  return new Iterator(assignable, expression);
	}

	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var List = function () {
	  function List(builder) {
	    _classCallCheck(this, List);

	    this.token = _constantsTokens.LIST;
	    this.builder = builder;
	  }

	  _createClass(List, [{
	    key: 'toString',
	    value: function toString() {
	      return this.builder ? 'List( ' + this.builder + ' )' : 'List()';
	    }
	  }]);

	  return List;
	}();

	function creator(builder) {
	  return new List(builder);
	}

	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var PrefixOperation = function () {
	  function PrefixOperation(operator, operant) {
	    _classCallCheck(this, PrefixOperation);

	    this.token = _constantsTokens.PREFIX_OPERATION;
	    this.operant = operant;
	    this.operator = operator;
	  }

	  _createClass(PrefixOperation, [{
	    key: 'toString',
	    value: function toString() {
	      return 'PrefixOperation( ' + this.operator + ', ' + this.operant + ' )';
	    }
	  }]);

	  return PrefixOperation;
	}();

	function creator(operator, operant) {
	  return new PrefixOperation(operator, operant);
	}

	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var Primitive = function () {
	  function Primitive(type, value) {
	    _classCallCheck(this, Primitive);

	    this.token = _constantsTokens.PRIMITIVE;
	    this.type = type;
	    this.value = value;
	  }

	  _createClass(Primitive, [{
	    key: 'toString',
	    value: function toString() {
	      return 'Primitive(' + this.type + ')';
	    }
	  }]);

	  return Primitive;
	}();

	function creator(type, value) {
	  return new Primitive(type, value);
	}

	module.exports = exports['default'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var _utilIndent = __webpack_require__(10);

	var _utilIndent2 = _interopRequireDefault(_utilIndent);

	var Procedure = function () {
	  function Procedure(params, blk, closure) {
	    _classCallCheck(this, Procedure);

	    this.token = _constantsTokens.PROCEDURE;
	    this.block = blk;
	    this.params = params;
	    this.closure = closure;
	  }

	  _createClass(Procedure, [{
	    key: 'toString',
	    value: function toString() {
	      var params = '[ ' + this.params.join(', ') + ' ],\n' + this.block + ',\n' + this.closure;
	      return 'Procedure(\n' + (0, _utilIndent2['default'])(2, params) + '\n)';
	    }
	  }]);

	  return Procedure;
	}();

	function creator(params, blk) {
	  var closure = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	  return new Procedure(params, blk, closure);
	}

	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var Product = function () {
	  function Product(op, lefthand, righthand) {
	    _classCallCheck(this, Product);

	    this.token = _constantsTokens.PRODUCT;
	    this.operator = op;
	    this.lefthand = lefthand;
	    this.righthand = righthand;
	  }

	  _createClass(Product, [{
	    key: 'toString',
	    value: function toString() {
	      return 'Product( ' + this.operator + ', ' + this.lefthand + ', ' + this.righthand + ' )';
	    }
	  }]);

	  return Product;
	}();

	function creator(op, lefthand, righthand) {
	  return new Product(op, lefthand, righthand);
	}

	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var Range = function () {
	  function Range(fromExpr, toExpr) {
	    _classCallCheck(this, Range);

	    this.token = _constantsTokens.RANGE;
	    this.fromExpr = fromExpr;
	    this.toExpr = toExpr;
	  }

	  _createClass(Range, [{
	    key: 'toString',
	    value: function toString() {
	      return 'Range( ' + this.fromExpr + ', ' + this.toExpr + ')';
	    }
	  }]);

	  return Range;
	}();

	function creator(fromExpr, toExpr) {
	  return new Range(fromExpr, toExpr);
	}

	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var Return = function () {
	  function Return() {
	    var expression = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	    _classCallCheck(this, Return);

	    this.token = _constantsTokens.RETURN;
	    this.expression = expression;
	  }

	  _createClass(Return, [{
	    key: 'toString',
	    value: function toString() {
	      return this.expression ? 'Return( ' + this.expression + ' )' : 'Return()';
	    }
	  }]);

	  return Return;
	}();

	function creator() {
	  var expression = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	  return new Return(expression);
	}

	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	// This one is called SetlSet to not collide with JavaScript's Set

	var SetlSet = function () {
	  function SetlSet(builder) {
	    _classCallCheck(this, SetlSet);

	    this.token = _constantsTokens.SET;
	    this.builder = builder;
	  }

	  _createClass(SetlSet, [{
	    key: 'toString',
	    value: function toString() {
	      return this.builder ? 'Set( ' + this.builder + ' )' : 'Set()';
	    }
	  }]);

	  return SetlSet;
	}();

	function creator(builder) {
	  return new SetlSet(builder);
	}

	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var Statement = function () {
	  function Statement(child) {
	    _classCallCheck(this, Statement);

	    this.token = _constantsTokens.STATEMENT;
	    this.child = child;
	  }

	  _createClass(Statement, [{
	    key: 'toString',
	    value: function toString() {
	      return this.child.toString();
	    }
	  }]);

	  return Statement;
	}();

	function creator(child) {
	  return new Statement(child);
	}

	module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var _utilIndent = __webpack_require__(10);

	var _utilIndent2 = _interopRequireDefault(_utilIndent);

	var SwitchStmt = function () {
	  function SwitchStmt(cases) {
	    _classCallCheck(this, SwitchStmt);

	    this.token = _constantsTokens.SWITCH_STMT;
	    this.cases = cases;
	  }

	  _createClass(SwitchStmt, [{
	    key: 'toString',
	    value: function toString() {
	      return 'SwitchStmt([\n' + (0, _utilIndent2['default'])(2, this.params.join(',\n')) + '\n])';
	    }
	  }]);

	  return SwitchStmt;
	}();

	function creator(cases) {
	  return new SwitchStmt(cases);
	}

	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var Sum = function () {
	  function Sum(op, lefthand, righthand) {
	    _classCallCheck(this, Sum);

	    this.token = _constantsTokens.SUM;
	    this.operator = op;
	    this.lefthand = lefthand;
	    this.righthand = righthand;
	  }

	  _createClass(Sum, [{
	    key: 'toString',
	    value: function toString() {
	      return 'Sum( ' + this.operator + ', ' + this.lefthand + ', ' + this.righthand + ' )';
	    }
	  }]);

	  return Sum;
	}();

	function creator(op, lefthand, righthand) {
	  return new Sum(op, lefthand, righthand);
	}

	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports['default'] = creator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _constantsTokens = __webpack_require__(6);

	var WhileLoop = function () {
	  function WhileLoop(expression, block) {
	    _classCallCheck(this, WhileLoop);

	    this.token = _constantsTokens.WHILE_LOOP;
	    this.block = block;
	    this.expression = expression;
	  }

	  _createClass(WhileLoop, [{
	    key: 'toString',
	    value: function toString() {
	      return 'WhileLoop(\n  ' + this.expression + ',\n  ' + this.block + ' \n)';
	    }
	  }]);

	  return WhileLoop;
	}();

	function creator(expression, block) {
	  return new WhileLoop(expression, block);
	}

	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var STRING = 'STRING';
	exports.STRING = STRING;
	var INTEGER = 'INTEGER';
	exports.INTEGER = INTEGER;
	var DOUBLE = 'DOUBLE';
	exports.DOUBLE = DOUBLE;
	var BOOLEAN = 'BOOLEAN';
	exports.BOOLEAN = BOOLEAN;

/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var EQUAL = 'EQUAL';
	exports.EQUAL = EQUAL;
	var NOT_EQUAL = 'NOT_EQUAL';
	exports.NOT_EQUAL = NOT_EQUAL;
	var GREATER_THAN = 'GREATER_THAN';
	exports.GREATER_THAN = GREATER_THAN;
	var LESS_THAN = 'LESS_THAN';
	exports.LESS_THAN = LESS_THAN;
	var GREATER_EQUAL_THAN = 'GREATER_EQUAL_THAN';
	exports.GREATER_EQUAL_THAN = GREATER_EQUAL_THAN;
	var LESS_EQUAL_THAN = 'LESS_EQUAL_THAN';
	exports.LESS_EQUAL_THAN = LESS_EQUAL_THAN;
	var IS_IN = 'IS_IN';
	exports.IS_IN = IS_IN;
	var IS_NOT_IN = 'IS_NOT_IN';

	exports.IS_NOT_IN = IS_NOT_IN;
	var PLUS = 'PLUS';
	exports.PLUS = PLUS;
	var MINUS = 'MINUS';
	exports.MINUS = MINUS;
	var TIMES = 'TIMES';
	exports.TIMES = TIMES;
	var DIVIVED_BY = 'DIVIDED_BY';
	exports.DIVIVED_BY = DIVIVED_BY;
	var INTEGER_DIVISION = 'INTEGER_DIVISION';
	exports.INTEGER_DIVISION = INTEGER_DIVISION;
	var MODULO = 'MODULO';

	exports.MODULO = MODULO;
	var IMPLIES = 'IMPLIES';
	exports.IMPLIES = IMPLIES;
	var IF_ONLY_IF = 'IF_ONLY_IF';
	exports.IF_ONLY_IF = IF_ONLY_IF;
	var NOT_IF_ONLY_IF = 'NOT_IF_ONLY_IF';

	exports.NOT_IF_ONLY_IF = NOT_IF_ONLY_IF;
	var PREFIX_PLUS = 'PREFIX_PLUS';
	exports.PREFIX_PLUS = PREFIX_PLUS;
	var PREFIX_TIMES = 'PREFIX_TIMES';
	exports.PREFIX_TIMES = PREFIX_TIMES;
	var PREFIX_MINUS = 'PREFIX_MINUS';
	exports.PREFIX_MINUS = PREFIX_MINUS;
	var PREFIX_LENGTH = 'PREFIX_LENGTH';
	exports.PREFIX_LENGTH = PREFIX_LENGTH;
	var PREFIX_NOT = 'PREFIX_NOT';
	exports.PREFIX_NOT = PREFIX_NOT;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = transpiler;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _parse = __webpack_require__(3);

	var _parse2 = _interopRequireDefault(_parse);

	var _createTranspiler = __webpack_require__(43);

	var _createTranspiler2 = _interopRequireDefault(_createTranspiler);

	function transpiler(fileContent, plugins) {
	  var syntaxTree = (0, _parse2['default'])(fileContent);
	  console.log(plugins);
	  return (0, _createTranspiler2['default'])(plugins)(syntaxTree);
	}

	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = createTranspiler;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _transpilers = __webpack_require__(44);

	var _transpilers2 = _interopRequireDefault(_transpilers);

	var _pluginsHelperPlugin = __webpack_require__(74);

	var _pluginsHelperPlugin2 = _interopRequireDefault(_pluginsHelperPlugin);

	var _pluginsStdLibPlugin = __webpack_require__(75);

	var _pluginsStdLibPlugin2 = _interopRequireDefault(_pluginsStdLibPlugin);

	var _pluginsScopePlugin = __webpack_require__(76);

	var _pluginsScopePlugin2 = _interopRequireDefault(_pluginsScopePlugin);

	var defaultPlugins = function defaultPlugins() {
	  return {
	    helperPlugin: new _pluginsHelperPlugin2['default'](),
	    stdLibPlugin: new _pluginsStdLibPlugin2['default'](),
	    scopePlugin: new _pluginsScopePlugin2['default']()
	  };
	};

	function createTranspiler(plugins) {
	  var mergedPlugins = Object.assign({}, defaultPlugins(), plugins);

	  return function transpile(tree) {
	    if (typeof _transpilers2['default'][tree.token] !== 'function') {
	      throw new Error('Could not find transpiler for token type ' + tree.token);
	    }
	    return _transpilers2['default'][tree.token](tree, transpile, mergedPlugins);
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
	  } else {
	    obj[key] = value;
	  }return obj;
	}

	var _block = __webpack_require__(45);

	var _block2 = _interopRequireDefault(_block);

	var _statement = __webpack_require__(46);

	var _statement2 = _interopRequireDefault(_statement);

	var _primitive = __webpack_require__(47);

	var _primitive2 = _interopRequireDefault(_primitive);

	var _assignment = __webpack_require__(48);

	var _assignment2 = _interopRequireDefault(_assignment);

	var _assignableList = __webpack_require__(49);

	var _assignableList2 = _interopRequireDefault(_assignableList);

	var _identifier = __webpack_require__(50);

	var _identifier2 = _interopRequireDefault(_identifier);

	var _list = __webpack_require__(51);

	var _list2 = _interopRequireDefault(_list);

	var _procedure = __webpack_require__(52);

	var _procedure2 = _interopRequireDefault(_procedure);

	var _disjunction = __webpack_require__(53);

	var _disjunction2 = _interopRequireDefault(_disjunction);

	var _conjunction = __webpack_require__(54);

	var _conjunction2 = _interopRequireDefault(_conjunction);

	var _generator = __webpack_require__(55);

	var _generator2 = _interopRequireDefault(_generator);

	var _set = __webpack_require__(56);

	var _set2 = _interopRequireDefault(_set);

	var _ifStmt = __webpack_require__(57);

	var _ifStmt2 = _interopRequireDefault(_ifStmt);

	var _sum = __webpack_require__(58);

	var _sum2 = _interopRequireDefault(_sum);

	var _product = __webpack_require__(59);

	var _product2 = _interopRequireDefault(_product);

	var _collectionAccess = __webpack_require__(60);

	var _collectionAccess2 = _interopRequireDefault(_collectionAccess);

	var _functionCall = __webpack_require__(61);

	var _functionCall2 = _interopRequireDefault(_functionCall);

	var _call = __webpack_require__(62);

	var _call2 = _interopRequireDefault(_call);

	var _returnStmt = __webpack_require__(63);

	var _returnStmt2 = _interopRequireDefault(_returnStmt);

	var _initBlock = __webpack_require__(64);

	var _initBlock2 = _interopRequireDefault(_initBlock);

	var _whileLoop = __webpack_require__(66);

	var _whileLoop2 = _interopRequireDefault(_whileLoop);

	var _comparison = __webpack_require__(67);

	var _comparison2 = _interopRequireDefault(_comparison);

	var _prefixOperation = __webpack_require__(68);

	var _prefixOperation2 = _interopRequireDefault(_prefixOperation);

	var _exponential = __webpack_require__(69);

	var _exponential2 = _interopRequireDefault(_exponential);

	var _forLoop = __webpack_require__(70);

	var _forLoop2 = _interopRequireDefault(_forLoop);

	var _breakStmt = __webpack_require__(71);

	var _breakStmt2 = _interopRequireDefault(_breakStmt);

	var _forall = __webpack_require__(72);

	var _forall2 = _interopRequireDefault(_forall);

	var _exists = __webpack_require__(73);

	var _exists2 = _interopRequireDefault(_exists);

	var _constantsTokens = __webpack_require__(6);

	exports['default'] = (_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS = {}, _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.PRIMITIVE, _primitive2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.IDENTIFIER, _identifier2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.ASSIGNMENT, _assignment2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.ASSIGNABLE_LIST, _assignableList2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.STATEMENT, _statement2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.BLOCK, _block2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.CONJUNCTION, _conjunction2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.DISJUNCTION, _disjunction2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.PROCEDURE, _procedure2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.LIST, _list2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.GENERATOR, _generator2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.SET, _set2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.IF_STMT, _ifStmt2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.SUM, _sum2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.PRODUCT, _product2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.COLLECTION_ACCESS, _collectionAccess2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.FUNCTION_CALL, _functionCall2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.CALL, _call2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.RETURN, _returnStmt2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.INIT_BLOCK, _initBlock2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.WHILE_LOOP, _whileLoop2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.COMPARISON, _comparison2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.PREFIX_OPERATION, _prefixOperation2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.EXPONENTIAL, _exponential2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.FOR_LOOP, _forLoop2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.BREAK_STMT, _breakStmt2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.FORALL, _forall2['default']), _defineProperty(_PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS, _constantsTokens.EXISTS, _exists2['default']), _PRIMITIVE$IDENTIFIER$ASSIGNMENT$ASSIGNABLE_LIST$STATEMENT$BLOCK$CONJUNCTION$DISJUNCTION$PROCEDURE$LIST$GENERATOR$SET$IF_STMT$SUM$PRODUCT$COLLECTION_ACCESS$FUNCTION_CALL$CALL$RETURN$INIT_BLOCK$WHILE_LOOP$COMPARISON$PREFIX_OPERATION$EXPONENTIAL$FOR_LOOP$BREAK_STMT$FORALL$EXISTS);
	module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = block;

	function block(tree, transpile) {
	  if (tree.statements.length === 0) {
	    return '';
	  }
	  return tree.statements.map(transpile).join('\n') + '\n';
	}

	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (tree, transpile) {
	  return transpile(tree.child) + ';';
	};

	module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = function (tree) {
	  return tree.value.toString();
	};

	module.exports = exports["default"];

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = assignment;

	var _constantsTokens = __webpack_require__(6);

	function assignment(_ref, transpile) {
	  var receiver = _ref.receiver;
	  var expression = _ref.expression;

	  if (receiver.token === _constantsTokens.CALL) {
	    var realReceiver = transpile(receiver.receiver);
	    var accessor = transpile(receiver.call.accessor);

	    return realReceiver + ' = ' + realReceiver + '.set(' + accessor + ', ' + transpile(expression) + ')';
	  }
	  if (receiver.token === _constantsTokens.ASSIGNABLE_LIST) {
	    return transpile(receiver) + ' = ' + transpile(expression) + '.toArray()';
	  }
	  return transpile(receiver) + ' = ' + transpile(expression);
	}

	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = assignableList;

	function assignableList(tree, transpile) {
	  return '[' + tree.assignables.map(transpile).join(', ') + ']';
	}

	module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = identifier;

	function identifier(_ref, transpile, _ref2) {
	  var name = _ref.name;
	  var scopePlugin = _ref2.scopePlugin;
	  var stdLibPlugin = _ref2.stdLibPlugin;

	  if (!stdLibPlugin.isStd(name)) {
	    scopePlugin.register(name);
	  }
	  return name;
	}

	module.exports = exports["default"];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = list;

	var _constantsTokens = __webpack_require__(6);

	function list(tree, transpile, _ref) {
	  var helperPlugin = _ref.helperPlugin;

	  if (tree.builder.token === _constantsTokens.RANGE) {
	    var fnName = helperPlugin.request('range');
	    var fromExpr = transpile(tree.builder.fromExpr);
	    var toExpr = transpile(tree.builder.toExpr);
	    return fnName + '(' + fromExpr + ', ' + toExpr + ').list';
	  } else if (tree.builder.token === _constantsTokens.GENERATOR) {
	    return transpile(tree.builder) + '.list';
	  }
	  return helperPlugin.request('l') + '(' + tree.builder.map(transpile).join(', ') + ')';
	}

	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = procedure;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _utilIndent = __webpack_require__(10);

	var _utilIndent2 = _interopRequireDefault(_utilIndent);

	function procedure(_ref, transpile, _ref2) {
	  var params = _ref.params;
	  var block = _ref.block;
	  var scopePlugin = _ref2.scopePlugin;

	  scopePlugin.newScope(params.map(function (param) {
	    return param.name;
	  }));
	  var body = transpile(block);
	  var varDefs = scopePlugin.closeScope();
	  var fullBody = (0, _utilIndent2['default'])(2, (varDefs ? varDefs + '\n' : '') + body);
	  return 'function(' + params.map(transpile).join(', ') + ') {\n' + fullBody + '}';
	}

	module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = disjunction;

	function disjunction(tree, transpile) {
	  return '(' + transpile(tree.lefthand) + ' || ' + transpile(tree.righthand) + ')';
	}

	module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = conjunction;

	function conjunction(tree, transpile) {
	  return '(' + transpile(tree.lefthand) + ' && ' + transpile(tree.righthand) + ')';
	}

	module.exports = exports['default'];

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = generator;

	var _constantsTokens = __webpack_require__(6);

	function generator(tree, transpile, _ref) {
	  var helperPlugin = _ref.helperPlugin;

	  var itParams = undefined;
	  var itParamsList = tree.iterators.map(function (it) {
	    return transpile(it.assignable);
	  });
	  // if only one arg create "x =>", else "(x, y) =>"
	  if (itParamsList.length === 1 && tree.iterators[0].assignable.token === _constantsTokens.IDENTIFIER) {
	    itParams = itParamsList[0];
	  } else {
	    itParams = '(' + itParamsList.join(', ') + ')';
	  }
	  var itExpr = tree.iterators.map(function (it) {
	    return transpile(it.expression);
	  }).join(', ');

	  var mapper = '.map(' + itParams + ' => ' + transpile(tree.mapper) + ')';
	  var gen = helperPlugin.request('gen') + '(' + itExpr + ')';
	  if (tree.expression) {
	    return gen + ('.filter(' + itParams + ' => ' + transpile(tree.expression) + ')') + mapper;
	  }
	  return gen + mapper;
	}

	module.exports = exports['default'];

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = set;

	var _constantsTokens = __webpack_require__(6);

	function set(_ref, transpile, _ref2) {
	  var builder = _ref.builder;
	  var helperPlugin = _ref2.helperPlugin;

	  if (typeof builder === 'undefined' || builder === null) {
	    var _setFn = helperPlugin.request('s');
	    return _setFn + '()';
	  }
	  if (builder.token === _constantsTokens.RANGE) {
	    var fnName = helperPlugin.request('range');
	    var fromExpr = transpile(builder.fromExpr);
	    var toExpr = transpile(builder.toExpr);
	    return fnName + '(' + fromExpr + ', ' + toExpr + ').set';
	  } else if (builder.token === _constantsTokens.GENERATOR) {
	    return transpile(builder) + '.set';
	  }
	  var setFn = helperPlugin.request('s');
	  return setFn + '(' + builder.map(transpile).join(', ') + ')';
	}

	module.exports = exports['default'];

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = ifStmt;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _utilIndent = __webpack_require__(10);

	var _utilIndent2 = _interopRequireDefault(_utilIndent);

	var _constantsTokens = __webpack_require__(6);

	function ifStmt(_ref, transpile) {
	  var condition = _ref.condition;
	  var block = _ref.block;
	  var elseBlock = _ref.elseBlock;

	  var ret = 'if (' + transpile(condition) + ') {\n' + (0, _utilIndent2['default'])(2, transpile(block)) + '}';
	  if (elseBlock) {
	    if (elseBlock.token === _constantsTokens.IF_STMT) {
	      ret += ' else ' + transpile(elseBlock);
	    } else {
	      ret += ' else {\n' + (0, _utilIndent2['default'])(2, transpile(elseBlock)) + '}';
	    }
	  }
	  return ret;
	}

	module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = sum;

	var _constantsOperators = __webpack_require__(41);

	function sum(_ref, transpile, _ref2) {
	  var operator = _ref.operator;
	  var lefthand = _ref.lefthand;
	  var righthand = _ref.righthand;
	  var helperPlugin = _ref2.helperPlugin;

	  var fnName = undefined;
	  if (operator === _constantsOperators.PLUS) {
	    fnName = helperPlugin.request('add');
	  } else {
	    fnName = helperPlugin.request('sub');
	  }
	  return fnName + '(' + transpile(lefthand) + ', ' + transpile(righthand) + ')';
	}

	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = sum;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _constantsOperators = __webpack_require__(41);

	var _errorsUnsupportedError = __webpack_require__(7);

	var _errorsUnsupportedError2 = _interopRequireDefault(_errorsUnsupportedError);

	function sum(_ref, transpile, _ref2) {
	  var operator = _ref.operator;
	  var lefthand = _ref.lefthand;
	  var righthand = _ref.righthand;
	  var helperPlugin = _ref2.helperPlugin;

	  switch (operator) {
	    case _constantsOperators.TIMES:
	      return helperPlugin.request('mul') + '(' + transpile(lefthand) + ', ' + transpile(righthand) + ')';
	    case _constantsOperators.DIVIDED_BY:
	      return '(' + transpile(lefthand) + ' / ' + transpile(righthand) + ')';
	    case _constantsOperators.MODULO:
	      return '(' + transpile(lefthand) + ' % ' + transpile(righthand) + ')';
	    case _constantsOperators.INTEGER_DIVISION:
	      return 'Math.floor(' + transpile(lefthand) + ' / ' + transpile(righthand) + ')';
	    default:
	      throw new _errorsUnsupportedError2['default']('Product operator ' + operator);
	  }
	}

	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = collectionAccess;

	function collectionAccess(_ref, transpile) {
	  var accessor = _ref.accessor;

	  return ".get(" + transpile(accessor) + " < 0 ? " + transpile(accessor) + " : " + transpile(accessor) + " - 1)";
	}

	module.exports = exports["default"];

/***/ },
/* 61 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = functionCall;

	function functionCall(_ref, transpile) {
	  var parameters = _ref.parameters;

	  return '(' + parameters.map(transpile).join(', ') + ')';
	}

	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = call;

	function call(_ref, transpile) {
	  var receiver = _ref.receiver;
	  var innerCall = _ref.call;

	  return transpile(receiver) + transpile(innerCall);
	}

	module.exports = exports["default"];

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = returnStmt;

	function returnStmt(_ref, transpile) {
	  var expression = _ref.expression;

	  return expression ? 'return ' + transpile(expression) + ';' : 'return;';
	}

	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = initBlock;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _block = __webpack_require__(45);

	var _block2 = _interopRequireDefault(_block);

	var _pluginsImportPlugin = __webpack_require__(65);

	var _pluginsImportPlugin2 = _interopRequireDefault(_pluginsImportPlugin);

	function initBlock(tree, transpile, plugins) {
	  var blockRes = (0, _block2['default'])(tree, transpile, plugins);
	  var declarations = [];
	  var keys = Object.keys(plugins);

	  keys.forEach(function (key) {
	    if (plugins[key] instanceof _pluginsImportPlugin2['default']) {
	      declarations.push(plugins[key].imports());
	    }
	  });

	  declarations.push(plugins.scopePlugin.closeScope());

	  var header = declarations.filter(function (dec) {
	    return dec !== '';
	  }).join('\n\n');

	  return '' + (header === '' ? '' : header + '\n') + blockRes;
	}

	module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var ImportPlugin = function () {
	  function ImportPlugin(name, path) {
	    _classCallCheck(this, ImportPlugin);

	    this.name = name;
	    this.path = path;
	    this.imps = [];
	  }

	  _createClass(ImportPlugin, [{
	    key: 'addImport',
	    value: function addImport(varName, importName) {
	      // only import once
	      for (var i = 0, len = this.imps.length; i < len; ++i) {
	        if (varName === this.imps[i].varName) {
	          return;
	        }
	      }
	      this.imps.push({ varName: varName, importName: importName });
	    }
	  }, {
	    key: 'imports',
	    value: function imports() {
	      if (this.imps.length === 0) {
	        return '';
	      }

	      var importName = '$$import$' + this.name;
	      var imps = this.imps.map(function (imp) {
	        return 'var ' + imp.varName + ' = ' + importName + '.' + imp.importName + ';';
	      }).join('\n');
	      return 'var ' + importName + ' = require(\'' + this.path + '\');\n' + imps;
	    }
	  }]);

	  return ImportPlugin;
	}();

	exports['default'] = ImportPlugin;
	module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = whileLoop;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _utilIndent = __webpack_require__(10);

	var _utilIndent2 = _interopRequireDefault(_utilIndent);

	function whileLoop(_ref, transpile) {
	  var block = _ref.block;
	  var expression = _ref.expression;

	  return 'while (' + transpile(expression) + ') {\n' + (0, _utilIndent2['default'])(2, transpile(block)) + '}';
	}

	module.exports = exports['default'];

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = comparison;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _constantsOperators = __webpack_require__(41);

	var _errorsUnsupportedError = __webpack_require__(7);

	var _errorsUnsupportedError2 = _interopRequireDefault(_errorsUnsupportedError);

	function comparison(_ref, transpile, _ref2) {
	  var operator = _ref.operator;
	  var lefthand = _ref.lefthand;
	  var righthand = _ref.righthand;
	  var helperPlugin = _ref2.helperPlugin;

	  switch (operator) {
	    case _constantsOperators.EQUAL:
	      return helperPlugin.request('equal') + '(' + transpile(lefthand) + ', ' + transpile(righthand) + ')';
	    case _constantsOperators.NOT_EQUAL:
	      return '!' + helperPlugin.request('equal') + '(' + transpile(lefthand) + ', ' + transpile(righthand) + ')';
	    case _constantsOperators.GREATER_EQUAL_THAN:
	      return helperPlugin.request('gte') + '(' + transpile(lefthand) + ', ' + transpile(righthand) + ')';
	    case _constantsOperators.LESS_EQUAL_THAN:
	      return helperPlugin.request('lte') + '(' + transpile(lefthand) + ', ' + transpile(righthand) + ')';
	    case _constantsOperators.GREATER_THAN:
	      return helperPlugin.request('gt') + '(' + transpile(lefthand) + ', ' + transpile(righthand) + ')';
	    case _constantsOperators.LESS_THAN:
	      return helperPlugin.request('lt') + '(' + transpile(lefthand) + ', ' + transpile(righthand) + ')';
	    case _constantsOperators.IS_IN:
	      return transpile(righthand) + '.contains(' + transpile(lefthand) + ')';
	    case _constantsOperators.IS_NOT_IN:
	      return '!' + transpile(righthand) + '.contains(' + transpile(lefthand) + ')';
	    default:
	      throw new _errorsUnsupportedError2['default']('Comparison operator ' + operator);
	  }
	}

	module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = prefixOperation;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _constantsOperators = __webpack_require__(41);

	var _errorsUnsupportedError = __webpack_require__(7);

	var _errorsUnsupportedError2 = _interopRequireDefault(_errorsUnsupportedError);

	function prefixOperation(_ref, transpile, _ref2) {
	  var operator = _ref.operator;
	  var operant = _ref.operant;
	  var helperPlugin = _ref2.helperPlugin;

	  switch (operator) {
	    case _constantsOperators.PREFIX_MINUS:
	      return '-' + transpile(operant);
	    case _constantsOperators.PREFIX_PLUS:
	      return transpile(operant) + '.reduce(' + helperPlugin.request('add') + ')';
	    case _constantsOperators.PREFIX_TIMES:
	      return transpile(operant) + '.reduce(' + helperPlugin.request('mul') + ')';
	    case _constantsOperators.PREFIX_LENGTH:
	      return transpile(operant) + '.size';
	    case _constantsOperators.PREFIX_NOT:
	      return '!' + transpile(operant);
	    default:
	      throw new _errorsUnsupportedError2['default']('Prefix operator ' + operator);
	  }
	}

	module.exports = exports['default'];

/***/ },
/* 69 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = exponential;

	function exponential(_ref, transpile, _ref2) {
	  var lefthand = _ref.lefthand;
	  var righthand = _ref.righthand;
	  var helperPlugin = _ref2.helperPlugin;

	  return helperPlugin.request('pow') + '(' + transpile(lefthand) + ', ' + transpile(righthand) + ')';
	}

	module.exports = exports['default'];

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = forLoop;

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _utilIndent = __webpack_require__(10);

	var _utilIndent2 = _interopRequireDefault(_utilIndent);

	function forLoop(tree, transpile, _ref) {
	  var helperPlugin = _ref.helperPlugin;
	  var scopePlugin = _ref.scopePlugin;

	  var temp1 = scopePlugin.getTempVar();
	  var temp2 = scopePlugin.getTempVar();
	  var expr = '';

	  if (tree.expression) {
	    expr = 'if (!' + transpile(tree.expression) + ') continue;\n';
	  }

	  var assignments = tree.iterators.map(function (it, index) {
	    return transpile(it.assignable) + ' = ' + temp1 + '[' + temp2 + '][' + index + '];';
	  }).join('\n') + '\n';

	  var cFn = helperPlugin.request('combinations');
	  var its = tree.iterators.map(function (it) {
	    return transpile(it.expression) + '.toArray()';
	  }).join(', ');
	  var combinations = cFn + '(' + its + ')';

	  return temp1 + ' = ' + combinations + ';\nfor(' + temp2 + ' = 0; ' + temp2 + ' < ' + temp1 + '.length; ++' + temp2 + ') {\n' + (0, _utilIndent2['default'])(2, assignments + expr + transpile(tree.block)) + '}';
	}

	module.exports = exports['default'];

/***/ },
/* 71 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = breakStmt;

	function breakStmt() {
	  return 'break;';
	}

	module.exports = exports['default'];

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = forall;

	var _constantsTokens = __webpack_require__(6);

	function forall(_ref, transpile, _ref2) {
	  var iterators = _ref.iterators;
	  var condition = _ref.condition;
	  var helperPlugin = _ref2.helperPlugin;

	  var its = iterators.map(function (it) {
	    return transpile(it.expression);
	  }).join(', ');
	  var gen = helperPlugin.request('gen') + '(' + its + ')';
	  var itParams = undefined;
	  if (iterators.length === 1 && iterators[0].assignable.token === _constantsTokens.IDENTIFIER) {
	    itParams = transpile(iterators[0].assignable);
	  } else {
	    itParams = '(' + iterators.map(function (it) {
	      return transpile(it.assignable);
	    }).join(', ') + ')';
	  }

	  return gen + '.every(' + itParams + ' => ' + transpile(condition) + ')';
	}

	module.exports = exports['default'];

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = exists;

	var _constantsTokens = __webpack_require__(6);

	function exists(_ref, transpile, _ref2) {
	  var iterators = _ref.iterators;
	  var condition = _ref.condition;
	  var helperPlugin = _ref2.helperPlugin;

	  var its = iterators.map(function (it) {
	    return transpile(it.expression);
	  }).join(', ');
	  var gen = helperPlugin.request('gen') + '(' + its + ')';
	  var itParams = undefined;
	  if (iterators.length === 1 && iterators[0].assignable.token === _constantsTokens.IDENTIFIER) {
	    itParams = transpile(iterators[0].assignable);
	  } else {
	    itParams = '(' + iterators.map(function (it) {
	      return transpile(it.assignable);
	    }).join(', ') + ')';
	  }

	  return gen + '.some(' + itParams + ' => ' + transpile(condition) + ')';
	}

	module.exports = exports['default'];

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _ImportPlugin2 = __webpack_require__(65);

	var _ImportPlugin3 = _interopRequireDefault(_ImportPlugin2);

	var HelperPlugin = function (_ImportPlugin) {
	  _inherits(HelperPlugin, _ImportPlugin);

	  function HelperPlugin() {
	    _classCallCheck(this, HelperPlugin);

	    _get(Object.getPrototypeOf(HelperPlugin.prototype), 'constructor', this).call(this, 'helper', 'setlxjs-lib/dist/hlp');
	  }

	  _createClass(HelperPlugin, [{
	    key: 'request',
	    value: function request(name) {
	      var ret = '$' + name;
	      this.addImport(ret, name);
	      return ret;
	    }
	  }]);

	  return HelperPlugin;
	}(_ImportPlugin3['default']);

	exports['default'] = HelperPlugin;
	module.exports = exports['default'];

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _ImportPlugin2 = __webpack_require__(65);

	var _ImportPlugin3 = _interopRequireDefault(_ImportPlugin2);

	var stdlib = ['print', 'load', 'abs', 'cos', 'arb', 'isBoolean', 'isString', 'isPrucedure', 'isList', 'isSet', 'isInteger', 'isDouble'];

	var StdLibPlugin = function (_ImportPlugin) {
	  _inherits(StdLibPlugin, _ImportPlugin);

	  function StdLibPlugin() {
	    _classCallCheck(this, StdLibPlugin);

	    _get(Object.getPrototypeOf(StdLibPlugin.prototype), 'constructor', this).call(this, 'stdlib', 'setlxjs-lib/dist/std');
	  }

	  _createClass(StdLibPlugin, [{
	    key: 'isStd',
	    value: function isStd(fun) {
	      if (stdlib.indexOf(fun) >= 0) {
	        this.addImport(fun, fun);
	        return true;
	      }
	      return false;
	    }
	  }]);

	  return StdLibPlugin;
	}(_ImportPlugin3['default']);

	exports['default'] = StdLibPlugin;
	module.exports = exports['default'];

/***/ },
/* 76 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var Scope = function () {
	  function Scope(parent) {
	    var ignore = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	    _classCallCheck(this, Scope);

	    this.parent = parent;
	    this.vars = [];
	    this.ignore = ignore;
	  }

	  _createClass(Scope, [{
	    key: 'has',
	    value: function has(name) {
	      return this.parent && this.parent.has(name) || this.vars.indexOf(name) >= 0;
	    }
	  }, {
	    key: 'register',
	    value: function register(name) {
	      if (!this.has(name) && this.ignore.indexOf(name) < 0) {
	        this.vars.push(name);
	      }
	    }
	  }]);

	  return Scope;
	}();

	var varchars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

	var ScopePlugin = function () {
	  function ScopePlugin() {
	    _classCallCheck(this, ScopePlugin);

	    this.scopes = [new Scope()];
	  }

	  _createClass(ScopePlugin, [{
	    key: 'newScope',
	    value: function newScope(ignore) {
	      this.scopes.unshift(new Scope(this.scopes[0], ignore));
	    }
	  }, {
	    key: 'closeScope',
	    value: function closeScope() {
	      var vars = this.scopes.shift().vars.join(', ');

	      return vars === '' ? '' : 'var ' + vars + ';';
	    }
	  }, {
	    key: 'register',
	    value: function register(name) {
	      this.currentScope.register(name);
	    }
	  }, {
	    key: 'getTempVar',
	    value: function getTempVar() {
	      var name = '_';

	      var number = Math.floor(Math.random() * varchars.length * varchars.length);
	      name += varchars.charAt(Math.floor(number / varchars.length));
	      name += varchars.charAt(number % varchars.length);

	      if (this.currentScope.has(name)) {
	        return this.getTempVar();
	      }
	      this.currentScope.register(name);
	      return name;
	    }
	  }, {
	    key: 'currentScope',
	    get: function get() {
	      if (this.scopes.length === 0) {
	        throw new Error('There is no current scope, all scopes have been closed.');
	      }
	      return this.scopes[0];
	    }
	  }]);

	  return ScopePlugin;
	}();

	exports['default'] = ScopePlugin;
	module.exports = exports['default'];

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.lt = exports.gt = exports.gte = exports.lte = exports.pow = exports.combinations = exports.equal = exports.range = exports.l = exports.s = exports.gen = exports.mul = exports.sub = exports.add = undefined;

	var _add2 = __webpack_require__(78);

	var _add3 = _interopRequireDefault(_add2);

	var _sub2 = __webpack_require__(82);

	var _sub3 = _interopRequireDefault(_sub2);

	var _mul2 = __webpack_require__(83);

	var _mul3 = _interopRequireDefault(_mul2);

	var _gen2 = __webpack_require__(84);

	var _gen3 = _interopRequireDefault(_gen2);

	var _s2 = __webpack_require__(87);

	var _s3 = _interopRequireDefault(_s2);

	var _l2 = __webpack_require__(88);

	var _l3 = _interopRequireDefault(_l2);

	var _range2 = __webpack_require__(89);

	var _range3 = _interopRequireDefault(_range2);

	var _equal2 = __webpack_require__(90);

	var _equal3 = _interopRequireDefault(_equal2);

	var _combinations2 = __webpack_require__(86);

	var _combinations3 = _interopRequireDefault(_combinations2);

	var _pow2 = __webpack_require__(91);

	var _pow3 = _interopRequireDefault(_pow2);

	var _lte2 = __webpack_require__(92);

	var _lte3 = _interopRequireDefault(_lte2);

	var _gte2 = __webpack_require__(94);

	var _gte3 = _interopRequireDefault(_gte2);

	var _gt2 = __webpack_require__(95);

	var _gt3 = _interopRequireDefault(_gt2);

	var _lt2 = __webpack_require__(93);

	var _lt3 = _interopRequireDefault(_lt2);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.add = _add3.default;
	exports.sub = _sub3.default;
	exports.mul = _mul3.default;
	exports.gen = _gen3.default;
	exports.s = _s3.default;
	exports.l = _l3.default;
	exports.range = _range3.default;
	exports.equal = _equal3.default;
	exports.combinations = _combinations3.default;
	exports.pow = _pow3.default;
	exports.lte = _lte3.default;
	exports.gte = _gte3.default;
	exports.gt = _gt3.default;
	exports.lt = _lt3.default;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = add;

	var _stringify = __webpack_require__(79);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _typify = __webpack_require__(80);

	var _typify2 = _interopRequireDefault(_typify);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function add(lefthand, righthand) {
	  var typeL = (0, _typify2.default)(lefthand);
	  var typeR = (0, _typify2.default)(righthand);

	  if (typeL === _typify.STRING || typeR === _typify.STRING) {
	    return (0, _stringify2.default)(lefthand, false) + (0, _stringify2.default)(righthand, false);
	  }

	  if (typeL === typeR) {
	    switch (typeL) {
	      case _typify.BOOLEAN:
	        throw new Error('\'' + (0, _stringify2.default)(lefthand) + ' + ' + (0, _stringify2.default)(righthand) + '\' is undefined.');
	      case _typify.LIST:
	        return lefthand.concat(righthand);
	      case _typify.SET:
	        return lefthand.union(righthand);
	      default:
	        return lefthand + righthand;
	    }
	  }

	  throw new Error('Righthandside of ' + (0, _stringify2.default)(lefthand) + ' + ' + (0, _stringify2.default)(righthand) + (' is not a ' + typeL + ' or string.'));
	}

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = stringify;

	var _typify = __webpack_require__(80);

	var _typify2 = _interopRequireDefault(_typify);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * This function converts values to Strings. In some cases the Javascript
	 * implementation of toString() does not equal the Setlx implementation.
	 *
	 * Other functions can call this function whenever they need to convert a
	 * value to a string and be sure they have the correct Setlx toString
	 * representation.
	 */
	function stringify(value) {
	  var quotationMarks = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	  var type = (0, _typify2.default)(value);
	  if (type === _typify.LIST) {
	    return '[' + value.map(stringify).join(', ') + ']';
	  }
	  if (type === _typify.SET) {
	    return '{' + value.map(stringify).join(', ') + '}';
	  }
	  if (type === _typify.STRING && quotationMarks) {
	    return '"' + value + '"';
	  }
	  if (type === _typify.OM) {
	    return 'om';
	  }

	  return value.toString();
	}

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PROCEDURE = exports.OM = exports.BOOLEAN = exports.SET = exports.LIST = exports.NUMBER = exports.STRING = undefined;

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	};

	exports.default = typify;

	var _immutable = __webpack_require__(81);

	var STRING = exports.STRING = 'string';
	var NUMBER = exports.NUMBER = 'number';
	var LIST = exports.LIST = 'list';
	var SET = exports.SET = 'set';
	var BOOLEAN = exports.BOOLEAN = 'boolean';
	var OM = exports.OM = 'om';
	var PROCEDURE = exports.PROCEDURE = 'procedure';

	/**
	 * To represent SetlX types in Javascript the transpiler created different
	 * Javascript types. To make it easier for other functions to recognise
	 * their input parameters types this function answeres with the type.
	 */
	var typeMap = {
	  string: STRING,
	  number: NUMBER,
	  boolean: BOOLEAN,
	  undefined: OM,
	  null: OM,
	  function: PROCEDURE
	};

	function typify(value) {
	  if (_immutable.List.isList(value)) {
	    return LIST;
	  } else if (_immutable.Set.isSet(value)) {
	    return SET;
	  } else if (value === null) {
	    return OM;
	  }
	  return typeMap[typeof value === 'undefined' ? 'undefined' : _typeof(value)];
	}

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};/**
	 *  Copyright (c) 2014-2015, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */(function(global,factory){( false?'undefined':_typeof(exports))==='object'&&typeof module!=='undefined'?module.exports=factory(): true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):global.Immutable=factory();})(undefined,function(){'use strict';var SLICE$0=Array.prototype.slice;function createClass(ctor,superClass){if(superClass){ctor.prototype=Object.create(superClass.prototype);}ctor.prototype.constructor=ctor;}function Iterable(value){return isIterable(value)?value:Seq(value);}createClass(KeyedIterable,Iterable);function KeyedIterable(value){return isKeyed(value)?value:KeyedSeq(value);}createClass(IndexedIterable,Iterable);function IndexedIterable(value){return isIndexed(value)?value:IndexedSeq(value);}createClass(SetIterable,Iterable);function SetIterable(value){return isIterable(value)&&!isAssociative(value)?value:SetSeq(value);}function isIterable(maybeIterable){return!!(maybeIterable&&maybeIterable[IS_ITERABLE_SENTINEL]);}function isKeyed(maybeKeyed){return!!(maybeKeyed&&maybeKeyed[IS_KEYED_SENTINEL]);}function isIndexed(maybeIndexed){return!!(maybeIndexed&&maybeIndexed[IS_INDEXED_SENTINEL]);}function isAssociative(maybeAssociative){return isKeyed(maybeAssociative)||isIndexed(maybeAssociative);}function isOrdered(maybeOrdered){return!!(maybeOrdered&&maybeOrdered[IS_ORDERED_SENTINEL]);}Iterable.isIterable=isIterable;Iterable.isKeyed=isKeyed;Iterable.isIndexed=isIndexed;Iterable.isAssociative=isAssociative;Iterable.isOrdered=isOrdered;Iterable.Keyed=KeyedIterable;Iterable.Indexed=IndexedIterable;Iterable.Set=SetIterable;var IS_ITERABLE_SENTINEL='@@__IMMUTABLE_ITERABLE__@@';var IS_KEYED_SENTINEL='@@__IMMUTABLE_KEYED__@@';var IS_INDEXED_SENTINEL='@@__IMMUTABLE_INDEXED__@@';var IS_ORDERED_SENTINEL='@@__IMMUTABLE_ORDERED__@@';// Used for setting prototype methods that IE8 chokes on.
	var DELETE='delete';// Constants describing the size of trie nodes.
	var SHIFT=5;// Resulted in best performance after ______?
	var SIZE=1<<SHIFT;var MASK=SIZE-1;// A consistent shared value representing "not set" which equals nothing other
	// than itself, and nothing that could be provided externally.
	var NOT_SET={};// Boolean references, Rough equivalent of `bool &`.
	var CHANGE_LENGTH={value:false};var DID_ALTER={value:false};function MakeRef(ref){ref.value=false;return ref;}function SetRef(ref){ref&&(ref.value=true);}// A function which returns a value representing an "owner" for transient writes
	// to tries. The return value will only ever equal itself, and will not equal
	// the return of any subsequent call of this function.
	function OwnerID(){}// http://jsperf.com/copy-array-inline
	function arrCopy(arr,offset){offset=offset||0;var len=Math.max(0,arr.length-offset);var newArr=new Array(len);for(var ii=0;ii<len;ii++){newArr[ii]=arr[ii+offset];}return newArr;}function ensureSize(iter){if(iter.size===undefined){iter.size=iter.__iterate(returnTrue);}return iter.size;}function wrapIndex(iter,index){// This implements "is array index" which the ECMAString spec defines as:
	//
	//     A String property name P is an array index if and only if
	//     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
	//     to 2^32−1.
	//
	// http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
	if(typeof index!=='number'){var uint32Index=index>>>0;// N >>> 0 is shorthand for ToUint32
	if(''+uint32Index!==index||uint32Index===4294967295){return NaN;}index=uint32Index;}return index<0?ensureSize(iter)+index:index;}function returnTrue(){return true;}function wholeSlice(begin,end,size){return(begin===0||size!==undefined&&begin<=-size)&&(end===undefined||size!==undefined&&end>=size);}function resolveBegin(begin,size){return resolveIndex(begin,size,0);}function resolveEnd(end,size){return resolveIndex(end,size,size);}function resolveIndex(index,size,defaultIndex){return index===undefined?defaultIndex:index<0?Math.max(0,size+index):size===undefined?index:Math.min(size,index);}/* global Symbol */var ITERATE_KEYS=0;var ITERATE_VALUES=1;var ITERATE_ENTRIES=2;var REAL_ITERATOR_SYMBOL=typeof Symbol==='function'&&Symbol.iterator;var FAUX_ITERATOR_SYMBOL='@@iterator';var ITERATOR_SYMBOL=REAL_ITERATOR_SYMBOL||FAUX_ITERATOR_SYMBOL;function Iterator(next){this.next=next;}Iterator.prototype.toString=function(){return'[Iterator]';};Iterator.KEYS=ITERATE_KEYS;Iterator.VALUES=ITERATE_VALUES;Iterator.ENTRIES=ITERATE_ENTRIES;Iterator.prototype.inspect=Iterator.prototype.toSource=function(){return this.toString();};Iterator.prototype[ITERATOR_SYMBOL]=function(){return this;};function iteratorValue(type,k,v,iteratorResult){var value=type===0?k:type===1?v:[k,v];iteratorResult?iteratorResult.value=value:iteratorResult={value:value,done:false};return iteratorResult;}function iteratorDone(){return{value:undefined,done:true};}function hasIterator(maybeIterable){return!!getIteratorFn(maybeIterable);}function isIterator(maybeIterator){return maybeIterator&&typeof maybeIterator.next==='function';}function getIterator(iterable){var iteratorFn=getIteratorFn(iterable);return iteratorFn&&iteratorFn.call(iterable);}function getIteratorFn(iterable){var iteratorFn=iterable&&(REAL_ITERATOR_SYMBOL&&iterable[REAL_ITERATOR_SYMBOL]||iterable[FAUX_ITERATOR_SYMBOL]);if(typeof iteratorFn==='function'){return iteratorFn;}}function isArrayLike(value){return value&&typeof value.length==='number';}createClass(Seq,Iterable);function Seq(value){return value===null||value===undefined?emptySequence():isIterable(value)?value.toSeq():seqFromValue(value);}Seq.of=function()/*...values*/{return Seq(arguments);};Seq.prototype.toSeq=function(){return this;};Seq.prototype.toString=function(){return this.__toString('Seq {','}');};Seq.prototype.cacheResult=function(){if(!this._cache&&this.__iterateUncached){this._cache=this.entrySeq().toArray();this.size=this._cache.length;}return this;};// abstract __iterateUncached(fn, reverse)
	Seq.prototype.__iterate=function(fn,reverse){return seqIterate(this,fn,reverse,true);};// abstract __iteratorUncached(type, reverse)
	Seq.prototype.__iterator=function(type,reverse){return seqIterator(this,type,reverse,true);};createClass(KeyedSeq,Seq);function KeyedSeq(value){return value===null||value===undefined?emptySequence().toKeyedSeq():isIterable(value)?isKeyed(value)?value.toSeq():value.fromEntrySeq():keyedSeqFromValue(value);}KeyedSeq.prototype.toKeyedSeq=function(){return this;};createClass(IndexedSeq,Seq);function IndexedSeq(value){return value===null||value===undefined?emptySequence():!isIterable(value)?indexedSeqFromValue(value):isKeyed(value)?value.entrySeq():value.toIndexedSeq();}IndexedSeq.of=function()/*...values*/{return IndexedSeq(arguments);};IndexedSeq.prototype.toIndexedSeq=function(){return this;};IndexedSeq.prototype.toString=function(){return this.__toString('Seq [',']');};IndexedSeq.prototype.__iterate=function(fn,reverse){return seqIterate(this,fn,reverse,false);};IndexedSeq.prototype.__iterator=function(type,reverse){return seqIterator(this,type,reverse,false);};createClass(SetSeq,Seq);function SetSeq(value){return(value===null||value===undefined?emptySequence():!isIterable(value)?indexedSeqFromValue(value):isKeyed(value)?value.entrySeq():value).toSetSeq();}SetSeq.of=function()/*...values*/{return SetSeq(arguments);};SetSeq.prototype.toSetSeq=function(){return this;};Seq.isSeq=isSeq;Seq.Keyed=KeyedSeq;Seq.Set=SetSeq;Seq.Indexed=IndexedSeq;var IS_SEQ_SENTINEL='@@__IMMUTABLE_SEQ__@@';Seq.prototype[IS_SEQ_SENTINEL]=true;createClass(ArraySeq,IndexedSeq);function ArraySeq(array){this._array=array;this.size=array.length;}ArraySeq.prototype.get=function(index,notSetValue){return this.has(index)?this._array[wrapIndex(this,index)]:notSetValue;};ArraySeq.prototype.__iterate=function(fn,reverse){var array=this._array;var maxIndex=array.length-1;for(var ii=0;ii<=maxIndex;ii++){if(fn(array[reverse?maxIndex-ii:ii],ii,this)===false){return ii+1;}}return ii;};ArraySeq.prototype.__iterator=function(type,reverse){var array=this._array;var maxIndex=array.length-1;var ii=0;return new Iterator(function(){return ii>maxIndex?iteratorDone():iteratorValue(type,ii,array[reverse?maxIndex-ii++:ii++]);});};createClass(ObjectSeq,KeyedSeq);function ObjectSeq(object){var keys=Object.keys(object);this._object=object;this._keys=keys;this.size=keys.length;}ObjectSeq.prototype.get=function(key,notSetValue){if(notSetValue!==undefined&&!this.has(key)){return notSetValue;}return this._object[key];};ObjectSeq.prototype.has=function(key){return this._object.hasOwnProperty(key);};ObjectSeq.prototype.__iterate=function(fn,reverse){var object=this._object;var keys=this._keys;var maxIndex=keys.length-1;for(var ii=0;ii<=maxIndex;ii++){var key=keys[reverse?maxIndex-ii:ii];if(fn(object[key],key,this)===false){return ii+1;}}return ii;};ObjectSeq.prototype.__iterator=function(type,reverse){var object=this._object;var keys=this._keys;var maxIndex=keys.length-1;var ii=0;return new Iterator(function(){var key=keys[reverse?maxIndex-ii:ii];return ii++>maxIndex?iteratorDone():iteratorValue(type,key,object[key]);});};ObjectSeq.prototype[IS_ORDERED_SENTINEL]=true;createClass(IterableSeq,IndexedSeq);function IterableSeq(iterable){this._iterable=iterable;this.size=iterable.length||iterable.size;}IterableSeq.prototype.__iterateUncached=function(fn,reverse){if(reverse){return this.cacheResult().__iterate(fn,reverse);}var iterable=this._iterable;var iterator=getIterator(iterable);var iterations=0;if(isIterator(iterator)){var step;while(!(step=iterator.next()).done){if(fn(step.value,iterations++,this)===false){break;}}}return iterations;};IterableSeq.prototype.__iteratorUncached=function(type,reverse){if(reverse){return this.cacheResult().__iterator(type,reverse);}var iterable=this._iterable;var iterator=getIterator(iterable);if(!isIterator(iterator)){return new Iterator(iteratorDone);}var iterations=0;return new Iterator(function(){var step=iterator.next();return step.done?step:iteratorValue(type,iterations++,step.value);});};createClass(IteratorSeq,IndexedSeq);function IteratorSeq(iterator){this._iterator=iterator;this._iteratorCache=[];}IteratorSeq.prototype.__iterateUncached=function(fn,reverse){if(reverse){return this.cacheResult().__iterate(fn,reverse);}var iterator=this._iterator;var cache=this._iteratorCache;var iterations=0;while(iterations<cache.length){if(fn(cache[iterations],iterations++,this)===false){return iterations;}}var step;while(!(step=iterator.next()).done){var val=step.value;cache[iterations]=val;if(fn(val,iterations++,this)===false){break;}}return iterations;};IteratorSeq.prototype.__iteratorUncached=function(type,reverse){if(reverse){return this.cacheResult().__iterator(type,reverse);}var iterator=this._iterator;var cache=this._iteratorCache;var iterations=0;return new Iterator(function(){if(iterations>=cache.length){var step=iterator.next();if(step.done){return step;}cache[iterations]=step.value;}return iteratorValue(type,iterations,cache[iterations++]);});};// # pragma Helper functions
	function isSeq(maybeSeq){return!!(maybeSeq&&maybeSeq[IS_SEQ_SENTINEL]);}var EMPTY_SEQ;function emptySequence(){return EMPTY_SEQ||(EMPTY_SEQ=new ArraySeq([]));}function keyedSeqFromValue(value){var seq=Array.isArray(value)?new ArraySeq(value).fromEntrySeq():isIterator(value)?new IteratorSeq(value).fromEntrySeq():hasIterator(value)?new IterableSeq(value).fromEntrySeq():(typeof value==='undefined'?'undefined':_typeof(value))==='object'?new ObjectSeq(value):undefined;if(!seq){throw new TypeError('Expected Array or iterable object of [k, v] entries, '+'or keyed object: '+value);}return seq;}function indexedSeqFromValue(value){var seq=maybeIndexedSeqFromValue(value);if(!seq){throw new TypeError('Expected Array or iterable object of values: '+value);}return seq;}function seqFromValue(value){var seq=maybeIndexedSeqFromValue(value)||(typeof value==='undefined'?'undefined':_typeof(value))==='object'&&new ObjectSeq(value);if(!seq){throw new TypeError('Expected Array or iterable object of values, or keyed object: '+value);}return seq;}function maybeIndexedSeqFromValue(value){return isArrayLike(value)?new ArraySeq(value):isIterator(value)?new IteratorSeq(value):hasIterator(value)?new IterableSeq(value):undefined;}function seqIterate(seq,fn,reverse,useKeys){var cache=seq._cache;if(cache){var maxIndex=cache.length-1;for(var ii=0;ii<=maxIndex;ii++){var entry=cache[reverse?maxIndex-ii:ii];if(fn(entry[1],useKeys?entry[0]:ii,seq)===false){return ii+1;}}return ii;}return seq.__iterateUncached(fn,reverse);}function seqIterator(seq,type,reverse,useKeys){var cache=seq._cache;if(cache){var maxIndex=cache.length-1;var ii=0;return new Iterator(function(){var entry=cache[reverse?maxIndex-ii:ii];return ii++>maxIndex?iteratorDone():iteratorValue(type,useKeys?entry[0]:ii-1,entry[1]);});}return seq.__iteratorUncached(type,reverse);}function fromJS(json,converter){return converter?fromJSWith(converter,json,'',{'':json}):fromJSDefault(json);}function fromJSWith(converter,json,key,parentJSON){if(Array.isArray(json)){return converter.call(parentJSON,key,IndexedSeq(json).map(function(v,k){return fromJSWith(converter,v,k,json);}));}if(isPlainObj(json)){return converter.call(parentJSON,key,KeyedSeq(json).map(function(v,k){return fromJSWith(converter,v,k,json);}));}return json;}function fromJSDefault(json){if(Array.isArray(json)){return IndexedSeq(json).map(fromJSDefault).toList();}if(isPlainObj(json)){return KeyedSeq(json).map(fromJSDefault).toMap();}return json;}function isPlainObj(value){return value&&(value.constructor===Object||value.constructor===undefined);}/**
	   * An extension of the "same-value" algorithm as [described for use by ES6 Map
	   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
	   *
	   * NaN is considered the same as NaN, however -0 and 0 are considered the same
	   * value, which is different from the algorithm described by
	   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
	   *
	   * This is extended further to allow Objects to describe the values they
	   * represent, by way of `valueOf` or `equals` (and `hashCode`).
	   *
	   * Note: because of this extension, the key equality of Immutable.Map and the
	   * value equality of Immutable.Set will differ from ES6 Map and Set.
	   *
	   * ### Defining custom values
	   *
	   * The easiest way to describe the value an object represents is by implementing
	   * `valueOf`. For example, `Date` represents a value by returning a unix
	   * timestamp for `valueOf`:
	   *
	   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
	   *     var date2 = new Date(1234567890000);
	   *     date1.valueOf(); // 1234567890000
	   *     assert( date1 !== date2 );
	   *     assert( Immutable.is( date1, date2 ) );
	   *
	   * Note: overriding `valueOf` may have other implications if you use this object
	   * where JavaScript expects a primitive, such as implicit string coercion.
	   *
	   * For more complex types, especially collections, implementing `valueOf` may
	   * not be performant. An alternative is to implement `equals` and `hashCode`.
	   *
	   * `equals` takes another object, presumably of similar type, and returns true
	   * if the it is equal. Equality is symmetrical, so the same result should be
	   * returned if this and the argument are flipped.
	   *
	   *     assert( a.equals(b) === b.equals(a) );
	   *
	   * `hashCode` returns a 32bit integer number representing the object which will
	   * be used to determine how to store the value object in a Map or Set. You must
	   * provide both or neither methods, one must not exist without the other.
	   *
	   * Also, an important relationship between these methods must be upheld: if two
	   * values are equal, they *must* return the same hashCode. If the values are not
	   * equal, they might have the same hashCode; this is called a hash collision,
	   * and while undesirable for performance reasons, it is acceptable.
	   *
	   *     if (a.equals(b)) {
	   *       assert( a.hashCode() === b.hashCode() );
	   *     }
	   *
	   * All Immutable collections implement `equals` and `hashCode`.
	   *
	   */function is(valueA,valueB){if(valueA===valueB||valueA!==valueA&&valueB!==valueB){return true;}if(!valueA||!valueB){return false;}if(typeof valueA.valueOf==='function'&&typeof valueB.valueOf==='function'){valueA=valueA.valueOf();valueB=valueB.valueOf();if(valueA===valueB||valueA!==valueA&&valueB!==valueB){return true;}if(!valueA||!valueB){return false;}}if(typeof valueA.equals==='function'&&typeof valueB.equals==='function'&&valueA.equals(valueB)){return true;}return false;}function deepEqual(a,b){if(a===b){return true;}if(!isIterable(b)||a.size!==undefined&&b.size!==undefined&&a.size!==b.size||a.__hash!==undefined&&b.__hash!==undefined&&a.__hash!==b.__hash||isKeyed(a)!==isKeyed(b)||isIndexed(a)!==isIndexed(b)||isOrdered(a)!==isOrdered(b)){return false;}if(a.size===0&&b.size===0){return true;}var notAssociative=!isAssociative(a);if(isOrdered(a)){var entries=a.entries();return b.every(function(v,k){var entry=entries.next().value;return entry&&is(entry[1],v)&&(notAssociative||is(entry[0],k));})&&entries.next().done;}var flipped=false;if(a.size===undefined){if(b.size===undefined){if(typeof a.cacheResult==='function'){a.cacheResult();}}else{flipped=true;var _=a;a=b;b=_;}}var allEqual=true;var bSize=b.__iterate(function(v,k){if(notAssociative?!a.has(v):flipped?!is(v,a.get(k,NOT_SET)):!is(a.get(k,NOT_SET),v)){allEqual=false;return false;}});return allEqual&&a.size===bSize;}createClass(Repeat,IndexedSeq);function Repeat(value,times){if(!(this instanceof Repeat)){return new Repeat(value,times);}this._value=value;this.size=times===undefined?Infinity:Math.max(0,times);if(this.size===0){if(EMPTY_REPEAT){return EMPTY_REPEAT;}EMPTY_REPEAT=this;}}Repeat.prototype.toString=function(){if(this.size===0){return'Repeat []';}return'Repeat [ '+this._value+' '+this.size+' times ]';};Repeat.prototype.get=function(index,notSetValue){return this.has(index)?this._value:notSetValue;};Repeat.prototype.includes=function(searchValue){return is(this._value,searchValue);};Repeat.prototype.slice=function(begin,end){var size=this.size;return wholeSlice(begin,end,size)?this:new Repeat(this._value,resolveEnd(end,size)-resolveBegin(begin,size));};Repeat.prototype.reverse=function(){return this;};Repeat.prototype.indexOf=function(searchValue){if(is(this._value,searchValue)){return 0;}return-1;};Repeat.prototype.lastIndexOf=function(searchValue){if(is(this._value,searchValue)){return this.size;}return-1;};Repeat.prototype.__iterate=function(fn,reverse){for(var ii=0;ii<this.size;ii++){if(fn(this._value,ii,this)===false){return ii+1;}}return ii;};Repeat.prototype.__iterator=function(type,reverse){var this$0=this;var ii=0;return new Iterator(function(){return ii<this$0.size?iteratorValue(type,ii++,this$0._value):iteratorDone();});};Repeat.prototype.equals=function(other){return other instanceof Repeat?is(this._value,other._value):deepEqual(other);};var EMPTY_REPEAT;function invariant(condition,error){if(!condition)throw new Error(error);}createClass(Range,IndexedSeq);function Range(start,end,step){if(!(this instanceof Range)){return new Range(start,end,step);}invariant(step!==0,'Cannot step a Range by 0');start=start||0;if(end===undefined){end=Infinity;}step=step===undefined?1:Math.abs(step);if(end<start){step=-step;}this._start=start;this._end=end;this._step=step;this.size=Math.max(0,Math.ceil((end-start)/step-1)+1);if(this.size===0){if(EMPTY_RANGE){return EMPTY_RANGE;}EMPTY_RANGE=this;}}Range.prototype.toString=function(){if(this.size===0){return'Range []';}return'Range [ '+this._start+'...'+this._end+(this._step!==1?' by '+this._step:'')+' ]';};Range.prototype.get=function(index,notSetValue){return this.has(index)?this._start+wrapIndex(this,index)*this._step:notSetValue;};Range.prototype.includes=function(searchValue){var possibleIndex=(searchValue-this._start)/this._step;return possibleIndex>=0&&possibleIndex<this.size&&possibleIndex===Math.floor(possibleIndex);};Range.prototype.slice=function(begin,end){if(wholeSlice(begin,end,this.size)){return this;}begin=resolveBegin(begin,this.size);end=resolveEnd(end,this.size);if(end<=begin){return new Range(0,0);}return new Range(this.get(begin,this._end),this.get(end,this._end),this._step);};Range.prototype.indexOf=function(searchValue){var offsetValue=searchValue-this._start;if(offsetValue%this._step===0){var index=offsetValue/this._step;if(index>=0&&index<this.size){return index;}}return-1;};Range.prototype.lastIndexOf=function(searchValue){return this.indexOf(searchValue);};Range.prototype.__iterate=function(fn,reverse){var maxIndex=this.size-1;var step=this._step;var value=reverse?this._start+maxIndex*step:this._start;for(var ii=0;ii<=maxIndex;ii++){if(fn(value,ii,this)===false){return ii+1;}value+=reverse?-step:step;}return ii;};Range.prototype.__iterator=function(type,reverse){var maxIndex=this.size-1;var step=this._step;var value=reverse?this._start+maxIndex*step:this._start;var ii=0;return new Iterator(function(){var v=value;value+=reverse?-step:step;return ii>maxIndex?iteratorDone():iteratorValue(type,ii++,v);});};Range.prototype.equals=function(other){return other instanceof Range?this._start===other._start&&this._end===other._end&&this._step===other._step:deepEqual(this,other);};var EMPTY_RANGE;createClass(Collection,Iterable);function Collection(){throw TypeError('Abstract');}createClass(KeyedCollection,Collection);function KeyedCollection(){}createClass(IndexedCollection,Collection);function IndexedCollection(){}createClass(SetCollection,Collection);function SetCollection(){}Collection.Keyed=KeyedCollection;Collection.Indexed=IndexedCollection;Collection.Set=SetCollection;var imul=typeof Math.imul==='function'&&Math.imul(0xffffffff,2)===-2?Math.imul:function imul(a,b){a=a|0;// int
	b=b|0;// int
	var c=a&0xffff;var d=b&0xffff;// Shift by 0 fixes the sign on the high part.
	return c*d+((a>>>16)*d+c*(b>>>16)<<16>>>0)|0;// int
	};// v8 has an optimization for storing 31-bit signed numbers.
	// Values which have either 00 or 11 as the high order bits qualify.
	// This function drops the highest order bit in a signed number, maintaining
	// the sign bit.
	function smi(i32){return i32>>>1&0x40000000|i32&0xBFFFFFFF;}function hash(o){if(o===false||o===null||o===undefined){return 0;}if(typeof o.valueOf==='function'){o=o.valueOf();if(o===false||o===null||o===undefined){return 0;}}if(o===true){return 1;}var type=typeof o==='undefined'?'undefined':_typeof(o);if(type==='number'){if(o!==o||o===Infinity){return 0;}var h=o|0;if(h!==o){h^=o*0xFFFFFFFF;}while(o>0xFFFFFFFF){o/=0xFFFFFFFF;h^=o;}return smi(h);}if(type==='string'){return o.length>STRING_HASH_CACHE_MIN_STRLEN?cachedHashString(o):hashString(o);}if(typeof o.hashCode==='function'){return o.hashCode();}if(type==='object'){return hashJSObj(o);}if(typeof o.toString==='function'){return hashString(o.toString());}throw new Error('Value type '+type+' cannot be hashed.');}function cachedHashString(string){var hash=stringHashCache[string];if(hash===undefined){hash=hashString(string);if(STRING_HASH_CACHE_SIZE===STRING_HASH_CACHE_MAX_SIZE){STRING_HASH_CACHE_SIZE=0;stringHashCache={};}STRING_HASH_CACHE_SIZE++;stringHashCache[string]=hash;}return hash;}// http://jsperf.com/hashing-strings
	function hashString(string){// This is the hash from JVM
	// The hash code for a string is computed as
	// s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	// where s[i] is the ith character of the string and n is the length of
	// the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	// (exclusive) by dropping high bits.
	var hash=0;for(var ii=0;ii<string.length;ii++){hash=31*hash+string.charCodeAt(ii)|0;}return smi(hash);}function hashJSObj(obj){var hash;if(usingWeakMap){hash=weakMap.get(obj);if(hash!==undefined){return hash;}}hash=obj[UID_HASH_KEY];if(hash!==undefined){return hash;}if(!canDefineProperty){hash=obj.propertyIsEnumerable&&obj.propertyIsEnumerable[UID_HASH_KEY];if(hash!==undefined){return hash;}hash=getIENodeHash(obj);if(hash!==undefined){return hash;}}hash=++objHashUID;if(objHashUID&0x40000000){objHashUID=0;}if(usingWeakMap){weakMap.set(obj,hash);}else if(isExtensible!==undefined&&isExtensible(obj)===false){throw new Error('Non-extensible objects are not allowed as keys.');}else if(canDefineProperty){Object.defineProperty(obj,UID_HASH_KEY,{'enumerable':false,'configurable':false,'writable':false,'value':hash});}else if(obj.propertyIsEnumerable!==undefined&&obj.propertyIsEnumerable===obj.constructor.prototype.propertyIsEnumerable){// Since we can't define a non-enumerable property on the object
	// we'll hijack one of the less-used non-enumerable properties to
	// save our hash on it. Since this is a function it will not show up in
	// `JSON.stringify` which is what we want.
	obj.propertyIsEnumerable=function(){return this.constructor.prototype.propertyIsEnumerable.apply(this,arguments);};obj.propertyIsEnumerable[UID_HASH_KEY]=hash;}else if(obj.nodeType!==undefined){// At this point we couldn't get the IE `uniqueID` to use as a hash
	// and we couldn't use a non-enumerable property to exploit the
	// dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	// itself.
	obj[UID_HASH_KEY]=hash;}else{throw new Error('Unable to set a non-enumerable property on object.');}return hash;}// Get references to ES5 object methods.
	var isExtensible=Object.isExtensible;// True if Object.defineProperty works as expected. IE8 fails this test.
	var canDefineProperty=function(){try{Object.defineProperty({},'@',{});return true;}catch(e){return false;}}();// IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	// and avoid memory leaks from the IE cloneNode bug.
	function getIENodeHash(node){if(node&&node.nodeType>0){switch(node.nodeType){case 1:// Element
	return node.uniqueID;case 9:// Document
	return node.documentElement&&node.documentElement.uniqueID;}}}// If possible, use a WeakMap.
	var usingWeakMap=typeof WeakMap==='function';var weakMap;if(usingWeakMap){weakMap=new WeakMap();}var objHashUID=0;var UID_HASH_KEY='__immutablehash__';if(typeof Symbol==='function'){UID_HASH_KEY=Symbol(UID_HASH_KEY);}var STRING_HASH_CACHE_MIN_STRLEN=16;var STRING_HASH_CACHE_MAX_SIZE=255;var STRING_HASH_CACHE_SIZE=0;var stringHashCache={};function assertNotInfinite(size){invariant(size!==Infinity,'Cannot perform this action with an infinite size.');}createClass(Map,KeyedCollection);// @pragma Construction
	function Map(value){return value===null||value===undefined?emptyMap():isMap(value)&&!isOrdered(value)?value:emptyMap().withMutations(function(map){var iter=KeyedIterable(value);assertNotInfinite(iter.size);iter.forEach(function(v,k){return map.set(k,v);});});}Map.of=function(){var keyValues=SLICE$0.call(arguments,0);return emptyMap().withMutations(function(map){for(var i=0;i<keyValues.length;i+=2){if(i+1>=keyValues.length){throw new Error('Missing value for key: '+keyValues[i]);}map.set(keyValues[i],keyValues[i+1]);}});};Map.prototype.toString=function(){return this.__toString('Map {','}');};// @pragma Access
	Map.prototype.get=function(k,notSetValue){return this._root?this._root.get(0,undefined,k,notSetValue):notSetValue;};// @pragma Modification
	Map.prototype.set=function(k,v){return updateMap(this,k,v);};Map.prototype.setIn=function(keyPath,v){return this.updateIn(keyPath,NOT_SET,function(){return v;});};Map.prototype.remove=function(k){return updateMap(this,k,NOT_SET);};Map.prototype.deleteIn=function(keyPath){return this.updateIn(keyPath,function(){return NOT_SET;});};Map.prototype.update=function(k,notSetValue,updater){return arguments.length===1?k(this):this.updateIn([k],notSetValue,updater);};Map.prototype.updateIn=function(keyPath,notSetValue,updater){if(!updater){updater=notSetValue;notSetValue=undefined;}var updatedValue=updateInDeepMap(this,forceIterator(keyPath),notSetValue,updater);return updatedValue===NOT_SET?undefined:updatedValue;};Map.prototype.clear=function(){if(this.size===0){return this;}if(this.__ownerID){this.size=0;this._root=null;this.__hash=undefined;this.__altered=true;return this;}return emptyMap();};// @pragma Composition
	Map.prototype.merge=function()/*...iters*/{return mergeIntoMapWith(this,undefined,arguments);};Map.prototype.mergeWith=function(merger){var iters=SLICE$0.call(arguments,1);return mergeIntoMapWith(this,merger,iters);};Map.prototype.mergeIn=function(keyPath){var iters=SLICE$0.call(arguments,1);return this.updateIn(keyPath,emptyMap(),function(m){return typeof m.merge==='function'?m.merge.apply(m,iters):iters[iters.length-1];});};Map.prototype.mergeDeep=function()/*...iters*/{return mergeIntoMapWith(this,deepMerger,arguments);};Map.prototype.mergeDeepWith=function(merger){var iters=SLICE$0.call(arguments,1);return mergeIntoMapWith(this,deepMergerWith(merger),iters);};Map.prototype.mergeDeepIn=function(keyPath){var iters=SLICE$0.call(arguments,1);return this.updateIn(keyPath,emptyMap(),function(m){return typeof m.mergeDeep==='function'?m.mergeDeep.apply(m,iters):iters[iters.length-1];});};Map.prototype.sort=function(comparator){// Late binding
	return OrderedMap(sortFactory(this,comparator));};Map.prototype.sortBy=function(mapper,comparator){// Late binding
	return OrderedMap(sortFactory(this,comparator,mapper));};// @pragma Mutability
	Map.prototype.withMutations=function(fn){var mutable=this.asMutable();fn(mutable);return mutable.wasAltered()?mutable.__ensureOwner(this.__ownerID):this;};Map.prototype.asMutable=function(){return this.__ownerID?this:this.__ensureOwner(new OwnerID());};Map.prototype.asImmutable=function(){return this.__ensureOwner();};Map.prototype.wasAltered=function(){return this.__altered;};Map.prototype.__iterator=function(type,reverse){return new MapIterator(this,type,reverse);};Map.prototype.__iterate=function(fn,reverse){var this$0=this;var iterations=0;this._root&&this._root.iterate(function(entry){iterations++;return fn(entry[1],entry[0],this$0);},reverse);return iterations;};Map.prototype.__ensureOwner=function(ownerID){if(ownerID===this.__ownerID){return this;}if(!ownerID){this.__ownerID=ownerID;this.__altered=false;return this;}return makeMap(this.size,this._root,ownerID,this.__hash);};function isMap(maybeMap){return!!(maybeMap&&maybeMap[IS_MAP_SENTINEL]);}Map.isMap=isMap;var IS_MAP_SENTINEL='@@__IMMUTABLE_MAP__@@';var MapPrototype=Map.prototype;MapPrototype[IS_MAP_SENTINEL]=true;MapPrototype[DELETE]=MapPrototype.remove;MapPrototype.removeIn=MapPrototype.deleteIn;// #pragma Trie Nodes
	function ArrayMapNode(ownerID,entries){this.ownerID=ownerID;this.entries=entries;}ArrayMapNode.prototype.get=function(shift,keyHash,key,notSetValue){var entries=this.entries;for(var ii=0,len=entries.length;ii<len;ii++){if(is(key,entries[ii][0])){return entries[ii][1];}}return notSetValue;};ArrayMapNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){var removed=value===NOT_SET;var entries=this.entries;var idx=0;for(var len=entries.length;idx<len;idx++){if(is(key,entries[idx][0])){break;}}var exists=idx<len;if(exists?entries[idx][1]===value:removed){return this;}SetRef(didAlter);(removed||!exists)&&SetRef(didChangeSize);if(removed&&entries.length===1){return;// undefined
	}if(!exists&&!removed&&entries.length>=MAX_ARRAY_MAP_SIZE){return createNodes(ownerID,entries,key,value);}var isEditable=ownerID&&ownerID===this.ownerID;var newEntries=isEditable?entries:arrCopy(entries);if(exists){if(removed){idx===len-1?newEntries.pop():newEntries[idx]=newEntries.pop();}else{newEntries[idx]=[key,value];}}else{newEntries.push([key,value]);}if(isEditable){this.entries=newEntries;return this;}return new ArrayMapNode(ownerID,newEntries);};function BitmapIndexedNode(ownerID,bitmap,nodes){this.ownerID=ownerID;this.bitmap=bitmap;this.nodes=nodes;}BitmapIndexedNode.prototype.get=function(shift,keyHash,key,notSetValue){if(keyHash===undefined){keyHash=hash(key);}var bit=1<<((shift===0?keyHash:keyHash>>>shift)&MASK);var bitmap=this.bitmap;return(bitmap&bit)===0?notSetValue:this.nodes[popCount(bitmap&bit-1)].get(shift+SHIFT,keyHash,key,notSetValue);};BitmapIndexedNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){if(keyHash===undefined){keyHash=hash(key);}var keyHashFrag=(shift===0?keyHash:keyHash>>>shift)&MASK;var bit=1<<keyHashFrag;var bitmap=this.bitmap;var exists=(bitmap&bit)!==0;if(!exists&&value===NOT_SET){return this;}var idx=popCount(bitmap&bit-1);var nodes=this.nodes;var node=exists?nodes[idx]:undefined;var newNode=updateNode(node,ownerID,shift+SHIFT,keyHash,key,value,didChangeSize,didAlter);if(newNode===node){return this;}if(!exists&&newNode&&nodes.length>=MAX_BITMAP_INDEXED_SIZE){return expandNodes(ownerID,nodes,bitmap,keyHashFrag,newNode);}if(exists&&!newNode&&nodes.length===2&&isLeafNode(nodes[idx^1])){return nodes[idx^1];}if(exists&&newNode&&nodes.length===1&&isLeafNode(newNode)){return newNode;}var isEditable=ownerID&&ownerID===this.ownerID;var newBitmap=exists?newNode?bitmap:bitmap^bit:bitmap|bit;var newNodes=exists?newNode?setIn(nodes,idx,newNode,isEditable):spliceOut(nodes,idx,isEditable):spliceIn(nodes,idx,newNode,isEditable);if(isEditable){this.bitmap=newBitmap;this.nodes=newNodes;return this;}return new BitmapIndexedNode(ownerID,newBitmap,newNodes);};function HashArrayMapNode(ownerID,count,nodes){this.ownerID=ownerID;this.count=count;this.nodes=nodes;}HashArrayMapNode.prototype.get=function(shift,keyHash,key,notSetValue){if(keyHash===undefined){keyHash=hash(key);}var idx=(shift===0?keyHash:keyHash>>>shift)&MASK;var node=this.nodes[idx];return node?node.get(shift+SHIFT,keyHash,key,notSetValue):notSetValue;};HashArrayMapNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){if(keyHash===undefined){keyHash=hash(key);}var idx=(shift===0?keyHash:keyHash>>>shift)&MASK;var removed=value===NOT_SET;var nodes=this.nodes;var node=nodes[idx];if(removed&&!node){return this;}var newNode=updateNode(node,ownerID,shift+SHIFT,keyHash,key,value,didChangeSize,didAlter);if(newNode===node){return this;}var newCount=this.count;if(!node){newCount++;}else if(!newNode){newCount--;if(newCount<MIN_HASH_ARRAY_MAP_SIZE){return packNodes(ownerID,nodes,newCount,idx);}}var isEditable=ownerID&&ownerID===this.ownerID;var newNodes=setIn(nodes,idx,newNode,isEditable);if(isEditable){this.count=newCount;this.nodes=newNodes;return this;}return new HashArrayMapNode(ownerID,newCount,newNodes);};function HashCollisionNode(ownerID,keyHash,entries){this.ownerID=ownerID;this.keyHash=keyHash;this.entries=entries;}HashCollisionNode.prototype.get=function(shift,keyHash,key,notSetValue){var entries=this.entries;for(var ii=0,len=entries.length;ii<len;ii++){if(is(key,entries[ii][0])){return entries[ii][1];}}return notSetValue;};HashCollisionNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){if(keyHash===undefined){keyHash=hash(key);}var removed=value===NOT_SET;if(keyHash!==this.keyHash){if(removed){return this;}SetRef(didAlter);SetRef(didChangeSize);return mergeIntoNode(this,ownerID,shift,keyHash,[key,value]);}var entries=this.entries;var idx=0;for(var len=entries.length;idx<len;idx++){if(is(key,entries[idx][0])){break;}}var exists=idx<len;if(exists?entries[idx][1]===value:removed){return this;}SetRef(didAlter);(removed||!exists)&&SetRef(didChangeSize);if(removed&&len===2){return new ValueNode(ownerID,this.keyHash,entries[idx^1]);}var isEditable=ownerID&&ownerID===this.ownerID;var newEntries=isEditable?entries:arrCopy(entries);if(exists){if(removed){idx===len-1?newEntries.pop():newEntries[idx]=newEntries.pop();}else{newEntries[idx]=[key,value];}}else{newEntries.push([key,value]);}if(isEditable){this.entries=newEntries;return this;}return new HashCollisionNode(ownerID,this.keyHash,newEntries);};function ValueNode(ownerID,keyHash,entry){this.ownerID=ownerID;this.keyHash=keyHash;this.entry=entry;}ValueNode.prototype.get=function(shift,keyHash,key,notSetValue){return is(key,this.entry[0])?this.entry[1]:notSetValue;};ValueNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){var removed=value===NOT_SET;var keyMatch=is(key,this.entry[0]);if(keyMatch?value===this.entry[1]:removed){return this;}SetRef(didAlter);if(removed){SetRef(didChangeSize);return;// undefined
	}if(keyMatch){if(ownerID&&ownerID===this.ownerID){this.entry[1]=value;return this;}return new ValueNode(ownerID,this.keyHash,[key,value]);}SetRef(didChangeSize);return mergeIntoNode(this,ownerID,shift,hash(key),[key,value]);};// #pragma Iterators
	ArrayMapNode.prototype.iterate=HashCollisionNode.prototype.iterate=function(fn,reverse){var entries=this.entries;for(var ii=0,maxIndex=entries.length-1;ii<=maxIndex;ii++){if(fn(entries[reverse?maxIndex-ii:ii])===false){return false;}}};BitmapIndexedNode.prototype.iterate=HashArrayMapNode.prototype.iterate=function(fn,reverse){var nodes=this.nodes;for(var ii=0,maxIndex=nodes.length-1;ii<=maxIndex;ii++){var node=nodes[reverse?maxIndex-ii:ii];if(node&&node.iterate(fn,reverse)===false){return false;}}};ValueNode.prototype.iterate=function(fn,reverse){return fn(this.entry);};createClass(MapIterator,Iterator);function MapIterator(map,type,reverse){this._type=type;this._reverse=reverse;this._stack=map._root&&mapIteratorFrame(map._root);}MapIterator.prototype.next=function(){var type=this._type;var stack=this._stack;while(stack){var node=stack.node;var index=stack.index++;var maxIndex;if(node.entry){if(index===0){return mapIteratorValue(type,node.entry);}}else if(node.entries){maxIndex=node.entries.length-1;if(index<=maxIndex){return mapIteratorValue(type,node.entries[this._reverse?maxIndex-index:index]);}}else{maxIndex=node.nodes.length-1;if(index<=maxIndex){var subNode=node.nodes[this._reverse?maxIndex-index:index];if(subNode){if(subNode.entry){return mapIteratorValue(type,subNode.entry);}stack=this._stack=mapIteratorFrame(subNode,stack);}continue;}}stack=this._stack=this._stack.__prev;}return iteratorDone();};function mapIteratorValue(type,entry){return iteratorValue(type,entry[0],entry[1]);}function mapIteratorFrame(node,prev){return{node:node,index:0,__prev:prev};}function makeMap(size,root,ownerID,hash){var map=Object.create(MapPrototype);map.size=size;map._root=root;map.__ownerID=ownerID;map.__hash=hash;map.__altered=false;return map;}var EMPTY_MAP;function emptyMap(){return EMPTY_MAP||(EMPTY_MAP=makeMap(0));}function updateMap(map,k,v){var newRoot;var newSize;if(!map._root){if(v===NOT_SET){return map;}newSize=1;newRoot=new ArrayMapNode(map.__ownerID,[[k,v]]);}else{var didChangeSize=MakeRef(CHANGE_LENGTH);var didAlter=MakeRef(DID_ALTER);newRoot=updateNode(map._root,map.__ownerID,0,undefined,k,v,didChangeSize,didAlter);if(!didAlter.value){return map;}newSize=map.size+(didChangeSize.value?v===NOT_SET?-1:1:0);}if(map.__ownerID){map.size=newSize;map._root=newRoot;map.__hash=undefined;map.__altered=true;return map;}return newRoot?makeMap(newSize,newRoot):emptyMap();}function updateNode(node,ownerID,shift,keyHash,key,value,didChangeSize,didAlter){if(!node){if(value===NOT_SET){return node;}SetRef(didAlter);SetRef(didChangeSize);return new ValueNode(ownerID,keyHash,[key,value]);}return node.update(ownerID,shift,keyHash,key,value,didChangeSize,didAlter);}function isLeafNode(node){return node.constructor===ValueNode||node.constructor===HashCollisionNode;}function mergeIntoNode(node,ownerID,shift,keyHash,entry){if(node.keyHash===keyHash){return new HashCollisionNode(ownerID,keyHash,[node.entry,entry]);}var idx1=(shift===0?node.keyHash:node.keyHash>>>shift)&MASK;var idx2=(shift===0?keyHash:keyHash>>>shift)&MASK;var newNode;var nodes=idx1===idx2?[mergeIntoNode(node,ownerID,shift+SHIFT,keyHash,entry)]:(newNode=new ValueNode(ownerID,keyHash,entry),idx1<idx2?[node,newNode]:[newNode,node]);return new BitmapIndexedNode(ownerID,1<<idx1|1<<idx2,nodes);}function createNodes(ownerID,entries,key,value){if(!ownerID){ownerID=new OwnerID();}var node=new ValueNode(ownerID,hash(key),[key,value]);for(var ii=0;ii<entries.length;ii++){var entry=entries[ii];node=node.update(ownerID,0,undefined,entry[0],entry[1]);}return node;}function packNodes(ownerID,nodes,count,excluding){var bitmap=0;var packedII=0;var packedNodes=new Array(count);for(var ii=0,bit=1,len=nodes.length;ii<len;ii++,bit<<=1){var node=nodes[ii];if(node!==undefined&&ii!==excluding){bitmap|=bit;packedNodes[packedII++]=node;}}return new BitmapIndexedNode(ownerID,bitmap,packedNodes);}function expandNodes(ownerID,nodes,bitmap,including,node){var count=0;var expandedNodes=new Array(SIZE);for(var ii=0;bitmap!==0;ii++,bitmap>>>=1){expandedNodes[ii]=bitmap&1?nodes[count++]:undefined;}expandedNodes[including]=node;return new HashArrayMapNode(ownerID,count+1,expandedNodes);}function mergeIntoMapWith(map,merger,iterables){var iters=[];for(var ii=0;ii<iterables.length;ii++){var value=iterables[ii];var iter=KeyedIterable(value);if(!isIterable(value)){iter=iter.map(function(v){return fromJS(v);});}iters.push(iter);}return mergeIntoCollectionWith(map,merger,iters);}function deepMerger(existing,value,key){return existing&&existing.mergeDeep&&isIterable(value)?existing.mergeDeep(value):is(existing,value)?existing:value;}function deepMergerWith(merger){return function(existing,value,key){if(existing&&existing.mergeDeepWith&&isIterable(value)){return existing.mergeDeepWith(merger,value);}var nextValue=merger(existing,value,key);return is(existing,nextValue)?existing:nextValue;};}function mergeIntoCollectionWith(collection,merger,iters){iters=iters.filter(function(x){return x.size!==0;});if(iters.length===0){return collection;}if(collection.size===0&&!collection.__ownerID&&iters.length===1){return collection.constructor(iters[0]);}return collection.withMutations(function(collection){var mergeIntoMap=merger?function(value,key){collection.update(key,NOT_SET,function(existing){return existing===NOT_SET?value:merger(existing,value,key);});}:function(value,key){collection.set(key,value);};for(var ii=0;ii<iters.length;ii++){iters[ii].forEach(mergeIntoMap);}});}function updateInDeepMap(existing,keyPathIter,notSetValue,updater){var isNotSet=existing===NOT_SET;var step=keyPathIter.next();if(step.done){var existingValue=isNotSet?notSetValue:existing;var newValue=updater(existingValue);return newValue===existingValue?existing:newValue;}invariant(isNotSet||existing&&existing.set,'invalid keyPath');var key=step.value;var nextExisting=isNotSet?NOT_SET:existing.get(key,NOT_SET);var nextUpdated=updateInDeepMap(nextExisting,keyPathIter,notSetValue,updater);return nextUpdated===nextExisting?existing:nextUpdated===NOT_SET?existing.remove(key):(isNotSet?emptyMap():existing).set(key,nextUpdated);}function popCount(x){x=x-(x>>1&0x55555555);x=(x&0x33333333)+(x>>2&0x33333333);x=x+(x>>4)&0x0f0f0f0f;x=x+(x>>8);x=x+(x>>16);return x&0x7f;}function setIn(array,idx,val,canEdit){var newArray=canEdit?array:arrCopy(array);newArray[idx]=val;return newArray;}function spliceIn(array,idx,val,canEdit){var newLen=array.length+1;if(canEdit&&idx+1===newLen){array[idx]=val;return array;}var newArray=new Array(newLen);var after=0;for(var ii=0;ii<newLen;ii++){if(ii===idx){newArray[ii]=val;after=-1;}else{newArray[ii]=array[ii+after];}}return newArray;}function spliceOut(array,idx,canEdit){var newLen=array.length-1;if(canEdit&&idx===newLen){array.pop();return array;}var newArray=new Array(newLen);var after=0;for(var ii=0;ii<newLen;ii++){if(ii===idx){after=1;}newArray[ii]=array[ii+after];}return newArray;}var MAX_ARRAY_MAP_SIZE=SIZE/4;var MAX_BITMAP_INDEXED_SIZE=SIZE/2;var MIN_HASH_ARRAY_MAP_SIZE=SIZE/4;createClass(List,IndexedCollection);// @pragma Construction
	function List(value){var empty=emptyList();if(value===null||value===undefined){return empty;}if(isList(value)){return value;}var iter=IndexedIterable(value);var size=iter.size;if(size===0){return empty;}assertNotInfinite(size);if(size>0&&size<SIZE){return makeList(0,size,SHIFT,null,new VNode(iter.toArray()));}return empty.withMutations(function(list){list.setSize(size);iter.forEach(function(v,i){return list.set(i,v);});});}List.of=function()/*...values*/{return this(arguments);};List.prototype.toString=function(){return this.__toString('List [',']');};// @pragma Access
	List.prototype.get=function(index,notSetValue){index=wrapIndex(this,index);if(index>=0&&index<this.size){index+=this._origin;var node=listNodeFor(this,index);return node&&node.array[index&MASK];}return notSetValue;};// @pragma Modification
	List.prototype.set=function(index,value){return updateList(this,index,value);};List.prototype.remove=function(index){return!this.has(index)?this:index===0?this.shift():index===this.size-1?this.pop():this.splice(index,1);};List.prototype.insert=function(index,value){return this.splice(index,0,value);};List.prototype.clear=function(){if(this.size===0){return this;}if(this.__ownerID){this.size=this._origin=this._capacity=0;this._level=SHIFT;this._root=this._tail=null;this.__hash=undefined;this.__altered=true;return this;}return emptyList();};List.prototype.push=function()/*...values*/{var values=arguments;var oldSize=this.size;return this.withMutations(function(list){setListBounds(list,0,oldSize+values.length);for(var ii=0;ii<values.length;ii++){list.set(oldSize+ii,values[ii]);}});};List.prototype.pop=function(){return setListBounds(this,0,-1);};List.prototype.unshift=function()/*...values*/{var values=arguments;return this.withMutations(function(list){setListBounds(list,-values.length);for(var ii=0;ii<values.length;ii++){list.set(ii,values[ii]);}});};List.prototype.shift=function(){return setListBounds(this,1);};// @pragma Composition
	List.prototype.merge=function()/*...iters*/{return mergeIntoListWith(this,undefined,arguments);};List.prototype.mergeWith=function(merger){var iters=SLICE$0.call(arguments,1);return mergeIntoListWith(this,merger,iters);};List.prototype.mergeDeep=function()/*...iters*/{return mergeIntoListWith(this,deepMerger,arguments);};List.prototype.mergeDeepWith=function(merger){var iters=SLICE$0.call(arguments,1);return mergeIntoListWith(this,deepMergerWith(merger),iters);};List.prototype.setSize=function(size){return setListBounds(this,0,size);};// @pragma Iteration
	List.prototype.slice=function(begin,end){var size=this.size;if(wholeSlice(begin,end,size)){return this;}return setListBounds(this,resolveBegin(begin,size),resolveEnd(end,size));};List.prototype.__iterator=function(type,reverse){var index=0;var values=iterateList(this,reverse);return new Iterator(function(){var value=values();return value===DONE?iteratorDone():iteratorValue(type,index++,value);});};List.prototype.__iterate=function(fn,reverse){var index=0;var values=iterateList(this,reverse);var value;while((value=values())!==DONE){if(fn(value,index++,this)===false){break;}}return index;};List.prototype.__ensureOwner=function(ownerID){if(ownerID===this.__ownerID){return this;}if(!ownerID){this.__ownerID=ownerID;return this;}return makeList(this._origin,this._capacity,this._level,this._root,this._tail,ownerID,this.__hash);};function isList(maybeList){return!!(maybeList&&maybeList[IS_LIST_SENTINEL]);}List.isList=isList;var IS_LIST_SENTINEL='@@__IMMUTABLE_LIST__@@';var ListPrototype=List.prototype;ListPrototype[IS_LIST_SENTINEL]=true;ListPrototype[DELETE]=ListPrototype.remove;ListPrototype.setIn=MapPrototype.setIn;ListPrototype.deleteIn=ListPrototype.removeIn=MapPrototype.removeIn;ListPrototype.update=MapPrototype.update;ListPrototype.updateIn=MapPrototype.updateIn;ListPrototype.mergeIn=MapPrototype.mergeIn;ListPrototype.mergeDeepIn=MapPrototype.mergeDeepIn;ListPrototype.withMutations=MapPrototype.withMutations;ListPrototype.asMutable=MapPrototype.asMutable;ListPrototype.asImmutable=MapPrototype.asImmutable;ListPrototype.wasAltered=MapPrototype.wasAltered;function VNode(array,ownerID){this.array=array;this.ownerID=ownerID;}// TODO: seems like these methods are very similar
	VNode.prototype.removeBefore=function(ownerID,level,index){if(index===level?1<<level:0||this.array.length===0){return this;}var originIndex=index>>>level&MASK;if(originIndex>=this.array.length){return new VNode([],ownerID);}var removingFirst=originIndex===0;var newChild;if(level>0){var oldChild=this.array[originIndex];newChild=oldChild&&oldChild.removeBefore(ownerID,level-SHIFT,index);if(newChild===oldChild&&removingFirst){return this;}}if(removingFirst&&!newChild){return this;}var editable=editableVNode(this,ownerID);if(!removingFirst){for(var ii=0;ii<originIndex;ii++){editable.array[ii]=undefined;}}if(newChild){editable.array[originIndex]=newChild;}return editable;};VNode.prototype.removeAfter=function(ownerID,level,index){if(index===(level?1<<level:0)||this.array.length===0){return this;}var sizeIndex=index-1>>>level&MASK;if(sizeIndex>=this.array.length){return this;}var newChild;if(level>0){var oldChild=this.array[sizeIndex];newChild=oldChild&&oldChild.removeAfter(ownerID,level-SHIFT,index);if(newChild===oldChild&&sizeIndex===this.array.length-1){return this;}}var editable=editableVNode(this,ownerID);editable.array.splice(sizeIndex+1);if(newChild){editable.array[sizeIndex]=newChild;}return editable;};var DONE={};function iterateList(list,reverse){var left=list._origin;var right=list._capacity;var tailPos=getTailOffset(right);var tail=list._tail;return iterateNodeOrLeaf(list._root,list._level,0);function iterateNodeOrLeaf(node,level,offset){return level===0?iterateLeaf(node,offset):iterateNode(node,level,offset);}function iterateLeaf(node,offset){var array=offset===tailPos?tail&&tail.array:node&&node.array;var from=offset>left?0:left-offset;var to=right-offset;if(to>SIZE){to=SIZE;}return function(){if(from===to){return DONE;}var idx=reverse?--to:from++;return array&&array[idx];};}function iterateNode(node,level,offset){var values;var array=node&&node.array;var from=offset>left?0:left-offset>>level;var to=(right-offset>>level)+1;if(to>SIZE){to=SIZE;}return function(){do{if(values){var value=values();if(value!==DONE){return value;}values=null;}if(from===to){return DONE;}var idx=reverse?--to:from++;values=iterateNodeOrLeaf(array&&array[idx],level-SHIFT,offset+(idx<<level));}while(true);};}}function makeList(origin,capacity,level,root,tail,ownerID,hash){var list=Object.create(ListPrototype);list.size=capacity-origin;list._origin=origin;list._capacity=capacity;list._level=level;list._root=root;list._tail=tail;list.__ownerID=ownerID;list.__hash=hash;list.__altered=false;return list;}var EMPTY_LIST;function emptyList(){return EMPTY_LIST||(EMPTY_LIST=makeList(0,0,SHIFT));}function updateList(list,index,value){index=wrapIndex(list,index);if(index!==index){return list;}if(index>=list.size||index<0){return list.withMutations(function(list){index<0?setListBounds(list,index).set(0,value):setListBounds(list,0,index+1).set(index,value);});}index+=list._origin;var newTail=list._tail;var newRoot=list._root;var didAlter=MakeRef(DID_ALTER);if(index>=getTailOffset(list._capacity)){newTail=updateVNode(newTail,list.__ownerID,0,index,value,didAlter);}else{newRoot=updateVNode(newRoot,list.__ownerID,list._level,index,value,didAlter);}if(!didAlter.value){return list;}if(list.__ownerID){list._root=newRoot;list._tail=newTail;list.__hash=undefined;list.__altered=true;return list;}return makeList(list._origin,list._capacity,list._level,newRoot,newTail);}function updateVNode(node,ownerID,level,index,value,didAlter){var idx=index>>>level&MASK;var nodeHas=node&&idx<node.array.length;if(!nodeHas&&value===undefined){return node;}var newNode;if(level>0){var lowerNode=node&&node.array[idx];var newLowerNode=updateVNode(lowerNode,ownerID,level-SHIFT,index,value,didAlter);if(newLowerNode===lowerNode){return node;}newNode=editableVNode(node,ownerID);newNode.array[idx]=newLowerNode;return newNode;}if(nodeHas&&node.array[idx]===value){return node;}SetRef(didAlter);newNode=editableVNode(node,ownerID);if(value===undefined&&idx===newNode.array.length-1){newNode.array.pop();}else{newNode.array[idx]=value;}return newNode;}function editableVNode(node,ownerID){if(ownerID&&node&&ownerID===node.ownerID){return node;}return new VNode(node?node.array.slice():[],ownerID);}function listNodeFor(list,rawIndex){if(rawIndex>=getTailOffset(list._capacity)){return list._tail;}if(rawIndex<1<<list._level+SHIFT){var node=list._root;var level=list._level;while(node&&level>0){node=node.array[rawIndex>>>level&MASK];level-=SHIFT;}return node;}}function setListBounds(list,begin,end){// Sanitize begin & end using this shorthand for ToInt32(argument)
	// http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	if(begin!==undefined){begin=begin|0;}if(end!==undefined){end=end|0;}var owner=list.__ownerID||new OwnerID();var oldOrigin=list._origin;var oldCapacity=list._capacity;var newOrigin=oldOrigin+begin;var newCapacity=end===undefined?oldCapacity:end<0?oldCapacity+end:oldOrigin+end;if(newOrigin===oldOrigin&&newCapacity===oldCapacity){return list;}// If it's going to end after it starts, it's empty.
	if(newOrigin>=newCapacity){return list.clear();}var newLevel=list._level;var newRoot=list._root;// New origin might need creating a higher root.
	var offsetShift=0;while(newOrigin+offsetShift<0){newRoot=new VNode(newRoot&&newRoot.array.length?[undefined,newRoot]:[],owner);newLevel+=SHIFT;offsetShift+=1<<newLevel;}if(offsetShift){newOrigin+=offsetShift;oldOrigin+=offsetShift;newCapacity+=offsetShift;oldCapacity+=offsetShift;}var oldTailOffset=getTailOffset(oldCapacity);var newTailOffset=getTailOffset(newCapacity);// New size might need creating a higher root.
	while(newTailOffset>=1<<newLevel+SHIFT){newRoot=new VNode(newRoot&&newRoot.array.length?[newRoot]:[],owner);newLevel+=SHIFT;}// Locate or create the new tail.
	var oldTail=list._tail;var newTail=newTailOffset<oldTailOffset?listNodeFor(list,newCapacity-1):newTailOffset>oldTailOffset?new VNode([],owner):oldTail;// Merge Tail into tree.
	if(oldTail&&newTailOffset>oldTailOffset&&newOrigin<oldCapacity&&oldTail.array.length){newRoot=editableVNode(newRoot,owner);var node=newRoot;for(var level=newLevel;level>SHIFT;level-=SHIFT){var idx=oldTailOffset>>>level&MASK;node=node.array[idx]=editableVNode(node.array[idx],owner);}node.array[oldTailOffset>>>SHIFT&MASK]=oldTail;}// If the size has been reduced, there's a chance the tail needs to be trimmed.
	if(newCapacity<oldCapacity){newTail=newTail&&newTail.removeAfter(owner,0,newCapacity);}// If the new origin is within the tail, then we do not need a root.
	if(newOrigin>=newTailOffset){newOrigin-=newTailOffset;newCapacity-=newTailOffset;newLevel=SHIFT;newRoot=null;newTail=newTail&&newTail.removeBefore(owner,0,newOrigin);// Otherwise, if the root has been trimmed, garbage collect.
	}else if(newOrigin>oldOrigin||newTailOffset<oldTailOffset){offsetShift=0;// Identify the new top root node of the subtree of the old root.
	while(newRoot){var beginIndex=newOrigin>>>newLevel&MASK;if(beginIndex!==newTailOffset>>>newLevel&MASK){break;}if(beginIndex){offsetShift+=(1<<newLevel)*beginIndex;}newLevel-=SHIFT;newRoot=newRoot.array[beginIndex];}// Trim the new sides of the new root.
	if(newRoot&&newOrigin>oldOrigin){newRoot=newRoot.removeBefore(owner,newLevel,newOrigin-offsetShift);}if(newRoot&&newTailOffset<oldTailOffset){newRoot=newRoot.removeAfter(owner,newLevel,newTailOffset-offsetShift);}if(offsetShift){newOrigin-=offsetShift;newCapacity-=offsetShift;}}if(list.__ownerID){list.size=newCapacity-newOrigin;list._origin=newOrigin;list._capacity=newCapacity;list._level=newLevel;list._root=newRoot;list._tail=newTail;list.__hash=undefined;list.__altered=true;return list;}return makeList(newOrigin,newCapacity,newLevel,newRoot,newTail);}function mergeIntoListWith(list,merger,iterables){var iters=[];var maxSize=0;for(var ii=0;ii<iterables.length;ii++){var value=iterables[ii];var iter=IndexedIterable(value);if(iter.size>maxSize){maxSize=iter.size;}if(!isIterable(value)){iter=iter.map(function(v){return fromJS(v);});}iters.push(iter);}if(maxSize>list.size){list=list.setSize(maxSize);}return mergeIntoCollectionWith(list,merger,iters);}function getTailOffset(size){return size<SIZE?0:size-1>>>SHIFT<<SHIFT;}createClass(OrderedMap,Map);// @pragma Construction
	function OrderedMap(value){return value===null||value===undefined?emptyOrderedMap():isOrderedMap(value)?value:emptyOrderedMap().withMutations(function(map){var iter=KeyedIterable(value);assertNotInfinite(iter.size);iter.forEach(function(v,k){return map.set(k,v);});});}OrderedMap.of=function()/*...values*/{return this(arguments);};OrderedMap.prototype.toString=function(){return this.__toString('OrderedMap {','}');};// @pragma Access
	OrderedMap.prototype.get=function(k,notSetValue){var index=this._map.get(k);return index!==undefined?this._list.get(index)[1]:notSetValue;};// @pragma Modification
	OrderedMap.prototype.clear=function(){if(this.size===0){return this;}if(this.__ownerID){this.size=0;this._map.clear();this._list.clear();return this;}return emptyOrderedMap();};OrderedMap.prototype.set=function(k,v){return updateOrderedMap(this,k,v);};OrderedMap.prototype.remove=function(k){return updateOrderedMap(this,k,NOT_SET);};OrderedMap.prototype.wasAltered=function(){return this._map.wasAltered()||this._list.wasAltered();};OrderedMap.prototype.__iterate=function(fn,reverse){var this$0=this;return this._list.__iterate(function(entry){return entry&&fn(entry[1],entry[0],this$0);},reverse);};OrderedMap.prototype.__iterator=function(type,reverse){return this._list.fromEntrySeq().__iterator(type,reverse);};OrderedMap.prototype.__ensureOwner=function(ownerID){if(ownerID===this.__ownerID){return this;}var newMap=this._map.__ensureOwner(ownerID);var newList=this._list.__ensureOwner(ownerID);if(!ownerID){this.__ownerID=ownerID;this._map=newMap;this._list=newList;return this;}return makeOrderedMap(newMap,newList,ownerID,this.__hash);};function isOrderedMap(maybeOrderedMap){return isMap(maybeOrderedMap)&&isOrdered(maybeOrderedMap);}OrderedMap.isOrderedMap=isOrderedMap;OrderedMap.prototype[IS_ORDERED_SENTINEL]=true;OrderedMap.prototype[DELETE]=OrderedMap.prototype.remove;function makeOrderedMap(map,list,ownerID,hash){var omap=Object.create(OrderedMap.prototype);omap.size=map?map.size:0;omap._map=map;omap._list=list;omap.__ownerID=ownerID;omap.__hash=hash;return omap;}var EMPTY_ORDERED_MAP;function emptyOrderedMap(){return EMPTY_ORDERED_MAP||(EMPTY_ORDERED_MAP=makeOrderedMap(emptyMap(),emptyList()));}function updateOrderedMap(omap,k,v){var map=omap._map;var list=omap._list;var i=map.get(k);var has=i!==undefined;var newMap;var newList;if(v===NOT_SET){// removed
	if(!has){return omap;}if(list.size>=SIZE&&list.size>=map.size*2){newList=list.filter(function(entry,idx){return entry!==undefined&&i!==idx;});newMap=newList.toKeyedSeq().map(function(entry){return entry[0];}).flip().toMap();if(omap.__ownerID){newMap.__ownerID=newList.__ownerID=omap.__ownerID;}}else{newMap=map.remove(k);newList=i===list.size-1?list.pop():list.set(i,undefined);}}else{if(has){if(v===list.get(i)[1]){return omap;}newMap=map;newList=list.set(i,[k,v]);}else{newMap=map.set(k,list.size);newList=list.set(list.size,[k,v]);}}if(omap.__ownerID){omap.size=newMap.size;omap._map=newMap;omap._list=newList;omap.__hash=undefined;return omap;}return makeOrderedMap(newMap,newList);}createClass(ToKeyedSequence,KeyedSeq);function ToKeyedSequence(indexed,useKeys){this._iter=indexed;this._useKeys=useKeys;this.size=indexed.size;}ToKeyedSequence.prototype.get=function(key,notSetValue){return this._iter.get(key,notSetValue);};ToKeyedSequence.prototype.has=function(key){return this._iter.has(key);};ToKeyedSequence.prototype.valueSeq=function(){return this._iter.valueSeq();};ToKeyedSequence.prototype.reverse=function(){var this$0=this;var reversedSequence=reverseFactory(this,true);if(!this._useKeys){reversedSequence.valueSeq=function(){return this$0._iter.toSeq().reverse();};}return reversedSequence;};ToKeyedSequence.prototype.map=function(mapper,context){var this$0=this;var mappedSequence=mapFactory(this,mapper,context);if(!this._useKeys){mappedSequence.valueSeq=function(){return this$0._iter.toSeq().map(mapper,context);};}return mappedSequence;};ToKeyedSequence.prototype.__iterate=function(fn,reverse){var this$0=this;var ii;return this._iter.__iterate(this._useKeys?function(v,k){return fn(v,k,this$0);}:(ii=reverse?resolveSize(this):0,function(v){return fn(v,reverse?--ii:ii++,this$0);}),reverse);};ToKeyedSequence.prototype.__iterator=function(type,reverse){if(this._useKeys){return this._iter.__iterator(type,reverse);}var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);var ii=reverse?resolveSize(this):0;return new Iterator(function(){var step=iterator.next();return step.done?step:iteratorValue(type,reverse?--ii:ii++,step.value,step);});};ToKeyedSequence.prototype[IS_ORDERED_SENTINEL]=true;createClass(ToIndexedSequence,IndexedSeq);function ToIndexedSequence(iter){this._iter=iter;this.size=iter.size;}ToIndexedSequence.prototype.includes=function(value){return this._iter.includes(value);};ToIndexedSequence.prototype.__iterate=function(fn,reverse){var this$0=this;var iterations=0;return this._iter.__iterate(function(v){return fn(v,iterations++,this$0);},reverse);};ToIndexedSequence.prototype.__iterator=function(type,reverse){var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);var iterations=0;return new Iterator(function(){var step=iterator.next();return step.done?step:iteratorValue(type,iterations++,step.value,step);});};createClass(ToSetSequence,SetSeq);function ToSetSequence(iter){this._iter=iter;this.size=iter.size;}ToSetSequence.prototype.has=function(key){return this._iter.includes(key);};ToSetSequence.prototype.__iterate=function(fn,reverse){var this$0=this;return this._iter.__iterate(function(v){return fn(v,v,this$0);},reverse);};ToSetSequence.prototype.__iterator=function(type,reverse){var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);return new Iterator(function(){var step=iterator.next();return step.done?step:iteratorValue(type,step.value,step.value,step);});};createClass(FromEntriesSequence,KeyedSeq);function FromEntriesSequence(entries){this._iter=entries;this.size=entries.size;}FromEntriesSequence.prototype.entrySeq=function(){return this._iter.toSeq();};FromEntriesSequence.prototype.__iterate=function(fn,reverse){var this$0=this;return this._iter.__iterate(function(entry){// Check if entry exists first so array access doesn't throw for holes
	// in the parent iteration.
	if(entry){validateEntry(entry);var indexedIterable=isIterable(entry);return fn(indexedIterable?entry.get(1):entry[1],indexedIterable?entry.get(0):entry[0],this$0);}},reverse);};FromEntriesSequence.prototype.__iterator=function(type,reverse){var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);return new Iterator(function(){while(true){var step=iterator.next();if(step.done){return step;}var entry=step.value;// Check if entry exists first so array access doesn't throw for holes
	// in the parent iteration.
	if(entry){validateEntry(entry);var indexedIterable=isIterable(entry);return iteratorValue(type,indexedIterable?entry.get(0):entry[0],indexedIterable?entry.get(1):entry[1],step);}}});};ToIndexedSequence.prototype.cacheResult=ToKeyedSequence.prototype.cacheResult=ToSetSequence.prototype.cacheResult=FromEntriesSequence.prototype.cacheResult=cacheResultThrough;function flipFactory(iterable){var flipSequence=makeSequence(iterable);flipSequence._iter=iterable;flipSequence.size=iterable.size;flipSequence.flip=function(){return iterable;};flipSequence.reverse=function(){var reversedSequence=iterable.reverse.apply(this);// super.reverse()
	reversedSequence.flip=function(){return iterable.reverse();};return reversedSequence;};flipSequence.has=function(key){return iterable.includes(key);};flipSequence.includes=function(key){return iterable.has(key);};flipSequence.cacheResult=cacheResultThrough;flipSequence.__iterateUncached=function(fn,reverse){var this$0=this;return iterable.__iterate(function(v,k){return fn(k,v,this$0)!==false;},reverse);};flipSequence.__iteratorUncached=function(type,reverse){if(type===ITERATE_ENTRIES){var iterator=iterable.__iterator(type,reverse);return new Iterator(function(){var step=iterator.next();if(!step.done){var k=step.value[0];step.value[0]=step.value[1];step.value[1]=k;}return step;});}return iterable.__iterator(type===ITERATE_VALUES?ITERATE_KEYS:ITERATE_VALUES,reverse);};return flipSequence;}function mapFactory(iterable,mapper,context){var mappedSequence=makeSequence(iterable);mappedSequence.size=iterable.size;mappedSequence.has=function(key){return iterable.has(key);};mappedSequence.get=function(key,notSetValue){var v=iterable.get(key,NOT_SET);return v===NOT_SET?notSetValue:mapper.call(context,v,key,iterable);};mappedSequence.__iterateUncached=function(fn,reverse){var this$0=this;return iterable.__iterate(function(v,k,c){return fn(mapper.call(context,v,k,c),k,this$0)!==false;},reverse);};mappedSequence.__iteratorUncached=function(type,reverse){var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);return new Iterator(function(){var step=iterator.next();if(step.done){return step;}var entry=step.value;var key=entry[0];return iteratorValue(type,key,mapper.call(context,entry[1],key,iterable),step);});};return mappedSequence;}function reverseFactory(iterable,useKeys){var reversedSequence=makeSequence(iterable);reversedSequence._iter=iterable;reversedSequence.size=iterable.size;reversedSequence.reverse=function(){return iterable;};if(iterable.flip){reversedSequence.flip=function(){var flipSequence=flipFactory(iterable);flipSequence.reverse=function(){return iterable.flip();};return flipSequence;};}reversedSequence.get=function(key,notSetValue){return iterable.get(useKeys?key:-1-key,notSetValue);};reversedSequence.has=function(key){return iterable.has(useKeys?key:-1-key);};reversedSequence.includes=function(value){return iterable.includes(value);};reversedSequence.cacheResult=cacheResultThrough;reversedSequence.__iterate=function(fn,reverse){var this$0=this;return iterable.__iterate(function(v,k){return fn(v,k,this$0);},!reverse);};reversedSequence.__iterator=function(type,reverse){return iterable.__iterator(type,!reverse);};return reversedSequence;}function filterFactory(iterable,predicate,context,useKeys){var filterSequence=makeSequence(iterable);if(useKeys){filterSequence.has=function(key){var v=iterable.get(key,NOT_SET);return v!==NOT_SET&&!!predicate.call(context,v,key,iterable);};filterSequence.get=function(key,notSetValue){var v=iterable.get(key,NOT_SET);return v!==NOT_SET&&predicate.call(context,v,key,iterable)?v:notSetValue;};}filterSequence.__iterateUncached=function(fn,reverse){var this$0=this;var iterations=0;iterable.__iterate(function(v,k,c){if(predicate.call(context,v,k,c)){iterations++;return fn(v,useKeys?k:iterations-1,this$0);}},reverse);return iterations;};filterSequence.__iteratorUncached=function(type,reverse){var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);var iterations=0;return new Iterator(function(){while(true){var step=iterator.next();if(step.done){return step;}var entry=step.value;var key=entry[0];var value=entry[1];if(predicate.call(context,value,key,iterable)){return iteratorValue(type,useKeys?key:iterations++,value,step);}}});};return filterSequence;}function countByFactory(iterable,grouper,context){var groups=Map().asMutable();iterable.__iterate(function(v,k){groups.update(grouper.call(context,v,k,iterable),0,function(a){return a+1;});});return groups.asImmutable();}function groupByFactory(iterable,grouper,context){var isKeyedIter=isKeyed(iterable);var groups=(isOrdered(iterable)?OrderedMap():Map()).asMutable();iterable.__iterate(function(v,k){groups.update(grouper.call(context,v,k,iterable),function(a){return a=a||[],a.push(isKeyedIter?[k,v]:v),a;});});var coerce=iterableClass(iterable);return groups.map(function(arr){return reify(iterable,coerce(arr));});}function sliceFactory(iterable,begin,end,useKeys){var originalSize=iterable.size;// Sanitize begin & end using this shorthand for ToInt32(argument)
	// http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	if(begin!==undefined){begin=begin|0;}if(end!==undefined){if(end===Infinity){end=originalSize;}else{end=end|0;}}if(wholeSlice(begin,end,originalSize)){return iterable;}var resolvedBegin=resolveBegin(begin,originalSize);var resolvedEnd=resolveEnd(end,originalSize);// begin or end will be NaN if they were provided as negative numbers and
	// this iterable's size is unknown. In that case, cache first so there is
	// a known size and these do not resolve to NaN.
	if(resolvedBegin!==resolvedBegin||resolvedEnd!==resolvedEnd){return sliceFactory(iterable.toSeq().cacheResult(),begin,end,useKeys);}// Note: resolvedEnd is undefined when the original sequence's length is
	// unknown and this slice did not supply an end and should contain all
	// elements after resolvedBegin.
	// In that case, resolvedSize will be NaN and sliceSize will remain undefined.
	var resolvedSize=resolvedEnd-resolvedBegin;var sliceSize;if(resolvedSize===resolvedSize){sliceSize=resolvedSize<0?0:resolvedSize;}var sliceSeq=makeSequence(iterable);// If iterable.size is undefined, the size of the realized sliceSeq is
	// unknown at this point unless the number of items to slice is 0
	sliceSeq.size=sliceSize===0?sliceSize:iterable.size&&sliceSize||undefined;if(!useKeys&&isSeq(iterable)&&sliceSize>=0){sliceSeq.get=function(index,notSetValue){index=wrapIndex(this,index);return index>=0&&index<sliceSize?iterable.get(index+resolvedBegin,notSetValue):notSetValue;};}sliceSeq.__iterateUncached=function(fn,reverse){var this$0=this;if(sliceSize===0){return 0;}if(reverse){return this.cacheResult().__iterate(fn,reverse);}var skipped=0;var isSkipping=true;var iterations=0;iterable.__iterate(function(v,k){if(!(isSkipping&&(isSkipping=skipped++<resolvedBegin))){iterations++;return fn(v,useKeys?k:iterations-1,this$0)!==false&&iterations!==sliceSize;}});return iterations;};sliceSeq.__iteratorUncached=function(type,reverse){if(sliceSize!==0&&reverse){return this.cacheResult().__iterator(type,reverse);}// Don't bother instantiating parent iterator if taking 0.
	var iterator=sliceSize!==0&&iterable.__iterator(type,reverse);var skipped=0;var iterations=0;return new Iterator(function(){while(skipped++<resolvedBegin){iterator.next();}if(++iterations>sliceSize){return iteratorDone();}var step=iterator.next();if(useKeys||type===ITERATE_VALUES){return step;}else if(type===ITERATE_KEYS){return iteratorValue(type,iterations-1,undefined,step);}else{return iteratorValue(type,iterations-1,step.value[1],step);}});};return sliceSeq;}function takeWhileFactory(iterable,predicate,context){var takeSequence=makeSequence(iterable);takeSequence.__iterateUncached=function(fn,reverse){var this$0=this;if(reverse){return this.cacheResult().__iterate(fn,reverse);}var iterations=0;iterable.__iterate(function(v,k,c){return predicate.call(context,v,k,c)&&++iterations&&fn(v,k,this$0);});return iterations;};takeSequence.__iteratorUncached=function(type,reverse){var this$0=this;if(reverse){return this.cacheResult().__iterator(type,reverse);}var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);var iterating=true;return new Iterator(function(){if(!iterating){return iteratorDone();}var step=iterator.next();if(step.done){return step;}var entry=step.value;var k=entry[0];var v=entry[1];if(!predicate.call(context,v,k,this$0)){iterating=false;return iteratorDone();}return type===ITERATE_ENTRIES?step:iteratorValue(type,k,v,step);});};return takeSequence;}function skipWhileFactory(iterable,predicate,context,useKeys){var skipSequence=makeSequence(iterable);skipSequence.__iterateUncached=function(fn,reverse){var this$0=this;if(reverse){return this.cacheResult().__iterate(fn,reverse);}var isSkipping=true;var iterations=0;iterable.__iterate(function(v,k,c){if(!(isSkipping&&(isSkipping=predicate.call(context,v,k,c)))){iterations++;return fn(v,useKeys?k:iterations-1,this$0);}});return iterations;};skipSequence.__iteratorUncached=function(type,reverse){var this$0=this;if(reverse){return this.cacheResult().__iterator(type,reverse);}var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);var skipping=true;var iterations=0;return new Iterator(function(){var step,k,v;do{step=iterator.next();if(step.done){if(useKeys||type===ITERATE_VALUES){return step;}else if(type===ITERATE_KEYS){return iteratorValue(type,iterations++,undefined,step);}else{return iteratorValue(type,iterations++,step.value[1],step);}}var entry=step.value;k=entry[0];v=entry[1];skipping&&(skipping=predicate.call(context,v,k,this$0));}while(skipping);return type===ITERATE_ENTRIES?step:iteratorValue(type,k,v,step);});};return skipSequence;}function concatFactory(iterable,values){var isKeyedIterable=isKeyed(iterable);var iters=[iterable].concat(values).map(function(v){if(!isIterable(v)){v=isKeyedIterable?keyedSeqFromValue(v):indexedSeqFromValue(Array.isArray(v)?v:[v]);}else if(isKeyedIterable){v=KeyedIterable(v);}return v;}).filter(function(v){return v.size!==0;});if(iters.length===0){return iterable;}if(iters.length===1){var singleton=iters[0];if(singleton===iterable||isKeyedIterable&&isKeyed(singleton)||isIndexed(iterable)&&isIndexed(singleton)){return singleton;}}var concatSeq=new ArraySeq(iters);if(isKeyedIterable){concatSeq=concatSeq.toKeyedSeq();}else if(!isIndexed(iterable)){concatSeq=concatSeq.toSetSeq();}concatSeq=concatSeq.flatten(true);concatSeq.size=iters.reduce(function(sum,seq){if(sum!==undefined){var size=seq.size;if(size!==undefined){return sum+size;}}},0);return concatSeq;}function flattenFactory(iterable,depth,useKeys){var flatSequence=makeSequence(iterable);flatSequence.__iterateUncached=function(fn,reverse){var iterations=0;var stopped=false;function flatDeep(iter,currentDepth){var this$0=this;iter.__iterate(function(v,k){if((!depth||currentDepth<depth)&&isIterable(v)){flatDeep(v,currentDepth+1);}else if(fn(v,useKeys?k:iterations++,this$0)===false){stopped=true;}return!stopped;},reverse);}flatDeep(iterable,0);return iterations;};flatSequence.__iteratorUncached=function(type,reverse){var iterator=iterable.__iterator(type,reverse);var stack=[];var iterations=0;return new Iterator(function(){while(iterator){var step=iterator.next();if(step.done!==false){iterator=stack.pop();continue;}var v=step.value;if(type===ITERATE_ENTRIES){v=v[1];}if((!depth||stack.length<depth)&&isIterable(v)){stack.push(iterator);iterator=v.__iterator(type,reverse);}else{return useKeys?step:iteratorValue(type,iterations++,v,step);}}return iteratorDone();});};return flatSequence;}function flatMapFactory(iterable,mapper,context){var coerce=iterableClass(iterable);return iterable.toSeq().map(function(v,k){return coerce(mapper.call(context,v,k,iterable));}).flatten(true);}function interposeFactory(iterable,separator){var interposedSequence=makeSequence(iterable);interposedSequence.size=iterable.size&&iterable.size*2-1;interposedSequence.__iterateUncached=function(fn,reverse){var this$0=this;var iterations=0;iterable.__iterate(function(v,k){return(!iterations||fn(separator,iterations++,this$0)!==false)&&fn(v,iterations++,this$0)!==false;},reverse);return iterations;};interposedSequence.__iteratorUncached=function(type,reverse){var iterator=iterable.__iterator(ITERATE_VALUES,reverse);var iterations=0;var step;return new Iterator(function(){if(!step||iterations%2){step=iterator.next();if(step.done){return step;}}return iterations%2?iteratorValue(type,iterations++,separator):iteratorValue(type,iterations++,step.value,step);});};return interposedSequence;}function sortFactory(iterable,comparator,mapper){if(!comparator){comparator=defaultComparator;}var isKeyedIterable=isKeyed(iterable);var index=0;var entries=iterable.toSeq().map(function(v,k){return[k,v,index++,mapper?mapper(v,k,iterable):v];}).toArray();entries.sort(function(a,b){return comparator(a[3],b[3])||a[2]-b[2];}).forEach(isKeyedIterable?function(v,i){entries[i].length=2;}:function(v,i){entries[i]=v[1];});return isKeyedIterable?KeyedSeq(entries):isIndexed(iterable)?IndexedSeq(entries):SetSeq(entries);}function maxFactory(iterable,comparator,mapper){if(!comparator){comparator=defaultComparator;}if(mapper){var entry=iterable.toSeq().map(function(v,k){return[v,mapper(v,k,iterable)];}).reduce(function(a,b){return maxCompare(comparator,a[1],b[1])?b:a;});return entry&&entry[0];}else{return iterable.reduce(function(a,b){return maxCompare(comparator,a,b)?b:a;});}}function maxCompare(comparator,a,b){var comp=comparator(b,a);// b is considered the new max if the comparator declares them equal, but
	// they are not equal and b is in fact a nullish value.
	return comp===0&&b!==a&&(b===undefined||b===null||b!==b)||comp>0;}function zipWithFactory(keyIter,zipper,iters){var zipSequence=makeSequence(keyIter);zipSequence.size=new ArraySeq(iters).map(function(i){return i.size;}).min();// Note: this a generic base implementation of __iterate in terms of
	// __iterator which may be more generically useful in the future.
	zipSequence.__iterate=function(fn,reverse){/* generic:
	      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        iterations++;
	        if (fn(step.value[1], step.value[0], this) === false) {
	          break;
	        }
	      }
	      return iterations;
	      */// indexed:
	var iterator=this.__iterator(ITERATE_VALUES,reverse);var step;var iterations=0;while(!(step=iterator.next()).done){if(fn(step.value,iterations++,this)===false){break;}}return iterations;};zipSequence.__iteratorUncached=function(type,reverse){var iterators=iters.map(function(i){return i=Iterable(i),getIterator(reverse?i.reverse():i);});var iterations=0;var isDone=false;return new Iterator(function(){var steps;if(!isDone){steps=iterators.map(function(i){return i.next();});isDone=steps.some(function(s){return s.done;});}if(isDone){return iteratorDone();}return iteratorValue(type,iterations++,zipper.apply(null,steps.map(function(s){return s.value;})));});};return zipSequence;}// #pragma Helper Functions
	function reify(iter,seq){return isSeq(iter)?seq:iter.constructor(seq);}function validateEntry(entry){if(entry!==Object(entry)){throw new TypeError('Expected [K, V] tuple: '+entry);}}function resolveSize(iter){assertNotInfinite(iter.size);return ensureSize(iter);}function iterableClass(iterable){return isKeyed(iterable)?KeyedIterable:isIndexed(iterable)?IndexedIterable:SetIterable;}function makeSequence(iterable){return Object.create((isKeyed(iterable)?KeyedSeq:isIndexed(iterable)?IndexedSeq:SetSeq).prototype);}function cacheResultThrough(){if(this._iter.cacheResult){this._iter.cacheResult();this.size=this._iter.size;return this;}else{return Seq.prototype.cacheResult.call(this);}}function defaultComparator(a,b){return a>b?1:a<b?-1:0;}function forceIterator(keyPath){var iter=getIterator(keyPath);if(!iter){// Array might not be iterable in this environment, so we need a fallback
	// to our wrapped type.
	if(!isArrayLike(keyPath)){throw new TypeError('Expected iterable or array-like: '+keyPath);}iter=getIterator(Iterable(keyPath));}return iter;}createClass(Record,KeyedCollection);function Record(defaultValues,name){var hasInitialized;var RecordType=function Record(values){if(values instanceof RecordType){return values;}if(!(this instanceof RecordType)){return new RecordType(values);}if(!hasInitialized){hasInitialized=true;var keys=Object.keys(defaultValues);setProps(RecordTypePrototype,keys);RecordTypePrototype.size=keys.length;RecordTypePrototype._name=name;RecordTypePrototype._keys=keys;RecordTypePrototype._defaultValues=defaultValues;}this._map=Map(values);};var RecordTypePrototype=RecordType.prototype=Object.create(RecordPrototype);RecordTypePrototype.constructor=RecordType;return RecordType;}Record.prototype.toString=function(){return this.__toString(recordName(this)+' {','}');};// @pragma Access
	Record.prototype.has=function(k){return this._defaultValues.hasOwnProperty(k);};Record.prototype.get=function(k,notSetValue){if(!this.has(k)){return notSetValue;}var defaultVal=this._defaultValues[k];return this._map?this._map.get(k,defaultVal):defaultVal;};// @pragma Modification
	Record.prototype.clear=function(){if(this.__ownerID){this._map&&this._map.clear();return this;}var RecordType=this.constructor;return RecordType._empty||(RecordType._empty=makeRecord(this,emptyMap()));};Record.prototype.set=function(k,v){if(!this.has(k)){throw new Error('Cannot set unknown key "'+k+'" on '+recordName(this));}if(this._map&&!this._map.has(k)){var defaultVal=this._defaultValues[k];if(v===defaultVal){return this;}}var newMap=this._map&&this._map.set(k,v);if(this.__ownerID||newMap===this._map){return this;}return makeRecord(this,newMap);};Record.prototype.remove=function(k){if(!this.has(k)){return this;}var newMap=this._map&&this._map.remove(k);if(this.__ownerID||newMap===this._map){return this;}return makeRecord(this,newMap);};Record.prototype.wasAltered=function(){return this._map.wasAltered();};Record.prototype.__iterator=function(type,reverse){var this$0=this;return KeyedIterable(this._defaultValues).map(function(_,k){return this$0.get(k);}).__iterator(type,reverse);};Record.prototype.__iterate=function(fn,reverse){var this$0=this;return KeyedIterable(this._defaultValues).map(function(_,k){return this$0.get(k);}).__iterate(fn,reverse);};Record.prototype.__ensureOwner=function(ownerID){if(ownerID===this.__ownerID){return this;}var newMap=this._map&&this._map.__ensureOwner(ownerID);if(!ownerID){this.__ownerID=ownerID;this._map=newMap;return this;}return makeRecord(this,newMap,ownerID);};var RecordPrototype=Record.prototype;RecordPrototype[DELETE]=RecordPrototype.remove;RecordPrototype.deleteIn=RecordPrototype.removeIn=MapPrototype.removeIn;RecordPrototype.merge=MapPrototype.merge;RecordPrototype.mergeWith=MapPrototype.mergeWith;RecordPrototype.mergeIn=MapPrototype.mergeIn;RecordPrototype.mergeDeep=MapPrototype.mergeDeep;RecordPrototype.mergeDeepWith=MapPrototype.mergeDeepWith;RecordPrototype.mergeDeepIn=MapPrototype.mergeDeepIn;RecordPrototype.setIn=MapPrototype.setIn;RecordPrototype.update=MapPrototype.update;RecordPrototype.updateIn=MapPrototype.updateIn;RecordPrototype.withMutations=MapPrototype.withMutations;RecordPrototype.asMutable=MapPrototype.asMutable;RecordPrototype.asImmutable=MapPrototype.asImmutable;function makeRecord(likeRecord,map,ownerID){var record=Object.create(Object.getPrototypeOf(likeRecord));record._map=map;record.__ownerID=ownerID;return record;}function recordName(record){return record._name||record.constructor.name||'Record';}function setProps(prototype,names){try{names.forEach(setProp.bind(undefined,prototype));}catch(error){// Object.defineProperty failed. Probably IE8.
	}}function setProp(prototype,name){Object.defineProperty(prototype,name,{get:function get(){return this.get(name);},set:function set(value){invariant(this.__ownerID,'Cannot set on an immutable record.');this.set(name,value);}});}createClass(Set,SetCollection);// @pragma Construction
	function Set(value){return value===null||value===undefined?emptySet():isSet(value)&&!isOrdered(value)?value:emptySet().withMutations(function(set){var iter=SetIterable(value);assertNotInfinite(iter.size);iter.forEach(function(v){return set.add(v);});});}Set.of=function()/*...values*/{return this(arguments);};Set.fromKeys=function(value){return this(KeyedIterable(value).keySeq());};Set.prototype.toString=function(){return this.__toString('Set {','}');};// @pragma Access
	Set.prototype.has=function(value){return this._map.has(value);};// @pragma Modification
	Set.prototype.add=function(value){return updateSet(this,this._map.set(value,true));};Set.prototype.remove=function(value){return updateSet(this,this._map.remove(value));};Set.prototype.clear=function(){return updateSet(this,this._map.clear());};// @pragma Composition
	Set.prototype.union=function(){var iters=SLICE$0.call(arguments,0);iters=iters.filter(function(x){return x.size!==0;});if(iters.length===0){return this;}if(this.size===0&&!this.__ownerID&&iters.length===1){return this.constructor(iters[0]);}return this.withMutations(function(set){for(var ii=0;ii<iters.length;ii++){SetIterable(iters[ii]).forEach(function(value){return set.add(value);});}});};Set.prototype.intersect=function(){var iters=SLICE$0.call(arguments,0);if(iters.length===0){return this;}iters=iters.map(function(iter){return SetIterable(iter);});var originalSet=this;return this.withMutations(function(set){originalSet.forEach(function(value){if(!iters.every(function(iter){return iter.includes(value);})){set.remove(value);}});});};Set.prototype.subtract=function(){var iters=SLICE$0.call(arguments,0);if(iters.length===0){return this;}iters=iters.map(function(iter){return SetIterable(iter);});var originalSet=this;return this.withMutations(function(set){originalSet.forEach(function(value){if(iters.some(function(iter){return iter.includes(value);})){set.remove(value);}});});};Set.prototype.merge=function(){return this.union.apply(this,arguments);};Set.prototype.mergeWith=function(merger){var iters=SLICE$0.call(arguments,1);return this.union.apply(this,iters);};Set.prototype.sort=function(comparator){// Late binding
	return OrderedSet(sortFactory(this,comparator));};Set.prototype.sortBy=function(mapper,comparator){// Late binding
	return OrderedSet(sortFactory(this,comparator,mapper));};Set.prototype.wasAltered=function(){return this._map.wasAltered();};Set.prototype.__iterate=function(fn,reverse){var this$0=this;return this._map.__iterate(function(_,k){return fn(k,k,this$0);},reverse);};Set.prototype.__iterator=function(type,reverse){return this._map.map(function(_,k){return k;}).__iterator(type,reverse);};Set.prototype.__ensureOwner=function(ownerID){if(ownerID===this.__ownerID){return this;}var newMap=this._map.__ensureOwner(ownerID);if(!ownerID){this.__ownerID=ownerID;this._map=newMap;return this;}return this.__make(newMap,ownerID);};function isSet(maybeSet){return!!(maybeSet&&maybeSet[IS_SET_SENTINEL]);}Set.isSet=isSet;var IS_SET_SENTINEL='@@__IMMUTABLE_SET__@@';var SetPrototype=Set.prototype;SetPrototype[IS_SET_SENTINEL]=true;SetPrototype[DELETE]=SetPrototype.remove;SetPrototype.mergeDeep=SetPrototype.merge;SetPrototype.mergeDeepWith=SetPrototype.mergeWith;SetPrototype.withMutations=MapPrototype.withMutations;SetPrototype.asMutable=MapPrototype.asMutable;SetPrototype.asImmutable=MapPrototype.asImmutable;SetPrototype.__empty=emptySet;SetPrototype.__make=makeSet;function updateSet(set,newMap){if(set.__ownerID){set.size=newMap.size;set._map=newMap;return set;}return newMap===set._map?set:newMap.size===0?set.__empty():set.__make(newMap);}function makeSet(map,ownerID){var set=Object.create(SetPrototype);set.size=map?map.size:0;set._map=map;set.__ownerID=ownerID;return set;}var EMPTY_SET;function emptySet(){return EMPTY_SET||(EMPTY_SET=makeSet(emptyMap()));}createClass(OrderedSet,Set);// @pragma Construction
	function OrderedSet(value){return value===null||value===undefined?emptyOrderedSet():isOrderedSet(value)?value:emptyOrderedSet().withMutations(function(set){var iter=SetIterable(value);assertNotInfinite(iter.size);iter.forEach(function(v){return set.add(v);});});}OrderedSet.of=function()/*...values*/{return this(arguments);};OrderedSet.fromKeys=function(value){return this(KeyedIterable(value).keySeq());};OrderedSet.prototype.toString=function(){return this.__toString('OrderedSet {','}');};function isOrderedSet(maybeOrderedSet){return isSet(maybeOrderedSet)&&isOrdered(maybeOrderedSet);}OrderedSet.isOrderedSet=isOrderedSet;var OrderedSetPrototype=OrderedSet.prototype;OrderedSetPrototype[IS_ORDERED_SENTINEL]=true;OrderedSetPrototype.__empty=emptyOrderedSet;OrderedSetPrototype.__make=makeOrderedSet;function makeOrderedSet(map,ownerID){var set=Object.create(OrderedSetPrototype);set.size=map?map.size:0;set._map=map;set.__ownerID=ownerID;return set;}var EMPTY_ORDERED_SET;function emptyOrderedSet(){return EMPTY_ORDERED_SET||(EMPTY_ORDERED_SET=makeOrderedSet(emptyOrderedMap()));}createClass(Stack,IndexedCollection);// @pragma Construction
	function Stack(value){return value===null||value===undefined?emptyStack():isStack(value)?value:emptyStack().unshiftAll(value);}Stack.of=function()/*...values*/{return this(arguments);};Stack.prototype.toString=function(){return this.__toString('Stack [',']');};// @pragma Access
	Stack.prototype.get=function(index,notSetValue){var head=this._head;index=wrapIndex(this,index);while(head&&index--){head=head.next;}return head?head.value:notSetValue;};Stack.prototype.peek=function(){return this._head&&this._head.value;};// @pragma Modification
	Stack.prototype.push=function()/*...values*/{if(arguments.length===0){return this;}var newSize=this.size+arguments.length;var head=this._head;for(var ii=arguments.length-1;ii>=0;ii--){head={value:arguments[ii],next:head};}if(this.__ownerID){this.size=newSize;this._head=head;this.__hash=undefined;this.__altered=true;return this;}return makeStack(newSize,head);};Stack.prototype.pushAll=function(iter){iter=IndexedIterable(iter);if(iter.size===0){return this;}assertNotInfinite(iter.size);var newSize=this.size;var head=this._head;iter.reverse().forEach(function(value){newSize++;head={value:value,next:head};});if(this.__ownerID){this.size=newSize;this._head=head;this.__hash=undefined;this.__altered=true;return this;}return makeStack(newSize,head);};Stack.prototype.pop=function(){return this.slice(1);};Stack.prototype.unshift=function()/*...values*/{return this.push.apply(this,arguments);};Stack.prototype.unshiftAll=function(iter){return this.pushAll(iter);};Stack.prototype.shift=function(){return this.pop.apply(this,arguments);};Stack.prototype.clear=function(){if(this.size===0){return this;}if(this.__ownerID){this.size=0;this._head=undefined;this.__hash=undefined;this.__altered=true;return this;}return emptyStack();};Stack.prototype.slice=function(begin,end){if(wholeSlice(begin,end,this.size)){return this;}var resolvedBegin=resolveBegin(begin,this.size);var resolvedEnd=resolveEnd(end,this.size);if(resolvedEnd!==this.size){// super.slice(begin, end);
	return IndexedCollection.prototype.slice.call(this,begin,end);}var newSize=this.size-resolvedBegin;var head=this._head;while(resolvedBegin--){head=head.next;}if(this.__ownerID){this.size=newSize;this._head=head;this.__hash=undefined;this.__altered=true;return this;}return makeStack(newSize,head);};// @pragma Mutability
	Stack.prototype.__ensureOwner=function(ownerID){if(ownerID===this.__ownerID){return this;}if(!ownerID){this.__ownerID=ownerID;this.__altered=false;return this;}return makeStack(this.size,this._head,ownerID,this.__hash);};// @pragma Iteration
	Stack.prototype.__iterate=function(fn,reverse){if(reverse){return this.reverse().__iterate(fn);}var iterations=0;var node=this._head;while(node){if(fn(node.value,iterations++,this)===false){break;}node=node.next;}return iterations;};Stack.prototype.__iterator=function(type,reverse){if(reverse){return this.reverse().__iterator(type);}var iterations=0;var node=this._head;return new Iterator(function(){if(node){var value=node.value;node=node.next;return iteratorValue(type,iterations++,value);}return iteratorDone();});};function isStack(maybeStack){return!!(maybeStack&&maybeStack[IS_STACK_SENTINEL]);}Stack.isStack=isStack;var IS_STACK_SENTINEL='@@__IMMUTABLE_STACK__@@';var StackPrototype=Stack.prototype;StackPrototype[IS_STACK_SENTINEL]=true;StackPrototype.withMutations=MapPrototype.withMutations;StackPrototype.asMutable=MapPrototype.asMutable;StackPrototype.asImmutable=MapPrototype.asImmutable;StackPrototype.wasAltered=MapPrototype.wasAltered;function makeStack(size,head,ownerID,hash){var map=Object.create(StackPrototype);map.size=size;map._head=head;map.__ownerID=ownerID;map.__hash=hash;map.__altered=false;return map;}var EMPTY_STACK;function emptyStack(){return EMPTY_STACK||(EMPTY_STACK=makeStack(0));}/**
	   * Contributes additional methods to a constructor
	   */function mixin(ctor,methods){var keyCopier=function keyCopier(key){ctor.prototype[key]=methods[key];};Object.keys(methods).forEach(keyCopier);Object.getOwnPropertySymbols&&Object.getOwnPropertySymbols(methods).forEach(keyCopier);return ctor;}Iterable.Iterator=Iterator;mixin(Iterable,{// ### Conversion to other types
	toArray:function toArray(){assertNotInfinite(this.size);var array=new Array(this.size||0);this.valueSeq().__iterate(function(v,i){array[i]=v;});return array;},toIndexedSeq:function toIndexedSeq(){return new ToIndexedSequence(this);},toJS:function toJS(){return this.toSeq().map(function(value){return value&&typeof value.toJS==='function'?value.toJS():value;}).__toJS();},toJSON:function toJSON(){return this.toSeq().map(function(value){return value&&typeof value.toJSON==='function'?value.toJSON():value;}).__toJS();},toKeyedSeq:function toKeyedSeq(){return new ToKeyedSequence(this,true);},toMap:function toMap(){// Use Late Binding here to solve the circular dependency.
	return Map(this.toKeyedSeq());},toObject:function toObject(){assertNotInfinite(this.size);var object={};this.__iterate(function(v,k){object[k]=v;});return object;},toOrderedMap:function toOrderedMap(){// Use Late Binding here to solve the circular dependency.
	return OrderedMap(this.toKeyedSeq());},toOrderedSet:function toOrderedSet(){// Use Late Binding here to solve the circular dependency.
	return OrderedSet(isKeyed(this)?this.valueSeq():this);},toSet:function toSet(){// Use Late Binding here to solve the circular dependency.
	return Set(isKeyed(this)?this.valueSeq():this);},toSetSeq:function toSetSeq(){return new ToSetSequence(this);},toSeq:function toSeq(){return isIndexed(this)?this.toIndexedSeq():isKeyed(this)?this.toKeyedSeq():this.toSetSeq();},toStack:function toStack(){// Use Late Binding here to solve the circular dependency.
	return Stack(isKeyed(this)?this.valueSeq():this);},toList:function toList(){// Use Late Binding here to solve the circular dependency.
	return List(isKeyed(this)?this.valueSeq():this);},// ### Common JavaScript methods and properties
	toString:function toString(){return'[Iterable]';},__toString:function __toString(head,tail){if(this.size===0){return head+tail;}return head+' '+this.toSeq().map(this.__toStringMapper).join(', ')+' '+tail;},// ### ES6 Collection methods (ES6 Array and Map)
	concat:function concat(){var values=SLICE$0.call(arguments,0);return reify(this,concatFactory(this,values));},includes:function includes(searchValue){return this.some(function(value){return is(value,searchValue);});},entries:function entries(){return this.__iterator(ITERATE_ENTRIES);},every:function every(predicate,context){assertNotInfinite(this.size);var returnValue=true;this.__iterate(function(v,k,c){if(!predicate.call(context,v,k,c)){returnValue=false;return false;}});return returnValue;},filter:function filter(predicate,context){return reify(this,filterFactory(this,predicate,context,true));},find:function find(predicate,context,notSetValue){var entry=this.findEntry(predicate,context);return entry?entry[1]:notSetValue;},forEach:function forEach(sideEffect,context){assertNotInfinite(this.size);return this.__iterate(context?sideEffect.bind(context):sideEffect);},join:function join(separator){assertNotInfinite(this.size);separator=separator!==undefined?''+separator:',';var joined='';var isFirst=true;this.__iterate(function(v){isFirst?isFirst=false:joined+=separator;joined+=v!==null&&v!==undefined?v.toString():'';});return joined;},keys:function keys(){return this.__iterator(ITERATE_KEYS);},map:function map(mapper,context){return reify(this,mapFactory(this,mapper,context));},reduce:function reduce(reducer,initialReduction,context){assertNotInfinite(this.size);var reduction;var useFirst;if(arguments.length<2){useFirst=true;}else{reduction=initialReduction;}this.__iterate(function(v,k,c){if(useFirst){useFirst=false;reduction=v;}else{reduction=reducer.call(context,reduction,v,k,c);}});return reduction;},reduceRight:function reduceRight(reducer,initialReduction,context){var reversed=this.toKeyedSeq().reverse();return reversed.reduce.apply(reversed,arguments);},reverse:function reverse(){return reify(this,reverseFactory(this,true));},slice:function slice(begin,end){return reify(this,sliceFactory(this,begin,end,true));},some:function some(predicate,context){return!this.every(not(predicate),context);},sort:function sort(comparator){return reify(this,sortFactory(this,comparator));},values:function values(){return this.__iterator(ITERATE_VALUES);},// ### More sequential methods
	butLast:function butLast(){return this.slice(0,-1);},isEmpty:function isEmpty(){return this.size!==undefined?this.size===0:!this.some(function(){return true;});},count:function count(predicate,context){return ensureSize(predicate?this.toSeq().filter(predicate,context):this);},countBy:function countBy(grouper,context){return countByFactory(this,grouper,context);},equals:function equals(other){return deepEqual(this,other);},entrySeq:function entrySeq(){var iterable=this;if(iterable._cache){// We cache as an entries array, so we can just return the cache!
	return new ArraySeq(iterable._cache);}var entriesSequence=iterable.toSeq().map(entryMapper).toIndexedSeq();entriesSequence.fromEntrySeq=function(){return iterable.toSeq();};return entriesSequence;},filterNot:function filterNot(predicate,context){return this.filter(not(predicate),context);},findEntry:function findEntry(predicate,context,notSetValue){var found=notSetValue;this.__iterate(function(v,k,c){if(predicate.call(context,v,k,c)){found=[k,v];return false;}});return found;},findKey:function findKey(predicate,context){var entry=this.findEntry(predicate,context);return entry&&entry[0];},findLast:function findLast(predicate,context,notSetValue){return this.toKeyedSeq().reverse().find(predicate,context,notSetValue);},findLastEntry:function findLastEntry(predicate,context,notSetValue){return this.toKeyedSeq().reverse().findEntry(predicate,context,notSetValue);},findLastKey:function findLastKey(predicate,context){return this.toKeyedSeq().reverse().findKey(predicate,context);},first:function first(){return this.find(returnTrue);},flatMap:function flatMap(mapper,context){return reify(this,flatMapFactory(this,mapper,context));},flatten:function flatten(depth){return reify(this,flattenFactory(this,depth,true));},fromEntrySeq:function fromEntrySeq(){return new FromEntriesSequence(this);},get:function get(searchKey,notSetValue){return this.find(function(_,key){return is(key,searchKey);},undefined,notSetValue);},getIn:function getIn(searchKeyPath,notSetValue){var nested=this;// Note: in an ES6 environment, we would prefer:
	// for (var key of searchKeyPath) {
	var iter=forceIterator(searchKeyPath);var step;while(!(step=iter.next()).done){var key=step.value;nested=nested&&nested.get?nested.get(key,NOT_SET):NOT_SET;if(nested===NOT_SET){return notSetValue;}}return nested;},groupBy:function groupBy(grouper,context){return groupByFactory(this,grouper,context);},has:function has(searchKey){return this.get(searchKey,NOT_SET)!==NOT_SET;},hasIn:function hasIn(searchKeyPath){return this.getIn(searchKeyPath,NOT_SET)!==NOT_SET;},isSubset:function isSubset(iter){iter=typeof iter.includes==='function'?iter:Iterable(iter);return this.every(function(value){return iter.includes(value);});},isSuperset:function isSuperset(iter){iter=typeof iter.isSubset==='function'?iter:Iterable(iter);return iter.isSubset(this);},keyOf:function keyOf(searchValue){return this.findKey(function(value){return is(value,searchValue);});},keySeq:function keySeq(){return this.toSeq().map(keyMapper).toIndexedSeq();},last:function last(){return this.toSeq().reverse().first();},lastKeyOf:function lastKeyOf(searchValue){return this.toKeyedSeq().reverse().keyOf(searchValue);},max:function max(comparator){return maxFactory(this,comparator);},maxBy:function maxBy(mapper,comparator){return maxFactory(this,comparator,mapper);},min:function min(comparator){return maxFactory(this,comparator?neg(comparator):defaultNegComparator);},minBy:function minBy(mapper,comparator){return maxFactory(this,comparator?neg(comparator):defaultNegComparator,mapper);},rest:function rest(){return this.slice(1);},skip:function skip(amount){return this.slice(Math.max(0,amount));},skipLast:function skipLast(amount){return reify(this,this.toSeq().reverse().skip(amount).reverse());},skipWhile:function skipWhile(predicate,context){return reify(this,skipWhileFactory(this,predicate,context,true));},skipUntil:function skipUntil(predicate,context){return this.skipWhile(not(predicate),context);},sortBy:function sortBy(mapper,comparator){return reify(this,sortFactory(this,comparator,mapper));},take:function take(amount){return this.slice(0,Math.max(0,amount));},takeLast:function takeLast(amount){return reify(this,this.toSeq().reverse().take(amount).reverse());},takeWhile:function takeWhile(predicate,context){return reify(this,takeWhileFactory(this,predicate,context));},takeUntil:function takeUntil(predicate,context){return this.takeWhile(not(predicate),context);},valueSeq:function valueSeq(){return this.toIndexedSeq();},// ### Hashable Object
	hashCode:function hashCode(){return this.__hash||(this.__hash=hashIterable(this));}// ### Internal
	// abstract __iterate(fn, reverse)
	// abstract __iterator(type, reverse)
	});// var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	// var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	// var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	// var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';
	var IterablePrototype=Iterable.prototype;IterablePrototype[IS_ITERABLE_SENTINEL]=true;IterablePrototype[ITERATOR_SYMBOL]=IterablePrototype.values;IterablePrototype.__toJS=IterablePrototype.toArray;IterablePrototype.__toStringMapper=quoteString;IterablePrototype.inspect=IterablePrototype.toSource=function(){return this.toString();};IterablePrototype.chain=IterablePrototype.flatMap;IterablePrototype.contains=IterablePrototype.includes;mixin(KeyedIterable,{// ### More sequential methods
	flip:function flip(){return reify(this,flipFactory(this));},mapEntries:function mapEntries(mapper,context){var this$0=this;var iterations=0;return reify(this,this.toSeq().map(function(v,k){return mapper.call(context,[k,v],iterations++,this$0);}).fromEntrySeq());},mapKeys:function mapKeys(mapper,context){var this$0=this;return reify(this,this.toSeq().flip().map(function(k,v){return mapper.call(context,k,v,this$0);}).flip());}});var KeyedIterablePrototype=KeyedIterable.prototype;KeyedIterablePrototype[IS_KEYED_SENTINEL]=true;KeyedIterablePrototype[ITERATOR_SYMBOL]=IterablePrototype.entries;KeyedIterablePrototype.__toJS=IterablePrototype.toObject;KeyedIterablePrototype.__toStringMapper=function(v,k){return JSON.stringify(k)+': '+quoteString(v);};mixin(IndexedIterable,{// ### Conversion to other types
	toKeyedSeq:function toKeyedSeq(){return new ToKeyedSequence(this,false);},// ### ES6 Collection methods (ES6 Array and Map)
	filter:function filter(predicate,context){return reify(this,filterFactory(this,predicate,context,false));},findIndex:function findIndex(predicate,context){var entry=this.findEntry(predicate,context);return entry?entry[0]:-1;},indexOf:function indexOf(searchValue){var key=this.keyOf(searchValue);return key===undefined?-1:key;},lastIndexOf:function lastIndexOf(searchValue){var key=this.lastKeyOf(searchValue);return key===undefined?-1:key;},reverse:function reverse(){return reify(this,reverseFactory(this,false));},slice:function slice(begin,end){return reify(this,sliceFactory(this,begin,end,false));},splice:function splice(index,removeNum/*, ...values*/){var numArgs=arguments.length;removeNum=Math.max(removeNum|0,0);if(numArgs===0||numArgs===2&&!removeNum){return this;}// If index is negative, it should resolve relative to the size of the
	// collection. However size may be expensive to compute if not cached, so
	// only call count() if the number is in fact negative.
	index=resolveBegin(index,index<0?this.count():this.size);var spliced=this.slice(0,index);return reify(this,numArgs===1?spliced:spliced.concat(arrCopy(arguments,2),this.slice(index+removeNum)));},// ### More collection methods
	findLastIndex:function findLastIndex(predicate,context){var entry=this.findLastEntry(predicate,context);return entry?entry[0]:-1;},first:function first(){return this.get(0);},flatten:function flatten(depth){return reify(this,flattenFactory(this,depth,false));},get:function get(index,notSetValue){index=wrapIndex(this,index);return index<0||this.size===Infinity||this.size!==undefined&&index>this.size?notSetValue:this.find(function(_,key){return key===index;},undefined,notSetValue);},has:function has(index){index=wrapIndex(this,index);return index>=0&&(this.size!==undefined?this.size===Infinity||index<this.size:this.indexOf(index)!==-1);},interpose:function interpose(separator){return reify(this,interposeFactory(this,separator));},interleave:function interleave()/*...iterables*/{var iterables=[this].concat(arrCopy(arguments));var zipped=zipWithFactory(this.toSeq(),IndexedSeq.of,iterables);var interleaved=zipped.flatten(true);if(zipped.size){interleaved.size=zipped.size*iterables.length;}return reify(this,interleaved);},keySeq:function keySeq(){return Range(0,this.size);},last:function last(){return this.get(-1);},skipWhile:function skipWhile(predicate,context){return reify(this,skipWhileFactory(this,predicate,context,false));},zip:function zip()/*, ...iterables */{var iterables=[this].concat(arrCopy(arguments));return reify(this,zipWithFactory(this,defaultZipper,iterables));},zipWith:function zipWith(zipper/*, ...iterables */){var iterables=arrCopy(arguments);iterables[0]=this;return reify(this,zipWithFactory(this,zipper,iterables));}});IndexedIterable.prototype[IS_INDEXED_SENTINEL]=true;IndexedIterable.prototype[IS_ORDERED_SENTINEL]=true;mixin(SetIterable,{// ### ES6 Collection methods (ES6 Array and Map)
	get:function get(value,notSetValue){return this.has(value)?value:notSetValue;},includes:function includes(value){return this.has(value);},// ### More sequential methods
	keySeq:function keySeq(){return this.valueSeq();}});SetIterable.prototype.has=IterablePrototype.includes;SetIterable.prototype.contains=SetIterable.prototype.includes;// Mixin subclasses
	mixin(KeyedSeq,KeyedIterable.prototype);mixin(IndexedSeq,IndexedIterable.prototype);mixin(SetSeq,SetIterable.prototype);mixin(KeyedCollection,KeyedIterable.prototype);mixin(IndexedCollection,IndexedIterable.prototype);mixin(SetCollection,SetIterable.prototype);// #pragma Helper functions
	function keyMapper(v,k){return k;}function entryMapper(v,k){return[k,v];}function not(predicate){return function(){return!predicate.apply(this,arguments);};}function neg(predicate){return function(){return-predicate.apply(this,arguments);};}function quoteString(value){return typeof value==='string'?JSON.stringify(value):String(value);}function defaultZipper(){return arrCopy(arguments);}function defaultNegComparator(a,b){return a<b?1:a>b?-1:0;}function hashIterable(iterable){if(iterable.size===Infinity){return 0;}var ordered=isOrdered(iterable);var keyed=isKeyed(iterable);var h=ordered?1:0;var size=iterable.__iterate(keyed?ordered?function(v,k){h=31*h+hashMerge(hash(v),hash(k))|0;}:function(v,k){h=h+hashMerge(hash(v),hash(k))|0;}:ordered?function(v){h=31*h+hash(v)|0;}:function(v){h=h+hash(v)|0;});return murmurHashOfSize(size,h);}function murmurHashOfSize(size,h){h=imul(h,0xCC9E2D51);h=imul(h<<15|h>>>-15,0x1B873593);h=imul(h<<13|h>>>-13,5);h=(h+0xE6546B64|0)^size;h=imul(h^h>>>16,0x85EBCA6B);h=imul(h^h>>>13,0xC2B2AE35);h=smi(h^h>>>16);return h;}function hashMerge(a,b){return a^b+0x9E3779B9+(a<<6)+(a>>2)|0;// int
	}var Immutable={Iterable:Iterable,Seq:Seq,Collection:Collection,Map:Map,OrderedMap:OrderedMap,List:List,Stack:Stack,Set:Set,OrderedSet:OrderedSet,Record:Record,Range:Range,Repeat:Repeat,is:is,fromJS:fromJS};return Immutable;});

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = sub;

	var _stringify = __webpack_require__(79);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _typify = __webpack_require__(80);

	var _typify2 = _interopRequireDefault(_typify);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function sub(lefthand, righthand) {
	  var typeL = (0, _typify2.default)(lefthand);
	  var typeR = (0, _typify2.default)(righthand);

	  if (typeL === _typify.NUMBER && typeR === _typify.NUMBER) {
	    return lefthand - righthand;
	  }

	  if (typeL === _typify.SET && typeR === _typify.SET) {
	    return lefthand.subtract(righthand);
	  }

	  throw new Error('\'' + (0, _stringify2.default)(lefthand) + ' - ' + (0, _stringify2.default)(righthand) + '\' is undefined.');
	}

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = mul;

	var _typify = __webpack_require__(80);

	var _typify2 = _interopRequireDefault(_typify);

	var _stringify = __webpack_require__(79);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function mul(lefthand, righthand) {
	  var typeL = (0, _typify2.default)(lefthand);
	  var typeR = (0, _typify2.default)(righthand);

	  if (typeL === _typify.NUMBER && typeR === _typify.NUMBER) {
	    return lefthand * righthand;
	  }

	  if (typeL === _typify.NUMBER && typeR === _typify.STRING) {
	    return righthand.repeat(lefthand);
	  }
	  if (typeL === _typify.STRING && typeR === _typify.NUMBER) {
	    return lefthand.repeat(righthand);
	  }

	  if (typeL === _typify.SET && typeR === _typify.SET) {
	    return lefthand.intersect(righthand);
	  }

	  throw new Error('\'' + (0, _stringify2.default)(lefthand) + ' * ' + (0, _stringify2.default)(righthand) + '\' is undefined.');
	}

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = gen;

	var _Generator = __webpack_require__(85);

	var _Generator2 = _interopRequireDefault(_Generator);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function gen() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return new _Generator2.default(args);
	}

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _combinations = __webpack_require__(86);

	var _combinations2 = _interopRequireDefault(_combinations);

	var _s = __webpack_require__(87);

	var _s2 = _interopRequireDefault(_s);

	var _l = __webpack_require__(88);

	var _l2 = _interopRequireDefault(_l);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var Generator = function () {
	  function Generator(iterators) {
	    _classCallCheck(this, Generator);

	    this.items = _combinations2.default.apply(undefined, _toConsumableArray(iterators.map(function (it) {
	      return it.toArray();
	    })));
	  }

	  _createClass(Generator, [{
	    key: 'map',
	    value: function map(fn) {
	      this.items = this.items.map(function (args) {
	        return fn.apply(undefined, _toConsumableArray(args));
	      });
	      return this;
	    }
	  }, {
	    key: 'filter',
	    value: function filter(fn) {
	      this.items = this.items.filter(function (args) {
	        return fn.apply(undefined, _toConsumableArray(args));
	      });
	      return this;
	    }
	  }, {
	    key: 'every',
	    value: function every(fn) {
	      return this.items.every(function (args) {
	        return fn.apply(undefined, _toConsumableArray(args));
	      });
	    }
	  }, {
	    key: 'some',
	    value: function some(fn) {
	      return this.items.some(function (args) {
	        return fn.apply(undefined, _toConsumableArray(args));
	      });
	    }
	  }, {
	    key: 'list',
	    get: function get() {
	      return _l2.default.apply(undefined, _toConsumableArray(this.items));
	    }
	  }, {
	    key: 'set',
	    get: function get() {
	      return _s2.default.apply(undefined, _toConsumableArray(this.items));
	    }
	  }]);

	  return Generator;
	}();

	exports.default = Generator;

/***/ },
/* 86 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = combinations;

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}

	function combinations() {
	  for (var _len = arguments.length, iterators = Array(_len), _key = 0; _key < _len; _key++) {
	    iterators[_key] = arguments[_key];
	  }

	  var last = iterators.pop();

	  if (iterators.length === 0) {
	    return last.map(function (x) {
	      return [x];
	    });
	  }
	  var combs = combinations.apply(undefined, iterators);
	  return combs.map(function (combination) {
	    return last.map(function (l) {
	      return [].concat(_toConsumableArray(combination), [l]);
	    });
	  }).reduce(function (p, n) {
	    return p.concat(n);
	  }, []);
	}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = s;

	var _immutable = __webpack_require__(81);

	function s() {
	  for (var _len = arguments.length, elems = Array(_len), _key = 0; _key < _len; _key++) {
	    elems[_key] = arguments[_key];
	  }

	  return (0, _immutable.Set)(elems);
	}

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = l;

	var _immutable = __webpack_require__(81);

	function l() {
	  for (var _len = arguments.length, elems = Array(_len), _key = 0; _key < _len; _key++) {
	    elems[_key] = arguments[_key];
	  }

	  return (0, _immutable.List)(elems);
	}

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	exports.default = range;

	var _immutable = __webpack_require__(81);

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var Wrapper = function () {
	  function Wrapper(range) {
	    _classCallCheck(this, Wrapper);

	    this.range = range;
	  }

	  _createClass(Wrapper, [{
	    key: 'set',
	    get: function get() {
	      return this.range.toSet();
	    }
	  }, {
	    key: 'list',
	    get: function get() {
	      return this.range.toList();
	    }
	  }]);

	  return Wrapper;
	}();

	function range(start, end, step) {
	  return new Wrapper((0, _immutable.Range)(start, end + 1, step));
	}

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = equal;

	var _immutable = __webpack_require__(81);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _typify = __webpack_require__(80);

	var _typify2 = _interopRequireDefault(_typify);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function equal(a, b) {
	  var typeA = (0, _typify2.default)(a);
	  var typeB = (0, _typify2.default)(b);

	  if (typeA !== typeB) {
	    return false;
	  }

	  if (typeA === _typify.LIST || typeA === _typify.SET) {
	    return _immutable2.default.is(a, b);
	  }

	  return a === b;
	}

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = pow;

	var _typify = __webpack_require__(80);

	var _typify2 = _interopRequireDefault(_typify);

	var _stringify = __webpack_require__(79);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _immutable = __webpack_require__(81);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * tail recursive helper without sanity checks
	 */
	function makePow(left, prev) {
	  if (left.isEmpty()) {
	    return prev;
	  }
	  var elem = left.first();
	  return makePow(left.remove(elem), prev.union(prev.map(function (e) {
	    return e.add(elem);
	  })));
	}

	/**
	 * Calculates the power of two numbers or the power set
	 */
	function pow(lhs, rhs) {
	  if ((0, _typify2.default)(rhs) === _typify.SET && lhs === 2) {
	    return makePow(rhs, _immutable.Set.of((0, _immutable.Set)()));
	  }
	  if ((0, _typify2.default)(lhs) !== _typify.NUMBER) {
	    throw new Error('Left-hand-side of \'' + (0, _stringify2.default)(lhs) + ' ** ' + (0, _stringify2.default)(rhs) + '\'' + 'is not a number.');
	  }
	  if ((0, _typify2.default)(rhs) !== _typify.NUMBER) {
	    throw new Error('Right-hand-side of \'' + (0, _stringify2.default)(lhs) + ' ** ' + (0, _stringify2.default)(rhs) + '\'' + 'is not a number.');
	  }
	  return Math.pow(lhs, rhs);
	}

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = lte;

	var _lt = __webpack_require__(93);

	var _lt2 = _interopRequireDefault(_lt);

	var _equal = __webpack_require__(90);

	var _equal2 = _interopRequireDefault(_equal);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function lte(a, b) {
	  return (0, _equal2.default)(a, b) || (0, _lt2.default)(a, b);
	}

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = lt;

	var _typify = __webpack_require__(80);

	var _typify2 = _interopRequireDefault(_typify);

	var _stringify = __webpack_require__(79);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function lt(a, b) {
	  var typeA = (0, _typify2.default)(a);
	  var typeB = (0, _typify2.default)(b);

	  if (typeA !== typeB) {
	    throw new Error('Types must match: \'' + (0, _stringify2.default)(a) + ' < ' + (0, _stringify2.default)(b) + '\'');
	  }
	  if (typeA === _typify.SET) {
	    return !a.equals(b) && a.isSubset(b);
	  }
	  if (typeA === _typify.NUMBER) {
	    return a < b;
	  }
	  throw new Error('\'' + (0, _stringify2.default)(a) + ' < ' + (0, _stringify2.default)(b) + '\' is undefined.');
	}

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = gte;

	var _lte = __webpack_require__(92);

	var _lte2 = _interopRequireDefault(_lte);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function gte(a, b) {
	  return (0, _lte2.default)(b, a);
	}

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = gt;

	var _lt = __webpack_require__(93);

	var _lt2 = _interopRequireDefault(_lt);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function gt(a, b) {
	  return (0, _lt2.default)(b, a);
	}

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isBoolean = exports.isSet = exports.isList = exports.isProcedure = exports.isString = exports.isDouble = exports.isInteger = exports.arb = exports.cos = exports.abs = exports.print = undefined;

	var _print2 = __webpack_require__(97);

	var _print3 = _interopRequireDefault(_print2);

	var _abs2 = __webpack_require__(98);

	var _abs3 = _interopRequireDefault(_abs2);

	var _cos2 = __webpack_require__(99);

	var _cos3 = _interopRequireDefault(_cos2);

	var _arb2 = __webpack_require__(100);

	var _arb3 = _interopRequireDefault(_arb2);

	var _isInteger2 = __webpack_require__(101);

	var _isInteger3 = _interopRequireDefault(_isInteger2);

	var _isDouble2 = __webpack_require__(102);

	var _isDouble3 = _interopRequireDefault(_isDouble2);

	var _isString2 = __webpack_require__(103);

	var _isString3 = _interopRequireDefault(_isString2);

	var _isProcedure2 = __webpack_require__(104);

	var _isProcedure3 = _interopRequireDefault(_isProcedure2);

	var _isList2 = __webpack_require__(105);

	var _isList3 = _interopRequireDefault(_isList2);

	var _isSet2 = __webpack_require__(106);

	var _isSet3 = _interopRequireDefault(_isSet2);

	var _isBoolean2 = __webpack_require__(107);

	var _isBoolean3 = _interopRequireDefault(_isBoolean2);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.print = _print3.default;
	exports.abs = _abs3.default;
	exports.cos = _cos3.default;
	exports.arb = _arb3.default;
	exports.isInteger = _isInteger3.default;
	exports.isDouble = _isDouble3.default;
	exports.isString = _isString3.default;
	exports.isProcedure = _isProcedure3.default;
	exports.isList = _isList3.default;
	exports.isSet = _isSet3.default;
	exports.isBoolean = _isBoolean3.default;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = print;

	var _stringify = __webpack_require__(79);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}

	function print() {
	  var _console;

	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var stringifiedArgs = args.map(_stringify2.default);
	  (_console = console).log.apply(_console, _toConsumableArray(stringifiedArgs));
	}

/***/ },
/* 98 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = abs;
	function abs(val) {
	  return Math.abs(val);
	}

/***/ },
/* 99 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = cos;
	function cos(x) {
	  return Math.cos(x);
	}

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = arb;

	var _typify = __webpack_require__(80);

	var _typify2 = _interopRequireDefault(_typify);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function arb(val) {
	  if ([_typify.SET, _typify.LIST].indexOf((0, _typify2.default)(val)) < 0) {
	    throw new Error('arb(' + val + '): operand is no collection value.');
	  }
	  if (val.isEmpty()) {
	    return null;
	  }
	  return val.first();
	}

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isInteger;

	var _typify = __webpack_require__(80);

	var _typify2 = _interopRequireDefault(_typify);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Checks if the parameter is an integer
	 */
	function isInteger(param) {
	  return (0, _typify2.default)(param) === _typify.NUMBER && param % 1 === 0;
	}

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isDouble;

	var _typify = __webpack_require__(80);

	var _typify2 = _interopRequireDefault(_typify);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Checks if the parameter is a double
	 */
	function isDouble(param) {
	  return (0, _typify2.default)(param) === _typify.NUMBER && param % 1 !== 0;
	}

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isString;

	var _typify = __webpack_require__(80);

	var _typify2 = _interopRequireDefault(_typify);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Checks if the parameter is a string
	 */
	function isString(param) {
	  return (0, _typify2.default)(param) === _typify.STRING;
	}

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isProcedure;

	var _typify = __webpack_require__(80);

	var _typify2 = _interopRequireDefault(_typify);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Checks if the parameter is a procedure
	 */
	function isProcedure(param) {
	  return (0, _typify2.default)(param) === _typify.PROCEDURE;
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isList;

	var _typify = __webpack_require__(80);

	var _typify2 = _interopRequireDefault(_typify);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Checks if the parameter is a list
	 */
	function isList(param) {
	  return (0, _typify2.default)(param) === _typify.LIST;
	}

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isSet;

	var _typify = __webpack_require__(80);

	var _typify2 = _interopRequireDefault(_typify);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Checks if the parameter is a set
	 */
	function isSet(param) {
	  return (0, _typify2.default)(param) === _typify.SET;
	}

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isBoolean;

	var _typify = __webpack_require__(80);

	var _typify2 = _interopRequireDefault(_typify);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/**
	 * Checks if the parameter is a boolean value
	 */
	function isBoolean(param) {
	  return (0, _typify2.default)(param) === _typify.BOOLEAN;
	}

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _StdLibPlugin2 = __webpack_require__(75);

	var _StdLibPlugin3 = _interopRequireDefault(_StdLibPlugin2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var StdLibPluginBrowser = function (_StdLibPlugin) {
	  _inherits(StdLibPluginBrowser, _StdLibPlugin);

	  function StdLibPluginBrowser() {
	    _classCallCheck(this, StdLibPluginBrowser);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(StdLibPluginBrowser).apply(this, arguments));
	  }

	  _createClass(StdLibPluginBrowser, [{
	    key: 'imports',
	    value: function imports() {
	      return this.imps.filter(function (imp) {
	        return imp.varName !== 'print';
	      }).map(function (imp) {
	        return 'var ' + imp.varName + ' = $$stdLib.' + imp.importName + ';';
	      }).join('\n');;
	    }
	  }]);

	  return StdLibPluginBrowser;
	}(_StdLibPlugin3.default);

	exports.default = StdLibPluginBrowser;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _HelperPlugin2 = __webpack_require__(74);

	var _HelperPlugin3 = _interopRequireDefault(_HelperPlugin2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var HelperPluginBrowser = function (_HelperPlugin) {
	  _inherits(HelperPluginBrowser, _HelperPlugin);

	  function HelperPluginBrowser() {
	    _classCallCheck(this, HelperPluginBrowser);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(HelperPluginBrowser).apply(this, arguments));
	  }

	  _createClass(HelperPluginBrowser, [{
	    key: 'imports',
	    value: function imports() {
	      return this.imps.map(function (imp) {
	        return 'var ' + imp.varName + ' = $$hlpLib.' + imp.importName + ';';
	      }).join('\n');;
	    }
	  }]);

	  return HelperPluginBrowser;
	}(_HelperPlugin3.default);

	exports.default = HelperPluginBrowser;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify2 = __webpack_require__(79);

	var _stringify3 = _interopRequireDefault(_stringify2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _stringify = function _stringify(str) {
	  return (0, _stringify3.default)(str, false);
	};

	var encode = {
	  '  ': ' &nbsp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  '\'': '&apos;'
	};
	var htmlify = function htmlify(str) {
	  return str.replace(/[<>"']|  /g, function (match) {
	    return encode[match];
	  });
	};

	var printToDiv = function printToDiv(div) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    div.innerHTML += args.map(_stringify).map(htmlify).join('') + '</br>';
	  };
	};

	exports.default = printToDiv;

/***/ },
/* 111 */
/***/ function(module, exports) {

	"use strict";

	/* Example definition of a simple mode that understands a subset of
	 * JavaScript:
	 */

	CodeMirror.defineSimpleMode('setlx', {
	  // The start state contains the rules that are intially used
	  start: [{ regex: /"(?:[^\\]|\\.)*?"/, token: "string" }, { regex: /(procedure)(\s+)([a-z$][\w$]*)/, token: ["keyword", null, "variable-2"] },
	  // Rules are matched in the order in which they appear, so there is
	  // no ambiguity between this one and the one above
	  { regex: /(?:function|var|return|if|for|while|else|do|this|forall|exists)\b/,
	    token: "keyword" }, { regex: /true|false|om/, token: "atom" }, { regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
	    token: "number" }, { regex: /\/\/.*/, token: "comment" }, { regex: /\/(?:[^\\]|\\.)*?\//, token: "variable-3" },
	  // A next property will cause the mode to move to a different state
	  { regex: /\/\*/, token: "comment", next: "comment" }, { regex: /[-+\/*=<>!]+|in/, token: "operator" },
	  // indent and dedent properties guide autoindentation
	  { regex: /[\{\[\(]/, indent: true }, { regex: /[\}\]\)]/, dedent: true }, { regex: /[a-z$][\w$]*/, token: "variable" }],
	  // The multi-line comment state.
	  comment: [{ regex: /.*?\*\//, token: "comment", next: "start" }, { regex: /.*/, token: "comment" }],
	  // The meta property contains global information about the mode. It
	  // can contain properties like lineComment, which are supported by
	  // all modes, and also directives like dontIndentStates, which are
	  // specific to simple modes.
	  meta: {
	    dontIndentStates: ["comment"],
	    lineComment: "//"
	  }
	});

/***/ }
/******/ ]);