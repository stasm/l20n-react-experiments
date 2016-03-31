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

  babelHelpers.defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

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
    'hello-world': 'Witaj <em>świecie</em>!',
    'type-your-name': 'Wpisz <input placeholder="swoje imię"> i <button>wyślij</button>'
  };

  function formatEntity(key) {
    return Promise.resolve(translations[key]);
  }

  var _class;
  var _temp2;
  var _class2;
  var _temp3;
  var TranslationProvider = (_temp2 = _class = function (_React$Component) {
    babelHelpers.inherits(TranslationProvider, _React$Component);

    function TranslationProvider() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      babelHelpers.classCallCheck(this, TranslationProvider);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TranslationProvider)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
    }

    babelHelpers.createClass(TranslationProvider, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var _this2 = this;

        return {
          l10n: function l10n(id) {
            return _this2.state[id];
          }
        };
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this3 = this;

        // normally we'd fetch this.props.src and populate the state with
        // translations
        var ids = Object.keys(translations);
        return Promise.all(
        // XXX this is wrong; we need to also pass args which aren't know at this
        // point
        ids.map(formatEntity)).then(function (translations) {
          var state = translations.reduce(function (obj, cur, i) {
            return Object.assign({}, obj, babelHelpers.defineProperty({}, ids[i], cur));
          }, {});
          _this3.setState(state);
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var children = this.props.children;

        return React.Children.only(children);
      }
    }]);
    return TranslationProvider;
  }(React.Component), _class.childContextTypes = {
    l10n: React.PropTypes.func
  }, _temp2);

  var TranslatedElement = (_temp3 = _class2 = function (_React$Component2) {
    babelHelpers.inherits(TranslatedElement, _React$Component2);

    function TranslatedElement() {
      babelHelpers.classCallCheck(this, TranslatedElement);
      return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(TranslatedElement).apply(this, arguments));
    }

    babelHelpers.createClass(TranslatedElement, [{
      key: 'l10n',
      value: function l10n() {
        return this.context.l10n(this.props.id);
      }
    }, {
      key: 'render',
      value: function render() {
        // run the overlay logic on the virtual dom
      }
    }]);
    return TranslatedElement;
  }(React.Component), _class2.contextTypes = {
    l10n: React.PropTypes.func
  }, _temp3);


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
          this.l10n()
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
          this.l10n()
        );
      }
    }]);
    return TranslatedP;
  }(TranslatedElement);

  var MyComponent = function (_React$Component) {
    babelHelpers.inherits(MyComponent, _React$Component);

    function MyComponent() {
      babelHelpers.classCallCheck(this, MyComponent);
      return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(MyComponent).apply(this, arguments));
    }

    babelHelpers.createClass(MyComponent, [{
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          null,
          React.createElement(TranslatedH1, { id: "hello-world" }),
          React.createElement(TranslatedP, { id: "type-your-name" })
        );
      }
    }]);
    return MyComponent;
  }(React.Component);

  ReactDOM.render(React.createElement(
    TranslationProvider,
    { src: "/path/to/resource" },
    React.createElement(MyComponent, null)
  ), document.getElementById("container"));

}());