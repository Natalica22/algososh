import renderer from 'react-test-renderer';
import { Button } from './button';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Button', () => {
  it('render with text', () => {
    const tree = renderer
      .create(<Button text='text' />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('render without text', () => {
    const tree = renderer
      .create(<Button />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('render disabled', () => {
    const tree = renderer
      .create(<Button text='text' disabled={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('render with loader', () => {
    const tree = renderer
      .create(<Button text='text' isLoader={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('on click', () => {
    const onClick = jest.fn();
    render(<Button text='text' onClick={onClick} />)
    
    const button = screen.getByText('text');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});