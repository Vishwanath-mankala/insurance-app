import { Payments } from './payment';

describe('Payments', () => {
  it('should create an instance', () => {
    expect(new Payments('1', 'up1', 100, 'card', 'paid')).toBeTruthy();
  });
});
