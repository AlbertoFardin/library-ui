import { ContentState, DraftDecorator, ContentBlock } from "draft-js";
import DisabledLink from "../components/DisabledLink";

export const disabledLinkDecorator: DraftDecorator = {
  strategy: (
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void,
    contentState: ContentState,
  ) => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "LINK"
      );
    }, callback);
  },
  component: DisabledLink,
};
