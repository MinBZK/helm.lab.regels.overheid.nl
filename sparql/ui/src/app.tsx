import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";
import { useEffect, useRef } from "react";

interface DatasetItemProps {
  label: string;
  dataset: string;
  onClick(args: { label: string; dataset: string }): void;
}

const DatasetItem: React.FC<DatasetItemProps> = ({
  label,
  dataset,
  onClick,
}) => {
  return (
    <li
      className="cursor-pointer underline text-blue-500"
      onClick={() => onClick({ label, dataset })}
    >
      {label}
    </li>
  );
};

export const App: React.FC = () => {
  const yasGUIMounted = useRef(false);
  const yasGUIInstance = useRef<Yasgui>();

  useEffect(() => {
    if (yasGUIMounted.current) return;

    yasGUIMounted.current = true;

    yasGUIInstance.current = new Yasgui(document.getElementById("yasgui")!, {
      tabName: "Individuele inkomenstoeslag (IIT)",
      requestConfig: {
        endpoint: "https://regels.overheid.nl/lab/sparql/iit/query",
      },
      copyEndpointOnNewTab: false,
    });
  }, []);

  const handleClick: DatasetItemProps["onClick"] = ({ dataset, label }) => {
    yasGUIInstance.current?.addTab(false, {
      ...Yasgui.Tab.getDefaults(),
      id: `$${label}`,
      name: label,
      requestConfig: {
        ...Yasgui.Tab.getDefaults().requestConfig,
        endpoint: `https://regels.overheid.nl/lab/sparql/${dataset}/query`,
      },
    });
  };

  return (
    <>
      <div className="container mx-auto py-2">
        <h2>Beschikbare datasets</h2>
        <ul>
          <DatasetItem
            dataset="iit"
            onClick={handleClick}
            label="Individuele inkomenstoeslag (IIT)"
          />
          <DatasetItem
            dataset="iit-cpsv"
            onClick={handleClick}
            label="Individuele inkomenstoeslag (IIT-CPSV)"
          />
        </ul>
      </div>
      <div id="yasgui" />
    </>
  );
};
