import { formatEntity } from './translations';

// a decorator for React components
export function translate(Composed) {
  return class extends React.Component {
    state = {};

    componentDidMount() {
      const root = ReactDOM.findDOMNode(this._root)
      const ids = [...root.querySelectorAll('[data-l10n-id]')].map(
        elem => elem.getAttribute('data-l10n-id')
      );
      return Promise.all(
        ids.map(formatEntity)
      ).then(
        translations => {
          const state = translations.reduce(
            (obj, cur, i) => Object.assign({}, obj, {
              [ids[i]]: cur
            }), {});
          this.setState(state);
        }
      );
    }
    render() {
      return (
        <Composed {...this.props} l10n={x=> this.state[x]} ref={c => this._root = c} />
      );
    }
  }
}
