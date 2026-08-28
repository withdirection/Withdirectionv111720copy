import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { Contact } from '../../src/app/components/Contact';

/**
 * The regression this pins: the form previously had no onSubmit, no action and
 * no method, while every input carried a name. Submitting therefore performed a
 * native GET to the current URL, writing the visitor's name, email, phone and
 * message into the query string — where analytics captured it as page_location
 * and the browser kept it in history.
 *
 * Note the required fields must be filled before every submit. Constraint
 * validation blocks the submit event otherwise, and a test that skips this
 * passes without ever exercising the code path it claims to cover.
 */
describe('contact form', () => {
  const renderForm = () =>
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );

  const submitButton = () => screen.getByRole('button', { name: /send message/i });

  async function fillRequired(
    values = {
      name: 'Jordan Reyes',
      email: 'jordan@example.org',
      message: 'Court hearing, 3 March.',
    },
  ) {
    await userEvent.type(screen.getByLabelText(/^name/i), values.name);
    await userEvent.type(screen.getByLabelText(/^email/i), values.email);
    await userEvent.type(screen.getByLabelText(/^message/i), values.message);
  }

  it('does not let the browser submit natively', async () => {
    renderForm();
    await fillRequired();

    expect(submitButton().closest('form')).not.toBeNull();

    // Listen on document, not on the form. React 18 attaches its handlers to
    // the root container, so a listener bound to the form itself runs earlier
    // in the bubble phase and always observes defaultPrevented === false.
    let defaultPrevented: boolean | null = null;
    const spy = (event: Event) => {
      defaultPrevented = event.defaultPrevented;
    };
    document.addEventListener('submit', spy);
    try {
      await userEvent.click(submitButton());
    } finally {
      document.removeEventListener('submit', spy);
    }

    expect(
      defaultPrevented,
      'The submit event never fired, or was not defaulted-prevented. If the browser ' +
        'navigates, every named field is written into the query string.',
    ).toBe(true);
  });

  it('keeps what the visitor typed out of the URL', async () => {
    renderForm();
    const before = window.location.search;

    await fillRequired();
    await userEvent.click(submitButton());

    // Guard against the assertion below passing because nothing was submitted.
    expect(screen.getByRole('status')).toBeInTheDocument();

    expect(window.location.search).toBe(before);
    expect(window.location.href).not.toContain('jordan%40example.org');
    expect(window.location.href).not.toContain('Jordan');
  });

  it('tells the visitor their message was not delivered', async () => {
    renderForm();
    await fillRequired();
    await userEvent.click(submitButton());

    const status = await screen.findByRole('status');
    expect(status).toHaveTextContent(/not connected yet/i);
    expect(within(status).getByRole('link')).toHaveAttribute(
      'href',
      'mailto:info@withdirection.net',
    );
  });

  it('marks the fields a visitor must complete', () => {
    renderForm();
    expect(screen.getByLabelText(/^name/i)).toBeRequired();
    expect(screen.getByLabelText(/^email/i)).toBeRequired();
    expect(screen.getByLabelText(/^message/i)).toBeRequired();
  });
});
