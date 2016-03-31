import { formatEntity } from './translations';
import { overlayElement } from './overlay';

// shim L20n's DOM translation API with the overlay mechanism
function translateElements(elems) {
  return elems.map(
    elem => formatEntity(
      elem.getAttribute('data-l10n-id'),
      JSON.parse(elem.getAttribute('data-l10n-args'))
    ).then(
      translation => overlayElement(elem, translation)
    )
  );
}

// shim L20n's Mutation Observer
const observerConfig = {
  attributes: true,
  characterData: false,
  childList: true,
  subtree: true,
  attributeFilter: ['data-l10n-id', 'data-l10n-args']
};

const observer = new MutationObserver(translateMutations);
observer.observe(document, observerConfig);

function getTranslatables(element) {
  const nodes = Array.from(element.querySelectorAll('[data-l10n-id]'));

  if (typeof element.hasAttribute === 'function' &&
      element.hasAttribute('data-l10n-id')) {
    nodes.push(element);
  }

  return nodes;
}

export function translateMutations(mutations) {
  const targets = new Set();

  for (let mutation of mutations) {
    switch (mutation.type) {
      case 'attributes':
        targets.add(mutation.target);
        break;
      case 'childList':
        for (let addedNode of mutation.addedNodes) {
          if (addedNode.nodeType === addedNode.ELEMENT_NODE) {
            if (addedNode.childElementCount) {
              getTranslatables(addedNode).forEach(targets.add.bind(targets));
            } else {
              if (addedNode.hasAttribute('data-l10n-id')) {
                targets.add(addedNode);
              }
            }
          }
        }
        break;
    }
  }

  if (targets.size === 0) {
    return;
  }

  translateElements(Array.from(targets));
}
