import { useContext } from "react";
import { SessionContext } from "../context/sessionContext/SessionContext";

const useSession = () => useContext(SessionContext);
export default useSession;