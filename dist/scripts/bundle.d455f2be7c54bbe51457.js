(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "+YgD":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("O14P");


/***/ }),

/***/ "O14P":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__("i8i4");
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./src/client/config.js
var config = __webpack_require__("Xja6");

// CONCATENATED MODULE: ./src/client/api/static-feed.js

var staticfeedBaseUrl = config["a" /* default */].staticFeedAPIURLBase;
function static_feed_getServiceIDs(date) {
  return fetch("".concat(staticfeedBaseUrl, "services/serviceids_by_date/").concat(date)).then(function (res) {
    return res.json();
  }).then(function (serviceIDs) {
    return serviceIDs;
  }).catch(function (err) {
    return err;
  });
}
function getRoutesList() {
  return fetch("".concat(staticfeedBaseUrl, "routes/routes_list")).then(function (res) {
    return res.json();
  }).then(function (routes) {
    return routes;
  }).catch(function (err) {
    return err;
  });
}
function static_feed_getTrips(date, route, direction, serviceids) {
  var data = {
    date: date,
    route: route,
    direction: direction,
    serviceids: serviceids
  };
  return fetch("".concat(staticfeedBaseUrl, "trips/trips_by_date_route_direction"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/JSON'
    },
    body: JSON.stringify(data)
  }).then(function (res) {
    return res.json();
  }).then(function (trips) {
    return trips;
  }).catch(function (err) {
    return err;
  });
}
function getTripsIds(date, route, direction, serviceids) {
  var data = {
    date: date,
    route: route,
    direction: direction,
    serviceids: serviceids
  };
  return fetch("".concat(staticfeedBaseUrl, "trips/tripsidslist_by_date_route_direction"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/JSON'
    },
    body: JSON.stringify(data)
  }).then(function (res) {
    return res.json();
  }).then(function (trips) {
    return trips;
  }).catch(function (err) {
    return err;
  });
}
function getStopsByIds(stopids) {
  var data = {
    stopids: stopids
  };
  return fetch("".concat(staticfeedBaseUrl, "stops/stops_by_stopids"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/JSON'
    },
    body: JSON.stringify(data)
  }).then(function (res) {
    return res.json();
  }).then(function (stops) {
    return stops;
  }).catch(function (err) {
    return err;
  });
}
function getStopByNameAndDirection(name, dir) {
  return fetch("".concat(staticfeedBaseUrl, "stops/stop_by_name_direction/").concat(name, "/").concat(dir), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/JSON'
    }
  }).then(function (res) {
    return res.json();
  }).then(function (stop) {
    return stop;
  }).catch(function (err) {
    return err;
  });
}
function static_feed_getStopsByDirection(dir) {
  return fetch("".concat(staticfeedBaseUrl, "stops/stops_by_direction/").concat(dir)).then(function (res) {
    return res.json();
  }).then(function (stops) {
    return stops;
  }).catch(function (err) {
    return err;
  });
}
function getXStopTimesForStop(stopid, tripids, num) {
  var data = {
    stopid: stopid,
    tripids: tripids,
    num: num
  };
  return fetch("".concat(staticfeedBaseUrl, "stoptimes/next_x_stoptimes_for_stop"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/JSON'
    },
    body: JSON.stringify(data)
  }).then(function (res) {
    return res.json();
  }).then(function (results) {
    return results;
  }).catch(function (err) {
    return err;
  });
}
// EXTERNAL MODULE: ./src/server/utils/dateHelpers.js
var dateHelpers = __webpack_require__("Rhd/");
var dateHelpers_default = /*#__PURE__*/__webpack_require__.n(dateHelpers);

// EXTERNAL MODULE: ./src/server/utils/globals.js
var globals = __webpack_require__("peC0");

// EXTERNAL MODULE: ./node_modules/react-date-picker/dist/entry.js
var entry = __webpack_require__("+z+L");
var entry_default = /*#__PURE__*/__webpack_require__.n(entry);

// CONCATENATED MODULE: ./src/client/components/dateInput.js



