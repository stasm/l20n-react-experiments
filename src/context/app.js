import { TranslationProvider, translate } from './l20n';

@translate
class MyComponent extends React.Component {
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
  <TranslationProvider src="/path/to/resource">
    <MyComponent />
  </TranslationProvider>,
  document.getElementById("container")
);
