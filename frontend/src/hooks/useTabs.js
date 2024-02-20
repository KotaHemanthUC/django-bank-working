import React from "react";
import { useSearchParams } from "react-router-dom";

/**
 * This hook is used to manage the tab state in the URL
 * @param { String } defaultValue default value for the tab
 * @returns { Object } An object containing the current tab and a function to set the current tab
 */

const useTab = ( defaultValue) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentTab, setCurrentTab] = React.useState(searchParams.get("tab") || defaultValue);
  
    React.useEffect(() => {
      const tabParam = searchParams.get("tab");
      if (!isNaN(tabParam)) setCurrentTab(tabParam);
    }, [searchParams]);
  
    React.useEffect(() => {
      searchParams.set("tab", currentTab.toString());
      setSearchParams(searchParams);
    }, [currentTab, searchParams, setSearchParams]);
  
    return { currentTab, setCurrentTab };
  };

export default useTab;