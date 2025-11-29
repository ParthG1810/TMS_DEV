// Shim for Next.js router using React Router
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();

  return {
    push: (url: string) => navigate(url),
    replace: (url: string) => navigate(url, { replace: true }),
    back: () => navigate(-1),
    pathname: location.pathname,
    query: {
      ...params,
      ...Object.fromEntries(searchParams.entries()),
    },
    asPath: location.pathname + location.search,
    route: location.pathname,
    reload: () => window.location.reload(),
  };
}

export function usePathname() {
  const location = useLocation();
  return location.pathname;
}

export function useSearchParams() {
  const [searchParams] = useSearchParams();
  return searchParams;
}
