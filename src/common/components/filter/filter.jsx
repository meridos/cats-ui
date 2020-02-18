import React from 'react';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';

export function Filter({ count }) {
  const params = useParams();
  console.log(params);
  return (
    <div className="level">
      <form className="level-left">
        <div className="field is-pulled-left">
          <label className="label is-small has-text-weight-normal">Пол</label>
          <div className="control has-icons-left">
            <div className="select is-small">
              <select>
                <option value="">Все</option>
                <option value="male">Муж.</option>
                <option value="female">Жен.</option>
                <option value="unisex">Универс.</option>
              </select>
            </div>
            <div className="icon is-small is-left">
              <FontAwesomeIcon icon={faSort} />
            </div>
          </div>
        </div>
      </form>
      <div className="level-right has-text-right">
        <p className="is-size-7">Найдено имён: {count}</p>
      </div>
    </div>
  );
}
