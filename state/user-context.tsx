import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { AuthSession, AuthUser } from "@supabase/supabase-js";
import { supabase } from "../utils/supabaseClient";

type State = {
  session: AuthSession | null;
  user: AuthUser | null;
}

export const UserContext = createContext<State | undefined>(undefined);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AuthSession | null>();
  const [user, setUser] = useState<AuthUser | null>();

  useEffect(() => {
    const fetchedSession = supabase.auth.session();
    setSession(fetchedSession);
    setUser(fetchedSession?.user);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user);
      });

    return () => {
      authListener.unsubscribe();
    };
  }, [session?.user]);

  const value = {
    session,
    user
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};

export { UserContextProvider, useUser };
