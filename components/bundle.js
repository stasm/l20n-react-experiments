(function () {
  'use strict';

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  babelHelpers;

  // shim translations for these two known data-l10n-ids
  var translations = {
    'hello-world': 'Witaj <em>{$name}</em>!',
    'type-your-name': 'Wpisz <input placeholder="swoje imię"> i <button>wyślij</button>'
  };

  function formatEntity(key, args) {
    return Promise.resolve(translations[key].replace('{$name}', function () {
      return args.name;
    }));
  }

  var TranslatedElement = function (_React$Component) {
    babelHelpers.inherits(TranslatedElement, _React$Component);

    function TranslatedElement() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      babelHelpers.classCallCheck(this, TranslatedElement);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TranslatedElement)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
    }

    babelHelpers.createClass(TranslatedElement, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(newProps, newState) {
        // XXX newState doesn't seem to bew all that new; updating doesn't work
        return this.state.translation !== newState.translation;
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        return formatEntity(this.props.id, this.props).then(function (translation) {
          return _this2.setState({ translation: translation });
        });
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var _this3 = this;

        return formatEntity(this.props.id, this.props).then(function (translation) {
          return _this3.setState({ translation: translation });
        });
      }
    }, {
      key: 'render',
      value: function render() {
        // run the overlay logic on the virtual dom
      }
    }]);
    return TranslatedElement;
  }(React.Component);

  var TranslatedH1 = function (_TranslatedElement) {
    babelHelpers.inherits(TranslatedH1, _TranslatedElement);

    function TranslatedH1() {
      babelHelpers.classCallCheck(this, TranslatedH1);
      return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(TranslatedH1).apply(this, arguments));
    }

    babelHelpers.createClass(TranslatedH1, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'h1',
          null,
          this.state.translation
        );
      }
    }]);
    return TranslatedH1;
  }(TranslatedElement);

  var TranslatedP = function (_TranslatedElement2) {
    babelHelpers.inherits(TranslatedP, _TranslatedElement2);

    function TranslatedP() {
      babelHelpers.classCallCheck(this, TranslatedP);
      return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(TranslatedP).apply(this, arguments));
    }

    babelHelpers.createClass(TranslatedP, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'p',
          null,
          this.state.translation
        );
      }
    }]);
    return TranslatedP;
  }(TranslatedElement);

  var MyComponent = function (_React$Component) {
    babelHelpers.inherits(MyComponent, _React$Component);

    function MyComponent() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      babelHelpers.classCallCheck(this, MyComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MyComponent)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
        name: ''
      }, _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
    }

    babelHelpers.createClass(MyComponent, [{
      key: 'handleChange',
      value: function handleChange(event) {
        this.setState({ name: event.target.value });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        return React.createElement(
          'div',
          null,
          React.createElement(TranslatedH1, { id: 'hello-world', name: this.state.name }),
          React.createElement(TranslatedP, { id: 'type-your-name' }),
          React.createElement('hr', null),
          React.createElement('input', { type: 'text', value: this.state.name, placeholder: '(debug)', onChange: function onChange(evt) {
              return _this2.handleChange(evt);
            } })
        );
      }
    }]);
    return MyComponent;
  }(React.Component);

  ReactDOM.render(React.createElement(MyComponent, null), document.getElementById("container"));

}());