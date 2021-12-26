import { render, fireEvent, waitFor } from '../../setupTests';
import App from '../../App';
import NoteDetail from '../../components/NoteDetail';

describe('<NoteDetail />', () => {
  it('Renders successfully without error', () => {
    const noteDetail = render(<NoteDetail isNew />);
    expect(noteDetail.container).toBeTruthy();
  });

  it('Creates new note upon blur event', async () => {
    const app = render(<App />);

    await waitFor(() => {
      expect(app.getAllByTestId('note', { exact: false }).length).toEqual(3);
    });

    const button = app.getByRole('button', { name: 'create-note' });

    await fireEvent.click(button);

    await waitFor(() => {
      expect(app.getByTestId('n-form')).toBeInTheDocument();
    });

    const noteForm = app.getByTestId('n-form');

    fireEvent.focus(noteForm);

    await fireEvent.input(noteForm, {
      target: {
        value: 'Hello World',
      },
    });

    await fireEvent.blur(noteForm);

    await waitFor(() => {
      expect(app.getAllByTestId('note', { exact: false }).length).toEqual(4);
    });
  });

  it('Updates note with changes upon blur event after selecting note', async () => {
    const app = render(<App />);

    await waitFor(() => {
      expect(app.getByTestId('note-1')).toBeInTheDocument();
    });

    await fireEvent.click(app.getByTestId('note-1'));

    await waitFor(() => {
      expect(app.getByTestId('n-form')).toBeInTheDocument();
    });

    const noteForm = app.getByTestId('n-form');

    fireEvent.focus(noteForm);

    await fireEvent.input(noteForm, {
      target: {
        value: 'Updated Note',
      },
    });

    await fireEvent.blur(noteForm);

    await waitFor(() => {
      expect(app.getAllByTestId('note', { exact: false }).length).toEqual(3);
      expect(app.getByText('Updated Note')).toBeInTheDocument();
    });
  });

  it('Cancels note creation if no text value is provided in textarea', async () => {
    const app = render(<App />);

    await waitFor(() => {
      expect(app.getAllByTestId('note', { exact: false }).length).toEqual(3);
    });

    const button = app.getByRole('button', { name: 'create-note' });

    await fireEvent.click(button);

    await waitFor(() => {
      expect(app.getByTestId('n-form')).toBeInTheDocument();
    });

    const noteForm = app.getByTestId('n-form');

    fireEvent.focus(noteForm);

    await fireEvent.blur(noteForm);

    await waitFor(() => {
      expect(app.getAllByTestId('note', { exact: false }).length).toEqual(3);
    });
  });
});
