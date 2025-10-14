import React from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  border?: boolean;
  bgColor?: string;
}

const paddingMap = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

const roundedMap = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
};

const shadowMap = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  rounded = 'xl',
  shadow = 'md',
  border = true,
  bgColor = 'bg-background-0',
}) => {
  const baseClasses = `
    ${bgColor}
    ${paddingMap[padding]}
    ${roundedMap[rounded]}
    ${shadowMap[shadow]}
    ${border ? 'border border-outline-200' : ''}
  `.trim();

  return (
    <Box className={`${baseClasses} ${className}`}>
      {children}
    </Box>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  className = '',
}) => {
  return (
    <HStack className={`items-start justify-between mb-4 ${className}`}>
      <VStack className="flex-1">
        <Heading size="lg" className="font-semibold text-typography-900">
          {title}
        </Heading>
        {subtitle && (
          <Text className="text-sm text-typography-600 mt-1">
            {subtitle}
          </Text>
        )}
      </VStack>
      {action && (
        <Box>
          {action}
        </Box>
      )}
    </HStack>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
}) => {
  return (
    <Box className={className}>
      {children}
    </Box>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  className = '',
}) => {
  return (
    <Card className={`${className}`} padding="lg">
      <HStack className="items-center justify-between">
        <VStack className="flex-1">
          <Text className="text-sm font-medium text-typography-600 mb-2">
            {title}
          </Text>
          <Text className="text-2xl font-bold text-typography-900">
            {value}
          </Text>
          {trend && (
            <Text className={`text-xs font-medium mt-1 ${
              trend.isPositive ? 'text-success-600' : 'text-error-600'
            }`}>
              {trend.isPositive ? '+' : ''}{trend.value}
            </Text>
          )}
        </VStack>
        {icon && (
          <Box className="ml-4">
            {icon}
          </Box>
        )}
      </HStack>
    </Card>
  );
};
