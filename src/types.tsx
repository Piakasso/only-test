import { ReactNode } from "react";

export interface Events {
  title: string;
  date: number;
  description: string;
}

export interface Data {
  category: string;
  startYear: number;
  endYear: number;
  events: Events[];
}

export interface ChildrenProps {
  children: ReactNode | ReactNode[];
}

export interface SliderItemProps {
  category: string;
  startYear: number;
  endYear: number;
  events: Events[];
  isMobile: boolean;
  isActive?: boolean;
}

export interface SliderProps {
  data: Data[];
  isMobile: boolean;
}

export interface NavButtonChildren extends ChildrenProps {
  disabled?: boolean;
  handleButton?: () => void;
  styles?: {
    [key: string]: string | number;
  };
  classNames?: string;
}

export interface FactsSliderProps {
  facts: Data;
  isMobile: boolean;
}

export interface FactItemProps {
  date: number;
  title: string;
  description: string;
}

export interface CircleBarProps {
  data: Data[];
  activeIndex: number;
  isMobile: boolean;
}
