import { formatEntity } from './translations';

class TranslatedElement extends React.Component {
  state = {};

  shouldComponentUpdate(newProps, newState) {
    // XXX newState doesn't seem to bew all that new; updating doesn't work
    return this.state.translation !== newState.translation;
  }

  componentDidMount() {
    return formatEntity(this.props.id, this.props).then(
      translation => this.setState({ translation })
    );
  }

  componentDidUpdate() {
    return formatEntity(this.props.id, this.props).then(
      translation => this.setState({ translation })
    );
  }

  render() {
    // run the overlay logic on the virtual dom
  }
}

export class TranslatedH1 extends TranslatedElement {
  render() {
    return <h1>{this.state.translation}</h1>
  }
}

export class TranslatedP extends TranslatedElement {
  render() {
    return <p>{this.state.translation}</p>
  }
}
