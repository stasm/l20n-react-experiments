import { translations, formatEntity } from './translations';

export class TranslationProvider extends React.Component {
  state = {};
  static childContextTypes = {
    l10n: React.PropTypes.func
  };

  getChildContext() {
    return {
      l10n: id => this.state[id],
    };
  }

  componentDidMount() {
    // normally we'd fetch this.props.src and populate the state with 
    // translations
    const ids = Object.keys(translations);
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
    const { children } = this.props;
    return React.Children.only(children);
  }
}

// a decorator for React components
export function translate(Composed) {
  return class extends React.Component {
    static contextTypes = {
      l10n: React.PropTypes.func
    };

    render() {
      const props = Object.assign(
        {}, this.props, {l10n: x => this.context.l10n(x)}
      );
      return <Composed {...props} />;
    }
  }
}
