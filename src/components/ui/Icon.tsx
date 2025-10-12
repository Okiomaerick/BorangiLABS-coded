import { IconType } from 'react-icons';
import { 
  FaMobile, 
  FaRocket, 
  FaShieldAlt, 
  FaSearch, 
  FaCheck, 
  FaCode, 
  FaServer, 
  FaDatabase, 
  FaWordpress, 
  FaShoppingCart, 
  FaCloud, 
  FaCog,
  FaTools,
  FaLaptopCode,
  FaCertificate,
  FaWrench,
  FaLaptop,
  FaDesktop,
  FaNetworkWired,
  FaShieldVirus,
  FaMobileAlt,
  FaTabletAlt
} from 'react-icons/fa';

type IconName = 
  | 'mobile' 
  | 'rocket' 
  | 'shield' 
  | 'search' 
  | 'code' 
  | 'server' 
  | 'database' 
  | 'wordpress' 
  | 'shopping-cart' 
  | 'cloud' 
  | 'cog' 
  | 'check'
  | 'tools' 
  | 'laptop-code' 
  | 'certificate' 
  | 'wrench' 
  | 'laptop' 
  | 'desktop'
  | 'network' 
  | 'shield-virus' 
  | 'mobile-alt' 
  | 'tablet';

type IconProps = {
  name: IconName;
  className?: string;
};

// Use the IconType from react-icons which is compatible with Font Awesome icons

// Map of icon names to their corresponding components
const iconComponents: Record<IconName, IconType> = {
  'mobile': FaMobile,
  'rocket': FaRocket,
  'shield': FaShieldAlt,
  'search': FaSearch,
  'check': FaCheck,
  'code': FaCode,
  'server': FaServer,
  'database': FaDatabase,
  'wordpress': FaWordpress,
  'shopping-cart': FaShoppingCart,
  'cloud': FaCloud,
  'cog': FaCog,
  'tools': FaTools,
  'laptop-code': FaLaptopCode,
  'certificate': FaCertificate,
  'wrench': FaWrench,
  'laptop': FaLaptop,
  'desktop': FaDesktop,
  'network': FaNetworkWired,
  'shield-virus': FaShieldVirus,
  'mobile-alt': FaMobileAlt,
  'tablet': FaTabletAlt
};

export const Icon = ({ name, className = '' }: IconProps) => {
  const IconComponent = iconComponents[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  // Create an element with the icon component to ensure proper typing
  const IconElement = IconComponent as React.ComponentType<{ className?: string }>;
  return <IconElement className={className} />;
};
