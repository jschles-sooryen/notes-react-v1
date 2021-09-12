/* eslint-disable no-undef */
import { render, waitFor, fireEvent } from '../../setupTests';
import App from '../../App';
import Header from '../../components/Header';

describe('<Header />', () => {
  it('Renders successfully without error', () => {
    const header = render(<Header onToggleFolders={() => {}} showFolders />);
    expect(header.container).toBeTruthy();
  });

  it('Changes the app layout when clicking a layout button', async () => {
    const header = render(<Header onToggleFolders={() => {}} showFolders />);
    const columnButton = header.getByRole('button', { name: 'column' });
    const gridButton = header.getByRole('button', { name: 'grid' });
    await fireEvent.click(gridButton);

    await waitFor(() => {
      expect(gridButton.className.includes('selectedButton')).toBeTruthy();
      expect(!columnButton.className.includes('selectedButton')).toBeTruthy();
    });
  });

  it('Shows and hides folders section when clicking "Toggle Folders" button', async () => {
    const fn = jest.fn();
    const header = render(<Header onToggleFolders={fn} showFolders />);
    const button = header.getByRole('button', { name: 'toggle-folders' });
    await fireEvent.click(button);

    await waitFor(() => {
      expect(fn).toHaveBeenCalled();
    });
  });

  it('Creates new note template upon clicking "New Note" button', async () => {
    const header = render(<Header onToggleFolders={() => {}} showFolders />);
    const button = header.getByRole('button', { name: 'create-note' });
    await fireEvent.click(button);

    await waitFor(() => {
      expect(button.className.includes('selectedButton')).toBeTruthy();
    });
  });

  it('Clicking delete button deletes note if note is selected', async () => {
    // TODO
  });

  // In progress
  it('Clicking delete button deletes selected folder if no note is selected', async () => {
    const app = render(<App />);
    const button = app.getByRole('button', { name: 'header-delete' });
    await fireEvent.click(button);

    await waitFor(() => {
      expect(app.getAllByTestId('folder', { exact: false }).length).toEqual(2);
    });
  });
});
