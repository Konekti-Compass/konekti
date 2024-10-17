import { useToast } from "native-base";
import React, { useCallback } from "react";

import Alert from "../../components/molecules/Alert";

const useAlert = () => {
  const toast = useToast();

  const showAlert = useCallback(
    async ({ text, status }: { text: string; status: "success" | "error" }) => {
      toast.closeAll();
      toast.show({
        id: Math.random(),
        duration: 3000,
        placement: "top",
        render: () => (
          <Alert
            text={text}
            status={status}
            onPressCloseButton={() => toast.close(1)}
          />
        ),
      });
    },
    []
  );

  return {
    showAlert,
  };
};

export default useAlert;
