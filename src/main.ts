import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import * as dateUtil from 'date-fns'
import { AppModule } from './app/app.module';
import { environment } from './environments/environment.prod';
if (environment.production) {
  enableProdMode();
}
Date.prototype.toJSON=function(){
  let result= dateUtil.format(this, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
  return result;
}
registerLocaleData(zh);

platformBrowserDynamic().bootstrapModule(AppModule);
