import { translate } from './l20n';

@translate
class Name extends React.Component {
  state = {
    name: "",
  }

  getArgs() {
    return JSON.stringify(this.state);
  }

  handleChange(evt) {
    this.setState({ name: evt.target.value });
  }

  render() {
    return (
      <div>
        <h1 data-l10n-id="hello-world" data-l10n-args={this.getArgs()}>Hello, World!</h1>
        <p data-l10n-id="type-your-name">
          Type <input type="text" value={this.props.name} placeholder="your name" onChange={evt => this.handleChange(evt)}></input> and <button disabled={this.state.name.length === 0}>Submit</button>.
        </p>
      </div>
    );
  }
}

ReactDOM.render(
  <Name />,
  document.getElementById("container")
);
