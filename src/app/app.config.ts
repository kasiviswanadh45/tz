import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
     provideHttpClient(withFetch()),provideNativeDateAdapter(), provideAnimationsAsync(),
     { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
     JwtHelperService]
};
