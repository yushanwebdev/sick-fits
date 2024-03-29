/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';
// At it's simplest, the access control returns a yes or no value depending on the users session

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permissions check if someone meets a criteria - yes or no
export const permissions = {
  // Other Methods (Not Good)
  // canManageProducts({ session }) {
  //   return session?.data.role?.canManageProducts;
  // },
  // can(permission) {
  //   return function () {
  //     return session?.data.role[permission];
  //   };
  // },
  ...generatedPermissions,
};

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }

    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageProducts({ session })) {
      return true;
    }

    // 2. If not, do they own this item? (this is like Where clause in the Query)
    return {
      user: {
        id: session.itemId,
      },
    };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (permissions.canManageProducts({ session })) {
      return true; // They can read everything
    }

    // They should only see available products (based on the status field)
    return {
      status: 'AVAILABLE',
    };
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }

    console.dir(session, { depth: null });

    // 1. Do they have the permission of canOrder
    if (permissions.canManageOrders({ session })) {
      return true;
    }

    // 2. If not, do they own this item? (this is like Where clause in the Query)
    return {
      user: {
        id: session.itemId,
      },
    };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }

    // 1. Do they have the permission of canOrder
    if (permissions.canManageOrders({ session })) {
      return true;
    }

    // 2. If not, do they own this item? (this is like Where clause in the Query)
    return {
      order: {
        user: {
          id: session.itemId,
        },
      },
    };
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // Otherwise they may only update themselves!
    return {
      id: session.itemId,
    };
  },
};
