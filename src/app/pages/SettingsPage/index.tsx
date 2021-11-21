import Title from 'app/components/Title';
import { ThemeSwitch } from './ThemeSwitch';
import { LanguageSwitch } from './LanguageSwitch';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectThemeKey } from 'styles/theme/slice/selectors';
import { isSystemDark } from 'styles/theme/utils';
import LangOutline from 'app/icons/LangOutline';
import Subtitle from 'app/components/Subtitle';
import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import Paragraph from 'app/components/Paragraph';
import { ThemeIcons } from './data';
import { Helmet } from 'react-helmet-async';

export default function SettingsPage(): JSX.Element {
  const { t } = useTranslation();
  const themeKey = useSelector(selectThemeKey);
  const preferedTheme =
    themeKey === 'system' ? (isSystemDark ? 'dark' : 'light') : themeKey;
  const ThemeIcon = ThemeIcons[preferedTheme];
  return (
    <>
      <Helmet>
        <title>{t('settings')}</title>
        <meta name="description" content={t('settingsDescription')} />
      </Helmet>
      <div className="page-wrapper">
        <Title>{t('settings')}</Title>
        <Subtitle>{t('settingsDescription')}</Subtitle>
        <List>
          <ListItem icon={ThemeIcon}>
            <Subtitle type="primary">{t('theme')}</Subtitle>
            <Paragraph>{t('themeDescription')}</Paragraph>
            <ThemeSwitch />
          </ListItem>
          <ListItem icon={LangOutline}>
            <Subtitle type="primary">{t('language')}</Subtitle>
            <Paragraph>{t('languageDescription')}</Paragraph>
            <LanguageSwitch />
          </ListItem>
        </List>
      </div>
    </>
  );
}
