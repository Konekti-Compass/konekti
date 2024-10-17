import { useToast } from "native-base";
import React, { useCallback, useEffect } from "react";

import Alert from "../../components/molecules/Alert";

const useAlert = () => {
  const toast = useToast();

  const [isActive, setIsActive] = React.useState(false);
  const [id, setId] = React.useState(Math.random());

  useEffect(() => {
    (async () => {
      setIsActive(toast.isActive(1));
    })();
  }, [toast]);

  const showAlert = useCallback(
    async ({ text, status }: { text: string; status: "success" | "error" }) => {
      toast.closeAll();
      if (!isActive) {
        const newId = Math.random();
        toast.show({
          id: newId,
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
        setId(newId);
        setIsActive(true);
      }
    },
    [toast, isActive]
  );

  return {
    showAlert,
  };
};

export default useAlert;
