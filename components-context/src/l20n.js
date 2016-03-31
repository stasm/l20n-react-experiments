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
      // XXX this is wrong; we need to also pass args which aren't know at this 
      // point
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

class TranslatedElement extends React.Component {
  static contextTypes = {
    l10n: React.PropTypes.func
  };

  l10n() {
    return this.context.l10n(this.props.id);
  }

  render() {
    // run the overlay logic on the virtual dom
  }
}

export class TranslatedH1 extends TranslatedElement {
  render() {
    return <h1>{this.l10n()}</h1>
  }
}

export class TranslatedP extends TranslatedElement {
  render() {
    return <p>{this.l10n()}</p>
  }
}
