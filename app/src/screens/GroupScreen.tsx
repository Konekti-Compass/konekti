import React, { useEffect } from "react";
import useProfileId from "../hooks/utils/useProfileId";
import GroupTemplate from "../components/templates/GroupTemplate";
import { useQueryBelongsByProfileId } from "../hooks/belong/query";

const GroupScreen = () => {
  const { profileId } = useProfileId();

  const {
    data: belongs,
    isLoading: isLoadingBelongs,
    refetch: refetchBelongs,
  } = useQueryBelongsByProfileId(profileId);

  useEffect(() => {
    refetchBelongs();
  }, []);

  return <GroupTemplate />;
};

export default GroupScreen;
