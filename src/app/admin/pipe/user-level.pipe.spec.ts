import { UserLevelPipe } from './user-level.pipe';

describe('UserLevelPipe', () => {
  it('create an instance', () => {
    const pipe = new UserLevelPipe();
    expect(pipe).toBeTruthy();
  });
});
