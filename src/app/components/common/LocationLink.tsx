import { ReactElement } from 'react';
import Link from 'next/link';

interface LocationProps {
  link: string;
  children: ReactElement;
}

const LocationComponent: React.FC<LocationProps> = ({ link, children }) => {
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  );
};

export default LocationComponent;
