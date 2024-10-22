import { useContext } from "react";
import { ProfileIdContext } from "../../contexts/ProfileIdProvider";

const useProfileId = () => {
  return useContext(ProfileIdContext);
};

export default useProfileId;
