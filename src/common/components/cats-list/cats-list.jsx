import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CatsApi } from '../../../api/cats';
import { CatLogo } from '../cat-logo';
import { GenderIcon } from '../gender-icon';
import style from './cats-list.module.css';
import { Filter } from '../filter/filter';
import { useQuery } from '../../../utils/query';
import history from '../../../utils/history';

export function CatsList({ searchValue }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setGroups] = useState(null);
  const [error, setError] = useState(null);

  const query = useQuery();
  const genderFilter = query.get('gender');

  useEffect(() => {
    const apiMethod = searchValue
      ? CatsApi.search(searchValue, genderFilter)
      : CatsApi.getAll(genderFilter);

    setLoading(true);
    apiMethod
      .then(data => {
        setGroups(data);
        setError(null);
      })
      .catch(error => {
        setError(error || new Error());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchValue, genderFilter]);

  return isLoading ? null : error ? (
    <Error />
  ) : data?.count ? (
    <Results data={data} />
  ) : searchValue ? (
    <NoResults text="Упс! Ничего не нашли" name={searchValue} />
  ) : null;
}
CatsList.propTypes = {
  searchValue: PropTypes.string,
};

function Error() {
  return <NoResults text="Ошибка загрузки котов"></NoResults>;
}

function NoResults({ text, name }) {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="level">
              <div className="level-item">
                <figure className="image is-64x64">
                  <img src="/img/weary-cat.png" alt="" />
                </figure>
              </div>
            </div>
            <div className="control has-text-centered">
              <div className="h2 subtitle">{text}</div>
            </div>
            <br />
            <div className="control has-text-centered">
              {name ? <AddCat name={name} /> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
NoResults.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function Results({ data }) {
  const query = useQuery();
  const [filter, setFilter] = useState(query.get('gender'));
  const { pathname } = useLocation();

  useEffect(() => {
    const gender = filter ? `gender=${filter}` : '';
    let search = [gender].filter(v => v);

    search = search ? `?${search.join('&')}` : null;

    history.push({
      pathname,
      search,
    });
  }, [filter]);

  return (
    <>
      <section className={classNames('section', style.filter)}>
        <div className="container">
          <div className="columns">
            <div className="column is-2"></div>
            <div className="column">
              <Filter count={data.count} value={filter} onChange={setFilter} />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-2">
              <CatLogo class="is-hidden-mobile" />
            </div>
            <div className="column">
              <Groups groups={data.groups} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
Results.propTypes = {
  data: PropTypes.object.isRequired,
};

function Groups(props) {
  return props.groups.map((group, i) => <Group group={group} key={i} />);
}
Groups.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function Group({ group: { title, count, cats } }) {
  return (
    <div className={style.group}>
      <div className={style.groupHeader}>
        <span className="title is-4">{title}</span>
        <span className="is-pulled-right has-text-grey is-size-7">{count}</span>
      </div>
      <div>
        <Cats cats={cats} />
      </div>
    </div>
  );
}
Group.propTypes = {
  group: PropTypes.object.isRequired,
};

function Cats(props) {
  const catsEl = props.cats.map(cat => <Cat cat={cat} key={cat.id} />);

  return <div className="tags">{catsEl}</div>;
}
Cats.propTypes = {
  cats: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function Cat({ cat: { id, name, gender } }) {
  const link = `/cats/${id}`;

  return (
    <span className="tag is-size-5">
      <GenderIcon gender={gender} />
      <Link to={link} className="has-text-black">
        {name}
      </Link>
    </span>
  );
}
Cat.propTypes = {
  cat: PropTypes.object.isRequired,
};

function AddCat({ name }) {
  return (
    <Link to={`/cats/add/${name}`} className="button is-warning is-medium">
      <span>Добавить&nbsp;</span>
      <span className="has-text-weight-bold">{name}</span>
      <span>&nbsp;в базу?</span>
    </Link>
  );
}
AddCat.propTypes = {
  name: PropTypes.string.isRequired,
};
