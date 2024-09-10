import "@triply/yasgui/build/yasgui.min.css";
import Yasgui from "@triply/yasgui";

const yasGUI = new Yasgui(document.getElementById("app")!, {
  tabName: "Individuele inkomenstoeslag (IIT)",
  requestConfig: {
    endpoint: "https://regels.overheid.nl/lab/sparql/iit/query",
  },
  copyEndpointOnNewTab: false,
});

if (!yasGUI.getTab("$iit-cpsv")) {
  yasGUI.addTab(false, {
    ...Yasgui.Tab.getDefaults(),
    id: "$iit-cpsv",
    name: "Individuele inkomenstoeslag (IIT-CPSV)",
    requestConfig: {
      ...Yasgui.Tab.getDefaults().requestConfig,
      endpoint: "https://regels.overheid.nl/lab/sparql/iit-cpsv/query",
    },
  });
}
