import Paragraph from 'app/components/Paragraph';
import Subtitle from 'app/components/Subtitle';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function ResultRow({ title, link, description }) {
  const { t } = useTranslation();
  return (
    <div className="result-row">
      <Link to={link}>
        <Subtitle>{t(title)}</Subtitle>
      </Link>
      <Paragraph>{t(description)}</Paragraph>
    </div>
  );
}
