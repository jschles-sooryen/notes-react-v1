import { render } from '../../setupTests';
import App from '../../App';

describe('<Auth />', () => {
  it('Renders successfully without error', () => {
    const app = render(<App />, false);
    expect(app.container).toBeTruthy();
    expect(app.getByText('Welcome! Please Sign In:')).toBeInTheDocument();
  });
});
