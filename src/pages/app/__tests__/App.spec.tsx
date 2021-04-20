import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { ARIA_LABEL } from '../../../unions/test/aria-label';
import { ROUTER_PATH, RouterPath } from '../../../unions/router-path';

const renderWithRouter = (route: RouterPath) => {
  window.history.pushState({}, '', route);
  render(<App />, { wrapper: BrowserRouter });
};

describe('Appコンポーネントのテスト', () => {
  it('初期表示時はHomeコンポーネントが表示されていることをチェックする', () => {
    render(<App />);
    expect(screen.getByLabelText(ARIA_LABEL.HOME)).toBeInTheDocument();
  });

  it('ルーティングが正しいことをチェックする', () => {
    renderWithRouter(ROUTER_PATH.ANALYTICS);
    expect(screen.getByLabelText(ARIA_LABEL.ANALYTICS)).toBeInTheDocument();

    renderWithRouter(ROUTER_PATH.HOME);
    expect(screen.getByLabelText(ARIA_LABEL.HOME)).toBeInTheDocument();
  });
});
