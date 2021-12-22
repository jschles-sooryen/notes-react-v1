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
});
