import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Circle', () => {
  it('render without letter', () => {
    const tree = renderer
      .create(<Circle />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('render with letters', () => {
    const tree = renderer
      .create(<Circle letter='qwe'/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('render with head', () => {
    const tree = renderer
      .create(<Circle letter='qwe' head='head'/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('render with react elem as head', () => {
    const tree = renderer
      .create(<Circle letter='qwe' head={<Circle letter='head' />}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('render with tail', () => {
    const tree = renderer
      .create(<Circle letter='qwe' tail='tail'/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('render with react elem as tail', () => {
    const tree = renderer
      .create(<Circle letter='qwe' tail={<Circle letter='tail' />}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('render with index', () => {
    const tree = renderer
      .create(<Circle letter='qwe' index={3} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('render with props isSmall', () => {
    const tree = renderer
      .create(<Circle letter='qwe' isSmall={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('render with state - default', () => {
    const tree = renderer
      .create(<Circle letter='qwe' state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('render with state - changing', () => {
    const tree = renderer
      .create(<Circle letter='qwe' state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('render with state - modified', () => {
    const tree = renderer
      .create(<Circle letter='qwe' state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});