import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import CategoryPostItem from '../molecules/CategoryPostItem';
import Category from '../../models/Category';

interface Props {
  categories: Category[];
  onCategorySelected?: Function;
}

const CategoryList: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { categories, onCategorySelected } = props;
  const selectedCategoryId = useSelector((state: any) => state.posts.selectedCategoryId);
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryId);

  const onPressHandler = useCallback((id: any) => {
    setSelectedCategory(id);

    if (onCategorySelected) {
      onCategorySelected(id);
    }
  }, [selectedCategory, setSelectedCategory, onCategorySelected]);

  return (
    <FlatList
      data={categories}
      keyExtractor={(item: any) => item.id.toString()}
      horizontal
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews={false}
      renderItem={(itemData) => (
        <CategoryPostItem
          category={itemData.item}
          onPress={onPressHandler}
          active={selectedCategory === itemData.item.id}
        />
      )}
    />
  );
};

export default CategoryList;
