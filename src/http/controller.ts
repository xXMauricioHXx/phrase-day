import { Router } from 'express';

export interface Controller {
  loadRoutes(router: Router);
}
