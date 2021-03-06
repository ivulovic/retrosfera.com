import { Radio } from 'app/components/Radio';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

export function LanguageSwitch() {
  const { i18n } = useTranslation();
  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
  };

  return (
    <Wrapper>
      <Languages>
        <Radio
          id="sr"
          label="Српски"
          className="radio"
          name="language"
          onChange={handleLanguageChange}
          value="sr"
          isSelected={i18n.language === 'sr'}
        />
        <Radio
          id="en"
          label="English"
          className="radio"
          name="language"
          onChange={handleLanguageChange}
          value="en"
          isSelected={i18n.language === 'en'}
        />
      </Languages>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Languages = styled.div`
  display: flex;

  .radio {
    margin-right: 1.5rem;
  }
`;
