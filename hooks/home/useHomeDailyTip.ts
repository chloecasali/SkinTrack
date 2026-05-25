import { useEffect, useState } from "react";
import { HOME_DAILY_TIP_LAST_SEEN_KEY } from "@/constants/home";
import { readPreference, writePreference } from "@/services/preferences";

export function getLocalDayKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function useHomeDailyTip() {
  const todayKey = getLocalDayKey();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let isMounted = true;

    void readPreference(HOME_DAILY_TIP_LAST_SEEN_KEY).then((lastSeen) => {
      if (!isMounted) return;
      setVisible(lastSeen !== todayKey);
    });

    return () => {
      isMounted = false;
    };
  }, [todayKey]);

  const dismiss = () => {
    setVisible(false);
    void writePreference(HOME_DAILY_TIP_LAST_SEEN_KEY, todayKey);
  };

  return { dismiss, visible };
}