var dateInput_DateInput = function DateInput(props) {
  return react_default.a.createElement("div", {
    className: "form-group"
  }, react_default.a.createElement("label", {
    className: "form-label",
    htmlFor: "date-picker"
  }, "Date: "), react_default.a.createElement(entry_default.a, {
    id: "date-picker",
    type: "text",
    value: props.date,
    onChange: props.handleDatePicker
  }));
};

/* harmony default export */ var dateInput = (dateInput_DateInput);
// CONCATENATED MODULE: ./src/client/components/routeSelect.js


var routeSelect_RouteSelect = function RouteSelect(props) {
  return react_default.a.createElement("div", {
    className: "form-group"
  }, react_default.a.createElement("label", {
    className: "form-label",
    htmlFor: "route-select"
  }, "Choose Route: "), react_default.a.createElement("select", {
    id: "route-select",
    className: "form-select",
    name: "route-select",
    title: "Select your route",
    value: props.route,
    onChange: props.handleRouteSelect
  }, props.routes.map(function (item) {
    return react_default.a.createElement("option", {
      key: item._id,
      value: item.route_id
    }, item.shortName, " (", item.name, ")");
  })));
};

/* harmony default export */ var routeSelect = (routeSelect_RouteSelect);
// CONCATENATED MODULE: ./src/client/components/directionSelect.js


var directionSelect_DirectionSelect = function DirectionSelect(props) {
  return react_default.a.createElement("div", {
    className: "form-group"
  }, react_default.a.createElement("label", {
    className: "form-label",
    htmlFor: "direction-select"
  }, "Choose Direction: "), react_default.a.createElement("select", {
    id: "direction-select",
    className: "form-select",
    title: "Select your direction",
    value: props.direction,
    onChange: props.handleDirectionSelect
  }, props.directions.map(function (item, index) {
    return react_default.a.createElement("option", {
      key: item,
      value: index
    }, item);
  })));
};

/* harmony default export */ var directionSelect = (directionSelect_DirectionSelect);
// CONCATENATED MODULE: ./src/client/components/stopSelect.js


var stopSelect_StopSelect = function StopSelect(props) {
  return react_default.a.createElement("div", {
    className: "form-group"
  }, react_default.a.createElement("label", {
    className: "form-label",
    htmlFor: "stop-select"
  }, "Choose a Stop: "), react_default.a.createElement("select", {
    id: "stop-select",
    className: "form-select",
    title: "Select your stop",
    value: props.stop_name,
    onChange: props.handleStopSelect
  }, props.stops.map(function (item, index) {
    return react_default.a.createElement("option", {
      key: index,
      value: item
    }, item);
  })));
};

/* harmony default export */ var stopSelect = (stopSelect_StopSelect);
// CONCATENATED MODULE: ./src/client/components/numResultsInput.js


var numResultsInput_NumStopsInput = function NumStopsInput(props) {
  return react_default.a.createElement("div", {
    className: "form-group"
  }, react_default.a.createElement("label", {
    className: "form-label",
    htmlFor: "num-results-input"
  }, "Number of results (1-6): "), react_default.a.createElement("input", {
    id: "num-results-input",
    className: "form-input",
    type: "number",
    min: "1",
    max: "6",
    title: "input number of results to show",
    value: props.numResults,
    onChange: props.handleNumResultsInput
  }));
};

/* harmony default export */ var numResultsInput = (numResultsInput_NumStopsInput);
// CONCATENATED MODULE: ./src/client/components/searchResults.js



var searchResults_SearchResults = function SearchResults(props) {
  return react_default.a.createElement("ul", {
    id: "results-list"
  }, props.stoptimes.map(function (item, index) {
    return react_default.a.createElement("li", {
      className: "results-item",
      key: index
    }, dateHelpers_default.a.convertDBTimeTo12(item));
  }));
};

/* harmony default export */ var searchResults = (searchResults_SearchResults);
// CONCATENATED MODULE: ./src/client/containers/next_train_search.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }












