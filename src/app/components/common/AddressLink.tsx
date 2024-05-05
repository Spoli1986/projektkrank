import { ReactElement } from 'react';
import { getMapLink } from '../../../../utils/utils';
import Link from 'next/link';

interface AddressProps {
  address: string;
  children: ReactElement;
}

const AddressComponent: React.FC<AddressProps> = ({ address, children }) => {
  const mapLink = getMapLink(address);

  return (
    <Link href={mapLink} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  );
};

export default AddressComponent;
