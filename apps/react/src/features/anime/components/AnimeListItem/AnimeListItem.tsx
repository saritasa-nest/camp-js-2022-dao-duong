import { FC, memo } from 'react';
import { Anime } from '@js-camp/core/models/anime/anime';
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';

import { Titles } from './components/Title';
import { Info } from './components/Info';
import styles from './AnimeListItem.module.css';

interface Props {

  /** Anime data. */
  readonly anime: Anime;

  /** On item click event. */
  readonly onClick: () => void;

  /** Selected state. */
  readonly isSelected: boolean;
}

const AnimeListItemComponent: FC<Props> = ({ anime, onClick, isSelected }) => {
  const onItemClick = () => {
    onClick();
  };
  return (
    <ListItem
      className={`${styles['item']} ${isSelected ? styles['selected'] : isSelected}`}
      onClick={onItemClick}
    >
      <ListItemAvatar className={styles['item-image']}>
        <Avatar
          alt={`${anime.englishTitle || anime.japaneseTitle} image`}
          src={anime.image}
          className={styles['image']}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Titles
            englishTitle={anime.englishTitle}
            japaneseTitle={anime.japaneseTitle}
          ></Titles>
        }
        secondary={<Info status={anime.status} type={anime.type}></Info>}
      />
    </ListItem>
  );
};

export const AnimeListItem = memo(AnimeListItemComponent);
