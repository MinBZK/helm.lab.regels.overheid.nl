const fs = require("fs/promises");
const path = require("path");

const labels = {
  iit: "Individuele inkomenstoeslag",
  "iit-cpsv": "Individuele inkomenstoeslag",
};

async function main() {
  const datasetDir = path.join(__dirname, "datasets");
  const datasets = await fs.readdir(datasetDir);

  const datasetMap = {};

  for (const dataset of datasets) {
    const datasetName = path.basename(dataset, ".ttl");

    const datasetConfig = `
<#${datasetName}-service> rdf:type fuseki:Service ;
  rdfs:label                      "${labels[datasetName]}" ;
  fuseki:name                     "${datasetName}" ;    
  fuseki:endpoint  [ fuseki:operation fuseki:query ; fuseki:name "sparql" ];
  fuseki:endpoint  [ fuseki:operation fuseki:query ; fuseki:name "query" ];
  fuseki:endpoint  [ fuseki:operation fuseki:gsp_r ; fuseki:name "data" ];
  fuseki:dataset                  <#${datasetName}-dataset> .

<#${datasetName}-dataset> rdf:type tdb2:DatasetTDB2 ;
  tdb2:location                   "/fuseki/databases/${datasetName}" .
    `;

    datasetMap[datasetName] = datasetConfig;
  }

  let config = `
PREFIX fuseki:  <http://jena.apache.org/fuseki#>
PREFIX rdf:     <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs:    <http://www.w3.org/2000/01/rdf-schema#>
PREFIX tdb1:    <http://jena.hpl.hp.com/2008/tdb#>
PREFIX tdb2:    <http://jena.apache.org/2016/tdb#>
PREFIX ja:      <http://jena.hpl.hp.com/2005/11/Assembler#>
PREFIX :        <#>

[] rdf:type fuseki:Server ;
   fuseki:services (
     ${Object.keys(datasetMap)
       .map((name) => `<#${name}-service>`)
       .join("\n")}
   ) ;
   fuseki:enableCors true ;
   fuseki:corsHeaders "Access-Control-Allow-Origin: *" .

  `;

  config += Object.values(datasetMap).join("\n");

  await fs.writeFile(path.resolve(__dirname, "config.ttl"), config);
}

main();
