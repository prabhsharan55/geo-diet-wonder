
// src/types/auth.ts

export type UserDetails = {
  id: string;
  email: string;
  full_name: string;
  role: "admin" | "partner" | "customer";
  created_at: string;
};

export type PartnerApplicationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "not_found"
  | string
  | null;

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  userDetails: UserDetails | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role: "admin" | "partner" | "customer",
    linkedPartnerId?: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  resendConfirmation: (email: string) => Promise<void>;
  loading: boolean;
};
