import React, { useState, useEffect } from 'react';
import { useParams, Switch, Route, useRouteMatch } from 'react-router-dom';
import { Header } from '../../common/components/header';
import { CatLogo } from '../../common/components/cat-logo';
import { GenderIcon } from '../../common/components/gender-icon';
import { CatsApi } from '../../api/cats';
import { Description } from './components/description';

export function ProfilePage() {
  const match = useRouteMatch();
  const { catId } = useParams();
  const [catInfo, updateInfo] = useState(null);

  useEffect(() => {
    loadCatProfile(catId, updateInfo);
  }, [catId]);

  const info = catInfo ? (
    <Info catInfo={catInfo} path={match.path} />
  ) : (
    <div></div>
  );
  return (
    <>
      <Header />
      {info}
    </>
  );
}

function loadCatProfile(id, updateHandler) {
  return CatsApi.getById(id).then(({ data }) => updateHandler(data.cat));
}

function Info({ catInfo, path }) {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-2">
            <CatLogo />
          </div>
          <div className="column">
            <Switch>
              <Route path={`${path}/edit`}>
                <Title catInfo={catInfo} />
              </Route>
              <Route path={`${path}`}>
                <Title catInfo={catInfo} />
                <Description
                  className="description"
                  catId={catInfo.id}
                  description={catInfo.description}
                />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </section>
  );
}

function Title({ catInfo }) {
  return (
    <div className="title is-3">
      Значение имени {catInfo.name}
      &nbsp;
      <GenderIcon gender={catInfo.gender} />
    </div>
  );
}