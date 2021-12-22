/* eslint-disable no-undef */
import {
  render, waitFor, fireEvent,
} from '../../setupTests';
import App from '../../App';
import Header from '../../components/Header';

describe('<Header />', () => {
  it('Renders successfully without error', () => {
    const header = render(<Header onToggleFolders={() => {}} showFolders />);
    expect(header.container).toBeTruthy();
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
    const app = render(<App />);
    const button = app.getByRole('button', { name: 'header-delete' });

    await waitFor(() => {
      // 2 Notes plus Note component used as form
      expect(app.getAllByTestId('note', { exact: false }).length).toEqual(3);
    });

    const note = app.getByTestId('note-1');
    await fireEvent.click(note);
    await fireEvent.click(button);

    await waitFor(() => {
      // 1 Note plus Note component used as form
      expect(app.getAllByTestId('note', { exact: false }).length).toEqual(2);
    });
  });

  it('Clicking delete button deletes selected folder if no note is selected', async () => {
    const app = render(<App />);
    const button = app.getByRole('button', { name: 'header-delete' });

    await waitFor(() => {
      expect(app.getAllByTestId('folder', { exact: false }).length).toEqual(3);
    });

    await fireEvent.click(button);

    await waitFor(() => {
      expect(app.getAllByTestId('folder', { exact: false }).length).toEqual(2);
    });
  });

  // Not possible with react-google-login Logout
  // it('Clicking sign out button signs outs the user and returns them to the sign in screen', async () => {
  //   const header = render(<Header onToggleFolders={() => {}} showFolders />);
  //   const button = header.container.querySelector('div[class*=innerFlexRight] > button') as HTMLElement;

  //   expect(button).toBeInTheDocument();

  //   await fireEvent.click(button);

  //   await waitFor(() => {
  //     expect(button).not.toBeInTheDocument();
  //   });
  // });
});
