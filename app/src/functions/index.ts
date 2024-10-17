import { ReactNode } from "react";

import { IToastService } from "native-base/lib/typescript/components/composites/Toast";

export const wait = (sec: number) => {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
};

export const showAlert = (toast: IToastService, Alert: ReactNode) => {
  toast.closeAll();
  
  if (!toast.isActive(1)) {
    toast.show({
      placement: "top",
      duration: 3000,
      render: () => Alert,
    });
  }
};
