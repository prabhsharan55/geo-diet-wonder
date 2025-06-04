
// src/hooks/useAuthRedirect.ts

import { useNavigate } from "react-router-dom";
import { UserDetails } from "@/types/auth";
import { checkPartnerApplicationStatus } from "@/utils/authUtils";

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  const redirectBasedOnRole = async (currentDetails: UserDetails) => {
    const { role, email: userEmail } = currentDetails;
    console.log("AuthRedirect: redirectBasedOnRole called for role:", role);

    if (role === "admin") {
      console.log("AuthRedirect: Navigating admin to /admin");
      navigate("/admin", { replace: true });
    } else if (role === "partner") {
      const applicationStatus = await checkPartnerApplicationStatus(userEmail);
      console.log(
        "AuthRedirect: Partner application status for redirect:",
        applicationStatus
      );
      if (applicationStatus === "approved") {
        console.log("AuthRedirect: Navigating approved partner to /partner");
        navigate("/partner", { replace: true });
      } else {
        console.log(
          "AuthRedirect: Navigating unapproved/pending partner to /partner/application-status"
        );
        navigate("/partner/application-status", { replace: true });
      }
    } else if (role === "customer") {
      console.log("AuthRedirect: Navigating customer to /customer");
      navigate("/customer", { replace: true });
    } else {
      console.warn("AuthRedirect: Unknown role for redirect:", role);
      navigate("/", { replace: true });
    }
  };

  return { redirectBasedOnRole };
};
