class Name extends React.Component {
  state = {
    name: "",
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }
  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
        <p>
          Type <input type="text" value={this.state.name} placeholder="your name" onChange={this.handleChange}></input> and <button disabled={this.state.name.length === 0}>Submit</button>.
        </p>
      </div>
    );
  }
}

ReactDOM.render(
  <Name />,
  document.getElementById("container")
);
