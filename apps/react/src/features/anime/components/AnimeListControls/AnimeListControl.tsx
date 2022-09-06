import { AnimeSort, AnimeType } from '@js-camp/core/models/anime/anime';
import { Box, Tabs, Tab } from '@mui/material';
import { FC, memo, SyntheticEvent, useState, useEffect } from 'react';
import { AnimeListQueryParamsWithId } from '@js-camp/core/models/anime-query-params';

import { Search } from './components/Search/Search';
import { Sort } from './components/Sort/Sort';
import { Type } from './components/Type/Type';
import styles from './AnimeListControl.module.css';

interface AnimeListControlProps {

  /** Params value. */
  readonly queryParams: AnimeListQueryParamsWithId;

  /** Set params callback. */
  readonly setQueryParams: (params: AnimeListQueryParamsWithId) => void;
}

interface TabPanelProps {

  /** Tab children. */
  readonly children?: React.ReactNode;

  /** Tab index. */
  readonly index: number;

  /** Tab value. */
  readonly value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...otherTabProps } = props;

  return (
    <div
      {...otherTabProps}
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ p: 2, display: 'flex' }}>{children}</Box>}
    </div>
  );
};

const AnimeListControlComponent: FC<AnimeListControlProps> = ({
  queryParams,
  setQueryParams,
}) => {
  const [tab, setTab] = useState(0);
  const [sort, setSort] = useState<AnimeSort>(queryParams.sort);
  const [typeFilter, setTypeFilter] = useState<readonly AnimeType[]>(
    queryParams.type,
  );
  const [search, setSearch] = useState<string>(queryParams.search);
  const handleTabChange = (event: SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  useEffect(() => {
    setQueryParams({
      ...queryParams,
      sort,
      type: typeFilter,
      search,
    });
  }, [sort, typeFilter, search]);

  return (
    <Box className={styles['anime-list-controls']}>
      <Box>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          aria-label="anime control tabs"
          className={styles['tabs-container']}
        >
          <Tab label="Sort" className={styles['tab-item']} />
          <Tab label="Type" className={styles['tab-item']} />
          <Tab label="Search" className={styles['tab-item']} />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <Sort sort={sort} setSort={setSort} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Type type={typeFilter} setType={setTypeFilter} />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <Search search={search} setSearch={setSearch} />
      </TabPanel>
    </Box>
  );
};

export const AnimeListControl = memo(AnimeListControlComponent);
