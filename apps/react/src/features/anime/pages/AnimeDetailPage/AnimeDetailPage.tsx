import { FC, memo } from 'react';

import { AnimeDetail } from '../../components/AnimeDetail/AnimeDetail';

const AnimeDetailComponent: FC = () => <AnimeDetail />;

export const AnimeDetailPage = memo(AnimeDetailComponent);
