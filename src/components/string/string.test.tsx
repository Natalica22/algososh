import { getReversingStringSteps } from "./utils";

describe('String revers', () => {
  it('even length', () => {
    expect(getReversingStringSteps('1234')).toEqual([
      ['1', '2', '3', '4'],
      ['4', '2', '3', '1'],
      ['4', '3', '2', '1']
    ])
  });
  it('odd length', () => {
    expect(getReversingStringSteps('12034')).toEqual([
      ['1', '2', '0', '3', '4'],
      ['4', '2', '0', '3', '1'],
      ['4', '3', '0', '2', '1'],
      ['4', '3', '0', '2', '1']
    ])
  });
  it('one symbol', () => {
    expect(getReversingStringSteps('1')).toEqual([
      ['1']
    ])
  });
  it('empty', () => {
    expect(getReversingStringSteps('')).toEqual([
      []
    ])
  });
});