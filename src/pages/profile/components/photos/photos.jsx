import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { PhotosApi } from '../../../../api/photos';
import { notify } from '../../../../utils/notifications/notifications';
import style from './photos.module.css';

export function Photos({ catId, links: _links }) {
  const [links, updateLinks] = useState(_links);
  const onCompleteUpload = link => updateLinks([link, ...links]);

  useEffect(() => {
    updateLinks(_links);
  }, [_links]);

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-2"></div>
          <div className="column">
            <div>
              <span className="title is-3">Фотографии</span>
            </div>
            <br />
            <div className={classNames(style.gallery)}>
              <Upload catId={catId} onComplete={onCompleteUpload} />
              <PhotoList links={links} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotoList({ links }) {
  const photos = links.map((link, i) => <Photo link={link} key={i} />);

  return photos;
}

function Photo({ link }) {
  return (
    <div
      className={classNames(style.photo)}
      style={{ backgroundImage: `url(http://localhost:8080${link})` }}
    ></div>
  );
}

function Upload({ catId, onComplete }) {
  const onChange = event => {
    const input = event.target;

    PhotosApi.uploadCatPhoto(catId, input.files[0])
      .then(({ fileUrl }) => {
        onComplete(fileUrl);
        notify.success('Фотография успешно загружена');
      })
      .catch(message => {
        notify.error(message || 'Ошибка загрузки фотографии');
      })
      .finally(() => {
        input.value = null;
      });
  };

  return (
    <div className={classNames(style.photo, style.upload)}>
      <label>
        <span className={classNames(style.title, 'title')}>Добавить фото</span>
        <form>
          <input
            type="file"
            accept="image/png,image/jpeg"
            onChange={onChange}
          />
        </form>
      </label>
    </div>
  );
}
