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

  babelHelpers.extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
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
    'hello-world': 'Witaj <em>świecie</em>!',
    'type-your-name': 'Wpisz <input placeholder="swoje imię"> i <button>wyślij</button>'
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

        return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class2)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
      }

      babelHelpers.createClass(_class2, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          var root = ReactDOM.findDOMNode(this._root);
          var ids = [].concat(babelHelpers.toConsumableArray(root.querySelectorAll('[data-l10n-id]'))).map(function (elem) {
            return elem.getAttribute('data-l10n-id');
          });
          return Promise.all(ids.map(formatEntity)).then(function (translations) {
            var state = translations.reduce(function (obj, cur, i) {
              return Object.assign({}, obj, babelHelpers.defineProperty({}, ids[i], cur));
            }, {});
            _this2.setState(state);
          });
        }
      }, {
        key: 'render',
        value: function render() {
          var _this3 = this;

          return React.createElement(Composed, babelHelpers.extends({}, this.props, { l10n: function l10n(x) {
              return _this3.state[x];
            }, ref: function ref(c) {
              return _this3._root = c;
            } }));
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
            { 'data-l10n-id': 'hello-world' },
            this.props.l10n('hello-world')
          ),
          React.createElement(
            'p',
            { 'data-l10n-id': 'type-your-name' },
            this.props.l10n('type-your-name')
          )
        );
      }
    }]);
    return MyComponent;
  }(React.Component)) || _class;

  ReactDOM.render(React.createElement(MyComponent, null), document.getElementById("container"));

}());