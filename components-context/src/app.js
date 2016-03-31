import { TranslatedH1, TranslatedP, TranslationProvider } from './l20n';

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <TranslatedH1 id="hello-world" />
        <TranslatedP id="type-your-name" />
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
