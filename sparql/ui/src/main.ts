import "@triply/yasgui/build/yasgui.min.css";
import Yasgui from "@triply/yasgui";

new Yasgui(document.getElementById("app")!, {
  requestConfig: {
    endpoint: "https://regels.overheid.nl/lab/sparql/kadasteralgoritme/query",
  },
  copyEndpointOnNewTab: false,
});
