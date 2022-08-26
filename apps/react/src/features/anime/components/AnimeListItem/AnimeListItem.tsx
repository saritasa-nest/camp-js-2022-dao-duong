import { FC, memo } from 'react';

import { Anime } from '@js-camp/core/models/anime/anime';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';

import styles from './AnimeListItem.module.css';
import { Titles } from './components/Titles/Title';
interface AnimeListItemProps {

  /** Anime data. */
  readonly anime: Anime;
}

const AnimeListItemComponent: FC<AnimeListItemProps> = ({ anime }) => {
  const test = 1;
  return (
    <>
      <ListItem className={styles['item']}>
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
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};

export const AnimeListItem = memo(AnimeListItemComponent);
