import { Component, h } from 'preact';

import AsyncRoute from 'preact-async-route';
import Router from 'preact-router';
import { Link } from 'preact-router/match';

import Loading from './pages/loading/Loading';
import LoadingFailed from './pages/loadingFailed/LoadingFailed';
import NotFound from './pages/notFound/NotFound';

import './style.scss';
import Dropdown from './components/dropdown/Dropdown';

/**
 * Main component of the application.
 */
export default class App extends Component<{}, {}> {
  /**
   * Render the component.
   *
   * Called by Preact.
   *
   * @return The element to render.
   */
  public render(): JSX.Element {
    return (
      <main>
        <header>
          <h1>Document Attestation</h1>
          <nav>
            <Link activeClassName="active" href="/">
              Peers
            </Link>
            <Link activeClassName="active" href="/attributes">
              Attributes
            </Link>
            <Link activeClassName="active" href="/outstanding">
              Outstanding
            </Link>
            <Dropdown />
          </nav>
        </header>
        <Router>
          <AsyncRoute
            path="/"
            loading={() => <Loading />}
            getComponent={() => this.fetchPage('Peers')}
          />
          <AsyncRoute
            path="/attributes"
            loading={() => <Loading />}
            getComponent={() => this.fetchPage('Attributes')}
          />
          <AsyncRoute
            path="/outstanding"
            loading={() => <Loading />}
            getComponent={() => this.fetchPage('Outstanding')}
          />
          <NotFound default />
        </Router>
      </main>
    );
  }

  /**
   * Load a page asynchronously.
   *
   * @param page Page name to import
   * @return The JSX of the imported page.
   */
  private async fetchPage(page: string): Promise<JSX.Element> {
    try {
      const module = await import(`./pages/${page.toLowerCase()}/${page}`);
      return module.default;
    } catch (e) {
      return LoadingFailed as any;
    }
  }
}
