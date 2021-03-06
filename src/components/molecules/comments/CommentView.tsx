import styled from 'styled-components/native';
import React, { useCallback } from 'react';
import { Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import PostUserInfo from '../PostUserInfo';
import Comment from '../../../models/Comment';

interface Props {
  comment: Comment;
  onUserTab?: Function;
  onEdit?: Function;
  onDelete?: Function;
}

const CommentContainer = styled(TouchableOpacity)`
  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 20px;
  border-color: #ccc;
  border-bottom-width: 0.6px;
  align-items: flex-start;
`;

const TextStyled = styled(Text)`
  padding-left: 10px;
  padding-right: 10px;
`;

const CommentView: React.FC<Props> = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    comment, onUserTab, onEdit, onDelete,
  } = props;

  const onUserTabHandler = useCallback(() => {
    if (onUserTab) {
      onUserTab(comment.author);
    }
  }, [comment, onUserTab]);

  const onPressHandler = useCallback(() => {
    if (onEdit) {
      onEdit(comment);
    }
  }, [comment, onEdit]);

  const onLongPressHandler = useCallback(() => {
    if (onDelete) {
      onDelete(comment);
    }
  }, [comment, onDelete]);

  return (
    <CommentContainer activeOpacity={0.6} onPress={onPressHandler} onLongPress={onLongPressHandler}>
      <PostUserInfo
        author={comment.author}
        publishDate={comment.publishDate}
        onUserTab={onUserTabHandler}
      />
      <TextStyled>{comment.body}</TextStyled>
    </CommentContainer>
  );
};

export default CommentView;
