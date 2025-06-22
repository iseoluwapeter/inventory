// src/context/StaffContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Staff = {
  id: number;
  name: string;
  email: string;
};

type StaffContextType = {
  staff: Staff | null;
  setStaff: (staff: Staff | null) => void;
};

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const StaffProvider = ({ children }: { children: ReactNode }) => {
  const [staff, setStaffState] = useState<Staff | null>(null);

  // Load staff from localStorage when app starts
  useEffect(() => {
    const stored = localStorage.getItem("staff");
    if (stored) {
      try {
        setStaffState(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse staff from storage", e);
      }
    }
  }, []);

  // Save to state + localStorage
  const setStaff = (staff: Staff | null) => {
    setStaffState(staff);
    if (staff) {
      localStorage.setItem("staff", JSON.stringify(staff));
    } else {
      localStorage.removeItem("staff");
    }
  };

  return (
    <StaffContext.Provider value={{ staff, setStaff }}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error("useStaff must be used within a StaffProvider");
  }
  return context;
};
