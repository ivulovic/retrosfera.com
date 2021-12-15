import { useState } from 'react';
import Title from 'app/components/Title';
import { useTranslation } from 'react-i18next';
import Ambulances from './Ambulances';
import Button from 'app/components/Button';
import Graphics from './Graphics';

export default function Content() {
  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const { t } = useTranslation();

  return (
    <div className="charts">
      <Title>{t('coronaVirus')}</Title>

      <div className="button-group">
        <Button
          kind={`group-button ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          {t('graphicView')}
        </Button>
        <Button
          kind={`group-button ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => setActiveTab(2)}
        >
          {t('ambulancesView')}
        </Button>
      </div>

      {activeTab === 1 ? <Graphics /> : null}
      {activeTab === 2 ? <Ambulances /> : null}
    </div>
  );
}
