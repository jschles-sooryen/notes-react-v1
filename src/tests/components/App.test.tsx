/* eslint-disable no-undef */
import { render } from '../../setupTests';
import App from '../../App';

describe('<App />', () => {
  it('Renders successfully without error', () => {
    const app = render(<App />);
    expect(app.container).toBeTruthy();
  });
});
