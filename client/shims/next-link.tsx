// Shim for Next.js Link component using React Router
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { forwardRef } from 'react';

interface NextLinkProps extends Omit<RouterLinkProps, 'to'> {
  href: string;
  children?: React.ReactNode;
}

const NextLink = forwardRef<HTMLAnchorElement, NextLinkProps>(
  ({ href, children, ...other }, ref) => {
    return (
      <RouterLink ref={ref} to={href} {...other}>
        {children}
      </RouterLink>
    );
  }
);

NextLink.displayName = 'NextLink';

export default NextLink;
