import { translate } from './l20n';

@translate
class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <h1 data-l10n-id="hello-world">{this.props.l10n('hello-world')}</h1>
        <p data-l10n-id="type-your-name">{this.props.l10n('type-your-name')}</p>
      </div>
    );
  }
}

ReactDOM.render(
  <MyComponent />,
  document.getElementById("container")
);
