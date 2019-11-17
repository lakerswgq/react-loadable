# react-loadable
naive react loadable

## Install

```sh
yarn add @tfboys/loadable
```
## Example

```js
import Loadable from '@tfboys/loadable';

const LazyLoading = loadable({
    loader: () => {
        return new Promise((resolve, reject) => {
            // wait 2 seconds
            setTimeout(() => {
                resolve(import('./route/lazy-loading'))
            }, 2000);
        })
    },
    loading: () => { return 'loading' },
})

export default class App extends React.Component {
  render() {
    return <LazyLoading/>;
  }
}
```