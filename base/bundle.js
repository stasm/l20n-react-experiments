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

  var Name = function (_React$Component) {
    babelHelpers.inherits(Name, _React$Component);

    function Name() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      babelHelpers.classCallCheck(this, Name);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Name)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
        name: ""
      }, _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
    }

    babelHelpers.createClass(Name, [{
      key: "handleChange",
      value: function handleChange(event) {
        this.setState({ name: event.target.value });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        return React.createElement(
          "div",
          null,
          React.createElement(
            "h1",
            null,
            "Hello, ",
            this.state.name,
            "!"
          ),
          React.createElement(
            "p",
            null,
            "Type ",
            React.createElement("input", { type: "text", value: this.state.name, placeholder: "your name", onChange: function onChange(evt) {
                return _this2.handleChange(evt);
              } }),
            " and ",
            React.createElement(
              "button",
              { disabled: this.state.name.length === 0 },
              "Submit"
            ),
            "."
          )
        );
      }
    }]);
    return Name;
  }(React.Component);

  ReactDOM.render(React.createElement(Name, null), document.getElementById("container"));

}());