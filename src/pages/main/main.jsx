import React from 'react';
import history from '../../utils/history';
import { CatLogo } from '../../common/components/cat-logo';
import css from './main.module.css';
import classNames from 'classnames/bind';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { withRouter, Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '../../common/components/icon/icon';

class MainPageWithoutRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
      some: 2,
    };
    this.style = classNames.bind(css);
  }

  // Template methods

  get isSearchButtonDisabled() {
    return !this.state.searchName;
  }

  onSearchButtonClick = () => {
    this._search();
  };

  onKeyUp = event => {
    this.setState({ searchName: event.target.value });

    if (event.key === 'Enter') {
      this._search();
    }
  };

  // Private methods

  _search() {
    if (!this.state.searchName) return;

    history.push(`/search/${this.state.searchName}`);
  }

  render() {
    return (
      <>
        <section className={this.style('section', 'full-size')}>
          <div className={this.style('container', 'full-size')}>
            <div
              className={this.style(
                'columns',
                'is-flex-mobile',
                'is-centered',
                'is-vcentered',
                'full-size'
              )}
            >
              <div className="column is-8">
                <div className={this.style('columns', 'is-mobile', 'header')}>
                  <div className="column">
                    <h1
                      className={this.style(
                        'is-size-1-mobile',
                        'is-vbottom-mobile',
                        'title'
                      )}
                    >
                      meowle
                    </h1>
                  </div>
                  <div className="column">
                    <CatLogo size="l"></CatLogo>
                  </div>
                </div>
                <div>
                  <div className="field">
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        placeholder="Введите часть имени"
                        autoComplete="off"
                        onKeyUp={this.onKeyUp}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control has-text-centered">
                      <button
                        className="button is-light"
                        type="submit"
                        disabled={this.isSearchButtonDisabled}
                        onClick={this.onSearchButtonClick}
                      >
                        <Icon icon={faSearch} />
                        <span>Найти имя коту</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <LinkToAdd />
      </>
    );
  }
}

export const MainPage = withRouter(MainPageWithoutRoute);

function LinkToAdd() {
  return (
    <Link
      className="button is-light has-background-warning show-add-names"
      to="/cats/add"
      style={{ position: 'absolute', right: '20px', bottom: '20px' }}
    >
      <Icon icon={faPlus} />
    </Link>
  );
}
