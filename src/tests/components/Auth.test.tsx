import { render } from '../../setupTests';
import Auth from '../../components/Auth';

describe('<Auth />', () => {
  it('Renders successfully without error', () => {
    const auth = render(<Auth />, false);
    expect(auth.container).toBeTruthy();
  });
});