var next_train_search_NextTrainSearch =
/*#__PURE__*/
function (_Component) {
  _inherits(NextTrainSearch, _Component);

  function NextTrainSearch(props) {
    var _this;

    _classCallCheck(this, NextTrainSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NextTrainSearch).call(this, props));
    _this.state = {
      serviceIDs: [],
      trips: [],
      trips_ids: [],
      routes: [],
      stops_dir0: [],
      stops_dir1: [],
      directions: [],
      route: null,
      stop_name: null,
      stop: null,
      direction: null,
      date: dateHelpers_default.a.convertJSDateTimeZone(new Date()),
      numResults: 3,
      stoptimes: [],
      canSearch: false
    };
    _this.handleRouteSelect = _this.handleRouteSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDirectionSelect = _this.handleDirectionSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDatePicker = _this.handleDatePicker.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleStopSelect = _this.handleStopSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getServiceIDs = _this.getServiceIDs.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getTrips = _this.getTrips.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getTripsIdsList = _this.getTripsIdsList.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getStopsByDirection = _this.getStopsByDirection.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleNumResultsInput = _this.handleNumResultsInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(NextTrainSearch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.state.serviceIDs.length < 1) {
        this.getServiceIDs();
      }

      if (this.state.routes.length < 1) {
        getRoutesList().then(function (result) {
          console.log("routes: ", result);

          _this2.setState({
            routes: result.routesList
          });

          _this2.setState({
            route: result.routesList[0].route_id
          });

          _this2.setState({
            directions: result.routesList[0].directions
          }, function () {
            _this2.setState({
              direction: "0"
            }, function () {
              if (_this2.state.stops_dir0.length < 1) _this2.getStopsByDirection(0);
              if (_this2.state.stops_dir1.length < 1) _this2.getStopsByDirection(1);
              if (_this2.state.trips_ids.length < 1) _this2.getTripsIdsList();
            });
          });
        }).catch(function (err) {
          console.log("err in routes get:", err);

          _this2.setState({
            routes: []
          });
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "getServiceIDs",
    value: function getServiceIDs() {
      var _this3 = this;

      var d;

      if (!this.state.date) {
        d = new Date();
      } else {
        d = this.state.date;
      }

      d = dateHelpers_default.a.convertDateObjToLocalISOString(d);
      static_feed_getServiceIDs(d).then(function (result) {
        console.log("serviceids: ", result);

        _this3.setState({
          serviceIDs: result.serviceids
        });
      }).catch(function (err) {
        console.log("err in serviceIDs get:", err);

        _this3.setState({
          serviceIDs: []
        });
      });
    }
  }, {
    key: "getTrips",
    value: function getTrips() {
      var _this4 = this;

      var d;

      if (!this.state.date) {
        d = new Date();
      } else {
        d = this.state.date;
      }

      d = dateHelpers_default.a.convertDateObjToLocalISOString(d);
      static_feed_getTrips(d, this.state.route, this.state.direction, this.state.serviceIDs).then(function (results) {
        console.log("results from getTrips fetch ", results);

        _this4.setState({
          trips: results.trips
        }, function () {
          return _this4.getStopsByDirection();
        });
      }).catch(function (err) {
        console.log("err in getTrips:", err);

        _this4.setState({
          trips: []
        });
      });
    }
  }, {
    key: "getTripsIdsList",
    value: function getTripsIdsList() {
      var _this5 = this;

      var d;

      if (!this.state.date) {
        d = new Date();
      } else {
        d = this.state.date;
      }

      d = dateHelpers_default.a.convertDateObjToLocalISOString(d);
      getTripsIds(d, this.state.route, this.state.direction, this.state.serviceIDs).then(function (results) {
        console.log("results from getTripsIds fetch ", results);

        _this5.setState({
          trips_ids: results.trips
        }, function () {
          return _this5.getStopsByDirection();
        });
      }).catch(function (err) {
        console.log("err in getTripsIds:", err);

        _this5.setState({
          trips_ids: []
        });
      });
    }
  }, {
    key: "getStopsByDirection",
    value: function getStopsByDirection() {
      var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.direction;

      if (this.state.route) {
        var stateKey = "stops_dir" + dir;
        var stopsKey = this.state.route + '-' + dir;
        this.setState(_defineProperty({}, stateKey, globals["stops"][stopsKey]));

        if (dir == this.state.direction) {
          this.setState({
            stop_name: this.state[stateKey][0]
          });
          this.setState({
            canSearch: true
          });
        }
      }
    }
  }, {
    key: "setStopTimes",
    value: function setStopTimes(stopid, tripsids, num) {
      var _this6 = this;

      getXStopTimesForStop(stopid, tripsids, num).then(function (results) {
        _this6.setState({
          stoptimes: results.stoptimes
        });

        var resultsEle = document.getElementById('results');
        resultsEle.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    }
  }, {
    key: "handleRouteSelect",
    value: function handleRouteSelect(e) {
      var _this7 = this;

      this.setState({
        route: e.target.value
      });
      this.setState({
        stoptimes: []
      });
      this.setState({
        stop: ''
      });
      this.state.routes.map(function (item) {
        if (item.route_id === e.target.value) {
          _this7.setState({
            directions: item.directions
          }, function () {
            this.setState({
              direction: "0"
            }, function () {
              this.getTripsIdsList();
              this.getStopsByDirection();
              this.getStopsByDirection(this.state.direction == 0 ? "1" : "0");
            });
          });

          return;
        }
      });
    }
  }, {
    key: "handleDirectionSelect",
    value: function handleDirectionSelect(e) {
      this.setState({
        stoptimes: []
      });
      this.setState({
        stop: ''
      });
      this.setState({
        direction: e.target.value
      }, function () {
        this.getTripsIdsList();
      });
    }
  }, {
    key: "handleDatePicker",
    value: function handleDatePicker(d) {
      d = dateHelpers_default.a.convertJSDateTimeZone(d);
      this.setState({
        stoptimes: []
      });
      this.setState({
        date: d
      }, this.getServiceIDs);
    }
  }, {
    key: "handleStopSelect",
    value: function handleStopSelect(e) {
      var _this8 = this;

      var name = e.target.value;
      var dir = this.state.direction;
      this.setState({
        stop_name: name
      });
      this.setState({
        stoptimes: []
      });
      getStopByNameAndDirection(encodeURIComponent(name), dir).then(function (stop) {
        _this8.setState({
          canSearch: true
        });

        _this8.setState({
          stop: stop.stop_id
        });
      });
    }
  }, {
    key: "handleNumResultsInput",
    value: function handleNumResultsInput(e) {
      this.setState({
        numResults: e.target.value
      });
      this.setState({
        stoptimes: []
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      var _this9 = this;

      e.preventDefault();
      this.setState({
        stoptimes: []
      });
      var d;
      var stopid = this.state.stop;
      var tripsids = this.state.trips_ids;
      var num = this.state.numResults;

      if (tripsids.length === 0) {
        if (!this.state.date) {
          d = new Date();
        } else {
          d = this.state.date;
        }

        d = dateHelpers_default.a.convertDateObjToLocalISOString(d);
      }

      if (stopid && tripsids.length > 0) {
        // console.log("stopid && tripsids.length > 0");
        this.setStopTimes(stopid, tripsids, num);
      } else if (stopid && tripsids.length === 0) {
        // console.log("stopid && tripsids.length === 0");
        getTripsIds(d, this.state.route, this.state.direction, this.state.serviceIDs).then(function (results) {
          console.log("results from getTripsIds fetch ", results);

          _this9.setState({
            trips_ids: results.trips
          }, function () {
            tripsids = _this9.state.trips_ids;

            _this9.setStopTimes(stopid, tripsids, num);
          });
        }).catch(function (err) {
          console.log("err in getTripsIds:", err);

          _this9.setState({
            trips_ids: []
          });
        });
      } else if (!stopid && tripsids.length > 0) {
        // console.log("!stopid && tripsids.length > 0");
        getStopByNameAndDirection(encodeURIComponent(this.state.stop_name), this.state.direction).then(function (stop) {
          _this9.setState({
            stop: stop.stop_id
          }, function () {
            stopid = _this9.state.stop;

            _this9.setStopTimes(stopid, tripsids, num);
          });
        });
      } else {
        Promise.all([getStopByNameAndDirection(encodeURIComponent(this.state.stop_name), this.state.direction), getTripsIds(d, this.state.route, this.state.direction, this.state.serviceIDs)]).then(function (values) {
          var results1 = values[0],
              results2 = values[1]; // console.log("results1 ",results1);
          // console.log("results2 ",results2);

          _this9.setState({
            stop: results1.stop_id
          }, function () {
            stopid = _this9.state.stop;

            _this9.setState({
              trips_ids: results2.trips
            }, function () {
              tripsids = _this9.state.trips_ids;

              _this9.setStopTimes(stopid, tripsids, num);
            });
          });
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var routesLoaded = this.state.routes.length;
      var routeChosen = this.state.route;
      var directionChosen = this.state.direction;
      var stopChosen = this.state.stop;
      var canSearch = this.state.canSearch;
      return react_default.a.createElement("div", null, react_default.a.createElement("header", {
        className: "container grid-lg"
      }, react_default.a.createElement("h1", null, "Next Train!")), react_default.a.createElement("main", null, react_default.a.createElement("div", {
        className: "container grid-lg"
      }, react_default.a.createElement("div", {
        className: "columns"
      }, react_default.a.createElement("div", {
        className: "column col-7 col-md-12"
      }, react_default.a.createElement("form", {
        id: "next-train-form",
        name: "next-train-form",
        onSubmit: this.handleSubmit
      }, !routesLoaded ? 'Loading ...' : react_default.a.createElement(routeSelect, {
        route: this.state.route || "",
        routes: this.state.routes,
        handleRouteSelect: this.handleRouteSelect
      }), routeChosen && react_default.a.createElement(directionSelect, {
        direction: this.state.direction || "",
        directions: this.state.directions,
        handleDirectionSelect: this.handleDirectionSelect
      }), directionChosen && react_default.a.createElement(stopSelect, {
        stop_name: this.stop_name || "",
        direction: this.state.direction,
        stops: this.state["stops_dir".concat(this.state.direction)],
        handleStopSelect: this.handleStopSelect
      }), react_default.a.createElement(numResultsInput, {
        numResults: this.state.numResults || "",
        handleNumResultsInput: this.handleNumResultsInput
      }), canSearch && react_default.a.createElement("div", null, react_default.a.createElement("button", {
        className: "btn btn-primary",
        type: "submit"
      }, "Next Train")))), react_default.a.createElement("div", {
        id: "results",
        className: "column col-5 col-md-12"
      }, this.state.stoptimes.length > 0 && react_default.a.createElement("div", null, react_default.a.createElement("h4", null, "Next ".concat(this.state.numResults > 1 ? this.state.numResults + ' trains' : 'train', " for the \n\t\t\t\t\t\t\t\t\t\t").concat(this.state.directions[this.state.direction], " ").concat(this.state.route, " Line at stop \n\t\t\t\t\t\t\t\t\t\t").concat(this.state.stop_name, ":")), react_default.a.createElement(searchResults, {
        stoptimes: this.state.stoptimes
      })))))), react_default.a.createElement("footer", null));
    }
  }]);

  return NextTrainSearch;
}(react["Component"]);

/* harmony default export */ var next_train_search = (next_train_search_NextTrainSearch);
// CONCATENATED MODULE: ./src/client/components/app.js



var app_App = function App() {
  return react_default.a.createElement(next_train_search, null);
};

/* harmony default export */ var app = (app_App);
// EXTERNAL MODULE: ./src/client/styles/calendar.css
var calendar = __webpack_require__("+YgD");

// EXTERNAL MODULE: ./src/client/styles/sass/main.scss
var main = __webpack_require__("uuBw");

// CONCATENATED MODULE: ./src/client/index.js





react_dom_default.a.render(react_default.a.createElement(app, null), document.getElementById("react-app"));

/***/ }),

/***/ "Rhd/":
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__("ExVU"),
    DateTime = _require.DateTime;

var globals = __webpack_require__("peC0"); // NOTE: using luxon on server side only to avoid polyfills etc. on client side to deal with browser inconsistencies
// See conversion functions below.


var dateHelpers = {
  convertRTDTimeTo24: function convertRTDTimeTo24(rtdTime) {
    // hh:mm:ss as a string
    return rtdTime.substring(0, rtdTime.lastIndexOf(':')).replace(':', '');
  },
  convertCurrentTimeTo24: function convertCurrentTimeTo24(current) {
    // current should be a JS Date object
    current = this.convertJSDateTimeZone(current);
    var h = current.getHours().toString();

    if (h.length === 1) {
      h = '0' + h;
    }

    var m = current.getMinutes().toString();

    if (m.length === 1) {
      m = '0' + m;
    }

    return h + m;
  },
  convertDBTimeTo12: function convertDBTimeTo12(dbTime) {
    // dbTime will be in hhmm format
    var h = dbTime.substring(0, 2);
    var m = dbTime.substring(2, 4);
    var ampm = h < 12 ? 'AM' : 'PM';
    if (h < 10) h = h.substring(1);
    if (h > 12) h = h - 12;
    return "".concat(h, ":").concat(m, " ").concat(ampm);
  },
  convertCurrentDateToRTDFormat: function convertCurrentDateToRTDFormat(currentDate) {
    //currentDate should be a JS Date object
    currentDate = this.convertJSDateTimeZone(currentDate);
    var y, m, d;
    y = currentDate.getFullYear().toString();
    m = (currentDate.getMonth() + 1).toString();
    d = currentDate.getDate().toString();
    if (m.length < 2) m = "0" + m;
    if (d.length < 2) d = "0" + d;
    return y + m + d;
  },
  convertDayToDayName: function convertDayToDayName(day) {
    var dayName;

    switch (day) {
      case 0:
        dayName = "sunday";
        break;

      case 1:
        dayName = "monday";
        break;

      case 2:
        dayName = "tuesday";
        break;

      case 3:
        dayName = "wednesday";
        break;

      case 4:
        dayName = "thursday";
        break;

      case 5:
        dayName = "friday";
        break;

      case 6:
        dayName = "saturday";
    }

    return dayName;
  },
  convertISODateStringToDateObject: function convertISODateStringToDateObject(datestring) {
    // Convert datestring to Date Obj
    // datestring must be in format: '2018-09-24'
    var dt = DateTime.fromISO(datestring).setZone(globals.timezone);
    var iso = dt.toISO(); // iso format is 2019-03-02T10:30:28.566-08:00 and with -08:00 passed to new Date() you'll always
    // get the local time

    var dateObj = new Date(iso.substring(0, iso.lastIndexOf('-')));
    return dateObj;
  },
  convertDateObjToLocalISOString: function convertDateObjToLocalISOString(dateObj) {
    var timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globals.timezone;
    // dateObj is js date object
    var iso = DateTime.fromJSDate(dateObj, {
      zone: timezone
    }).toISO();
    return iso;
  },
  convertJSDateTimeZone: function convertJSDateTimeZone(dateObj) {
    var timezone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globals.timezone;
    var iso = this.convertDateObjToLocalISOString(dateObj, timezone); // iso format is 2019-03-02T10:30:28.566-08:00 and with -08:00 passed to new Date() you'll always
    // get the local time

    dateObj = new Date(iso.substring(0, iso.lastIndexOf('-')));
    return dateObj;
  }
};
module.exports = dateHelpers;

/***/ }),

/***/ "Xja6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {var config = {
  port: process.env.PORT || 8000,
  // staticFeedAPIURLBase: `http://localhost:${process.env.PORT || 8000}/api/staticfeed/`
  staticFeedAPIURLBase: '/api/staticfeed/'
};
/* harmony default export */ __webpack_exports__["a"] = (config);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB")))

/***/ }),

