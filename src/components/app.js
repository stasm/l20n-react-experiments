import { TranslatedH1, TranslatedP } from './l20n';

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
  <MyComponent />,
  document.getElementById("container")
);
