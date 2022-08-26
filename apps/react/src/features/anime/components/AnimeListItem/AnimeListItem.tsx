import { FC, memo } from 'react';

import { Anime } from '@js-camp/core/models/anime/anime';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from '@mui/material';

import styles from './AnimeListItem.module.css';
import { Titles } from './components/Title';
import { Info } from './components/Info';
interface AnimeListItemProps {

  /** Anime data. */
  readonly anime: Anime;
}

const AnimeListItemComponent: FC<AnimeListItemProps> = ({ anime }) => (
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
        secondary={
          <Info
            status={anime.status}
            type={anime.type}
          ></Info>
        }
      />

    </ListItem>
    <Divider component="li" />
  </>
);

export const AnimeListItem = memo(AnimeListItemComponent);
