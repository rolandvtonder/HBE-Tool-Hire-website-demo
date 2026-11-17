import {Site} from './components/Site';
import {matchRoute} from './routes';

export function App({path}: {path: string}) {
  const route = matchRoute(path);
  return <Site path={route.path}>{route.render()}</Site>;
}
