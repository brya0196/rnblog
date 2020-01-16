import React, { useCallback, useEffect } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import {
  Container, Content, Header,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {
  FlatList, Platform, RefreshControl, StyleSheet,
} from 'react-native';
import User from '../../models/User';
import HeaderMenuButton from '../../components/molecules/header/HeaderMenuButton';
import CustomHeaderButton from '../../components/atoms/button/CustomHeaderButton';
import Post from '../../models/Post';
import DraftItems from '../../components/molecules/DraftItems';
import SearchHeader from '../../components/molecules/header/SearchHeader';
import { cleanDraftError, getAllDrafts, refreshDrafts } from '../../store/modules/Drafts';
import NoContentListMessage from '../../components/atoms/NoContentListMessage';
import ToastService from '../../services/ToastService';

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
});

const DraftScreen: NavigationStackScreenComponent = (props) => {
  const user: User = useSelector((state: any) => state.auth.user);
  const drafts: Post[] = useSelector((state: any) => state.drafts.drafts);
  const refreshing: boolean = useSelector((state: any) => state.drafts.refreshing);
  const error: string = useSelector((state: any) => state.drafts.errors);
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    dispatch(refreshDrafts(true));
    dispatch(getAllDrafts(user.uid));
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(getAllDrafts(user.uid));
  }, [dispatch, user]);

  useEffect(() => {
    if (!error) {
      return;
    }

    ToastService.closeLabelToast(error, () => {
      dispatch(cleanDraftError());
    });
  }, [error, dispatch]);

  return (
    <Container>
      <Header transparent />
      <Content
        padder
      >
        <SearchHeader>My Drafts</SearchHeader>

        {drafts.length <= 0 && (
          <NoContentListMessage>You do not have any draft</NoContentListMessage>
        ) }

        <FlatList
          data={drafts}
          style={styles.list}
          refreshing={refreshing}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <DraftItems
              post={item.item}
              onPress={(id: string) => {
                console.log(id);
              }}
            />
          )}
        />
      </Content>
    </Container>
  );
};

DraftScreen.navigationOptions = (navData) => ({
  headerTitle: '',
  headerTransparent: true,
  headerLeft: () => (
    <HeaderMenuButton navigation={navData.navigation} />
  ),
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Add"
        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
        buttonStyle={{ marginRight: 20 }}
        onPress={() => {
          navData.navigation.navigate('ManageDraft');
        }}
      />
    </HeaderButtons>
  ),
});

export default DraftScreen;
