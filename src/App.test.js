import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import sum from './math'

// test and it can be named the same thing 
test('renders app & sum output with link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Sum Function Output:/i);
  expect(linkElement).toBeInTheDocument();
});

// describe-block is the test suite
describe('true is truthy and false is falsy', () => {
  it('true is truthy', () => {
    expect(true).toBe(true);
  });

  // the it-block (which also can be named test instead of it) is the test case
  it('false is falsy', () => {
    expect(false).toBe(false);
  });
});

// got sum function from math.js file and tested it 
describe('sum', () => {
  it('sums up two values', () => {
    expect(sum(2, 4)).toBe(6);
  });
});

describe('App', () => {
  it('renders App component', async () => {
    render(<App />)
 
    // renders HTML --> RTL sees output human sees 
    // screen.debug();

    // implicit assertion
    // because getByText would throw error
    // if element wouldn't be there
    screen.getByText('Search:');

    // explicit assertion
    // recommended
    expect(screen.getByText('Search:')).toBeInTheDocument();

    // The neat thing about getByRole: it shows all the selectable roles if you provide a role that isn't available in the rendered component's HTML:
    // screen.getByRole('')
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    // Every time you are asserting that an element isn't there, use queryBy. Otherwise default to getBy.
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    // The findBy search variant is used for asynchronous elements which will be there eventually.

    // After its initial render, we assert that the "Signed in as" text is not there by using the queryBy instead of the getBy search variant.
    expect(screen.queryByText(/Signed in as/)).toBeNull();
    // screen.debug();

    // Then we await the new element to be found, and it will be found eventually when the promise resolves and the component re-renders again.
    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
    // screen.debug();

    // FIRE EVENT:

    // wait for the user to resolve
    await screen.findByText(/Signed in as/);;

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
    
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });

    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();

    // Can do this instead of above:
    waitFor(() =>
      expect(
        screen.getByText(/Searches for JavaScript/)
      ).toBeInTheDocument()
    );

    // USER EVENT

    // wait for the user to resolve
    // await screen.findByText(/Signed in as/);

    // expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    // await userEvent.type(screen.getByRole('textbox'), 'JavaScript');

    // expect(
    //   screen.getByText(/Searches for JavaScript/)
    // ).toBeInTheDocument();


  })
})