import { formatEntity } from './translations';

class TranslatedElement extends React.Component {
  state = {};

  componentDidMount() {
    return formatEntity(this.props.id).then(
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
