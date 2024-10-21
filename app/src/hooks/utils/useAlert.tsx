import { useToast } from "native-base";
import React, { useCallback } from "react";

import Alert from "../../components/molecules/Alert";

const useAlert = () => {
  const toast = useToast();

  const showAlert = useCallback(
    ({ text, status }: { text: string; status: "success" | "error" }) => {
      toast.closeAll();

      const newId = Math.random();
      toast.show({
        id: newId,
        duration: 3000,
        placement: "bottom",
        render: () => (
          <Alert
            text={text}
            status={status}
            onPressCloseButton={() => toast.close(1)}
          />
        ),
      });
    },
    [toast]
  );

  return {
    showAlert,
  };
};

export default useAlert;
