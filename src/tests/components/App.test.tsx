/* eslint-disable no-undef */
import { render } from '../../setupTests';
import App from '../../App';

describe('<App />', () => {
  it('Renders successfully without error', () => {
    const app = render(<App />);
    expect(app.container).toBeTruthy();
  });

  it('Shows loading indicator when loading current user from JWT cookie', () => {
    const app = render(<App />, false);
    expect(app.container).toBeTruthy();
    expect(app.getByTestId('loading')).toBeInTheDocument();
  });
});
