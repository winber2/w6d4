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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

const $l = function(arg) {
  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (typeof arg === 'string'){
    let nodeList = document.querySelectorAll(arg);
    return new DOMNodeCollection(Array.from(nodeList));
  } else {
    document.addEventListener('DOMContentLoaded', arg);
  }
};

window.$l = $l;

$l.extend = function(...hashes) {
  return hashes.reduce((res, hash) => {
    for (let key in hash)
      res[key] = hash[key];

    return res;
  });
};

const xhr = new XMLHttpRequest();

$l.ajax = function(options) {
  let data = undefined;
  let defaults = {
    method: "GET",
    url: window.location.href,
    data: data,
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: () => { console.log('FeelsHTTP:200OkayMan : ', data); },
    error: () => { console.log('FeelsBadMan'); }
  };

  let fbm = this.extend(defaults, options);

  xhr.open(fbm.method, fbm.url);

  xhr.onload = function(res) {
    // console.log(xhr.status);
    // console.log(xhr.responseType);
    // console.log(xhr.response);
    console.log("Hi from ajax");

    fbm.success(xhr.response);
  }

  xhr.send(fbm[data]);
}

$l( () => {

  let pepes = $l('img');
  pepes.on('click', () => (
    $l.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${Math.floor(151 * Math.random())}`,
      success: (data) => {
        let url = JSON.parse(data).sprites.front_default;
        $l('img').attr('src', url);
      }
    })
  ));

  setInterval(() => $l.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${Math.floor(151 * Math.random())}`,
    success: (data) => {
      let url = JSON.parse(data).sprites.front_default;
      $l('img').attr('src', url);
    }
  }), 1000);

  $l('li').on('click', (e) => {
  e.preventDefault();

  let vid = document.createElement('iframe');
  vid.setAttribute('src', "https://www.youtube.com/embed/nqLArgCbh70?autoplay=1");
  vid.setAttribute('frameborder', '0');
  vid.setAttribute('visible', 'false');
  vid.setAttribute('allowfullscreen', '');
  vid.setAttribute('class', 'hidden');
  // vid.setAttribute('width', '420')
  // vid.setAttribute('height', '315')
  // vid.setAttribute('autoplay', '1');
  let div = document.getElementsByClassName('SANDSTORM')[0];
  div.appendChild(vid);

  });

  // setInterval( () => {
  //   window.location.hash = Math.random() * 100000000000000000
  // }, 50)
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(arr) {
    this.htmlElements = arr;
    this.events = [];
  }

  html(str) {
    if (!str) {
      return this.htmlElements[0];
    } else {
      this.htmlElements.forEach( (html) => {
        html.innerHTML = str;
      });
      return this.htmlElements;
    }
  }

  empty() {
    this.htmlElements.forEach( (html) => {
      html.innerHTML = '';
    });
  }

  append(feelsBadMan) {
    if (feelsBadMan instanceof DOMNodeCollection) {
      this.htmlElements.forEach( (html) => {
        feelsBadMan.htmlElements.forEach( (feelsBad) => {
          html.innerHTML += feelsBad.outerHTML
        });
      });
    } else {
      this.htmlElements.forEach( (html) => { html.innerHTML += feelsBadMan } )
    }
  }

  attr(key, value) {
    if (value === undefined) {
      return this.htmlElements[0].getAttribute(key);
    }
    this.htmlElements.forEach( (feelsBadMan) => {
      feelsBadMan.setAttribute(key, value);
    });
  }

  addClass(feels) {
    this.htmlElements.forEach((feel) => {
      let allFeels = feel.className.split(' ');

      if (!allFeels.includes(feels)) allFeels.push(feels);
      allFeels = allFeels.filter((e) => !!e);

      feel.className = allFeels.join(' ');
    });
  }

  removeClass(feel){
    this.htmlElements.forEach((pepe) => {
      let pepes = pepe.className.split(' ');
      pepes = pepes.filter((e) => e !== feel);

      pepe.className = pepes.join(' ');
    })
  };

  children() {
    let children = [];
    this.htmlElements.forEach( (pepe) => {
      children = children.concat(Array.from(pepe.children));
    });
    return new DOMNodeCollection(children);
  }

  parents() {
    let parents = [];
    this.htmlElements.forEach((pepe) => {
      if (!parents.includes(pepe.parentElement))
        parents.push(pepe.parentElement);
    });
    return parents;
  }

  find(lostPepe) {
    let nonOrphanPepes = [];
    this.htmlElements.forEach((parentPepe) => {
      let foundPepes = Array.from(parentPepe.querySelectorAll(lostPepe));
      nonOrphanPepes = nonOrphanPepes.concat(foundPepes);
    });
    return new DOMNodeCollection(nonOrphanPepes);
  }

  remove() {
    this.htmlElements.forEach((poppaPepe) => {
      poppaPepe.outerHTML = '';
    })
  }

  on(feeling, ribbitBack) {
    this.htmlElements.forEach( (pepe) => {
      if (!pepe[`feelsBank-${feeling}`]) {
        pepe[`feelsBank-${feeling}`] = [];
      }

      pepe.addEventListener(feeling, ribbitBack);
      pepe[`feelsBank-${feeling}`].push(ribbitBack);
    });
  }

  off(feeling) {
    this.htmlElements.forEach( (pepe) => {
      if (!!pepe[`feelsBank-${feeling}`]) {
        pepe[`feelsBank-${feeling}`].forEach((feel) => {
          pepe.removeEventListener(feeling, feel);
        })
      }
      pepe[`feelsBank-${feeling}`] = [];
    });
  }



}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);