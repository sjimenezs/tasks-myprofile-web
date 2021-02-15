import React from 'react';
import {
  render, screen, waitFor, fireEvent, act,
} from '@testing-library/react';
import {
  describe, expect, test, jest,
} from '@jest/globals';
import JobsFitView from '../../jobsfit/JobsFitView';
import bootstrapLocale from '../../localeutil';

async function loadScreen() {
  const Boostrap = await bootstrapLocale('en');
  render(<Boostrap><JobsFitView /></Boostrap>);
  await waitFor(() => screen.getByRole('heading'));
}

async function jobsFitNoData(url) {
  if (url === '/profile/v1/fetchfittojob') {
    return {
      ok: true,
      status: 200,
      json: async () => ({ isError: false, ok: [] }),
    };
  }

  if (url === '/profile/v1/countjobsperskill') {
    return {
      ok: true,
      status: 200,
      json: async () => ({ isError: false, ok: { skills: [] } }),
    };
  }

  return {
    ok: true,
    status: 200,
    json: async () => ({ isError: false, ok: [] }),
  };
}

async function jobsFit(url) {
  if (url === '/profile/v1/fetchfittojob') {
    return {
      ok: true,
      status: 200,
      json: async () => ({ isError: false, ok: { jobsFit: [{ percent: 50, count: 10 }] } }),
    };
  }

  if (url === '/profile/v1/countjobsperskill') {
    return {
      ok: true,
      status: 200,
      json: async () => ({ isError: false, ok: { skills: [] } }),
    };
  }

  return {
    ok: true,
    status: 200,
    json: async () => ({ isError: false, ok: [] }),
  };
}

describe('JobsFitView', () => {
  test('Renders component', async () => {
    await loadScreen();
  });

  test('JobsFit - No data', async () => {
    jest.spyOn(window, 'fetch');
    window.fetch.mockImplementation(jobsFitNoData);
    await loadScreen();
    screen.getByRole('img', { name: /Fit to job: It Shows how many jobs are available per percent of fit job. There are not jobs that fit./i });
  });

  test('JobsFit - Data', async () => {
    jest.spyOn(window, 'fetch');
    window.fetch.mockImplementation(jobsFit);
    await loadScreen();
    screen.getByRole('img', { name: /Fit to job: It Shows how many jobs are available per percent of fit job. 10 jobs have 50% of match./i });
  });
});
