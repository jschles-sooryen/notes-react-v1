import { render } from '../../setupTests';
import App from '../../App';
import { createStoreWithSaga } from '../../store';
import { signOut } from '../../store/reducers/authReducer';

describe('<Auth />', () => {
  it('Renders successfully without error', () => {
    const store = createStoreWithSaga();
    store.dispatch(signOut());
    const app = render(<App />, false, { store });
    expect(app.container).toBeTruthy();
    expect(app.getByText('Welcome! Please Sign In:')).toBeInTheDocument();
  });
});
