import { formatEntity } from './translations';

// a decorator for React components
export function translate(Composed) {
  return class extends React.Component {
    state = {};
    l10n = Composed.l10n;

    componentDidMount() {
      return Promise.all(
        this.l10n.map(formatEntity)
      ).then(
        translations => {
          const state = translations.reduce(
            (obj, cur, i) => Object.assign({}, obj, {
              [this.l10n[i]]: cur
            }), {});
          this.setState(state);
        }
      );
    }
    render() {
      const props = Object.assign({}, this.props, {l10n: x => this.state[x]});
      return <Composed {...props} />;
    }
  }
}
