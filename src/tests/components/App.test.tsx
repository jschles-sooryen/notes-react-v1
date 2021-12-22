/* eslint-disable no-undef */
import { render, fireEvent, waitFor } from '../../setupTests';
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

  it('Shows and hides folders section when clicking "Toggle Folders" button', async () => {
    const app = render(<App />);
    const button = app.getByRole('button', { name: 'toggle-folders' });
    const foldersSection = app.getByTestId('f-list');
    await fireEvent.click(button);
    await waitFor(() => {
      expect(foldersSection).not.toBeInTheDocument();
    });
  });
});
