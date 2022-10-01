import { FC, memo } from 'react';

import { AnimeDetail } from '../../components/AnimeDetail/AnimeDetail';

const DetailComponent: FC = () => <AnimeDetail />;

export const DetailPage = memo(DetailComponent);
