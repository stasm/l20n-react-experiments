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

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  babelHelpers;

  // shim translations for these two known data-l10n-ids
  var translations = {
    'hello-world': {
      id: 'hello-world',
      value: 'Witaj <em>świecie</em>!',
      attrs: {
        title: 'This is L20n working with React!'
      }
    },
    'type-your-name': {
      id: 'type-your-name',
      value: 'Wpisz <input placeholder="swoje imię"> i <button>wyślij</button>',
      attrs: null
    }
  };

  function formatEntity(key) {
    return Promise.resolve(translations[key]);
  }

  // a decorator for React components
  function translate(Composed) {
    return function (_React$Component) {
      babelHelpers.inherits(_class2, _React$Component);

      function _class2() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        babelHelpers.classCallCheck(this, _class2);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class2)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
          ids: new Set(),
          translations: {}
        }, _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
      }

      babelHelpers.createClass(_class2, [{
        key: 'l10n',
        value: function l10n(x) {
          if (this.state.ids.has(x) && this.state.translations[x]) {
            return this.state.translations[x].value;
          } else {
            // XXX this is hacky
            this.state.ids = this.state.ids.add(x);
          }
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          return Promise.all([].concat(babelHelpers.toConsumableArray(this.state.ids)).map(formatEntity)).then(function (results) {
            var translations = results.reduce(function (obj, cur) {
              return Object.assign({}, obj, babelHelpers.defineProperty({}, cur.id, cur));
            }, {});
            _this2.setState({
              translations: translations
            });
          });
        }
      }, {
        key: 'render',
        value: function render() {
          var _this3 = this;

          var props = Object.assign({}, this.props, {
            ref: function ref(c) {
              return _this3._root = c;
            },
            l10n: function l10n(x) {
              return _this3.l10n(x);
            }
          });
          return React.createElement(Composed, props);
        }
      }]);
      return _class2;
    }(React.Component);
  }

  var _class;

  var MyComponent = translate(_class = function (_React$Component) {
    babelHelpers.inherits(MyComponent, _React$Component);

    function MyComponent() {
      babelHelpers.classCallCheck(this, MyComponent);
      return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(MyComponent).apply(this, arguments));
    }

    babelHelpers.createClass(MyComponent, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'h1',
            null,
            this.props.l10n('hello-world')
          ),
          React.createElement(
            'p',
            null,
            this.props.l10n('type-your-name')
          )
        );
      }
    }]);
    return MyComponent;
  }(React.Component)) || _class;

  ReactDOM.render(React.createElement(MyComponent, null), document.getElementById("container"));

}());