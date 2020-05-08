import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';

export class TnsRouteReuseStrategy implements RouteReuseStrategy {
  constructor() {}
  shouldDetach(route: ActivatedRouteSnapshot): boolean { return false; }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {}
  shouldAttach(route: ActivatedRouteSnapshot): boolean { return false; }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle { return null; }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // console.log('----------');
    // console.log('shouldReuseRoute', future, curr, this.getKey(future), this.getKey(curr));
    // console.log('shouldReuseRouteReturn', future && curr ? this.getKey(future) === this.getKey(curr) : false);
    return future && curr ? this.getKey(future) === this.getKey(curr) : false;
  }
  private getKey(route: ActivatedRouteSnapshot) {
    // console.log(route.parent.component.toString());
    if (route.firstChild && route.firstChild.routeConfig && route.firstChild.routeConfig.path &&
      route.firstChild.routeConfig.path.indexOf('**') !== -1) { // WildCard
      return 'WILDCARD';
    } else if (!route.data.localizeRouter && (!route.parent || !route.parent.parent)) { // Lang route
      return 'LANG';
    } else if (route.routeConfig.matcher) {
      let keyM = `${this.getKey(route.parent)}/${route.routeConfig.matcher.name}`;
      if (route.data.discriminantPathKey) {
        keyM = `${keyM}-${route.data.discriminantPathKey}`;
      }
      return keyM;
    } else if (route.data.localizeRouter) {
      let key = `${this.getKey(route.parent)}/${route.data.localizeRouter.path}`;
      if (route.data.discriminantPathKey) {
        key = `${key}-${route.data.discriminantPathKey}`;
      }
      return key;
    }
    return route.routeConfig;
  }
}
