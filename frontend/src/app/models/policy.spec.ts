import { Policy } from './policy';

describe('Policy', () => {
  it('should create an instance', () => {
    const p = new Policy('p1', new Date(), 'desc', 'CODE', 'Title', 100, 12, 5000);
    expect(p).toBeTruthy();
  });
});
