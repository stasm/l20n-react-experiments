import { formatEntity } from './translations';
import { overlayElement } from './overlay';

// shim L20n's DOM translation API with the overlay mechanism
function translateFragment(frag) {
  return [...frag.querySelectorAll('[data-l10n-id]')].map(
    elem => formatEntity(elem.getAttribute('data-l10n-id')).then(
      translation => overlayElement(elem, translation)
    )
  );
}

// a decorator for React components
export function translate(Composed) {
  return class extends React.Component {
    componentDidMount() {
      const root = ReactDOM.findDOMNode(this._root);
      return translateFragment(root);
    }
    componentDidUpdate() {
      const root = ReactDOM.findDOMNode(this._root);
      return translateFragment(root);
    }
    render() {
      return <Composed {...this.props} ref={c => this._root = c} />;
    }
  }
}
