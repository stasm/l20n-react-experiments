import { formatEntity } from './translations';

// a decorator for React components
export function translate(Composed) {
  return class extends React.Component {
    state = {
      ids: new Set(),
      translations: {}
    };

    l10n(x) {
      if (this.state.ids.has(x) && this.state.translations[x]) {
        return this.state.translations[x].value;
      } else {
        // XXX this is hacky
        this.state.ids = this.state.ids.add(x);
      }
    }
    componentDidMount() {
      return Promise.all(
        [...this.state.ids].map(formatEntity)
      ).then(
        results => {
          const translations = results.reduce(
            (obj, cur) => Object.assign({}, obj, {
              [cur.id]: cur
            }), {});
          this.setState({
            translations
          });
        }
      );
    }
    render() {
      return (
        <Composed {...this.props} l10n={x => this.l10n(x)} ref={c => this._root = c} />
      );
    }
  }
}
