/* eslint-disable no-undef */
import { render, waitFor, fireEvent } from '../../setupTests';
import Folder from '../../components/Folder';

describe('<Folder />', () => {
  it('Renders successfully without error', () => {
    const folder = render(<Folder id={1} name="Folder" />);
    expect(folder.container).toBeTruthy();
  });

  it('Opens folder options upon clicking icon', async () => {
    const folder = render(<Folder id={1} name="Folder" />);
    await fireEvent.click(folder.getByLabelText('More'));
    await waitFor(() => {
      expect(folder.container.querySelector('.MuiCollapse-entered')).toBeTruthy();
    });
  });

  it('Opens folder form upon clicking "Rename" with folder name pre-populated', async () => {
    const folder = render(<Folder id={1} name="Folder" />);
    await fireEvent.click(folder.getByLabelText('More'));

    await waitFor(() => {
      fireEvent.click(folder.getByText('Rename'));
    });

    await waitFor(() => {
      expect(folder.getByRole('form')).toBeTruthy();
      expect(folder.getByDisplayValue('Folder')).toBeInTheDocument();
    });
  });
});
