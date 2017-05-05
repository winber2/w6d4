const DOMNodeCollection = require('./dom_node_collections.js');

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
