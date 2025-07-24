declare module '@sail/ui' {
  import { ReactNode } from 'react';
  
  export interface BadgeProps {
    type?: 'default' | 'info' | 'positive' | 'negative' | 'warning' | 'urgent' | 'new';
    children: ReactNode;
  }
  
  export interface ButtonProps {
    type?: 'primary' | 'secondary' | 'destructive';
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    children: ReactNode;
  }
  
  export interface BannerProps {
    type?: 'default' | 'caution' | 'critical';
    description: string;
    title?: string;
  }

  export interface LinkProps {
    href: string;
    children: ReactNode;
  }

  export interface BreadcrumbsProps {
    children: ReactNode;
  }

  export interface SpinnerProps {
    size?: 'small' | 'medium' | 'large';
    delay?: number;
  }

  export interface PageProps {
    children: ReactNode;
    header?: ReactNode;
  }

  export interface PageHeaderProps {
    title: ReactNode;
    description?: string;
    breadcrumbs?: ReactNode;
    actions?: ReactNode;
  }

  export interface PageModuleProps {
    title?: string;
    children: ReactNode;
  }

  export interface PropertyListProps {
    children: ReactNode;
  }

  export interface PropertyListItemProps {
    label: string;
    value: ReactNode;
  }

  export interface ListProps {
    children: ReactNode;
    onAction?: (id: string) => void;
  }

  export interface ListItemProps {
    id: string;
    title: string;
    secondaryTitle?: string;
    value?: ReactNode;
    icon?: ReactNode;
  }

  export interface TextFieldProps {
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
  }

  export interface FormFieldProps {
    label: string;
    children: ReactNode;
    error?: string;
  }

  export interface BasicTableColumn {
    key: string;
    label: string;
  }

  export interface BasicTableProps {
    columns: BasicTableColumn[];
    rows: Record<string, any>[];
  }
  
  export const Badge: React.FC<BadgeProps>;
  export const Button: React.FC<ButtonProps>;
  export const Banner: React.FC<BannerProps>;
  export const Link: React.FC<LinkProps>;
  export const Breadcrumbs: React.FC<BreadcrumbsProps>;
  export const Spinner: React.FC<SpinnerProps>;
  export const Page: React.FC<PageProps>;
  export const PageHeader: React.FC<PageHeaderProps>;
  export const PageModule: React.FC<PageModuleProps>;
  export const PropertyList: React.FC<PropertyListProps> & {
    Item: React.FC<PropertyListItemProps>;
  };
  export const List: React.FC<ListProps>;
  export const ListItem: React.FC<ListItemProps>;
  export const TextField: React.FC<TextFieldProps>;
  export const FormField: React.FC<FormFieldProps>;
  export const BasicTable: React.FC<BasicTableProps>;
} 