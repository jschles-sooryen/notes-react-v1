/* eslint-disable no-undef */
import {
  render, waitFor, screen, fireEvent,
} from '../../setupTests';
import FoldersList from '../../containers/FoldersList';

describe('<FoldersList />', () => {
  it('Renders successfully without error', () => {
    const foldersList = render(<FoldersList />);
    expect(foldersList.container).toBeTruthy();
  });

  it('Retrieves and renders folder data from server', async () => {
    render(<FoldersList />);
    await waitFor(() => screen.getAllByTestId('folder', { exact: false }));
    expect(screen.getAllByTestId('folder', { exact: false }).length).toEqual(3);
  });

  it('Opens new folder form upon clicking "New Folder" button', () => {
    render(<FoldersList />);
    fireEvent.click(screen.getByRole('button', { name: 'New Folder' }));
    expect(screen.getByRole('form')).toBeTruthy();
  });
});
