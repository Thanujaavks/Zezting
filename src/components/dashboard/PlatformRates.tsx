import { useState } from 'react';

interface RateTier {
  coins: number;
  rate: number;
}

const DEFAULT_TIERS: RateTier[] = [
  { coins: 95, rate: 45 },
  { coins: 190, rate: 85 },
  { coins: 249, rate: 98 },
  { coins: 299, rate: 148 },
  { coins: 350, rate: 199 },
  { coins: 749, rate: 599 },
  { coins: 999, rate: 729 },
];

export default function PlatformRates() {
  const [tiers, setTiers] = useState(DEFAULT_TIERS);

  const updateRate = (index: number, value: string) => {
    const num = Number(value);
    if (Number.isNaN(num)) return;
    setTiers((prev) => prev.map((t, i) => (i === index ? { ...t, rate: num } : t)));
  };

  return (
    <div className="panel platform-rates-panel">
      <div className="panel-head">
        <span className="panel-title">Platform Rates</span>
      </div>

      <div className="rate-list">
        {tiers.map((tier, i) => (
          <div className="rate-row" key={tier.coins}>
            <span className="rate-coins">
              <span className="coin-disc" />
              {tier.coins}
            </span>

            <label className="rate-input">
              <span>₹</span>
              <input
                type="number"
                min={0}
                value={tier.rate}
                onChange={(e) => updateRate(i, e.target.value)}
                aria-label={`Rate for ${tier.coins} coins`}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
