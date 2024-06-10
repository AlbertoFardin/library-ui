import { createUseStyles } from "react-jss";
import * as moment from "moment";
import * as React from "react";
import Text from "../../Text";
import { IAnnotation } from "../interfaces";
import Avatar from "../../Avatar";
import { getTheme } from "../../../theme";

const useStyles = createUseStyles({
  toolbar: {
    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    margin: 0,
    padding: 0,
  },
  textContainer: {
    display: "flex",
    "flex-direction": "column",
    "margin-left": 5,
  },
});

interface IToolbarUser {
  annotation: IAnnotation;
}

const ToolbarUser = ({ annotation }: IToolbarUser) => {
  const classes = useStyles({});
  const annotationUser = annotation.user;
  if (!annotationUser) return null;
  const isUpdated = !!annotation.data.dateUpdated;
  const dateRecent = isUpdated
    ? annotation.data.dateUpdated
    : annotation.data.dateCreated;
  return (
    <div className={classes.toolbar}>
      <Avatar
        size={30}
        src={annotationUser.avatar}
        text={annotationUser.avatarText}
        icon={annotationUser.avatarIcon}
      />
      <div className={classes.textContainer}>
        <Text
          ellipsis
          weight="bolder"
          children={`${annotationUser.firstName} ${annotationUser.lastName}`}
        />
        {!dateRecent ? null : (
          <Text
            ellipsis
            style={{ color: getTheme().colors.disable }}
            children={`${moment(dateRecent).format("DD/MM/YYYY HH:mm")} ${
              isUpdated ? "(edited)" : ""
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default ToolbarUser;
