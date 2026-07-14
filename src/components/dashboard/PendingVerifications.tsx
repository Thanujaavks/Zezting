import { useMemo, useState } from 'react';
import { ChevronRight, ArrowLeftRight } from 'lucide-react';

interface VerificationCard {
  name: string;
  gender: string;
  age: number;
  city: string;
  eligible: 'CA' | 'Zezting';
  daysAgo: number;
}

const CARDS: VerificationCard[] = [
  { name: 'StarVoice_482', gender: 'Female', age: 34, city: 'Kochi', eligible: 'CA', daysAgo: 1 },
  { name: 'MelodyQueen_119', gender: 'Female', age: 27, city: 'Mumbai', eligible: 'Zezting', daysAgo: 3 },
  { name: 'SilkVoice_207', gender: 'Female', age: 31, city: 'Delhi', eligible: 'CA', daysAgo: 2 },
  { name: 'DreamyTone_356', gender: 'Female', age: 24, city: 'Bengaluru', eligible: 'CA', daysAgo: 5 },
  { name: 'VelvetVoice_089', gender: 'Female', age: 29, city: 'Chennai', eligible: 'Zezting', daysAgo: 4 },
  { name: 'CharmSpeak_275', gender: 'Female', age: 38, city: 'Pune', eligible: 'CA', daysAgo: 1 },
  { name: 'MysticVoice_412', gender: 'Female', age: 26, city: 'Hyderabad', eligible: 'CA', daysAgo: 6 },
  { name: 'GoldenTone_138', gender: 'Female', age: 33, city: 'Jaipur', eligible: 'Zezting', daysAgo: 2 },
  { name: 'SereneVoice_294', gender: 'Female', age: 30, city: 'Lucknow', eligible: 'CA', daysAgo: 7 },
  { name: 'RadiantVoice_167', gender: 'Female', age: 25, city: 'Ahmedabad', eligible: 'CA', daysAgo: 3 },
  { name: 'EchoQueen_053', gender: 'Female', age: 36, city: 'Kolkata', eligible: 'Zezting', daysAgo: 8 },
  { name: 'LunaVoice_321', gender: 'Female', age: 28, city: 'Indore', eligible: 'CA', daysAgo: 1 },
];

type SortOrder = 'old' | 'new';

export default function PendingVerifications() {
  const [sort, setSort] = useState<SortOrder>('new');

  const sorted = useMemo(() => {
    const copy = [...CARDS];
    copy.sort((a, b) => (sort === 'new' ? a.daysAgo - b.daysAgo : b.daysAgo - a.daysAgo));
    return copy;
  }, [sort]);

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Pending verifications</span>
        <div className="sort-toggle">
          <button
            type="button"
            className={sort === 'old' ? 'active' : ''}
            onClick={() => setSort('old')}
          >
            Old
          </button>
          <ArrowLeftRight size={13} />
          <button
            type="button"
            className={sort === 'new' ? 'active' : ''}
            onClick={() => setSort('new')}
          >
            New
          </button>
        </div>
      </div>

      <div className="verification-grid">
        {sorted.map((card) => (
          <button type="button" className="verification-card" key={card.name}>
            <span className="verification-card-head">
              <span className="verification-card-name">{card.name}</span>
              <ChevronRight size={16} />
            </span>
            <span className="verification-card-sub">
              {card.gender} <span className="dot-sep">•</span> {card.age} <span className="dot-sep">•</span> {card.city}
            </span>
            <span className="verification-badges">
              <span className="badge-pending">Pending Approval</span>
              <span className="badge-eligible">{card.eligible} Eligible</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
