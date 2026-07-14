import { Construction } from 'lucide-react';

interface ComingSoonProps {
  section: string;
}

export default function ComingSoon({ section }: ComingSoonProps) {
  return (
    <div className="panel coming-soon">
      <Construction size={28} />
      <span className="coming-soon-title">{section}</span>
      <span className="coming-soon-text">This section is still being built.</span>
    </div>
  );
}
