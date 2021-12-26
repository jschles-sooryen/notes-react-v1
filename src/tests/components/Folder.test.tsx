/* eslint-disable no-undef */
import { render, waitFor, fireEvent } from '../../setupTests';
import App from '../../App';
import Folder from '../../components/Folder';

describe('<Folder />', () => {
  it('Renders successfully without error', () => {
    const folder = render(<Folder id="1" name="Folder" />);
    expect(folder.container).toBeTruthy();
  });

  it('Opens folder options upon clicking icon', async () => {
    const folder = render(<Folder id="1" name="Folder" />);
    await fireEvent.click(folder.getByLabelText('More'));
    await waitFor(() => {
      expect(folder.container.querySelector('.MuiCollapse-entered')).toBeTruthy();
    });
  });

  it('Opens folder form upon clicking "Rename" with folder name pre-populated', async () => {
    const folder = render(<Folder id="1" name="Folder" />);
    await fireEvent.click(folder.getByLabelText('More'));

    await waitFor(() => {
      fireEvent.click(folder.getByText('Rename'));
    });

    await waitFor(() => {
      expect(folder.getByRole('form')).toBeTruthy();
      expect(folder.getByDisplayValue('Folder')).toBeInTheDocument();
    });
  });

  it('Deletes the selected folder upon clicking "Delete"', async () => {
    const app = render(<App />);

    await waitFor(() => {
      expect(app.getAllByTestId('folder', { exact: false }).length).toEqual(3);
    });

    await fireEvent.click(app.getAllByLabelText('More')[0]);

    await waitFor(() => {
      fireEvent.click(app.getAllByText('Delete')[0]);
    });

    await waitFor(() => {
      expect(app.getAllByTestId('folder', { exact: false }).length).toEqual(2);
    });
  });

  it('Selecting a folder while another folder is showing options closes the options of the previously selected folder', async () => {
    const app = render(<App />);

    await waitFor(() => {
      expect(app.getAllByTestId('folder', { exact: false }).length).toEqual(3);
    });

    await fireEvent.click(app.getAllByLabelText('More')[0]);
    await fireEvent.click(app.getAllByLabelText('More')[1]);

    await waitFor(() => {
      expect(app.getByTestId('folder-1').querySelector('.MuiCollapse-hidden')).toBeTruthy();
    });
  });

  it('Creates a new folder after opening folder form via "New Folder" button and entering folder name', async () => {
    const app = render(<App />);

    await waitFor(() => {
      expect(app.getAllByTestId('folder', { exact: false }).length).toEqual(3);
    });

    const button = app.getByRole('button', { name: 'New Folder' });

    await fireEvent.click(button);

    await waitFor(() => {
      expect(app.getByRole('form')).toBeTruthy();
    });

    const folderForm = app.getByTestId('f-form');

    fireEvent.focus(folderForm);

    await fireEvent.input(folderForm, {
      target: {
        value: 'Test Folder',
      },
    });

    await fireEvent.keyDown(folderForm, { keyCode: 13 });

    await waitFor(() => {
      expect(app.getAllByTestId('folder', { exact: false }).length).toEqual(4);
      expect(app.getByText('Test Folder')).toBeInTheDocument();
    });
  });

  it('Updates folder name upon entering a new folder name in the folder form', async () => {
    const app = render(<App />);

    await waitFor(() => {
      expect(app.getAllByTestId('folder', { exact: false }).length).toEqual(3);
    });

    await fireEvent.click(app.getAllByLabelText('More')[0]);

    await waitFor(() => {
      fireEvent.click(app.getAllByText('Rename')[0]);
    });

    await waitFor(() => {
      expect(app.getByRole('form')).toBeTruthy();
    });

    const folderForm = app.getByTestId('f-form');

    fireEvent.focus(folderForm);

    await fireEvent.input(folderForm, {
      target: {
        value: 'Folder 1 Updated',
      },
    });

    await fireEvent.blur(folderForm);

    await waitFor(() => {
      expect(app.getByText('Folder 1 Updated')).toBeInTheDocument();
    });
  });

  // Uses 121 in Folder.tsx and 42-44 in FolderForm.tsx but not showing in coverage
  it('Cancels update if user clicks off folder form without changing folder name', async () => {
    const app = render(<App />);

    await waitFor(() => {
      expect(app.getAllByTestId('folder', { exact: false }).length).toEqual(3);
    });

    await fireEvent.click(app.getAllByLabelText('More')[0]);

    await waitFor(() => {
      fireEvent.click(app.getAllByText('Rename')[0]);
    });

    await waitFor(() => {
      expect(app.getByRole('form')).toBeTruthy();
    });

    const folderForm = app.getByTestId('f-form');

    fireEvent.focus(folderForm);

    await fireEvent.blur(folderForm);

    await waitFor(() => {
      expect(app.getByText('Folder 1')).toBeInTheDocument();
      expect(folderForm).not.toBeInTheDocument();
    });
  });
});
