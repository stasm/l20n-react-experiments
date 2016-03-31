import { TranslatedH1, TranslatedP } from './l20n';

class MyComponent extends React.Component {
  state = {
    name: ''
  };

  handleChange(event) {
    this.setState({ name: event.target.value });
  }
  render() {
    return (
      <div>
        <TranslatedH1 id="hello-world" name={this.state.name} />
        <TranslatedP id="type-your-name" />

        <hr />
        <input type="text" value={this.state.name} placeholder="(debug)" onChange={evt => this.handleChange(evt)}></input>
      </div>
    );
  }
}

ReactDOM.render(
  <MyComponent />,
  document.getElementById("container")
);
