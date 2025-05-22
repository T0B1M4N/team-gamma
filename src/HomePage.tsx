import React from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation(); // hook pro překlady

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button>{t('add_to_cart')}</button>
    </div>
  );
};

export default HomePage;