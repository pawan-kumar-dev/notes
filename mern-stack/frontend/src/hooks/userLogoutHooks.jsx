import useAuthContext from "./useAuthHooks";
import useWorkoutHooks from "./useWorkoutHooks";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchAction } = useWorkoutHooks();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    dispatchAction({ type: "SET_WORKOUTS", payload: null });
  };
  return { logout };
};
