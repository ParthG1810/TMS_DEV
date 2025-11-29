// Shim for Next.js Head component using react-helmet-async
import { Helmet } from 'react-helmet-async';

interface HeadProps {
  children?: React.ReactNode;
}

export default function Head({ children }: HeadProps) {
  return <Helmet>{children}</Helmet>;
}
