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
