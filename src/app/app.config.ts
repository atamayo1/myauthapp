import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Asegúrate de importar HttpClient correctamente
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), // Proporciona HttpClient aquí
    provideRouter(routes)
  ]
};
