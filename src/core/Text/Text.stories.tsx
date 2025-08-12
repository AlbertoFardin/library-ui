import * as React from "react";
import Text, { TextSize } from ".";
import {
  ITheme,
  THEME_DEFAULT,
  setTheme,
  loadFonts,
  getFontsFamily,
} from "../../theme";

export default {
  title: "core/Text",
  component: Text,
};

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non ullamcorper odio, nec facilisis dolor. Duis scelerisque sit amet libero a rhoncus. Fusce dapibus dictum leo. Donec eget risus in justo imperdiet ultrices id sit amet leo. Sed tincidunt ipsum commodo ante fringilla, in aliquet augue maximus. In auctor mauris sit amet euismod tempus. Suspendisse tellus tellus, pretium molestie sodales vel, consectetur eu lorem. Aenean vestibulum ut odio nec imperdiet. Nam diam ex, condimentum eu laoreet eget, faucibus rutrum lacus. Nam ut justo ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas mollis ante, sed aliquet quam euismod id. Nunc sit amet condimentum urna. In eu pharetra neque.";
const ExampleStory = () => (
  <>
    <Text
      style={{ margin: 25 }}
      size={3}
      children="The quick brown fox jumps over the lazy dog"
    />
    <Text style={{ margin: 25 }} size={3} children={lorem} />
    <Text style={{ margin: 25, color: "#f00" }} size={3} children={lorem} />
    <Text
      style={{ margin: 25, color: "#00f" }}
      size={3}
      ellipsis
      children={lorem}
    />
  </>
);
export const Example = ExampleStory.bind({});

const SizesStory = () => (
  <>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n: TextSize) => (
      <React.Fragment key={n}>
        <Text style={{ margin: 25 }} size={n} children={`Text SIZE ${n}`} />
      </React.Fragment>
    ))}
  </>
);
export const Sizes = SizesStory.bind({});

const WeightsStory = () => (
  <>
    <Text
      style={{ margin: 25 }}
      size={3}
      children="Text weight LIGHTER"
      weight="lighter"
    />
    <Text
      style={{ margin: 25 }}
      size={3}
      children="Text weight REGULAR"
      weight="regular"
    />
    <Text
      style={{ margin: 25 }}
      size={3}
      children="Text weight BOLDER"
      weight="bolder"
    />
  </>
);
export const Weights = WeightsStory.bind({});

const EllipsisStory = () => (
  <>
    <Text
      style={{ margin: 25, width: 200, border: "1px solid #f00" }}
      size={3}
      ellipsis
      children="Text very very long with elipssis - here ellipsis is necessary!"
      tooltipValue={[
        "Text very very long with elipssis",
        "There ellipsis is necessary",
      ]}
    />
    <Text
      style={{ margin: 25, width: 450, border: "1px solid #f00" }}
      size={3}
      ellipsis
      children="Text very very long - here ellipssis is not necessary"
    />
  </>
);
export const Ellipsis = EllipsisStory.bind({});

const ManyFonts = () => {
  const THEME: ITheme = {
    ...THEME_DEFAULT,
    id: "customFonts",
    version: 1,
    fonts: [
      {
        family: "Roboto",
        weight: [300, 400, 500],
        source:
          "https://fonts.gstatic.com/s/roboto/v32/KFOiCnqEu92Fr1Mu51QrEz0dL-vwnYh2eg.woff2",
      },
      {
        family: "Playwright IE Guides",
        weight: [400, 400, 400],
        source:
          "https://fonts.gstatic.com/s/playwriteieguides/v1/LhW5MULFNP8PI-1UADw_Kbp9daTx5ovUaN8jMd_9.woff2",
      },
      {
        family: "Monsieur La Doulaise",
        weight: [400, 400, 400],
        source:
          "https://fonts.gstatic.com/s/monsieurladoulaise/v18/_Xmz-GY4rjmCbQfc-aPRaa4pqV340p7EZm5ZyEA242Tz.woff2",
      },
      {
        family: "alternate-gothic-no-1-d",
        weight: [300, 500, 700],
        source:
          "https://use.typekit.net/af/9fa845/000000000000000000010d5b/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3",
      },
      {
        family: "din-2014-C",
        weight: [400, 400, 700],
        source:
          "https://use.typekit.net/af/c2b6e5/00000000000000007735afee/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3",
      },
    ],
  };
  setTheme(THEME);
  loadFonts();
  return (
    <>
      {getFontsFamily().map((fontFamily, index) => (
        <div key={fontFamily + index} style={{ margin: 25 }}>
          <Text font={0} children={fontFamily} />
          <Text
            style={{ margin: "5px 15px" }}
            size={4}
            font={index}
            children="The quick brown fox jumps over the lazy dog"
          />
        </div>
      ))}
    </>
  );
};
export const TryCustomFonts = ManyFonts.bind({});
