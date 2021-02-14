import React from 'react';
import {
  render, screen, waitFor, fireEvent, act,
} from '@testing-library/react';
import {
  describe, expect, test, jest,
} from '@jest/globals';
import HomeView from '../../home/HomeView';
import bootstrapLocale from '../../localeutil';

async function loadHomeScreen() {
  const Boostrap = await bootstrapLocale('en');
  render(<Boostrap><HomeView /></Boostrap>);
  await waitFor(() => screen.getByRole('heading'));
  const username = screen.getByRole('textbox', { name: /torre.co username/i });
  const enter = screen.getByRole('button', { name: /enter/i });
  return { username, enter };
}

async function userDoNotExistsMock() {
  return {
    ok: true,
    status: 200,
    json: async () => ({ isError: true, errorCode: 'error.usernotexists' }),
  };
}

async function ioErrorMock() {
  return {
    ok: false,
    status: 400,
    json: async () => ({}),
  };
}

describe('HomeView', () => {
  test('Renders Home component', async () => {
    const Boostrap = await bootstrapLocale('en');
    render(<Boostrap><HomeView /></Boostrap>);
    await waitFor(() => screen.getByRole('heading'));
    expect(screen.getByRole('textbox', { name: /torre.co username/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /enter/i })).toBeTruthy();
  });

  test('Required inputs', async () => {
    const { username, enter } = await loadHomeScreen();
    expect(username.value).toBe('');
    enter.click();
    expect(username).toBeInvalid();
    fireEvent.change(username, { target: { value: 'test' } });
    expect(username.value).toBe('test');
    enter.click();
    expect(username).toBeValid();
  });

  test('User do not exists', async () => {
    jest.spyOn(window, 'fetch');
    window.fetch.mockImplementation(userDoNotExistsMock);
    const { username, enter } = await loadHomeScreen();
    act(() => {
      fireEvent.change(username, { target: { value: 'invalid' } });
      enter.click();
      expect(username).toBeInvalid();
    });
  });

  test('IO Error', async () => {
    jest.spyOn(window, 'fetch');
    window.fetch.mockImplementation(ioErrorMock);
    const { username, enter } = await loadHomeScreen();
    act(() => {
      fireEvent.change(username, { target: { value: 'valid' } });
      enter.click();
      expect(username).toBeInvalid();
    });
  });
});
