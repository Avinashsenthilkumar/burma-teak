/**
 * Icon registry.
 *
 * Icons are imported by name here rather than inside components so the data
 * files can refer to icons as plain strings and stay free of JSX. Lucide is
 * tree-shaken, so only what is listed below ships.
 */
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bird,
  Check,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Layers,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Play,
  Recycle,
  Sprout,
  Sun,
  TreePine,
  X,
  type LucideIcon,
} from 'lucide-react';

export const iconMap = {
  Bird,
  Droplets,
  Layers,
  Leaf,
  Recycle,
  Sprout,
  Sun,
  TreePine,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Play,
  X,
};
export type { LucideIcon };
