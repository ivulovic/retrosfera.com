import { Radio } from 'app/components/Radio';
import styled from 'styled-components/macro';
import { themeActions } from 'styles/theme/slice';
import { useDispatch, useSelector } from 'react-redux';
import { saveTheme } from 'styles/theme/utils';
import { selectThemeKey } from 'styles/theme/slice/selectors';
import { useTranslation } from 'react-i18next';
import { ThemeEnum } from 'styles/theme/slice/types';

export function ThemeSwitch() {
  const { t } = useTranslation();
  const theme = useSelector(selectThemeKey);
  const dispatch = useDispatch();

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as ThemeEnum;
    saveTheme(value);
    dispatch(themeActions.changeTheme(value));
  };

  return (
    <Wrapper>
      <Themes>
        <Radio
          id="system"
          label={t('systemTheme')}
          className="radio"
          name="theme"
          onChange={handleThemeChange}
          value="system"
          isSelected={theme === 'system'}
        />
        <Radio
          id="light"
          label={t('lightTheme')}
          className="radio"
          name="theme"
          onChange={handleThemeChange}
          value="light"
          isSelected={theme === 'light'}
        />
        <Radio
          id="dark"
          label={t('darkTheme')}
          className="radio"
          name="theme"
          onChange={handleThemeChange}
          value="dark"
          isSelected={theme === 'dark'}
        />
      </Themes>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Themes = styled.div`
  display: flex;

  .radio {
    margin-right: 1.5rem;
  }
`;
