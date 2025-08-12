import * as React from "react";
import Icon from "./Icon";
import Divider from "../Divider";
import selectionJson from "../../../static-medias/icomoon/selection.json";
import Toolbar from "../Toolbar";
import Text from "../Text";
import { FieldText } from "../Field";
import { getTheme } from "../../theme";

const SIZES_BOX = 100;
const STYLE_BOX: React.CSSProperties = {
  borderRadius: 10,
  border: "1px solid #ccc",
  margin: 5,
  display: "inline-flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: SIZES_BOX,
  minWidth: SIZES_BOX,
  maxWidth: SIZES_BOX,
  height: SIZES_BOX,
  minHeight: SIZES_BOX,
  maxHeight: SIZES_BOX,
  overflow: "hidden",
};
const STYLE_BOX_ICON: React.CSSProperties = {
  fontSize: 30,
};
const STYLE_BOX_TEXT: React.CSSProperties = {
  width: "inherit",
  marginTop: 10,
  padding: "0 10px",
  boxSizing: "border-box",
  textAlign: "center",
};
const selectionJsonFilename = "selection.json";
const selectionJsonPath = `./icomoon/${selectionJsonFilename}`;
const legatures = selectionJson.icons
  .map((icon) => icon.properties.ligatures)
  .sort();

export default {
  title: "core/Icon",
  component: Icon,
};

const ExampleStory = () => {
  const [search, setSearch] = React.useState("");

  return (
    <div
      style={{
        padding: 10,
        width: "100%",
        height: "100%",
        overflow: "overlay",
        boxSizing: "border-box",
      }}
    >
      <Divider />
      <Toolbar style={{ backgroundColor: getTheme().colors.grayDrawer }}>
        <Text weight="bolder" size={5} children="Ad uso dei designer" />
      </Toolbar>
      <p>
        Per creare il font corrispondente alle icone utilizzate nei progetti
        Warda, seguire i passaggi:
      </p>
      <ol>
        <li>
          Andare sul sito{" "}
          <a
            href="https://icomoon.io/app"
            target="_blank"
            rel="noopener noreferrer"
          >
            IcoMoon
          </a>
          .
        </li>
        <li>
          Importare il progetto usando il file{" "}
          <a
            href={selectionJsonPath}
            download
            rel="noopener noreferrer"
            children={selectionJsonFilename}
          />
          .
        </li>
        <li>Modificare il set di icone.</li>
        <li>Generare il font.</li>
        <li>Passare il file compresso generato agli sviluppatori.</li>
      </ol>
      <strong>Note:</strong>
      <br />
      <ul>
        <li>
          I glifi devono essere prodotti a partire da svg leggeri: copiare glifi
          pubblici già ottimizzati o usare strumenti adatti per generarli.
        </li>
        <li>
          Ogni glifo deve sempre avere una legatura corrispondente al nome.
        </li>
        <li>
          Le modifiche effettuate su icomoon sono conservate nella cache del
          browser.
        </li>
      </ul>
      <Divider />
      <Toolbar style={{ backgroundColor: getTheme().colors.grayDrawer }}>
        <Text weight="bolder" size={5} children="Ad uso degli sviluppatori" />
      </Toolbar>
      <p>Per importare il font in library seguire i passaggi:</p>
      <ol>
        <li>
          Estrarre dal file compresso generato il file
          &quot;selection.json&quot; ed il file
          &quot;WardaDesignIcons.woff&quot; presente nella cartella fonts.
        </li>
        <li>
          Andare sul sito{" "}
          <a
            href="https://transfonter.org/"
            target="_blank"
            rel="noopener noreferrer"
            children="transfonter.org"
          />{" "}
          ed usare il convertitore per confertire il file
          &quot;WardaDesignIcons.woff&quot; in un file &quot;.woff2&quot;.
        </li>
        <li>
          Caricare il file &quot;selection.json&quot; nella cartella
          /static-medias/icomoon/
        </li>
        <li>
          Caricare il file &quot;WardaDesignIcons.woff2&quot; nella cartella del
          componente Icon (/src/core/Icon)
        </li>
      </ol>
      <strong>Note:</strong>
      <br />
      <ul>
        <li>
          Prima di distribuire la nuova versione della library con il nuovo font
          verificare che non si siano perse le legature.
        </li>
      </ul>
      <br />
      <Divider />
      <Toolbar style={{ backgroundColor: getTheme().colors.grayDrawer }}>
        <Text
          weight="bolder"
          size={5}
          children="List of all ligature in font"
        />
        <div style={{ flex: 1 }} />
        <FieldText
          placeholder="Search..."
          style={{ width: 400, margin: 0 }}
          value={search}
          onChange={setSearch}
          debounce={1000}
        />
      </Toolbar>
      {legatures
        .filter((ligature) => {
          return String(ligature).includes(search);
        })
        .map((ligature, index) => (
          <div key={index} style={STYLE_BOX}>
            <Icon style={STYLE_BOX_ICON} children={ligature} />
            <Text style={STYLE_BOX_TEXT} children={ligature} ellipsis />
          </div>
        ))}
    </div>
  );
};

export const Default = ExampleStory.bind({});
