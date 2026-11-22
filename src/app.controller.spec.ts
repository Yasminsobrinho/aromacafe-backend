import { AppController } from './app.controller.js';

describe('AppController', () => {
  it('retorna status ok', () => {
    expect(new AppController().check()).toEqual({ status: 'ok' });
  });
});
