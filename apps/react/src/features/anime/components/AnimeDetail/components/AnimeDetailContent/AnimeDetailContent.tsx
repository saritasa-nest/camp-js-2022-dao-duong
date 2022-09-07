import { Box, Chip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { FC, memo } from 'react';
import ReactPlayer from 'react-player/youtube';
import { convertDate } from '@js-camp/core/utils/convertDate';
import { AnimeDetail } from '@js-camp/core/models/anime';

interface Props {

  /** Anime details data to display. */
  readonly animeDetail: AnimeDetail;
}

const AnimeDetailContentComponent: FC<Props> = ({ animeDetail }) => (
  <>
    <Box>
      <Typography variant="h6" align="left">
        Synopsis
      </Typography>
      <Typography variant="body1" align="left">
        {animeDetail.synopsis}
      </Typography>
    </Box>
    <Typography variant="h6" align="left">
      Type: {animeDetail.type}
    </Typography>
    <Typography variant="h6" align="left">
      Status: {animeDetail.status}
    </Typography>
    <Typography variant="h6" align="left">
      Aired:{`From ${convertDate(animeDetail.aired.start)} to ${convertDate(animeDetail.aired.end)}`}
    </Typography>
    <Typography variant="h6" align="left">
      Airing: {animeDetail.airing ? 'Yes' : 'No'}
    </Typography>
    <Box>
      <Typography variant="h6" align="left">
        Genres
      </Typography>
      <Stack direction="row" spacing={1}>
        {animeDetail.genreList.map(genre => (
          <Chip label={genre.name} key={genre.id} />
        ))}
      </Stack>
    </Box>
    <Box>
      <Typography variant="h6" align="left">
        Studios
      </Typography>
      <Stack direction="row" spacing={1}>
        {animeDetail.studioList.map(studio => (
          <Chip label={studio.name} key={studio.id} />
        ))}
      </Stack>
    </Box>
    {animeDetail.youtubeTrailerId !== null && (
      <Box>
        <Typography variant="h6" align="left">
          Trailer
        </Typography>
        <ReactPlayer
          url={`https://www.youtube-nocookie.com/embed/${animeDetail.youtubeTrailerId}`}
          controls={true}
        />
      </Box>
    )}
  </>
);

export const AnimeDetailContent = memo(AnimeDetailContentComponent);
