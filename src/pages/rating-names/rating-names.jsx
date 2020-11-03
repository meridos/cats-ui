import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { ReactionApi } from '../../api/reaction';
import { notify } from '../../utils/notifications/notifications';
import { Header } from '../../common/components/header';
import { CatLogo } from '../../common/components/cat-logo';
import { Icon } from '../../common/components/icon/icon';
import { Link } from 'react-router-dom';
import style from './rating-names.module.css';
import classNames from 'classnames';

const DEFAULT_ERROR = 'Ошибка загрузки рейтинга';

export function RatingNamesPage() {
  const [items, setItems] = useState({ likes: [], dislikes: [] });

  useEffect(() => {
    ReactionApi.rating()
      .then(setItems)
      .catch(message => notify.error(message || DEFAULT_ERROR));
  }, []);

  return (
    <>
      <Header />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-2">
              <CatLogo class="is-hidden-mobile" />
            </div>
            <div className="column">
              <div className="title is-3">Рейтинг имён котиков</div>
              <div className="columns">
                <NamesList type="top" items={items && items.likes} />
                <NamesList type="antiTop" items={items && items.dislikes} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function NamesList({ type, items }) {
  const countField = {
    top: 'likes',
    antiTop: 'dislikes',
  }[type];
  const itemsEl = items.map((item, i) => (
    <Item
      catId={item.id}
      type={type}
      key={i}
      number={i + 1}
      name={item.name}
      count={item[countField]}
    />
  ));
  return (
    <table className={classNames(style.table)}>
      <tbody>{itemsEl}</tbody>
    </table>
  );
}

NamesList.propTypes = {
  type: PropTypes.oneOf(['top', 'antiTop']).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function Item({ catId, type, number, name, count }) {
  const link = `/cats/${catId}`;
  const icon = {
    top: faThumbsUp,
    antiTop: faThumbsDown,
  }[type];
  const colorClass = {
    top: 'has-text-success',
    antiTop: 'has-text-danger',
  }[type];

  return (
    <tr>
      <td className={style['item-numerable']}>{number}</td>
      <td className={style['item-name']}>
        <Link to={link}>{name}</Link>
      </td>
      <td className={classNames(style['item-count'], colorClass)}>
        <Icon icon={icon} />
        {count}
      </td>
    </tr>
  );
}

Item.propTypes = {
  catId: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['top', 'antiTop']).isRequired,
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
