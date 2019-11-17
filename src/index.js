import React, { Component } from "react";

const resolve = (obj) => {
  return obj && obj.__esModule ? obj.default : obj;
}

const render = (loaded, props) => {
  return React.createElement(resolve(loaded), props);
}

const load = (loader) => {
  let state = {
    loading: true,
    loaded: null,
    error: null
  }

  state.promise = loader()
    .then(loaded => {
      state.loading = false;
      state.loaded = loaded;
      return loaded;
    })
    .catch(err => {
      state.loading = false;
      state.error = err;
      throw err;
    });

    return state;
}

const createLoadableComponent = (loadFn, options) => {

  const defaultOptions = {
    loader: null,
    loading: null,
    render: render,
  }

  let opts = Object.assign({}, defaultOptions, options);

  let res = null;

  const init = () => {
    if (!res) {
      res = loadFn(opts.loader);
    }

    return res.promise;
  }

  class Loadable extends Component {
    constructor(props) {
      super(props);
      init();

      this.state = {
        error: res.error,
        loading: res.loading,
        loaded: res.loaded
      }
    }

    componentDidMount() {
      this._mounted = true;
      this._loadModule();
    }

    _loadModule = () => {
      if (!res.loading) { // components has been loaded
        return;
      }

      const update = () => {
        if (!this._mounted) {
          return;
        }

        this.setState({
          error: res.error,
          loaded: res.loaded,
          loading: res.loading
        });
      }

      res.promise
        .then(update)
        .catch(update);
    }

    render() {
      const {loading, loaded, error} = this.state;
      const {loading: loadingCpn, render} = opts;
      if (loading || error){
        return React.createElement(loadingCpn, {
          isLoading: loading,
          error: error
        })
      } else if (loaded) {
        return render(loaded, this.props);
      } else {
        return null;
      }
    }
  }

  return Loadable;
};

const loadable = (options) => {
  return createLoadableComponent(load, options);
}

export default loadable;