/***/ "peC0":
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__dirname) {module.exports = {
  mainFeedUrl: "http://www.rtd-denver.com/GoogleFeeder/",
  feedUrl: "http://www.rtd-denver.com/GoogleFeeder/google_transit.zip",
  downloadFolder: __dirname + "/../../../feed-temp/",
  extractedFolder: __dirname + "/../../../feed/",
  filesToUpdate: ['routes.txt', 'stop_times.txt', 'stops.txt', 'trips.txt', 'calendar.txt', 'calendar_dates.txt'],
  timezone: 'America/Denver',
  lightRailRoutesRegex: /101.|103W|^A$|107R|113B|109L/,
  stops: {
    "A-0": ["Union Station Track 1", "38th & Blake Station Track 1", "40th & Colorado Station Track 1", "Central Park Station Track 1", "Peoria Station Track 1", "40th Ave & Airport Blvd - Gateway Park Station Track 1", "61st & Pena Station Track 1", "Denver Airport Station"],
    "101C-0": ["Littleton / Mineral Ave Station", "Littleton / Downtown Station", "Oxford - City of Sheridan Station", "Englewood Station", "Evans Station", "I-25 & Broadway Station", "Alameda Station", "10th & Osage Station", "Auraria West Station", "Broncos Stadium at Mile High Station", "Pepsi Center / Elitch Gardens Station", "Union Station LRT Nb"],
    "101D-0": ["Littleton / Mineral Ave Station", "Littleton / Downtown Station", "Oxford - City of Sheridan Station", "Englewood Station", "Evans Station", "I-25 & Broadway Station", "Alameda Station", "10th & Osage Station", "Colfax at Auraria Station", "Theatre District / Convention Center Station", "16th & California Station", "18th & California Station"],
    "101E-0": ["Lincoln Station", "County Line Station", "Dry Creek Station", "Arapahoe at Village Center Station", "Orchard Station", "Belleview Station", "Southmoor Station", "Yale Station", "Colorado Station", "University of Denver Station", "Louisiana & Pearl Station", "I-25 & Broadway Station", "Alameda Station", "10th & Osage Station", "Auraria West Station", "Broncos Stadium at Mile High Station", "Pepsi Center / Elitch Gardens Station", "Union Station LRT Nb"],
    "101F-0": ["Lincoln Station", "County Line Station", "Dry Creek Station", "Arapahoe at Village Center Station", "Orchard Station", "Belleview Station", "Southmoor Station", "Yale Station", "Colorado Station", "University of Denver Station", "Louisiana & Pearl Station", "I-25 & Broadway Station", "Alameda Station", "10th & Osage Station", "Colfax at Auraria Station", "Theatre District / Convention Center Station", "16th & California Station", "18th & California Station"],
    "101H-0": ["Florida Station", "Iliff Station", "Nine Mile Station", "Dayton Station", "Southmoor Station", "Yale Station", "Colorado Station", "University of Denver Station", "Louisiana & Pearl Station", "I-25 & Broadway Station", "Alameda Station", "10th & Osage Station", "Colfax at Auraria Station", "Theatre District / Convention Center Station", "16th & California Station", "18th & California Station"],
    "103W-0": ["Jeffco Government Center Station", "Red Rocks Community College Station", "Federal Center Station", "Oak Station", "Garrison Station", "Wadsworth Station", "Lamar Station", "Sheridan Station", "Perry Station", "Knox Station", "Decatur / Federal Station", "Auraria West Station", "Broncos Stadium at Mile High Station", "Pepsi Center / Elitch Gardens Station", "Union Station LRT Nb"],
    "107R-0": ["Lincoln Station", "County Line Station", "Dry Creek Station", "Arapahoe at Village Center Station", "Orchard Station", "Belleview Station", "Dayton Station", "Nine Mile Station", "Iliff Station", "Florida Station", "Aurora Metro Center Station", "2nd & Abilene Station", "13th Ave Station", "Colfax Station", "Fitzsimons Station", "Peoria Station"],
    "109L-0": ["16th & California Station", "18th & California Station", "20th & Welton Station", "25th & Welton Station", "27th & Welton Station", "30th & Downing Station"],
    "113B-0": ["Westminster Station S-Bound", "Union Station Track 8"],
    "A-1": ["Denver Airport Station", "61st & Pena Station Track 2", "40th Ave & Airport Blvd - Gateway Park Station Track 2", "Peoria Station Track 2", "Central Park Station Track 2", "40th & Colorado Station Track 2", "38th & Blake Station Track 2", "Union Station Track 1"],
    "101C-1": ["Union Station", "Pepsi Center / Elitch Gardens Station", "Broncos Stadium at Mile High Station", "Auraria West Station", "10th & Osage Station", "Alameda Station", "I-25 & Broadway Station", "Evans Station", "Englewood Station", "Oxford - City of Sheridan Station", "Littleton / Downtown Station", "Littleton / Mineral Ave Station"],
    "101D-1": ["18th & Stout Station", "16th & Stout Station", "Theatre District/Convention Ctr Station", "Colfax at Auraria Station", "10th & Osage Station", "Alameda Station", "I-25 & Broadway Station", "Evans Station", "Englewood Station", "Oxford - City of Sheridan Station", "Littleton / Downtown Station", "Littleton / Mineral Ave Station"],
    "101E-1": ["Union Station", "Pepsi Center / Elitch Gardens Station", "Broncos Stadium at Mile High Station", "Auraria West Station", "10th & Osage Station", "Alameda Station", "I-25 & Broadway Station", "Evans Station", "Louisiana & Pearl Station", "University of Denver Station", "Colorado Station", "Yale Station", "Southmoor Station", "Belleview Station", "Orchard Station", "Arapahoe at Village Center Station", "Dry Creek Station", "County Line Station", "Lincoln Station"],
    "101F-1": ["18th & Stout Station", "16th & Stout Station", "Theatre District/Convention Ctr Station", "Colfax at Auraria Station", "10th & Osage Station", "Alameda Station", "I-25 & Broadway Station", "Louisiana & Pearl Station", "University of Denver Station", "Colorado Station", "Yale Station", "Southmoor Station", "Belleview Station", "Orchard Station", "Arapahoe at Village Center Station", "Dry Creek Station", "County Line Station", "Lincoln Station"],
    "101H-1": ["18th & Stout Station", "16th & Stout Station", "Theatre District/Convention Ctr Station", "Colfax at Auraria Station", "10th & Osage Station", "Alameda Station", "I-25 & Broadway Station", "Evans Station", "Louisiana & Pearl Station", "University of Denver Station", "Colorado Station", "Yale Station", "Southmoor Station", "Dayton Station", "Nine Mile Station", "Iliff Station", "Florida Station"],
    "103W-1": ["Union Station", "Pepsi Center / Elitch Gardens Station", "Broncos Stadium at Mile High Station", "Auraria West Station", "Decatur / Federal Station", "Knox Station", "Perry Station", "Sheridan Station", "Lamar Station", "Wadsworth Station", "Garrison Station", "Oak Station", "Federal Center Station", "Red Rocks Community College Station", "Jeffco Government Center Station"],
    "107R-1": ["Peoria Station", "Fitzsimons Station", "Colfax Station", "13th Ave Station", "2nd & Abilene Station", "Aurora Metro Center Station", "Florida Station", "Iliff Station", "Nine Mile Station", "Dayton Station", "Belleview Station", "Orchard Station", "Arapahoe at Village Center Station", "Dry Creek Station", "County Line Station", "Lincoln Station"],
    "109L-1": ["30th & Downing Station", "27th & Welton Station", "25th & Welton Station", "20th & Welton Station", "18th & Stout Station", "16th & Stout Station"],
    "113B-1": ["Union Station Track 8", "Westminster Station N-Bound"]
  }
};
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "uuBw":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[0,1,2]]]);