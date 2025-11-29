import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../../Frontend-Full/src/layouts/dashboard';
import MainLayout from '../../Frontend-Full/src/layouts/main';
import CompactLayout from '../../Frontend-Full/src/layouts/compact';
import SimpleLayout from '../../Frontend-Full/src/layouts/simple';
// guards
import AuthGuard from '../../Frontend-Full/src/auth/AuthGuard';
import GuestGuard from '../../Frontend-Full/src/auth/GuestGuard';
// components
import LoadingScreen from '../../Frontend-Full/src/components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: React.ComponentType<any>) => (props: any) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// ----------------------------------------------------------------------

// Auth
const LoginPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/auth/login')));
const RegisterPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/auth/register')));
const VerifyCodePage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/auth/verify')));
const NewPasswordPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/auth/new-password')));
const ResetPasswordPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/auth/reset-password')));

// Dashboard
const GeneralAppPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/app')));
const GeneralEcommercePage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/ecommerce')));
const GeneralAnalyticsPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/analytics')));
const GeneralBankingPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/banking')));
const GeneralBookingPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/booking')));
const GeneralFilePage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/file')));

// User
const UserProfilePage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/user/profile')));
const UserCardsPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/user/cards')));
const UserListPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/user/list')));
const UserAccountPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/user/account')));
const UserCreatePage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/user/new')));
const UserEditPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/user/[name]/edit')));

// E-Commerce
const EcommerceShopPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/e-commerce/shop')));
const EcommerceProductDetailsPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/e-commerce/product/[name]')));
const EcommerceProductListPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/e-commerce/list')));
const EcommerceProductCreatePage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/e-commerce/product/new')));
const EcommerceProductEditPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/e-commerce/product/[name]/edit')));
const EcommerceCheckoutPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/e-commerce/checkout')));

// Invoice
const InvoiceListPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/invoice/list')));
const InvoiceDetailsPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/invoice/[id]/index')));
const InvoiceCreatePage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/invoice/new')));
const InvoiceEditPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/invoice/[id]/edit')));

// Blog
const BlogPostsPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/blog/posts')));
const BlogPostPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/blog/post/[title]')));
const BlogNewPostPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/blog/new')));

// Calendar, Kanban, Mail, Chat
const CalendarPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/calendar')));
const KanbanPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/kanban')));
const ChatPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/chat/index')));
const MailPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/mail/[systemLabel]')));

// Other
const BlankPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/blank')));
const PermissionDeniedPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/dashboard/permission-denied')));

// Main Pages
const HomePage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/index')));
const AboutPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/about-us')));
const ContactPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/contact-us')));
const FaqsPage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/faqs')));

// Error Pages
const Page500 = Loadable(lazy(() => import('../../Frontend-Full/src/pages/500')));
const Page403 = Loadable(lazy(() => import('../../Frontend-Full/src/pages/403')));
const Page404 = Loadable(lazy(() => import('../../Frontend-Full/src/pages/404')));
const MaintenancePage = Loadable(lazy(() => import('../../Frontend-Full/src/pages/maintenance')));

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth routes
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: 'verify', element: <VerifyCodePage /> },
        { path: 'new-password', element: <NewPasswordPage /> },
        { path: 'reset-password', element: <ResetPasswordPage /> },
      ],
    },

    // Dashboard routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/dashboard/app" replace />, index: true },
        { path: 'app', element: <GeneralAppPage /> },
        { path: 'ecommerce', element: <GeneralEcommercePage /> },
        { path: 'analytics', element: <GeneralAnalyticsPage /> },
        { path: 'banking', element: <GeneralBankingPage /> },
        { path: 'booking', element: <GeneralBookingPage /> },
        { path: 'file', element: <GeneralFilePage /> },

        // User routes
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfilePage /> },
            { path: 'cards', element: <UserCardsPage /> },
            { path: 'list', element: <UserListPage /> },
            { path: 'new', element: <UserCreatePage /> },
            { path: ':name/edit', element: <UserEditPage /> },
            { path: 'account', element: <UserAccountPage /> },
          ],
        },

        // E-commerce routes
        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShopPage /> },
            { path: 'list', element: <EcommerceProductListPage /> },
            { path: 'product/:name', element: <EcommerceProductDetailsPage /> },
            { path: 'product/new', element: <EcommerceProductCreatePage /> },
            { path: 'product/:name/edit', element: <EcommerceProductEditPage /> },
            { path: 'checkout', element: <EcommerceCheckoutPage /> },
          ],
        },

        // Invoice routes
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceListPage /> },
            { path: ':id', element: <InvoiceDetailsPage /> },
            { path: ':id/edit', element: <InvoiceEditPage /> },
            { path: 'new', element: <InvoiceCreatePage /> },
          ],
        },

        // Blog routes
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPostsPage /> },
            { path: 'post/:title', element: <BlogPostPage /> },
            { path: 'new', element: <BlogNewPostPage /> },
          ],
        },

        // Other dashboard routes
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'kanban', element: <KanbanPage /> },
        { path: 'chat', element: <ChatPage /> },
        { path: 'chat/:conversationKey', element: <ChatPage /> },
        { path: 'mail/:systemLabel', element: <MailPage /> },
        { path: 'mail/:systemLabel/:mailId', element: <MailPage /> },
        { path: 'permission-denied', element: <PermissionDeniedPage /> },
        { path: 'blank', element: <BlankPage /> },
      ],
    },

    // Main routes
    {
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'about-us', element: <AboutPage /> },
        { path: 'contact-us', element: <ContactPage /> },
        { path: 'faqs', element: <FaqsPage /> },
      ],
    },

    // Error routes
    {
      element: <CompactLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: 'maintenance', element: <MaintenancePage /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
