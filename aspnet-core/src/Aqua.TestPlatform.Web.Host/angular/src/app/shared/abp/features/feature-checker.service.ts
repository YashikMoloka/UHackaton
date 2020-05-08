import { Injectable } from '@angular/core';

@Injectable()
export class FeatureCheckerService {

  get(featureName: string): IFeature {
    console.log('FeatureCheckerService:get is not implemented');
    return null;
    // return abp.features.get(featureName);
  }

  getValue(featureName: string): string {
    console.log('FeatureCheckerService:getValue is not implemented');
    return null;
    // return abp.features.getValue(featureName);
  }

  isEnabled(featureName: string): boolean {
    console.log('FeatureCheckerService:isEnabled is not implemented');
    return false;
    // return abp.features.isEnabled(featureName);
  }

}

// tslint:disable-next-line:no-var-keyword
interface IFeature {

  value: string;

}
