import { translate } from './l20n';

@translate
class MyComponent extends React.Component {
  static l10n = [
    'hello-world',
    'type-your-name',
  ];

  render() {
    return (
      <div>
        <h1>{this.props.l10n('hello-world')}</h1>
        <p>{this.props.l10n('type-your-name')}</p>
      </div>
    );
  }
}

ReactDOM.render(
  <MyComponent />,
  document.getElementById("container")
);
