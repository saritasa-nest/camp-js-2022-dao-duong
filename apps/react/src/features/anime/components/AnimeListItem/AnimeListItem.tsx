import { FC, memo } from 'react';
import { Anime } from '@js-camp/core/models/anime/anime';
import { ListItem, ListItemAvatar, Avatar, ListItemText, debounce } from '@mui/material';

import { Titles } from './components/Title';
import { Info } from './components/Info';
import styles from './AnimeListItem.module.css';

interface Props {

  /** Anime data. */
  readonly anime: Anime;

  /** On item click event. */
  readonly onClick: () => void;
}

const AnimeListItemComponent: FC<Props> = ({ anime, onClick }) => {
  const onItemClick = () => {
    onClick();
  };
  return (
    <ListItem className={styles['item']} onClick={ debounce(onItemClick, 500) }>
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
