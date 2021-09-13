import { render, waitFor } from '../../setupTests';
import NotesList from '../../containers/NotesList';
import App from '../../App';

describe('<NotesList />', () => {
  it('Renders successfully without error', () => {
    const notesList = render(<NotesList />);
    expect(notesList.container).toBeTruthy();
  });

  it('Retrieves and renders note data from server', async () => {
    const { getAllByTestId } = render(<App />);
    await waitFor(() => {
      /*
        Placeholder Note component for new notes counts as 1 note,
        so the final count is 3 when combined with note data from mock API
      */
      expect(getAllByTestId('note', { exact: false }).length).toEqual(3);
    });
  });
});
