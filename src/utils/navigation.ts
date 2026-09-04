import { useState, useEffect, useCallback } from 'react';
import { PageId } from '../types';

export type AdminTab =
  | 'overview'
  | 'properties'
  | 'loans'
  | 'insurances'
  | 'content'
  | 'leads'
  | 'database';

export type ContentSubSection = 'about' | 'privacy' | 'terms' | 'brand' | 'why' | 'stats';

export interface RouteState {
  page: PageId;
  selectedPropertyId?: string;
  adminTab?: AdminTab;
  adminAction?: 'add-property' | 'edit-property' | 'add-category' | 'add-loan' | 'add-insurance';
  editPropertyId?: string;
  contentSub?: ContentSubSection;
  isAdminAuthPage?: boolean;
}

/**
 * Parse the current browser window.location.pathname into structured RouteState
 */
export function parseLocation(pathname: string): RouteState {
  const normalized = pathname.trim().replace(/\/+$/, '') || '/';
  const parts = normalized.split('/').filter(Boolean);

  // If path starts with admin
  if (parts[0] === 'admin') {
    if (parts[1] === 'login') {
      return {
        page: 'admin',
        isAdminAuthPage: true
      };
    }

    const adminSub = parts[1] || 'dashboard';

    if (adminSub === 'dashboard' || adminSub === 'overview') {
      return {
        page: 'admin',
        adminTab: 'overview'
      };
    }

    if (adminSub === 'realestate') {
      // /admin/realestate/category/add-new
      if (parts[2] === 'category' && parts[3] === 'add-new') {
        return {
          page: 'admin',
          adminTab: 'properties',
          adminAction: 'add-category'
        };
      }
      // /admin/realestate/add-new
      if (parts[2] === 'add-new') {
        return {
          page: 'admin',
          adminTab: 'properties',
          adminAction: 'add-property'
        };
      }
      // /admin/realestate/:propertyId/edit
      if (parts[2] && parts[3] === 'edit') {
        return {
          page: 'admin',
          adminTab: 'properties',
          adminAction: 'edit-property',
          editPropertyId: parts[2]
        };
      }
      return {
        page: 'admin',
        adminTab: 'properties'
      };
    }

    if (adminSub === 'loans') {
      if (parts[2] === 'add-new') {
        return {
          page: 'admin',
          adminTab: 'loans',
          adminAction: 'add-loan'
        };
      }
      return {
        page: 'admin',
        adminTab: 'loans'
      };
    }

    if (adminSub === 'insurances') {
      if (parts[2] === 'add-new') {
        return {
          page: 'admin',
          adminTab: 'insurances',
          adminAction: 'add-insurance'
        };
      }
      return {
        page: 'admin',
        adminTab: 'insurances'
      };
    }

    if (adminSub === 'content') {
      const sub = (parts[2] as ContentSubSection) || 'about';
      return {
        page: 'admin',
        adminTab: 'content',
        contentSub: sub
      };
    }

    if (adminSub === 'leads') {
      return {
        page: 'admin',
        adminTab: 'leads'
      };
    }

    if (adminSub === 'database') {
      return {
        page: 'admin',
        adminTab: 'database'
      };
    }

    // Default /admin -> overview
    return {
      page: 'admin',
      adminTab: 'overview'
    };
  }

  // Storefront Pages
  if (parts.length === 0 || parts[0] === 'home') {
    return { page: 'home' };
  }

  if (parts[0] === 'about') return { page: 'about' };
  if (parts[0] === 'realestate') {
    if (parts[1]) {
      return { page: 'property-detail', selectedPropertyId: parts[1] };
    }
    return { page: 'realestate' };
  }
  if (parts[0] === 'property' && parts[1]) {
    return { page: 'property-detail', selectedPropertyId: parts[1] };
  }
  if (parts[0] === 'services') return { page: 'services' };
  if (parts[0] === 'insurances') return { page: 'insurances' };
  if (parts[0] === 'calculator') return { page: 'calculator' };
  if (parts[0] === 'contact') return { page: 'contact' };
  if (parts[0] === 'privacy') return { page: 'privacy' };
  if (parts[0] === 'terms') return { page: 'terms' };

  // Fallback to home
  return { page: 'home' };
}

/**
 * Convert RouteState into a browser URL string
 */
export function buildUrl(route: RouteState): string {
  if (route.page === 'admin') {
    if (route.isAdminAuthPage) {
      return '/admin/login';
    }
    const tab = route.adminTab || 'overview';
    if (tab === 'overview') return '/admin/dashboard';
    if (tab === 'properties') {
      if (route.adminAction === 'add-category') return '/admin/realestate/category/add-new';
      if (route.adminAction === 'add-property') return '/admin/realestate/add-new';
      if (route.adminAction === 'edit-property' && route.editPropertyId) {
        return `/admin/realestate/${route.editPropertyId}/edit`;
      }
      return '/admin/realestate';
    }
    if (tab === 'loans') {
      if (route.adminAction === 'add-loan') return '/admin/loans/add-new';
      return '/admin/loans';
    }
    if (tab === 'insurances') {
      if (route.adminAction === 'add-insurance') return '/admin/insurances/add-new';
      return '/admin/insurances';
    }
    if (tab === 'content') {
      return `/admin/content/${route.contentSub || 'about'}`;
    }
    if (tab === 'leads') return '/admin/leads';
    if (tab === 'database') return '/admin/database';
    return '/admin/dashboard';
  }

  // Storefront
  if (route.page === 'home') return '/';
  if (route.page === 'property-detail' && route.selectedPropertyId) {
    return `/realestate/${route.selectedPropertyId}`;
  }
  return `/${route.page}`;
}

const ROUTE_CHANGE_EVENT = 'pfs_route_change';

/**
 * Navigate to a specific URL or update history state
 */
export function navigateTo(url: string, replace = false) {
  if (typeof window === 'undefined') return;
  if (window.location.pathname === url) return;

  if (replace) {
    window.history.replaceState({}, '', url);
  } else {
    window.history.pushState({}, '', url);
  }

  window.dispatchEvent(new Event(ROUTE_CHANGE_EVENT));
}

/**
 * Custom hook for reactive routing in the application
 */
export function useAppRouter() {
  const [route, setRoute] = useState<RouteState>(() => {
    if (typeof window === 'undefined') return { page: 'home' };
    return parseLocation(window.location.pathname);
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(parseLocation(window.location.pathname));
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener(ROUTE_CHANGE_EVENT, handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener(ROUTE_CHANGE_EVENT, handleLocationChange);
    };
  }, []);

  const navigateRoute = useCallback((newRoute: RouteState, replace = false) => {
    const url = buildUrl(newRoute);
    navigateTo(url, replace);
  }, []);

  const navigateUrl = useCallback((url: string, replace = false) => {
    navigateTo(url, replace);
  }, []);

  return {
    route,
    navigateRoute,
    navigateUrl
  };
}
