import { render } from '../../setupTests';
import LoadingIndicator from '../../components/LoadingIndicator';

describe('<LoadingIndicator />', () => {
  it('Renders successfully without error', () => {
    const loading = render(<LoadingIndicator />);
    expect(loading.container).toBeTruthy();
  });
});
