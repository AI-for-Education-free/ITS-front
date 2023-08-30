import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from '../helpers';
import './Footer.css';

const Footer = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <footer className='site-footer'>
      <div className='footer-container'>
        {/* <div className='footer-top'>
          <div className='footer-desc-col'>
            <p>{t('footer.tax-exempt-status')}</p>
            <p>{t('footer.mission-statement')}</p>
            <p>{t('footer.donation-initiatives')}</p>
            <p className='footer-donation'>
              <Trans i18nKey='footer.donate-text'>
                You can
                <Link className='inline' to='/donate'>
                  make a tax-deductible donation here
                </Link>
                .
              </Trans>
            </p>
          </div>
          <div className='trending-guides'>
            <div className='col-header'>{t('footer.trending-guides')}</div>
            <div className='trending-guides-row'>
              <div className='footer-col footer-col-1'>
                <Link external={false} to={t('trending:article0link')}>
                  {t('trending:article0title')}
                </Link>
                <Link external={false} to={t('trending:article1link')}>
                  {t('trending:article1title')}
                </Link>
              </div>
              <div className='footer-col footer-col-2'>
                <Link external={false} to={t('trending:article10link')}>
                  {t('trending:article10title')}
                </Link>
                <Link external={false} to={t('trending:article11link')}>
                  {t('trending:article11title')}
                </Link>
              </div>
              <div className='footer-col footer-col-3'>
                <div className='footer-left'>
                  <Link external={false} to={t('trending:article20link')}>
                    {t('trending:article20title')}
                  </Link>

                </div>

                <div className='footer-right'>
                  <Link external={false} to={t('trending:article25link')}>
                    {t('trending:article25title')}
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className='footer-bottom'>
          <div className='col-header'>{t('footer.our-nonprofit')}</div>
          <div className='footer-divder' />
          <div className='our-nonprofit'>
            <Link external={false} to={t('links:footer.about-url')}>
              {t('footer.links.about')}
            </Link>
            <Link external={false} to={'https://github.com/freeCodeCamp/'}>
              {t('footer.links.open-source')}
            </Link>
            {/* <Link external={false} to={t('links:footer.about-url')}>
              {t('footer.links.about')}
            </Link>
            <Link
              external={false}
              sameTab={false}
              to={'https://www.linkedin.com/school/free-code-camp/people/'}
            >
              {t('footer.links.alumni')}
            </Link>
            <Link external={false} to={'https://github.com/freeCodeCamp/'}>
              {t('footer.links.open-source')}
            </Link>
            <Link
              external={false}
              sameTab={false}
              to={t('links:footer.shop-url')}
            >
              {t('footer.links.shop')}
            </Link>
            <Link external={false} to={t('links:footer.support-url')}>
              {t('footer.links.support')}
            </Link>
            <Link external={false} to={t('links:footer.sponsors-url')}>
              {t('footer.links.sponsors')}
            </Link>
            <Link external={false} to={t('links:footer.honesty-url')}>
              {t('footer.links.honesty')}
            </Link>
            <Link external={false} to={t('links:footer.coc-url')}>
              {t('footer.links.coc')}
            </Link>
            <Link external={false} to={t('links:footer.privacy-url')}>
              {t('footer.links.privacy')}
            </Link>
            <Link external={false} to={t('links:footer.tos-url')}>
              {t('footer.links.tos')}
            </Link>
            <Link external={false} to={t('links:footer.copyright-url')}>
              {t('footer.links.copyright')}
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.displayName = 'Footer';
export default Footer;
