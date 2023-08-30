// @ts-nocheck

import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import envData from '../../../config/env.json';
import {
  availableLangs,
  langDisplayNames
} from '../../../config/i18n/all-langs';
import { Link } from '../../helpers';
import createLanguageRedirect from '../../create-language-redirect';

const { clientLocale, radioLocation, apiLocation } = envData;
const locales = availableLangs.client;

export interface NavLinksProps {
  displayMenu?: boolean;
  fetchState?: { pending: boolean };
  toggleDisplayMenu?: React.MouseEventHandler<HTMLButtonElement>;
  user?: Record<string, unknown>;
  navigate?: (location: string) => void;
}

const NavLinks = ({
  displayMenu,
  fetchState,
  toggleDisplayMenu,
  user,
  navigate
}: NavLinksProps): JSX.Element => {
  const { t } = useTranslation();
  const { pending } = fetchState;
  const { isDonating, username } = user;


  return pending ? (
    <div className='nav-skeleton' />
  ) : (
    <div className={'nav-list' + (displayMenu ? ' display-menu' : '')}>

      {
      // isDonating ? (
      //   <div className='nav-link nav-link-flex nav-link-header' key='donate'>
      //     <span>{t('donate.thanks')}</span>
      //     {/* <FontAwesomeIcon icon={faHeart} /> */}
      //   </div>
      // ) : (
      //   <Link className='nav-link' key='donate' sameTab={false} to='/donate'>
      //     {t('buttons.donate')}
      //   </Link>
      // )
      }

      {!username && (
        <a
          className='nav-link nav-link-sign-in'
          href={`${apiLocation}/signin`}
          key='signin'
        >
          {t('buttons.sign-in')}
        </a>
      )}
      <Link className='nav-link' key='learn' to='/learn'>
        {t('buttons.curriculum')}
      </Link>
      {username && (
        <Fragment key='profile-settings'>
          <Link
            className='nav-link'
            key='profile'
            sameTab={false}
            to={`/${username}`}
          >
            {t('buttons.profile')}
          </Link>
          <Link
            className='nav-link'
            key='settings'
            sameTab={false}
            to={`/settings`}
          >
            {t('buttons.settings')}
          </Link>
        </Fragment>
      )}
      <hr className='nav-line' />
      <Link
        className='nav-link nav-link-flex'
        external={true}
        key='forum'
        sameTab={false}
        to={t('links:nav.forum')}
      >
        <span>{t('buttons.forum')}</span>
        {/* <FontAwesomeIcon icon={faExternalLinkAlt} /> */}
      </Link>
      <hr className='nav-line' />
      <div className='nav-link nav-link-header' key='lang-header'>
        {t('footer.language')}
      </div>
      <div className='nav-link dropdown-nav-link' key='language-dropdown'>
        <select
          className='nav-link-lang-dropdown'
          onChange={(
            event: React.ChangeEvent<HTMLSelectElement>
          ): void => {
            toggleDisplayMenu();

            const path = createLanguageRedirect({
              clientLocale,
              lang: event.target.value
            });

            return navigate(path);
          }}
          value={clientLocale}
        >
          {locales.map(lang => (
            <option key={'lang-' + lang} value={lang}>
              {langDisplayNames[lang]}
            </option>
          ))}
        </select>
      </div>
      {username && (
        <Fragment key='signout-frag'>
          <hr className='nav-line-2' />
          <a
            className='nav-link'
            href={`${apiLocation}/signout`}
            key='sign-out'
          >
            {t('buttons.sign-out')}
          </a>
        </Fragment>
      )}
    </div>
  );
}

NavLinks.displayName = 'NavLinks';

export default NavLinks;
