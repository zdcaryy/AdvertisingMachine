import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
enableProdMode();//解决生产环境二次检查
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
